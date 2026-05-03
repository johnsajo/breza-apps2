import { useEffect, useState } from "react";
import { getProviderLabel } from "@/lib/detect";

interface StoredKey {
  provider: string;
  key: string;
  savedAt: number;
}

export default function ProviderPill() {
  const [stored, setStored] = useState<StoredKey | null>(null);

  useEffect(() => {
    const check = () => {
      const raw = localStorage.getItem("outsideeye_key");
      setStored(raw ? JSON.parse(raw) : null);
    };
    check();
    window.addEventListener("storage", check);
    window.addEventListener("outsideeye:keychange", check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("outsideeye:keychange", check);
    };
  }, []);

  if (!stored) {
    return (
      <span
        style={{
          fontFamily: "'Departure Mono', 'Courier New', monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#B8B2A8",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#444",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        Demo Mode
      </span>
    );
  }

  return (
    <span
      style={{
        fontFamily: "'Departure Mono', 'Courier New', monospace",
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#F5A623",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "#A3E635",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      Live — {getProviderLabel(stored.provider)}
    </span>
  );
}
