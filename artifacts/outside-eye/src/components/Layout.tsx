import type { ReactNode } from "react";
import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

function useModeClass() {
  useEffect(() => {
    function sync() {
      const hasKey = !!localStorage.getItem("outsideeye_key");
      document.body.classList.toggle("mode-demo", !hasKey);
      document.body.classList.toggle("mode-live", hasKey);
    }
    sync();
    window.addEventListener("outsideeye:keychange", sync);
    return () => window.removeEventListener("outsideeye:keychange", sync);
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

      <Nav />

      <main
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          paddingBottom: 88,
        }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
