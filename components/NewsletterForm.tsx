"use client";

import { useState } from "react";

interface NewsletterFormProps {
  dict: {
    stayUpdated: string;
    stayUpdatedDesc: string;
    emailPlaceholder: string;
    joinUs: string;
    subscribedSuccess: string;
    subscribedError: string;
  };
}

export default function NewsletterForm({ dict }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="signature-gradient p-12 md:p-20 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 font-headline">{dict.stayUpdated}</h2>
            <p className="text-on-primary-container text-lg">{dict.stayUpdatedDesc}</p>
          </div>
          <div className="relative z-10 w-full max-w-md">
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-white p-5 rounded-xl shadow-2xl text-primary">
                <span className="material-symbols-outlined text-secondary text-2xl">check_circle</span>
                <span className="font-bold text-sm">{dict.subscribedSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 p-2 bg-white rounded-xl shadow-2xl">
                <input
                  className="flex-grow border-none focus:ring-0 px-4 font-body text-primary outline-none min-w-0"
                  placeholder={dict.emailPlaceholder}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-bold transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? "..." : dict.joinUs}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-white/80 text-xs mt-2 text-center">{dict.subscribedError}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
