function Badge({ children, color = "#6366f1" }) {
  return <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{children}</span>;
}
