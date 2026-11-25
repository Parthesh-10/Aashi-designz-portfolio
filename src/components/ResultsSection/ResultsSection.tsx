'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import TiltedCard from '@/components/TiltedCard/TiltedCard';
import type { ResultCardData } from '@/constant/resultsData';

const AUTOPLAY_INTERVAL_MS = 3800;

const RefreshIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21.5 2v6h-6" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
  </svg>
);

export interface ResultsSectionProps {
  resultsData?: ResultCardData[];
}

export default function ResultsSection({ resultsData = [] }: ResultsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isSwipingRef = useRef(false);

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

  const totalCards = resultsData.length;

  const goToNext = useCallback(() => {
    if (totalCards <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    if (totalCards <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return totalCards - 1;
      }
      return prev - 1;
    });
  }, [totalCards]);

  const goToSlide = (idx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (isPaused || prefersReducedMotion || totalCards <= 1) return;

    const intervalId = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isPaused, prefersReducedMotion, totalCards, goToNext]);

  const handleTransitionEnd = () => {
    if (currentIndex >= totalCards) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    isSwipingRef.current = false;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const diffX = e.touches[0].clientX - touchStartXRef.current;
    if (Math.abs(diffX) > 10) {
      isSwipingRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(false);
    if (touchStartXRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - (touchStartYRef.current ?? 0);
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (isSwipingRef.current && Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goToNext();
      } else if (diffX > 0) {
        goToPrev();
      }
    }
  };

  const handleCardClick = (cardId: string) => {
    if (isSwipingRef.current) return;
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const carouselItems = totalCards > 1 ? [...resultsData, resultsData[0]] : resultsData;
  const activeDotIndex = totalCards > 0 ? currentIndex % totalCards : 0;

  return (
    <section className="results-section container">
      <h2 className="results-heading">Our Proven Result</h2>

      <div className="results-grid results-desktop-grid">
        {resultsData.map((card) => (
          <div key={card.id} className="results-card-wrapper">
            <TiltedCard
              containerHeight="195px"
              containerWidth="100%"
              radius={12}
              rotateAmplitude={12}
              scaleOnHover={1.03}
              flipOnHover={true}
              flipOnClick={false}
              ariaLabel={`${card.front.number} ${card.front.label}`}
              backContent={
                <div className="results-back">
                  <div className="results-back-glow" />
                  <div className="results-back-title">{card.back.title}</div>
                  <div className="results-back-stats">
                    {card.back.stats.map((stat, idx) => (
                      <div key={idx} style={{ display: 'contents' }}>
                        {idx > 0 && <div className="results-stat-divider" />}
                        <div className="results-back-stat">
                          <span className="results-stat-val">{stat.value}</span>
                          <span className="results-stat-lbl">{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="results-flip-btn results-flip-btn-light" aria-hidden="true">
                    <RefreshIcon />
                  </span>
                </div>
              }
            >
              <div className="results-front">
                <div className="results-front-glow1" />
                <div className="results-front-glow2" />
                <div className="results-front-content">
                  <span className="results-front-number">{card.front.number}</span>
                  <span className="results-front-label">{card.front.label}</span>
                </div>
                <span className="results-flip-btn results-flip-btn-dark" aria-hidden="true">
                  <RefreshIcon />
                </span>
              </div>
            </TiltedCard>
          </div>
        ))}
      </div>

      <div className="results-mobile-carousel">
        <div
          className="results-carousel-viewport"
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="results-carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition:
                isTransitioning && !prefersReducedMotion
                  ? 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselItems.map((card, idx) => {
              const isCardFlipped = Boolean(flippedCards[card.id]);
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className="results-carousel-slide"
                  aria-hidden={idx !== activeDotIndex}
                >
                  <div
                    className="results-mobile-card"
                    onClick={() => handleCardClick(card.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${card.front.number} ${card.front.label}. Tap to flip.`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(card.id);
                      }
                    }}
                  >
                    <div className={`results-mobile-card-inner ${isCardFlipped ? 'is-flipped' : ''}`}>
                      <div className="results-front">
                        <div className="results-front-glow1" />
                        <div className="results-front-glow2" />
                        <div className="results-front-content">
                          <span className="results-front-number">{card.front.number}</span>
                          <span className="results-front-label">{card.front.label}</span>
                        </div>
                        <button
                          type="button"
                          className="results-flip-btn results-flip-btn-dark results-mobile-flip-btn"
                          aria-label={`Flip ${card.front.number} card`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(card.id);
                          }}
                        >
                          <RefreshIcon />
                        </button>
                      </div>

                      <div className="results-back">
                        <div className="results-back-glow" />
                        <div className="results-back-title">{card.back.title}</div>
                        <div className="results-back-stats">
                          {card.back.stats.map((stat, statIdx) => (
                            <div key={statIdx} style={{ display: 'contents' }}>
                              {statIdx > 0 && <div className="results-stat-divider" />}
                              <div className="results-back-stat">
                                <span className="results-stat-val">{stat.value}</span>
                                <span className="results-stat-lbl">{stat.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="results-flip-btn results-flip-btn-light results-mobile-flip-btn"
                          aria-label={`Flip ${card.front.number} card back`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(card.id);
                          }}
                        >
                          <RefreshIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="results-carousel-pagination" role="tablist" aria-label="Proven results slides">
          {resultsData.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              role="tab"
              aria-selected={dotIdx === activeDotIndex}
              aria-label={`Go to result ${dotIdx + 1}`}
              className={`results-pagination-dot ${dotIdx === activeDotIndex ? 'active' : ''}`}
              onClick={() => goToSlide(dotIdx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
