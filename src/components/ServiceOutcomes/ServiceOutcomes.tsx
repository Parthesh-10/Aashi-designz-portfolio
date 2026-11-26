'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import { OUTCOMES_DATA, HAS_OUTCOMES_IMAGES } from '@/constant/outcomes';
import type { CSSPropertiesWithVars } from '@/types/css';

function UpRightArrow({
  className = '',
  stroke = 'currentColor',
  strokeWidth = 2,
  size = 20,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  size?: number;
}) {
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

  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const [barGeometry, setBarGeometry] = useState({ colH: 71, actH: 104 });

  const activeIndexRef = useRef(0);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const isHoveredRef = useRef(false);
  const isVisibleOnScreenRef = useRef(true);
  const isTouchDeviceRef = useRef(false);

  const pointerPosRef = useRef({ pageX: 0, pageY: 0, hasMove: false });
  const cardPosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const tiltRef = useRef(8);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(hover: none)').matches;
      isTouchDeviceRef.current = isTouch;
      const rafId = requestAnimationFrame(() => setIsTouchDevice(isTouch));
      return () => cancelAnimationFrame(rafId);
    }
    return undefined;
  }, []);

  const updateGeometry = useCallback(() => {
    if (!panelRef.current || !listRef.current) return;
    const pRect = panelRef.current.getBoundingClientRect();
    const lRect = listRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    const rows = listRef.current.querySelectorAll<HTMLElement>('.outcomes-row');
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
    setBarGeometry((prev) =>
      prev.colH === measuredColH && prev.actH === measuredActH
        ? prev
        : { colH: measuredColH, actH: measuredActH }
    );
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(updateGeometry);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && panelRef.current) {
      ro = new ResizeObserver(() => {
        updateGeometry();
      });
      ro.observe(panelRef.current);
      if (listRef.current) ro.observe(listRef.current);
    }

    const handleScroll = () => {
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
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateGeometry);
    };
  }, [updateGeometry]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isIntersecting = entry.isIntersecting;
        isVisibleOnScreenRef.current = isIntersecting;

        if (!isIntersecting) {
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
          if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
          }
        } else {
          updateGeometry();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [updateGeometry]);

  const barTop = useMemo(() => {
    return activeIndex * barGeometry.colH;
  }, [activeIndex, barGeometry.colH]);

  const barHeight = barGeometry.actH;

  const updateCardPhysicsRef = useRef<() => void>(() => {});

  const updateCardPhysics = useCallback(() => {
    if (!cardRef.current || !isVisibleOnScreenRef.current) {
      rafIdRef.current = null;
      return;
    }

    const geom = geometryRef.current;
    const pageX = pointerPosRef.current.pageX;
    const pageY = pointerPosRef.current.pageY;

    const relY = pageY - geom.listPageY;

    if (pointerPosRef.current.hasMove && isHoveredRef.current) {
      pointerPosRef.current.hasMove = false;
      const colH = geom.colH;
      const actH = geom.actH;
      const curIdx = activeIndexRef.current;
      const curTop = curIdx * colH;
      const curBottom = curTop + actH;

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

    const colH = geom.colH;
    const actH = geom.actH;
    const rowCenterY = (geom.listPageY - geom.panelPageY) + activeIndexRef.current * colH + actH / 2;
    const mouseYFollow = Math.max(-12, Math.min(12, (relY - (activeIndexRef.current * colH + actH / 2)) * 0.15));
    const targetY = rowCenterY + mouseYFollow;

    const cursorPanelX = pageX - geom.panelPageX;
    const cardHalfWidth = 90;
    const minX = 70 + cardHalfWidth;
    const maxX = (geom.panelWidth || 1200) - 70 - cardHalfWidth;
    const targetX = Math.max(minX, Math.min(maxX, cursorPanelX));

    const prevX = cardPosRef.current.x;
    const newX = prevX + (targetX - prevX) * 0.14;
    const prevY = cardPosRef.current.y;
    const newY = prevY + (targetY - prevY) * 0.14;

    cardPosRef.current.x = newX;
    cardPosRef.current.y = newY;

    const vx = newX - prevX;
    const targetTilt = 8 + Math.max(-12, Math.min(12, vx * 0.7));
    tiltRef.current += (targetTilt - tiltRef.current) * 0.12;

    cardRef.current.style.transform = `translate3d(${newX.toFixed(2)}px, ${newY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${tiltRef.current.toFixed(2)}deg)`;

    const isMoving =
      Math.abs(targetX - newX) > 0.15 ||
      Math.abs(targetY - newY) > 0.15 ||
      Math.abs(targetTilt - tiltRef.current) > 0.1;
    if ((isHoveredRef.current || isMoving) && isVisibleOnScreenRef.current) {
      rafIdRef.current = requestAnimationFrame(() => updateCardPhysicsRef.current());
    } else {
      rafIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    updateCardPhysicsRef.current = updateCardPhysics;
  }, [updateCardPhysics]);

  const startRafIfNeeded = useCallback(() => {
    if (!rafIdRef.current && isVisibleOnScreenRef.current) {
      rafIdRef.current = requestAnimationFrame(updateCardPhysics);
    }
  }, [updateCardPhysics]);

  const handleListMouseMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isTouchDeviceRef.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;

      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      pointerPosRef.current.pageX = e.pageX;
      pointerPosRef.current.pageY = e.pageY;
      pointerPosRef.current.hasMove = true;

      startRafIfNeeded();
    },
    [startRafIfNeeded]
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
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

      const geom = geometryRef.current;
      const initX = e.pageX - geom.panelPageX;
      const colH = geom.colH;
      const actH = geom.actH;
      const initY = (geom.listPageY - geom.panelPageY) + activeIndexRef.current * colH + actH / 2;
      cardPosRef.current = { x: initX, y: initY, targetX: initX, targetY: initY };

      startRafIfNeeded();
    },
    [startRafIfNeeded]
  );

  const handlePointerLeave = useCallback(() => {
    if (isTouchDeviceRef.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;
    setIsHovered(false);
    isHoveredRef.current = false;

    leaveTimeoutRef.current = setTimeout(() => {
      setActiveIndex(0);
      activeIndexRef.current = 0;
    }, 150);
  }, []);

  const handleRowClick = (idx: number) => {
    setActiveIndex(idx);
    activeIndexRef.current = idx;
  };

  const handleRowKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(idx);
      activeIndexRef.current = idx;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % OUTCOMES_DATA.length;
      setActiveIndex(next);
      activeIndexRef.current = next;
      const nextEl = listRef.current?.querySelectorAll<HTMLElement>('.outcomes-row')[next];
      nextEl?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + OUTCOMES_DATA.length) % OUTCOMES_DATA.length;
      setActiveIndex(prev);
      activeIndexRef.current = prev;
      const prevEl = listRef.current?.querySelectorAll<HTMLElement>('.outcomes-row')[prev];
      prevEl?.focus();
    }
  };

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
    <PageContainer
      as="section"
      ref={sectionRef}
      id="outcomes"
      className="outcomes-section !mx-auto !w-full !px-6 md:!px-12 xl:!px-[min(10.4vw,200px)]"
      aria-label="Service Outcomes"
    >
      <div ref={panelRef} className="outcomes-panel w-full">
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

        <div
          ref={listRef}
          className="outcomes-list"
          role="list"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handleListMouseMove}
        >
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
                        {item.pills.map((pill, pIdx) => {
                          const pillStyle: CSSPropertiesWithVars = { '--pill-idx': pIdx };
                          return (
                            <span key={pill} className="outcomes-pill" style={pillStyle}>
                              {pill}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="outcomes-row-right">
                    <div className="outcomes-arrow-inactive" aria-hidden="true">
                      <UpRightArrow size={24} stroke="#ffffff" strokeWidth={2.2} />
                    </div>
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
    </PageContainer>
  );
}
