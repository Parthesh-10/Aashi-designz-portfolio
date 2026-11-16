import LanyardCard from '@/components/Lanyard/LanyardCard';
import PassageSection from '@/components/PassageGallery/PassageSection';
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

<div className="aboutContainer3 container">
  <div className="container3Heading">
    <div className="dotContainer">
      <div className="dot"></div>
      <h6>WHY I’M USEFUL TO YOU?</h6>
    </div>
    <h3><span style={{}}>Here&apos;s</span> what I do!</h3>
  </div>
  <div className="container3Content">
    <div className="grid">
      <a className="clickable" href="/service/designstrategy">
        <div className="aboutGrid-item">
          <div>
            <h1>01</h1>
            <div className="gridIcon">
              <img src="/img/icon/arrowWhite.svg" alt="" />
            </div>
          </div>
          <div className="gridItemContent">
            <p>Design Strategy</p>
            <h3>Strategize your brand for impact</h3>
          </div>
        </div>
      </a>
      <a className="clickable" href="/service/uiuxdesign">
        <div className="aboutGrid-item">
          <div>
            <h1>02</h1>
            <div className="gridIcon">
              <img src="/img/icon/arrowWhite.svg" alt="" />
            </div>
          </div>
          <div className="gridItemContent">
            <p>UI/UX</p>
            <h3>Craft interfaces that feel natural</h3>
          </div>
        </div>
      </a>
      <a className="clickable" href="/service/graphicdesign">
        <div className="aboutGrid-item">
          <div>
            <h1>03</h1>
            <div className="gridIcon">
              <img src="/img/icon/arrowWhite.svg" alt="" />
            </div>
          </div>
          <div className="gridItemContent">
            <p>Graphic Design</p>
            <h3>Design graphics that speak volumes</h3>
          </div>
        </div>
      </a>
      <a className="clickable" href="/service/branddesign">
        <div className="aboutGrid-item">
          <div>
            <h1>04</h1>
            <div className="gridIcon">
              <img src="/img/icon/arrowWhite.svg" alt="" />
            </div>
          </div>
          <div className="gridItemContent">
            <p>Brand Design</p>
            <h3>Build identities people never forget</h3>
          </div>
        </div>
      </a>
      <a className="clickable" href="/service/videoediting">
        <div className="aboutGrid-item">
          <div>
            <h1>05</h1>
            <div className="gridIcon">
              <img src="/img/icon/arrowWhite.svg" alt="" />
            </div>
          </div>
          <div className="gridItemContent">
            <p>Video Editing</p>
            <h3>Bring your visuals to life with motion and story</h3>
          </div>
        </div>
      </a>
      <a className="clickable" href="/contact">
        <div className="aboutGrid-item">
          <div>
            <h1>06</h1>
            <div className="gridIcon">
              <img src="/img/icon/arrowWhite.svg" alt="" />
            </div>
          </div>
          <div className="gridItemContent">
            <p>Turn brooms into aircrafts</p>
            <h3>
              Simply put, I adapt, experiment, and create clever design
              solutions that fit your unique needs, even the ones you didn’t
              know you had.
            </h3>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
