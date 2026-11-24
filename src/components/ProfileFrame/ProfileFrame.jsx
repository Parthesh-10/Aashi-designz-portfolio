'use client';

import React, { useRef, useState, useEffect } from 'react';
import './ProfileFrame.css';

/**
 * 7 Multiplayer cursor labels around the photo frame.
 * Kept in ONE clean array at the top so text, colors, positions, and float variables
 * are easily customizable.
 */
export const CURSOR_BADGES = [
  {
    id: 'badge-1',
    text: 'Photographer',
    color: '#503D6A', // Dark purple (#4A3566 / #503D6A from screenshot 3)
    arrowPosition: 'right', // left-side label: arrow at top-right, pointing up-right towards photo
    left: '8.9%',
    top: '19.7%',
    floatX: '0.7cqw',
    floatY: '-0.6cqw',
    floatDuration: '4.8s',
    floatDelay: '-1.5s',
  },
  {
    id: 'badge-2',
    text: 'Brand Designer',
    color: '#83C9D3', // Light teal
    arrowPosition: 'left', // right-side label: arrow at top-left, pointing up-left towards photo
    left: '71.5%',
    top: '21.4%',
    floatX: '-0.8cqw',
    floatY: '0.5cqw',
    floatDuration: '5.6s',
    floatDelay: '-3.2s',
  },
  {
    id: 'badge-3',
    text: 'Entrepreneur',
    color: '#B32805', // Rust red (#A8321A / #B32805 from screenshot 3)
    arrowPosition: 'right',
    left: '11.3%',
    top: '39.4%',
    floatX: '0.6cqw',
    floatY: '0.7cqw',
    floatDuration: '3.9s',
    floatDelay: '-0.8s',
  },
  {
    id: 'badge-4',
    text: 'Photographer',
    color: '#56AAB4', // Teal
    arrowPosition: 'right',
    left: '12.8%',
    top: '59.6%',
    floatX: '-0.7cqw',
    floatY: '0.6cqw',
    floatDuration: '6.2s',
    floatDelay: '-2.7s',
  },
  {
    id: 'badge-5',
    text: 'Photographer',
    color: '#F2BE63', // Yellow
    arrowPosition: 'left',
    left: '76.2%',
    top: '62.4%',
    floatX: '0.8cqw',
    floatY: '-0.7cqw',
    floatDuration: '4.5s',
    floatDelay: '-4.1s',
  },
  {
    id: 'badge-6',
    text: 'Educator',
    color: '#E38E45', // Orange
    arrowPosition: 'right',
    left: '18.9%',
    top: '87.8%',
    floatX: '-0.6cqw',
    floatY: '-0.5cqw',
    floatDuration: '5.1s',
    floatDelay: '-1.9s',
  },
  {
    id: 'badge-7',
    text: 'Painter',
    color: '#F4B3B0', // Light pink
    arrowPosition: 'left',
    left: '63.5%',
    top: '87.4%',
    floatX: '0.5cqw',
    floatY: '0.8cqw',
    floatDuration: '4.2s',
    floatDelay: '-2.4s',
  },
];

/**
 * SVG Cursor Icon (arrow pointer).
 * When arrowPosition is 'left', it points up-left.
 * When arrowPosition is 'right', it is horizontally flipped to point up-right.
 */
