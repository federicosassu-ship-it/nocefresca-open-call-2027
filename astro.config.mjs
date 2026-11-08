// @ts-check
import { defineConfig } from 'astro/config';

// Static build: the output in /dist can be uploaded to any host or folder.
// If the page lives in a sub-folder (e.g. nocefresca.it/open-call/), set `base: '/open-call/'`.
export default defineConfig({
  // SITE_URL / BASE_PATH are set by the GitHub Pages workflow for the preview build.
  site: process.env.SITE_URL || 'https://www.nocefresca.it',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    assets: '_assets',
  },
});
