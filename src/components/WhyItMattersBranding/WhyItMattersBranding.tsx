'use client';

import React from 'react';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import ComparisonSlider from '@/components/ComparisonSlider/ComparisonSlider';
import type { CSSPropertiesWithVars } from '@/types/css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

export interface BrandingStatItem {
  id: string;
  value: string;
  caption: string;
  isPurple: boolean;
}

export const BRANDING_STATS: BrandingStatItem[] = [
  {
    id: 'stat-attention',
    value: '3 s',
    caption: 'to catch attention',
    isPurple: false,
  },
  {
    id: 'stat-watchtime',
    value: '45%',
    caption: 'more watch time',
    isPurple: true,
  },
  {
    id: 'stat-saves',
    value: '3x',
    caption: 'more saves',
    isPurple: false,
  },
];

export default function WhyItMattersBranding() {
  const sectionStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
  };

  return (
    <section
      id="why-it-matters"
      className="wim-branding-section px-6 lg:px-0"
      aria-label="Why it matters"
      style={sectionStyle}
    >
      <div className="wim-branding-container !max-w-[1920px]">
        <p className="wim-branding-eyebrow">WHY IT MATTERS</p>

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

        <div className="wim-branding-slider-wrap">
          <ComparisonSlider
            beforeSrc="/images/branding/before.webp"
            afterSrc="/images/branding/after.webp"
            beforeAlt="Unbranded retail shop scene showing a woman holding a phone with generic unbranded black and white chips packaging"
            afterAlt="Branded retail shop scene showing a woman holding a phone with vibrant colorful Lipty chips packaging and bizzy branding"
          />
        </div>

        <div className="wim-stats-row w-full lg:w-[71.1%] max-w-[1365px] mx-auto">
          {BRANDING_STATS.map((stat) => (
            <div key={stat.id} className="wim-stat-col">
              <span className={`wim-stat-num ${stat.isPurple ? 'is-purple' : ''}`}>
                {stat.value}
              </span>
              <span className="wim-stat-caption">{stat.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
