'use client';

import React from 'react';
import ServiceHero from '@/components/ServiceHero/ServiceHero';

export default function BrandingHero() {
  return (
    <ServiceHero
      id="hero"
      bgImage="/images/branding/hero-bg.webp"
      bgAlt=""
      bgQuality={85}
      headingTag="h1"
      headingSegments={[
        {
          text: 'Brands that ',
          fontClass: '',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
        },
        {
          text: 'mean business.',
          fontClass: 'service-serif-accent',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
          breakAfter: true,
        },
        {
          text: 'And look the part.',
          fontClass: '',
          colorClass: '',
          hoverClass: 'ah-hover-purple',
        },
      ]}
      headingMaxWidth="92cqw"
      subtitle="From strategy to storytelling, we build distinctive brand identities that look good, stand out, and stay remembered."
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
