'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import "./PassageGallery.css";
import { scrollTo } from "@/components/SmoothScroll";

/**
 * TUNNEL_IMAGES
 * Exactly 55 optimized portfolio photography assets.
 * Thumbnails (longest side 512px) used on tunnel 3D cards.
 * Full images (longest side 1600px) loaded on demand for inspection modal.
 */
export const TUNNEL_IMAGES = [
  { id: "photo-01", thumb: "/tunnel/thumb/photo-01.webp", full: "/tunnel/full/photo-01.webp", alt: "Photo 01" },
  { id: "photo-02", thumb: "/tunnel/thumb/photo-02.webp", full: "/tunnel/full/photo-02.webp", alt: "Photo 02" },
  { id: "photo-03", thumb: "/tunnel/thumb/photo-03.webp", full: "/tunnel/full/photo-03.webp", alt: "Photo 03" },
  { id: "photo-04", thumb: "/tunnel/thumb/photo-04.webp", full: "/tunnel/full/photo-04.webp", alt: "Photo 04" },
  { id: "photo-05", thumb: "/tunnel/thumb/photo-05.webp", full: "/tunnel/full/photo-05.webp", alt: "Photo 05" },
  { id: "photo-06", thumb: "/tunnel/thumb/photo-06.webp", full: "/tunnel/full/photo-06.webp", alt: "Photo 06" },
  { id: "photo-07", thumb: "/tunnel/thumb/photo-07.webp", full: "/tunnel/full/photo-07.webp", alt: "Photo 07" },
  { id: "photo-08", thumb: "/tunnel/thumb/photo-08.webp", full: "/tunnel/full/photo-08.webp", alt: "Photo 08" },
  { id: "photo-09", thumb: "/tunnel/thumb/photo-09.webp", full: "/tunnel/full/photo-09.webp", alt: "Photo 09" },
  { id: "photo-10", thumb: "/tunnel/thumb/photo-10.webp", full: "/tunnel/full/photo-10.webp", alt: "Photo 10" },
  { id: "photo-11", thumb: "/tunnel/thumb/photo-11.webp", full: "/tunnel/full/photo-11.webp", alt: "Photo 11" },
  { id: "photo-12", thumb: "/tunnel/thumb/photo-12.webp", full: "/tunnel/full/photo-12.webp", alt: "Photo 12" },
  { id: "photo-13", thumb: "/tunnel/thumb/photo-13.webp", full: "/tunnel/full/photo-13.webp", alt: "Photo 13" },
  { id: "photo-14", thumb: "/tunnel/thumb/photo-14.webp", full: "/tunnel/full/photo-14.webp", alt: "Photo 14" },
  { id: "photo-15", thumb: "/tunnel/thumb/photo-15.webp", full: "/tunnel/full/photo-15.webp", alt: "Photo 15" },
  { id: "photo-16", thumb: "/tunnel/thumb/photo-16.webp", full: "/tunnel/full/photo-16.webp", alt: "Photo 16" },
  { id: "photo-17", thumb: "/tunnel/thumb/photo-17.webp", full: "/tunnel/full/photo-17.webp", alt: "Photo 17" },
  { id: "photo-18", thumb: "/tunnel/thumb/photo-18.webp", full: "/tunnel/full/photo-18.webp", alt: "Photo 18" },
  { id: "photo-19", thumb: "/tunnel/thumb/photo-19.webp", full: "/tunnel/full/photo-19.webp", alt: "Photo 19" },
  { id: "photo-20", thumb: "/tunnel/thumb/photo-20.webp", full: "/tunnel/full/photo-20.webp", alt: "Photo 20" },
  { id: "photo-21", thumb: "/tunnel/thumb/photo-21.webp", full: "/tunnel/full/photo-21.webp", alt: "Photo 21" },
  { id: "photo-22", thumb: "/tunnel/thumb/photo-22.webp", full: "/tunnel/full/photo-22.webp", alt: "Photo 22" },
  { id: "photo-23", thumb: "/tunnel/thumb/photo-23.webp", full: "/tunnel/full/photo-23.webp", alt: "Photo 23" },
  { id: "photo-24", thumb: "/tunnel/thumb/photo-24.webp", full: "/tunnel/full/photo-24.webp", alt: "Photo 24" },
  { id: "photo-25", thumb: "/tunnel/thumb/photo-25.webp", full: "/tunnel/full/photo-25.webp", alt: "Photo 25" },
  { id: "photo-26", thumb: "/tunnel/thumb/photo-26.webp", full: "/tunnel/full/photo-26.webp", alt: "Photo 26" },
  { id: "photo-27", thumb: "/tunnel/thumb/photo-27.webp", full: "/tunnel/full/photo-27.webp", alt: "Photo 27" },
  { id: "photo-28", thumb: "/tunnel/thumb/photo-28.webp", full: "/tunnel/full/photo-28.webp", alt: "Photo 28" },
  { id: "photo-29", thumb: "/tunnel/thumb/photo-29.webp", full: "/tunnel/full/photo-29.webp", alt: "Photo 29" },
  { id: "photo-30", thumb: "/tunnel/thumb/photo-30.webp", full: "/tunnel/full/photo-30.webp", alt: "Photo 30" },
  { id: "photo-31", thumb: "/tunnel/thumb/photo-31.webp", full: "/tunnel/full/photo-31.webp", alt: "Photo 31" },
  { id: "photo-32", thumb: "/tunnel/thumb/photo-32.webp", full: "/tunnel/full/photo-32.webp", alt: "Photo 32" },
  { id: "photo-33", thumb: "/tunnel/thumb/photo-33.webp", full: "/tunnel/full/photo-33.webp", alt: "Photo 33" },
  { id: "photo-34", thumb: "/tunnel/thumb/photo-34.webp", full: "/tunnel/full/photo-34.webp", alt: "Photo 34" },
  { id: "photo-35", thumb: "/tunnel/thumb/photo-35.webp", full: "/tunnel/full/photo-35.webp", alt: "Photo 35" },
  { id: "photo-36", thumb: "/tunnel/thumb/photo-36.webp", full: "/tunnel/full/photo-36.webp", alt: "Photo 36" },
  { id: "photo-37", thumb: "/tunnel/thumb/photo-37.webp", full: "/tunnel/full/photo-37.webp", alt: "Photo 37" },
  { id: "photo-38", thumb: "/tunnel/thumb/photo-38.webp", full: "/tunnel/full/photo-38.webp", alt: "Photo 38" },
  { id: "photo-39", thumb: "/tunnel/thumb/photo-39.webp", full: "/tunnel/full/photo-39.webp", alt: "Photo 39" },
  { id: "photo-40", thumb: "/tunnel/thumb/photo-40.webp", full: "/tunnel/full/photo-40.webp", alt: "Photo 40" },
  { id: "photo-41", thumb: "/tunnel/thumb/photo-41.webp", full: "/tunnel/full/photo-41.webp", alt: "Photo 41" },
  { id: "photo-42", thumb: "/tunnel/thumb/photo-42.webp", full: "/tunnel/full/photo-42.webp", alt: "Photo 42" },
  { id: "photo-43", thumb: "/tunnel/thumb/photo-43.webp", full: "/tunnel/full/photo-43.webp", alt: "Photo 43" },
  { id: "photo-44", thumb: "/tunnel/thumb/photo-44.webp", full: "/tunnel/full/photo-44.webp", alt: "Photo 44" },
  { id: "photo-45", thumb: "/tunnel/thumb/photo-45.webp", full: "/tunnel/full/photo-45.webp", alt: "Photo 45" },
  { id: "photo-46", thumb: "/tunnel/thumb/photo-46.webp", full: "/tunnel/full/photo-46.webp", alt: "Photo 46" },
  { id: "photo-47", thumb: "/tunnel/thumb/photo-47.webp", full: "/tunnel/full/photo-47.webp", alt: "Photo 47" },
  { id: "photo-48", thumb: "/tunnel/thumb/photo-48.webp", full: "/tunnel/full/photo-48.webp", alt: "Photo 48" },
  { id: "photo-49", thumb: "/tunnel/thumb/photo-49.webp", full: "/tunnel/full/photo-49.webp", alt: "Photo 49" },
  { id: "photo-50", thumb: "/tunnel/thumb/photo-50.webp", full: "/tunnel/full/photo-50.webp", alt: "Photo 50" },
  { id: "photo-51", thumb: "/tunnel/thumb/photo-51.webp", full: "/tunnel/full/photo-51.webp", alt: "Photo 51" },
  { id: "photo-52", thumb: "/tunnel/thumb/photo-52.webp", full: "/tunnel/full/photo-52.webp", alt: "Photo 52" },
  { id: "photo-53", thumb: "/tunnel/thumb/photo-53.webp", full: "/tunnel/full/photo-53.webp", alt: "Photo 53" },
  { id: "photo-54", thumb: "/tunnel/thumb/photo-54.webp", full: "/tunnel/full/photo-54.webp", alt: "Photo 54" },
  { id: "photo-55", thumb: "/tunnel/thumb/photo-55.webp", full: "/tunnel/full/photo-55.webp", alt: "Photo 55" }
];

