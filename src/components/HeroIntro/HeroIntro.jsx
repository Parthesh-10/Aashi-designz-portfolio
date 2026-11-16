'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import './HeroIntro.css';

// Module-level flag: persists across React StrictMode double-mounts in dev
// and across client-side router navigation back to home page
let introHasPlayed = false;

const LABEL_FULL   = 'aashi // brand & digital designer — 2026';
const LABEL_MOBILE = 'aashi // 2026';
const CHAR_DELAY   = 24; // ms per character

export default function HeroIntro() {
  const [mounted, setMounted] = useState(true);
  const overlayRef   = useRef(null);
  const morphRef     = useRef(null);
  const labelRowRef  = useRef(null);
  const labelTextRef = useRef(null);
  const rafRef       = useRef(null);
  const timeoutsRef  = useRef([]);

  const addTimeout = useCallback((fn, delay) => {
    const tid = setTimeout(fn, delay);
    timeoutsRef.current.push(tid);
    return tid;
  }, []);

  // Reveal all hero elements immediately (used by reduced-motion, navigation-back, and failsafe)
  const revealAll = useCallback(() => {
    document.body.classList.remove('intro-scroll-lock');
    const heroWrapper = document.querySelector('.header.container');
    if (heroWrapper) heroWrapper.dataset.intro = 'done';

    const bannerImg = document.querySelector('.banner-bg-img');
    if (bannerImg) bannerImg.style.opacity = '1';

    const left = document.querySelector('.banner-label-left');
    if (left) left.classList.add('intro-reveal-label');

    const right = document.querySelector('.banner-label-right');
    if (right) right.classList.add('intro-reveal-label');

    document.querySelectorAll('.hi-letter').forEach((el) => {
      el.classList.add('intro-reveal-letter');
    });

    document.querySelectorAll('.banner-sparkle').forEach((el) => {
      el.classList.add('intro-reveal-sparkle', 'twinkle');
    });

    const pill = document.querySelector('.headerContainer1 .dotContainer');
    if (pill) pill.classList.add('intro-revealed');

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.add('intro-revealed');

    document.querySelectorAll('.heroHeadingInner').forEach((el) => {
      el.classList.add('intro-revealed');
    });

    const desc = document.querySelector('.headerContainer2 p');
    if (desc) desc.classList.add('intro-revealed');

    const btn = document.querySelector('.headerContainer2 .contact');
    if (btn) btn.classList.add('intro-revealed');
  }, []);

  // Typewriter effect under center dot
  const startTypewriter = useCallback(() => {
    const labelRow  = labelRowRef.current;
    const labelText = labelTextRef.current;
    if (!labelRow || !labelText) return;

    const label = window.innerWidth < 480 ? LABEL_MOBILE : LABEL_FULL;
    labelRow.style.opacity = '1';
    labelText.textContent  = '';
    let i = 0;

    function typeChar() {
      if (!labelRowRef.current || labelRowRef.current.style.opacity !== '1') return;
      if (i <= label.length) {
        labelText.textContent = label.slice(0, i);
        i++;
        addTimeout(typeChar, CHAR_DELAY);
      }
    }
    typeChar();
  }, [addTimeout]);

  const hideTypewriter = useCallback(() => {
    const labelRow = labelRowRef.current;
    if (labelRow) {
      labelRow.style.opacity = '0';
      labelRow.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 200, fill: 'forwards' }
      );
    }
  }, []);

  // Banner elements sequence (2500 - 3300ms)
  const triggerBannerReveal = useCallback((t0) => {
    const now = performance.now();

    // (a) 2500ms: Blurred background image fade in (900ms)
    const bgDelay = Math.max(0, 2500 - (now - t0));
    addTimeout(() => {
      const bannerImg = document.querySelector('.banner-bg-img');
      if (bannerImg) {
        bannerImg.animate(
          [
            { opacity: 0, filter: 'blur(30px)', transform: 'scale(1.06)' },
            { opacity: 1, filter: 'blur(0px)',  transform: 'scale(1)'    },
          ],
          { duration: 900, fill: 'forwards', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
      }
    }, bgDelay);

    // (b) 2600ms: Left and Right labels slide in (700ms)
    const labelDelay = Math.max(0, 2600 - (now - t0));
    addTimeout(() => {
      const left  = document.querySelector('.banner-label-left');
      const right = document.querySelector('.banner-label-right');
      if (left)  left.classList.add('intro-reveal-label');
      if (right) right.classList.add('intro-reveal-label');
    }, labelDelay);

    // (c) 2650ms: Centered "Hi! I'm aashi" masked per-letter reveal (stagger 55ms, duration 800ms)
    const hiDelay = Math.max(0, 2650 - (now - t0));
    addTimeout(() => {
      const letters = document.querySelectorAll('.hi-letter');
      letters.forEach((span, idx) => {
        addTimeout(() => {
          span.classList.add('intro-reveal-letter');
        }, idx * 55);
      });
    }, hiDelay);

    // (d) 2900ms: Sparkles pop in (stagger 120ms) then twinkle
    const sparkDelay = Math.max(0, 2900 - (now - t0));
    addTimeout(() => {
      const sparkles = document.querySelectorAll('.banner-sparkle');
      sparkles.forEach((s, idx) => {
        addTimeout(() => {
          s.classList.add('intro-reveal-sparkle');
          addTimeout(() => s.classList.add('twinkle'), 500 + idx * 120);
        }, idx * 120);
      });
    }, sparkDelay);

    // (e) 3100ms: Lavender pill pops in (scale .85 -> 1)
    const pillDelay = Math.max(0, 3100 - (now - t0));
    addTimeout(() => {
      const pill = document.querySelector('.headerContainer1 .dotContainer');
      if (pill) pill.classList.add('intro-revealed');
    }, pillDelay);
  }, [addTimeout]);

  // Section C entrance at 4000ms
  const triggerSectionC = useCallback(() => {
    // Header navbar: translateY -16px -> 0 + fade
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.add('intro-revealed');

    // Heading "Brand & Digital Experience Designer": line-by-line slide-up (stagger 90ms)
    const headingLines = document.querySelectorAll('.heroHeadingInner');
    headingLines.forEach((line, idx) => {
      addTimeout(() => {
        line.classList.add('intro-revealed');
      }, idx * 90);
    });

    // Description: fade + translateY 16px -> 0 (+250ms)
    addTimeout(() => {
      const desc = document.querySelector('.headerContainer2 p');
      if (desc) desc.classList.add('intro-revealed');
    }, 250);

    // "Work With Me" button: scale .92 -> 1 + fade (+400ms)
    addTimeout(() => {
      const btn = document.querySelector('.headerContainer2 .contact');
      if (btn) btn.classList.add('intro-revealed');
    }, 400);
  }, [addTimeout]);

  // Master Clock & Lifecycle
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if intro has already run on this full page load or user prefers reduced motion
    if (reducedMotion || introHasPlayed) {
      introHasPlayed = true;
      revealAll();
      const tid = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(tid);
    }

    introHasPlayed = true;
    document.body.classList.add('intro-scroll-lock');

    const heroWrapper = document.querySelector('.header.container');
    const morph = morphRef.current;
    if (morph) {
      morph.style.willChange = 'transform, opacity, border-radius, background, box-shadow, filter';
    }

    let p_sliverStarted = false;
    let p_dotStarted    = false;
    let p_typeStarted   = false;
    let p_lineStarted   = false;
    let p_barStarted    = false;
    let p_floodStarted  = false;
    let p_overlayFade   = false;
    let p_bannerReveal  = false;
    let p_introDone     = false;

    const t0 = performance.now();

    function tick(now) {
      const t = now - t0;

      // 0–300ms: sliver appears at center
      if (!p_sliverStarted && t >= 0) {
        p_sliverStarted = true;
        if (morph) {
          morph.animate(
            [
              { opacity: 0, transform: 'translateY(-28vh) scaleY(1)' },
              { opacity: 1, transform: 'translateY(-28vh) scaleY(1)' },
            ],
            { duration: 100, fill: 'forwards', easing: 'ease-out' }
          );
        }
      }

      // 300–800ms: stretch vertically (scaleY ~4), drop to center, squash to 10px round dot
      if (!p_dotStarted && t >= 300) {
        p_dotStarted = true;
        if (morph) {
          morph.animate(
            [
              { transform: 'translateY(-28vh) scaleY(1)',   borderRadius: '3px',  opacity: 1 },
              { transform: 'translateY(-8vh)  scaleY(4)',   borderRadius: '3px',  opacity: 1, offset: 0.4 },
              { transform: 'translateY(0)     scaleY(4)',   borderRadius: '3px',  opacity: 1, offset: 0.7 },
              { transform: 'translateY(0)     scaleY(0.8)', borderRadius: '50%',  opacity: 1, offset: 0.85 },
              { transform: 'translateY(0)     scaleY(1)',   borderRadius: '50%',  opacity: 1 },
            ],
            { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          );
        }
      }

      // 700–1400ms: Typewriter label under dot
      if (!p_typeStarted && t >= 700) {
        p_typeStarted = true;
        startTypewriter();
      }

      // 1400–1900ms: Dot becomes horizontal line (scaleX 0->1 across viewport)
      if (!p_lineStarted && t >= 1400) {
        p_lineStarted = true;
        hideTypewriter();
        if (morph) {
          const vwScale = Math.ceil(window.innerWidth / 3);
          morph.animate(
            [
              {
                transform:   'scaleX(0) scaleY(2)',
                borderRadius:'50%',
                background:  '#AD89E8',
                filter:      'blur(0px)',
                boxShadow:   '0 0 14px 4px rgba(173, 137, 232, 0.7)',
              },
              {
                transform:   `scaleX(${vwScale}) scaleY(2)`,
                borderRadius:'1px',
                background:  'linear-gradient(to right, transparent, #AD89E8, #F2EFFC, #AD89E8, transparent)',
                filter:      'blur(1px)',
                boxShadow:   '0 0 24px 6px rgba(173, 137, 232, 0.5)',
              },
            ],
            { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          );
        }
      }

      // 1900–2300ms: Line thickens into light bar (~80px height), heats up
      if (!p_barStarted && t >= 1900) {
        p_barStarted = true;
        if (morph) {
          const vwScale = Math.ceil(window.innerWidth / 3);
          morph.animate(
            [
              {
                transform:  `scaleX(${vwScale}) scaleY(2)`,
                filter:     'blur(0px)',
                background: 'linear-gradient(to right, transparent, #AD89E8, #F2EFFC, #AD89E8, transparent)',
              },
              {
                transform:  `scaleX(${vwScale}) scaleY(28)`,
                filter:     'blur(10px)',
                background: 'linear-gradient(to right, #E5DBF6, #FFFFFF, #E5DBF6)',
              },
            ],
            { duration: 400, fill: 'forwards', easing: 'ease-in' }
          );
        }
      }

      // 2300–2700ms: Bar floods viewport (full flash #F2EFFC then #FFFFFF)
      if (!p_floodStarted && t >= 2300) {
        p_floodStarted = true;
        if (morph) {
          const vwScale   = Math.ceil(window.innerWidth / 3);
          const fillScale = Math.ceil(window.innerHeight / 12) + 12;
          morph.animate(
            [
              { transform: `scaleX(${vwScale}) scaleY(28)`,         filter: 'blur(10px)', background: '#F2EFFC' },
              { transform: `scaleX(${vwScale}) scaleY(${fillScale})`, filter: 'blur(20px)', background: '#FFFFFF' },
            ],
            { duration: 400, fill: 'forwards', easing: 'ease-in' }
          );
        }
      }

      // 2500–3000ms: Overlay fades out (opacity 1->0, 500ms), unmounted after
      if (!p_overlayFade && t >= 2500) {
        p_overlayFade = true;
        const overlay = overlayRef.current;
        if (overlay) {
          overlay.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 500, fill: 'forwards', easing: 'ease-out' }
          );
          addTimeout(() => setMounted(false), 510);
        }
        if (morph) morph.style.willChange = 'auto';
      }

      // 2500–3300ms: Banner reveals
      if (!p_bannerReveal && t >= 2500) {
        p_bannerReveal = true;
        triggerBannerReveal(t0);
      }

      // 4000ms: Master clock completes, scroll unlocks, Section C begins
      if (!p_introDone && t >= 4000) {
        p_introDone = true;
        document.body.classList.remove('intro-scroll-lock');
        if (heroWrapper) heroWrapper.dataset.intro = 'done';
        triggerSectionC();
        return; // Stop animation loop
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    // Failsafe timeout at 6000ms reveals everything and unmounts overlay
    const failsafe = setTimeout(() => {
      revealAll();
      setMounted(false);
    }, 6000);

    const timeouts = timeoutsRef.current;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(failsafe);
      timeouts.forEach(clearTimeout);
      document.body.classList.remove('intro-scroll-lock');
    };
  }, [addTimeout, revealAll, startTypewriter, hideTypewriter, triggerBannerReveal, triggerSectionC]);

  if (!mounted) return null;

  return (
    <>
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #hero-intro-overlay { display: none !important; }
              .header.container[data-intro="playing"] .banner-bg-img,
              .header.container[data-intro="playing"] .banner-label-left,
              .header.container[data-intro="playing"] .banner-label-right,
              .header.container[data-intro="playing"] .hi-aashi-text,
              .header.container[data-intro="playing"] .hi-letter,
              .header.container[data-intro="playing"] .banner-sparkles,
              .header.container[data-intro="playing"] .banner-sparkle,
              .header.container[data-intro="playing"] .headerContainer1,
              .header.container[data-intro="playing"] .headerContainer2,
              .header.container[data-intro="playing"] .headerContainer1 .dotContainer,
              .header.container[data-intro="playing"] .heroHeadingInner,
              body.intro-scroll-lock .navbar {
                opacity: 1 !important;
                transform: none !important;
                filter: none !important;
              }
            `,
          }}
        />
      </noscript>

      <div id="hero-intro-overlay" ref={overlayRef} aria-hidden="true">
        <div id="intro-morph" ref={morphRef} />
        <div id="intro-label-row" ref={labelRowRef}>
          <div id="intro-label-logo" aria-hidden="true" />
          <span id="intro-label-text" ref={labelTextRef} />
          <span id="intro-label-caret" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}

export { HeroIntro };

