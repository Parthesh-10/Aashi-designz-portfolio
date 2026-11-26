import BrandDesignHero from '@/components/BrandDesignHero/BrandDesignHero';
import HowWeDo from '@/components/HowWeDo/HowWeDo';
import ServiceOutcomes from '@/components/ServiceOutcomes/ServiceOutcomes';
import FindYourFit from '@/components/FindYourFit/FindYourFit';
import PageContainer from '@/components/PageContainer';

export const metadata = {
  title: 'Services | Aashidesignz',
  description:
    'From branding and UI/UX to digital marketing and video editing, explore our full range of design and creative services.',
};

export default function ServicesPage() {
  return (
    <div className="service-page-layout">
      <BrandDesignHero />
      <HowWeDo />
      <ServiceOutcomes />
      <FindYourFit />
      <PageContainer className="!px-6 md:!px-12 xl:!px-[min(10.4vw,200px)]">
        <div className="container4 w-full">
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
      </PageContainer>
    </div>
  );
}
