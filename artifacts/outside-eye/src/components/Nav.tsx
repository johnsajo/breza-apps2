import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ModePill from "./ModePill";

const linkStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#B8B2A8",
  cursor: "pointer",
  transition: "color 150ms ease",
  whiteSpace: "nowrap",
};

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick}>
      <span
        style={linkStyle}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5A623")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8B2A8")}
      >
        {children}
      </span>
    </Link>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  function close() { setMenuOpen(false); }

  return (
    <nav
      style={{
        backgroundColor: "transparent",
        position: "relative",
        zIndex: 100,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 52,
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
          gap: 18,
          position: "relative",
        }}
      >
        <Link href="/" onClick={close}>
          <span
            className="fraunces-label"
            style={{
              fontSize: "clamp(40px, 9vw, 114px)",
              fontWeight: 600,
              color: "#F5A623",
              cursor: "pointer",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              display: "block",
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            The Outside Eye
          </span>
        </Link>

        <div className="nav-desktop-row">
          <NavLink href="/">Home</NavLink>
          <ModePill />
          <NavLink href="/howitworks">How It Works</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "none",
            border: "1px solid #2A2A2A",
            color: "#B8B2A8",
            cursor: "pointer",
            padding: "6px 10px",
            fontSize: 18,
            lineHeight: 1,
            transition: "color 150ms ease, border-color 150ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#F5A623";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5A623";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
          }}
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="nav-mobile-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#0D0D0D",
            borderTop: "1px solid #2A2A2A",
            borderBottom: "1px solid #2A2A2A",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            zIndex: 200,
          }}
        >
          <NavLink href="/" onClick={close}>Home</NavLink>
          <ModePill />
          <NavLink href="/howitworks" onClick={close}>How It Works</NavLink>
          <NavLink href="/settings" onClick={close}>Settings</NavLink>
        </div>
      )}
    </nav>
  );
}
