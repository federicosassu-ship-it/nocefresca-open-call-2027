import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('../assets/img/**/*.{jpg,jpeg,png}', { eager: true });

/** Resolve an image in src/assets/img by relative path, e.g. img('studios/ramiro-1.jpg'). Fails the build if missing. */
export function img(path: string): ImageMetadata {
  const hit = all[`../assets/img/${path}`];
  if (!hit) throw new Error(`[images] Missing asset: src/assets/img/${path}`);
  return hit.default;
}
