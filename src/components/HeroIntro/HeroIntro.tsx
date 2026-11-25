'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const STRING_THICKNESS_BASE = 2.5;
const STRING_THICKNESS_ADD = 10;
const STRING_THICKNESS = STRING_THICKNESS_BASE + STRING_THICKNESS_ADD;

const DOT_SIZE_BASE = 8;
const DOT_SIZE_ADD = 10;
const DOT_SIZE = DOT_SIZE_BASE + DOT_SIZE_ADD;

const STRING_AMP_1_REF = 70;
const STRING_AMP_2_REF = 28;
const AMP_REF_DIM = 900;
const F1_HZ = 6.5;
const F2_HZ = 13.0;
const TAU_SEC = 0.28;

const DOT_DROP_MS = 450;
const DOT_HOLD_MS = 50;
const LINE_STRETCH_MS = 220;
const HOLD_BEFORE_PLUCK_MS = 30;
const STRETCH_START_MS = DOT_DROP_MS + DOT_HOLD_MS;
const PLUCK_START_MS = STRETCH_START_MS + LINE_STRETCH_MS + HOLD_BEFORE_PLUCK_MS;

const REVEAL_AT_MS = Math.round((9 / (4 * F1_HZ)) * 1000);
const EXPAND_MS = 200;
const FADE_TRIGGER_MS = 140;
const FADE_MS = 240;

function evaluateCubicBezier(p: number, x1: number, y1: number, x2: number, y2: number): number {
  let t = p;
  for (let i = 0; i < 5; i++) {
    const currentSlope =
      3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2);
    if (Math.abs(currentSlope) < 1e-6) break;
    const currentX =
      3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t - p;
    t -= currentX / currentSlope;
  }
  t = Math.max(0, Math.min(1, t));
  return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
}

let introHasPlayed = false;

