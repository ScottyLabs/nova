import { useEffect } from "react";

/** Eases --px/--py (-1…1, pointer relative to viewport centre) onto every
    [data-parallax] element, so its layers can move with
    `calc(var(--px) * depth)`. Scoped there — setting them on <html> would
    restyle the whole page every frame. */
export function usePointerField() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = () => document.querySelectorAll<HTMLElement>("[data-parallax]");
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      const px = x.toFixed(4), py = y.toFixed(4);
      targets().forEach((el) => {
        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      });
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