<div className="aboutContainer4 container">
  <div className="container4Heading">
 <div className="dotContainer">
      <div className="dot"></div>
      <h6>CLIENT FEEDBACK</h6>
    </div>
    <h3>
      <span style={{}}>Don’t take it from me, </span> take it from
      them.
    </h3>
  </div>
  <div className="container4Content">
    <div className="testimonial">
      <div>
        <div className="userDetails">
          <h3>Rahul Kaushal</h3>
          <div className="silverDot"></div>
          <h6>Synctrip</h6>
        </div>
        <div className="userReview">
          <h3>
            Ayushi didn’t just design our travel app, she shaped its flow and
            features too. Her ideas made the app smoother. Working with her felt
            easy and insightful from start to finish.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Richa Bajaj</h3>
          <div className="silverDot"></div>
          <h6>Content Strategist at Edurev</h6>
        </div>
        <div className="userReview">
          <h3>
            Working with Ayushi was such a great experience. She instantly
            understood what we wanted and turned our rough thoughts into a brand
            that feels just right.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Suresh U</h3>
          <div className="silverDot"></div>
          <h6>Exam hub</h6>
        </div>
        <div className="userReview">
          <h3>
            Ayushi’s insights about kids’ behavior were spot on. She made our
            app fun, simple, and smart. We even hired her again for brand
            strategy after seeing her impact.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Harshit Krishanatri</h3>
          <div className="silverDot"></div>
          <h6>CFO at Jeevayugan</h6>
        </div>
        <div className="userReview">
          <h3>
            Aashi understood our product better than we did. Her UI design felt
            simple but powerful. She made sure every screen had purpose, and the
            result speaks for itself.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Nitesh Kochhar</h3>
          <div className="silverDot"></div>
          <h6>Director at Kochhar&apos;s Media Planner</h6>
        </div>
        <div className="userReview">
          <h3>
            Our brand went from scattered to solid. Aashi helped us find the
            “why” behind what we do and built a design system that actually
            supports it. Everything now feels intentional.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Ayaan Dalal</h3>
          <div className="silverDot"></div>
          <h6>Stegas Corp</h6>
        </div>
        <div className="userReview">
          <h3>
            We started with a small rebrand idea and ended up rethinking our
            whole presence. Aashi brought structure, clarity, and meaning to
            everything. Working with her felt easy and exciting.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Shivank Gautam</h3>
          <div className="silverDot"></div>
          <h6>Kanavish</h6>
        </div>
        <div className="userReview">
          <h3>
            Aashi doesn’t just design things that look good. She thinks deeply
            about how people experience them. That mix of logic and creativity
            is what makes her work stand out.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Janvi</h3>
          <div className="silverDot"></div>
          <h6>Senior Digital Marketer at Milestone</h6>
        </div>
        <div className="userReview">
          <h3>
            Aashi made design feel effortless. She explained every decision,
            kept things clear, and turned our half-formed ideas into something
            sharp and complete.
          </h3>
        </div>
      </div>
      <div>
        <div className="userDetails">
          <h3>Bhawna</h3>
          <div className="silverDot"></div>
          <h6>Growlink Dubai</h6>
        </div>
        <div className="userReview">
          <h3>
            Our project finally came to life after Aashi stepped in. She
            connected design with business goals in a way that just clicked. The
            outcome feels smart, modern, and totally us.
          </h3>
        </div>
      </div>
    </div>
    <div className="testimonialImg">
      <img src="/img/testimonialImg.jpg" alt="" />
    </div>
  </div>
</div>
<div className="aboutContainer5 container">
  <h1>
    <span style={{}}> Benefits of my </span><br />

    flexible – working model
  </h1>
  <div className="workingModelCard">
    <div className="modelCardGrid">
      <div className="modelCard">
        <h1>01</h1>
        <h3>Projects That Move, Not Drag</h3>
        <p>
          I work in short creative cycles, usually 30 to 60 days. You get
          structure, clarity, and results without being tied down by long-term
          commitments. Simple, fast, and focused on progress.
        </p>
      </div>
      <div className="modelCard">
        <h1>02</h1>
        <h3>Return On Design</h3>
        <p>
          Good design should look great, but also work hard. Everything I create
          is meant to make your brand more memorable, more marketable, and more
          profitable. That’s my version of ROI.
        </p>
      </div>
      <div className="modelCard">
        <h1>03</h1>
        <h3>No Scope Headaches</h3>
        <p>
          I believe in transparency. Every step, every idea, and every
          deliverable is discussed upfront. That means no last-minute confusion
          or “this wasn’t part of it” chaos.
        </p>
      </div>
      <div className="modelCard">
        <h1>04</h1>
        <h3>Real-Time Work Flow</h3>
        <p>
          No waiting around for endless proposals. I move quickly, think
          strategically, and build as I go. You’ll always know what’s happening
          and why.
        </p>
      </div>
      <div className="modelCard">
        <h1>05</h1>
        <h3>Your Brand, My Brain</h3>
        <p>
          When you bring me in, you’re not outsourcing. You’re extending your
          own team. I think like your brand’s in-house designer who just happens
          to know how to make visuals that talk loud and sell harder.
        </p>
      </div>
      <div className="modelCard">
        <h1>06</h1>
        <h3>Experience that sees the bigger picture</h3>
        <p>
          Working across different areas of design has taught me how every part
          of a brand plays its own role. From print to digital, I’ve seen how
          one small decision can shift how people see your brand. That
          perspective helps me plan designs that fit into the bigger story
          instead of existing on their own.
        </p>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
