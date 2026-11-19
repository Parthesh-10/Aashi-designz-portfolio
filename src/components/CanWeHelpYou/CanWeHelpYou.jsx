import './CanWeHelpYou.css';

export default function CanWeHelpYou() {
  return (
    <section className="canwehelp-section container">
      <h2 className="canwehelp-heading">Can we help you?</h2>

      <div className="canwehelp-grid">
        {/* Card 1: Yes, if */}
        <div className="canwehelp-card canwehelp-card-yes">
          <h3 className="canwehelp-card-title">Yes, if</h3>
          <ul className="canwehelp-list">
            <li className="canwehelp-item">
              <span className="canwehelp-icon-wrap canwehelp-icon-plus" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2V12M2 7H12"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="canwehelp-text">Want sales, not just likes</span>
            </li>
            <li className="canwehelp-item">
              <span className="canwehelp-icon-wrap canwehelp-icon-plus" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2V12M2 7H12"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="canwehelp-text">Can give atleast 3 months</span>
            </li>
            <li className="canwehelp-item">
              <span className="canwehelp-icon-wrap canwehelp-icon-plus" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2V12M2 7H12"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="canwehelp-text">You believe in the process</span>
            </li>
          </ul>
        </div>

        {/* Card 2: No, if */}
        <div className="canwehelp-card canwehelp-card-no">
          <h3 className="canwehelp-card-title">No, if</h3>
          <ul className="canwehelp-list">
            <li className="canwehelp-item">
              <span className="canwehelp-icon-wrap canwehelp-icon-minus" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7H11"
                    stroke="#323944"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="canwehelp-text">Want overnight</span>
            </li>
            <li className="canwehelp-item">
              <span className="canwehelp-icon-wrap canwehelp-icon-minus" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7H11"
                    stroke="#323944"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="canwehelp-text">Chasing cheapest</span>
            </li>
            <li className="canwehelp-item">
              <span className="canwehelp-icon-wrap canwehelp-icon-minus" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7H11"
                    stroke="#323944"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="canwehelp-text">Marketing = Expense</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
