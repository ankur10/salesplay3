# Claude Code instructions — SalesPlay UI reference

## Identify your working context first

This repository is a **frontend-only design prototype** for a SalesPlay redesign. It is not the main application. Read [README.md](README.md) for the experience/file map and [INTEGRATION.md](INTEGRATION.md) for production migration requirements.

- **Editing this reference:** keep its frontend-only behavior, fixture disclosures, local routes, and existing interaction design unless the user requests a change. Do not connect live APIs or change production data as a side effect.
- **Porting into the main SalesPlay repo:** follow that repository's instructions and architecture. Reuse this design and behavior through its existing APIs/auth/router. The reference's “no API calls” implementation is a prototype constraint, not a prohibition on using existing APIs during an explicitly requested production integration. Backend contract changes and new endpoints are outside the approved scope.
- Do not copy this file over the main repo's root CLAUDE.md. Merge relevant design/integration guidance into its appropriate documentation while preserving its existing instructions.

## Commands and verification

```sh
npm ci
npm run dev
npm run build
npm run preview
```

React 19 + Vite 6, plain JS/JSX, Lucide icons, plain CSS. Use a compatible Node version; no Node version is pinned here. `package-lock.json` is authoritative. No test runner, linter, or formatter is configured. Do not claim these checks ran if they do not exist.

For reference changes, run the production build when source changes warrant it and check affected behavior in the browser. For visual changes, inspect desktop and mobile with real long content. For production integration, use the main repo's tests/typecheck/lint/build and the acceptance matrix in INTEGRATION.md. Documentation-only changes need link/path/consistency checks, not a redundant frontend build.

## Current ownership

- `src/main.jsx`: App state; shell; shared opportunity records/bookmarks and detail; AI workspace; review mutations; selected-context handoff; scripted `AIResponse`; `ResponseLink`.
- `src/OpportunityBrief.jsx` and `src/opportunity-brief.css`: editable prompt/custom criteria, reviewable terms, Any/All logic, exclusions, and live captured-match count. `matchesBrief` uses local case-insensitive substring matching; it does not call AI or verify signals.
- `src/BriefLibrary.jsx` and `src/savedBriefs.js`: My Prompts library and validated browser-local save/update. Primary mode persists; gallery mode uses memory. Counts are captured substring matches, not AI or monitoring.
- `src/CombinedConcepts.jsx`: approved Option 10 primary workspace (`primary` mode), plus isolated gallery options 7–10. `src/EntitySelector.jsx`: bounded searchable selection and reviewed paste matching. `src/primary-opportunities.css`: main-shell/theme integration.
- `src/HomeWorkspace.jsx` / `src/home.css`: opportunity-led Home and recent person/opportunity tracking. Home is no longer rendered by AccountDirectory.
- `src/AccountDirectory.jsx`: account directory, recent/favourites/sample views; account preferences.
- `src/PeopleWorkspace.jsx`: people directory/profiles, opportunity relationships and search.
- `src/ContactImport.jsx` + `src/contactImportData.js`: CSV/paste flow and parsing/validation.
- `src/WorkspacePages.jsx`: research pages, delegation to people/import, shared links/avatar/people panel, captured contacts/documents exports.
- `src/GlobalBar.jsx`: contextual Ask SalesPlay launcher, search and Cmd/Ctrl+K, themes.
- `src/conversations.js`: browser-local history, scope URLs, simulated reply timer. `ConversationHistory.jsx`: history search/groups/resume.
- `src/routing.js`: History API router; paths/route parser/page names and ordinary internal link handling.
- `src/data.js`, `src/research.json`: captured 3M data. `src/accounts.js`: 3M plus 120 fictional sample accounts.

## Preserve these decisions

