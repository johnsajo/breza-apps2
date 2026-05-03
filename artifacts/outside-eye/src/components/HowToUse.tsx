import { useState } from "react";

interface HowToUseProps {
  title?: string;
  paragraphs: string[];
  example?: string;
}

export default function HowToUse({ paragraphs, example }: HowToUseProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: 40 }}>
      <button
        onClick={() => setOpen((v) => !v)}
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
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#F5A623",
          }}
        >
          How to use this room
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 16,
            color: "#F5A623",
            display: "inline-block",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      {open && (
        <div style={{ marginTop: 20 }}>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 15,
                color: "#B8B2A8",
                lineHeight: 1.65,
                marginBottom: i < paragraphs.length - 1 ? 16 : 0,
              }}
            >
              {p}
            </p>
          ))}
          {example && (
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 14,
                color: "#B8B2A8",
                lineHeight: 1.65,
                marginTop: 16,
                borderLeft: "2px solid #2A2A2A",
                paddingLeft: 16,
                fontStyle: "italic",
              }}
            >
              {example}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
