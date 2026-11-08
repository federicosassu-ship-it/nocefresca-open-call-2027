// Base-aware URLs (works at the domain root or in a sub-folder set via `base` in astro.config.mjs).
export const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
export const home = base;
export const anchor = (id: string) => `${base}#${id}`;

export const pages = {
  studios: { slug: 'studios', label: 'Studios', title: 'Studios' },
  homes: { slug: 'homes', label: 'Homes', title: 'Living at Nocefresca' },
  datesFees: { slug: 'dates-and-fees', label: 'Dates & fees', title: 'Dates & fees' },
} as const;
export type PageKey = keyof typeof pages;
export const page = (key: PageKey, hash = '') => `${base}${pages[key].slug}/${hash ? `#${hash}` : ''}`;
