import BrandingHero from '@/components/BrandingHero/BrandingHero';
import WhyItMattersBranding from '@/components/WhyItMattersBranding/WhyItMattersBranding';
import IncludedGallery from '@/components/IncludedGallery/IncludedGallery';
import ServiceIntro from '@/components/ServiceIntro/ServiceIntro';
import MyWorkBranding from '@/components/MyWorkBranding/MyWorkBranding';
import SplitBrandSection from '@/components/SplitBrandSection/SplitBrandSection';
import {
  BRANDING_INCLUDED_ITEMS,
  BRANDING_INTRO_DATA,
} from '@/constant/brandingData';

export const metadata = {
  title: 'Branding & Strategy | Aashidesignz',
  description:
    'From strategy to storytelling, we build distinctive brand identities that look good, stand out, and stay remembered.',
};

/**
 * Branding & Strategy Service Page (/service/branding)
 * Scope:
 * 1. Hero section sharing identical layout and typography with /service/graphicdesign and /service/edits
 * 2. "Why it matters" intro block with eyebrow, two-line headline, and comparison slider
 * 3. "What’s Included" gallery section directly below stats row
 * 4. "Be the brand they come back to." intro section directly below gallery
 */
export default function BrandingPage() {
  return (
    <>
      <BrandingHero />
      <WhyItMattersBranding />
      <IncludedGallery
        id="whats-included"
        heading="What’s Included"
        subtitle="Brand-building essentials"
        subtitleUppercase={true}
        items={BRANDING_INCLUDED_ITEMS}
      />
      <ServiceIntro
        id="branding-intro"
        eyebrow={BRANDING_INTRO_DATA.eyebrow}
        headline={BRANDING_INTRO_DATA.headline}
        stats={BRANDING_INTRO_DATA.stats}
        quote={BRANDING_INTRO_DATA.quote}
      />
      <MyWorkBranding />
      <SplitBrandSection />
    </>
  );
}
