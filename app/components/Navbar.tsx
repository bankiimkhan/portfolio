"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[72px] bg-slate-50/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors duration-300 border-b ${scrolled ? 'border-slate-200 dark:border-slate-800' : 'border-transparent'}`}>
      <div className="flex items-center gap-6">
        <Link href="/" className="font-sans font-bold text-base tracking-widest uppercase text-slate-900 dark:text-slate-50 decoration-none hover-trigger">
          Bankiim<span className="text-brand-500">Khan</span>
        </Link>
        <ThemeToggle />
      </div>
      
      <ul className="hidden md:flex gap-10 list-none m-0 p-0">
        <li>
          <Link href="/web-dev" className={`relative pb-[2px] font-sans text-xs flex items-center font-medium tracking-[0.1em] uppercase hover-trigger transition-colors duration-200 ${isActive('/web-dev') ? 'text-slate-900 dark:text-slate-50' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 group'}`}>
            bankiim_push
            <span className={`absolute left-0 bottom-0 h-[1px] bg-brand-500 transition-all duration-300 ${isActive('/web-dev') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </li>
        <li>
          <Link href="/graphic-design" className={`relative pb-[2px] font-sans text-xs flex items-center font-medium tracking-[0.1em] uppercase hover-trigger transition-colors duration-200 ${isActive('/graphic-design') ? 'text-slate-900 dark:text-slate-50' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 group'}`}>
            bankiim_design
            <span className={`absolute left-0 bottom-0 h-[1px] bg-brand-500 transition-all duration-300 ${isActive('/graphic-design') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </li>
        <li>
          <Link href="/photography" className={`relative pb-[2px] font-sans text-xs flex items-center font-medium tracking-[0.1em] uppercase hover-trigger transition-colors duration-200 ${isActive('/photography') ? 'text-slate-900 dark:text-slate-50' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 group'}`}>
            Noysikee
            <span className={`absolute left-0 bottom-0 h-[1px] bg-brand-500 transition-all duration-300 ${isActive('/photography') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </li>
      </ul>
      <Link href="/eid-2026" className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-500 border border-brand-500 px-4 py-2 rounded-sm hover-trigger transition-all duration-200 hover:bg-brand-500 hover:text-white">
        Eid 2026 ✦
      </Link>
    </nav>
  );
}
