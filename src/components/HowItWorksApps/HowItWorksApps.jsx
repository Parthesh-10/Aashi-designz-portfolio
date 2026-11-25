'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Instrument_Serif } from 'next/font/google';
import './HowItWorksApps.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

// Configurable animation constants (exported for tweaking)
export const REVEAL_STAGGER_MS = 250;
export const REVEAL_DURATION_MS = 450;
export const STEP_DWELL_MS = 3000;
export const TRANSITION_MS = 600;
export const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Verbatim copy for 8 steps
export const STEPS_DATA = [
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

export default function HowItWorksApps() {
  const sectionRef = useRef(null);

  // Animation states
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [revealedStepCount, setRevealedStepCount] = useState(0);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'revealing' | 'autoplay'
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setPrefersReducedMotion(true);
        setIsHeaderRevealed(true);
        setRevealedStepCount(STEPS_DATA.length);
        setActiveIndex(0);
        setPhase('autoplay');
        setHasUserInteracted(true);
      }
    }
  }, []);

  // Tab visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // IntersectionObserver for Phase 1 reveal
  useEffect(() => {
    if (prefersReducedMotion) return;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);

          if (entry.isIntersecting && phase === 'idle') {
            setPhase('revealing');
            setIsHeaderRevealed(true);

            // Stagger reveal of steps 1 through 8
            STEPS_DATA.forEach((_, idx) => {
              setTimeout(() => {
                setRevealedStepCount((prev) => Math.max(prev, idx + 1));

                // If last step revealed, start Phase 2 auto-play
                if (idx === STEPS_DATA.length - 1) {
                  setTimeout(() => {
                    setPhase('autoplay');
                    setActiveIndex(0);
                  }, REVEAL_DURATION_MS);
                }
              }, (idx + 1) * REVEAL_STAGGER_MS);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [phase, prefersReducedMotion]);

  // Phase 2: Auto-play timer
  useEffect(() => {
    if (
      phase !== 'autoplay' ||
      hasUserInteracted ||
      !isInView ||
      !isTabVisible ||
      prefersReducedMotion
    ) {
      return;
    }

    // Stop at step 8 (activeIndex === 7)
    if (activeIndex >= STEPS_DATA.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, STEP_DWELL_MS);

    return () => clearTimeout(timer);
  }, [phase, activeIndex, hasUserInteracted, isInView, isTabVisible, prefersReducedMotion]);

  // Step click handler
  const handleStepClick = useCallback((idx) => {
    setHasUserInteracted(true);
    setActiveIndex(idx);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="hiw-section"
      aria-label="How it works"
      style={{
        '--font-instrument-serif': instrumentSerif.style.fontFamily,
      }}
    >
      <div id="my-design-process" style={{ position: 'absolute', top: 0, left: 0, height: 0, width: 0, visibility: 'hidden' }} aria-hidden="true" />
      <div className="hiw-container">
        {/* Centered Heading Block */}
        <div className={`hiw-heading-block ${isHeaderRevealed ? 'is-revealed' : ''}`}>
          <h2 className="hiw-heading">HOW IT WORKS?</h2>
          <p className="hiw-sub">A clear process. Thoughtful design. No guesswork.</p>
        </div>

        {/* Two-Column Row */}
        <div className="hiw-row">
          {/* Left Column: Stepper */}
          <div className="hiw-stepper-col">
            <ol className="hiw-steps-list">
              {STEPS_DATA.map((step, idx) => {
                // Determine step state
                let state = 'upcoming';
                if (activeIndex >= 0) {
                  if (idx < activeIndex) state = 'completed';
                  else if (idx === activeIndex) state = 'active';
                  else state = 'upcoming';
                }

                const isStepRevealed = prefersReducedMotion || idx < revealedStepCount;
                const isDescriptionVisible = state !== 'completed';

                return (
                  <li
                    key={`step-${step.number}`}
                    className={`hiw-step-item hiw-state-${state} ${
                      isStepRevealed ? 'is-step-revealed' : ''
                    }`}
                  >
                    {/* Continuous vertical connector line behind circle & active box */}
                    <div className="hiw-connector-track" aria-hidden="true">
                      {idx > 0 && <span className="hiw-line-segment hiw-line-top" />}
                      {idx < STEPS_DATA.length - 1 && (
                        <span className="hiw-line-segment hiw-line-bottom" />
                      )}
                    </div>

                    <button
                      type="button"
                      className="hiw-step-btn"
                      onClick={() => handleStepClick(idx)}
                      aria-expanded={state === 'active'}
                      aria-current={state === 'active' ? 'step' : undefined}
                      aria-controls={`hiw-desc-${idx}`}
                    >
                      {/* Left Circle */}
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

                      {/* Right Text Content */}
                      <div className="hiw-text-col">
                        <span className="hiw-step-label">Step {step.number}</span>
                        <span id={`hiw-title-${idx}`} className="hiw-step-title">
                          {step.title}
                        </span>

                        {/* Collapsible / Expandable Description */}
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

          {/* Right Column: Laptop Mockup Image */}
          <div className={`hiw-laptop-col ${isHeaderRevealed ? 'is-revealed' : ''}`}>
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
    </section>
  );
}
