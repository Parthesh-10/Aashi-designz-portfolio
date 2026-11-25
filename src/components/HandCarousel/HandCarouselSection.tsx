'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SlideItem {
  src: string;
  alt: string;
}

const SLIDES: SlideItem[] = [
  { src: '/About%20me/1.png', alt: 'Project 1 that got out of hand' },
  { src: '/About%20me/2.png', alt: 'Project 2 that got out of hand' },
  { src: '/About%20me/3.png', alt: 'Project 3 that got out of hand' },
  { src: '/About%20me/4.png', alt: 'Project 4 that got out of hand' },
  { src: '/About%20me/5.png', alt: 'Project 5 that got out of hand' },
];

const AUTOPLAY_INTERVAL_MS = 2500;
const TRANSITION_DURATION_MS = 750;

interface AnimatingState {
  from: number;
  to: number;
  direction: 'next' | 'prev';
}

export default function HandCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingState, setAnimatingState] = useState<AnimatingState | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [timerToken, setTimerToken] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rafId = requestAnimationFrame(() => setPrefersReducedMotion(mq.matches));
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => {
      cancelAnimationFrame(rafId);
      mq.removeEventListener('change', handler);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const resetTimer = useCallback(() => {
    setTimerToken((prev) => prev + 1);
  }, []);

  const goToNext = useCallback(
    (isManual = false) => {
      if (isManual) resetTimer();

      if (prefersReducedMotion) {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        return;
      }

      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const from = currentIndex;
      const to = (currentIndex + 1) % SLIDES.length;

      setAnimatingState({ from, to, direction: 'next' });
      setCurrentIndex(to);
    },
    [currentIndex, prefersReducedMotion, resetTimer]
  );

  const goToPrev = useCallback(
    (isManual = false) => {
      if (isManual) resetTimer();

      if (prefersReducedMotion) {
        setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
        return;
      }

      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const from = currentIndex;
      const to = (currentIndex - 1 + SLIDES.length) % SLIDES.length;

      setAnimatingState({ from, to, direction: 'prev' });
      setCurrentIndex(to);
    },
    [currentIndex, prefersReducedMotion, resetTimer]
  );

  useEffect(() => {
    if (!animatingState) return;

    const timer = setTimeout(() => {
      setAnimatingState(null);
      isTransitioningRef.current = false;
    }, TRANSITION_DURATION_MS);

    return () => clearTimeout(timer);
  }, [animatingState]);

  useEffect(() => {
    if (prefersReducedMotion || isHovered || isFocused || isDocumentHidden || !isInView) {
      return;
    }

    const intervalId = setInterval(() => {
      goToNext(false);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [prefersReducedMotion, isHovered, isFocused, isDocumentHidden, isInView, timerToken, goToNext]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goToPrev(true);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goToNext(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    pointerStartXRef.current = e.clientX;
    pointerStartYRef.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartXRef.current === null && pointerStartYRef.current === null) return;
    const diffX = e.clientX - (pointerStartXRef.current ?? e.clientX);
    const diffY = e.clientY - (pointerStartYRef.current ?? e.clientY);
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;

    if (Math.abs(diffY) > 35 || Math.abs(diffX) > 40) {
      if (diffY < -30 || diffX < -40) {
        goToNext(true);
      } else if (diffY > 30 || diffX > 40) {
        goToPrev(true);
      }
    }
  };

  const handlePointerCancel = () => {
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
  };

  const getSlideClass = (idx: number): string => {
    if (!animatingState) {
      if (idx === currentIndex) return 'handcarousel-slide-active';
      if (idx === (currentIndex + 1) % SLIDES.length) return 'handcarousel-slide-peek';
      return 'handcarousel-slide-hidden';
    }

    const { from, to, direction } = animatingState;

    if (direction === 'next') {
      if (idx === from) return 'handcarousel-slide-exit-up';
      if (idx === to) return 'handcarousel-slide-promote';
      if (idx === (to + 1) % SLIDES.length) return 'handcarousel-slide-emerge';
      return 'handcarousel-slide-hidden';
    }

    if (direction === 'prev') {
      if (idx === to) return 'handcarousel-slide-enter-down';
      if (idx === from) return 'handcarousel-slide-demote';
      if (idx === (from + 1) % SLIDES.length) return 'handcarousel-slide-drop-out';
      return 'handcarousel-slide-hidden';
    }

    return 'handcarousel-slide-hidden';
  };

  return (
    <section className="handcarousel-section container">
      <div className="handcarousel-header">
        <h2 className="handcarousel-heading">What got out of my hand?</h2>
        <p className="handcarousel-paragraph">
          The thing about having too many ideas is that, eventually, they leave your head and become actual things. Not always perfect things, but things that teach you something, take you somewhere, or occasionally make a difference to someone else. Here are a few that got out of hand in the best possible way.
        </p>
      </div>

      <div
        ref={containerRef}
        className="handcarousel-container"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects that got out of hand"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className="handcarousel-track">
          {SLIDES.map((item, index) => {
            const slideClass = getSlideClass(index);
            return (
              <div
                key={index}
                className={`handcarousel-slide ${slideClass}`}
                aria-hidden={index !== currentIndex}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="handcarousel-image"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
