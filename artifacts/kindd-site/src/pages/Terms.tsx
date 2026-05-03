import { Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

const SERIF = "'DM Serif Display', Georgia, serif";
const SANS  = "'DM Sans', Inter, sans-serif";
const MONO  = "'Geist Mono', monospace";

const sections = [
  {
    heading: "Information not advice.",
    body: "KINDD provides plain-language information sourced from Australian government websites. It is not legal advice, financial advice, tax advice, medical advice, or immigration advice. Nothing on this site should be treated as a substitute for professional advice relevant to your individual circumstances.",
  },
  {
    heading: "Accuracy.",
    body: "We make every effort to keep information current and accurate. Government policies, laws, and procedures change. Always check the official government source linked in each guide before making any decision. The last reviewed date shown on each guide is when we last checked the source, not a guarantee of current accuracy.",
  },
  {
    heading: "External links.",
    body: "KINDD links to third-party government websites. We are not responsible for the content, availability, or accuracy of those sites. Links are provided for convenience and do not constitute an endorsement.",
  },
  {
    heading: "Tools and calculators.",
    body: "The calculators and tools on KINDD produce estimates only. They are not accurate enough to rely on for tax, financial, or legal decisions. Use them as a starting point only. For accurate figures, consult a registered professional or use the official government tool linked within each calculator.",
  },
  {
    heading: "Free to use.",
    body: "KINDD is free. There is no paid tier. There is no premium content. If you are ever asked to pay to access KINDD content, that is not us.",
  },
  {
    heading: "Contact.",
    body: "Questions about these terms can be sent to connect@tbcworldwide.com.",
  },
];

export default function Terms() {
  return (
    <div style={{ fontFamily: SANS, background: "#FFFFFF", color: "#0F172A" }}>
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
        <a
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SANS, fontWeight: 500, fontSize: 14, color: "#007BA7", textDecoration: "none", marginBottom: 48 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007BA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to KINDD
        </a>

        <h1 style={{ fontFamily: SERIF, fontSize: 48, color: "#0F172A", marginBottom: 12, lineHeight: 1.1 }}>Terms of Use.</h1>
        <p style={{ fontFamily: MONO, fontSize: 12, color: "#6B6B5E", marginBottom: 48 }}>Last updated: May 2026.</p>

        {sections.map((s) => (
          <div key={s.heading} style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 18, color: "#0F172A", marginBottom: 10 }}>{s.heading}</h2>
            <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 16, color: "#6B6B5E", lineHeight: 1.75, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </main>

      <footer className="bg-[#0F172A] text-[#FAF6E8] pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="text-4xl font-bold tracking-tighter">kindd</div>
            <div className="text-xl text-[#B8D4E8]">You are one of our kind.</div>
          </div>
          <div className="space-y-8 mb-16">
            <div className="text-sm text-[#6B6B5E] leading-relaxed">
              <a href="https://tbcworldwide.com" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">tbcworldwide.com</a> <span className="mx-2">·</span>
              <a href="https://techbrandcraft.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">techbrandcraft.com.au</a> <span className="mx-2">·</span>
              <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">brezaplusyou.com.au</a> <span className="mx-2">·</span>
              <a href="https://taracollective.org" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">taracollective.org</a> <span className="mx-2">·</span>
              <a href="https://celes.13.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">celes.13.com.au</a>
            </div>
            <div>
              <a href="mailto:connect@tbcworldwide.com" className="text-sm text-[#B8D4E8] hover:opacity-80 transition-opacity">connect@tbcworldwide.com</a>
            </div>
          </div>
          <div className="text-center py-4 border-t border-[#6B6B5E]/30" style={{ marginBottom: 0 }}>
            <a href="/privacy" style={{ fontFamily: SANS, fontWeight: 400, fontSize: 12, color: "#A89880", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#007BA7")}
              onMouseLeave={e => (e.currentTarget.style.color = "#A89880")}>
              Privacy Policy
            </a>
            <span style={{ color: "#6B6B5E", margin: "0 8px" }}>·</span>
            <a href="/terms" style={{ fontFamily: SANS, fontWeight: 400, fontSize: 12, color: "#A89880", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#007BA7")}
              onMouseLeave={e => (e.currentTarget.style.color = "#A89880")}>
              Terms of Use
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-[#6B6B5E]/30 pt-8">
            <div className="flex items-center gap-4 text-[#FAF6E8]/40">
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
            <div className="text-xs text-[#6B6B5E] text-right space-y-2">
              <p>Part of <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">Breza + You</a>. Tech Division of TBC Worldwide.</p>
              <p>© 2026 KINDD. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
