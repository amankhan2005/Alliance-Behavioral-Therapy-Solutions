import { NavLink } from "react-router-dom";
import { useState } from "react";
import Container from "./Container";
import logo from "../../assets/logo/logo.png";

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar({ topBarVisible }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Load Rajdhani font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <nav
        className={`w-full sticky z-50 bg-white border-b border-[#0D2550]/10 transition-all duration-300 ${topBarVisible ? "top-0 md:top-[36px]" : "top-0"}`}
      >
        <Container>
          <div className="flex items-center justify-between py-3">

            {/* LOGO */}
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <img src={logo} alt="Alliance BTS" className="h-14 w-auto" />
              <div className="flex flex-col leading-tight">
                <span
                  className="text-lg md:text-xl font-semibold text-[#0A1F44] tracking-wide transition-colors group-hover:text-[#0077B6]"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Alliance
                </span>

                <span
                  className="text-xs md:text-sm text-[#1B2A4A]  tracking-[0.08em] uppercase"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
                >
                  Behavioral Therapy
                </span>
              </div>
            </NavLink>

            {/* CENTER MENU */}
            <div
              className="hidden md:flex gap-8 text-sm absolute left-1/2 -translate-x-1/2"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className="relative group">
                  {({ isActive }) => (
                    <>
                      <span
                        className={`transition-colors duration-300 tracking-wide ${isActive
                            ? "text-[#0D2550] font-semibold"
                            : "text-[#0D2550]/80 font-medium group-hover:text-[#00B4F0]"
                          }`}
                        style={{ fontWeight: isActive ? 700 : 600 }}
                      >
                        {label}
                      </span>

                      {/* UNDERLINE */}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#00B4F0] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* RIGHT BUTTONS */}
            <div
              className="hidden md:flex items-center gap-3"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {/* Secondary: Call Now */}
              <a
                href="tel:+13019809679"
                className="
                  px-5 py-1.5 rounded-full text-sm tracking-wide
                  border border-[#0D2550] text-[#0D2550] font-semibold
                  hover:bg-[#0D2550] hover:text-white
                  transition-all duration-300
                "
                style={{ fontWeight: 600 }}
              >
                Call Now
              </a>

              {/* Primary: Find a therapist */}
              <NavLink
                to="/contact-us"
                className="
                  px-5 py-1.5 rounded-full text-sm tracking-wide
                  bg-[#0D2550] text-white font-semibold
                  hover:bg-[#123068]
                  transition-all duration-300
                "
                style={{ fontWeight: 600 }}
              >
                Find a Therapist
              </NavLink>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden text-[#0D2550] hover:text-[#00B4F0] transition-colors duration-300 p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div
              className="md:hidden flex flex-col gap-1 pb-4 pt-2 border-t border-[#0D2550]/10"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm px-4 py-2.5 rounded-lg tracking-wide transition-colors duration-300 ${isActive
                      ? "text-[#0D2550] bg-[#0D2550]/10 font-bold"
                      : "text-[#0D2550]/80 font-semibold hover:text-[#00B4F0] hover:bg-[#0D2550]/5"
                    }`
                  }
                  style={{ fontWeight: undefined }}
                >
                  {label}
                </NavLink>
              ))}

              <div className="mt-3 pt-3 border-t border-[#0D2550]/10 flex flex-col gap-2">
                <a
                  href="tel:+13019809679"
                  className="
                    text-sm text-center py-2 rounded-full tracking-wide font-semibold
                    border border-[#0D2550] text-[#0D2550]
                    hover:bg-[#0D2550] hover:text-white
                    transition-all duration-300
                  "
                >
                  Call Now
                </a>

                <NavLink
                  to="/contact-us"
                  onClick={() => setOpen(false)}
                  className="
                    text-sm text-center py-2 rounded-full tracking-wide font-semibold
                    bg-[#0D2550] text-white
                    hover:bg-[#123068]
                    transition-all duration-300
                  "
                >
                  Find a Therapist
                </NavLink>
              </div>
            </div>
          )}
        </Container>
      </nav>
    </>
  );
}