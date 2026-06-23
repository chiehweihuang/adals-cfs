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
| Performance | 86 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Core Web Vitals: Total Blocking Time 0 ms, Cumulative Layout Shift 0.001, both well
inside "good". First Contentful Paint and Largest Contentful Paint 3.0 s, Speed Index
4.4 s.

Performance history: an earlier run scored 63 with FCP/LCP at 6.0 s. The Google Fonts
stylesheets were render-blocking, and the Traditional-Chinese families (Noto Sans/Serif
TC) are large. The fix: load the font CSS asynchronously (`media="print"` + `onload`,
with a `<noscript>` fallback) so it no longer blocks paint, and subset the CJK request
via `&text=` to the only Chinese on the page (the association name), cutting that
download from hundreds of KB to a few KB. Render-blocking resources are now zero and the
paint metrics roughly halved (63 to 86). This is still the harsh mobile preset; a desktop
run scores higher again.

Full report: `lighthouse.html` (open in a browser).

## Answer Engine Optimization (AEO) and structured data

Present in the page head: a `canonical` link; Open Graph and Twitter Card tags for share
previews; and Schema.org JSON-LD describing the `Event` (dates, in-person Taipei,
scheduled) and its organizing `Organization`.

## Re-running

- axe-core: open the page, inject `axe.min.js`, call `axe.run()`.
- Lighthouse: `npx lighthouse https://speakers.apac-aia.org --only-categories=performance,accessibility,best-practices,seo --output=html`
