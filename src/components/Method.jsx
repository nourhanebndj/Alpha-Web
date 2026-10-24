import { useEffect, useRef } from "react";
import { gsap, reduced } from "../motion";
import useAutoplay from "../hooks/useAutoplay";
import Head from "./Head";
import { STEPS } from "../data/content";

export default function Method() {
  const root = useRef(null);
  const panel = useRef(null);
  const { active, select, setBar, hoverProps } = useAutoplay({
    count: STEPS.length,
    duration: 5,
    triggerRef: root,
    start: "top 70%",
    end: "bottom 20%",
  });
  const step = STEPS[active];

  // Animation d'entrée du contenu à chaque changement d'étape
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(panel.current.children, { y: 24, opacity: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" });
    }, panel);
    return () => ctx.revert();
  }, [active]);

  return (
    <section className="soft" id="methode" ref={root}>
      <div className="wrap">
        <Head title="De l’idée au produit en ligne, en quatre étapes" text="Un processus clair, avec votre validation à chaque étape." />
        <div className="stg rv" {...hoverProps}>
          <div className="stl" role="tablist" aria-label="Étapes du projet">
            {STEPS.map((s, i) => (
              <button key={s.title} role="tab" aria-selected={active === i} onClick={() => select(i)}>
                <span className="n">{i + 1}</span>
                <span>
                  <b>{s.title}</b>
                  <small>{s.short}</small>
                </span>
                <i className="pb" ref={setBar(i)} />
              </button>
            ))}
          </div>
          <div className="stp" ref={panel} role="tabpanel" aria-live="polite">
            <span className="bn">{active + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <div className="tg">
              {step.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
