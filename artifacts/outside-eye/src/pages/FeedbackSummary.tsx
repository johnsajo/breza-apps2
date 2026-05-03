import { useState, useEffect } from "react";
import { getVisited } from "@/lib/visited";
import { getAllFeedback, type FeedbackEntry } from "@/lib/feedback";

const ROOMS = [
  { key: "critique",  num: "01", name: "The Critique" },
  { key: "brief",     num: "02", name: "The Brief Decoder" },
  { key: "bridge",    num: "03", name: "The Bridge" },
  { key: "translate", num: "04", name: "The Feedback Translator" },
  { key: "jury",      num: "05", name: "The Jury" },
  { key: "colour",    num: "06", name: "Colour Intelligence" },
  { key: "wordmark",  num: "07", name: "The Wordmark Room" },
  { key: "library",   num: "08", name: "The Library" },
  { key: "spark",     num: "09", name: "The First Draft" },
];

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatLongDate() {
  return new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildBrief(
  visited: string[],
  feedback: FeedbackEntry[]
): string {
  const triedCount = visited.length;
  const useful = ROOMS.filter((r) =>
    feedback.find((f) => f.roomKey === r.key && f.rating === "up")
  );
  const notUseful = ROOMS.filter((r) =>
    feedback.find((f) => f.roomKey === r.key && f.rating === "down")
  );
  const triedUnrated = ROOMS.filter(
    (r) =>
      visited.includes(r.key) &&
      !feedback.find((f) => f.roomKey === r.key)
  );
  const notTried = ROOMS.filter((r) => !visited.includes(r.key));

  const div = "─────────────────────────────────────";
  const lines: string[] = [];

  lines.push("THE OUTSIDE EYE");
  lines.push(`Review brief · ${formatLongDate()}`);
  lines.push("");

  if (triedCount === 0) {
    lines.push("No rooms tested yet.");
    return lines.join("\n");
  }

  // Opening sentence
  const sentenceParts: string[] = [];
  sentenceParts.push(`I tested ${triedCount} of the nine rooms.`);
  if (useful.length > 0)
    sentenceParts.push(
      `${useful.length} ${useful.length === 1 ? "felt" : "felt"} genuinely useful.`
    );
  if (notUseful.length > 0)
    sentenceParts.push(
      `${notUseful.length} ${notUseful.length === 1 ? "didn't land." : "didn't land."}`
    );
  lines.push(sentenceParts.join(" "));
  lines.push("");
  lines.push(div);

  if (useful.length > 0) {
    lines.push("");
    lines.push("WORKED WELL");
    useful.forEach((r) => {
      const entry = feedback.find((f) => f.roomKey === r.key)!;
      lines.push(`  ${r.num}  ${r.name}  (rated ${formatDate(entry.at)})`);
      if (entry.note) lines.push(`       "${entry.note}"`);
    });
  }

  if (notUseful.length > 0) {
    lines.push("");
    lines.push("DIDN'T WORK");
    notUseful.forEach((r) => {
      const entry = feedback.find((f) => f.roomKey === r.key)!;
      lines.push(`  ${r.num}  ${r.name}  (rated ${formatDate(entry.at)})`);
      if (entry.note) lines.push(`       "${entry.note}"`);
    });
  }

  if (triedUnrated.length > 0) {
    lines.push("");
    lines.push("TRIED · NOT YET RATED");
    triedUnrated.forEach((r) => {
      lines.push(`  ${r.num}  ${r.name}`);
    });
  }

  if (notTried.length > 0) {
    lines.push("");
    lines.push("NOT YET TRIED");
    notTried.forEach((r) => {
      lines.push(`  ${r.num}  ${r.name}`);
    });
  }

  lines.push("");
  lines.push(div);
  lines.push("theoutsideeye.com");

  return lines.join("\n");
}

export default function FeedbackSummary() {
  const [visited, setVisited] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setVisited(getVisited());
    setFeedback(getAllFeedback());
  }, []);

  const triedCount = visited.length;
  const upCount = feedback.filter((f) => f.rating === "up").length;
  const downCount = feedback.filter((f) => f.rating === "down").length;
  const ratedCount = feedback.length;

  const briefText = buildBrief(visited, feedback);

  function handleCopy() {
    navigator.clipboard.writeText(briefText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    localStorage.removeItem("outsideeye_feedback");
    localStorage.removeItem("outsideeye_visited");
    setVisited([]);
    setFeedback([]);
    setShowPreview(false);
  }

  return (
    <div className="content-width" style={{ paddingTop: 56, paddingBottom: 88 }}>
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#F5A623",
          marginBottom: 8,
        }}
      >
        Session Notes
      </p>

      <h1
        className="fraunces-display"
        style={{
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 600,
          color: "#F5F0E8",
          lineHeight: 1.1,
          marginBottom: 12,
        }}
      >
        Your feedback so far
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 17,
          color: "#B8B2A8",
          marginBottom: 40,
        }}
      >
        {triedCount === 0
          ? "You haven't tried any rooms yet."
          : `${triedCount} of 9 rooms tried. ${ratedCount > 0 ? `${upCount} useful, ${downCount} not useful.` : "No rooms rated yet."}`}
      </p>

      <hr className="hr-hairline" style={{ marginBottom: 32 }} />

      {/* Stats */}
      {triedCount > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            backgroundColor: "#2A2A2A",
            border: "1px solid #2A2A2A",
            marginBottom: 40,
          }}
        >
          {[
            { label: "Tried", value: `${triedCount} / 9` },
            { label: "Useful", value: String(upCount) },
            { label: "Not useful", value: String(downCount) },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ backgroundColor: "#0D0D0D", padding: "20px 24px", textAlign: "center" }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#5A5550",
                  marginBottom: 8,
                }}
              >
                {stat.label}
              </p>
              <p className="fraunces-label" style={{ fontSize: 28, color: "#F5F0E8", fontWeight: 500 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Room list */}
      <div>
        {ROOMS.map((room) => {
          const wasVisited = visited.includes(room.key);
          const entry = feedback.find((f) => f.roomKey === room.key);

          return (
            <div
              key={room.key}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 0",
                borderBottom: "1px solid #1A1A1A",
                opacity: wasVisited ? 1 : 0.4,
              }}
            >
              {/* Main row: number · name · status */}
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 12,
                    color: "#F5A623",
                    flexShrink: 0,
                    width: 24,
                  }}
                >
                  {room.num}
                </span>

                <p
                  className="fraunces-label"
                  style={{ fontSize: 18, fontWeight: 500, color: "#F5F0E8", flex: 1 }}
                >
                  {room.name}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  {!wasVisited ? (
                    <span
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#3A3530",
                      }}
                    >
                      Not tried
                    </span>
                  ) : entry ? (
                    <>
                      <span
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#5A5550",
                        }}
                      >
                        {formatDate(entry.at)}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: 16,
                          color: entry.rating === "up" ? "#7CBA6A" : "#F87171",
                          lineHeight: 1,
                        }}
                      >
                        {entry.rating === "up" ? "↑" : "↓"}
                      </span>
                    </>
                  ) : (
                    <span
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#5A5550",
                      }}
                    >
                      Tried · not rated
                    </span>
                  )}
                </div>
              </div>

              {/* Note row */}
              {entry?.note && (
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 11,
                    color: "#5A5550",
                    fontStyle: "italic",
                    marginTop: 8,
                    paddingLeft: 44,
                  }}
                >
                  "{entry.note}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Brief preview + actions */}
      {triedCount > 0 && (
        <>
          <hr className="hr-hairline" style={{ marginTop: 40, marginBottom: 32 }} />

          {/* Preview toggle */}
          <div style={{ marginBottom: showPreview ? 0 : 0 }}>
            <button
              onClick={() => setShowPreview((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#F5A623",
                }}
              >
                {showPreview ? "Hide brief preview" : "Preview brief"}
              </span>
              <span
                style={{
                  color: "#F5A623",
                  fontSize: 12,
                  transform: showPreview ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease",
                  lineHeight: 1,
                }}
              >
                ▾
              </span>
            </button>
          </div>

          {showPreview && (
            <div
              style={{
                marginTop: 20,
                marginBottom: 8,
                backgroundColor: "#0D0D0D",
                border: "1px solid #2A2A2A",
                padding: "28px 32px",
              }}
            >
              <pre
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 12,
                  lineHeight: 1.9,
                  color: "#B8B2A8",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: 0,
                }}
              >
                {briefText}
              </pre>
            </div>
          )}

          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <button
              onClick={handleCopy}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: copied ? "#7CBA6A" : "#B8B2A8",
                background: "none",
                border: "1px solid",
                borderColor: copied ? "#7CBA6A" : "#2A2A2A",
                padding: "6px 14px",
                cursor: "pointer",
                transition: "color 150ms ease, border-color 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8";
                }
              }}
              onMouseLeave={(e) => {
                if (!copied) {
                  (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
                }
              }}
            >
              {copied ? "Copied" : "Copy brief"}
            </button>

            <button
              onClick={handleClear}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 11,
                color: "#5A5550",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
            >
              Clear all session data
            </button>
          </div>
        </>
      )}
    </div>
  );
}
