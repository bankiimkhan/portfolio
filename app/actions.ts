"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import crypto from "crypto";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bankiim2026";
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyQ4G7bgh3tP6zN4XHvMthtD9DRO93LkL7R0MZlF4Yer5dNLlAZ4vjOeKrP1ihAYreiRg/exec"; // Paste your Google Apps Script URL here or in .env

export type PortfolioCategory = "web-dev" | "graphic-design" | "photography";

export type EmbedEntry = {
  id: string;
  code: string;
};

export type SalamiRequest = {
  id: string;
  name: string;
  dob: string;
  mfsType: string;
  paymentNumber: string; // Will be encrypted in storage
  message: string;
  createdAt: string;
};

export type PortfolioData = Record<PortfolioCategory, EmbedEntry[]>;
export type SalamiData = SalamiRequest[];

const SALAMI_FILE = path.join(process.cwd(), "data", "salami.json");
const ENCRYPTION_KEY = crypto.scryptSync(ADMIN_PASSWORD, 'salt', 32);
const IV_LENGTH = 16;

// --- Authentication Actions ---
export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 // 1 day
    });
    return true;
  }
  return false;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  revalidatePath("/admin");
}

async function verifyAuth() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

// --- Data Operations ---
async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(fileContents) as PortfolioData;
  } catch (error) {
    return {
      "web-dev": [],
      "graphic-design": [],
      "photography": []
    };
  }
}

async function savePortfolioData(data: PortfolioData) {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function getEmbeds(category: PortfolioCategory): Promise<EmbedEntry[]> {
  const data = await getPortfolioData();
  return data[category] || [];
}

export async function addEmbed(category: PortfolioCategory, code: string) {
  // Enforce security
  await verifyAuth();
  
  const data = await getPortfolioData();
  if (!data[category]) {
    data[category] = [];
  }
  data[category].push({
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    code
  });
  await savePortfolioData(data);
  revalidatePath(`/${category}`);
  revalidatePath("/admin");
}

export async function removeEmbed(category: PortfolioCategory, id: string) {
  // Enforce security
  await verifyAuth();
  
  const data = await getPortfolioData();
  if (data[category]) {
    data[category] = data[category].filter(embed => embed.id !== id);
    await savePortfolioData(data);
    revalidatePath(`/${category}`);
    revalidatePath("/admin");
  }
}

// --- Salami Operations ---

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string) {
  const textParts = text.split(':');
  const ivPart = textParts.shift();
  if (!ivPart) return "Error";
  const iv = Buffer.from(ivPart, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

async function getSalamiData(): Promise<SalamiData> {
  try {
    const fileContents = await fs.readFile(SALAMI_FILE, "utf-8");
    return JSON.parse(fileContents) as SalamiData;
  } catch (error) {
    return [];
  }
}

async function saveSalamiData(data: SalamiData) {
  const dir = path.dirname(SALAMI_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  await fs.writeFile(SALAMI_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function submitSalamiRequest(formData: { 
  name: string, 
  dob: string, 
  mfsType: string, 
  paymentNumber: string, 
  message: string 
}) {
  const data = await getSalamiData();
  const newRequest: SalamiRequest = {
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    name: formData.name,
    dob: formData.dob,
    mfsType: formData.mfsType,
    paymentNumber: encrypt(formData.paymentNumber),
    message: formData.message,
    createdAt: new Date().toISOString()
  };
  data.push(newRequest);
  await saveSalamiData(data);

  // Sync with Google Sheets if configured (Asynchronous/Non-blocking)
  if (GOOGLE_SCRIPT_URL) {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        dob: formData.dob,
        mfsType: formData.mfsType,
        paymentNumber: formData.paymentNumber,
        message: formData.message,
        createdAt: newRequest.createdAt
      })
    }).catch(error => console.error("Google Sheets sync failed:", error));
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function getSalamiRequests(): Promise<SalamiRequest[]> {
  await verifyAuth();
  const data = await getSalamiData();
  // Decrypt numbers for admin viewing
  return data.map(req => ({
    ...req,
    paymentNumber: decrypt(req.paymentNumber)
  }));
}

export async function removeSalamiRequest(id: string) {
  await verifyAuth();
  let data = await getSalamiData();
  data = data.filter(req => req.id !== id);
  await saveSalamiData(data);
  revalidatePath("/admin");
}