const DEFAULT_COLORS = ["#5227FF", "#FF9FFC"];
const DEFAULT_BG = "#06020c";

// Touch Glide Configuration Constants (mobile / touch input only)
const TOUCH_GLIDE_FACTOR = 0.0035;        // Finger delta to 3D Z scale (~1.4 units per 400px swipe)
const TOUCH_STEER_FACTOR = 0.45;          // Subtle steering ratio during touch swipe
const TOUCH_MOMENTUM_DECAY = 0.92;        // Decay multiplier per frame on release (matches desktop wheel momentum)
const TOUCH_MOMENTUM_MAX_VELOCITY = 0.06; // Clamps release velocity to prevent over-speed jump
const TAP_MAX_DISTANCE = 10;              // Maximum movement (px) for a gesture to be classified as a tap
const TAP_MAX_DURATION = 300;             // Maximum duration (ms) for a tap vs glide

// Helper: Rounded rectangle ShapeGeometry for smooth, non-warping tiles
function createRoundedPlaneGeometry(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geom = new THREE.ShapeGeometry(shape, 8);

  const pos = geom.attributes.position;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    uvs[i * 2] = (px + width / 2) / width;
    uvs[i * 2 + 1] = (py + height / 2) / height;
  }
  geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geom.computeVertexNormals();
  return geom;
}

