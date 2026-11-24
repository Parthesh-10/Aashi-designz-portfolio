'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

let globalLenisInstance = null;

export const getLenis = () => globalLenisInstance;

export const scrollTo = (target, options = {}) => {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, options);
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: options.immediate ? 'auto' : 'smooth',
      });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({
        behavior: options.immediate ? 'auto' : 'smooth',
      });
    }
  }
};

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Respect user reduced-motion preference (native scrolling)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return undefined;

    // Desktop only: let native touch scrolling on phones stay native
    const isTouchOnly = window.matchMedia(
      '(hover: none) and (pointer: coarse)'
    ).matches;
    if (isTouchOnly) return undefined;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Pause Lenis when body is locked (e.g., during hero intro animation or menu open)
    const handleBodyClasses = () => {
      if (
        document.body.classList.contains('intro-scroll-lock') ||
        document.body.classList.contains('menu-open')
      ) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    handleBodyClasses();

    const observer = new MutationObserver(handleBodyClasses);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenis.destroy();
      lenisRef.current = null;
      if (globalLenisInstance === lenis) {
        globalLenisInstance = null;
      }
    };
  }, []);

  // On route change, jump to the top immediately so a new page doesn't start halfway down
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
