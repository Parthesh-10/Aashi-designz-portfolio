import LanyardCard from '@/components/Lanyard/LanyardCard';
import PassageSection from '@/components/PassageGallery/PassageSection';
import ProblemSection from '@/components/ProblemSection/ProblemSection';
import HandCarouselSection from '@/components/HandCarousel/HandCarouselSection';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <div className="aboutHeader">
  <div className="aboutContainer">
    <div className="aboutText">
      <div className="dotContainer">
        <div className="dot"></div>
        <h6>Who am I</h6>
      </div>
      <h3>
        <span style={{}}> I&apos;m Ayushi, </span>a UI/UX designer and
        design strategist.
      </h3>
      <a href="/contact">
        <button className="contact clickable">
          <h5>Hire Me</h5>
          <div className="arrowDiv">
            <img src="/img/icon/arrowWhite.svg" alt="" className="arrow" />
            <img src="/img/icon/arrowWhite.svg" alt="" className="arrow2" />
          </div>
        </button>
      </a>
    </div>
    <div className="aboutImg">
      <LanyardCard />
    </div>
  </div>
</div>

<div className="container2 container">
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
</div>

<PassageSection />

<ProblemSection />

<HandCarouselSection />
    </>
  );
}
