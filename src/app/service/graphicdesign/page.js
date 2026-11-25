import Link from 'next/link';
import GraphicDesignHero from '@/components/GraphicDesignHero/GraphicDesignHero';
import WhyItMattersApps from '@/components/WhyItMattersApps/WhyItMattersApps';
import HowItWorksApps from '@/components/HowItWorksApps/HowItWorksApps';
import MyWorkApps from '@/components/MyWorkApps/MyWorkApps';
import DigitalExperienceApps from '@/components/DigitalExperienceApps/DigitalExperienceApps';
import LogoSlider from '@/components/LogoSlider';
import ClientFeedbackApps from '@/components/ClientFeedbackApps/ClientFeedbackApps';

export default function GraphicDesign() {
  return (
    <>
      <GraphicDesignHero />
      <WhyItMattersApps />
      <HowItWorksApps />
      <MyWorkApps />
      <DigitalExperienceApps />
      <div className="apps-brands-strip">
        <LogoSlider />
      </div>
      <ClientFeedbackApps />

      <div className="container4 container">
        <div className="banner">
          <div className="bannerText">
            <h1>Understanding Graphic Design</h1>
            <p>
              Graphic designing is the art of creating visual content that
              communicates messages clearly and creatively. It combines elements like
              typography, color, imagery, and layout to produce designs that capture
              attention and convey meaning. Whether it’s logos, posters, social media
              visuals, or brand identities, graphic design plays a key role in shaping
              how people perceive and connect with a brand or idea.
            </p>
            <a
              className="contactLink clickable"
              href="/pdf/graphicdesigning.pdf"
              download
            >
              <button className="pdfDownload">
                <h3>Download Now</h3>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
