import ServicesHero from '@/components/ServicesHero/ServicesHero';
import HowWeDo from '@/components/HowWeDo/HowWeDo';
import CanWeHelpYou from '@/components/CanWeHelpYou/CanWeHelpYou';
import FindYourFit from '@/components/FindYourFit/FindYourFit';

export default function BrandDesign() {
  return (
    <>
      <ServicesHero />
      <HowWeDo />
      <CanWeHelpYou />
      <FindYourFit />
      <div className="container4 container">
        <div className="banner">
          <div className="bannerText">
            <h1>Free Brand Identity Starter Kit</h1>
            <p>
              Your brand deserves clarity, not confusion. Download this free Brand
              Onboarding Questionnaire to uncover your brand’s purpose, personality,
              and vision before you even start designing. A quick win for founders and
              creators who want to understand their brand before building it.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
