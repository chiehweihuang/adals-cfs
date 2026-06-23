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

## WAVE (WebAIM, light and dark mode)

Independent check with the WAVE evaluation tool, captured for both themes
(`wave-light.pdf`, `wave-dark.pdf`): 0 Errors and 0 Contrast Errors in both, AIM
score 10/10. Each has two advisory "possible heading" alerts, which flag styled
text that resembles a heading; they are advisory, not failures.

## Lighthouse 13.3

| Category | Mobile | Desktop |
|---|---|---|
| Performance | 100 | 100 |
| Accessibility | 100 | (not run) |
| Best Practices | 100 | (not run) |
| SEO | 100 | (not run) |

Mobile (simulated slow 4G + 4x CPU throttle): FCP 1.1 s, LCP 1.1 s, CLS 0, TBT 0 ms.
Desktop: Performance 100, CLS 0.

Performance history: 63 at first (render-blocking fonts), then 86 (font CSS made async
plus CJK subset via `&text=`). The last gains: serve the masthead banner as a preloaded
WebP (34 KB PNG down to 17.7 KB; it is the LCP element, so LCP went 3.0 s to 1.1 s), and
add a metric-matched `Inter Fallback` (`size-adjust` and friends over local Arial) so text
does not shift when the web font swaps in (CLS to 0). All four categories now score 100 on
both mobile and desktop. Note the mobile preset varies run to run; an occasional run may
dip a point or two.

Full report: `lighthouse.html` (open in a browser).

## Answer Engine Optimization (AEO) and structured data

Present in the page head: a `canonical` link; Open Graph and Twitter Card tags for share
previews; and Schema.org JSON-LD describing the `Event` (dates, in-person Taipei,
scheduled) and its organizing `Organization`.

## Re-running

- axe-core: open the page, inject `axe.min.js`, call `axe.run()`.
- Lighthouse: `npx lighthouse https://speakers.apac-aia.org --only-categories=performance,accessibility,best-practices,seo --output=html` (add `--preset=desktop` for the desktop number).
