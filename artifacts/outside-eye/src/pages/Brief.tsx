import { useState, useRef, useEffect } from "react";
import RoomTemplate from "@/components/RoomTemplate";
import { decodeShare } from "@/lib/sharelink";

const categories = [
  "Advertising", "Brand", "Campaign", "Content", "Digital",
  "Email", "Events", "Film", "Integrated", "Marketing",
  "OOH", "PR", "Print", "Social", "Strategy", "Other",
];

const SYSTEM = `You are a senior creative strategist. A creative has brought you a confusing client brief. Break it down so they know exactly what to do. Be specific. Be direct. Return ONLY a raw JSON object. No markdown code fences. No backticks. No preamble.`;

export default function Brief() {
  const [briefText, setBriefText] = useState("");
  const [category, setCategory] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [inspirationUrl, setInspirationUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const s = decodeShare();
    if (!s) return;
    if (typeof s.briefText === "string") setBriefText(s.briefText);
    if (typeof s.category === "string") setCategory(s.category);
    if (typeof s.inspirationUrl === "string") setInspirationUrl(s.inspirationUrl);
  }, []);

  const isValid = briefText.trim().length > 0 && category.length > 0;

  function handleFileSelect(file: File) {
    setUploadedFile(file);
  }

  function buildUserPrompt() {
    const parts: string[] = [];
    parts.push(`Brief category: ${category}.`);
    if (uploadedFile) parts.push(`Brief document uploaded: ${uploadedFile.name}.`);
    parts.push(`The brief reads: ${briefText}`);
    if (inspirationUrl.trim()) parts.push(`Reference URL: ${inspirationUrl}`);
    return parts.join(" ");
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
      shareState={{ briefText, category, inspirationUrl }}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Upload brief document (optional)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileSelect(file);
              }}
              style={{
                border: "1px dashed #3A3A3A",
                padding: "16px 24px",
                cursor: "pointer",
                backgroundColor: "#141414",
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "border-color 150ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#F5A623")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#3A3A3A")}
            >
              {uploadedFile ? (
                <>
                  <p className="label-mono-grey">{uploadedFile.name}</p>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#5A5550" }}>Click to replace</p>
                </>
              ) : (
                <p className="label-mono-grey">Click or drag to upload PDF, Word, or text file</p>
              )}
            </div>
          </div>

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
              style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F5A623' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
            >
              <option value="">Select category...</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Reference or inspiration URL (optional)</p>
            <input
              type="url"
              className="field-base"
              value={inspirationUrl}
              onChange={(e) => setInspirationUrl(e.target.value)}
              placeholder="e.g. a competitor campaign, a reference deck link..."
            />
          </div>
        </div>
      }
    />
  );
}
