import { Link } from "wouter";
import { useState, useEffect } from "react";
import { getVisited } from "@/lib/visited";

const rooms = [
  { num: "01", key: "critique", name: "The Critique", desc: "Upload your work or paste your copy. Get specific, honest feedback.", href: "/critique" },
  { num: "02", key: "brief", name: "The Brief Decoder", desc: "Paste any brief or client email. Understand what they actually want.", href: "/brief" },
  { num: "03", key: "bridge", name: "The Bridge", desc: "Connect two unrelated ideas into one poetic thread.", href: "/bridge" },
  { num: "04", key: "translate", name: "The Feedback Translator", desc: "Decode what your client really means when they say make it pop.", href: "/translate" },
  { num: "05", key: "jury", name: "The Jury", desc: "Three different minds react to your concept before you present it.", href: "/jury" },
  { num: "06", key: "colour", name: "Colour Intelligence", desc: "Describe your project. Get three palette options with full rationale.", href: "/colour" },
  { num: "07", key: "wordmark", name: "The Wordmark Room", desc: "Type a brand name. Get three typographic wordmark concepts.", href: "/wordmark" },
  { num: "08", key: "library", name: "The Library", desc: "Books, channels, and resources worth your time. Curated by discipline.", href: "/library" },
  { num: "09", key: "spark", name: "The First Draft", desc: "Stuck on a blank page. Get three wildly different starting points.", href: "/spark" },
  { num: "10", key: "tone", name: "The Voice Room", desc: "Describe your brand. Get a full tone of voice guide with rewrite examples.", href: "/tone" },
  { num: "11", key: "trophy", name: "The Trophy Room", desc: "Enter a category, era, or a feeling about awarded work. Get the cultural reading behind why it won.", href: "/trophy", isNew: true },
  { num: "12", key: "insight", name: "The Insight Room", desc: "One question. Three possible verdicts. Find out whether your insight is actually real.", href: "/insight", isNew: true },
  { num: "13", key: "lineage", name: "The Lineage Room", desc: "Describe a creative idea. Find out where it came from — and what you're uncomfortably close to.", href: "/lineage", isNew: true },
];

export default function Home() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getVisited());
    const handler = () => setVisited(getVisited());
    window.addEventListener("outsideeye:visited", handler);
    return () => window.removeEventListener("outsideeye:visited", handler);
  }, []);
  return (
    <div className="content-width" style={{ paddingTop: 40 }}>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 14,
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
        Thirteen creative tools for designers, writers, marketers, and makers who want
        honest feedback on their work. Free to use. Bring a key you already have
        and it can stay that way, on your actual work.
      </p>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 14,
          color: "#B8B2A8",
          marginBottom: 40,
        }}
      >
        No account. No subscription. No data collected.
      </p>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "#B8B2A8",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        The Thirteen Rooms
      </p>

      {visited.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 12,
              color: "#B8B2A8",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#F5A623",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {visited.length} of 13 rooms tried
          </p>
        </div>
      )}

      <div>
        {rooms.map((room) => {
          const hasVisited = visited.includes(room.key);
          return (
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
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 5,
                  }}
                >
                  {hasVisited && (
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "#F5A623",
                        display: "block",
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 13,
                      color: hasVisited ? "#F5A623" : "#F5A623",
                      opacity: hasVisited ? 1 : 0.5,
                    }}
                  >
                    {room.num}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <p
                      className="fraunces-label"
                      style={{
                        fontSize: 22,
                        fontWeight: 500,
                        color: "#F5F0E8",
                      }}
                    >
                      {room.name}
                    </p>
                    {"isNew" in room && room.isNew && (
                      <span
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#0D0D0D",
                          backgroundColor: "#F5A623",
                          padding: "2px 7px",
                          flexShrink: 0,
                          lineHeight: 1.6,
                        }}
                      >
                        New
                      </span>
                    )}
                  </div>
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
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 16,
                    color: "#F5A623",
                    opacity: 0,
                    transition: "opacity 150ms ease",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          );
        })}
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
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#F5A623",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
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
