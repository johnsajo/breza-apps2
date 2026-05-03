import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getProviderLabel } from "@/lib/detect";

interface StoredKey {
  provider: string;
  key: string;
  savedAt: number;
}

export default function ProviderPill() {
  const [, navigate] = useLocation();
  const [stored, setStored] = useState<StoredKey | null>(null);

  useEffect(() => {
    function check() {
      const raw = localStorage.getItem("outsideeye_key");
      setStored(raw ? (JSON.parse(raw) as StoredKey) : null);
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: isLive ? "#F5A623" : "#B8B2A8",
        transition: "color 150ms ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = isLive ? "#F5F0E8" : "#F5A623";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = isLive ? "#F5A623" : "#B8B2A8";
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: isLive ? "#A3E635" : "#444444",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {isLive ? getProviderLabel(stored!.provider) : "Demo Mode"}
    </button>
  );
}
