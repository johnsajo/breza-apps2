import type { ReactNode } from "react";
import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

function useModeClass() {
  useEffect(() => {
    function sync() {
      const override = localStorage.getItem("outsideeye_mode");
      const hasKey = !!localStorage.getItem("outsideeye_key");
      const isLive = override === "live" || (override !== "demo" && hasKey);
      document.body.classList.toggle("mode-demo", !isLive);
      document.body.classList.toggle("mode-live", isLive);
    }
    sync();
    window.addEventListener("outsideeye:keychange", sync);
    window.addEventListener("outsideeye:modechange", sync);
    return () => {
      window.removeEventListener("outsideeye:keychange", sync);
      window.removeEventListener("outsideeye:modechange", sync);
    };
  }, []);
}

export default function Layout({ children }: { children: ReactNode }) {
  useModeClass();
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .spine-left, .spine-right {
            display: block !important;
          }
        }
      `}</style>

      <span
        className="spine-left"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          bottom: 0,
          width: 1,
          backgroundColor: "#2A2A2A",
          zIndex: 0,
          left: "calc(50% - 370px)",
        }}
      />
      <span
        className="spine-right"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          bottom: 0,
          width: 1,
          backgroundColor: "#2A2A2A",
          zIndex: 0,
          right: "calc(50% - 370px)",
        }}
      />

      <img
        src={`${import.meta.env.BASE_URL}hero-bg.png`}
        className="bg-illustration"
        alt=""
      />

      <Nav />

      <main
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          paddingBottom: 88,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(740px, 100%)",
            backgroundColor: "#0D0D0D",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
