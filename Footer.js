function Footer({ setPage }) {
  return (
    <footer style={{ background: "#05060e", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px 24px 32px", marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 12 }}>College<span style={{ color: "#818cf8" }}>Compass</span></div>
            <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Helping 10 million+ students navigate India's complex college admissions every year with data-driven insights.</p>
          </div>
          {[
            { title: "Explore", items: [["Colleges", "colleges"], ["Features", "features"], ["Tools", "tools"]] },
            { title: "Support", items: [["Counselling", "counselling"], ["FAQ", "faq"], ["Testimonials", "testimonials"]] },
            { title: "Exams", items: [["JEE", "colleges"], ["NEET", "colleges"], ["CAT", "colleges"]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontFamily: "'Syne', sans-serif", fontSize: 14 }}>{col.title}</div>
              {col.items.map(([label, pg]) => (
                <div key={label} onClick={() => setPage(pg)} style={{ color: "#6b7280", fontSize: 14, marginBottom: 10, cursor: "pointer" }}>{label}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#4b5563", fontSize: 13 }}>© 2025 CollegeCompass. All rights reserved.</span>
          <span style={{ color: "#4b5563", fontSize: 13 }}>Privacy · Terms · Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
