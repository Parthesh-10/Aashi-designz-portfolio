import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import ServiceHero from '@/components/ServiceHero/ServiceHero';
import IncludedGallery from '@/components/IncludedGallery/IncludedGallery';
import EditsShowcase from '@/components/EditsShowcase/EditsShowcase';
import ClientFeedbackApps from '@/components/ClientFeedbackApps/ClientFeedbackApps';
import Reveal from '@/components/Reveal';
import type { CSSPropertiesWithVars } from '@/types/css';

export const metadata: Metadata = {
  title: 'Edits Service | Aashidesignz',
  description: 'On-brand, ready-to-post designs and edits that look good, feel right, and get noticed.',
};

// Instrument Serif Italic loaded via next/font
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
      tag: 'h1' as const,
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
      { label: 'Book a call', href: '/contact', variant: 'primary' as const },
      { label: 'How It Works', href: '#why-it-matters', variant: 'secondary' as const },
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
      tag: 'h2' as const,
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

export default function EditsPage() {
  const pageStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
  };

  return (
    <div className="edits-page" style={pageStyle}>
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
        <div className="edits-why-inner edits-page-container">
          <Reveal delay={0}>
            <div className="edits-eyebrow">{PAGE_DATA.whyItMatters.eyebrow}</div>
          </Reveal>

          <Reveal delay={120}>
            <AnimatedHeading
              as={PAGE_DATA.whyItMatters.heading.tag}
              segments={PAGE_DATA.whyItMatters.heading.segments}
              threshold={0.35}
              className="edits-why-h2"
            />
          </Reveal>

          <div className="edits-cards-grid">
            {PAGE_DATA.whyItMatters.cards.map((card, idx) => (
              <Reveal
                key={`card-${idx}`}
                delay={240 + idx * 120}
                className="edits-card"
              >
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
              </Reveal>
            ))}
          </div>

          <div className="edits-stats-row">
            {PAGE_DATA.whyItMatters.stats.map((stat, idx) => (
              <Reveal
                key={`stat-${idx}`}
                delay={120 + idx * 120}
                className="edits-stat-col"
              >
                <div className={`edits-stat-inner-float ${stat.floatClass}`}>
                  <div className={`edits-stat-num-row ${stat.colorClass}`} aria-hidden="true">
                    <span className="edits-stat-number">{stat.target}</span>
                    {stat.unit && <span className={`edits-stat-unit ${stat.unitClass}`}>{stat.unit}</span>}
                  </div>
                  <span className="sr-only">{stat.label}</span>
                  <div className="edits-stat-caption">{stat.caption}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED */}
      <IncludedGallery
        id="whats-included"
        headingSegments={PAGE_DATA.whatsIncluded.heading.segments}
        subtitle={PAGE_DATA.whatsIncluded.subtitle}
        grid={PAGE_DATA.whatsIncluded.grid}
      />

      {/* SECTIONS 4 & 5: DESIGN & EDIT INTRO + OUR WORK SHOWCASE */}
      <EditsShowcase />

      {/* SECTION 6: HOW WE WORK (PRICING PLANS) */}
      <section className="edits-pricing-wrap" aria-label="How we work?">
        <div className="edits-pricing-inner edits-page-container">
          <Reveal delay={0}>
            <div className="edits-pricing-header">
              <h2 className="edits-pricing-h2">How we work?</h2>
              <p className="edits-pricing-sub">
                One month first. Then our discounted 3- and 6-month plans unlock.
              </p>
            </div>
          </Reveal>

          <div className="edits-pricing-cards">
            {/* 1 Month Plan */}
            <Reveal delay={120} className="edits-pricing-card edits-card-month-1">
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
            </Reveal>

            {/* 3 Month Plan */}
            <Reveal delay={240} className="edits-pricing-card edits-card-month-3">
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
            </Reveal>

            {/* 6 Month Plan */}
            <Reveal delay={360} className="edits-pricing-card edits-card-month-6">
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
            </Reveal>
          </div>

          <Reveal delay={480}>
            <div className="edits-pricing-statement">
              Let’s start with your <span className="edits-pricing-highlight">business goals</span> and build from there.
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 7: CLIENT FEEDBACK */}
      <ClientFeedbackApps />

      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .ah-letter-outer { opacity: 1 !important; translate: none !important; }
              .edits-stat-outer { opacity: 1 !important; transform: none !important; }
              .edits-stat-caption { opacity: 1 !important; }
              .reveal-float { opacity: 1 !important; transform: none !important; }
            `,
          }}
        />
      </noscript>
    </div>
  );
}
