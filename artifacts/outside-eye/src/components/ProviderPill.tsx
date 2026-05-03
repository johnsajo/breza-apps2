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

  if (isLive) {
    return (
      <button
        onClick={() => navigate("/settings")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: "#F5A623",
          border: "none",
          borderRadius: 100,
          padding: "3px 10px 3px 8px",
          cursor: "pointer",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0D0D0D",
          fontWeight: 600,
          lineHeight: 1.6,
          transition: "background 150ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#C47D0E";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#F5A623";
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#0D0D0D",
            display: "inline-block",
            flexShrink: 0,
            opacity: 0.5,
          }}
        />
        {getProviderLabel(stored!.provider)}
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/howitworks")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: "transparent",
        border: "1px solid #3A3530",
        borderRadius: 100,
        padding: "3px 10px 3px 8px",
        cursor: "pointer",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#5A5550",
        lineHeight: 1.6,
        transition: "border-color 150ms ease, color 150ms ease",
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.borderColor = "#B8B2A8";
        btn.style.color = "#B8B2A8";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.borderColor = "#3A3530";
        btn.style.color = "#5A5550";
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#5A5550",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      Demo Mode
    </button>
  );
}
