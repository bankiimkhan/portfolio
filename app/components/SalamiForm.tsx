"use client";

import { useState } from "react";
import { submitSalamiRequest } from "../actions";
import { Send, User, MessageSquare, Phone, Heart, Calendar, CheckCircle2 } from "lucide-react";

export function SalamiForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    mfsType: "bKash",
    paymentNumber: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitSalamiRequest(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-brand-500/20">
          <CheckCircle2 className="text-white w-8 h-8" />
        </div>
        <h3 className="font-sans text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">সালামি রিকোয়েস্ট পাঠানো হয়েছে!</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xs">
          আপনার তথ্য বঙ্কিম খানের কাছে পৌঁছে গেছে। ঈদ মোবারক! ✨
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md animate-fade-up">
      <div className="text-left mb-2">
        <h3 className="font-sans text-xl font-bold text-slate-900 dark:text-slate-50">ঈদের চাঁদ আকাশে সালামি নিন বাতাসে 🌙</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mt-1">নিচের তথ্যগুলো পূরণ করুন ✨</p>
      </div>

      {/* Name Field */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">নাম (যে নামে আমি চিনি) *</label>
        <div className="relative group">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            required
            type="text"
            placeholder="আপনার নাম লিখুন"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 pl-12 rounded-[2px] font-sans text-sm focus:border-brand-500 dark:focus:border-brand-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* DOB Field */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">জন্মতারিখ *</label>
        <div className="relative group">
          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            required
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 pl-12 rounded-[2px] font-sans text-sm focus:border-brand-500 dark:focus:border-brand-500 outline-none transition-all dark:[color-scheme:dark]"
          />
        </div>
      </div>

      {/* MFS Type Select */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">MFS *</label>
        <div className="flex gap-3">
          {["bKash", "Nagad", "Rocket"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, mfsType: type })}
              className={`flex-1 py-3 px-2 rounded-[2px] text-[11px] font-bold uppercase tracking-wider border transition-all ${formData.mfsType === type
                  ? "bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20"
                  : "bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* MFS Number Field */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">MFS নম্বর *</label>
        <div className="relative group">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            required
            type="text"
            placeholder="আপনার নম্বরটি লিখুন"
            value={formData.paymentNumber}
            onChange={(e) => setFormData({ ...formData, paymentNumber: e.target.value })}
            className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 pl-12 rounded-[2px] font-sans text-sm focus:border-brand-500 dark:focus:border-brand-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Optional Message */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">মেসেজ (ঐচ্ছিক)</label>
        <div className="relative group">
          <MessageSquare size={16} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <textarea
            rows={2}
            placeholder="কিছু বলতে চাইলে লিখতে পারেন..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 pl-12 rounded-[2px] font-sans text-sm focus:border-brand-500 dark:focus:border-brand-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-4 border border-slate-200 dark:border-white/10 font-sans text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all rounded-[2px]"
        >
          বাতিল
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] bg-brand-500 text-white px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-brand-600 transition-all rounded-[2px] flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? "পাঠানো হচ্ছে..." : "সাবমিট করুন"}
          <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
