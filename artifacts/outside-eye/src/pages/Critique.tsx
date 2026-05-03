import { useState } from "react";
import RoomTemplate from "@/components/RoomTemplate";

const workTypes = ["Logo", "Ad", "Layout", "Copy", "Social Post", "Concept", "Website", "Packaging", "Other"];

const SYSTEM = `You are a senior creative director with 25 years across advertising, branding, and design. You review work from emerging creatives. You are direct, honest, generous with specific guidance, and completely intolerant of safe or generic thinking. Never soften feedback. Never give hollow praise. Always end with one specific thing they must fix before this work goes anywhere. Return ONLY a JSON object. No markdown. No explanation outside the JSON.`;

export default function Critique() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [pastedText, setPastedText] = useState("");
  const [workType, setWorkType] = useState("");
  const [audience, setAudience] = useState("");
  const [intent, setIntent] = useState("");

  const isValid = (mode === "text" ? pastedText.trim().length > 0 : true) && workType && audience && intent.trim().length > 0;

  function buildUserPrompt() {
    return `Work type: ${workType}. Intended for: ${audience}. What I was going for: ${intent}. ${mode === "text" && pastedText ? `The copy reads: ${pastedText}` : ""}`.trim();
  }

  return (
    <RoomTemplate
      roomNumber="01"
      roomName="The Critique"
      tagline="Upload your work or paste your copy. Get specific, honest feedback."
      howToUse={{
        paragraphs: [
          "Describe what you made, who it is for, and what you were going for. The more specific you are, the more useful the feedback will be.",
          "If you have copy, paste it. If it is a visual piece, describe it in as much detail as you can. Treat this as a brief to a critical colleague.",
        ],
        example: "e.g. Logo for a local bakery targeting 25-40 year old women. Going for warmth and craft without being cliche.",
      }}
      demoKey="critique"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={!!isValid}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 0 }}>
            <button
              className={`toggle-btn ${mode === "image" ? "active" : ""}`}
              style={{ flex: 1 }}
              onClick={() => setMode("image")}
            >
              Upload an image
            </button>
            <button
              className={`toggle-btn ${mode === "text" ? "active" : ""}`}
              style={{ flex: 1, marginLeft: -1 }}
              onClick={() => setMode("text")}
            >
              Paste copy or describe your work
            </button>
          </div>

          {mode === "text" ? (
            <div>
              <p className="label-mono-grey" style={{ marginBottom: 8 }}>Your work or copy</p>
              <textarea
                className="field-base"
                rows={5}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your copy or describe your work in detail..."
                style={{ resize: "vertical" }}
              />
            </div>
          ) : (
            <div
              style={{
                border: "1px dashed #2A2A2A",
                padding: 32,
                textAlign: "center",
              }}
            >
              <p className="label-mono-grey">Drop image or click to upload</p>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#B8B2A8", marginTop: 8 }}>
                PNG or JPG. For visual feedback, use the describe option for best results.
              </p>
            </div>
          )}

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>What type of work is this?</p>
            <select
              className="field-base"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F5A623' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
            >
              <option value="">Select type...</option>
              {workTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Who is it for?</p>
            <input
              type="text"
              className="field-base"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Young professionals aged 25-35 in major cities"
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>What were you going for?</p>
            <textarea
              className="field-base"
              rows={3}
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Describe the feeling, idea, or effect you were trying to create..."
              style={{ resize: "vertical" }}
            />
          </div>
        </div>
      }
    />
  );
}
