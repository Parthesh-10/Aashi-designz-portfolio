'use client';

import React, { useRef, useState, useEffect } from 'react';
import type { CSSPropertiesWithVars } from '@/types/css';

export type RevealTag = 'div' | 'section' | 'li' | 'span';

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  as?: RevealTag;
  className?: string;
  style?: CSSPropertiesWithVars;
}

export default function Reveal({
  children,
  delay = 0,
  duration,
  as: Component = 'div',
  className = '',
  style: propStyle,
}: RevealProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not supported, show immediately via callback
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    // If reduced motion is requested, show immediately with no transition
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const node: HTMLElement | null =
      divRef.current || sectionRef.current || liRef.current || spanRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const combinedStyle: CSSPropertiesWithVars = {
    '--reveal-delay': `${delay}ms`,
    ...(duration !== undefined ? { '--reveal-duration': `${duration}ms` } : {}),
    ...propStyle,
  };

  const combinedClassName = `reveal-float ${className}`.trim();
  const visibleAttr = isVisible ? 'true' : undefined;

  if (Component === 'section') {
    return (
      <section
        ref={sectionRef}
        data-visible={visibleAttr}
        className={combinedClassName}
        style={combinedStyle}
      >
        {children}
      </section>
    );
  }

  if (Component === 'li') {
    return (
      <li
        ref={liRef}
        data-visible={visibleAttr}
        className={combinedClassName}
        style={combinedStyle}
      >
        {children}
      </li>
    );
  }

  if (Component === 'span') {
    return (
      <span
        ref={spanRef}
        data-visible={visibleAttr}
        className={combinedClassName}
        style={combinedStyle}
      >
        {children}
      </span>
    );
  }

  return (
    <div
      ref={divRef}
      data-visible={visibleAttr}
      className={combinedClassName}
      style={combinedStyle}
    >
      {children}
    </div>
  );
}
