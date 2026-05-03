import { useState, useEffect } from "react";
import { Link } from "wouter";
import { callOutsideEye } from "@/lib/ai";
import { DEMO_RESPONSES } from "@/lib/demo";
import { markVisited } from "@/lib/visited";
import { saveFeedback, getFeedback, saveNote, getNote, type Rating } from "@/lib/feedback";
import { saveSession, loadSession, clearSession, sessionAge } from "@/lib/session";
import { encodeShare, decodeShare } from "@/lib/sharelink";
import HowToUse from "@/components/HowToUse";
import ModeBadge from "@/components/ModeBadge";
import FeedbackRow from "@/components/FeedbackRow";

const disciplines = [
  "Advertising", "Art Direction", "Brand Strategy", "Content Strategy",
  "Copywriting", "Freelancing", "Graphic Design", "Marketing",
  "Media Planning", "PR and Communications", "Running a Small Business",
  "Social Media", "UX Design",
];
const levels = ["Just starting", "Getting serious", "Ready to go deeper"];
type Tab = "books" | "youtube" | "websites" | "courses";

interface Book { title: string; author: string; whyItMatters: string; free: boolean }
interface Channel { name: string; whyItMatters: string }
interface Website { name: string; url: string; whyItMatters: string }
interface Course { name: string; platform: string }
interface LibraryData {
  discipline: string; level: string;
  books: Book[]; youtubeChannels: Channel[]; websites: Website[]; freeCourses: Course[];
  weekOnePlan: string;
}

// Exhaustive key lookup — AI returns many variants of the same fields
function findArr(data: Record<string, unknown>, ...candidates: string[]): unknown[] {
  for (const k of candidates) {
    if (Array.isArray(data[k]) && (data[k] as unknown[]).length > 0) return data[k] as unknown[];
  }
  // Last resort: scan all keys for arrays that look like the right shape
  for (const k of candidates) {
    for (const key of Object.keys(data)) {
      if (key.toLowerCase().includes(k.toLowerCase()) && Array.isArray(data[key])) {
        return data[key] as unknown[];
      }
    }
  }
  return [];
}

const SYSTEM = `You are a creative mentor building a real reading and watching list. Return only resources that genuinely exist and are actually valuable. Prioritise free resources. Be specific. No padding. No filler. No made-up titles.

Return ONLY a raw JSON object with EXACTLY these keys:
{
  "books": [ { "title": "...", "author": "...", "whyItMatters": "...", "free": false } ],
  "youtubeChannels": [ { "name": "...", "whyItMatters": "..." } ],
  "websites": [ { "name": "...", "url": "https://...", "whyItMatters": "..." } ],
  "freeCourses": [ { "name": "...", "platform": "..." } ],
  "weekOnePlan": "A single paragraph of specific, actionable advice for the first week."
}

No markdown. No backticks. No extra keys. No preamble. The response must be valid JSON parseable by JSON.parse().`;

