'use client';

import React from 'react';
import Reveal from '@/components/Reveal';

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
  items?: ClientFeedbackItem[];
  animateReveal?: boolean;
  usePageContainer?: boolean;
  children?: React.ReactNode;
}

export default function ClientFeedbackApps({
  showEyebrow = true,
  className = '',
  asBlock = false,
  items = TESTIMONIALS_DATA,
  children,
}: ClientFeedbackAppsProps) {
  const visibleItems = items.slice(0, 3);

  const content = (
    <div className="w-full box-border">
      <Reveal delay={0}>
        <div className="w-full text-left box-border">
          {showEyebrow && (
            <div className="dotContainer mb-1">
              <div className="dot" aria-hidden="true" />
              <span className="text-[16px] font-bold text-[#313944]">Client feedback</span>
            </div>
          )}

          <h2 className="m-0 mb-4 text-[34px] md:text-[54px] font-normal leading-[1.15] text-[#313944] text-left">
            Don’t take it from me, take it from them.
          </h2>
        </div>
      </Reveal>

      <ul
        className="list-none p-0 m-0 mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center w-full box-border"
        aria-label="Client testimonials list"
      >
        {visibleItems.map((t, idx) => {
          const isCenter = idx === 1;
          return (
            <Reveal
              key={t.id}
              as="li"
              delay={idx * 120}
              className={`min-w-0 flex flex-col justify-between rounded-[10px] p-8 text-white box-border ${
                isCenter
                  ? 'bg-[#222435] min-h-[300px] md:min-h-[336px] md:scale-[1.06] z-10'
                  : 'bg-[#2d3047] min-h-[300px]'
              }`}
            >
              <div className="w-8 h-8 mb-4 shrink-0" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/quotes.svg" alt="" className="w-full h-full object-contain" />
              </div>

              <blockquote className="m-0 p-0 text-white text-[15px] md:text-[16px] font-normal leading-relaxed text-left">
                {t.quote}
              </blockquote>

              <div className="flex flex-col text-left mt-6">
                <cite className="not-italic text-white text-[17px] md:text-[18px] font-semibold leading-snug">
                  {t.name}
                </cite>
                <span className="text-white/80 text-[13px] md:text-[14px] font-normal leading-snug mt-0.5">
                  {t.role}
                </span>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {children}
    </div>
  );

  if (asBlock) {
    return (
      <div
        className={`w-full px-6 md:px-12 xl:px-[min(10.4vw,200px)] box-border ${className}`.trim()}
      >
        {content}
      </div>
    );
  }

  return (
    <section
      id="client-feedback"
      className={`w-full bg-white py-12 md:py-16 px-6 md:px-12 xl:px-[min(10.4vw,200px)] box-border overflow-hidden ${className}`.trim()}
      aria-label="Client feedback"
    >
      {content}
    </section>
  );
}
