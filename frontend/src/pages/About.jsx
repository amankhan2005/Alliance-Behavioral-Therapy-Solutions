import Container from "../components/common/Container";
import { Link } from "react-router-dom";
import therapyImg from "../assets/about/therapy.jpg";
import familyImg from "../assets/about/family.webp";
import {
  ShieldCheck,
  ClipboardCheck,
  BarChart3,
  Users,
  TrendingUp,
  Home,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────── */

const stats = [
  { num: "500+", label: "Families Served" },
  { num: "98%", label: "Parent Satisfaction" },
  { num: "100%", label: "Licensed Therapists" },
  { num: "10+", label: "Years of Care" },
];

const whyUsPoints = [
  {
    icon: ShieldCheck,
    title: "Certified Professionals",
    text: "All therapists hold active BCBA or BCaBA certifications with years of hands-on clinical experience.",
  },
  {
    icon: ClipboardCheck,
    title: "Individualized Plans",
    text: "Every plan is tailored to specific goals, learning style, and family dynamics — no two are alike.",
  },
  {
    icon: BarChart3,
    title: "Evidence-Based Methods",
    text: "We exclusively use ABA and other scientifically validated approaches with demonstrated outcomes.",
  },
  {
    icon: Users,
    title: "Family Involvement",
    text: "Parents and caregivers are active partners — trained, informed, and supported throughout therapy.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    text: "Continuous data collection and transparent reporting so you always know where your child stands.",
  },
  {
    icon: Home,
    title: "Flexible Delivery",
    text: "Therapy fits your life — in-home, clinic, school, or telehealth sessions all available statewide.",
  },
];

const approachSteps = [
  {
    num: "01",
    label: "Assess",
    desc: "In-depth evaluation of your child's strengths, challenges, and goals to build the right foundation.",
  },
  {
    num: "02",
    label: "Plan",
    desc: "A custom therapy roadmap with clear, measurable milestones designed around your child's needs.",
  },
  {
    num: "03",
    label: "Deliver",
    desc: "Consistent, evidence-based sessions in your preferred setting — home, clinic, school, or virtual.",
  },
  {
    num: "04",
    label: "Adapt",
    desc: "Continuously refine strategies based on data and progress to ensure lasting, meaningful outcomes.",
  },
];

/* ─── COMPONENT ─────────────────────────────────────────────── */

export default function About() {
  return (
    <main>

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO  ·  DARK (#0D2550)
          Cards → WHITE
      ══════════════════════════════════════════ */}
      <section className="bg-[#0D2550] py-20 relative overflow-hidden">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0
                     bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,180,240,0.10),transparent)]"
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">

          {/* eyebrow label */}
          <span
            className="inline-block font-['Rajdhani',sans-serif] font-bold uppercase
                       tracking-[3px] text-[11px] text-[#00B4F0]
                       border border-[#00B4F0]/40 rounded-full px-5 py-1.5 mb-6"
          >
            About Our Practice
          </span>

          {/* H1 */}
          <h1
            className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-[2px]
                       text-[clamp(32px,5vw,60px)] leading-[1.1] text-white mb-5
                       max-w-3xl mx-auto"
          >
            Behavioral Therapy Built on{" "}
            <span className="text-[#00B4F0]">Care &amp; Science</span>
          </h1>

          {/* subtitle */}
          <p className="text-white/70 text-[15px] leading-[1.6] max-w-xl mx-auto mb-14">
            Alliance Behavioral Therapy Solutions helps children with autism and
            behavioral challenges build meaningful skills — through evidence-based
            methods, family partnership, and genuine compassion.
          </p>

          {/* stat cards — DARK bg → WHITE cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-[16px] px-6 py-6 text-center
                           hover:-translate-y-1
                           hover:shadow-[0_12px_32px_rgba(0,0,0,0.20)]
                           transition-all duration-300"
              >
                <p
                  className="font-['Rajdhani',sans-serif] font-bold
                             text-[clamp(26px,3vw,36px)] text-[#0D2550]
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
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — INTRO  ·  WHITE (#FFFFFF)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* image + floating badge */}
            <div className="relative">
              <img
                src={therapyImg}
                alt="Child engaging in a behavioral therapy session"
                className="rounded-[20px] shadow-lg object-cover w-full h-[380px]
                           hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
              {/* floating badge — uses primary dark on white section */}
              <div
                className="absolute -bottom-5 -right-5 bg-[#0D2550] text-white
                            px-5 py-4 rounded-[16px] shadow-2xl"
              >
                <span
                  className="block font-['Rajdhani',sans-serif] font-bold
                             text-[#00B4F0] text-[26px] leading-none tracking-[1px]"
                >
                  10+
                </span>
                <span
                  className="font-['Rajdhani',sans-serif] font-bold uppercase
                             tracking-[1px] text-[11px] text-white/80 mt-0.5 block"
                >
                  Years of Trusted Care
                </span>
              </div>
            </div>

            {/* text block */}
            <div>
              <span
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[3px] text-[11px] text-[#00B4F0] block mb-3"
              >
                Who We Are
              </span>
              <h2
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[1px] text-[clamp(28px,3.5vw,44px)]
                           leading-[1.15] text-[#0D2550] mb-5"
              >
                Trusted Behavioral Therapy Services
              </h2>
              <p className="text-[#0D2550]/70 text-[15px] leading-[1.6] mb-4">
                At Alliance Behavioral Therapy Solutions, we specialize in personalized
                behavioral and autism therapy designed to support each child's unique
                development journey.
              </p>
              <p className="text-[#0D2550]/70 text-[15px] leading-[1.6] mb-8">
                Our licensed therapists use structured, evidence-based approaches to
                improve communication, social skills, and independence — working closely
                with families every step of the way.
              </p>
              {/* button — white section → primary bg */}
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2
                           font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[1.5px] text-[13px]
                           text-white bg-[#0D2550] px-7 py-3.5 rounded-lg
                           hover:bg-[#123068] hover:scale-[1.02] hover:shadow-lg
                           transition-all duration-300"
              >
                Know More <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — MISSION + VISION  ·  DARK (#0D2550)
          Cards → WHITE
      ══════════════════════════════════════════ */}
      <section className="bg-[#0D2550] py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0
                     bg-[radial-gradient(ellipse_50%_60%_at_70%_50%,rgba(0,180,240,0.07),transparent)]"
        />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* section header */}
          <div className="text-center mb-12">
            <span
              className="font-['Rajdhani',sans-serif] font-bold uppercase
                         tracking-[3px] text-[11px] text-[#00B4F0] block mb-3"
            >
              Our Foundation
            </span>
            <h2
              className="font-['Rajdhani',sans-serif] font-bold uppercase
                         tracking-[2px] text-[clamp(28px,3.5vw,44px)]
                         text-white leading-[1.1]"
            >
              What Drives Everything We Do
            </h2>
          </div>

          {/* DARK bg → WHITE cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                Icon: Target,
                title: "Our Mission",
                text: "To provide compassionate, individualized behavioral therapy that empowers children and families to grow, adapt, and reach their full potential — with dignity and measurable results.",
              },
              {
                Icon: Eye,
                title: "Our Vision",
                text: "To be a trusted leader in behavioral healthcare, creating meaningful and lasting positive change in every life we support — from first session to full independence.",
              },
            ].map(({ Icon, title, text }, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] p-8
                           hover:-translate-y-1
                           hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)]
                           transition-all duration-300 group"
              >
                {/* icon */}
                <div
                  className="w-12 h-12 rounded-[12px] bg-[#0D2550] flex items-center
                              justify-center mb-5
                              group-hover:bg-[#123068] transition-colors duration-300"
                >
                  <Icon size={22} strokeWidth={2} className="text-[#00B4F0]" />
                </div>
                <h3
                  className="font-['Rajdhani',sans-serif] font-bold uppercase
                             tracking-[1.5px] text-[20px] text-[#0D2550] mb-3"
                >
                  {title}
                </h3>
                <p className="text-[#0D2550]/70 text-[15px] leading-[1.6]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — WHY CHOOSE US  ·  WHITE (#FFFFFF)
          Cards → PRIMARY (#0D2550)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* section header */}
          <div className="text-center mb-14">
            <span
              className="font-['Rajdhani',sans-serif] font-bold uppercase
                         tracking-[3px] text-[11px] text-[#00B4F0] block mb-3"
            >
              Why Families Choose Us
            </span>
            <h2
              className="font-['Rajdhani',sans-serif] font-bold uppercase
                         tracking-[2px] text-[clamp(28px,3.5vw,44px)]
                         text-[#0D2550] leading-[1.1] mb-4"
            >
              The Alliance Difference
            </h2>
            <p className="text-[#0D2550]/70 text-[15px] leading-[1.6] max-w-lg mx-auto">
              Six reasons families across the state trust us with their most important person.
            </p>
          </div>

          {/* WHITE bg → PRIMARY (#0D2550) cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUsPoints.map(({ icon: Icon, title, text }, i) => (
              <div
                key={i}
                className="bg-[#0D2550] rounded-[20px] p-7 flex flex-col gap-4
                           hover:-translate-y-1
                           hover:shadow-[0_16px_40px_rgba(13,37,80,0.28)]
                           transition-all duration-300 group"
              >
                {/* icon box */}
                <div
                  className="w-11 h-11 rounded-[10px] bg-white/10 flex items-center
                              justify-center
                              group-hover:bg-white/[0.18] transition-colors duration-300"
                >
                  <Icon size={20} strokeWidth={2} className="text-white" />
                </div>
                <h4
                  className="font-['Rajdhani',sans-serif] font-bold uppercase
                             tracking-[1px] text-[16px] text-white leading-snug"
                >
                  {title}
                </h4>
                <p className="text-white/70 text-[14px] leading-[1.6]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — APPROACH  ·  DARK (#0D2550)
          Step cards → WHITE
      ══════════════════════════════════════════ */}
      <section className="bg-[#0D2550] py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0
                     bg-[radial-gradient(ellipse_50%_60%_at_20%_50%,rgba(0,180,240,0.07),transparent)]"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* text + step cards */}
            <div>
              <span
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[3px] text-[11px] text-[#00B4F0] block mb-3"
              >
                How We Work
              </span>
              <h2
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[2px] text-[clamp(28px,3.5vw,44px)]
                           text-white leading-[1.1] mb-5"
              >
                Our Approach to Care
              </h2>
              <p className="text-white/70 text-[15px] leading-[1.6] mb-8">
                Every child learns differently. We take the time to understand individual
                needs before building a structured, adaptive plan — then continuously
                refine it based on real progress.
              </p>

              {/* DARK bg → WHITE step cards */}
              <div className="flex flex-col gap-4">
                {approachSteps.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[16px] px-6 py-5 flex items-start gap-5
                               hover:-translate-y-1
                               hover:shadow-[0_12px_32px_rgba(0,0,0,0.20)]
                               transition-all duration-300"
                  >
                    {/* step number */}
                    <span
                      className="font-['Rajdhani',sans-serif] font-bold text-[22px]
                                 text-[#0D2550]/20 leading-none flex-shrink-0
                                 w-10 text-center pt-0.5"
                    >
                      {step.num}
                    </span>
                    <div>
                      <h4
                        className="font-['Rajdhani',sans-serif] font-bold uppercase
                                   tracking-[1.5px] text-[14px] text-[#0D2550] mb-1"
                      >
                        {step.label}
                      </h4>
                      <p className="text-[#0D2550]/70 text-[14px] leading-[1.6]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* image */}
            <img
              src={familyImg}
              alt="Family engaging in supportive therapy activities"
              className="rounded-[20px] shadow-2xl object-cover w-full h-[480px]
                         hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — CTA  ·  WHITE (#FFFFFF)
          CTA card → PRIMARY (#0D2550)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* WHITE bg → PRIMARY (#0D2550) card */}
          <div
            className="bg-[#0D2550] rounded-[24px] px-10 py-16 md:px-16
                        text-center relative overflow-hidden max-w-5xl mx-auto"
          >
            {/* decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0
                         bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(0,180,240,0.12),transparent)]"
            />

            <div className="relative">
              <span
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[3px] text-[11px] text-[#00B4F0] block mb-4"
              >
                Get Started Today
              </span>
              <h2
                className="font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[2px] text-[clamp(28px,3.5vw,44px)]
                           text-white leading-[1.1] mb-5 max-w-2xl mx-auto"
              >
                Start Your Child's Journey Today
              </h2>
              <p className="text-white/70 text-[15px] leading-[1.6] max-w-lg mx-auto mb-10">
                Schedule a free consultation and discover how our personalized therapy
                programs can support your child's growth and development.
              </p>

              {/* button — dark card on white section → WHITE button */}
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2
                           font-['Rajdhani',sans-serif] font-bold uppercase
                           tracking-[1.5px] text-[13px]
                           text-[#0D2550] bg-white px-10 py-4 rounded-lg
                           hover:bg-[#E8F5FF]
                           hover:scale-[1.03]
                           hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                           transition-all duration-300
                           focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-white"
              >
                Book a Free Consultation <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              {/* trust badges */}
              <div className="flex justify-center flex-wrap gap-6 mt-8">
                {["No Waitlist", "Available Statewide", "Insurance Accepted"].map(
                  (label, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-white/60
                                 font-['Rajdhani',sans-serif] font-bold uppercase
                                 tracking-[1px] text-[12px]"
                    >
                      <CheckCircle2
                        size={15}
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

        </div>
      </section>

    </main>
  );
}