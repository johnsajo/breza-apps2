import { useState, useEffect } from "react";
import { Link } from "wouter";
import { callOutsideEye } from "@/lib/ai";
import { DEMO_RESPONSES } from "@/lib/demo";
import { markVisited } from "@/lib/visited";
import { saveFeedback, getFeedback, saveNote, getNote, type Rating } from "@/lib/feedback";
import { saveSession, loadSession, clearSession, sessionAge } from "@/lib/session";
import { encodeShare, decodeShare } from "@/lib/sharelink";
import HowToUse from "@/components/HowToUse";
import FeedbackRow from "@/components/FeedbackRow";

const styles = ["Minimal", "Bold", "Geometric", "Editorial", "Handcrafted"];

const STYLE_DEFINITIONS: Record<string, string> = {
  Minimal: "Use thin or light weights (200–400). Generous letter-spacing. Clean geometric sans or refined hairline serif. Restrained and airy. No decorative elements.",
  Bold: "Use heavy or black weights (700–900). Tight or negative tracking. Condensed or display typefaces. Maximum visual presence and authority.",
  Geometric: "Use typefaces built on mathematical forms — circles, squares, grids. Think Futura, Bauhaus influence. Precise, structured, modernist.",
  Editorial: "Use high-contrast serifs or sophisticated editorial sans. Think magazine mastheads. Refined, timeless, cultured. Medium weights only.",
  Handcrafted: "Use script, calligraphic, or organically irregular typefaces. Warm, imperfect, artisan. Suggests something made by hand.",
};

interface Concept {
  conceptName: string; font: string; weight: string; letterSpacing: string;
  caseStyle: "uppercase" | "lowercase" | "titlecase";
  textColour: string; backgroundColour: string; reasoning: string; personality: string;
}

function normalizeConcept(raw: Record<string, unknown>): Concept {
  const str = (keys: string[], fallback = ""): string => {
    for (const k of keys) if (typeof raw[k] === "string" && raw[k]) return raw[k] as string;
    return fallback;
  };
  const caseRaw = str(["caseStyle", "case", "textCase", "letterCase", "case_style"], "lowercase");
  const caseStyle: Concept["caseStyle"] =
    caseRaw === "uppercase" || caseRaw === "upper" ? "uppercase"
    : caseRaw === "titlecase" || caseRaw === "title" || caseRaw === "titleCase" ? "titlecase"
    : "lowercase";
  return {
    conceptName: str(["conceptName", "concept_name", "name", "title", "conceptTitle"]),
    font: str(["font", "fontFamily", "font_family", "typeface"]),
    weight: str(["weight", "fontWeight", "font_weight"], "400"),
    letterSpacing: str(["letterSpacing", "letter_spacing", "tracking"], "0"),
    caseStyle,
    textColour: str(["textColour", "textColor", "text_color", "text_colour", "color", "foreground", "fg"], "#1A1A1A"),
    backgroundColour: str(["backgroundColour", "backgroundColor", "background_color", "background", "bg", "bgColor"], "#FAF8F4"),
    reasoning: str(["reasoning", "rationale", "description", "reason", "explanation"]),
    personality: str(["personality", "feel", "vibe", "mood", "character", "characterDescription"]),
  };
}

function WordmarkCard({ concept, brandName }: { concept: Concept; brandName: string }) {
  const displayName = concept.caseStyle === "uppercase"
    ? brandName.toUpperCase()
    : concept.caseStyle === "lowercase"
    ? brandName.toLowerCase()
    : brandName;

  useEffect(() => {
    const fontEncoded = encodeURIComponent(concept.font);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontEncoded}:wght@${concept.weight}&display=swap`;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [concept.font, concept.weight]);

  function downloadSvg() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120"><rect width="400" height="120" fill="${concept.backgroundColour}"/><text x="200" y="75" font-family="${concept.font}" font-weight="${concept.weight}" font-size="48" letter-spacing="${concept.letterSpacing}" text-anchor="middle" fill="${concept.textColour}">${displayName}</text></svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${brandName}-wordmark.svg`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 32, marginBottom: 24 }}>
      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#F5A623", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {concept.conceptName} — {concept.personality}
      </p>
      <div style={{ backgroundColor: concept.backgroundColour, padding: "32px 24px", marginBottom: 20, textAlign: "center" }}>
        <span style={{ fontFamily: `'${concept.font}', Georgia, serif`, fontWeight: parseInt(concept.weight), fontSize: 48, letterSpacing: concept.letterSpacing, color: concept.textColour, display: "block", lineHeight: 1.2 }}>
          {displayName}
        </span>
      </div>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8B2A8", lineHeight: 1.6, marginBottom: 16 }}>{concept.reasoning}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <button onClick={downloadSvg} style={{ background: "none", border: "1px solid #2A2A2A", cursor: "pointer", padding: "8px 16px", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#F5A623", letterSpacing: "0.08em", textTransform: "uppercase", transition: "border-color 150ms ease" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.borderColor = "#F5A623")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.borderColor = "#2A2A2A")}>
          Download SVG
        </button>
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Typographic concept using Google Fonts
        </p>
      </div>
    </div>
  );
}

