# REZE — fan site

Open `index.html` in a browser (no server needed). One-file version: `python3 tools/build.py` → `dist/reze-single.html`.

## Structure

```
index.html            page skeleton (home, footer, script/style list)
css/
  base.css            PALETTE (--p0 … --p7), page shell, logo, page fade
  home.css            INTRO + the four home tiles
  footer.css          footer
  pages/              common.css (page titles, reveal) + one file per section
js/
  config.js           image names → files, the four home tiles, helpers
  arts-list.js        the list of ARTS pictures
  kit.js              shared helpers (reveal on scroll, scroll progress)
  home.js             builds the home tiles
  router.js           pages (#about #motion #story #arts), logo → home, page fade
  pages/              about.js, motion.js, story.js, arts.js — text and logic of each section
assets/               images only, one folder per part of the site (never shared between sections)
  intro/ covers/ story/ motion/ arts/      (arts/_unused/ is kept out of the site and the build)
tools/                build.py (single file), update-arts.py (sync the ARTS list)
dist/                 reze-single.html (generated, safe to delete)
```

## Common edits

- **Change a home cover:** replace the file in `assets/covers/` (keep the name).
- **Add an ARTS picture:** put the file into `assets/arts/`, then run `python3 tools/update-arts.py` (or add `{ file: 'name.jpg' },` to `js/arts-list.js`). The layout arranges itself.
- **Add a MOTION frame:** put the file into `assets/motion/`, list it in `js/config.js` (`images`), add a line to `fr` in `js/pages/motion.js`.
- **Add images to ABOUT:** create `assets/about/`, list the files in `js/config.js`, use `img:'name'` in `js/pages/about.js`.
- **Edit text:** ABOUT / STORY / MOTION texts are at the top of their files in `js/pages/`.
- **Colours:** only the 8 palette shades at the top of `css/base.css`.

## Hosting (security)

The site is static: no forms, no user input, no third-party scripts, no network requests. When you publish it, send these headers (tested with the multi-file version; the single-file build needs `script-src 'unsafe-inline'`):

```
Content-Security-Policy: default-src 'none'; img-src 'self' data:; style-src 'self'; style-src-attr 'unsafe-inline'; script-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
```
