import { useState, useEffect } from "react";
import { Link } from "wouter";
import HowToUse from "@/components/HowToUse";
import ModeBadge from "@/components/ModeBadge";
import { callOutsideEye } from "@/lib/ai";
import { getDemoResponse, getDemoCount } from "@/lib/demo";
import { markVisited } from "@/lib/visited";
import { saveSession, loadSession, clearSession } from "@/lib/session";
import { encodeShare, decodeShare } from "@/lib/sharelink";
import { saveFeedback, getFeedback, saveNote, getNote, type Rating } from "@/lib/feedback";

const SYSTEM = `You are a creative historian and pattern spotter. Given a creative idea — a campaign concept, visual device, brand voice, structural mechanic, or anything — trace its lineage through three ancestor cards. Card 1: The Oldest One. The earliest known use of this idea or structural device. Card 2: The Famous One. The version most people know even if they don't know it by name. Card 3: The Uncomfortable One. The version that is uncomfortably close to what the user appears to be making right now. Be honest. Be specific. Name real work. Return ONLY a raw JSON object with keys: oldest (object with year string, name string, why string), famous (object with year string, name string, why string), uncomfortable (object with year string, name string, why string). No markdown code fences. No backticks. No preamble.`;

type AncestorCard = { year: string; name: string; why: string };
type LineageData = { oldest: AncestorCard; famous: AncestorCard; uncomfortable: AncestorCard };

function normalizeCard(raw: unknown): AncestorCard {
  const obj = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  return {
    year: String(obj.year ?? obj.date ?? obj.era ?? obj.period ?? ""),
    name: String(obj.name ?? obj.title ?? obj.work ?? obj.campaign ?? obj.piece ?? ""),
    why: String(obj.why ?? obj.reason ?? obj.explanation ?? obj.description ?? obj.note ?? ""),
  };
}

function normalizeLineageData(raw: Record<string, unknown>): LineageData {
  return {
    oldest: normalizeCard(
      raw.oldest ?? raw.oldest_one ?? raw.original ?? raw.originalVersion ?? raw.card1
    ),
    famous: normalizeCard(
      raw.famous ?? raw.famous_one ?? raw.wellKnown ?? raw.well_known ?? raw.card2
    ),
    uncomfortable: normalizeCard(
      raw.uncomfortable ?? raw.uncomfortable_one ?? raw.recent ?? raw.tooClose ?? raw.too_close ?? raw.card3
    ),
  };
}

