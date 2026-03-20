"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bankiim2026";

export type PortfolioCategory = "web-dev" | "graphic-design" | "photography";

export type EmbedEntry = {
  id: string;
  code: string;
};

export type PortfolioData = Record<PortfolioCategory, EmbedEntry[]>;

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
