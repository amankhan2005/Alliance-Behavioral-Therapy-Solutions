import { useState, useRef, useEffect } from "react";
import Container from "../components/common/Container";

const faqs = [
  {
    q: "What services do you offer?",
    a: "We offer Autism Therapy, Behavioral Therapy, Parent Training, and Social Skills Development — all tailored to individual needs and developmental goals.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment by visiting our contact page or scheduling a free consultation call directly through our website — typically within 48 hours.",
  },
  {
    q: "What is behavioral therapy?",
    a: "Behavioral therapy helps individuals improve communication, social skills, and daily functioning using structured, evidence-based techniques with measurable outcomes.",
  },
  {
    q: "Do you offer personalized treatment plans?",
    a: "Yes — every individual receives a fully customized therapy plan designed around their specific goals, challenges, and developmental needs from day one.",
  },
];

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
      className="rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#0D2550",
        boxShadow: isOpen
          ? "0 16px 40px rgba(13,37,80,0.26)"
          : "0 8px 28px rgba(13,37,80,0.16)",
        animation: `fadeUp 0.45s ease ${0.05 + index * 0.08}s both`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-6 py-5 text-left gap-4 cursor-pointer bg-transparent border-none"
      >
        <span
          className="text-white font-semibold text-[17px] leading-snug tracking-[0.5px]"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            border: `1.5px solid ${isOpen ? "#00B4F0" : "rgba(0,180,240,0.45)"}`,
            background: isOpen ? "rgba(0,180,240,0.15)" : "transparent",
          }}
        >
          <svg
            width="14" height="14" viewBox="0 0 14 14"
            fill="none" stroke="#00B4F0" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
          >
            <polyline points="2 5 7 10 12 5" />
          </svg>
        </span>
      </button>

      <div className="h-px mx-6 bg-white/[0.08]" />

      <div
        style={{ maxHeight: height, overflow: "hidden", transition: "max-height 0.35s ease, opacity 0.3s ease", opacity: isOpen ? 1 : 0 }}
      >
        <div ref={answerRef} className="px-6 pb-5">
          <p className="text-white/65 text-sm leading-[1.75] mt-3">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="max-w-[760px] mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2
              className="font-extrabold uppercase tracking-[3px] text-[#0D2550] mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(26px, 3.5vw, 38px)" }}
            >
              Frequently <span className="text-[#00B4F0]">Asked</span> Questions
            </h2>
            <p className="text-[rgba(13,37,80,0.65)] text-[15px] leading-[1.7] max-w-[480px] mx-auto">
              Have questions about our services or approach? We have put together answers
              to the most common ones below.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-[14px]">
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
      </Container>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}