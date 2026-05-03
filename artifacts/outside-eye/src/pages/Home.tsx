import { Link } from "wouter";

const rooms = [
  { num: "01", name: "The Critique", desc: "Upload your work or paste your copy. Get specific, honest feedback.", href: "/critique" },
  { num: "02", name: "The Brief Decoder", desc: "Paste any brief or client email. Understand what they actually want.", href: "/brief" },
  { num: "03", name: "The Bridge", desc: "Connect two unrelated ideas into one poetic thread.", href: "/bridge" },
  { num: "04", name: "The Feedback Translator", desc: "Decode what your client really means when they say make it pop.", href: "/translate" },
  { num: "05", name: "The Jury", desc: "Three different minds react to your concept before you present it.", href: "/jury" },
  { num: "06", name: "Colour Intelligence", desc: "Describe your project. Get three palette options with full rationale.", href: "/colour" },
  { num: "07", name: "The Wordmark Room", desc: "Type a brand name. Get three typographic wordmark concepts.", href: "/wordmark" },
  { num: "08", name: "The Library", desc: "Books, channels, and resources worth your time. Curated by discipline.", href: "/library" },
  { num: "09", name: "The First Draft", desc: "Stuck on a blank page. Get three wildly different starting points.", href: "/spark" },
];

export default function Home() {
  return (
    <div className="content-width" style={{ paddingTop: 72 }}>
      <p
        style={{
          fontFamily: "'Departure Mono', 'Courier New', monospace",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#B8B2A8",
          marginBottom: 20,
        }}
      >
        Free · No Account · Bring Any Key
      </p>

      <h1
        className="fraunces-display"
        style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 700,
          color: "#F5F0E8",
          lineHeight: 1.08,
          maxWidth: 680,
          marginBottom: 32,
        }}
      >
        Work gets better when someone else looks at it.
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 18,
          color: "#B8B2A8",
          maxWidth: 580,
          lineHeight: 1.65,
          marginBottom: 24,
        }}
      >
        The Outside Eye is a set of free creative tools for designers, writers, marketers,
        and small business owners who want honest feedback on their work. Nine rooms.
        Bring any key you already have, or use Demo Mode to see how each room works.
      </p>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 14,
          color: "#B8B2A8",
          marginBottom: 64,
        }}
      >
        No account. No subscription. No data collected.
      </p>

      <hr className="hr-hairline" style={{ marginBottom: 64 }} />

      <p className="label-mono" style={{ marginBottom: 32 }}>
        The Nine Rooms
      </p>

      <div>
        {rooms.map((room) => (
          <Link key={room.num} href={room.href}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "24px 0",
                borderBottom: "1px solid #2A2A2A",
                cursor: "pointer",
                transition: "background-color 150ms ease",
                marginLeft: -24,
                marginRight: -24,
                paddingLeft: 24,
                paddingRight: 24,
              }}
              className="room-row"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "#141414";
                const arrow = e.currentTarget.querySelector(".room-arrow") as HTMLElement;
                if (arrow) arrow.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
                const arrow = e.currentTarget.querySelector(".room-arrow") as HTMLElement;
                if (arrow) arrow.style.opacity = "0";
              }}
            >
              <span
                style={{
                  fontFamily: "'Departure Mono', 'Courier New', monospace",
                  fontSize: 13,
                  color: "#F5A623",
                  flexShrink: 0,
                  width: 28,
                }}
              >
                {room.num}
              </span>
              <div style={{ flex: 1 }}>
                <p
                  className="fraunces-label"
                  style={{ fontSize: 22, fontWeight: 500, color: "#F5F0E8", marginBottom: 4 }}
                >
                  {room.name}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 15,
                    color: "#B8B2A8",
                    lineHeight: 1.5,
                  }}
                >
                  {room.desc}
                </p>
              </div>
              <span
                className="room-arrow"
                style={{
                  fontFamily: "'Departure Mono', monospace",
                  fontSize: 16,
                  color: "#F5A623",
                  opacity: 0,
                  transition: "opacity 150ms ease, transform 150ms ease",
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 88 }} />
      <hr className="hr-hairline" />
      <div style={{ marginTop: 88 }} />

      <blockquote
        style={{
          borderLeft: "3px solid #F5A623",
          paddingLeft: 24,
          margin: 0,
        }}
      >
        <p
          className="fraunces-label"
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 26,
            color: "#F5A623",
            lineHeight: 1.4,
          }}
        >
          Most people trying to get better at their craft don't have a mentor.
          The Outside Eye is the next best thing.
        </p>
      </blockquote>

      <div style={{ marginTop: 88 }} />
      <hr className="hr-hairline" />
      <div style={{ marginTop: 88 }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
        }}
      >
        {[
          {
            label: "Free Forever",
            body: "Every room works in Demo Mode at no cost. Bring your own key from any provider to unlock real feedback on your actual work.",
          },
          {
            label: "Your Data Stays Yours",
            body: "Your key lives in your browser only. Nothing is sent to any server except the provider you chose. Clear it any time.",
          },
          {
            label: "No Account Required",
            body: "Open a room. Use it. Come back when you need it. No sign-up. No email. No friction.",
          },
        ].map((col) => (
          <div key={col.label}>
            <p className="label-mono" style={{ marginBottom: 16 }}>
              {col.label}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 15,
                color: "#B8B2A8",
                lineHeight: 1.6,
              }}
            >
              {col.body}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 88 }} />
    </div>
  );
}
