import { useState } from "react";
import RoomTemplate from "@/components/RoomTemplate";

const SYSTEM = `You are a poet and a strategist. Two things have been placed in front of you. Find three genuinely surprising threads that connect them. Each connection must be poetic, specific, and usable as a creative starting point. Not obvious. Not generic. Return ONLY a raw JSON object. No markdown code fences. No backticks.`;

export default function Bridge() {
  const [thingOne, setThingOne] = useState("");
  const [thingTwo, setThingTwo] = useState("");
  const [inspirationUrl, setInspirationUrl] = useState("");

  const isValid = thingOne.trim().length > 0 && thingTwo.trim().length > 0;

  function buildUserPrompt() {
    const base = `Connect these two things and find three surprising creative threads: "${thingOne}" and "${thingTwo}"`;
    return inspirationUrl.trim() ? `${base}. Inspiration/reference: ${inspirationUrl}` : base;
  }

  return (
    <RoomTemplate
      roomNumber="03"
      roomName="The Bridge"
      tagline="Connect two unrelated ideas into one poetic thread."
      howToUse={{
        paragraphs: [
          "Enter any two things. They can be brands, feelings, places, words, memories, or objects. The more unrelated they seem, the more interesting the connections tend to be.",
          "Each connection comes with a metaphor, a usable line, and a creative starting point.",
        ],
        example: "e.g. 'a worn leather tool bag' and 'the first day of school'",
      }}
      demoKey="bridge"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={isValid}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <div>
              <p className="label-mono-grey" style={{ marginBottom: 8 }}>First Thing</p>
              <input
                type="text"
                className="field-base"
                value={thingOne}
                onChange={(e) => setThingOne(e.target.value)}
                placeholder="e.g. a worn leather tool bag"
              />
            </div>
            <div>
              <p className="label-mono-grey" style={{ marginBottom: 8 }}>Second Thing</p>
              <input
                type="text"
                className="field-base"
                value={thingTwo}
                onChange={(e) => setThingTwo(e.target.value)}
                placeholder="e.g. the first day of school"
              />
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8B2A8" }}>
            These can be brands, feelings, places, words, memories, objects. Anything.
          </p>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Inspiration or reference URL (optional)</p>
            <input
              type="url"
              className="field-base"
              value={inspirationUrl}
              onChange={(e) => setInspirationUrl(e.target.value)}
              placeholder="e.g. a campaign, an image, a reference..."
            />
          </div>
        </div>
      }
    />
  );
}
