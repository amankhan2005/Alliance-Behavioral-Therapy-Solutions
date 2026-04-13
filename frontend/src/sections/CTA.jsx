import { useNavigate } from "react-router-dom";
import Container from "../components/common/Container";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0D2550] via-[#123068] to-[#185FA5] py-[88px] text-center">

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]"
        style={{ background: "radial-gradient(ellipse, rgba(0,180,240,0.12) 0%, transparent 70%)" }}
      />

      <Container>
        <div
          className="relative max-w-2xl mx-auto"
          style={{ animation: "fadeUp 0.6s ease 0.1s both" }}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 mb-[22px] px-4 py-[5px] rounded-full border border-[#00B4F0]/35 bg-[#00B4F0]/[0.08]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#00B4F0]" style={{ animation: "pulse 2s ease infinite" }} />
            <span
              className="text-[#00B4F0] text-[12px] uppercase tracking-[2px] font-bold"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Expert Care, Real Results
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-extrabold uppercase tracking-[3px] text-white leading-[1.2]"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(26px, 3.5vw, 40px)" }}
          >
            Give Your Child the{" "}
            <span className="text-[#00B4F0]">Support</span>
            <br />They Deserve
          </h2>

          {/* Accent divider */}
          <div
            className="w-[52px] h-[3px] rounded-full mx-auto mt-4"
            style={{ background: "linear-gradient(90deg, #00B4F0, transparent)" }}
          />

          {/* Subtext */}
          <p className="mt-5 text-white/70 text-[15px] leading-[1.75] max-w-[480px] mx-auto">
            Begin your journey with expert, evidence-based therapy designed to support
            meaningful and lasting progress for every child and family.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex justify-center flex-wrap gap-[14px]">
            <button
              onClick={() => navigate("/contact-us")}
              className="transition-all duration-250 hover:scale-[1.03]"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontSize: "15px",
                padding: "14px 36px",
                borderRadius: "10px",
                background: "#00B4F0",
                color: "#0D2550",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#20c3ff"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,180,240,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#00B4F0"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Book Appointment
            </button>

            
          </div>

          {/* Trust signals */}
          <div className="mt-7 flex justify-center items-center flex-wrap gap-5">
            {[
              { label: "Certified Therapists", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
              { label: "Response Within 24 Hours", icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> },
              { label: "Family-Centered Approach", icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
            ].map((t, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center gap-[6px] text-white/55 text-[12.5px]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B4F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {t.icon}
                  </svg>
                  {t.label}
                </div>
                {i < arr.length - 1 && <div className="w-px h-[14px] bg-white/20" />}
              </div>
            ))}
          </div>

        </div>
      </Container>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}