'use client';

import { useState, useRef, useEffect } from 'react';
import { Instrument_Serif } from 'next/font/google';
import './CupboardReveal.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

// 1.5 is moderate, 2 is fast, and 2.5 or higher is very fast.
const PLAYBACK_RATE = 2;

export default function CupboardReveal() {
  // State: 'closed' | 'opening' | 'open' | 'closing'
  const [state, setState] = useState('closed');
  // Visible layer: 'poster' | 'open' | 'close'
  const [activeLayer, setActiveLayer] = useState('poster');

  const openVideoRef = useRef(null);
  const closeVideoRef = useRef(null);

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
    // Clicks during opening or closing are ignored. No queueing, no restarting mid-way.
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
          playPromise.catch((err) => {
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
          playPromise.catch((err) => {
            console.warn('Playback prevented:', err);
          });
        }
      }
    }
  };

  const handleOpenPlaying = () => {
    // Reveal video on 'playing' event to ensure no blank frame
    if (state === 'opening') {
      setActiveLayer('open');
    }
  };

  const handleOpenEnded = () => {
    // Hold on final frame when open video ends
    if (state === 'opening') {
      setState('open');
    }
  };

  const handleClosePlaying = () => {
    // Reveal close video once playback actually begins
    if (state === 'closing') {
      setActiveLayer('close');
    }
  };

  const handleCloseEnded = () => {
    // When close video ends, switch back to poster and reset both videos
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
        {/* Layer 1: Closed poster image */}
        <img
          src="/cupboard/cupboard-poster.jpg"
          alt=""
          className={`cupboard-reveal__layer cupboard-reveal__poster ${
            activeLayer === 'poster' ? 'is-active' : ''
          }`}
          aria-hidden="true"
        />

        {/* Layer 2: Open animation video */}
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

        {/* Layer 3: Close animation video */}
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
