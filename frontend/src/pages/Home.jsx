import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import Services from "../sections/Services";
import WhyUs from "../sections/WhyUs";
import FAQ from "../sections/FAQ";
import CTA from "../sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <FAQ />
      <CTA />
    </>
  );
}