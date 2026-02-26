// ── Shared Components ─────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "Home", id: "home" },
    { label: "Colleges", id: "colleges" },
    { label: "Features", id: "features" },
    { label: "Tools", id: "tools" },
    { label: "Counselling", id: "counselling" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: "rgba(10,12,20,0.97)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎯</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-0.5px" }}>College<span style={{ color: "#818cf8" }}>Compass</span></span>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{ background: page === l.id ? "rgba(99,102,241,0.15)" : "transparent", border: "none", color: page === l.id ? "#818cf8" : "#9ca3af", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13.5, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>
              {l.label}
            </button>
          ))}
        </div>

        <button onClick={() => setPage("counselling")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", padding: "9px 20px", borderRadius: 10, cursor: "pointer", fontSize: 13.5, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 15px rgba(99,102,241,0.4)" }}>
          Free Counselling
        </button>
      </div>
    </nav>
  );
}
