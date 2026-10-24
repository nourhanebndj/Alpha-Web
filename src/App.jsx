import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, reduced } from "./motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Strip from "./components/Strip";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Commitments from "./components/Commitments";
import Projects from "./components/Projects";
import Method from "./components/Method";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const root = useRef(null);

  // Apparition douce (fondu + montée) de tous les blocs marqués .rv, groupés par lots
  useEffect(() => {
    if (reduced) return;
    const batch = ScrollTrigger.batch(root.current.querySelectorAll(".rv"), {
      start: "top 88%",
      once: true,
      onEnter: (els) => gsap.from(els, { opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "all" }),
    });
    // Recalcule les positions une fois la police chargée
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => batch.forEach((st) => st.kill());
  }, []);

  return (
    <div ref={root}>
      <Header />
      <main id="top">
        <Hero />
        <Strip />
        <Services />
        <Stats />
        <Commitments />
        <Projects />
        <Method />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
