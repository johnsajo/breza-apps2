import { useState, useEffect } from "react";
import { getVisited } from "@/lib/visited";
import { getAllFeedback, type FeedbackEntry } from "@/lib/feedback";
import { loadAllSessions, clearAllSessions, sessionAge, type RoomSession } from "@/lib/session";

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
  { key: "tone",      num: "10", name: "The Voice Room" },
];

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-AU", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

function formatLongDate() {
  return new Date().toLocaleDateString("en-AU", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// ─── Flatten output to plain text ───────────────────────────────────────────

function flattenVal(value: unknown, depth = 0): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? `• ${item}`
          : flattenObj(item as Record<string, unknown>, depth + 1)
      )
      .join("\n");
  }
  if (typeof value === "object" && value !== null) {
    return flattenObj(value as Record<string, unknown>, depth + 1);
  }
  return String(value);
}

function flattenObj(obj: Record<string, unknown>, depth = 0): string {
  return Object.entries(obj)
    .filter(([k]) => k !== "isDemo")
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim().toUpperCase();
      const indent = depth > 0 ? "  " : "";
      return `${indent}${label}\n${indent}${flattenVal(v, depth).split("\n").join(`\n${indent}`)}`;
    })
    .join("\n\n");
}

// ─── Export builders ─────────────────────────────────────────────────────────

function buildTextExport(sessions: RoomSession[]): string {
  const div = "═══════════════════════════════════════";
  const lines: string[] = [];

  lines.push("THE OUTSIDE EYE");
  lines.push(`Session Export · ${formatLongDate()}`);
  lines.push("");

  if (sessions.length === 0) {
    lines.push("No saved outputs yet.");
    return lines.join("\n");
  }

  sessions.forEach((s) => {
    const room = ROOMS.find((r) => r.key === s.room);
    lines.push(div);
    lines.push("");
    lines.push(`${room?.num ?? "??"} · ${room?.name ?? s.room.toUpperCase()} · saved ${sessionAge(s.savedAt)}`);
    if (s.isDemo) lines.push("(Demo response)");
    lines.push("");
    lines.push(flattenObj(s.output));
    lines.push("");
  });

  lines.push(div);
  lines.push("theoutsideeye.com");

  return lines.join("\n");
}

