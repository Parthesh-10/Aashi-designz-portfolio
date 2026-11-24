'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './IncludedGrid.css';

export const DEFAULT_INCLUDED_GRID = [
  {
    row: 1,
    tiles: [
      {
        id: 'tile-01',
        image: '/edits/included/included-01.webp',
        title: 'Posters & Creatives',
        subtitle: 'Scroll-stopping promos',
        alt: 'Burger poster design in a restaurant lightbox',
        href: undefined,
        objectPosition: 'center 20%',
      },
      {
        id: 'tile-02',
        image: '/edits/included/included-02.webp',
        title: 'Menu Design',
        subtitle: 'Menus guests remember',
        alt: 'Printed checkered menu held at a restaurant table',
        href: undefined,
        objectPosition: 'center',
      },
      {
        id: 'tile-03',
        image: '/edits/included/included-03.webp',
        title: 'Digital Screens',
        subtitle: 'Displays that sell',
        alt: 'Burger menu displayed on a wall-mounted screen',
        href: undefined,
        objectPosition: 'center',
      },
    ],
  },
  {
    row: 2,
    tiles: [
      {
        id: 'tile-04',
        image: '/edits/included/included-04.webp',
        title: 'Illustration',
        subtitle: 'Custom artwork for your brand',
        alt: 'Portrait photo mixed with illustrated artwork',
        href: undefined,
        objectPosition: 'center',
      },
      {
        id: 'tile-05',
        image: '/edits/included/included-05.webp',
        title: 'Video Editing',
        subtitle: 'Reels with a rhythm',
        alt: 'Video editing timeline on a monitor',
        href: undefined,
        objectPosition: 'center',
      },
      {
        id: 'tile-06',
        image: '/edits/included/included-06.webp',
        title: 'Thumbnails',
        subtitle: 'Clicks, earned',
        alt: 'Bold YouTube thumbnail design',
        href: undefined,
        objectPosition: 'center 40%',
      },
    ],
  },
];

export default function IncludedGrid({ data = DEFAULT_INCLUDED_GRID }) {
  // Single grid-level hover state: { row: number, col: number } | null
  // In rest state (null): 2 equal rows, 3 equal columns per row, no titles
  const [hovered, setHovered] = useState(null);

  const handlePointerEnterTile = useCallback((rowIndex, tileIndex, e) => {
    // Mouse/fine pointer only: ignore touch pointers to preserve native mobile touch flow
    if (e.pointerType === 'touch') return;
    setHovered({ row: rowIndex, col: tileIndex });
  }, []);

  const handleFocusTile = useCallback((rowIndex, tileIndex) => {
    setHovered({ row: rowIndex, col: tileIndex });
  }, []);

  const handlePointerLeaveGrid = useCallback((e) => {
    // Mouse/fine pointer only: ignore touch pointers
    if (e.pointerType === 'touch') return;
    setHovered(null);
  }, []);

  const handleBlurGrid = useCallback((e) => {
    // Return to rest state ONLY when focus leaves the entire grid container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setHovered(null);
    }
  }, []);

  if (!data || data.length === 0) return null;

  return (
    <div
      className="included-grid-container"
      role="region"
      aria-label="Included services grid"
      onPointerLeave={handlePointerLeaveGrid}
      onBlur={handleBlurGrid}
    >
      {data.map((rowItem, rowIndex) => {
        const isRowHovered = hovered?.row === rowIndex;

        return (
          <div
            key={`row-${rowIndex}`}
            className="included-grid-row"
            data-hovered={isRowHovered ? 'true' : 'false'}
          >
            {rowItem.tiles.map((tile, tileIndex) => {
              const isTileHovered = isRowHovered && hovered?.col === tileIndex;
              const hasLink = Boolean(tile.href);
              const Tag = hasLink ? Link : 'div';
              const linkProps = hasLink
                ? { href: tile.href }
                : { tabIndex: 0, role: 'button' };

              return (
                <Tag
                  key={tile.id || `tile-${tileIndex}`}
                  {...linkProps}
                  className="included-tile"
                  data-hovered={isTileHovered ? 'true' : 'false'}
                  aria-label={tile.title}
                  onPointerEnter={(e) => handlePointerEnterTile(rowIndex, tileIndex, e)}
                  onFocus={() => handleFocusTile(rowIndex, tileIndex)}
                >
                  {/* Image fills tile directly; zooms and refits smoothly as tile expands/contracts */}
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    quality={88}
                    loading="lazy"
                    className="included-tile-img"
                    style={tile.objectPosition ? { objectPosition: tile.objectPosition } : undefined}
                  />

                  {/* Soft dark gradient for readability on hovered tile */}
                  <div className="included-tile-gradient" aria-hidden="true" />

                  {/* Text block: title and subtitle centered at bottom of hovered tile */}
                  <div className="included-tile-content">
                    <h3 className="included-tile-title">{tile.title}</h3>
                    <p className="included-tile-subtitle">{tile.subtitle}</p>
                  </div>
                </Tag>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
