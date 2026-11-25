'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import GradualBlur from './GradualBlur';

export const GRADUAL_BLUR_CONFIG = {
  position: 'bottom' as const,
  target: 'page' as const,
  height: 'var(--gradual-blur-height, 6rem)',
  strength: 2,
  layers: 6,
  curve: 'bezier' as const,
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
    const isIntroActive = () =>
      document.body.classList.contains('intro-scroll-lock') ||
      !!document.getElementById('hero-intro-overlay');

    const rafId = requestAnimationFrame(() => {
      setMounted(true);

      if (pathname !== '/' || !isIntroActive()) {
        setVisible(true);
      }
    });

    if (pathname !== '/' || !isIntroActive()) {
      return () => cancelAnimationFrame(rafId);
    }

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

    const failsafe = setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 3600);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [pathname]);

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
