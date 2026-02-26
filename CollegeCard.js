function CollegeCard({ college, setPage, setSelectedCollege }) {
  return (
    <div onClick={() => { setSelectedCollege(college); setPage("college-detail"); }} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, cursor: "pointer", transition: "all 0.25s", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${college.color}11`, borderRadius: "0 16px 0 80px" }} />
      <div style={{ fontSize: 36, marginBottom: 12 }}>{college.image}</div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontSize: 17, fontWeight: 800, margin: 0 }}>{college.name}</h3>
        <Badge color={college.color}>#{college.ranking}</Badge>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 16px" }}>📍 {college.location}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <Badge color="#0ea5e9">{college.stream}</Badge>
        <Badge color="#10b981">{college.fees}</Badge>
      </div>
      {college.highlights.map(h => <div key={h} style={{ color: "#9ca3af", fontSize: 12.5, marginBottom: 4 }}>✓ {h}</div>)}
      <div style={{ marginTop: 20, padding: "10px 0 0", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#6b7280", fontSize: 12 }}>Est. {college.established}</span>
        <span style={{ color: "#818cf8", fontSize: 13, fontWeight: 600 }}>View Details →</span>
      </div>
    </div>
  );
}
