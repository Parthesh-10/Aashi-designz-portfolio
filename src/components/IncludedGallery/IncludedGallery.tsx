'use client';

import React, { useMemo } from 'react';
import AnimatedHeading, { type AnimatedHeadingSegment } from '@/components/AnimatedHeading';
import IncludedGrid, { type IncludedGridRow } from '@/components/IncludedGrid/IncludedGrid';
import Reveal from '@/components/Reveal';

export interface IncludedGalleryItem {
  id?: string;
  src?: string;
  image?: string;
  title: string;
  subtitle?: string;
  alt: string;
  href?: string;
  objectPosition?: string;
  blurDataURL?: string;
}

export interface IncludedGalleryProps {
  id?: string;
  heading?: string;
  headingSegments?: AnimatedHeadingSegment[];
  subtitle?: string;
  subtitleUppercase?: boolean;
  items?: IncludedGalleryItem[];
  grid?: IncludedGridRow[];
  className?: string;
}

export default function IncludedGallery({
  id = 'whats-included',
  heading = 'What’s Included',
  headingSegments,
  subtitle,
  subtitleUppercase = false,
  items,
  grid,
  className = '',
}: IncludedGalleryProps) {
  const gridData = useMemo<IncludedGridRow[]>(() => {
    if (grid) return grid;
    if (items && Array.isArray(items)) {
      return [
        {
          row: 1,
          tiles: items.slice(0, 3).map((item, idx) => ({
            id: item.id || `tile-0${idx + 1}`,
            image: item.src || item.image || '',
            title: item.title,
            subtitle: item.subtitle,
            alt: item.alt,
            href: item.href,
            objectPosition: item.objectPosition,
            blurDataURL: item.blurDataURL,
          })),
        },
        {
          row: 2,
          tiles: items.slice(3, 6).map((item, idx) => ({
            id: item.id || `tile-0${idx + 4}`,
            image: item.src || item.image || '',
            title: item.title,
            subtitle: item.subtitle,
            alt: item.alt,
            href: item.href,
            objectPosition: item.objectPosition,
            blurDataURL: item.blurDataURL,
          })),
        },
      ];
    }
    return [];
  }, [grid, items]);

  const segments: AnimatedHeadingSegment[] =
    headingSegments || [
      {
        text: heading,
        fontClass: '',
        colorClass: '',
        hoverClass: 'ah-hover-purple',
      },
    ];

  return (
    <section
      id={id}
      className={`included-gallery-wrap edits-included-wrap ${className}`}
      aria-label={`${heading} Section`}
    >
      <div className="included-gallery-inner edits-included-inner w-full max-w-none px-0">
        <div className="edits-page-container w-full">
          <Reveal delay={0}>
            <AnimatedHeading
              as="h2"
              segments={segments}
              threshold={0.35}
              className="included-gallery-h2 edits-included-h2"
            />
          </Reveal>
          {subtitle && (
            <Reveal delay={120}>
              <p
                className={`included-gallery-sub edits-included-sub ${
                  subtitleUppercase ? 'is-uppercase' : ''
                }`}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
        <Reveal delay={240} className="included-grid-reveal-wrap w-full">
          <IncludedGrid data={gridData} />
        </Reveal>
      </div>
    </section>
  );
}
