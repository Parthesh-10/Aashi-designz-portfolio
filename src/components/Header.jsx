'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLenis } from './SmoothScroll';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const dropdownTimeoutRef = useRef(null);

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
    } catch (e) {}
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
    const handleKeyDown = (e) => {
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
                className="navbar-dropdown-item"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <Link
                  href="/service/branddesign"
                  className={`navbar-link clickable ${
                    isServicesActive ? 'active' : ''
                  }`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
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
                </Link>

                <div className={`navbar-dropdown-menu ${servicesOpen ? 'visible' : ''}`}>
                  <Link
                    href="/service/branding"
                    className="navbar-dropdown-link clickable"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="dropdown-link-title">Brand Design</span>
                    <span className="dropdown-link-desc">Visual identity &amp; positioning</span>
                  </Link>

                  <Link
                    href="/service/graphicdesign"
                    className="navbar-dropdown-link clickable"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="dropdown-link-title">Graphic Design</span>
                    <span className="dropdown-link-desc">Marketing &amp; social assets</span>
                  </Link>

                  <Link
                    href="/service/uiuxdesign"
                    className="navbar-dropdown-link clickable"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="dropdown-link-title">UI/UX Design</span>
                    <span className="dropdown-link-desc">Web &amp; app experiences</span>
                  </Link>

                  <Link
                    href="/service/designstrategy"
                    className="navbar-dropdown-link clickable"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="dropdown-link-title">Design Strategy</span>
                    <span className="dropdown-link-desc">Scalable design systems</span>
                  </Link>

                  <Link
                    href="/service/videoediting"
                    className="navbar-dropdown-link clickable"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="dropdown-link-title">Video Editing</span>
                    <span className="dropdown-link-desc">Motion &amp; storytelling</span>
                  </Link>
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
                <div id="mobile-services-dropdown" className="mobile-sublinks">
                  <Link
                    href="/service/branding"
                    className={`mobile-sublink clickable ${
                      pathname === '/service/branding' ? 'active' : ''
                    }`}
                    onClick={closeMenu}
                  >
                    Brand Design
                  </Link>
                  <Link
                    href="/service/graphicdesign"
                    className={`mobile-sublink clickable ${
                      pathname === '/service/graphicdesign' ? 'active' : ''
                    }`}
                    onClick={closeMenu}
                  >
                    Graphic Design
                  </Link>
                  <Link
                    href="/service/uiuxdesign"
                    className={`mobile-sublink clickable ${
                      pathname === '/service/uiuxdesign' ? 'active' : ''
                    }`}
                    onClick={closeMenu}
                  >
                    UI/UX Design
                  </Link>
                  <Link
                    href="/service/designstrategy"
                    className={`mobile-sublink clickable ${
                      pathname === '/service/designstrategy' ? 'active' : ''
                    }`}
                    onClick={closeMenu}
                  >
                    Design Strategy
                  </Link>
                  <Link
                    href="/service/videoediting"
                    className={`mobile-sublink clickable ${
                      pathname === '/service/videoediting' ? 'active' : ''
                    }`}
                    onClick={closeMenu}
                  >
                    Video Editing
                  </Link>
                </div>
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
