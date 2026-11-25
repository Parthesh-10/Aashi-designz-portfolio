'use client';

import React from 'react';
import ServiceHero from '@/components/ServiceHero/ServiceHero';

export default function GraphicDesignHero() {
  return (
    <ServiceHero
      id="hero"
      bgImage="/hero/glowcard-tablet.png"
      bgAlt="Graphic design creative experiences background"
      bgQuality={85}
      headingTag="h1"
      headingSegments={[
        {
          text: 'Designing experiences',
          fontClass: '',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
          breakAfter: true,
        },
        {
          text: 'that ',
          fontClass: '',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
        },
        {
          text: 'make sense.',
          fontClass: 'service-serif-accent',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
        },
      ]}
      headingMaxWidth="90cqw"
      subtitle="Apps and websites built around people."
      buttons={[
        { label: 'Book a call', href: '/contact', variant: 'primary' },
        { label: 'How It Works', href: '#how-it-works', variant: 'secondary' },
      ]}
      trusted={{
        image: '/edits/trusted.webp',
        alt: 'Trusted brands client avatars',
        text: 'Trusted by 200+ Brands',
      }}
    />
  );
}

