export default function Slider() {
  const testimonials = [
    {
      text: "Ayushi didn’t just design our travel app, she shaped its flow and features too. Her ideas made the app smoother. Working with her felt easy and insightful from start to finish.",
      name: "Rahul Kaushal",
      role: "Synctrip"
    },
    {
      text: "Working with Ayushi was such a great experience. She instantly understood what we wanted and turned our rough thoughts into a brand that feels just right.",
      name: "Richa Bajaj",
      role: "Strategy analyst at Edurev"
    },
    {
      text: "Ayushi’s insights about kids’ behavior were spot on. She made our app fun, simple, and smart. We even hired her again for brand strategy after seeing her impact.",
      name: "Suresh U",
      role: "Exam hub"
    },
    {
      text: "Aashi understood our product better than we did. Her UI design felt simple but powerful. She made sure every screen had purpose, and the result speaks for itself.",
      name: "Harshit Krishanatri",
      role: "CFO at Jeevayugan"
    },
    {
      text: "Our brand went from scattered to solid. Aashi helped us find the “why” behind what we do and built a design system that actually supports it. Everything now feels intentional.",
      name: "Nitesh Kochhar",
      role: "Director at Kochhar's Media Planner"
    },
    {
      text: "We started with a small rebrand idea and ended up rethinking our whole presence. Aashi brought structure, clarity, and meaning to everything. Working with her felt easy and exciting.",
      name: "Ayaan Dalal",
      role: "Stegas Corp"
    },
    {
      text: "Aashi doesn’t just design things that look good. She thinks deeply about how people experience them. That mix of logic and creativity is what makes her work stand out.",
      name: "Shivank Gautam",
      role: "Aanavish"
    },
    {
      text: "Aashi made design feel effortless. She explained every decision, kept things clear, and turned our half-formed ideas into something sharp and complete.",
      name: "Janvi",
      role: "Senior Digital Marketer at Milestone"
    },
    {
      text: "Our project finally came to life after Aashi stepped in. She connected design with business goals in a way that just clicked. The outcome feels smart, modern, and totally us.",
      name: "Bhawna",
      role: "Growlink Dubai"
    }
  ];

  return (
    <div className="swiperContainer">
      <div className="swiper">
        <div className="swiper-wrapper">
          {testimonials.map((t, index) => (
            <div className="swiper-slide" key={index}>
              <div className="testimonialContainer">
                <div className="quotesImg">
                  <img src="/img/quotes.svg" alt="" />
                </div>
                <h4 className="clientReview">
                  {t.text}
                </h4>
                <div className="clientDetails">
                  <div className="clientName">
                    <h4>{t.name}</h4>
                    <h5>{t.role}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <img className="previous-btn slider-btn clickable" src="/img/icon/arrow-left.png" alt="" />
        <img className="next-btn slider-btn clickable" src="/img/icon/arrow-right.png" alt="" />

        <div className="swiper-scrollbar"></div>
      </div>
    </div>
  );
}
