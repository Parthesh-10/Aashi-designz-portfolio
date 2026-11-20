'use client';

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

export default function Home() {
  return (
    <>
      {/* Intro overlay — mounts once, unmounts itself after animation */}
      <HeroIntro />
      <div className="header container" data-intro="playing">
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
      </div>

      <div>
        <LogoSlider />
      </div>
      <CupboardReveal />
      <div className="container">
        <Category categoryDesc={categoryDesc} />
      </div>
      <EmployeeSection />
      <ResultsSection resultsData={resultsData} />
      <WhatIfSection />
      <div className="container4 container">
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
                <h3>Let's Connect</h3>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container5 container">
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
      </div>
      <div className="container6 container">
        <Faq />
      </div>
    </>
  );
}
