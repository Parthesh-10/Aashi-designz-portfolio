/**
 * brandingData.ts — Static data for Branding & Strategy Service Page (/service/branding)
 */

export interface BrandingIncludedItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  objectPosition: string;
  blurDataURL: string;
}

export interface BrandingHeadlineToken {
  text: string;
  fontClass: string;
  colorClass: string;
  hoverClass: string;
}

export interface BrandingIntroStat {
  value: string;
  label: string;
  captionLines: string[];
  highlight: boolean;
}

export interface BrandingIntroData {
  eyebrow: string;
  headline: BrandingHeadlineToken[];
  headlineSegments: BrandingHeadlineToken[];
  stats: BrandingIntroStat[];
  quote: string;
}

export interface BrandingWorkSlide {
  id: string;
  board: string;
  thumb: string;
  alt: string;
  title: string;
  href: string | undefined;
}

const BLUR_1 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDVsoCd0hCbV6bj3qS9KFED7PNPI29xWcv7u9jaP5Cx+Yrxn61em+8571t9o4bpUtj/2Q==';

const BLUR_2 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBbawuYJS81qojBDbywyuOnSlv76S31JZkVS8ihTnp3rTvHf7Sqbm2mEkjPGciuf1k/vYj3x/WqpvmV3uPof//Z';

const BLUR_3 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC35Ak2+a5DEZdCww2OgNVbgwh0Kx7j5qk8HH61rMAGjwK5yYn7XMMnBk5H0IxScNVK4z//2Q==';

const BLUR_4 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDm8xEEOJA/qe1XrHS7WW0864uWjYhjtG3gD6nNZDfeNB6pSHfQ/9k=';

const BLUR_5 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDTmmiE0i/bpUOSCB/Cc06xWabbM1xIUzwCwIbk8VpKiMoJVSfUihwFU4GMelefzaWsB//Z';

const BLUR_6 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCO3itooQDH15PNRThPLbIBBHpUKE7DyehqreMfLXk/dPevPSvI9i6UNj//2Q==';

export const BRANDING_INCLUDED_ITEMS: BrandingIncludedItem[] = [
  {
    id: 'branding-tile-01',
    src: '/images/branding/included/included-1.webp',
    alt: 'White cap with embroidered Synctrip logo and enamel travel pin badges',
    title: 'Logo Design',
    // TODO: [PASTE FULL SUBTITLE] - Subtitle not provided in notes
    subtitle: '',
    objectPosition: 'center 40%',
    blurDataURL: BLUR_1,
  },
  {
    id: 'branding-tile-02',
    src: '/images/branding/included/included-2.webp',
    alt: 'Aashi Designz brand identity board with color palette, typography hierarchy, and logo construction',
    title: 'Colours & Typography',
    // TODO: [PASTE FULL SUBTITLE] - Subtitle not provided in notes
    subtitle: '',
    objectPosition: 'center 25%',
    blurDataURL: BLUR_2,
  },
  {
    id: 'branding-tile-03',
    src: '/images/branding/included/included-3.webp',
    alt: 'Outdoor pole with bright lime green Grow Link die-cut stickers and purple brand marks',
    title: 'Brand Identity',
    // TODO: [PASTE FULL SUBTITLE] - Subtitle not provided in notes
    subtitle: '',
    objectPosition: 'center 45%',
    blurDataURL: BLUR_3,
  },
  {
    id: 'branding-tile-04',
    src: '/images/branding/included/included-4.webp',
    alt: 'Modern laptop and tablet mockup showcasing Cinema Advertisement digital experiences on dark background',
    title: 'Brand Strategy',
    // TODO: [PASTE FULL SUBTITLE] - Subtitle not provided in notes
    subtitle: '',
    objectPosition: 'center 40%',
    blurDataURL: BLUR_4,
  },
  {
    id: 'branding-tile-05',
    src: '/images/branding/included/included-5.webp',
    alt: 'For Brands on a Mission bold editorial poster with purple brackets on lime green crumpled paper',
    title: 'Tone of Voice',
    // TODO: [PASTE FULL SUBTITLE] - Subtitle not provided in notes
    subtitle: '',
    objectPosition: 'center 35%',
    blurDataURL: BLUR_5,
  },
  {
    id: 'branding-tile-06',
    src: '/images/branding/included/included-6.webp',
    alt: 'Vibrant orange outdoor billboard with .visible wordmark and campaign copy in natural foliage setting',
    title: 'Marketing Campaigns',
    // TODO: [PASTE FULL SUBTITLE] - Subtitle not provided in notes
    subtitle: '',
    objectPosition: 'center 40%',
    blurDataURL: BLUR_6,
  },
];

export const BRANDING_INTRO_DATA: BrandingIntroData = {
  eyebrow: 'BRANDING & STRATEGY',
  headline: [
    { text: 'Be the ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'brand ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'they ', fontClass: 'edits-serif-accent', colorClass: 'edits-why-h2-accent', hoverClass: 'ah-hover-slate' },
    { text: 'come ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'back to.', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
  ],
  headlineSegments: [
    { text: 'Be the ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'brand ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'they ', fontClass: 'edits-serif-accent', colorClass: 'edits-why-h2-accent', hoverClass: 'ah-hover-slate' },
    { text: 'come ', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
    { text: 'back to.', fontClass: '', colorClass: '', hoverClass: 'ah-hover-purple' },
  ],
  stats: [
    {
      value: '6',
      label: 'Creative service categories',
      captionLines: ['Creative service', 'categories'],
      highlight: false,
    },
    {
      value: '360°',
      label: 'Visual content, from concept to finish',
      captionLines: ['Visual content, from', 'concept to finish'],
      highlight: true,
    },
    {
      value: '1',
      label: 'Consistent creative direction',
      captionLines: ['Consistent creative', 'direction'],
      highlight: false,
    },
  ],
  quote: '"Don\'t just look like a brand. Be one."',
};

export const BRANDING_WORK_SLIDES: BrandingWorkSlide[] = [
  {
    id: 'work-kochhars',
    board: '/images/branding/work/board-1.webp',
    thumb: '/images/branding/work/thumb-1.webp',
    alt: "Kochhar's media planners brand identity system — red logo mark, color palette, typography guidelines, branded cap mockup, outdoor signage, and multi-device website display",
    title: "Kochhar's",
    href: undefined,
  },
  {
    id: 'work-visible',
    board: '/images/branding/work/board-2.webp',
    thumb: '/images/branding/work/thumb-2.webp',
    alt: ".visible brand identity system — warm gradient palette, wordmark grid specs, custom V icon with sphere, mobile app mockup, tote bag, and outdoor billboard campaign",
    title: ".visible",
    href: undefined,
  },
  {
    id: 'work-synctrip',
    board: '/images/branding/work/board-3.webp',
    thumb: '/images/branding/work/thumb-3.webp',
    alt: "Synctrip travel brand identity — interlocking location pin logo, cyan and navy palette, enamel badges, wordmark grid specs, branded cap, and travel photography",
    title: "Synctrip",
    href: "/casestudy/synctrip",
  },
];
