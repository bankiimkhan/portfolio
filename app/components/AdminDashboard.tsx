"use client";

import { useState, useEffect } from "react";
import { addEmbed, getEmbeds, removeEmbed, logout, type PortfolioCategory, type EmbedEntry } from "../actions";

export default function AdminDashboard() {
  const [category, setCategory] = useState<PortfolioCategory>("web-dev");
  const [code, setCode] = useState("");
  const [embeds, setEmbeds] = useState<EmbedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmbeds = async () => {
    setLoading(true);
    const data = await getEmbeds(category);
    setEmbeds(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmbeds();
  }, [category]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    try {
      await addEmbed(category, code);
      setCode("");
      await fetchEmbeds();
    } catch {
      alert("Session expired or unauthorized.");
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this embed?")) return;
    try {
      await removeEmbed(category, id);
      await fetchEmbeds();
    } catch {
      alert("Session expired or unauthorized.");
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-sans text-3xl font-light">Portfolio <span className="font-semibold text-brand-500">Admin</span></h1>
        <button onClick={handleLogout} className="font-sans text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-700 px-3 py-1.5 hover-trigger rounded-[2px]">
          Logout
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2px] shadow-sm mb-12 transition-colors duration-300">
        <h2 className="font-sans text-lg font-medium mb-6">Add New Embed</h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-6">
          <div>
            <label className="block font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400 mb-2">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value as PortfolioCategory)}
              className="w-full border border-slate-200 dark:border-slate-700 p-3 rounded-[2px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors duration-300 cursor-none"
            >
              <option value="web-dev">bankiim_push</option>
              <option value="graphic-design">bankiim_design</option>
              <option value="photography">Noysikee</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400 mb-2">Embed Code (iframe/HTML)</label>
            <textarea 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              rows={5}
              className="w-full border border-slate-200 dark:border-slate-700 p-3 rounded-[2px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors duration-300 cursor-none"
              placeholder={'<iframe src="..." width="100%" height="400"></iframe>'}
            ></textarea>
          </div>

          <button type="submit" className="self-start font-sans text-xs font-semibold tracking-[0.1em] uppercase bg-brand-500 text-white px-8 py-3 rounded-[2px] hover-trigger hover:bg-brand-700 transition-colors cursor-none">
            Add Embed
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2px] shadow-sm transition-colors duration-300">
        <h2 className="font-sans text-lg font-medium mb-6">Manage {category.replace("-", " ")} Embeds</h2>
        
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400 italic">Loading...</p>
        ) : embeds.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 italic">No embeds found for this category.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {embeds.map((embed) => (
              <div key={embed.id} className="border border-slate-200 dark:border-slate-700 p-4 rounded-[2px] flex flex-col gap-4 transition-colors duration-300">
                <div className="bg-slate-50 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-700 p-2 transition-colors duration-300" dangerouslySetInnerHTML={{ __html: embed.code }} />
                <button 
                  onClick={() => handleDelete(embed.id)}
                  className="self-end font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-red-500 hover:text-red-700 hover-trigger cursor-none"
                >
                  Delete Setup
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
