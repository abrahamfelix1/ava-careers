import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from './assets/ava-logo.png';

const gradientBG =
  'bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(34,211,238,.25),transparent_60%),radial-gradient(900px_500px_at_100%_0%,rgba(14,165,233,.25),transparent_60%),linear-gradient(180deg,#020617_0%,#020617_60%,#0b1220_100%)]';

type Role =
  | 'UI/UX Specialist'
  | 'Social Media Manager'
  | 'Project Manager'
  | 'Content Writer (Intern)'
  | 'Social Media Specialist (Intern)'
  | 'Brand Manager (Intern)';

const openRoles = [
  { title: 'UI/UX Specialist', type: 'Full‑time · Remote', blurb: 'Design intuitive, accessible, voice‑first experiences for AVA across web and mobile.', tags: ['Figma','Design Systems','Prototyping','Accessibility']},
  { title: 'Social Media Manager', type: 'Full‑time · Remote', blurb: 'Grow AVA’s presence with empathetic storytelling, data‑driven campaigns, and community activation.', tags: ['Content','Analytics','Campaigns','Community']},
  { title: 'Project Manager', type: 'Full‑time · Remote', blurb: 'Orchestrate cross‑functional delivery for voice, ML, and product squads using lean, humane processes.', tags: ['Agile','Roadmaps','Risk','Delivery']},
];

const internships = [
  { title: 'Content Writer (Intern)', type: 'Internship · Remote', blurb: 'Craft compassionate, plain‑language content for coaching flows, product pages, and social.', tags: ['Writing','Tone of Voice','SEO']},
  { title: 'Social Media Specialist (Intern)', type: 'Internship · Remote', blurb: 'Plan and schedule multi‑channel posts, experiment, and learn fast with mentorship.', tags: ['Scheduling','Short‑form','Analytics']},
  { title: 'Brand Manager (Intern)', type: 'Internship · Remote', blurb: 'Support brand guidelines, creative QA, and partnerships to keep AVA cohesive and credible.', tags: ['Brand','Guidelines','Partnerships']},
];

function Card({title,type,blurb,tags}:{title:string;type:string;blurb:string;tags:string[]}){
  return (
    <motion.div whileHover={{y:-4, scale:1.01}} transition={{type:'spring', stiffness:260, damping:20}} className="group relative card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold text-cyan-200 tracking-tight">{title}</h3>
        <span className="text-[11px] md:text-xs text-cyan-100/70 px-2 py-1 rounded-full border border-cyan-300/30 bg-cyan-400/10">{type}</span>
      </div>
      <p className="mt-3 text-sm md:text-base text-slate-200/90 leading-relaxed">{blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map(t=> <span key={t} className="text-[11px] md:text-xs px-2.5 py-1 rounded-full border border-slate-400/20 text-slate-200/90 bg-slate-50/[0.03]">{t}</span>)}
      </div>
      <a href={`#apply?role=${encodeURIComponent(title)}`} className="mt-5 inline-block cta">Apply</a>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-cyan-300/40 transition"/>
    </motion.div>
  );
}

