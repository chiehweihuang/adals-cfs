# Accessibility and quality audit: speakers.apac-aia.org

Last run: 2026-06-23. Target: WCAG 2.2 AA. Scope: the live ADALS 2026 Call for
Speakers landing page (static HTML on GitHub Pages).

## Accessibility (axe-core 4.10, light and dark mode)

| | Light mode | Dark mode |
|---|---|---|
| Violations | 0 | 0 |
| Passes | 41 | 41 |
| Incomplete | 1 | 1 |

The one "incomplete" is a contrast check on the decorative ◐ glyph inside the theme
toggle. That glyph is `aria-hidden="true"` and the button carries its own accessible
name, so it is not a real issue (axe reports it as "needs review", not a violation).

Manual checks (Playwright): keyboard order is logical with a visible focus ring on
every control, no keyboard trap, skip link present; the page reflows at 320px with no
horizontal scroll; `lang` is set; landmarks, heading order, image alt text, and link
names are all present.

## Lighthouse 13.3 (mobile preset, simulated slow 4G + 4x CPU throttle)

| Category | Score |
|---|---|
| Performance | 63 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Core Web Vitals: Total Blocking Time 0 ms, Cumulative Layout Shift 0 (both perfect).
First Contentful Paint / Largest Contentful Paint / Speed Index are about 6.0 s.

Reading the Performance score: it reflects Lighthouse's harsh mobile preset (throttled
to slow 4G and a 4x slower CPU); a desktop run typically scores 15 to 25 points higher.
The ~6 s paint times come from render-blocking web fonts, mainly the large CJK families
(Noto Sans TC and Noto Serif TC). TBT 0 ms and CLS 0 mean nothing blocks the main
thread and nothing shifts during load. Optional speed-ups, none of them correctness
issues: `font-display: swap`, a `preconnect` to the font CDN, and subsetting the CJK
fonts. Accessibility, Best Practices, and SEO are all 100.

Full report: `lighthouse.html` (open in a browser).

## Re-running

- axe-core: open the page, inject `axe.min.js`, call `axe.run()`.
- Lighthouse: `npx lighthouse https://speakers.apac-aia.org --only-categories=performance,accessibility,best-practices,seo --output=html`
