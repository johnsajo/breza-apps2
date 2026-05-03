import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 320);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 20,
        width: 42,
        height: 42,
        backgroundColor: "#1C1C1C",
        border: "1px solid #2A2A2A",
        color: "#F5A623",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        zIndex: 300,
        transition: "background-color 150ms ease, border-color 150ms ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2A2A2A";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5A623";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1C1C1C";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
      }}
    >
      ↑
    </button>
  );
}
