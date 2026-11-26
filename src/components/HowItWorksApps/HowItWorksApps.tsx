'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Instrument_Serif } from 'next/font/google';
import type { CSSPropertiesWithVars } from '@/types/css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
}

export const STEPS_DATA: HowItWorksStep[] = [
  {
    number: 1,
    title: 'Discovery Call',
    description:
      'We get to know your business, your idea, your audience and what you want your digital product to achieve.',
  },
  {
    number: 2,
    title: 'Research & Strategy',
    description:
      'We study your market, competitors and target users to define the right features, functionality and product direction.',
  },
  {
    number: 3,
    title: 'Planning & Architecture',
    description:
      'We map the product structure, organise content, define functionality and plan how users will navigate the experience.',
  },
  {
    number: 4,
    title: 'UI/UX Design',
    description:
      'We create wireframes, user journeys and intuitive interfaces that bring together usability, visual design and functionality.',
  },
  {
    number: 5,
    title: 'Prototyping & Approval',
    description:
      'We connect the screens into interactive prototypes, test the experience and refine the design before development begins.',
  },
  {
    number: 6,
    title: 'Development',
    description:
      'We turn approved designs into a working website or application, building the frontend, backend, integrations and required functionality.',
  },
  {
    number: 7,
    title: 'Testing & Optimisation',
    description:
      'We test across devices, check functionality, fix issues and refine the product to ensure everything works as intended.',
  },
  {
    number: 8,
    title: 'Launch & Handover',
    description:
      'We deploy your website or application, configure the essentials and hand over the final product, ready for use.',
  },
];

type StepVisualState = 'upcoming' | 'active' | 'completed';

export default function HowItWorksApps() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number>(0);
  const stepItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rafId = requestAnimationFrame(() => {
      if (mediaQuery.matches) {
        setPrefersReducedMotion(true);
      }
    });

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => {
      cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // Track viewport width for desktop scroll pinning (breakpoint 1024px)
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsDesktop(window.innerWidth >= 1024);
    });

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Desktop scroll-driven progression listener (RAF throttled, passive)
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return undefined;

    let rafId: number | null = null;

    const updateScrollProgress = () => {
      rafId = null;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;

      const rect = track.getBoundingClientRect();
      const navbarH = 66;
      const stickyH = window.innerHeight - navbarH;
      const maxScroll = rect.height - stickyH;

      if (maxScroll <= 0) return;

      const scrollDistance = navbarH - rect.top;
      const progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));

      // Continuously write progress to CSS custom property on stage
      stage.style.setProperty('--steps-progress', progress.toFixed(4));

      // Discrete step index update only when step bracket changes
      const stepCount = STEPS_DATA.length;
      const newIndex = Math.min(stepCount - 1, Math.max(0, Math.floor(progress * stepCount)));

      if (newIndex !== activeIndexRef.current) {
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress);
      }
    };

    // Initial calculation on mount
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isDesktop, prefersReducedMotion]);

  // Mobile IntersectionObserver progression fallback (< 1024px)
  useEffect(() => {
    if (isDesktop || prefersReducedMotion) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute('data-step-index');
            if (idxStr !== null) {
              const idx = parseInt(idxStr, 10);
              if (!isNaN(idx) && idx !== activeIndexRef.current) {
                activeIndexRef.current = idx;
                setActiveIndex(idx);
              }
            }
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0.2 }
    );

    stepItemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isDesktop, prefersReducedMotion]);

  const handleStepClick = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const navbarH = 66;
    const stickyH = window.innerHeight - navbarH;
    const maxScroll = rect.height - stickyH;

    if (maxScroll > 0 && window.innerWidth >= 1024) {
      const stepCount = STEPS_DATA.length;
      const targetProgress = (idx + 0.5) / stepCount;
      const targetScrollY = window.scrollY + rect.top - navbarH + targetProgress * maxScroll;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    } else {
      activeIndexRef.current = idx;
      setActiveIndex(idx);
    }
  }, []);

  const sectionStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
    '--step-count': STEPS_DATA.length,
  };

  return (
    <section
      id="how-it-works"
      ref={trackRef}
      className="hiw-section"
      aria-label="How it works"
      style={sectionStyle}
    >
      <div
        id="my-design-process"
        style={{ position: 'absolute', top: 0, left: 0, height: 0, width: 0, visibility: 'hidden' }}
        aria-hidden="true"
      />
      <div ref={stageRef} className="hiw-sticky-stage">
        <div className="hiw-container">
          <div className="hiw-heading-block is-revealed">
            <h2 className="hiw-heading">HOW IT WORKS?</h2>
            <p className="hiw-sub">A clear process. Thoughtful design. No guesswork.</p>
          </div>

          <div className="hiw-row">
            <div className="hiw-stepper-col">
              <div className="hiw-timeline-line-track" aria-hidden="true">
                <div className="hiw-timeline-line-base" />
                <div className="hiw-timeline-line-fill" />
              </div>

              <ol className="hiw-steps-list">
                {STEPS_DATA.map((step, idx) => {
                  let state: StepVisualState = 'upcoming';
                  if (idx < activeIndex) state = 'completed';
                  else if (idx === activeIndex) state = 'active';
                  else state = 'upcoming';

                  const isDescriptionVisible =
                    prefersReducedMotion || !isDesktop || state === 'active';

                  return (
                    <li
                      key={`step-${step.number}`}
                      ref={(el) => {
                        stepItemRefs.current[idx] = el;
                      }}
                      data-step-index={idx}
                      className={`hiw-step-item hiw-state-${state} is-step-revealed`}
                    >
                      <button
                        type="button"
                        className="hiw-step-btn"
                        onClick={() => handleStepClick(idx)}
                        aria-expanded={state === 'active'}
                        aria-current={state === 'active' ? 'step' : undefined}
                        aria-controls={`hiw-desc-${idx}`}
                      >
                        <div className={`hiw-circle hiw-circle-${state}`}>
                          <div className="hiw-circle-inner">
                            <span
                              className={`hiw-circle-num ${
                                state === 'completed' ? 'hiw-num-hidden' : ''
                              }`}
                            >
                              {step.number}
                            </span>
                            <span
                              className={`hiw-circle-check ${
                                state === 'completed' ? 'hiw-check-visible' : ''
                              }`}
                              aria-hidden="true"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#EAFF80"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                          </div>
                        </div>

                        <div className="hiw-text-col">
                          <span className="hiw-step-label">Step {step.number}</span>
                          <span id={`hiw-title-${idx}`} className="hiw-step-title">
                            {step.title}
                          </span>

                          <div
                            id={`hiw-desc-${idx}`}
                            className={`hiw-desc-wrap ${isDescriptionVisible ? 'is-visible' : ''}`}
                            aria-labelledby={`hiw-title-${idx}`}
                          >
                            <div className="hiw-desc-inner">
                              <p className="hiw-step-desc">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="hiw-laptop-col is-revealed">
              <div className="hiw-laptop-sticky">
                <Image
                  src="/images/how-it-works-laptop.png"
                  alt="Silver laptop mockup with clean blank display"
                  width={888}
                  height={626}
                  priority={false}
                  className="hiw-laptop-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 46vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
