import { useState, useEffect } from "react";

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    function handleCopied() {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      setExiting(false);
      setVisible(true);
      exitTimer = setTimeout(() => setExiting(true), 1700);
      hideTimer = setTimeout(() => { setVisible(false); setExiting(false); }, 2000);
    }

    window.addEventListener("outsideeye:copied", handleCopied as EventListener);
    return () => {
      window.removeEventListener("outsideeye:copied", handleCopied as EventListener);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes toast-out {
          from { opacity: 1; transform: translateX(-50%) translateY(0); }
          to   { opacity: 0; transform: translateX(-50%) translateY(-6px); }
        }
        .toast-enter { animation: toast-in 180ms ease forwards; }
        .toast-exit  { animation: toast-out 280ms ease forwards; }
      `}</style>
      <div
        className={exiting ? "toast-exit" : "toast-enter"}
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          zIndex: 9999,
          backgroundColor: "#1C1C1C",
          border: "1px solid #2A2A2A",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "none",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ color: "#7CBA6A", fontSize: 14, lineHeight: 1 }}>✓</span>
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#B8B2A8",
          }}
        >
          Link copied
        </span>
      </div>
    </>
  );
}
