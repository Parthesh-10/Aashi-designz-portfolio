'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import './HowWeDo.css';

/**
 * CAROUSEL_DATA
 * Clearly named array for all 5 service cards matching the Figma reference.
 * Editable for easy updates.
 */
export const CAROUSEL_DATA = [
  {
    id: 1,
    category: 'BRANDING',
    brandCount: '130+ Brands',
    inactiveTitle: 'A brand people remember',
    metric: '32% Recall',
    image: '/services/branding.webp',
    imagePill: '200+ Brands',
    imageTitle: 'Branding & Strategy',
    imageSubtitle: 'for brands people remember',
    link: '/service/branddesign',
    overlayLabel: 'BRANDING',
    overlayTitle: 'A brand people remember',
  },
  {
    id: 2,
    category: 'DESIGN & EDIT',
    brandCount: '130+ Brands',
    inactiveTitle: 'Feeds that look like one brand',
    metric: '90% Approval rate',
    image: '/services/design-edit.webp',
    imagePill: '300+ Brands',
    imageTitle: 'Design & Edit',
    imageSubtitle: 'for cohesive feeds',
    link: '/service/graphicdesign',
    overlayLabel: 'DESIGN & EDIT',
    overlayTitle: 'Feeds that look like one brand',
  },
  {
    id: 3,
    category: 'DIGITAL MARKETING',
    brandCount: '130+ Brands',
    inactiveTitle: 'Ads that pay for themselves',
    metric: '3.2x ROAS',
    image: '/services/digital-marketing.webp',
    imagePill: '100+ Brands',
    imageTitle: 'Digital Marketing',
    imageSubtitle: 'for brands that want sales',
    link: '/service/designstrategy',
    overlayLabel: 'DIGITAL MARKETING',
    overlayTitle: 'Ads that pay for themselves',
  },
  {
    id: 4,
    category: 'UI / UX',
    brandCount: '130+ Brands',
    inactiveTitle: 'Visitors that become buyers',
    metric: '18% Conv.',
    image: '/services/ui-ux.webp',
    imagePill: '30+ Brands',
    imageTitle: 'UI / UX',
    imageSubtitle: 'for sites that convert',
    link: '/service/uiuxdesign',
    overlayLabel: 'UI / UX',
    overlayTitle: 'Visitors that become buyers',
  },
  {
    id: 5,
    category: 'OFFLINE MARKETING',
    brandCount: '130+ Brands',
    inactiveTitle: 'Be seen where they walk',
    metric: '2x Footfall in 6 months',
    image: '/services/offline-marketing.webp',
    imagePill: '160+ Brands',
    imageTitle: 'Offline Marketing',
    imageSubtitle: 'for shops people walk into',
    link: '/service/videoediting',
    overlayLabel: 'OFFLINE MARKETING',
    overlayTitle: 'Be seen where they walk',
  },
];

const TOTAL_ORIGINAL = CAROUSEL_DATA.length; // 5
// Duplicate 3 times (15 items) for seamless infinite looping
const SLIDES = [...CAROUSEL_DATA, ...CAROUSEL_DATA, ...CAROUSEL_DATA];
const INITIAL_INDEX = TOTAL_ORIGINAL; // Start in middle set at index 5

