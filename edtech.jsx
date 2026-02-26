import { useState, useEffect, useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const COLLEGES = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    stream: "Engineering",
    fees: "₹2.3L/yr",
    ranking: 1,
    nirf: 3,
    image: "🏛️",
    established: 1958,
    students: "11,000+",
    faculty: "600+",
    courses: ["B.Tech", "M.Tech", "PhD", "MBA"],
    highlights: ["Top NIRF Engineering", "Placement avg ₹20L+", "World-class labs"],
    cutoff: "JEE Advanced – Gen: 67 | OBC: 200 | SC: 350",
    placements: { avg: "₹21.8L", highest: "₹2.4Cr", companies: 500 },
    description:
      "IIT Bombay is among India's premier engineering institutes, known for cutting-edge research, top placements, and an elite alumni network spanning global tech companies.",
    color: "#0066CC",
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    stream: "Engineering",
    fees: "₹5.2L/yr",
    ranking: 2,
    nirf: 25,
    image: "🎓",
    established: 1964,
    students: "15,000+",
    faculty: "900+",
    courses: ["B.E.", "M.E.", "M.Sc.", "MBA"],
    highlights: ["Autonomous curriculum", "Practice School Program", "Dual degree option"],
    cutoff: "BITSAT – Gen: 350+ | OBC: 320+ | SC: 280+",
    placements: { avg: "₹17.5L", highest: "₹1.8Cr", companies: 400 },
    description:
      "BITS Pilani is a deemed university renowned for academic freedom, its industry-integrated Practice School program, and consistently top placements across tech and finance.",
    color: "#CC0033",
  },
  {
    id: "aiims-delhi",
    name: "AIIMS New Delhi",
    location: "New Delhi",
    stream: "Medical",
    fees: "₹1.6K/yr",
    ranking: 1,
    nirf: 1,
    image: "🏥",
    established: 1956,
    students: "3,500+",
    faculty: "700+",
    courses: ["MBBS", "MD", "MS", "PhD", "BSc Nursing"],
    highlights: ["#1 Medical in India", "Central Govt institute", "World-class hospital"],
    cutoff: "NEET – Gen: 700+ | OBC: 690+ | SC: 650+",
    placements: { avg: "₹12L", highest: "₹60L", companies: 200 },
    description:
      "AIIMS New Delhi is India's most prestigious medical institution, offering unparalleled clinical training, research facilities, and access to thousands of patients for hands-on learning.",
    color: "#007755",
  },
  {
    id: "iim-ahmedabad",
    name: "IIM Ahmedabad",
    location: "Ahmedabad, Gujarat",
    stream: "Management",
    fees: "₹11.5L/yr",
    ranking: 1,
    nirf: 1,
    image: "💼",
    established: 1961,
    students: "1,200+",
    faculty: "100+",
    courses: ["PGP", "PGPX", "PhD", "Executive MBA"],
    highlights: ["#1 B-School in India", "Global alumni 40,000+", "Avg pkg ₹35L+"],
    cutoff: "CAT – Gen: 99%ile | OBC: 97%ile | SC: 90%ile",
    placements: { avg: "₹35.1L", highest: "₹1.1Cr", companies: 150 },
    description:
      "IIM Ahmedabad is Asia's top business school, known for its rigorous case-method pedagogy, exceptional faculty, and an alumni network that leads Fortune 500 companies globally.",
    color: "#AA3300",
  },
  {
    id: "nit-trichy",
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    stream: "Engineering",
    fees: "₹1.8L/yr",
    ranking: 5,
    nirf: 8,
    image: "⚙️",
    established: 1964,
    students: "9,000+",
    faculty: "500+",
    courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
    highlights: ["Top NIT nationally", "Strong South India network", "Excellent placements"],
    cutoff: "JEE Main – Gen: 5000 | OBC: 12000 | SC: 30000",
    placements: { avg: "₹12.4L", highest: "₹80L", companies: 350 },
    description:
      "NIT Trichy is consistently ranked among the top NITs in India, offering quality technical education, strong industry connections, and a vibrant campus life in Tamil Nadu.",
    color: "#5500AA",
  },
  {
    id: "du-delhi",
    name: "University of Delhi",
    location: "New Delhi",
    stream: "Arts & Science",
    fees: "₹25K/yr",
    ranking: 6,
    nirf: 11,
    image: "📚",
    established: 1922,
    students: "3,00,000+",
    faculty: "9,000+",
    courses: ["BA", "BSc", "BCom", "LLB", "MA", "PhD"],
    highlights: ["84 premier colleges", "Largest central univ", "Legacy since 1922"],
    cutoff: "CUET – Gen: 95%+ | OBC: 90%+ | SC: 82%+",
    placements: { avg: "₹6.5L", highest: "₹40L", companies: 600 },
    description:
      "University of Delhi is one of India's largest and most prestigious universities, encompassing 84 colleges across humanities, sciences, commerce, and law with a storied 100-year legacy.",
    color: "#0044AA",
  },
];

