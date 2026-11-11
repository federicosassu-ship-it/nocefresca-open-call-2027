import { getImage } from 'astro:assets';
import { img } from './images';

export const MOBILE_MQ = '(max-width: 59.99rem)';
export const DESKTOP_MQ = '(min-width: 60rem)';
export const heroAlt =
  'Residents working together on large sheets laid out in the stone courtyard of Casa Bagnolo, Milis, on a sunny afternoon.';

/** Art-directed hero (the photo of the current Open Call, 1080×1350 at source):
 *  a landscape crop for phones/tablets, a portrait crop for the desktop split. Shared by <Hero> and the <head> preloads. */
export async function heroSources() {
  const band = img('hero/courtyard-band.jpg'); // 1080×777
  const portrait = img('hero/courtyard-portrait.jpg'); // 1080×1350
  const [mAvif, mWebp, dAvif, dWebp, fallback] = await Promise.all([
    getImage({ src: band, format: 'avif', widths: [480, 768, 1080], quality: 60 }),
    getImage({ src: band, format: 'webp', widths: [480, 768, 1080], quality: 74 }),
    getImage({ src: portrait, format: 'avif', widths: [560, 840, 1080], quality: 62 }),
    getImage({ src: portrait, format: 'webp', widths: [560, 840, 1080], quality: 76 }),
    getImage({ src: portrait, format: 'jpg', width: 840, quality: 80 }),
  ]);
  return {
    mobile: { avif: mAvif.srcSet.attribute, webp: mWebp.srcSet.attribute, sizes: '100vw' },
    desktop: { avif: dAvif.srcSet.attribute, webp: dWebp.srcSet.attribute, sizes: '48vw' },
    fallback: fallback.src,
    width: portrait.width,
    height: portrait.height,
  };
}
