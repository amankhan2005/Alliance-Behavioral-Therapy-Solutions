import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────── */

const faqs = [
  {
    q: "What types of therapy services do you provide?",
    a: "We provide autism therapy, behavioral therapy, parent training, and social skills development programs tailored to each child's unique needs and developmental goals.",
  },
  {
    q: "How do I schedule a therapy session?",
    a: "You can easily schedule a session by visiting our contact page. Our team will guide you through the next steps and match you with the right therapist for your child.",
  },
  {
    q: "Do you offer in-home or virtual therapy sessions?",
    a: "Yes, we offer flexible therapy options including in-home sessions and virtual telehealth services to ensure accessibility and convenience for every family.",
  },
  {
    q: "How are therapy plans customized?",
    a: "Each therapy plan is carefully designed based on assessments, individual goals, and ongoing progress tracking to ensure meaningful, measurable results for every child.",
  },
  {
    q: "How long does therapy typically take?",
    a: "The duration of therapy varies depending on individual goals and progress. Our team continuously evaluates outcomes to ensure effective and timely support throughout the process.",
  },
  {
    q: "How can parents be involved in the therapy process?",
    a: "We actively involve parents through training and regular guidance, helping them support their child's development and reinforce progress beyond therapy sessions.",
  },
];

/* ─── FAQ CARD ───────────────────────────────────────────────── */

