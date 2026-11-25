import Link from 'next/link';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerMain">
        <h1>Lets Connect</h1>
        <Link href="/contact">
          <button className="contact clickable">
            <h5>Hire Me</h5>
            <div className="arrowDiv">
              <img src="/img/icon/arrowWhite.svg" alt="" className="arrow" />
              <img src="/img/icon/arrowWhite.svg" alt="" className="arrow2" />
            </div>
          </button>
        </Link>
      </div>
      <div className="footerMenu">
        <div className="footerDiv1">
          <p>Everything here is build with strategy and snacks</p>
          <div className="socialLogos">
            <a rel="noopener noreferrer" href="https://www.behance.net/aashidesignz">
              <img src="/img/icon/behanceWhite.svg" alt="socialLogo" className="socialLogo" />
            </a>
            <a rel="noopener noreferrer" href="https://www.instagram.com/aashi.designz?igsh=Zzd6aDg3cjNkcWph">
              <img src="/img/icon/instaWhite.svg" alt="socialLogo" className="socialLogo" />
            </a>
            <a className="clickable" rel="noopener noreferrer" href="https://in.pinterest.com/aashidesign2/">
              <img src="/img/icon/pinterestWhite.svg" alt="socialLogo" className="socialLogo" />
            </a>
            <a rel="noopener noreferrer" href="https://www.linkedin.com/in/ayushi29?utm_source=share_via&utm_content=profile&utm_medium=member_android">
              <img src="/img/icon/linkedinWhite.svg" alt="socialLogo" className="socialLogo" />
            </a>
          </div>
        </div>
        <div className="footerDiv2">
          <ul className="footerList">
            <li>
              <p>Navigation</p>
            </li>
            <li>
              <Link className="clickable" href="/">
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link className="clickable" href="/about">
                <p>About Us</p>
              </Link>
            </li>
            <li>
              <Link className="clickable" href="/privacypolicy">
                <p>Privacy Policy</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="footerDiv3">
          <ul className="footerList">
            <li>
              <p>Contact</p>
            </li>
            <li>
              <p>+91 7015705130</p>
            </li>
            <li>
              <p>contact@aashidesignz.com</p>
            </li>
            <li>
              <p>Ambala city, Haryana, 134004, India</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="footerCopyright">
        <p>Copyright© 2023 Aashidesignz. All Rights Reserved.</p>
        <Link href="/privacypolicy">
          <p>User Terms &amp; Conditions</p>
        </Link>
      </div>
    </div>
  );
}
