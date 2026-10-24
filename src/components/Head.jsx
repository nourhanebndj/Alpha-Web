import { useEffect, useRef } from "react";
import { gsap, reduced } from "../motion";
import Words from "./Words";

// En-tête de section : titre animé mot par mot au défilement.
export default function Head({ title, text }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".wi", {
        yPercent: 115,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="head rv" ref={ref}>
      <h2>
        <Words text={title} />
      </h2>
      {text && <p>{text}</p>}
    </div>
  );
}
