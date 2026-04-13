import { useEffect, useRef } from "react";
import Container from "../components/common/Container";

const stats = [
  {
    id: "families",
    end: 500,
    display: "500+",
    label: "Families Supported",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <circle cx="12" cy="13" r="5" stroke="#60c0ff" strokeWidth="1.5" />
        <circle cx="24" cy="13" r="5" stroke="#60c0ff" strokeWidth="1.5" />
        <path d="M2 30c0-5.5 4.5-9 10-9" stroke="#60c0ff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 30c0-5.5-4.5-9-10-9" stroke="#60c0ff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 21c3-1.5 9-1.5 12 0" stroke="#90d8ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "response",
    end: null,
    display: "24–48h",
    label: "Response Time",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <circle cx="18" cy="18" r="13" stroke="#60c0ff" strokeWidth="1.5" />
        <path d="M18 10v8l5 3" stroke="#90d8ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "improvement",
    end: 98,
    display: "98%",
    label: "Improvement Rate",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <path d="M4 28 L10 18 L16 22 L22 12 L28 16 L34 6" stroke="#60c0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="6" r="2.5" fill="#90d8ff" />
      </svg>
    ),
  },
  {
    id: "years",
    end: 10,
    display: "10+",
    label: "Years Experience",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <path d="M18 4 L22 14 L33 14 L24 21 L27 32 L18 25 L9 32 L12 21 L3 14 L14 14 Z" stroke="#60c0ff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function useCountUp(ref, end, suffix = "", delay = 900, duration = 1600) {
  useEffect(() => {
    if (end === null) return;
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const t0 = performance.now();
      function tick(now) {
        const p = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * end) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [ref, end, suffix, delay, duration]);
}

function StatBlock({ stat, index }) {
  const valRef = useRef(null);
  const barRef = useRef(null);
  const suffix = stat.display.includes("%") ? "%" : stat.display.includes("+") ? "+" : "";

  useCountUp(valRef, stat.end, suffix, 900 + index * 200);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const timer = setTimeout(() => {
      bar.style.width = "100%";
    }, 900 + index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const isLast = index === stats.length - 1;

  return (
    <div
      className="relative flex-1 min-w-[160px] max-w-[320px] px-6 py-10 text-center"
      style={{
        animation: `fadeUp 0.7s ease forwards`,
        animationDelay: `${0.4 + index * 0.15}s`,
        opacity: 0,
      }}
    >
      {!isLast && (
        <span className="absolute right-0 top-[20%] h-[60%] w-px bg-white/10" />
      )}

      <div className="w-9 h-9 mx-auto mb-4">{stat.icon}</div>

      <div
        ref={valRef}
        className="text-white font-bold tracking-wide leading-none mb-2.5"
        style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(36px, 5vw, 52px)" }}
      >
        {stat.display}
      </div>

      <p className="text-[11px] tracking-[2.5px] text-white/50 uppercase">
        {stat.label}
      </p>

      <div className="h-0.5 bg-white/10 w-10 mx-auto mt-4 overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-[#60c0ff] transition-all duration-[1200ms] ease-out"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="bg-[#0D2550] py-20 text-center">
        <Container>
          <h2
            className="text-white font-bold uppercase tracking-[5px] mb-2"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              animation: "fadeUp 0.8s ease forwards 0.1s",
              opacity: 0,
            }}
          >
            Quality Care. Real Results.
          </h2>

          <p
            className="text-[11px] tracking-[3px] text-white/40 uppercase mb-14"
            style={{ animation: "fadeUp 0.8s ease forwards 0.25s", opacity: 0 }}
          >
            Trusted by families across the region
          </p>

          <div className="flex justify-center items-stretch flex-wrap">
            {stats.map((stat, i) => (
              <StatBlock key={stat.id} stat={stat} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}