interface ExhibitItem {
  image: string;
  title: string;
  caption: string;
  alt: string;
}

const EXHIBITS: ExhibitItem[] = [
  {
    image: '/img/exhibit-switchboard.jpg',
    title: 'Exhibit A: The switchboard',
    caption: "It worked perfectly fine. That wasn't the point.",
    alt: 'A hand painted switchboard cover',
  },
  {
    image: '/img/exhibit-doghouse.jpg',
    title: 'Exhibit B: The dog house',
    caption: 'A few cardboard boxes. A few curious kids. A better home for some four-legged neighbours.',
    alt: 'A cardboard dog house with colourful flowers',
  },
  {
    image: '/img/exhibit-kitchen.jpg',
    title: 'Exhibit C: The kitchen experiment',
    caption: 'No recipe. No rules. Just cuisines that had no business meeting each other.',
    alt: 'A plate of loaded tacos',
  },
];

export default function ProblemSection() {
  return (
    <section className="problem-section container">
      <div className="problem-header">
        <h2 className="problem-heading">But I have a problem.</h2>
        <p className="problem-description">
          I see an ordinary object and immediately wonder if I could make it myself,
          paint it, photograph it, or somehow make it more complicated than necessary.
        </p>
      </div>

      <div className="problem-grid">
        {EXHIBITS.map((item, index) => (
          <div key={index} className="problem-card">
            <div className="problem-image-wrapper">
              <img
                src={item.image}
                alt={item.alt}
                className="problem-image"
                loading="lazy"
              />
            </div>
            <h3 className="problem-card-title">{item.title}</h3>
            <p className="problem-card-caption">{item.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
