import Link from 'next/link';
import './ServicesHero.css';

export default function ServicesHero() {
  return (
    <section className="svchero-section container">
      <div className="svchero-grid">
        <div className="svchero-left">
          <div className="svchero-label-container">
            <span className="svchero-dot" aria-hidden="true" />
            <span className="svchero-label">SERVICES</span>
          </div>
          <h1 className="svchero-heading">
            What if ₹50,000<br className="svchero-desktop-br" /> isn&apos;t a cost?
          </h1>
          <p className="svchero-subtext">
            But the first half of ₹1,00,000?<br className="svchero-desktop-br" /> Marketing that pays for itself.
          </p>
        </div>

        <div className="svchero-right">
          <div className="svchero-image-wrapper">
            <img
              src="/img/services-hero.jpg"
              alt="Phone showing a goal completion tracker held over a pink floor next to a sneaker"
              className="svchero-image"
              loading="eager"
            />
          </div>

          <div className="svchero-button-wrapper">
            <Link href="/contact" className="clickable">
              <button type="button" className="contact clickable svchero-button">
                <h5>Bring the page Alive</h5>
                <div className="arrowDiv">
                  <img src="/img/icon/arrowWhite.svg" alt="" className="arrow" />
                  <img src="/img/icon/arrowWhite.svg" alt="" className="arrow2" />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