const TESTIMONIALS = [
  { name: "Ananya Sharma", college: "IIT Delhi – CSE", exam: "JEE Advanced", rank: 847, text: "CollegeCompass's Rank Predictor was spot-on! I knew exactly which branches to target and got my dream branch. The counselling team guided me through every step.", avatar: "A", score: "AIR 847" },
  { name: "Rohan Mehta", college: "IIM Bangalore – PGP", exam: "CAT", rank: 99.4, text: "The MBA counselling sessions were a game changer. The counsellors had inside knowledge about interview processes at top IIMs that I couldn't find anywhere else.", avatar: "R", score: "99.4%ile" },
  { name: "Priya Nair", college: "AIIMS New Delhi – MBBS", exam: "NEET", rank: 312, text: "As a student from Kerala, I had no idea how to navigate NEET counselling for all-India seats. CollegeCompass made the entire process crystal clear. Forever grateful!", avatar: "P", score: "AIR 312" },
  { name: "Karthik Subramaniam", college: "NIT Warangal – ECE", exam: "JEE Main", rank: 4200, text: "I was confused between 5 NITs. The College Comparison Tool helped me evaluate placements, campus life and fees side by side. Best decision I ever made.", avatar: "K", score: "AIR 4200" },
  { name: "Sneha Gupta", college: "BITS Pilani – CS", exam: "BITSAT", rank: 98, text: "The scholarship finder found ₹1.2L in scholarships I had no idea I was eligible for. The virtual tour of BITS convinced me this was my place!", avatar: "S", score: "BITSAT 371" },
  { name: "Aditya Kumar", college: "IIT Madras – Mech", exam: "JEE Advanced", rank: 1240, text: "Moved from Bihar to Chennai for IIT Madras. CollegeCompass's hostel and campus info prepared me perfectly. The placement data was accurate to the last decimal.", avatar: "A", score: "AIR 1240" },
];

