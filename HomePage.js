function HomePage({ setPage, setSelectedCollege }) {
  const stats = [{ n: "10M+", l: "Students Helped" }, { n: "6,200+", l: "Colleges" }, { n: "800+", l: "Scholarships" }, { n: "98%", l: "Satisfaction Rate" }];
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.2), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent)", borderRadius: "50%", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "30%", right: "8%", width: 200, height: 200, background: "radial-gradient(circle, rgba(14,165,233,0.08), transparent)", borderRadius: "50%", filter: "blur(30px)" }} />
        
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", padding: "8px 18px", borderRadius: 30, marginBottom: 32 }}>
          <span style={{ color: "#818cf8", fontSize: 13, fontWeight: 700 }}>🚀 India's #1 College Discovery Platform</span>
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(38px, 6vw, 74px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, maxWidth: 800, margin: "0 auto 24px", letterSpacing: "-2px" }}>
          Find Your Dream<br /><span style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>College with Confidence</span>
        </h1>

        <p style={{ color: "#9ca3af", fontSize: 18, maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          AI-powered college matching, rank prediction, and expert counselling — everything you need to navigate India's complex admissions.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 72 }}>
          <button onClick={() => setPage("colleges")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", padding: "15px 32px", borderRadius: 12, cursor: "pointer", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 30px rgba(99,102,241,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            Explore Colleges →
          </button>
          <button onClick={() => setPage("tools")} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "15px 32px", borderRadius: 12, cursor: "pointer", fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            Try Free Tools
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 700 }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 900, color: "#818cf8" }}>{s.n}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {["JEE Advanced", "JEE Main", "NEET", "CAT", "CUET", "BITSAT", "MHT-CET"].map(e => (
            <span key={e} style={{ color: "#6b7280", fontSize: 14, fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>{e}</span>
          ))}
        </div>
      </section>

      {/* Features Preview */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading label="Features" title="Everything You Need to Decide" sub="Our tools and services give you data-driven clarity at every step of your admission journey." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {[
            { icon: "🧠", title: "Smart Match", desc: "AI matches you to colleges based on rank, preferences, budget, location, and career goals.", color: "#6366f1" },
            { icon: "📊", title: "Rank Predictor", desc: "Know your expected rank before results with 94% accuracy using our ML models.", color: "#0ea5e9" },
            { icon: "🎓", title: "Scholarship Finder", desc: "Discover scholarships worth ₹50Cr+ that students miss every year.", color: "#10b981" },
          ].map(f => (
            <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, marginBottom: 10, fontSize: 18 }}>{f.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button onClick={() => setPage("features")} style={{ background: "transparent", border: "1px solid rgba(99,102,241,0.4)", color: "#818cf8", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>View All Features →</button>
        </div>
      </section>

      {/* Top Colleges Preview */}
      <section style={{ padding: "0 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading label="Top Colleges" title="India's Premier Institutions" sub="Explore detailed profiles of IITs, NITs, AIIMS, IIMs and 6,200+ colleges." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
          {COLLEGES.slice(0, 3).map(c => <CollegeCard key={c.id} college={c} setPage={setPage} setSelectedCollege={setSelectedCollege} />)}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("colleges")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", padding: "13px 30px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>View All 6,200+ Colleges →</button>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section style={{ padding: "0 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading label="Success Stories" title="Students Who Made It" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }}>
          {TESTIMONIALS.slice(0, 3).map(t => (
            <div key={t.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <p style={{ color: "#d1d5db", fontSize: 14.5, lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>{t.avatar}</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "#6b7280", fontSize: 12 }}>{t.college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("testimonials")} style={{ background: "transparent", border: "1px solid rgba(99,102,241,0.4)", color: "#818cf8", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Read All Stories →</button>
        </div>
      </section>
    </div>
  );
}
