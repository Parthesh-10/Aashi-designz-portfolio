import type React from 'react';

declare module '*.css' {}

/**
 * Shared style helper type permitting CSS custom properties (`--*`)
 * alongside standard React.CSSProperties without resorting to `any`.
 */
export type CSSPropertiesWithVars = React.CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};
