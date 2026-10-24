
import { useEffect, useRef } from "react";
import { gsap, reduced } from "../motion";
import { ICONS } from "../data/icons";
import { TECHS } from "../data/content";

export default function Icon({ name, pop = false }) {
  const ref = useRef(null);

  // Recherche d'un logo officiel dans les technologies
  const tech = TECHS.find(
    (item) => item.name.toLowerCase() === name?.toLowerCase()
  );

  const Logo = tech?.icon;
  const SvgIcon = ICONS[name];

  useEffect(() => {
    if (reduced || Logo || !SvgIcon || !ref.current) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: ref.current,
        start: "top 88%",
        once: true,
      };

      gsap.fromTo(
        "path",
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger,
        }
      );

      if (pop) {
        gsap.from(ref.current, {
          scale: 0,
          rotate: -90,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger,
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [pop, Logo, SvgIcon]);

  return (
    <div className="ic" ref={ref}>
      {Logo ? (
        <Logo aria-hidden="true" />
      ) : SvgIcon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {SvgIcon}
        </svg>
      ) : null}
    </div>
  );
}
