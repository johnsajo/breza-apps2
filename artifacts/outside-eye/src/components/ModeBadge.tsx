import { useEffect, useState } from "react";

type Mode = "demo" | "live";

function getCurrentMode(): Mode {
  const override = localStorage.getItem("outsideeye_mode");
  if (override === "demo" || override === "live") return override as Mode;
  return !!localStorage.getItem("outsideeye_key") ? "live" : "demo";
}

export default function ModeBadge() {
  const [mode, setMode] = useState<Mode>(getCurrentMode);

  useEffect(() => {
    function sync() { setMode(getCurrentMode()); }
    window.addEventListener("outsideeye:keychange", sync);
    window.addEventListener("outsideeye:modechange", sync);
    return () => {
      window.removeEventListener("outsideeye:keychange", sync);
      window.removeEventListener("outsideeye:modechange", sync);
    };
  }, []);

  const isLive = mode === "live";
  const color = isLive ? "#A3E635" : "#F5A623";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color,
        opacity: 0.7,
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {isLive ? "Live" : "Demo"}
    </span>
  );
}
