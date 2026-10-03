import { useEffect, useId, useMemo, useRef, useState } from "react";
import { buildCluster } from "../lib/starCluster";
import css from "./StarPattern.module.css";

// Progressive blur (Figma 293:1340: 71.6px on a ~1800-wide shape, ramping from
// ~56% to ~76% down). CSS has no progressive blur, so it's built from three
// bands, each blurred more than the last, cross-faded with masks.
const BANDS = [56, 63, 70, 77];
const MAX_BLUR = 71.6 / 1807 / 1.36; // fraction of the box width (box = cluster + 18% padding each side)

interface IStarPattern {
  /** where the cluster's centre sits (any CSS length expression) */
  centerX: string;
  centerY: string;
  /** cluster width, in the parent's artboard units (the CSS var named by `unit`) */
  width: number;
  unit?: "--u" | "--f";
  opacity?: number;
  /** opacity while hovered */
  hoverOpacity?: number;
}

/** The cover's star pattern as one glassy, noisy, progressively blurred
    union of stars. It never moves; hovering it brings it up in opacity. */
export function StarPattern({
  centerX,
  centerY,
  width,
  unit = "--u",
  opacity = 1,
  hoverOpacity = 1,
}: IStarPattern) {
  const id = useId().replace(/:/g, "");
  const el = useRef<HTMLDivElement>(null);
  const { pieces, pad, d, w, h } = useMemo(buildCluster, []);
  const [hot, setHot] = useState(false);
  const alpha = hot ? hoverOpacity : opacity;
  // `width` is the cluster's width; the box adds padding so swelling stars aren't cropped
  const perUnit = width / (w - 2 * pad);
  const box = { width: w * perUnit, height: h * perUnit };

  // place every star copy once (they start collapsed in markup, see below)
  useEffect(() => {
    const node = el.current!;
    pieces.forEach((p, i) => {
      const m = `matrix(${p.matrix.join(" ")})`;
      node
        .querySelectorAll(`[data-box="${i}"]`)
        .forEach((path) => path.setAttribute("transform", `scale(${1 / w} ${1 / h}) ${m}`));
      node.querySelectorAll(`[data-user="${i}"]`).forEach((path) => path.setAttribute("transform", m));
    });
  }, [pieces, w, h]);

  const clip = { clipPath: `url(#clip-${id})` };
  const band = (i: number) => {
    const [a, b, c] = [BANDS[i - 1], BANDS[i], BANDS[i + 1]];
    const m =
      i === 0
        ? `linear-gradient(190deg, #000 ${BANDS[0]}%, transparent ${BANDS[1]}%)`
        : c === undefined
          ? `linear-gradient(190deg, transparent ${a}%, #000 ${b}%)`
          : `linear-gradient(190deg, transparent ${a}%, #000 ${b}%, transparent ${c}%)`;
    return { maskImage: m, WebkitMaskImage: m };
  };
  // start collapsed so the first paint (before the effect places them)
  // clips to nothing — an untransformed clip would show the whole box
  const stars = (attr: "data-box" | "data-user", props = {}) =>
    pieces.map((_, i) => <path key={i} d={d} transform="scale(0)" {...{ [attr]: i }} {...props} />);
  // hairline on the union's outer edge only: strokes, masked to outside the union
  const edge = (
    <svg className={css["edge"]} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <g mask={`url(#out-${id})`} stroke={`url(#rim-${id})`}>
        {stars("data-user")}
      </g>
    </svg>
  );

  return (
    <div
      ref={el}
      className={css["pattern"]}
      style={
        {
          "--w": `calc(${box.width} * var(${unit}))`,
          left: `calc(${centerX} - ${box.width / 2} * var(${unit}))`,
          top: `calc(${centerY} - ${box.height / 2} * var(${unit}))`,
          aspectRatio: `${w} / ${h}`,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <svg className={css["defs"]}>
        <defs>
          {/* a clipPath with several paths clips to their union — that's the merge */}
          <clipPath id={`clip-${id}`} clipPathUnits="objectBoundingBox">
            {stars("data-box")}
          </clipPath>
          <mask id={`out-${id}`} maskUnits="userSpaceOnUse" x={-50} y={-50} width={w + 100} height={h + 100}>
            <rect x={-50} y={-50} width={w + 100} height={h + 100} fill="#fff" />
            {stars("data-user", { fill: "#000" })}
          </mask>
          {/* Figma's stroke: a grey/white diamond gradient */}
          <radialGradient id={`rim-${id}`} cx="50%" cy="50%" r="60%" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6f6f6f" />
            <stop offset="0.28" stopColor="#fff" />
            <stop offset="0.5" stopColor="#b7b7b7" />
            <stop offset="0.71" stopColor="#dbdbdb" />
            <stop offset="0.92" stopColor="#fff" />
          </radialGradient>
        </defs>
      </svg>

      {/* sharp: true glass over whatever is behind. Mask and opacity sit on
          the glass itself — on an ancestor they'd cut off its backdrop. */}
      <div className={`${css["fill"]} ${css["glass"]} ${css["noise"]}`} style={{ ...clip, ...band(0), opacity: alpha }} />
      <div className={css["layer"]} style={{ ...band(0), opacity: alpha }}>
        {edge}
      </div>
      {/* progressively blurred bands */}
      {BANDS.slice(1).map((_, k) => (
        <div
          key={k}
          className={css["layer"]}
          style={{
            ...band(k + 1),
            opacity: alpha,
            filter: `blur(calc(var(--w) * ${(MAX_BLUR * (k + 1)) / (BANDS.length - 1)}))`,
          }}
        >
          <div className={`${css["fill"]} ${css["soft"]} ${css["noise"]}`} style={clip} />
          {edge}
        </div>
      ))}
      {/* hover target, shaped like the union */}
      <div className={css["hit"]} style={clip} onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)} />
    </div>
  );
}
