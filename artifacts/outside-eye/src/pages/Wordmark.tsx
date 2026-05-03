import { useState, useEffect } from "react";
import { callOutsideEye } from "@/lib/ai";
import { DEMO_RESPONSES } from "@/lib/demo";
import { markVisited } from "@/lib/visited";
import HowToUse from "@/components/HowToUse";

const styles = ["Minimal", "Bold", "Geometric", "Editorial", "Handcrafted"];

interface Concept {
  conceptName: string; font: string; weight: string; letterSpacing: string;
  caseStyle: "uppercase" | "lowercase" | "titlecase";
  textColour: string; backgroundColour: string; reasoning: string; personality: string;
}

function WordmarkCard({ concept, brandName }: { concept: Concept; brandName: string }) {
  const displayName = concept.caseStyle === "uppercase" ? brandName.toUpperCase() : concept.caseStyle === "lowercase" ? brandName.toLowerCase() : brandName;

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
      <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 13, color: "#F5A623", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {concept.conceptName} — {concept.personality}
      </p>

      <div style={{ backgroundColor: concept.backgroundColour, padding: "32px 24px", marginBottom: 20, textAlign: "center" }}>
        <span style={{
          fontFamily: `'${concept.font}', Georgia, serif`,
          fontWeight: parseInt(concept.weight),
          fontSize: 48,
          letterSpacing: concept.letterSpacing,
          color: concept.textColour,
          display: "block",
          lineHeight: 1.2,
        }}>
          {displayName}
        </span>
      </div>

      <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8B2A8", lineHeight: 1.6, marginBottom: 16 }}>{concept.reasoning}</p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <button onClick={downloadSvg} style={{ background: "none", border: "1px solid #2A2A2A", cursor: "pointer", padding: "8px 16px", fontFamily: "'Departure Mono', monospace", fontSize: 12, color: "#F5A623", letterSpacing: "0.08em", textTransform: "uppercase", transition: "border-color 150ms ease" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.borderColor = "#F5A623")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.borderColor = "#2A2A2A")}>
          Download SVG
        </button>
        <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 11, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Typographic concept using Google Fonts. Not a generated logo.
        </p>
      </div>
    </div>
  );
}

const SYSTEM = `You are a typographic designer. Return three distinct wordmark concepts using only Google Fonts that are freely available. Each must feel genuinely different in personality. Justify each choice specifically. Return ONLY a JSON object. No markdown.`;

export default function Wordmark() {
  const [brandName, setBrandName] = useState("");
  const [personality, setPersonality] = useState("");
  const [styleDir, setStyleDir] = useState("");
  const [output, setOutput] = useState<{ concepts: Concept[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const isValid = brandName.trim().length > 0 && personality.trim().length > 0 && styleDir.length > 0;

  async function handleSubmit() {
    setError(null); setOutput(null); setLoading(true); setIsDemo(false);
    markVisited("wordmark");
    const prompt = `Brand name: "${brandName}". Personality word: "${personality}". Style direction: ${styleDir}.`;
    try {
      const raw = await callOutsideEye(prompt, SYSTEM);
      setOutput(JSON.parse(raw));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "NO_KEY") { setOutput(DEMO_RESPONSES.wordmark as { concepts: Concept[] }); setIsDemo(true); }
      else if (msg === "BAD_KEY") setError("Your key was rejected. Check it in Settings.");
      else if (msg === "RATE_LIMIT") setError("Rate limit hit. Try again in a moment.");
      else setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="content-width" style={{ paddingTop: 56 }}>
      <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>07</p>
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
      </div>

      <div style={{ marginTop: 32 }}>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading || !isValid}>
          {loading ? "The Outside Eye is reading your work..." : "Get the Outside Eye"}
        </button>
      </div>

      {error && <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 12, color: "#F87171", marginTop: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{error}</p>}

      {output && !loading && (
        <div style={{ marginTop: 40 }}>
          <hr className="hr-hairline" style={{ marginBottom: 32 }} />
          {isDemo && <p style={{ fontFamily: "'Departure Mono', monospace", fontSize: 12, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>Demo Response — Add your key in Settings to generate wordmarks for your brand.</p>}
          {output.concepts.map((c, i) => <WordmarkCard key={i} concept={c} brandName={brandName || "Groundwork"} />)}
        </div>
      )}
      <div style={{ marginTop: 88 }} />
    </div>
  );
}
