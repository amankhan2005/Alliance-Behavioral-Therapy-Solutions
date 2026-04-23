 import { MapPin, Phone, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" },
];

const contactInfo = [
  {
    icon: MapPin,
    content: "5921 Gentle Call, Clarksville, MD 21029",
  },
  {
    icon: Phone,
    content: {
      text: "(301) 980-9679",
      href: "tel:+13019809679",
      isLink: true,
    },
  },
  {
    icon: FileText,
    content: {
      text: "(301) 890-6517",
      href: null,
      isLink: false,
    },
  },
  {
    icon: Mail,
    content: {
      text: "info@alliancebehavioraltherapysolutions.com",
      href: "mailto:info@alliancebehavioraltherapysolutions.com",
      isLink: true,
      isEmail: true,
    },
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#091B3D] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-left md:text-left">

          {/* COL 1 — BRAND */}
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-5 block">
              <img
                src={logo}
                alt="Alliance Behavioral Therapy Solutions logo"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <h2 className="font-['Rajdhani',sans-serif] font-bold text-lg tracking-wide text-white mb-3">
              Alliance Behavioral Therapy Solutions, LLC
            </h2>
            <p className="text-sm text-white leading-relaxed max-w-xs font-sans">
              Compassionate, evidence-based behavioral and autism therapy supporting children and families with personalized care.
            </p>
          </div>

          {/* COL 2 — QUICK LINKS */}
          <div className="flex flex-col items-start">
            <h3 className="font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-[2px] text-[#00B4F0] mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 w-full">
              {navLinks.map(({ label, href }) => (
                <li key={href} className="flex justify-start">
                  <Link
                    to={href}
                    className="
                      relative inline-block font-['Rajdhani',sans-serif] font-semibold 
                      text-sm text-white hover:text-[#00B4F0] 
                      transition-colors duration-300
                      after:absolute after:left-0 after:-bottom-0.5
                      after:h-[1.5px] after:w-full after:rounded-full
                      after:bg-[#00B4F0] after:scale-x-0 after:origin-left
                      after:transition-transform after:duration-300
                      hover:after:scale-x-100
                    "
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — CONTACT */}
          <div className="flex flex-col items-start">
            <h3 className="font-['Rajdhani',sans-serif] font-bold text-sm uppercase tracking-[2px] text-[#00B4F0] mb-5">
              Contact
            </h3>

            <ul className="space-y-4 w-full">
              {contactInfo.map(({ icon: Icon, label, content }, idx) => {
                const displayText = typeof content === 'string' ? content : content.text;
                const linkHref = typeof content === 'object' ? content.href : null;
                const isEmail = typeof content === 'object' ? content.isEmail : false;
                
                const TextElement = linkHref 
                  ? <a href={linkHref} className={`font-sans hover:text-[#00B4F0] transition-colors duration-300 ${isEmail ? 'break-all' : ''}`}>{displayText}</a>
                  : <span className="font-sans">{displayText}</span>;

                return (
                  <li
                    key={idx}
                    className="flex items-start gap-3 justify-start text-sm text-white"
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-[#00B4F0]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col">
                      {label && <span className="text-[11px] uppercase tracking-wider text-white mb-0.5 font-['Rajdhani',sans-serif] font-bold">{label}</span>}
                      {TextElement}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-white/40 font-sans">
          <p>
            &copy; {currentYear} Alliance Behavioral Therapy Solutions, LLC. All rights reserved.
          </p>
          <p className="font-['Rajdhani',sans-serif] font-semibold">
            Designed &amp; Developed by{" "}
            <a
              href="https://www.webieapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-white/60 hover:text-[#00B4F0] transition-colors duration-300"
            >
              Webieapp Solution
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}