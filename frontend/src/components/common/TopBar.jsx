import { Link } from "react-router-dom";

const CloseIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function TopBar({ visible, setVisible }) {
  if (!visible) return null;

  return (
    <div className="hidden md:block w-full fixed top-0 left-0 z-[60] bg-[#0D2550] border-b border-[#1A3A6B]">
      <div className="relative flex items-center justify-center px-4 md:px-12 py-2.5">

        {/* Chrome silver divider accent */}
        <span className="hidden md:block w-px h-3.5 bg-[#C8C8D0] opacity-30 mr-2.5 flex-shrink-0" />

        {/* CENTERED TEXT */}
        <p
          className="text-sm leading-relaxed flex items-center gap-2.5 flex-wrap justify-center m-0"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          <span
            className="text-[#E8F4FF] tracking-[0.5px]"
            style={{ fontWeight: 500 }}
          >
            Appointments as soon as today
          </span>

          <span className="text-[#A0C8F0] text-xs">—</span>

          <Link
            to="/contact-us"
            className="text-[#7DD4FF] underline underline-offset-[3px] tracking-[0.5px] hover:text-[#A0C8F0] transition-colors"
            style={{ fontWeight: 600 }}
          >
            Start your free assessment
          </Link>
        </p>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-[#1A3A6B] text-[#A0C8F0] flex items-center justify-center hover:bg-[#1A3A6B] transition-colors"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}