export default function HowWeDo() {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const hasDragged = useRef(false);

  // Real index in 0..4 for pagination indicator
  const realActiveIndex = ((currentIndex % TOTAL_ORIGINAL) + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;

  // Advance by step (-2, -1, 1, 2, etc.)
  const goToSlide = useCallback((newIdx) => {
    setIsTransitioning(true);
    setDragOffset(0);
    setCurrentIndex(newIdx);
  }, []);

  const handleNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Handle seamless infinite reset on edge
  const handleTransitionEnd = (e) => {
    // Only handle transitionend of the track's own transform property
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

    if (currentIndex >= TOTAL_ORIGINAL * 2) {
      // Reached third set -> snap back to middle set silently
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - TOTAL_ORIGINAL);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    } else if (currentIndex < TOTAL_ORIGINAL) {
      // Reached first set -> snap forward to middle set silently
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + TOTAL_ORIGINAL);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  // Auto-advance every 4 seconds, pause on hover or dragging
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, isDragging]);

  // Click on pagination dot
  const handlePaginationClick = (targetRealIdx) => {
    let diff = (targetRealIdx - realActiveIndex + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;
    if (diff > 2) diff -= TOTAL_ORIGINAL;
    goToSlide(currentIndex + diff);
  };

  // Drag handlers (Pointer events supporting both touch and mouse)
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    hasDragged.current = false;
    setIsDragging(true);
    setIsPaused(true);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - dragStartY.current;

    // Detect horizontal drag gesture
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
      hasDragged.current = true;
      setIsTransitioning(false);
      setDragOffset(dx);
    }
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);

    if (hasDragged.current) {
      const dx = dragOffset;
      const threshold = 40;
      setIsTransitioning(true);
      setDragOffset(0);

      if (dx < -threshold) {
        handleNext();
      } else if (dx > threshold) {
        handlePrev();
      }
    } else {
      setDragOffset(0);
      setIsTransitioning(true);
    }
  };

  // Responsive slide step estimation for drag distance (card width + card gap)
  const slideStep = typeof window !== 'undefined'
    ? (window.innerWidth <= 767 ? window.innerWidth * 0.68 + 12 : (window.innerWidth <= 1024 ? 283 : 316))
    : 280;
  const dragFraction = dragOffset / slideStep;
  const currentPos = currentIndex - dragFraction;

  // Progressive blur calculation based on distance from center:
  // Center (0) -> 0px (sharp)
  // Neighbors (1) -> 4.8px (~2/3 of previous 7px)
  // Farther (2) -> 7.2px
  // Outermost (>=3) -> 9.6px
  const computeBlur = (dist) => {
    if (dist <= 0.04) return 0;
    if (dist <= 1) return dist * 4.8;
    return Math.min(4.8 + (dist - 1) * 2.4, 9.6);
  };

  return (
    <section className="howwedo-section">
      {/* Header Container */}
      <div className="howwedo-header-container container">
        <h2 className="howwedo-title">How we do?</h2>
        <Link href="/service/branddesign" className="howwedo-cta-pill">
          <span>Pick one, Go deeper</span>
          <svg
            className="howwedo-cta-arrow"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Carousel Outer Viewport */}
      <div
        className="howwedo-carousel-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!isDragging) setIsPaused(false);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={`howwedo-track ${isTransitioning ? 'is-animating' : ''}`}
          style={{
            transform: `translateX(calc(-1 * (${currentIndex} + 0.5) * (var(--card-width) + var(--card-gap)) + ${dragOffset}px))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {SLIDES.map((item, idx) => {
            const slot = idx - currentIndex;
            const isCenter = slot === 0;
            const isImmediate = Math.abs(slot) === 1;
            const isOuter = Math.abs(slot) === 2;
            const isVisible = Math.abs(slot) <= 2;

            const dist = Math.abs(idx - currentPos);
            const cardBlurVal = computeBlur(dist);

            let slotClass = 'howwedo-slot-far';
            if (isCenter) slotClass = 'howwedo-slot-center';
            else if (isImmediate) slotClass = slot === -1 ? 'howwedo-slot-left-1' : 'howwedo-slot-right-1';
            else if (isOuter) slotClass = slot === -2 ? 'howwedo-slot-left-2' : 'howwedo-slot-right-2';

            return (
              <div
                key={`${item.id}-${idx}`}
                className={`howwedo-slide ${slotClass} ${isCenter ? 'is-active' : ''}`}
                style={{
                  '--card-dist': dist.toFixed(3),
                  '--card-blur': `${cardBlurVal.toFixed(2)}px`,
                }}
                onClick={() => {
                  if (!hasDragged.current && !isCenter && isVisible) {
                    goToSlide(idx);
                  }
                }}
                role="button"
                tabIndex={isVisible ? 0 : -1}
                aria-label={`${item.imageTitle} (${isCenter ? 'Active' : 'Slide'})`}
              >
                <div className="howwedo-card-item">
                  {/* TALL ROUNDED IMAGE CARD */}
                  <div className="howwedo-image-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.imageTitle}
                      className="howwedo-card-image"
                      loading="lazy"
                    />

                    {/* Gradient scrim along bottom 45% of card behind text */}
                    <div className="howwedo-card-scrim" aria-hidden="true" />

                    {/* Side Card Overlay Text (Visible when NOT center) */}
                    <div className="howwedo-card-overlay" aria-hidden={isCenter}>
                      <div className="howwedo-overlay-label">
                        <svg className="howwedo-concentric-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                          <circle cx="6" cy="6" r="2.2" fill="currentColor" />
                        </svg>
                        <span>{item.overlayLabel}</span>
                      </div>

                      <h4 className="howwedo-overlay-headline">{item.overlayTitle}</h4>

                      <div className="howwedo-overlay-footer">
                        {item.metric && (
                          <span className="howwedo-overlay-pill">{item.metric}</span>
                        )}
                        <Link
                          href={item.link}
                          className="howwedo-overlay-arrow clickable"
                          aria-label={`View ${item.imageTitle}`}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path
                              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                              stroke="#173E5A"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    <div className="howwedo-card-pill">{item.imagePill}</div>
                  </div>

                  {/* SEPARATED TEXT ROW (Directly on page background below image card) */}
                  <div className="howwedo-text-row" aria-hidden={!isCenter}>
                    <div className="howwedo-text-info">
                      <h3 className="howwedo-text-title">{item.imageTitle}</h3>
                      <p className="howwedo-text-subtitle">{item.imageSubtitle}</p>
                    </div>

                    <Link
                      href={item.link}
                      className="howwedo-arrow-btn clickable"
                      aria-label={`View ${item.imageTitle}`}
                      tabIndex={isCenter ? 0 : -1}
                      onClick={(e) => {
                        if (!isCenter) e.preventDefault();
                        else e.stopPropagation();
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path
                          d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                          stroke="#ffffff"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator */}
      <div className="howwedo-pagination" role="tablist" aria-label="Carousel pagination">
        {CAROUSEL_DATA.map((_, dotIdx) => {
          const isActive = dotIdx === realActiveIndex;
          return (
            <button
              key={dotIdx}
              type="button"
              role="tab"
              className={`howwedo-page-dot ${isActive ? 'is-active' : ''}`}
              onClick={() => handlePaginationClick(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              aria-selected={isActive}
            />
          );
        })}
      </div>
    </section>
  );
}
