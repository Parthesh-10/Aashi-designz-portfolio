'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { CategoryItem } from '@/constant/categoryData';
import type { CSSPropertiesWithVars } from '@/types/css';

export interface FolderCardItem {
  src: string;
  alt: string;
  link: string;
  hasBadge?: boolean;
}

export interface FolderCategory {
  id: string;
  title: string;
  colorName: string;
  hex: string;
  backStart: string;
  backEnd: string;
  frontBg: string;
  frontStart: string;
  frontEnd: string;
  shadow: string;
  rim: string;
  textShadow: string;
  destination: string;
  cards: [FolderCardItem, FolderCardItem, FolderCardItem];
}

export const FOLDER_CATEGORIES: FolderCategory[] = [
  {
    id: 'branding-strategy',
    title: 'Branding & Strategy',
    colorName: 'Lavender Veil',
    hex: '#aa7fe9',
    backStart: '#e4d3fd',
    backEnd: '#c4a7f8',
    frontBg: '#aa7fe9',
    frontStart: 'rgba(228, 211, 253, 0.70)',
    frontEnd: 'rgba(170, 127, 233, 0.62)',
    shadow: 'rgba(165, 135, 225, 0.28)',
    rim: 'rgba(255, 255, 255, 0.75)',
    textShadow: '0 2px 10px rgba(65, 30, 120, 0.50)',
    destination: '/service/branding',
    cards: [
      {
        src: '/folder-content/branding/card-left.png',
        alt: 'Branding & Strategy - Identity System',
        link: '/service/branding',
      },
      {
        src: '/folder-content/branding/card-middle.png',
        alt: 'Branding & Strategy - Visual Language',
        link: '/service/branding',
      },
      {
        src: '/folder-content/branding/card-right.png',
        alt: 'Branding & Strategy - Brand Guidelines',
        link: '/service/branding',
        hasBadge: true,
      },
    ],
  },
  {
    id: 'design-edit',
    title: 'Design & Edit',
    colorName: 'Periwinkle',
    hex: '#9b6ee5',
    backStart: '#d8bffb',
    backEnd: '#b792f5',
    frontBg: '#9b6ee5',
    frontStart: 'rgba(216, 191, 251, 0.70)',
    frontEnd: 'rgba(155, 110, 229, 0.64)',
    shadow: 'rgba(150, 115, 225, 0.30)',
    rim: 'rgba(255, 255, 255, 0.70)',
    textShadow: '0 2px 10px rgba(60, 25, 120, 0.45)',
    destination: '/service/edits',
    cards: [
      {
        src: '/folder-content/design-edit/card-left.jpg',
        alt: 'Design & Edit - Commercial Campaign',
        link: '/service/edits',
      },
      {
        src: '/folder-content/design-edit/card-middle.jpg',
        alt: 'Design & Edit - Editorial Art',
        link: '/service/edits',
      },
      {
        src: '/folder-content/design-edit/card-right.jpg',
        alt: 'Design & Edit - Creative Poster',
        link: '/service/edits',
        hasBadge: true,
      },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    colorName: 'Mauve',
    hex: '#8b5ade',
    backStart: '#cbb0f8',
    backEnd: '#a77bf0',
    frontBg: '#8b5ade',
    frontStart: 'rgba(203, 176, 248, 0.72)',
    frontEnd: 'rgba(139, 90, 222, 0.66)',
    shadow: 'rgba(135, 95, 220, 0.32)',
    rim: 'rgba(255, 255, 255, 0.65)',
    textShadow: '0 2px 10px rgba(50, 20, 110, 0.40)',
    destination: '/service/digital-marketing',
    cards: [
      {
        src: '/folder-content/digital-marketing/card-left.png',
        alt: 'Digital Marketing - Growth Analytics',
        link: '/service/digital-marketing',
      },
      {
        src: '/folder-content/digital-marketing/card-middle.png',
        alt: 'Digital Marketing - Search Console Performance',
        link: '/service/digital-marketing',
      },
      {
        src: '/folder-content/digital-marketing/card-right.png',
        alt: 'Digital Marketing - Conversion Funnel',
        link: '/service/digital-marketing',
        hasBadge: true,
      },
    ],
  },
  {
    id: 'ui-ux',
    title: 'UI / UX',
    colorName: 'Soft Periwinkle',
    hex: '#7a45d4',
    backStart: '#b99ff4',
    backEnd: '#9663ea',
    frontBg: '#7a45d4',
    frontStart: 'rgba(185, 159, 244, 0.72)',
    frontEnd: 'rgba(122, 69, 212, 0.68)',
    shadow: 'rgba(120, 75, 210, 0.34)',
    rim: 'rgba(255, 255, 255, 0.60)',
    textShadow: '0 2px 10px rgba(45, 15, 105, 0.35)',
    destination: '/service/uiuxdesign',
    cards: [
      {
        src: '/folder-content/ui-ux/card-left.png',
        alt: 'UI / UX - Mobile App Wireframe',
        link: '/service/uiuxdesign',
      },
      {
        src: '/folder-content/ui-ux/card-middle.png',
        alt: 'UI / UX - Clean Dashboard Experience',
        link: '/service/uiuxdesign',
      },
      {
        src: '/folder-content/ui-ux/card-right.png',
        alt: 'UI / UX - Interactive Product Interface',
        link: '/service/uiuxdesign',
        hasBadge: true,
      },
    ],
  },
  {
    id: 'offline-marketing',
    title: 'Offline Marketing',
    colorName: 'Lavender Purple',
    hex: '#6830c7',
    backStart: '#a88beb',
    backEnd: '#844bdf',
    frontBg: '#6830c7',
    frontStart: 'rgba(168, 139, 235, 0.74)',
    frontEnd: 'rgba(104, 48, 199, 0.70)',
    shadow: 'rgba(105, 60, 185, 0.35)',
    rim: 'rgba(255, 255, 255, 0.55)',
    textShadow: '0 2px 10px rgba(40, 10, 95, 0.30)',
    destination: '/service/graphicdesign',
    cards: [
      {
        src: '/folder-content/offline-marketing/card-left.jpg',
        alt: 'Offline Marketing - Film Poster Promotion',
        link: '/service/graphicdesign',
      },
      {
        src: '/folder-content/offline-marketing/card-middle.jpg',
        alt: 'Offline Marketing - Print Feature Editorial',
        link: '/service/graphicdesign',
      },
      {
        src: '/folder-content/offline-marketing/card-right.jpg',
        alt: 'Offline Marketing - Brand Print Advertisement',
        link: '/service/graphicdesign',
        hasBadge: true,
      },
    ],
  },
];

function FolderItem({ folder }: { folder: FolderCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { title, backStart, backEnd, frontBg, frontStart, frontEnd, shadow, rim, textShadow, cards, destination } = folder;
  const [cardLeft, cardMiddle, cardRight] = cards;

  const styleVars: CSSPropertiesWithVars = {
    '--folder-back-start': backStart,
    '--folder-back-end': backEnd,
    '--folder-front-bg': frontBg,
    '--folder-front-start': frontStart,
    '--folder-front-end': frontEnd,
    '--folder-shadow': shadow,
    '--folder-rim': rim,
    '--folder-text-shadow': textShadow,
  };

  const handleArrowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (destination) {
      router.push(destination);
    }
  };

  return (
    <div className="folderCol" style={styleVars}>
      <div
        className={`singleFolderWrapper ${isOpen ? 'isOpen' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="folderBack" />

        <div className="folderCardsContainer">
          <Link
            href={cardLeft.link}
            className="folderCard cardLeft"
            onClick={(e) => e.stopPropagation()}
            title={cardLeft.alt}
          >
            <div className="folderCardInner">
              <img
                src={cardLeft.src}
                alt={cardLeft.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>

          <Link
            href={cardMiddle.link}
            className="folderCard cardMiddle"
            onClick={(e) => e.stopPropagation()}
            title={cardMiddle.alt}
          >
            <div className="folderCardInner">
              <img
                src={cardMiddle.src}
                alt={cardMiddle.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>

          <Link
            href={cardRight.link}
            className="folderCard cardRight"
            onClick={(e) => e.stopPropagation()}
            title={cardRight.alt}
          >
            {cardRight.hasBadge && <div className="avatarBadge">A</div>}
            <div className="folderCardInner">
              <img
                src={cardRight.src}
                alt={cardRight.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>
        </div>

        <div className="folderFront" />

        <svg
          className="folderFrontRim"
          viewBox="0 0 460 250"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 175 0 C 200 0, 225 38, 255 38 L 460 38"
            fill="none"
            stroke="var(--folder-rim, rgba(255, 255, 255, 0.70))"
            strokeWidth="2"
          />
        </svg>

        <h3 className="folderTitle">{title}</h3>

        <button
          type="button"
          className="folderArrowBtn"
          onClick={handleArrowClick}
          aria-label={`Explore ${title}`}
        >
          <svg
            className="folderArrowIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export interface CategoryProps {
  categoryDesc?: CategoryItem[];
}

export default function Category({}: CategoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = FOLDER_CATEGORIES[activeCategoryIndex] || FOLDER_CATEGORIES[0];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const col = el.querySelector('.folderCol');
      if (col) {
        const w = col.getBoundingClientRect().width;
        if (w > 0) {
          el.style.setProperty('--folder-scale', (w / 460).toFixed(4));
        }
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    window.addEventListener('resize', updateScale);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const mobileStyleVars: CSSPropertiesWithVars = {
    '--folder-back-start': activeCategory.backStart,
    '--folder-back-end': activeCategory.backEnd,
    '--folder-front-bg': activeCategory.frontBg,
    '--folder-front-start': activeCategory.frontStart,
    '--folder-front-end': activeCategory.frontEnd,
    '--folder-shadow': activeCategory.shadow,
    '--folder-rim': activeCategory.rim,
    '--folder-text-shadow': activeCategory.textShadow,
  };

  return (
    <div className="category">
      <h2 className="heading">WHAT I DO</h2>
      <p className="headingPara">
        I help brands define how they look, communicate, and show up in the world.
      </p>

      <div className="singleFolderContainer" ref={containerRef}>
        {FOLDER_CATEGORIES.map((folder, idx) => (
          <FolderItem key={folder.id || idx} folder={folder} />
        ))}
      </div>

      <div className="categoryMobileShowcase">
        <div className="categoryMobileCardWrapper" style={mobileStyleVars}>
          <div className="categoryMobileCardBack" />

          <div className="categoryMobileMockups">
            <Link
              href={activeCategory.cards[0].link}
              className="categoryMobileMockupCard mockupLeft"
              title={activeCategory.cards[0].alt}
            >
              <div className="categoryMobileMockupInner">
                <img
                  src={activeCategory.cards[0].src}
                  alt={activeCategory.cards[0].alt}
                  loading="lazy"
                />
              </div>
            </Link>

            <Link
              href={activeCategory.cards[1].link}
              className="categoryMobileMockupCard mockupMiddle"
              title={activeCategory.cards[1].alt}
            >
              <div className="categoryMobileMockupInner">
                <img
                  src={activeCategory.cards[1].src}
                  alt={activeCategory.cards[1].alt}
                  loading="lazy"
                />
              </div>
            </Link>

            <Link
              href={activeCategory.cards[2].link}
              className="categoryMobileMockupCard mockupRight"
              title={activeCategory.cards[2].alt}
            >
              {activeCategory.cards[2].hasBadge && (
                <div className="avatarBadge">A</div>
              )}
              <div className="categoryMobileMockupInner">
                <img
                  src={activeCategory.cards[2].src}
                  alt={activeCategory.cards[2].alt}
                  loading="lazy"
                />
              </div>
            </Link>
          </div>

          <div className="categoryMobileCardFront" />

          <svg
            className="categoryMobileFrontRim"
            viewBox="0 0 300 142"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 L 114 0 C 131 0, 147 21, 165 21 L 300 21"
              fill="none"
              stroke="var(--folder-rim, rgba(255, 255, 255, 0.70))"
              strokeWidth="2"
            />
          </svg>

          <h3 className="categoryMobileTitle">{activeCategory.title}</h3>

          <Link
            href={activeCategory.destination}
            className="categoryMobileArrowBtn"
            aria-label={`Explore ${activeCategory.title}`}
          >
            <svg
              className="folderArrowIcon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>

        <div className="categoryMobileNav" role="tablist" aria-label="Service categories">
          {FOLDER_CATEGORIES.map((cat, idx) => {
            const isSelected = idx === activeCategoryIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`categoryMobilePill ${isSelected ? 'active' : ''}`}
                style={
                  isSelected
                    ? {
                        borderColor: cat.backEnd,
                        background: cat.frontBg,
                        color: '#ffffff',
                        boxShadow: `0 2px 8px ${cat.shadow}`,
                      }
                    : undefined
                }
                onClick={() => setActiveCategoryIndex(idx)}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="categoryDesc">
        <Link href="/contact">
          <button className="contact clickable">
            <h5>Work With Me</h5>
            <div className="arrowDiv">
              <img src="/img/icon/arrowWhite.svg" alt="" className="arrow" />
              <img src="/img/icon/arrowWhite.svg" alt="" className="arrow2" />
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
