'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ClientFeedbackApps from '@/components/ClientFeedbackApps/ClientFeedbackApps';

const BLUR_SPLIT =
  'data:image/webp;base64,UklGRtAAAABXRUJQVlA4IMQAAAAwBACdASogAA0APxFysFAsJqSisAgBgCIJZACdB2gDZMmPX1TFNuf+AAAA/t6+3UJVdw4a1r9gJv+O73J3SwshwnNeDhXul99Q9Vhwa9yo2p5LDgqne4FXNPnlkfXbC9HRfxxyPkWF/P9CB0/GyeT1dC2eEBWtTcMPdsH3LBbLHI3lYNB5frDVN4yCUgiFUlspNIYazjqG0bixO2gvIdm9mBU6cDfZTvSnZ+P7h7z+Tx8H+gE4elJHwVgoQuwHozZFAAAA';

export default function SplitBrandSection() {
  return (
    <section className="sbs-section" aria-label="Business versus Brand Comparison">
      <div className="sbs-image-viewport">
        <div className="sbs-image-frame">
          <Image
            src="/images/branding/which-one.webp"
            alt="Split image: on the left, hands holding a smartphone displaying a cluttered, messy website with chaotic banners and colors; on the right, hands holding a smartphone displaying a clean, elegant fashion brand store with minimalist typography"
            fill
            sizes="100vw"
            loading="lazy"
            decoding="async"
            placeholder="blur"
            blurDataURL={BLUR_SPLIT}
            className="sbs-split-img"
          />

          <div className="sbs-center-divider" aria-hidden="true" />

          <div className="sbs-top-pill" aria-label="Which one will you be?">
            Which one will you be?
          </div>

          <div className="sbs-bottom-pills-row" role="group" aria-label="Choice: A business or A brand">
            <span className="sbs-pill-dark sbs-pill-business">A business</span>
            <span className="sbs-pill-purple sbs-pill-or" aria-hidden="true">
              or
            </span>
            <span className="sbs-pill-dark sbs-pill-brand">A brand</span>
          </div>
        </div>
      </div>

      <div className="sbs-button-row">
        <Link
          href="/contact"
          className="sbs-lime-btn"
          aria-label="Book a call with Aashidesignz"
        >
          <span className="sbs-btn-text">Book a call</span>
          <span className="sbs-btn-arrow-wrap" aria-hidden="true">
            <svg
              className="sbs-btn-arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>

      <div className="sbs-testimonials-block">
        <ClientFeedbackApps showEyebrow={false} asBlock={true} className="sbs-feedback-inner">
          <p className="sbs-tagline">
            Let’s start with your{' '}
            <span className="sbs-tagline-purple">business goals</span> and build from there.
          </p>
        </ClientFeedbackApps>
      </div>
    </section>
  );
}
