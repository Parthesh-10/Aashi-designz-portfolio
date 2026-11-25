'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import type { CSSPropertiesWithVars } from '@/types/css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

export interface WorkCardItem {
  id: string;
  src: string;
  alt: string;
  href: string | undefined;
}

export const WORK_CARDS_DATA: WorkCardItem[] = [
  {
    id: 'work-1',
    src: '/images/work/work-1.jpg',
    alt: 'Blog-Sphere magazine cover design — The Voice of Modern Creators',
    href: '/casestudy/synctrip',
  },
  {
    id: 'work-2',
    src: '/images/work/work-2.jpg',
    alt: 'Gourmet Food & Life magazine editorial cover design',
    href: undefined,
  },
  {
    id: 'work-3',
    src: '/images/work/work-3.jpg',
    alt: 'Kantara marketing campaign and film poster design',
    href: undefined,
  },
];

export default function MyWorkApps() {
  const sectionStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
  };

  return (
    <section
      id="my-work"
      className="mw-section"
      aria-label="My work"
      style={sectionStyle}
    >
      <div className="mw-container">
        <div className="mw-header-block">
          <p className="mw-eyebrow">MY WORK</p>
          <AnimatedHeading
            as="h2"
            segments={[
              { text: 'Work that ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
              { text: 'actually ', fontClass: 'mw-serif-accent', colorClass: '', hoverClass: 'ah-hover-slate' },
              { text: 'shines.', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
            ]}
            threshold={0.35}
            className="mw-h2"
          />
        </div>

        <ul className="mw-cards-list">
          {WORK_CARDS_DATA.map((card, idx) => {
            const hasImage = Boolean(card.src);
            const CardContent = (
              <div className="mw-card-inner">
                {hasImage ? (
                  <Image
                    src={card.src}
                    alt={card.alt || `Case study ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 29vw, 26vw"
                    className="mw-card-img"
                  />
                ) : (
                  <div className="mw-card-placeholder" aria-hidden="true" />
                )}
              </div>
            );

            return (
              <li key={card.id || `work-card-${idx}`} className="mw-card-item">
                {card.href ? (
                  <Link
                    href={card.href}
                    className="mw-card-link"
                    aria-label={card.alt || `View case study ${idx + 1}`}
                  >
                    {CardContent}
                  </Link>
                ) : (
                  <div className="mw-card">{CardContent}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mw-cta-wrap">
          <Link href="#" className="mw-btn">
            <span className="mw-btn-text">View more case studies</span>
            <span className="mw-btn-circle" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mw-btn-arrow"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
