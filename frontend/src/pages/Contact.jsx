import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { MapPin, Mail, Phone, FileText, Clock, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";

/* ─────────────────────────────────────────
   CONTACT INFO DATA
───────────────────────────────────────── */
const contactItems = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "5921 Gentle Call, Clarksville, MD 21029",
    href: "https://www.google.com/maps?q=5921+Gentle+Call+Clarksville+MD",
    external: true,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@alliancebehavioraltherapysolutions.com",
    href: "mailto:info@alliancebehavioraltherapysolutions.com",
    external: false,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "(301) 980-9679",
    href: "tel:+13019809679",
    external: false,
  },
  {
    icon: FileText,
    label: "Fax",
    value: "(301) 890-6517",
    href: null,
    external: false,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri · 9:00 AM – 6:00 PM",
    href: null,
    external: false,
  },
];

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1400;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Contact() {
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captcha, setCaptcha] = useState("");

  const isCaptchaCorrect = captcha.trim() !== "" && parseInt(captcha) === num1 + num2;
  const isCaptchaWrong = captcha.trim() !== "" && !isCaptchaCorrect;

  useEffect(() => {
    generateCaptcha();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 60);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setCaptcha("");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill out all required fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (parseInt(captcha) !== num1 + num2) {
      toast.error("Incorrect captcha answer. Please try again.");
      generateCaptcha();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        generateCaptcha();
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch {
      toast.error("Network error. Please check your connection.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 80ms; }
        .reveal-d2 { transition-delay: 180ms; }
        .reveal-d3 { transition-delay: 280ms; }

        /* Floating label inputs */
        .field { position: relative; }
        .field input, .field textarea {
          width: 100%;
          padding: 20px 18px 8px;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid rgba(13,37,80,0.18);
          border-radius: 0;
          color: #0D2550;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.25s;
          appearance: none;
          -webkit-appearance: none;
        }
        .field textarea { resize: none; padding-top: 22px; }
        .field input:focus, .field textarea:focus {
          border-color: #00B4F0;
        }
        .field label {
          position: absolute;
          left: 18px; top: 14px;
          font-size: 13px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(13,37,80,0.4);
          pointer-events: none;
          transition: all 0.2s;
        }
        .field input:focus ~ label,
        .field input:not(:placeholder-shown) ~ label,
        .field textarea:focus ~ label,
        .field textarea:not(:placeholder-shown) ~ label {
          top: 6px;
          font-size: 10px;
          color: #00B4F0;
          letter-spacing: 2px;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; appearance: textfield; }

        /* Scan line on hero */
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,180,240,0.3), transparent);
          animation: scan 4s ease-in-out infinite;
          pointer-events: none;
        }

        /* Dot grid */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(0,180,240,0.18) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Contact item hover */
        .contact-item {
          position: relative;
          padding: 20px 0;
          transition: all 0.3s;
        }
        .contact-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #00B4F0;
          transition: width 0.4s cubic-bezier(.22,1,.36,1);
        }
        .contact-item:hover::after { width: 100%; }
        .contact-item:hover .ci-icon { background: rgba(0,180,240,0.15); color: #00B4F0; }
        .ci-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
        }

        /* Submit button shimmer */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .btn-submit {
          background: #0D2550;
          position: relative;
          overflow: hidden;
        }
        .btn-submit::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%);
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        .btn-submit:hover { background: #123068; }

        /* Success card */
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .success-card { animation: popIn 0.5s cubic-bezier(.22,1,.36,1) both; }

        /* Stat bar */
        .stat-bar {
          border-right: 1px solid rgba(255,255,255,0.10);
        }
        .stat-bar:last-child { border-right: none; }

        /* Map pin pulse */
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .ping { animation: ping 1.4s cubic-bezier(0,0,.2,1) infinite; }

        /* Number input for captcha */
        .captcha-input {
          background: rgba(13,37,80,0.04);
          border: 1.5px solid rgba(13,37,80,0.12);
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 15px;
          color: #0D2550;
          width: 96px;
          text-align: center;
          outline: none;
          transition: border-color 0.2s;
        }
        .captcha-input:focus { border-color: #00B4F0; }
      `}</style>

      <section style={{ fontFamily: "'Rajdhani', sans-serif", background: "#F0F4FA" }}>

        {/* ═══════════════════════════════════════
            HERO
        ═══════════════════════════════════════ */}
        <div className="bg-[#0D2550] relative overflow-hidden" style={{ minHeight: 340 }}>
          {/* Dot grid texture */}
          <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,180,240,0.12), transparent 70%)" }} />
          {/* Scan line */}
          <div className="scan-line" />
          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-[#00B4F0]/30 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2 border-[#00B4F0]/30 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-l-2 border-b-2 border-[#00B4F0]/30 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-[#00B4F0]/30 rounded-br-lg pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-0 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-[#00B4F0]" />
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#00B4F0",
              }}>
                Let's Talk
              </span>
              <div className="w-5 h-px bg-[#00B4F0]" />
            </div>

            <h1 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "white",
              marginBottom: 16,
            }}>
              We'd Love to<br/>
              <span style={{ color: "#00B4F0" }}>Hear From You</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.60)",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto 40px",
              fontFamily: "sans-serif",
              fontWeight: 400,
            }}>
              Reach out with questions about our Therapy services, scheduling, or insurance coverage. Our team responds within 24 hours.
            </p>

            {/* Stat bar */}
            <div className="grid grid-cols-3 border-t border-white/10 mt-2">
              {[
                { num: 500, suffix: "+", label: "Families Served" },
                { num: 24, suffix: "h", label: "Response Time" },
                { num: 10, suffix: "+", label: "Years of Care" },
              ].map((s, i) => (
                <div key={i} className="stat-bar py-6">
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(26px, 3vw, 38px)",
                    color: "white",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    <Counter target={s.num} suffix={s.suffix} />
                  </p>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.40)",
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            MAIN CONTENT GRID
        ═══════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

            {/* ── LEFT: INFO CARD ── */}
            <div className="reveal reveal-d1 space-y-0 bg-[#0D2550] rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 24px 64px rgba(13,37,80,0.22)" }}>

              {/* Card header */}
              <div className="px-8 pt-8 pb-6 border-b border-white/10">
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#00B4F0",
                  marginBottom: 8,
                }}>
                  Contact Information
                </p>
                <p style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily: "sans-serif",
                  fontWeight: 400,
                }}>
                  Our care team is available Monday through Friday. We look forward to connecting with your family.
                </p>
              </div>

              {/* Contact items */}
              <div className="px-8 py-2">
                {contactItems.map(({ icon: Icon, label, value, href, external }, i) => (
                  <div key={i} className="contact-item border-b border-white/[0.07] last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="ci-icon mt-0.5">
                        <Icon size={17} strokeWidth={1.8} color="#00B4F0" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.35)",
                          marginBottom: 3,
                        }}>
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            style={{
                              color: "rgba(255,255,255,0.80)",
                              fontSize: 15,
                              fontFamily: "sans-serif",
                              fontWeight: 400,
                              lineHeight: 1.5,
                              textDecoration: "none",
                              wordBreak: "break-all",
                              transition: "color 0.2s",
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.80)"}
                          >
                            {value}
                          </a>
                        ) : (
                          <p style={{ color: "rgba(255,255,255,0.80)", fontSize: 15, fontFamily: "sans-serif", fontWeight: 400 }}>
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card footer CTA */}
              <div className="mx-8 mb-8 mt-4 rounded-xl p-5"
                style={{ background: "rgba(0,180,240,0.08)", border: "1px solid rgba(0,180,240,0.18)" }}>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#00B4F0",
                  marginBottom: 4,
                }}>
                  Insurance Accepted
                </p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.6 }}>
                  We work with most major insurance providers. Contact us to verify your coverage.
                </p>
              </div>
            </div>

            {/* ── RIGHT: FORM ── */}
            <div className="reveal reveal-d2">
              {submitted ? (
                <div className="success-card bg-white rounded-2xl p-12 text-center"
                  style={{ boxShadow: "0 8px 40px rgba(13,37,80,0.10)", border: "1px solid rgba(13,37,80,0.06)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(0,180,240,0.10)" }}>
                    <CheckCircle size={32} color="#00B4F0" strokeWidth={1.5} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#0D2550",
                    marginBottom: 12,
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "rgba(13,37,80,0.60)", fontSize: 15, lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: 28 }}>
                    Thank you for reaching out. Our team will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#0D2550",
                      background: "transparent",
                      border: "1.5px solid rgba(13,37,80,0.20)",
                      borderRadius: 10,
                      padding: "12px 28px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#0D2550"; e.currentTarget.style.background = "rgba(13,37,80,0.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(13,37,80,0.20)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 md:p-10"
                  style={{ boxShadow: "0 8px 40px rgba(13,37,80,0.10)", border: "1px solid rgba(13,37,80,0.06)" }}>

                  {/* Form header */}
                  <div className="mb-8">
                    <p style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "#00B4F0",
                      marginBottom: 6,
                    }}>
                      Send a Message
                    </p>
                    <h2 style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(22px, 2.5vw, 30px)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#0D2550",
                      lineHeight: 1.1,
                    }}>
                      How Can We<br />Help Your Family?
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* 2-col: Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-0 sm:gap-6">
                      <div className="field mb-6">
                        <input
                          id="name" name="name" type="text"
                          placeholder=" " value={form.name} onChange={handleChange}
                        />
                        <label htmlFor="name">Full Name *</label>
                      </div>
                      <div className="field mb-6">
                        <input
                          id="phone" name="phone" type="tel"
                          placeholder=" " value={form.phone} onChange={handleChange}
                        />
                        <label htmlFor="phone">Phone (Optional)</label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="field mb-6">
                      <input
                        id="email" name="email" type="email"
                        placeholder=" " value={form.email} onChange={handleChange}
                      />
                      <label htmlFor="email">Email Address *</label>
                    </div>

                    {/* Message */}
                    <div className="field mb-6">
                      <textarea
                        id="message" name="message" rows="5"
                        placeholder=" " value={form.message} onChange={handleChange}
                      />
                      <label htmlFor="message">How Can We Help? *</label>
                    </div>

                    {/* Captcha */}
                    <div className="mb-6 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                      style={{ background: "rgba(13,37,80,0.03)", border: "1px solid rgba(13,37,80,0.08)" }}>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <p style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 600,
                          fontSize: 15,
                          color: "rgba(13,37,80,0.70)",
                          whiteSpace: "nowrap",
                        }}>
                          Verify:{" "}
                          <strong style={{ color: "#0D2550" }}>{num1} + {num2} = ?</strong>
                        </p>
                        <button
                          type="button" onClick={generateCaptcha}
                          title="Refresh"
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "rgba(13,37,80,0.35)", padding: 6, borderRadius: 8,
                            display: "flex", alignItems: "center", transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#00B4F0"; e.currentTarget.style.background = "rgba(0,180,240,0.08)"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "rgba(13,37,80,0.35)"; e.currentTarget.style.background = "none"; }}
                        >
                          <RefreshCw size={14} strokeWidth={2} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="number" placeholder="Answer"
                          value={captcha}
                          onChange={e => setCaptcha(e.target.value)}
                          className="captcha-input"
                          style={{
                            borderColor: isCaptchaCorrect
                              ? "rgba(0,180,240,0.5)"
                              : isCaptchaWrong
                              ? "rgba(239,68,68,0.4)"
                              : undefined,
                          }}
                        />
                        {isCaptchaCorrect && (
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(0,180,240,0.10)", border: "1px solid rgba(0,180,240,0.30)" }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="#00B4F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                        {isCaptchaWrong && (
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M3 3l6 6M9 3l-6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      {isCaptchaWrong && (
                        <p style={{ color: "#EF4444", fontSize: 12, fontFamily: "sans-serif" }}>
                          Incorrect. Try again or refresh.
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !isCaptchaCorrect}
                      className="btn-submit w-full flex items-center justify-center gap-3"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "white",
                        border: "none",
                        borderRadius: 12,
                        padding: "18px 24px",
                        cursor: loading || !isCaptchaCorrect ? "not-allowed" : "pointer",
                        opacity: loading || !isCaptchaCorrect ? 0.5 : 1,
                        transition: "all 0.3s",
                      }}
                    >
                      {loading ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            style={{ animation: "spin 1s linear infinite" }}>
                            <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                            <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </>
                      )}
                    </button>

                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                    {/* Trust note */}
                    <p style={{
                      textAlign: "center",
                      color: "rgba(13,37,80,0.35)",
                      fontSize: 12,
                      fontFamily: "sans-serif",
                      marginTop: 16,
                      letterSpacing: "0.3px",
                    }}>
                      We typically respond within 1 business day.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            MAP
        ═══════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="reveal reveal-d3">
            {/* Section header */}
            <div className="flex items-center gap-6 mb-6">
              <div>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#00B4F0",
                  marginBottom: 4,
                }}>
                  Location
                </p>
                <h2 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#0D2550",
                  lineHeight: 1.1,
                }}>
                  Find Us On the Map
                </h2>
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(13,37,80,0.10)" }} />
              <a
                href="https://www.google.com/maps?q=5921+Gentle+Call+Clarksville+MD"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#0D2550",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                  opacity: 0.6,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}
              >
                Open in Maps <ArrowRight size={12} strokeWidth={2.5} />
              </a>
            </div>

            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 8px 40px rgba(13,37,80,0.12)",
                border: "1px solid rgba(13,37,80,0.08)",
              }}>
              {/* Animated pin */}
              <div className="absolute top-1/2 left-1/2 z-10 pointer-events-none"
                style={{ transform: "translate(-50%, -50%)" }}>
                <div style={{ position: "relative", width: 18, height: 18 }}>
                  <div className="ping" style={{
                    position: "absolute", inset: 0,
                    borderRadius: "50%",
                    background: "#EF4444",
                    opacity: 0.5,
                  }} />
                  <div style={{
                    position: "relative",
                    width: 18, height: 18,
                    borderRadius: "50%",
                    background: "#EF4444",
                    boxShadow: "0 0 0 3px white, 0 4px 12px rgba(239,68,68,0.5)",
                  }} />
                </div>
              </div>

              <iframe
                src="https://maps.google.com/maps?q=5921+Gentle+Call+Clarksville+MD+21029&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, display: "block", filter: "saturate(0.85) contrast(1.05)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              />
            </div>

            {/* Address strip below map */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={13} color="#00B4F0" strokeWidth={2} />
                <span style={{ color: "rgba(13,37,80,0.60)", fontSize: 13, fontFamily: "sans-serif" }}>
                  5921 Gentle Call, Clarksville, MD 21029
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} color="#00B4F0" strokeWidth={2} />
                <span style={{ color: "rgba(13,37,80,0.60)", fontSize: 13, fontFamily: "sans-serif" }}>
                  Mon – Fri · 9:00 AM – 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}