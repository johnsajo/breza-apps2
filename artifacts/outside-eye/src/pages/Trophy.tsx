import { useState, useEffect } from "react";
import RoomTemplate from "@/components/RoomTemplate";
import { decodeShare } from "@/lib/sharelink";

const SYSTEM = `You are a cultural critic and advertising historian. The user will give you something to analyse — it might be a creative category (outdoor, film, print), an era, a market or region, a specific brand, a specific campaign, or a feeling about awarded work. Whatever they give you, anchor your entire response to exactly that. If they name a specific brand — like Fevicol, Volkswagen, Nike, or any other — discuss only that brand's actual awarded work and advertising legacy. Do not substitute a different brand or a different era. Do not drift to generic examples. Stay locked to what was named. Reveal the invisible context that gave that work permission to exist. Your output is not a list of winners. It is a cultural reading. Explain what was happening in the world — politically, socially, technologically, economically — that made this work possible. Explain why the same idea would have failed two years earlier. Name 2 or 3 landmark pieces specific to what was described, with one sentence each on why they mattered. Identify the single pattern that connected the winners. State one thing that era or brand got wrong that the next era corrected. Finally — and this is the most important field — give one specific, concrete, actionable creative move the user could steal from this right now, based on exactly what they described. Not a general lesson. A specific thing they could do differently in the work they are currently making. Make it feel like advice from a mentor who read their brief. Return ONLY a raw JSON object with keys: culturalContext (string), landmarkPieces (array of objects each with name string, year string, why string), winningPattern (string), correctedBy (string), whatToSteal (string). No markdown code fences. No backticks. No preamble.`;

export default function Trophy() {
  const [category, setCategory] = useState("");
  const [era, setEra] = useState("");
  const [region, setRegion] = useState("");
  const [feeling, setFeeling] = useState("");

  useEffect(() => {
    const s = decodeShare();
    if (!s) return;
    if (typeof s.category === "string") setCategory(s.category);
    if (typeof s.era === "string") setEra(s.era);
    if (typeof s.region === "string") setRegion(s.region);
    if (typeof s.feeling === "string") setFeeling(s.feeling);
  }, []);

  const isValid = category.trim().length > 0 || feeling.trim().length > 0;

  function buildUserPrompt() {
    const parts: string[] = [];
    if (category.trim()) parts.push(`What to analyse: ${category}.`);
    if (era.trim()) parts.push(`Era: ${era}.`);
    if (region.trim()) parts.push(`Market or region: ${region}.`);
    if (feeling.trim()) parts.push(`What I'm looking for: ${feeling}.`);
    return parts.join(" ");
  }

  return (
    <RoomTemplate
      roomNumber="11"
      roomName="The Trophy Room"
      tagline="Enter a category, era, or a feeling about awarded work. Get the cultural reading behind why it won."
      howToUse={{
        paragraphs: [
          "You don't need all four fields. A category alone works. An era alone works. A feeling alone — like 'work that made juries uncomfortable but still won' — works best of all.",
          "The Trophy Room doesn't give you a list of winners. It tells you what was happening in the world that gave certain work permission to exist. That context is where the real lesson is.",
        ],
        example: "e.g. Fevicol. Or: outdoor, 1990s. Or just a feeling: work that won by refusing to look like advertising.",
      }}
      demoKey="trophy"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={isValid}
      shareState={{ category, era, region, feeling }}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Category, brand, or campaign</p>
            <input
              type="text"
              className="field-base"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Fevicol, outdoor, Nike, VW Think Small, 1990s film"
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Era or year range (optional)</p>
            <input
              type="text"
              className="field-base"
              value={era}
              onChange={(e) => setEra(e.target.value)}
              placeholder="e.g. 1990s, early 2000s, 2010–2016"
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Market or region (optional)</p>
            <input
              type="text"
              className="field-base"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. UK, Latin America, global"
            />
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Or describe a feeling about the work</p>
            <textarea
              className="field-base"
              rows={3}
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="e.g. work that made juries uncomfortable but still won. Work that looked like it shouldn't have been made."
              style={{ resize: "vertical" }}
            />
          </div>
        </div>
      }
    />
  );
}
