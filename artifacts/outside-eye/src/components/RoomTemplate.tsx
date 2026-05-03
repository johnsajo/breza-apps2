import type { ReactNode } from "react";
import { useState } from "react";
import HowToUse from "./HowToUse";
import OutputCard from "./OutputCard";
import { callOutsideEye } from "@/lib/ai";
import { DEMO_RESPONSES } from "@/lib/demo";
import { markVisited } from "@/lib/visited";

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
}: RoomTemplateProps) {
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  async function handleSubmit() {
    setError(null);
    setOutput(null);
    setLoading(true);
    setIsDemo(false);
    markVisited(demoKey);

    try {
      const raw = await callOutsideEye(buildUserPrompt(), systemPrompt);
      const parsed = JSON.parse(raw);
      setOutput(parsed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "NO_KEY") {
        const demo = DEMO_RESPONSES[demoKey];
        if (demo) {
          setOutput(demo as Record<string, unknown>);
          setIsDemo(true);
        } else {
          setError("Add your key in Settings to use this room.");
        }
      } else if (msg === "BAD_KEY") {
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

  return (
    <div className="content-width" style={{ paddingTop: 56 }}>
      <p
        style={{
          fontFamily: "'Departure Mono', 'Courier New', monospace",
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

      {inputSection}

      <div style={{ marginTop: 32 }}>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading || !isValid}
        >
          {loading ? "The Outside Eye is reading your work..." : "Get the Outside Eye"}
        </button>
      </div>

      {error && (
        <p
          style={{
            fontFamily: "'Departure Mono', 'Courier New', monospace",
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
          <hr className="hr-hairline" style={{ marginBottom: 32 }} />
          <OutputCard data={output} isDemo={isDemo} />
        </div>
      )}
    </div>
  );
}
