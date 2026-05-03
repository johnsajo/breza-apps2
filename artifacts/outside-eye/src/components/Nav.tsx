import { Link } from "wouter";

export default function Nav() {
  return (
    <nav
      style={{
        backgroundColor: "#0D0D0D",
        borderBottom: "1px solid #2A2A2A",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="content-width"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 18,
          paddingBottom: 18,
        }}
      >
        <Link href="/">
          <span
            className="fraunces-label"
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "#F5A623",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            The Outside Eye
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/settings">
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#B8B2A8",
                cursor: "pointer",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#F5F0E8")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#B8B2A8")
              }
            >
              Settings
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
