import TiltedCard from '@/components/TiltedCard/TiltedCard';
import './ResultsSection.css';

const RefreshIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21.5 2v6h-6" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
  </svg>
);

export default function ResultsSection({ resultsData = [] }) {
  return (
    <section className="results-section container">
      <h2 className="results-heading">Our Proven Result</h2>

      <div className="results-grid">
        {resultsData.map((card) => (
          <div key={card.id} className="results-card-wrapper">
            <TiltedCard
              containerHeight="195px"
              containerWidth="100%"
              radius={12}
              rotateAmplitude={12}
              scaleOnHover={1.03}
              flipOnHover={true}
              flipOnClick={false}
              ariaLabel={`${card.front.number} ${card.front.label}`}
              backContent={
                <div className="results-back">
                  <div className="results-back-glow" />
                  <div className="results-back-title">{card.back.title}</div>
                  <div className="results-back-stats">
                    {card.back.stats.map((stat, idx) => (
                      <div key={idx} style={{ display: 'contents' }}>
                        {idx > 0 && <div className="results-stat-divider" />}
                        <div className="results-back-stat">
                          <span className="results-stat-val">{stat.value}</span>
                          <span className="results-stat-lbl">{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="results-flip-btn results-flip-btn-light" aria-hidden="true">
                    <RefreshIcon />
                  </span>
                </div>
              }
            >
              <div className="results-front">
                <div className="results-front-glow1" />
                <div className="results-front-glow2" />
                <div className="results-front-content">
                  <span className="results-front-number">{card.front.number}</span>
                  <span className="results-front-label">{card.front.label}</span>
                </div>
                <span className="results-flip-btn results-flip-btn-dark" aria-hidden="true">
                  <RefreshIcon />
                </span>
              </div>
            </TiltedCard>
          </div>
        ))}
      </div>
    </section>
  );
}

