'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
  answerClickable: boolean;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What’s your typical project timeline?",
    answer:
      "The timeline depends on the project’s scope and complexity. Branding and UI/UX projects usually take 2–6 weeks, while Framer website development can range from 1–4 weeks. I’ll provide a detailed timeline after the project brief",
    answerClickable: true,
  },
  {
    question: "What kind of work do you take on?",
    answer:
      "I take on projects that mix design and strategy. That includes brand strategy, brand identity design, content creation, website and UI design, and creative direction. Basically, anything that helps a brand look good and make sense.",
    answerClickable: true,
  },
  {
    question: "How do we get started?",
    answer:
      "Just send me a quick message about what you’re building. We’ll chat about your goals and vibe, and I’ll share a plan with the process, pricing, and next steps to get rolling.",
    answerClickable: false,
  },
  {
    question: "What’s your design process like?",
    answer:
      "It’s simple. I start with research and clarity, move into concept exploration, and then refine through feedback. You’ll always know why something is designed a certain way because every choice has logic behind it.",
    answerClickable: true,
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes, absolutely. Most of my projects happen online, so distance has never been an issue. I work across time zones and keep everything organized through calls, Notion, and email.",
    answerClickable: true,
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleTab = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="faqContainer">
      <div className="faqText">
        <h4>FAQ</h4>
        <h3>
          answer clickables to common questions to help you understand
          <span style={{ color: 'black', fontWeight: 500 }}>
            {' '}
            the process and how we can work together
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
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.question}
              className="tab clickable"
              onClick={() => toggleTab(idx)}
            >
              <div className="questionDiv">
                <h1 className="question">{item.question}</h1>
                <div className={`cross${isOpen ? ' rotate' : ''}`}>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
              <h3
                className={`answer${item.answerClickable ? ' clickable' : ''}${
                  isOpen ? ' show' : ''
                }`}
              >
                {item.answer}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
