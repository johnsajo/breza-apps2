import { useState } from "react";
import RoomTemplate from "@/components/RoomTemplate";

const mediums = ["Print", "Film", "Digital", "OOH", "Social", "Integrated", "Pitch deck"];

const SYSTEM = `You are running a pre-mortem on a creative concept. Respond as three very different people reacting to this work. Be specific. Be honest. Do not let any juror be kind just to be kind. Return ONLY a JSON object. No markdown.`;

export default function Jury() {
  const [concept, setConcept] = useState("");
  const [medium, setMedium] = useState("");
  const [audience, setAudience] = useState("");

  const isValid = concept.trim().length > 0 && medium.length > 0 && audience.trim().length > 0;

  function buildUserPrompt() {
    return `Concept: ${concept}. Medium: ${medium}. Audience: ${audience}.`;
  }

  return (
    <RoomTemplate
      roomNumber="05"
      roomName="The Jury"
      tagline="Three different minds react to your concept before you present it."
      howToUse={{
        paragraphs: [
          "Describe your concept, paste your copy, or lay out what you are about to present. Be specific about what the idea is actually doing.",
          "Three jurors will react. A senior creative director, the actual target audience, and the client's CFO. None of them will be polite just to make you feel better.",
        ],
        example: "e.g. A billboard that reads 'Your commute is lying to you' for a cycling gear brand.",
      }}
      demoKey="jury"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={isValid}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Describe your concept, layout, or paste your copy</p>
            <textarea
              className="field-base"
              rows={6}
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Describe the concept in as much detail as you can..."
              style={{ resize: "vertical" }}
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>What medium is this?</p>
            <select
              className="field-base"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              style={{ appearance: "none" }}
            >
              <option value="">Select medium...</option>
              {mediums.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Who is the audience?</p>
            <input
              type="text"
              className="field-base"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Urban commuters aged 28-45 who cycle recreationally"
            />
          </div>
        </div>
      }
    />
  );
}
