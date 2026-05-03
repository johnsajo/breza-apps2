import { Link } from "wouter";
import ModePill from "./ModePill";

const linkStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#B8B2A8",
  cursor: "pointer",
  transition: "color 150ms ease",
};

export default function Nav() {
  return (
    <nav
      style={{
        backgroundColor: "transparent",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 28,
          paddingBottom: 20,
          gap: 14,
        }}
      >
        <Link href="/">
          <span
            className="fraunces-label"
            style={{
              fontSize: 38,
              fontWeight: 600,
              color: "#F5A623",
              cursor: "pointer",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              display: "block",
            }}
          >
            The Outside Eye
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <ModePill />
          <Link href="/howitworks">
            <span
              style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5A623")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8B2A8")}
            >
              How It Works
            </span>
          </Link>
          <Link href="/settings">
            <span
              style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5A623")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8B2A8")}
            >
              Settings
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
