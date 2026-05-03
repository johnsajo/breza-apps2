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

const SYSTEM_R1 = `You are a strategic planner who tests whether an insight is genuinely felt or merely constructed. The user has described where they first noticed something. Classify their observation as one of three verdicts: FELT (this is visceral and real — someone lived this moment), OBSERVED (you saw it but did not feel it — you watched it from outside), or ASSUMED (you did not notice this — you decided it was true). If FELT: write one precise insight statement. One sentence. No jargon. Built directly from what they described. If OBSERVED or ASSUMED: write one follow-up question that pushes them toward the real felt truth. Return ONLY a raw JSON object with keys: verdict (string, must be exactly "FELT" or "OBSERVED" or "ASSUMED"), insightStatement (string — the one-sentence insight if FELT, otherwise empty string), followUpQuestion (string — the follow-up question if OBSERVED or ASSUMED, otherwise empty string). No markdown. No backticks. No preamble.`;

const SYSTEM_R2 = `You are a strategic planner completing a two-round insight test. You have seen the user's original observation and their answer to your follow-up question. Give a final verdict. You may now upgrade from OBSERVED to FELT if the follow-up answer reveals genuine lived experience. ASSUMED can upgrade to OBSERVED or FELT. A verdict can never be downgraded. Apply the same rules: FELT gets an insight statement, anything else gets one more follow-up question. Return ONLY a raw JSON object with keys: verdict (string, must be exactly "FELT" or "OBSERVED" or "ASSUMED"), insightStatement (string — if FELT, otherwise empty string), followUpQuestion (string — if not FELT, otherwise empty string). No markdown. No backticks. No preamble.`;

type InsightData = {
  verdict: "FELT" | "OBSERVED" | "ASSUMED";
  insightStatement: string;
  followUpQuestion: string;
};

type SavedInsight = {
  observation: string;
  followUpAnswer?: string;
  round1: InsightData;
  round2?: InsightData;
};

