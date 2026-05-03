import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronRight, ArrowUp, Menu, X, ExternalLink,
  Linkedin, Instagram, Twitter, Youtube,
} from "lucide-react";
import { clusters } from "@/data/guides";
import type { Cluster } from "@/data/guides";
import { referenceTiles } from "@/data/reference";
import type { RefTileData } from "@/data/reference";

const heroImg = "/Kindd_Hero.png";

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  navy:        "#0F172A",
  cream:       "#FAF6E8",
  offCream:    "#F0EAD6",
  white:       "#FFFFFF",
  grey:        "#6B6B5E",
  cerulean:    "#007BA7",
  amber:       "#F59E0B",
  auGreen:     "#00843D",
  auGold:      "#C9A84C",
  darkSec:     "#A89880",
  signalGreen: "#A3E635",
};

// ─── Typography ───────────────────────────────────────────────────────────────
const SERIF = "'DM Serif Display', Georgia, serif";
const SANS  = "'DM Sans', Inter, sans-serif";
const MONO  = "'Geist Mono', monospace";

// ─── Shared card style ────────────────────────────────────────────────────────
const cardShadow = "0 4px 28px rgba(15,23,42,0.11)";
const cardRadius = 20;

// ─── Tool disclaimer ──────────────────────────────────────────────────────────
const TOOL_DISCLAIMER =
  "This tool gives you an estimate only. It is not financial, legal, or tax advice. For accurate figures, speak to a registered professional or use the official government source linked below.";

// ─── Citizenship stages data ──────────────────────────────────────────────────
interface CitLink    { label: string; url: string; }
interface CitUnlock  { title: string; desc: string; link: CitLink; }
interface CitStage   { num: number; heading: string; content: string; links: CitLink[]; unlocks?: CitUnlock[]; }

const CITIZENSHIP_STAGES: CitStage[] = [
  {
    num: 1,
    heading: "Eligibility",
    content:
      "You generally need to have been a permanent resident for at least four years, including one year as a permanent resident immediately before applying. Good character requirement applies. Basic English is assessed during the citizenship test.",
    links: [{ label: "homeaffairs.gov.au/citizenship", url: "https://www.homeaffairs.gov.au/citizenship" }],
  },
  {
    num: 2,
    heading: "The Test",
    content:
      "The Australian Citizenship Test is 20 questions. You need 75 percent to pass. It covers Australian values, history, government, and rights and responsibilities. The official practice site includes a question bank and a podcast series.",
    links: [
      { label: "Citizenship test practice", url: "https://citizenshiptest.homeaffairs.gov.au" },
      { label: "Official podcast", url: "https://www.homeaffairs.gov.au/citizenship/test-and-interview/prepare-for-test" },
    ],
  },
  {
    num: 3,
    heading: "The Application",
    content:
      "You apply online through ImmiAccount. The application fee as of 2026 is $490 for adults. Processing times vary. You will be asked to provide identity documents, proof of residence, and passport photos.",
    links: [
      { label: "ImmiAccount", url: "https://immi.homeaffairs.gov.au/immiaccount" },
      { label: "DFAT for document certification", url: "https://www.dfat.gov.au" },
    ],
  },
  {
    num: 4,
    heading: "The Ceremony",
    content:
      "If your application is approved you will be invited to an Australian Citizenship Ceremony. You will make the Australian Citizenship Pledge. You receive your certificate at the ceremony. Ceremonies are run by local councils.",
    links: [{ label: "homeaffairs.gov.au/citizenship/ceremony", url: "https://www.homeaffairs.gov.au/citizenship/ceremony" }],
  },
  {
    num: 5,
    heading: "What unlocks",
    content: "",
    links: [],
    unlocks: [
      {
        title: "myID",
        desc: "Your myID identity strength increases with your citizenship certificate. This improves access to government services online.",
        link: { label: "myid.gov.au", url: "https://www.myid.gov.au" },
      },
      {
        title: "Passport",
        desc: "You can now apply for an Australian passport. First-time adult applications take approximately six weeks standard processing. Use VFS Global for applications overseas.",
        link: { label: "passports.gov.au", url: "https://www.passports.gov.au" },
      },
      {
        title: "Electoral Roll",
        desc: "Enrolment is mandatory for Australian citizens aged 18 and over. You must enrol within 8 weeks of becoming a citizen. Failing to vote when enrolled carries a fine.",
        link: { label: "AEC enrol", url: "https://www.aec.gov.au/enrol" },
      },
      {
        title: "Jury Duty",
        desc: "As a citizen you may be called for jury duty. This is a civic obligation, not optional. Employers must allow you to attend. You receive a daily payment for attending.",
        link: { label: "australiangovernment.gov.au", url: "https://www.australia.gov.au" },
      },
    ],
  },
];

// ─── Emergency numbers ────────────────────────────────────────────────────────
const EMERGENCY_NUMBERS = [
  { number: "000",           label: "Police, fire, ambulance",    desc: "Any phone." },
  { number: "112",           label: "Mobile emergency",           desc: "No signal needed." },
  { number: "13 11 14",      label: "Lifeline",                   desc: "Crisis support 24hr." },
  { number: "1800 737 732",  label: "1800RESPECT",                desc: "Family violence." },
  { number: "131 114",       label: "Poisons Information",        desc: "24hr." },
  { number: "132 500",       label: "State Emergency Service",    desc: "" },
  { number: "131 444",       label: "Police assistance",          desc: "Non-emergency." },
  { number: "1300 22 4636",  label: "Beyond Blue",                desc: "Mental health." },
  { number: "1800 551 800",  label: "Kids Helpline",              desc: "5 to 25 years." },
  { number: "1800 422 322",  label: "Suicide Call Back Service",  desc: "" },
];

