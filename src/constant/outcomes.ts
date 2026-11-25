/**
 * Outcomes Data for Service Outcomes Section (/service/branddesign)
 */

export interface OutcomeItem {
  id: string;
  title: string;
  pills: string[];
  image: string;
}

// Toggle to true once images are dropped into /public/images/outcomes/
export const HAS_OUTCOMES_IMAGES = false;

export const OUTCOMES_DATA: OutcomeItem[] = [
  {
    id: 'brand-visibility',
    title: 'Brand visibility',
    pills: ['Reach', 'Exposure', 'Recall'],
    image: '/images/outcomes/brand-visibility.webp',
  },
  {
    id: 'audience-engagement',
    title: 'Audience engagement',
    pills: ['Clicks', 'Engagement', 'Enquiries'],
    image: '/images/outcomes/audience-engagement.webp',
  },
  {
    id: 'business-growth',
    title: 'Business growth',
    pills: ['Leads', 'Sales', 'Revenue'],
    image: '/images/outcomes/business-growth.webp',
  },
  {
    id: 'market-presence',
    title: 'Market presence',
    pills: ['Territories', 'Platforms', 'Audiences'],
    image: '/images/outcomes/market-presence.webp',
  },
  {
    id: 'customer-acquisition',
    title: 'Customer acquisition',
    pills: ['Discovery', 'Conversion', 'Retention'],
    image: '/images/outcomes/customer-acquisition.webp',
  },
  {
    id: 'brand-credibility',
    title: 'Brand credibility',
    pills: ['Authority', 'Recognition', 'Trust'],
    image: '/images/outcomes/brand-credibility.webp',
  },
];

export default OUTCOMES_DATA;
