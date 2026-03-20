"use client";

import { useState, useEffect } from "react";
import { 
  addEmbed, getEmbeds, removeEmbed, logout, 
  getSalamiRequests, removeSalamiRequest,
  type PortfolioCategory, type EmbedEntry, type SalamiRequest 
} from "../actions";
import { Trash2, ExternalLink, Mail, User, Phone, MessageSquare, Briefcase, Gift } from "lucide-react";

export default function AdminDashboard() {
  const [category, setCategory] = useState<PortfolioCategory>("web-dev");
  const [code, setCode] = useState("");
  const [embeds, setEmbeds] = useState<EmbedEntry[]>([]);
  const [salamiRequests, setSalamiRequests] = useState<SalamiRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"portfolio" | "salami">("portfolio");

  const fetchEmbeds = async () => {
    setLoading(true);
    const data = await getEmbeds(category);
    setEmbeds(data);
    setLoading(false);
  };

  const fetchSalami = async () => {
    setLoading(true);
    const data = await getSalamiRequests();
    setSalamiRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    if (view === "portfolio") fetchEmbeds();
    else fetchSalami();
  }, [category, view]);

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

  const handleDeleteRequest = async (id: string) => {
    console.log("Deleting request:", id);
    try {
      await removeSalamiRequest(id);
      await fetchSalami();
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
      <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setView("portfolio")}
          className={`pb-4 px-2 font-sans text-sm font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${view === "portfolio" ? 'text-brand-500 border-b-2 border-brand-500' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <Briefcase size={16} />
          Portfolio
        </button>
        <button 
          onClick={() => setView("salami")}
          className={`pb-4 px-2 font-sans text-sm font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${view === "salami" ? 'text-brand-500 border-b-2 border-brand-500' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <Gift size={16} />
          Salami Requests
          {salamiRequests.length > 0 && (
            <span className="bg-brand-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {salamiRequests.length}
            </span>
          )}
        </button>
      </div>

      {view === "portfolio" ? (
        <>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2px] shadow-sm mb-12 transition-colors duration-300">
            <h2 className="font-sans text-lg font-medium mb-6">Add New Embed</h2>
            <form onSubmit={handleAdd} className="flex flex-col gap-6">
              <div>
                <label className="block font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400 mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value as PortfolioCategory)}
                  className="w-full border border-slate-200 dark:border-slate-700 p-3 rounded-[2px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors duration-300"
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
                  className="w-full border border-slate-200 dark:border-slate-700 p-3 rounded-[2px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors duration-300"
                  placeholder={'<iframe src="..." width="100%" height="400"></iframe>'}
                ></textarea>
              </div>

              <button type="submit" className="self-start font-sans text-xs font-semibold tracking-[0.1em] uppercase bg-brand-500 text-white px-8 py-3 rounded-[2px] hover:bg-brand-700 transition-colors">
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
                      className="self-end font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Delete Embed
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2px] shadow-sm transition-colors duration-300">
          <h2 className="font-sans text-lg font-medium mb-6">Incoming Salami Requests</h2>
          
          {loading ? (
            <p className="text-slate-500 dark:text-slate-400 italic">Loading...</p>
          ) : salamiRequests.length === 0 ? (
            <div className="py-12 text-center">
              <Gift size={48} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 italic">No requests yet. Wait for the Eid vibes! 🌙</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...salamiRequests].reverse().map((req) => (
                <div key={req.id} className="border border-slate-200 dark:border-slate-800 p-6 rounded-[2px] flex flex-col gap-4 hover:border-brand-500/30 transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-slate-900 dark:text-slate-50">{req.name}</h4>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-500">
                          {req.dob ? `Born: ${req.dob}` : 'No DOB'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteRequest(req.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                      title="Delete Request"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-[2px] border border-slate-100 dark:border-white/5 italic text-sm text-slate-600 dark:text-slate-400 relative">
                    <MessageSquare size={12} className="absolute -top-1.5 -left-1.5 text-brand-500" />
                    "{req.message}"
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded text-brand-500">
                        <span className="text-[9px] font-bold uppercase">{req.mfsType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-brand-500" />
                        <span className="font-mono text-xs font-bold tracking-wider">{req.paymentNumber}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
