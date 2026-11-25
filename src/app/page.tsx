'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import LogoSlider from '@/components/LogoSlider';
import Category from '@/components/Category';
import WhatIfSection from '@/components/WhatIfSection/WhatIfSection';
import Slider from '@/components/Slider';
import Faq from '@/components/Faq';
import ResultsSection from '@/components/ResultsSection/ResultsSection';
import EmployeeSection from '@/components/EmployeeSection/EmployeeSection';
import categoryDesc from '@/constant/categoryData';
import resultsData from '@/constant/resultsData';
import HeroIntro from '@/components/HeroIntro/HeroIntro';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import CupboardReveal from '@/components/CupboardReveal/CupboardReveal';
import PageContainer from '@/components/PageContainer';

export default function Home() {
  // Ported from public/js/index.js: animate .borderAnimate underline when fully in view
  useEffect(() => {
    const elements = document.querySelectorAll('.borderAnimate');
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Intro overlay — mounts once, unmounts itself after animation */}
      <HeroIntro />
      <PageContainer as="div" className="header container" data-intro="playing">
        <div className="nameHeading">
          <HeroBanner />
        </div>
        <div className="homeBanner">
          <div className="headerContainer1">
            <div className="dotContainer">
              <div className="dot">
                <div className="innerDot"></div>
              </div>
              <h6>Available For Work</h6>
            </div>

            <h1 className="heroHeading">
              <span className="heroHeadingLine">
                <span className="heroHeadingInner">Brand &amp; Digital</span>
              </span>
              <span className="heroHeadingLine">
                <span className="heroHeadingInner">Experience</span>
              </span>
              <span className="heroHeadingLine">
                <span className="heroHeadingInner">Designer</span>
              </span>
            </h1>
          </div>
          <div className="desktopHeroPortrait" aria-hidden="true">
            <img
              src="/img/hero-portrait.png"
              alt="Aashi"
              className="desktopHeroPortraitImg"
            />
          </div>
          <div className="headerContainer2">
            <p>
              I work with startups and growing brands to create digital experiences
              that feel human and effortless.
            </p>
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
      </PageContainer>

      <div className="box-border w-full px-6 md:px-10">
        <LogoSlider />
      </div>
      <CupboardReveal />
      <PageContainer className="container">
        <Category categoryDesc={categoryDesc} />
      </PageContainer>
      <EmployeeSection />
      <ResultsSection resultsData={resultsData} />
      <WhatIfSection />
      <PageContainer className="container4 container">
        <div className="banner">
          <div className="bannerText">
            <h1>
              Join the brands that have transformed their visuals and growth
              strategies with me.
            </h1>
            <p>
              I help brands from startups to established businesses elevate their
              visuals, refine their strategy and stand out. Ready to grow Fill out the
              form below and let’s start your transformation.
            </p>

            <Link className="contactLink clickable" href="/contact">
              <button className="hireMeBtn">
                <h3>Let&apos;s Connect</h3>
              </button>
            </Link>
          </div>
        </div>
      </PageContainer>
      <PageContainer className="container5 container">
        <div className="dotContainer">
          <div className="dot"></div>
          <h6>Testimonial</h6>
        </div>
        <h1>Trusted by Brands, Loved by Clients</h1>
        <p>
          Hear directly from my
          <span className="borderAnimate highLightedText"> Clients </span>
          about the difference it made.
        </p>

        <Slider />
      </PageContainer>
      <PageContainer className="container6 container">
        <Faq />
      </PageContainer>
    </>
  );
}
