'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import ServiceHero from '@/components/ServiceHero/ServiceHero';
import IncludedGrid from '@/components/IncludedGrid/IncludedGrid';
import EditsShowcase from '@/components/EditsShowcase/EditsShowcase';
import './EditsPage.css';

// Instrument Serif Italic loaded via next/font (identical to CupboardReveal setup)
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

// Single unified data array for all page copy, segments, stats, captions, and links
export const PAGE_DATA = {
  hero: {
    heading: {
      tag: 'h1',
      segments: [
        { text: 'Edits that ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
        {
          text: 'converts',
          fontClass: 'service-serif-accent edits-serif-accent',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
          breakAfter: true,
        },
        { text: 'the scroll.', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
      ],
    },
    subtitle:
      'On-brand, ready-to-post designs and edits that look good, feel right, and get noticed.',
    buttons: [
      { label: 'Book a call', href: '/contact', variant: 'primary' },
      { label: 'How It Works', href: '#why-it-matters', variant: 'secondary' },
    ],
    trusted: {
      image: '/edits/trusted.webp',
      alt: 'Trusted brands client avatars',
      text: 'Trusted by 200+ Brands',
    },
  },
  whyItMatters: {
    id: 'why-it-matters',
    eyebrow: 'WHY IT MATTERS',
    heading: {
      tag: 'h2',
      segments: [
        {
          text: 'Your visuals are your',
          fontClass: '',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
          breakAfter: true,
        },
        {
          text: 'first impression.',
          fontClass: 'edits-serif-accent edits-why-h2-accent',
          colorClass: 'edits-why-h2-accent',
          hoverClass: 'ah-hover-slate',
        },
      ],
    },
    cards: [
      {
        tag: 'BEFORE',
        tagClass: 'edits-pill-before',
        image: '/edits/before.webp',
        alt: 'Before edit phone mockup showing unfinished social profile',
      },
      {
        tag: 'AFTER',
        tagClass: 'edits-pill-after',
        image: '/edits/after.webp',
        alt: 'After edit phone mockup showing polished high-converting social profile',
      },
    ],
    stats: [
      {
        target: 3,
        unit: 's',
        unitClass: 'edits-stat-unit-s',
        label: '3 s',
        caption: 'to catch attention',
        colorClass: '',
        floatClass: 'edits-stat-float-1',
        delay: 0,
      },
      {
        target: 45,
        unit: '%',
        unitClass: '',
        label: '45%',
        caption: 'more watch time',
        colorClass: 'edits-stat-purple',
        floatClass: 'edits-stat-float-2',
        delay: 160,
      },
      {
        target: 3,
        unit: 'x',
        unitClass: '',
        label: '3x',
        caption: 'more saves',
        colorClass: '',
        floatClass: 'edits-stat-float-3',
        delay: 320,
      },
    ],
  },
  whatsIncluded: {
    heading: {
      tag: 'h2',
      segments: [
        { text: 'What’s Included', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
      ],
    },
    subtitle: 'Everything your brand needs to communicate visually',
    grid: [
      {
        row: 1,
        tiles: [
          {
            id: 'tile-01',
            image: '/edits/included/included-01.webp',
            title: 'Posters & Creatives',
            subtitle: 'Scroll-stopping promos',
            alt: 'Burger poster design in a restaurant lightbox',
            href: undefined,
            objectPosition: 'center 20%',
          },
          {
            id: 'tile-02',
            image: '/edits/included/included-02.webp',
            title: 'Menu Design',
            subtitle: 'Menus guests remember',
            alt: 'Printed checkered menu held at a restaurant table',
            href: undefined,
            objectPosition: 'center',
          },
          {
            id: 'tile-03',
            image: '/edits/included/included-03.webp',
            title: 'Digital Screens',
            subtitle: 'Displays that sell',
            alt: 'Burger menu displayed on a wall-mounted screen',
            href: undefined,
            objectPosition: 'center',
          },
        ],
      },
      {
        row: 2,
        tiles: [
          {
            id: 'tile-04',
            image: '/edits/included/included-04.webp',
            title: 'Illustration',
            subtitle: 'Custom artwork for your brand',
            alt: 'Portrait photo mixed with illustrated artwork',
            href: undefined,
            objectPosition: 'center',
          },
          {
            id: 'tile-05',
            image: '/edits/included/included-05.webp',
            title: 'Video Editing',
            subtitle: 'Reels with a rhythm',
            alt: 'Video editing timeline on a monitor',
            href: undefined,
            objectPosition: 'center',
          },
          {
            id: 'tile-06',
            image: '/edits/included/included-06.webp',
            title: 'Thumbnails',
            subtitle: 'Clicks, earned',
            alt: 'Bold YouTube thumbnail design',
            href: undefined,
            objectPosition: 'center 40%',
          },
        ],
      },
    ],
  },
};

/**
 * StatItem — Animated count-up and gentle desynchronized float
 */
function StatItem({ stat, isTriggered }) {
  const numRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, immediately set final value
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (numRef.current) numRef.current.textContent = stat.target;
      return;
    }

    if (!isTriggered || hasAnimated) return;

    let rafId;
    const startTimer = setTimeout(() => {
      setHasAnimated(true);
      const startTime = performance.now();
      const duration = 1400; // 1400ms count-up with smooth ease-out

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out: 1 - (1 - t)^3
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
  }, [isTriggered, hasAnimated, stat.target, stat.delay]);

  return (
    <div
      className={`edits-stat-outer ${isTriggered ? 'is-in-view' : ''}`}
      style={{ transitionDelay: `${stat.delay}ms` }}
    >
      <div className={`edits-stat-inner-float ${stat.floatClass}`}>
        <div className={`edits-stat-num-row ${stat.colorClass}`} aria-hidden="true">
          <span ref={numRef} className="edits-stat-number">
            0
          </span>
          <span className={`edits-stat-unit ${stat.unitClass}`}>{stat.unit}</span>
        </div>
        {/* Accessible screen reader announcement */}
        <span className="sr-only">{stat.label}</span>
        <div
          className="edits-stat-caption"
          style={{ transitionDelay: `${stat.delay + 150}ms` }}
        >
          {stat.caption}
        </div>
      </div>
    </div>
  );
}

export default function EditsPage() {
  const statsRef = useRef(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  useEffect(() => {
    // 4s safety fallback
    const fallbackTimer = setTimeout(() => {
      setStatsTriggered(true);
    }, 4000);

    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsTriggered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 } // 40% in view
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="edits-page"
      style={{
        '--font-instrument-serif': instrumentSerif.style.fontFamily,
      }}
    >
      {/* SECTION 1: HERO */}
      <ServiceHero
        id="hero"
        bgImage="/edits/hero-bg.webp"
        bgAlt="Atmospheric brand hero backdrop"
        bgQuality={80}
        headingTag={PAGE_DATA.hero.heading.tag}
        headingSegments={PAGE_DATA.hero.heading.segments}
        subtitle={PAGE_DATA.hero.subtitle}
        buttons={PAGE_DATA.hero.buttons}
        trusted={PAGE_DATA.hero.trusted}
      />

      {/* SECTION 2: WHY IT MATTERS */}
      <section
        id={PAGE_DATA.whyItMatters.id}
        className="edits-why-wrap"
        aria-label="Why It Matters Section"
      >
        <div className="edits-why-inner">
          <div className="edits-eyebrow">{PAGE_DATA.whyItMatters.eyebrow}</div>

          <AnimatedHeading
            as={PAGE_DATA.whyItMatters.heading.tag}
            segments={PAGE_DATA.whyItMatters.heading.segments}
            threshold={0.35}
            className="edits-why-h2"
          />

          <div className="edits-cards-grid">
            {PAGE_DATA.whyItMatters.cards.map((card, idx) => (
              <div key={`card-${idx}`} className="edits-card">
                <span className={`edits-card-pill ${card.tagClass}`}>{card.tag}</span>
                <div className="edits-card-phone-wrap">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={377}
                    height={471}
                    className="edits-card-phone-img"
                    sizes="(max-width: 768px) 85vw, 35vw"
                  />
                </div>
              </div>
            ))}
          </div>

          <div ref={statsRef} className="edits-stats-row">
            {PAGE_DATA.whyItMatters.stats.map((stat, idx) => (
              <div key={`stat-${idx}`} className="edits-stat-col">
                <StatItem stat={stat} isTriggered={statsTriggered} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED */}
      <section className="edits-included-wrap" aria-label="What's Included Section">
        <div className="edits-included-inner">
          <AnimatedHeading
            as={PAGE_DATA.whatsIncluded.heading.tag}
            segments={PAGE_DATA.whatsIncluded.heading.segments}
            threshold={0.35}
            className="edits-included-h2"
          />
          <p className="edits-included-sub">{PAGE_DATA.whatsIncluded.subtitle}</p>
          <IncludedGrid data={PAGE_DATA.whatsIncluded.grid} />
        </div>
      </section>

      {/* SECTIONS 4 & 5: DESIGN & EDIT INTRO + OUR WORK SHOWCASE */}
      <EditsShowcase />

      {/* SECTION 6: HOW WE WORK (PRICING PLANS) */}
      <section className="edits-pricing-wrap" aria-label="How we work?">
        <div className="edits-pricing-inner">
          <div className="edits-pricing-header">
            <h2 className="edits-pricing-h2">How we work?</h2>
            <p className="edits-pricing-sub">
              One month first. Then our discounted 3- and 6-month plans unlock.
            </p>
          </div>

          <div className="edits-pricing-cards">
            {/* 1 Month Plan */}
            <div className="edits-pricing-card edits-card-month-1">
              <div className="edits-card-top">
                <h3 className="edits-card-title">1 Month Plan</h3>
                <p className="edits-card-desc">
                  See how we work and build your digital foundation.
                </p>
              </div>
              <div className="edits-card-bottom">
                <div className="edits-card-icon" aria-hidden="true">
                  <svg
                    width="19"
                    height="24"
                    viewBox="0 0 19 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 11V6.5C4 3.73858 6.23858 1.5 9 1.5C11.7614 1.5 14 3.73858 14 6.5"
                      stroke="#313944"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <rect x="1" y="11" width="17" height="12" rx="3" fill="#313944" />
                    <circle cx="9.5" cy="15.5" r="1.2" fill="#FFFFFF" />
                    <rect x="9" y="16" width="1" height="3" fill="#FFFFFF" />
                  </svg>
                </div>
                <span className="edits-card-badge">WHERE WE BEGIN</span>
              </div>
            </div>

            {/* 3 Month Plan */}
            <div className="edits-pricing-card edits-card-month-3">
              <div className="edits-card-top">
                <h3 className="edits-card-title">3 Month Plan</h3>
                <p className="edits-card-desc">
                  Build a strategy, test what works, and bring in better leads.
                </p>
              </div>
              <div className="edits-card-bottom">
                <div className="edits-card-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="23"
                    viewBox="0 0 18 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10V6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6V10"
                      stroke="#313944"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <rect x="0.5" y="10" width="17" height="12" rx="3" fill="#313944" />
                    <circle cx="9" cy="14.5" r="1.2" fill="#FFFFFF" />
                    <rect x="8.5" y="15" width="1" height="3" fill="#FFFFFF" />
                  </svg>
                </div>
                <span className="edits-card-badge">UNLOCKS AFTER MONTH 1</span>
              </div>
            </div>

            {/* 6 Month Plan */}
            <div className="edits-pricing-card edits-card-month-6">
              <div className="edits-card-top">
                <h3 className="edits-card-title">6 Month Plan</h3>
                <p className="edits-card-desc">
                  A long-term growth plan with better insights, smarter campaigns, and a focus on consistent results.
                </p>
              </div>
              <div className="edits-card-bottom">
                <div className="edits-card-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="23"
                    viewBox="0 0 18 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10V6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6V10"
                      stroke="#313944"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <rect x="0.5" y="10" width="17" height="12" rx="3" fill="#313944" />
                    <circle cx="9" cy="14.5" r="1.2" fill="#FFFFFF" />
                    <rect x="8.5" y="15" width="1" height="3" fill="#FFFFFF" />
                  </svg>
                </div>
                <span className="edits-card-badge">UNLOCKS AFTER MONTH 1</span>
              </div>
            </div>
          </div>

          <div className="edits-pricing-statement">
            Let’s start with your <span className="edits-pricing-highlight">business goals</span> and build from there.
          </div>
        </div>
      </section>

      {/* SECTION 7: CLIENT FEEDBACK */}
      <section className="edits-feedback-wrap" aria-label="Client Feedback">
        <div className="edits-feedback-inner">
          <div className="edits-feedback-eyebrow">• CLIENT FEEDBACK</div>
          <h2 className="edits-feedback-h2">
            Don’t take it from me, take it<br className="edits-feedback-br" /> from them.
          </h2>

          <div className="edits-testimonials-row">
            {[0, 1, 2, 3].map((idx) => (
              <div key={`testimonial-${idx}`} className="edits-testimonial-card">
                <div className="edits-testimonial-stars" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, sIdx) => (
                    <svg
                      key={`star-${sIdx}`}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="edits-star-icon"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p className="edits-testimonial-quote">
                  “Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.”
                </p>

                <div className="edits-testimonial-author">
                  <div className="edits-testimonial-avatar" aria-hidden="true">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="13" cy="13" r="13" fill="#D4BBF7" />
                      <circle cx="13" cy="10" r="4.5" fill="#313944" fillOpacity="0.75" />
                      <path
                        d="M5.5 22C6.8 17.5 9.5 16.5 13 16.5C16.5 16.5 19.2 17.5 20.5 22"
                        stroke="#313944"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeOpacity="0.75"
                      />
                    </svg>
                  </div>
                  <div className="edits-testimonial-meta">
                    <div className="edits-testimonial-name">Richa Bajaj</div>
                    <div className="edits-testimonial-role">Content Strategist at Edurev</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .ah-letter-outer { opacity: 1 !important; translate: none !important; }
              .edits-stat-outer { opacity: 1 !important; transform: none !important; }
              .edits-stat-caption { opacity: 1 !important; }
            `,
          }}
        />
      </noscript>
    </div>
  );
}
