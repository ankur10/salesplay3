# SalesPlay
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users and purpose
Sales teams researching accounts from a seller company's perspective. This prototype presents 3M Company while selling as LANXESS Aktiengesellschaft. Home is the opportunity-led landing workflow: review the seven captured 3M opportunities, engage named people, and resume work, with account shortcuts and a searchable portfolio directory. Opening 3M leads to its opportunity queue; named contacts remain a first-class part of account research.

## Confirmed direction
The replacement visual direction follows the giq2 Advisory reference: local Source Serif 4 / Source Sans 3 typography, a navy command bar, cobalt actions, teal relationship cues, and flat reading surfaces. Global search and Ask SalesPlay are available in the top bar. Contacts have a directory and individual profiles. Every account rail destination renders locally with a distinct URL; refresh and browser Back/Forward are supported.

The top-bar Ask SalesPlay launcher opens a dedicated workspace with visible account context and the current opportunity, contact, or document context. Inside the workspace, the launcher focuses the composer without clearing its draft. Recent interactions are saved automatically, searchable, and resumable with their original scope; the newest 50 conversations persist in this browser. Desktop shows history alongside the conversation; narrower screens use a history toggle. Opportunity detail preserves the original captured battle-card content with a full-width title, labelled business-unit/region/offering metadata, URL-backed tabs, and people and next-action context. The opportunity context picker replaces the prior selected entity. Signal-to-AI actions use account context; selected signal context is not implemented.

## Scope and evidence
The October 4, 2026 source review supplied seven opportunities, 22 unique named contacts, ten signals, company overview, captured annual financial and key competitor tables, and three captured document text readers. The complete inspected New Ulm battle card is included; other opportunities retain their captured summaries and disclose missing detail. Captured counts describe this prototype, not the production account totals.

The account-directory extension includes 121 unique accounts: the captured 3M workspace and 120 explicitly user-approved fictional examples. Sample accounts are labelled and open previews that disclose unavailable research, people, opportunities, and AI context; they do not inherit 3M content. Home, Recently used, Favourites, and All accounts support portfolio navigation.

## Constraints
Preserve captured content and keep backend APIs untouched. This is a frontend prototype with no connected authentication, backend data, live AI, or outreach. Review decisions, opportunity bookmarks, and saved contacts are temporary local state and reset on reload. Conversation history uses localStorage (`salesplay-conversations-v1`) for up to 50 most recently updated conversations, including messages and their original opportunity/contact/document scope. Malformed saved records are ignored; unavailable storage falls back to the current session with a visible notice. Unsaved composer drafts do not persist across reloads. Conversation URLs identify browser-local records, not shared or authenticated chats. Account favourites and up to 30 recently opened account IDs/timestamps persist in this browser through localStorage; storage failures fall back to in-session use. These shortcuts are not a backend or authenticated user profile. External links are limited to original evidence and captured LinkedIn URLs; missing data and links must remain explicit.

## Stack
React with Vite; the implementation does not prescribe the production stack. src/premium.css supplies the replacement visual layer over src/styles.css. Fonts are served locally with their license text. src/themes.css, src/workspace.css, and src/accounts.css layer the palette, readability, and account-directory refinements over that base; src/refinements.css adds scoped opportunity-reading and AI-history refinements. src/conversations.js owns browser-local conversation persistence. src/HomeWorkspace.jsx and src/home.css implement the opportunity-led Home and its responsive layout; useRecentWork in HomeWorkspace tracks browser-local person/opportunity visits. The user-requested text SalesPlay signature supersedes the experimental vector logo and favicon.

## Principles
- Evidence before acceptance.
- Preserve account and supported entity context between discovery, detail, and AI.
- Give contacts direct navigation, readable roles, and contextual actions.
- Preserve captured source content through local readers and progressive disclosure.
- Disclose captured scope and scripted responses.


## People and research extension
People supports All people / Uploaded views, directory search, saved filters, and unique local profile URLs. Upload contacts accepts a CSV file or pasted CSV, maps columns, then previews valid and skipped rows before importing up to 500 contacts / 2 MB. Full name is required; optional email must be valid. Missing company defaults to 3M, while invalid rows, duplicate names/emails, and non-3M rows are skipped with explicit reasons. Imported profiles persist under `salesplay-imported-contacts-v1`, with session fallback when storage is unavailable. Profile URLs only resolve where the imported record exists.

Profiles distinguish captured battle-card relationships from keyword search results across the seven captured opportunities. Search covers title, goal, business unit, and offerings; uploaded keywords initialize the search. Results show opportunity detail and route to the full record without claiming contact ownership. No external profile links, verified relationships, or backend enrichment are invented.

Collapsed desktop/tablet navigation remains usable as a 64px icon rail; mobile keeps the overlay. Accept/Reject are prominent in the sticky desktop/tablet detail action row, with mobile actions in normal flow, and retain temporary in-memory review state. Company brief reduces excess spacing; Signals use consistent rows and dates such as 23 Sept 2026. `src/people-research.css` supplies these scoped overrides after the existing layers.


## Opportunity-led Home
`/` redirects to `/home`, which now opens the opportunity review workspace. The seven captured 3M opportunities support To review / Accepted / Rejected filters, search across title/business unit/offerings, expandable evidence/goal text, direct Accept/Reject, and Return to review. Decisions share the existing account queue state and reset on reload. Home's status and search controls are local to the mounted page. All detail links retain the existing 3M routes.

People to engage offers captured linked people and browser-local uploads, showing up to three people. Captured links exclude rejected opportunities and people linked to an accepted opportunity sort first; uploads do not imply verified relationships or match scores. Continue your work shows the latest three entries across opened people/opportunities, saved conversations, and recent accounts. The new `salesplay-recent-work-v1` localStorage record retains up to eight unique person/opportunity visits with titles, routes, kinds, and timestamps; invalid records are filtered and unavailable storage leaves session state. Existing conversation and account persistence remain separate browser-local stores. An empty recent-work list reveals a first-use guide to choose accounts, upload contacts, and review the first opportunity.

The top bar defaults to Ask SalesPlay with explicit 3M context on Home; Find accounts and Command/Ctrl+K preserve account search. Help me prioritise opens the 3M AI workspace with a draft question. What changed shows three captured signals with source dates; Your accounts shows up to four unique favourites/recent accounts with a 3M fallback. Only 3M has research and AI context; fictional account previews remain explicit and empty of research. No cross-account research, live recency, outreach, or enrichment is invented.

The desktop queue sits beside people, recent work, and AI support. Main columns stack below 850px; supporting sections become one column below 540px. This is an ordinary extension of the established typography, themes, and visual system. The approved page composition and scoped verification live in `.impeccable/briefs/home-workspace.md`.

## AI response navigation
Detail and source links inside Ask SalesPlay responses open a new tab using native anchors, with an arrow icon, tooltip, and accessible new-tab disclosure. The original conversation, draft, and selected context remain in place. Regular navigation and recent-conversation selection stay in the same tab; no Back to conversation control is introduced. New tabs have independent transient prototype review state. Production integration must resolve destinations from authenticated data rather than opener memory.

## Handoff caveats confirmed in the documentation audit
Source-labelled counts are distinct from local records: New Ulm reports 22 contacts but has three named captured relationships, and the Signals footer retains a historical total of 429 alongside ten captured entries. Signals pages and Home format dates with written months; global-search metadata still uses raw signal dates. Only theme state explicitly synchronizes across tabs; other browser-local stores can be overwritten by stale tab snapshots. These are prototype limitations to resolve during integration, not production guarantees. The UI's 2 MB import limit is implemented as 2 MiB (2,097,152 bytes).
