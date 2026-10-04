# SalesPlay account workspace

Interactive React prototype with an opportunity-led Home, account directory, opportunity queue, first-class contacts, local research pages, and contextual AI. The replacement visual direction draws on the giq2 Advisory reference using locally served Source fonts, an editorial hierarchy, and a navy command bar.

## Run

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. `npm run build` creates `dist`; `npm run preview` serves it. Deployment requires an SPA fallback to `index.html` so deep links resolve on refresh.

## Included

- Home at `/home` with the seven captured 3M opportunities, To review / Accepted / Rejected tabs, search and clear-search empty state, direct Accept/Reject and Return to review, linked or uploaded people, combined recent work, dated signals, and favourite/recent account shortcuts. A first-use guide offers account selection, contact upload, and the first opportunity when recent work is empty.
- A 121-account directory with search, industry/region filters, sorting, 20/50/100-row pagination, and empty states. The captured 3M account opens opportunities; 120 user-approved fictional accounts open clearly labelled previews. Account favourites and recent visits persist in this browser.

- Seven captured opportunities, status/search/filter/sort controls, review and undo, bookmarks, and URL-backed detail tabs. The New Ulm record includes the complete inspected battle card, with a full-width title, labelled business-unit/region/offering metadata, readable goal/evidence sections, and people/next-action aside.
- Twenty-two unique captured contacts plus browser-local uploads, a searchable All people / Uploaded directory, unique profiles, saved contacts, detailed captured opportunities, and contact-to-AI handoff. CSV files or pasted CSV go through column mapping and review before import (500 contacts / 2 MB). Invalid, duplicate, and other-account rows are skipped with reasons. Profile keyword search covers the seven captured opportunities; results do not establish a verified relationship.
- Global account-name search from portfolio pages; search across captured opportunities, people, documents, and signals within 3M; a top-bar Ask SalesPlay launcher that opens the dedicated AI workspace with current opportunity, person, or document context. Reusing the launcher inside AI preserves the current draft.
- Automatic browser-local history for the latest 50 conversations, with search, date groups, timestamps, question counts, and resume/continue actions. Desktop shows recent interactions beside the conversation; at 900px and below a header toggle switches between history and conversation. A compact working-context disclosure and contained transcript scroll keep the workspace focused.
- Company overview, ten signals with local readers, captured annual financial and key competitor tables, and three full captured document text readers.
- Top-bar colour picker with giq2-inspired Precision, Advisory (default), and Mineral palettes. The choice persists in this browser across routes and reloads, and synchronizes between open tabs.
- Readable 16px body type, quieter opportunity rows, task-specific assistant actions, and the restored SalesPlay text signature. The experimental logo and favicon are removed. People, Signals, Company brief, and Research library are current display labels; existing 3M URLs remain stable.
- Account research starts expanded with its nested Research library collapsed. The rail footer collapses navigation to a 64px icon rail on desktop/tablet, with labelled hover/focus destinations and an expand control. Mobile retains overlay navigation and the breadcrumb reopen control. Scrollbar chrome is hidden while scrolling remains available when needed.
- Responsive layouts, mobile people shortcut, keyboard focus, reduced-motion support, and Command/Ctrl+K search.

## Local routes

All account rail destinations stay on the prototype origin. `/` redirects to `/home`. Captured entity identifiers remain unchanged; fictional directory IDs use the `sample-<number>-<number>` pattern.

| Surface | URL |
| --- | --- |
| Home | `/home` |
| All accounts / recently used / favourites | `/accounts`, `/accounts/recent`, `/accounts/favourites` |
| Fictional account preview | `/accounts/sample-:group-:sector` (for example `/accounts/sample-1-1`) |
| Help | `/help` |
| Opportunity queue | `/accounts/3m/opportunities` |
| Opportunity detail / tabs | `/accounts/3m/opportunities/:id`, with `/evidence` or `/conversation-kit` |
| Contact upload | `/accounts/3m/contacts/import` |
| Contact directory / profile | `/accounts/3m/contacts`, `/accounts/3m/contacts/:id` |
| AI workspace | `/accounts/3m/ask` |
| Overview | `/accounts/3m/overview` |
| Signals / reader | `/accounts/3m/signals`, `/accounts/3m/signals/:id` |
| Documents / reader | `/accounts/3m/documents`, `/accounts/3m/documents/:id` |
| Research | `/accounts/3m/investor-deck`, `/accounts/3m/earnings-call`, `/accounts/3m/financials`, `/accounts/3m/competitors` |

