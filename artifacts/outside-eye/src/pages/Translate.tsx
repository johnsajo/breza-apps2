import { useState } from "react";
import RoomTemplate from "@/components/RoomTemplate";

const stages = ["First presentation", "Revision round", "Final approval", "Pitch"];

const SYSTEM = `You are a senior creative who has sat across from a thousand clients. A junior creative has brought you feedback they do not understand. Decode it plainly and give them something useful to do. Return ONLY a raw JSON object. No markdown code fences. No backticks.`;

export default function Translate() {
  const [feedback, setFeedback] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [stage, setStage] = useState("");
  const [inspirationUrl, setInspirationUrl] = useState("");

  const isValid = feedback.trim().length > 0 && workDesc.trim().length > 0 && stage.length > 0;

  function buildUserPrompt() {
    const parts: string[] = [];
    parts.push(`The client feedback was: "${feedback}".`);
    parts.push(`The work they were reacting to: ${workDesc}.`);
    parts.push(`Project stage: ${stage}.`);
    if (inspirationUrl.trim()) parts.push(`Reference: ${inspirationUrl}`);
    return parts.join(" ");
  }

  return (
    <RoomTemplate
      roomNumber="04"
      roomName="The Feedback Translator"
      tagline="Decode what your client really means when they say make it pop."
      howToUse={{
        paragraphs: [
          "Paste the exact client feedback. Then describe what the work was so the translator has context.",
          "You will get a plain translation, what they are actually afraid of, and specific directions to act on.",
        ],
        example: "e.g. 'It feels a bit flat, can we make it more exciting?' on a brand identity proposal.",
      }}
      demoKey="translate"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={isValid}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Paste the client feedback</p>
            <textarea
              className="field-base"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Paste the exact feedback here..."
              style={{ resize: "vertical" }}
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>What was the work they were reacting to?</p>
            <input
              type="text"
              className="field-base"
              value={workDesc}
              onChange={(e) => setWorkDesc(e.target.value)}
              placeholder="e.g. Brand identity proposal for a restaurant rebrand"
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>What stage is this project?</p>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
              {stages.map((s, i) => (
                <button
                  key={s}
                  className={`toggle-btn ${stage === s ? "active" : ""}`}
                  style={{ marginRight: i < stages.length - 1 ? -1 : 0, marginBottom: 8 }}
                  onClick={() => setStage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Reference or context URL (optional)</p>
            <input
              type="url"
              className="field-base"
              value={inspirationUrl}
              onChange={(e) => setInspirationUrl(e.target.value)}
              placeholder="e.g. link to the work or brief..."
            />
          </div>
        </div>
      }
    />
  );
}
