'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import GradualBlur from './GradualBlur';
import './GradualBlur.css';

/**
 * Configurable tuning constants for site-wide progressive bottom blur
 */
export const GRADUAL_BLUR_CONFIG = {
  position: 'bottom',
  target: 'page',
  height: 'var(--gradual-blur-height, 6rem)',
  strength: 2,
  layers: 6,
  curve: 'bezier',
  exponential: false,
  opacity: 1,
  tint: 'transparent',
  zIndex: 40,
};

export default function SiteGradualBlur() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    // If not on home page, intro does not exist — reveal immediately
    if (pathname !== '/') {
      setVisible(true);
      return;
    }

    // On home page: check if intro is currently active
    const isIntroActive = () =>
      document.body.classList.contains('intro-scroll-lock') ||
      !!document.getElementById('hero-intro-overlay');

    if (!isIntroActive()) {
      setVisible(true);
      return;
    }

    // Intro is playing: observe document.body class changes for removal of intro-scroll-lock
    const observer = new MutationObserver(() => {
      if (!isIntroActive()) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Failsafe timer (3600ms) guarantees blur reveals even if intro state changes unexpectedly
    const failsafe = setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 3600);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [pathname]);

  // Prevent SSR hydration mismatch
  if (!mounted) return null;

  return (
    <div
      className="site-gradual-blur-wrapper"
      style={{
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <GradualBlur
        position={GRADUAL_BLUR_CONFIG.position}
        target={GRADUAL_BLUR_CONFIG.target}
        height={GRADUAL_BLUR_CONFIG.height}
        strength={GRADUAL_BLUR_CONFIG.strength}
        layers={GRADUAL_BLUR_CONFIG.layers}
        curve={GRADUAL_BLUR_CONFIG.curve}
        exponential={GRADUAL_BLUR_CONFIG.exponential}
        opacity={GRADUAL_BLUR_CONFIG.opacity}
        tint={GRADUAL_BLUR_CONFIG.tint}
        zIndex={GRADUAL_BLUR_CONFIG.zIndex}
      />
    </div>
  );
}
