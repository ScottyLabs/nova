import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "_/\\<>[]{}=+*#01AIGENOVA";

const noise = (text: string) =>
  [...text].map((ch) => (ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");

/** Text that decodes from noise — on mount, or when it scrolls into view with
    `onView` — and again on hover. In Fragment Mono every glyph is the same
    width, so nothing reflows. */
export function Scramble({
  text,
  delay = 0,
  onView = false,
  play = true,
}: {
  text: string;
  delay?: number;
  onView?: boolean;
  /** hold the decode until this turns true (e.g. the hero intro) */
  play?: boolean;
}) {
  // waiting (for the viewport or `play`): start as noise so the decode has something to resolve
  const [out, setOut] = useState(() =>
    (onView || !play) && !matchMedia("(prefers-reduced-motion: reduce)").matches ? noise(text) : text
  );
  const raf = useRef(0);
  const el = useRef<HTMLSpanElement>(null);

  const run = useCallback(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const duration = 380 + text.length * 22;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * text.length);
      setOut(text.slice(0, settled) + noise(text.slice(settled)));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [text]);

  useEffect(() => {
    if (!play) return;
    let id = 0;
    let io: IntersectionObserver | undefined;
    if (onView && el.current) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          id = window.setTimeout(run, delay);
        },
        // no inset: footer type sits at the very bottom of the page, and an
        // inset viewport would never reach it
        { threshold: 0 }
      );
      io.observe(el.current);
    } else {
      id = window.setTimeout(run, delay);
    }
    return () => {
      io?.disconnect();
      clearTimeout(id);
      cancelAnimationFrame(raf.current);
      // never leave half-scrambled glyphs behind if interrupted
      setOut(text);
    };
  }, [run, delay, text, onView, play]);

  return (
    <span ref={el} onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  );
}
