# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

SalesPlay account workspace: a frontend-only React 19 + Vite prototype of a sales research tool, showing the account 3M Company from the seller perspective of LANXESS Aktiengesellschaft. There is no backend, authentication, live AI, or outreach. Plain JavaScript/JSX, no TypeScript.

## Commands

```sh
npm install
npm run dev      # Vite on 127.0.0.1
npm run build    # outputs dist/
npm run preview  # serves dist/
```

There is no test runner, linter, or formatter configured. Verification is `npm run build` plus browser checks (rail links stay local, direct load/refresh of deep links, Back/Forward, detail-tab URLs, mobile overflow at 390px wide, contact-to-AI context). Review screenshots go in `.impeccable/review/` (gitignored).

## Architecture

### Routing (`src/routing.js`)

Hand-rolled History API router, no library. `paths` maps view keys to URLs, `parseRoute(url)` returns `{view, id, tab, params, path}`, and `useRoute()` returns `[route, go]`. Internal links must use `LocalLink` (exported from `src/WorkspacePages.jsx`) or `follow()` so that plain clicks call `go` while modified clicks still open new tabs.

Adding a page means touching `paths`, `pageNames` (drives `document.title`), `parseRoute` if it has an `:id`, and the view switch in either `main.jsx` or `WorkspacePages.jsx`. Existing URLs are stable even where display labels changed (e.g. `/contacts` is labelled "People", `/documents` "Research library", `/overview` "Company brief", `/signals` "Account activity"). The full route table is in README.md. Deployment needs an SPA fallback to `index.html`.

AI context lives in the query string on `/accounts/3m/ask`: `?opportunity=:id`, `?contact=:id`, or `?document=:id`. Selecting an opportunity replaces any other selected entity. Signals have no selected-entity context; they open account-wide AI.

### Component ownership

- `src/main.jsx` — the `App` component holds nearly all state and renders the shell (sidebar rail, toast, contact drawer), the opportunity queue and detail tabs, and the AI workspace including the scripted `AIResponse`.
- `src/WorkspacePages.jsx` — people directory/profiles, signals, documents, overview, financials, competitors. Also exports the shared `contacts`, `documents`, `LocalLink`, `Avatar`, `PeoplePanel`.
- `src/GlobalBar.jsx` — navy top bar: global search across opportunities, people, documents, signals (Cmd/Ctrl+K), Ask SalesPlay, `ThemePicker`.
- `src/AccountDirectory.jsx` — portfolio views (`home`, `recent`, `favourites`, `accounts`, `accountPreview`; listed in `portfolioViews` in `src/accounts.js`). These swap the sidebar from the account rail to a workspace rail.

### Data

All content is static and captured from the real product on 2026-10-04:

- `src/data.js` — seven opportunities and the original three people. Only the New Ulm opportunity has the full battle card (`evidenceItems`, `next`, etc.); code must tolerate those fields being absent on the others.
- `src/research.json` — `contacts`, `signals`, `documents`, `financials`, `competitors`.
- `contacts` in `WorkspacePages.jsx` merges `research.contacts` with `data.js` people by name (22 unique); ids for merged people come from `slug(name)`.
- `src/accounts.js` — 3M plus generated `sample-N-M` accounts that exist only to show directory scale. They are flagged `sample: true`, open an "unavailable research" preview, and must not inherit 3M content.

### State and persistence

Review decisions, bookmarks, saved contacts, queue filters, and chat history are in-memory `useState` in `App` and reset on reload by design. Only three things use `localStorage` (always wrapped in try/catch): `salesplay-colour-theme`, `salesplay-favourite-accounts`, `salesplay-recent-accounts`.

AI replies are scripted on a timer in `send()`; unsupported prompts must say the live assistant is not connected rather than fabricate an answer.

### Styling

Plain CSS imported in `main.jsx` in cascade order: `styles.css` (base) → `premium.css` (replacement visual layer, `@font-face`) → `themes.css` (palette tokens per `data-theme`) → `workspace.css` → `accounts.css`. Later files override earlier ones, so put changes in the layer that owns the rule rather than editing the base.

Themes are `precision`, `advisory` (default), `mineral`, set as `data-theme` on `<html>`. `public/theme.js` applies the saved theme before first paint and must stay in sync with the `themes` list in `src/ThemePicker.jsx` (ids and header colours are duplicated in both) and the selectors in `themes.css`.

Fonts (Source Sans 3, Source Serif 4, JetBrains Mono) are served locally from `public/fonts` with their license text; do not add remote font loads.

### Code style

Source files are written densely: long single-line functions and JSX, minimal whitespace, one-space indentation. Match that when editing rather than reformatting, which would make diffs unreadable.

## Product constraints

From PRODUCT.md and DIRECTION.md, which are the source of truth for scope:

- Preserve captured content verbatim. Do not invent contact details, LinkedIn/opportunity links, research sections, or AI capabilities; missing data is shown explicitly as not captured.
- Counts describe the captured prototype, not production totals, and the UI says so.
- Every account rail destination renders locally with its own URL. External links are limited to original evidence sources and captured LinkedIn URLs.
- Never call backend APIs or the live SalesPlay site (`liveBase` in `data.js` is reference only).

## Design docs

`DESIGN.md` (with `.impeccable/design.json`) documents the implemented tokens, components, and do/don't rules; consult it before visual changes and update it after. `.impeccable/briefs/` holds direction contracts for individual features. These files, and the `<!-- impeccable:product-schema -->` marker in PRODUCT.md, are maintained by the Impeccable design skill.
