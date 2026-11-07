import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap, reduced } from "../motion";
import Words from "./Words";

export default function Hero() {
  const { t } = useTranslation();
  const root = useRef(null);
  const gl = useRef(null);
  const stage = useRef(null);
  const [glState, setGlState] = useState("loading");

  // La scène 3D est chargée à part pour ne pas ralentir l'affichage du texte
  useEffect(() => {
    let destroy;
    let cancelled = false;
    import("../three/heroScene")
      .then(({ createHeroScene }) => {
        if (cancelled) return;
        destroy = createHeroScene({ host: gl.current, hero: root.current, stage: stage.current, reduced });
        setGlState("ready");
      })
      .catch((error) => {
        console.warn("Scène 3D indisponible :", error);
        if (!cancelled) setGlState("off");
      });
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from("h1 .wi", { yPercent: 115, rotationX: -70, transformPerspective: 700, transformOrigin: "50% 100%", duration: 1, stagger: 0.07, ease: "power4.out" });
      gsap.from(".h-a", { opacity: 0, y: 28, duration: 0.8, stagger: 0.12, delay: 0.25, ease: "power3.out" });
      gsap.fromTo(".bdg", { scale: 0.6, opacity: 0, z: 0 }, { scale: 1, opacity: 1, z: 70, duration: 0.8, delay: 1.1, stagger: 0.2, ease: "back.out(2)" });
      gsap.to(".b1", { y: -10, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut" });
      gsap.to(".b2", { y: 10, repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" });
      // Le texte s'éloigne en profondeur quand on quitte le hero
      gsap.to(".hero-copy", {
        y: -70,
        z: -120,
        rotationX: 10,
        transformPerspective: 1000,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 25%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Les badges suivent la souris et flottent devant le logo
  const onPointerMove = (e) => {
    if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    gsap.to(stage.current, { rotationY: x * 14, rotationX: -y * 10, transformPerspective: 900, duration: 0.7, overwrite: "auto" });
  };

  return (
    <section className="hero" ref={root} onPointerMove={onPointerMove}>
      <div className={`hero-gl ${glState}`} ref={gl} aria-hidden="true" />
      <div className="wrap hg">
        <div className="hero-copy">
          <span className="tag h-a">
            <b>{t("hero.tag")}</b>
          </span>

          <h1>
            <Words text={t("hero.titleStart")} />{" "}
            <u>
              <Words text={t("hero.titleAccent")} />
            </u>{" "}
            <Words text={t("hero.titleEnd")} />
          </h1>
          <p className="h-a">
            {t("hero.text")}
          </p>
          <div className="cta h-a">
            <a className="btn" href="#contact">
              {t("hero.ctaTalk")}
            </a>
            <a className="btn out" href="#realisations">
              {t("hero.ctaWork")}
            </a>
          </div>
        </div>

        <div className="mock" ref={stage} aria-hidden="true">
          {glState === "off" && <img className="mock-logo" src="/logo.png" alt="" />}
          <div className="bdg b1">
            <b>+10</b> {t("hero.badgeProjects")}
          </div>
          <div className="bdg b2">
            <b dir="ltr">4.5/5</b> {t("hero.badgeSatisfaction")}
          </div>
        </div>
      </div>
    </section>
  );
}
