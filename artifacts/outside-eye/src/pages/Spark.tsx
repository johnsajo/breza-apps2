import { useState } from "react";
import RoomTemplate from "@/components/RoomTemplate";

const stuckReasons = [
  "Blank page",
  "Ideas feel too safe",
  "Brief is too vague",
  "Everything feels done before",
  "Too many ideas, wrong direction",
];

const SYSTEM = `You are a creative director helping someone get unstuck. Give three wildly different creative directions. Each must be genuinely surprising. No safe ideas. No obvious approaches. Each direction must be explainable in one sentence and drawable as a simple sketch. Return ONLY a JSON object. No markdown.`;

export default function Spark() {
  const [brief, setBrief] = useState("");
  const [stuckReason, setStuckReason] = useState("");

  const isValid = brief.trim().length > 0 && stuckReason.length > 0;

  function buildUserPrompt() {
    return `Brief in one line: "${brief}". I am stuck because: ${stuckReason}.`;
  }

  return (
    <RoomTemplate
      roomNumber="09"
      roomName="The First Draft"
      tagline="Stuck on a blank page. Get three wildly different starting points."
      howToUse={{
        paragraphs: [
          "Write your brief in one line. Not a paragraph, not a list. One sentence that captures what you are trying to solve.",
          "Select where you are stuck. Three genuinely different creative directions will come back. None of them will be safe.",
        ],
        example: "e.g. Get young Australians to care about superannuation.",
      }}
      demoKey="spark"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={isValid}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Your brief in one line</p>
            <input
              type="text"
              className="field-base"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="e.g. Get young Australians to care about superannuation."
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 12 }}>I'm stuck because</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stuckReasons.map((r) => (
                <button
                  key={r}
                  className={`toggle-btn ${stuckReason === r ? "active" : ""}`}
                  style={{ textAlign: "left" }}
                  onClick={() => setStuckReason(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