// ─── ID Checker docs ──────────────────────────────────────────────────────────
const ID_DOCS = [
  { id: "au_passport",    label: "Australian passport",                    points: 70 },
  { id: "au_birth",       label: "Australian birth certificate",            points: 70 },
  { id: "au_citizenship", label: "Australian citizenship certificate",       points: 70 },
  { id: "au_licence",     label: "Australian driver's licence",              points: 40 },
  { id: "medicare",       label: "Medicare card",                           points: 25 },
  { id: "centrelink",     label: "Centrelink health care card",             points: 25 },
  { id: "bank_card",      label: "Bank card with signature",                points: 25 },
  { id: "utility",        label: "Utility bill with name and address",      points: 25 },
  { id: "council_rates",  label: "Council rates notice",                    points: 25 },
  { id: "ato_notice",     label: "ATO notice of assessment",                points: 25 },
];

// ─── Cluster icon ─────────────────────────────────────────────────────────────
function ClusterIcon({ id, color }: { id: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    money: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 7v1M12 16v1M9.5 9.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2.5c0 1.2-1 1.8-2.5 2.2C10.5 12.5 9.5 13.2 9.5 14.5c0 1.2 1 2 2.5 2s2.5-.9 2.5-2"
          stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    home: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M3 9.5L12 2l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1z"/>
        <path d="M9 22v-9h6v9" fill="rgba(255,255,255,0.25)"/>
      </svg>
    ),
    health: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/>
      </svg>
    ),
    civic: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M3 8h18l-9-5z"/>
        <rect x="3" y="19" width="18" height="2" rx="0.5"/>
        <rect x="4.5" y="8" width="2" height="11"/>
        <rect x="8.5" y="8" width="2" height="11"/>
        <rect x="13.5" y="8" width="2" height="11"/>
        <rect x="17.5" y="8" width="2" height="11"/>
      </svg>
    ),
    new: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12" r="10"/>
        <polygon points="12,5 14,11 12,10.5 10,11" fill="white"/>
        <polygon points="12,19 10,13 12,13.5 14,13" fill="rgba(255,255,255,0.4)"/>
        <line x1="5" y1="12" x2="7.5" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
        <line x1="16.5" y1="12" x2="19" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
        <circle cx="12" cy="12" r="1.5" fill="rgba(0,0,0,0.3)"/>
      </svg>
    ),
    business: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <rect x="2" y="9" width="20" height="13" rx="2"/>
        <path d="M8 9V7.5a4 4 0 018 0V9" fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <rect x="10" y="14" width="4" height="2" rx="1" fill="rgba(255,255,255,0.35)"/>
      </svg>
    ),
    employment: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <rect x="5" y="3" width="14" height="18" rx="2"/>
        <rect x="9" y="3" width="6" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
        <circle cx="12" cy="12" r="2.5" fill="rgba(255,255,255,0.3)"/>
        <rect x="7.5" y="16" width="9" height="1.5" rx="0.75" fill="rgba(255,255,255,0.35)"/>
      </svg>
    ),
    consumer: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l8 3v5.5c0 5.5-3.5 9.5-8 11-4.5-1.5-8-5.5-8-11V5z"/>
        <path d="M9 12l2.5 2.5L15 9" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    education: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M12 3L2 8l10 6 10-6z"/>
        <path d="M6 11.5v4.5c0 2 2.7 4 6 4s6-2 6-4v-4.5" fill={color} opacity="0.7"/>
        <rect x="19.5" y="8" width="2" height="7" rx="1"/>
        <circle cx="20.5" cy="16.5" r="1.5"/>
      </svg>
    ),
    govjobs: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M3 8.5h18l-9-5z"/>
        <rect x="3" y="18" width="18" height="3" rx="0.5"/>
        <rect x="4.5" y="8.5" width="2" height="9.5"/>
        <rect x="8.5" y="8.5" width="2" height="9.5"/>
        <rect x="13.5" y="8.5" width="2" height="9.5"/>
        <rect x="17.5" y="8.5" width="2" height="9.5"/>
      </svg>
    ),
    students: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M2 6h10v15.5C9 20.5 5 19.5 2 17.5V6z" opacity="0.75"/>
        <path d="M22 6H12v15.5c3-1 7-2 10-4V6z"/>
        <line x1="12" y1="6" x2="12" y2="21.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      </svg>
    ),
    volunteering: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <rect x="7" y="12" width="10" height="9" rx="2"/>
        <path d="M8 12V9a1.5 1.5 0 013 0v3M11 11.5V8a1.5 1.5 0 013 0v3.5M14 11V9a1.5 1.5 0 013 0v3"/>
        <path d="M12 16.5c0 0-2-1.5-2-2.8a2 2 0 014 0c0 1.3-2 2.8-2 2.8z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    citizenship: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
  };
  return (
    <div style={{ width: 52, height: 52, borderRadius: 14, background: color + "1F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {icons[id] || <svg width="28" height="28" viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="10"/></svg>}
    </div>
  );
}

// ─── CTA button ───────────────────────────────────────────────────────────────
function CtaButton({ onClick, children, variant = "dark" }: { onClick?: () => void; children: React.ReactNode; variant?: "dark" | "cerulean" }) {
  const [hov, setHov] = useState(false);
  const bg = variant === "cerulean"
    ? (hov ? C.navy : C.cerulean)
    : (hov ? C.cerulean : C.navy);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: bg, color: C.cream, borderRadius: 32, padding: "16px 40px", fontFamily: SANS, fontWeight: 500, fontSize: 16, border: "none", cursor: "pointer", transition: "background 0.2s" }}
    >
      {children}
    </button>
  );
}

