# Ai Nobiloption

Marketing site for Ai Nobiloption, an AI automated trading platform aimed at
Australia. Next.js App Router with static export, plain CSS, no component
library.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000 (Next picks the next free port if taken)
npm run build    # static export into out/
npm run lint
```

`npm run build` prerenders every route to `out/<route>.html`. There is no
`npm start` for the exported output; serve `out/` with any static file server,
or deploy it to Vercel.

## Layout

```
app/
  layout.jsx     root shell: fonts, metadata, header and footer, analytics
  globals.css    the whole design system in one file
  page.jsx       home
  <route>/       one directory per route
  not-found.jsx  builds to 404.html
src/
  components/    page sections and shared UI
  data/          content.js (all copy) and seo.js (per route metadata)
  hooks/         scroll reveal, scroll spy, count up
  lib/           metadata mapping, phone helpers, lead submission
public/          images, icons, robots.txt, sitemap.xml, web manifest
```

Almost all copy lives in `src/data/content.js`. Per route titles,
descriptions and structured data live in `src/data/seo.js`, which
`src/lib/metadata.js` maps onto Next's Metadata API.

## Notes

- Components with hooks need `'use client'` at the top. See `CLAUDE.md`.
- The lead form posts JSON to the platform relay; `src/lib/submitLead.js`
  documents the wire contract and the error handling.
- Sections use `.reveal` for the scroll animation. The CSS only hides them
  when `html.js` is present, so the prerendered HTML stays visible to
  crawlers and to visitors without JS.
