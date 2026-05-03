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

const industries = [
  "Advertising and Marketing", "Arts and Culture", "Automotive",
  "Beauty and Wellness", "Creative Agency", "Education", "Entertainment",
  "Fashion and Apparel", "Finance and Banking", "Food and Drink",
  "Health and Wellness", "Hospitality and Tourism", "Media and Publishing",
  "Non-profit and Charity", "Professional Services", "Real Estate",
  "Retail and E-commerce", "Sport and Fitness", "Tech and Software",
  "Trades and Construction", "Other",
];

const toneAdjectives = [
  "Witty", "Warm", "Direct", "Bold", "Playful", "Authoritative",
  "Empathetic", "Irreverent", "Refined", "Urgent", "Casual", "Formal",
  "Poetic", "Dry", "Energetic", "Calm",
];

interface Rewrite { label: string; before: string; after: string }
interface VoiceArchetype { name: string; description: string }
interface ToneData {
  voiceArchetype: VoiceArchetype;
  manifesto: string;
  characterTraits: string[];
  wordsToUse: string[];
  wordsToAvoid: string[];
  doList: string[];
  dontList: string[];
  rewrites: Rewrite[];
}

function normalizeArr(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x) => typeof x === "string");
  return [];
}

function normalizeToneData(raw: Record<string, unknown>): ToneData {
  const archetype = (raw.voiceArchetype ?? raw.archetype ?? raw.voice_archetype ?? {}) as Record<string, unknown>;
  const rewrites = (Array.isArray(raw.rewrites) ? raw.rewrites : []) as Record<string, unknown>[];
  return {
    voiceArchetype: {
      name: typeof archetype.name === "string" ? archetype.name : "",
      description: typeof archetype.description === "string" ? archetype.description : "",
    },
    manifesto: typeof raw.manifesto === "string"
      ? raw.manifesto
      : typeof raw.voiceManifesto === "string"
      ? raw.voiceManifesto
      : "",
    characterTraits: normalizeArr(raw.characterTraits ?? raw.traits ?? raw.character_traits),
    wordsToUse: normalizeArr(raw.wordsToUse ?? raw.words_to_use ?? raw.useWords ?? raw.words),
    wordsToAvoid: normalizeArr(raw.wordsToAvoid ?? raw.words_to_avoid ?? raw.avoidWords ?? raw.avoid),
    doList: normalizeArr(raw.doList ?? raw.dos ?? raw.do_list ?? raw.do),
    dontList: normalizeArr(raw.dontList ?? raw.donts ?? raw.dont_list ?? raw.dont),
    rewrites: rewrites.map((r) => ({
      label: typeof r.label === "string" ? r.label : "Example",
      before: typeof r.before === "string" ? r.before : "",
      after: typeof r.after === "string" ? r.after : "",
    })),
  };
}

const SYSTEM = `You are a brand voice strategist. You help brands find and define their authentic tone of voice. Be specific and opinionated. Generic voice guides are useless. Make every element particular to this brand.

Return ONLY a raw JSON object with EXACTLY this shape:
{
  "voiceArchetype": { "name": "A short evocative name for this voice", "description": "Two sentences describing this archetype and why it fits." },
  "manifesto": "One sentence that captures the essential voice. Not a tagline — a principle.",
  "characterTraits": ["Trait one", "Trait two", "Trait three", "Trait four"],
  "wordsToUse": ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8"],
  "wordsToAvoid": ["word1", "word2", "word3", "word4", "word5", "word6"],
  "doList": ["Specific do instruction", "Specific do instruction", "Specific do instruction", "Specific do instruction"],
  "dontList": ["Specific dont instruction", "Specific dont instruction", "Specific dont instruction"],
  "rewrites": [
    { "label": "Product description", "before": "A generic version of this sentence for this brand category.", "after": "The same sentence rewritten in this brand voice." },
    { "label": "Error message", "before": "Something went wrong. Please try again.", "after": "Rewritten in the brand voice." },
    { "label": "Call to action", "before": "A generic CTA for this category.", "after": "The CTA rewritten in the brand voice." }
  ]
}

No markdown. No backticks. No extra keys. Valid JSON only.`;

