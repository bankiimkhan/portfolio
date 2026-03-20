import Link from "next/link";
import { Github, Linkedin, Instagram, Dribbble, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 px-6 md:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 text-center md:text-left transition-colors duration-300">
      <p className="text-[11px] font-sans font-medium tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Bankiim Khan. All Rights Reserved.
      </p>

      <div className="flex items-center gap-6">
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-brand-500 dark:hover:text-brand-500 hover:-translate-y-1 transition-all duration-300 hover-trigger" aria-label="GitHub">
          <Github size={18} strokeWidth={1.5} />
        </Link>
        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-brand-500 dark:hover:text-brand-500 hover:-translate-y-1 transition-all duration-300 hover-trigger" aria-label="LinkedIn">
          <Linkedin size={18} strokeWidth={1.5} />
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-brand-500 dark:hover:text-brand-500 hover:-translate-y-1 transition-all duration-300 hover-trigger" aria-label="Instagram">
          <Instagram size={18} strokeWidth={1.5} />
        </Link>
        <Link href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-brand-500 dark:hover:text-brand-500 hover:-translate-y-1 transition-all duration-300 hover-trigger" aria-label="Dribbble">
          <Dribbble size={18} strokeWidth={1.5} />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-brand-500 dark:hover:text-brand-500 hover:-translate-y-1 transition-all duration-300 hover-trigger" aria-label="Twitter">
          <Twitter size={18} strokeWidth={1.5} />
        </Link>
        <Link href="mailto:hello@bankiimkhan.com" className="text-slate-400 dark:text-slate-500 hover:text-brand-500 dark:hover:text-brand-500 hover:-translate-y-1 transition-all duration-300 hover-trigger" aria-label="Email">
          <Mail size={18} strokeWidth={1.5} />
        </Link>
      </div>
    </footer>
  );
}
