"use client";

import { useState } from "react";
import type { ContactDict } from "@/lib/types";

export default function ContactForm({ dict }: { dict: ContactDict }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="bg-surface-container-low p-8 md:p-10 rounded-lg">
      <h2 className="text-3xl font-bold mb-8 tracking-tight font-headline">{dict.formTitle}</h2>
      {status === "success" ? (
        <div className="bg-primary/10 border border-primary/20 p-8 rounded-xl text-center animate-[fadeIn_300ms_ease-out]">
          <span className="material-symbols-outlined text-primary text-5xl mb-4 block">check_circle</span>
          <h3 className="text-xl font-bold text-primary mb-2">{dict.successTitle}</h3>
          <p className="text-on-surface-variant">{dict.successDesc}</p>
        </div>
      ) : (
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{dict.fullName}</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary outline-none py-3 transition-colors placeholder:text-outline-variant disabled:opacity-50"
                placeholder="John Doe"
                type="text"
              />
            </div>
            <div className="relative group">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{dict.email}</label>
              <input
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary outline-none py-3 transition-colors placeholder:text-outline-variant disabled:opacity-50"
                placeholder="john@university.edu"
                type="email"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{dict.subject}</label>
            <input
              required
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary outline-none py-3 transition-colors placeholder:text-outline-variant disabled:opacity-50"
              placeholder="Inquiry"
              type="text"
            />
          </div>
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">{dict.message}</label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary outline-none py-3 transition-colors placeholder:text-outline-variant resize-none disabled:opacity-50"
              placeholder="Hello..."
              rows={4}
            ></textarea>
          </div>

          {status === "error" && (
            <div className="bg-error/10 border border-error/20 p-4 rounded-lg text-error text-sm font-medium flex items-center gap-2 animate-[fadeIn_200ms_ease-out]">
              <span className="material-symbols-outlined text-sm">error</span>
              {dict.errorDesc}
            </div>
          )}

          <button
            className="bg-primary text-on-primary px-10 py-4 rounded-md font-bold tracking-tight hover:shadow-xl transition-all flex items-center gap-2 group disabled:opacity-50"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? dict.sending : dict.send}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              {status === "loading" ? "hourglass_empty" : "arrow_forward"}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