function CursorIcon({ color, flip = false }) {
  return (
    <svg
      className={`profile-cursor-svg ${flip ? 'flipped' : ''}`}
      viewBox="0 0 88.15 99.86"
      aria-hidden="true"
    >
      {/* Outer border / stroke: 0.08H thick in label color */}
      <path
        fill={color}
        stroke={color}
        strokeWidth="10"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M2.66,3.07C5.9.13,9.77-.87,13.82.83l68.28,41.73c9.45,5.67,7.46,19.61-3.41,22.28l-31.19,2.22-13.35,26.4c-4.82,8.84-17.16,8.38-21.64-.51C8.27,67.67,4.13,42.16.75,16.71.14,12.16-1.26,6.64,2.66,3.07ZM6.88,7.15c-1.52,1.51-.78,3.96-.55,5.87,3.01,25.2,8.09,50.21,11.11,75.41.76,5.29,7.01,7.34,10.59,3.31l15.61-30.55,33.25-2.16c5.39-.74,7.26-7.9,2.69-10.89L11.73,6.52c-1.67-.99-3.48-.74-4.85.63Z"
      />
      {/* White inner stroke (~0.03H between fill and outline) */}
      <path
        fill="#ffffff"
        d="M6.88,7.15c1.37-1.37,3.18-1.62,4.85-.63l67.84,41.63c4.57,2.99,2.71,10.15-2.69,10.89l-33.25,2.16-15.61,30.55c-3.57,4.02-9.83,1.98-10.59-3.31C14.42,63.23,9.34,38.22,6.33,13.02c-.23-1.91-.97-4.36.55-5.87ZM77.57,53.46c.05-.21-.13-1.32-.24-1.52L10.57,11.13c-.22.15.12,2.36.18,2.79,3.11,22.89,6.34,46.77,10.25,69.49.43,2.5.65,8.21,4.27,4.78l15.74-30.96,34.66-2.33c.73-.03,1.74-.73,1.9-1.44Z"
      />
      {/* Interior fill in label color */}
      <path
        fill={color}
        d="M77.57,53.46c-.16.71-1.17,1.41-1.9,1.44l-34.66,2.33-15.74,30.96c-3.62,3.43-3.84-2.28-4.27-4.78-3.92-22.71-7.14-46.6-10.25-69.49-.06-.43-.4-2.64-.18-2.79l66.76,40.81c.11.2.29,1.31.24,1.52Z"
      />
    </svg>
  );
}

export default function ProfileFrame({
  frameSrc = '/Group 57.svg',
  photoSrc,
  className = '',
}) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause floating animation when the component is off-screen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`profile-frame-wrapper ${isVisible ? 'is-visible' : 'is-offscreen'} ${className}`.trim()}
      aria-label="Profile design selection frame of Ayushi"
    >
      {/* Photo Frame Container */}
      {photoSrc ? (
        <div className="profile-frame-rotated-box">
          <div className="profile-frame-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt="Ayushi"
              className="profile-frame-raw-photo"
              draggable={false}
            />
          </div>
          {/* 4 Corner handles */}
          <span className="profile-corner-handle handle-tl" />
          <span className="profile-corner-handle handle-tr" />
          <span className="profile-corner-handle handle-br" />
          <span className="profile-corner-handle handle-bl" />
          {/* 4 Edge pill handles */}
          <span className="profile-edge-handle edge-t" />
          <span className="profile-edge-handle edge-r" />
          <span className="profile-edge-handle edge-b" />
          <span className="profile-edge-handle edge-l" />
        </div>
      ) : (
        <div className="profile-frame-photo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameSrc}
            alt="Ayushi - UI/UX Designer & Strategist"
            className="profile-frame-img"
            draggable={false}
          />
        </div>
      )}

      {/* 7 Cursor Badges */}
      <div className="profile-badges-layer" aria-hidden="true">
        {CURSOR_BADGES.map((badge) => {
          const isRight = badge.arrowPosition === 'right';
          return (
            <div
              key={badge.id}
              className={`profile-badge-item ${isRight ? 'arrow-right' : 'arrow-left'}`}
              style={{
                left: badge.left,
                top: badge.top,
                '--float-x': badge.floatX,
                '--float-y': badge.floatY,
                '--float-dur': badge.floatDuration,
                '--float-delay': badge.floatDelay,
              }}
            >
              {!isRight && (
                <div className="profile-cursor-container">
                  <CursorIcon color={badge.color} flip={false} />
                </div>
              )}
              <div
                className="profile-badge-pill"
                style={{ backgroundColor: badge.color }}
              >
                <span>{badge.text}</span>
              </div>
              {isRight && (
                <div className="profile-cursor-container">
                  <CursorIcon color={badge.color} flip={true} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
