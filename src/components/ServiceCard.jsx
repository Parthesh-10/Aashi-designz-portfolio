import Link from 'next/link';

export default function ServiceCard() {
  return (
    <div className="cardContainer">
      <Link className="clickable" href="/service/branddesign">
        <div className="card-item clickable">
          <div className="skillName">
            <div className="textChange">
              <h3 className="skill">Brand Designing</h3>
              <h3 className="skill">Check My Work</h3>
            </div>
            <div
              style={{ width: "3rem", height: "3rem", background: "#fff", borderRadius: "16px" }}
              className="empty"
            >
              <img className="serviceCardIcon" src="/img/icon/brand-loyalty.png" alt="" />
              <img className="serviceCardIcon" src="/img/icon/arrowBlack.svg" alt="" />
            </div>
          </div>
          <div className="skillPara">
            <div className="shadow"></div>
            <p>
              A strong brand is more than a logo; it’s how people remember you. I
              create cohesive, impactful brand identities that ensure consistency
              across every touchpoint.
            </p>
            <div className="skillImg">
              <img src="/img/serviceCard/branddesign1.jpeg" alt="" />
              <img src="/img/serviceCard/branddesign2.jpeg" alt="" />
              <img src="/img/serviceCard/branddesign3.jpeg" alt="" />
            </div>
            <div className="skillTab">
              <div><h3>Logo Design</h3></div>
              <div><h3>Brand Identity</h3></div>
              <div><h3>Full Rebrands</h3></div>
              <div><h3>Visual Guidelines</h3></div>
            </div>
          </div>
        </div>
      </Link>
      <Link className="clickable" href="/service/uiuxdesign">
        <div className="card-item clickable">
          <div className="skillName">
            <div className="textChange">
              <h3 className="skill">UI/UX Design</h3>
              <h3 className="skill">Check My Work</h3>
            </div>
            <div
              style={{ width: "3rem", height: "3rem", background: "#b388eb", borderRadius: "16px" }}
              className="empty"
            >
              <img className="serviceCardIcon" src="/img/icon/flyers.png" alt="" />
              <img className="serviceCardIcon" src="/img/icon/arrowBlack.svg" alt="" />
            </div>
          </div>
          <div className="skillPara">
            <div className="shadow"></div>
            <p>
              Designing websites and apps that are intuitive, functional, and
              visually engaging. Whether it’s a landing page or a full-scale
              product, I focus on seamless user experiences.
            </p>
            <div className="skillImg">
              <img src="/img/serviceCard/uiuxdesign1.jpeg" alt="" />
              <img src="/img/serviceCard/uiuxdesign2.jpeg" alt="" />
              <img src="/img/serviceCard/uiuxdesign3.jpeg" alt="" />
            </div>
            <div className="skillTab">
              <div><h3>Landing Pages</h3></div>
              <div><h3>Dashboard & Portals</h3></div>
              <div><h3>Web & App Design</h3></div>
              <div><h3>Design Systems</h3></div>
            </div>
          </div>
        </div>
      </Link>
      <Link className="clickable" href="/service/designstrategy">
        <div className="card-item clickable">
          <div className="skillName">
            <div className="textChange">
              <h3 className="skill">Brand Strategy</h3>
              <h3 className="skill">Check My Work</h3>
            </div>
            <div
              style={{ width: "3rem", height: "3rem", background: "#fff", borderRadius: "16px" }}
              className="empty"
            >
              <img className="serviceCardIcon" src="/img/icon/brand-awareness.png" alt="" />
              <img className="serviceCardIcon" src="/img/icon/arrowBlack.svg" alt="" />
            </div>
          </div>
          <div className="skillPara">
            <div className="shadow"></div>
            <p>
              Building brand strategies that define your identity and connect with
              your audience. From positioning to visuals, I craft brands that stand
              out and drive impact.
            </p>
            <div className="skillImg">
              <img src="/img/serviceCard/brandstrategy1.jpeg" alt="" />
              <img src="/img/serviceCard/brandstrategy2.jpeg" alt="" />
              <img src="/img/serviceCard/brandstrategy3.jpeg" alt="" />
            </div>
            <div className="skillTab">
              <div><h3>Brand Identity Design</h3></div>
              <div><h3>Market Positioning</h3></div>
              <div><h3>Brand Messaging</h3></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
