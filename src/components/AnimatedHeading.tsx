'use client';

import React, { useRef, useState, useEffect } from 'react';
import type { CSSPropertiesWithVars } from '@/types/css';

export interface AnimatedHeadingSegment {
  text: string;
  fontClass?: string;
  colorClass?: string;
  hoverClass?: string;
  style?: CSSPropertiesWithVars;
  breakAfter?: boolean;
}

export const AH_LETTER_STAGGER_MS = 38;
export const AH_LETTER_DURATION_MS = 700;

/**
 * Computes the total time (in ms from mount) until the last letter of an
 * immediate AnimatedHeading finishes its entrance transition.
 */
export function getAnimatedHeadingRevealMs(
  segments: AnimatedHeadingSegment[] = [],
  startDelay = 0
): number {
  const letterCount = segments.reduce((total, seg) => {
    const nonSpaceChars = seg.text.replace(/\s+/g, '');
    return total + Array.from(nonSpaceChars).length;
  }, 0);

  if (letterCount === 0) return startDelay;

  const lastLetterIndex = letterCount - 1;
  const lastEntranceDelay = startDelay + lastLetterIndex * AH_LETTER_STAGGER_MS;
  return startDelay + lastEntranceDelay + AH_LETTER_DURATION_MS;
}

export interface AnimatedHeadingProps {
  as?: 'h1' | 'h2';
  segments?: AnimatedHeadingSegment[];
  startDelay?: number;
  threshold?: number;
  immediate?: boolean;
  className?: string;
  style?: CSSPropertiesWithVars;
}

export default function AnimatedHeading({
  as: Tag = 'h2',
  segments = [],
  startDelay = 0,
  threshold = 0.35,
  immediate = false,
  className = '',
  style = {},
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Assemble full plain text for screen readers (aria-label)
  const fullText = segments.map((s) => s.text).join(' ').replace(/\s+/g, ' ').trim();

  useEffect(() => {
    // 4-second safe fallback so letters are never stuck hidden
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 4000);

    const el = containerRef.current;
    if (!el) return;

    if (immediate) {
      // Hero h1 starts about 200ms after page mount
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, startDelay);

      // Pause wave when scrolled off-screen
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsPaused(!entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      obs.observe(el);

      return () => {
        clearTimeout(timer);
        clearTimeout(fallbackTimer);
        obs.disconnect();
      };
    }

    // Scroll-triggered headings (h2): trigger entrance once at threshold, pause wave offscreen
    let hasEntered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEntered) {
            hasEntered = true;
            setIsRevealed(true);
            setIsPaused(false);
          } else if (hasEntered) {
            setIsPaused(!entry.isIntersecting);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [immediate, startDelay, threshold]);

  // Pre-calculate deterministic letter indices across segments and lines
  let globalLetterIndex = 0;

  // Group segments into lines if breakAfter is specified to create explicit block-level spans on desktop
  const lines: { segments: AnimatedHeadingSegment[]; lineIdx: number }[] = [];
  let curLineSegments: AnimatedHeadingSegment[] = [];
  segments.forEach((seg) => {
    curLineSegments.push(seg);
    if (seg.breakAfter) {
      lines.push({ segments: curLineSegments, lineIdx: lines.length });
      curLineSegments = [];
    }
  });
  if (curLineSegments.length > 0) {
    lines.push({ segments: curLineSegments, lineIdx: lines.length });
  }

  const renderSegmentWords = (segment: AnimatedHeadingSegment, segIdx: number) => {
    const rawWords = segment.text.split(/(\s+)/);

    return rawWords.map((part, partIdx) => {
      if (/^\s+$/.test(part)) {
        return (
          <span key={`space-${segIdx}-${partIdx}`} className="ah-space">
            {' '}
          </span>
        );
      }

      if (!part) return null;

      const letters = Array.from(part).map((char, charIdx) => {
        const letterIdx = globalLetterIndex++;
        const entranceDelay = startDelay + letterIdx * AH_LETTER_STAGGER_MS;
        const waveDelay = entranceDelay + AH_LETTER_DURATION_MS + letterIdx * 70;

        const outerStyle: CSSPropertiesWithVars = {
          '--ah-entrance-delay': `${entranceDelay}ms`,
          ...segment.style,
        };
        const innerStyle: CSSPropertiesWithVars = {
          '--ah-wave-delay': `${waveDelay}ms`,
        };

        return (
          <span
            key={`char-${segIdx}-${partIdx}-${charIdx}`}
            className={`ah-letter-outer ${segment.colorClass || ''} ${
              segment.hoverClass || 'ah-hover-purple'
            }`}
            style={outerStyle}
          >
            <span className="ah-letter-inner" style={innerStyle}>
              {char}
            </span>
          </span>
        );
      });

      return (
        <span
          key={`word-${segIdx}-${partIdx}`}
          className={`ah-word ${segment.fontClass || ''}`}
        >
          {letters}
        </span>
      );
    });
  };

  return (
    <Tag
      ref={containerRef}
      className={`ah-heading ${isRevealed ? 'is-revealed' : ''} ${
        isPaused ? 'is-paused' : ''
      } ${className}`.trim()}
      aria-label={fullText}
      style={style}
    >
      <span aria-hidden="true" style={{ display: 'inline' }}>
        {lines.length > 1
          ? lines.map((line) => (
              <span
                key={`line-${line.lineIdx}`}
                className="ah-line block lg:whitespace-nowrap text-balance"
              >
                {line.segments.map((segment, segIdx) => (
                  <React.Fragment key={`seg-${line.lineIdx}-${segIdx}`}>
                    {renderSegmentWords(segment, segIdx)}
                  </React.Fragment>
                ))}
              </span>
            ))
          : segments.map((segment, segIdx) => (
              <React.Fragment key={`seg-${segIdx}`}>
                {renderSegmentWords(segment, segIdx)}
                {segment.breakAfter && <br className="ah-desktop-br" />}
              </React.Fragment>
            ))}
      </span>
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `.ah-letter-outer { opacity: 1 !important; translate: none !important; }`,
          }}
        />
      </noscript>
    </Tag>
  );
}
