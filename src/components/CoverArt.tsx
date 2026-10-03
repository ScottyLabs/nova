import { useLayoutEffect, useRef, useState } from "react";
import blobPinkA from "../assets/cover/blob-pink-a.svg";
import blobOrange from "../assets/cover/blob-orange.svg";
import blobPinkB from "../assets/cover/blob-pink-b.svg";
import blobPeriA from "../assets/cover/blob-periwinkle-a.svg";
import blobPeriB from "../assets/cover/blob-periwinkle-b.svg";
import blobLilac from "../assets/cover/blob-lilac.svg";
import blobBlue from "../assets/cover/blob-blue.svg";
import blobPeriC from "../assets/cover/blob-periwinkle-c.svg";
import css from "./CoverArt.module.css";

// Figma "cover" (300:144) is a 2231×1294 artboard. Each layer keeps the
// artboard's geometry: outer box, inner box + transform, and the image's
// negative inset (room for the blur filter baked into each SVG).
const STAGE_W = 2231;
const STAGE_H = 1294;
const BLOB_TRANSFORM = "rotate(136.24deg) scaleY(0.99) skewX(-8.58deg)";

interface ILayer {
  src: string;
  box: [left: number, top: number, w: number, h: number];
  inner?: [w: number, h: number];
  transform?: string;
  inset: [y: number, x: number];
  /** parallax travel in artboard px at full pointer deflection */
  depth: number;
}

const layers: ILayer[] = [
  { src: blobPinkA, box: [-493.23, -248, 1536.465, 1411], inset: [6.84, 6.28], depth: 60 },
  { src: blobOrange, box: [88.3, -129.16, 947.113, 1059.752], inset: [29.94, 33.5], depth: 110 },
  { src: blobPinkB, box: [451.05, 567.75, 697.8, 800.239], inner: [569.767, 496.924], transform: BLOB_TRANSFORM, inset: [10.06, 8.78], depth: 40 },
  { src: blobPeriA, box: [627.7, 791.76, 570.229, 666.777], inner: [427.064, 454.392], transform: BLOB_TRANSFORM, inset: [44.01, 46.83], depth: 90 },
  { src: blobPeriB, box: [436.45, 619.13, 953.552, 1126.869], inner: [678.513, 804.519], transform: BLOB_TRANSFORM, inset: [24.86, 29.48], depth: 70 },
  { src: blobLilac, box: [-71, -400, 1030.701, 1206.336], inner: [768.55, 825.556], transform: BLOB_TRANSFORM, inset: [38.43, 41.28], depth: 130 },
  { src: blobBlue, box: [673, 403, 754, 704], inset: [28.41, 26.53], depth: 50 },
  { src: blobPeriC, box: [723, -498, 1987.436, 2348.673], inner: [1414.187, 1676.816], transform: BLOB_TRANSFORM, inset: [24.86, 29.48], depth: 150 },
];

function Layer({ src, box, inner, transform, inset, depth }: ILayer) {
  const [left, top, w, h] = box;
  const img = (
    <div className={css["fill"]} style={{ inset: `-${inset[0]}% -${inset[1]}%` }}>
      <img src={src} alt="" />
    </div>
  );
  return (
    <div
      className={css["layer"]}
      style={{ left, top, width: w, height: h, "--d": depth } as React.CSSProperties}
    >
      {inner ? (
        <div style={{ transform, flex: "none" }}>
          <div style={{ position: "relative", width: inner[0], height: inner[1] }}>{img}</div>
        </div>
      ) : (
        img
      )}
    </div>
  );
}

/** The top of the Nova cover (300:144): gradient blobs, pinned
    to the top of its parent and fading into the page's mist. */
export function CoverArt() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // fill the width; on narrow screens keep enough height to read as a field
      setScale(Math.max(width / STAGE_W, Math.min(height, 900) / STAGE_H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={css["cover"]} aria-hidden>
      <div
        className={css["stage"]}
        data-parallax
        style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${scale})` }}
      >
        {layers.map((layer) => (
          <Layer {...layer} key={layer.src} />
        ))}
      </div>
    </div>
  );
}