export default function Library() {
  const [discipline, setDiscipline] = useState("");
  const [level, setLevel] = useState("");
  const [output, setOutput] = useState<LibraryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [restored, setRestored] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("books");
  const [rating, setRating] = useState<Rating | null>(() => getFeedback("library"));
  const [note, setNote] = useState(() => getNote("library"));
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const s = decodeShare();
    if (s) {
      if (typeof s.discipline === "string") setDiscipline(s.discipline);
      if (typeof s.level === "string") setLevel(s.level);
    }
    const saved = loadSession("library");
    if (saved) {
      setOutput(saved.output as LibraryData);
      setIsDemo(saved.isDemo);
      setRestored(saved.savedAt);
    }
  }, []);

  function handleRating(r: Rating) {
    const next = rating === r ? null : r;
    setRating(next);
    if (next) saveFeedback("library", next);
  }

  function handleNote(n: string) {
    setNote(n);
    saveNote("library", n);
  }

  function handleClear() {
    clearSession("library");
    setOutput(null);
    setRestored(null);
    setIsDemo(false);
  }

  function handleCopyShareLink() {
    const url = encodeShare({ discipline, level });
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }

  const isValid = discipline.length > 0 && level.length > 0;

  async function handleSubmit() {
    setError(null); setOutput(null); setRestored(null); setIsDemo(false);
    markVisited("library");
    if (localStorage.getItem("outsideeye_mode") === "demo") {
      const demo = DEMO_RESPONSES.library as LibraryData;
      setOutput(demo); setIsDemo(true);
      saveSession("library", demo as unknown as Record<string, unknown>, true);
      return;
    }
    setLoading(true);
    const prompt = `Discipline: ${discipline}. Level: ${level}.`;
    try {
      const raw = await callOutsideEye(prompt, SYSTEM);
      const data = JSON.parse(raw) as Record<string, unknown>;

      const normalised: LibraryData = {
        discipline,
        level,
        books: findArr(data, "books") as Book[],
        youtubeChannels: findArr(data,
          "youtubeChannels", "youtube_channels", "YouTubeChannels",
          "youtube", "channels", "youTubeChannels", "yt", "videos"
        ) as Channel[],
        websites: findArr(data,
          "websites", "website", "sites", "links", "resources", "onlineResources", "online_resources"
        ) as Website[],
        freeCourses: findArr(data,
          "freeCourses", "free_courses", "FreeCourses", "courses",
          "onlineCourses", "online_courses", "freeResources"
        ) as Course[],
        weekOnePlan: typeof data.weekOnePlan === "string"
          ? data.weekOnePlan
          : typeof data.week_one_plan === "string"
          ? data.week_one_plan
          : typeof data.weekOne === "string"
          ? data.weekOne
          : "",
      };

      setOutput(normalised);
      saveSession("library", normalised as unknown as Record<string, unknown>, false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "UNKNOWN";
      if (msg === "NO_KEY") {
        const demo = DEMO_RESPONSES.library as LibraryData;
        setOutput(demo);
        setIsDemo(true);
        saveSession("library", demo as unknown as Record<string, unknown>, true);
      } else if (msg === "BAD_KEY") setError("Your key was rejected. Check it in Settings.");
      else if (msg === "RATE_LIMIT") setError("Rate limit hit. Try again in a moment.");
      else setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  function WeekOnePlan() {
    if (!output?.weekOnePlan) return null;
    return (
      <div style={{ backgroundColor: "#1C1C1C", borderLeft: "3px solid #F5A623", padding: 24, marginTop: 32 }}>
        <p className="label-mono" style={{ marginBottom: 12 }}>Start here this week</p>
        <p className="fraunces-label" style={{ fontStyle: "italic", fontSize: 20, color: "#F5F0E8", lineHeight: 1.45 }}>{output.weekOnePlan}</p>
      </div>
    );
  }

  return (
    <div className="content-width" style={{ paddingTop: 40 }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/">
          <span
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#B8B2A8", cursor: "pointer", transition: "color 150ms ease" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5A623")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8B2A8")}
          >
            ← All rooms
          </span>
        </Link>
      </div>

      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>08</p>
      <h1 className="fraunces-display" style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 600, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 12 }}>The Library</h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8B2A8", marginBottom: 32 }}>Books, channels, and resources worth your time. Curated by discipline.</p>
      <hr className="hr-hairline" style={{ marginBottom: 40 }} />

      <HowToUse paragraphs={["Select what you want to get better at and where you are in your journey.", "A curated list of books, channels, websites, and free courses will come back. Specific. Earned. No padding."]} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 12 }}>What do you want to get better at?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {disciplines.map((d) => (
              <button key={d} className={`toggle-btn ${discipline === d ? "active" : ""}`} style={{ textAlign: "left" }} onClick={() => setDiscipline(d)}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="label-mono-grey" style={{ marginBottom: 12 }}>Your level</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {levels.map((l) => (
              <button key={l} className={`toggle-btn ${level === l ? "active" : ""}`} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading || !isValid} style={{ flex: "none" }}>
          {loading ? "The Outside Eye is reading your work..." : "Get the Outside Eye"}
        </button>
        {isValid && (
          <button
            onClick={handleCopyShareLink}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: shareCopied ? "#7CBA6A" : "#5A5550", padding: 0, transition: "color 150ms ease" }}
            onMouseEnter={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8"; }}
            onMouseLeave={(e) => { if (!shareCopied) (e.currentTarget as HTMLButtonElement).style.color = "#5A5550"; }}
          >
            {shareCopied ? "Link copied" : "Copy share link"}
          </button>
        )}
        <ModeBadge />
      </div>

      {error && <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#F87171", marginTop: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{error}</p>}

      {output && !loading && (
        <div style={{ marginTop: 40 }}>
          <hr className="hr-hairline" style={{ marginBottom: 24 }} />

          {restored !== null && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", backgroundColor: "#141414", border: "1px solid #2A2A2A", marginBottom: 20 }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B2A8" }}>
                Last session · {sessionAge(restored)}
              </p>
              <button
                onClick={handleClear}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#5A5550", padding: 0, transition: "color 150ms ease" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F87171")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#5A5550")}
              >
                Clear
              </button>
            </div>
          )}

          {isDemo && <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>Demo Response — Add your key for your actual discipline and level.</p>}

          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #2A2A2A", marginBottom: 32 }}>
            {(["books", "youtube", "websites", "courses"] as Tab[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "12px 20px",
                fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, letterSpacing: "0.08em",
                textTransform: "uppercase", color: activeTab === tab ? "#F5A623" : "#B8B2A8",
                borderBottom: activeTab === tab ? "2px solid #F5A623" : "2px solid transparent",
                marginBottom: -1, transition: "color 150ms ease",
              }}>
                {tab === "youtube" ? "YouTube" : tab === "courses" ? "Free Courses" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "youtube" && output.youtubeChannels?.length > 0 && (
                  <span style={{ marginLeft: 6, color: "#3A3530", fontSize: 10 }}>{output.youtubeChannels.length}</span>
                )}
                {tab === "websites" && output.websites?.length > 0 && (
                  <span style={{ marginLeft: 6, color: "#3A3530", fontSize: 10 }}>{output.websites.length}</span>
                )}
                {tab === "courses" && output.freeCourses?.length > 0 && (
                  <span style={{ marginLeft: 6, color: "#3A3530", fontSize: 10 }}>{output.freeCourses.length}</span>
                )}
                {tab === "books" && output.books?.length > 0 && (
                  <span style={{ marginLeft: 6, color: "#3A3530", fontSize: 10 }}>{output.books.length}</span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "books" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(Array.isArray(output.books) ? output.books : []).map((book, i) => (
                <div key={i} style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                    <p className="fraunces-label" style={{ fontSize: 18, color: "#F5F0E8" }}>{book.title}</p>
                    {book.free && <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#A3E635", letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>Free</span>}
                  </div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#B8B2A8", marginBottom: 8 }}>{book.author}</p>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#B8B2A8", lineHeight: 1.6 }}>{book.whyItMatters}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "youtube" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(Array.isArray(output.youtubeChannels) && output.youtubeChannels.length > 0) ? output.youtubeChannels.map((ch, i) => (
                <div key={i} style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 24 }}>
                  <p className="fraunces-label" style={{ fontSize: 18, color: "#F5F0E8", marginBottom: 8 }}>{ch.name}</p>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#B8B2A8", lineHeight: 1.6 }}>{ch.whyItMatters}</p>
                </div>
              )) : (
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#5A5550", fontStyle: "italic" }}>No YouTube channels returned for this discipline. Try regenerating.</p>
              )}
            </div>
          )}

          {activeTab === "websites" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(Array.isArray(output.websites) && output.websites.length > 0) ? output.websites.map((site, i) => (
                <div key={i} style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <p className="fraunces-label" style={{ fontSize: 18, color: "#F5F0E8" }}>{site.name}</p>
                    {site.url && (
                      <a href={site.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#F5A623", letterSpacing: "0.06em" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}>Visit →</a>
                    )}
                  </div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#B8B2A8", lineHeight: 1.6 }}>{site.whyItMatters}</p>
                </div>
              )) : (
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#5A5550", fontStyle: "italic" }}>No websites returned for this discipline. Try regenerating.</p>
              )}
            </div>
          )}

          {activeTab === "courses" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(Array.isArray(output.freeCourses) && output.freeCourses.length > 0) ? output.freeCourses.map((course, i) => (
                <div key={i} style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A", padding: 24 }}>
                  <p className="fraunces-label" style={{ fontSize: 18, color: "#F5F0E8", marginBottom: 4 }}>{course.name}</p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#B8B2A8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{course.platform}</p>
                </div>
              )) : (
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#5A5550", fontStyle: "italic" }}>No free courses returned for this discipline. Try regenerating.</p>
              )}
            </div>
          )}

          <WeekOnePlan />
          <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleSubmit} disabled={loading} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B2A8", background: "none", border: "1px solid #2A2A2A", padding: "5px 12px", cursor: "pointer", transition: "color 150ms ease, border-color 150ms ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A"; }}
            >
              Try again
            </button>
          </div>
          <FeedbackRow rating={rating} onRate={handleRating} note={note} onNote={handleNote} />
        </div>
      )}
      <div style={{ marginTop: 88 }} />
    </div>
  );
}