// Helper: Procedural vibrant gradient accent textures matching React Bits Pro corridor
function createAccentTexture(variant) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f051d";
  ctx.fillRect(0, 0, 512, 512);

  if (variant === 0) {
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, "#5227FF");
    grad.addColorStop(0.5, "#FF2A85");
    grad.addColorStop(1, "#FF9F1C");
    ctx.lineWidth = 90;
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 320, 160, Math.PI, 0);
    ctx.stroke();
  } else if (variant === 1) {
    const grad = ctx.createRadialGradient(256, 200, 30, 256, 200, 220);
    grad.addColorStop(0, "#FF4B72");
    grad.addColorStop(0.6, "#9D174D");
    grad.addColorStop(1, "#1A0B2E");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 220, 140, 0, Math.PI * 2);
    ctx.fill();
  } else if (variant === 2) {
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, "#7928CA");
    grad.addColorStop(0.5, "#FF0080");
    grad.addColorStop(1, "#FF8A00");
    ctx.lineWidth = 80;
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(60, 120);
    ctx.bezierCurveTo(200, 120, 300, 390, 450, 390);
    ctx.stroke();
  } else {
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "#FF2E93");
    grad.addColorStop(0.6, "#FF8B3D");
    grad.addColorStop(1, "#FFD166");
    ctx.lineWidth = 85;
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 200, 130, 0, Math.PI);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Pseudo-random generator for consistent procedural tile placement
function pseudoRand(seed, r, s) {
  const x = Math.sin(seed * 12.9898 + r * 78.233 + s * 37.719) * 43758.5453;
  return x - Math.floor(x);
}

