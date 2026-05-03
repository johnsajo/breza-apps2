import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import HowToUse from "./HowToUse";
import OutputCard from "./OutputCard";
import ModeBadge from "./ModeBadge";
import { callOutsideEye } from "@/lib/ai";
import { DEMO_RESPONSES } from "@/lib/demo";
import { markVisited } from "@/lib/visited";
import { saveSession, loadSession, clearSession, sessionAge } from "@/lib/session";
import { encodeShare, type ShareState } from "@/lib/sharelink";

interface RoomTemplateProps {
  roomNumber: string;
  roomName: string;
  tagline: string;
  howToUse: { paragraphs: string[]; example?: string };
  demoKey: string;
  systemPrompt: string;
  buildUserPrompt: () => string;
  inputSection: ReactNode;
  isValid: boolean;
  imageBase64?: string;
  imageType?: string;
  shareState?: ShareState;
}

export default function RoomTemplate({
  roomNumber,
  roomName,
  tagline,
  howToUse,
  demoKey,
  systemPrompt,
  buildUserPrompt,
  inputSection,
  isValid,
  imageBase64,
  imageType,
  shareState,
}: RoomTemplateProps) {
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [restored, setRestored] = useState<number | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [inDemoMode, setInDemoMode] = useState(
    () => localStorage.getItem("outsideeye_mode") === "demo"
  );

  useEffect(() => {
    const saved = loadSession(demoKey);
    if (saved) {
      setOutput(saved.output);
      setIsDemo(saved.isDemo);
      setRestored(saved.savedAt);
    }
  }, [demoKey]);

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

  async function handleSubmit() {
    setError(null);
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
    markVisited(demoKey);

    if (localStorage.getItem("outsideeye_mode") === "demo") {
      const demo = DEMO_RESPONSES[demoKey];
      if (demo) {
        setOutput(demo as Record<string, unknown>);
        setIsDemo(true);
        saveSession(demoKey, demo as Record<string, unknown>, true);
      } else {
        setError("Add your key in Settings to use this room.");
      }
      return;
    }

    setLoading(true);
    try {
      const raw = await callOutsideEye(buildUserPrompt(), systemPrompt, imageBase64, imageType);
      const parsed = JSON.parse(raw);
      setOutput(parsed);
      saveSession(demoKey, parsed, false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "BAD_KEY") {
        setError("Your key was rejected. Please check it in Settings.");
      } else if (msg === "RATE_LIMIT") {
        setError("You have hit your provider rate limit. Try again in a moment.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    clearSession(demoKey);
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
  }

  function handleCopyShareLink() {
    if (!shareState) return;
    const url = encodeShare(shareState);
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }

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

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#F5A623",
          marginBottom: 8,
        }}
      >
        {roomNumber}
      </p>

      <h1
        className="fraunces-display"
        style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 600,
          color: "#F5F0E8",
          lineHeight: 1.1,
          marginBottom: 12,
        }}
      >
        {roomName}
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 17,
          color: "#B8B2A8",
          marginBottom: 32,
        }}
      >
        {tagline}
      </p>

      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      <HowToUse paragraphs={howToUse.paragraphs} example={howToUse.example} />

      {inDemoMode && (
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5A5550",
            marginBottom: 16,
          }}
        >
          Demo mode — add your key in Settings for feedback on your actual work.
        </p>
      )}

      {inputSection}

      <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading || !isValid}
          style={{ flex: "none" }}
        >
          {loading ? "The Outside Eye is reading your work..." : "Get the Outside Eye"}
        </button>

        {shareState && (
          <button
            onClick={handleCopyShareLink}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: shareCopied ? "#7CBA6A" : "#5A5550",
              padding: 0,
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8"; }}
            onMouseLeave={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#5A5550"; }}
          >
            {shareCopied ? "Link copied" : "Copy share link"}
          </button>
        )}
        <ModeBadge />
      </div>

      {error && (
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 12,
            color: "#F87171",
            marginTop: 16,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {error}
        </p>
      )}

      {output && !loading && (
        <div style={{ marginTop: 40 }}>
          <hr className="hr-hairline" style={{ marginBottom: 24 }} />

          {restored !== null && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 14px",
                backgroundColor: "#141414",
                border: "1px solid #2A2A2A",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#B8B2A8",
                }}
              >
                Last session · {sessionAge(restored)}
              </p>
              <button
                onClick={handleClear}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#5A5550",
                  padding: 0,
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F87171")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#5A5550")}
              >
                Clear
              </button>
            </div>
          )}

          <OutputCard data={output} isDemo={isDemo} feedbackKey={demoKey} />

          <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#B8B2A8",
                background: "none",
                border: "1px solid #2A2A2A",
                padding: "5px 12px",
                cursor: "pointer",
                transition: "color 150ms ease, border-color 150ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )}
      <div style={{ marginTop: 88 }} />
    </div>
  );
}
