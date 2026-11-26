'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading, {
  getAnimatedHeadingRevealMs,
  type AnimatedHeadingSegment,
} from '@/components/AnimatedHeading';
import Reveal from '@/components/Reveal';
import type { CSSPropertiesWithVars } from '@/types/css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

const HERO_HEADING_START_DELAY_MS = 200;
const HERO_REVEAL_DURATION_MS = 500;

export interface ServiceHeroButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface ServiceHeroTrusted {
  image?: string;
  alt?: string;
  text?: string;
}

export interface ServiceHeroProps {
  id?: string;
  bgImage?: string;
  bgAlt?: string;
  bgQuality?: number;
  bgPriority?: boolean;
  overlayGradient?: string;
  headingTag?: 'h1' | 'h2';
  headingSegments?: AnimatedHeadingSegment[];
  headingMaxWidth?: string;
  headingClassName?: string;
  subtitle?: React.ReactNode;
  subtitleMaxWidth?: string;
  buttons?: ServiceHeroButton[];
  trusted?: ServiceHeroTrusted | null;
  className?: string;
  style?: CSSPropertiesWithVars;
}

export default function ServiceHero({
  id = 'hero',
  bgImage = '/edits/hero-bg.webp',
  bgAlt = 'Hero background',
  bgQuality = 85,
  bgPriority = true,
  overlayGradient,
  headingTag = 'h1',
  headingSegments = [],
  headingMaxWidth,
  headingClassName,
  subtitle,
  subtitleMaxWidth,
  buttons = [],
  trusted = {
    image: '/edits/trusted.webp',
    alt: 'Trusted brands client avatars',
    text: 'Trusted by 200+ Brands',
  },
  className = '',
  style = {},
}: ServiceHeroProps) {
  const sectionStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
    ...style,
  };

  // Sequence strictly: Heading -> Subtitle -> Buttons -> Trust row (each starts after previous ends)
  const headingFinishMs = getAnimatedHeadingRevealMs(
    headingSegments,
    HERO_HEADING_START_DELAY_MS
  );
  const subtitleDelayMs = headingFinishMs;
  const buttonsDelayMs = subtitle ? subtitleDelayMs + HERO_REVEAL_DURATION_MS : headingFinishMs;
  const trustedDelayMs =
    buttons && buttons.length > 0 ? buttonsDelayMs + HERO_REVEAL_DURATION_MS : buttonsDelayMs;

  return (
    <section
      id={id}
      className={`service-hero-wrap edits-hero-wrap ${className}`.trim()}
      aria-label="Hero Section"
      style={sectionStyle}
    >
      <Image
        src={bgImage}
        alt={bgAlt}
        fill
        priority={bgPriority}
        sizes="100vw"
        quality={bgQuality}
        className="service-hero-bg-img edits-hero-bg-img"
      />
      <div
        className="service-hero-overlay edits-hero-overlay"
        aria-hidden="true"
        style={overlayGradient ? { background: overlayGradient } : undefined}
      />

      <div className="service-hero-inner edits-hero-inner edits-page-container">
        <div className="service-hero-content edits-hero-content">
          {/* Step 1: Headline entrance begins at 0ms and finishes at headingFinishMs */}
          <Reveal delay={0} duration={HERO_REVEAL_DURATION_MS}>
            <AnimatedHeading
              as={headingTag}
              segments={headingSegments}
              startDelay={HERO_HEADING_START_DELAY_MS}
              immediate={true}
              className={`service-hero-h1 edits-hero-h1 ${headingClassName || ''}`.trim()}
              style={headingMaxWidth ? { maxWidth: headingMaxWidth } : undefined}
            />
          </Reveal>

          {subtitle && (
            /* Step 2: Sub-text floats in only after headline entrance finishes */
            <Reveal delay={subtitleDelayMs} duration={HERO_REVEAL_DURATION_MS}>
              <p
                className="service-hero-sub edits-hero-sub text-pretty"
                style={subtitleMaxWidth ? { maxWidth: subtitleMaxWidth } : undefined}
              >
                {subtitle}
              </p>
            </Reveal>
          )}

          {buttons && buttons.length > 0 && (
            /* Step 3: Both buttons float in together only after sub-text finishes */
            <Reveal delay={buttonsDelayMs} duration={HERO_REVEAL_DURATION_MS}>
              <div className="service-hero-btns edits-hero-btns">
                {buttons.map((btn, idx) => (
                  <Link
                    key={`btn-${idx}`}
                    href={btn.href}
                    className={`clickable ${
                      btn.variant === 'primary'
                        ? 'service-btn-primary edits-btn-primary'
                        : 'service-btn-secondary edits-btn-secondary'
                    }`}
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          {trusted && (
            /* Step 4: Trusted by brands row floats in last, only after buttons finish */
            <Reveal delay={trustedDelayMs} duration={HERO_REVEAL_DURATION_MS}>
              <div className="service-trusted-row edits-trusted-row">
                {trusted.image && (
                  <div className="service-trusted-img-wrap edits-trusted-img-wrap">
                    <Image
                      src={trusted.image}
                      alt={trusted.alt || 'Trusted brands'}
                      width={94}
                      height={42}
                      className="service-trusted-img edits-trusted-img"
                    />
                  </div>
                )}
                {trusted.text && (
                  <span className="service-trusted-text edits-trusted-text">{trusted.text}</span>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
