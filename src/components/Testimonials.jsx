import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "../motion";
import useAutoplay from "../hooks/useAutoplay";
import Head from "./Head";
import Words from "./Words";
import { TESTIMONIALS } from "../data/content";

const N = TESTIMONIALS.length;
const initials = (name) => name.split(" ").map((x) => x[0]).join("");

const Chevron = ({ d }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function Testimonials() {
  const root = useRef(null);
  const card = useRef(null);
  const quote = useRef(null);
  const { active, select, setBar, hoverProps } = useAutoplay({
    count: N,
    duration: 6,
    triggerRef: root,
    start: "top 75%",
    end: "bottom 25%",
  });

  // `active` = onglet sélectionné ; `shown` = avis affiché (change après la sortie animée)
  const [shown, setShown] = useState(0);
  const prevActive = useRef(0);
  const prevShown = useRef(0);

  // 1) sortie animée de l'ancien avis, puis changement de contenu
  useEffect(() => {
    if (active === prevActive.current) return;
    prevActive.current = active;
    if (reduced) {
      setShown(active);
      return;
    }
    const words = quote.current.querySelectorAll(".wi");
    const tween = gsap.to(words, { yPercent: -110, duration: 0.3, stagger: 0.01, ease: "power2.in", onComplete: () => setShown(active) });
    return () => tween.kill();
  }, [active]);

  // 2) entrée animée du nouvel avis
  useEffect(() => {
    if (shown === prevShown.current) return;
    prevShown.current = shown;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".wi", { yPercent: 110, duration: 0.6, stagger: 0.025, ease: "power3.out" });
      gsap.from(".av", { scale: 0, rotate: -90, duration: 0.5, ease: "back.out(2)" });
      gsap.from(".who b, .who small", { x: -14, opacity: 0, stagger: 0.08, duration: 0.4 });
      gsap.from(".stars i", { scale: 0, stagger: 0.08, duration: 0.4, ease: "back.out(3)" });
      gsap.fromTo(".qm", { rotate: -15, y: 20 }, { rotate: 0, y: 0, duration: 0.8, ease: "power3.out" });
    }, card);
    return () => ctx.revert();
  }, [shown]);

  const t = TESTIMONIALS[shown];

  return (
    <section id="avis" ref={root}>
      <div className="wrap">
        <Head title="Ils nous font confiance" text="Ce que disent nos clients après la mise en ligne." />
        <div className="ts rv" {...hoverProps}>
          <div className="tq" ref={card}>
            <span className="qm" aria-hidden="true">
              “
            </span>
            <div className="stars" role="img" aria-label="5 étoiles sur 5">
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i}>★</i>
              ))}
            </div>
            <blockquote key={shown} ref={quote} aria-live="polite">
              <Words text={t.quote} />
            </blockquote>
            <div className="who">
              <span className="av" aria-hidden="true">
                {initials(t.name)}
              </span>
              <div>
                <b>{t.name}</b>
                <small>
                  {t.role}, {t.sector}
                </small>
              </div>
            </div>
          </div>
          <div className="tnav">
            <div className="ttabs" role="tablist" aria-label="Choisir un avis">
              {TESTIMONIALS.map((x, i) => (
                <button key={x.name} role="tab" aria-selected={active === i} onClick={() => select(i)}>
                  <b>{x.name.split(" ")[0]}</b>
                  <small>{x.sector}</small>
                  <i className="pb" ref={setBar(i)} />
                </button>
              ))}
            </div>
            <div className="arr">
              <button aria-label="Avis précédent" onClick={() => select((active - 1 + N) % N)}>
                <Chevron d="M15 18l-6-6 6-6" />
              </button>
              <button aria-label="Avis suivant" onClick={() => select((active + 1) % N)}>
                <Chevron d="M9 18l6-6-6-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
