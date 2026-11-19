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
  },
  {
    id: 2,
    category: 'DESIGN & EDIT',
    brandCount: '130+ Brands',
    inactiveTitle: 'Feeds that look like one brand',
    metric: '80% Approval rate',
    image: '/services/design-edit.webp',
    imagePill: '300+ Brands',
    imageTitle: 'Design & Edit',
    imageSubtitle: 'for cohesive feeds',
    link: '/service/graphicdesign',
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
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  // Real index in 0..4 for pagination indicator
  const realActiveIndex = ((currentIndex % TOTAL_ORIGINAL) + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;

  // Advance by step (-2, -1, 1, 2, etc.)
  const goToSlide = useCallback((newIdx) => {
    setIsTransitioning(true);
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

  // Auto-advance every 4 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  // Click on pagination dot
  const handlePaginationClick = (targetRealIdx) => {
    let diff = (targetRealIdx - realActiveIndex + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;
    if (diff > 2) diff -= TOTAL_ORIGINAL;
    goToSlide(currentIndex + diff);
  };

  // Touch Swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
    setIsPaused(true);
  };

  const onTouchEnd = (e) => {
    if (!isSwiping.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX.current;
    const dy = touchEndY - touchStartY.current;

    // Ensure horizontal gesture
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    isSwiping.current = false;
    setIsPaused(false);
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
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`howwedo-track ${isTransitioning ? 'is-animating' : ''}`}
          style={{
            transform: `translateX(calc(-1 * (${currentIndex} + 0.5) * (var(--card-width) + var(--card-gap))))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {SLIDES.map((item, idx) => {
            const slot = idx - currentIndex;
            const isCenter = slot === 0;
            const isImmediate = Math.abs(slot) === 1;
            const isOuter = Math.abs(slot) === 2;
            const isVisible = Math.abs(slot) <= 2;

            let slotClass = 'howwedo-slot-far';
            if (isCenter) slotClass = 'howwedo-slot-center';
            else if (isImmediate) slotClass = slot === -1 ? 'howwedo-slot-left-1' : 'howwedo-slot-right-1';
            else if (isOuter) slotClass = slot === -2 ? 'howwedo-slot-left-2' : 'howwedo-slot-right-2';

            return (
              <div
                key={`${item.id}-${idx}`}
                className={`howwedo-slide ${slotClass} ${isCenter ? 'is-active' : ''}`}
                onClick={() => {
                  if (!isCenter && isVisible) {
                    goToSlide(idx);
                  }
                }}
                role="button"
                tabIndex={isVisible ? 0 : -1}
                aria-label={`${item.imageTitle} (${isCenter ? 'Active' : 'Slide'})`}
              >
                <div className="howwedo-card-3d">
                  {/* BACK FACE (0deg): Inactive Purple Gradient Glass Card */}
                  <div className="howwedo-card-face howwedo-card-back">
                    {/* Top Right Pill */}
                    <div className="howwedo-glass-pill">{item.brandCount}</div>

                    {/* Bottom Content Area */}
                    <div className="howwedo-back-bottom">
                      <div className="howwedo-back-category">
                        <span className="howwedo-category-bullet" aria-hidden="true">
                          ✦
                        </span>
                        <span>{item.category}</span>
                      </div>

                      <h3 className="howwedo-back-title">{item.inactiveTitle}</h3>

                      <div className="howwedo-back-footer">
                        <span className="howwedo-metric-pill">{item.metric}</span>
                        <div className="howwedo-arrow-circle howwedo-arrow-light" aria-hidden="true">
                          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                              stroke="#232733"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FRONT FACE (180deg): Active Card with Project Image */}
                  <div className="howwedo-card-face howwedo-card-front">
                    {/* Top Image Container */}
                    <div className="howwedo-front-image-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.imageTitle}
                        className="howwedo-front-image"
                        loading="lazy"
                      />
                      <div className="howwedo-front-pill">{item.imagePill}</div>
                    </div>

                    {/* Bottom White Info Panel */}
                    <div className="howwedo-front-info">
                      <div className="howwedo-front-texts">
                        <h3 className="howwedo-front-title">{item.imageTitle}</h3>
                        <p className="howwedo-front-subtitle">{item.imageSubtitle}</p>
                      </div>

                      <Link
                        href={item.link}
                        className="howwedo-arrow-circle howwedo-arrow-dark clickable"
                        aria-label={`View ${item.imageTitle}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
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
