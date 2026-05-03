import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, ArrowUp, Menu, X, Linkedin, Instagram, Twitter, Youtube, Search, Sparkles } from "lucide-react";
import { clusters } from "@/data/guides";
import { tools, DISCLAIMER, TAX_BRACKETS_RESIDENT, TAX_BRACKETS_NON_RESIDENT, MEDICARE_LEVY, PUBLIC_TRANSPORT_DATA, PARKING_FINES_DATA, WWC_DATA } from "@/data/tools";
import type { ToolId } from "@/data/tools";
import { referenceTiles } from "@/data/reference";

const heroImg = "/Kindd_Hero.png";

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  cream: "#FAF6E8",
  offCream: "#F0EAD6",
  warmWhite: "#F8F8F5",
  navy: "#0F172A",
  grey: "#6B6B5E",
  cerulean: "#007BA7",
  breeze: "#B8D4E8",
  white: "#FFFFFF",
  signalGreen: "rgba(163,230,53,0.60)",
};

// ─── Card style helper ────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: C.white,
  borderRadius: 16,
  boxShadow: "0 2px 16px rgba(15,23,42,0.07)",
};

// ─── Cerulean button classes ──────────────────────────────────────────────────
const ceruleanBtn = `inline-flex items-center px-4 py-2 rounded-lg border font-medium text-sm transition-colors`;
const ceruleanBtnStyle: React.CSSProperties = { borderColor: C.cerulean, color: C.cerulean, background: C.cream };
const ceruleanBtnHoverStyle: React.CSSProperties = { background: C.cerulean, color: C.white };

// ─── CTA button ──────────────────────────────────────────────────────────────
function CtaButton({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.cerulean : C.navy,
        color: C.cream,
        borderRadius: 32,
        padding: "16px 32px",
        fontWeight: 500,
        fontSize: "1.0625rem",
        transition: "background 0.2s",
        cursor: "pointer",
        border: "none",
      }}
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
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={hov ? { ...ceruleanBtnHoverStyle, borderRadius: 8, border: `1px solid ${C.cerulean}`, padding: "8px 16px", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", textDecoration: "none", transition: "all 0.15s" } : { ...ceruleanBtnStyle, borderRadius: 8, border: `1px solid ${C.cerulean}`, padding: "8px 16px", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", textDecoration: "none", transition: "all 0.15s" }}
    >
      {children}
    </a>
  );
}

// ─── SVG icons for clusters ───────────────────────────────────────────────────
function ClusterIcon({ name }: { name: string }) {
  const s = { stroke: C.navy, strokeWidth: 1.75, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "money": return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" {...s}/><path d="M16 9v14M12 12.5c0-1.93 1.79-3.5 4-3.5s4 1.57 4 3.5-1.79 3.5-4 3.5-4 1.57-4 3.5S13.79 23 16 23s4-1.57 4-3.5" {...s}/></svg>;
    case "home": return <svg width={32} height={32} viewBox="0 0 32 32"><path d="M5 14L16 4l11 10" {...s}/><path d="M8 11.5V26h16V11.5" {...s}/><rect x="12" y="18" width="8" height="8" {...s}/></svg>;
    case "health": return <svg width={32} height={32} viewBox="0 0 32 32"><path d="M16 27S5 20 5 12a6 6 0 0 1 11-3.36A6 6 0 0 1 27 12c0 8-11 15-11 15z" {...s}/><path d="M16 15v-4M14 13h4" {...s}/></svg>;
    case "civic": return <svg width={32} height={32} viewBox="0 0 32 32"><path d="M7 25h18M4 25l12-18 12 18" {...s}/><line x1="16" y1="7" x2="16" y2="4" {...s}/><path d="M10 25v-8h12v8" {...s}/></svg>;
    case "compass": return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" {...s}/><path d="M16 5v2M16 25v2M5 16h2M25 16h2" {...s}/><polygon points="16,11 20,16 16,21 12,16" {...s}/></svg>;
    case "briefcase": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="4" y="11" width="24" height="16" rx="2" {...s}/><path d="M11 11V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" {...s}/><line x1="4" y1="19" x2="28" y2="19" {...s}/></svg>;
    case "employment": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="5" y="8" width="14" height="18" rx="2" {...s}/><path d="M19 14h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4" {...s}/><line x1="9" y1="13" x2="15" y2="13" {...s}/><line x1="9" y1="17" x2="15" y2="17" {...s}/><line x1="9" y1="21" x2="12" y2="21" {...s}/></svg>;
    case "shield": return <svg width={32} height={32} viewBox="0 0 32 32"><path d="M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8l10-4z" {...s}/><path d="M12 16l3 3 5-5" {...s}/></svg>;
    case "graduation": return <svg width={32} height={32} viewBox="0 0 32 32"><polygon points="16,7 30,14 16,21 2,14" {...s}/><path d="M8 17.5V24c0 2 3.58 4 8 4s8-2 8-4v-6.5" {...s}/><line x1="30" y1="14" x2="30" y2="21" {...s}/></svg>;
    case "building": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="6" y="8" width="20" height="18" rx="1" {...s}/><path d="M6 8l10-4 10 4" {...s}/><rect x="11" y="16" width="4" height="5" {...s}/><rect x="17" y="16" width="4" height="5" {...s}/><line x1="6" y1="26" x2="26" y2="26" {...s}/></svg>;
    case "book": return <svg width={32} height={32} viewBox="0 0 32 32"><path d="M6 6h10v20H6z" {...s}/><path d="M16 6h10v20H16z" {...s}/><line x1="16" y1="6" x2="16" y2="26" {...s}/></svg>;
    default: return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" {...s}/></svg>;
  }
}

