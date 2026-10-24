import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reduced } from "../motion";

/**
 * Carrousel automatique avec barre de progression.
 * - avance toutes les `duration` secondes, uniquement quand la section est visible
 * - se met en pause au survol
 * - `setBar(i)` : ref callback de la barre de progression de l'onglet i
 */
export default function useAutoplay({ count, duration, triggerRef, start, end }) {
  const [active, setActive] = useState(0);
  const bars = useRef([]);
  const tween = useRef(null);
  const inView = useRef(false);
  const hover = useRef(false);

  const sync = useCallback(() => {
    tween.current?.paused(!inView.current || hover.current);
  }, []);

  // Minuteur de l'élément actif
  useEffect(() => {
    if (reduced) return;
    bars.current.forEach((b) => b && gsap.set(b, { scaleX: 0 }));
    const bar = bars.current[active];
    if (!bar) return;
    tween.current = gsap.to(bar, {
      scaleX: 1,
      duration,
      ease: "none",
      onComplete: () => setActive((a) => (a + 1) % count),
    });
    sync();
    return () => tween.current?.kill();
  }, [active, count, duration, sync]);

  // Pause quand la section n'est pas visible
  useEffect(() => {
    if (reduced || !triggerRef.current) return;
    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start,
      end,
      onToggle: (self) => {
        inView.current = self.isActive;
        sync();
      },
    });
    inView.current = st.isActive;
    sync();
    return () => st.kill();
  }, [triggerRef, start, end, sync]);

  const hoverProps = {
    onPointerEnter: () => {
      hover.current = true;
      sync();
    },
    onPointerLeave: () => {
      hover.current = false;
      sync();
    },
  };

  const setBar = (i) => (el) => {
    bars.current[i] = el;
  };

  return { active, select: setActive, setBar, hoverProps };
}
