'use client';

import { useState, useRef, useEffect } from 'react';
import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

const PLAYBACK_RATE = 2;

type CupboardState = 'closed' | 'opening' | 'open' | 'closing';
type ActiveLayer = 'poster' | 'open' | 'close';

export default function CupboardReveal() {
  const [state, setState] = useState<CupboardState>('closed');
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>('poster');

  const openVideoRef = useRef<HTMLVideoElement>(null);
  const closeVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (openVideoRef.current) {
      openVideoRef.current.defaultPlaybackRate = PLAYBACK_RATE;
      openVideoRef.current.playbackRate = PLAYBACK_RATE;
    }
    if (closeVideoRef.current) {
      closeVideoRef.current.defaultPlaybackRate = PLAYBACK_RATE;
      closeVideoRef.current.playbackRate = PLAYBACK_RATE;
    }
  }, []);

  const handleClick = () => {
    if (state === 'opening' || state === 'closing') {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (state === 'closed') {
      if (prefersReducedMotion) {
        if (openVideoRef.current && openVideoRef.current.duration) {
          openVideoRef.current.currentTime = openVideoRef.current.duration;
        }
        setActiveLayer('open');
        setState('open');
        return;
      }

      setState('opening');
      if (openVideoRef.current) {
        openVideoRef.current.currentTime = 0;
        openVideoRef.current.playbackRate = PLAYBACK_RATE;
        const playPromise = openVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err: unknown) => {
            console.warn('Playback prevented:', err);
          });
        }
      }
    } else if (state === 'open') {
      if (prefersReducedMotion) {
        if (openVideoRef.current) openVideoRef.current.currentTime = 0;
        if (closeVideoRef.current) closeVideoRef.current.currentTime = 0;
        setActiveLayer('poster');
        setState('closed');
        return;
      }

      setState('closing');
      if (closeVideoRef.current) {
        closeVideoRef.current.currentTime = 0;
        closeVideoRef.current.playbackRate = PLAYBACK_RATE;
        const playPromise = closeVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err: unknown) => {
            console.warn('Playback prevented:', err);
          });
        }
      }
    }
  };

  const handleOpenPlaying = () => {
    if (state === 'opening') {
      setActiveLayer('open');
    }
  };

  const handleOpenEnded = () => {
    if (state === 'opening') {
      setState('open');
    }
  };

  const handleClosePlaying = () => {
    if (state === 'closing') {
      setActiveLayer('close');
    }
  };

  const handleCloseEnded = () => {
    if (state === 'closing') {
      setActiveLayer('poster');
      setState('closed');
      if (openVideoRef.current) openVideoRef.current.currentTime = 0;
      if (closeVideoRef.current) closeVideoRef.current.currentTime = 0;
    }
  };

  const isExpanded = state === 'open' || state === 'opening';
  const ariaLabel = isExpanded ? 'Close the cupboard' : 'Open the cupboard';

  return (
    <section className="cupboard-reveal-section">
      <h2 className="cupboard-reveal__heading">
        Projects{' '}
        <span
          className={`cupboard-reveal__heading-accent ${instrumentSerif.className}`}
        >
          worth exploring
        </span>
      </h2>

      <button
        type="button"
        className="cupboard-reveal"
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-expanded={isExpanded}
      >
        <img
          src="/cupboard/cupboard-poster.jpg"
          alt=""
          className={`cupboard-reveal__layer cupboard-reveal__poster ${
            activeLayer === 'poster' ? 'is-active' : ''
          }`}
          aria-hidden="true"
        />

        <video
          ref={openVideoRef}
          className={`cupboard-reveal__layer cupboard-reveal__video ${
            activeLayer === 'open' ? 'is-active' : ''
          }`}
          src="/cupboard/cupboard-open.mp4"
          poster="/cupboard/cupboard-poster.jpg"
          muted
          playsInline
          preload="auto"
          onPlaying={handleOpenPlaying}
          onEnded={handleOpenEnded}
          aria-hidden="true"
        />

        <video
          ref={closeVideoRef}
          className={`cupboard-reveal__layer cupboard-reveal__video ${
            activeLayer === 'close' ? 'is-active' : ''
          }`}
          src="/cupboard/cupboard-close.mp4"
          poster="/cupboard/cupboard-poster.jpg"
          muted
          playsInline
          preload="auto"
          onPlaying={handleClosePlaying}
          onEnded={handleCloseEnded}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}

export { CupboardReveal };
