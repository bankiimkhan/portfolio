import Link from "next/link";
import { ArrowRight, Star, MonitorSmartphone, PenTool, Camera, Code, Palette, Globe, Monitor, Cpu, Image as ImageIcon, Layers, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative pt-[72px] min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      
      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.15] dark:opacity-[0.3] transition-opacity duration-500">
        <div className="absolute top-[15%] left-[5%] animate-float animate-delay-1000"><Code size={64} strokeWidth={1.5} /></div>
        <div className="absolute top-[25%] left-[45%] animate-blob animate-delay-2000"><Palette size={48} strokeWidth={1.5} /></div>
        <div className="absolute top-[10%] right-[10%] animate-float animate-delay-500"><Camera size={80} strokeWidth={1.5} /></div>
        <div className="absolute top-[40%] right-[5%] animate-blob animate-delay-3000"><Globe size={56} strokeWidth={1.5} /></div>
        <div className="absolute bottom-[20%] left-[10%] animate-float animate-delay-1500"><Monitor size={72} strokeWidth={1.5} /></div>
        <div className="absolute bottom-[35%] right-[20%] animate-blob"><Cpu size={60} strokeWidth={1.5} /></div>
        <div className="absolute top-[60%] left-[25%] animate-float animate-delay-700"><ImageIcon size={44} strokeWidth={1.5} /></div>
        <div className="absolute bottom-[10%] left-[40%] animate-blob animate-delay-4000"><Layers size={52} strokeWidth={1.5} /></div>
        <div className="absolute top-[50%] right-[35%] animate-float animate-delay-2500"><Zap size={36} strokeWidth={1.5} /></div>
        <div className="absolute bottom-[5%] right-[10%] animate-blob animate-delay-1200"><PenTool size={68} strokeWidth={1.5} /></div>
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-20 pb-24 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="max-w-xl">

          <h1 className="font-sans text-[clamp(44px,7vw,80px)] leading-[1.1] text-slate-900 dark:text-slate-50 mb-6 tracking-tight flex flex-wrap items-baseline gap-x-4 reveal d1 in">
            <span className="font-black">Bankiim</span><em className="italic font-light text-brand-500">Khan</em>
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-lg reveal d2 in">
            Crafting digital experiences that merge aesthetic precision with functional depth. Multi-disciplinary designer & developer.
          </p>
          <div className="flex flex-wrap items-center gap-6 reveal d3 in">
            <Link href="/web-dev" className="group flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.1em] uppercase bg-brand-500 text-white px-8 py-4 rounded-[2px] hover-trigger hover:bg-brand-700 transition-colors">
              Selected Works
              <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>

        {/* Right Column / Portrait */}
        <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-md mx-auto reveal d4 in">
          <div className="absolute inset-0 transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center">
             <img src="/profile.png" alt="Mesbah Uddin Ahmed Sakib Portrait" className="max-w-full max-h-full object-contain drop-shadow-xl dark:drop-shadow-[0_20px_20px_rgba(255,255,255,0.05)]" />
          </div>
        </div>
      </section>

      {/* Disciplines Section */}
      <section className="px-6 md:px-12 py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 md:gap-12 text-center">
          <Link href="/web-dev" className="group flex flex-col items-center hover-trigger pb-8 border-b-2 border-transparent hover:border-brand-500 transition-colors duration-300 reveal in">
            <MonitorSmartphone strokeWidth={1} className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-4 group-hover:-translate-y-1 group-hover:text-brand-500 transition-all duration-300" />
            <h3 className="!font-sans text-[12px] md:text-[22px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-50 group-hover:text-brand-500 transition-colors">Push</h3>
          </Link>
          <Link href="/graphic-design" className="group flex flex-col items-center hover-trigger pb-8 border-b-2 border-transparent hover:border-brand-500 transition-colors duration-300 reveal d1 in">
            <PenTool strokeWidth={1} className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-4 group-hover:-translate-y-1 group-hover:text-brand-500 transition-all duration-300" />
            <h3 className="!font-sans text-[12px] md:text-[22px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-50 group-hover:text-brand-500 transition-colors">Design</h3>
          </Link>
          <Link href="/photography" className="group flex flex-col items-center hover-trigger pb-8 border-b-2 border-transparent hover:border-brand-500 transition-colors duration-300 reveal d2 in">
            <Camera strokeWidth={1} className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-4 group-hover:-translate-y-1 group-hover:text-brand-500 transition-all duration-300" />
            <h3 className="!font-sans text-[12px] md:text-[22px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-50 group-hover:text-brand-500 transition-colors">Noysikee</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