function ApplicationForm(){
  const getHashRole = () => typeof window!=='undefined' ? new URLSearchParams(window.location.hash.split('?')[1]).get('role') : null;
  const [role,setRole] = useState<Role | ''>((getHashRole() as Role) || '');
  const [fullName,setFullName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [linkedin,setLinkedin] = useState('');
  const [portfolio,setPortfolio] = useState('');
  const [cover,setCover] = useState('');
  const [resume,setResume] = useState<File | null>(null);
  const [agree,setAgree] = useState(false);
  const [busy,setBusy] = useState(false);
  const [msg,setMsg] = useState<string | null>(null);

  const roles: Role[] = ['UI/UX Specialist','Social Media Manager','Project Manager','Content Writer (Intern)','Social Media Specialist (Intern)','Brand Manager (Intern)'];

  async function submit(e: React.FormEvent){
    e.preventDefault();
    setMsg(null);
    if(!role) return setMsg('Please select a role.');
    if(!fullName || !email) return setMsg('Full name and email are required.');
    if(!resume) return setMsg('Please attach a resume (PDF/DOC).');
    if(!agree) return setMsg('Please confirm consent to process your application.');

    const form = new FormData();
    form.append('role', role);
    form.append('fullName', fullName);
    form.append('email', email);
    form.append('phone', phone);
    form.append('linkedin', linkedin);
    form.append('portfolio', portfolio);
    form.append('cover', cover);
    form.append('resume', resume);

    try {
      setBusy(true);
      const res = await fetch('/.netlify/functions/sendApplication', { method:'POST', body: form });
      const data = await res.json();
      if(res.ok) setMsg('Application sent! We will be in touch soon.');
      else setMsg(data.error || 'Something went wrong.');
    } catch(err){
      setMsg('Network error. Please try again or email projectsavahq@gmail.com.');
    } finally{
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 card">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-300">Role</label>
          <select value={role} onChange={e=>setRole(e.target.value as Role)} required className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2">
            <option value="">Select a role</option>
            {roles.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-300">Full name</label>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} required className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2" placeholder="Your name"/>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2" placeholder="you@example.com"/>
        </div>
        <div>
          <label className="text-sm text-slate-300">Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2" placeholder="+1 555‑555‑5555"/>
        </div>
        <div>
          <label className="text-sm text-slate-300">LinkedIn</label>
          <input value={linkedin} onChange={e=>setLinkedin(e.target.value)} className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2" placeholder="https://linkedin.com/in/…"/>
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-300">Portfolio (optional)</label>
        <input value={portfolio} onChange={e=>setPortfolio(e.target.value)} className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2" placeholder="https://…"/>
      </div>
      <div>
        <label className="text-sm text-slate-300">Cover letter</label>
        <textarea value={cover} onChange={e=>setCover(e.target.value)} className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 min-h-[140px]" placeholder="Briefly tell us why you're a great fit…"/>
      </div>
      <div>
        <label className="text-sm text-slate-300">Resume (PDF or DOC)</label>
        <input type="file" accept="application/pdf,.doc,.docx" onChange={e=>setResume(e.target.files?.[0] || null)} required className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2"/>
      </div>
      <label className="inline-flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="accent-cyan-400"/>
        I consent to AVA processing my application for hiring purposes.
      </label>
      {msg && <div className="text-sm rounded-xl px-3 py-2 border border-white/15 bg-white/5">{msg}</div>}
      <div className="flex gap-3">
        <button disabled={busy} className="cta disabled:opacity-60">{busy ? 'Sending…' : 'Submit Application'}</button>
        <a className="rounded-xl border border-white/15 hover:border-white/25 px-5 py-3" href="mailto:projectsavahq@gmail.com">Or email us</a>
      </div>
    </form>
  );
}

export default function App(){
  return (
    <div className={`min-h-screen ${gradientBG} text-white antialiased`}>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/40 border-b border-white/10">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-10 h-10" alt="AVA logo"/>
            <div className="leading-tight">
              <div className="text-cyan-200 font-semibold tracking-wide text-sm">AVA</div>
              <div className="text-[11px] text-slate-300/80">Personal Voice Companion</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200/90">
            <a href="#roles" className="hover:text-white">Open Roles</a>
            <a href="#internships" className="hover:text-white">Internships</a>
            <a href="#apply" className="hover:text-white">Apply</a>
          </nav>
          <a href="#apply" className="cta ml-3">Join Us</a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Build the future of <span className="text-cyan-300">voice‑first wellbeing</span>
            </h1>
            <p className="mt-4 text-slate-200/90 md:text-lg max-w-prose">
              AVA is the world’s first voice‑conversational companion for mental health and addiction recovery. We’re hiring a small, talented team to craft humane technology—ship fast, measure impact, and help millions.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#roles" className="cta">See Roles</a>
              <a href="#apply" className="rounded-xl border border-white/15 hover:border-white/25 px-5 py-3">Apply</a>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.6, delay:.1}} className="flex justify-center md:justify-end">
            <img src={logo} alt="AVA logo large" className="w-56 h-56" />
          </motion.div>
        </div>
      </section>

      <section id="roles" className="container py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Open Roles</h2>
        <p className="mt-2 text-slate-300/90">Remote‑first. High trust. Outcome‑driven.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {openRoles.map(r=> <Card key={r.title} {...r}/>)}
        </div>
      </section>

      <section id="internships" className="container py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Internships</h2>
        <p className="mt-2 text-slate-300/90">Learn by shipping. Mentorship included.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {internships.map(r=> <Card key={r.title} {...r}/>)}
        </div>
      </section>

      <section id="apply" className="container py-16">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-tr from-cyan-500/15 to-emerald-400/10 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-semibold">Ready to apply?</h2>
          <p className="mt-2 text-slate-200/90">Your application is sent directly to <span className="underline decoration-dotted">projectsavahq@gmail.com</span>.</p>
          <ApplicationForm/>
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2"><img src={logo} className="w-6 h-6"/> <span>© {new Date().getFullYear()} AVA — Sifasec LLC</span></div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Careers</a>
            <a href="#" className="hover:text-slate-300">Contact</a>
          </div>
        </div>
      </section>
    </div>
  );
}

