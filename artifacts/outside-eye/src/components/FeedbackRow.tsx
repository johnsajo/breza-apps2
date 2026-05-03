import { useState } from "react";
import type { Rating } from "@/lib/feedback";

interface FeedbackRowProps {
  rating: Rating | null;
  onRate: (r: Rating) => void;
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

export default function FeedbackRow({ rating, onRate }: FeedbackRowProps) {
  return (
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
  );
}