export default function Insight() {
  const [observation, setObservation] = useState("");
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const [round1, setRound1] = useState<InsightData | null>(null);
  const [round2, setRound2] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [restored, setRestored] = useState<number | null>(null);
  const [rating, setRating] = useState<Rating | null>(() => getFeedback("insight"));
  const [note, setNote] = useState(() => getNote("insight"));
  const [shareCopied, setShareCopied] = useState(false);
  const [inDemoMode, setInDemoMode] = useState(
    () => localStorage.getItem("outsideeye_mode") === "demo"
  );
  const [demoIndex, setDemoIndex] = useState(0);

  useEffect(() => {
    const s = decodeShare();
    if (s) {
      if (typeof s.observation === "string") setObservation(s.observation);
      if (typeof s.followUpAnswer === "string") setFollowUpAnswer(s.followUpAnswer);
      if (typeof s._demoExample === "string") {
        const idx = parseInt(s._demoExample, 10);
        if (!isNaN(idx)) {
          const demo = getDemoResponse("insight", idx) as InsightData;
          if (demo) {
            setRound1(demo);
            setIsDemo(true);
            setDemoIndex(idx + 1);
            saveSession("insight", { observation: s.observation ?? "", round1: demo } as unknown as Record<string, unknown>, true);
          }
        }
        return;
      }
    }
    const saved = loadSession("insight");
    if (saved) {
      const o = saved.output as unknown as SavedInsight;
      if (o?.observation) setObservation(o.observation);
      if (o?.followUpAnswer) setFollowUpAnswer(o.followUpAnswer);
      if (o?.round1) setRound1(o.round1);
      if (o?.round2) setRound2(o.round2);
      setIsDemo(saved.isDemo);
      setRestored(saved.savedAt);
    }
  }, []);

  useEffect(() => {
    function sync() {
      setInDemoMode(localStorage.getItem("outsideeye_mode") === "demo");
    }
    window.addEventListener("outsideeye:modechange", sync);
    window.addEventListener("outsideeye:keychange", sync);
    return () => {
      window.removeEventListener("outsideeye:modechange", sync);
      window.removeEventListener("outsideeye:keychange", sync);
    };
  }, []);

  async function handleSubmitRound1() {
    setError(null);
    setRound1(null);
    setRound2(null);
    markVisited("insight");

    if (localStorage.getItem("outsideeye_mode") === "demo") {
      const demo = getDemoResponse("insight", demoIndex) as InsightData;
      if (demo) {
        setRound1(demo);
        setIsDemo(true);
        setDemoIndex((prev) => prev + 1);
        saveSession("insight", { observation, round1: demo } as unknown as Record<string, unknown>, true);
      } else {
        setError("Add your key in Settings to use this room.");
      }
      return;
    }

    setLoading(true);
    try {
      const raw = await callOutsideEye(`Where I first noticed this: "${observation}"`, SYSTEM_R1, undefined, undefined);
      const parsed = JSON.parse(raw) as InsightData;
      setRound1(parsed);
      setIsDemo(false);
      saveSession("insight", { observation, round1: parsed } as unknown as Record<string, unknown>, false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "BAD_KEY") setError("Your key was rejected. Please check it in Settings.");
      else if (msg === "RATE_LIMIT") setError("You have hit your provider rate limit. Try again in a moment.");
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitRound2() {
    if (!round1) return;
    setError(null);
    setRound2(null);

    if (localStorage.getItem("outsideeye_mode") === "demo") {
      const r1Index = (demoIndex - 1) % getDemoCount("insight");
      const followupIdx = Math.max(0, r1Index - 1);
      const demo = getDemoResponse("insightFollowup", followupIdx) as InsightData;
      if (demo) {
        setRound2(demo);
        saveSession("insight", { observation, followUpAnswer, round1, round2: demo } as unknown as Record<string, unknown>, true);
      }
      return;
    }

    setLoading(true);
    try {
      const prompt = `Original observation: "${observation}". Follow-up answer: "${followUpAnswer}"`;
      const raw = await callOutsideEye(prompt, SYSTEM_R2, undefined, undefined);
      const parsed = JSON.parse(raw) as InsightData;
      setRound2(parsed);
      saveSession("insight", { observation, followUpAnswer, round1, round2: parsed } as unknown as Record<string, unknown>, false);
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
    setRound1(null);
    setRound2(null);
    setFollowUpAnswer("");
    setRestored(null);
    setIsDemo(false);
    const demo = getDemoResponse("insight", demoIndex) as InsightData;
    if (demo) {
      setRound1(demo);
      setIsDemo(true);
      setDemoIndex((prev) => prev + 1);
      saveSession("insight", { observation, round1: demo } as unknown as Record<string, unknown>, true);
    }
  }

  function handleClear() {
    clearSession("insight");
    setRound1(null);
    setRound2(null);
    setObservation("");
    setFollowUpAnswer("");
    setRestored(null);
    setIsDemo(false);
  }

  function handleCopyShareLink() {
    const base: Record<string, string> = { observation };
    if (followUpAnswer) base.followUpAnswer = followUpAnswer;
    const state = isDemo
      ? { ...base, _demoExample: String((demoIndex - 1) % getDemoCount("insight")) }
      : base;
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
    if (next) saveFeedback("insight", next);
  }

  function handleNote(n: string) {
    setNote(n);
    saveNote("insight", n);
  }

  const verdictColor = (v: string) =>
    v === "FELT" ? "#F5A623" : v === "OBSERVED" ? "#B8B2A8" : "#F87171";

  const currentResult = round2 ?? round1;
  const needsFollowUp = round1 && round1.verdict !== "FELT" && !round2;

  return (
    <div className="content-width" style={{ paddingTop: 40 }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/">
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#B8B2A8",
              cursor: "pointer",
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5A623")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8B2A8")}
          >
            ← All rooms
          </span>
        </Link>
      </div>

      <p style={{ fontFamily: "'DM Sans'", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>12</p>

      <h1 className="fraunces-display" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 12 }}>
        The Insight Room
      </h1>

      <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", marginBottom: 32 }}>
        One question. Three possible verdicts. Find out whether your insight is real.
      </p>

      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      <HowToUse
        paragraphs={[
          "You will be asked one question: where did you first notice this? Answer in your own words. Not strategy language. Not research language. Just where you actually noticed it.",
          "The room will tell you whether your insight is FELT (real, lived, yours), OBSERVED (you saw it but didn't feel it), or ASSUMED (you decided it — you didn't notice it). Two rounds maximum.",
        ]}
        example="e.g. In a supermarket queue when the person in front couldn't find their card and nobody said anything."
      />

      {inDemoMode && (
        <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5550", marginBottom: 16 }}>
          Demo mode — add your key in Settings for feedback on your actual work.
        </p>
      )}

      <div style={{ marginBottom: 24 }}>
        <p className="label-mono-grey" style={{ marginBottom: 8 }}>Where did you first notice this?</p>
        <textarea
          className="field-base"
          rows={5}
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          placeholder="Describe the moment you first noticed the thing your work is built around. Be specific. Use first person."
          style={{ resize: "vertical" }}
          disabled={!!round1}
        />
      </div>

      {!round1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button
            className="btn-primary"
            onClick={handleSubmitRound1}
            disabled={loading || observation.trim().length < 10}
          >
            {loading ? "Reading your observation..." : "Test this insight"}
          </button>
          <ModeBadge />
        </div>
      )}

      {error && (
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#F87171", marginTop: 16 }}>{error}</p>
      )}

      {restored && !round1 && (
        <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#5A5550", marginTop: 12 }}>
          Restored from {new Date(restored).toLocaleDateString()}.{" "}
          <button onClick={handleClear} style={{ background: "none", border: "none", color: "#5A5550", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 12, padding: 0, textDecoration: "underline" }}>
            Clear
          </button>
        </p>
      )}

      {round1 && (
        <div style={{ marginTop: 40 }}>
          <div style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 32, marginBottom: 24 }}>
            {isDemo && (
              <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B2A8", marginBottom: 20 }}>
                Demo Response — Add your key in Settings for feedback on your actual work.
              </p>
            )}

            <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5550", marginBottom: 12 }}>
              {round2 ? "Final verdict" : "Round 1 verdict"}
            </p>

            <p
              className="fraunces-display"
              style={{
                fontSize: "clamp(40px, 8vw, 64px)",
                fontWeight: 700,
                color: verdictColor((round2 ?? round1).verdict),
                lineHeight: 1,
                marginBottom: 24,
                letterSpacing: "-0.02em",
              }}
            >
              {(round2 ?? round1).verdict}
            </p>

            <hr style={{ border: "none", borderTop: "1px solid #2A2A2A", marginBottom: 24 }} />

            {currentResult?.insightStatement && (
              <p style={{ fontFamily: "'DM Sans'", fontSize: 18, color: "#F5F0E8", lineHeight: 1.65 }}>
                {currentResult.insightStatement}
              </p>
            )}

            {needsFollowUp && (
              <div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", lineHeight: 1.65, marginBottom: 24 }}>
                  {round1.followUpQuestion}
                </p>
                <p className="label-mono-grey" style={{ marginBottom: 8 }}>Your answer</p>
                <textarea
                  className="field-base"
                  rows={4}
                  value={followUpAnswer}
                  onChange={(e) => setFollowUpAnswer(e.target.value)}
                  placeholder="Answer in your own words..."
                  style={{ resize: "vertical", marginBottom: 16 }}
                />
                <button
                  className="btn-primary"
                  onClick={handleSubmitRound2}
                  disabled={loading || followUpAnswer.trim().length < 5}
                >
                  {loading ? "Reading..." : "Submit follow-up"}
                </button>
              </div>
            )}

            {round2 && round2.followUpQuestion && (
              <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", lineHeight: 1.65, marginTop: 20 }}>
                {round2.followUpQuestion}
              </p>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
            {inDemoMode && (
              <>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#B8B2A8" }}>
                  {((demoIndex - 1) % getDemoCount("insight")) + 1} of {getDemoCount("insight")}
                </span>
                <button
                  style={{ background: "#F5A623", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D0D0D", padding: "6px 14px", fontWeight: 600, transition: "opacity 150ms ease" }}
                  onClick={handleNextDemo}
                >
                  Try another example →
                </button>
              </>
            )}
            {!inDemoMode && (
              <button
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5550", padding: 0, transition: "color 150ms ease" }}
                onClick={handleClear}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#5A5550")}
              >
                Try again
              </button>
            )}

            <button
              onClick={handleCopyShareLink}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: shareCopied ? "#7CBA6A" : "#5A5550", padding: 0, transition: "color 150ms ease" }}
              onMouseEnter={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8"; }}
              onMouseLeave={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#5A5550"; }}
            >
              {shareCopied ? "Link copied" : isDemo ? "Share this example" : "Copy share link"}
            </button>
            <ModeBadge />
          </div>

          <div style={{ borderTop: "1px solid #2A2A2A", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: rating ? "#B8B2A8" : "#5A5550" }}>
              {rating === "up" ? "Marked useful" : rating === "down" ? "Marked not useful" : "Was this useful?"}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {(["up", "down"] as Rating[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRating(r)}
                  style={{ fontFamily: "'DM Sans'", fontSize: 13, color: rating === r ? (r === "up" ? "#7CBA6A" : "#F87171") : "#B8B2A8", background: "none", border: `1px solid ${rating === r ? (r === "up" ? "#7CBA6A" : "#F87171") : "#2A2A2A"}`, padding: "4px 10px", cursor: "pointer", transition: "color 150ms ease, border-color 150ms ease", lineHeight: 1 }}>
                  {r === "up" ? "↑" : "↓"}
                </button>
              ))}
            </div>
          </div>

          {rating && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1A1A1A" }}>
              <input
                type="text"
                value={note}
                placeholder="Add a note…"
                onChange={(e) => handleNote(e.target.value)}
                style={{ width: "100%", background: "none", border: "none", borderBottom: "1px solid #2A2A2A", outline: "none", fontFamily: "'DM Sans'", fontSize: 12, color: "#B8B2A8", padding: "4px 0", boxSizing: "border-box" }}
              />
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 88 }} />
    </div>
  );
}
