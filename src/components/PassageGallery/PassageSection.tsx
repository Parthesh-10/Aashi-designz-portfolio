'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore, useRef, useState, useEffect } from 'react';
import { TUNNEL_IMAGES } from './PassageGallery';

const PASSAGE_COLORS = ['#5227FF', '#FF9FFC'];

const PassageGallery = dynamic(() => import('./PassageGallery'), {
  ssr: false,
  loading: () => <PassageFallback />,
});

const emptySubscribe = () => () => {};

function checkWebGLSupport(): boolean {
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

function PassageFallback() {
  return (
    <div className="passage-fallback-grid" aria-label="Portfolio gallery fallback">
      {TUNNEL_IMAGES.slice(0, 4).map((item) => (
        <div key={item.id} className="passage-fallback-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.thumb} alt={item.alt} loading="lazy" decoding="async" />
          <div className="passage-fallback-meta">
            <h5>{item.alt}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PassageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const hasWebGL = isClient && checkWebGLSupport();

  useEffect(() => {
    if (!sectionRef.current || !hasWebGL) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasWebGL]);

  return (
    <div className="passage-outer-container container" ref={sectionRef}>
      <section className="passage-section-wrapper" aria-label="Passage Gallery Section">
        {hasWebGL && inView ? (
          <PassageGallery
            items={TUNNEL_IMAGES}
            colors={PASSAGE_COLORS}
            backgroundColor="#06020c"
            speed={0.35}
            look={0.65}
            fov={68}
            lanes={5}
            photoFill={0.36}
            accentFill={0.08}
            interactive={true}
            focusOnClick={true}
            captions={true}
            wheel={true}
            ariaLabel="Interactive 3D Passage Gallery of creative portfolio works"
          />
        ) : (
          <PassageFallback />
        )}
      </section>
    </div>
  );
}
