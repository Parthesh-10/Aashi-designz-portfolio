'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Instrument_Serif } from 'next/font/google';
import AnimatedHeading, { type AnimatedHeadingSegment } from '@/components/AnimatedHeading';
import Reveal from '@/components/Reveal';
import type { CSSPropertiesWithVars } from '@/types/css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

export interface NormalizedStat {
  target: number;
  unit: string;
  unitClass?: string;
  colorClass?: string;
  label: string;
  captionLines: string[];
  delay?: number;
}

export interface RawStatInput {
  value?: string | number;
  label?: string | string[];
  captionLines?: string[];
  highlight?: boolean;
  target?: number;
  unit?: string;
  unitClass?: string;
  colorClass?: string;
  delay?: number;
}

export interface RawHeadlineToken {
  text: string;
  style?: 'serif' | 'italic' | string;
  highlight?: boolean;
  breakAfter?: boolean;
  fontClass?: string;
  colorClass?: string;
  hoverClass?: string;
}

function DesignStatCard({ stat, isTriggered }: { stat: NormalizedStat; isTriggered: boolean }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (numRef.current) numRef.current.textContent = String(stat.target);
      return;
    }

    if (!isTriggered || hasAnimatedRef.current) return;

    let rafId: number | undefined;
    const startTimer = setTimeout(() => {
      hasAnimatedRef.current = true;
      const startTime = performance.now();
      const duration = 1200;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeOut * stat.target);

        if (numRef.current) {
          numRef.current.textContent = String(currentVal);
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else if (numRef.current) {
          numRef.current.textContent = String(stat.target);
        }
      };

      rafId = requestAnimationFrame(animate);
    }, stat.delay || 0);

    return () => {
      clearTimeout(startTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isTriggered, stat.target, stat.delay]);

  return (
    <li
      className={`de-stat-card ${isTriggered ? 'is-in-view' : ''}`}
      style={{ transitionDelay: `${stat.delay || 0}ms` }}
    >
      <div className="de-stat-inner">
        <div className={`de-stat-num-row ${stat.colorClass || ''}`} aria-hidden="true">
          <span ref={numRef} className="de-stat-number">
            {isTriggered ? stat.target : 0}
          </span>
          <span className={`de-stat-unit ${stat.unitClass || ''}`}>{stat.unit}</span>
        </div>
        <span className="sr-only">{stat.label}</span>
        <div className="de-stat-label">
          {stat.captionLines.map((line, lIdx) => (
            <span key={lIdx} className="de-stat-label-line">
              {line}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export interface ServiceIntroProps {
  eyebrow?: string;
  headline?: Array<RawHeadlineToken | AnimatedHeadingSegment>;
  stats?: RawStatInput[];
  quote?: string;
  asBlock?: boolean;
  id?: string;
  className?: string;
}

export default function ServiceIntro({
  eyebrow,
  headline,
  stats = [],
  quote,
  asBlock = false,
  id,
  className = '',
}: ServiceIntroProps) {
  const statsRowRef = useRef<HTMLUListElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setStatsTriggered(true);
    }, 2500);

    const el = statsRowRef.current;
    if (!el) return () => clearTimeout(fallbackTimer);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsTriggered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  const normalizedHeadline = useMemo<AnimatedHeadingSegment[]>(() => {
    if (!headline || !Array.isArray(headline)) return [];
    return headline.map((seg) => {
      if (seg.fontClass !== undefined || seg.hoverClass !== undefined) {
        return {
          text: seg.text,
          fontClass: seg.fontClass,
          colorClass: seg.colorClass,
          hoverClass: seg.hoverClass,
          breakAfter: seg.breakAfter,
        };
      }

      const rawStyle = 'style' in seg ? seg.style : undefined;
      const isSerif = rawStyle === 'serif' || rawStyle === 'italic';
      return {
        text: seg.text,
        fontClass: isSerif ? 'edits-serif-accent' : '',
        colorClass: isSerif ? 'edits-why-h2-accent' : '',
        hoverClass: isSerif ? 'ah-hover-slate' : 'ah-hover-purple',
        breakAfter: Boolean(seg.breakAfter),
      };
    });
  }, [headline]);

  const normalizedStats = useMemo<NormalizedStat[]>(() => {
    if (!stats || !Array.isArray(stats)) return [];
    return stats.map((item, idx) => {
      if (item.target !== undefined) {
        return {
          target: item.target,
          unit: item.unit ?? '',
          unitClass: item.unitClass,
          colorClass: item.colorClass,
          label: typeof item.label === 'string' ? item.label : '',
          captionLines: item.captionLines ?? [],
          delay: item.delay,
        };
      }

      const valStr = String(item.value || '').trim();
      const numMatch = valStr.match(/^(\d+)/);
      const target = numMatch ? parseInt(numMatch[1], 10) : 0;
      const unit = valStr.replace(/^(\d+)\s*/, '');
      const unitClass = unit === 's' ? 'de-stat-unit-s' : '';
      const colorClass = item.highlight ? 'de-stat-purple' : '';

      let captionLines: string[] = [];
      if (Array.isArray(item.captionLines)) {
        captionLines = item.captionLines;
      } else if (Array.isArray(item.label)) {
        captionLines = item.label;
      } else if (typeof item.label === 'string') {
        captionLines = [item.label];
      }

      return {
        target,
        unit,
        unitClass,
        colorClass,
        label: `${valStr} ${Array.isArray(item.label) ? item.label.join(' ') : item.label || ''}`,
        captionLines,
        delay: item.delay !== undefined ? item.delay : idx * 160,
      };
    });
  }, [stats]);

  const content = (
    <div className="edits-de-block">
      <div className="edits-de-left">
        {eyebrow && (
          <Reveal delay={0}>
            <p className="edits-section-eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={120}>
          <AnimatedHeading
            as="h2"
            segments={normalizedHeadline}
            threshold={0.35}
            className="edits-de-heading"
          />
        </Reveal>
      </div>

      <div className="edits-de-right">
        <ul className="de-stats-row" ref={statsRowRef} role="list">
          {normalizedStats.map((stat, sIdx) => (
            <DesignStatCard
              key={`stat-${sIdx}`}
              stat={stat}
              isTriggered={statsTriggered}
            />
          ))}
        </ul>

        {quote && (
          <blockquote className={`de-quote ${statsTriggered ? 'is-in-view' : ''}`}>
            {quote}
          </blockquote>
        )}
      </div>
    </div>
  );

  if (asBlock) {
    return content;
  }

  const sectionStyle: CSSPropertiesWithVars = {
    '--font-instrument-serif': instrumentSerif.style.fontFamily,
  };

  return (
    <section
      id={id}
      className={`service-intro-section edits-showcase-section service-intro-standalone ${className}`}
      aria-label={eyebrow || 'Service Introduction'}
      style={sectionStyle}
    >
      <div className="service-intro-inner edits-showcase-inner">
        {content}
      </div>
    </section>
  );
}
