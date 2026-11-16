'use client';
import { useEffect, useRef, useCallback } from 'react';
import './HeroBanner.css';

const HI_TEXT = "Hi! I'm Aashi";

function buildLetters() {
  return HI_TEXT.split('').map((ch, i) => ({ ch, i }));
}

const LETTERS = buildLetters();
const REST_WEIGHT  = 700;
const HOVER_WEIGHT = 200;
const LERP_FACTOR  = 0.16;
const RADIUS       = 140;
const SETTLE_DELTA = 0.5;

function SparkleSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sparkle-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#AD89E8" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#CDBCF5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#AD89E8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sp-glow)" />
      <path
        d="M 50 2 Q 50 48 2 50 Q 50 52 50 98 Q 50 52 98 50 Q 50 48 50 2 Z"
        fill="#CDBCF5"
      />
      <polygon points="50,38 54,50 50,62 46,50" fill="#FFFFFF" />
      <polygon points="38,50 50,46 62,50 50,54" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
    </svg>
  );
}

export default function HeroBanner() {
  const containerRef    = useRef(null);
  const letterRefs      = useRef([]);
  const maskRefs        = useRef([]);
  const rafRef          = useRef(null);
  const weightsRef      = useRef(LETTERS.map(() => REST_WEIGHT));
  const targetsRef      = useRef(LETTERS.map(() => REST_WEIGHT));
  const cursorRef       = useRef({ x: -9999, y: -9999, inside: false });
  const hoverActiveRef  = useRef(false);
  const widthsLockedRef = useRef(false);

  // Lock each letter's width to its resting-weight width to prevent layout shift
  const lockWidths = useCallback(() => {
    if (widthsLockedRef.current) return;
    const masks = maskRefs.current;
    const spans = letterRefs.current;
    if (!masks.length || !spans.length) return;

    // Ensure initial weight is rest weight
    spans.forEach((s) => {
      if (s) s.style.fontVariationSettings = `'wght' ${REST_WEIGHT}`;
    });

    // Synchronously measure and lock bounding widths
    masks.forEach((m, idx) => {
      const s = spans[idx];
      if (m && s) {
        const w = s.getBoundingClientRect().width;
        if (w > 0) {
          const wFixed = `${Math.ceil(w * 10) / 10}px`;
          m.style.width = wFixed;
          m.style.minWidth = wFixed;
          s.style.width = wFixed;
        }
      }
    });
    widthsLockedRef.current = true;
  }, []);

  // Single rAF loop for smooth hover interpolation
  const startRaf = useCallback(() => {
    if (rafRef.current) return;
    function loop() {
      let settled = true;
      const spans   = letterRefs.current;
      const weights = weightsRef.current;
      const targets = targetsRef.current;

      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        if (!span) continue;
        const diff = targets[i] - weights[i];
        if (Math.abs(diff) > SETTLE_DELTA) {
          settled = false;
          weights[i] += diff * LERP_FACTOR;
        } else {
          weights[i] = targets[i];
        }
        span.style.fontVariationSettings = `'wght' ${Math.round(weights[i])}`;
      }

      if (settled) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // Update target weight per letter based on cursor distance
  const updateTargets = useCallback(() => {
    if (!hoverActiveRef.current) return;
    const spans = letterRefs.current;
    const { x: cx, y: cy, inside } = cursorRef.current;
    const targets = targetsRef.current;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (!span || !inside) {
        targets[i] = REST_WEIGHT;
        continue;
      }

      const rect = span.getBoundingClientRect();
      const mx   = rect.left + rect.width / 2;
      const my   = rect.top + rect.height / 2;
      const dist = Math.hypot(cx - mx, cy - my);

      const t = Math.min(dist / RADIUS, 1);
      const s = t * t * (3 - 2 * t); // smoothstep
      targets[i] = REST_WEIGHT - (REST_WEIGHT - HOVER_WEIGHT) * (1 - s);
    }
  }, []);

  const onPointerMove = useCallback((e) => {
    cursorRef.current = { x: e.clientX, y: e.clientY, inside: true };
    updateTargets();
    startRaf();
  }, [updateTargets, startRaf]);

  const onPointerLeave = useCallback(() => {
    cursorRef.current.inside = false;
    targetsRef.current.fill(REST_WEIGHT);
    startRaf();
  }, [startRaf]);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || noMotion) return;

    if (document.fonts) {
      document.fonts.ready.then(lockWidths);
    } else {
      setTimeout(lockWidths, 200);
    }

    const heroWrapper = document.querySelector('.header.container');
    const activateHover = () => { hoverActiveRef.current = true; };

    let activateTimer = null;
    if (heroWrapper && heroWrapper.dataset.intro === 'done') {
      activateHover();
    } else {
      // Intro timeline: hover effect active from 3400ms
      activateTimer = setTimeout(activateHover, 3400);
    }

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      clearTimeout(activateTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [lockWidths, onPointerMove, onPointerLeave]);

  return (
    <div className="banner-wrap">
      {/* Top Left Label */}
      <div className="banner-label-left" aria-hidden="true">
        /UI UX Designer/
      </div>

      {/* Top Right Label */}
      <div className="banner-label-right" aria-hidden="true">
        /Brand Strategist/
      </div>

      {/* Centered "Hi! I'm aashi" with per-letter masked wrappers */}
      <p
        className="hi-aashi-text"
        ref={containerRef}
        aria-label="Hi! I'm aashi"
      >
        {LETTERS.map(({ ch, i }) => {
          if (ch === ' ') {
            return (
              <span key={i} className="hi-space" aria-hidden="true">
                &nbsp;
              </span>
            );
          }
          return (
            <span
              key={i}
              className="hi-letter-mask"
              ref={(el) => { maskRefs.current[i] = el; }}
              aria-hidden="true"
            >
              <span
                className="hi-letter"
                ref={(el) => { letterRefs.current[i] = el; }}
              >
                {ch}
              </span>
            </span>
          );
        })}
      </p>

      {/* 4 Sparkles */}
      <div className="banner-sparkles" aria-hidden="true">
        <span className="banner-sparkle sp-1">
          <SparkleSvg />
        </span>
        <span className="banner-sparkle sp-2">
          <SparkleSvg />
        </span>
        <span className="banner-sparkle sp-3">
          <SparkleSvg />
        </span>
        <span className="banner-sparkle sp-4">
          <SparkleSvg />
        </span>
      </div>
    </div>
  );
}

export { HeroBanner };

