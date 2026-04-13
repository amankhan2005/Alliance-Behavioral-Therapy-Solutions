import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";

import NotFound from "../pages/NotFound";

// ✅ Import scroll components
import ScrollToTop from "../components/ScrollToTop";
import RouteScrollTop from "../components/RouteScrollTop";

export default function AppRoutes() {
  return (
    <>
      {/* ✅ Global scroll reset on route change */}
      <ScrollToTop />

      {/* ✅ Optional route-based scroll logic */}
      <RouteScrollTop />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact-us" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}