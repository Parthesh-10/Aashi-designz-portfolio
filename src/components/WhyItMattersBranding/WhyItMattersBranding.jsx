'use client';

import React from 'react';
import Image from 'next/image';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import './WhyItMattersBranding.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

/**
 * WhyItMattersBranding — "Why it matters" intro and large image card for /service/branding.
 * Reuses identical eyebrow and headline sizes, fonts and spacing from the Apps & websites page.
 */
export default function WhyItMattersBranding({
  imageSrc = '/images/branding/why-it-matters.webp',
  imageAlt = 'Brand identity design showcase with brand strategy elements and packaging app',
  imageWidth = 2000,
  imageHeight = 1250,
}) {
  return (
    <section
      id="why-it-matters"
      className="wim-branding-section"
      aria-label="Why it matters"
      style={{
        '--font-instrument-serif': instrumentSerif.style.fontFamily,
      }}
    >
      <div className="wim-branding-container">
        {/* Eyebrow */}
        <p className="wim-branding-eyebrow">WHY IT MATTERS</p>

        {/* Centered Two-Line Headline */}
        <AnimatedHeading
          as="h2"
          segments={[
            {
              text: 'Your brand is more than a',
              fontClass: 'wim-branding-line-1',
              colorClass: 'wim-ink',
              hoverClass: 'ah-hover-purple',
              breakAfter: true,
            },
            {
              text: 'pretty logo.',
              fontClass: 'wim-branding-line-2',
              colorClass: 'wim-purple',
              hoverClass: 'ah-hover-slate',
            },
          ]}
          threshold={0.35}
          className="wim-branding-h2"
        />

        {/* Large Image Card (72% desktop, 3px ink frame, clamp(14px, 24px) border-radius) */}
        <div className="wim-branding-card">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority={false}
            className="wim-branding-img"
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 88vw, 72vw"
          />
        </div>
      </div>
    </section>
  );
}
