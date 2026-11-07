import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap, ScrollTrigger, reduced } from "./motion";
import { enableTilt } from "./tilt";
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

function Page() {
  const root = useRef(null);

  // Apparition en profondeur (bascule 3D + fondu) des blocs marqués .rv, groupés par lots
  useEffect(() => {
    if (reduced) return;
    const blocks = root.current.querySelectorAll(".rv");
    gsap.set(blocks, { autoAlpha: 0, y: 46, rotationX: -18, z: -40, transformPerspective: 1100, transformOrigin: "50% 100%" });
    const batch = ScrollTrigger.batch(blocks, {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, rotationX: 0, z: 0, duration: 0.95, stagger: 0.11, ease: "power3.out", clearProps: "all" }),
    });
    // Recalcule les positions une fois la police chargée
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      batch.forEach((st) => st.kill());
      gsap.set(blocks, { clearProps: "all" });
    };
  }, []);

  // Inclinaison 3D au survol des cartes et des visuels
  useEffect(() => {
    const cleanups = [
      enableTilt(root.current, ".card", 7),
      enableTilt(root.current, ".pj .th", 8),
      enableTilt(root.current, ".stp, .tq", 3),
    ];
    return () => cleanups.forEach((clean) => clean());
  }, []);

  return (
    <div className="page" ref={root}>
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

export default function App() {
  const { i18n } = useTranslation();

  // Changer de langue recrée la page : animations et positions repartent du nouveau texte,
  // dont la longueur et le sens de lecture diffèrent. L'en-tête reste en place.
  return (
    <>
      <Header />
      <Page key={i18n.language} />
    </>
  );
}
