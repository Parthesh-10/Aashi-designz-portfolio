'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './Category.css';

const FOLDER_TITLES = [
  'Branding & Strategy',
  'Design & Edit',
  'Digital Marketing',
  'UI / UX',
  'Offline Marketing',
];

function FolderItem({ title, card1, card2, card3, onArrowClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="folderCol">
      <div
        className={`singleFolderWrapper ${isOpen ? 'isOpen' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Solid lilac back panel with top-left tab */}
        <div className="folderBack" />

        {/* Cards fanning out of the folder */}
        <div className="folderCardsContainer">
          {/* Left Card: UI/UX */}
          <Link
            href={card1.pageLink}
            className="folderCard cardLeft"
            onClick={(e) => e.stopPropagation()}
            title={card1.heading}
          >
            <div className="folderCardInner">
              <img
                src={`/img/${card1.imgSrc || 'dsfasdf.png'}`}
                alt={card1.heading || 'UI/UX'}
              />
            </div>
          </Link>

          {/* Middle Card: Branding (Kantara Blockbuster Poster) */}
          <Link
            href={card2.pageLink}
            className="folderCard cardMiddle"
            onClick={(e) => e.stopPropagation()}
            title={card2.heading}
          >
            <div className="folderCardInner">
              <img
                src={`/img/${card2.imgSrc || 'hfsdfas.png'}`}
                alt={card2.heading || 'Branding'}
              />
            </div>
          </Link>

          {/* Right Card: Video Editing with Figma cursor avatar badge */}
          <Link
            href={card3.pageLink}
            className="folderCard cardRight"
            onClick={(e) => e.stopPropagation()}
            title={card3.heading}
          >
            <div className="avatarBadge">A</div>
            <div className="folderCardInner">
              <img
                src={`/img/${card3.imgSrc || 'dfsdafsdlkfjs.png'}`}
                alt={card3.heading || 'Video Editing'}
              />
            </div>
          </Link>
        </div>

        {/* Frosted translucent purple front flap */}
        <div className="folderFront" />

        {/* SVG Highlight rim along the top cut of the front flap */}
        <svg
          className="folderFrontRim"
          viewBox="0 0 460 250"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 175 0 C 200 0, 225 38, 255 38 L 460 38"
            fill="none"
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="2"
          />
        </svg>

        {/* Title on the front flap (bottom-left) */}
        <h3 className="folderTitle">{title}</h3>

        {/* Bottom-right circular arrow button */}
        <button
          type="button"
          className="folderArrowBtn"
          onClick={onArrowClick}
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

export default function Category({ categoryDesc = [] }) {
  const router = useRouter();
  const containerRef = useRef(null);

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

  // Pull services from categoryDesc so data remains single source of truth
  const card1 = categoryDesc.find((c) => c.pageLink?.includes('uiux')) || {
    heading: 'UI/UX',
    pageLink: '/service/uiuxdesign',
    imgSrc: 'dsfasdf.png',
  };

  const card2 = categoryDesc.find((c) => c.pageLink?.includes('branddesign')) || {
    heading: 'BRANDING',
    pageLink: '/service/branddesign',
    imgSrc: 'hfsdfas.png',
  };

  const card3 = categoryDesc.find((c) => c.pageLink?.includes('video')) || {
    heading: 'VIDEO EDITING',
    pageLink: '/service/videoediting',
    imgSrc: 'dfsdafsdlkfjs.png',
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    // Navigate to primary featured service or contact
    router.push(card2.pageLink || '/service/branddesign');
  };

  const getService = (keyword, fallbackHeading, fallbackLink, fallbackImg) => {
    const found = categoryDesc.find((c) => c.pageLink?.toLowerCase().includes(keyword.toLowerCase()));
    return {
      heading: found?.heading || fallbackHeading,
      pageLink: found?.pageLink || fallbackLink,
      imgSrc: found?.imgSrc || fallbackImg,
    };
  };

  const uiux = getService('uiux', 'UI/UX', '/service/uiuxdesign', 'dsfasdf.png');
  const branding = getService('branddesign', 'BRANDING', '/service/branddesign', 'hfsdfas.png');
  const video = getService('video', 'VIDEO EDITING', '/service/videoediting', 'dfsdafsdlkfjs.png');
  const graphic = getService('graphic', 'GRAPHIC DESIGNING', '/service/graphicdesign', 'kgjdflg.jpg');
  const strategy = getService('strategy', 'DESIGN STRATEGY', '/service/designstrategy', 'dfhasdlfasd.png');

  const MOBILE_CATEGORIES = [
    {
      title: 'Branding & Strategy',
      destination: branding.pageLink,
      cardLeft: { src: `/img/${uiux.imgSrc}`, alt: uiux.heading, link: uiux.pageLink },
      cardMiddle: { src: `/img/${branding.imgSrc}`, alt: branding.heading, link: branding.pageLink },
      cardRight: { src: `/img/${video.imgSrc}`, alt: video.heading, link: video.pageLink, hasBadge: true },
    },
    {
      title: 'Design & Edit',
      destination: graphic.pageLink,
      cardLeft: { src: `/img/${graphic.imgSrc}`, alt: graphic.heading, link: graphic.pageLink },
      cardMiddle: { src: `/img/${video.imgSrc}`, alt: video.heading, link: video.pageLink },
      cardRight: { src: `/img/${branding.imgSrc}`, alt: branding.heading, link: branding.pageLink, hasBadge: true },
    },
    {
      title: 'Digital Marketing',
      destination: strategy.pageLink,
      cardLeft: { src: `/img/${strategy.imgSrc}`, alt: strategy.heading, link: strategy.pageLink },
      cardMiddle: { src: `/img/${branding.imgSrc}`, alt: branding.heading, link: branding.pageLink },
      cardRight: { src: `/img/${uiux.imgSrc}`, alt: uiux.heading, link: uiux.pageLink, hasBadge: true },
    },
    {
      title: 'UI / UX',
      destination: uiux.pageLink,
      cardLeft: { src: `/img/${uiux.imgSrc}`, alt: uiux.heading, link: uiux.pageLink },
      cardMiddle: { src: `/img/${branding.imgSrc}`, alt: branding.heading, link: branding.pageLink },
      cardRight: { src: `/img/${video.imgSrc}`, alt: video.heading, link: video.pageLink, hasBadge: true },
    },
    {
      title: 'Offline Marketing',
      destination: graphic.pageLink,
      cardLeft: { src: `/img/${graphic.imgSrc}`, alt: graphic.heading, link: graphic.pageLink },
      cardMiddle: { src: `/img/${branding.imgSrc}`, alt: branding.heading, link: branding.pageLink },
      cardRight: { src: `/img/${strategy.imgSrc}`, alt: strategy.heading, link: strategy.pageLink, hasBadge: true },
    },
  ];

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = MOBILE_CATEGORIES[activeCategoryIndex] || MOBILE_CATEGORIES[0];

  return (
    <div className="category">
      <h2 className="heading">WHAT I DO</h2>
      <p className="headingPara">
        I help brands define how they look, communicate, and show up in the world.
      </p>

      {/* Desktop & Tablet Folder Grid (>= 768px) */}
      <div className="singleFolderContainer" ref={containerRef}>
        {FOLDER_TITLES.map((title, idx) => (
          <FolderItem
            key={idx}
            title={title}
            card1={card1}
            card2={card2}
            card3={card3}
            onArrowClick={handleArrowClick}
          />
        ))}
      </div>

      {/* Mobile Featured Showcase (< 768px) */}
      <div className="categoryMobileShowcase">
        <div className="categoryMobileCardWrapper">
          <div className="categoryMobileCardBack" />

          <div className="categoryMobileMockups">
            <Link
              href={activeCategory.cardLeft.link}
              className="categoryMobileMockupCard mockupLeft"
              title={activeCategory.cardLeft.alt}
            >
              <div className="categoryMobileMockupInner">
                <img
                  src={activeCategory.cardLeft.src}
                  alt={activeCategory.cardLeft.alt}
                />
              </div>
            </Link>

            <Link
              href={activeCategory.cardMiddle.link}
              className="categoryMobileMockupCard mockupMiddle"
              title={activeCategory.cardMiddle.alt}
            >
              <div className="categoryMobileMockupInner">
                <img
                  src={activeCategory.cardMiddle.src}
                  alt={activeCategory.cardMiddle.alt}
                />
              </div>
            </Link>

            <Link
              href={activeCategory.cardRight.link}
              className="categoryMobileMockupCard mockupRight"
              title={activeCategory.cardRight.alt}
            >
              {activeCategory.cardRight.hasBadge && (
                <div className="avatarBadge">A</div>
              )}
              <div className="categoryMobileMockupInner">
                <img
                  src={activeCategory.cardRight.src}
                  alt={activeCategory.cardRight.alt}
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
              stroke="rgba(255, 255, 255, 0.55)"
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

        {/* Category Navigation Buttons */}
        <div className="categoryMobileNav" role="tablist" aria-label="Service categories">
          {MOBILE_CATEGORIES.map((cat, idx) => {
            const isSelected = idx === activeCategoryIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`categoryMobilePill ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveCategoryIndex(idx)}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Button */}
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
