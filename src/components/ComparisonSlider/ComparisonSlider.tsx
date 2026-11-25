'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export const SPRING = {
  stiffness: 260,
  damping: 32,
  mass: 0.8,
};

export const MIN_POSITION = 3;
export const MAX_POSITION = 97;
export const INITIAL_POSITION = 50;

export const INTRO_KEYFRAMES = {
  phase1End: 700,
  pause1End: 850,
  phase2End: 1950,
  pause2End: 2100,
  phase3End: 2900,
};

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export interface ComparisonSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeBlur?: string;
  afterBlur?: string;
}

export default function ComparisonSlider({
  beforeSrc = '/images/branding/before.webp',
  afterSrc = '/images/branding/after.webp',
  beforeAlt = 'Unbranded retail shop scene showing a woman holding a phone with generic unbranded black and white chips packaging',
  afterAlt = 'Branded retail shop scene showing a woman holding a phone with vibrant colorful Lipty chips packaging and bizzy branding',
  beforeBlur = 'data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAkAA4BaJYwCdAC3sFBAAQAA/vCDGd07qb/Gs9RaeT+QboP614e10ZgJS6nEvqXOWUwH+PYPRoGCP6Qk39XwBRXszN5E8/A4UAAA',
  afterBlur = 'data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACwAQCdASoQAAkAA4BaJQBOgBb9H5OAAP7wgxndOBW/N4RaNQjDkyN66zPCHai3qRvhiocW5DQfiQo6vPKh/5QKQsxwxuthYhTI+BxNCBhQcQDsDjRQQAAA',
}: ComparisonSliderProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  const currentPRef = useRef(INITIAL_POSITION);
  const targetPRef = useRef(INITIAL_POSITION);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const cardWidthRef = useRef(0);

  const isDraggingRef = useRef(false);
  const [isActive, setIsActive] = useState(false);
  const hasInteractedRef = useRef(false);
  const introRafIdRef = useRef<number | null>(null);
  const introDoneRef = useRef(false);

  const touchStartRef = useRef({ x: 0, y: 0, isDragging: false, isDetermined: false });

  const [imagesReady, setImagesReady] = useState(false);
  const beforeLoadedRef = useRef(false);
  const afterLoadedRef = useRef(false);

  const prefersReducedMotionRef = useRef(false);

  const updateDOM = useCallback((pos: number) => {
    if (beforeLayerRef.current) {
      const insetRight = (100 - pos).toFixed(3);
      const clipVal = `inset(0 ${insetRight}% 0 0)`;
      beforeLayerRef.current.style.clipPath = clipVal;
      (beforeLayerRef.current.style as unknown as { webkitClipPath: string }).webkitClipPath =
        clipVal;
    }
    if (dividerRef.current && cardWidthRef.current > 0) {
      const xPx = (cardWidthRef.current * (pos / 100)).toFixed(2);
      dividerRef.current.style.transform = `translate3d(${xPx}px, 0, 0)`;
    }
    if (handleRef.current) {
      handleRef.current.setAttribute('aria-valuenow', Math.round(pos).toString());
    }
  }, []);

  const stopSpringLoop = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (!isDraggingRef.current) {
      if (beforeLayerRef.current) beforeLayerRef.current.style.willChange = 'auto';
      if (dividerRef.current) dividerRef.current.style.willChange = 'auto';
    }
  }, []);

  const startSpringLoop = useCallback(() => {
    if (rafIdRef.current) return;
    lastTimeRef.current = performance.now();

    if (beforeLayerRef.current) beforeLayerRef.current.style.willChange = 'clip-path';
    if (dividerRef.current) dividerRef.current.style.willChange = 'transform';

    const stepLoop = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = time;

      if (prefersReducedMotionRef.current) {
        currentPRef.current = targetPRef.current;
        velocityRef.current = 0;
        updateDOM(currentPRef.current);
        stopSpringLoop();
        return;
      }

      const displacement = currentPRef.current - targetPRef.current;
      const springForce = -SPRING.stiffness * displacement;
      const dampingForce = -SPRING.damping * velocityRef.current;
      const accel = (springForce + dampingForce) / SPRING.mass;

      velocityRef.current += accel * dt;
      currentPRef.current += velocityRef.current * dt;

      currentPRef.current = Math.max(MIN_POSITION, Math.min(MAX_POSITION, currentPRef.current));

      updateDOM(currentPRef.current);

      if (
        !isDraggingRef.current &&
        Math.abs(currentPRef.current - targetPRef.current) < 0.015 &&
        Math.abs(velocityRef.current) < 0.04
      ) {
        currentPRef.current = targetPRef.current;
        velocityRef.current = 0;
        updateDOM(currentPRef.current);
        stopSpringLoop();
        return;
      }

      rafIdRef.current = requestAnimationFrame(stepLoop);
    };

    rafIdRef.current = requestAnimationFrame(stepLoop);
  }, [updateDOM, stopSpringLoop]);

  const cancelIntro = useCallback(() => {
    if (introRafIdRef.current) {
      cancelAnimationFrame(introRafIdRef.current);
      introRafIdRef.current = null;
    }
    introDoneRef.current = true;
    hasInteractedRef.current = true;
  }, []);

  const setTargetPosition = useCallback(
    (newPos: number) => {
      const clamped = Math.max(MIN_POSITION, Math.min(MAX_POSITION, newPos));
      targetPRef.current = clamped;
      startSpringLoop();
    },
    [startSpringLoop]
  );

  const setTargetFromClientX = useCallback(
    (clientX: number, rect: DOMRect | undefined) => {
      if (!rect || rect.width <= 0) return;
      const relX = clientX - rect.left;
      const rawPos = (relX / rect.width) * 100;
      setTargetPosition(rawPos);
    },
    [setTargetPosition]
  );

  const runIntroDemo = useCallback(() => {
    if (introDoneRef.current || hasInteractedRef.current || prefersReducedMotionRef.current) return;
    introDoneRef.current = true;

    let startTime = 0;
    const { phase1End, pause1End, phase2End, pause2End, phase3End } = INTRO_KEYFRAMES;

    const introStep = (now: number) => {
      if (hasInteractedRef.current) return;
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      let pos = 50;
      if (elapsed <= phase1End) {
        const t = elapsed / phase1End;
        pos = 50 + (22 - 50) * easeInOutCubic(t);
      } else if (elapsed <= pause1End) {
        pos = 22;
      } else if (elapsed <= phase2End) {
        const t = (elapsed - pause1End) / (phase2End - pause1End);
        pos = 22 + (78 - 22) * easeInOutCubic(t);
      } else if (elapsed <= pause2End) {
        pos = 78;
      } else if (elapsed <= phase3End) {
        const t = (elapsed - pause2End) / (phase3End - pause2End);
        pos = 78 + (50 - 78) * easeOutCubic(t);
      } else {
        pos = 50;
        setTargetPosition(50);
        return;
      }

      setTargetPosition(pos);
      introRafIdRef.current = requestAnimationFrame(introStep);
    };

    introRafIdRef.current = requestAnimationFrame(introStep);
  }, [setTargetPosition]);

  const handleImageLoaded = useCallback((type: 'before' | 'after') => {
    if (type === 'before') beforeLoadedRef.current = true;
    if (type === 'after') afterLoadedRef.current = true;

    if (beforeLoadedRef.current && afterLoadedRef.current) {
      setImagesReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotionRef.current = mediaQuery.matches;
      const onChange = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener?.('change', onChange);
    }

    const cardEl = cardRef.current;
    if (!cardEl) return;

    cardWidthRef.current = cardEl.clientWidth;
    updateDOM(currentPRef.current);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        cardWidthRef.current = entry.contentRect.width;
        updateDOM(currentPRef.current);
      }
    });
    resizeObserver.observe(cardEl);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (imagesReady) {
              runIntroDemo();
            }
          }
        }
      },
      { threshold: [0.5] }
    );
    intersectionObserver.observe(cardEl);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stopSpringLoop();
      cancelIntro();
    };
  }, [imagesReady, updateDOM, runIntroDemo, stopSpringLoop, cancelIntro]);

  useEffect(() => {
    if (imagesReady && !introDoneRef.current && !hasInteractedRef.current) {
      const cardEl = cardRef.current;
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const visibleH = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        if (visibleH / rect.height >= 0.5) {
          runIntroDemo();
        }
      }
    }
  }, [imagesReady, runIntroDemo]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelIntro();
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();

    if (e.pointerType === 'touch') {
      touchStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        isDragging: false,
        isDetermined: false,
      };
    } else {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      isDraggingRef.current = true;
      setIsActive(true);
      setTargetFromClientX(e.clientX, rect);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();

    if (e.pointerType === 'touch') {
      const start = touchStartRef.current;
      if (!start.isDetermined) {
        const dx = Math.abs(e.clientX - start.x);
        const dy = Math.abs(e.clientY - start.y);
        if (dx > 6 || dy > 6) {
          start.isDetermined = true;
          if (dx > dy) {
            start.isDragging = true;
            isDraggingRef.current = true;
            setIsActive(true);
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {}
            setTargetFromClientX(e.clientX, rect);
          } else {
            start.isDragging = false;
          }
        }
      } else if (start.isDragging) {
        setTargetFromClientX(e.clientX, rect);
      }
    } else if (isDraggingRef.current) {
      setTargetFromClientX(e.clientX, rect);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') {
      const start = touchStartRef.current;
      if (
        !start.isDetermined ||
        (!start.isDragging && Math.hypot(e.clientX - start.x, e.clientY - start.y) < 6)
      ) {
        const cardEl = cardRef.current;
        if (cardEl) {
          const rect = cardEl.getBoundingClientRect();
          setTargetFromClientX(e.clientX, rect);
        }
      }
      touchStartRef.current.isDragging = false;
    }

    isDraggingRef.current = false;
    setIsActive(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    let stepVal = 0;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      stepVal = -2;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      stepVal = 2;
    } else if (e.key === 'PageDown') {
      stepVal = -10;
    } else if (e.key === 'PageUp') {
      stepVal = 10;
    } else if (e.key === 'Home') {
      cancelIntro();
      setTargetPosition(MIN_POSITION);
      e.preventDefault();
      return;
    } else if (e.key === 'End') {
      cancelIntro();
      setTargetPosition(MAX_POSITION);
      e.preventDefault();
      return;
    }

    if (stepVal !== 0) {
      cancelIntro();
      setTargetPosition(targetPRef.current + stepVal);
      e.preventDefault();
    }
  };

  return (
    <div className="cs-wrapper">
      <div
        ref={cardRef}
        className={`cs-card ${isActive ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        tabIndex={-1}
      >
        <div className="cs-layer cs-layer-after" aria-hidden="true">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(max-width: 900px) 100vw, 1380px"
            quality={80}
            priority={false}
            placeholder="blur"
            blurDataURL={afterBlur}
            className="cs-img"
            onLoad={() => handleImageLoaded('after')}
          />
        </div>

        <div ref={beforeLayerRef} className="cs-layer cs-layer-before" aria-hidden="true">
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 900px) 100vw, 1380px"
            quality={80}
            priority={false}
            placeholder="blur"
            blurDataURL={beforeBlur}
            className="cs-img"
            onLoad={() => handleImageLoaded('before')}
          />
        </div>

        <div ref={dividerRef} className="cs-divider-wrap" aria-hidden="true">
          <div className="cs-divider-line" />
          <button
            ref={handleRef}
            type="button"
            className={`cs-handle ${isActive ? 'is-active' : ''}`}
            role="slider"
            aria-label="Compare before and after brand identity"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={50}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <svg
              className="cs-chevrons"
              viewBox="0 0 20 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 2L1 7L6 12"
                stroke="#111113"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2L19 7L14 12"
                stroke="#111113"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
