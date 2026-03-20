"use client";

import { Star, Gift, X } from "lucide-react";
import { useState } from "react";
import { SalamiForm } from "../components/SalamiForm";

const Crescent = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const Lantern = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 2v2" />
    <path d="M10 4h4" />
    <path d="M9 4l-2 6h10l-2-6" />
    <path d="M7 10v6M17 10v6M12 10v6" />
    <path d="M7 13h10" />
    <path d="M7 16l2 4h6l2-4" />
    <path d="M10 20h4v2h-4z" />
  </svg>
);

export default function Eid() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="pt-[72px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen relative overflow-hidden flex flex-col justify-between transition-colors duration-300">

      {/* Background Ornaments / Floating Arabian Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Central Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#D4A017]/10 dark:border-[#D4A017]/20 transition-colors duration-300"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#D4A017]/5 dark:border-[#D4A017]/10 transition-colors duration-300"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#D4A017]/15 dark:border-[#D4A017]/30 transition-colors duration-300"></div>

        {/* Floating Icons */}
        {/* Top Left Crescent */}
        <div className="absolute top-[12%] left-[10%] md:left-[15%] text-[#D4A017] opacity-60 dark:opacity-20 animate-float" style={{ animationDelay: '0s' }}>
          <Crescent className="w-24 h-24 -rotate-12" />
        </div>

        {/* Top Right Lantern */}
        <div className="absolute top-[15%] right-[12%] md:right-[20%] text-[#D4A017] opacity-50 dark:opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>
          <Lantern className="w-20 h-20" />
        </div>

        {/* Bottom Left Lantern */}
        <div className="absolute bottom-[20%] left-[10%] md:left-[22%] text-[#D4A017] opacity-50 dark:opacity-15 animate-float" style={{ animationDelay: '2.5s' }}>
          <Lantern className="w-16 h-16" />
        </div>

        {/* Bottom Right Star */}
        <div className="absolute bottom-[18%] right-[8%] md:right-[18%] text-[#D4A017] opacity-40 dark:opacity-10 animate-float" style={{ animationDelay: '0.8s' }}>
          <Star className="w-12 h-12" fill="currentColor" />
        </div>

        {/* Top Center Star */}
        <div className="absolute top-[8%] left-[45%] md:left-[55%] text-[#D4A017] opacity-30 dark:opacity-[0.08] animate-float" style={{ animationDelay: '2.1s' }}>
          <Star className="w-8 h-8" fill="currentColor" />
        </div>

        {/* Mid Left Star */}
        <div className="absolute top-[45%] left-[5%] md:left-[10%] text-[#D4A017] opacity-30 dark:opacity-[0.08] animate-float" style={{ animationDelay: '1.2s' }}>
          <Star className="w-10 h-10" fill="currentColor" />
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 md:px-12 py-20 relative z-10">
        <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D4A017] mb-8 reveal in">
          ✦ Eid Ul Fitr ✦
        </p>

        <h1 className="font-sans text-[clamp(52px,9vw,120px)] font-light leading-none text-slate-900 dark:text-slate-50 mb-2 reveal d1 in transition-colors duration-300">
          Eid<br /><em className="italic text-[#D4A017] drop-shadow-sm">Mubarak</em>
        </h1>

        <p className="font-sans text-[clamp(18px,3vw,28px)] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-50/40 mb-10 reveal d2 in transition-colors duration-300">
          2026
        </p>

        <p className="font-sans text-[clamp(16px,2vw,22px)] font-light italic text-slate-600 dark:text-slate-50/75 leading-relaxed max-w-[560px] mb-4 reveal d3 in transition-colors duration-300">
          May this blessed occasion bring peace, joy, and boundless
          blessings to you and your loved ones.
          Wishing you a celebration filled with warmth and gratitude.
        </p>

        <p className="font-sans text-[13px] font-medium tracking-[0.08em] text-[#D4A017] mb-14 reveal d4 in">
          Keep me in your prayers ✨
        </p>

        <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4A017] to-transparent mb-14 reveal d4 in"></div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 reveal d5 in">
          <div className="bg-slate-200/50 dark:bg-white/5 border border-[#D4A017]/30 rounded-[2px] py-7 px-9 text-center min-w-[160px] backdrop-blur-sm transition-colors duration-300">
            <div className="font-sans text-[36px] font-light text-[#D4A017] leading-none mb-1.5">30</div>
            <div className="font-sans text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 dark:text-slate-50/45 transition-colors duration-300">Days of Ramadan</div>
          </div>
          <div className="bg-slate-200/50 dark:bg-white/5 border border-[#D4A017]/30 rounded-[2px] py-7 px-9 text-center min-w-[160px] backdrop-blur-sm transition-colors duration-300">
            <div className="font-sans text-[36px] font-light text-[#D4A017] leading-none mb-1.5">∞</div>
            <div className="font-sans text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 dark:text-slate-50/45 transition-colors duration-300">Blessings Ahead</div>
          </div>
          <div className="bg-slate-200/50 dark:bg-white/5 border border-[#D4A017]/30 rounded-[2px] py-7 px-9 text-center min-w-[160px] backdrop-blur-sm transition-colors duration-300">
            <div className="font-sans text-[36px] font-light text-[#D4A017] leading-none mb-1.5">1</div>
            <div className="font-sans text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 dark:text-slate-50/45 transition-colors duration-300">Celebration</div>
          </div>
        </div>

        <div className="mt-16 reveal d5 in">
          <button 
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-3 font-sans text-xs font-bold tracking-[0.2em] uppercase bg-brand-500 text-white px-10 py-5 rounded-[2px] hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20 active:scale-95 hover-trigger"
          >
            <Gift size={18} className="group-hover:rotate-12 transition-transform" />
            Get Salami
          </button>
        </div>
      </div>

      {/* Salami Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-white/10 p-8 md:p-12 rounded-[2px] shadow-2xl transition-all overflow-hidden cursor-auto">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            >
              <X size={24} />
            </button>
            <SalamiForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <div className="border-t border-[#D4A017]/20 py-10 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center mt-12 relative z-10 transition-colors duration-300">
        <span className="font-sans italic text-[16px] text-slate-500 dark:text-slate-50/45 transition-colors duration-300">"And He found you lost and guided you." — Quran 93:7</span>
        <span className="font-sans text-[14px] text-[#D4A017] drop-shadow-sm">— Bankiim Khan</span>
      </div>
    </div>
  );
}
