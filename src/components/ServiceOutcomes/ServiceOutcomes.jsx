'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OUTCOMES_DATA, HAS_OUTCOMES_IMAGES } from '@/constant/outcomes';
import './ServiceOutcomes.css';

// SVG Icons
function UpRightArrow({ className = '', stroke = 'currentColor', strokeWidth = 2, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServiceOutcomes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Element Refs
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const cardRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

  // Cached Geometry (Zero layout thrashing: no getBoundingClientRect in hot paths)
  const geometryRef = useRef({
    colH: 71,
    actH: 104,
    panelPageX: 0,
    panelPageY: 0,
    panelWidth: 0,
    listPageX: 0,
    listPageY: 0,
    listWidth: 0,
  });

  // State refs for animation loops and event decoupling
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const isHoveredRef = useRef(false);
  const isVisibleOnScreenRef = useRef(true);
  const isTouchDeviceRef = useRef(false);

  // Raw pointer coordinates captured on mouse events (decoupled from layout/render)
  const pointerPosRef = useRef({ pageX: 0, pageY: 0, hasMove: false });
  const cardPosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const tiltRef = useRef(8);
  const rafIdRef = useRef(null);

  // Track touch vs pointer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(hover: none)').matches;
      setIsTouchDevice(isTouch);
      isTouchDeviceRef.current = isTouch;
    }
  }, []);

  // Update cached geometry without triggering layout thrashing in hot loops
  const updateGeometry = useCallback(() => {
    if (!panelRef.current || !listRef.current) return;
    const pRect = panelRef.current.getBoundingClientRect();
    const lRect = listRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // Check row heights from DOM if rendered
    const rows = listRef.current.querySelectorAll('.outcomes-row');
    let measuredColH = 71;
    let measuredActH = 104;
    if (rows.length >= 2) {
      rows.forEach((row, idx) => {
        const h = row.offsetHeight;
        if (h > 0) {
          if (idx === activeIndexRef.current) {
            measuredActH = h;
          } else {
            measuredColH = h;
          }
        }
      });
    }

    geometryRef.current = {
      colH: measuredColH,
      actH: measuredActH,
      panelPageX: pRect.left + scrollX,
      panelPageY: pRect.top + scrollY,
      panelWidth: pRect.width,
      listPageX: lRect.left + scrollX,
      listPageY: lRect.top + scrollY,
      listWidth: lRect.width,
    };
  }, []);

  // ResizeObserver + passive scroll listener to update cached geometry
  useEffect(() => {
    updateGeometry();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && panelRef.current) {
      ro = new ResizeObserver(() => {
        updateGeometry();
      });
      ro.observe(panelRef.current);
      if (listRef.current) ro.observe(listRef.current);
    }

    const handleScroll = () => {
      // Re-anchor cached page positions if document layout shifts
      if (isVisibleOnScreenRef.current && panelRef.current && listRef.current) {
        const pRect = panelRef.current.getBoundingClientRect();
        const lRect = listRef.current.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset || 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        geometryRef.current.panelPageX = pRect.left + scrollX;
        geometryRef.current.panelPageY = pRect.top + scrollY;
        geometryRef.current.listPageX = lRect.left + scrollX;
        geometryRef.current.listPageY = lRect.top + scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateGeometry, { passive: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateGeometry);
    }

    return () => {
      ro?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateGeometry);
    };
  }, [updateGeometry]);

  // IntersectionObserver: Section does ZERO work when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isIntersecting = entry.isIntersecting;
        isVisibleOnScreenRef.current = isIntersecting;

        if (!isIntersecting) {
          // Off-screen: immediately cancel rAF, clear timers, stop work
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
          if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
          }
        } else {
          // Re-entering viewport: refresh geometry
          updateGeometry();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [updateGeometry]);

  // Compute bar top position from stable mathematical slots
  const barTop = useMemo(() => {
    return activeIndex * geometryRef.current.colH;
  }, [activeIndex]);

  const barHeight = geometryRef.current.actH;

  // Single high-performance rAF loop: executes once per frame
  const updateCardPhysics = useCallback(() => {
    if (!cardRef.current || !isVisibleOnScreenRef.current) {
      rafIdRef.current = null;
      return;
    }

    const geom = geometryRef.current;
    const pageX = pointerPosRef.current.pageX;
    const pageY = pointerPosRef.current.pageY;

    // Relative mouse position within list
    const relX = pageX - geom.listPageX;
    const relY = pageY - geom.listPageY;

    // Hysteresis slot determination (executed inside rAF, never blocking input)
    if (pointerPosRef.current.hasMove && isHoveredRef.current) {
      pointerPosRef.current.hasMove = false;
      const colH = geom.colH;
      const actH = geom.actH;
      const curIdx = activeIndexRef.current;
      const curTop = curIdx * colH;
      const curBottom = curTop + actH;

      // 8px hysteresis buffer to prevent boundary jitter
      const buffer = 8;
      let targetIdx = curIdx;
      if (relY < curTop - buffer) {
        targetIdx = Math.max(0, Math.floor(relY / colH));
      } else if (relY > curBottom + buffer) {
        const deltaH = actH - colH;
        const adjustedY = relY - deltaH;
        targetIdx = Math.min(OUTCOMES_DATA.length - 1, Math.floor(adjustedY / colH));
      }

      if (targetIdx !== curIdx && targetIdx >= 0 && targetIdx < OUTCOMES_DATA.length) {
        activeIndexRef.current = targetIdx;
        setActiveIndex(targetIdx);
      }
    }

    // Anchor card vertically to active row center + subtle mouse Y follow (±12px)
    const colH = geom.colH;
    const actH = geom.actH;
    const rowCenterY = (geom.listPageY - geom.panelPageY) + (activeIndexRef.current * colH) + (actH / 2);
    const mouseYFollow = Math.max(-12, Math.min(12, (relY - (activeIndexRef.current * colH + actH / 2)) * 0.15));
    const targetY = rowCenterY + mouseYFollow;

    // Horizontal target clamped securely inside panel
    const cursorPanelX = pageX - geom.panelPageX;
    const cardHalfWidth = 90;
    const minX = 70 + cardHalfWidth;
    const maxX = (geom.panelWidth || 1200) - 70 - cardHalfWidth;
    const targetX = Math.max(minX, Math.min(maxX, cursorPanelX));

    // Smooth horizontal lerp (0.14)
    const prevX = cardPosRef.current.x;
    const newX = prevX + (targetX - prevX) * 0.14;
    const prevY = cardPosRef.current.y;
    const newY = prevY + (targetY - prevY) * 0.14;

    cardPosRef.current.x = newX;
    cardPosRef.current.y = newY;

    // Velocity-based tilt (+8deg base, up to ±12deg dynamic tilt)
    const vx = newX - prevX;
    const targetTilt = 8 + Math.max(-12, Math.min(12, vx * 0.7));
    tiltRef.current += (targetTilt - tiltRef.current) * 0.12;

    // Direct GPU transform update
    cardRef.current.style.transform = `translate3d(${newX.toFixed(2)}px, ${newY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${tiltRef.current.toFixed(2)}deg)`;

    // Keep loop active only while hovered or settling
    const isMoving = Math.abs(targetX - newX) > 0.15 || Math.abs(targetY - newY) > 0.15 || Math.abs(targetTilt - tiltRef.current) > 0.1;
    if ((isHoveredRef.current || isMoving) && isVisibleOnScreenRef.current) {
      rafIdRef.current = requestAnimationFrame(updateCardPhysics);
    } else {
      rafIdRef.current = null;
    }
  }, []);

  // Helper to trigger rAF loop only when not already spinning
  const startRafIfNeeded = useCallback(() => {
    if (!rafIdRef.current && isVisibleOnScreenRef.current) {
      rafIdRef.current = requestAnimationFrame(updateCardPhysics);
    }
  }, [updateCardPhysics]);

  // Ultra-lightweight pointer move: stores coordinates, does zero layout reads (desktop only)
  const handleListMouseMove = useCallback((e) => {
    if (isTouchDeviceRef.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    pointerPosRef.current.pageX = e.pageX;
    pointerPosRef.current.pageY = e.pageY;
    pointerPosRef.current.hasMove = true;

    startRafIfNeeded();
  }, [startRafIfNeeded]);

  const handlePointerEnter = useCallback((e) => {
    if (isTouchDeviceRef.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;
    setIsHovered(true);
    isHoveredRef.current = true;

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    pointerPosRef.current.pageX = e.pageX;
    pointerPosRef.current.pageY = e.pageY;
    pointerPosRef.current.hasMove = true;

    // Initialize card position at cursor entry
    const geom = geometryRef.current;
    const initX = e.pageX - geom.panelPageX;
    const colH = geom.colH;
    const actH = geom.actH;
    const initY = (geom.listPageY - geom.panelPageY) + (activeIndexRef.current * colH) + (actH / 2);
    cardPosRef.current = { x: initX, y: initY, targetX: initX, targetY: initY };

    startRafIfNeeded();
  }, [startRafIfNeeded]);

  const handlePointerLeave = useCallback(() => {
    if (isTouchDeviceRef.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;
    setIsHovered(false);
    isHoveredRef.current = false;

    // After 150ms return to row 0 (desktop only)
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveIndex(0);
      activeIndexRef.current = 0;
    }, 150);
  }, []);

  // Keyboard navigation
  const handleRowClick = (idx) => {
    setActiveIndex(idx);
    activeIndexRef.current = idx;
  };

  const handleRowKeyDown = (e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(idx);
      activeIndexRef.current = idx;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % OUTCOMES_DATA.length;
      setActiveIndex(next);
      activeIndexRef.current = next;
      const nextEl = listRef.current?.querySelectorAll('.outcomes-row')[next];
      nextEl?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + OUTCOMES_DATA.length) % OUTCOMES_DATA.length;
      setActiveIndex(prev);
      activeIndexRef.current = prev;
      const prevEl = listRef.current?.querySelectorAll('.outcomes-row')[prev];
      prevEl?.focus();
    }
  };

  // Pre-decode next image when row becomes active (only when images exist)
  useEffect(() => {
    if (HAS_OUTCOMES_IMAGES && typeof window !== 'undefined') {
      const activeItem = OUTCOMES_DATA[activeIndex];
      if (activeItem?.image) {
        const preImg = new window.Image();
        preImg.src = activeItem.image;
        if (preImg.decode) {
          preImg.decode().catch(() => {});
        }
      }
    }
  }, [activeIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="outcomes"
      className="outcomes-section container"
      aria-label="Service Outcomes"
    >
      <div ref={panelRef} className="outcomes-panel">
        {/* Floating Tilted Image Card */}
        <div
          ref={cardRef}
          className={`outcomes-floating-card ${isHovered && !isTouchDevice ? 'is-visible' : ''}`}
          aria-hidden="true"
        >
          {OUTCOMES_DATA.map((item, idx) => {
            const isCardActive = idx === activeIndex;
            return (
              <div
                key={item.id}
                className={`outcomes-card-layer ${isCardActive ? 'is-active' : ''}`}
              >
                {HAS_OUTCOMES_IMAGES ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="220px"
                    className="outcomes-card-img"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="outcomes-card-placeholder" />
                )}
              </div>
            );
          })}
        </div>

        {/* Top Area */}
        <div className="outcomes-top-area">
          <div className="outcomes-top-left">
            <span className="outcomes-label">But what all this do?</span>
          </div>

          <div className="outcomes-top-right">
            <p className="outcomes-lead-paragraph">
              From getting your brand in front of the right audience to turning
              attention into action, we make every marketing touchpoint count.
            </p>
            <div className="outcomes-action-row">
              <Link
                href="/contact"
                className="outcomes-round-btn clickable"
                aria-label="Work With Me"
              >
                <UpRightArrow size={14} stroke="#333943" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* List of Outcomes */}
        <div
          ref={listRef}
          className="outcomes-list"
          role="list"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handleListMouseMove}
        >
          {/* Gliding Purple Highlight Bar */}
          <div
            className="outcomes-highlight-bar"
            style={{
              transform: `translate3d(0, ${barTop}px, 0)`,
              height: `${barHeight}px`,
            }}
            aria-hidden="true"
          />

          {OUTCOMES_DATA.map((item, idx) => {
            const isActive = idx === activeIndex;
            // Divider lines above and below the active row fade out
            const isDividerAboveActive = idx === activeIndex;
            const isDividerBelowActive = idx === activeIndex + 1;
            const hideDivider = isDividerAboveActive || isDividerBelowActive;

            return (
              <React.Fragment key={item.id}>
                {idx > 0 && (
                  <div
                    className={`outcomes-divider ${hideDivider ? 'is-hidden' : ''}`}
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`outcomes-row ${isActive ? 'is-active' : ''}`}
                  tabIndex={0}
                  role="listitem"
                  aria-expanded={isActive}
                  aria-label={`${item.title}. ${isActive ? `Tags: ${item.pills.join(', ')}` : ''}`}
                  onClick={() => handleRowClick(idx)}
                  onKeyDown={(e) => handleRowKeyDown(e, idx)}
                >
                  <div className="outcomes-row-left">
                    <h3 className="outcomes-row-title">{item.title}</h3>
                    <div className="outcomes-row-pills-wrapper">
                      <div className="outcomes-row-pills-inner">
                        {item.pills.map((pill, pIdx) => (
                          <span
                            key={pill}
                            className="outcomes-pill"
                            style={{ '--pill-idx': pIdx }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="outcomes-row-right">
                    {/* Inactive plain arrow */}
                    <div className="outcomes-arrow-inactive" aria-hidden="true">
                      <UpRightArrow size={24} stroke="#ffffff" strokeWidth={2.2} />
                    </div>

                    {/* Active Lime Circle (#F0FE8C) with navy arrow */}
                    <div className="outcomes-arrow-active" aria-hidden="true">
                      <UpRightArrow size={24} stroke="#333943" strokeWidth={2.4} />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
