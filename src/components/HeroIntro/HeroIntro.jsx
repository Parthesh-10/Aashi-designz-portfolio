'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import './HeroIntro.css';

// Module-level flag: persists across React StrictMode double-mounts in dev
// and across client-side router navigation back to home page
let introHasPlayed = false;

export default function HeroIntro() {
  const [mounted, setMounted] = useState(true);
  const overlayRef       = useRef(null);
  const curtainTopRef    = useRef(null);
  const curtainBottomRef = useRef(null);
  const timeoutsRef      = useRef([]);

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

    const portrait = document.querySelector('.desktopHeroPortrait');
    if (portrait) portrait.classList.add('intro-revealed');
  }, []);

  // Banner elements entrance during split
  const triggerBannerReveal = useCallback(() => {
    // (a) Background image fade in (700ms) with pure opacity (no heavy blur)
    const bannerImg = document.querySelector('.banner-bg-img');
    if (bannerImg) {
      bannerImg.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 700, fill: 'forwards', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }

    // (b) Left and Right labels slide in (700ms)
    addTimeout(() => {
      const left  = document.querySelector('.banner-label-left');
      const right = document.querySelector('.banner-label-right');
      if (left)  left.classList.add('intro-reveal-label');
      if (right) right.classList.add('intro-reveal-label');
    }, 100);

    // (c) Centered "Hi! I'm aashi" masked per-letter reveal (stagger 45ms)
    addTimeout(() => {
      const letters = document.querySelectorAll('.hi-letter');
      letters.forEach((span, idx) => {
        addTimeout(() => {
          span.classList.add('intro-reveal-letter');
        }, idx * 45);
      });
    }, 150);

    // (d) Sparkles pop in (stagger 100ms) then twinkle
    addTimeout(() => {
      const sparkles = document.querySelectorAll('.banner-sparkle');
      sparkles.forEach((s, idx) => {
        addTimeout(() => {
          s.classList.add('intro-reveal-sparkle');
          addTimeout(() => s.classList.add('twinkle'), 450 + idx * 100);
        }, idx * 100);
      });
    }, 350);

    // (e) Lavender pill pops in
    addTimeout(() => {
      const pill = document.querySelector('.headerContainer1 .dotContainer');
      if (pill) pill.classList.add('intro-revealed');
    }, 450);
  }, [addTimeout]);

  // Section C entrance (Navbar, Heading lines, Portrait, Description, Contact button)
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

    // Portrait: fade + translateY (+200ms)
    addTimeout(() => {
      const portrait = document.querySelector('.desktopHeroPortrait');
      if (portrait) portrait.classList.add('intro-revealed');
    }, 200);

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

    // 1100ms: Split curtains start sliding apart (after 0.3s hold + 0.6s line draw + 0.2s pause)
    addTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.classList.add('intro-split');
      }
    }, 1100);

    // 1550ms: Banner reveals cleanly while curtains are opening
    addTimeout(() => {
      triggerBannerReveal();
    }, 1550);

    // 2000ms: Split transition finished, release will-change GPU layer
    addTimeout(() => {
      if (curtainTopRef.current) curtainTopRef.current.style.willChange = 'auto';
      if (curtainBottomRef.current) curtainBottomRef.current.style.willChange = 'auto';
    }, 2000);

    // 2050ms: Scroll unlocks, hero intro state marked done, Section C enters
    addTimeout(() => {
      document.body.classList.remove('intro-scroll-lock');
      if (heroWrapper) heroWrapper.dataset.intro = 'done';
      triggerSectionC();
    }, 2050);

    // 2150ms: Completely unmount overlay from DOM (0 memory, 0 composite layers)
    addTimeout(() => {
      setMounted(false);
    }, 2150);

    // Failsafe timeout at 5000ms guarantees everything is revealed and overlay removed
    const failsafe = setTimeout(() => {
      revealAll();
      setMounted(false);
    }, 5000);

    const timeouts = timeoutsRef.current;
    return () => {
      clearTimeout(failsafe);
      timeouts.forEach(clearTimeout);
      document.body.classList.remove('intro-scroll-lock');
    };
  }, [addTimeout, revealAll, triggerBannerReveal, triggerSectionC]);

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
              .header.container[data-intro="playing"] .desktopHeroPortrait,
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
        <div id="intro-curtain-top" ref={curtainTopRef} />
        <div id="intro-curtain-bottom" ref={curtainBottomRef} />
        <div id="intro-pixel-line" />
        <div id="intro-pixel-spark" />
      </div>
    </>
  );
}

export { HeroIntro };
