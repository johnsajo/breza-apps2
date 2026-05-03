import { useState, useEffect } from "react";
import { Link } from "wouter";
import { detectProvider, getProviderLabel } from "@/lib/detect";
import { getVisited } from "@/lib/visited";
import { getAllFeedback } from "@/lib/feedback";

const providers = [
  { name: "Gemini Flash", note: "1,500 requests per day, no card needed", url: "https://aistudio.google.com", label: "aistudio.google.com" },
  { name: "Claude", note: "Free trial credits on signup", url: "https://console.anthropic.com", label: "console.anthropic.com" },
  { name: "OpenAI", note: "$5 trial credit on signup", url: "https://platform.openai.com", label: "platform.openai.com" },
  { name: "DeepSeek", note: "Generous free tier", url: "https://platform.deepseek.com", label: "platform.deepseek.com" },
  { name: "Qwen", note: "Free tier available", url: "https://dashscope.aliyun.com", label: "dashscope.aliyun.com" },
  { name: "Groq", note: "Free tier, very fast", url: "https://console.groq.com", label: "console.groq.com" },
];

export default function Settings() {
  const [keyInput, setKeyInput] = useState("");
  const [detectedProvider, setDetectedProvider] = useState("");
  const [manualProvider, setManualProvider] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);
  const [geminiOpen, setGeminiOpen] = useState(false);
  const [sessionStats, setSessionStats] = useState({ tried: 0, rated: 0, up: 0 });

  useEffect(() => {
    const raw = localStorage.getItem("outsideeye_key");
    if (raw) {
      const stored = JSON.parse(raw);
      setKeyInput(stored.key || "");
      setDetectedProvider(stored.provider || "");
    }
    const visited = getVisited();
    const fb = getAllFeedback();
    setSessionStats({
      tried: visited.length,
      rated: fb.length,
      up: fb.filter((f) => f.rating === "up").length,
    });
  }, []);

  function handleKeyChange(val: string) {
    setKeyInput(val);
    if (val.trim()) {
      const p = detectProvider(val.trim());
      setDetectedProvider(p);
      setManualProvider("");
    } else {
      setDetectedProvider("");
    }
  }

  function handleSave() {
    const provider = detectedProvider === "unknown" || detectedProvider === "openai_ambiguous"
      ? manualProvider || detectedProvider
      : detectedProvider;
    const stored = { provider, key: keyInput.trim(), savedAt: Date.now() };
    localStorage.setItem("outsideeye_key", JSON.stringify(stored));
    window.dispatchEvent(new Event("outsideeye:keychange"));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  function handleClear() {
    localStorage.removeItem("outsideeye_key");
    window.dispatchEvent(new Event("outsideeye:keychange"));
    setKeyInput("");
    setDetectedProvider("");
    setManualProvider("");
  }

  const needsManual = detectedProvider === "unknown" || detectedProvider === "openai_ambiguous";

  return (
    <div className="content-width" style={{ paddingTop: 56, paddingBottom: 88 }}>
      <h1
        className="fraunces-display"
        style={{ fontSize: "clamp(32px, 5vw, 40px)", fontWeight: 600, color: "#F5F0E8", marginBottom: 16 }}
      >
        Your Key
      </h1>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 17,
          color: "#B8B2A8",
          maxWidth: 560,
          lineHeight: 1.65,
        }}
      >
        The Outside Eye works with any key you already have. Bring whichever one
        you have. Use Demo Mode to try it first.
      </p>

      <div style={{ marginTop: 40 }} />
      <hr className="hr-hairline" />
      <div style={{ marginTop: 40 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {providers.map((p) => (
          <div key={p.name} style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#F5F0E8", fontWeight: 500, minWidth: 110 }}>
              {p.name}
            </p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8B2A8", flex: 1 }}>
              {p.note}
            </p>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                color: "#F5A623",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
            >
              {p.label}
            </a>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8B2A8", marginTop: 20 }}>
        Use whichever you have. The app detects your provider automatically.
      </p>

      <div style={{ marginTop: 40 }} />
      <hr className="hr-hairline" />
      <div style={{ marginTop: 40 }} />

      <div>
        <p className="label-mono" style={{ marginBottom: 12 }}>Paste Your Key</p>
        <input
          type="password"
          className="field-base"
          value={keyInput}
          onChange={(e) => handleKeyChange(e.target.value)}
          placeholder="Paste your key from any provider (AIza, sk-ant-, sk-proj-, gsk_, etc.)"
        />

        {detectedProvider && !needsManual && (
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 12,
              color: "#A3E635",
              marginTop: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Detected: {getProviderLabel(detectedProvider)}
          </p>
        )}

        {needsManual && keyInput.trim() && (
          <div style={{ marginTop: 12 }}>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#B8B2A8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Which provider is this key for?
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["OpenAI", "DeepSeek", "Qwen", "Other"].map((opt) => (
                <button
                  key={opt}
                  className={`toggle-btn ${manualProvider === opt.toLowerCase() ? "active" : ""}`}
                  onClick={() => setManualProvider(opt.toLowerCase())}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={!keyInput.trim()}
          >
            {savedMsg ? "Saved." : "Save Key"}
          </button>
        </div>

        {keyInput && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              onClick={handleClear}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                color: "#F5A623",
                textDecoration: "underline",
                letterSpacing: "0.04em",
              }}
            >
              Clear saved key
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 40 }} />

      <div>
        <button
          onClick={() => setGeminiOpen((v) => !v)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              color: "#F5A623",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            How to get a free Gemini key in two minutes
          </span>
          <span
            style={{
              color: "#F5A623",
              fontSize: 14,
              transform: geminiOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
            }}
          >
            ▾
          </span>
        </button>

        {geminiOpen && (
          <ol
            style={{
              marginTop: 20,
              paddingLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[
              "Go to aistudio.google.com",
              "Sign in with any Google account",
              "Click Get API Key then Create API Key",
              "Copy the key that appears",
              "Paste it above and click Save Key",
              "Done. Free. No credit card.",
            ].map((step, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: 15,
                  color: "#B8B2A8",
                  lineHeight: 1.5,
                }}
              >
                {step}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div style={{ marginTop: 40 }} />
      <hr className="hr-hairline" />
      <div style={{ marginTop: 24 }} />

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 12,
          color: "#B8B2A8",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.8,
        }}
      >
        Your key is stored only in your browser.
        <br />
        It is never sent to any server except the provider you chose.
        <br />
        Clear it any time.
      </p>

      {sessionStats.tried > 0 && (
        <>
          <div style={{ marginTop: 40 }} />
          <hr className="hr-hairline" />
          <div style={{ marginTop: 32 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#F5A623",
                  marginBottom: 6,
                }}
              >
                Session Notes
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 15,
                  color: "#B8B2A8",
                  lineHeight: 1.5,
                }}
              >
                {sessionStats.tried} of 9 rooms tried
                {sessionStats.rated > 0
                  ? ` · ${sessionStats.up} useful, ${sessionStats.rated - sessionStats.up} not`
                  : " · not yet rated"}
              </p>
            </div>

            <Link href="/feedback-summary">
              <button
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#B8B2A8",
                  background: "none",
                  border: "1px solid #2A2A2A",
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "color 150ms ease, border-color 150ms ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
                }}
              >
                View full summary →
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
