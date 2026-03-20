"use client";

import { useState } from "react";
import { login } from "../actions";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(password);
    if (!success) {
      setError(true);
      setPassword("");
      setIsLoading(false);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2px] shadow-sm mt-12 transition-colors duration-300">
      <h2 className="font-sans text-2xl font-light mb-6 text-center">Admin <span className="font-semibold text-brand-500">Access</span></h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400 mb-2">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 p-3 rounded-[2px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors duration-300"
            placeholder="Enter admin password..."
            autoFocus
          />
          {error && <p className="text-red-500 text-xs mt-2 font-medium tracking-[0.05em]">Incorrect password.</p>}
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full font-sans text-xs font-semibold tracking-[0.1em] uppercase bg-brand-500 text-white px-8 py-3.5 rounded-[2px] hover-trigger hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Authenticate"}
        </button>
      </form>
    </div>
  );
}
