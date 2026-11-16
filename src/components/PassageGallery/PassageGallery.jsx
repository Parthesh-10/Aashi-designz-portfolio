'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import './PassageGallery.css';

const DEFAULT_COLORS = ['#5227FF', '#FF9FFC'];
const DEFAULT_BG = '#06020c';

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
  geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geom.computeVertexNormals();
  return geom;
}

// Helper: Procedural vibrant gradient accent textures matching React Bits Pro corridor
function createAccentTexture(variant) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f051d';
  ctx.fillRect(0, 0, 512, 512);

  if (variant === 0) {
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#5227FF');
    grad.addColorStop(0.5, '#FF2A85');
    grad.addColorStop(1, '#FF9F1C');
    ctx.lineWidth = 90;
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 320, 160, Math.PI, 0);
    ctx.stroke();
  } else if (variant === 1) {
    const grad = ctx.createRadialGradient(256, 200, 30, 256, 200, 220);
    grad.addColorStop(0, '#FF4B72');
    grad.addColorStop(0.6, '#9D174D');
    grad.addColorStop(1, '#1A0B2E');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 220, 140, 0, Math.PI * 2);
    ctx.fill();
  } else if (variant === 2) {
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, '#7928CA');
    grad.addColorStop(0.5, '#FF0080');
    grad.addColorStop(1, '#FF8A00');
    ctx.lineWidth = 80;
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(60, 120);
    ctx.bezierCurveTo(200, 120, 300, 390, 450, 390);
    ctx.stroke();
  } else {
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#FF2E93');
    grad.addColorStop(0.6, '#FF8B3D');
    grad.addColorStop(1, '#FFD166');
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

export default function PassageGallery({
  items = [],
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
  ariaLabel = 'Interactive 3D Passage Gallery of creative portfolio works'
}) {
  const containerRef = useRef(null);
  const [focusedItem, setFocusedItem] = useState(null);

  const stateRef = useRef({
    cameraZ: 0,
    targetZ: 0,
    scrollVelocity: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    pointerDownPos: { x: 0, y: 0 },
    touchStart: { y: 0, targetZ: 0 },
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
    setFocusedItem(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeFocus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeFocus]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const s = stateRef.current;
    s.alive = true;
    s.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

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
        powerPreference: 'high-performance'
      });
    } catch {
      return undefined;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const canvas = renderer.domElement;
    canvas.className = 'passage-gallery-canvas';
    canvas.setAttribute('aria-label', ariaLabel);
    container.appendChild(canvas);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const color1 = new THREE.Color(colors[0] || DEFAULT_COLORS[0]);
    const color2 = new THREE.Color(colors[1] || DEFAULT_COLORS[1]);

    const light1 = new THREE.PointLight(color1, 40, 22);
    const light2 = new THREE.PointLight(color2, 40, 22);
    scene.add(light1, light2);

    // 3. Rectangular Corridor Geometry (Matching Reference Screenshot)
    // 5 lanes across floor and ceiling, 2 lanes high on walls
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

    // 4. Subtle Wireframe Grid Structure
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

    // 5. Preload Photo Textures & Accent Textures
    const textureLoader = new THREE.TextureLoader();
    const photoMaterials = items.map((item) => {
      const texture = textureLoader.load(item.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;

      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.35,
        metalness: 0.05,
        side: THREE.DoubleSide
      });
    });

    // Procedural accent gradient materials
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
          // Empty dark grid cell (matches reference screenshot!)
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
        if (isPhoto && photoMaterials.length > 0) {
          const pIdx = photoCursor % photoMaterials.length;
          photoCursor++;
          material = photoMaterials[pIdx];
          item = items[pIdx];
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
        mesh.add(frameLine);

        mesh.userData = {
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

    // 7. Interaction: Calibrated Smooth Scroll & Rock-Solid Click Inspection
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onPointerMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      pointer.x = x;
      pointer.y = y;

      s.mouse.targetX = x * look * 0.75;
      s.mouse.targetY = y * look * 0.55;

      // Hover feedback: pointer cursor & neon glow when over clickable photo
      if (!s.focusedMesh) {
        camera.updateMatrixWorld();
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(photoMeshes, true);
        if (hits.length > 0) {
          canvas.style.cursor = 'pointer';
        } else {
          canvas.style.cursor = 'default';
        }
      }
    };

    // Slower, graceful scroll sensitivity
    const onWheel = (e) => {
      if (!wheel) return;
      e.preventDefault();

      if (s.focusedMesh) {
        closeFocus();
      }

      // Normalized, significantly gentler scroll delta
      const raw = e.deltaY;
      const clamped = Math.sign(raw) * Math.min(Math.abs(raw), 50);

      s.scrollVelocity += clamped * 0.0006;
      s.targetZ -= clamped * 0.0022;
    };

    // Touch swipe on mobile
    const onTouchStart = (e) => {
      if (!interactive || e.touches.length !== 1) return;
      s.touchStart.y = e.touches[0].clientY;
      s.touchStart.targetZ = s.targetZ;
    };

    const onTouchMove = (e) => {
      if (!interactive || e.touches.length !== 1) return;
      const deltaY = e.touches[0].clientY - s.touchStart.y;
      s.targetZ = s.touchStart.targetZ + deltaY * 0.012;
    };

    // Pointer down: record position to differentiate click from drag
    const onPointerDown = (e) => {
      if (!interactive || e.button > 0) return;
      s.pointerDownPos.x = e.clientX;
      s.pointerDownPos.y = e.clientY;
    };

    // Native Click Handler for Click-to-Inspect
    const onClick = (e) => {
      if (!interactive || !focusOnClick || e.button > 0) return;

      // Ignore if user dragged or swiped
      const dist = Math.hypot(e.clientX - s.pointerDownPos.x, e.clientY - s.pointerDownPos.y);
      if (dist > 15) return;

      const rect = canvas.getBoundingClientRect();
      const clickPointer = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      camera.updateMatrixWorld();
      raycaster.setFromCamera(clickPointer, camera);
      const hits = raycaster.intersectObjects(photoMeshes, true);

      if (hits.length > 0) {
        let hitMesh = hits[0].object;
        while (hitMesh && !photoMeshes.includes(hitMesh) && hitMesh.parent) {
          hitMesh = hitMesh.parent;
        }

        if (hitMesh && photoMeshes.includes(hitMesh) && hitMesh.userData?.item) {
          if (s.focusedMesh === hitMesh) {
            closeFocus();
          } else {
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
            setFocusedItem(hitMesh.userData.item);
          }
        }
      } else if (s.focusedMesh) {
        closeFocus();
      }
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    if (wheel) {
      canvas.addEventListener('wheel', onWheel, { passive: false });
    }

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 9. Animation Loop
    let rafId = 0;
    let lastTime = performance.now();

    const animate = (time) => {
      if (!s.alive) return;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Gentle auto-cruising when idle
      if (!s.focusedMesh && !s.reducedMotion) {
        s.targetZ -= speed * 1.5 * dt;
      }

      // Smooth, gentle scroll momentum damping
      s.targetZ -= s.scrollVelocity * dt * 25;
      s.scrollVelocity *= 0.92;

      // Camera interpolation (gentle, buttery smooth)
      s.cameraZ += (s.targetZ - s.cameraZ) * 0.08;
      camera.position.z = s.cameraZ;

      // Pointer look interpolation
      s.mouse.x += (s.mouse.targetX - s.mouse.x) * 0.07;
      s.mouse.y += (s.mouse.targetY - s.mouse.y) * 0.07;

      camera.rotation.y = -s.mouse.x * 0.32;
      camera.rotation.x = s.mouse.y * 0.24;

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

      // Hover highlight detection
      if (!s.focusedMesh) {
        camera.updateMatrixWorld();
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(photoMeshes, true);
        let hitMesh = hits.length > 0 ? hits[0].object : null;
        while (hitMesh && !photoMeshes.includes(hitMesh) && hitMesh.parent) {
          hitMesh = hitMesh.parent;
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
      }

      // Update corridor tiles & wrap forward/backward
      allTiles.forEach((mesh) => {
        if (mesh === s.focusedMesh) {
          // Smoothly animate focused photo to center front of camera
          camera.updateMatrixWorld();
          const targetPos = new THREE.Vector3(0, 0, -1.8).applyMatrix4(camera.matrixWorld);
          mesh.position.lerp(targetPos, 0.12);
          mesh.quaternion.slerp(camera.quaternion, 0.12);
          mesh.scale.lerp(new THREE.Vector3(1.25, 1.25, 1.25), 0.12);
        } else {
          // Infinite wrap along Z
          if (mesh.position.z > camera.position.z + 2.5) {
            mesh.position.z -= totalDepth;
            mesh.userData.originalPosition.z = mesh.position.z;
          } else if (mesh.position.z < camera.position.z - totalDepth + 2.5) {
            mesh.position.z += totalDepth;
            mesh.userData.originalPosition.z = mesh.position.z;
          }

          // Subtle float hover scale
          if (mesh === s.hoveredMesh) {
            mesh.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.15);
          } else {
            mesh.scale.lerp(mesh.userData.originalScale, 0.15);
          }
        }
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // 10. WebGL Cleanup
    return () => {
      s.alive = false;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      if (wheel) canvas.removeEventListener('wheel', onWheel);

      floorCeilGeom.dispose();
      wallGeom.dispose();
      floorOutlineGeom.dispose();
      wallOutlineGeom.dispose();
      rectRingGeom.dispose();
      gridMat.dispose();

      photoMaterials.forEach((mat) => {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });

      accentMaterials.forEach((mat) => {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });

      allTiles.forEach((mesh) => {
        mesh.userData.frameMat?.dispose();
      });

      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [items, colors, backgroundColor, speed, look, fov, lanes, photoFill, accentFill, interactive, focusOnClick, wheel, seed, ariaLabel, closeFocus]);

  return (
    <div ref={containerRef} className="passage-gallery-container" aria-label={ariaLabel}>
      {/* Controls Hint Bar with Scroll to Glide and Continue Page Shortcut */}
      {!focusedItem && (
        <div className="passage-hint-bar" aria-hidden="false">
          <div className="passage-hint-item">
            <span className="passage-hint-dot"></span>
            <span>Scroll to Glide</span>
          </div>
          <span>•</span>
          <div className="passage-hint-item">
            <span>Cursor to Steer</span>
          </div>
          <span>•</span>
          <div className="passage-hint-item">
            <span>Click Photo to Inspect</span>
          </div>
          <span>•</span>
          <button
            className="passage-hint-skip"
            onClick={() => {
              const el = containerRef.current?.closest('.passage-section-wrapper')?.nextElementSibling;
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
              }
            }}
            aria-label="Scroll past gallery to next section"
          >
            Continue Page ↓
          </button>
        </div>
      )}

      {/* Focused Photo Inspection Modal Overlay */}
      {focusedItem && captions && (
        <div
          className="passage-focus-overlay"
          onClick={closeFocus}
          role="dialog"
          aria-modal="true"
          aria-label={focusedItem.title || 'Focused portfolio item'}
        >
          <div className="passage-caption-card" onClick={(e) => e.stopPropagation()}>
            <div className="passage-focus-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={focusedItem.src}
                alt={focusedItem.alt || focusedItem.title}
                className="passage-focus-image"
              />
            </div>
            <div className="passage-caption-content">
              <h4 className="passage-caption-title">{focusedItem.title}</h4>
              <p className="passage-caption-desc">{focusedItem.caption}</p>
              <button
                className="passage-close-btn"
                onClick={closeFocus}
                aria-label="Close full view"
              >
                <span>✕ Return to Passage (Esc)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
