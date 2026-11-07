import { getImage } from 'astro:assets';
import { img } from './images';

export const MOBILE_MQ = '(max-width: 59.99rem)';
export const DESKTOP_MQ = '(min-width: 60rem)';
export const heroAlt =
  'An artist crouches on a pale rocky shore in Sardinia, scraping material into a blue bucket, with Mediterranean scrub and a clear sky behind her.';

/** Art-directed hero: a landscape band crop for phones/tablets, the full portrait for desktop. Shared by <Hero> and the <head> preloads. */
export async function heroSources() {
  const band = img('hero/artist-shoreline-band.jpg');
  const full = img('hero/artist-shoreline.jpg');
  const mobileWidths = [480, 720, 960, 1280];
  const desktopWidths = [720, 960, 1280, 1600, 2000];
  const [mAvif, mWebp, dAvif, dWebp, fallback] = await Promise.all([
    getImage({ src: band, format: 'avif', widths: mobileWidths, quality: 52 }),
    getImage({ src: band, format: 'webp', widths: mobileWidths, quality: 68 }),
    getImage({ src: full, format: 'avif', widths: desktopWidths, quality: 56 }),
    getImage({ src: full, format: 'webp', widths: desktopWidths, quality: 70 }),
    getImage({ src: full, format: 'jpg', width: 1280, quality: 72 }),
  ]);
  return {
    mobile: { avif: mAvif.srcSet.attribute, webp: mWebp.srcSet.attribute, sizes: '100vw' },
    desktop: { avif: dAvif.srcSet.attribute, webp: dWebp.srcSet.attribute, sizes: '48vw' },
    fallback: fallback.src,
    width: full.width,
    height: full.height,
  };
}
