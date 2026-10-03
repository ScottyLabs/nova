import { useEffect, useRef, useState } from "react";
import orbit from "../assets/cover/nova-orbit.svg";
import svgSource from "../assets/cover/nova-orbit.svg?raw";
import type { createMetalWordmark } from "../lib/metalWordmark";
import css from "./Wordmark.module.css";

type Metal = ReturnType<typeof createMetalWordmark>;

/** NOVA orbit wordmark (340:1616). Flat white; on hover it turns into spinning 3D
    chrome (three.js, loaded in the background once the page is idle). */
export function Wordmark({ className }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const metal = useRef<Metal | null>(null);
  const hovering = useRef(false);
  const [live, setLive] = useState(false); // 3D showing instead of the flat mark

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    const load = () =>
      import("../lib/metalWordmark").then(({ createMetalWordmark }) => {
        if (cancelled || !stage.current) return;
        metal.current = createMetalWordmark(stage.current, svgSource, () => {
          if (!hovering.current) setLive(false);
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

  const enter = () => {
    hovering.current = true;
    // the whole page goes to black around the mark (see [data-void] in index.css)
    document.documentElement.dataset.void = "";
    if (!metal.current) return;
    setLive(true);
    metal.current.setHover(true);
  };
  const leave = () => {
    hovering.current = false;
    delete document.documentElement.dataset.void;
    metal.current?.setHover(false);
  };
  const move = (e: React.PointerEvent) => {
    const b = e.currentTarget.getBoundingClientRect();
    metal.current?.setTilt(((e.clientY - b.top) / b.height) * 2 - 1);
  };

  return (
    <div
      className={`${css["wordmark"]} ${className ?? ""}`}
      data-live={live || undefined}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onPointerMove={move}
    >
      <img className={css["logo"]} src={orbit} alt="NOVA" />
      <div ref={stage} className={css["metal"]} aria-hidden />
    </div>
  );
}