// ─── SVG icons for tools ──────────────────────────────────────────────────────
function ToolIcon({ name }: { name: string }) {
  const s = { stroke: C.navy, strokeWidth: 1.75, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "tax": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="7" y="4" width="18" height="24" rx="2" {...s}/><line x1="11" y1="10" x2="21" y2="10" {...s}/><line x1="11" y1="15" x2="21" y2="15" {...s}/><line x1="11" y1="20" x2="17" y2="20" {...s}/><text x="19" y="22" fontSize="7" fill={C.navy} stroke="none" fontWeight="600">$</text></svg>;
    case "calculator": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="7" y="4" width="18" height="24" rx="2" {...s}/><rect x="11" y="8" width="10" height="5" rx="1" {...s}/><circle cx="12" cy="18" r="1" fill={C.navy}/><circle cx="16" cy="18" r="1" fill={C.navy}/><circle cx="20" cy="18" r="1" fill={C.navy}/><circle cx="12" cy="23" r="1" fill={C.navy}/><circle cx="16" cy="23" r="1" fill={C.navy}/><circle cx="20" cy="23" r="1" fill={C.navy}/></svg>;
    case "loan": return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" {...s}/><path d="M10 10l12 12" {...s}/><circle cx="13" cy="13" r="2" {...s}/><circle cx="19" cy="19" r="2" {...s}/></svg>;
    case "solar": return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="16" r="5" {...s}/><line x1="16" y1="4" x2="16" y2="8" {...s}/><line x1="16" y1="24" x2="16" y2="28" {...s}/><line x1="4" y1="16" x2="8" y2="16" {...s}/><line x1="24" y1="16" x2="28" y2="16" {...s}/><line x1="7.5" y1="7.5" x2="10.5" y2="10.5" {...s}/><line x1="21.5" y1="21.5" x2="24.5" y2="24.5" {...s}/><line x1="24.5" y1="7.5" x2="21.5" y2="10.5" {...s}/><line x1="10.5" y1="21.5" x2="7.5" y2="24.5" {...s}/></svg>;
    case "compare": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="5" y="6" width="22" height="20" rx="1" {...s}/><line x1="5" y1="11" x2="27" y2="11" {...s}/><line x1="13" y1="6" x2="13" y2="26" {...s}/><line x1="20" y1="6" x2="20" y2="26" {...s}/></svg>;
    case "id": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="4" y="8" width="24" height="16" rx="2" {...s}/><circle cx="11" cy="16" r="3" {...s}/><line x1="17" y1="13" x2="24" y2="13" {...s}/><line x1="17" y1="17" x2="22" y2="17" {...s}/></svg>;
    case "passport": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="7" y="4" width="18" height="24" rx="2" {...s}/><circle cx="16" cy="15" r="4" {...s}/><line x1="11" y1="23" x2="21" y2="23" {...s}/><line x1="11" y1="8" x2="21" y2="8" {...s}/></svg>;
    case "transport": return <svg width={32} height={32} viewBox="0 0 32 32"><rect x="5" y="8" width="22" height="16" rx="3" {...s}/><line x1="5" y1="14" x2="27" y2="14" {...s}/><circle cx="10" cy="26" r="2" {...s}/><circle cx="22" cy="26" r="2" {...s}/><path d="M10 24h12" {...s}/><line x1="13" y1="8" x2="13" y2="14" {...s}/><line x1="19" y1="8" x2="19" y2="14" {...s}/></svg>;
    case "parking": return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" {...s}/><path d="M12 9h5a4 4 0 0 1 0 8h-5V9zM12 17v6" {...s}/></svg>;
    case "children": return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="10" r="4" {...s}/><path d="M9 28c0-3.87 3.13-7 7-7s7 3.13 7 7" {...s}/><path d="M24 8l2 2-2 2M26 10h-4" {...s}/></svg>;
    default: return <svg width={32} height={32} viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" {...s}/></svg>;
  }
}

// ─── Tax bracket calculator ───────────────────────────────────────────────────
function calcResidentTax(income: number): number {
  if (income <= 18200) return 0;
  if (income <= 45000) return (income - 18200) * 0.19;
  if (income <= 120000) return 5092 + (income - 45000) * 0.325;
  if (income <= 180000) return 29467 + (income - 120000) * 0.37;
  return 51667 + (income - 180000) * 0.45;
}
function calcNonResidentTax(income: number): number {
  if (income <= 120000) return income * 0.325;
  if (income <= 180000) return 39000 + (income - 120000) * 0.37;
  return 61200 + (income - 180000) * 0.45;
}
function getBracketLabel(income: number, resident: boolean): string {
  const brackets = resident ? TAX_BRACKETS_RESIDENT : TAX_BRACKETS_NON_RESIDENT;
  const b = brackets.find((br) => income >= br.min && (br.max === Infinity || income <= br.max));
  return b ? b.label : "–";
}
const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-AU")}`;

// ─── ID Checker documents ─────────────────────────────────────────────────────
const ID_DOCS = [
  { id: "passport_au", label: "Australian passport", points: 70 },
  { id: "birth_cert", label: "Australian birth certificate", points: 70 },
  { id: "citizenship", label: "Citizenship certificate", points: 70 },
  { id: "drivers", label: "Australian driver's licence", points: 40 },
  { id: "medicare", label: "Medicare card", points: 25 },
  { id: "centrelink", label: "Centrelink card", points: 25 },
  { id: "bank_card", label: "Bank card with signature", points: 25 },
  { id: "utility", label: "Utility bill with name and address", points: 25 },
  { id: "rates", label: "Council rate notice", points: 25 },
  { id: "ato", label: "ATO notice of assessment", points: 25 },
];

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

// ─── Disclaimer block ─────────────────────────────────────────────────────────
function DisclaimerBlock() {
  return (
    <div style={{ background: C.warmWhite, borderRadius: 8, padding: "14px 16px", marginBottom: 20 }}>
      <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.78rem", color: C.grey, lineHeight: 1.6, margin: 0 }}>
        {DISCLAIMER}
      </p>
    </div>
  );
}

// ─── Labelled input ───────────────────────────────────────────────────────────
function LabelledInput({ label, type = "number", value, onChange, placeholder, min }: { label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; min?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        style={{ background: C.warmWhite, border: `1px solid ${C.breeze}`, borderRadius: 8, padding: "8px 12px", fontSize: "0.9rem", color: C.navy, outline: "none", width: "100%" }}
      />
    </div>
  );
}

