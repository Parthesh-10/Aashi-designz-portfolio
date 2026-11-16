import './EmployeeSection.css';

export default function EmployeeSection() {
  return (
    <section className="employee-section container">
      <h2 className="employee-heading">Employee of the Era</h2>
      <div className="employee-content">
        <div className="employee-image-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/miss-kitanu.png"
            alt="Miss. Kitanu, the office cat, napping on a cushion"
            className="employee-image"
            width={1024}
            height={575}
            loading="lazy"
          />
        </div>
        <div className="employee-details">
          <div className="employee-header">
            <h3 className="employee-name">Miss. Kitanu</h3>
            <span className="employee-role">(Chief Vibes Officer)</span>
          </div>
          <div className="employee-bio">
            <p>
              When I&apos;m not supervising nap schedules, I&apos;m the Chief Vibe Officer at <strong>Aashi Designz</strong>.
            </p>
            <p>
              My responsibilities include maintaining team morale, conducting surprise desk inspections, and ensuring everyone takes their mandatory breaks (preferably to admire me).
            </p>
            <p>
              You may find my colleagues on LinkedIn. I prefer to remain a mystery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

