const ITEMS = ["24/7 AI DISPATCH", "NO SPAM CHARGES — EVER", "WEEK-TO-WEEK ENROLLMENT"];

function StripContent() {
  return (
    <span className="flex items-center gap-x-3 shrink-0 pr-3">
      {ITEMS.map((item, i) => (
        <span key={item} className="flex items-center gap-x-3">
          <span
            className="font-sans font-bold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap"
            style={{ color: "#f8f9fa", textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
          >
            {item}
          </span>
          <span
            className="text-xs sm:text-sm"
            style={{ color: "#f8f9fa", opacity: 0.6, textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
          >
            •
          </span>
        </span>
      ))}
    </span>
  );
}

export default function TrustStrip() {
  return (
    <div className="w-full px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-10">
      <div
        className="marquee-viewport max-w-6xl mx-auto rounded-lg overflow-hidden py-4 sm:py-5"
        style={{
          background: "linear-gradient(90deg, #ff8c00, #ff4500)",
          boxShadow: "0 8px 30px rgba(255,69,0,0.25), 0 2px 0 rgba(255,255,255,0.08) inset",
        }}
        data-testid="trust-strip"
      >
        <div className="flex overflow-hidden">
          <div className="marquee-track flex items-center shrink-0">
            <StripContent />
            <StripContent />
          </div>
          <div className="marquee-track flex items-center shrink-0" aria-hidden="true">
            <StripContent />
            <StripContent />
          </div>
        </div>
      </div>
    </div>
  );
}