export default function HeroIntro() {
  const [mounted, setMounted] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const ghost1Ref = useRef<SVGPathElement>(null);
  const ghost2Ref = useRef<SVGPathElement>(null);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const rafRef = useRef<number | null>(null);

  const addTimeout = useCallback((fn: () => void, delay: number) => {
    const tid = setTimeout(fn, delay);
    timeoutsRef.current.push(tid);
    return tid;
  }, []);

  const revealAll = useCallback(() => {
    document.body.classList.remove('intro-scroll-lock');
    const heroWrapper = document.querySelector<HTMLElement>('.header.container');
    if (heroWrapper) heroWrapper.dataset.intro = 'done';

    const bannerImg = document.querySelector<HTMLElement>('.banner-bg-img');
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

  const triggerBannerReveal = useCallback(() => {
    const bannerImg = document.querySelector('.banner-bg-img');
    if (bannerImg) {
      bannerImg.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 700, fill: 'forwards', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }

    addTimeout(() => {
      const left = document.querySelector('.banner-label-left');
      const right = document.querySelector('.banner-label-right');
      if (left) left.classList.add('intro-reveal-label');
      if (right) right.classList.add('intro-reveal-label');
    }, 100);

    addTimeout(() => {
      const letters = document.querySelectorAll('.hi-letter');
      letters.forEach((span, idx) => {
        addTimeout(() => {
          span.classList.add('intro-reveal-letter');
        }, idx * 45);
      });
    }, 150);

    addTimeout(() => {
      const sparkles = document.querySelectorAll('.banner-sparkle');
      sparkles.forEach((s, idx) => {
        addTimeout(() => {
          s.classList.add('intro-reveal-sparkle');
          addTimeout(() => s.classList.add('twinkle'), 450 + idx * 100);
        }, idx * 100);
      });
    }, 350);

    addTimeout(() => {
      const pill = document.querySelector('.headerContainer1 .dotContainer');
      if (pill) pill.classList.add('intro-revealed');
    }, 450);
  }, [addTimeout]);

  const triggerSectionC = useCallback(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.add('intro-revealed');

    const headingLines = document.querySelectorAll('.heroHeadingInner');
    headingLines.forEach((line, idx) => {
      addTimeout(() => {
        line.classList.add('intro-revealed');
      }, idx * 90);
    });

    addTimeout(() => {
      const portrait = document.querySelector('.desktopHeroPortrait');
      if (portrait) portrait.classList.add('intro-revealed');
    }, 200);

    addTimeout(() => {
      const desc = document.querySelector('.headerContainer2 p');
      if (desc) desc.classList.add('intro-revealed');
    }, 250);

    addTimeout(() => {
      const btn = document.querySelector('.headerContainer2 .contact');
      if (btn) btn.classList.add('intro-revealed');
    }, 400);
  }, [addTimeout]);

  useEffect(() => {
    if (typeof Image !== 'undefined') {
      const img = new Image();
      img.src = '/img/hero-portrait.png';
      if (img.decode) {
        img.decode().catch(() => {});
      }
    }
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.catch(() => {});
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || introHasPlayed) {
      introHasPlayed = true;
      if (reducedMotion) {
        const t1 = setTimeout(() => {
          revealAll();
          if (overlayRef.current) {
            overlayRef.current.style.transition = 'opacity 200ms ease-out';
            overlayRef.current.style.opacity = '0';
          }
          const t2 = setTimeout(() => setMounted(false), 200);
          timeoutsRef.current.push(t2);
        }, 200);
        timeoutsRef.current.push(t1);
        return () => {
          timeoutsRef.current.forEach(clearTimeout);
        };
      }
      revealAll();
      const tid = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(tid);
    }

    introHasPlayed = true;
    document.body.classList.add('intro-scroll-lock');

    let W = window.innerWidth;
    let H = window.innerHeight;

    if (svgRef.current) {
      svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`);
    }

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      if (svgRef.current) {
        svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`);
      }
    };
    window.addEventListener('resize', onResize);

    const f1 = F1_HZ;
    const f2 = F2_HZ;
    const tau = TAU_SEC;
    const scale = Math.max(0.32, Math.min(1.2, Math.pow(Math.min(W, H) / AMP_REF_DIM, 1.25)));
    const A1 = STRING_AMP_1_REF * scale;
    const A2 = STRING_AMP_2_REF * scale;

    const computePathD = (tVal: number): string => {
      const yMid = H / 2;
      const xStart = -2;
      const xEnd = W + 2;
      const span = xEnd - xStart;

      if (tVal < 0) {
        return `M ${xStart.toFixed(1)} ${yMid.toFixed(1)} L ${xEnd.toFixed(1)} ${yMid.toFixed(1)}`;
      }
      const decay = Math.exp(-tVal / tau);
      const onset = Math.min(1, tVal / 0.03);
      const cos1 = Math.cos(2 * Math.PI * f1 * tVal);
      const cos2 = Math.cos(2 * Math.PI * f2 * tVal);
      const amp1 = A1 * decay * cos1 * onset;
      const amp2 = A2 * decay * cos2 * onset;

      const maxDisp = Math.max(10, H / 2 - (STRING_THICKNESS / 2 + 4));

      const pointsCount = 64;
      let d = `M ${xStart.toFixed(1)} ${yMid.toFixed(1)}`;
      for (let i = 1; i <= pointsCount; i++) {
        const frac = i / pointsCount;
        const x = xStart + frac * span;
        const sin1 = Math.sin(Math.PI * frac);
        const sin2 = Math.sin(2 * Math.PI * frac);
        const rawDisp = amp1 * sin1 + amp2 * sin2;
        const clampedDisp = Math.max(-maxDisp, Math.min(maxDisp, rawDisp));
        const y = yMid + clampedDisp;
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      return d;
    };

    if (dotRef.current) {
      dotRef.current.style.opacity = '1';
      void dotRef.current.offsetHeight;
      dotRef.current.style.transition = `transform ${DOT_DROP_MS}ms cubic-bezier(0.5, 0, 0.2, 1), box-shadow ${DOT_DROP_MS}ms cubic-bezier(0.5, 0, 0.2, 1)`;
      dotRef.current.style.transform = 'translateY(0)';
      dotRef.current.style.boxShadow = '0 0 0px rgba(147, 117, 215, 0)';
    }

    if (trailRef.current) {
      trailRef.current.style.animation = `introTrailDrop ${DOT_DROP_MS}ms linear forwards`;
    }

    addTimeout(() => {
      if (dotRef.current) {
        dotRef.current.style.transition = 'opacity 60ms ease-out';
        dotRef.current.style.opacity = '0';
      }
      if (lineRef.current) {
        lineRef.current.style.opacity = '1';
        lineRef.current.style.transition = `transform ${LINE_STRETCH_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
        lineRef.current.style.transform = 'scaleX(1)';
      }
    }, STRETCH_START_MS);

    addTimeout(() => {
      if (lineRef.current) lineRef.current.style.display = 'none';
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (svgRef.current) svgRef.current.style.display = 'block';

      let lastTime = performance.now();
      let elapsed = 0;
      let fadeTriggered = false;
      let svgHidden = false;

      const stepString = (now: number) => {
        if (document.hidden) {
          lastTime = now;
          rafRef.current = requestAnimationFrame(stepString);
          return;
        }
        const delta = (now - lastTime) / 1000;
        lastTime = now;
        elapsed += Math.min(delta, 0.05);

        if (!svgHidden) {
          const dMain = computePathD(elapsed);
          if (mainPathRef.current) mainPathRef.current.setAttribute('d', dMain);

          const dG1 = computePathD(elapsed - 0.012);
          if (ghost1Ref.current) ghost1Ref.current.setAttribute('d', dG1);

          const dG2 = computePathD(elapsed - 0.024);
          if (ghost2Ref.current) ghost2Ref.current.setAttribute('d', dG2);
        }

        const revealAtSec = REVEAL_AT_MS / 1000;
        const expandSec = EXPAND_MS / 1000;

        if (elapsed >= revealAtSec && burstRef.current) {
          const progress = Math.min(1, (elapsed - revealAtSec) / expandSec);
          const eased = evaluateCubicBezier(progress, 0.83, 0, 0.17, 1);
          const startScale = Math.max(0.005, STRING_THICKNESS / H);
          const currentScaleY = startScale + (1.02 - startScale) * eased;

          burstRef.current.style.transform = `scaleY(${currentScaleY.toFixed(5)})`;

          if (!svgHidden && currentScaleY * (H / 2) > 120) {
            svgHidden = true;
            if (svgRef.current) svgRef.current.style.display = 'none';
          }
        }

        const fadeStartSec = (REVEAL_AT_MS + FADE_TRIGGER_MS) / 1000;
        if (elapsed >= fadeStartSec && !fadeTriggered) {
          fadeTriggered = true;

          document.body.classList.remove('intro-scroll-lock');
          const heroWrapper = document.querySelector<HTMLElement>('.header.container');
          if (heroWrapper) heroWrapper.dataset.intro = 'done';
          triggerBannerReveal();
          triggerSectionC();

          if (overlayRef.current) {
            overlayRef.current.style.transition = `opacity ${FADE_MS}ms ease-out`;
            overlayRef.current.style.opacity = '0';
            overlayRef.current.style.pointerEvents = 'none';
          }

          addTimeout(() => {
            setMounted(false);
          }, FADE_MS);
        }

        const totalDurationSec = (REVEAL_AT_MS + FADE_TRIGGER_MS + FADE_MS) / 1000;
        if (elapsed >= totalDurationSec + 0.05) {
          return;
        }

        rafRef.current = requestAnimationFrame(stepString);
      };

      rafRef.current = requestAnimationFrame(stepString);
    }, PLUCK_START_MS);

    const failsafe = setTimeout(() => {
      revealAll();
      setMounted(false);
    }, 3500);

    const timeouts = timeoutsRef.current;
    return () => {
      clearTimeout(failsafe);
      timeouts.forEach(clearTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
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
        <div
          id="intro-dot"
          ref={dotRef}
          style={{
            width: `${DOT_SIZE}px`,
            height: `${DOT_SIZE}px`,
            marginTop: `-${DOT_SIZE / 2}px`,
            marginLeft: `-${DOT_SIZE / 2}px`,
          }}
        >
          <div id="intro-dot-trail" ref={trailRef} />
          <div id="intro-dot-circle" />
        </div>
        <div
          id="intro-line"
          ref={lineRef}
          style={{
            height: `${STRING_THICKNESS}px`,
            marginTop: `-${STRING_THICKNESS / 2}px`,
          }}
        />
        <div id="intro-expand-burst" ref={burstRef} />
        <svg
          id="intro-string-svg"
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'none' }}
        >
          <path
            ref={ghost2Ref}
            className="intro-ghost-path intro-ghost-2"
            style={{ strokeWidth: `${STRING_THICKNESS}px` }}
          />
          <path
            ref={ghost1Ref}
            className="intro-ghost-path intro-ghost-1"
            style={{ strokeWidth: `${STRING_THICKNESS}px` }}
          />
          <path
            ref={mainPathRef}
            className="intro-main-path"
            style={{ strokeWidth: `${STRING_THICKNESS}px` }}
          />
        </svg>
      </div>
    </>
  );
}

export { HeroIntro };
