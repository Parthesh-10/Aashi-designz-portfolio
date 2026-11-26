import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import ServiceHero from '@/components/ServiceHero/ServiceHero';
import IncludedGallery from '@/components/IncludedGallery/IncludedGallery';
import ServiceIntro from '@/components/ServiceIntro/ServiceIntro';
import ClientFeedbackApps, {
  type ClientFeedbackItem,
} from '@/components/ClientFeedbackApps/ClientFeedbackApps';
import Reveal from '@/components/Reveal';
import type { CSSPropertiesWithVars } from '@/types/css';

export const metadata: Metadata = {
  title: 'Digital Marketing | Aashidesignz',
  description:
    'Ads, content and funnels. Measured. Marketing that moves numbers for your brand.',
};

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

const PAGE_DATA = {
  hero: {
    bgImage: '/images/service/digital-marketing/hero-bg.png',
    bgAlt: 'Hand holding a phone displaying analytics dashboard',
    heading: {
      tag: 'h1' as const,
      segments: [
        {
          text: 'Marketing that',
          fontClass: '',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
          breakAfter: true,
        },
        {
          text: 'moves',
          fontClass: 'service-serif-accent edits-serif-accent',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
        },
        {
          text: ' numbers.',
          fontClass: '',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
        },
      ],
    },
    subtitle: 'Ads, content and funnels. Measured.',
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
    headingLine1: 'Posting every day isn\'t a',
    headingLine2: 'marketing strategy.',
    subtext:
      'Your brand deserves more than random posts, trending audios and the occasional boost button.',
    cards: [
      {
        tag: 'Random',
        bgClass: 'bg-[#2a2a2a]',
        image: '/images/service/digital-marketing/random-dashboard.png',
        alt: 'Random marketing dashboard showing poor results',
      },
      {
        tag: 'Strategic',
        bgClass: 'bg-[#0f1623]',
        image: '/images/service/digital-marketing/strategic-dashboard.png',
        alt: 'Strategic marketing dashboard showing strong growth results',
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
    subtitle: 'BRAND-BUILDING ESSENTIALS',
    items: [
      {
        id: 'tile-01',
        image: '/images/service/digital-marketing/social-media-management.jpg',
        title: 'Social Media Management',
        subtitle: '',
        alt: 'Instagram profile on a phone showing a curated social media feed',
        objectPosition: 'center',
      },
      {
        id: 'tile-02',
        image: '/images/service/digital-marketing/content-creation.png',
        title: 'Content Creation',
        subtitle: '',
        alt: 'Phone on a tripod set up for content filming',
        objectPosition: 'center',
      },
      {
        id: 'tile-03',
        image: '/images/service/digital-marketing/meta-google-ads.png',
        title: 'Meta & Google Ads',
        subtitle: '',
        alt: 'Facebook ad on a phone showing a paid campaign',
        objectPosition: 'center',
      },
      {
        id: 'tile-04',
        image: '/images/service/digital-marketing/seo-online.png',
        title: 'SEO & Online Presence',
        subtitle: '',
        alt: 'Google search result for a local business on a phone',
        objectPosition: 'center',
      },
      {
        id: 'tile-05',
        image: '/images/service/digital-marketing/lead-generation.png',
        title: 'Lead Generation',
        subtitle: '',
        alt: 'Lead generation illustration with profile cards and connection lines',
        objectPosition: 'center',
      },
      {
        id: 'tile-06',
        image: '/images/service/digital-marketing/performance-marketing.png',
        title: 'Performance Marketing',
        subtitle: '',
        alt: 'Staircase blocks reading Day One and One Day',
        objectPosition: 'center',
      },
    ],
  },

  creativeBlock: {
    eyebrow: 'DIGITAL MARKETING',
    headline: [
      {
        text: 'Creative is good. ',
        fontClass: '',
        colorClass: '',
        hoverClass: 'ah-hover-purple',
      },
      {
        text: 'Creative',
        fontClass: 'service-serif-accent edits-serif-accent',
        colorClass: '',
        hoverClass: 'ah-hover-slate',
      },
      {
        text: ' that converts? ',
        fontClass: '',
        colorClass: '',
        hoverClass: 'ah-hover-purple',
      },
      {
        text: 'Better.',
        fontClass: 'service-serif-accent edits-serif-accent',
        colorClass: '',
        hoverClass: 'ah-hover-slate',
      },
    ],
    stats: [
      {
        value: '6+',
        captionLines: ['Core growth channels', 'working together'],
        highlight: false,
      },
      {
        value: '360°',
        captionLines: ['Marketing approach'],
        highlight: true,
      },
      {
        value: '100%',
        captionLines: ['Focus on making every', 'campaign count'],
        highlight: false,
      },
    ],
    quote: '"Don\'t just post. Plan, execute, and measure."',
  },

  difference: {
    eyebrow: 'THE DIFFERENCE',
    headingPlain: 'A funnel,',
    headingAccent: 'not a guess.',
    funnels: [
      {
        src: '/images/service/digital-marketing/funnel-without-strategy.png',
        alt: 'Funnel without a strategy: Awareness 100% reach, Consideration 12% engagement, Preference 4% click-through, Purchase 0.8% conversion, Retention 15% repeat rate.',
        delay: 240,
      },
      {
        src: '/images/service/digital-marketing/funnel-with-strategy.png',
        alt: 'Funnel with a strategy: Awareness 100% reach, Consideration 28% engagement, Preference 14% click-through, Purchase 6.5% conversion, Retention 40% repeat rate.',
        delay: 360,
      },
    ],
  },

  testimonials: [
    {
      id: 'dm-feedback-1',
      quote:
        'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
      name: 'Richa Bajaj',
      role: 'Content Strategist at Edurev',
      avatar: '/images/testimonials/richa-bajaj.jpg',
      rating: 5,
      tilt: 0,
      offsetY: 0,
    },
    {
      id: 'dm-feedback-2',
      quote:
        'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
      name: 'Richa Bajaj',
      role: 'Content Strategist at Edurev',
      avatar: '/images/testimonials/richa-bajaj.jpg',
      rating: 5,
      tilt: 0,
      offsetY: 0,
    },
    {
      id: 'dm-feedback-3',
      quote:
        'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
      name: 'Richa Bajaj',
      role: 'Content Strategist at Edurev',
      avatar: '/images/testimonials/richa-bajaj.jpg',
      rating: 5,
      tilt: 0,
      offsetY: 0,
    },
    {
      id: 'dm-feedback-4',
      quote:
        'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
      name: 'Richa Bajaj',
      role: 'Content Strategist at Edurev',
      avatar: '/images/testimonials/richa-bajaj.jpg',
      rating: 5,
      tilt: 0,
      offsetY: 0,
    },
  ] satisfies ClientFeedbackItem[],
};

export default function DigitalMarketingPage() {
  const serifFontVar: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
  };

  return (
    <div className="box-border" style={serifFontVar}>
      {/* SECTION A: HERO */}
      <ServiceHero
        id="hero"
        bgImage={PAGE_DATA.hero.bgImage}
        bgAlt={PAGE_DATA.hero.bgAlt}
        headingTag={PAGE_DATA.hero.heading.tag}
        headingSegments={PAGE_DATA.hero.heading.segments}
        subtitle={PAGE_DATA.hero.subtitle}
        buttons={PAGE_DATA.hero.buttons}
        trusted={PAGE_DATA.hero.trusted}
      />

      {/* SECTION B: WHY IT MATTERS */}
      <section
        id={PAGE_DATA.whyItMatters.id}
        className="edits-why-wrap"
        aria-label="Why It Matters"
      >
        <div className="edits-why-inner edits-page-container">
          {/* Eyebrow */}
          <Reveal delay={0}>
            <p className="edits-eyebrow">{PAGE_DATA.whyItMatters.eyebrow}</p>
          </Reveal>

          {/* Heading */}
          <Reveal delay={120}>
            <AnimatedHeading
              as="h2"
              segments={[
                {
                  text: PAGE_DATA.whyItMatters.headingLine1,
                  fontClass: '',
                  colorClass: '',
                  hoverClass: 'ah-hover-purple',
                  breakAfter: true,
                },
                {
                  text: PAGE_DATA.whyItMatters.headingLine2,
                  fontClass: 'edits-serif-accent edits-why-h2-accent',
                  colorClass: 'edits-why-h2-accent',
                  hoverClass: 'ah-hover-slate',
                },
              ]}
              threshold={0.35}
              className="edits-why-h2"
            />
          </Reveal>

          {/* Sub-text */}
          <Reveal delay={240}>
            <p className="edits-why-sub">{PAGE_DATA.whyItMatters.subtext}</p>
          </Reveal>

          {/* Comparison cards */}
          <Reveal delay={320}>
            <div className="edits-cards-grid dm-cards-grid">
              {PAGE_DATA.whyItMatters.cards.map((card, idx) => (
                <div
                  key={idx}
                  className={`edits-card dm-dashboard-card ${card.bgClass} relative overflow-hidden rounded-2xl`}
                >
                  {/* Pill tag */}
                  <div className="edits-card-pill edits-pill-after absolute top-4 left-4 z-10">
                    {card.tag}
                  </div>
                  {/* Dashboard image */}
                  <div className="relative w-full h-full min-h-[260px]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-contain object-center p-4"
                    />
                  </div>
                </div>
              ))}

              {/* VS badge */}
              <div className="edits-vs-badge" aria-hidden="true">
                VS
              </div>
            </div>
          </Reveal>

          {/* Stats row */}
          <div className="edits-stats-row" role="list">
            {PAGE_DATA.whyItMatters.stats.map((stat, idx) => (
              <Reveal key={idx} delay={400 + stat.delay} className={`edits-stat-col ${stat.floatClass}`}>
                <div className="edits-stat-inner-float" role="listitem">
                  <div className={`edits-stat-num-row ${stat.colorClass}`} aria-hidden="true">
                    <span className="edits-stat-num">{stat.target}</span>
                    <span className={`edits-stat-unit-label ${stat.unitClass}`}>{stat.unit}</span>
                  </div>
                  <span className="sr-only">{stat.label}</span>
                  <div className="edits-stat-caption">{stat.caption}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: WHAT'S INCLUDED */}
      <IncludedGallery
        id="whats-included"
        heading="What's Included"
        subtitle={PAGE_DATA.whatsIncluded.subtitle}
        subtitleUppercase={true}
        items={PAGE_DATA.whatsIncluded.items}
      />

      {/* SECTION D: CREATIVE IS GOOD – stat cards + quote */}
      <ServiceIntro
        id="creative-block"
        eyebrow={PAGE_DATA.creativeBlock.eyebrow}
        headline={PAGE_DATA.creativeBlock.headline}
        stats={PAGE_DATA.creativeBlock.stats}
        quote={PAGE_DATA.creativeBlock.quote}
      />

      {/* SECTION E: THE DIFFERENCE */}
      <section
        className="w-full bg-white py-10 md:py-16 box-border overflow-hidden"
        aria-label="The Difference"
        id="the-difference"
      >
        <div className="edits-page-container box-border">
          <Reveal delay={0}>
            <p className="edits-section-eyebrow text-left">
              {PAGE_DATA.difference.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-[clamp(2.5rem,6.2vw,6rem)] leading-[1.02] tracking-[-0.035em] font-bold text-[#313944] text-left m-0 lg:whitespace-nowrap">
              {PAGE_DATA.difference.headingPlain}{' '}
              <span className="text-[#AE88E8] font-bold not-italic">
                {PAGE_DATA.difference.headingAccent}
              </span>
            </h2>
          </Reveal>

          <div className="mx-auto mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 w-full lg:w-[75.7%] max-w-[1454px]">
            {PAGE_DATA.difference.funnels.map((funnel) => (
              <Reveal key={funnel.src} delay={funnel.delay}>
                <div className="aspect-square relative w-full max-w-[420px] md:max-w-none mx-auto">
                  <Image
                    src={funnel.src}
                    alt={funnel.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 768px) 50vw, 90vw"
                    quality={85}
                    className="object-contain"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: CLIENT FEEDBACK */}
      <ClientFeedbackApps
        items={PAGE_DATA.testimonials}
        animateReveal={true}
        usePageContainer={true}
      />

      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .ah-letter-outer { opacity: 1 !important; translate: none !important; }
              .reveal-float { opacity: 1 !important; transform: none !important; }
            `,
          }}
        />
      </noscript>
    </div>
  );
}
