import Link from 'next/link';
import GraphicDesignHero from '@/components/GraphicDesignHero/GraphicDesignHero';
import WhyItMattersApps from '@/components/WhyItMattersApps/WhyItMattersApps';
import HowItWorksApps from '@/components/HowItWorksApps/HowItWorksApps';
import MyWorkApps from '@/components/MyWorkApps/MyWorkApps';
import DigitalExperienceApps from '@/components/DigitalExperienceApps/DigitalExperienceApps';
import LogoSlider from '@/components/LogoSlider';
import ClientFeedbackApps from '@/components/ClientFeedbackApps/ClientFeedbackApps';

export const metadata = {
  title: 'UI/UX Design | Aashidesignz',
  description:
    'Designing experiences that make sense. Apps and websites built around people.',
};

export default function UiUxDesign() {
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
            <h1>The Essence of UI/UX Design</h1>
            <p>
              UI/UX design is about creating digital products that look good and feel
              easy to use. UI focuses on visuals, while UX ensures the experience is
              smooth, intuitive, and satisfying for the user.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
