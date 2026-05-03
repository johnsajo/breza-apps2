import { useState, useEffect } from "react";
import { saveFeedback, getFeedback, saveNote, getNote, type Rating } from "@/lib/feedback";

const PULL_QUOTE_FIELDS = new Set([
  "theOneThing",
  "verdict",
  "theLine",
  "overallVerdict",
  "whatToSteal",
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
                fontFamily: "'DM Sans', system-ui, sans-serif",
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
  feedbackKey?: string;
}

function GhostButton({
  onClick,
  active,
  activeColor,
  disabled,
  children,
}: {
  onClick: () => void;
  active: boolean;
  activeColor: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  const color = active ? activeColor : hovered ? "#F5F0E8" : "#B8B2A8";
  const borderColor = active ? activeColor : hovered ? "#F5F0E8" : "#2A2A2A";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 13,
        color,
        background: "none",
        border: "1px solid",
        borderColor,
        padding: "4px 10px",
        cursor: disabled ? "default" : "pointer",
        transition: "color 150ms ease, border-color 150ms ease",
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

export default function OutputCard({ data, isDemo, feedbackKey }: OutputCardProps) {
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState<Rating | null>(null);
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [noteFocused, setNoteFocused] = useState(false);

  useEffect(() => {
    if (feedbackKey) {
      setRating(getFeedback(feedbackKey));
      setNote(getNote(feedbackKey));
    }
  }, [feedbackKey]);

  const entries = Object.entries(data).filter(([k]) => k !== "isDemo");

  function handleCopy() {
    const text = flattenToText(data);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleRating(r: Rating) {
    const next = rating === r ? null : r;
    setRating(next);
    if (feedbackKey && next) saveFeedback(feedbackKey, next);
  }

  function handleNoteSave() {
    if (!feedbackKey) return;
    saveNote(feedbackKey, note);
    if (note.trim()) {
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 1500);
    }
  }

  function handleNoteKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") (e.currentTarget as HTMLInputElement).blur();
  }

  return (
    <div>
      {isDemo && (
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#B8B2A8",
            }}
          >
            Pre-set example — not AI feedback on your input. Switch to Live for real responses.
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
          <GhostButton
            onClick={handleCopy}
            active={copied}
            activeColor="#7CBA6A"
          >
            {copied ? "Copied" : "Copy"}
          </GhostButton>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {entries.map(([key, value]) => (
            <div key={key}>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
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

        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid #2A2A2A",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: rating ? "#B8B2A8" : "#5A5550",
            }}
          >
            {rating === "up"
              ? "Marked useful"
              : rating === "down"
              ? "Marked not useful"
              : "Was this useful?"}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <GhostButton
              onClick={() => handleRating("up")}
              active={rating === "up"}
              activeColor="#7CBA6A"
            >
              ↑
            </GhostButton>
            <GhostButton
              onClick={() => handleRating("down")}
              active={rating === "down"}
              activeColor="#F87171"
            >
              ↓
            </GhostButton>
          </div>
        </div>

        {rating && feedbackKey && (
          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid #1A1A1A",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input
              type="text"
              value={note}
              placeholder="Add a note…"
              onChange={(e) => setNote(e.target.value)}
              onFocus={() => setNoteFocused(true)}
              onBlur={() => { setNoteFocused(false); handleNoteSave(); }}
              onKeyDown={handleNoteKeyDown}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                borderBottom: `1px solid ${noteFocused ? "#5A5550" : "#2A2A2A"}`,
                outline: "none",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 12,
                color: "#B8B2A8",
                padding: "4px 0",
                transition: "border-color 150ms ease",
              }}
            />
            {noteSaved && (
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#7CBA6A",
                  flexShrink: 0,
                }}
              >
                Saved
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
