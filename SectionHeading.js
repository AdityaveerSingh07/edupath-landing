function SectionHeading({ label, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)", padding: "5px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>{label}</div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>{title}</h2>
      {sub && <p style={{ color: "#9ca3af", fontSize: 17, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}
