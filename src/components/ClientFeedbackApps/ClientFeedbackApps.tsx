'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedHeading from '@/components/AnimatedHeading';
import type { CSSPropertiesWithVars } from '@/types/css';

export interface ClientFeedbackItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  tilt: number;
  offsetY: number;
}

export const TESTIMONIALS_DATA: ClientFeedbackItem[] = [
  {
    id: 'feedback-1',
    quote:
      'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
    name: 'Richa Bajaj',
    role: 'Content Strategist at Edurev',
    avatar: '/images/testimonials/richa-bajaj.jpg',
    rating: 5,
    tilt: -1.5,
    offsetY: 0,
  },
  {
    id: 'feedback-2',
    quote:
      'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
    name: 'Richa Bajaj',
    role: 'Content Strategist at Edurev',
    avatar: '/images/testimonials/richa-bajaj.jpg',
    rating: 5,
    tilt: 1.0,
    offsetY: 4,
  },
  {
    id: 'feedback-3',
    quote:
      'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
    name: 'Richa Bajaj',
    role: 'Content Strategist at Edurev',
    avatar: '/images/testimonials/richa-bajaj.jpg',
    rating: 5,
    tilt: -1.0,
    offsetY: 1,
  },
  {
    id: 'feedback-4',
    quote:
      'Working with Michael was a game-changer for our product. His ability to merge strategy with stunning visuals made our platform not only beautiful but incredibly user-friendly.',
    name: 'Richa Bajaj',
    role: 'Content Strategist at Edurev',
    avatar: '/images/testimonials/richa-bajaj.jpg',
    rating: 5,
    tilt: 1.5,
    offsetY: 3,
  },
];

export interface ClientFeedbackAppsProps {
  showEyebrow?: boolean;
  className?: string;
  asBlock?: boolean;
  children?: React.ReactNode;
}

export default function ClientFeedbackApps({
  showEyebrow = true,
  className = '',
  asBlock = false,
  children,
}: ClientFeedbackAppsProps) {
  const content = (
    <div className="cf-container">
      <div className="cf-header-block">
        {showEyebrow && (
          <div className="cf-eyebrow">
            <span className="cf-eyebrow-dot" aria-hidden="true" />
            <span>CLIENT FEEDBACK</span>
          </div>
        )}

        <AnimatedHeading
          as="h2"
          segments={[
            {
              text: "Don’t take it from me, take it",
              fontClass: 'cf-line-1',
              colorClass: '',
              hoverClass: 'ah-hover-purple',
              breakAfter: true,
            },
            {
              text: 'from them.',
              fontClass: 'cf-line-2',
              colorClass: '',
              hoverClass: 'ah-hover-purple',
            },
          ]}
          threshold={0.35}
          className="cf-h2"
        />
      </div>

      <div className="cf-cards-wrap">
        <ul className="cf-cards-row" tabIndex={0} aria-label="Client testimonials list">
          {TESTIMONIALS_DATA.map((t) => {
            const cardStyle: CSSPropertiesWithVars = {
              '--card-tilt': `${t.tilt}deg`,
              '--card-offset-y': `${t.offsetY}px`,
            };
            return (
              <li key={t.id} className="cf-card-item" style={cardStyle}>
                <div className="cf-card">
                  <div className="cf-stars-row" aria-hidden="true">
                    {[...Array(5)].map((_, sIdx) => (
                      <svg
                        key={`star-${sIdx}`}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cf-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="cf-quote">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <footer className="cf-author">
                    <div className="cf-avatar-wrap">
                      {t.avatar ? (
                        <Image
                          src={t.avatar}
                          alt=""
                          width={26}
                          height={26}
                          className="cf-avatar-img"
                        />
                      ) : (
                        <div className="cf-avatar-initials">
                          {t.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      )}
                    </div>
                    <div className="cf-author-info">
                      <cite className="cf-author-name">{t.name}</cite>
                      <span className="cf-author-role">{t.role}</span>
                    </div>
                  </footer>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {children}
    </div>
  );

  if (asBlock) {
    return <div className={`cf-block-wrap ${className}`}>{content}</div>;
  }

  return (
    <section
      id="client-feedback"
      className={`cf-section ${className}`}
      aria-label="Client Feedback"
    >
      {content}
    </section>
  );
}
