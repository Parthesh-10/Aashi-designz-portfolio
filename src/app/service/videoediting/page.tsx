'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ServiceLegacyEffects from '@/components/ServiceLegacyEffects';

function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load and play when entering viewport
            if (video.preload === 'none') {
              video.preload = 'metadata';
              video.load();
            }
            video.play().catch(() => {});
          } else {
            // Pause when leaving viewport to save resources
            video.pause();
          }
        });
      },
      { rootMargin: '200px' } // Start loading 200px before entering viewport
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      disablePictureInPicture
      muted
      playsInline
      loop
      controls
      controlsList="nodownload noplaybackrate"
      preload="none"
      style={{}}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function VideoEditing() {
  const videos = [
    '/video/gl.mp4',
    '/video/kochar.mp4',
    '/video/nextburger.mp4',
    '/video/aashidesignz.mp4',
    '/video/kiswah.mp4',
    '/video/tex.mp4',
    '/video/kocharintro.mp4',
    '/video/kocharBahubali.mp4',
  ];

  return (
    <>
      <ServiceLegacyEffects />
      <div className="serviceHeaderContainer container">
  <div className="dotContainer">
    <div className="dot"></div>
    <h6>Video Editing</h6>
  </div>
  <h1>
    <span style={{}}>
      Videos that not only move but also make people feel.
    </span>
  </h1>
  <div className="serviceParagraph">
    <div>
      <p>
        From short social media clips to brand stories, every edit aims to hold
        attention, evoke emotion, and make your message unforgettable. In
        today&apos;s world, people don&apos;t just watch; they connect.
        <span id="dots">...</span>
      </p>

      <div id="more" style={{}}>
        <p>
          For us, video editing isn&apos;t about flashy transitions or loud music.
          It&apos;s about rhythm, emotion, and storytelling that feels genuine. Every
          cut, sound, and frame is crafted to engage the audience and keep them
          watching. Whether it&apos;s a product reel, brand story, ad campaign, or
          long-form content, we create videos that support your strategy. The
          goal is clear: make your audience feel something and help them
          remember who made them feel it. 
        </p>
      </div>
    </div>
    <button id="myBtn" className="readMoreBtn clickable">Read more</button>
  </div>
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
<div className="serviceTabs">
  <h3>300+ videos <br /> edited with purpose</h3>
  <h3>15+ brands <br /> with stronger storytelling</h3>
  <h3>Viewer retention <br /> improved by 60%</h3>
</div>
<div className="serviceVideo container2 container">
  {videos.map((src) => (
    <div className="videoWrapper" key={src}>
      <LazyVideo src={src} />
    </div>
  ))}
</div>

<div className="serviceTestimonial container">
     <div className="dotContainer">
    <div className="dot"></div>
    <h6>Testimonial</h6>
  </div>
  <h1>
    Brands rely on results, <br />
    clients remember the impact
  </h1>
  <h3>
    Design is more than visuals, it&apos;s the experience that sticks. <br />
    See
    <span
      style={{}}
      >what my clients say
    </span>
    about how smart, strategic design transformed their brand.
  </h3>
  
</div>

<div className="servicecontainer2 container">
  <div>
    <div className="dotContainer">
      <div className="dot"></div>
      <h6>My Design Process</h6>
    </div>
    <h1>Designing for your brand is never random.</h1>
    <p>
      Every choice I make is backed by research, strategy, and a deep
      understanding of your audience. Here is how I approach every project
    </p>
  </div>
  <div>
    <div className="tabFeature">
      <div className="tabFeatureItem">
        <div className="featureTitleContainer">
          <div className="design">
            <div className="circle">
              <img
                src="/img/icon/auto_stories_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                className="circleImg"
              />
              <div className="purpleDiv"></div>
            </div>
          </div>
          <div className="featureTitle">
            <h3>Understand the Brand</h3>
          </div>
        </div>
        <div className="featureTextContainer">
          <div className="design">
            <div className="column"><div className="purpleDiv"></div></div>
          </div>
          <div className="featureText">
            <h5>
              I start by immersing myself in your brand and its needs. I ask
              questions, observe your goals, and get to the heart of what makes
              your brand unique.
            </h5>
          </div>
        </div>
      </div>
      <div className="tabFeatureItem">
        <div className="featureTitleContainer">
          <div className="design">
            <div className="circle">
              <img
                src="/img/icon/analytics_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                className="circleImg"
              />
              <div className="purpleDiv"></div>
            </div>
          </div>
          <div className="featureTitle">
            <h3>Analyze the Market</h3>
          </div>
        </div>
        <div className="featureTextContainer">
          <div className="design">
            <div className="column"><div className="purpleDiv"></div></div>
          </div>
          <div className="featureText">
            <h5>
              Next, I dive into a full analysis of competitors and the market. I
              look at what they are doing well, where they are missing the mark,
              and identify your brand&apos;s opportunities and pain points. This step
              ensures that every design decision I make is strategic, not
              guesswork.
            </h5>
          </div>
        </div>
      </div>
      <div className="tabFeatureItem">
        <div className="featureTitleContainer">
          <div className="design">
            <div className="circle">
              <img
                src="/img/icon/draw_abstract_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                className="circleImg"
              />
              <div className="purpleDiv"></div>
            </div>
          </div>
          <div className="featureTitle">
            <h3>Visual Strategy and Direction</h3>
          </div>
        </div>
        <div className="featureTextContainer">
          <div className="design">
            <div className="column"><div className="purpleDiv"></div></div>
          </div>
          <div className="featureText">
            <h5>
              I then plan your visual strategy. This includes moodboards,
              inspiration grids, and creative directions. We review these
              options together in a strategy meeting to make sure we are aligned
              before I begin the actual design.
            </h5>
          </div>
        </div>
      </div>
      <div className="tabFeatureItem">
        <div className="featureTitleContainer">
          <div className="design">
            <div className="circle">
              <img
                src="/img/icon/draw_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                className="circleImg"
              />
              <div className="purpleDiv"></div>
            </div>
          </div>
          <div className="featureTitle">
            <h3>Plan Visual Strategy</h3>
          </div>
        </div>
        <div className="featureTextContainer">
          <div className="design">
            <div className="column"><div className="purpleDiv"></div></div>
          </div>
          <div className="featureText">
            <h5>
              With insights in hand, I create a visual roadmap. This includes
              grids, layouts, and content pillars that will guide all your
              visuals. I plan how each element communicates your brand story and
              supports your business goals.
            </h5>
          </div>
        </div>
      </div>
      <div className="tabFeatureItem">
        <div className="featureTitleContainer">
          <div className="design">
            <div className="circle">
              <img
                src="/img/icon/book_5_24dp_FFF_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                className="circleImg"
              />
              <div className="purpleDiv"></div>
            </div>
          </div>
          <div className="featureTitle">
            <h3>Brand Book and Guidelines</h3>
          </div>
        </div>
        <div className="featureTextContainer">
          <div className="design">
            <div className="column"><div className="purpleDiv"></div></div>
          </div>
          <div className="featureText">
            <h5>
              After the visuals are finalized, I build your brand book. It
              includes your logo usage, color systems, typography, and visual
              rules to keep your brand consistent everywhere.
            </h5>
          </div>
        </div>
      </div>
      <div className="tabFeatureItem">
        <div className="featureTitleContainer">
          <div className="design">
            <div className="circle">
              <img
                src="/img/icon/call_24dp_FFF_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                className="circleImg"
              />
              <div className="purpleDiv"></div>
            </div>
          </div>
          <div className="featureTitle">
            <h3>Delivery Call</h3>
          </div>
        </div>
        <div className="featureTextContainer">
          <div className="design">
            <div className="column"><div className="purpleDiv"></div></div>
          </div>
          <div className="featureText">
            <h5>
              We wrap up with a final call where I walk you through every asset
              and explain how to use your new identity confidently. You do not
              just get a design, you get a complete brand system built to grow
              with you.
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="featureTabDesc">
    <h3>
      This strategic approach is why clients often do not want to let me go.
      Every design decision is purposeful, and the results speak for themselves.
    </h3>
    <h3 style={{}}>Ready to make your brand truly stand out?</h3>
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
<div className="container4 container">
  <div className="banner">
    <div className="bannerText">
      <h1>Why Video Editing Matters</h1>
      <p>
        Video editing is the process of cutting, arranging, and enhancing video
        clips to create a smooth, engaging final product. It includes adding
        effects, audio, and color adjustments to improve the overall look and
        feel.
      </p>
      {/**/}
    </div>
  </div>
</div>
    </>
  );
}
