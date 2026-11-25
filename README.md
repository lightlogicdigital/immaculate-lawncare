# Immaculate Lawncare — website

Marketing site for Immaculate Lawncare (Hampton Roads, VA), rebuilt from scratch in Next.js 16 from the
Paper design file **“Immaculate Lawncare — Website”** (desktop + mobile homepage artboards, design tokens).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Notes |
| --- | --- |
| `/` | Hero, trust strip, services, how it works, meet the owner, recent work, reviews, service area, FAQ, CTA |
| `/services` | All three services with what's included |
| `/services/full-service-lawn-care` | Same slugs as the old Framer site, so existing links and SEO carry over |
| `/services/mulching` | |
| `/services/seasonal-clean-ups` | |
| `/about-us` | Billy's story, values, stats |
| `/contact` | Quote request form (Server Action) |

Also generated: `sitemap.xml`, `robots.txt`, favicon (`app/icon.svg`), LocalBusiness JSON-LD in the layout.

## Design system

Tokens live in `app/globals.css` (`@theme`) and mirror the Paper file:

- **Immaculate red** `#D62B1F` — primary brand color, every CTA (white text on top)
- **Bright red** `#FF6253` — red text on dark backgrounds
- **Ink** `#171512`, **muted** `#57534E`, **surface** `#F4F4F2`, **line** `#E4E3E0`
- **Star gold** `#F2A900` — ratings only
- Type: **Libre Franklin** (headlines, 700–800, tracked tight) + **Figtree** (body). Chosen from the
  Paper "Type Explorations" page (option 6, "Hardware Store").

### Logo

Brand marks live in `components/Brand.tsx` as inline SVG, built from the Paper "Logo Refinements" page:

- `ScriptWordmark`: red **Yellowtail** script with a charcoal drop shade and swash, plus **Barlow Condensed** LAWNCARE. Used in the header (dark) and footer (`tone="light"`).
- `ScriptPatch`: stitched round patch with native SVG `textPath` ring text. Used as a sticker on the About photo collage.
- `StarPatch` / `app/icon.svg`: the small-size mark used as the favicon.

## Deploying (GitHub Pages)

The site is a static export (`output: "export"` in `next.config.ts`), built and published by
`.github/workflows/deploy.yml` on every push to `main`. Repo settings: Pages → Source = "GitHub Actions".

The workflow sets these at build time:

| Name | Purpose |
| --- | --- |
| `PAGES_BASE_PATH` | `/<repo>` while the site lives at `<user>.github.io/<repo>`; empty once a custom domain points at it |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, sitemap and JSON-LD |
| `NEXT_PUBLIC_FORM_ENDPOINT` | From the repo variable `FORM_ENDPOINT`: the Formspree (or similar) URL the quote form posts to |

To turn on the quote form, create a form at formspree.io pointed at Billy's inbox and add its URL as a
repository variable named `FORM_ENDPOINT` (Settings → Secrets and variables → Actions → Variables), then
re-run the deploy. Until then the form logs requests to the browser console in development, and on the live
site it shows the visitor a “please call” message instead of silently dropping the request.

## Content to confirm with Billy before launch

- FAQ answers 2–6 in `lib/site.ts` were drafted from statements elsewhere on the old site.
- Every service and gallery photo is a real job photo from Billy. On each service in `lib/site.ts`, `work`
  feeds the page's "Recent work" grid (first photo featured; 6 or 9 photos fill the grid evenly) and
  `beforeAfter` adds a before/after pair; `position` tunes each crop. `job-mulch-curb` and `crew-mulch-trailer`
  are ~810×443 crops of Facebook screenshots, so ask for originals if they're used large.
- The About page photo (`billy-team-selfie.jpg`, set in `collages.about`) shows Billy with a teammate. Confirm
  who she is and that she's happy to be on the site; the alt text calls her "a teammate".
- Job photos show customers' homes. New ones must be re-saved through an image tool (several of Billy's
  phone photos carried GPS coordinates, and some have the street address stamped on them), with house
  numbers, address stamps, security-company signs and personal flags cropped or patched out.
- Review quotes are copied verbatim from the old site.