function FAQCard({ item, index, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="bg-white rounded-[20px] overflow-hidden
                 transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: isOpen
          ? "0 16px 48px rgba(13,37,80,0.14)"
          : "0 4px 20px rgba(13,37,80,0.07)",
        animation: `fadeUp 0.45s ease ${0.05 + index * 0.07}s both`,
      }}
    >
      {/* ── TRIGGER ── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full flex justify-between items-center px-7 py-5
                   text-left gap-4 bg-transparent border-0 cursor-pointer
                   focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-[#00B4F0] rounded-[20px]"
      >
        {/* question number + text */}
        <div className="flex items-center gap-4">
          <span
            className="font-['Rajdhani',sans-serif] font-bold text-[13px]
                       text-[#0D2550]/25 leading-none flex-shrink-0 w-7 text-center"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-['Rajdhani',sans-serif] font-bold uppercase
                       tracking-[1px] text-[15px] text-[#0D2550] leading-snug"
          >
            {item.q}
          </span>
        </div>

        {/* chevron icon */}
        <span
          className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0
                     transition-all duration-300"
          style={{
            border: `1.5px solid ${isOpen ? "#00B4F0" : "rgba(13,37,80,0.15)"}`,
            background: isOpen ? "rgba(0,180,240,0.08)" : "transparent",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke={isOpen ? "#00B4F0" : "#0D2550"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <polyline points="2 4 6 8 10 4" />
          </svg>
        </span>
      </button>

      {/* ── ANSWER PANEL ── */}
      <div
        id={`faq-answer-${index}`}
        role="region"
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.3s ease",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={answerRef} className="px-7 pb-6 pt-1">
          {/* accent rule */}
          <div className="w-8 h-[2px] bg-[#00B4F0] rounded-full mb-3 ml-11" />
          <p className="text-[#0D2550]/70 text-[15px] leading-[1.6] ml-11">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* ══════════════════════════════════════════
          SECTION 1 — HERO  ·  DARK (#0D2550)
          Stat cards → WHITE
      ══════════════════════════════════════════ */}
      <section className="bg-[#0D2550] py-20 relative overflow-hidden">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0
                     bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,180,240,0.10),transparent)]"
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">

          {/* eyebrow */}
          <span
            className="inline-block font-['Rajdhani',sans-serif] font-bold uppercase
                       tracking-[3px] text-[11px] text-[#00B4F0]
                       border border-[#00B4F0]/40 rounded-full px-5 py-1.5 mb-6"
          >
            Got Questions
          </span>

          {/* H1 */}
          <h1
            className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-[2px]
                       text-[clamp(32px,4.5vw,56px)] leading-[1.1] text-white
                       max-w-2xl mx-auto mb-5"
          >
            Frequently Asked{" "}
            <span className="text-[#00B4F0]">Questions</span>
          </h1>

          {/* subtitle */}
          <p className="text-white/70 text-[15px] leading-[1.6] max-w-lg mx-auto mb-14">
            Find answers to common questions about our therapy services, process,
            and care approach. Still have questions? We are here to help.
          </p>

          {/* DARK bg → WHITE quick-stat cards */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { num: "4+",      label: "Services Offered" },
              { num: "500+",    label: "Families Helped" },
              { num: "Insured", label: "Coverage Available" },
              { num: "Flexible",label: "Session Options" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-[16px] px-6 py-6 text-center
                           hover:-translate-y-1
                           hover:shadow-[0_12px_32px_rgba(0,0,0,0.20)]
                           transition-all duration-300"
              >
                <p
                  className="font-['Rajdhani',sans-serif] font-bold
                             text-[clamp(22px,2.5vw,30px)] text-[#0D2550]
                             leading-none mb-1"
                >
                  {s.num}
                </p>
                <p
                  className="font-['Rajdhani',sans-serif] font-bold uppercase
                             tracking-[1.5px] text-[11px] text-[#0D2550]/60"
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — FAQ ACCORDION  ·  WHITE (#FFFFFF)
          FAQ cards → WHITE with shadow (on white bg,
          differentiated by elevation + subtle border)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

            {/* ── LEFT: sticky context panel ── */}
            <div className="lg:sticky lg:top-24">

              <span
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[3px] text-[11px] text-[#00B4F0] block mb-3"
              >
                Help Center
              </span>

              <h2
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[1px] text-[clamp(28px,3vw,38px)]
                           leading-[1.15] text-[#0D2550] mb-5"
              >
                Everything You Need to Know
              </h2>

              <p className="text-[#0D2550]/70 text-[15px] leading-[1.6] mb-8">
                Browse our most commonly asked questions below. If you cannot find
                what you are looking for, our team is always ready to help.
              </p>

              {/* icon highlight list */}
              <div className="flex flex-col gap-3 mb-10">
                {[
                  "Services & therapy types",
                  "Scheduling & session options",
                  "Insurance & coverage",
                  "Family involvement & training",
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      size={16}
                      strokeWidth={2}
                      className="text-[#00B4F0] flex-shrink-0"
                    />
                    <span className="text-[#0D2550]/70 text-[14px] leading-[1.6]">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>

              {/* contact nudge — WHITE section → PRIMARY card */}
              <div className="bg-[#0D2550] rounded-[20px] p-7">
                <div
                  className="w-11 h-11 rounded-[10px] bg-white/10 flex items-center
                              justify-center mb-4"
                >
                  <HelpCircle size={22} strokeWidth={2} className="text-[#00B4F0]" />
                </div>
                <h3
                  className="font-['Rajdhani',sans-serif] font-bold uppercase
                             tracking-[1px] text-[16px] text-white mb-2"
                >
                  Still Have Questions?
                </h3>
                <p className="text-white/70 text-[14px] leading-[1.6] mb-5">
                  Our care team is available to answer anything not covered here.
                </p>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2
                             font-['Rajdhani',sans-serif] font-bold uppercase
                             tracking-[1.5px] text-[12px]
                             text-[#0D2550] bg-white px-6 py-3 rounded-lg
                             hover:bg-[#E8F5FF] hover:scale-[1.02]
                             hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)]
                             transition-all duration-300"
                >
                  Contact Us <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* ── RIGHT: accordion list ── */}
            <div className="flex flex-col gap-4">
              {faqs.map((item, i) => (
                <FAQCard
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — CTA  ·  DARK (#0D2550)
          CTA inner card → WHITE
      ══════════════════════════════════════════ */}
      <section className="bg-[#0D2550] py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0
                     bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(0,180,240,0.10),transparent)]"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* DARK bg → WHITE card */}
          <div
            className="bg-white rounded-[24px] px-10 py-16 md:px-16
                        text-center max-w-4xl mx-auto
                        shadow-[0_24px_64px_rgba(0,0,0,0.16)]"
          >
            {/* eyebrow */}
            <span
              className="font-['Rajdhani',sans-serif] font-bold uppercase
                         tracking-[3px] text-[11px] text-[#00B4F0] block mb-4"
            >
              Get Started Today
            </span>

            {/* heading */}
            <h2
              className="font-['Rajdhani',sans-serif] font-bold uppercase
                         tracking-[2px] text-[clamp(26px,3.5vw,40px)]
                         leading-[1.1] text-[#0D2550] mb-5 max-w-xl mx-auto"
            >
              Start Your Child's Journey Today
            </h2>

            {/* body */}
            <p className="text-[#0D2550]/70 text-[15px] leading-[1.6] max-w-lg mx-auto mb-10">
              Schedule a free consultation and discover how our personalized therapy
              programs can support your child's growth and development.
            </p>

            {/* CTA button — white card on dark section → PRIMARY button */}
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2
                         font-['Rajdhani',sans-serif] font-bold uppercase
                         tracking-[1.5px] text-[13px]
                         text-white bg-[#0D2550] px-10 py-4 rounded-lg
                         hover:bg-[#123068]
                         hover:scale-[1.03]
                         hover:shadow-[0_8px_32px_rgba(13,37,80,0.25)]
                         transition-all duration-300
                         focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-[#0D2550]"
            >
              Book a Free Consultation <ArrowRight size={16} strokeWidth={2.5} />
            </Link>

            {/* trust badges */}
            <div className="flex justify-center flex-wrap gap-6 mt-8">
              {["No Waitlist", "Available Statewide", "Insurance Accepted"].map(
                (label, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2
                               font-['Rajdhani',sans-serif] font-bold uppercase
                               tracking-[1px] text-[12px] text-[#0D2550]/50"
                  >
                    <CheckCircle2
                      size={14}
                      strokeWidth={2}
                      className="text-[#00B4F0]"
                    />
                    {label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Required keyframes ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}