// Inspect modal component showing photo with visible close button, background scroll lock, and back gesture
function PassageInspectModal({ item, onClose }) {
  const [loadedFullSrc, setLoadedFullSrc] = useState(null);
  const mountTimeRef = useRef(0);
  const isClosingRef = useRef(false);

  useEffect(() => {
    mountTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (!item?.full) return;

    const img = new Image();
    img.src = item.full;
    img.onload = () => {
      setLoadedFullSrc(item.full);
    };
  }, [item?.full]);

  const handleClose = useCallback((e) => {
    if (e) e.stopPropagation();
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    onClose();
    if (typeof window !== "undefined" && window.history.state?.passageModalOpen) {
      window.history.back();
    }
  }, [onClose]);

  // Lock background scroll, listen for Escape key, and support mobile back gesture
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose(e);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // Browser back gesture / button integration
    const handlePopState = () => {
      if (!isClosingRef.current) {
        isClosingRef.current = true;
        onClose();
      }
    };
    window.history.pushState({ passageModalOpen: true }, "");
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose, handleClose]);

  const isFullLoaded = loadedFullSrc === item?.full;

  const handleBackdropClick = (e) => {
    if (e) e.stopPropagation();
    // Ignore clicks dispatched within 250ms of mounting to prevent opening click from immediately closing the modal
    if (performance.now() - mountTimeRef.current < 250) {
      return;
    }
    handleClose(e);
  };

  return (
    <div
      className="passage-focus-overlay"
      data-lenis-prevent="true"
      onClick={handleBackdropClick}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        type="button"
        className="passage-modal-close clickable"
        onClick={handleClose}
        aria-label="Close photo view"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M14 4L4 14M4 4L14 14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isFullLoaded ? item.full : item.thumb}
        alt={item.alt || "Portfolio photo"}
        className="passage-focus-image"
        loading="eager"
        decoding="async"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function PassageGallery({
  items = TUNNEL_IMAGES,
  colors = DEFAULT_COLORS,
  backgroundColor = DEFAULT_BG,
  speed = 0.35,
  look = 0.65,
  fov = 68,
  lanes = 5,
  photoFill = 0.36,
  accentFill = 0.08,
  interactive = true,
  focusOnClick = true,
  captions = true,
  wheel = true,
  seed = 42,
  ariaLabel = "Interactive 3D Passage Gallery of creative portfolio works"
}) {
  const containerRef = useRef(null);
  const [focusedItem, setFocusedItem] = useState(null);

  const stateRef = useRef({
    cameraZ: 0,
    targetZ: 0,
    scrollVelocity: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    pointerDownPos: { x: 0, y: 0 },
    hoveredMesh: null,
    focusedMesh: null,
    focusedOrigin: null,
    reducedMotion: false,
    alive: true
  });

  const closeFocus = useCallback(() => {
    const s = stateRef.current;
    if (s.focusedMesh && s.focusedOrigin) {
      s.focusedMesh.position.copy(s.focusedOrigin.pos);
      s.focusedMesh.rotation.copy(s.focusedOrigin.rot);
      s.focusedMesh.scale.copy(s.focusedOrigin.scale);
    }
    s.focusedMesh = null;
    s.focusedOrigin = null;
    s.scrollVelocity = 0;
    setFocusedItem(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeFocus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeFocus]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const s = stateRef.current;
    s.alive = true;
    s.reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    scene.fog = new THREE.FogExp2(backgroundColor, 0.052);

    const aspect = container.clientWidth / container.clientHeight || 1;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 80);
    camera.position.set(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
      });
    } catch {
      return undefined;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth <= 768 || window.matchMedia?.("(pointer: coarse)")?.matches);
    const targetDpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(targetDpr);
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const canvas = renderer.domElement;
    canvas.className = "passage-gallery-canvas";
    canvas.setAttribute("aria-label", ariaLabel);
    container.appendChild(canvas);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const color1 = new THREE.Color(colors[0] || DEFAULT_COLORS[0]);
    const color2 = new THREE.Color(colors[1] || DEFAULT_COLORS[1]);

    const light1 = new THREE.PointLight(color1, 40, 22);
    const light2 = new THREE.PointLight(color2, 40, 22);
    scene.add(light1, light2);

    // 3. Rectangular Corridor Geometry
    const cellWidth = 1.45;
    const cellHeight = 1.15;
    const rowStep = 1.45;
    const rows = 16;
    const totalDepth = rows * rowStep; // 23.2 units

    const halfW = (lanes * cellWidth) / 2; // 3.625
    const halfH = cellHeight; // 1.15 (2 wall lanes total height = 2.3)

    // Tile sizes with realistic gap & corner rounding
    const gapRatio = 0.08;
    const tileW = cellWidth * (1 - 2 * gapRatio);
    const tileH = cellHeight * (1 - 2 * gapRatio);
    const tileZ = rowStep * (1 - 2 * gapRatio);
    const cornerRadius = 0.055;

    // Rounded Geometries
    const floorCeilGeom = createRoundedPlaneGeometry(tileW, tileZ, cornerRadius);
    const wallGeom = createRoundedPlaneGeometry(tileZ, tileH, cornerRadius);

    // Frame Outline Line Geometries
    function createOutlineGeom(w, h, r) {
      const hw = w / 2;
      const hh = h / 2;
      return new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-hw + r, -hh, 0.003),
        new THREE.Vector3(hw - r, -hh, 0.003),
        new THREE.Vector3(hw, -hh + r, 0.003),
        new THREE.Vector3(hw, hh - r, 0.003),
        new THREE.Vector3(hw - r, hh, 0.003),
        new THREE.Vector3(-hw + r, hh, 0.003),
        new THREE.Vector3(-hw, hh - r, 0.003),
        new THREE.Vector3(-hw, -hh + r, 0.003),
        new THREE.Vector3(-hw + r, -hh, 0.003)
      ]);
    }
    const floorOutlineGeom = createOutlineGeom(tileW, tileZ, cornerRadius);
    const wallOutlineGeom = createOutlineGeom(tileZ, tileH, cornerRadius);

    // 4. Wireframe Grid Structure
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x3d226a,
      transparent: true,
      opacity: 0.4
    });

    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

    // 4 Corner edge longitudinal beams
    const corners = [
      [-halfW, -halfH],
      [halfW, -halfH],
      [halfW, halfH],
      [-halfW, halfH]
    ];
    corners.forEach(([cx, cy]) => {
      const pts = [new THREE.Vector3(cx, cy, 4), new THREE.Vector3(cx, cy, -totalDepth - 8)];
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      gridGroup.add(new THREE.Line(geom, gridMat));
    });

    // Floor and ceiling longitudinal dividing lines between lanes
    for (let i = 1; i < lanes; i++) {
      const lx = -halfW + i * cellWidth;
      const ptsFloor = [new THREE.Vector3(lx, -halfH, 4), new THREE.Vector3(lx, -halfH, -totalDepth - 8)];
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsFloor), gridMat));
      const ptsCeil = [new THREE.Vector3(lx, halfH, 4), new THREE.Vector3(lx, halfH, -totalDepth - 8)];
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsCeil), gridMat));
    }

    // Wall longitudinal dividing line at Y = 0
    [-halfW, halfW].forEach((wx) => {
      const pts = [new THREE.Vector3(wx, 0, 4), new THREE.Vector3(wx, 0, -totalDepth - 8)];
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    });

    // Transverse rectangular rings at each row step along Z
    const rectRingGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-halfW, -halfH, 0),
      new THREE.Vector3(halfW, -halfH, 0),
      new THREE.Vector3(halfW, halfH, 0),
      new THREE.Vector3(-halfW, halfH, 0),
      new THREE.Vector3(-halfW, -halfH, 0)
    ]);
    const rectRings = [];
    for (let r = 0; r < rows; r++) {
      const ring = new THREE.Line(rectRingGeom, gridMat);
      ring.position.z = -r * rowStep;
      gridGroup.add(ring);
      rectRings.push(ring);
    }

    // 5. Preload Photo Textures & Accent Textures (Thumbnails ONLY, anisotropy max 4)
    const textureLoader = new THREE.TextureLoader();
    const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

    // Apply texture cover crop (proportional crop, no stretching)
    const applyCover = (tex, planeAspect) => {
      if (!tex.image || !tex.image.width || !tex.image.height) return;
      const imgAspect = tex.image.width / tex.image.height;
      if (imgAspect > planeAspect) {
        tex.repeat.set(planeAspect / imgAspect, 1);
        tex.offset.set((1 - tex.repeat.x) / 2, 0);
      } else {
        tex.repeat.set(1, imgAspect / planeAspect);
        tex.offset.set(0, (1 - tex.repeat.y) / 2);
      }
    };

    // 1x1 neutral dark placeholder DataTexture with valid image data (never triggers 'Texture marked for update but no image data found')
    const placeholderTex = new THREE.DataTexture(
      new Uint8Array([18, 10, 32, 255]),
      1,
      1,
      THREE.RGBAFormat
    );
    placeholderTex.needsUpdate = true;

    // Track all created textures for complete disposal
    const createdTextures = [];
    const pendingCardsByPhoto = new Map();

    // Procedural accent gradient materials (kept as part of design)
    const accentTextures = [0, 1, 2, 3].map((v) => createAccentTexture(v));
    const accentMaterials = accentTextures.map(
      (tex) =>
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.25,
          metalness: 0.1,
          side: THREE.DoubleSide
        })
    );

    // 6. Build Corridor Tiles with Specified Image Density
    const photoGroup = new THREE.Group();
    scene.add(photoGroup);

    const photoMeshes = [];
    const allTiles = [];
    const createdPhotoMaterials = [];
    let photoCursor = 0;
    let accentCursor = 0;

    for (let r = 0; r < rows; r++) {
      const zPos = -r * rowStep - rowStep / 2;

      // 14 slots per row: 5 floor, 5 ceiling, 2 left wall, 2 right wall
      for (let sIdx = 0; sIdx < 14; sIdx++) {
        const val = pseudoRand(seed, r, sIdx);
        const isPhoto = val < photoFill;
        const isAccent = !isPhoto && val < photoFill + accentFill;

        if (!isPhoto && !isAccent) {
          // Empty dark grid cell (matches reference design)
          continue;
        }

        let geom;
        let outlineGeom;
        const pos = new THREE.Vector3();
        const rot = new THREE.Euler();

        if (sIdx < 5) {
          // Floor (normal points UP)
          geom = floorCeilGeom;
          outlineGeom = floorOutlineGeom;
          pos.set(-halfW + (sIdx + 0.5) * cellWidth, -halfH, zPos);
          rot.set(-Math.PI / 2, 0, 0);
        } else if (sIdx < 10) {
          // Ceiling (normal points DOWN)
          geom = floorCeilGeom;
          outlineGeom = floorOutlineGeom;
          pos.set(-halfW + (sIdx - 5 + 0.5) * cellWidth, halfH, zPos);
          rot.set(Math.PI / 2, 0, 0);
        } else if (sIdx < 12) {
          // Left Wall (normal points RIGHT)
          geom = wallGeom;
          outlineGeom = wallOutlineGeom;
          pos.set(-halfW, -halfH + (sIdx - 10 + 0.5) * cellHeight, zPos);
          rot.set(0, Math.PI / 2, 0);
        } else {
          // Right Wall (normal points LEFT)
          geom = wallGeom;
          outlineGeom = wallOutlineGeom;
          pos.set(halfW, -halfH + (sIdx - 12 + 0.5) * cellHeight, zPos);
          rot.set(0, -Math.PI / 2, 0);
        }

        let material;
        let item = null;
        let cardId = null;
        if (isPhoto && items.length > 0) {
          const pIdx = photoCursor % items.length;
          photoCursor++;
          item = items[pIdx];
          cardId = item.id;

          const isWall = sIdx >= 10;
          const planeAspect = isWall ? tileZ / tileH : tileW / tileZ;

          material = new THREE.MeshStandardMaterial({
            map: placeholderTex,
            roughness: 0.35,
            metalness: 0.05,
            side: THREE.DoubleSide
          });
          createdPhotoMaterials.push(material);

          if (!pendingCardsByPhoto.has(pIdx)) {
            pendingCardsByPhoto.set(pIdx, []);
          }
          pendingCardsByPhoto.get(pIdx).push({ material, planeAspect, isWall });
        } else {
          const aIdx = accentCursor % accentMaterials.length;
          accentCursor++;
          material = accentMaterials[aIdx];
        }

        const mesh = new THREE.Mesh(geom, material);
        mesh.position.copy(pos);
        mesh.rotation.copy(rot);

        // Neon outline border
        const frameColor = isPhoto ? color1 : color2;
        const frameMat = new THREE.LineBasicMaterial({
          color: frameColor,
          transparent: true,
          opacity: 0.32
        });
        const frameLine = new THREE.Line(outlineGeom, frameMat);
        frameLine.raycast = () => {}; // Never intercept raycast clicks intended for card surface
        mesh.add(frameLine);

        mesh.userData = {
          id: cardId,
          isPhoto,
          item,
          frameMat,
          baseColor: frameColor,
          originalPosition: mesh.position.clone(),
          originalRotation: mesh.rotation.clone(),
          originalScale: new THREE.Vector3(1, 1, 1)
        };

        photoGroup.add(mesh);
        allTiles.push(mesh);
        if (isPhoto) {
          photoMeshes.push(mesh);
        }
      }
    }

    // Texture sharing cache: key `${pIdx}_${isWall ? 'w' : 'f'}` -> THREE.Texture
    const textureVariantCache = new Map();

    // Asynchronously load thumbnail textures for cards. Textures are cloned ONLY after image has loaded!
    pendingCardsByPhoto.forEach((cardList, pIdx) => {
      const item = items[pIdx];
      if (!item?.thumb) return;

      textureLoader.load(
        item.thumb,
        (loadedTex) => {
          if (!s.alive) {
            loadedTex.dispose();
            return;
          }

          loadedTex.colorSpace = THREE.SRGBColorSpace;
          loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
          loadedTex.generateMipmaps = true;
          loadedTex.anisotropy = maxAniso;
          createdTextures.push(loadedTex);

          cardList.forEach(({ material, planeAspect, isWall }) => {
            if (!s.alive) return;
            const key = `${pIdx}_${isWall ? 'w' : 'f'}`;
            let variantTex = textureVariantCache.get(key);
            if (!variantTex) {
              // Clone ONLY when loadedTex.image is guaranteed to be valid and complete!
              variantTex = loadedTex.clone();
              applyCover(variantTex, planeAspect);
              variantTex.needsUpdate = true;
              textureVariantCache.set(key, variantTex);
              createdTextures.push(variantTex);
            }
            material.map = variantTex;
            material.needsUpdate = true;
          });
        },
        undefined,
        () => {
          // Fallback on network/404 error: material keeps placeholderTex gracefully without warnings
        }
      );
    });

    // 7. Interaction: Unified Pointer Events (Mouse, Touch, Pen) with Tap vs Swipe Disambiguation
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let activePointerId = null;
    let pointerDownPos = { x: 0, y: 0 };
    let pointerDownTime = 0;
    let pointerMoved = false;
    let isPointerPressed = false;
    let lastInspectActionTime = 0;
    let touchMomentumVelocity = 0;

    const inspectPhotoAt = (clientX, clientY) => {
      if (!interactive || !focusOnClick) return;
      const now = performance.now();
      if (now - lastInspectActionTime < 300) return;

      const rect = canvas.getBoundingClientRect();
      const clickPointer = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );

      camera.updateMatrixWorld();
      raycaster.setFromCamera(clickPointer, camera);
      const hits = raycaster.intersectObjects(photoMeshes, false);

      let hitMesh = null;
      let cardId = null;

      // 1. Direct hit-test with distance safety (nearest tile <= 18 units, in front of camera)
      for (let i = 0; i < hits.length; i++) {
        let obj = hits[i].object;
        while (obj && !obj.userData?.id && obj.parent) {
          obj = obj.parent;
        }
        if (obj && obj.userData?.id && photoMeshes.includes(obj)) {
          if (hits[i].distance <= 18 && obj.position.z < camera.position.z + 1) {
            hitMesh = obj;
            cardId = obj.userData.id;
            break;
          }
        }
      }

      // 2. Proximity fallback: If tap was near tile edge or gap, test slight offsets (~8-10px)
      if (!hitMesh) {
        const offsets = [
          [0.02, 0], [-0.02, 0], [0, 0.02], [0, -0.02],
          [0.015, 0.015], [-0.015, -0.015], [0.015, -0.015], [-0.015, 0.015]
        ];
        for (const [ox, oy] of offsets) {
          const testPt = new THREE.Vector2(clickPointer.x + ox, clickPointer.y + oy);
          raycaster.setFromCamera(testPt, camera);
          const nearbyHits = raycaster.intersectObjects(photoMeshes, false);
          for (let i = 0; i < nearbyHits.length; i++) {
            let obj = nearbyHits[i].object;
            while (obj && !obj.userData?.id && obj.parent) {
              obj = obj.parent;
            }
            if (obj && obj.userData?.id && photoMeshes.includes(obj) && nearbyHits[i].distance <= 18 && obj.position.z < camera.position.z + 1) {
              hitMesh = obj;
              cardId = obj.userData.id;
              break;
            }
          }
          if (hitMesh) break;
        }
      }

      if (hitMesh && cardId) {
        const matchedItem = TUNNEL_IMAGES.find((e) => e.id === cardId);
        if (matchedItem) {
          lastInspectActionTime = now;
          if (s.focusedMesh && s.focusedOrigin) {
            s.focusedMesh.position.copy(s.focusedOrigin.pos);
            s.focusedMesh.rotation.copy(s.focusedOrigin.rot);
            s.focusedMesh.scale.copy(s.focusedOrigin.scale);
          }
          s.focusedMesh = hitMesh;
          s.focusedOrigin = {
            pos: hitMesh.position.clone(),
            rot: hitMesh.rotation.clone(),
            scale: hitMesh.scale.clone()
          };
          setFocusedItem(matchedItem);
        }
      }
    };

    const onPointerDown = (e) => {
      activePointerId = e.pointerId;
      pointerDownPos = { x: e.clientX, y: e.clientY };
      pointerDownTime = performance.now();
      pointerMoved = false;
      isPointerPressed = true;

      // Update steering target on initial down
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      s.mouse.targetX = x * look * 1.5;
      s.mouse.targetY = y * look * 1.5;
    };

    let pointerDirty = true;

    const onPointerMove = (e) => {
      pointerDirty = true;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Only steer camera when not actively pressing down, preventing scene drift during a click
      if (e.pointerType !== "touch" && !isPointerPressed) {
        s.mouse.targetX = x * look * 2;
        s.mouse.targetY = y * look * 2;
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }

      if (activePointerId === e.pointerId) {
        const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
        if (dist > 8) {
          pointerMoved = true;
        }
      }
    };

    const onPointerUp = (e) => {
      if (e.pointerId === activePointerId) {
        isPointerPressed = false;
        const duration = performance.now() - pointerDownTime;
        const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);

        // Click / tap detection: <= 8px movement and <= 400ms duration
        if (!pointerMoved && dist <= 8 && duration <= 400) {
          inspectPhotoAt(pointerDownPos.x, pointerDownPos.y);
        }
        activePointerId = null;
      }
    };

    const onPointerCancel = (e) => {
      if (e.pointerId === activePointerId) {
        activePointerId = null;
        isPointerPressed = false;
        pointerMoved = true;
      }
    };

    const onClick = (e) => {
      if (performance.now() - lastInspectActionTime < 500) return;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (!pointerMoved && dist <= 8) {
        inspectPhotoAt(pointerDownPos.x, pointerDownPos.y);
      }
    };

    const onWheel = (e) => {
      if (!interactive || !wheel) return;
      e.preventDefault();

      if (s.focusedMesh) {
        closeFocus();
      }

      const dy = e.deltaY;
      const clamped = Math.sign(dy) * Math.min(Math.abs(dy), 60);
      s.scrollVelocity += clamped * 0.0008;
      s.targetZ -= clamped * 0.0035;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("click", onClick);
    if (wheel) {
      canvas.addEventListener("wheel", onWheel, { passive: false });
    }

    // 8. Animation Loop with Visibility Caching & Zero Per-Frame Allocations
    let lastTime = performance.now();
    let rafId = null;
    let isIntersecting = true;
    let isPageVisible = typeof document !== "undefined" ? !document.hidden : true;

    // Pre-allocated reusable vectors to prevent per-frame GC allocations
    const tempTargetPos = new THREE.Vector3();
    const tempScaleFocused = new THREE.Vector3(1.25, 1.25, 1.25);
    const tempScaleHovered = new THREE.Vector3(1.05, 1.05, 1.05);

    let raycastFrameCounter = 0;

    const animate = () => {
      if (!s.alive) return;
      rafId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Gentle auto-glide forward when not inspecting
      if (!s.focusedMesh && !s.reducedMotion) {
        s.targetZ -= speed * 1.5 * dt;
      }

      // Smooth, gentle scroll momentum damping (desktop wheel)
      if (!s.focusedMesh) {
        s.targetZ -= s.scrollVelocity * dt * 25;
        s.scrollVelocity *= 0.92;
      } else {
        s.scrollVelocity = 0;
      }

      // Touch momentum decay
      if (!s.focusedMesh && Math.abs(touchMomentumVelocity) > 0.0001) {
        s.targetZ += touchMomentumVelocity;
        touchMomentumVelocity *= TOUCH_MOMENTUM_DECAY;
      } else {
        touchMomentumVelocity = 0;
      }

      // Camera interpolation (gentle, buttery smooth)
      s.cameraZ += (s.targetZ - s.cameraZ) * 0.08;
      camera.position.z = s.cameraZ;

      // Pointer look interpolation (paused when inspecting so background stays still)
      if (!s.focusedMesh) {
        s.mouse.x += (s.mouse.targetX - s.mouse.x) * 0.07;
        s.mouse.y += (s.mouse.targetY - s.mouse.y) * 0.07;

        camera.rotation.y = -s.mouse.x * 0.32;
        camera.rotation.x = s.mouse.y * 0.24;
      }

      // Lights follow camera down corridor
      light1.position.set(-halfW * 0.5, halfH * 0.6, camera.position.z - 3.5);
      light2.position.set(halfW * 0.5, -halfH * 0.6, camera.position.z - 7.5);

      // Infinite Loop Wrapping: transverse rings wrap by totalDepth
      rectRings.forEach((ring) => {
        if (ring.position.z > camera.position.z + 2.5) {
          ring.position.z -= totalDepth;
        } else if (ring.position.z < camera.position.z - totalDepth + 2.5) {
          ring.position.z += totalDepth;
        }
      });

      // Hover highlight detection & desktop cursor feedback (throttled when pointer is still)
      raycastFrameCounter++;
      if (!s.focusedMesh && (pointerDirty || raycastFrameCounter % 4 === 0)) {
        pointerDirty = false;
        camera.updateMatrixWorld();
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(photoMeshes, false);
        let hitMesh = null;
        for (let i = 0; i < hits.length; i++) {
          let obj = hits[i].object;
          while (obj && !obj.userData?.id && obj.parent) {
            obj = obj.parent;
          }
          if (obj && obj.userData?.id && photoMeshes.includes(obj)) {
            if (hits[i].distance <= 18 && obj.position.z < camera.position.z + 1) {
              hitMesh = obj;
              break;
            }
          }
        }

        if (s.hoveredMesh !== hitMesh) {
          if (s.hoveredMesh && s.hoveredMesh !== s.focusedMesh) {
            s.hoveredMesh.userData.frameMat.opacity = 0.32;
            s.hoveredMesh.userData.frameMat.color.copy(s.hoveredMesh.userData.baseColor);
          }
          s.hoveredMesh = hitMesh;
          if (hitMesh) {
            hitMesh.userData.frameMat.opacity = 1.0;
            hitMesh.userData.frameMat.color.set(0xffffff);
          }
        }

        // Pointer cursor feedback on hover
        if (canvas) {
          canvas.style.cursor = hitMesh ? "pointer" : "grab";
          canvas.classList.toggle("clickable", Boolean(hitMesh));
        }
      }

      // Update corridor tiles & wrap forward/backward
      allTiles.forEach((mesh) => {
        if (mesh === s.focusedMesh) {
          // Smoothly animate focused photo to center front of camera (no allocation)
          camera.updateMatrixWorld();
          tempTargetPos.set(0, 0, -1.8).applyMatrix4(camera.matrixWorld);
          mesh.position.lerp(tempTargetPos, 0.12);
          mesh.quaternion.slerp(camera.quaternion, 0.12);
          mesh.scale.lerp(tempScaleFocused, 0.12);
        } else {
          // Infinite wrap along Z
          if (mesh.position.z > camera.position.z + 2.5) {
            mesh.position.z -= totalDepth;
            mesh.userData.originalPosition.z = mesh.position.z;
          } else if (mesh.position.z < camera.position.z - totalDepth + 2.5) {
            mesh.position.z += totalDepth;
            mesh.userData.originalPosition.z = mesh.position.z;
          }

          // Subtle float hover scale (reusing pre-allocated vectors)
          if (mesh === s.hoveredMesh) {
            mesh.scale.lerp(tempScaleHovered, 0.15);
          } else {
            mesh.scale.lerp(mesh.userData.originalScale, 0.15);
          }
        }
      });

      renderer.render(scene, camera);
    };

    // Pause rendering when gallery is off-screen or tab is hidden
    const updatePlayState = () => {
      const shouldPlay = isIntersecting && isPageVisible && s.alive;
      if (shouldPlay && !rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate);
      } else if (!shouldPlay && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isIntersecting = entry.isIntersecting;
          updatePlayState();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isPageVisible = typeof document !== "undefined" ? !document.hidden : true;
      updatePlayState();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Initial play start
    updatePlayState();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      s.alive = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("click", onClick);
      if (wheel) canvas.removeEventListener("wheel", onWheel);

      floorCeilGeom.dispose();
      wallGeom.dispose();
      floorOutlineGeom.dispose();
      wallOutlineGeom.dispose();
      rectRingGeom.dispose();
      gridMat.dispose();

      placeholderTex.dispose();

      createdTextures.forEach((tex) => {
        try {
          tex.dispose();
        } catch {}
      });

      createdPhotoMaterials.forEach((mat) => {
        mat.dispose();
      });

      accentMaterials.forEach((mat) => {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });

      allTiles.forEach((mesh) => {
        mesh.userData.frameMat?.dispose();
      });

      try {
        renderer.dispose();
        renderer.forceContextLoss();
      } catch {}
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [items, colors, backgroundColor, speed, look, fov, lanes, photoFill, accentFill, interactive, focusOnClick, wheel, seed, ariaLabel, closeFocus]);

  return (
    <div
      ref={containerRef}
      className="passage-gallery-container"
      data-lenis-prevent="true"
      aria-label={ariaLabel}
    >
      {/* Controls Hint Bar with Scroll to Glide and Continue Page Shortcut */}
      {!focusedItem && (
        <div
          className="passage-hint-bar"
          aria-label="Gallery controls guide"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="passage-hint-item passage-hint-desktop-only">
            <span className="passage-hint-dot" aria-hidden="true"></span>
            <span>Scroll to Glide</span>
          </div>
          <span className="passage-hint-sep passage-hint-desktop-only" aria-hidden="true">•</span>
          <div className="passage-hint-item passage-hint-desktop-only">
            <span>Cursor to Steer</span>
          </div>
          <span className="passage-hint-sep passage-hint-desktop-only" aria-hidden="true">•</span>
          <div className="passage-hint-item">
            <span className="passage-hint-dot passage-hint-mobile-dot" aria-hidden="true"></span>
            <span>Click Photo to Inspect</span>
          </div>
          <span className="passage-hint-sep" aria-hidden="true">•</span>
          <button
            className="passage-hint-skip"
            onClick={(e) => {
              e.stopPropagation();
              const el =
                containerRef.current?.closest(".passage-outer-container")?.nextElementSibling ||
                containerRef.current?.closest(".passage-section-wrapper")?.nextElementSibling;
              if (el) {
                scrollTo(el, { duration: 1.2 });
              } else {
                scrollTo(window.scrollY + window.innerHeight * 0.8, { duration: 1.2 });
              }
            }}
            aria-label="Scroll past gallery to next section"
          >
            Continue Page ↓
          </button>
        </div>
      )}

      {/* Focused Photo Inspection Modal Overlay (Portaled to document.body so it stays full-viewport) */}
      {focusedItem && captions && typeof document !== "undefined" && createPortal(
        <PassageInspectModal item={focusedItem} onClose={closeFocus} />,
        document.body
      )}
    </div>
  );
}
