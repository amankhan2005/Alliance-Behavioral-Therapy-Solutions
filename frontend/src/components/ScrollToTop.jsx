import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  bg:      "#F5F9FF",
  surface: "#E0EEF8",
  primary: "#185FA5",
  accent:  "#00B4F0",
  dark:    "#0D2550",
  text:    "#1A1A2E",
  muted:   "#5A7A9A",
  border:  "#C8DCF0",
  white:   "#FFFFFF",
};

// ── Responsive hook ───────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const ChatIcon = ({ size = 16, color = T.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const PhoneIcon = ({ size = 14, color = T.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

const SendIcon = ({ size = 15, color = T.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CloseIcon = ({ size = 11, color = "rgba(255,255,255,0.7)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ArrowIcon = ({ size = 11, color = T.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── Reply content ─────────────────────────────────────────────────────────────
const REPLIES = {
  services: {
    text: `We provide specialized behavioral therapy services designed to support children and families, including:

• Autism Therapy
• Behavioral Therapy
• Parent Training
• Social Skills Development

Each program is tailored to meet individual needs and promote long-term progress.`,
    showContactBtn: false,
  },
  about: {
    text: `At Alliance Behavioral Therapy Solutions, we are dedicated to helping individuals and families achieve meaningful progress through evidence-based behavioral therapy.

Our Mission
To provide compassionate, individualized care that empowers children and families to reach their full potential.

Our Vision
To be a trusted leader in behavioral healthcare, creating lasting positive change in every life we touch.`,
    showContactBtn: false,
  },
  call: {
    text: `You can connect with our team instantly by using the "Schedule a free call" button below. Our care coordinator will assist you right away.`,
    showContactBtn: false,
  },
  book: {
    text: `Getting started is simple. You can schedule a free consultation call using the button below, or visit our contact page to request an appointment.

Contact page: /contact-us`,
    showContactBtn: true,
  },
  contact: {
    text: `You can reach our team through our contact page:

/contact-us

You can also schedule a call directly using the button below.`,
    showContactBtn: true,
  },
  confidential: {
    text: `All sessions are fully confidential and HIPAA-compliant. Your privacy is our highest priority — always.`,
    showContactBtn: false,
  },
  insurance: {
    text: `We work with most major insurance plans. Reach out and we will verify your coverage before your first appointment at no cost to you.`,
    showContactBtn: true,
  },
  cost: {
    text: `Costs vary depending on the service and your insurance coverage. We offer transparent pricing and will provide a full breakdown before you commit to anything.`,
    showContactBtn: true,
  },
  location: {
    text: `We offer both in-person and telehealth sessions, so you can receive care from wherever you are most comfortable.`,
    showContactBtn: false,
  },
  default: {
    text: `I am here to help you with our services, appointments, or any questions about your care. What would you like to know?`,
    showContactBtn: false,
  },
};

// ── Smart keyword detection ───────────────────────────────────────────────────
function getBotReply(msg) {
  const t = msg.toLowerCase();
  if (/service|offer|treat|therapy|program|autism|behavioral/.test(t)) return REPLIES.services;
  if (/about|mission|vision|who are|company/.test(t))                  return REPLIES.about;
  if (/number|phone|call me|contact number/.test(t))                   return REPLIES.call;
  if (/book|appointment|schedule|get started|begin|consult/.test(t))   return REPLIES.book;
  if (/contact|reach|location|address/.test(t))                        return REPLIES.contact;
  if (/confiden|private|hipaa|secure/.test(t))                         return REPLIES.confidential;
  if (/insur|cover|plan|pay/.test(t))                                  return REPLIES.insurance;
  if (/cost|price|fee|rate/.test(t))                                   return REPLIES.cost;
  if (/virtual|telehealth|online|office|where/.test(t))                return REPLIES.location;
  return REPLIES.default;
}

// ── Quick suggestion chips ────────────────────────────────────────────────────
const QUICK_CHIPS = [
  "What services do you offer?",
  "How do I get started?",
  "Is this confidential?",
];

// ── Framer Motion variants ────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
  exit: {
    opacity: 0, y: 16, scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const fabVariants = {
  hidden:  { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.4, transition: { duration: 0.15 } },
};

const bubbleVariants = {
  hidden:  { opacity: 0, y: 8, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 24 },
  },
};

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingIndicator = ({ isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 4 }}
    transition={{ duration: 0.18 }}
    style={{ display: "flex", alignItems: "center", gap: 8 }}
  >
    <div style={makeStyles(isMobile).botAvatar}>
      <ChatIcon size={11} color={T.primary} />
    </div>
    <div style={{
      ...makeStyles(isMobile).bubble.bot,
      display: "flex", gap: 5, padding: "10px 13px",
    }}>
      {[0, 150, 300].map((delay) => (
        <motion.div
          key={delay}
          style={{ width: 5, height: 5, borderRadius: "50%", background: T.muted }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.85, repeat: Infinity, delay: delay / 1000, ease: "easeInOut" }}
        />
      ))}
    </div>
  </motion.div>
);

// ── In-bubble Contact button ──────────────────────────────────────────────────
const ContactButton = ({ isMobile }) => (
  <motion.button
    whileHover={{ scale: 1.03, boxShadow: "0 6px 18px rgba(13,37,80,0.30)" }}
    whileTap={{ scale: 0.97 }}
    onClick={() => { window.location.href = "/contact-us"; }}
    style={makeStyles(isMobile).contactBtn}
    aria-label="Visit contact page"
  >
    Contact Us
    <ArrowIcon size={10} color={T.white} />
  </motion.button>
);

// ── Message bubble ────────────────────────────────────────────────────────────
const Message = ({ msg, isMobile }) => {
  const s = makeStyles(isMobile);
  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
        alignItems: "flex-end",
        gap: isMobile ? 6 : 8,
      }}
    >
      {msg.sender === "bot" && (
        <div style={s.botAvatar}>
          <ChatIcon size={isMobile ? 11 : 12} color={T.primary} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, maxWidth: "84%" }}>
        <div style={msg.sender === "user" ? s.bubble.user : s.bubble.bot}>
          {msg.text}
        </div>
        {msg.sender === "bot" && msg.showContactBtn && (
          <ContactButton isMobile={isMobile} />
        )}
      </div>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export default function FloatingAIChat() {
  const isMobile = useIsMobile();

const [open, setOpen] = useState(() => {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 768; // desktop = open, mobile = closed
  }
  return true;
});
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello. I am the Alliance Care Assistant. I am here to help you understand our services, book a consultation, or answer any questions about your care.",
      showContactBtn: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const messagesEndRef = useRef(null);
  const s = makeStyles(isMobile);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (text) => {
    const trimmed = (typeof text === "string" ? text : input).trim();
    if (!trimmed) return;
    setInput("");
    setChipsVisible(false);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: trimmed, showContactBtn: false },
    ]);
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply.text, showContactBtn: reply.showContactBtn },
      ]);
    }, 850 + Math.random() * 400);
  };

  return (
    <>
      {/* ── Chat card ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Alliance Care Assistant chat"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={s.card}
          >
            {/* Header */}
            <div style={s.header}>
              <div style={s.headerAvatar}>
                <ChatIcon size={isMobile ? 14 : 16} color={T.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.headerName}>Alliance Care Assistant</div>
                <div style={s.headerStatus}>
                  <motion.div
                    style={s.statusDot}
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                  <span style={s.headerStatusText}>Online — replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={s.closeBtn}
                aria-label="Close chat"
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <CloseIcon size={isMobile ? 10 : 11} />
              </button>
            </div>

            {/* Quick chips */}
            <AnimatePresence>
              {chipsVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  style={s.chipsWrap}
                >
                  {QUICK_CHIPS.map((chip) => (
                    <motion.button
                      key={chip}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSend(chip)}
                      style={s.chip}
                    >
                      {chip}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div style={s.divider} />

            {/* Messages */}
            <div style={s.messages} role="log" aria-live="polite">
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} isMobile={isMobile} />
              ))}
              <AnimatePresence>
                {typing && <TypingIndicator isMobile={isMobile} />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input row */}
            <div style={s.inputRow}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                style={s.input}
                aria-label="Chat message input"
              />
              <motion.button
                whileHover={{ scale: 1.08, opacity: 0.9 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSend()}
                style={s.sendBtn}
                aria-label="Send message"
              >
                <SendIcon size={isMobile ? 13 : 15} />
              </motion.button>
            </div>

            {/* CTA */}
            <div style={s.ctaWrap}>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 26px rgba(13,37,80,0.42)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { window.location.href = "tel:+13019809679"; }}
                style={s.ctaBtn}
                aria-label="Schedule a free call"
              >
                <PhoneIcon size={isMobile ? 13 : 14} />
                Schedule a free call
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            variants={fabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(13,37,80,0.45)" }}
            whileTap={{ scale: 0.92 }}
            style={s.fab}
            aria-label="Open chat assistant"
          >
            <ChatIcon size={isMobile ? 18 : 20} color={T.white} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Responsive styles factory ─────────────────────────────────────────────────
function makeStyles(isMobile) {
  return {
    // ── Card shell ──────────────────────────────────────────────────────────
    card: {
      position: "fixed",
      right: isMobile ? "1rem" : "1.5rem",
      top: isMobile ? "auto" : "45%",
bottom: isMobile ? "90px" : "auto",
transform: isMobile ? "none" : "translateY(-50%)",
      width: "min(92vw, 312px)",
      maxHeight: isMobile ? "78vh" : "80vh",
      zIndex: 9999,
      background: T.white,
      borderRadius: isMobile ? "18px" : "22px",
      border: `1px solid ${T.border}`,
      boxShadow: "0 12px 40px rgba(24,95,165,0.13), 0 2px 10px rgba(24,95,165,0.07)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
     fontFamily: "'Rajdhani', sans-serif",
    },

    // ── Header ──────────────────────────────────────────────────────────────
    header: {
      background: T.dark,
      padding: isMobile ? "11px 13px" : "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 9,
      flexShrink: 0,
    },

    headerAvatar: {
      width: isMobile ? 30 : 36,
      height: isMobile ? 30 : 36,
      borderRadius: "50%",
      background: "#1e3a6e",
      border: "1.5px solid rgba(0,180,240,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },

    headerName: {
      fontSize: isMobile ? "12.5px" : "13.5px",
      fontWeight: 700,
      color: T.white,
      lineHeight: 1.2,
      letterSpacing: "0.01em",
    },

    headerStatus: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      marginTop: 2,
    },

    statusDot: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "#22c55e",
      flexShrink: 0,
    },

    headerStatusText: {
      fontSize: "10.5px",
      color: "rgba(255,255,255,0.6)",
      letterSpacing: "0.01em",
    },

    closeBtn: {
      width: isMobile ? 24 : 28,
      height: isMobile ? 24 : 28,
      borderRadius: "50%",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.15s",
      outline: "none",
      flexShrink: 0,
    },

    // ── Chips ───────────────────────────────────────────────────────────────
    chipsWrap: {
      padding: isMobile ? "8px 10px 0" : "10px 12px 0",
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      overflow: "hidden",
    },

    chip: {
      fontSize: isMobile ? "10.5px" : "11px",
      fontWeight: 600,
      color: T.primary,
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: "999px",
      padding: isMobile ? "4px 9px" : "5px 11px",
      cursor: "pointer",
      outline: "none",
      whiteSpace: "nowrap",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      transition: "background 0.15s",
    },

    // ── Divider ─────────────────────────────────────────────────────────────
    divider: {
      height: "1px",
      background: T.border,
      margin: isMobile ? "8px 0 0" : "10px 0 0",
      opacity: 0.6,
      flexShrink: 0,
    },

    // ── Messages ────────────────────────────────────────────────────────────
    messages: {
      padding: isMobile ? "10px 10px" : "14px 12px",
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 9 : 12,
      // Responsive height: shrinks on small screens, never overflows card
      height: isMobile ? "min(190px, 32vh)" : "min(230px, 35vh)",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: `${T.border} transparent`,
      // Smooth momentum scroll on iOS
      WebkitOverflowScrolling: "touch",
    },

    // ── Bot avatar ──────────────────────────────────────────────────────────
    botAvatar: {
      width: isMobile ? 22 : 26,
      height: isMobile ? 22 : 26,
      borderRadius: "50%",
      background: T.surface,
      border: `1px solid ${T.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginBottom: 2,
    },

    // ── Bubbles ─────────────────────────────────────────────────────────────
    bubble: {
      bot: {
        padding: isMobile ? "8px 11px" : "10px 13px",
        borderRadius: "16px 16px 16px 4px",
        background: T.surface,
        color: T.text,
        fontSize: isMobile ? "12px" : "13px",
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        border: "1px solid rgba(200,220,240,0.6)",
      },
      user: {
        padding: isMobile ? "8px 11px" : "10px 13px",
        borderRadius: "16px 16px 4px 16px",
        background: T.dark,
        color: T.white,
        fontSize: isMobile ? "12px" : "13px",
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      },
    },

    // ── Contact button (inside bubble) ──────────────────────────────────────
    contactBtn: {
      alignSelf: "flex-start",
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: isMobile ? "6px 12px" : "7px 14px",
      borderRadius: "999px",
      background: T.dark,
      color: T.white,
      fontSize: isMobile ? "11px" : "12px",
      fontWeight: 700,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      border: "none",
      cursor: "pointer",
      letterSpacing: "0.02em",
      boxShadow: "0 4px 12px rgba(13,37,80,0.22)",
      outline: "none",
    },

    // ── Input row ───────────────────────────────────────────────────────────
    inputRow: {
      padding: isMobile ? "8px 10px" : "10px 12px",
      borderTop: `1px solid ${T.border}`,
      display: "flex",
      gap: 6,
      alignItems: "center",
      flexShrink: 0,
    },

    input: {
      flex: 1,
      height: isMobile ? "34px" : "38px",
      padding: "0 12px",
      borderRadius: "999px",
      border: `1.5px solid ${T.border}`,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: isMobile ? "12px" : "13px",
      color: T.text,
      background: T.bg,
      outline: "none",
      transition: "border-color 0.18s",
      // Prevent iOS zoom on focus (font-size < 16px triggers zoom)
      WebkitTextSizeAdjust: "100%",
    },

    sendBtn: {
      width: isMobile ? 34 : 38,
      height: isMobile ? 34 : 38,
      borderRadius: "50%",
      background: T.dark,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      outline: "none",
      boxShadow: "0 3px 10px rgba(13,37,80,0.22)",
    },

    // ── CTA ─────────────────────────────────────────────────────────────────
    ctaWrap: {
      padding: isMobile ? "8px 10px 11px" : "10px 12px 14px",
      borderTop: `1px solid ${T.border}`,
      flexShrink: 0,
    },

    ctaBtn: {
      width: "100%",
      padding: isMobile ? "9px 0" : "11px 0",
      borderRadius: "999px",
      border: "none",
      background: "linear-gradient(135deg, #0D2550 0%, #185FA5 100%)",
      color: T.white,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: isMobile ? "12px" : "13px",
      fontWeight: 700,
      letterSpacing: "0.025em",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      boxShadow: "0 5px 18px rgba(13,37,80,0.30)",
      outline: "none",
    },

    // ── FAB ─────────────────────────────────────────────────────────────────
    fab: {
      position: "fixed",
      bottom: isMobile ? "20px" : "24px",
      right: isMobile ? "1rem" : "1.5rem",
      zIndex: 9999,
      width: isMobile ? 48 : 54,
      height: isMobile ? 48 : 54,
      borderRadius: "50%",
      background: T.dark,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 6px 24px rgba(13,37,80,0.38)",
      outline: "none",
    },
  };
}