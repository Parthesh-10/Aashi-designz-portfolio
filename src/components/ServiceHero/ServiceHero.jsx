'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import './ServiceHero.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

/**
 * ServiceHero — Shared hero component for /service/edits and /service/graphicdesign.
 * Ensures pixel-identical layout, typography, proportions, element placement and responsiveness.
 */
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
}) {
  return (
    <section
      id={id}
      className={`service-hero-wrap edits-hero-wrap ${className}`.trim()}
      aria-label="Hero Section"
      style={{
        '--font-instrument-serif': instrumentSerif.style.fontFamily,
        ...style,
      }}
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

      <div className="service-hero-inner edits-hero-inner">
        <div className="service-hero-content edits-hero-content">
          <AnimatedHeading
            as={headingTag}
            segments={headingSegments}
            startDelay={200}
            immediate={true}
            className="service-hero-h1 edits-hero-h1"
            style={headingMaxWidth ? { maxWidth: headingMaxWidth } : undefined}
          />

          {subtitle && (
            <p
              className="service-hero-sub edits-hero-sub"
              style={subtitleMaxWidth ? { maxWidth: subtitleMaxWidth } : undefined}
            >
              {subtitle}
            </p>
          )}

          {buttons && buttons.length > 0 && (
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
          )}

          {trusted && (
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
          )}
        </div>
      </div>
    </section>
  );
}
