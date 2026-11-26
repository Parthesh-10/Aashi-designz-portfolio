'use client';

import React, { useRef, useState, useEffect } from 'react';

export interface LazyVideoProps {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LazyVideo({
  src,
  poster,
  ariaLabel = 'Work showcase video',
  className = '',
  style,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect user's motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  if (hasError || !src) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
      onError={() => setHasError(true)}
      className={`ow-card-video ${className}`.trim()}
      style={style}
    />
  );
}
