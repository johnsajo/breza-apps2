export default function Footer() {
  const divisionLinks = [
    { label: "tbcworldwide.com", href: "https://tbcworldwide.com" },
    { label: "brezaplusyou.com.au", href: "https://brezaplusyou.com.au" },
    { label: "taracollective.org", href: "https://taracollective.org" },
    { label: "celes13.com.au", href: "https://celes13.com.au" },
  ];

  const products =
    "compyr · alertss · turnd · yourrr · novlit · sharpend · moodframe · the outside eye · rostrr · platd · sortd · earnt · neighbr";

  const socialIcons = [
    {
      label: "LinkedIn",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "X",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ backgroundColor: "#0F172A", width: "100%", marginTop: "auto" }}>
      <div
        className="content-width"
        style={{ paddingTop: 56, paddingBottom: 48 }}
      >
        <div>
          <p
            className="fraunces-label"
            style={{ fontSize: 18, fontWeight: 600, color: "#F0F4F8" }}
          >
            the outside eye
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              color: "#94A3B8",
              marginTop: 6,
            }}
          >
            A free creative mentor. No account. No subscription.
          </p>
        </div>

        <div style={{ marginTop: 36 }} />
        <hr style={{ border: "none", borderTop: "1px solid #1A2536" }} />
        <div style={{ marginTop: 28 }} />

        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#94A3B8" }}>
          {products}
        </p>

        <div style={{ marginTop: 20 }}>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#94A3B8" }}>
            {divisionLinks.map((link, i) => (
              <span key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#B8D4E8", textDecoration: "none", transition: "text-decoration 150ms ease" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
                >
                  {link.label}
                </a>
                {i < divisionLinks.length - 1 && (
                  <span style={{ color: "#94A3B8" }}> · </span>
                )}
              </span>
            ))}
          </p>
        </div>

        <div style={{ marginTop: 20 }}>
          <a
            href="mailto:connect@tbcworldwide.com"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              color: "#B8D4E8",
              textDecoration: "none",
              transition: "text-decoration 150ms ease",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
          >
            connect@tbcworldwide.com
          </a>
        </div>

        <div style={{ marginTop: 36 }} />
        <hr style={{ border: "none", borderTop: "1px solid #1A2536" }} />
        <div style={{ marginTop: 28 }} />

        <div style={{ display: "flex", gap: 28 }}>
          {socialIcons.map((icon) => (
            <span
              key={icon.label}
              aria-label={icon.label}
              style={{
                color: "#94A3B8",
                cursor: "pointer",
                transition: "color 150ms ease",
                display: "inline-flex",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#F0F4F8")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#94A3B8")
              }
            >
              {icon.svg}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#94A3B8" }}>
            Part of Breza + You. Tech Division of TBC Worldwide.
          </p>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#3A4A65", marginTop: 4 }}>
            2026 The Outside Eye. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
