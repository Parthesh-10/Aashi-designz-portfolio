'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AnimatedHeading from '@/components/AnimatedHeading';
import './EditsShowcase.css';

/* ============================================================
   DATA ARRAYS
   ============================================================ */

export const DESIGN_EDIT_DATA = {
  eyebrow: 'DESIGN & EDIT',
  headlineSegments: [
    { text: 'Your ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'ideas', fontClass: 'edits-serif-accent', colorClass: 'edits-why-h2-accent', hoverClass: 'ah-hover-slate', breakAfter: true },
    { text: 'deserve', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple', breakAfter: true },
    { text: 'better ', fontClass: 'edits-serif-accent', colorClass: 'edits-why-h2-accent', hoverClass: 'ah-hover-slate' },
    { text: 'than a', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple', breakAfter: true },
    { text: 'boring', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple', breakAfter: true },
    { text: 'template.', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
  ],
  stats: [
    {
      target: 3,
      unit: 's',
      unitClass: 'de-stat-unit-s',
      colorClass: '',
      label: '3 s to catch attention',
      captionLines: ['to catch attention'],
      delay: 0,
    },
    {
      target: 45,
      unit: '%',
      unitClass: '',
      colorClass: 'de-stat-purple',
      label: '45% more watch time',
      captionLines: ['more watch time'],
      delay: 160,
    },
    {
      target: 3,
      unit: 'x',
      unitClass: '',
      colorClass: '',
      label: '3x more saves',
      captionLines: ['more saves'],
      delay: 320,
    },
  ],
  quote: '"Good design gets noticed. Great design gets remembered."',
};

export const OUR_WORK_DATA = {
  eyebrow: 'OUR WORK',
  headlineSegments: [
    { text: 'Work that ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'actually', fontClass: 'edits-serif-accent', colorClass: 'edits-why-h2-accent', hoverClass: 'ah-hover-slate' },
    { text: ' performs.', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
  ],
  categories: ['All', 'Reels', 'Posts', 'Brand kits'],
  cards: [
    {
      id: 'work-1',
      type: 'reel',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(180deg, #EDE3FA 0%, #AE88E8 100%)',
      poster: '',
      video: '',
    },
    {
      id: 'work-2',
      type: 'reel',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(180deg, #EAF77F 0%, #C9B4DC 55%, #AE88E8 100%)',
      poster: '',
      video: '',
    },
    {
      id: 'work-3',
      type: 'reel',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(180deg, #F8D6A8 0%, #F2B0AB 100%)',
      poster: '',
      video: '',
    },
    {
      id: 'work-4',
      type: 'post',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(160deg, #A8C4F8 0%, #AE88E8 100%)',
      poster: '',
      video: '',
    },
    {
      id: 'work-5',
      type: 'brand kit',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(180deg, #F6DDEB 0%, #F8F0FA 100%)',
      poster: '',
      video: '',
    },
    {
      id: 'work-6',
      type: 'reel',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(180deg, #E2CBFF 0%, #F2B0AB 100%)',
      poster: '',
      video: '',
    },
    {
      id: 'work-7',
      type: 'post',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(180deg, #EAF77F 0%, #A8C4F8 100%)',
      poster: '',
      video: '',
    },
    {
      id: 'work-8',
      type: 'brand kit',
      brand: '[BRAND]',
      views: '[__]K',
      background: 'linear-gradient(180deg, #F8D6A8 0%, #AE88E8 100%)',
      poster: '',
      video: '',
    },
  ],
  cta: {
    label: 'See full portfolio',
    href: '/contact',
  },
};

/* ============================================================
   COUNT-UP STAT ITEM HELPER (Reliable count-up + reduced-motion support)
   ============================================================ */

function DesignStatItem({ stat, isTriggered }) {
  const numRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Immediate fallback for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (numRef.current) numRef.current.textContent = stat.target;
      return;
    }

    if (!isTriggered || hasAnimatedRef.current) return;

    let rafId;
    const startTimer = setTimeout(() => {
      hasAnimatedRef.current = true;
      const startTime = performance.now();
      const duration = 1200; // 1200ms smooth count-up

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeOut * stat.target);

        if (numRef.current) {
          numRef.current.textContent = currentVal;
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else if (numRef.current) {
          numRef.current.textContent = stat.target;
        }
      };

      rafId = requestAnimationFrame(animate);
    }, stat.delay);

    return () => {
      clearTimeout(startTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isTriggered, stat.target, stat.delay]);

  return (
    <div
      className={`de-stat-card ${isTriggered ? 'is-in-view' : ''}`}
      style={{ transitionDelay: `${stat.delay}ms` }}
    >
      <div className="de-stat-inner">
        <div className={`de-stat-num-row ${stat.colorClass || ''}`} aria-hidden="true">
          <span ref={numRef} className="de-stat-number">
            {isTriggered ? stat.target : 0}
          </span>
          <span className={`de-stat-unit ${stat.unitClass || ''}`}>{stat.unit}</span>
        </div>
        {/* Accessible screen reader announcement */}
        <span className="sr-only">{stat.label}</span>
        <div className="de-stat-label">
          {stat.captionLines.map((line, lIdx) => (
            <span key={lIdx} className="de-stat-label-line">
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT: EditsShowcase (Unified Single-Frame Section)
   ============================================================ */

export default function EditsShowcase({
  designData = DESIGN_EDIT_DATA,
  workData = OUR_WORK_DATA,
}) {
  // Direct Intersection Observer for the Stats Row
  const statsRowRef = useRef(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  useEffect(() => {
    // 2.5s safe fallback timer so numbers never get stuck at 0
    const fallbackTimer = setTimeout(() => {
      setStatsTriggered(true);
    }, 2500);

    const el = statsRowRef.current;
    if (!el) return () => clearTimeout(fallbackTimer);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsTriggered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 } // Trigger as soon as 15% of stats are visible
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  // Filter state for Carousel
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFading, setIsFading] = useState(false);
  const scrollerRef = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // Filter cards by active pill
  const filteredCards = workData.cards.filter((card) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Reels') return card.type === 'reel';
    if (activeFilter === 'Posts') return card.type === 'post';
    if (activeFilter === 'Brand kits') return card.type === 'brand kit';
    return true;
  });

  const handleFilterClick = useCallback((cat) => {
    if (cat === activeFilter) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveFilter(cat);
      if (scrollerRef.current) {
        scrollerRef.current.scrollLeft = 0;
      }
      setIsAtEnd(false);
      setTimeout(() => {
        setIsFading(false);
      }, 50);
    }, 150);
  }, [activeFilter]);

  // Track scroll position to rotate next arrow
  const handleScrollerScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScroll(maxScroll > 10);
    // At end threshold (within 24px)
    setIsAtEnd(el.scrollLeft >= maxScroll - 24);
  }, []);

  useEffect(() => {
    handleScrollerScroll();
    window.addEventListener('resize', handleScrollerScroll);
    return () => window.removeEventListener('resize', handleScrollerScroll);
  }, [handleScrollerScroll, filteredCards]);

  const handleNextClick = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior = isReduced ? 'auto' : 'smooth';

    if (isAtEnd) {
      // Return to start
      el.scrollTo({ left: 0, behavior: scrollBehavior });
    } else {
      // Scroll by one card width plus gap (approximately 18.2cqw)
      const firstCard = el.querySelector('.ow-card');
      const step = firstCard ? firstCard.offsetWidth + 20 : 280;
      el.scrollBy({ left: step, behavior: scrollBehavior });
    }
  }, [isAtEnd]);

  return (
    <section className="edits-showcase-section" aria-label="Design and Work Showcase">
      <div className="edits-showcase-inner">
        {/* ============================================================
            BLOCK 1: DESIGN & EDIT
            ============================================================ */}
        <div className="edits-de-block">
          {/* Left Column: Eyebrow + Headline */}
          <div className="edits-de-left">
            <p className="edits-section-eyebrow">{designData.eyebrow}</p>
            <AnimatedHeading
              as="h2"
              segments={designData.headlineSegments}
              threshold={0.35}
              className="edits-de-heading"
            />
          </div>

          {/* Right Column: 3 Stat Cards + Quote */}
          <div className="edits-de-right">
            <div className="de-stats-row" ref={statsRowRef}>
              {designData.stats.map((stat, sIdx) => (
                <DesignStatItem
                  key={`stat-${sIdx}`}
                  stat={stat}
                  isTriggered={statsTriggered}
                />
              ))}
            </div>

            <blockquote
              className={`de-quote ${statsTriggered ? 'is-in-view' : ''}`}
            >
              {designData.quote}
            </blockquote>
          </div>
        </div>

        {/* ============================================================
            BLOCK 2: OUR WORK
            ============================================================ */}
        <div className="edits-ow-block">
          {/* Eyebrow & Headline */}
          <div className="edits-ow-header">
            <p className="edits-section-eyebrow edits-ow-eyebrow">{workData.eyebrow}</p>
            <AnimatedHeading
              as="h2"
              segments={workData.headlineSegments}
              threshold={0.35}
              className="edits-ow-heading"
            />

            {/* Filter Pills */}
            <div className="ow-filters-group" role="group" aria-label="Filter work">
              {workData.categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    className={`ow-filter-pill ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleFilterClick(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Track (Inside same constant-margin container, flush with left margin) */}
          <div className="ow-carousel-outer" role="region" aria-label="Our work">
            <div
              ref={scrollerRef}
              className={`ow-carousel-scroller ${isFading ? 'is-fading' : ''}`}
              onScroll={handleScrollerScroll}
              tabIndex={0}
              aria-label="Scrollable cards gallery"
            >
              {filteredCards.map((card) => {
                const isPlaying = playingVideoId === card.id;

                return (
                  <div
                    key={card.id}
                    className="ow-card"
                    style={{ background: card.background }}
                  >
                    {/* Optional Video Playback */}
                    {card.video && isPlaying ? (
                      <video
                        src={card.video}
                        autoPlay
                        playsInline
                        muted
                        controls
                        className="ow-card-video"
                      />
                    ) : null}

                    {/* Centered Play Button for Reel Cards */}
                    {card.type === 'reel' && !isPlaying ? (
                      <button
                        type="button"
                        aria-label={`Play ${card.brand} reel`}
                        className="ow-play-btn"
                        onClick={() => {
                          if (card.video) setPlayingVideoId(card.id);
                        }}
                        tabIndex={card.video ? 0 : -1}
                        style={{ cursor: card.video ? 'pointer' : 'default' }}
                      >
                        <svg
                          className="ow-play-icon"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.28-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
                        </svg>
                      </button>
                    ) : null}

                    {/* Bottom Info Pill */}
                    <div className="ow-card-pill" aria-hidden="true">
                      <span>
                        {card.brand} · {card.views} views
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Next/Back Arrow Button over 5th Card */}
            {canScroll ? (
              <button
                type="button"
                aria-label={isAtEnd ? 'Scroll back to beginning' : 'Next cards'}
                className={`ow-next-btn ${isAtEnd ? 'is-rotated' : ''}`}
                onClick={handleNextClick}
              >
                <svg
                  className="ow-next-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            ) : null}
          </div>

          {/* CTA Button Aligned to Shared Left Edge */}
          <div className="ow-cta-container">
            <Link href={workData.cta.href} className="ow-portfolio-btn">
              <span className="ow-portfolio-text">{workData.cta.label}</span>
              <span className="ow-portfolio-circle" aria-hidden="true">
                <svg
                  className="ow-portfolio-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
