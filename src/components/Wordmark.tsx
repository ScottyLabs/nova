import { useEffect, useRef, useState } from "react";
import orbit from "../assets/cover/nova-orbit.svg";
import svgSource from "../assets/cover/nova-orbit.svg?raw";
import type { createMetalWordmark } from "../lib/metalWordmark";
import css from "./Wordmark.module.css";

type Metal = ReturnType<typeof createMetalWordmark>;

/** NOVA orbit wordmark (340:1616). Flat white; on hover it turns into spinning
    3D chrome (three.js, loaded in the background once the page is idle). On
    touch screens a tap plays one quick chrome twirl on the black page. */
export function Wordmark({ className }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const metal = useRef<Metal | null>(null);
  const hovering = useRef(false);
  const [live, setLive] = useState(false); // 3D showing instead of the flat mark

  useEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    const load = () =>
      import("../lib/metalWordmark").then(({ createMetalWordmark }) => {
        if (cancelled || !stage.current) return;
        metal.current = createMetalWordmark(stage.current, svgSource, () => {
          if (hovering.current) return;
          setLive(false);
          delete document.documentElement.dataset.void;
        });
        if (hovering.current) metal.current.setHover(true);
      });
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
    idle(() => void load());
    return () => {
      cancelled = true;
      delete document.documentElement.dataset.void;
      metal.current?.dispose();
      metal.current = null;
    };
  }, []);

  // touch screens have no hover: a tap drops the page to black and gives the
  // chrome NOVA one quick twirl. If the 3D hasn't loaded yet, the flat mark
  // twirls instead, so a tap always does something.
  const logo = useRef<HTMLImageElement>(null);
  const tap = () => {
    if (!matchMedia("(hover: none)").matches) return;
    document.documentElement.dataset.void = "";
    if (metal.current) {
      setLive(true);
      metal.current.spinOnce();
      return;
    }
    const el = logo.current;
    if (!el) return;
    el.classList.remove(css["twirl"]);
    void el.offsetWidth; // restart the animation on every tap
    el.classList.add(css["twirl"]);
  };
  const twirled = () => {
    logo.current?.classList.remove(css["twirl"]);
    delete document.documentElement.dataset.void;
  };
  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hovering.current = true;
    // the whole page goes to black around the mark (see [data-void] in index.css)
    document.documentElement.dataset.void = "";
    if (!metal.current) return;
    setLive(true);
    metal.current.setHover(true);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hovering.current = false;
    delete document.documentElement.dataset.void;
    metal.current?.setHover(false);
  };

  return (
    <div
      className={`${css["wordmark"]} ${className ?? ""}`}
      data-live={live || undefined}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onClick={tap}
    >
      <img ref={logo} className={css["logo"]} src={orbit} alt="NOVA" onAnimationEnd={twirled} />
      <div ref={stage} className={css["metal"]} aria-hidden />
    </div>
  );
}
