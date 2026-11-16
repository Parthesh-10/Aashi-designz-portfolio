export default function Header() {
  return (
    <>
      <div className="cursor">
        <img src="/img/cursor.svg" alt="" />
      </div>
      <div className="navbar">
        <div className="navbarContainer">
          <a href="/">
            <div className="navImg"></div>
          </a>
          <div className="hamburger clickable">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
        <div className="navMenuDiv">
          <div className="navLinkDiv">
            <div className="navLinks">
              <a href="/" className="navLink clickable">HOME</a>
              <a href="/about" className="navLink clickable">ABOUT US</a>
              <h3 className="navLink">SERVICES</h3>
              <div className="dropDown">
                <a className="subLinks navLink clickable" href="/service/branddesign">Brand Design</a>
                <a className="subLinks navLink clickable" href="/service/graphicdesign">Graphic Design</a>
                <a className="subLinks navLink clickable" href="/service/designstrategy">Design Strategy</a>
                <a className="subLinks navLink clickable" href="/service/videoediting">Video Editing</a>
                <a className="subLinks navLink clickable" href="/service/uiuxdesign">UI/UX Design</a>
              </div>

              <h3 className="navLink">CASE STUDY</h3>
              <div className="dropDown">
                <a className="subLinks navLink clickable" href="/casestudy/synctrip">Sync Trip</a>
              </div>
            </div>

            <div className="navLinks">
              <a href="/contact" className="navLink clickable">CONTACT</a>

              <div className="navSocialLinks">
                <a className="clickable" rel="noopener noreferrer" href="https://www.behance.net/aashidesignz">
                  <img src="/img/icon/behance.svg" alt="socialLogo" className="socialLogo" />
                </a>
                <a className="clickable" rel="noopener noreferrer" href="https://www.instagram.com/aashi.designz?igsh=Zzd6aDg3cjNkcWph">
                  <img src="/img/icon/instagram.svg" alt="socialLogo" className="socialLogo" />
                </a>
                <a className="clickable" rel="noopener noreferrer" href="https://in.pinterest.com/aashidesign2/">
                  <img src="/img/icon/pinterest.svg" alt="socialLogo" className="socialLogo" />
                </a>
                <a className="clickable" rel="noopener noreferrer" href="https://www.linkedin.com/in/ayushi29?utm_source=share_via&utm_content=profile&utm_medium=member_android">
                  <img src="/img/icon/linkedin.svg" alt="socialLogo" className="socialLogo" />
                </a>
              </div>

              <a href="/contact">
                <button className="contact clickable">
                  <h5>Work With Me</h5>
                  <div className="arrowDiv">
                    <img src="/img/icon/arrowWhite.svg" alt="" className="arrow" />
                    <img src="/img/icon/arrowWhite.svg" alt="" className="arrow2" />
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