// ─── Output block ─────────────────────────────────────────────────────────────
function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline py-2" style={{ borderBottom: `1px solid ${C.offCream}` }}>
      <span style={{ fontSize: "0.85rem", color: C.grey }}>{label}</span>
      <span style={{ fontSize: "1rem", fontWeight: 600, color: C.navy }}>{value}</span>
    </div>
  );
}

// ─── Solar state multipliers ──────────────────────────────────────────────────
const SOLAR_MULT: Record<string, number> = { QLD: 0.62, WA: 0.6, SA: 0.58, NSW: 0.52, VIC: 0.44, TAS: 0.38, ACT: 0.50, NT: 0.65 };

// ─── Loan calculator ──────────────────────────────────────────────────────────
function loanMonthly(P: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  // Nav / scroll
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guides
  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Tools
  const [openTool, setOpenTool] = useState<ToolId | null>(null);

  // Tool states — Tax
  const [taxIncome, setTaxIncome] = useState("");
  const [taxResident, setTaxResident] = useState(true);

  // Tool states — Day Rate
  const [dayTarget, setDayTarget] = useState("");
  const [dayWeeks, setDayWeeks] = useState("48");
  const [dayDays, setDayDays] = useState("5");

  // Tool states — Loan
  const [loanAmount, setLoanAmount] = useState("");
  const [loanRate, setLoanRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  // Tool states — Solar
  const [solarBill, setSolarBill] = useState("");
  const [solarState, setSolarState] = useState("NSW");

  // Tool states — ID Checker
  const [idChecked, setIdChecked] = useState<string[]>([]);

  // Tool states — Passport
  const [passportHas, setPassportHas] = useState<boolean | null>(null);
  const [passportExpired3, setPassportExpired3] = useState<boolean | null>(null);
  const [passportTravelDate, setPassportTravelDate] = useState("");

  // Tool states — Transport / Parking / WWC
  const [transportState, setTransportState] = useState("NSW");
  const [parkingState, setParkingState] = useState("NSW");
  const [wwcState, setWwcState] = useState("NSW");

  // Reference
  const [openTile, setOpenTile] = useState<string | null>(null);

  // Contact
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > window.innerHeight * 0.45);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = contactForm;
    window.location.href = `mailto:connect@tbcworldwide.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    setContactSent(true);
    setTimeout(() => setContactSent(false), 4000);
  };

  // Guide search
  const filteredClusters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return clusters;
    return clusters
      .map((c) => ({ ...c, guides: c.guides.filter((g) => g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)) }))
      .filter((c) => c.guides.length > 0);
  }, [searchQuery]);

  // Tax calc
  const taxResult = useMemo(() => {
    const income = parseFloat(taxIncome);
    if (!income || income < 0) return null;
    const baseTax = taxResident ? calcResidentTax(income) : calcNonResidentTax(income);
    const medicare = taxResident && income > 23365 ? income * MEDICARE_LEVY : 0;
    const total = baseTax + medicare;
    const monthlyTakeHome = (income - total) / 12;
    return { bracket: getBracketLabel(income, taxResident), tax: total, medicare, monthlyTakeHome };
  }, [taxIncome, taxResident]);

  // Day rate calc
  const dayResult = useMemo(() => {
    const t = parseFloat(dayTarget), w = parseFloat(dayWeeks) || 48, d = parseFloat(dayDays) || 5;
    if (!t || t <= 0) return null;
    const dayRate = t / (w * d);
    return { dayRate, hourlyRate: dayRate / 8, monthly: t / 12 };
  }, [dayTarget, dayWeeks, dayDays]);

  // Loan calc
  const loanResult = useMemo(() => {
    const P = parseFloat(loanAmount), r = parseFloat(loanRate), y = parseFloat(loanTerm);
    if (!P || !r || !y || P <= 0 || r <= 0 || y <= 0) return null;
    const monthly = loanMonthly(P, r, y);
    const total = monthly * y * 12;
    return { monthly, total, interest: total - P };
  }, [loanAmount, loanRate, loanTerm]);

  // Solar calc
  const solarResult = useMemo(() => {
    const bill = parseFloat(solarBill);
    if (!bill || bill <= 0) return null;
    const mult = SOLAR_MULT[solarState] ?? 0.5;
    const annual = bill * 12;
    const saveLow = annual * (mult - 0.1);
    const saveHigh = annual * (mult + 0.05);
    const systemCost = 7000;
    const paybackLow = systemCost / saveHigh;
    const paybackHigh = systemCost / saveLow;
    return { saveLow, saveHigh, paybackLow, paybackHigh };
  }, [solarBill, solarState]);

  // ID checker
  const idTotal = idChecked.reduce((sum, id) => sum + (ID_DOCS.find((d) => d.id === id)?.points ?? 0), 0);
  const toggleId = (id: string) => setIdChecked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  // Passport
  const passportResult = useMemo(() => {
    if (passportHas === null) return null;
    const isRenewal = passportHas && passportExpired3 === false;
    const isNew = !passportHas || passportExpired3 === true;
    let weeksToTravel: number | null = null;
    if (passportTravelDate) {
      const diff = new Date(passportTravelDate).getTime() - Date.now();
      weeksToTravel = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
    }
    const urgent = weeksToTravel !== null && weeksToTravel <= 6;
    return { type: isNew ? "new" : isRenewal ? "renewal" : "new", urgent, weeksToTravel };
  }, [passportHas, passportExpired3, passportTravelDate]);

  // ─── Tool renderers ─────────────────────────────────────────────────────────
  function renderToolContent(id: ToolId) {
    switch (id) {
      case "tax-bracket":
        return (
          <div className="space-y-4">
            <DisclaimerBlock />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabelledInput label="Annual income ($)" value={taxIncome} onChange={setTaxIncome} placeholder="e.g. 75000" />
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>Residency</label>
                <div className="flex gap-2">
                  {["Resident", "Non-resident"].map((opt, i) => (
                    <button key={opt} onClick={() => setTaxResident(i === 0)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${C.cerulean}`, background: taxResident === (i === 0) ? C.cerulean : C.warmWhite, color: taxResident === (i === 0) ? C.white : C.cerulean, fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>
            {taxResult && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <OutputRow label="Tax bracket" value={taxResult.bracket} />
                <OutputRow label="Approx. income tax" value={fmt(taxResult.tax - taxResult.medicare)} />
                {taxResident && <OutputRow label="Medicare levy (est.)" value={fmt(taxResult.medicare)} />}
                <OutputRow label="Total tax payable (est.)" value={fmt(taxResult.tax)} />
                <OutputRow label="Approx. monthly take-home" value={fmt(taxResult.monthlyTakeHome)} />
              </div>
            )}
            <CerBtn href="https://www.ato.gov.au/calculators-and-tools/tax-withheld-calculator">ATO tax withheld calculator ↗</CerBtn>
          </div>
        );

      case "day-rate":
        return (
          <div className="space-y-4">
            <DisclaimerBlock />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <LabelledInput label="Annual income target ($)" value={dayTarget} onChange={setDayTarget} placeholder="e.g. 100000" />
              <LabelledInput label="Working weeks per year" value={dayWeeks} onChange={setDayWeeks} placeholder="48" min="1" />
              <LabelledInput label="Days per week" value={dayDays} onChange={setDayDays} placeholder="5" min="1" />
            </div>
            {dayResult && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <OutputRow label="Day rate" value={fmt(dayResult.dayRate)} />
                <OutputRow label="Hourly rate (8-hr day)" value={fmt(dayResult.hourlyRate)} />
                <OutputRow label="Monthly equivalent" value={fmt(dayResult.monthly)} />
              </div>
            )}
          </div>
        );

      case "loan-repayment":
        return (
          <div className="space-y-4">
            <DisclaimerBlock />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <LabelledInput label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} placeholder="e.g. 400000" />
              <LabelledInput label="Annual interest rate (%)" value={loanRate} onChange={setLoanRate} placeholder="e.g. 6.5" />
              <LabelledInput label="Loan term (years)" value={loanTerm} onChange={setLoanTerm} placeholder="e.g. 30" />
            </div>
            {loanResult && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <OutputRow label="Monthly repayment (est.)" value={fmt(loanResult.monthly)} />
                <OutputRow label="Total amount repaid" value={fmt(loanResult.total)} />
                <OutputRow label="Total interest paid" value={fmt(loanResult.interest)} />
              </div>
            )}
            <CerBtn href="https://moneysmart.gov.au/home-loans/mortgage-calculator">MoneySmart loan calculator ↗</CerBtn>
          </div>
        );

      case "solar-savings":
        return (
          <div className="space-y-4">
            <DisclaimerBlock />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabelledInput label="Average monthly electricity bill ($)" value={solarBill} onChange={setSolarBill} placeholder="e.g. 220" />
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>State</label>
                <select value={solarState} onChange={(e) => setSolarState(e.target.value)} style={{ background: C.warmWhite, border: `1px solid ${C.breeze}`, borderRadius: 8, padding: "8px 12px", fontSize: "0.9rem", color: C.navy }}>
                  {AU_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            {solarResult && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <OutputRow label="Estimated annual saving range" value={`${fmt(solarResult.saveLow)} – ${fmt(solarResult.saveHigh)}`} />
                <OutputRow label="Estimated payback period" value={`${solarResult.paybackLow.toFixed(1)} – ${solarResult.paybackHigh.toFixed(1)} years`} />
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <CerBtn href="https://www.energymadeeasy.gov.au">Energy Made Easy ↗</CerBtn>
              <CerBtn href="https://www.cleanenergycouncil.org.au">Clean Energy Council ↗</CerBtn>
            </div>
          </div>
        );

      case "business-structure": {
        const headers = ["", "Sole Trader", "Partnership", "Company", "Trust"];
        const rows = [
          ["Tax treatment", "Personal income tax rate", "Partners pay personal income tax on their share", "Company tax rate (25–30%)", "Distributed to beneficiaries who pay at their marginal rate"],
          ["Personal liability", "Unlimited — personal assets at risk", "Unlimited — partners share liability", "Limited to amount invested in shares", "Trustee has unlimited liability; beneficiaries are protected"],
          ["Setup cost", "Low — ABN registration is free", "Low — partnership agreement recommended", "Moderate — ASIC fees apply annually", "Higher — trust deed required, legal fees"],
          ["Admin burden", "Minimal — BAS if GST registered", "Moderate — shared records required", "Higher — annual ASIC returns, director obligations", "Complex — trustee duties, annual tax distributions"],
          ["Best suited for", "Freelancers, sole contractors, simple operations", "Two or more people in a simple shared venture", "Businesses wanting limited liability and growth investment", "Family businesses or those seeking tax-effective income splitting"],
        ];
        return (
          <div className="space-y-4">
            <DisclaimerBlock />
            <div className="overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ background: C.cerulean }}>
                    {headers.map((h, i) => <th key={i} style={{ padding: "10px 12px", color: C.white, fontWeight: 600, textAlign: "left", border: `1px solid ${C.cerulean}` }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri} style={{ background: ri % 2 === 0 ? C.warmWhite : C.white }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: "9px 12px", color: ci === 0 ? C.navy : C.grey, fontWeight: ci === 0 ? 600 : 400, border: `1px solid ${C.offCream}`, verticalAlign: "top" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CerBtn href="https://business.gov.au/registrations/register-a-business">business.gov.au — Register a business ↗</CerBtn>
          </div>
        );
      }

      case "id-checker":
        return (
          <div className="space-y-4">
            <DisclaimerBlock />
            <div className="space-y-2">
              {ID_DOCS.map((doc) => (
                <label key={doc.id} className="flex items-center justify-between gap-3 cursor-pointer" style={{ background: C.warmWhite, borderRadius: 8, padding: "10px 14px" }}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={idChecked.includes(doc.id)} onChange={() => toggleId(doc.id)} style={{ accentColor: C.cerulean, width: 16, height: 16 }} />
                    <span style={{ fontSize: "0.875rem", color: C.navy }}>{doc.label}</span>
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: C.cerulean, whiteSpace: "nowrap" }}>{doc.points} pts</span>
                </label>
              ))}
            </div>
            <div style={{ background: idTotal >= 100 ? "rgba(163,230,53,0.15)" : C.warmWhite, border: `2px solid ${idTotal >= 100 ? "#A3E635" : C.offCream}`, borderRadius: 8, padding: "14px 16px" }}>
              <div className="flex items-center justify-between">
                <span style={{ fontWeight: 700, fontSize: "1.1rem", color: C.navy }}>Total: {idTotal} points</span>
                <span style={{ fontWeight: 600, color: idTotal >= 100 ? "#4D7C0F" : C.cerulean }}>{idTotal >= 100 ? "✓ Enough points" : `Need ${100 - idTotal} more`}</span>
              </div>
              {idTotal < 100 && idTotal > 0 && (
                <p style={{ fontSize: "0.8rem", color: C.grey, marginTop: 8 }}>Try adding a card with signature, a utility bill, or a council rate notice to reach 100.</p>
              )}
            </div>
          </div>
        );

      case "passport":
        return (
          <div className="space-y-4">
            <DisclaimerBlock />
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>Do you have an Australian passport?</label>
                <div className="flex gap-2">
                  {[{ label: "Yes", val: true }, { label: "No", val: false }].map(({ label, val }) => (
                    <button key={label} onClick={() => setPassportHas(val)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${C.cerulean}`, background: passportHas === val ? C.cerulean : C.warmWhite, color: passportHas === val ? C.white : C.cerulean, fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>{label}</button>
                  ))}
                </div>
              </div>
              {passportHas === true && (
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>Has it been expired for more than 3 years?</label>
                  <div className="flex gap-2">
                    {[{ label: "Yes", val: true }, { label: "No", val: false }].map(({ label, val }) => (
                      <button key={label} onClick={() => setPassportExpired3(val)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${C.cerulean}`, background: passportExpired3 === val ? C.cerulean : C.warmWhite, color: passportExpired3 === val ? C.white : C.cerulean, fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>{label}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>Travel date (optional)</label>
                <input type="date" value={passportTravelDate} onChange={(e) => setPassportTravelDate(e.target.value)} style={{ background: C.warmWhite, border: `1px solid ${C.breeze}`, borderRadius: 8, padding: "8px 12px", fontSize: "0.9rem", color: C.navy }} />
              </div>
            </div>
            {passportResult && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <p style={{ fontWeight: 600, color: C.navy, marginBottom: 8 }}>{passportResult.type === "renewal" ? "Renewal application" : "New application"}</p>
                <p style={{ fontSize: "0.875rem", color: C.grey }}>Routine processing: 3–6 weeks. Priority processing: up to 2 weeks (fee applies).</p>
                {passportResult.urgent && <p style={{ fontSize: "0.875rem", color: "#B45309", fontWeight: 500, marginTop: 8 }}>Your travel date is within 6 weeks — consider priority processing or a passport office appointment.</p>}
              </div>
            )}
            <CerBtn href="https://www.passports.gov.au">passports.gov.au ↗</CerBtn>
          </div>
        );

      case "public-transport": {
        const t = PUBLIC_TRANSPORT_DATA[transportState];
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>Select your state or territory</label>
              <select value={transportState} onChange={(e) => setTransportState(e.target.value)} style={{ background: C.warmWhite, border: `1px solid ${C.breeze}`, borderRadius: 8, padding: "10px 12px", fontSize: "0.9rem", color: C.navy }}>
                {AU_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {t && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <OutputRow label="Card" value={t.card} />
                <OutputRow label="Website" value={t.website} />
                <OutputRow label="Top-up" value={t.topUp} />
              </div>
            )}
            {t && <CerBtn href={`https://${t.website}`}>{t.website} ↗</CerBtn>}
          </div>
        );
      }

      case "parking-fine": {
        const p = PARKING_FINES_DATA[parkingState];
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>Select your state or territory</label>
              <select value={parkingState} onChange={(e) => setParkingState(e.target.value)} style={{ background: C.warmWhite, border: `1px solid ${C.breeze}`, borderRadius: 8, padding: "10px 12px", fontSize: "0.9rem", color: C.navy }}>
                {AU_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {p && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <OutputRow label="Authority" value={p.authority} />
                <div className="pt-2">
                  <p style={{ fontSize: "0.8rem", color: C.grey, marginBottom: 6 }}>How to dispute</p>
                  <p style={{ fontSize: "0.875rem", color: C.navy }}>{p.disputeNote}</p>
                </div>
              </div>
            )}
            {p && <CerBtn href={`https://${p.payUrl}`}>Pay or dispute your fine ↗</CerBtn>}
          </div>
        );
      }

      case "wwc": {
        const w = WWC_DATA[wwcState];
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: C.navy }}>Select your state or territory</label>
              <select value={wwcState} onChange={(e) => setWwcState(e.target.value)} style={{ background: C.warmWhite, border: `1px solid ${C.breeze}`, borderRadius: 8, padding: "10px 12px", fontSize: "0.9rem", color: C.navy }}>
                {AU_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {w && (
              <div style={{ background: C.warmWhite, borderRadius: 8, padding: "16px" }}>
                <OutputRow label="Who must have it" value={w.who} />
                <OutputRow label="How to apply" value={w.how} />
                <OutputRow label="Cost" value={w.cost} />
                <OutputRow label="Validity" value={w.validity} />
              </div>
            )}
            {w && <CerBtn href={`https://${w.url}`}>Apply — official site ↗</CerBtn>}
          </div>
        );
      }

      default: return null;
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100dvh", width: "100%", fontFamily: "'Geist', Inter, sans-serif", background: C.cream, color: C.navy }}>

      {/* ── NAVIGATION ──────────────────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, transition: "background 0.3s", background: scrolled ? `${C.cream}E8` : "transparent", backdropFilter: scrolled ? "blur(8px)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} style={{ fontSize: "1.5rem", fontWeight: 700, color: C.navy, letterSpacing: "-0.03em", background: "none", border: "none", cursor: "pointer" }}>
            kindd
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7" style={{ fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.01em" }}>
            {[["Home", "home"], ["Guides", "guides"], ["Tools", "tools"], ["Reference", "reference"], ["How KINDD Works", "how-it-works"], ["Contact", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ color: C.navy, background: "none", border: "none", cursor: "pointer", opacity: 0.85 }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}>
                {label}
              </button>
            ))}
            <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" style={{ color: C.breeze, textDecoration: "none", fontWeight: 500 }}>
              Part of Breza + You
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: C.navy }}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ background: C.cream, borderBottom: `1px solid ${C.breeze}40`, overflow: "hidden" }} className="md:hidden">
              <div className="flex flex-col p-6 gap-4 text-lg">
                {[["Home", "home"], ["Guides", "guides"], ["Tools", "tools"], ["Reference", "reference"], ["How KINDD Works", "how-it-works"], ["Contact", "contact"]].map(([label, id]) => (
                  <button key={id} onClick={() => scrollTo(id)} style={{ textAlign: "left", color: C.navy, background: "none", border: "none", cursor: "pointer", padding: "6px 0", fontWeight: 500 }}>{label}</button>
                ))}
                <a href="https://brezaplusyou.com.au" target="_blank" rel="noreferrer" style={{ color: C.breeze, textDecoration: "none", fontWeight: 500, padding: "6px 0" }}>Part of Breza + You</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── SECTION 1 — HERO ────────────────────────────────────────────────── */}
      <section id="home" style={{ position: "relative", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "20vh", paddingLeft: 24, paddingRight: 24 }}>
        <img src={heroImg} alt="An Australian suburban street with houses, picket fences, a letterbox, and a kookaburra on a post. Painterly illustration." style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", zIndex: -2 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(250,246,232,0.55) 0%, rgba(250,246,232,0.15) 45%, transparent 65%)`, zIndex: -1 }} />

        <div className="max-w-3xl mx-auto text-center flex flex-col items-center" style={{ zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(4rem, 12vw, 7rem)", fontWeight: 700, letterSpacing: "-0.04em", color: C.navy, marginBottom: 24, lineHeight: 1 }}>kindd</h1>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 500, color: C.navy, marginBottom: 20, lineHeight: 1.2 }}>You are one of our kind.</h2>
          <p style={{ fontSize: "1.125rem", color: C.grey, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
            A plain-language guide to Australian life. Sourced from government. Updated monthly. Always free.
          </p>
          <CtaButton onClick={() => scrollTo("guides")}>Browse the guides.</CtaButton>
        </div>

        <AnimatePresence>
          {!scrolled && (
            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)" }}>
              <ChevronDown className="h-8 w-8 animate-pulse" style={{ color: C.grey }} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── SECTION 2 — PREMISE ─────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "96px 24px", background: C.cream }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontSize: "2.25rem", fontWeight: 700, color: C.navy, marginBottom: 48 }}>Why KINDD exists.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, fontSize: "1.1rem", color: C.grey, maxWidth: 680, margin: "0 auto", lineHeight: 1.8 }}>
            <p>Adult life in Australia comes with no manual. There are forms to fill. Bodies to call. Rights you have but were never told about. Money you might be owed. Doors you did not know to knock on.</p>
            <p>KINDD points you to the right door. Eleven plain-language guide clusters covering tax, renting, health, family, neighbours, money, voting, business, work, and the rest of it. We do not give advice. We tell you where to go and what to ask when you get there.</p>
            <p>Every word here came from a government source. Every link goes back to one. Updated monthly. Free forever. No account. No catch.</p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S NEW ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 24px 0", background: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ borderTop: `1px solid ${C.offCream}`, borderBottom: `1px solid ${C.offCream}`, padding: "32px 0" }}>
            <div className="flex flex-wrap items-start gap-6 md:gap-10">
              <div className="flex items-center gap-2 shrink-0" style={{ paddingTop: 2 }}>
                <Sparkles style={{ width: 16, height: 16, color: C.cerulean }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem", fontWeight: 500, color: C.cerulean, letterSpacing: "0.08em", textTransform: "uppercase" }}>May 2026</span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 flex-1">
                {[
                  { label: "New", items: ["Tools section — 10 calculators", "Reference section — About Australia"] },
                  { label: "New guide clusters", items: ["Business Setup", "Employment and Workplace", "Consumer and Fair Trade", "Education and Training", "Government Jobs", "Students"] },
                  { label: "Updated", items: ["Civic and Legal — Online Abuse and Cybercrime guides added", "All 11 clusters reviewed against May 2026 government sources"] },
                ].map(({ label, items }) => (
                  <div key={label} style={{ minWidth: 200 }}>
                    <p style={{ fontSize: "0.72rem", fontFamily: "'Geist Mono', monospace", color: C.grey, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{label}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                      {items.map((item) => (
                        <li key={item} style={{ fontSize: "0.875rem", color: C.navy, display: "flex", alignItems: "flex-start", gap: 6 }}>
                          <span style={{ color: C.cerulean, marginTop: 1, flexShrink: 0 }}>—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — GUIDES ──────────────────────────────────────────────── */}
      <section id="guides" style={{ padding: "96px 24px", background: C.white }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: C.navy, marginBottom: 8 }}>Guides.</h2>
            <p style={{ fontSize: "1.125rem", color: C.grey, marginBottom: 12 }}>Plain language. Government sources. Updated monthly.</p>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.78rem", color: C.grey, maxWidth: 620, margin: "0 auto 40px" }}>
              All guides last reviewed May 2026. Always check the official government source linked in each guide for the most current information.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto" style={{ marginBottom: 56 }}>
            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: C.grey, width: 16, height: 16, pointerEvents: "none" }} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setOpenGuide(null); }}
                placeholder="Search guides — tax, renting, Medicare, voting…"
                style={{ width: "100%", background: C.cream, border: `1px solid ${C.breeze}60`, borderRadius: 32, padding: "12px 44px", fontSize: "0.875rem", color: C.navy, outline: "none", boxSizing: "border-box" }}
                data-testid="input-guide-search"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setOpenGuide(null); }} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.grey }}>
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p style={{ textAlign: "center", fontSize: "0.75rem", fontFamily: "'Geist Mono', monospace", color: C.grey, marginTop: 10 }}>
                {filteredClusters.reduce((a, c) => a + c.guides.length, 0)} guide{filteredClusters.reduce((a, c) => a + c.guides.length, 0) !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {filteredClusters.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: C.grey, fontSize: "1.1rem" }}>No guides matched &ldquo;{searchQuery}&rdquo;.</p>
              <button onClick={() => setSearchQuery("")} style={{ marginTop: 16, color: C.cerulean, background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", textDecoration: "underline" }}>Clear search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClusters.map((cluster) => (
                <div key={cluster.name} style={card} className="p-8">
                  <div style={{ marginBottom: 12 }}><ClusterIcon name={cluster.icon} /></div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: C.navy, marginBottom: 6 }}>{cluster.name}</h3>
                  <p style={{ fontSize: "0.875rem", color: C.grey, marginBottom: 24, lineHeight: 1.6 }}>{cluster.desc}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {cluster.guides.map((guide) => {
                      const id = `${cluster.name}|${guide.name}`;
                      const isOpen = openGuide === id;
                      return (
                        <div key={guide.name} style={{ borderBottom: `1px solid ${C.offCream}` }} className="last:border-0">
                          <button
                            onClick={() => setOpenGuide(isOpen ? null : id)}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "12px 0", color: C.cerulean, fontWeight: 500, fontSize: "0.9rem", background: "none", border: "none", cursor: "pointer" }}
                            data-testid={`btn-guide-${id.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                          >
                            <span>{guide.name}</span>
                            <ChevronRight style={{ width: 16, height: 16, flexShrink: 0, marginLeft: 8, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                                <div style={{ marginLeft: 8, background: C.warmWhite, borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
                                  <p style={{ fontSize: "0.875rem", color: C.grey, lineHeight: 1.65, marginBottom: 10 }}>{guide.description}</p>
                                  <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.72rem", color: C.grey, marginBottom: 12 }}>Last updated: {guide.lastUpdated}. Always check the official source.</p>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {guide.links.map((link) => <CerBtn key={link.url} href={link.url}>{link.label}</CerBtn>)}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4 — TOOLS ───────────────────────────────────────────────── */}
      <section id="tools" style={{ padding: "96px 24px", background: C.white, borderTop: `1px solid ${C.offCream}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: C.navy, marginBottom: 8 }}>Tools.</h2>
            <p style={{ fontSize: "1.0625rem", color: C.grey }}>Indicators only. Not financial, legal, or tax advice. Every tool tells you exactly what it is.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const isOpen = openTool === tool.id;
              return (
                <div key={tool.id} style={{ ...card, overflow: "hidden" }}>
                  <div style={{ padding: "28px 28px 0" }}>
                    <div style={{ marginBottom: 12 }}><ToolIcon name={tool.icon} /></div>
                    <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: C.navy, marginBottom: 6 }}>{tool.name}</h3>
                    <p style={{ fontSize: "0.875rem", color: C.grey, lineHeight: 1.6, marginBottom: 20 }}>{tool.description}</p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20 }}>
                      <button
                        onClick={() => setOpenTool(isOpen ? null : tool.id)}
                        style={{ padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.cerulean}`, color: isOpen ? C.white : C.cerulean, background: isOpen ? C.cerulean : C.cream, fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
                      >
                        {isOpen ? "Close tool" : "Open tool"}
                      </button>
                      {isOpen && (
                        <button onClick={() => setOpenTool(null)} style={{ background: "none", border: "none", cursor: "pointer", color: C.grey, display: "flex", alignItems: "center" }}>
                          <X style={{ width: 18, height: 18 }} />
                        </button>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 28px 28px", borderTop: `1px solid ${C.offCream}`, paddingTop: 20 }}>
                          {renderToolContent(tool.id)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — REFERENCE ───────────────────────────────────────────── */}
      <section id="reference" style={{ padding: "96px 24px", background: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: C.navy, marginBottom: 8 }}>About Australia.</h2>
            <p style={{ fontSize: "1.0625rem", color: C.grey }}>Hard-coded facts. Updated when they change. Sourced from official government records.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {referenceTiles.map((tile) => {
              const isOpen = openTile === tile.id;
              const isEmergency = tile.alwaysVisible;
              return (
                <div key={tile.id} style={{ ...card, background: C.cream, border: `1px solid ${C.offCream}`, borderLeft: isEmergency ? `4px solid ${C.signalGreen}` : undefined, overflow: "hidden" }}>
                  <div style={{ padding: "24px 24px 0" }}>
                    <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: C.navy, marginBottom: 6 }}>{tile.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: C.grey, marginBottom: 16, lineHeight: 1.5 }}>{tile.intro}</p>
                  </div>

                  {isEmergency ? (
                    <div style={{ padding: "0 24px 24px" }}>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.82rem", color: C.navy, lineHeight: 2 }}>
                        {tile.content.split("\n").map((line, i) => (
                          <div key={i} style={{ padding: "2px 0" }}>{line}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ padding: "0 24px", paddingBottom: isOpen ? 0 : 24 }}>
                        <button
                          onClick={() => setOpenTile(isOpen ? null : tile.id)}
                          style={{ display: "flex", alignItems: "center", gap: 6, color: C.cerulean, background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, paddingBottom: 20 }}
                        >
                          {isOpen ? "Close" : "Read more"}
                          <ChevronDown style={{ width: 15, height: 15, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                            <div style={{ background: C.warmWhite, margin: "0 16px 20px", borderRadius: 8, padding: "16px" }}>
                              <pre style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: "0.85rem", color: C.grey, lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{tile.content}</pre>
                              {tile.source && (
                                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.72rem", color: C.grey, marginTop: 12 }}>Source: {tile.source}</p>
                              )}
                              <button onClick={() => setOpenTile(null)} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 4, color: C.cerulean, background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>
                                <X style={{ width: 14, height: 14 }} /> Close
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — HOW KINDD WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "96px 24px", background: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: C.navy, textAlign: "center", marginBottom: 64 }}>Three things to know before you start.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { h: "Free forever.", p: "No login. No account. No tier. Cookies clear, you start fresh. That is the whole arrangement." },
              { h: "Government sources only.", p: "ATO, Services Australia, Fair Trading, Healthdirect, Scamwatch, every state tribunal. Linked at the end of every guide. Last updated date shown." },
              { h: "Directions, not advice.", p: "We are not lawyers, accountants, or doctors. We are the person who knows which door to knock on. Once you find the door, the experts on the other side take it from there." },
            ].map(({ h, p }) => (
              <div key={h} style={{ paddingTop: 28, borderTop: `1px solid ${C.breeze}80` }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: C.navy, marginBottom: 12 }}>{h}</h3>
                <p style={{ color: C.grey, lineHeight: 1.75, fontSize: "0.95rem" }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — WHO KINDD IS FOR ────────────────────────────────────── */}
      <section id="who" style={{ padding: "96px 24px", background: C.offCream }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: C.navy, marginBottom: 56 }}>For the people no one wrote a manual for.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, fontSize: "1.1rem", maxWidth: 680, margin: "0 auto" }}>
            {[
              "For the freelancer who just got their first invoice and does not know what to do with it.",
              "For the renter staring at a leaky ceiling and a quiet landlord.",
              "For the parent looking for somewhere free for the kids on Saturday.",
              "For the new citizen working out how Medicare actually works.",
              "For the small business owner who got a Centrelink letter and panicked.",
              "For the tradie whose neighbour just took down a shared fence without asking.",
              "For anyone who has ever Googled something at 11pm and ended up on a forum from 2014.",
            ].map((line) => (
              <p key={line} style={{ color: C.grey, lineHeight: 1.7 }}>{line}</p>
            ))}
            <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ color: C.navy, fontWeight: 500, fontSize: "1.25rem" }}>KINDD is for them.</p>
              <p style={{ color: C.navy, fontWeight: 500, fontSize: "1.25rem" }}>KINDD is for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — ALWAYS FREE ─────────────────────────────────────────── */}
      <section id="always-free" style={{ padding: "96px 24px", background: C.cream, textAlign: "center" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: C.navy, marginBottom: 24 }}>It costs nothing. It will always cost nothing.</h2>
          <p style={{ fontSize: "1.0625rem", color: C.grey, marginBottom: 40, lineHeight: 1.75, maxWidth: 600, margin: "0 auto 40px" }}>
            KINDD is free because some things should be open. Tax. Tenancy. Health. Mental health. The basics of being an adult here. None of that should sit behind a paywall. No tier. No upgrade. No premium. Just the guides.
          </p>
          <CtaButton onClick={() => scrollTo("guides")}>Start with a guide.</CtaButton>
        </div>
      </section>

      {/* ── SECTION 9 — DISCLAIMER ──────────────────────────────────────────── */}
      <section id="disclaimer" style={{ padding: "80px 24px", background: C.offCream }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: C.navy, marginBottom: 28 }}>Before you use KINDD.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: "'Geist Mono', monospace", fontSize: "0.82rem", color: C.grey, lineHeight: 1.75 }}>
            <p>Information here was last updated this month. Always check the official government website linked at the end of each guide for the most current details.</p>
            <p>KINDD is not a substitute for professional advice. For tax, see a registered tax agent. For legal matters, see a lawyer or your local community legal centre. For medical concerns, see a doctor.</p>
            <p>KINDD points you to the right place. The experts there take it from there.</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "96px 24px", background: C.cream }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: C.navy, marginBottom: 12 }}>Get in touch.</h2>
          <p style={{ color: C.grey, marginBottom: 40, lineHeight: 1.7 }}>Questions, feedback, or just want to say hello. Fill in the form and your email client will open with everything pre-filled.</p>

          {contactSent && (
            <div style={{ marginBottom: 24, padding: "14px 18px", borderRadius: 8, background: C.offCream, border: `1px solid ${C.breeze}60`, fontFamily: "'Geist Mono', monospace", fontSize: "0.82rem", color: C.grey }}>
              Your email client should be opening now. If nothing happened, write directly to{" "}
              <a href="mailto:connect@tbcworldwide.com" style={{ color: C.cerulean }}>connect@tbcworldwide.com</a>.
            </div>
          )}

          <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name", key: "name" },
                { id: "email", label: "Email", type: "email", placeholder: "you@example.com", key: "email" },
              ].map(({ id, label, type, placeholder, key }) => (
                <div key={id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label htmlFor={id} style={{ fontSize: "0.85rem", fontWeight: 500, color: C.navy }}>{label}</label>
                  <input id={id} type={type} required placeholder={placeholder} value={contactForm[key as keyof typeof contactForm]}
                    onChange={(e) => setContactForm({ ...contactForm, [key]: e.target.value })}
                    style={{ background: C.offCream, border: `1px solid ${C.breeze}60`, borderRadius: 8, padding: "10px 14px", color: C.navy, fontSize: "0.9rem", outline: "none" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="subject" style={{ fontSize: "0.85rem", fontWeight: 500, color: C.navy }}>Subject</label>
              <input id="subject" type="text" required placeholder="What is this about?" value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                style={{ background: C.offCream, border: `1px solid ${C.breeze}60`, borderRadius: 8, padding: "10px 14px", color: C.navy, fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="message" style={{ fontSize: "0.85rem", fontWeight: 500, color: C.navy }}>Message</label>
              <textarea id="message" required rows={5} placeholder="Write your message here." value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                style={{ background: C.offCream, border: `1px solid ${C.breeze}60`, borderRadius: 8, padding: "10px 14px", color: C.navy, fontSize: "0.9rem", outline: "none", resize: "none" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem", color: C.grey }}>Sends via your email client to connect@tbcworldwide.com</p>
              <CtaButton>Open in email client.</CtaButton>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER — DO NOT MODIFY ───────────────────────────────────────────── */}
      <footer className="bg-[#0F172A] text-[#FAF6E8] pt-20 pb-12 px-6">
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
        {scrolled && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo("home")}
            style={{ position: "fixed", bottom: 32, right: 32, padding: 12, background: C.cream, border: `1px solid ${C.breeze}80`, borderRadius: "50%", boxShadow: "0 2px 12px rgba(15,23,42,0.1)", cursor: "pointer", color: C.navy, zIndex: 50 }}
          >
            <ArrowUp style={{ width: 20, height: 20 }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
