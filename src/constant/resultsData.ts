export interface ResultStat {
  value: string;
  label: string;
}

export interface ResultCardData {
  id: string;
  front: {
    number: string;
    label: string;
  };
  back: {
    title: string;
    stats: ResultStat[];
  };
}

const resultsData: ResultCardData[] = [
  {
    id: 'brand-identities',
    front: {
      number: '50+',
      label: 'Brand identities created',
    },
    back: {
      title: 'Brand Identity & Strategy',
      stats: [
        { value: '20+', label: 'Logo systems' },
        { value: '10+', label: 'Brand guidelines' },
        { value: '5+', label: 'Industries served' },
      ],
    },
  },
  {
    id: 'digital-marketing',
    front: {
      number: '650+',
      label: 'Digital marketing deliverables',
    },
    back: {
      title: 'Digital Media & Marketing',
      stats: [
        { value: '200+', label: 'Social media campaigns' },
        { value: '1000+', label: 'Video edits and reels' },
        { value: '100+', label: 'SEO and marketing projects' },
      ],
    },
  },
  {
    id: 'apps-websites',
    front: {
      number: '20+',
      label: 'Apps and websites made',
    },
    back: {
      title: 'UI/UX & Digital Products',
      stats: [
        { value: '5+', label: 'Apps Created' },
        { value: '18+', label: 'Website Created' },
        { value: '8+', label: 'Industries served' },
      ],
    },
  },
  {
    id: 'projects-completed',
    front: {
      number: '500+',
      label: 'Projects completed',
    },
    back: {
      title: 'Graphic Design & Creative Production',
      stats: [
        { value: '200+', label: 'Projects completed' },
        { value: '3600+', label: 'Social media assets created' },
        { value: '1500+', label: 'Marketing collaterals designed' },
      ],
    },
  },
];

export default resultsData;
