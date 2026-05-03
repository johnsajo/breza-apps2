import { useState } from "react";
import RoomTemplate from "@/components/RoomTemplate";

const categories = ["Print", "Digital", "Social", "Film", "OOH", "Brand", "Campaign", "Other"];

const SYSTEM = `You are a senior creative strategist. A creative has brought you a confusing client brief. Break it down so they know exactly what to do. Be specific. Be direct. Return ONLY a JSON object. No markdown. No preamble.`;

export default function Brief() {
  const [briefText, setBriefText] = useState("");
  const [category, setCategory] = useState("");

  const isValid = briefText.trim().length > 0 && category.length > 0;

  function buildUserPrompt() {
    return `Brief category: ${category}. The brief reads: ${briefText}`;
  }

  return (
    <RoomTemplate
      roomNumber="02"
      roomName="The Brief Decoder"
      tagline="Paste any brief or client email. Understand what they actually want."
      howToUse={{
        paragraphs: [
          "Paste the brief, email, or instruction exactly as it was given to you. The more unedited it is, the better the read.",
          "The decoder will tell you what they actually want, what they did not say but expect, and what lazy executions to avoid.",
        ],
        example: "e.g. Hi, can you make something for our new product launch? We want it to feel modern and exciting but also professional.",
      }}
      demoKey="brief"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={isValid}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Paste the brief, email, or instruction</p>
            <textarea
              className="field-base"
              rows={8}
              value={briefText}
              onChange={(e) => setBriefText(e.target.value)}
              placeholder="Paste the full brief or email here..."
              style={{ resize: "vertical" }}
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>What category is this work?</p>
            <select
              className="field-base"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ appearance: "none" }}
            >
              <option value="">Select category...</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      }
    />
  );
}
