'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Detect touch-only / coarse pointer devices (e.g. mobile phones, iPads)
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchOnly) return undefined;

    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    let targetX = -100;
    let targetY = -100;
    let isVisible = false;
    let isHoveringInteractive = false;
    let isHiddenByInput = false;
    let isPressed = false;
    let rafId: number | null = null;

    // Smooth transform update via rAF
    const render = () => {
      if (isVisible && !isHiddenByInput) {
        const scale = isPressed ? 0.72 : isHoveringInteractive ? 0.82 : 1;
        cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${scale})`;
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.classList.add('cursor--visible');
        document.body.classList.add('has-custom-cursor');
      }

      // Check element under pointer
      const target = e.target;
      if (target instanceof Element && target.closest) {
        // If hovering text input, textarea, or contenteditable, show native text I-beam
        const isTextInput = Boolean(
          target.closest(
            'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'
          )
        );

        if (isTextInput) {
          if (!isHiddenByInput) {
            isHiddenByInput = true;
            cursor.classList.add('cursor--hidden');
          }
        } else {
          if (isHiddenByInput) {
            isHiddenByInput = false;
            cursor.classList.remove('cursor--hidden');
          }

          // Check if hovering clickable/interactive element
          const isInteractive = Boolean(
            target.closest(
              'a, button, .clickable, [role="button"], input[type="submit"], input[type="button"], select, summary'
            )
          );
          if (isInteractive !== isHoveringInteractive) {
            isHoveringInteractive = isInteractive;
            if (isInteractive) {
              cursor.classList.add('cursor--hover');
            } else {
              cursor.classList.remove('cursor--hover');
            }
          }
        }
      }
    };

    const onMouseDown = () => {
      isPressed = true;
      cursor.classList.add('cursor--pressed');
    };

    const onMouseUp = () => {
      isPressed = false;
      cursor.classList.remove('cursor--pressed');
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.classList.remove('cursor--visible');
      document.body.classList.remove('has-custom-cursor');
    };

    const onMouseEnter = () => {
      isVisible = true;
      cursor.classList.add('cursor--visible');
      document.body.classList.add('has-custom-cursor');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/cursor.svg" alt="" draggable={false} />
    </div>
  );
}
