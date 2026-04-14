import { useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  {
    id: "team",
    title: "Compassionate Team",
    desc: "Guided by empathy and respect",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48" aria-hidden="true">
        <circle cx="24" cy="17" r="7" stroke="#60c0ff" strokeWidth="1.6" />
        <path d="M10 40c0-7 6-12 14-12s14 5 14 12" stroke="#60c0ff" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M30 22c4 1 8 5 8 10" stroke="#90d8ff" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="36" cy="18" r="4.5" stroke="#90d8ff" strokeWidth="1.4" />
        <path d="M29 10c1.5-1 3.5-1 5 0" stroke="#90d8ff" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "admissions",
    title: "Efficient Admissions",
    desc: "A streamlined process for quick support",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48" aria-hidden="true">
        <circle cx="24" cy="24" r="17" stroke="#60c0ff" strokeWidth="1.6" />
        <path d="M24 13v11l7 4" stroke="#90d8ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 36l4-4" stroke="#60c0ff" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="13" cy="37" r="2" fill="#90d8ff" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "plans",
    title: "Individual Plans",
    desc: "Care paths crafted for personal success",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48" aria-hidden="true">
        <rect x="10" y="8" width="28" height="34" rx="4" stroke="#60c0ff" strokeWidth="1.6" />
        <path d="M16 18h16M16 24h12M16 30h8" stroke="#90d8ff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="34" r="6" fill="#0D2550" stroke="#60c0ff" strokeWidth="1.4" />
        <path d="M31 34l2 2 4-4" stroke="#90d8ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "vision",
    title: "Growing Vision",
    desc: "Committed to long-term impact and innovation",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48" aria-hidden="true">
        <path d="M8 36 L16 26 L22 30 L30 18 L38 10" stroke="#60c0ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="38" cy="10" r="3" fill="#90d8ff" />
        <path d="M30 36h10M35 31v10" stroke="#90d8ff" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="35" cy="36" r="4.5" stroke="#60c0ff" strokeWidth="1.3" opacity="0.5" />
      </svg>
    ),
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCol({ stat, index, isLast }) {
  const lineRef = useRef(null);

  // Animate the underline via IntersectionObserver
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = "scaleX(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative flex-1 min-w-[220px] px-7 py-8 text-center group transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        opacity: 0,
        animation: `statsUp 0.7s ease forwards`,
        animationDelay: `${0.45 + index * 0.17}s`,
      }}
    >
      {/* Vertical divider */}
      {!isLast && (
        <span
          className="absolute right-0 top-[15%] h-[70%] w-px bg-white/10"
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 mx-auto mb-5 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(96,192,255,0.6)]"
        style={{ transform: "translateY(0)", transition: "filter .3s ease, transform .3s ease" }}
      >
        {stat.icon}
      </div>

      {/* Title */}
      <h3
        className="text-white font-bold uppercase tracking-[3px] mb-3"
        style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)" }}
      >
        {stat.title}
      </h3>

      {/* Description */}
      <p
        className="text-[11px] tracking-[2px] text-white/40 uppercase leading-relaxed"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {stat.desc}
      </p>

      {/* Animated underline accent */}
      <div className="h-0.5 bg-white/10 w-9 mx-auto mt-5 overflow-hidden">
        <div
          ref={lineRef}
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #60c0ff, #90d8ff)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
            transition: "transform 1s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Stats() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');

        @keyframes statsUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .stat-col-hover:hover {
          transform: translateY(-6px);
        }
      `}</style>

      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(160deg, #0D2550 0%, #091a3d 100%)" }}
        aria-labelledby="stats-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <h2
            id="stats-heading"
            className="text-white font-bold uppercase"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              letterSpacing: "6px",
              opacity: 0,
              animation: "statsUp .8s ease forwards .1s",
            }}
          >
            Quality Care. Real Results.
          </h2>

          {/* Subheading */}
          <p
            className="mt-3 text-white/35 uppercase"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              letterSpacing: "3px",
              opacity: 0,
              animation: "statsUp .8s ease forwards .25s",
            }}
          >
            Building a foundation of care, one family at a time.
          </p>

          {/* Divider accent */}
          <div
            className="mx-auto mt-5 mb-16 h-0.5 w-10 rounded-full"
            style={{
              background: "linear-gradient(90deg, #60c0ff, #90d8ff)",
              opacity: 0,
              animation: "statsUp .8s ease forwards .35s",
            }}
          />

          {/* Stat columns */}
          <div className="flex flex-wrap justify-between items-stretch gap-y-10 gap-x-6 md:gap-x-0">
            {stats.map((stat, i) => (
              <StatCol
                key={stat.id}
                stat={stat}
                index={i}
                isLast={i === stats.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}