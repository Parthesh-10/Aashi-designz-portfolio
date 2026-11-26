'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import type { CSSPropertiesWithVars } from '@/types/css';

export interface FloatingWidgetConfig {
  id: string;
  name: string;
  order: number;
  enterDelay: string;
  enterDelayCompact: string;
  left: string;
  top: string;
  width: string;
  aspectRatio?: string;
  floatX: string;
  floatY: string;
  floatDuration: string;
  hideOnCompact: boolean;
}

export const FLOATING_WIDGETS: FloatingWidgetConfig[] = [
  {
    id: 'sales-bubble',
    name: 'Sales Bubble',
    order: 1,
    enterDelay: '0ms',
    enterDelayCompact: '0ms',
    left: '44.0%',
    top: '36.4%',
    width: '9.8%',
    aspectRatio: '1 / 0.99',
    floatX: '-0.7cqw',
    floatY: '-0.6cqw',
    floatDuration: '5.4s',
    hideOnCompact: false,
  },
  {
    id: 'phone-call',
    name: 'Phone Call Circle',
    order: 2,
    enterDelay: '140ms',
    enterDelayCompact: '110ms',
    left: '55.7%',
    top: '44.8%',
    width: '5.1%',
    aspectRatio: '1 / 1',
    floatX: '0.6cqw',
    floatY: '-0.7cqw',
    floatDuration: '4.6s',
    hideOnCompact: false,
  },
  {
    id: 'new-leads',
    name: 'New Leads Pill',
    order: 3,
    enterDelay: '280ms',
    enterDelayCompact: '0ms',
    left: '31.7%',
    top: '53.5%',
    width: '10.5%',
    aspectRatio: '4.9 / 1',
    floatX: '0.5cqw',
    floatY: '0.6cqw',
    floatDuration: '5.0s',
    hideOnCompact: true,
  },
  {
    id: 'ananya-rao',
    name: 'Ananya Rao Card',
    order: 4,
    enterDelay: '420ms',
    enterDelayCompact: '0ms',
    left: '21.5%',
    top: '39.7%',
    width: '20.7%',
    aspectRatio: '3.73 / 1',
    floatX: '0.6cqw',
    floatY: '0.7cqw',
    floatDuration: '6.4s',
    hideOnCompact: true,
  },
  {
    id: 'time-stamp',
    name: 'Time Stamp',
    order: 4,
    enterDelay: '420ms',
    enterDelayCompact: '0ms',
    left: '15.2%',
    top: '49.0%',
    width: 'max-content',
    floatX: '-0.4cqw',
    floatY: '0.5cqw',
    floatDuration: '4.2s',
    hideOnCompact: true,
  },
  {
    id: 'voice-message',
    name: 'Voice Message Pill',
    order: 5,
    enterDelay: '560ms',
    enterDelayCompact: '0ms',
    left: '39.5%',
    top: '26.0%',
    width: '21.3%',
    aspectRatio: '5.6 / 1',
    floatX: '0.8cqw',
    floatY: '-0.5cqw',
    floatDuration: '4.8s',
    hideOnCompact: true,
  },
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta Card',
    order: 6,
    enterDelay: '700ms',
    enterDelayCompact: '220ms',
    left: '11.3%',
    top: '26.0%',
    width: '26.2%',
    aspectRatio: '4.77 / 1',
    floatX: '-0.5cqw',
    floatY: '-0.6cqw',
    floatDuration: '5.8s',
    hideOnCompact: false,
  },
  {
    id: 'chat-circle',
    name: 'Chat Circle',
    order: 7,
    enterDelay: '840ms',
    enterDelayCompact: '0ms',
    left: '4.3%',
    top: '25.9%',
    width: '5.2%',
    aspectRatio: '1 / 1',
    floatX: '0.5cqw',
    floatY: '0.6cqw',
    floatDuration: '4.4s',
    hideOnCompact: true,
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma Pill',
    order: 8,
    enterDelay: '980ms',
    enterDelayCompact: '330ms',
    left: '24.7%',
    top: '15.4%',
    width: '18.3%',
    aspectRatio: '4.7 / 1',
    floatX: '-0.7cqw',
    floatY: '0.5cqw',
    floatDuration: '6.0s',
    hideOnCompact: false,
  },
  {
    id: 'instagram',
    name: 'Instagram Card',
    order: 9,
    enterDelay: '1120ms',
    enterDelayCompact: '440ms',
    left: '12.2%',
    top: '3.1%',
    width: '10.5%',
    aspectRatio: '1 / 1',
    floatX: '0.6cqw',
    floatY: '-0.7cqw',
    floatDuration: '5.2s',
    hideOnCompact: false,
  },
];

