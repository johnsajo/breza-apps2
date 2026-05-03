import { useState } from "react";
import type { Rating } from "@/lib/feedback";

interface FeedbackRowProps {
  rating: Rating | null;
  onRate: (r: Rating) => void;
  note?: string;
  onNote?: (note: string) => void;
}

function RateButton({
  active,
  activeColor,
  onClick,
  children,
}: {
  active: boolean;
  activeColor: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const color = active ? activeColor : hovered ? "#F5F0E8" : "#B8B2A8";
  const borderColor = active ? activeColor : hovered ? "#F5F0E8" : "#2A2A2A";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Departure Mono', 'Courier New', monospace",
        fontSize: 13,
        color,
        background: "none",
        border: "1px solid",
        borderColor,
        padding: "4px 10px",
        cursor: "pointer",
        transition: "color 150ms ease, border-color 150ms ease",
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

export default function FeedbackRow({ rating, onRate, note, onNote }: FeedbackRowProps) {
  const [localNote, setLocalNote] = useState(note ?? "");
  const [saved, setSaved] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSave() {
    if (!onNote) return;
    onNote(localNote);
    if (localNote.trim()) {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      (e.currentTarget as HTMLInputElement).blur();
    }
  }

  return (
    <div>
      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid #2A2A2A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontFamily: "'Departure Mono', 'Courier New', monospace",
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
          <RateButton active={rating === "up"} activeColor="#7CBA6A" onClick={() => onRate("up")}>
            ↑
          </RateButton>
          <RateButton active={rating === "down"} activeColor="#F87171" onClick={() => onRate("down")}>
            ↓
          </RateButton>
        </div>
      </div>

      {rating && onNote && (
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
            value={localNote}
            placeholder="Add a note…"
            onChange={(e) => setLocalNote(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); handleSave(); }}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              borderBottom: `1px solid ${focused ? "#5A5550" : "#2A2A2A"}`,
              outline: "none",
              fontFamily: "'Departure Mono', 'Courier New', monospace",
              fontSize: 12,
              color: "#B8B2A8",
              padding: "4px 0",
              transition: "border-color 150ms ease",
            }}
          />
          {saved && (
            <span
              style={{
                fontFamily: "'Departure Mono', monospace",
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
  );
}
