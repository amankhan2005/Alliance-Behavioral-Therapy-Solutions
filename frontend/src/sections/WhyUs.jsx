import Container from "../components/common/Container";

const points = [
  {
    title: "Certified & Experienced Therapists",
    desc: "Our team consists of highly trained and certified professionals delivering evidence-based behavioral therapy.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0D2550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: "Personalized Treatment Plans",
    desc: "Every individual receives a customized therapy plan tailored to their unique needs and long-term goals.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0D2550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M20 21a8 8 0 10-16 0"/>
        <circle cx="18" cy="18" r="3"/>
        <line x1="18" y1="15" x2="18" y2="13"/>
        <line x1="18" y1="21" x2="18" y2="23"/>
        <line x1="21" y1="18" x2="23" y2="18"/>
        <line x1="15" y1="18" x2="13" y2="18"/>
      </svg>
    ),
  },
  {
    title: "Proven, Measurable Results",
    desc: "We use structured, data-driven approaches to ensure meaningful progress and sustained long-term improvement.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0D2550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    title: "Family-Centered Approach",
    desc: "We actively involve families, providing tools and guidance for continued success beyond therapy sessions.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0D2550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="bg-[#0D2550] py-20">
      <Container>

        {/* Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2
            className="font-extrabold uppercase tracking-[3px] text-white mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(26px, 3.5vw, 38px)" }}
          >
            Why <span className="text-[#00B4F0]">Choose Us</span>
          </h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            We provide compassionate, evidence-based care designed to help individuals
            and families achieve lasting progress and real results.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {points.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-[18px] p-6 text-center border border-[#0D2550]/[0.08] shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
              style={{
                animation: `fadeUp 0.5s ease ${0.05 + i * 0.1}s both`,
              }}
            >
              {/* Icon */}
              <div className="w-[52px] h-[52px] mx-auto mb-[18px] flex items-center justify-center rounded-xl bg-[#E0EEF8]">
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="font-semibold text-[#0D2550] text-[16px] mb-[10px] leading-snug"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#0D2550]/70 text-[13.5px] leading-[1.7]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </Container>

      {/* Fade-up keyframe */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}