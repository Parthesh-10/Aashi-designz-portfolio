import BrandingHero from '@/components/BrandingHero/BrandingHero';
import WhyItMattersBranding from '@/components/WhyItMattersBranding/WhyItMattersBranding';

export const metadata = {
  title: 'Branding & Strategy | Aashidesignz',
  description:
    'From strategy to storytelling, we build distinctive brand identities that look good, stand out, and stay remembered.',
};

/**
 * Branding & Strategy Service Page (/service/branding)
 * Scope:
 * 1. Hero section sharing identical layout and typography with /service/graphicdesign and /service/edits
 * 2. "Why it matters" intro block with eyebrow, two-line headline, and 72% dark-framed image card
 */
export default function BrandingPage() {
  return (
    <>
      <BrandingHero />
      <WhyItMattersBranding />
    </>
  );
}