const FAQS = {
  Admissions: [
    { q: "How does JEE Advanced counselling work?", a: "JEE Advanced counselling (JoSAA) is a 6-round process where you fill choices for IITs, NITs, IIITs and GFTIs based on your rank. Our counsellors guide you through the entire choice-filling strategy to maximize your chances at your preferred institute and branch." },
    { q: "Can I apply to multiple colleges simultaneously?", a: "Yes! During counselling rounds, you can fill up to 200 choices across multiple colleges and branches. Our Smart Match algorithm analyzes your rank, category, home state, and preferences to prioritize the best options for you." },
    { q: "What is the difference between NRI and general quota seats?", a: "NRI quota seats (typically 5–15% of seats) have different fee structures (often in USD) and may have separate cutoffs. General quota seats are open to all eligible Indian citizens and use the standard merit-based process." },
  ],
  Fees: [
    { q: "How can I compare fees across colleges?", a: "Our College Comparison Tool lets you compare total course fees, hostel fees, mess fees, and other charges side-by-side across up to 4 colleges simultaneously. You can also filter colleges by fee range in the Colleges listing page." },
    { q: "Are there EMI options for college fees?", a: "Many private colleges and deemed universities offer EMI options through tie-ups with banks like SBI, HDFC, and Axis. Our counsellors can connect you with the right financial options based on the college you choose." },
  ],
  Scholarships: [
    { q: "What scholarships are available for engineering students?", a: "There are 100+ scholarships available including Central Sector Scholarship (₹12,000–₹20,000/yr), AICTE scholarships, state government scholarships, college-specific merit scholarships, and corporate scholarships from companies like TCS and Infosys." },
    { q: "How does the Scholarship Finder work?", a: "Enter your category, family income, state, exam rank, and stream. Our algorithm matches you against a database of 800+ scholarships and shows you all the ones you're eligible for, along with application deadlines and processes." },
  ],
  Counselling: [
    { q: "Is the counselling service free?", a: "We offer a free basic counselling session (30 mins) for all registered users. Our premium counselling packages start at ₹999 and include unlimited sessions, personalized college lists, choice-filling assistance, and document verification support." },
    { q: "Who are your counsellors?", a: "Our counsellors are IIT/NIT/IIM alumni and experienced education professionals with 5–15 years of counselling experience. Each counsellor specializes in specific exams (JEE, NEET, CAT, CUET) and can guide you through the entire admission process." },
  ],
};

const TOOLS = [
  { id: "rank-predictor", icon: "📊", title: "Rank Predictor", desc: "Predict your rank based on mock test scores and historical data from 50L+ students.", color: "#6366f1" },
  { id: "scholarship-finder", icon: "🎓", title: "Scholarship Finder", desc: "Discover 800+ scholarships you're eligible for based on your profile.", color: "#0ea5e9" },
  { id: "college-comparison", icon: "⚖️", title: "College Comparison", desc: "Compare up to 4 colleges side-by-side on 30+ parameters.", color: "#10b981" },
  { id: "cutoff-tracker", icon: "📈", title: "Cut-off Tracker", desc: "Track historical cutoffs for 6,200+ colleges across JEE, NEET, CAT, CUET.", color: "#f59e0b" },
];

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

function Badge({ children, color = "#6366f1" }) {
  return <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{children}</span>;
}

