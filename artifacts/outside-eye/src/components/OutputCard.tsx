import { useState } from "react";

const PULL_QUOTE_FIELDS = new Set([
  "theOneThing",
  "verdict",
  "theLine",
  "overallVerdict",
]);

function flattenToText(obj: Record<string, unknown>, depth = 0): string {
  return Object.entries(obj)
    .filter(([k]) => k !== "isDemo")
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .trim()
        .toUpperCase();

      const content = flattenValue(value, depth);
      return `${label}\n${content}`;
    })
    .join("\n\n");
}

function flattenValue(value: unknown, depth = 0): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? `• ${item}`
          : flattenToText(item as Record<string, unknown>, depth + 1)
      )
      .join("\n");
  }
  if (typeof value === "object" && value !== null) {
    return flattenToText(value as Record<string, unknown>, depth + 1);
  }
  return String(value);
}

function renderValue(value: unknown, fieldKey?: string): React.ReactNode {
  if (typeof value === "string") {
    if (fieldKey && PULL_QUOTE_FIELDS.has(fieldKey)) {
      return (
        <p
          className="fraunces-label"
          style={{
            fontStyle: "italic",
            fontSize: 24,
            color: "#F5A623",
            lineHeight: 1.4,
            borderLeft: "3px solid #F5A623",
            paddingLeft: 20,
            margin: "32px 0",
          }}
        >
          {value}
        </p>
      );
    }
    return (
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 17,
          color: "#F5F0E8",
          lineHeight: 1.65,
        }}
      >
        {value}
      </p>
    );
  }

  if (Array.isArray(value)) {
    return (
      <ul
        style={{
          paddingLeft: 16,
          borderLeft: "2px solid #2A2A2A",
          listStyle: "none",
        }}
      >
        {value.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 17,
              color: "#F5F0E8",
              lineHeight: 1.65,
              marginBottom: i < value.length - 1 ? 12 : 0,
            }}
          >
            {typeof item === "string" ? item : renderObjectFields(item)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object" && value !== null) {
    return renderObjectFields(value as Record<string, unknown>);
  }

  return (
    <p
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 17,
        color: "#F5F0E8",
        lineHeight: 1.65,
      }}
    >
      {String(value)}
    </p>
  );
}

function renderObjectFields(obj: Record<string, unknown>): React.ReactNode {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.entries(obj)
        .filter(([k]) => k !== "isDemo")
        .map(([key, val]) => (
          <div key={key}>
            <p
              style={{
                fontFamily: "'Departure Mono', 'Courier New', monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#F5A623",
                marginBottom: 6,
              }}
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
            </p>
            <hr style={{ border: "none", borderTop: "1px solid #2A2A2A", marginBottom: 8 }} />
            {renderValue(val, key)}
          </div>
        ))}
    </div>
  );
}

interface OutputCardProps {
  data: Record<string, unknown>;
  isDemo?: boolean;
}

export default function OutputCard({ data, isDemo }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const entries = Object.entries(data).filter(([k]) => k !== "isDemo");

  function handleCopy() {
    const text = flattenToText(data);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      {isDemo && (
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontFamily: "'Departure Mono', 'Courier New', monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#B8B2A8",
            }}
          >
            Demo Response — Add your key in Settings for feedback on your own work.
          </p>
          <hr style={{ border: "none", borderTop: "1px solid #2A2A2A", marginTop: 16 }} />
        </div>
      )}

      <div
        style={{
          backgroundColor: "#141414",
          border: "1px solid #2A2A2A",
          padding: window.innerWidth < 768 ? 20 : 32,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              fontFamily: "'Departure Mono', 'Courier New', monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: copied ? "#7CBA6A" : "#B8B2A8",
              background: "none",
              border: "1px solid",
              borderColor: copied ? "#7CBA6A" : "#2A2A2A",
              padding: "5px 12px",
              cursor: "pointer",
              transition: "color 200ms ease, border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8";
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
              }
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {entries.map(([key, value]) => (
            <div key={key}>
              <p
                style={{
                  fontFamily: "'Departure Mono', 'Courier New', monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#F5A623",
                  marginBottom: 8,
                }}
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())
                  .trim()}
              </p>
              <hr style={{ border: "none", borderTop: "1px solid #2A2A2A", marginBottom: 12 }} />
              {renderValue(value, key)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
