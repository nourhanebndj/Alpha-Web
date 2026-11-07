import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "../motion";
import { NAV } from "../data/content";
import { LANGUAGES } from "../i18n";

export default function Header() {
  const { t, i18n } = useTranslation();
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
        <a className="logo" href="#top" aria-label={t("header.home")}>
          <img className="lg" src="/logo.png" alt="" width="45" height="36" />
          <span>
            ALPHA <i>WEB</i>
          </span>
        </a>
        <nav className={open ? "open" : ""} aria-label={t("header.mainNav")} onClick={(e) => e.target.closest("a") && setOpen(false)}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {t(`nav.${n.key}`)}
            </a>
          ))}
        </nav>
        <div className="bar-end">
          <div className="langs" role="group" aria-label={t("header.language")}>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                lang={l.code}
                title={l.name}
                aria-label={l.name}
                aria-pressed={i18n.language === l.code}
                onClick={() => i18n.changeLanguage(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a className="btn" href="#contact">
            {t("header.quote")}
          </a>
          <button className="burger" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {t("header.menu")}
          </button>
        </div>
      </div>
      <div id="pg" ref={progress} />
    </header>
  );
}
