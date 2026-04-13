import { motion } from "framer-motion";
import Container from "../components/common/Container";
import { Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] md:h-[90vh] flex items-center text-white overflow-hidden">

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D2550]/80 via-[#0D2550]/50 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="max-w-xl md:max-w-2xl px-2 sm:px-4 ml-0 md:ml-6">

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >

              {/* EYEBROW */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#00B4F0]/40 bg-[#00B4F0]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4F0]" />
                <span className="font-['Rajdhani',sans-serif] font-bold text-[12px] uppercase tracking-[2px] text-[#00B4F0]">
                  Evidence-Based ABA Therapy
                </span>
              </div>

              {/* HEADING */}
              <h1 className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-[2px] text-[clamp(36px,6vw,80px)] leading-[1.05] text-white">
                Transform Behavior.
                <br />
                <span className="text-[#00B4F0]">Empower Lives.</span>
              </h1>

              {/* LINE */}
              <div className="mt-6 mb-5 w-12 h-1 bg-[#00B4F0] rounded-full" />

              {/* SUBTEXT */}
              <p className="text-[15px] sm:text-base md:text-lg text-white/70 max-w-md md:max-w-lg leading-relaxed font-sans">
                Compassionate, certified care tailored for every child and family —
                building skills and confidence for a healthier future.
              </p>

              {/* TRUST POINTS */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "Certified BCBAs",
                  "In-home & clinic",
                  "Insurance accepted",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-[14px] text-white/70 font-sans"
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="text-[#00B4F0]"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">

                <motion.a
                  href="/contact-us"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-['Rajdhani',sans-serif] font-bold uppercase tracking-[1px] text-[15px] text-[#0D2550] bg-[#00B4F0] hover:bg-[#33BEF5] hover:shadow-[0_8px_24px_rgba(0,180,240,0.4)] transition-all duration-300 text-center"
                >
                  Start Therapy Today
                </motion.a>

                <motion.a
                  href="/services"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-['Rajdhani',sans-serif] font-bold uppercase tracking-[1px] text-[15px] text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 text-center"
                >
                  Explore Services
                </motion.a>

              </div>

            </motion.div>
          </div>
        </Container>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0D2550] to-transparent" />
    </section>
  );
}