export default function About() {
  return (
    <div className="content-width" style={{ paddingTop: 56, paddingBottom: 88 }}>
      <h1
        className="fraunces-display"
        style={{
          fontSize: "clamp(32px, 5vw, 40px)",
          fontWeight: 600,
          color: "#F5F0E8",
          marginBottom: 40,
        }}
      >
        Why this exists.
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 17,
          color: "#B8B2A8",
          lineHeight: 1.65,
          marginBottom: 28,
        }}
      >
        Most people trying to get better at their craft don't have a mentor.
        They have the internet, which is full of noise, and instinct, which takes
        years to trust. The Outside Eye exists because good feedback should not
        require knowing the right people.
      </p>

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 17,
          color: "#B8B2A8",
          lineHeight: 1.65,
        }}
      >
        This is free. It will stay free. Use it on your work, your briefs, your
        ideas, your headlines. Come back when you are stuck. Bring someone who
        needs it.
      </p>

      <div style={{ marginTop: 40 }} />
      <hr className="hr-hairline" />
      <div style={{ marginTop: 32 }} />

      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 14,
          color: "#B8B2A8",
          fontStyle: "italic",
        }}
      >
        If this helped, tell someone.
      </p>
    </div>
  );
}
