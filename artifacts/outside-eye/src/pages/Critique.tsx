import { useState, useRef, useEffect } from "react";
import RoomTemplate from "@/components/RoomTemplate";
import { decodeShare } from "@/lib/sharelink";

const workTypes = [
  "Ad", "Brand Identity", "Campaign", "Concept", "Copy", "Layout",
  "Logo", "Packaging", "Social Post", "Website", "Other",
];

const SYSTEM = `You are a senior creative director with 25 years across advertising, branding, and design. You review work from emerging creatives. You are direct, honest, generous with specific guidance, and completely intolerant of safe or generic thinking. Never soften feedback. Never give hollow praise. When reviewing advertising work such as ads, campaigns, social posts, or concepts, always evaluate the headline, baseline/tagline, visual concept, layout, and call to action as distinct dimensions in your response. Always end with one specific thing they must fix before this work goes anywhere. Return ONLY a raw JSON object. No markdown code fences. No backticks. No preamble.`;

export default function Critique() {
  const [mode, setMode] = useState<"file" | "text">("text");
  const [pastedText, setPastedText] = useState("");
  const [workType, setWorkType] = useState("");
  const [audience, setAudience] = useState("");
  const [intent, setIntent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imageType, setImageType] = useState("");
  const [inspirationUrl, setInspirationUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const s = decodeShare();
    if (!s) return;
    if (typeof s.workType === "string") setWorkType(s.workType);
    if (typeof s.audience === "string") setAudience(s.audience);
    if (typeof s.intent === "string") setIntent(s.intent);
    if (typeof s.pastedText === "string") setPastedText(s.pastedText);
    if (typeof s.inspirationUrl === "string") setInspirationUrl(s.inspirationUrl);
  }, []);

  const isValid = workType.length > 0 && audience.trim().length > 0 && intent.trim().length > 0;

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
    parts.push(`Work type: ${workType}.`);
    parts.push(`Intended audience: ${audience}.`);
    parts.push(`What I was going for: ${intent}.`);
    if (pastedText.trim()) parts.push(`Copy or description: ${pastedText}`);
    if (uploadedFile && !uploadedFile.type.startsWith("image/")) {
      parts.push(`File uploaded: ${uploadedFile.name}`);
    }
    if (inspirationUrl.trim()) parts.push(`Inspiration/reference: ${inspirationUrl}`);
    return parts.join(" ");
  }

  return (
    <RoomTemplate
      roomNumber="01"
      roomName="The Critique"
      tagline="Upload your work or paste your copy. Get specific, honest feedback."
      howToUse={{
        paragraphs: [
          "Describe what you made, who it is for, and what you were going for. Upload an image of your work, or paste copy. The more specific, the more useful the feedback.",
          "For ad work, the AI evaluates headline, baseline/tagline, layout, and CTA as separate dimensions.",
        ],
        example: "e.g. Logo for a local bakery targeting 25-40 year old women. Going for warmth and craft without being cliché.",
      }}
      demoKey="critique"
      systemPrompt={SYSTEM}
      buildUserPrompt={buildUserPrompt}
      isValid={isValid}
      imageBase64={imageBase64 || undefined}
      imageType={imageType || undefined}
      shareState={{ workType, audience, intent, pastedText, inspirationUrl }}
      inputSection={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 0 }}>
            <button
              className={`toggle-btn ${mode === "file" ? "active" : ""}`}
              style={{ flex: 1 }}
              onClick={() => setMode("file")}
            >
              Upload file
            </button>
            <button
              className={`toggle-btn ${mode === "text" ? "active" : ""}`}
              style={{ flex: 1, marginLeft: -1 }}
              onClick={() => setMode("text")}
            >
              Paste copy or describe
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
            <div>
              <p className="label-mono-grey" style={{ marginBottom: 8 }}>Upload your work</p>
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
                  padding: 32,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "#141414",
                  transition: "border-color 150ms ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#F5A623")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#3A3A3A")}
              >
                {uploadedFile ? (
                  <div>
                    {uploadedImageUrl && (
                      <img
                        src={uploadedImageUrl}
                        alt="Preview"
                        style={{ maxHeight: 160, maxWidth: "100%", marginBottom: 12, objectFit: "contain" }}
                      />
                    )}
                    <p className="label-mono-grey" style={{ marginBottom: 4 }}>{uploadedFile.name}</p>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#5A5550" }}>Click to replace</p>
                  </div>
                ) : (
                  <>
                    <p className="label-mono-grey" style={{ marginBottom: 8 }}>Click or drag to upload</p>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#5A5550" }}>
                      Image (PNG, JPG), PDF, or Word document
                    </p>
                  </>
                )}
              </div>
              {uploadedFile && !uploadedFile.type.startsWith("image/") && (
                <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#B8B2A8", marginTop: 8 }}>
                  Tip: paste or describe the key content below for the most detailed analysis.
                </p>
              )}
              <div style={{ marginTop: 12 }}>
                <p className="label-mono-grey" style={{ marginBottom: 8 }}>Additional context (optional)</p>
                <textarea
                  className="field-base"
                  rows={3}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Add any copy, notes, or context about this work..."
                  style={{ resize: "vertical" }}
                />
              </div>
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

          <div>
            <p className="label-mono-grey" style={{ marginBottom: 8 }}>Inspiration or reference URL (optional)</p>
            <input
              type="url"
              className="field-base"
              value={inspirationUrl}
              onChange={(e) => setInspirationUrl(e.target.value)}
              placeholder="e.g. https://..."
            />
          </div>
        </div>
      }
    />
  );
}
