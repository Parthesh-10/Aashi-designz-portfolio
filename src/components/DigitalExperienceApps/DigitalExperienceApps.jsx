'use client';

import React from 'react';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading from '@/components/AnimatedHeading';
import './DigitalExperienceApps.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

// 6 benefits data array (order: left to right, then down)
export const BENEFITS_DATA = [
  {
    id: 'search-visibility',
    title: 'Search visibility',
    description: 'SEO-ready foundations that help your business get discovered.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 'more-conversions',
    title: 'More conversions',
    description: 'Turn website traffic into enquiries, sign-ups and sales.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    id: 'revenue-opportunities',
    title: 'Revenue opportunities',
    description: 'Make it easier for customers to discover and buy.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 3H4a2 2 0 0 0-2 2v2h18V5a2 2 0 0 0-2-2z" />
        <circle cx="16.5" cy="14" r="1.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'brand-credibility',
    title: 'Brand credibility',
    description: 'Build confidence through a professional experience.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'customer-retention',
    title: 'Customer retention',
    description: 'Give people reasons to return and stay engaged.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    id: 'business-automation',
    title: 'Business automation',
    description: 'Reduce repetitive tasks with smarter digital systems.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="15" width="6" height="6" rx="1.5" />
        <rect x="15" y="3" width="6" height="6" rx="1.5" />
        <path d="M9 18h3a3 3 0 0 0 3-3V9" />
      </svg>
    ),
  },
];

export default function DigitalExperienceApps() {
  return (
    <section
      id="digital-experience"
      className="bde-section"
      aria-label="A better digital experience. A stronger business."
      style={{
        '--font-instrument-serif': instrumentSerif.style.fontFamily,
      }}
    >
      <div className="bde-container">
        {/* Centered Two-Line Headline */}
        <AnimatedHeading
          as="h2"
          segments={[
            {
              text: 'A BETTER DIGITAL EXPERIENCE.',
              fontClass: 'bde-line-1',
              colorClass: '',
              hoverClass: 'ah-hover-purple',
              breakAfter: true,
            },
            {
              text: 'A STRONGER BUSINESS.',
              fontClass: 'bde-line-2',
              colorClass: '',
              hoverClass: 'ah-hover-slate',
            },
          ]}
          threshold={0.35}
          className="bde-h2"
        />

        {/* Wide Black Card with Inset Outline */}
        <div className="bde-card">
          <div className="bde-card-outline" aria-hidden="true" />
          <div className="bde-card-content">
            <ul className="bde-grid">
              {BENEFITS_DATA.map((benefit) => (
                <li key={benefit.id} className="bde-item">
                  <div className="bde-icon-wrap">{benefit.icon}</div>
                  <h3 className="bde-item-title">{benefit.title}</h3>
                  <p className="bde-item-desc">{benefit.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
