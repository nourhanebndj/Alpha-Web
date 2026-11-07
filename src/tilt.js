import { gsap, reduced } from "./motion";

/**
 * Inclinaison 3D et reflet qui suivent la souris sur les éléments indiqués.
 * Passe par des variables CSS pour ne pas entrer en conflit avec les animations
 * d'apparition, qui agissent directement sur `transform`.
 * Sans effet sur écran tactile. Retourne une fonction de nettoyage.
 */
export function enableTilt(root, selector, maxAngle = 7) {
  if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return () => {};

  const cleanups = [...root.querySelectorAll(selector)].map((el) => {
    el.classList.add("tilt");

    const move = (e) => {
      const box = el.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width;
      const y = (e.clientY - box.top) / box.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      gsap.to(el, {
        "--ry": `${(x - 0.5) * maxAngle * 2}deg`,
        "--rx": `${(0.5 - y) * maxAngle * 2}deg`,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const enter = () => el.classList.add("hot");
    const leave = () => {
      el.classList.remove("hot");
      gsap.to(el, { "--ry": "0deg", "--rx": "0deg", duration: 0.8, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
      el.classList.remove("tilt", "hot");
    };
  });

  return () => cleanups.forEach((clean) => clean());
}
