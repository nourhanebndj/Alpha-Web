import { useEffect, useRef } from "react";
import { gsap, reduced } from "../motion";
import { STATS } from "../data/content";

const format = (s, v) => `${s.prefix}${Math.round(v)}${s.suffix}`;

export default function Stats() {
  const root = useRef(null);
  const nums = useRef([]);

  useEffect(() => {
    // Mouvement réduit : valeurs finales directement
    if (reduced) {
      STATS.forEach((s, i) => (nums.current[i].textContent = format(s, s.n)));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from(".sg > div", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      STATS.forEach((s, i) => {
        const el = nums.current[i];
        const o = { v: 0 };
        gsap.to(o, {
          v: s.n,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = format(s, o.v)),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" ref={root}>
      <div className="wrap sg">
        {STATS.map((s, i) => (
          <div key={s.label}>
            <strong ref={(el) => (nums.current[i] = el)}>0</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
