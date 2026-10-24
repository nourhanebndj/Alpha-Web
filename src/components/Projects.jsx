import { useEffect, useRef } from "react";
import { gsap, reduced } from "../motion";
import Head from "./Head";
import { PROJECTS } from "../data/content";

function Project({ p }) {
  const root = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (reduced || !root.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: 20 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const handleHover = (active) => {
    if (reduced || !imageRef.current) return;

    gsap.to(imageRef.current, {
      scale: active ? 1.06 : 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <article
      className="pj rv"
      ref={root}
      onPointerEnter={() => handleHover(true)}
      onPointerLeave={() => handleHover(false)}
    >
      <div className="th">
        <img
          ref={imageRef}
          className="project-image"
          src={p.image}
          alt={p.alt}
          loading="lazy"
        />
      </div>

      <small>{p.kind}</small>
      <h3>{p.title}</h3>
      <p>{p.text}</p>
      <a
        className="project-link"
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visiter le site
        <span aria-hidden="true"> ↗</span>
      </a>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="realisations">
      <div className="wrap">
        <Head
          title="Mes réalisations"
          text="Découvrez une sélection de projets conçus pour répondre à des besoins concrets."
        />

        <div className="work">
          {PROJECTS.map((p) => (
            <Project key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}