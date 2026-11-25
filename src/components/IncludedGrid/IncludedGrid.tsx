'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface IncludedTile {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  alt: string;
  href?: string;
  objectPosition?: string;
  blurDataURL?: string;
}

export interface IncludedGridRow {
  row: number;
  tiles: IncludedTile[];
}

export const DEFAULT_INCLUDED_GRID: IncludedGridRow[] = [
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

export interface IncludedGridProps {
  data?: IncludedGridRow[];
}

export default function IncludedGrid({ data = DEFAULT_INCLUDED_GRID }: IncludedGridProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

  const handlePointerEnterTile = useCallback(
    (rowIndex: number, tileIndex: number, e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'touch') return;
      setHovered({ row: rowIndex, col: tileIndex });
    },
    []
  );

  const handleFocusTile = useCallback((rowIndex: number, tileIndex: number) => {
    setHovered({ row: rowIndex, col: tileIndex });
  }, []);

  const handlePointerLeaveGrid = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    setHovered(null);
  }, []);

  const handleBlurGrid = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
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
              const tileHref = tile.href;

              const innerContent = (
                <>
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    quality={88}
                    loading="lazy"
                    className="included-tile-img"
                    style={tile.objectPosition ? { objectPosition: tile.objectPosition } : undefined}
                    placeholder={tile.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={tile.blurDataURL}
                  />
                  <div className="included-tile-gradient" aria-hidden="true" />
                  <div className="included-tile-content">
                    <h3 className="included-tile-title">{tile.title}</h3>
                    {tile.subtitle ? (
                      <p className="included-tile-subtitle">{tile.subtitle}</p>
                    ) : null}
                  </div>
                </>
              );

              if (tileHref) {
                return (
                  <Link
                    key={tile.id || `tile-${tileIndex}`}
                    href={tileHref}
                    className="included-tile"
                    data-hovered={isTileHovered ? 'true' : 'false'}
                    aria-label={tile.title}
                    onPointerEnter={(e) => handlePointerEnterTile(rowIndex, tileIndex, e)}
                    onFocus={() => handleFocusTile(rowIndex, tileIndex)}
                  >
                    {innerContent}
                  </Link>
                );
              }

              return (
                <div
                  key={tile.id || `tile-${tileIndex}`}
                  tabIndex={0}
                  role="button"
                  className="included-tile"
                  data-hovered={isTileHovered ? 'true' : 'false'}
                  aria-label={tile.title}
                  onPointerEnter={(e) => handlePointerEnterTile(rowIndex, tileIndex, e)}
                  onFocus={() => handleFocusTile(rowIndex, tileIndex)}
                >
                  {innerContent}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
