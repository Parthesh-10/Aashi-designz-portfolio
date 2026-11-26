import ProfileFrame from '@/components/ProfileFrame/ProfileFrame';
import PassageSection from '@/components/PassageGallery/PassageSection';
import ProblemSection from '@/components/ProblemSection/ProblemSection';
import HandCarouselSection from '@/components/HandCarousel/HandCarouselSection';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

export default function About() {
  return (
    <>
      <PageContainer as="div" className="aboutHeader">
  <div className="aboutContainer">
    <div className="aboutImg">
      <ProfileFrame />
    </div>
    <div className="aboutText">
      <h1 className="about-hero-headline text-balance max-w-full">
        <span className="about-hero-line text-balance">
          Hi! I&apos;m{' '}
          <span className="hero-capsule hero-capsule-avatar hero-capsule-popout">
            <span className="hero-capsule-inner">
              <img
                src="/images/hero/avatar.png"
                alt=""
                aria-hidden="true"
                width="144"
                height="144"
                className="hero-capsule-img shrink-0"
              />
            </span>
          </span>
          <span className="hero-text-pill">Ayushi</span>
        </span>{' '}
        <span className="about-hero-line text-balance">
          a{' '}
          <span className="hero-capsule hero-capsule-posters hero-capsule-flush">
            <span className="hero-capsule-inner">
              <img
                src="/images/hero/posters.png"
                alt=""
                aria-hidden="true"
                width="170"
                height="114"
                className="hero-capsule-img shrink-0"
              />
            </span>
          </span>
          <span className="hero-text-pill">Designer</span> from{' '}
          <span className="hero-capsule hero-capsule-chandigarh hero-capsule-flush">
            <span className="hero-capsule-inner">
              <img
                src="/images/hero/chandigarh.png"
                alt=""
                aria-hidden="true"
                width="170"
                height="114"
                className="hero-capsule-img shrink-0"
              />
            </span>
          </span>{' '}
          Chandigarh
        </span>{' '}
        <span className="about-hero-line text-balance">
          Blending creativity with technology{' '}
          <span className="hero-capsule hero-capsule-phone hero-capsule-popout">
            <span className="hero-capsule-inner">
              <img
                src="/images/hero/phone.png"
                alt=""
                aria-hidden="true"
                width="158"
                height="156"
                className="hero-capsule-img shrink-0"
              />
            </span>
          </span>{' '}
          and{' '}
          <span className="hero-capsule hero-capsule-tape hero-capsule-flush">
            <span className="hero-capsule-inner">
              <img
                src="/images/hero/tape.png"
                alt=""
                aria-hidden="true"
                width="200"
                height="114"
                className="hero-capsule-img shrink-0"
              />
            </span>
          </span>{' '}
          strategy.
        </span>
      </h1>
      <Link href="/contact">
        <button className="contact clickable">
          <h5>Hire Me</h5>
          <div className="arrowDiv">
            <img src="/img/icon/arrowWhite.svg" alt="" className="arrow" />
            <img src="/img/icon/arrowWhite.svg" alt="" className="arrow2" />
          </div>
        </button>
      </Link>
    </div>
  </div>
      </PageContainer>

      <PageContainer as="div" className="container2 container">
  <div className="aboutDiv">
    <h4>About Me</h4>
    <div>
      <h3>
        I&apos;m a designer, a Computer Science engineer, and someone who has a hard time
        leaving an idea alone.
      </h3>
      <h6>
        That has led to a long list of projects, although you won&apos;t find most of them on my resume.
      </h6>
      <h6>
        I was previously a Design Associate at EduRev, a YC-funded startup. Now, I run my own potato-chip-funded design agency, working with clients across India, Canada, and Dubai.
      </h6>
      <h6>
        I&apos;ve been a photographer, painter, resin artist, founder of an NGO for child education and welfare, occasional chef, pet owner, and the unofficial granddaughter of at least 20 residents at the old-age home across the street.
      </h6>
      <h6>
        I dream of working at the intersection of child education, psychology, and human development.
      </h6>
      <h6>
        I&apos;m also 1 in 83,000 humans. My genetics decided I needed a limited-edition heart.
      </h6>
      <h6>
        If you&apos;re looking for a strategic solution to anything, from a business dilemma to fixing your almira hinges, you&apos;re in the right place. You might even get some free food out of it. I&apos;m always looking for new food testers.
      </h6>
    </div>
  </div>
      </PageContainer>

<PassageSection />

<ProblemSection />

<HandCarouselSection />
    </>
  );
}
