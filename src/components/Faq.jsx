import Link from 'next/link';

export default function Faq() {
  return (
    <div className="faqContainer">
      <div className="faqText">
        <h4>FAQ</h4>
        <h3>
          answer clickables to common questions to help you understand
          <span style={{ color: "black", fontWeight: 500 }}>
            {" "}the process and how we can work together
          </span>
        </h3>
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
      <div className="faqAccordian">
        <div className="tab clickable">
          <div className="questionDiv">
            <h1 className="question">What’s your typical project timeline?</h1>
            <div className="cross">
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <h3 className="answer clickable">
            The timeline depends on the project’s scope and complexity. Branding and
            UI/UX projects usually take 2–6 weeks, while Framer website development
            can range from 1–4 weeks. I’ll provide a detailed timeline after the
            project brief
          </h3>
        </div>
        <div className="tab clickable">
          <div className="questionDiv">
            <h1 className="question">What kind of work do you take on?</h1>
            <div className="cross">
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <h3 className="answer clickable">
            I take on projects that mix design and strategy. That includes brand
            strategy, brand identity design, content creation, website and UI
            design, and creative direction. Basically, anything that helps a brand
            look good and make sense.
          </h3>
        </div>
        <div className="tab clickable">
          <div className="questionDiv">
            <h1 className="question">How do we get started?</h1>
            <div className="cross">
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <h3 className="answer">
            Just send me a quick message about what you’re building. We’ll chat
            about your goals and vibe, and I’ll share a plan with the process,
            pricing, and next steps to get rolling.
          </h3>
        </div>
        <div className="tab clickable">
          <div className="questionDiv">
            <h1 className="question">What’s your design process like?</h1>
            <div className="cross">
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <h3 className="answer clickable">
            It’s simple. I start with research and clarity, move into concept
            exploration, and then refine through feedback. You’ll always know why
            something is designed a certain way because every choice has logic
            behind it.
          </h3>
        </div>
        <div className="tab clickable">
          <div className="questionDiv">
            <h1 className="question">Do you work with clients outside India?</h1>
            <div className="cross">
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <h3 className="answer clickable">
            Yes, absolutely. Most of my projects happen online, so distance has
            never been an issue. I work across time zones and keep everything
            organized through calls, Notion, and email.
          </h3>
        </div>
      </div>
    </div>
  );
}
