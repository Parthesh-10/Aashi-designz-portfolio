'use client';

import { useEffect, useRef, useState } from 'react';
import './TiltedCard.css';

const FLIP_THRESHOLD = 6;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const parseColor = (value) => {
  const text = String(value || '').trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const full = hex[1].length === 3 ? hex[1].replace(/./g, (digit) => digit + digit) : hex[1];
    return [0, 2, 4].map((index) => parseInt(full.slice(index, index + 2), 16));
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(text);
  if (rgb) return [rgb[1], rgb[2], rgb[3]].map((channel) => clamp(Math.round(parseFloat(channel)), 0, 255));
  return null;
};

const toLength = (value) => (typeof value === 'number' ? `${value}px` : value);

const smoother = (t) => {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

const step = (state, key, target, omega, zeta, dt) => {
  const velocity = `v${key}`;
  const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
  const h = dt / steps;
  for (let index = 0; index < steps; index++) {
    state[velocity] += (omega * omega * (target - state[key]) - 2 * zeta * omega * state[velocity]) * h;
    state[key] += state[velocity] * h;
  }
  const settled = Math.abs(target - state[key]) < 0.001 && Math.abs(state[velocity]) < 0.01;
  if (settled) {
    state[key] = target;
    state[velocity] = 0;
  }
  return !settled;
};

export default function TiltedCard({
  children,
  backContent = null,
  containerHeight = '210px',
  containerWidth = '100%',
  scaleOnHover = 1.03,
  rotateAmplitude = 12,
  flipOnClick = false,
  flipOnHover = true,
  flipped,
  onFlip,
  radius = 12,
  perspective = 900,
  smoothness = 0.6,
  glare = 0.35,
  glareColor = '#ffffff',
  shadow = 0.45,
  axis = 'both',
  reverse = false,
  onClick,
  className = '',
  style,
  ariaLabel = 'Interactive card',
}) {
  const figureRef = useRef(null);
  const bodyRef = useRef(null);
  const shadowRef = useRef(null);
  const wakeRef = useRef(null);
  const flipRef = useRef(null);
  const [innerFlipped, setInnerFlipped] = useState(false);
  const controlled = typeof flipped === 'boolean';
  const isFlipped = Boolean(backContent) && (controlled ? flipped : innerFlipped);

  const settings = {
    amplitude: clamp(rotateAmplitude, 0, 45),
    scale: Math.max(0.5, scaleOnHover),
    smoothness: clamp(smoothness, 0, 1),
    glare: clamp(glare, 0, 1),
    shadow: clamp(shadow, 0, 1),
    axis,
    reverse,
    flipOnClick,
    flipOnHover,
    flippable: Boolean(backContent) && (flipOnClick || flipOnHover),
    interactive: (Boolean(backContent) && (flipOnClick || flipOnHover)) || Boolean(onClick),
    flipped: isFlipped,
    controlled,
    onFlip,
  };
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });

  useEffect(() => {
    const figure = figureRef.current;
    const body = bodyRef.current;
    if (!figure || !body) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const state = {
      rx: 0,
      vrx: 0,
      ry: 0,
      vry: 0,
      lift: 0,
      vlift: 0,
      ty: 0,
      vty: 0,
      flip: 0,
      vflip: 0,
      press: 0,
      vpress: 0,
      hoverFlipped: false,
    };

    const pointer = { nx: 0, ny: 0, x: 0, y: 0, inside: false, mouse: false, last: 0 };
    const press = { active: false, x: 0, y: 0, moved: false };
    let opacity = 1;
    let time = 0;
    let focused = false;
    let raf = 0;
    let last = 0;
    let visible = true;

    const frame = (now) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = clamp((now - last) / 1000 || 0, 0, 0.05);
      last = Math.max(last, now);
      time += dt;
      let busy = false;

      // Disable tilt completely on touch/coarse devices or reduced-motion
      const amplitude = coarse || reduced ? 0 : s.amplitude;
      const hovering = pointer.inside && pointer.mouse && !coarse;
      const following = hovering;

      let inputX = 0;
      let inputY = 0;
      if (following) {
        inputX = pointer.nx;
        inputY = pointer.ny;
      }

      if (s.axis === 'horizontal') inputY = 0;
      if (s.axis === 'vertical') inputX = 0;
      const sign = s.reverse ? -1 : 1;

      const omega = 20 * Math.pow(0.2, s.smoothness);
      const zeta = 1 - 0.3 * s.smoothness;
      const lifted = hovering || focused ? 1 : 0;

      busy = step(state, 'rx', -inputY * amplitude * sign, omega, zeta, dt) || busy;
      busy = step(state, 'ry', inputX * amplitude * sign, omega, zeta, dt) || busy;
      busy = step(state, 'lift', lifted, omega, Math.max(zeta, 0.85), dt) || busy;
      // Flip around X axis (vertical flip)
      const targetFlip = (s.flipped || (s.flipOnHover && state.hoverFlipped)) ? 180 : 0;
      busy = step(state, 'flip', targetFlip, reduced ? 24 : 9.5, 0.72, dt) || busy;
      busy = step(state, 'press', press.active && !press.moved && s.interactive ? 1 : 0, 26, 0.8, dt) || busy;

      const active = lifted > 0 || state.lift > 0.01;
      if (active !== figure.hasAttribute('data-active')) figure.toggleAttribute('data-active', active);
      const scale = 1 + (s.scale - 1) * state.lift - 0.015 * state.press;
      const rx = state.rx;
      const ry = state.ry;

      // Vertical flip: state.flip is added to rotateX
      body.style.transform = `translate3d(0, 0, 0) rotateX(${(rx + state.flip).toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scale(${scale.toFixed(4)})`;

      const reach = Math.max(amplitude, 1);
      body.style.setProperty('--tc-gx', `${(50 + (ry / reach) * 46).toFixed(2)}%`);
      body.style.setProperty('--tc-gy', `${(50 - (rx / reach) * 46).toFixed(2)}%`);
      const energy = Math.min(1, Math.hypot(rx, ry) / reach);
      body.style.setProperty(
        '--tc-glare',
        (s.glare * Math.max(state.lift, energy) * (opacity < 1 ? smoother(opacity) : 1)).toFixed(3)
      );

      const shade = shadowRef.current;
      if (shade) {
        const strength = s.shadow * (opacity < 1 ? smoother(opacity) : 1);
        const offsetX = -Math.sin((ry * Math.PI) / 180) * 16;
        const offsetY = 8 + 12 * state.lift + Math.sin((rx * Math.PI) / 180) * 14;
        const turn = Math.abs(Math.cos((state.flip * Math.PI) / 180));
        const spread = scale * (0.9 + 0.04 * state.lift);
        // Vertical flip: turn affects Y-scale of shadow
        shade.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) scale(${spread.toFixed(4)}, ${(spread * (0.25 + 0.75 * turn)).toFixed(4)})`;
        shade.style.opacity = (strength * (0.6 + 0.4 * state.lift)).toFixed(3);
      }

      if (busy && visible) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    const locate = (event) => {
      const rect = figure.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        width: Math.max(1, rect.width),
        height: Math.max(1, rect.height),
      };
    };

    const track = (event) => {
      const spot = locate(event);
      pointer.x = spot.x;
      pointer.y = spot.y;
      pointer.nx = clamp((spot.x - spot.width / 2) / (spot.width / 2), -1, 1);
      pointer.ny = clamp((spot.y - spot.height / 2) / (spot.height / 2), -1, 1);
    };

    const onEnter = (event) => {
      pointer.inside = true;
      pointer.mouse = event.pointerType === 'mouse' || event.pointerType === 'pen';
      track(event);
      if (settingsRef.current.flipOnHover && pointer.mouse) {
        state.hoverFlipped = true;
        if (!settingsRef.current.controlled) setInnerFlipped(true);
        settingsRef.current.onFlip?.(true);
      }
      wake();
    };

    const onMove = (event) => {
      pointer.mouse = event.pointerType === 'mouse' || event.pointerType === 'pen';
      if (!pointer.inside && pointer.mouse) {
        pointer.inside = true;
        if (settingsRef.current.flipOnHover) {
          state.hoverFlipped = true;
          if (!settingsRef.current.controlled) setInnerFlipped(true);
          settingsRef.current.onFlip?.(true);
        }
      }
      track(event);
      if (press.active && Math.hypot(event.clientX - press.x, event.clientY - press.y) > FLIP_THRESHOLD) {
        press.moved = true;
      }
      wake();
    };

    const onLeave = () => {
      pointer.inside = false;
      if (settingsRef.current.flipOnHover) {
        state.hoverFlipped = false;
        if (!settingsRef.current.controlled) setInnerFlipped(false);
        settingsRef.current.onFlip?.(false);
      }
      wake();
    };

    const onDown = (event) => {
      press.active = true;
      press.moved = false;
      press.x = event.clientX;
      press.y = event.clientY;
      pointer.mouse = event.pointerType === 'mouse' || event.pointerType === 'pen';
      if (!pointer.mouse) {
        pointer.inside = true;
        track(event);
      }
      try {
        figure.setPointerCapture(event.pointerId);
      } catch {}
      wake();
    };

    const onUp = (event) => {
      if (!press.active) return;
      press.active = false;
      try {
        figure.releasePointerCapture(event.pointerId);
      } catch {}
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
        pointer.inside = false;
      }
      wake();
    };

    const onCancel = (event) => {
      press.active = false;
      press.moved = true;
      try {
        figure.releasePointerCapture(event.pointerId);
      } catch {}
      pointer.inside = false;
      wake();
    };

    flipRef.current = () => {
      return !press.moved;
    };

    const onFocus = () => {
      focused = figure.matches(':focus-visible');
      if (settingsRef.current.flipOnHover && focused) {
        state.hoverFlipped = true;
        if (!settingsRef.current.controlled) setInnerFlipped(true);
        settingsRef.current.onFlip?.(true);
      }
      wake();
    };
    const onBlur = () => {
      focused = false;
      if (settingsRef.current.flipOnHover) {
        state.hoverFlipped = false;
        if (!settingsRef.current.controlled) setInnerFlipped(false);
        settingsRef.current.onFlip?.(false);
      }
      wake();
    };

    // Attach listeners exclusively to figure (no global window/document move listeners)
    figure.addEventListener('pointerenter', onEnter);
    figure.addEventListener('pointermove', onMove);
    figure.addEventListener('pointerleave', onLeave);
    figure.addEventListener('pointerdown', onDown);
    figure.addEventListener('pointerup', onUp);
    figure.addEventListener('pointercancel', onCancel);
    figure.addEventListener('focus', onFocus);
    figure.addEventListener('blur', onBlur);

    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      wake();
    });
    observer.observe(figure);

    wake();

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      flipRef.current = null;
      observer.disconnect();
      figure.removeEventListener('pointerenter', onEnter);
      figure.removeEventListener('pointermove', onMove);
      figure.removeEventListener('pointerleave', onLeave);
      figure.removeEventListener('pointerdown', onDown);
      figure.removeEventListener('pointerup', onUp);
      figure.removeEventListener('pointercancel', onCancel);
      figure.removeEventListener('focus', onFocus);
      figure.removeEventListener('blur', onBlur);
    };
  }, []);

  const flippable = Boolean(backContent) && (flipOnClick || flipOnHover);
  const interactive = flippable || Boolean(onClick);

  const toggle = () => {
    const next = !isFlipped;
    if (!controlled) setInnerFlipped(next);
    onFlip?.(next);
  };

  const activate = (event) => {
    if (flipRef.current && !flipRef.current()) return;
    if (flippable && flipOnClick) toggle();
    onClick?.(event);
  };

  const onKeyDown = (event) => {
    if (!interactive || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    if (flippable) toggle();
    onClick?.(event);
  };

  const corner = toLength(radius);
  const glareRgb = (parseColor(glareColor) || [255, 255, 255]).join(', ');

  return (
    <figure
      ref={figureRef}
      className={`tilted-card ${className}`.trim()}
      style={{
        width: toLength(containerWidth),
        height: toLength(containerHeight),
        perspective: toLength(perspective),
        ...style,
      }}
      data-interactive={interactive ? '' : undefined}
      data-flipped={isFlipped ? '' : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      aria-pressed={flippable ? isFlipped : undefined}
      aria-label={ariaLabel}
      onClick={interactive ? activate : undefined}
      onKeyDown={onKeyDown}
    >
      <div
        ref={shadowRef}
        className="tilted-card__shadow"
        aria-hidden="true"
        style={{ width: '100%', height: '100%', borderRadius: corner }}
      />
      <div
        ref={bodyRef}
        className="tilted-card__body"
        style={{
          width: '100%',
          height: '100%',
          '--tc-radius': corner,
          '--tc-glare-rgb': glareRgb,
        }}
      >
        <div className="tilted-card__face tilted-card__front">
          {children}
          <span className="tilted-card__glare" aria-hidden="true" />
          <span className="tilted-card__rim" aria-hidden="true" />
          <span className="tilted-card__edge" aria-hidden="true" />
        </div>
        {backContent && (
          <div className="tilted-card__face tilted-card__back" aria-hidden={!isFlipped}>
            {backContent}
            <span className="tilted-card__glare" aria-hidden="true" />
            <span className="tilted-card__rim" aria-hidden="true" />
            <span className="tilted-card__edge" aria-hidden="true" />
          </div>
        )}
      </div>
    </figure>
  );
}
