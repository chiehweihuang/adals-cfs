# ADALS 2026 — Call for Speakers

Public landing page for the ADALS 2026 call for speakers, a practitioner-level
Asia-Pacific dialogue on accessibility, aging, and AI.

Standalone, deliberately separate from the internal `adals-2026` planning site:
this page is public; the planning site stays private.

## Architecture

- **This repo** — a single static landing page (`index.html` + `aia-logo-dark.svg`).
  No build step, no dependencies. Served at the repo root by any static host; set
  up here for **GitHub Pages** with a custom domain via the `CNAME` file
  (`cfs.apac-aia.org`).
- **Submissions** — handled by a separate **Google Form**, not by this page. The
  page ends with an "Apply to speak" button linking to that form; responses land
  in a private Google Drive folder. No applicant data ever touches this repo.

## Before it goes live

1. **Form URL.** Build the Google Form, then replace `PASTE_GOOGLE_FORM_URL` in
   `index.html` (the Apply button) with its published URL.
2. **Custom domain.** Point `cfs.apac-aia.org` at GitHub Pages: add a CNAME record
   at the registrar (GoDaddy) for the `cfs` subdomain → `<account>.github.io`. The
   `CNAME` file in this repo tells Pages which domain to serve.

## Closing / reusing each cycle

The call is rolling and reused year to year (same repo, same URL):

- **Close** — set the Google Form to stop accepting responses, and swap the Apply
  button for a "Submissions are closed" notice, then push.
- **Reopen** — restore the Apply button with the new year's form URL, update the
  dates and themes, push. Optionally `git tag <year>` to snapshot each cycle.

## Accessibility

Built against WCAG 2.2 AA using the Beacon design guide: semantic structure,
keyboard-operable, screen-reader-labeled, light/dark theme, reflows at 320px.
Submission itself now runs through a Google Form, which carries its own
accessibility; this page is the static, branded wrapper. Before a launch, do a
keyboard-only walkthrough and one screen-reader pass of the page.

## Design

Visual system (colors, typography, light/dark theme) matches the ADALS 2026
brand so the page reads as part of the same event. English-primary: ADALS
sessions run in English.