// ─── Cerulean link button ─────────────────────────────────────────────────────
function CerBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${C.cerulean}`, color: hov ? C.white : C.cerulean, background: hov ? C.cerulean : "transparent", fontFamily: SANS, fontWeight: 500, fontSize: 13, textDecoration: "none", transition: "all 0.15s" }}
    >
      {children}
      <ExternalLink style={{ width: 11, height: 11 }} />
    </a>
  );
}

// ─── Tool input ───────────────────────────────────────────────────────────────
function ToolInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontFamily: SANS, fontSize: 13, fontWeight: 400, color: C.grey, marginBottom: 6 }}>{label}</label>
      <input
        type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", border: `1.5px solid ${focused ? C.cerulean : "#E8E0D0"}`, borderRadius: 12, padding: "12px 16px", fontFamily: SANS, fontSize: 15, color: C.navy, background: C.white, boxSizing: "border-box", outline: "none", transition: "border-color 0.15s" }}
      />
    </div>
  );
}

// ─── Tool output row ──────────────────────────────────────────────────────────
function ToolOutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
      <span style={{ fontFamily: SANS, fontSize: 13, color: C.grey }}>{label}</span>
      <span style={{ fontFamily: SERIF, fontSize: 24, color: C.navy }}>{value}</span>
    </div>
  );
}

// ─── Freelance day rate tool ───────────────────────────────────────────────────
function FreelanceTool() {
  const [income, setIncome] = useState("");
  const [weeks, setWeeks]   = useState("48");
  const [days, setDays]     = useState("5");
  const inc = parseFloat(income), wk = parseFloat(weeks), dy = parseFloat(days);
  const dayRate = (inc > 0 && wk > 0 && dy > 0) ? inc / (wk * dy) : null;
  const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-AU")}`;
  return (
    <div>
      <ToolInput label="Annual income target ($)" value={income} onChange={setIncome} placeholder="e.g. 100000" />
      <ToolInput label="Billable weeks per year" value={weeks} onChange={setWeeks} placeholder="e.g. 48" />
      <ToolInput label="Days per week" value={days} onChange={setDays} placeholder="e.g. 5" />
      {dayRate !== null && !isNaN(dayRate) && (
        <div style={{ background: "#F0F7FA", borderRadius: 12, padding: 20, marginTop: 4 }}>
          <ToolOutputRow label="Day rate" value={fmt(dayRate)} />
          <ToolOutputRow label="Hourly rate (8hr day)" value={fmt(dayRate / 8)} />
          <ToolOutputRow label="Monthly equivalent" value={fmt(inc / 12)} />
          <p style={{ fontFamily: MONO, fontSize: 11, color: C.grey, marginTop: 12, lineHeight: 1.6 }}>Assumes you pay your own tax and super from this rate. This is before expenses.</p>
        </div>
      )}
    </div>
  );
}

// ─── Loan repayment tool ──────────────────────────────────────────────────────
function LoanTool() {
  const [amount, setAmount] = useState("");
  const [rate, setRate]     = useState("");
  const [term, setTerm]     = useState("");
  const P = parseFloat(amount), rAnn = parseFloat(rate), yrs = parseFloat(term);
  const r = rAnn / 100 / 12, n = yrs * 12;
  const monthly = (P > 0 && r > 0 && n > 0) ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : null;
  const total = monthly ? monthly * n : null;
  const interest = total ? total - P : null;
  const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-AU")}`;
  return (
    <div>
      <ToolInput label="Loan amount ($)" value={amount} onChange={setAmount} placeholder="e.g. 25000" />
      <ToolInput label="Annual interest rate (%)" value={rate} onChange={setRate} placeholder="e.g. 6.5" />
      <ToolInput label="Loan term (years)" value={term} onChange={setTerm} placeholder="e.g. 5" />
      {monthly !== null && !isNaN(monthly) && monthly > 0 && (
        <div style={{ background: "#F0F7FA", borderRadius: 12, padding: 20, marginTop: 4 }}>
          <ToolOutputRow label="Monthly repayment" value={fmt(monthly)} />
          <ToolOutputRow label="Total amount repaid" value={fmt(total!)} />
          <ToolOutputRow label="Total interest paid" value={fmt(interest!)} />
          <a href="https://moneysmart.gov.au/loans/personal-loans" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 4, color: C.cerulean, fontFamily: SANS, fontSize: 13, fontWeight: 500, textDecoration: "none", marginTop: 12 }}>
            MoneySmart loan calculator <ExternalLink style={{ width: 11, height: 11 }} />
          </a>
        </div>
      )}
    </div>
  );
}

