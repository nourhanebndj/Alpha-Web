import { useEffect, useRef, useState } from "react";
import { gsap } from "../motion";
import { NAV } from "../data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef(null);

  // Barre de progression de lecture + ombre de l'en-tête
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      gsap.set(progress.current, { scaleX: h > 0 ? window.scrollY / h : 0 });
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "sc" : ""}>
      <div className="wrap bar">
        <a className="logo" href="#top" aria-label="Alpha Web, accueil">
          <img className="lg" src="/logo.png" alt="" width="45" height="36" />
          <span>
            ALPHA <i>WEB</i>
          </span>
        </a>
        <nav className={open ? "open" : ""} aria-label="Navigation principale" onClick={(e) => e.target.closest("a") && setOpen(false)}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="btn" href="#contact">
          Demander un devis
        </a>
        <button className="burger" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          Menu
        </button>
      </div>
      <div id="pg" ref={progress} />
    </header>
  );
}