function SectionHeading({ label, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)", padding: "5px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>{label}</div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>{title}</h2>
      {sub && <p style={{ color: "#9ca3af", fontSize: 17, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

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

// ── Pages ─────────────────────────────────────────────────────────────────────

// 1. HOME
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

// 2. FEATURES
function FeaturesPage({ setPage }) {
  const features = [
    { icon: "🧠", title: "Smart Match Algorithm", color: "#6366f1", desc: "Our AI analyzes your JEE/NEET/CAT rank, category, home state, preferred stream, budget, and career aspirations to recommend colleges with the highest probability of admission and success.", bullets: ["Analyzes 30+ data points", "Personalized college shortlist in 2 mins", "Updates daily with latest cutoffs"] },
    { icon: "📊", title: "Rank Predictor", color: "#0ea5e9", desc: "Our ML model trained on 50 lakh+ student data predicts your rank with 94% accuracy. Know where you stand before results day so you can plan confidently.", bullets: ["Supports JEE Main, JEE Advanced, NEET, CAT", "Percentile ↔ Rank conversion", "Branch-wise cutoff predictions"] },
    { icon: "🎓", title: "Scholarship Finder", color: "#10b981", desc: "Every year, ₹50+ Crore in scholarships go unclaimed because students don't know they exist. Our finder matches your profile to 800+ scholarships in under 60 seconds.", bullets: ["800+ scholarships database", "Filter by exam, category, state, income", "Application deadline reminders"] },
    { icon: "📈", title: "Placement Reports", color: "#f59e0b", desc: "Access 5 years of placement data for 1,200+ colleges including average packages, highest offers, recruiting companies, and branch-wise breakdowns — all in one dashboard.", bullets: ["Data from official college reports", "Trend analysis 2019–2024", "Company-wise hiring patterns"] },
    { icon: "🎯", title: "Expert Counselling", color: "#ec4899", desc: "One-on-one sessions with IIT/NIT/IIM alumni counsellors who have helped 1 lakh+ students. Get a personalized admission strategy tailored to your exact profile.", bullets: ["IIT/IIM alumni counsellors", "Unlimited sessions (premium)", "Document verification support"] },
    { icon: "🏫", title: "Virtual College Tours", color: "#8b5cf6", desc: "Can't visit every campus? Take 360° virtual tours of 500+ college campuses, hostels, labs, and facilities — right from your phone or laptop.", bullets: ["360° immersive tours", "Hostel & mess walkthroughs", "Interview with current students"] },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <SectionHeading label="Platform Features" title="Powerful Tools for Every Student" sub="From rank prediction to virtual tours — everything you need to make the right college choice." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28 }}>
        {features.map(f => (
          <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32, display: "flex", gap: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${f.color}18`, border: `1px solid ${f.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{f.icon}</div>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{f.desc}</p>
              {f.bullets.map(b => <div key={b} style={{ color: "#6b7280", fontSize: 13, marginBottom: 6 }}><span style={{ color: f.color }}>✓</span> {b}</div>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <button onClick={() => setPage("counselling")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", padding: "15px 36px", borderRadius: 12, cursor: "pointer", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 30px rgba(99,102,241,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Start Free Counselling →</button>
      </div>
    </div>
  );
}

// 3. COLLEGES LISTING
function CollegesPage({ setPage, setSelectedCollege }) {
  const [search, setSearch] = useState("");
  const [filterStream, setFilterStream] = useState("All");
  const [sortBy, setSortBy] = useState("ranking");

  const streams = ["All", "Engineering", "Medical", "Management", "Arts & Science"];
  const filtered = COLLEGES
    .filter(c => (filterStream === "All" || c.stream === filterStream) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => a[sortBy] - b[sortBy]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <SectionHeading label="College Directory" title="Explore 6,200+ Colleges" sub="Search, filter and compare colleges across streams, locations and rankings." />
      
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, marginBottom: 36, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search college or city..." style={{ flex: 1, minWidth: 200, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 16px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {streams.map(s => (
            <button key={s} onClick={() => setFilterStream(s)} style={{ background: filterStream === s ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${filterStream === s ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`, color: filterStream === s ? "#818cf8" : "#9ca3af", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>{s}</button>
          ))}
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", padding: "10px 14px", borderRadius: 10, fontSize: 13, cursor: "pointer" }}>
          <option value="ranking">Sort: Ranking</option>
          <option value="nirf">Sort: NIRF</option>
        </select>
      </div>

      <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>Showing {filtered.length} of 6,200+ colleges (demo: 6 shown)</div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {filtered.map(c => <CollegeCard key={c.id} college={c} setPage={setPage} setSelectedCollege={setSelectedCollege} />)}
      </div>

      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}>No colleges match your search. Try different filters.</div>}
    </div>
  );
}

// 4. COLLEGE DETAIL
function CollegeDetailPage({ college, setPage }) {
  if (!college) return <div style={{ textAlign: "center", padding: 80, color: "#9ca3af" }}>College not found. <button onClick={() => setPage("colleges")} style={{ color: "#818cf8", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Go back</button></div>;

  const tabs = ["Overview", "Courses", "Placements", "Cutoffs", "Campus"];
  const [tab, setTab] = useState("Overview");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
      <button onClick={() => setPage("colleges")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>← Back to Colleges</button>

      {/* Hero Card */}
      <div style={{ background: `linear-gradient(135deg, ${college.color}18, rgba(99,102,241,0.08))`, border: `1px solid ${college.color}33`, borderRadius: 24, padding: 36, marginBottom: 32, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.06 }}>{college.image}</div>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ fontSize: 60 }}>{college.image}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
              <Badge color={college.color}>#{college.ranking} in {college.stream}</Badge>
              <Badge color="#f59e0b">NIRF #{college.nirf}</Badge>
              <Badge color="#10b981">{college.fees}</Badge>
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontSize: 32, fontWeight: 900, margin: "0 0 8px" }}>{college.name}</h1>
            <p style={{ color: "#9ca3af", fontSize: 15, margin: "0 0 20px" }}>📍 {college.location} · Est. {college.established}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 480 }}>
              {[["👨‍🎓", college.students, "Students"], ["👨‍🏫", college.faculty, "Faculty"], ["🏛️", college.courses.length + " Programmes", "Courses"]].map(([icon, val, lbl]) => (
                <div key={lbl} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{icon} {val}</div>
                  <div style={{ color: "#6b7280", fontSize: 12 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setPage("counselling")} style={{ background: `linear-gradient(135deg,${college.color},#6366f1)`, border: "none", color: "#fff", padding: "14px 24px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>Apply Now →</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 32, background: "rgba(255,255,255,0.03)", padding: 6, borderRadius: 12, width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? "rgba(99,102,241,0.2)" : "transparent", border: tab === t ? "1px solid rgba(99,102,241,0.4)" : "1px solid transparent", color: tab === t ? "#818cf8" : "#6b7280", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13.5, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{t}</button>
        ))}
      </div>

      {tab === "Overview" && (
        <div>
          <p style={{ color: "#d1d5db", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{college.description}</p>
          <h3 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 16 }}>Key Highlights</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {college.highlights.map(h => <div key={h} style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "12px 16px", color: "#a5b4fc", fontSize: 14 }}>✅ {h}</div>)}
          </div>
        </div>
      )}

      {tab === "Courses" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {college.courses.map(c => <div key={c} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "16px", textAlign: "center", color: "#d1d5db", fontWeight: 600 }}>{c}</div>)}
        </div>
      )}

      {tab === "Placements" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[["💰", "Avg Package", college.placements.avg], ["🏆", "Highest Package", college.placements.highest], ["🏢", "Recruiting Companies", `${college.placements.companies}+`]].map(([icon, label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontSize: 24, fontWeight: 900 }}>{val}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "Cutoffs" && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 16 }}>2024 Cutoff Range</h3>
          <p style={{ color: "#d1d5db", fontSize: 15, lineHeight: 1.8 }}>{college.cutoff}</p>
          <div style={{ marginTop: 20, padding: 16, background: "rgba(99,102,241,0.08)", borderRadius: 10 }}>
            <div style={{ color: "#818cf8", fontWeight: 600, marginBottom: 4 }}>💡 Pro Tip</div>
            <div style={{ color: "#9ca3af", fontSize: 13 }}>Use our Rank Predictor to see if you're likely to make the cutoff for your preferred branch before results are out.</div>
          </div>
        </div>
      )}

      {tab === "Campus" && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏫</div>
          <h3 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800 }}>Virtual Tour Coming Soon</h3>
          <p style={{ color: "#9ca3af" }}>360° campus tours, hostel walkthroughs and student interviews are available for premium members.</p>
          <button onClick={() => setPage("counselling")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontWeight: 700, marginTop: 16, fontFamily: "'DM Sans', sans-serif" }}>Unlock Premium →</button>
        </div>
      )}
    </div>
  );
}