// ─── 100 point ID checker ─────────────────────────────────────────────────────
function IDTool() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    const s = new Set(checked);
    s.has(id) ? s.delete(id) : s.add(id);
    setChecked(s);
  };
  const total = Array.from(checked).reduce((sum, id) => {
    const doc = ID_DOCS.find((d) => d.id === id);
    return sum + (doc?.points ?? 0);
  }, 0);
  return (
    <div>
      <p style={{ fontFamily: SANS, fontSize: 13, color: C.grey, marginBottom: 12 }}>Select the documents you have. Points add up as you tick.</p>
      {ID_DOCS.map((doc) => (
        <label key={doc.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F0EAD6", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="checkbox" checked={checked.has(doc.id)} onChange={() => toggle(doc.id)}
              style={{ width: 17, height: 17, accentColor: C.cerulean, cursor: "pointer", flexShrink: 0 }} />
            <span style={{ fontFamily: SANS, fontSize: 14, color: C.navy }}>{doc.label}</span>
          </div>
          <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.cerulean, marginLeft: 12, flexShrink: 0 }}>{doc.points} pts</span>
        </label>
      ))}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <div style={{ fontFamily: SERIF, fontSize: 40, color: C.navy }}>{total} points</div>
        <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: total >= 100 ? C.auGreen : C.grey, marginTop: 6 }}>
          {total >= 100 ? "You have enough for most 100-point checks." : `You need ${100 - total} more points.`}
        </div>
        <p style={{ fontFamily: MONO, fontSize: 11, color: C.grey, marginTop: 8, lineHeight: 1.6 }}>Requirements vary by organisation. Always confirm which documents they will accept.</p>
      </div>
    </div>
  );
}