function buildJsonExport(sessions: RoomSession[]): string {
  return JSON.stringify(
    {
      source: "The Outside Eye",
      exportedAt: new Date().toISOString(),
      rooms: sessions.map((s) => {
        const room = ROOMS.find((r) => r.key === s.room);
        return {
          key: s.room,
          name: room?.name ?? s.room,
          savedAt: new Date(s.savedAt).toISOString(),
          isDemo: s.isDemo,
          output: s.output,
        };
      }),
    },
    null,
    2
  );
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Brief builder (existing) ─────────────────────────────────────────────────

function buildBrief(visited: string[], feedback: FeedbackEntry[]): string {
  const useful = ROOMS.filter((r) => feedback.find((f) => f.roomKey === r.key && f.rating === "up"));
  const notUseful = ROOMS.filter((r) => feedback.find((f) => f.roomKey === r.key && f.rating === "down"));
  const triedUnrated = ROOMS.filter((r) => visited.includes(r.key) && !feedback.find((f) => f.roomKey === r.key));
  const notTried = ROOMS.filter((r) => !visited.includes(r.key));
  const div = "─────────────────────────────────────";
  const lines: string[] = [];

  lines.push("THE OUTSIDE EYE");
  lines.push(`Review brief · ${formatLongDate()}`);
  lines.push("");

  if (visited.length === 0) { lines.push("No rooms tested yet."); return lines.join("\n"); }

  const parts: string[] = [`I tested ${visited.length} of the ten rooms.`];
  if (useful.length > 0) parts.push(`${useful.length} felt genuinely useful.`);
  if (notUseful.length > 0) parts.push(`${notUseful.length} didn't land.`);
  lines.push(parts.join(" "));
  lines.push(""); lines.push(div);

  if (useful.length > 0) {
    lines.push(""); lines.push("WORKED WELL");
    useful.forEach((r) => {
      const entry = feedback.find((f) => f.roomKey === r.key)!;
      lines.push(`  ${r.num}  ${r.name}  (rated ${formatDate(entry.at)})`);
      if (entry.note) lines.push(`       "${entry.note}"`);
    });
  }
  if (notUseful.length > 0) {
    lines.push(""); lines.push("DIDN'T WORK");
    notUseful.forEach((r) => {
      const entry = feedback.find((f) => f.roomKey === r.key)!;
      lines.push(`  ${r.num}  ${r.name}  (rated ${formatDate(entry.at)})`);
      if (entry.note) lines.push(`       "${entry.note}"`);
    });
  }
  if (triedUnrated.length > 0) {
    lines.push(""); lines.push("TRIED · NOT YET RATED");
    triedUnrated.forEach((r) => lines.push(`  ${r.num}  ${r.name}`));
  }
  if (notTried.length > 0) {
    lines.push(""); lines.push("NOT YET TRIED");
    notTried.forEach((r) => lines.push(`  ${r.num}  ${r.name}`));
  }

  lines.push(""); lines.push(div); lines.push("theoutsideeye.com");
  return lines.join("\n");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeedbackSummary() {
  const [visited, setVisited] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [sessions, setSessions] = useState<RoomSession[]>([]);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setVisited(getVisited());
    setFeedback(getAllFeedback());
    setSessions(loadAllSessions());
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

  function handleExportText() {
    downloadFile(buildTextExport(sessions), "outside-eye-export.txt", "text/plain");
  }

  function handleExportJson() {
    downloadFile(buildJsonExport(sessions), "outside-eye-export.json", "application/json");
  }

  function handleClear() {
    localStorage.removeItem("outsideeye_feedback");
    localStorage.removeItem("outsideeye_visited");
    clearAllSessions();
    setVisited([]);
    setFeedback([]);
    setSessions([]);
    setShowPreview(false);
  }

  return (
    <div className="content-width" style={{ paddingTop: 56, paddingBottom: 88 }}>
      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>
        Session Notes
      </p>
      <h1 className="fraunces-display" style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 12 }}>
        Your feedback so far
      </h1>
      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 17, color: "#B8B2A8", marginBottom: 40 }}>
        {triedCount === 0
          ? "You haven't tried any rooms yet."
          : `${triedCount} of 10 rooms tried. ${ratedCount > 0 ? `${upCount} useful, ${downCount} not useful.` : "No rooms rated yet."}`}
      </p>

      <hr className="hr-hairline" style={{ marginBottom: 32 }} />

      {/* Stats */}
      {triedCount > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, backgroundColor: "#2A2A2A", border: "1px solid #2A2A2A", marginBottom: 40 }}>
          {[
            { label: "Tried", value: `${triedCount} / 10` },
            { label: "Useful", value: String(upCount) },
            { label: "Not useful", value: String(downCount) },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: "#0D0D0D", padding: "20px 24px", textAlign: "center" }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5550", marginBottom: 8 }}>{stat.label}</p>
              <p className="fraunces-label" style={{ fontSize: 28, color: "#F5F0E8", fontWeight: 500 }}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Room list */}
      <div>
        {ROOMS.map((room) => {
          const wasVisited = visited.includes(room.key);
          const entry = feedback.find((f) => f.roomKey === room.key);
          const session = sessions.find((s) => s.room === room.key);

          return (
            <div key={room.key} style={{ display: "flex", flexDirection: "column", padding: "18px 0", borderBottom: "1px solid #1A1A1A", opacity: wasVisited || session ? 1 : 0.4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#F5A623", flexShrink: 0, width: 24 }}>{room.num}</span>
                <p className="fraunces-label" style={{ fontSize: 18, fontWeight: 500, color: "#F5F0E8", flex: 1 }}>{room.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  {session && !entry && (
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5550" }}>
                      Saved {sessionAge(session.savedAt)}
                    </span>
                  )}
                  {!wasVisited && !session ? (
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3A3530" }}>Not tried</span>
                  ) : entry ? (
                    <>
                      <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5550" }}>
                        {session ? `Saved · ` : ""}{formatDate(entry.at)}
                      </span>
                      <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 16, color: entry.rating === "up" ? "#7CBA6A" : "#F87171", lineHeight: 1 }}>
                        {entry.rating === "up" ? "↑" : "↓"}
                      </span>
                    </>
                  ) : wasVisited && !session ? (
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5550" }}>Tried · not rated</span>
                  ) : null}
                </div>
              </div>
              {entry?.note && (
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#5A5550", fontStyle: "italic", marginTop: 8, paddingLeft: 44 }}>"{entry.note}"</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Saved outputs + export */}
      {sessions.length > 0 && (
        <>
          <hr className="hr-hairline" style={{ marginTop: 40, marginBottom: 32 }} />

          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 16 }}>
            Saved outputs
          </p>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 15, color: "#B8B2A8", marginBottom: 24, lineHeight: 1.6 }}>
            {sessions.length} of 9 rooms have saved outputs. Export them as a readable text file or structured JSON.
          </p>

          {/* Saved room chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {sessions.map((s) => {
              const room = ROOMS.find((r) => r.key === s.room);
              return (
                <div
                  key={s.room}
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: s.isDemo ? "#5A5550" : "#B8B2A8",
                    border: `1px solid ${s.isDemo ? "#1E1E1E" : "#2A2A2A"}`,
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#F5A623" }}>{room?.num}</span>
                  {room?.name}
                  {s.isDemo && <span style={{ color: "#3A3530" }}>demo</span>}
                  <span style={{ color: "#3A3530" }}>·</span>
                  <span style={{ color: "#5A5550" }}>{sessionAge(s.savedAt)}</span>
                </div>
              );
            })}
          </div>

          {/* Export buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={handleExportText}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#F5F0E8",
                background: "none",
                border: "1px solid #F5A623",
                padding: "8px 18px",
                cursor: "pointer",
                transition: "background 150ms ease, color 150ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#F5A623";
                (e.currentTarget as HTMLButtonElement).style.color = "#0D0D0D";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "none";
                (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
              }}
            >
              Export as text
            </button>
            <button
              onClick={handleExportJson}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#B8B2A8",
                background: "none",
                border: "1px solid #2A2A2A",
                padding: "8px 18px",
                cursor: "pointer",
                transition: "color 150ms ease, border-color 150ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
              }}
            >
              Export as JSON
            </button>
          </div>
        </>
      )}

      {/* Brief preview + actions */}
      {triedCount > 0 && (
        <>
          <hr className="hr-hairline" style={{ marginTop: 40, marginBottom: 32 }} />

          <button
            onClick={() => setShowPreview((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#F5A623" }}>
              {showPreview ? "Hide brief preview" : "Preview brief"}
            </span>
            <span style={{ color: "#F5A623", fontSize: 12, transform: showPreview ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease", lineHeight: 1 }}>▾</span>
          </button>

          {showPreview && (
            <div style={{ marginTop: 20, marginBottom: 8, backgroundColor: "#0D0D0D", border: "1px solid #2A2A2A", padding: "28px 32px" }}>
              <pre style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, lineHeight: 1.9, color: "#B8B2A8", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
                {briefText}
              </pre>
            </div>
          )}

          <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
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
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#5A5550", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "underline" }}
            >
              Clear all session data
            </button>
          </div>
        </>
      )}
    </div>
  );
}