export default function ToneOfVoice() {
  const [brandDesc, setBrandDesc] = useState("");
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [output, setOutput] = useState<ToneData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [restored, setRestored] = useState<number | null>(null);
  const [rating, setRating] = useState<Rating | null>(() => getFeedback("tone"));
  const [note, setNote] = useState(() => getNote("tone"));
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const s = decodeShare();
    if (s) {
      if (typeof s.brandDesc === "string") setBrandDesc(s.brandDesc);
      if (typeof s.industry === "string") setIndustry(s.industry);
      if (typeof s.audience === "string") setAudience(s.audience);
      if (Array.isArray(s.selectedTones)) setSelectedTones(s.selectedTones as string[]);
    }
    const saved = loadSession("tone");
    if (saved) {
      setOutput(saved.output as ToneData);
      setIsDemo(saved.isDemo);
      setRestored(saved.savedAt);
    }
  }, []);

  const isValid = brandDesc.trim().length > 0 && industry.length > 0 && audience.trim().length > 0;

  function toggleTone(t: string) {
    setSelectedTones((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  function handleRating(r: Rating) {
    const next = rating === r ? null : r;
    setRating(next);
    if (next) saveFeedback("tone", next);
  }

  function handleNote(n: string) {
    setNote(n);
    saveNote("tone", n);
  }

  function handleClear() {
    clearSession("tone");
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
  }

  function handleCopyShareLink() {
    const url = encodeShare({ brandDesc, industry, audience, selectedTones });
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }

  async function handleSubmit() {
    setError(null);
    setOutput(null);
    setRestored(null);
    setLoading(true);
    setIsDemo(false);
    markVisited("tone");

    const parts = [
      `Brand description: ${brandDesc}.`,
      `Industry: ${industry}.`,
      `Target audience: ${audience}.`,
    ];
    if (selectedTones.length > 0) {
      parts.push(`Tone adjectives to lean into: ${selectedTones.join(", ")}.`);
    }
    const prompt = parts.join(" ");

    try {
      const raw = await callOutsideEye(prompt, SYSTEM);
      const data = normalizeToneData(JSON.parse(raw) as Record<string, unknown>);
      setOutput(data);
      saveSession("tone", data as unknown as Record<string, unknown>, false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "NO_KEY") {
        const demo = DEMO_RESPONSES.tone as ToneData;
        setOutput(demo);
        setIsDemo(true);
        saveSession("tone", demo as unknown as Record<string, unknown>, true);
      } else if (msg === "BAD_KEY") {
        setError("Your key was rejected. Check it in Settings.");
      } else if (msg === "RATE_LIMIT") {
        setError("Rate limit hit. Try again in a moment.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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

      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>10</p>
      <h1 className="fraunces-display" style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 12 }}>
        The Voice Room
      </h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", marginBottom: 32 }}>
        Describe your brand. Get a full tone of voice guide with rewrite examples.
      </p>
      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      <HowToUse
        paragraphs={[
          "Describe what your brand does and who it is for. Select your industry and pick a few tone adjectives if you already have a feel in mind.",
          "You will get a voice archetype, a one-line manifesto, words to use and avoid, specific do and don't rules, and three before/after rewrite examples showing the voice in action.",
        ]}
        example="e.g. A sustainable homewares brand for young Australian renters who care about quality and ethics but have a tight budget."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Describe your brand</p>
          <textarea
            className="field-base"
            rows={4}
            value={brandDesc}
            onChange={(e) => setBrandDesc(e.target.value)}
            placeholder="What does your brand do? What does it stand for? What makes it different?"
            style={{ resize: "vertical" }}
          />
        </div>

        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Industry</p>
          <select
            className="field-base"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F5A623' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
          >
            <option value="">Select industry...</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <p className="label-mono-grey" style={{ marginBottom: 8 }}>Who are you talking to?</p>
          <input
            type="text"
            className="field-base"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. First-time homeowners aged 28-40 who want quality without pretension"
          />
        </div>

        <div>
          <p className="label-mono-grey" style={{ marginBottom: 12 }}>Tone adjectives (optional — pick any that feel right)</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {toneAdjectives.map((t) => (
              <button
                key={t}
                className={`toggle-btn ${selectedTones.includes(t) ? "active" : ""}`}
                onClick={() => toggleTone(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading || !isValid}
          style={{ flex: "none" }}
        >
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

      {error && (
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#F87171", marginTop: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {error}
        </p>
      )}

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

          {isDemo && (
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>
              Demo Response — Add your key in Settings for a real voice guide.
            </p>
          )}

          {/* Archetype */}
          <div style={{ backgroundColor: "#1C1C1C", borderLeft: "3px solid #F5A623", padding: 28, marginBottom: 32 }}>
            <p className="label-mono" style={{ marginBottom: 10 }}>Voice Archetype</p>
            <p className="fraunces-display" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.15, marginBottom: 12 }}>
              {output.voiceArchetype.name}
            </p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: "#B8B2A8", lineHeight: 1.65 }}>
              {output.voiceArchetype.description}
            </p>
          </div>

          {/* Manifesto */}
          {output.manifesto && (
            <div style={{ marginBottom: 32 }}>
              <p className="label-mono" style={{ marginBottom: 12 }}>Voice Manifesto</p>
              <p className="fraunces-label" style={{ fontStyle: "italic", fontSize: "clamp(18px, 3vw, 24px)", color: "#F5A623", lineHeight: 1.45 }}>
                "{output.manifesto}"
              </p>
            </div>
          )}

          {/* Character Traits */}
          {output.characterTraits.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <p className="label-mono" style={{ marginBottom: 16 }}>Character Traits</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {output.characterTraits.map((trait, i) => (
                  <span key={i} style={{ border: "1px solid #3A3A3A", padding: "6px 14px", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#F5F0E8", letterSpacing: "0.04em" }}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          <hr className="hr-hairline" style={{ marginBottom: 32 }} />

          {/* Words */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            {output.wordsToUse.length > 0 && (
              <div>
                <p className="label-mono" style={{ marginBottom: 16, color: "#7CBA6A" }}>Words to use</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {output.wordsToUse.map((w, i) => (
                    <span key={i} style={{ backgroundColor: "#1A2A1A", border: "1px solid #2A3A2A", padding: "4px 12px", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#7CBA6A" }}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {output.wordsToAvoid.length > 0 && (
              <div>
                <p className="label-mono" style={{ marginBottom: 16, color: "#F87171" }}>Words to avoid</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {output.wordsToAvoid.map((w, i) => (
                    <span key={i} style={{ backgroundColor: "#2A1A1A", border: "1px solid #3A2A2A", padding: "4px 12px", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#F87171" }}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Do / Don't */}
          {(output.doList.length > 0 || output.dontList.length > 0) && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
              {output.doList.length > 0 && (
                <div>
                  <p className="label-mono" style={{ marginBottom: 16, color: "#7CBA6A" }}>Do</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {output.doList.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#7CBA6A", fontFamily: "'DM Sans'", fontSize: 14, flexShrink: 0, marginTop: 2 }}>✓</span>
                        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8B2A8", lineHeight: 1.55 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {output.dontList.length > 0 && (
                <div>
                  <p className="label-mono" style={{ marginBottom: 16, color: "#F87171" }}>Don't</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {output.dontList.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#F87171", fontFamily: "'DM Sans'", fontSize: 14, flexShrink: 0, marginTop: 2 }}>✗</span>
                        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8B2A8", lineHeight: 1.55 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Rewrites */}
          {output.rewrites.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <p className="label-mono" style={{ marginBottom: 20 }}>Voice in Action</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {output.rewrites.map((rw, i) => (
                  <div key={i} style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 24 }}>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#F5A623", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                      {rw.label}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#5A5550", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Before</p>
                        <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#5A5550", lineHeight: 1.6, fontStyle: "italic" }}>{rw.before}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#7CBA6A", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>After</p>
                        <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#F5F0E8", lineHeight: 1.6 }}>{rw.after}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B2A8", background: "none", border: "1px solid #2A2A2A", padding: "5px 12px", cursor: "pointer", transition: "color 150ms ease, border-color 150ms ease" }}
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
