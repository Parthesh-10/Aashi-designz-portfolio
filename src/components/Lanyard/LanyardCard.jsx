'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';
import './Lanyard.css';

const Lanyard = dynamic(() => import('./Lanyard'), {
  ssr: false,
  loading: () => (
    <div className="lanyard-fallback">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/aashiaboutPfp.jpg"
        alt="Ayushi - UI/UX Designer"
        className="aboutFallbackImg"
      />
    </div>
  )
});

const emptySubscribe = () => () => {};

function checkWebGLSupport() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function LanyardCard() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const hasWebGL = isClient && checkWebGLSupport();

  if (!isClient || !hasWebGL) {
    return (
      <div className="lanyard-fallback">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/aashiaboutPfp.jpg"
          alt="Ayushi - UI/UX Designer"
          className="aboutFallbackImg"
        />
      </div>
    );
  }

  return (
    <div className="lanyard-wrapper" aria-label="Interactive 3D lanyard badge of Ayushi">
      <Lanyard
        frontImage="/img/aashiaboutPfp.jpg"
        cardColor="#313944"
        strapColor="#EDFF7A"
        orientation="portrait"
        finish="glossy"
        cornerRadius={0.18}
        size={0.62}
        strapLength={0.46}
        strapWidth={0.65}
        metal="silver"
        gravity={reducedMotion ? 0.3 : 1}
        damping={reducedMotion ? 0.85 : 0.5}
        elasticity={reducedMotion ? 0.2 : 0.5}
        breeze={reducedMotion ? 0 : 0.35}
        intro={!reducedMotion}
        interactive={true}
      />
    </div>
  );
}
