'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';
import './PassageGallery.css';

const PassageGallery = dynamic(() => import('./PassageGallery'), {
  ssr: false,
  loading: () => <PassageFallback />
});

const PORTFOLIO_ITEMS = [
  {
    src: '/img/boxImg/synctrip.jpg',
    title: 'SyncTrip Platform',
    caption: 'AI-Powered Collaborative Travel & Group Booking Experience',
    alt: 'SyncTrip travel app UI design'
  },
  {
    src: '/img/boxImg/examhub.jpg',
    title: 'ExamHub EdTech',
    caption: 'Modern Student Assessment & Test Simulation Ecosystem',
    alt: 'ExamHub educational dashboard design'
  },
  {
    src: '/img/boxImg/yugen.jpg',
    title: 'Jeevayugen Identity',
    caption: 'Holistic Health & Wellness Brand Architecture and Visual Strategy',
    alt: 'Jeevayugen brand packaging and identity'
  },
  {
    src: '/img/boxImg/kocchar.jpg',
    title: 'Kochhar Media Planners',
    caption: 'Full-Scale Creative Identity & Integrated Campaign System',
    alt: 'Kochhar Media campaign and digital branding'
  },
  {
    src: '/img/serviceCard/uiuxdesign1.jpeg',
    title: 'FinTech Mobile Suite',
    caption: 'Next-Generation Wealth Management & Micro-Investment UX',
    alt: 'Fintech mobile application screens'
  },
  {
    src: '/img/serviceCard/uiuxdesign2.jpeg',
    title: 'Enterprise Analytics SaaS',
    caption: 'Data-Dense Workflow Architecture & Comprehensive Design System',
    alt: 'Enterprise dashboard design system'
  },
  {
    src: '/img/serviceCard/uiuxdesign3.jpeg',
    title: 'Interactive Prototype',
    caption: 'Fluid Navigation Flows & Micro-Interaction Exploration',
    alt: 'Mobile interactive prototype screens'
  },
  {
    src: '/img/serviceCard/branddesign1.jpeg',
    title: 'Editorial Identity',
    caption: 'High-Fashion Editorial Layout & Typographic Mastery',
    alt: 'Editorial brand guidelines and poster'
  },
  {
    src: '/img/serviceCard/branddesign2.jpeg',
    title: 'Sustainable Packaging',
    caption: 'Minimalist Package Engineering & Tactile Brand Touchpoints',
    alt: 'Sustainable product packaging design'
  },
  {
    src: '/img/serviceCard/branddesign3.jpeg',
    title: 'Visual Brand Systems',
    caption: 'Modular Identity Toolkits for Scale-Ready Ventures',
    alt: 'Visual brand system and color palette'
  },
  {
    src: '/img/serviceCard/brandstrategy1.jpeg',
    title: 'Market Positioning Strategy',
    caption: 'Strategic Frameworks & Category-Defining Brand Archetypes',
    alt: 'Strategic brand framework diagram'
  },
  {
    src: '/img/serviceCard/brandstrategy2.jpeg',
    title: 'Brand Storytelling',
    caption: 'Impactful Narrative Structures for Founder-Led Companies',
    alt: 'Brand narrative presentation mockup'
  },
  {
    src: '/img/masonry/branddesign/growlink_14_11zon.jpg',
    title: 'GrowLink Connected Tech',
    caption: 'IoT Industrial Ecosystem Branding & Clean Interface Visuals',
    alt: 'GrowLink industrial brand collateral'
  },
  {
    src: '/img/masonry/branddesign/zukujiArtboard 1_3_11zon.jpg',
    title: 'Zukuji Modern Commerce',
    caption: 'Elevated E-Commerce Discovery & Tactile Product Journeys',
    alt: 'Zukuji luxury e-commerce interface'
  }
];

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

function PassageFallback() {
  return (
    <div className="passage-fallback-grid" aria-label="Portfolio gallery fallback">
      {PORTFOLIO_ITEMS.slice(0, 4).map((item, idx) => (
        <div key={idx} className="passage-fallback-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt} />
          <div className="passage-fallback-meta">
            <h5>{item.title}</h5>
            <p>{item.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PassageSection() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const hasWebGL = isClient && checkWebGLSupport();

  return (
    <section className="passage-section-wrapper" aria-label="Passage Gallery Section">
      {isClient && hasWebGL ? (
        <PassageGallery
          items={PORTFOLIO_ITEMS}
          colors={['#5227FF', '#FF9FFC']}
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
  );
}

