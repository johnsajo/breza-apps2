import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

type Mode = "demo" | "live";

function getMode(): Mode {
  const override = localStorage.getItem("outsideeye_mode");
  if (override === "demo" || override === "live") return override as Mode;
  return !!localStorage.getItem("outsideeye_key") ? "live" : "demo";
}

export function applyMode(mode: Mode) {
  localStorage.setItem("outsideeye_mode", mode);
  document.body.classList.toggle("mode-demo", mode === "demo");
  document.body.classList.toggle("mode-live", mode === "live");
  window.dispatchEvent(new CustomEvent("outsideeye:modechange", { detail: mode }));
}

const btnStyle = (active: boolean, activeColor: string): React.CSSProperties => ({
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontWeight: 700,
  padding: "6px 14px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  lineHeight: 1.5,
  transition: "background 300ms ease, color 300ms ease",
  backgroundColor: active ? activeColor : "transparent",
  color: active ? "#0D0D0D" : "#B8B2A8",
});

export default function ModePill() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<Mode>("demo");
  const [hasKey, setHasKey] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function sync() {
      const key = !!localStorage.getItem("outsideeye_key");
      setHasKey(key);
      const m = getMode();
      setMode(m);
      applyMode(m);
    }
    function onModeChange() {
      setMode(getMode());
    }
    sync();
    window.addEventListener("outsideeye:keychange", sync);
    window.addEventListener("outsideeye:modechange", onModeChange);
    return () => {
      window.removeEventListener("outsideeye:keychange", sync);
      window.removeEventListener("outsideeye:modechange", onModeChange);
    };
  }, []);

  function handleDemo() {
    applyMode("demo");
    setMode("demo");
  }

  function handleLive() {
    if (!hasKey) {
      clearTimeout(tooltipTimer.current);
      setShowTooltip(true);
      tooltipTimer.current = setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    applyMode("live");
    setMode("live");
  }

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div
        style={{
          display: "inline-flex",
          backgroundColor: "#1C1C1C",
          border: "1px solid #2A2A2A",
          borderRadius: 999,
          padding: 3,
        }}
      >
        <button onClick={handleDemo} style={btnStyle(mode === "demo", "#F5A623")}>
          Demo
        </button>
        <button onClick={handleLive} style={btnStyle(mode === "live", "#A3E635")}>
          Live
        </button>
      </div>

      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#141414",
            border: "1px solid #2A2A2A",
            borderRadius: 4,
            padding: "6px 12px",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "#B8B2A8",
            whiteSpace: "nowrap",
            zIndex: 200,
            animation: "fadeInDown 150ms ease forwards",
          }}
        >
          Add a key in{" "}
          <span
            style={{ color: "#F5A623", cursor: "pointer" }}
            onClick={() => navigate("/settings")}
          >
            Settings
          </span>{" "}
          first.
        </div>
      )}
    </div>
  );
}
