import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/** How much wider/taller than the flat wordmark the canvas is (room to spin).
    Must match .metal's insets in Wordmark.module.css. */
export const OVERSCAN = { x: 1.7, y: 2.4 };

// letters of the orbit lockup in the SVG's coordinates (export padding included):
// the flat mark's box is these letters, so the 3D one is centred and sized on them
const LETTERS = { cx: 605.37, cy: 144.63, width: 814.84 };

const SPIN = 0.9; // rad/s at full hover speed
const SPIN_EASE = 2.5; // how quickly it spins up / winds down (1/s)
const SETTLE = 6; // spring back to front-facing (1/s)

/** Fine grain for the roughness + bump maps — the sparkle in brushed metal. */
function grainTexture() {
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const v = 150 + Math.random() * 105;
    data.set([v, v, v, 255], i * 4);
  }
  const tex = new THREE.DataTexture(data, size, size);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(0.025, 0.025); // extrude UVs are in SVG units
  tex.needsUpdate = true;
  return tex;
}

/** The NOVA wordmark extruded in polished, bevelled chrome. Spins while
    `setHover(true)`; on release it eases back to face front, then calls
    `onRest` so the caller can swap back to the flat mark. */
export function createMetalWordmark(container: HTMLElement, svg: string, onRest: () => void) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;

  // key + rim lights put hard highlights on the bevels, like a studio shot
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-2, 3, 4);
  const rim = new THREE.DirectionalLight(0xdfe6ff, 1.6);
  rim.position.set(3, -1, -3);
  scene.add(key, rim);

  // geometry: the wordmark's SVG outline, extruded with a rounded bevel
  const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => SVGLoader.createShapes(p));
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 64,
    bevelEnabled: true,
    bevelThickness: 12,
    bevelSize: 7,
    bevelSegments: 10,
    curveSegments: 28,
  });
  geometry.translate(-LETTERS.cx, -LETTERS.cy, -(64 + 2 * 12) / 2);
  const letterWidth = LETTERS.width;

  const grain = grainTexture();
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf4f4f6,
    metalness: 1,
    roughness: 0.16,
    roughnessMap: grain,
    bumpMap: grain,
    bumpScale: 0.35,
    envMapIntensity: 1.5,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI; // SVG is y-down; flipping keeps the face winding intact
  const pivot = new THREE.Group();
  pivot.add(mesh);
  scene.add(pivot);

  const camera = new THREE.PerspectiveCamera(22, 1, 1, 20000);
  const fit = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // the flat mark spans 1/OVERSCAN.x of the canvas width — match it exactly
    const visibleWidth = letterWidth * OVERSCAN.x;
    camera.position.set(0, 0, visibleWidth / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(fit);
  ro.observe(container);
  fit();

  let hovered = false;
  let speed = 0;
  let raf = 0;
  let last = 0;

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    speed += ((hovered ? SPIN : 0) - speed) * Math.min(1, SPIN_EASE * dt);
    let rest = false;
    if (hovered || speed > 0.25) {
      pivot.rotation.y += speed * dt;
    } else {
      // wind down onto the nearest front-facing turn
      const target = Math.round(pivot.rotation.y / (Math.PI * 2)) * Math.PI * 2;
      pivot.rotation.y += (target - pivot.rotation.y) * Math.min(1, SETTLE * dt);
      if (Math.abs(target - pivot.rotation.y) < 0.002) {
        pivot.rotation.y = 0;
        rest = true;
      }
    }
    renderer.render(scene, camera);
    if (rest) {
      raf = 0;
      onRest();
    } else {
      raf = requestAnimationFrame(frame);
    }
  };

  return {
    setHover(on: boolean) {
      hovered = on;
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      grain.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