export default function Lineage() {
  const [idea, setIdea] = useState("");
  const [output, setOutput] = useState<LineageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [restored, setRestored] = useState<number | null>(null);
  const [rating, setRating] = useState<Rating | null>(() => getFeedback("lineage"));
  const [note, setNote] = useState(() => getNote("lineage"));
  const [shareCopied, setShareCopied] = useState(false);
  const [inDemoMode, setInDemoMode] = useState(
    () => localStorage.getItem("outsideeye_mode") === "demo"
  );
  const [demoIndex, setDemoIndex] = useState(0);

  useEffect(() => {
    const s = decodeShare();
    if (s) {
      if (typeof s.idea === "string") setIdea(s.idea);
      if (typeof s._demoExample === "string") {
        const idx = parseInt(s._demoExample, 10);
        if (!isNaN(idx)) {
          const demo = getDemoResponse("lineage", idx) as LineageData;
          if (demo) { setOutput(demo); setIsDemo(true); setDemoIndex(idx + 1); saveSession("lineage", demo as unknown as Record<string, unknown>, true); }
        }
        return;
      }
    }
    const saved = loadSession("lineage");
    if (saved) {
      setOutput(saved.output as unknown as LineageData);
      setIsDemo(saved.isDemo);
      setRestored(saved.savedAt);
    }
  }, []);

  useEffect(() => {
    function sync() { setInDemoMode(localStorage.getItem("outsideeye_mode") === "demo"); }
    window.addEventListener("outsideeye:modechange", sync);
    window.addEventListener("outsideeye:keychange", sync);
    return () => {
      window.removeEventListener("outsideeye:modechange", sync);
      window.removeEventListener("outsideeye:keychange", sync);
    };
  }, []);

  async function handleSubmit() {
    setError(null);
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
    markVisited("lineage");

    if (localStorage.getItem("outsideeye_mode") === "demo") {
      const demo = getDemoResponse("lineage", demoIndex) as LineageData;
      if (demo) {
        setOutput(demo);
        setIsDemo(true);
        setDemoIndex((prev) => prev + 1);
        saveSession("lineage", demo as unknown as Record<string, unknown>, true);
      } else {
        setError("Add your key in Settings to use this room.");
      }
      return;
    }

    setLoading(true);
    try {
      const raw = await callOutsideEye(`The creative idea: ${idea}`, SYSTEM, undefined, undefined);
      const parsed = normalizeLineageData(JSON.parse(raw) as Record<string, unknown>);
      setOutput(parsed);
      setIsDemo(false);
      saveSession("lineage", parsed as unknown as Record<string, unknown>, false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "BAD_KEY") setError("Your key was rejected. Please check it in Settings.");
      else if (msg === "RATE_LIMIT") setError("You have hit your provider rate limit. Try again in a moment.");
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleNextDemo() {
    const demo = getDemoResponse("lineage", demoIndex) as LineageData;
    if (demo) {
      setOutput(demo);
      setIsDemo(true);
      setDemoIndex((prev) => prev + 1);
      setRestored(null);
      saveSession("lineage", demo as unknown as Record<string, unknown>, true);
    }
  }

  function handleClear() {
    clearSession("lineage");
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
  }

  function handleCopyShareLink() {
    const base = { idea };
    const state = isDemo ? { ...base, _demoExample: String((demoIndex - 1) % getDemoCount("lineage")) } : base;
    const url = encodeShare(state);
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      window.dispatchEvent(new Event("outsideeye:copied"));
      setTimeout(() => setShareCopied(false), 2000);
    });
  }

  function handleRating(r: Rating) {
    const next = rating === r ? null : r;
    setRating(next);
    if (next) saveFeedback("lineage", next);
  }

  function handleNote(n: string) {
    setNote(n);
    saveNote("lineage", n);
  }

  const cardLabel = (key: string) =>
    key === "oldest" ? "The Oldest One" : key === "famous" ? "The Famous One" : "The Uncomfortable One";

  return (
    <div className="content-width" style={{ paddingTop: 40 }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/">
          <span
            style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#B8B2A8", cursor: "pointer", transition: "color 150ms ease" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5A623")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8B2A8")}
          >
            ← All rooms
          </span>
        </Link>
      </div>

      <p style={{ fontFamily: "'DM Sans'", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>13</p>

      <h1 className="fraunces-display" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 12 }}>
        The Lineage Room
      </h1>

      <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", marginBottom: 32 }}>
        Describe a creative idea. Find out where it came from.
      </p>

      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      <HowToUse
        paragraphs={[
          "Describe the idea you are working on. It could be a campaign concept, a visual device, a brand voice approach, a structural mechanic, or anything creative.",
          "The room will trace its lineage back through three ancestor cards: the oldest known use, the version everyone knows, and the one that is uncomfortably close to what you are making.",
        ]}
        example="e.g. A campaign where customers share unfiltered, lo-fi video of themselves using the product."
      />

      {inDemoMode && (
        <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5550", marginBottom: 16 }}>
          Demo mode — add your key in Settings for feedback on your actual work.
        </p>
      )}

      <div style={{ marginBottom: 24 }}>
        <p className="label-mono-grey" style={{ marginBottom: 8 }}>Describe the creative idea</p>
        <textarea
          className="field-base"
          rows={5}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Campaign concept, visual device, brand voice approach, structural mechanic, or anything else..."
          style={{ resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading || idea.trim().length < 10}
        >
          {loading ? "Tracing the lineage..." : "Trace the lineage"}
        </button>

        {output && (
          <button
            onClick={handleCopyShareLink}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: shareCopied ? "#7CBA6A" : "#5A5550", padding: 0, transition: "color 150ms ease" }}
            onMouseEnter={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8"; }}
            onMouseLeave={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#5A5550"; }}
          >
            {shareCopied ? "Link copied" : isDemo ? "Share this example" : "Copy share link"}
          </button>
        )}
        <ModeBadge />
      </div>

      {error && (
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#F87171", marginBottom: 24 }}>{error}</p>
      )}

      {restored && !output && (
        <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#5A5550", marginBottom: 16 }}>
          Restored from {new Date(restored).toLocaleDateString()}.{" "}
          <button onClick={handleClear} style={{ background: "none", border: "none", color: "#5A5550", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 12, padding: 0, textDecoration: "underline" }}>Clear</button>
        </p>
      )}

      {output && (
        <div>
          {isDemo && (
            <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B2A8", marginBottom: 20 }}>
              Demo Response — Add your key in Settings for feedback on your actual work.
            </p>
          )}

          {(["oldest", "famous", "uncomfortable"] as const).map((key) => {
            const card = output[key];
            const isUncomfortable = key === "uncomfortable";
            return (
              <div
                key={key}
                style={{
                  border: isUncomfortable ? "1px solid #F5A623" : "1px solid #2A2A2A",
                  backgroundColor: "#141414",
                  padding: 32,
                  marginBottom: isUncomfortable ? 0 : 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: isUncomfortable ? "#F5A623" : "#5A5550", flexShrink: 0 }}>
                    {cardLabel(key)}
                  </p>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: isUncomfortable ? "#F5A623" : "#B8B2A8", fontWeight: 500 }}>
                    {card.year}
                  </span>
                </div>

                <hr style={{ border: "none", borderTop: isUncomfortable ? "1px solid #F5A623" : "1px solid #2A2A2A", marginBottom: 16, opacity: isUncomfortable ? 0.4 : 1 }} />

                <p className="fraunces-label" style={{ fontSize: 22, fontWeight: 500, color: isUncomfortable ? "#F5F0E8" : "#F5F0E8", marginBottom: 12, lineHeight: 1.3 }}>
                  {card.name}
                </p>

                <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", lineHeight: 1.65 }}>
                  {card.why}
                </p>

                {isUncomfortable && (
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#F5A623", marginTop: 20, fontStyle: "italic", letterSpacing: "0.02em" }}>
                    This is not a reason to stop. It is a reason to go further.
                  </p>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            {inDemoMode ? (
              <>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#B8B2A8" }}>
                  {((demoIndex - 1) % getDemoCount("lineage")) + 1} of {getDemoCount("lineage")}
                </span>
                <button
                  style={{ background: "#F5A623", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D0D0D", padding: "6px 14px", fontWeight: 600, transition: "opacity 150ms ease" }}
                  onClick={handleNextDemo}
                >
                  Try another example →
                </button>
              </>
            ) : (
              <button
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5550", padding: 0, transition: "color 150ms ease" }}
                onClick={handleClear}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#5A5550")}
              >
                Try again
              </button>
            )}
          </div>

          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: rating ? "#B8B2A8" : "#5A5550" }}>
              {rating === "up" ? "Marked useful" : rating === "down" ? "Marked not useful" : "Was this useful?"}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {(["up", "down"] as Rating[]).map((r) => (
                <button key={r} onClick={() => handleRating(r)} style={{ fontFamily: "'DM Sans'", fontSize: 13, color: rating === r ? (r === "up" ? "#7CBA6A" : "#F87171") : "#B8B2A8", background: "none", border: `1px solid ${rating === r ? (r === "up" ? "#7CBA6A" : "#F87171") : "#2A2A2A"}`, padding: "4px 10px", cursor: "pointer", transition: "color 150ms ease, border-color 150ms ease", lineHeight: 1 }}>
                  {r === "up" ? "↑" : "↓"}
                </button>
              ))}
            </div>
          </div>

          {rating && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1A1A1A" }}>
              <input type="text" value={note} placeholder="Add a note…" onChange={(e) => handleNote(e.target.value)} style={{ width: "100%", background: "none", border: "none", borderBottom: "1px solid #2A2A2A", outline: "none", fontFamily: "'DM Sans'", fontSize: 12, color: "#B8B2A8", padding: "4px 0", boxSizing: "border-box" }} />
            </div>
          )}

          <div style={{ marginTop: 88 }} />
        </div>
      )}
    </div>
  );
}
