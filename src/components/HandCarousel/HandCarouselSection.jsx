'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './HandCarouselSection.css';

const SLIDES = [
  { src: '/About%20me/1.png', alt: 'Project 1 that got out of hand' },
  { src: '/About%20me/2.png', alt: 'Project 2 that got out of hand' },
  { src: '/About%20me/3.png', alt: 'Project 3 that got out of hand' },
  { src: '/About%20me/4.png', alt: 'Project 4 that got out of hand' },
  { src: '/About%20me/5.png', alt: 'Project 5 that got out of hand' }
];

const TRACK_ITEMS = [
  { ...SLIDES[4], key: 'clone-prev', isClone: true, realIndex: 4 },
  { ...SLIDES[0], key: 'slide-0', isClone: false, realIndex: 0 },
  { ...SLIDES[1], key: 'slide-1', isClone: false, realIndex: 1 },
  { ...SLIDES[2], key: 'slide-2', isClone: false, realIndex: 2 },
  { ...SLIDES[3], key: 'slide-3', isClone: false, realIndex: 3 },
  { ...SLIDES[4], key: 'slide-4', isClone: false, realIndex: 4 },
  { ...SLIDES[0], key: 'clone-next', isClone: true, realIndex: 0 }
];

export default function HandCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [timerToken, setTimerToken] = useState(0);

  const containerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const pointerStartXRef = useRef(null);
  const pointerStartYRef = useRef(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Check document visibility
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // IntersectionObserver to pause when offscreen
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

  const goToNext = useCallback((isManual = false) => {
    if (isManual) resetTimer();

    if (prefersReducedMotion) {
      setCurrentIndex((prev) => (prev >= 5 ? 1 : prev + 1));
      return;
    }

    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [prefersReducedMotion, resetTimer]);

  const goToPrev = useCallback((isManual = false) => {
    if (isManual) resetTimer();

    if (prefersReducedMotion) {
      setCurrentIndex((prev) => (prev <= 1 ? 5 : prev - 1));
      return;
    }

    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [prefersReducedMotion, resetTimer]);

  // Autoplay loop (every 4s)
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isFocused || isDocumentHidden || !isInView) {
      return;
    }

    const intervalId = setInterval(() => {
      goToNext(false);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [prefersReducedMotion, isHovered, isFocused, isDocumentHidden, isInView, timerToken, goToNext]);

  // Handle seamless infinite looping at transition end
  const handleTransitionEnd = () => {
    if (currentIndex === 6) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(5);
    }
    isTransitioningRef.current = false;
  };

  // Safety fallback for transitionend unlock
  useEffect(() => {
    if (!isTransitioning || prefersReducedMotion) return;
    const timer = setTimeout(() => {
      if (currentIndex === 6) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      } else if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(5);
      }
      isTransitioningRef.current = false;
    }, 650);

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, prefersReducedMotion]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev(true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext(true);
    }
  };

  // Touch / Pointer Swipe
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
    pointerStartXRef.current = e.clientX;
    pointerStartYRef.current = e.clientY;
  };

  const handlePointerUp = (e) => {
    if (pointerStartXRef.current === null) return;
    const diffX = e.clientX - pointerStartXRef.current;
    const diffY = e.clientY - (pointerStartYRef.current ?? e.clientY);
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        goToPrev(true);
      } else {
        goToNext(true);
      }
    }
  };

  const handlePointerCancel = () => {
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
  };

  // Map track index to active slide for accessibility
  const activeRealIndex = (currentIndex - 1 + 5) % 5;

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
        <div
          className="handcarousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning && !prefersReducedMotion ? 'transform 0.6s ease-in-out' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {TRACK_ITEMS.map((item, index) => {
            const isVisible = index === currentIndex;
            return (
              <div
                key={item.key}
                className="handcarousel-slide"
                aria-hidden={!isVisible}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="handcarousel-image"
                  loading={index === 1 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="handcarousel-button handcarousel-button-prev"
          onClick={() => goToPrev(true)}
          aria-label="Previous slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="handcarousel-arrow-icon"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          className="handcarousel-button handcarousel-button-next"
          onClick={() => goToNext(true)}
          aria-label="Next slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="handcarousel-arrow-icon"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
