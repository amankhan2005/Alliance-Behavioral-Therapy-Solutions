import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import autismImg from "../assets/services/autism-therapy.jpeg";
import behavioralImg from "../assets/services/behavioral-therapy.jpg";
import parentImg from "../assets/services/parent-training.webp";
import socialImg from "../assets/services/social-skills.jpg";

/* ─── Data ────────────────────────────────────────────────────── */
const services = [
  {
    title: "Autism Therapy",
    desc: "Personalized, evidence-based programs designed around each child's unique strengths and developmental pace.",
    image: autismImg,
    tag: "Individual",
  },
  {
    title: "Behavioral Therapy",
    desc: "Structured strategies rooted in ABA science to encourage lasting positive behavioral outcomes.",
    image: behavioralImg,
    tag: "Evidence-Based",
  },
  {
    title: "Parent Training",
    desc: "Equipping caregivers with practical tools to extend therapeutic progress into everyday home life.",
    image: parentImg,
    tag: "Family",
  },
  {
    title: "Social Skills",
    desc: "Building confidence, communication, and peer relationships through structured group sessions.",
    image: socialImg,
    tag: "Group",
  },
];

/* ─── Icons ───────────────────────────────────────────────────── */
const icons = {
  "Autism Therapy": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  ),
  "Behavioral Therapy": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,17 7,11 11,13 15,7 19,9 23,3" />
      <circle cx="23" cy="3" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  "Parent Training": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="9" cy="8" r="3.5" />
      <circle cx="16" cy="8" r="3.5" />
      <path d="M2 21c0-4 3-7 7-7" />
      <path d="M22 21c0-4-3-7-7-7" />
      <path d="M9 14c2-1 5-1 7 0" />
    </svg>
  ),
  "Social Skills": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 18c0-5 3.5-8 7-8s7 3 7 8" />
      <circle cx="12" cy="7" r="4" />
      <path d="M8 21l4-5 4 5" />
    </svg>
  ),
};

/* ─── Card ────────────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 120 + index * 110);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="service-card group flex flex-col rounded-[20px] overflow-hidden cursor-pointer"
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        boxShadow: "0 12px 36px rgba(13,37,80,0.18)",
        background: "linear-gradient(145deg, #0D2550 0%, #123068 60%, #185FA5 100%)",
      }}
      onClick={() => navigate("/services")}
    >
      {/* Image — clean, no overlay, no filters */}
      <div className="relative overflow-hidden rounded-t-[20px]" style={{ height: "200px", flexShrink: 0 }}>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover rounded-t-[20px] transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Tag pill — bright readable on any image */}
        <span
          className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[1.5px] px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.9)",
            color: "#0D2550",
          }}
        >
          {service.tag}
        </span>

        {/* Icon circle — bright readable on any image */}
        <div
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.9)",
            color: "#0D2550",
          }}
        >
          {icons[service.title]}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-5 pt-5 pb-6 gap-3 flex-1">
        <h3
          className="text-white font-bold uppercase tracking-[1.5px]"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "17px",
            lineHeight: "1.2",
          }}
        >
          {service.title}
        </h3>
        <div
          className="w-8 h-px"
          style={{ background: "rgba(0,180,240,0.5)" }}
        />
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.65" }}
        >
          {service.desc}
        </p>

        {/* CTA */}
        <button
          className="know-more-btn mt-1 px-6 py-2 rounded-lg text-sm font-semibold tracking-wide"
          style={{
            border: "1.5px solid rgba(255,255,255,0.45)",
            background: "transparent",
            color: "#ffffff",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "13px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate("/services");
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.color = "#0D2550";
            e.currentTarget.style.borderColor = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
          }}
        >
          Know More
        </button>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
export default function ServicesSection() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap');
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 22px 48px rgba(13,37,80,0.26) !important;
        }
      `}</style>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div
            ref={headingRef}
            className="text-center mb-14"
            style={{
              opacity: 0,
              transform: "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p
              className="uppercase mb-3"
              style={{
                fontSize: "11px",
                letterSpacing: "4px",
                color: "rgba(13,37,80,0.45)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
              }}
            >
              What We Offer
            </p>
            <h2
              className="font-bold uppercase"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 38px)",
                letterSpacing: "3px",
                lineHeight: 1.1,
                color: "#0D2550",
              }}
            >
              Our{" "}
              <span style={{ color: "#00B4F0" }}>Services</span>
            </h2>
            <div
              className="mx-auto mt-4 rounded-full"
              style={{ width: "40px", height: "3px", background: "#00B4F0" }}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}