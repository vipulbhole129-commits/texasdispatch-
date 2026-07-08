const ITEMS = ["24/7 AI DISPATCH", "NO SPAM CHARGES — EVER", "WEEK-TO-WEEK ENROLLMENT"];

export default function TrustStrip() {
  return (
    <div
      className="w-full py-4 px-4"
      style={{
        background: "#0d0f1a",
        borderTop: "1px solid rgba(255,107,53,0.25)",
        borderBottom: "2px solid #ff6b35",
        boxShadow: "0 0 24px rgba(255,107,53,0.08)",
      }}
      data-testid="trust-strip"
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        {ITEMS.map((item, i) => (
          <span key={item} className="flex items-center gap-x-3">
            <span
              className="font-sans font-bold text-xs sm:text-sm tracking-wide uppercase"
              style={{ color: "#ff6b35" }}
            >
              {item}
            </span>
            {i < ITEMS.length - 1 && (
              <span className="text-xs sm:text-sm" style={{ color: "#ff6b35", opacity: 0.5 }}>
                •
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
