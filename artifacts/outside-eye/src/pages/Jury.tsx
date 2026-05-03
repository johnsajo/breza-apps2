import { useState, useRef, useEffect } from "react";
import RoomTemplate from "@/components/RoomTemplate";
import { decodeShare } from "@/lib/sharelink";

const mediums = [
  "Print", "Film", "Digital", "OOH", "Social", "Integrated",
  "Pitch Deck", "Experiential", "PR", "Radio", "Email", "Events",
];

const SYSTEM = `You are running a pre-mortem on a creative concept. Respond as three very different people reacting to this work. Be specific. Be honest. Do not let any juror be kind just to be kind. Return ONLY a raw JSON object. No markdown code fences. No backticks.`;

export default function Jury() {
  const [concept, setConcept] = useState("");
  const [medium, setMedium] = useState("");
  const [audience, setAudience] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imageType, setImageType] = useState("");
  const [inspirationUrl, setInspirationUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const s = decodeShare();
    if (!s) return;
    if (typeof s.concept === "string") setConcept(s.concept);
    if (typeof s.medium === "string") setMedium(s.medium);
    if (typeof s.audience === "string") setAudience(s.audience);
    if (typeof s.inspirationUrl === "string") setInspirationUrl(s.inspirationUrl);
  }, []);

  const isValid = concept.trim().length > 0 && medium.length > 0 && audience.trim().length > 0;

  function handleFileSelect(file: File) {
    setUploadedFile(file);
    if (file.type.startsWith("image/")) {
      setUploadedImageUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageBase64(result.split(",")[1] ?? "");
        setImageType(file.type);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImageUrl("");
      setImageBase64("");
      setImageType("");
    }
  }

  function buildUserPrompt() {
    const parts: string[] = [];
    parts.push(`Concept: ${concept}.`);
    parts.push(`Medium: ${medium}.`);
    parts.push(`Audience: ${audience}.`);
    if (uploadedFile && !uploadedFile.type.startsWith("image/")) parts.push(`File: ${uploadedFile.name}`);
    if (inspirationUrl.trim()) parts.push(`Inspiration/reference: ${inspirationUrl}`);
    return parts.join(" ");
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
      imageBase64={imageBase64 || undefined}
      imageType={imageType || undefined}
      shareState={{ concept, medium, audience, inspirationUrl }}
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
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Upload concept image or file (optional)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
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
                padding: uploadedFile ? "16px 24px" : "20px 24px",
                cursor: "pointer",
                backgroundColor: "#141414",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "border-color 150ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#F5A623")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#3A3A3A")}
            >
              {uploadedFile ? (
                <>
                  {uploadedImageUrl && (
                    <img src={uploadedImageUrl} alt="Preview" style={{ height: 48, objectFit: "contain" }} />
                  )}
                  <div>
                    <p className="label-mono-grey" style={{ marginBottom: 2 }}>{uploadedFile.name}</p>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#5A5550" }}>Click to replace</p>
                  </div>
                </>
              ) : (
                <p className="label-mono-grey">Click or drag to upload image, PDF, or doc</p>
              )}
            </div>
          </div>

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>What medium is this?</p>
            <select
              className="field-base"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F5A623' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
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

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Inspiration or reference URL (optional)</p>
            <input
              type="url"
              className="field-base"
              value={inspirationUrl}
              onChange={(e) => setInspirationUrl(e.target.value)}
              placeholder="e.g. a reference campaign, competitor, mood board link..."
            />
          </div>
        </div>
      }
    />
  );
}
