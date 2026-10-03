import { useEffect, useId, useMemo, useRef } from "react";
import { buildCluster } from "../lib/starCluster";
import css from "./StarPattern.module.css";

// Progressive blur (Figma 293:1340: 71.6px on a ~1800-wide shape, ramping from
// ~56% to ~76% down). CSS has no progressive blur, so it's built from three
// bands, each blurred more than the last, cross-faded with masks.
const BANDS = [56, 63, 70, 77];
const MAX_BLUR = 71.6 / 1807 / 1.36; // fraction of the box width (box = cluster + 18% padding each side)

// Hover: star groups near the cursor swell and lean away from it, each
// spiky copy a little more than its group, then spring back when it leaves.
const REACH = 380; // cluster units: how far the cursor's influence spreads
const PUSH = 70; // max drift away from the cursor, cluster units
const SWELL = 0.1; // max extra scale
const EASE = 0.12; // spring step per frame


interface IStarPattern {
  /** where the cluster's centre sits (any CSS length expression) */
  centerX: string;
  centerY: string;
  /** cluster width, in the parent's artboard units (the CSS var named by `unit`) */
  width: number;
  unit?: "--u" | "--f";
  opacity?: number;
}

/** The cover's star pattern as one glassy, noisy, progressively blurred
    union of stars. Hovering it makes the stars near the cursor swell and
    lean away, springing back when the cursor leaves. */
export function StarPattern({ centerX, centerY, width, unit = "--u", opacity = 1 }: IStarPattern) {
  const id = useId().replace(/:/g, "");
  const el = useRef<HTMLDivElement>(null);
  const { pieces, partCentres, pad, d, w, h } = useMemo(buildCluster, []);
  // `width` is the cluster's width; the box adds padding so swelling stars aren't cropped
  const perUnit = width / (w - 2 * pad);
  const box = { width: w * perUnit, height: h * perUnit };

  useEffect(() => {
    const node = el.current!;
    // every <path> for piece i, in clip (bounding-box units) and in user units
    const boxPaths = pieces.map((_, i) => node.querySelectorAll<SVGPathElement>(`[data-box="${i}"]`));
    const userPaths = pieces.map((_, i) => node.querySelectorAll<SVGPathElement>(`[data-user="${i}"]`));
    const cur = pieces.map(() => ({ x: 0, y: 0, s: 1 }));
    const target = pieces.map(() => ({ x: 0, y: 0, s: 1 }));

    const render = () => {
      pieces.forEach((p, i) => {
        const c = cur[i];
        const [ox, oy] = p.origin;
        const t =
          `translate(${c.x} ${c.y}) translate(${ox} ${oy}) scale(${c.s}) translate(${-ox} ${-oy}) ` +
          `matrix(${p.matrix.join(" ")})`;
        boxPaths[i].forEach((path) => path.setAttribute("transform", `scale(${1 / w} ${1 / h}) ${t}`));
        userPaths[i].forEach((path) => path.setAttribute("transform", t));
      });
    };
    render();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      let moving = false;
      cur.forEach((c, i) => {
        const g = target[i];
        c.x += (g.x - c.x) * EASE;
        c.y += (g.y - c.y) * EASE;
        c.s += (g.s - c.s) * EASE;
        if (Math.abs(g.x - c.x) + Math.abs(g.y - c.y) + Math.abs(g.s - c.s) * 100 > 0.05) moving = true;
      });
      render();
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const b = node.getBoundingClientRect();
      const inside = e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
      // pointer in cluster units
      const mx = ((e.clientX - b.left) / b.width) * w;
      const my = ((e.clientY - b.top) / b.height) * h;
      pieces.forEach((p, i) => {
        const g = target[i];
        if (!inside) {
          g.x = g.y = 0;
          g.s = 1;
          return;
        }
        // the group leans as one; each copy adds a little of its own
        const [gx, gy] = partCentres[p.part];
        const [ox, oy] = p.origin;
        const ax = (gx + ox) / 2 - mx;
        const ay = (gy + oy) / 2 - my;
        const dist = Math.hypot(ax, ay) || 1;
        const f = Math.max(0, 1 - dist / REACH) ** 2;
        g.x = (ax / dist) * PUSH * f;
        g.y = (ay / dist) * PUSH * f;
        g.s = 1 + SWELL * f;
      });
      kick();
    };
    const onLeave = () => {
      target.forEach((g) => {
        g.x = g.y = 0;
        g.s = 1;
      });
      kick();
    };
    addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [pieces, partCentres, w, h]);

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
      <div className={`${css["fill"]} ${css["glass"]} ${css["noise"]}`} style={{ ...clip, ...band(0), opacity }} />
      <div className={css["layer"]} style={{ ...band(0), opacity }}>
        {edge}
      </div>
      {/* progressively blurred bands */}
      {BANDS.slice(1).map((_, k) => (
        <div
          key={k}
          className={css["layer"]}
          style={{
            ...band(k + 1),
            opacity,
            filter: `blur(calc(var(--w) * ${(MAX_BLUR * (k + 1)) / (BANDS.length - 1)}))`,
          }}
        >
          <div className={`${css["fill"]} ${css["soft"]} ${css["noise"]}`} style={clip} />
          {edge}
        </div>
      ))}
    </div>
  );
}