// ─── Guide cluster card ───────────────────────────────────────────────────────
function GuideClusterCard({ cluster }: { cluster: Cluster }) {
  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const toggle = (name: string) => setOpenGuide(openGuide === name ? null : name);
  return (
    <div style={{ background: C.white, borderRadius: cardRadius, boxShadow: cardShadow, padding: 28, breakInside: "avoid", marginBottom: 24 }}>
      <ClusterIcon id={cluster.id} color={cluster.color} />
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 17, color: C.navy, marginTop: 14 }}>{cluster.name}</div>
      <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 13, color: C.grey, marginTop: 4, lineHeight: 1.5 }}>{cluster.description}</div>
      <div style={{ height: 1, background: "#E8E0D0", margin: "16px 0" }} />
      {cluster.guides.map((guide) => (
        <div key={guide.name} style={{ borderBottom: "1px solid #F0EAD6" }}>
          <button
            onClick={() => toggle(guide.name)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px 0", cursor: "pointer", background: "none", border: "none" }}
          >
            <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 14, color: C.cerulean, textAlign: "left" }}>{guide.name}</span>
            <ChevronRight style={{ width: 14, height: 14, color: C.cerulean, flexShrink: 0, transform: openGuide === guide.name ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          <AnimatePresence>
            {openGuide === guide.name && (
              <motion.div key={guide.name} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                <div style={{ background: "#F7F6F2", borderRadius: 12, padding: 16, marginBottom: 10 }}>
                  <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 14, color: C.navy, lineHeight: 1.65 }}>{guide.description}</p>
                  <p style={{ fontFamily: MONO, fontSize: 11, color: C.grey, marginTop: 8 }}>Last reviewed May 2026. Always check the official source linked below.</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                    {guide.links.map((link) => (
                      <CerBtn key={link.label} href={link.url}>{link.label}</CerBtn>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Reference tile card ──────────────────────────────────────────────────────
function RefTileCard({ tile }: { tile: RefTileData }) {
  const [open, setOpen]   = useState(false);
  const [phTab, setPhTab] = useState("NSW");
  return (
    <div style={{ background: C.navy, borderRadius: cardRadius, boxShadow: "0 4px 28px rgba(15,23,42,0.18)", overflow: "hidden" }}>
      <div style={{ height: 4, background: tile.stripe }} />
      <div style={{ padding: 28 }}>
        <h3 style={{ fontFamily: SERIF, fontSize: 22, color: C.cream, lineHeight: 1.2 }}>{tile.title}</h3>
        <p style={{ fontFamily: SANS, fontSize: 13, color: C.darkSec, marginTop: 6, lineHeight: 1.5 }}>{tile.description}</p>
        <button
          onClick={() => setOpen(!open)}
          style={{ display: "inline-flex", alignItems: "center", gap: 4, color: C.cerulean, fontFamily: SANS, fontWeight: 500, fontSize: 13, background: "none", border: "none", cursor: "pointer", marginTop: 16, padding: 0 }}
        >
          {open ? "Read less" : "Read more"}
          <ChevronDown style={{ width: 14, height: 14, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: "hidden" }}>
              <div style={{ marginTop: 16 }}>
                {tile.id === "holidays" && tile.holidays ? (
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
                      {Object.keys(tile.holidays).map((state) => (
                        <button key={state} onClick={() => setPhTab(state)}
                          style={{ padding: "4px 10px", borderRadius: 6, fontFamily: SANS, fontSize: 12, fontWeight: phTab === state ? 600 : 400, background: phTab === state ? C.cerulean : "rgba(255,255,255,0.1)", color: phTab === state ? C.white : C.darkSec, border: "none", cursor: "pointer" }}>
                          {state}
                        </button>
                      ))}
                    </div>
                    {tile.holidays[phTab]?.map((h) => (
                      <div key={h.date + h.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        <span style={{ fontFamily: MONO, fontSize: 12, color: C.darkSec }}>{h.date}</span>
                        <span style={{ fontFamily: SANS, fontSize: 13, color: C.cream }}>{h.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontFamily: SANS, fontSize: 14, color: C.darkSec, lineHeight: 1.75, whiteSpace: "pre-line" }}>{tile.content}</p>
                )}
                {tile.source && (
                  <p style={{ fontFamily: MONO, fontSize: 11, color: "#6B6B5E", marginTop: 14 }}>{tile.source}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  const [scrollY, setScrollY]       = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCit, setOpenCit]       = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrolled  = scrollY > 50;
  const showTop   = scrollY > 400;

  const navLinks = [
    { label: "Home",        id: "home" },
    { label: "Guides",      id: "guides" },
    { label: "Tools",       id: "tools" },
    { label: "Reference",   id: "reference" },
    { label: "Citizenship", id: "citizenship" },
    { label: "How It Works",id: "how-it-works" },
    { label: "Contact",     id: "contact" },
  ];

  return (
    <div style={{ fontFamily: SANS, background: C.white, color: C.navy, overflowX: "hidden" }}>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, backdropFilter: scrolled ? "blur(14px)" : "none", background: scrolled ? "rgba(250,246,232,0.93)" : "transparent", transition: "background 0.3s, backdrop-filter 0.3s", borderBottom: scrolled ? "1px solid rgba(15,23,42,0.07)" : "none" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => scrollTo("home")} style={{ fontFamily: SERIF, fontSize: 22, color: C.navy, background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "-0.01em" }}>
            kindd
          </button>
          <div className="hidden lg:flex items-center" style={{ gap: 24 }}>
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                style={{ fontFamily: SANS, fontWeight: 500, fontSize: 14, color: C.navy, letterSpacing: "0.02em", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {l.label}
              </button>
            ))}
            <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer"
              style={{ fontFamily: SANS, fontWeight: 500, fontSize: 14, color: C.cerulean, letterSpacing: "0.02em", textDecoration: "none" }}>
              Part of Breza + You
            </a>
          </div>
          <button className="flex lg:hidden" onClick={() => setMobileOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.navy, padding: 4 }}>
            <Menu style={{ width: 24, height: 24 }} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.25 }}
            style={{ position: "fixed", inset: 0, background: C.white, zIndex: 100, padding: 24, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
              <span style={{ fontFamily: SERIF, fontSize: 22, color: C.navy }}>kindd</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.navy }}>
                <X style={{ width: 24, height: 24 }} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  style={{ fontFamily: SANS, fontWeight: 500, fontSize: 19, color: C.navy, background: "none", border: "none", borderBottom: `1px solid ${C.offCream}`, cursor: "pointer", textAlign: "left", padding: "14px 0" }}>
                  {l.label}
                </button>
              ))}
              <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer"
                style={{ fontFamily: SANS, fontWeight: 500, fontSize: 19, color: C.cerulean, textDecoration: "none", padding: "14px 0" }}>
                Part of Breza + You
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── S1: HERO ────────────────────────────────────────────────────────── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <img src={heroImg} alt="Australian suburban street" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(250,246,232,0.72) 0%, rgba(250,246,232,0.28) 48%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 820, padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontFamily: SERIF, fontSize: "clamp(28px, 3.5vw, 52px)", color: C.navy, marginBottom: 14, letterSpacing: "-0.01em" }}>kindd</div>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 5.5vw, 68px)", color: C.navy, lineHeight: 1.06, marginBottom: 22, letterSpacing: "-0.02em" }}>
            You are one of our kind.
          </h1>
          <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 18, color: C.grey, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.65 }}>
            A plain-language guide to Australian life. Sourced from government. Updated monthly. Always free.
          </p>
          <CtaButton onClick={() => scrollTo("guides")}>Browse the guides.</CtaButton>
        </div>
        <AnimatePresence>
          {scrollY < 120 && (
            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}
              animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)" }}>
              <ChevronDown style={{ width: 28, height: 28, color: C.grey }} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── S2: PREMISE ─────────────────────────────────────────────────────── */}
      <section style={{ background: C.offCream, padding: "96px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 4vw, 46px)", color: C.navy, marginBottom: 36 }}>Why KINDD exists.</h2>
          <div style={{ maxWidth: 660, display: "flex", flexDirection: "column", gap: 22 }}>
            <p style={{ fontFamily: SANS, fontSize: 18, color: C.grey, lineHeight: 1.75 }}>Adult life in Australia comes with no manual. There are forms to fill. Bodies to call. Rights you have but were never told about. Money you might be owed. Doors you did not know to knock on.</p>
            <p style={{ fontFamily: SANS, fontSize: 18, color: C.grey, lineHeight: 1.75 }}>KINDD points you to the right door. Plain-language guides covering tax, renting, health, family, neighbours, money, voting, citizenship, and more. We do not give advice. We tell you where to go and what to ask when you get there.</p>
            <p style={{ fontFamily: SANS, fontSize: 18, color: C.grey, lineHeight: 1.75 }}>Every word here came from a government source. Every link goes back to one. Updated monthly. Free forever. No account. No catch.</p>
          </div>
        </div>
      </section>

      {/* ── S3: GUIDES ──────────────────────────────────────────────────────── */}
      <section id="guides" style={{ background: C.cream, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4vw, 52px)", color: C.navy, textAlign: "center", marginBottom: 10 }}>Guides.</h2>
          <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 17, color: C.grey, textAlign: "center", marginBottom: 6 }}>
            Plain language. Government sources. Updated monthly.
          </p>
          <p style={{ fontFamily: MONO, fontSize: 12, color: C.grey, textAlign: "center", marginBottom: 48 }}>
            All guides last reviewed May 2026. Always check the official government source linked in each guide.
          </p>
          <div className="columns-1 sm:columns-2 xl:columns-3" style={{ columnGap: 24 }}>
            {clusters.map((cluster) => (
              <GuideClusterCard key={cluster.id} cluster={cluster} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: TOOLS ───────────────────────────────────────────────────────── */}
      <section id="tools" style={{ background: C.white, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4vw, 52px)", color: C.navy, textAlign: "center", marginBottom: 10 }}>Three tools we built ourselves.</h2>
          <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 17, color: C.grey, textAlign: "center", marginBottom: 56 }}>All indicators. Not financial, legal, or tax advice. Every tool tells you exactly what it is before you use it.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

            {/* Tool 1: Freelance Day Rate */}
            <div style={{ background: C.white, borderRadius: cardRadius, boxShadow: "0 4px 28px rgba(15,23,42,0.13)", padding: 36 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ marginBottom: 20 }}>
                <rect x="15" y="6" width="50" height="68" rx="6" fill={C.navy}/>
                <rect x="22" y="16" width="36" height="4" rx="2" fill="rgba(250,246,232,0.18)"/>
                <rect x="22" y="24" width="26" height="3" rx="1.5" fill="rgba(250,246,232,0.12)"/>
                <rect x="22" y="31" width="30" height="3" rx="1.5" fill="rgba(250,246,232,0.12)"/>
                <rect x="22" y="47" width="36" height="17" rx="4" fill={C.cerulean} opacity="0.18"/>
                <text x="40" y="59" textAnchor="middle" fontFamily="serif" fontSize="10" fill={C.cerulean}>$640 / day</text>
              </svg>
              <h3 style={{ fontFamily: SERIF, fontSize: 26, color: C.navy, marginBottom: 8 }}>Freelance Day Rate Calculator</h3>
              <p style={{ fontFamily: SANS, fontSize: 14, color: C.grey, marginBottom: 16, lineHeight: 1.5 }}>Enter your annual income target and working pattern to estimate your day rate.</p>
              <div style={{ background: "#F7F6F2", borderRadius: 10, padding: 14, marginBottom: 20 }}>
                <p style={{ fontFamily: MONO, fontSize: 11, color: C.grey, lineHeight: 1.6 }}>{TOOL_DISCLAIMER}</p>
              </div>
              <FreelanceTool />
            </div>

            {/* Tool 2: Loan Repayment */}
            <div style={{ background: C.white, borderRadius: cardRadius, boxShadow: "0 4px 28px rgba(15,23,42,0.13)", padding: 36 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ marginBottom: 20 }}>
                <path d="M10 68 Q40 8 70 68" stroke={C.navy} strokeWidth="3" strokeLinecap="round"/>
                <line x1="10" y1="70" x2="70" y2="70" stroke={C.navy} strokeWidth="1.5" opacity="0.3"/>
                <circle cx="10" cy="68" r="5" fill={C.navy}/>
                <circle cx="70" cy="68" r="5" fill={C.cerulean}/>
                <polyline points="28,54 40,24 52,54" stroke={C.cerulean} strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
              </svg>
              <h3 style={{ fontFamily: SERIF, fontSize: 26, color: C.navy, marginBottom: 8 }}>Loan Repayment Estimator</h3>
              <p style={{ fontFamily: SANS, fontSize: 14, color: C.grey, marginBottom: 16, lineHeight: 1.5 }}>Enter a loan amount, interest rate, and term to estimate monthly repayments.</p>
              <div style={{ background: "#F7F6F2", borderRadius: 10, padding: 14, marginBottom: 20 }}>
                <p style={{ fontFamily: MONO, fontSize: 11, color: C.grey, lineHeight: 1.6 }}>{TOOL_DISCLAIMER}</p>
              </div>
              <LoanTool />
            </div>

            {/* Tool 3: 100 Point ID */}
            <div style={{ background: C.white, borderRadius: cardRadius, boxShadow: "0 4px 28px rgba(15,23,42,0.13)", padding: 36 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ marginBottom: 20 }}>
                <rect x="18" y="6" width="44" height="68" rx="6" fill={C.navy}/>
                <rect x="26" y="16" width="28" height="3" rx="1.5" fill="rgba(250,246,232,0.15)"/>
                <rect x="26" y="23" width="20" height="3" rx="1.5" fill="rgba(250,246,232,0.1)"/>
                <rect x="26" y="30" width="24" height="3" rx="1.5" fill="rgba(250,246,232,0.08)"/>
                <path d="M27 52l10 10 18-18" stroke={C.cerulean} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 style={{ fontFamily: SERIF, fontSize: 26, color: C.navy, marginBottom: 8 }}>100 Point ID Checker</h3>
              <p style={{ fontFamily: SANS, fontSize: 14, color: C.grey, marginBottom: 16, lineHeight: 1.5 }}>Tick the documents you have to see if you meet the 100-point identification threshold.</p>
              <div style={{ background: "#F7F6F2", borderRadius: 10, padding: 14, marginBottom: 20 }}>
                <p style={{ fontFamily: MONO, fontSize: 11, color: C.grey, lineHeight: 1.6 }}>{TOOL_DISCLAIMER}</p>
              </div>
              <IDTool />
            </div>

          </div>
        </div>
      </section>

      {/* ── S5: CITIZENSHIP ─────────────────────────────────────────────────── */}
      <section id="citizenship" style={{ background: C.cream, padding: "96px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4vw, 52px)", color: C.navy, textAlign: "center", marginBottom: 10 }}>Citizenship and coming to Australia.</h2>
          <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 17, color: C.grey, textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
            A plain-language guide to the pathway. Not immigration advice. For your individual situation, see a registered migration agent.
          </p>

          {/* Stage circles */}
          <div className="flex flex-col lg:flex-row" style={{ gap: 0, marginBottom: 24 }}>
            {CITIZENSHIP_STAGES.map((stage, i) => (
              <div key={stage.num} className="flex lg:flex-col" style={{ flex: 1, alignItems: "flex-start", position: "relative" }}>
                {i < CITIZENSHIP_STAGES.length - 1 && (
                  <div className="hidden lg:block" style={{ position: "absolute", top: 23, left: "calc(50% + 26px)", right: 0, height: 2, background: "#E8E0D0" }} />
                )}
                <button onClick={() => setOpenCit(openCit === stage.num ? null : stage.num)}
                  className="flex lg:flex-col"
                  style={{ alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "0 0 16px", width: "100%", justifyContent: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: openCit === stage.num ? C.auGold : "#F0EAD6", border: `2px solid ${openCit === stage.num ? C.auGold : "#E8E0D0"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, transition: "all 0.2s" }}>
                    <span style={{ fontFamily: SERIF, fontSize: 20, color: openCit === stage.num ? C.navy : C.grey }}>{stage.num}</span>
                  </div>
                  <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 15, color: C.navy }}>{stage.heading}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Expanded stage content */}
          <AnimatePresence>
            {openCit !== null && (() => {
              const stage = CITIZENSHIP_STAGES.find((s) => s.num === openCit);
              if (!stage) return null;
              return (
                <motion.div key={openCit} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                  <div style={{ background: C.white, borderRadius: 16, padding: 32, boxShadow: "0 2px 16px rgba(15,23,42,0.07)", marginBottom: 8 }}>
                    {stage.content && (
                      <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 16, color: C.navy, lineHeight: 1.72, marginBottom: stage.links.length > 0 ? 20 : 0 }}>{stage.content}</p>
                    )}
                    {stage.links.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: stage.unlocks ? 28 : 0 }}>
                        {stage.links.map((l) => <CerBtn key={l.label} href={l.url}>{l.label}</CerBtn>)}
                      </div>
                    )}
                    {stage.unlocks && (
                      <div>
                        <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: 15, color: C.navy, marginBottom: 16 }}>Four things citizenship unlocks:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
                          {stage.unlocks.map((u) => (
                            <div key={u.title} style={{ background: C.cream, borderRadius: 12, padding: 20 }}>
                              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 15, color: C.navy, marginBottom: 6 }}>{u.title}</div>
                              <p style={{ fontFamily: SANS, fontSize: 14, color: C.grey, lineHeight: 1.65, marginBottom: 12 }}>{u.desc}</p>
                              <CerBtn href={u.link.url}>{u.link.label}</CerBtn>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* ── S6: EMERGENCY NUMBERS ───────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: "64px 24px", borderTop: `4px solid ${C.signalGreen}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 36, color: C.cream, textAlign: "center", marginBottom: 48 }}>Save these. Share these.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 32 }}>
            {EMERGENCY_NUMBERS.map((n) => (
              <div key={n.number} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: SERIF, fontSize: 32, color: C.cream, lineHeight: 1.1 }}>{n.number}</div>
                <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 13, color: C.darkSec, marginTop: 6 }}>{n.label}</div>
                {n.desc && <div style={{ fontFamily: SANS, fontWeight: 300, fontSize: 12, color: C.darkSec, marginTop: 3 }}>{n.desc}</div>}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: MONO, fontSize: 11, color: C.darkSec, textAlign: "center", marginTop: 48 }}>
            In immediate danger, always call 000 first.
          </p>
        </div>
      </section>

      {/* ── S7: ABOUT AUSTRALIA ─────────────────────────────────────────────── */}
      <section id="reference" style={{ background: C.white, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4vw, 52px)", color: C.navy, textAlign: "center", marginBottom: 10 }}>About Australia.</h2>
          <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 17, color: C.grey, textAlign: "center", marginBottom: 56 }}>
            Hard-coded facts. Sourced from official government records. Updated when they change.
          </p>

          {/* Map placeholder */}
          <div style={{ maxWidth: 800, margin: "0 auto 56px", borderRadius: 16, background: "#1A2A3A", height: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
            <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 14, color: C.darkSec, textAlign: "center", maxWidth: 480, lineHeight: 1.7 }}>
              Interactive Australia map coming soon. Each state will show local facts, public holidays, and key contacts.
            </p>
          </div>

          {/* Reference tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {referenceTiles.map((tile) => (
              <RefTileCard key={tile.id} tile={tile} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S8: HOW KINDD WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: C.cream, padding: "96px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 4vw, 46px)", color: C.navy, textAlign: "center", marginBottom: 48 }}>Three things to know before you start.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 32 }}>
            {[
              {
                heading: "Free forever.",
                body: "No login. No account. No tier. Cookies clear, you start fresh. That is the whole arrangement.",
              },
              {
                heading: "Government sources only.",
                body: "ATO, Services Australia, Fair Trading, Healthdirect, every state tribunal. Linked at the end of every guide. Last updated date shown.",
              },
              {
                heading: "Directions not advice.",
                body: "We are not lawyers, accountants, or doctors. We are the person who knows which door to knock on. Once you find the door, the experts on the other side take it from there.",
              },
            ].map((block) => (
              <div key={block.heading} style={{ borderTop: "3px solid #E8E0D0", paddingTop: 24 }}>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, color: C.navy, marginBottom: 12 }}>{block.heading}</h3>
                <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 16, color: C.grey, lineHeight: 1.7 }}>{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S9: FOR THE PEOPLE ──────────────────────────────────────────────── */}
      <section style={{ background: C.white, padding: "96px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 4vw, 46px)", color: C.navy, marginBottom: 40, lineHeight: 1.1 }}>For the people no one wrote a manual for.</h2>
          {[
            "For the freelancer who just got their first invoice and does not know what to do with it.",
            "For the renter staring at a leaky ceiling and a quiet landlord.",
            "For the parent looking for somewhere free for the kids on Saturday.",
            "For the new citizen working out how Medicare actually works.",
            "For the small business owner who got a Centrelink letter and panicked.",
            "For the tradie whose neighbour just took down a shared fence without asking.",
            "For anyone who has ever Googled something at 11pm and ended up on a forum from 2014.",
          ].map((line) => (
            <p key={line} style={{ fontFamily: SANS, fontWeight: 400, fontSize: 19, color: C.grey, lineHeight: 1.6, marginBottom: 18 }}>{line}</p>
          ))}
          <div style={{ marginTop: 56 }}>
            <p style={{ fontFamily: SERIF, fontSize: 36, color: C.navy, marginBottom: 0 }}>KINDD is for them.</p>
            <p style={{ fontFamily: SERIF, fontSize: 36, color: C.navy }}>KINDD is for you.</p>
          </div>
        </div>
      </section>

      {/* ── S10: ALWAYS FREE ────────────────────────────────────────────────── */}
      <section style={{ background: C.cream, padding: "96px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 4vw, 40px)", color: C.navy, marginBottom: 24, lineHeight: 1.15 }}>It costs nothing. It will always cost nothing.</h2>
          <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 18, color: C.grey, lineHeight: 1.75, marginBottom: 40 }}>
            KINDD is free because some things should be open. Tax. Tenancy. Health. Mental health. The basics of being an adult here. None of that should sit behind a paywall. No tier. No upgrade. No premium. Just the guides.
          </p>
          <CtaButton onClick={() => scrollTo("guides")}>Start with a guide.</CtaButton>
        </div>
      </section>

      {/* ── S11: DISCLAIMER ─────────────────────────────────────────────────── */}
      <section style={{ background: C.offCream, padding: "64px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 28, color: C.navy, marginBottom: 28 }}>Before you use KINDD.</h2>
          {[
            "Information here was last updated May 2026. Always check the official government website linked at the end of each guide for the most current details.",
            "KINDD is not a substitute for professional advice. For tax, see a registered tax agent. For legal matters, see a lawyer or your local community legal centre. For medical concerns, see a doctor. For immigration and citizenship matters, see a registered migration agent.",
            "KINDD points you to the right place. The experts there take it from there.",
          ].map((para, i) => (
            <p key={i} style={{ fontFamily: MONO, fontSize: 13, color: C.grey, lineHeight: 1.7, marginBottom: 18 }}>{para}</p>
          ))}
        </div>
      </section>

      {/* ── FOOTER — DO NOT MODIFY ───────────────────────────────────────────── */}
      <footer id="contact" className="bg-[#0F172A] text-[#FAF6E8] pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="text-4xl font-bold tracking-tighter">kindd</div>
            <div className="text-xl text-[#B8D4E8]">You are one of our kind.</div>
          </div>
          <div className="space-y-8 mb-16">
            <div className="text-sm text-[#6B6B5E] leading-relaxed">
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">compyr</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">alertss</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">turnd</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">yourrr</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">novlit</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">sharpend</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">moodframe</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">the outside eye</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">rostrr</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">platd</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">sortd</a> <span className="mx-2">·</span>
              <a href="#" className="hover:text-[#B8D4E8] transition-colors">earnt</a>
            </div>
            <div className="text-sm text-[#6B6B5E] leading-relaxed">
              <a href="https://tbcworldwide.com" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">tbcworldwide.com</a> <span className="mx-2">·</span>
              <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">brezaplusyou.com.au</a> <span className="mx-2">·</span>
              <a href="https://taracollective.org" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">taracollective.org</a> <span className="mx-2">·</span>
              <a href="https://celes13.com" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">celes13.com</a>
            </div>
            <div>
              <a href="mailto:connect@tbcworldwide.com" className="text-sm text-[#B8D4E8] hover:opacity-80 transition-opacity">connect@tbcworldwide.com</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-[#6B6B5E]/30 pt-8">
            <div className="flex items-center gap-4 text-[#FAF6E8]/40">
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#FAF6E8] transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
            <div className="text-xs text-[#6B6B5E] text-right space-y-2">
              <p>Part of <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" className="hover:text-[#B8D4E8] transition-colors">Breza + You</a>. Tech Division of TBC Worldwide. Free because some things should be.</p>
              <p>© 2026 KINDD. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── GO TO TOP ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo("home")}
            style={{ position: "fixed", bottom: 32, right: 32, width: 48, height: 48, borderRadius: "50%", background: C.white, border: "none", boxShadow: "0 2px 12px rgba(15,23,42,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, color: C.navy }}
          >
            <ArrowUp style={{ width: 20, height: 20 }} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