1. Option 10 is the approved primary Opportunities experience; do not restore the old list UI or choose another gallery alternative. Left navigation exposes Recommended, Explore, My Prompts, and My Opportunities. Recommended/My start with preview open. Explore contains keyword search and five dimensions: Contact, Persona, Product, Business unit, and Signal; each opens a context view with the same five tabs, then facet-led Search. Do not put custom prompts or prompt history back in Explore. My Prompts owns creation, review, save/update, edit, and matching results. Keep optional signals/exclusions collapsed and naming/save/update in the review step. The library provides search, counts, View opportunities, Edit prompt, and Create prompt; finding opportunities must not imply saving. Preserve editable include/exclude phrases, Any/All logic, live captured-result count, result text-match reasons, and Edit prompt. Prompt matching excludes imported records and must not be presented as AI reasoning or verified signal discovery. Omit Trigger from Option 10. My Opportunities uses Saved/Uploaded tabs.
2. Home prioritizes opportunities, with supporting people, recent work, signals, and accounts. Avoid decorative metric dashboards.
3. People and their individual opportunity context remain first-class. Do not claim search results are verified relationships.
4. Ask SalesPlay is a dedicated workspace with prominent top-bar entry, account and optional entity scope, and resumable history. No permanent full-height AI pane across all pages.
5. Links **inside AI responses** to details and external sources open a new tab. Use `ResponseLink` or an equivalent native anchor with `target="_blank"`, `rel="noopener noreferrer"`, an icon, tooltip, and accessible “opens in a new tab” text. Do not route these through `LocalLink`/`follow()` or `go()`, which intercept plain clicks. The original conversation/draft must remain intact.
6. Normal navigation, breadcrumbs, and recent-conversation links stay in the same tab. `LocalLink` preserves normal modified-click behavior. Do not globally change anchor targets or add a “Back to conversation” mechanism.
7. Prominent Accept/Reject; reversible preview status. Desktop/tablet collapse retains the icon rail; mobile uses overlay navigation. Account Research expands by default; Research Library starts collapsed.
8. Current display labels include People, Signals, Company brief, and Research library. Stable prototype paths remain `/contacts`, `/signals`, `/overview`, and `/documents`.
9. Use complete source content, readable titles, progressive disclosure, clear evidence labels, and unambiguous dates. Preserve the SalesPlay text signature; do not restore the discarded custom logo.

## Routing and context

Prototype `/` redirects to `/home`. Route definitions and titles live in `routing.js`. When adding a route, update parsing, title labels, rendering, and direct-load behavior. Keep `/contacts/import` distinct from `/contacts/:id`. Deployments need SPA fallback.

Primary opportunity destinations are `/accounts/3m/opportunities` (Recommended), `?view=explore`, `?view=prompts` (My Prompts), and `?view=my`. The legacy `?view=briefs` value is still recognized as My Prompts. Prompt editor/results stay within that scope. Inner guided steps, search conditions, preview selection, Saved/Uploaded tabs, and imports are component state, not URL-addressable. `/design-options#10` remains a standalone archive instance, not the main entry.

AI supports one query-selected entity: `opportunity`, `contact`, or `document`, plus optional `chat` for a saved local conversation. Selecting opportunity context replaces another selected entity. Signals open account-scoped AI; selected signal context and cross-account AI are not implemented. Home clearly scopes AI to 3M.

Production must replace `/3m` and seller literals with existing route/context data. New-tab detail pages must work on direct authenticated load without relying on opener memory.

## Data and persistence truth

Seven captured opportunities, 22 captured people, ten signals, three document text readers. Only New Ulm has the complete battle card. New Ulm contains only three named relationship records despite displaying a source count of 22 contacts; the Signals footer also retains a historical source total. Displayed source totals are not local relationship/record counts. Optional evidence/questions/script fields must be handled when missing. Samples are labelled, and cannot inherit 3M research. Name-based fixture merging is not a production identity model.

Persistent prototype state uses localStorage with fallback handling:

- `salesplay-colour-theme`: theme; the only explicit cross-tab storage listener.
- `salesplay-favourite-accounts`: favourite IDs.
- `salesplay-recent-accounts`: up to 30 account visits.
- `salesplay-recent-work-v1`: up to eight person/opportunity visits.
- `salesplay-conversations-v1`: latest 50 conversations and scopes.
- `salesplay-imported-contacts-v1`: local imported contact records.
- `salesplay-briefs-3m-v1`: multiple named opportunity prompts in primary mode; validated on read, saved by stable local ID with updated timestamp. Saving rereads storage before updating the list, but there is no cross-tab state listener or conflict resolution.

