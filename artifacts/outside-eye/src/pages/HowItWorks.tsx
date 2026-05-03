import { useState } from "react";
import { Link } from "wouter";

const TABS = [
  {
    id: "gemini",
    label: "GEMINI",
    name: "Gemini",
    free: "1,500 requests per day. No credit card needed.",
    url: "https://aistudio.google.com",
    urlLabel: "aistudio.google.com",
    steps: [
      "Go to aistudio.google.com",
      "Sign in with any Google account you already have.",
      "Click Get API Key in the left sidebar.",
      "Click Create API key.",
      "Copy the key that appears. It starts with AIza.",
      "Go to Settings in The Outside Eye.",
      "Paste the key and click Save.",
      "Done. The app detects Gemini automatically.",
    ],
  },
  {
    id: "claude",
    label: "CLAUDE",
    name: "Claude",
    free: "Trial credits on signup. Check current offer at signup.",
    url: "https://console.anthropic.com",
    urlLabel: "console.anthropic.com",
    steps: [
      "Go to console.anthropic.com",
      "Create an account or sign in.",
      "Go to API Keys in the left menu.",
      "Click Create Key. Give it any name.",
      "Copy the key. It starts with sk-ant-",
      "Go to Settings in The Outside Eye.",
      "Paste the key and click Save.",
      "The app detects Claude automatically.",
    ],
  },
  {
    id: "openai",
    label: "OPENAI",
    name: "OpenAI",
    free: "Pay as you go. Very low cost per request.",
    url: "https://platform.openai.com",
    urlLabel: "platform.openai.com",
    steps: [
      "Go to platform.openai.com",
      "Create an account or sign in.",
      "Go to API Keys in the top menu.",
      "Click Create new secret key.",
      "Copy the key. It starts with sk-proj-",
      "Go to Settings in The Outside Eye.",
      "Paste the key and click Save.",
      "The app detects OpenAI automatically.",
    ],
  },
  {
    id: "deepseek",
    label: "DEEPSEEK",
    name: "DeepSeek",
    free: "Generous free tier included on signup.",
    url: "https://platform.deepseek.com",
    urlLabel: "platform.deepseek.com",
    steps: [
      "Go to platform.deepseek.com",
      "Create an account or sign in.",
      "Go to API Keys in the dashboard.",
      "Click Create new API key.",
      "Copy the key.",
      "Go to Settings in The Outside Eye.",
      "Paste the key. Select DeepSeek from the dropdown.",
      "Click Save.",
    ],
  },
  {
    id: "qwen",
    label: "QWEN",
    name: "Qwen",
    free: "Free tier available on signup.",
    url: "https://dashscope-intl.aliyuncs.com",
    urlLabel: "dashscope-intl.aliyuncs.com",
    steps: [
      "Go to dashscope-intl.aliyuncs.com",
      "Create an account or sign in.",
      "Go to API Key Management.",
      "Create and copy your key.",
      "Go to Settings in The Outside Eye.",
      "Paste the key. Select Qwen from the dropdown.",
      "Click Save.",
    ],
  },
  {
    id: "groq",
    label: "GROQ",
    name: "Groq",
    free: "Free tier with fast response times.",
    url: "https://console.groq.com",
    urlLabel: "console.groq.com",
    steps: [
      "Go to console.groq.com",
      "Create an account or sign in.",
      "Go to API Keys in the left menu.",
      "Click Create API Key.",
      "Copy the key. It starts with gsk_",
      "Go to Settings in The Outside Eye.",
      "Paste the key and click Save.",
      "The app detects Groq automatically.",
    ],
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("gemini");
  const tab = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="content-width" style={{ paddingTop: 56, paddingBottom: 88 }}>
      <h1
        className="fraunces-display"
        style={{
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 600,
          color: "#F5F0E8",
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        Your key. Two minutes.
      </h1>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 17,
          color: "#B8B2A8",
          maxWidth: 580,
          lineHeight: 1.65,
          marginBottom: 40,
        }}
      >
        The Outside Eye works with any key you already have. If you have used
        any of these services before, you already have one. If not, all of
        them have a free tier. Pick the one that suits you.
      </p>

      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      {/* Provider tabs */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 40,
          borderBottom: "1px solid #2A2A2A",
          paddingBottom: 0,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 0 14px 0",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: activeTab === t.id ? "#F5A623" : "#B8B2A8",
              borderBottom: activeTab === t.id ? "2px solid #F5A623" : "2px solid transparent",
              marginBottom: -1,
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== t.id)
                (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== t.id)
                (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ marginBottom: 48 }}>
        <p
          className="fraunces-label"
          style={{ fontSize: 24, fontWeight: 600, color: "#F5A623", marginBottom: 8 }}
        >
          {tab.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 15,
            color: "#B8B2A8",
            marginBottom: 16,
          }}
        >
          {tab.free}
        </p>
        <a
          href={tab.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 13,
            letterSpacing: "0.06em",
            color: "#F5A623",
            display: "inline-block",
            marginBottom: 32,
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
        >
          {tab.urlLabel} →
        </a>

        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
          {tab.steps.map((step, i) => (
            <li key={i} style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  color: "#F5A623",
                  flexShrink: 0,
                  minWidth: 20,
                }}
              >
                {i + 1}.
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 15,
                  color: "#F5F0E8",
                  lineHeight: 1.65,
                }}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <hr className="hr-hairline" style={{ marginBottom: 32 }} />

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#B8B2A8",
          lineHeight: 1.9,
          maxWidth: 560,
          marginBottom: 32,
        }}
      >
        Your key is stored only in your browser.
        <br />
        It is never sent to any server except the provider you chose.
        <br />
        Clear it any time in Settings.
      </p>

      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 15, color: "#B8B2A8" }}>
        Ready? Go to{" "}
        <Link href="/settings">
          <span
            style={{ color: "#F5A623", cursor: "pointer" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
          >
            Settings
          </span>
        </Link>{" "}
        and paste your key.
      </p>
    </div>
  );
}
