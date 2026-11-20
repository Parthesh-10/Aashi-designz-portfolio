'use client';
import { useEffect } from 'react';
import './HeroBanner.css';

const HI_TEXT = "Hi! I'm Aashi";

function buildLetters() {
  return HI_TEXT.split('').map((ch, i) => ({ ch, i }));
}

const LETTERS = buildLetters();

function SparkleSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sparkle-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#AD89E8" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#CDBCF5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#AD89E8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sp-glow)" />
      <path
        d="M 50 2 Q 50 48 2 50 Q 50 52 50 98 Q 50 52 98 50 Q 50 48 50 2 Z"
        fill="#CDBCF5"
      />
      <polygon points="50,38 54,50 50,62 46,50" fill="#FFFFFF" />
      <polygon points="38,50 50,46 62,50 50,54" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
    </svg>
  );
}

export default function HeroBanner() {
  useEffect(() => {
    function updateHeroAlign() {
      if (typeof window === 'undefined') return;
      const heroContainer = document.querySelector('.header.container');
      if (!heroContainer) return;

      if (window.innerWidth < 768) {
        heroContainer.style.removeProperty('--hero-left-align');
        heroContainer.style.removeProperty('--hero-right-align');
        return;
      }

      const bannerWrap = document.querySelector('.banner-wrap');
      const textEl = document.querySelector('.hi-aashi-text');
      if (!bannerWrap || !textEl) return;

      const masks = textEl.querySelectorAll('.hi-letter-mask');
      if (masks.length === 0) return;

      const firstLetter = masks[0];
      const lastLetter = masks[masks.length - 1];

      const wrapRect = bannerWrap.getBoundingClientRect();
      const firstRect = firstLetter.getBoundingClientRect();
      const lastRect = lastLetter.getBoundingClientRect();

      const leftOffset = Math.max(0, firstRect.left - wrapRect.left);
      const rightOffset = Math.max(0, wrapRect.right - lastRect.right);

      heroContainer.style.setProperty('--hero-left-align', `${leftOffset.toFixed(2)}px`);
      heroContainer.style.setProperty('--hero-right-align', `${rightOffset.toFixed(2)}px`);
    }

    updateHeroAlign();

    const bannerWrap = document.querySelector('.banner-wrap');
    let ro;
    if (typeof ResizeObserver !== 'undefined' && bannerWrap) {
      ro = new ResizeObserver(updateHeroAlign);
      ro.observe(bannerWrap);
    }
    window.addEventListener('resize', updateHeroAlign);

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateHeroAlign).catch(() => {});
    }

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateHeroAlign);
    };
  }, []);

  return (
    <div className="banner-wrap">
      {/* Top Left Label */}
      <div className="banner-label-left" aria-hidden="true">
        /UI UX Designer/
      </div>

      {/* Top Right Label */}
      <div className="banner-label-right" aria-hidden="true">
        /Brand Strategist/
      </div>

      {/* Centered "Hi! I'm Aashi" with per-letter masked wrappers */}
      <p
        className="hi-aashi-text"
        aria-label="Hi! I'm Aashi"
      >
        {LETTERS.map(({ ch, i }) => {
          if (ch === ' ') {
            return (
              <span key={i} className="hi-space" aria-hidden="true">
                &nbsp;
              </span>
            );
          }
          return (
            <span
              key={i}
              className="hi-letter-mask"
              aria-hidden="true"
            >
              <span className="hi-phantom" aria-hidden="true">
                {ch}
              </span>
              <span className="hi-letter">
                {ch}
              </span>
            </span>
          );
        })}
      </p>

      {/* 4 Sparkles */}
      <div className="banner-sparkles" aria-hidden="true">
        <span className="banner-sparkle sp-1">
          <SparkleSvg />
        </span>
        <span className="banner-sparkle sp-2">
          <SparkleSvg />
        </span>
        <span className="banner-sparkle sp-3">
          <SparkleSvg />
        </span>
        <span className="banner-sparkle sp-4">
          <SparkleSvg />
        </span>
      </div>
    </div>
  );
}

export { HeroBanner };
