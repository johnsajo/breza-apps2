import { useState, useEffect } from "react";
import { Link } from "wouter";
import { callOutsideEye } from "@/lib/ai";
import { DEMO_RESPONSES } from "@/lib/demo";
import { markVisited } from "@/lib/visited";
import { saveFeedback, getFeedback, saveNote, getNote, type Rating } from "@/lib/feedback";
import { saveSession, loadSession, clearSession, sessionAge } from "@/lib/session";
import HowToUse from "@/components/HowToUse";
import FeedbackRow from "@/components/FeedbackRow";

const industries = [
  "Advertising and Marketing", "Arts and Culture", "Automotive",
  "Beauty and Wellness", "Creative Agency", "Education", "Entertainment",
  "Fashion and Apparel", "Finance and Banking", "Food and Drink",
  "Government and Public Sector", "Health and Wellness", "Hospitality and Tourism",
  "Media and Publishing", "Non-profit and Charity", "PR and Communications",
  "Professional Services", "Real Estate", "Retail and E-commerce",
  "Sport and Fitness", "Tech and Software", "Trades and Construction",
  "Travel", "Other",
];
const moods = ["Bold", "Calm", "Playful", "Luxe", "Minimal", "Earthy", "Electric", "Clinical", "Warm", "Dark", "Fresh", "Sophisticated"];
const outputUsages = ["Website", "Print", "App UI", "Social Media", "Packaging", "All of the above"];

interface ColourToken { role: string; hex: string; name: string; usage: string }
interface Palette {
  name: string; rationale: string; colours: ColourToken[];
  pairingLogic: string; bestFor: string; avoidUsing: string; emotionalSignal: string;
}

function ColourSwatch({ token }: { token: ColourToken }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(token.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div style={{ textAlign: "center", cursor: "pointer" }} onClick={copy} title="Click to copy">
      <div style={{ width: 48, height: 48, backgroundColor: token.hex, border: "1px solid #2A2A2A" }} />
      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 10, color: copied ? "#F5A623" : "#B8B2A8", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {copied ? "Copied" : token.role}
      </p>
      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 10, color: "#B8B2A8" }}>{token.hex}</p>
    </div>
  );
}

const SYSTEM = `You are a colour strategist and art director. Return three distinct, professionally considered palette options. Be specific about usage. Never return generic palettes. Each palette must have exactly six colour tokens: primary, secondary, accent, background, surface, text. Return ONLY a raw JSON object. No markdown code fences. No backticks.`;

