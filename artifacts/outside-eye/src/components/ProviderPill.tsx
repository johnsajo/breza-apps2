import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { getProviderLabel } from "@/lib/detect";

interface StoredKey {
  provider: string;
  key: string;
  savedAt: number;
}

const pillBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  border: "none",
  borderRadius: 100,
  padding: "4px 11px 4px 9px",
  cursor: "pointer",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontWeight: 700,
  lineHeight: 1.5,
  transition: "background-color 400ms ease, filter 150ms ease",
};

export default function ProviderPill() {
  const [, navigate] = useLocation();
  const [stored, setStored] = useState<StoredKey | null>(null);
  const [pulsing, setPulsing] = useState(false);
  const prevIsLive = useRef(false);

  useEffect(() => {
    function check() {
      const raw = localStorage.getItem("outsideeye_key");
      const next = raw ? (JSON.parse(raw) as StoredKey) : null;
      const wasLive = prevIsLive.current;
      const isNowLive = !!next;

      if (!wasLive && isNowLive) {
        setPulsing(true);
        setTimeout(() => setPulsing(false), 420);
      }

      prevIsLive.current = isNowLive;
      setStored(next);
    }
    check();
    window.addEventListener("storage", check);
    window.addEventListener("outsideeye:keychange", check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("outsideeye:keychange", check);
    };
  }, []);

  const isLive = !!stored;

  return (
    <button
      onClick={() => navigate(isLive ? "/settings" : "/howitworks")}
      className={pulsing ? "pill-pulse" : ""}
      style={{
        ...pillBase,
        backgroundColor: isLive ? "#22C55E" : "#3B82F6",
        color: "#ffffff",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.5)",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {isLive ? `Live — ${getProviderLabel(stored!.provider)}` : "Demo Mode"}
    </button>
  );
}