AI context is encoded with `?opportunity=:id`, `?contact=:id`, or `?document=:id`. Saved conversations add `chat=:uuid` to that query (for example, `/accounts/3m/ask?opportunity=:id&chat=:uuid`); opening one restores its messages and original scope from this browser. Missing local records show an explicit notice. New conversation retains the selected scope and starts a fresh thread when a question is sent. The directory can use `?opportunity=:id` to show linked contacts. Routes support browser Back/Forward and direct loading. Queue filter and review state are not persisted in URLs. Original evidence and captured LinkedIn links remain external.

## Scope and limitations

The directory has 121 accounts: captured 3M plus 120 explicitly approved fictional examples. Sample previews do not contain captured research or live account data. All research counts reflect captured prototype records, not production totals. Only the New Ulm opportunity has a complete inspected battle card; other records disclose their limited captured detail. Document readers reproduce captured text, not the original PDF layout. Financial and competitor tables contain the captured subset. Missing contact information and opportunity links are not invented.

Imported contacts use `salesplay-imported-contacts-v1` in localStorage, with unique `imported-` profile IDs and session-only fallback if saving fails. Only full name is required; supplied email is validated, missing company defaults to 3M, and duplicates match name or email. Uploads do not create LinkedIn URLs or verified opportunity links, and no backend enrichment runs.

No backend APIs are called, no production records change, and no outreach is sent. Review decisions, opportunity bookmarks, and saved contacts are in-memory and reset on reload. Conversations persist automatically in `salesplay-conversations-v1` through localStorage, newest first with a 50-conversation limit. Saved data includes messages, first-question title, scope label/query, and last-updated time. Invalid saved records are ignored, and unavailable storage keeps history in-session with a visible notice. Unsaved drafts reset on reload. Saved chat URLs work only where their browser-local records exist; history is not shared or synchronized with a backend. Account favourites use `salesplay-favourite-accounts`; recent account IDs and visit timestamps use `salesplay-recent-accounts` (up to 30), both in localStorage. Invalid saved IDs are ignored, and unavailable storage falls back to in-session state. These preferences do not synchronize with a backend. AI is explicitly scripted; unsupported requests explain that the live assistant is not connected. Supported selected context is opportunity, contact, or document; signal actions open account-wide AI. Choosing opportunity context replaces any previous selected entity.

## Implementation and verification

`src/HomeWorkspace.jsx` owns Home and browser-local recent entity tracking, with scoped layout in `src/home.css`; `src/AccountDirectory.jsx` owns account directory pages and account preferences, `src/accounts.js` supplies the directory records, `src/accounts.css` supplies portfolio/navigation refinements, `src/main.jsx` owns the core workspace, `src/WorkspacePages.jsx` the local research and people pages, `src/GlobalBar.jsx` global commands, and `src/routing.js` browser-history routing. `src/conversations.js` owns local conversation persistence; `src/ConversationHistory.jsx` renders search and resume controls; `src/refinements.css` layers scoped AI-history and opportunity-reading styles after the existing stylesheets. Captured content lives in `src/data.js` and `src/research.json`. `src/premium.css` overrides the base `src/styles.css`; font assets and license text are in `public/fonts`.

Production build passed during the v2 implementation. Browser verification covered all local rail links, global search relevance, direct profile reload, browser history, detail-tab URLs, mobile overflow/filter bounds, and contact-to-AI context. Final visual review found no material issues and no browser console errors. Local review captures are under `.impeccable/review/v2-*`; older captures are historical. PRODUCT.md defines scope, DIRECTION.md records the approved direction, and DESIGN.md plus `.impeccable/design.json` document implemented tokens and component samples.

The account-directory extension passed source assertions for 121 unique IDs and seven route cases. Browser checks covered pagination, filters, empty states, favourite persistence after reload, recent visits, navigation, and mobile layouts. Independent finish review returned **SHIP**, with no material findings across all six captures; the detector reported 15 advisories attributable to intentional choices or pre-existing metadata. The final extension production build passed (Vite, 1,635 modules); source assertions and git diff whitespace checks also passed.

Historical account-directory review images are browser captures of the prototype, not generated artwork; the Home images below predate the opportunity-led Home:

- `.impeccable/review/accounts-home.jpg` and `.impeccable/review/accounts-home-mobile.jpg`
- `.impeccable/review/accounts-directory.jpg` and `.impeccable/review/accounts-directory-mobile.jpg`
- `.impeccable/review/accounts-navigation.jpg` and `.impeccable/review/accounts-navigation-mobile.jpg`


