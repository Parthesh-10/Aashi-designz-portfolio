/**
 * Form Configuration and Options for Find Your Fit Multi-Step Form
 */

export interface StrategyCardConfig {
  badge: string;
  title: string;
  bullets: string[];
  originalPrice: string;
  price: string;
}

export interface PlanOption {
  title: string;
  desc: string;
  stepClass: string;
}

export const STRATEGY_CARD_CONFIG: StrategyCardConfig = {
  badge: 'FREE',
  title: 'Media strategy',
  bullets: [
    'Researched plan',
    'Custom to your business',
    'Ready in 24 hours',
  ],
  originalPrice: '₹999',
  price: '₹0',
};

export const FINISH_LINE_OPTIONS: string[] = ['Sales', 'Trust', 'Eyes', 'All'];
export const CHANNEL_OPTIONS: string[] = ['Organic', 'Paid', 'Both', 'Not sure'];
export const DECISION_MAKER_OPTIONS: string[] = ['Me', 'Me + 1'];

export const BUDGET_OPTIONS: string[] = [
  'Budget is tight',
  "Still deciding if it's worth it",
  'Not sure, suggest for me',
];

export const PLAN_OPTIONS: PlanOption[] = [
  {
    title: '1 Month Plan',
    desc: 'See how we work and build your digital foundation.',
    stepClass: 'plan-step-1',
  },
  {
    title: '3 Month Plan',
    desc: 'Build a strategy, test what works, and bring in better leads.',
    stepClass: 'plan-step-2',
  },
  {
    title: '6 Month Plan',
    desc: 'A long-term growth plan with better insights, smarter campaigns, and a focus on consistent results.',
    stepClass: 'plan-step-3',
  },
];
