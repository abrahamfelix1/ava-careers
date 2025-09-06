import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="text-cyan-200 font-semibold tracking-wide">AVA</Link>
          <nav className="text-sm text-slate-300/80 flex gap-5">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold">AVA Privacy Policy</h1>
        <p className="mt-2 text-slate-300/90">Effective date: {new Date().getFullYear()}.</p>

        <div className="mt-8 space-y-6 rounded-2xl p-6 bg-white/5 border border-white/10">
          <section>
            <h2 className="text-xl font-semibold text-cyan-300">What we collect</h2>
            <ul className="mt-2 list-disc list-inside text-slate-200/90">
              <li>Account basics (name, email) you provide</li>
              <li>Application details (resume, links) you submit</li>
              <li>Usage analytics (device, pages; anonymized/aggregated)</li>
              <li>Voice interactions (only if you opt in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300">How we use it</h2>
            <p className="mt-2 text-slate-200/90">
              To operate AVA, respond to applications, improve experience, and ensure security. We do not sell personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300">Voice & ML</h2>
            <p className="mt-2 text-slate-200/90">
              If enabled, voice snippets may be processed to detect emotion and improve responses. We minimize retention and anonymize where possible. You can request deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300">Security</h2>
            <p className="mt-2 text-slate-200/90">
              Encryption in transit and at rest, access controls, least-privilege, and regular audits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300">Your choices</h2>
            <ul className="mt-2 list-disc list-inside text-slate-200/90">
              <li>Access or correct your information</li>
              <li>Request deletion</li>
              <li>Manage consent for voice features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-300">Contact</h2>
            <p className="mt-2 text-slate-200/90">
              Email: <a className="underline decoration-dotted" href="mailto:projectavahq@gmail.com">projectavahq@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}