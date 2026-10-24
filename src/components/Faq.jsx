import { useEffect, useRef, useState } from "react";
import { gsap } from "../motion";
import Head from "./Head";
import { FAQ } from "../data/content";

export default function Faq() {
  const [open, setOpen] = useState(-1);
  const panels = useRef([]);

  // Ouvre la réponse choisie et referme les autres (hauteur animée)
  useEffect(() => {
    panels.current.forEach((p, i) => {
      if (!p) return;
      const isOpen = i === open;
      gsap.to(p, {
        height: isOpen ? p.scrollHeight : 0,
        duration: 0.45,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: () => {
          if (isOpen) gsap.set(p, { height: "auto" }); // reste correct si la fenêtre est redimensionnée
        },
      });
    });
  }, [open]);

  return (
    <section id="faq">
      <div className="wrap">
        <Head title="Questions fréquentes" />
        <div className="faq rv">
          {FAQ.map((f, i) => (
            <div key={f.q} className={open === i ? "open" : ""}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <i>+</i>
              </button>
              <p ref={(el) => (panels.current[i] = el)}>
                <span>{f.a}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
