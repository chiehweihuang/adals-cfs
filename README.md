# ADALS 2026 — Call for Speakers

Public speaker sign-up page for ADALS 2026, a practitioner-level Asia-Pacific
dialogue on accessibility, ageing, and AI.

This is a **standalone repo**, deliberately separate from the internal
`adals-2026` planning site: this page is public and must stay publicly
reachable, whereas the planning site can sit behind access control.

## What this is

A single static page — `index.html`. No build step, no dependencies.
Deployable as-is to any static host (Cloudflare Pages, GitHub Pages, Netlify):
the host serves `index.html` at the repo root.

## Before this goes live

1. **Submission endpoint.** The `<form action>` in `index.html` is a Formspree
   placeholder (`REPLACE_WITH_FORM_ID`). Until it is set, the form does not
   send anywhere — by design, so it never silently looks like it worked.
   Options (Formspree / Google Apps Script / Tally) are documented in a
   comment directly above the `<form>` tag.
2. **Privacy / data-use note.** The data-consent checkbox refers to storing
   and using applicant data but links nowhere yet. Add a real privacy note
   (see the `TODO` comment on that checkbox).
3. **Contact.** The footer mentions contacting the organising team but has no
   actual link. Add one.

## Accessibility

Built against WCAG 2.2 AA using the Beacon design guide. Native HTML form,
fully keyboard-operable, screen-reader-labelled, light/dark theme, reflows at
320px. The automated baseline is clean of warnings.

A score is a machine baseline, not a certificate. Before launch, do a
keyboard-only walkthrough and one screen-reader pass (NVDA, VoiceOver, or
TalkBack) of the full sign-up flow.

## Design

Visual system (colours, typography, light/dark theme) matches the ADALS 2026
site so the page reads as part of the same event. The page is English-primary:
ADALS sessions run in English, so the pan-Asia-Pacific speaker audience is
addressed in English.