const SYSTEM = `You are a typographic designer. Return three distinct wordmark concepts using only Google Fonts. ALL THREE concepts must strictly follow the style direction specified — do not deviate or mix in other styles. Each concept must differ in typeface and weight, but all must stay within the requested style territory. Justify each choice in one or two sentences.

Return ONLY a raw JSON object with exactly this shape:
{
  "concepts": [
    {
      "conceptName": "Short name for this concept",
      "font": "Google Font name exactly as used in Google Fonts URL",
      "weight": "400",
      "letterSpacing": "0.02em",
      "caseStyle": "lowercase",
      "textColour": "#1A1A1A",
      "backgroundColour": "#FAF8F4",
      "reasoning": "Why this font and treatment matches the brand and style direction.",
      "personality": "Two or three words describing the feel"
    }
  ]
}

No markdown. No backticks. No extra keys. Valid JSON only.`;

export default function Wordmark() {
  const [brandName, setBrandName] = useState("");
  const [personality, setPersonality] = useState("");
  const [styleDir, setStyleDir] = useState("");
  const [inspirationUrl, setInspirationUrl] = useState("");
  const [output, setOutput] = useState<{ concepts: Concept[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [restored, setRestored] = useState<number | null>(null);
  const [rating, setRating] = useState<Rating | null>(() => getFeedback("wordmark"));
  const [note, setNote] = useState(() => getNote("wordmark"));
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const s = decodeShare();
    if (s) {
      if (typeof s.brandName === "string") setBrandName(s.brandName);
      if (typeof s.personality === "string") setPersonality(s.personality);
      if (typeof s.styleDir === "string") setStyleDir(s.styleDir);
      if (typeof s.inspirationUrl === "string") setInspirationUrl(s.inspirationUrl);
    }
    const saved = loadSession("wordmark");
    if (saved) {
      setOutput(saved.output as { concepts: Concept[] });
      setIsDemo(saved.isDemo);
      setRestored(saved.savedAt);
    }
  }, []);

  const isValid = brandName.trim().length > 0 && personality.trim().length > 0 && styleDir.length > 0;

  function handleRating(r: Rating) {
    const next = rating === r ? null : r;
    setRating(next);
    if (next) saveFeedback("wordmark", next);
  }

  function handleNote(n: string) {
    setNote(n);
    saveNote("wordmark", n);
  }

  function handleClear() {
    clearSession("wordmark");
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
  }

  function handleCopyShareLink() {
    const url = encodeShare({ brandName, personality, styleDir, inspirationUrl });
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }

  async function handleSubmit() {
    setError(null); setOutput(null); setRestored(null); setLoading(true); setIsDemo(false);
    markVisited("wordmark");
    const styleDef = STYLE_DEFINITIONS[styleDir] ?? "";
    const parts = [
      `Brand name: "${brandName}".`,
      `Brand personality in one word: "${personality}".`,
      `Style direction: ${styleDir}. Definition: ${styleDef}`,
      `All three concepts MUST strictly follow the "${styleDir}" style direction. Do not stray into other style territories.`,
    ];
    if (inspirationUrl.trim()) parts.push(`Inspiration/reference: ${inspirationUrl}`);
    const prompt = parts.join(" ");
    try {
      const raw = await callOutsideEye(prompt, SYSTEM);
      const data = JSON.parse(raw) as Record<string, unknown>;
      const rawConcepts = Array.isArray(data.concepts)
        ? data.concepts
        : data.concepts && typeof data.concepts === "object"
        ? Object.values(data.concepts as object)
        : [];
      const normalised = { concepts: (rawConcepts as Record<string, unknown>[]).map(normalizeConcept) };
      setOutput(normalised);
      saveSession("wordmark", normalised as unknown as Record<string, unknown>, false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "NO_KEY") {
        const demo = DEMO_RESPONSES.wordmark as { concepts: Concept[] };
        setOutput(demo);
        setIsDemo(true);
        saveSession("wordmark", demo as unknown as Record<string, unknown>, true);
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

      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>07</p>
      <h1 className="fraunces-display" style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 12 }}>The Wordmark Room</h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", marginBottom: 32 }}>Type a brand name. Get three typographic wordmark concepts.</p>
      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      <HowToUse paragraphs={["Enter your brand name and a single word that captures its personality.", "Three distinct typographic treatments will be generated, each with a live preview, reasoning, and an SVG download."]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Brand Name</p>
          <input type="text" className="field-base" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="e.g. Groundwork" />
        </div>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>One word that describes this brand</p>
          <input type="text" className="field-base" value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="e.g. reliable" />
        </div>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Style Direction</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {styles.map((s) => (
              <button key={s} className={`toggle-btn ${styleDir === s ? "active" : ""}`} onClick={() => setStyleDir(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Inspiration or reference URL (optional)</p>
          <input type="url" className="field-base" value={inspirationUrl} onChange={(e) => setInspirationUrl(e.target.value)} placeholder="e.g. a brand whose wordmark style you admire..." />
        </div>
      </div>

      <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading || !isValid} style={{ flex: "none" }}>
          {loading ? "The Outside Eye is reading your work..." : "Get the Outside Eye"}
        </button>
        {isValid && (
          <button
            onClick={handleCopyShareLink}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: shareCopied ? "#7CBA6A" : "#5A5550", padding: 0, transition: "color 150ms ease" }}
            onMouseEnter={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8"; }}
            onMouseLeave={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#5A5550"; }}
          >
            {shareCopied ? "Link copied" : "Copy share link"}
          </button>
        )}
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

          {isDemo && <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>Demo Response — Add your key to generate wordmarks for your brand.</p>}
          {(Array.isArray(output.concepts) ? output.concepts : []).map((c, i) => <WordmarkCard key={i} concept={c} brandName={brandName || "Groundwork"} />)}
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
