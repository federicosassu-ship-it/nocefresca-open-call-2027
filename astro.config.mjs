// @ts-check
import { defineConfig } from 'astro/config';

// Static build: the output in /dist can be uploaded to any host or folder.
// If the page lives in a sub-folder (e.g. nocefresca.it/open-call/), set `base: '/open-call/'`.
export default defineConfig({
  site: 'https://www.nocefresca.it',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    assets: '_assets',
  },
});
