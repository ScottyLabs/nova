import type { CSSProperties } from "react";

// CSS has no progressive blur, so fake Figma's: a sharp copy fading out while
// copies blurred progressively harder fade in, band by band, along `angle`.
const STEPS = 3;

interface IProgressiveBlur {
  src: string;
  /** CSS gradient angle the blur grows along */
  angle: number;
  /** where blurring starts / reaches full strength, % along that direction */
  from: number;
  to: number;
  /** full-strength blur (CSS length; Figma's radius ÷ 2) */
  blur: string;
  className?: string;
}

export function ProgressiveBlur({ src, angle, from, to, blur, className }: IProgressiveBlur) {
  const stops = Array.from({ length: STEPS + 1 }, (_, i) => from + ((to - from) * i) / STEPS);
  const mask = (i: number): CSSProperties => {
    const g =
      i === 0
        ? `linear-gradient(${angle}deg, #000 ${stops[0]}%, transparent ${stops[1]}%)`
        : i === STEPS
          ? `linear-gradient(${angle}deg, transparent ${stops[i - 1]}%, #000 ${stops[i]}%)`
          : `linear-gradient(${angle}deg, transparent ${stops[i - 1]}%, #000 ${stops[i]}%, transparent ${stops[i + 1]}%)`;
    return { maskImage: g, WebkitMaskImage: g };
  };
  return (
    <>
      {stops.map((_, i) => (
        <img
          key={i}
          className={className}
          src={src}
          alt=""
          style={{ ...mask(i), filter: i ? `blur(calc(${blur} * ${i / STEPS}))` : undefined }}
        />
      ))}
    </>
  );
}