Opportunity records/imports, review status, and bookmarks are shared App state across same-tab navigation; reload restores fixtures and three demonstration bookmarks. Explore history, unsaved prompt drafts, active search criteria, and inner flow state reset when the workspace unmounts. Explicitly saved named prompts survive reload in primary mode; gallery prompts remain in memory. Explore history excludes prompt snapshots; unsaved prompt drafts are not persisted. Saved contacts, filters, and unsent drafts also reset on reload. New tabs have independent transient state. Local chat/import URLs require their saved record in that browser. No user/tenant scoping, auth, server sync, or production retention is implemented. Non-theme stores do not synchronize React state between open tabs and stale snapshots may overwrite newer localStorage data; new-tab support does not establish cross-tab consistency.

The People-directory CSV importer supports file/paste, headers/mapping, quoted values, comma/tab/semicolon separation, up to 500 rows / 2 MiB per import (the UI says 2 MB), required name, optional email validation, and duplicate/company skips. Missing company defaults to 3M; other-company rejection is fixture-specific. Do not treat duplicate-by-name as a universal production rule.

The primary Opportunities workspace has a separate CSV/TSV/TXT or paste → review → confirm flow (1 MB / 500 rows). Contact batches match only captured account relationships and do not populate the People directory. Uploaded opportunities remain unverified, have no fabricated relationships or detail URLs, and enter My Opportunities → Uploaded. Do not confuse this flow with `ContactImport`. Imported opportunities remain accessible through the workspace preview and My Opportunities → Uploaded; Home, global search, captured detail routes, and individual AI context exclude them. Their AI action opens account context.

`conversations.js` stores the prompt as the simulated assistant input; `AIResponse` branches on keywords to render captured content. This is deliberately **not live AI**. When porting, remove that simulation and use the existing assistant's message schema and persistence. Never present these echoed prompts as real assistant messages.

## Styling and refactoring

Consult DESIGN.md and the current rendered CSS together. Main cascade: styles → premium → themes → workspace → accounts → refinements → people-research → primary-opportunities. Scoped opportunity-concepts/combined-concepts/entity-selector styles support the approved workspace; primary-opportunities maps its palette into app themes. Home imports home.css. Preserve current computed appearance; earlier style layers and documentation include historical values.

Reuse semantic theme tokens. Keep Precision, Advisory (default), and Mineral IDs aligned in `ThemePicker.jsx`, `public/theme.js`, and `themes.css`. Fonts are local; retain `public/fonts/FONT-LICENSES.txt`. No remote font dependency is needed.

For small reference edits, keep diffs scoped rather than reformatting the whole dense JSX codebase. For production porting, use the target's conventions and types; extract reusable primitives and separate data/presentation as needed. Do not copy main.jsx wholesale or reproduce circular shared exports from WorkspacePages/PeopleWorkspace. Do not install this prototype's package versions or CSS globals over the main app by default.

## Handoff discipline

Read INTEGRATION.md before production work. Discover actual APIs; do not fabricate endpoint names or change their contracts. Preserve production authentication, permissions, account/seller context and error semantics. Report unsupported capabilities explicitly and continue independent work.

Keep README and relevant product docs aligned after behavior changes. `.impeccable` briefs and optional screenshots are reference material, not runtime dependencies; review images are gitignored. Earlier verification claims describe scoped prototype checks, not production readiness. File-picker automation was not completed here; paste import was checked. Do not claim unrun checks, merge, deploy, or publish without authorization.

Outreach: see README's Opportunity outreach and INTEGRATION's Outreach handover. `src/outreach.js` is intentionally a deterministic template adapter; do not describe its saved free-text instructions as functioning AI generation. Preserve Copy/mailto delivery, personal-only templates, preview before replacing the active draft, contact-specific drafts, legacy conversation-kit route compatibility, and captured qualification content. My Prompts is for discovery, not outreach instructions.
