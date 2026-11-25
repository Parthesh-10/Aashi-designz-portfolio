'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import './UiUxHero.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function UiUxHero() {
  return (
    <section
      className="uiux-hero-wrap"
      aria-label="UI/UX Design Hero"
      style={{
        '--font-instrument-serif': instrumentSerif.style.fontFamily,
      }}
    >
      <Image
        src="/hero/uiux-hero.png"
        alt="UI/UX design digital product experience"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="uiux-hero-bg-img"
      />
      <div className="uiux-hero-overlay" aria-hidden="true" />

      <div className="uiux-hero-inner">
        <div className="uiux-hero-content">
          <h1 className="uiux-h1">
            <span className="uiux-line-1">Brands that speak</span>
            <br className="uiux-desktop-br" />
            <span className="uiux-line-2">
              before they <span className="uiux-serif-accent">say a word.</span>
            </span>
          </h1>

          <p className="uiux-sub">
            Every click, scroll, and interaction is a conversation between your brand and your user.
          </p>

          <div className="uiux-btns">
            <Link href="/contact" className="clickable uiux-btn-primary">
              Book a call
            </Link>
            <Link href="#how-it-works" className="clickable uiux-btn-secondary">
              How It Works
            </Link>
          </div>

          <div className="uiux-trusted-row">
            <div className="uiux-trusted-img-wrap">
              <Image
                src="/edits/trusted.webp"
                alt="Trusted brands client avatars"
                width={94}
                height={42}
                className="uiux-trusted-img"
              />
            </div>
            <span className="uiux-trusted-text">Trusted by 200+ Brands</span>
          </div>
        </div>
      </div>
    </section>
  );
}
