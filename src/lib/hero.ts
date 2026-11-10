import { getImage } from 'astro:assets';
import { img } from './images';

export const MOBILE_MQ = '(max-width: 59.99rem)';
export const DESKTOP_MQ = '(min-width: 60rem)';
export const heroAlt =
  'Residents working together on large sheets laid out in the stone courtyard of Casa Bagnolo, Milis, on a sunny afternoon.';

/** Art-directed hero (the photo of the current Open Call, max 1280×492 at source):
 *  a landscape crop for phones/tablets, a portrait crop for the desktop split. Shared by <Hero> and the <head> preloads. */
export async function heroSources() {
  const band = img('hero/courtyard-band.jpg'); // 684×492
  const portrait = img('hero/courtyard-portrait.jpg'); // 420×492
  const [mAvif, mWebp, dAvif, dWebp, fallback] = await Promise.all([
    getImage({ src: band, format: 'avif', widths: [480, 684], quality: 60 }),
    getImage({ src: band, format: 'webp', widths: [480, 684], quality: 74 }),
    getImage({ src: portrait, format: 'avif', widths: [420], quality: 64 }),
    getImage({ src: portrait, format: 'webp', widths: [420], quality: 78 }),
    getImage({ src: portrait, format: 'jpg', width: 420, quality: 80 }),
  ]);
  return {
    mobile: { avif: mAvif.srcSet.attribute, webp: mWebp.srcSet.attribute, sizes: '100vw' },
    desktop: { avif: dAvif.srcSet.attribute, webp: dWebp.srcSet.attribute, sizes: '48vw' },
    fallback: fallback.src,
    width: portrait.width,
    height: portrait.height,
  };
}
