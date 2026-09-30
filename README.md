# דירתי: marketing website

The official Hebrew (RTL) marketing site for the דירתי app.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build (fully static page)
npm start

STATIC_EXPORT=1 npm run build   # static copy in out/, hostable anywhere
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.co.il`) in the hosting
environment so canonical URLs, Open Graph, `sitemap.xml` and `robots.txt` point at the real domain.

## Things to fill in

All in `lib/site.ts`:

- `joinHref`: where "הצטרפו לדירתי" goes (now scrolls to the closing section).
- `downloadHref`: the closing "מתחילים עם דירתי" button (now `#`). Set to the store or sign-up link.
- `footerLinks`: terms, privacy and contact pages (now `#`). No legal text is included on purpose.
- `showScreenshotHints`: hide the file names shown on screenshot placeholders.

Also replace `app/icon.svg`, `app/apple-icon.png` and `app/opengraph-image.png`
(and `twitter-image.png`) with final brand assets when they exist.

## Screenshots

Drop real app screenshots into `public/app-screens/` using the names listed in
[`public/app-screens/README.md`](public/app-screens/README.md) and rebuild.
Placeholders are swapped automatically (detected at build time in `lib/resolve-screens.ts`).

## Structure

```
app/                 layout (lang="he" dir="rtl", fonts, metadata), page, SEO routes, icons
components/
  brand/Logo.tsx     arch mark + wordmark
  nav/SiteNav.tsx    floating desktop capsule; separate mobile bar + sheet menu
  screens/           PhoneMockup, AppScreenshot (image or placeholder), ScreensProvider
  sections/          Hero, Story (how it works), Landlords, Tenants, FaultReport, Faq, FinalCta, Footer
  ui/                motion primitives (Reveal, MaskedHeading), PillLink
lib/                 site config, screen registry, FAQ content
```

## Design notes

- **Motif:** the arched window (the logo's shape). Daylight sky in the hero, evening light in the closing section.
- **Accent:** one warm "window light" color (`--color-glow`), used only for small moments: lit windows, dots, the logo.
- **Type:** Noto Sans Hebrew variable, self-hosted. Display type uses the condensed width axis (87.5%).
- **Motion:** scroll-linked only where it explains the product: the pinned how-it-works story (screens change, the invite code travels to the tenant, loose pieces settle next to the phone), windows lighting up as properties are added, and scattered messages collapsing into one fault report. Transforms are frozen under `prefers-reduced-motion`.
- **Mobile:** the how-it-works story is not pinned below 1024px; each step is its own short scene.
