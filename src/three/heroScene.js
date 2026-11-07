import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap } from "../motion";

// Contours du logo Alpha Web, relevés sur public/logo.png (200 × 160 px).
const LOGO_A = [[84, 0], [135, 96], [104, 96], [84, 59], [44, 134], [80, 134], [97, 158], [1, 158]];
const LOGO_W = [[68, 105], [97, 105], [117, 132], [132, 105], [146, 105], [161, 133], [178, 105], [199, 105], [171, 158], [153, 158], [139, 131], [125, 158], [106, 158]];
const LOGO_DOT = [[178, 84], [185, 82], [193, 82], [193, 96], [178, 96]];

const UNIT = 1 / 62;
const CAMERA_Z = 9;
const GOLD = 0xf2b632;

function extrude(points, depth, material) {
  const outline = points.map(([x, y]) => new THREE.Vector2((x - 100) * UNIT, (80 - y) * UNIT));
  const geometry = new THREE.ExtrudeGeometry(new THREE.Shape(outline), {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelSegments: 4,
  });
  geometry.translate(0, 0, -depth / 2);
  return new THREE.Mesh(geometry, material);
}

function softDot(size, stops) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([at, color]) => gradient.addColorStop(at, color));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function ring(radius, tube, opacity) {
  return new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 12, 220),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity }),
  );
}

function orbiter(radius, size) {
  const pivot = new THREE.Group();
  const bead = new THREE.Mesh(new THREE.SphereGeometry(size, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffe2a0 }));
  bead.position.x = radius;
  pivot.add(bead);
  return pivot;
}

function particles(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const gold = new THREE.Color(GOLD);
  const white = new THREE.Color(0xffffff);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = THREE.MathUtils.randFloatSpread(18);
    positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10);
    positions[i * 3 + 2] = THREE.MathUtils.randFloat(-7, 2.5);
    (Math.random() < 0.7 ? gold : white).toArray(colors, i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.045,
      map: softDot(32, [[0, "rgba(255,255,255,1)"], [1, "rgba(255,255,255,0)"]]),
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
}

/**
 * Logo Alpha Web en volume, en or et platine, au-dessus de la section hero.
 * `host` reçoit le canvas, `stage` indique où placer le logo à l'écran.
 * Lève une erreur si WebGL est indisponible : l'appelant affiche alors le logo image.
 */
