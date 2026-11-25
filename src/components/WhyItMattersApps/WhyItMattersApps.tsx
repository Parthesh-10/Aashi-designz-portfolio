'use client';

import React from 'react';
import Image from 'next/image';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import type { CSSPropertiesWithVars } from '@/types/css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function WhyItMattersApps() {
  const sectionStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
  };

  return (
    <section
      id="why-it-matters"
      className="wim-section"
      aria-label="Why it matters"
      style={sectionStyle}
    >
      <div className="wim-container">
        <p className="wim-eyebrow">WHY IT MATTERS</p>

        <AnimatedHeading
          as="h2"
          segments={[
            {
              text: 'A good interface looks nice.',
              fontClass: 'wim-line-1',
              colorClass: 'wim-ink',
              hoverClass: 'ah-hover-purple',
              breakAfter: true,
            },
            {
              text: 'A good ',
              fontClass: 'wim-line-2',
              colorClass: 'wim-purple',
              hoverClass: 'ah-hover-slate',
            },
            {
              text: 'experience ',
              fontClass: 'wim-line-2',
              colorClass: 'wim-ink',
              hoverClass: 'ah-hover-purple',
            },
            {
              text: 'makes sense.',
              fontClass: 'wim-line-2',
              colorClass: 'wim-purple',
              hoverClass: 'ah-hover-slate',
            },
          ]}
          threshold={0.35}
          className="wim-h2"
        />

        <p className="wim-subtext">
          People shouldn&apos;t have to figure out how to use your product.
        </p>

        <div className="wim-image-wrap">
          <Image
            src="/images/why-it-matters-phones.png"
            alt="Side-by-side comparison of a plain wireframe app screen and the polished final app design."
            width={1024}
            height={1014}
            priority={false}
            className="wim-image"
            sizes="(max-width: 768px) 84vw, (max-width: 1024px) 52vw, 38vw"
          />
        </div>
      </div>
    </section>
  );
}