export default function Colour() {
  const [desc, setDesc] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [usage, setUsage] = useState("");
  const [inspirationUrl, setInspirationUrl] = useState("");
  const [output, setOutput] = useState<{ palettes: Palette[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [restored, setRestored] = useState<number | null>(null);
  const [rating, setRating] = useState<Rating | null>(() => getFeedback("colour"));
  const [note, setNote] = useState(() => getNote("colour"));

  useEffect(() => {
    const saved = loadSession("colour");
    if (saved) {
      setOutput(saved.output as { palettes: Palette[] });
      setIsDemo(saved.isDemo);
      setRestored(saved.savedAt);
    }
  }, []);

  function handleRating(r: Rating) {
    const next = rating === r ? null : r;
    setRating(next);
    if (next) saveFeedback("colour", next);
  }

  function handleNote(n: string) {
    setNote(n);
    saveNote("colour", n);
  }

  function toggleMood(m: string) {
    setSelectedMoods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
  }

  function handleClear() {
    clearSession("colour");
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
  }

  const isValid = desc.trim().length > 0 && industry.length > 0;

  async function handleSubmit() {
    setError(null); setOutput(null); setRestored(null); setLoading(true); setIsDemo(false);
    markVisited("colour");
    const parts = [
      `Brand/project description: ${desc}.`,
      `Industry: ${industry}.`,
      `Mood: ${selectedMoods.join(", ") || "unspecified"}.`,
      `Output usage: ${usage || "unspecified"}.`,
    ];
    if (inspirationUrl.trim()) parts.push(`Inspiration/reference: ${inspirationUrl}`);
    const prompt = parts.join(" ");
    try {
      const raw = await callOutsideEye(prompt, SYSTEM);
      const data = JSON.parse(raw);
      if (data.palettes) {
        data.palettes = data.palettes.map((p: Palette & { colors?: unknown }) => {
          const raw = p.colours ?? p.colors;
          const colours: ColourToken[] = Array.isArray(raw)
            ? raw
            : raw && typeof raw === "object"
            ? Object.values(raw as Record<string, ColourToken>)
            : [];
          return { ...p, colours };
        });
      }
      setOutput(data);
      saveSession("colour", data, false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "NO_KEY") {
        const demo = DEMO_RESPONSES.colour as { palettes: Palette[] };
        setOutput(demo);
        setIsDemo(true);
        saveSession("colour", demo as unknown as Record<string, unknown>, true);
      } else if (msg === "BAD_KEY") setError("Your key was rejected. Check it in Settings.");
      else if (msg === "RATE_LIMIT") setError("Rate limit hit. Try again in a moment.");
      else setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="content-width" style={{ paddingTop: 40 }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/">
          <span
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#B8B2A8", cursor: "pointer", transition: "color 150ms ease" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5A623")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8B2A8")}
          >
            ← All rooms
          </span>
        </Link>
      </div>

      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>06</p>
      <h1 className="fraunces-display" style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 12 }}>Colour Intelligence</h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", marginBottom: 32 }}>Describe your project. Get three palette options with full rationale.</p>
      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      <HowToUse paragraphs={["Describe your brand or project and what it does. Select your industry and the mood you are going for.", "Three distinct palette options will come back with colour tokens, usage guidance, and the emotional signal each one sends."]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Describe your brand or project</p>
          <textarea className="field-base" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. A sustainable homewares brand targeting young Australian renters who care about quality and ethics." style={{ resize: "vertical" }} />
        </div>

        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Industry</p>
          <select className="field-base" value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F5A623' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
            <option value="">Select industry...</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Mood</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {moods.map((m) => (
              <button key={m} className={`toggle-btn ${selectedMoods.includes(m) ? "active" : ""}`} onClick={() => toggleMood(m)}>{m}</button>
            ))}
          </div>
        </div>

        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Output will be used for</p>
          <select className="field-base" value={usage} onChange={(e) => setUsage(e.target.value)} style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F5A623' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
            <option value="">Select usage...</option>
            {outputUsages.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Inspiration or reference URL (optional)</p>
          <input type="url" className="field-base" value={inspirationUrl} onChange={(e) => setInspirationUrl(e.target.value)} placeholder="e.g. a brand whose palette you admire..." />
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading || !isValid}>
          {loading ? "The Outside Eye is reading your work..." : "Get the Outside Eye"}
        </button>
      </div>

      {error && <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#F87171", marginTop: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{error}</p>}

      {output && !loading && (
        <div style={{ marginTop: 40 }}>
          <hr className="hr-hairline" style={{ marginBottom: 24 }} />

          {restored !== null && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", backgroundColor: "#141414", border: "1px solid #2A2A2A", marginBottom: 20 }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B2A8" }}>
                Last session · {sessionAge(restored)}
              </p>
              <button
                onClick={handleClear}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#5A5550", padding: 0, transition: "color 150ms ease" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F87171")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#5A5550")}
              >
                Clear
              </button>
            </div>
          )}

          {isDemo && <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>Demo Response — Add your key in Settings for real palette generation.</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {output.palettes.map((palette, pi) => (
              <div key={pi} style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 32 }}>
                <p className="fraunces-label" style={{ fontSize: 22, color: "#F5F0E8", fontWeight: 500, marginBottom: 8 }}>{palette.name}</p>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#B8B2A8", marginBottom: 24, lineHeight: 1.6 }}>{palette.rationale}</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
                  {(Array.isArray(palette.colours) ? palette.colours : []).map((c, ci) => <ColourSwatch key={ci} token={c} />)}
                </div>
                {[
                  { label: "Pairing Logic", value: palette.pairingLogic },
                  { label: "Best For", value: palette.bestFor },
                  { label: "Avoid Using", value: palette.avoidUsing },
                  { label: "Emotional Signal", value: palette.emotionalSignal },
                ].map((field) => (
                  <div key={field.label} style={{ marginBottom: 16 }}>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#F5A623", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{field.label}</p>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#B8B2A8", lineHeight: 1.6 }}>{field.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleSubmit} disabled={loading} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B2A8", background: "none", border: "1px solid #2A2A2A", padding: "5px 12px", cursor: "pointer", transition: "color 150ms ease, border-color 150ms ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A"; }}
            >
              Try again
            </button>
          </div>
          <FeedbackRow rating={rating} onRate={handleRating} note={note} onNote={handleNote} />
        </div>
      )}
      <div style={{ marginTop: 88 }} />
    </div>
  );
}