const WAVEFORM_BARS = [
  6, 10, 14, 20, 16, 22, 28, 18, 26, 32, 24, 30, 36, 28, 34, 26, 22, 18, 14,
  12, 16, 22, 26, 20, 24, 28, 22, 18, 24, 20, 16, 18, 14, 12, 10, 8, 6, 4,
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="bdh-icon-svg" aria-hidden="true">
      <defs>
        <radialGradient id="igGrad" cx="0.2" cy="1" r="1">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="25%" stopColor="#FF5D3B" />
          <stop offset="60%" stopColor="#D800B9" />
          <stop offset="100%" stopColor="#4C5FD7" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#igGrad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="bdh-badge-svg" aria-hidden="true">
      <rect width="24" height="24" rx="12" fill="#ffffff" />
      <path d="M6 7.5v9h2.5v-5.2l3.5 2.6 3.5-2.6v5.2H18v-9l-6 4.5L6 7.5z" fill="#EA4335" />
      <path d="M6 7.5l6 4.5 6-4.5H6z" fill="#C5221F" opacity="0.4" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="bdh-badge-svg" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M13.5 19v-6.2h2.1l.3-2.5h-2.4V8.7c0-.7.2-1.2 1.2-1.2h1.3V5.3c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v1.9H8.3v2.5h2.1V19h3.1z"
        fill="#ffffff"
      />
    </svg>
  );
}

function GreenChatBadge() {
  return (
    <svg viewBox="0 0 24 24" className="bdh-badge-svg" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#6BCB77" />
      <path
        d="M7.5 7.5h9a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5h-5.5L8 18v-2.5H7.5A1.5 1.5 0 016 14V9a1.5 1.5 0 011.5-1.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

function SpeechBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="bdh-chat-svg" aria-hidden="true">
      <path
        d="M5 6h14a2 2 0 012 2v7a2 2 0 01-2 2H8.5L5 20v-3a2 2 0 01-2-2V8a2 2 0 012-2z"
        fill="#2D2A4A"
      />
      <circle cx="8.5" cy="11.5" r="1.1" fill="#ffffff" />
      <circle cx="12" cy="11.5" r="1.1" fill="#ffffff" />
      <circle cx="15.5" cy="11.5" r="1.1" fill="#ffffff" />
    </svg>
  );
}

function PhoneHandsetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="bdh-phone-svg" aria-hidden="true">
      <path
        d="M7.5 4.5a1.5 1.5 0 011.5 1.5c0 1.2.3 2.3.9 3.3.3.5.2 1.1-.2 1.5l-1.6 1.6a14.8 14.8 0 006.1 6.1l1.6-1.6c.4-.4 1-.5 1.5-.2 1 .6 2.1.9 3.3.9a1.5 1.5 0 011.5 1.5V21a1.5 1.5 0 01-1.5 1.5C11.5 22.5 3.5 14.5 3.5 4.5A1.5 1.5 0 015 3h2.5z"
        fill="#2D2A4A"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="bdh-mic-svg" aria-hidden="true">
      <rect x="8.5" y="4" width="7" height="11" rx="3.5" fill="#ffffff" />
      <path
        d="M5.5 11a6.5 6.5 0 0013 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line x1="12" y1="17.5" x2="12" y2="20.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DoubleCheckIcon() {
  return (
    <svg viewBox="0 0 24 16" className="bdh-check-svg" aria-hidden="true">
      <path
        d="M1.5 8.5l4.5 4.5L16.5 2.5"
        fill="none"
        stroke="#7BD36B"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8.5l4.5 4.5L22.5 2.5"
        fill="none"
        stroke="#7BD36B"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="bdh-arrow-svg" aria-hidden="true">
      <path
        d="M5 15L15 5M15 5H7M15 5V13"
        fill="none"
        stroke="#1F2416"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface BrandDesignHeroProps {
  bgSrc?: string;
  className?: string;
}

export default function BrandDesignHero({
  bgSrc = '/hero/service-hero.jpg',
  className = '',
}: BrandDesignHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const seeHowVideoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const hasStartedRef = useRef(false);
  const bgLoadedRef = useRef(false);
  const inViewportRef = useRef(false);

  useEffect(() => {
    if (seeHowVideoRef.current) {
      seeHowVideoRef.current.defaultMuted = true;
      seeHowVideoRef.current.muted = true;
      seeHowVideoRef.current.play().catch(() => {});
    }
  }, []);

  const checkAndStartEntrance = useCallback(() => {
    if (hasStartedRef.current) return;
    if (bgLoadedRef.current && inViewportRef.current) {
      hasStartedRef.current = true;
      setTimeout(() => {
        setIsReady(true);
      }, 300);
    }
  }, []);

  const handleImageLoad = useCallback(() => {
    bgLoadedRef.current = true;
    checkAndStartEntrance();
  }, [checkAndStartEntrance]);

  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector<HTMLElement>('.navbar');
      if (navbar) {
        const h = navbar.offsetHeight;
        if (h > 0) {
          document.documentElement.style.setProperty('--navbar-h', `${h}px`);
        }
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hasStartedRef.current = true;
      const rafId = requestAnimationFrame(() => setIsReady(true));
      return () => cancelAnimationFrame(rafId);
    }

    const fallbackTimer = setTimeout(() => {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        setIsReady(true);
      }
    }, 4000);

    const img = el.querySelector<HTMLImageElement>('.brand-hero-bg-img');
    if (img && img.complete) {
      bgLoadedRef.current = true;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            inViewportRef.current = true;
            checkAndStartEntrance();
          }
        },
        { threshold: [0, 0.3], rootMargin: '50px' }
      );
      observer.observe(el);

      return () => {
        clearTimeout(fallbackTimer);
        observer.disconnect();
      };
    }

    inViewportRef.current = true;
    checkAndStartEntrance();
    return () => clearTimeout(fallbackTimer);
  }, [checkAndStartEntrance]);

  const slotStyle = (vars: CSSPropertiesWithVars): CSSPropertiesWithVars => vars;

  return (
    <section
      ref={heroRef}
      className={`brand-hero-section max-lg:!p-0 ${isReady ? 'is-ready' : ''} ${isVisible ? 'is-visible' : 'is-offscreen'} ${className}`.trim()}
      aria-label="Brand Design Services"
    >
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .bdh-widget-entrance {
            opacity: 1 !important;
            transform: none !important;
          }
        `,
          }}
        />
      </noscript>

      <div className="brand-hero-bg-wrap relative overflow-hidden">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="brand-hero-bg-img object-cover"
          onLoad={handleImageLoad}
        />
        <div className="brand-hero-overlay" aria-hidden="true" />
      </div>

      <div className="brand-hero-widgets-layer" aria-hidden="true">
        <div
          className="bdh-widget-slot bdh-slot-sales"
          style={slotStyle({
            '--l': '44.0%',
            '--t': '36.4%',
            '--w': '9.8%',
            '--enter-delay': '0ms',
            '--enter-delay-compact': '0ms',
            '--fx': '-0.7cqw',
            '--fy': '-0.6cqw',
            '--dur': '5.4s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-sales-bubble">
                <div className="bdh-sales-icon">
                  <ArrowUpRightIcon />
                </div>
                <div className="bdh-sales-bottom">
                  <span className="bdh-sales-amount">₹48,500</span>
                  <span className="bdh-sales-label">today&apos;s sales</span>
                </div>
                <div className="bdh-sales-tail" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-phone"
          style={slotStyle({
            '--l': '55.7%',
            '--t': '44.8%',
            '--w': '5.1%',
            '--enter-delay': '140ms',
            '--enter-delay-compact': '110ms',
            '--fx': '0.6cqw',
            '--fy': '-0.7cqw',
            '--dur': '4.6s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-phone-circle">
                <PhoneHandsetIcon />
                <span className="bdh-circle-subbadge bdh-phone-badge">3</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-leads hide-compact"
          style={slotStyle({
            '--l': '31.7%',
            '--t': '53.5%',
            '--w': '10.5%',
            '--enter-delay': '280ms',
            '--fx': '0.5cqw',
            '--fy': '0.6cqw',
            '--dur': '5.0s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-leads-pill">
                <div className="bdh-count-badge bdh-count-navy-sm">6</div>
                <span className="bdh-leads-text">new leads today</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-ananya hide-compact"
          style={slotStyle({
            '--l': '21.5%',
            '--t': '39.7%',
            '--w': '20.7%',
            '--enter-delay': '420ms',
            '--fx': '0.6cqw',
            '--fy': '0.7cqw',
            '--dur': '6.4s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-ananya-card">
                <div className="bdh-avatar-wrap">
                  <div className="bdh-ananya-avatar">AR</div>
                  <div className="bdh-subbadge">
                    <GreenChatBadge />
                  </div>
                </div>
                <div className="bdh-text-col">
                  <span className="bdh-name">Ananya Rao</span>
                  <span className="bdh-subtext">Ok, I&apos;ll take 10 units!</span>
                </div>
                <div className="bdh-count-badge bdh-count-lavender">2</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-timestamp hide-compact"
          style={slotStyle({
            '--l': '15.2%',
            '--t': '49.0%',
            '--w': 'max-content',
            '--enter-delay': '420ms',
            '--fx': '-0.4cqw',
            '--fy': '0.5cqw',
            '--dur': '4.2s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-timestamp-wrap">
                <DoubleCheckIcon />
                <span className="bdh-timestamp-text">02:24 am</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-voice hide-compact"
          style={slotStyle({
            '--l': '39.5%',
            '--t': '26.0%',
            '--w': '21.3%',
            '--enter-delay': '560ms',
            '--fx': '0.8cqw',
            '--fy': '-0.5cqw',
            '--dur': '4.8s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-voice-pill">
                <div className="bdh-waveform">
                  {WAVEFORM_BARS.map((bh, i) => (
                    <span
                      key={i}
                      className={`bdh-bar ${i < 19 ? 'bar-navy' : 'bar-lavender'}`}
                      style={{ height: `${(bh / 36) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="bdh-mic-btn">
                  <MicIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-rohan"
          style={slotStyle({
            '--l': '11.3%',
            '--t': '26.0%',
            '--w': '26.2%',
            '--enter-delay': '700ms',
            '--enter-delay-compact': '220ms',
            '--fx': '-0.5cqw',
            '--fy': '-0.6cqw',
            '--dur': '5.8s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-rohan-card">
                <div className="bdh-avatar-wrap">
                  <div className="bdh-rohan-avatar">RM</div>
                  <div className="bdh-subbadge">
                    <FacebookIcon />
                  </div>
                </div>
                <div className="bdh-text-col">
                  <span className="bdh-name-white">Rohan Mehta</span>
                  <span className="bdh-subtext-white">Interested in your product! Price?</span>
                </div>
                <div className="bdh-count-badge bdh-count-lime">4</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-chat hide-compact"
          style={slotStyle({
            '--l': '4.3%',
            '--t': '25.9%',
            '--w': '5.2%',
            '--enter-delay': '840ms',
            '--fx': '0.5cqw',
            '--fy': '0.6cqw',
            '--dur': '4.4s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-chat-circle">
                <SpeechBubbleIcon />
                <span className="bdh-circle-subbadge">2</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-priya"
          style={slotStyle({
            '--l': '24.7%',
            '--t': '15.4%',
            '--w': '18.3%',
            '--enter-delay': '980ms',
            '--enter-delay-compact': '330ms',
            '--fx': '-0.7cqw',
            '--fy': '0.5cqw',
            '--dur': '6.0s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-priya-pill">
                <div className="bdh-avatar-wrap">
                  <div className="bdh-priya-avatar">PS</div>
                  <div className="bdh-subbadge">
                    <GmailIcon />
                  </div>
                </div>
                <div className="bdh-text-col">
                  <span className="bdh-name">Priya Sharma</span>
                  <span className="bdh-subtext">New order received</span>
                </div>
                <div className="bdh-count-badge bdh-count-navy">8</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bdh-widget-slot bdh-slot-instagram"
          style={slotStyle({
            '--l': '12.2%',
            '--t': '3.1%',
            '--w': '10.5%',
            '--enter-delay': '1120ms',
            '--enter-delay-compact': '440ms',
            '--fx': '0.6cqw',
            '--fy': '-0.7cqw',
            '--dur': '5.2s',
          })}
        >
          <div className="bdh-widget-entrance">
            <div className="bdh-widget-float">
              <div className="bdh-instagram-card">
                <div className="bdh-ig-top">
                  <div className="bdh-ig-logo">
                    <InstagramIcon />
                  </div>
                  <span className="bdh-ig-tag">INSTAGRAM</span>
                </div>
                <div className="bdh-ig-mid">
                  <span className="bdh-ig-subtitle">new followers</span>
                  <span className="bdh-ig-count">76+</span>
                </div>
                <div className="bdh-ig-avatars-row">
                  <div className="bdh-ig-stack">
                    <span className="bdh-ig-av av-ak">AK</span>
                    <span className="bdh-ig-av av-sr">SR</span>
                    <span className="bdh-ig-av av-mp">MP</span>
                  </div>
                  <span className="bdh-ig-more">+73 more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PageContainer className="brand-hero-text-container pointer-events-none absolute inset-0 z-20 h-full w-full max-lg:static max-lg:flex max-lg:min-h-[100svh] max-lg:flex-col max-lg:justify-between max-lg:pt-[calc(var(--navbar-h,72px)+20px)] max-lg:pb-12 max-lg:pointer-events-auto">
        <div className="relative h-full w-full max-lg:contents">
          <h1 className="brand-hero-headline !right-0 !max-w-[32%] text-right pointer-events-auto">
            We&apos;ll make you want
            <br />
            to increase your
            <br />
            marketing budget!
          </h1>

          <p className="brand-hero-message !left-0 lg:!top-[58%] !max-w-[31%] pointer-events-auto">
            Because when marketing starts bringing in results, you&apos;ll want to do more of it.
          </p>

          <div className="brand-hero-buttons-row !left-0 pointer-events-auto">
            <Link href="/contact" className="bdh-btn-see-how clickable">
              <video
                ref={seeHowVideoRef}
                className="bdh-btn-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src="/videos/comp.mp4" type="video/mp4" />
              </video>
              <span className="bdh-btn-video-overlay" aria-hidden="true" />
              <span className="bdh-btn-border" aria-hidden="true" />
              <span className="bdh-btn-text">See how?</span>
            </Link>
            <Link href="#services" className="bdh-btn-explore clickable">
              <span>Explore services</span>
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
