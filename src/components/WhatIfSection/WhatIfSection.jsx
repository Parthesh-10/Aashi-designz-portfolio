import Link from 'next/link';
import './WhatIfSection.css';

export default function WhatIfSection() {
  return (
    <section className="whatif-section container">
      <div className="whatif-card">
        <h2 className="whatif-heading">
          From <span className="whatif-purple">&ldquo;what if&rdquo;</span> to{' '}
          <span className="whatif-purple">&ldquo;what&apos;s next&rdquo;</span>.
        </h2>

        <p className="whatif-subheading">
          From first thought to final design, in three simple steps.
        </p>

        <div className="whatif-grid">
          <div className="whatif-col">
            <div className="whatif-icon-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/what-if-brief.png"
                alt=""
                aria-hidden="true"
                className="whatif-icon"
                width={662}
                height={660}
                loading="lazy"
              />
            </div>
            <h3 className="whatif-col-title">The Brief</h3>
            <p className="whatif-col-desc">
              You bring the idea, the problem, or the half-formed thought. We&apos;ll ask the right questions.
            </p>
          </div>

          <div className="whatif-col">
            <div className="whatif-icon-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/what-if-thinking.png"
                alt=""
                aria-hidden="true"
                className="whatif-icon"
                width={554}
                height={554}
                loading="lazy"
              />
            </div>
            <h3 className="whatif-col-title">The Thinking</h3>
            <p className="whatif-col-desc">
              We connect the dots, challenge assumptions, and figure out what will actually work.
            </p>
          </div>

          <div className="whatif-col">
            <div className="whatif-icon-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/what-if-making.png"
                alt=""
                aria-hidden="true"
                className="whatif-icon"
                width={510}
                height={510}
                loading="lazy"
              />
            </div>
            <h3 className="whatif-col-title">The Making</h3>
            <p className="whatif-col-desc">
              We turn the thinking into design, share our work, refine it together, and get it out into the world.
            </p>
          </div>
        </div>

        <div className="whatif-btn-wrapper">
          <Link href="/contact" className="whatif-btn">
            Connect Now
          </Link>
        </div>
      </div>
    </section>
  );
}

