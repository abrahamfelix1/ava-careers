import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getRecaptchaToken } from "../lib/recaptcha"; // ensure src/lib/recaptcha.ts exists

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    if (!name || !email || !message) {
      return setResult("Please fill name, email, and message.");
    }

    try {
      setBusy(true);
      const recaptchaToken = await getRecaptchaToken("contact");
      const res = await fetch("/.netlify/functions/sendContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, recaptchaToken }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult("✅ Thanks! We’ve received your message.");
        setMessage("");
      } else {
        setResult(data.error || "❌ Something went wrong.");
      }
    } catch {
      setResult("⚠️ Network error. Please email projectavahq@gmail.com.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Floating Back to Home button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 font-semibold px-4 py-2 shadow-lg"
        >
          ← Home
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Contact AVA</h1>
        <p className="mt-3 text-slate-300/90">
          Email:{" "}
          <a href="mailto:projectavahq@gmail.com" className="underline">
            projectavahq@gmail.com
          </a>{" "}
          · Phone:{" "}
          <a href="tel:+13057241176" className="underline">
            +1 (305) 724-1176
          </a>
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Contact form */}
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold text-cyan-300">Send a message</h2>
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-3"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-3"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-3"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-3 min-h-[140px]"
                placeholder="Your message…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {result && (
                <div className="text-sm rounded-xl px-3 py-2 border border-white/15 bg-white/5">
                  {result}
                </div>
              )}
              <button
                className="rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 disabled:opacity-60"
                disabled={busy}
              >
                {busy ? "Sending…" : "Send"}
              </button>
            </form>
          </div>

          {/* Info box */}
          <div className="rounded-2xl p-6 bg-gradient-to-tr from-cyan-500/15 to-emerald-400/10 border border-white/10">
            <h2 className="text-xl font-semibold text-cyan-300">We’re here to help</h2>
            <ul className="mt-3 space-y-2 text-slate-200/90">
              <li>• Feedback on roles or process</li>
              <li>• Accessibility or technical issues</li>
              <li>• Partnerships and media</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}