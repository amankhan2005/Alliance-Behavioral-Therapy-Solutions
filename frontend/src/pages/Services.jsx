import Container from "../components/common/Container";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CTA from "../sections/CTA";

import autismImg from "../assets/services/autism-therapy.jpeg";
import behavioralImg from "../assets/services/behavioral-therapy.jpg";
import parentImg from "../assets/services/parent-training.webp";
import socialImg from "../assets/services/social-skills.jpg";
/* ─── DATA ──────────────────────────────────────────────────── */

const services = [
  {
    title: "Autism Therapy",
    image: autismImg,
    tag: "Core Program",
    highlights: [
      "Structured, individualized therapy plans",
      "Evidence-based ABA techniques",
      "Family collaboration at every stage",
    ],
    desc: "Our autism therapy programs are designed to support children in developing essential life skills such as communication, social interaction, and independence. Using evidence-based behavioral techniques, we create structured plans tailored to each child's unique needs and developmental goals. Our therapists work closely with families to ensure consistent progress both during sessions and at home.",
  },
  {
    title: "Behavioral Therapy",
    image: behavioralImg,
    tag: "Core Program",
    highlights: [
      "Data-driven behavior reduction plans",
      "Positive reinforcement strategies",
      "Measurable, trackable outcomes",
    ],
    desc: "Behavioral therapy focuses on helping individuals improve their actions, emotional responses, and daily habits. We use structured, data-driven approaches to reduce challenging behaviors and reinforce positive skills. Each therapy plan is customized to address individual needs, ensuring measurable progress and lasting behavioral change that improves overall quality of life.",
  },
  {
    title: "Parent Training",
    image: parentImg,
    tag: "Family Support",
    highlights: [
      "Practical at-home strategies",
      "Consistent routine reinforcement",
      "Ongoing therapist guidance",
    ],
    desc: "Parent training equips families with effective tools to support their child's development outside therapy sessions. We guide parents through practical strategies, helping them manage behaviors and reinforce positive actions at home. This collaborative approach ensures consistency across all environments and strengthens long-term progress.",
  },
  {
    title: "Social Skills Development",
    image: socialImg,
    tag: "Developmental",
    highlights: [
      "Real-world interaction training",
      "Communication confidence building",
      "Structured group & individual sessions",
    ],
    desc: "Our social skills programs help individuals build confidence in communication and real-world interactions. We focus on essential skills such as understanding social cues, initiating conversations, and building relationships. Through structured activities, individuals develop independence and improved social engagement that carries into everyday life.",
  },
];

/* Section alternation: index 0,2 → White; index 1,3 → #F5F9FF */
const sectionBg = ["bg-white", "bg-[#F5F9FF]"];

/* ─── COMPONENT ─────────────────────────────────────────────── */

export default function Services() {
  return (
    <main>

      {/* ══════════════════════════════════════════
          HERO BANNER  ·  DARK (#0D2550)
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
            What We Offer
          </span>

          {/* H1 */}
          <h1
            className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-[2px]
                       text-[clamp(32px,4.5vw,56px)] leading-[1.1] text-white
                       max-w-3xl mx-auto mb-5"
          >
            Our <span className="text-[#00B4F0]">Services</span>
          </h1>

          {/* subtitle */}
          <p className="text-white/70 text-[15px] leading-[1.6] max-w-xl mx-auto">
            We provide personalized, evidence-based therapy services designed to support
            children and families in achieving meaningful, long-term progress.
          </p>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES LIST  ·  ALTERNATING SECTIONS
      ══════════════════════════════════════════ */}
      {services.map((service, i) => {
        const isEven = i % 2 === 0;
        const bg = sectionBg[i % 2];

        return (
          <section key={i} className={`${bg} py-20`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* ── IMAGE COLUMN ──
                    Even index (0, 2) → image LEFT  (default order)
                    Odd index  (1, 3) → image RIGHT (md:order-2)   */}
                <div className={`${!isEven ? "md:order-2" : ""} group`}>
                  <div className="relative overflow-hidden rounded-[20px] shadow-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[360px] object-cover
                                 group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* floating tag badge */}
                    <span
                      className="absolute top-4 left-4 bg-[#0D2550] text-white
                                 font-['Rajdhani',sans-serif] font-bold uppercase
                                 tracking-[1.5px] text-[11px] px-4 py-1.5 rounded-full"
                    >
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* ── CONTENT COLUMN ──
                    Odd index → md:order-1 (moves text to LEFT when image is RIGHT) */}
                <div className={`${!isEven ? "md:order-1" : ""}`}>

                  {/* step indicator */}
                  <span
                    className="font-['Rajdhani',sans-serif] font-bold uppercase
                               tracking-[3px] text-[11px] text-[#00B4F0] block mb-3"
                  >
                    {String(i + 1).padStart(2, "0")} — {service.tag}
                  </span>

                  {/* service heading */}
                  <h2
                    className="font-['Rajdhani',sans-serif] font-bold uppercase
                               tracking-[1px] text-[clamp(22px,2.5vw,32px)]
                               leading-[1.15] text-[#0D2550] mb-4"
                  >
                    {service.title}
                  </h2>

                  {/* description */}
                  <p className="text-[#0D2550]/70 text-[15px] leading-[1.6] mb-6">
                    {service.desc}
                  </p>

                  {/* highlights list */}
                  <ul className="flex flex-col gap-2.5 mb-8">
                    {service.highlights.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2
                          size={17}
                          strokeWidth={2}
                          className="text-[#00B4F0] flex-shrink-0 mt-0.5"
                        />
                        <span className="text-[#0D2550]/70 text-[14px] leading-[1.6]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-2
                               font-['Rajdhani',sans-serif] font-bold uppercase
                               tracking-[1.5px] text-[13px] text-[#0D2550]
                               border-b-2 border-[#00B4F0] pb-0.5
                               hover:text-[#00B4F0] hover:-translate-y-[2px]
                               transition-all duration-300"
                  >
                    Book a Consultation <ArrowRight size={15} strokeWidth={2.5} />
                  </Link>

                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ══════════════════════════════════════════
          CTA SECTION  ·  DARK (#0D2550)
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

    </main>
  );
}