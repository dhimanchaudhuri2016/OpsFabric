# Ops Fabric — immersive website

Live site: https://dhimanchaudhuri2016.github.io/OpsFabric/immersive/

This directory is the GitHub Pages version of the immersive Ops Fabric website. It preserves the existing demo at the repository root.

## Development

Run `npm ci` followed by `npm run build` in this directory. The build updates the prebundled `experience.js`; commit it along with source changes. GitHub Pages serves the committed files directly, with no server or API keys.

Local assets use relative paths so the site works under `/OpsFabric/immersive/`. Canonical metadata, social metadata and the sitemap target the live GitHub Pages URL. The repository's root `.nojekyll` file is retained.

## Experience

Three.js WebGL world, scroll-driven camera perspectives, orbit/zoom controls, capability nodes, guided tour, reduced-motion preference, mobile navigation and a no-WebGL fallback. The site is readable without JavaScript. The visual model is illustrative, not live telemetry.

## Branding and content

Palette drawn from the BT reference stylesheets: #5514B4 primary purple, #FF5A4B coral, white surfaces and dark body text. Official BT webfonts are referenced with system fallbacks; cross-origin delivery should be verified or approved font files hosted locally. No internal slide deck, customer data, credentials or commercial details are included.

Three.js is MIT-licensed; the world map uses world-atlas / Natural Earth data. Darkmoon informed the interaction approach; its source, imagery and assets are not included.