export function createHeroScene({ host, hero, stage, reduced }) {
  const small = window.innerWidth < 768;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.z = CAMERA_Z;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;

  const key = new THREE.DirectionalLight(0xfff0d0, 2.2);
  key.position.set(4, 5, 6);
  const rim = new THREE.DirectionalLight(0x9fb4ff, 1.4);
  rim.position.set(-5, -2, -4);
  const follow = new THREE.PointLight(GOLD, 16, 12);
  follow.position.set(0, 0, 3);
  const front = new THREE.DirectionalLight(0xffffff, 0.8);
  front.position.set(0.5, 1, 8);
  scene.add(key, rim, front, follow);

  // Métal pas totalement pur : les faces restent lumineuses sous tous les angles
  const platinum = new THREE.MeshPhysicalMaterial({ color: 0xeceef2, metalness: 0.82, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const gold = new THREE.MeshPhysicalMaterial({ color: 0xf6b92c, metalness: 0.78, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.2 });

  const partA = new THREE.Group();
  partA.add(extrude(LOGO_A, 0.34, platinum));
  const partW = new THREE.Group();
  partW.add(extrude(LOGO_W, 0.34, gold), extrude(LOGO_DOT, 0.34, gold));
  partW.children.forEach((mesh) => (mesh.position.z = 0.2));

  const logo = new THREE.Group();
  logo.add(partA, partW);

  const ringA = ring(2.25, 0.007, 0.65);
  const ringB = ring(2.72, 0.004, 0.32);
  const beadA = orbiter(2.25, 0.05);
  const beadB = orbiter(2.72, 0.035);
  const ringsA = new THREE.Group();
  ringsA.add(ringA, beadA);
  ringsA.rotation.set(1.22, 0.32, 0);
  const ringsB = new THREE.Group();
  ringsB.add(ringB, beadB);
  ringsB.rotation.set(1.05, -0.5, 0.4);

  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: softDot(256, [[0, "rgba(242,182,50,.55)"], [0.45, "rgba(242,182,50,.12)"], [1, "rgba(242,182,50,0)"]]),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  glow.scale.setScalar(7.5);
  glow.position.z = -2;

  const rig = new THREE.Group();
  rig.add(glow, logo, ringsA, ringsB);
  scene.add(rig);

  const dust = particles(small ? 170 : 420);
  scene.add(dust);

  // Place le logo sur la zone `stage`, quelle que soit la taille de l'écran
  let baseX = 0;
  let baseY = 0;
  const layout = () => {
    const box = hero.getBoundingClientRect();
    const spot = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;
    renderer.setSize(box.width, box.height);
    camera.aspect = box.width / box.height;
    camera.updateProjectionMatrix();

    const worldH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAMERA_Z;
    const perPixel = worldH / box.height;
    baseX = (spot.left + spot.width / 2 - box.left - box.width / 2) * perPixel;
    baseY = (box.top + box.height / 2 - spot.top - spot.height / 2) * perPixel;
    rig.scale.setScalar((Math.min(spot.width, spot.height) * perPixel) / 3.75);
  };

  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0, scroll: 0 };
  const intro = { v: reduced ? 1 : 0 };

  const onPointer = (e) => {
    pointer.x = e.clientX / window.innerWidth - 0.5;
    pointer.y = e.clientY / window.innerHeight - 0.5;
  };
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (finePointer && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

  const draw = (now) => {
    const t = now / 1000;
    const box = hero.getBoundingClientRect();
    const scrollTarget = THREE.MathUtils.clamp(-box.top / box.height, 0, 1);
    const k = reduced ? 1 : 0.06;
    eased.x += (pointer.x - eased.x) * k;
    eased.y += (pointer.y - eased.y) * k;
    eased.scroll += (scrollTarget - eased.scroll) * (reduced ? 1 : 0.1);

    const rest = 1 - intro.v;
    const idle = reduced ? 0 : 1;

    rig.position.set(baseX, baseY + Math.sin(t * 0.8) * 0.07 * idle + eased.scroll * 1.1, -eased.scroll * 2.2);

    logo.rotation.y = -0.32 + Math.sin(t * 0.45) * 0.24 * idle + eased.x * 0.75 + eased.scroll * 2.1;
    logo.rotation.x = 0.06 + Math.cos(t * 0.6) * 0.05 * idle + eased.y * 0.45;

    partA.position.set(-rest * 3, rest * 1.2, -rest * 7);
    partA.rotation.y = -rest * 2.4;
    partW.position.set(rest * 3.4, -rest * 1.2, rest * 2);
    partW.rotation.y = rest * 2.4;

    const ringScale = Math.max(intro.v, 0.001);
    ringsA.scale.setScalar(ringScale);
    ringsB.scale.setScalar(ringScale);
    ringsA.rotation.z = t * 0.12 * idle;
    ringsB.rotation.z = -t * 0.08 * idle + 0.4;
    beadA.rotation.z = t * 0.7 * idle + 0.9;
    beadB.rotation.z = -t * 0.45 * idle + 3.6;
    glow.material.opacity = 0.75 * intro.v * (1 - eased.scroll * 0.7);

    dust.rotation.y = t * 0.012 * idle + eased.x * 0.1;
    dust.rotation.x = eased.y * 0.06;
    dust.position.y = eased.scroll * 1.6;

    follow.position.set(baseX + eased.x * 7, baseY - eased.y * 5, 3);
    renderer.render(scene, camera);
  };

  // Ne calcule rien lorsque le hero n'est plus visible
  let frame = 0;
  let visible = true;
  let last = 0;
  let slowFrames = 0;
  const tick = (now) => {
    frame = requestAnimationFrame(tick);
    // Appareil trop lent : baisse la résolution plutôt que de saccader
    const delta = now - last;
    last = now;
    if (delta < 500) slowFrames = delta > 28 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
    if (slowFrames > 45 && renderer.getPixelRatio() > 0.75) {
      renderer.setPixelRatio(Math.max(0.75, renderer.getPixelRatio() * 0.7));
      layout();
      slowFrames = 0;
    }
    draw(now);
  };
  const start = () => {
    if (!reduced && !frame) frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const resize = new ResizeObserver(() => {
    layout();
    if (reduced || !visible) draw(performance.now());
  });
  resize.observe(hero);

  const seen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  seen.observe(hero);

  layout();
  draw(performance.now());
  start();
  const introTween = reduced ? null : gsap.to(intro, { v: 1, duration: 2, ease: "expo.out", delay: 0.15 });

  return function destroy() {
    stop();
    introTween?.kill();
    resize.disconnect();
    seen.disconnect();
    window.removeEventListener("pointermove", onPointer);
    scene.traverse((object) => {
      object.geometry?.dispose();
      object.material?.map?.dispose();
      object.material?.dispose();
    });
    environment.dispose();
    pmrem.dispose();
    // Libère le contexte WebGL : la scène est recréée à chaque changement de langue
    renderer.forceContextLoss();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
