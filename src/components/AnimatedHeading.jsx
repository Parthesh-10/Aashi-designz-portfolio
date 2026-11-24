'use client';

import React, { useRef, useState, useEffect } from 'react';
import './AnimatedHeading.css';

/**
 * AnimatedHeading — Deterministic letter-by-letter entrance, continuous wave, and hover.
 *
 * @param {string} as - Heading element tag ('h1' | 'h2')
 * @param {Array} segments - Array of segment objects:
 *   [{ text, fontClass, colorClass, hoverClass, style, breakAfter }]
 * @param {number} startDelay - Starting delay in ms (e.g. 200 for h1, 0 for h2)
 * @param {number} threshold - Intersection threshold (default: 0.35)
 * @param {boolean} immediate - Whether to start on mount after startDelay (for hero h1)
 * @param {string} className - Additional CSS classes
 */
export default function AnimatedHeading({
  as: Tag = 'h2',
  segments = [],
  startDelay = 0,
  threshold = 0.35,
  immediate = false,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
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
        {segments.map((segment, segIdx) => {
          // Split segment text into words
          const rawWords = segment.text.split(/(\s+)/);

          const renderedWords = rawWords.map((part, partIdx) => {
            // If whitespace, render as real inline space
            if (/^\s+$/.test(part)) {
              return (
                <span key={`space-${segIdx}-${partIdx}`} className="ah-space">
                  {' '}
                </span>
              );
            }

            if (!part) return null;

            // Split word into individual letters
            const letters = Array.from(part).map((char, charIdx) => {
              const letterIdx = globalLetterIndex++;
              const entranceDelay = startDelay + letterIdx * 38;
              // Wave delay = entrance complete + letter index * 70ms
              const waveDelay = entranceDelay + 700 + letterIdx * 70;

              return (
                <span
                  key={`char-${segIdx}-${partIdx}-${charIdx}`}
                  className={`ah-letter-outer ${segment.colorClass || ''} ${
                    segment.hoverClass || 'ah-hover-purple'
                  }`}
                  style={{
                    '--ah-entrance-delay': `${entranceDelay}ms`,
                    ...segment.style,
                  }}
                >
                  <span
                    className="ah-letter-inner"
                    style={{
                      '--ah-wave-delay': `${waveDelay}ms`,
                    }}
                  >
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

          return (
            <React.Fragment key={`seg-${segIdx}`}>
              {renderedWords}
              {segment.breakAfter && <br className="ah-desktop-br" />}
            </React.Fragment>
          );
        })}
      </span>
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: `.ah-letter-outer { opacity: 1 !important; translate: none !important; }` }} />
      </noscript>
    </Tag>
  );
}
