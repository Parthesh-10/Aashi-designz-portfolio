'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import { BRANDING_WORK_SLIDES, type BrandingWorkSlide } from '@/constant/brandingData';
import type { CSSPropertiesWithVars } from '@/types/css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

const AUTOPLAY_MS = 4000;
const TRANSITION_DURATION_MS = 400;
const DRAG_THRESHOLD = 6;
const REPEAT_SETS = 4;

interface ThumbItem extends BrandingWorkSlide {
  originalIndex: number;
  isRepeat: boolean;
  uniqueKey: string;
}

export interface MyWorkBrandingProps {
  slides?: BrandingWorkSlide[];
}

export default function MyWorkBranding({ slides = BRANDING_WORK_SLIDES }: MyWorkBrandingProps) {
  const totalSlides = slides.length;

  const positionRef = useRef(0);
  const targetPosRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(true);

  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayActiveRef = useRef(true);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isInViewRef = useRef(false);
  const isPageVisibleRef = useRef(true);
  const suppressClickRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselCardRef = useRef<HTMLDivElement>(null);
  const slideNodesRef = useRef<Array<HTMLDivElement | null>>([]);
  const thumbNodesRef = useRef<Array<HTMLButtonElement | null>>([]);

  const thumbItems = useMemo<ThumbItem[]>(() => {
    const items: ThumbItem[] = [];
    for (let set = 0; set < REPEAT_SETS; set++) {
      slides.forEach((slide, sIdx) => {
        items.push({
          ...slide,
          originalIndex: sIdx,
          isRepeat: set > 0,
          uniqueKey: `thumb-set-${set}-${slide.id || sIdx}`,
        });
      });
    }
    return items;
  }, [slides]);
  const totalThumbSlots = thumbItems.length;

  const applyTransforms = useCallback(() => {
    const cardEl = carouselCardRef.current;
    if (!cardEl) return;

    const p = positionRef.current;
    const cardWidth = cardEl.clientWidth;
    const slideGap = Math.max(32, Math.min(60, cardWidth * 0.04));
    const slideStride = cardWidth + slideGap;

    for (let i = 0; i < totalSlides; i++) {
      const slideEl = slideNodesRef.current[i];
      if (!slideEl) continue;

      let offset = (i - p + totalSlides / 2) % totalSlides;
      if (offset < 0) offset += totalSlides;
      offset -= totalSlides / 2;

      const x = offset * slideStride;
      slideEl.style.transform = `translate3d(${x}px, 0, 0)`;

      if (Math.abs(offset) > 1.35) {
        slideEl.style.visibility = 'hidden';
      } else {
        slideEl.style.visibility = 'visible';
      }
    }

    const firstThumb = thumbNodesRef.current[0];
    if (firstThumb) {
      const thumbWidth = firstThumb.offsetWidth;
      const thumbGap = Math.max(10, Math.min(16, cardWidth * 0.013));
      const thumbStride = thumbWidth + thumbGap;

      for (let k = 0; k < totalThumbSlots; k++) {
        const thumbEl = thumbNodesRef.current[k];
        if (!thumbEl) continue;

        let offset = (k - p + 1) % totalThumbSlots;
        if (offset < 0) offset += totalThumbSlots;
        offset -= 1;

        const x = offset * thumbStride;
        thumbEl.style.transform = `translate3d(${x}px, 0, 0)`;

        if (offset < -1.1 || offset > totalThumbSlots) {
          thumbEl.style.visibility = 'hidden';
        } else {
          thumbEl.style.visibility = 'visible';
        }
      }
    }

    const currentActive = ((Math.round(p) % totalSlides) + totalSlides) % totalSlides;
    setActiveSlide((prev) => (prev !== currentActive ? currentActive : prev));
  }, [totalSlides, totalThumbSlots]);

  const stopTransition = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
  }, []);

  const startTransition = useCallback(
    (targetPos: number, duration = TRANSITION_DURATION_MS) => {
      stopTransition();
      targetPosRef.current = targetPos;

      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        positionRef.current = targetPos;
        velocityRef.current = 0;
        applyTransforms();
        return;
      }

      const startPos = positionRef.current;
      const distance = targetPos - startPos;
      if (Math.abs(distance) < 0.0001) {
        positionRef.current = targetPos;
        applyTransforms();
        return;
      }

      const startTime = performance.now();
      const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = cubicEaseOut(progress);

        positionRef.current = startPos + distance * ease;
        applyTransforms();

        if (progress < 1) {
          animFrameIdRef.current = requestAnimationFrame(tick);
        } else {
          positionRef.current = targetPos;
          velocityRef.current = 0;
          applyTransforms();
          animFrameIdRef.current = null;
        }
      };

      animFrameIdRef.current = requestAnimationFrame(tick);
    },
    [applyTransforms, stopTransition]
  );

  const navigateToSlide = useCallback(
    (slideIdx: number, userTriggered = false) => {
      const currentPos = positionRef.current;
      const currentInt = Math.round(currentPos);
      const currentIdx = ((currentInt % totalSlides) + totalSlides) % totalSlides;

      let delta = slideIdx - currentIdx;
      if (delta > totalSlides / 2) delta -= totalSlides;
      if (delta < -totalSlides / 2) delta += totalSlides;

      const target = currentInt + delta;

      if (userTriggered) {
        autoplayActiveRef.current = false;
        if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
        setAnnouncement(`Slide ${slideIdx + 1} of ${totalSlides}: ${slides[slideIdx]?.title}`);
      }

      startTransition(target, TRANSITION_DURATION_MS);
    },
    [totalSlides, slides, startTransition]
  );

  const advanceSlide = useCallback(
    (delta: number, userTriggered = false) => {
      const target = Math.round(positionRef.current) + delta;
      if (userTriggered) {
        autoplayActiveRef.current = false;
        if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
        const nextIdx = ((target % totalSlides) + totalSlides) % totalSlides;
        setAnnouncement(`Slide ${nextIdx + 1} of ${totalSlides}: ${slides[nextIdx]?.title}`);
      }
      startTransition(target, TRANSITION_DURATION_MS);
    },
    [totalSlides, slides, startTransition]
  );

  const scheduleAutoplayRef = useRef<() => void>(() => {});

  const scheduleAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);

    if (
      !autoplayActiveRef.current ||
      !isFirstImageLoaded ||
      AUTOPLAY_MS <= 0 ||
      isHoveredRef.current ||
      isFocusedRef.current ||
      isDraggingRef.current ||
      !isInViewRef.current ||
      !isPageVisibleRef.current
    ) {
      return;
    }

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    autoplayTimerRef.current = setTimeout(() => {
      advanceSlide(1, false);
      scheduleAutoplayRef.current();
    }, AUTOPLAY_MS);
  }, [isFirstImageLoaded, advanceSlide]);

  useEffect(() => {
    scheduleAutoplayRef.current = scheduleAutoplay;
    scheduleAutoplay();
    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [scheduleAutoplay]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            scheduleAutoplay();
          } else if (autoplayTimerRef.current) {
            clearTimeout(autoplayTimerRef.current);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        scheduleAutoplay();
      } else if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopTransition();
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [scheduleAutoplay, stopTransition]);

  useEffect(() => {
    applyTransforms();
    const handleResize = () => applyTransforms();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyTransforms]);

  const dragDataRef = useRef<{
    isDown: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    startPos: number;
    dragType: 'big' | 'thumb';
  }>({
    isDown: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    startPos: 0,
    dragType: 'big',
  });

  const firstThumbWidthRef = useRef(153);
  useEffect(() => {
    if (thumbNodesRef.current[0]) {
      firstThumbWidthRef.current = thumbNodesRef.current[0].offsetWidth;
    }
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, dragType: 'big' | 'thumb' = 'big') => {
    stopTransition();
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);

    dragDataRef.current = {
      isDown: true,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastTime: performance.now(),
      startPos: positionRef.current,
      dragType,
    };
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragDataRef.current;
    if (!d.isDown) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;

    if (!isDraggingRef.current) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > DRAG_THRESHOLD) {
        d.isDown = false;
        return;
      }

      if (Math.abs(dx) > DRAG_THRESHOLD) {
        isDraggingRef.current = true;
        autoplayActiveRef.current = false;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
      }
    }

    if (isDraggingRef.current) {
      const now = performance.now();
      const dt = Math.max(1, now - d.lastTime) / 1000;
      const stepDx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      d.lastTime = now;

      const cardEl = carouselCardRef.current;
      const cardWidth = cardEl ? cardEl.clientWidth : 985;
      const stride =
        d.dragType === 'big'
          ? cardWidth + Math.max(32, cardWidth * 0.04)
          : (firstThumbWidthRef.current || 153) + 13;

      const instantVelocity = -stepDx / stride / dt;
      velocityRef.current = velocityRef.current * 0.6 + instantVelocity * 0.4;

      const deltaPos = -dx / stride;
      positionRef.current = d.startPos + deltaPos;
      applyTransforms();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragDataRef.current;
    if (!d.isDown && !isDraggingRef.current) return;
    d.isDown = false;

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 120);

      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {}

      const v = velocityRef.current;
      let target: number;
      if (Math.abs(v) > 0.8) {
        target = Math.round(positionRef.current + Math.sign(v) * 0.7);
      } else {
        target = Math.round(positionRef.current);
      }

      startTransition(target, TRANSITION_DURATION_MS);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      advanceSlide(-1, true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      advanceSlide(1, true);
    }
  };

  const sectionStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
  };

  return (
    <section
      ref={sectionRef}
      id="my-work"
      className="mwb-section"
      aria-label="My work"
      style={sectionStyle}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        scheduleAutoplay();
      }}
    >
      <div className="mwb-container">
        <div className="mwb-header-block">
          <p className="mwb-eyebrow">MY WORK</p>
          <AnimatedHeading
            as="h2"
            segments={[
              { text: 'Work that ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
              { text: 'actually ', fontClass: 'mwb-serif-accent', colorClass: '', hoverClass: 'ah-hover-slate' },
              { text: 'shines.', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
            ]}
            threshold={0.35}
            className="mwb-h2"
          />
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        <div className="mwb-carousel-viewport">
          <div
            ref={carouselCardRef}
            className="mwb-carousel-card"
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected work"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              isFocusedRef.current = true;
              if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
            }}
            onBlur={() => {
              isFocusedRef.current = false;
              scheduleAutoplay();
            }}
            onPointerDown={(e) => handlePointerDown(e, 'big')}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {slides.map((slide, sIdx) => {
              const isEager = sIdx === 0 || sIdx === 1 || sIdx === totalSlides - 1;

              const slideBody = (
                <div className="mwb-slide-frame">
                  <Image
                    src={slide.board}
                    alt={slide.alt}
                    width={1024}
                    height={397}
                    priority={sIdx === 0}
                    loading={isEager ? 'eager' : 'lazy'}
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1380px"
                    className="mwb-slide-image"
                    draggable={false}
                    onLoad={() => {
                      if (sIdx === 0) {
                        setIsFirstImageLoaded(true);
                      }
                    }}
                  />
                </div>
              );

              return (
                <div
                  key={slide.id || sIdx}
                  ref={(el) => {
                    slideNodesRef.current[sIdx] = el;
                  }}
                  className="mwb-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${sIdx + 1} of ${totalSlides}: ${slide.title}`}
                >
                  {slide.href ? (
                    <Link
                      href={slide.href}
                      className="mwb-slide-link"
                      onClick={(e) => {
                        if (suppressClickRef.current) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {slideBody}
                    </Link>
                  ) : (
                    slideBody
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mwb-thumbs-row">
          <div
            className="mwb-thumbs-track-outer"
            onPointerDown={(e) => handlePointerDown(e, 'thumb')}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="mwb-thumbs-track">
              {thumbItems.map((item, slotIdx) => {
                const isActive = item.originalIndex === activeSlide;

                return (
                  <button
                    key={item.uniqueKey}
                    ref={(el) => {
                      thumbNodesRef.current[slotIdx] = el;
                    }}
                    type="button"
                    className={`mwb-thumb-btn ${isActive ? 'mwb-thumb-active' : ''}`}
                    aria-label={`Show ${item.title}`}
                    aria-current={isActive && !item.isRepeat ? 'true' : undefined}
                    aria-hidden={item.isRepeat ? 'true' : undefined}
                    tabIndex={item.isRepeat ? -1 : 0}
                    onClick={() => {
                      if (suppressClickRef.current) return;
                      navigateToSlide(item.originalIndex, true);
                    }}
                  >
                    <Image
                      src={item.thumb}
                      alt=""
                      width={600}
                      height={530}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 153px"
                      className="mwb-thumb-image"
                      draggable={false}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            href="/casestudy/synctrip"
            className="mwb-more-link"
            aria-label="View more case studies"
          >
            ...more
          </Link>
        </div>
      </div>
    </section>
  );
}
