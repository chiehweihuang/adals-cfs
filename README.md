# ADALS 2026 Call for Speakers

Public landing page for the ADALS 2026 call for speakers, a practitioner-level
Asia-Pacific dialogue on Accessibility, Aging, and AI.

Live at **https://speakers.apac-aia.org**. Standalone, deliberately separate from
the internal `adals-2026` planning site: this page is public; the planning site
stays private.

## Architecture

- **This repo** — a single static landing page (`index.html` plus the masthead
  image `apac-aia-header.png`). No build step, no dependencies. Served at the repo
  root by **GitHub Pages** with a custom domain via the `CNAME` file
  (`speakers.apac-aia.org`).
- **Submissions** — handled by a separate **Google Form**, not by this page. The
  page's "Apply to speak" button links to that form; responses land in a private
  Google Drive folder. No applicant data ever touches this repo.

## Closing the call

Both the form and the page close automatically at the deadline
(`2026-09-01T00:00:00+08:00`):

- **Google Form** — its bound Apps Script closes it at that time
  (`setAcceptingResponses(false)` plus a custom closed message that keeps the
  contact email), via a time-based trigger.
- **Landing page** — a script in `index.html` flips the Apply button to a "Call
  closed" state and reveals a closed-call message at the same instant. The footer
  contact stays in both states. No-JS visitors still reach the form, which shows
  its own closed message.

To move the date, update both the Apps Script close time and the `closeAt`
constant in `index.html`.

## Reusing each cycle

Reused year to year (same repo, same URL): point the Apply button at the new
year's form URL, update the dates, themes, and the `closeAt` deadline, then push.
Optionally `git tag <year>` to snapshot each cycle.

## Accessibility

Built against WCAG 2.2 AA: semantic structure, keyboard-operable,
screen-reader-labeled, light/dark theme, reflows at 320px. Submission runs through
a Google Form, which carries its own accessibility; this page is the static,
branded wrapper.

## Design

Visual system (colors, typography, light/dark theme) matches the ADALS 2026 brand
so the page reads as part of the same event. English-primary: ADALS sessions run
in English.
