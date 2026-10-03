import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "_/\\<>[]{}=+*#01AIGENOVA";

/** Mono text that decodes from noise on mount and again on hover.
    Fragment Mono keeps every glyph the same width, so nothing reflows. */
export function Scramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const duration = 380 + text.length * 22;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * text.length);
      setOut(
        [...text]
          .map((ch, i) =>
            i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("")
      );
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [text]);

  useEffect(() => {
    const id = setTimeout(run, delay);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf.current);
      // never leave half-scrambled glyphs behind if interrupted
      setOut(text);
    };
  }, [run, delay, text]);

  return (
    <span onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  );
}