// 5. COUNSELLING
function CounsellingPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", exam: "", rank: "", category: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const steps = ["Submit Form", "Get Matched", "1:1 Session", "College List", "Apply!"];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
      <SectionHeading label="Expert Counselling" title="Get Personalised Guidance" sub="Connect with IIT/NIT/IIM alumni counsellors who've helped 1 lakh+ students crack admissions." />

      {/* Process Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 60, background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "24px 32px", border: "1px solid rgba(255,255,255,0.08)", overflowX: "auto" }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 120 }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", color: "#fff", fontWeight: 800, fontSize: 14 }}>{i + 1}</div>
              <div style={{ color: "#d1d5db", fontSize: 12, fontWeight: 600 }}>{s}</div>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 0.3, height: 2, background: "rgba(99,102,241,0.3)" }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40 }}>
        {/* Counsellor Profiles */}
        <div>
          <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, marginBottom: 20, fontSize: 20 }}>Meet Your Counsellors</h3>
          {[
            { name: "Arjun Kapoor", from: "IIT Delhi – CS '18", exp: "6 yrs", spec: "JEE / NITs", emoji: "👨‍💻", sessions: "2,400+" },
            { name: "Meera Iyer", from: "AIIMS Delhi – MD '19", exp: "5 yrs", spec: "NEET / Medical", emoji: "👩‍⚕️", sessions: "1,800+" },
            { name: "Rahul Jain", from: "IIM Ahmedabad – MBA '20", exp: "4 yrs", spec: "CAT / MBA", emoji: "👨‍💼", sessions: "1,200+" },
          ].map(c => (
            <div key={c.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 20, marginBottom: 16, display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ fontSize: 36 }}>{c.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700 }}>{c.name}</div>
                <div style={{ color: "#818cf8", fontSize: 12, marginBottom: 4 }}>{c.from}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Badge color="#10b981">{c.spec}</Badge>
                  <Badge color="#f59e0b">{c.sessions} sessions</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontSize: 22, fontWeight: 800 }}>Application Received!</h3>
              <p style={{ color: "#9ca3af" }}>Our team will match you with the right counsellor and reach out within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: 20, background: "transparent", border: "1px solid rgba(99,102,241,0.4)", color: "#818cf8", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Submit Another</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, marginBottom: 24, fontSize: 18 }}>Book Your Free Session</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["name", "Full Name", "text"], ["email", "Email Address", "email"], ["phone", "Mobile Number", "tel"], ["rank", "Expected Rank/Score", "text"]].map(([key, placeholder, type]) => (
                  <input key={key} type={type} placeholder={placeholder} value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                ))}
                {[["exam", ["JEE Advanced", "JEE Main", "NEET", "CAT", "CUET", "BITSAT"]], ["category", ["General", "OBC", "SC", "ST", "EWS"]], ["budget", ["Under ₹2L/yr", "₹2-5L/yr", "₹5-10L/yr", "Above ₹10L/yr"]]].map(([key, opts]) => (
                  <select key={key} value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: formData[key] ? "#fff" : "#6b7280", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                    <option value="">{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                    {opts.map(o => <option key={o} value={o} style={{ background: "#0a0c14" }}>{o}</option>)}
                  </select>
                ))}
              </div>
              <textarea placeholder="Anything specific you'd like help with?" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{ width: "100%", marginTop: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", resize: "vertical", minHeight: 80, boxSizing: "border-box", outline: "none" }} />
              <button onClick={() => setSubmitted(true)} style={{ width: "100%", marginTop: 20, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", padding: "15px", borderRadius: 12, cursor: "pointer", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 30px rgba(99,102,241,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                Book Free Session →
              </button>
              <p style={{ color: "#4b5563", fontSize: 12, textAlign: "center", marginTop: 12 }}>✓ 100% Free  ·  ✓ No spam  ·  ✓ Response within 24hr</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 6. TESTIMONIALS
function TestimonialsPage() {
  const [filter, setFilter] = useState("All");
  const exams = ["All", "JEE Advanced", "JEE Main", "NEET", "CAT", "BITSAT"];
  const filtered = filter === "All" ? TESTIMONIALS : TESTIMONIALS.filter(t => t.exam === filter);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <SectionHeading label="Success Stories" title="Students Who Made It" sub="Real stories from real students who used CollegeCompass to navigate their admissions successfully." />

      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
        {exams.map(e => (
          <button key={e} onClick={() => setFilter(e)} style={{ background: filter === e ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${filter === e ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`, color: filter === e ? "#818cf8" : "#9ca3af", padding: "8px 18px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>{e}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {filtered.map(t => (
          <div key={t.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18 }}>{t.avatar}</div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: "#818cf8", fontSize: 12 }}>{t.college}</div>
              </div>
              <Badge color="#f59e0b">{t.score}</Badge>
            </div>
            <p style={{ color: "#d1d5db", fontSize: 14.5, lineHeight: 1.8, margin: "0 0 16px" }}>"{t.text}"</p>
            <Badge color="#6366f1">{t.exam}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. FAQ
function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Admissions");
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
      <SectionHeading label="Help Center" title="Frequently Asked Questions" sub="Find quick answers to the most common questions about college admissions, fees, scholarships and counselling." />

      <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap", justifyContent: "center" }}>
        {Object.keys(FAQS).map(cat => (
          <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIdx(null); }} style={{ background: activeCategory === cat ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${activeCategory === cat ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`, color: activeCategory === cat ? "#818cf8" : "#9ca3af", padding: "9px 20px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>{cat}</button>
        ))}
      </div>

      <div>
        {FAQS[activeCategory].map((faq, i) => (
          <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, marginBottom: 12, overflow: "hidden", transition: "border-color 0.2s", borderColor: openIdx === i ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)" }}>
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "rgba(255,255,255,0.02)", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>{faq.q}</span>
              <span style={{ color: "#818cf8", fontSize: 20, transform: openIdx === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.25s" }}>+</span>
            </button>
            {openIdx === i && <div style={{ padding: "0 24px 20px", color: "#9ca3af", fontSize: 14.5, lineHeight: 1.8 }}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// 8. TOOLS
function ToolsPage({ setPage }) {
  const [activeTool, setActiveTool] = useState(null);
  const [rankForm, setRankForm] = useState({ exam: "", score: "" });
  const [rankResult, setRankResult] = useState(null);
  const [scholarForm, setScholarForm] = useState({ category: "", income: "", state: "" });
  const [compareSelections, setCompareSelections] = useState([]);

  const predictRank = () => {
    if (!rankForm.score) return;
    const score = parseInt(rankForm.score);
    let rank = Math.max(1, Math.round((100 - score) * 1000 + Math.random() * 500));
    setRankResult(rank);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
      <SectionHeading label="Free Tools" title="Your Admission Toolkit" sub="Powerful, data-driven tools to give you clarity and confidence during the admission process." />

      {!activeTool ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          {TOOLS.map(tool => (
            <div key={tool.id} onClick={() => setActiveTool(tool.id)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32, cursor: "pointer", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${tool.color}66`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 44, marginBottom: 20 }}>{tool.icon}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{tool.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: 14.5, lineHeight: 1.7, marginBottom: 20 }}>{tool.desc}</p>
              <span style={{ color: tool.color, fontWeight: 600, fontSize: 14 }}>Launch Tool →</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => { setActiveTool(null); setRankResult(null); }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>← Back to Tools</button>

          {activeTool === "rank-predictor" && (
            <div style={{ maxWidth: 520, margin: "0 auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 24 }}>📊 Rank Predictor</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: "#9ca3af", fontSize: 13, display: "block", marginBottom: 8 }}>Select Exam</label>
                <select value={rankForm.exam} onChange={e => setRankForm({ ...rankForm, exam: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14 }}>
                  <option value="">Select exam...</option>
                  {["JEE Main", "JEE Advanced", "NEET", "CAT", "BITSAT"].map(e => <option key={e} value={e} style={{ background: "#0a0c14" }}>{e}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ color: "#9ca3af", fontSize: 13, display: "block", marginBottom: 8 }}>Your Score / Percentile</label>
                <input type="number" value={rankForm.score} onChange={e => setRankForm({ ...rankForm, score: e.target.value })} placeholder="e.g. 87.4" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, boxSizing: "border-box" }} />
              </div>
              <button onClick={predictRank} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", padding: "14px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>Predict My Rank</button>
              {rankResult && (
                <div style={{ marginTop: 24, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 14, padding: 24, textAlign: "center" }}>
                  <div style={{ color: "#818cf8", fontSize: 13, marginBottom: 8 }}>Estimated Rank</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 900, color: "#fff" }}>AIR {rankResult.toLocaleString()}</div>
                  <div style={{ color: "#6b7280", fontSize: 13, marginTop: 8 }}>Based on 50L+ historical data points · 94% accuracy</div>
                </div>
              )}
            </div>
          )}

          {activeTool === "scholarship-finder" && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 24 }}>🎓 Scholarship Finder</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[["category", "Category", ["General", "OBC", "SC", "ST", "EWS"]], ["income", "Family Income", ["Under ₹1.5L", "₹1.5-5L", "₹5-10L", "Above ₹10L"]], ["state", "State", ["Delhi", "Maharashtra", "Tamil Nadu", "UP", "Rajasthan", "Other"]]].map(([key, label, opts]) => (
                  <div key={key}>
                    <label style={{ color: "#9ca3af", fontSize: 13, display: "block", marginBottom: 8 }}>{label}</label>
                    <select value={scholarForm[key]} onChange={e => setScholarForm({ ...scholarForm, [key]: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 13 }}>
                      <option value="">Select...</option>
                      {opts.map(o => <option key={o} value={o} style={{ background: "#0a0c14" }}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", border: "none", color: "#fff", padding: "13px 32px", borderRadius: 12, cursor: "pointer", fontWeight: 700, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>Find Scholarships →</button>
              <div style={{ display: "grid", gap: 12 }}>
                {[["Central Sector Scholarship", "₹20,000/yr", "MHRD", "Merit + Income based"], ["NSP Post-Matric Scholarship", "₹15,000/yr", "Central Govt", "SC/ST/OBC categories"], ["Prime Minister Scholarship", "₹25,000/yr", "PMO India", "Defence personnel wards"], ["Sitaram Jindal Foundation", "₹40,000/yr", "Private", "Merit + Financial need"]].map(([name, amt, by, crit]) => (
                  <div key={name} style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 12, padding: 20, display: "flex", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{name}</div>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>By {by} · {crit}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#10b981", fontWeight: 800, fontFamily: "'Syne', sans-serif", fontSize: 16 }}>{amt}</div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>per year</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTool === "college-comparison" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 24 }}>⚖️ College Comparison</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
                {COLLEGES.slice(0, 3).map(c => (
                  <div key={c.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", background: `${c.color}18`, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: 24 }}>{c.image}</div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginTop: 4 }}>{c.name}</div>
                    </div>
                    {[["Stream", c.stream], ["Fees", c.fees], ["Students", c.students], ["Avg Pkg", c.placements.avg], ["NIRF", `#${c.nirf}`]].map(([l, v]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span style={{ color: "#6b7280", fontSize: 13 }}>{l}</span>
                        <span style={{ color: "#d1d5db", fontSize: 13, fontWeight: 600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTool === "cutoff-tracker" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 24 }}>📈 Cut-off Tracker</h2>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["College", "Stream", "2024 Open", "2023 Open", "2022 Open"].map(h => <th key={h} style={{ color: "#818cf8", fontFamily: "'Syne', sans-serif", fontSize: 13, textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {COLLEGES.map(c => (
                        <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "14px 16px", color: "#fff", fontWeight: 600, fontSize: 14 }}>{c.name}</td>
                          <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 13 }}>{c.stream}</td>
                          {[c.ranking * 60, c.ranking * 65, c.ranking * 70].map((v, i) => <td key={i} style={{ padding: "14px 16px", color: "#10b981", fontSize: 13, fontWeight: 600 }}>{v.toLocaleString()}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCollege, setSelectedCollege] = useState(null);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setSelectedCollege={setSelectedCollege} />;
      case "features": return <FeaturesPage setPage={setPage} />;
      case "colleges": return <CollegesPage setPage={setPage} setSelectedCollege={setSelectedCollege} />;
      case "college-detail": return <CollegeDetailPage college={selectedCollege} setPage={setPage} />;
      case "counselling": return <CounsellingPage />;
      case "testimonials": return <TestimonialsPage />;
      case "faq": return <FAQPage />;
      case "tools": return <ToolsPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} setSelectedCollege={setSelectedCollege} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0c14; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        select option { background: #0a0c14; color: #fff; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0a0c14; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
        input::placeholder { color: #4b5563; }
        textarea::placeholder { color: #4b5563; }
        select { cursor: pointer; }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#0a0c14", color: "#fff" }}>
        <Navbar page={page} setPage={setPage} />
        <main>{renderPage()}</main>
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