The AI-history and opportunity-reading extension passed browser checks for the top-bar launcher, preserving an existing draft, opportunity/contact/document context, automatic save, reload, history search, resume/continue, and local detail-tab navigation. Pure-function checks covered malformed and denied storage, newest-first ordering, 50-conversation retention, and scope-bearing URLs. At the tested 390 × 844 mobile viewport, the composer ended at 778px with no horizontal overflow; the checked flows reported no browser console errors. The detector returned 38 advisory type-ramp findings against inherited metadata and existing refinements. Final finish review returned **SHIP** after the launcher-hover token and conversation-kit navigation fixes were verified. A browser check confirmed the assistant’s kit action opens `/conversation-kit` with the expected conversation guidance and qualification content. The final production build passed (Vite, 1,638 modules, exit 0); git diff whitespace checks passed.

Extension review evidence is browser-captured prototype output, not shipping artwork:

- `.impeccable/review/battlecard-desktop.png` and `.impeccable/review/battlecard-mobile.png`
- `.impeccable/review/ai-history-desktop.png` and `.impeccable/review/ai-history-mobile.png`
- `.impeccable/review/ai-conversation-mobile.png`


The people/research extension adds `src/PeopleWorkspace.jsx`, `src/ContactImport.jsx`, and `src/contactImportData.js`; `src/people-research.css` supplies scoped people/research styles. Opportunity detail now offers first-class Accept/Reject controls in a sticky desktop/tablet action row (in normal flow on mobile), retaining in-memory decisions and Return to review. Company brief uses a more compact reading layout; Signals use consistent rows and explicit dates such as 23 Sept 2026.

Verification: production build and pure parser/routing checks passed. Browser paste import reviewed one valid and three skipped rows, imported the valid contact, and verified persistence and profile reopening. Desktop and 390px mobile captures cover import, contact opportunities, decisions, overview, and signals under `.impeccable/review/` (`contact-import-*`, `contact-opportunities-*`, `decisions-*`, `overview-compact-desktop.png`, `overview-mobile.png`, `signals-icons-desktop.png`, and `signals-mobile.png`). Native file-picker automation remains unverified because browser-extension permission blocked that check. The design detector's type-step findings are advisory; the intentional scoped typography is recorded in DESIGN.md. Captures are review evidence of the local prototype, not shipping artwork.

Independent finish review inspected all ten extension captures and passed the scoped local preview with no material findings. Browser checks also verified Reject and Return to review.


The opportunity-led Home keeps the established fonts, themes, command bar, navigation, and flat reading surfaces. Its top bar defaults to Ask SalesPlay with explicit 3M context; Find accounts and Command/Ctrl+K retain portfolio account search. Help me prioritise opens the 3M AI workspace with a draft question. Home links use the existing opportunity, person, upload, signal, account, and saved-conversation routes. Sample accounts never inherit 3M research or AI context.

Continue your work combines recent people/opportunities, saved conversations, and recent accounts by timestamp and shows the latest three. `salesplay-recent-work-v1` stores up to eight unique opened person/opportunity records in this browser, including title, local route, kind, and time. Malformed records are filtered on load; storage failures leave current-session state. This adds no backend persistence. Home review decisions share the account queue's in-memory state and reset on reload; Home status/search controls reset when Home remounts. Your accounts shows up to four unique favourites, recent accounts, and the 3M fallback. People links represent captured relationships; uploads do not acquire verified links or match scores.

Desktop Home pairs the opportunity queue with supporting people, recent work, and AI; below 850px the main columns stack, and below 540px the supporting sections become one column. Browser verification covered Accept/Return to review, search/no-results/reset, uploaded-tab profile navigation, recent-person persistence, AI draft/context, and account search. The production build passed. Independent review returned **SHIP** with no material findings across the scoped desktop/mobile captures and code. Detector type-step and colour findings remain advisory. Current browser review evidence: `.impeccable/review/home-desktop.png`, `.impeccable/review/home-mobile.png`, and `.impeccable/review/home-preview.png`. These are prototype captures, not shipping artwork. The page behavior is recorded in `.impeccable/briefs/home-workspace.md`; DESIGN.md and its sidecar remain the established system authority.

Ask SalesPlay response links open opportunities, linked people, documents, conversation kits, and external sources in a new tab. Each includes a new-tab icon, tooltip, and screen-reader label. Normal navigation and recent conversation links remain in the same tab.
