const SERIF = "'DM Serif Display', Georgia, serif";
const SANS  = "'DM Sans', Inter, sans-serif";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <a href="/" style={{ fontFamily: SERIF, fontSize: 36, color: "#FAF6E8", textDecoration: "none", marginBottom: 32, letterSpacing: "-0.01em" }}>
        kindd
      </a>
      <div style={{ fontFamily: SERIF, fontSize: 120, color: "#1E3A5F", lineHeight: 1, marginBottom: 0 }}>404</div>
      <p style={{ fontFamily: SERIF, fontSize: 28, color: "#FAF6E8", marginTop: 24, marginBottom: 0, lineHeight: 1.2 }}>
        That page does not exist. But this one does.
      </p>
      <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 16, color: "#A89880", marginTop: 12, marginBottom: 40 }}>
        Whatever you were looking for, we probably have something useful.
      </p>
      <a
        href="/"
        style={{ fontFamily: SANS, fontWeight: 500, fontSize: 16, color: "#FFFFFF", background: "#007BA7", borderRadius: 32, padding: "16px 40px", textDecoration: "none", display: "inline-block" }}
      >
        Back to KINDD
      </a>
    </div>
  );
}
