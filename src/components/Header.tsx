'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLenis } from './SmoothScroll';

interface ServiceItem {
  title: string;
  desc: string;
  href: string;
}

const SERVICE_ITEMS: ServiceItem[] = [
  {
    title: 'Design & edit',
    desc: 'Marketing & social assets',
    href: '/service/edits',
  },
  {
    title: 'Branding & strategy',
    desc: 'Visual identity & positioning',
    href: '/service/branding',
  },
  {
    title: 'Digital marketing',
    desc: 'Ads, content & funnels',
    href: '/service/digital-marketing',
  },
  {
    title: 'Apps & websites',
    desc: 'Web & app experiences',
    href: '/service/uiuxdesign',
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownItemRef = useRef<HTMLLIElement | null>(null);
  const triggerBtnRef = useRef<HTMLButtonElement | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const isServicesActive =
    pathname === '/services' ||
    pathname.startsWith('/services/') ||
    pathname.startsWith('/service');

  // Close menu and dropdown when route changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isOpen) {
      setIsOpen(false);
    }
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  // Ensure clean light theme state
  useEffect(() => {
    try {
      localStorage.removeItem('theme');
    } catch {}
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
  }, []);

  // Track scroll position for subtle background opacity adjustment
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu callback
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu]);

  // Safely pair Lenis stop / start with mobile menu open / close state
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.classList.add('menu-open');
    } else {
      if (lenis) lenis.start();
      document.body.classList.remove('menu-open');
    }

    return () => {
      if (lenis) lenis.start();
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  // Handle outside click & Escape key for desktop services dropdown
  useEffect(() => {
    if (!servicesOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        dropdownItemRef.current &&
        !dropdownItemRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setServicesOpen(false);
        triggerBtnRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [servicesOpen]);

  // Close dropdown when focus moves outside of the dropdown item container
  const handleDropdownBlur = (e: React.FocusEvent<HTMLLIElement>) => {
    if (
      dropdownItemRef.current &&
      !dropdownItemRef.current.contains(e.relatedTarget as Node | null)
    ) {
      setServicesOpen(false);
    }
  };

  // Hover handlers for services dropdown with debounce to prevent flicker
  const handleServicesEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  const handleTriggerClick = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesOpen((prev) => !prev);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      if (!servicesOpen) {
        e.preventDefault();
        setServicesOpen(true);
        requestAnimationFrame(() => {
          const firstLink = dropdownMenuRef.current?.querySelector<HTMLAnchorElement>('a');
          firstLink?.focus();
        });
      }
    }
  };

  return (
    <>
      <header
        className={`navbar ${isOpen ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}
        role="banner"
      >
        <div className="navbar-pill">
          {/* Brand Logo (Left) */}
          <Link
            href="/"
            className="navbar-brand clickable"
            onClick={closeMenu}
            aria-label="Aashidesignz Home"
          >
            <img
              src="/img/icon/navInitialLogo.svg"
              alt="Aashidesignz Logo"
              className="navbar-brand-logo"
            />
          </Link>

          {/* Centered Navigation Links (Desktop) */}
          <nav className="navbar-nav-desktop" aria-label="Main Navigation">
            <ul className="navbar-links-list">
              <li>
                <Link
                  href="/"
                  className={`navbar-link clickable ${pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`navbar-link clickable ${
                    pathname === '/about' || pathname.startsWith('/about/') ? 'active' : ''
                  }`}
                >
                  About
                </Link>
              </li>

              <li
                ref={dropdownItemRef}
                className="navbar-dropdown-item"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
                onBlur={handleDropdownBlur}
              >
                <button
                  type="button"
                  ref={triggerBtnRef}
                  className={`navbar-link navbar-dropdown-trigger clickable ${
                    isServicesActive ? 'active' : ''
                  } ${servicesOpen ? 'dropdown-open' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls="services-dropdown-menu"
                  onClick={handleTriggerClick}
                  onKeyDown={handleTriggerKeyDown}
                >
                  <span>Services</span>
                  <svg
                    className={`navbar-chevron ${servicesOpen ? 'rotated' : ''}`}
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  id="services-dropdown-menu"
                  ref={dropdownMenuRef}
                  className={`navbar-dropdown-menu ${servicesOpen ? 'visible' : ''}`}
                  role="region"
                  aria-label="Services menu"
                >
                  {/* First item: link to the Services overview page */}
                  <Link
                    href="/services"
                    className={`navbar-dropdown-link navbar-dropdown-overview clickable ${
                      pathname === '/services' ? 'active' : ''
                    }`}
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="dropdown-link-title">Services</span>
                    <span className="dropdown-link-desc">All services</span>
                  </Link>

                  {/* Sub-group with individual service routes */}
                  <ul
                    className="navbar-dropdown-subgroup"
                    role="group"
                    aria-label="Individual services"
                  >
                    {SERVICE_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`navbar-dropdown-link navbar-dropdown-sublink clickable ${
                            pathname === item.href ? 'active' : ''
                          }`}
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className="dropdown-link-title">{item.title}</span>
                          <span className="dropdown-link-desc">{item.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Pill "Get in Touch" Button */}
            <Link
              href="/contact"
              className="navbar-cta-btn clickable"
              onClick={closeMenu}
            >
              <span>Get in touch</span>
              <svg
                className="navbar-cta-arrow"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" />
              </svg>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`navbar-hamburger clickable ${isOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="navbar-mobile-drawer"
            >
              <span className="hamburger-line line-1"></span>
              <span className="hamburger-line line-2"></span>
              <span className="hamburger-line line-3"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="navbar-mobile-drawer"
          className={`navbar-mobile-drawer ${isOpen ? 'open' : ''}`}
          data-lenis-prevent="true"
        >
          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            <Link
              href="/"
              className={`mobile-nav-link clickable ${pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`mobile-nav-link clickable ${
                pathname === '/about' || pathname.startsWith('/about/') ? 'active' : ''
              }`}
              onClick={closeMenu}
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="mobile-services-group">
              <div
                className={`mobile-services-row ${
                  isServicesActive ? 'active' : ''
                }`}
              >
                <Link
                  href="/services"
                  className={`mobile-services-link clickable ${
                    isServicesActive ? 'active' : ''
                  }`}
                  onClick={closeMenu}
                  aria-current={isServicesActive ? 'page' : undefined}
                >
                  <span>Services</span>
                </Link>

                <button
                  type="button"
                  className={`mobile-services-arrow-btn clickable ${
                    isServicesActive ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileServicesOpen((prev) => !prev);
                  }}
                  aria-label="Toggle services menu"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-dropdown"
                >
                  <svg
                    className={`mobile-chevron ${mobileServicesOpen ? 'rotated' : ''}`}
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {mobileServicesOpen && (
                <ul
                  id="mobile-services-dropdown"
                  className="mobile-sublinks mobile-services-subgroup"
                  aria-label="Individual services"
                >
                  {SERVICE_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`mobile-sublink clickable ${
                          pathname === item.href ? 'active' : ''
                        }`}
                        onClick={closeMenu}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/contact"
              className={`mobile-nav-link clickable ${pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>

          <div className="mobile-drawer-bottom">
            <Link
              href="/contact"
              className="mobile-cta-btn clickable"
              onClick={closeMenu}
            >
              <span>Get in touch</span>
              <svg
                className="navbar-cta-arrow"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" />
              </svg>
            </Link>

            <div className="mobile-social-links">
              <a
                className="clickable"
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.behance.net/aashidesignz"
                aria-label="Behance"
              >
                <img
                  src="/img/icon/behance.svg"
                  alt="Behance"
                  className="social-icon"
                />
              </a>
              <a
                className="clickable"
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.instagram.com/aashi.designz?igsh=Zzd6aDg3cjNkcWph"
                aria-label="Instagram"
              >
                <img
                  src="/img/icon/instagram.svg"
                  alt="Instagram"
                  className="social-icon"
                />
              </a>
              <a
                className="clickable"
                rel="noopener noreferrer"
                target="_blank"
                href="https://in.pinterest.com/aashidesign2/"
                aria-label="Pinterest"
              >
                <img
                  src="/img/icon/pinterest.svg"
                  alt="Pinterest"
                  className="social-icon"
                />
              </a>
              <a
                className="clickable"
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/ayushi29?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                aria-label="LinkedIn"
              >
                <img
                  src="/img/icon/linkedin.svg"
                  alt="LinkedIn"
                  className="social-icon"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
