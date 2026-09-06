"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MaestroFilms from "./new/page";
import WorkStudioPage from "./reels/page";

// ────────────────────────────────────────────────
// 1. Modern Photography Pro Loader
// ────────────────────────────────────────────────
function ProLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // smooth fade
          return 100;
        }
        return prev + Math.random() * 12 + 4;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white transition-opacity duration-700">
      {/* Subtle film grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
           }}
      />

      {/* Logo / Brand */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.35em] uppercase">
          Maestro<span className="font-medium">Films</span>
        </h1>
        <p className="mt-3 text-xs tracking-[0.4em] text-neutral-500 uppercase">
          Visual Storytelling
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-[1px] bg-neutral-800 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="mt-6 text-[10px] tracking-widest text-neutral-500">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────
// 2. Lead Generation Modal
// ────────────────────────────────────────────────
function LeadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(onClose, 1800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#111] border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="text-center py-10">
            <p className="text-2xl font-light">Thank you</p>
            <p className="mt-2 text-neutral-400 text-sm">We’ll be in touch soon.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-light tracking-wide">Let’s create something</h2>
            <p className="mt-2 text-sm text-neutral-400">
              Share a few details and we’ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition"
              />
              <textarea
                placeholder="Project type / brief (optional)"
                rows={3}
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition resize-none"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition disabled:opacity-50"
              >
                {status === "loading" ? "Sending…" : "Send Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 3. Main Page
// ────────────────────────────────────────────────
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showLead, setShowLead] = useState(false);

 

  return (
    <>
      {loading && <ProLoader onComplete={() => setLoading(false)} />}

      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        <MaestroFilms />

       
      </div>

      <LeadModal isOpen={showLead} onClose={() => setShowLead(false)} />
    </>
  );
}