import { useEffect, useRef } from "react";
import { gsap, reduced } from "../motion";
import Words from "./Words";

export default function Hero() {
  const root = useRef(null);
  const mock = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from("h1 .wi", { yPercent: 115, rotate: 5, duration: 0.9, stagger: 0.07, ease: "power4.out" });
      gsap.from(".h-a", { opacity: 0, y: 28, duration: 0.8, stagger: 0.12, delay: 0.25, ease: "power3.out" });
      gsap.from(".h-b", { opacity: 0, x: 40, duration: 1, delay: 0.3, ease: "power3.out" });
      gsap.to(".float-win", { y: -10, repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" });
      gsap.to(".float-phone", { y: 8, repeat: -1, yoyo: true, duration: 3.4, ease: "sine.inOut" });
      gsap.from(".bdg", { scale: 0.6, opacity: 0, duration: 0.7, delay: 1, stagger: 0.2, ease: "back.out(2)" });
      gsap.to(".b1", { y: -8, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut" });
      gsap.to(".b2", { y: 8, repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" });
      gsap.to(".blob", { rotate: 360, duration: 40, repeat: -1, ease: "none" });
    }, root);
    return () => ctx.revert();
  }, []);

  // Légère inclinaison 3D de la maquette qui suit la souris (souris uniquement)
  const onPointerMove = (e) => {
    if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    gsap.to(mock.current, { rotationY: x * 10, rotationX: -y * 8, transformPerspective: 900, duration: 0.6, overwrite: "auto" });
  };

  return (
    <section className="hero" ref={root} onPointerMove={onPointerMove}>
      <div className="wrap hg">
        <div>
          <span className="tag h-a">
            <b>Sites web · Applications · Logiciels ERP</b>
          </span>
        
            <h1>
              <Words text="Vos projets" />{" "}
              <u>
                <Words text="digitaux" />
              </u>{" "}
              <Words text="prennent vie" />
            </h1>
            <p className="h-a">
              Sites web, applications mobiles et logiciels ERP : des solutions adaptées à vos besoins.
            </p>
          <div className="cta h-a">
            <a className="btn" href="#contact">
              Parler de votre projet
            </a>
            <a className="btn out" href="#realisations">
              Voir nos réalisations
            </a>
          </div>
        </div>

        <div className="mock h-b" ref={mock} aria-hidden="true">
          <div className="blob" />
          <div className="win float-win">
            <div className="top">
              <i />
              <i />
              <i />
            </div>
            <div className="body">
              <b className="h" />
              <b />
              <b style={{ width: "80%" }} />
              <div className="row">
                <u />
                <u />
                <u />
              </div>
              <b style={{ width: "45%" }} />
            </div>
          </div>
          <div className="bdg b1">
            <b>+10</b>projets livrés
          </div>
          <div className="bdg b2">
            <b>4.5/5</b>satisfaction client
          </div>
          <div className="phone float-phone">
            <i />
            <i />
            <i />
            <u />
            <u style={{ background: "var(--gold)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
