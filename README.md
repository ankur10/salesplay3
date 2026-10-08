# SalesPlay UI redesign

A working frontend reference for integrating the redesigned SalesPlay experience into the main product. It demonstrates the intended appearance, information hierarchy, navigation, and interactions using captured 3M Company content from the seller perspective of LANXESS Aktiengesellschaft.

**This is a design prototype, not a replacement production application.** It has no authentication, backend integration, live AI, or outreach. Reuse the experience and adapt it to the main repository’s existing router, services, permissions, and components. Keep existing backend API contracts unchanged.

## Start here

| Document | Purpose |
| --- | --- |
| [README.md](README.md) | Product experience, design philosophy, file map, routes, and prototype limits |
| [INTEGRATION.md](INTEGRATION.md) | Production migration approach, integration boundaries, acceptance checklist, and a Claude Code handoff prompt |
| [CLAUDE.md](CLAUDE.md) | Instructions for Claude Code working in this reference repo or porting it into SalesPlay |
| [DESIGN.md](DESIGN.md) | Established typography, palette roles, components, and later scoped refinements |
| [PRODUCT.md](PRODUCT.md) | Confirmed scope and detailed product behavior |
| [OPPORTUNITY-CONCEPTS.md](OPPORTUNITY-CONCEPTS.md) | Approved Option 10 opportunity experience, matching/import limits, and archived alternatives at `/design-options` |
| [DIRECTION.md](DIRECTION.md) | Original visual rationale; historical verification sections are not current implementation instructions |

The current rendered UI and implementation establish what has shipped in the prototype. Some earlier design documents retain historical token values and screenshots; use the active CSS cascade to resolve current values. If a migration requirement conflicts with production constraints, record the conflict rather than silently dropping behavior.

## Run locally

Use a Node.js version compatible with the locked Vite 6 dependency. The repo does not currently pin a Node version.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite serves on `127.0.0.1` and prints its port. The development default is usually `5173`. The build outputs `dist/`. The root `vercel.json` configures the SPA rewrite to `index.html`, so direct links and refreshes (including opportunity details) reach the client router instead of Vercel's 404 page. Deploy this configuration with the app; other hosts need an equivalent SPA fallback. Do not copy this host configuration into the main application without checking its deployment conventions.

Stack: React 19, Vite 6, plain JavaScript/JSX, Lucide icons, and plain CSS. No router library, test runner, formatter, or linter is configured in this reference repo. `package-lock.json` is the dependency lock.

## Design philosophy

### Lead with the next sales action

Home answers “What should I pursue next?” Opportunities lead; people, signals, accounts, and recent work support that decision. Avoid equally weighted dashboard widgets, decorative metrics, and large empty hero areas. Show useful records and actions early.

### Make people first-class

Contacts have searchable directories, individual URLs, detailed opportunity context, and direct AI handoff. Uploaded contacts sit alongside captured contacts with their origin disclosed. A keyword search result is not a verified relationship or proof of decision-making authority.

### Make AI a workspace

Ask SalesPlay is prominent in the command bar and has a dedicated page, visible account/entity context, a focused composer, and resumable history. It is not a permanent panel competing with research for width. Home currently scopes AI to 3M; cross-account AI has not been implemented.

### Keep dense research calm and readable

The giq2 Advisory reference informed the editorial direction: Source Serif 4 headings, Source Sans 3 controls/body text, a navy command bar, quiet light surfaces, fine separators, restrained corners, and theme-aware actions. Use spacing and type hierarchy before adding boxes. Preserve complete opportunity titles and use progressive disclosure for supporting evidence.

### Preserve context without trapping the conversation

Normal app navigation and recent-conversation selection use the same tab. **Detail/source links inside AI responses open a new tab**, leaving the original conversation and draft intact. These links use an arrow icon, an “Opens in a new tab” tooltip, and screen-reader text. No “Back to conversation” UI is required. Ordinary internal links still support Cmd/Ctrl-click and browser Back/Forward.

### Be explicit about evidence and state

Evidence strength describes captured research, not predicted success. Accept/Reject is prominent and reversible in the preview. Missing data stays visibly missing. Signals pages and Home use an unambiguous date format such as `23 Sept 2026`. Some other surfaces, including signal metadata in global search, still display raw captured date strings; consistent formatting across every surface remains integration work. Do not fabricate contacts, ownership, scores, source links, recency, or AI capability.

## Experience by surface

| Surface | Intended behavior |
| --- | --- |
| Home | Opportunity queue with search and review-state tabs; Accept/Reject; linked/uploaded people; recent work; scoped AI prompt; three signals; favourite/recent accounts; first-use guidance when history is empty |
| Account directory | Search, industry/region filters, sorting, pagination, favourites, recent accounts, and explicit sample-account previews |
| Opportunities | Approved Option 10: Recommended with preview; Explore with keyword/guided discovery and faceted Search; My Prompts for saved custom opportunity criteria; My Opportunities with Saved/Uploaded collections and preview |
| Opportunity detail | Readable full title; business units, region, offerings; Overview/Evidence/Conversation kit URLs; prominent Accept/Reject; people and next-action context |
| People | All/Uploaded views, role/search/saved filters, profiles, verified captured links separated from opportunity search results |
| Contact import | CSV file or paste → map columns → review valid/skipped rows → import; errors and duplicate reasons before confirmation |
| Ask SalesPlay | Account plus optional opportunity/contact/document context; scripted responses; composer; searchable recent interactions; response links in new tabs |
| Research | Company brief, Signals and readers, documents and readers, investor deck, earnings call, financials, and competitors |
| Shell | Top command bar, theme picker, local breadcrumbs, expanded account research, collapsed research library, desktop icon rail, mobile overlay navigation |

## Relevant files

| File | Responsibility / integration seam |
| --- | --- |
| `src/main.jsx` | App state and composition; shell; shared opportunity records/bookmarks and detail; contextual AI; `changeStatus`, `ask`, `askEntity`; `AIResponse` and new-tab `ResponseLink` |
| `src/CombinedConcepts.jsx` | Approved Option 10 workspace; embedded in App with shared records/bookmarks; also renders gallery options 7–10 |
| `src/OpportunityBrief.jsx`, `src/opportunity-brief.css` | Prompt-first editor, optional criteria, reviewable terms, named save/update, Any/All matching, and captured-result count |
| `src/BriefLibrary.jsx`, `src/savedBriefs.js` | Searchable My Prompts library; validated browser-local saved prompts for the primary app |
| `src/EntitySelector.jsx`, `src/entity-selector.css` | Searchable bounded multi-select, retained selections, reviewed paste matching; compact facet variant |
| `src/primary-opportunities.css` | Main-shell and semantic-theme integration for the approved workspace |
| `src/HomeWorkspace.jsx` | Home composition and `useRecentWork`; consumes opportunities, contacts, account preferences, conversations, and action callbacks |
| `src/AccountDirectory.jsx` | Directory, recent/favourite/sample views and `useAccountPreferences` |
| `src/PeopleWorkspace.jsx` | People directory/profile, captured opportunity relationships, and keyword search |
| `src/ContactImport.jsx` | Import UI, file/paste handling, mapping, review, and success states |
| `src/contactImportData.js` | CSV parsing, field inference, row validation/deduplication, and local imported-contact loading |
| `src/GlobalBar.jsx` | Ask SalesPlay launcher, search mode/results, keyboard shortcut, theme control |
| `src/conversations.js` | Local conversation model, storage validation, scope-bearing URLs, and simulated reply timer |
| `src/ConversationHistory.jsx` | Searchable, grouped conversation history and same-tab resume |
| `src/WorkspacePages.jsx` | Research pages and shared `LocalLink`, `Avatar`, `PeoplePanel`; captured contacts/documents exports; delegates people/import pages |
| `src/routing.js` | Prototype History API router, paths, route parsing, title labels, and ordinary same-tab link handling |
| `src/data.js` | Seven captured opportunities; complete New Ulm battle card; three original starting contacts |
| `src/research.json` | Captured contacts, signals, document text, overview, financials, and competitors |
| `src/accounts.js` | 3M plus fictional account fixtures and portfolio-view configuration |
| `src/ThemePicker.jsx`, `public/theme.js` | Theme selection, persistence, cross-tab theme sync, and pre-paint restoration |
| `public/fonts/` | Local font assets and `FONT-LICENSES.txt`; preserve licenses when carrying assets across |
| `.impeccable/briefs/` | Feature-specific design decisions; useful reference, not production runtime dependencies |

### Styling and ownership

The prototype evolved through layered CSS. Main imports are ordered: `styles.css` → `premium.css` → `themes.css` → `workspace.css` → `accounts.css` → `refinements.css` → `people-research.css` → `primary-opportunities.css`. The opportunity workspace also uses scoped `opportunity-concepts.css`, `combined-concepts.css`, and `entity-selector.css`. `HomeWorkspace.jsx` also imports its scoped `home.css`.

- `styles.css`: inherited base layout and controls.
- `premium.css`: editorial visual layer and local font faces.
- `themes.css`: current semantic palette tokens for Precision, Advisory (default), and Mineral.
- `workspace.css`: shared readability and workspace refinements.
- `accounts.css`: portfolio and navigation refinements.
- `refinements.css`: AI history/composer and opportunity-detail refinements.
- `people-research.css`: people/import, compact rail, decisions, overview, and Signals.
- `home.css`: opportunity-led Home, responsive composition, and supporting sections.

For production, map the **computed end result** into the existing design system; do not paste every global stylesheet into the main repo. Theme IDs and header colors are duplicated in `ThemePicker.jsx` and `public/theme.js`; keep them aligned with `themes.css`. Self-host fonts and retain their licenses.

## Routes and link behavior

These are reference URLs, not a mandate to replace production URLs. `/` redirects to `/home`. Every detail has a unique URL and supports refresh and Back/Forward.

| Surface | Prototype path |
| --- | --- |
| Home | `/home` |
| All / recent / favourite accounts | `/accounts`, `/accounts/recent`, `/accounts/favourites` |
| Sample account | `/accounts/sample-:group-:sector` |
| Recommended | `/accounts/3m/opportunities` |
| Explore | `/accounts/3m/opportunities?view=explore` |
| My Prompts | `/accounts/3m/opportunities?view=prompts` |
| My Opportunities | `/accounts/3m/opportunities?view=my` |
| Opportunity detail | `/accounts/3m/opportunities/:id` |
| Detail tabs | `/accounts/3m/opportunities/:id/evidence`, `/accounts/3m/opportunities/:id/conversation-kit` |
| People / profile / upload | `/accounts/3m/contacts`, `/accounts/3m/contacts/:id`, `/accounts/3m/contacts/import` |
| Ask SalesPlay | `/accounts/3m/ask` |
| Company brief | `/accounts/3m/overview` |
| Signals / reader | `/accounts/3m/signals`, `/accounts/3m/signals/:id` |
| Documents / reader | `/accounts/3m/documents`, `/accounts/3m/documents/:id` |
| Other research | `/accounts/3m/investor-deck`, `/accounts/3m/earnings-call`, `/accounts/3m/financials`, `/accounts/3m/competitors` |
| Help | `/help` |

AI queries carry one selected entity: `?opportunity=:id`, `?contact=:id`, or `?document=:id`. A saved conversation adds `chat=:uuid`. Selecting a different opportunity replaces prior entity context. Signals use account-level AI. People can be filtered with `?opportunity=:id`.

Ordinary routes use `LocalLink`/`follow()`. AI response destinations use `ResponseLink`, a native anchor with `target="_blank"` and `rel="noopener noreferrer"`; do not attach the same-tab click interceptor to it. Recent interactions continue to use same-tab links. New tabs reload the application, so transient prototype review/bookmark state is not shared between them.

**Option 10 is the approved primary Opportunities experience.** The app’s left navigation exposes Recommended, Explore, My Prompts, and My Opportunities at the URLs above. The former opportunity-list UI is no longer rendered. Recommended and My Opportunities start with the preview expanded. Explore offers keyword search and five guided starting points: Contact, Persona, Product, Business unit, and Signal. Trigger and custom prompts are absent from Explore entry, tabs, and history. Search shows facets, results, and preview.

**My Prompts** owns the complete custom-prompt workflow: Create prompt, a quiet prompt-first editor, reviewable criteria, explicit Save prompt / Save changes, and matching opportunity results with Edit prompt. Optional signals and exclusions sit behind a disclosure. Users adjust derived terms, choose Any/All matching, and see a captured-result count before searching. The searchable library supports multiple named prompts, matching counts, View opportunities, and Edit prompt. Finding opportunities does not automatically save a prompt. Saved prompts persist in this browser for 3M; the legacy storage key is retained to preserve existing saves. Creation, editing, and prompt results stay within My Prompts. The former `?view=briefs` URL remains a compatibility alias for `?view=prompts`.

Matching is local substring matching over captured titles, goals, business units, products, and contact names/roles—not AI interpretation or verification of new signals. Imported opportunities are excluded from prompt matching. Guided steps, result conditions, prompt editor/results, preview selections, Saved/Uploaded tabs, and import steps remain local component state, not deep links. Explore recent searches replay keyword/guided criteria only and survive destination changes while the workspace remains mounted; leaving Opportunities clears history.

Records, review decisions, imported opportunities, and bookmarks use App state shared with other same-tab app views. Saved starts with three captured opportunities bookmarked for demonstration; Uploaded starts empty. This is temporary prototype state and resets on reload. Imported opportunities remain accessible through the workspace preview and My Opportunities → Uploaded; Home, global search, captured detail routes, and individual AI context exclude them. Their AI action opens account context. Imports require review and remain unverified. Contact-list matching stays within 3M and does not add people to the persisted directory.

The `/design-options` gallery remains an archive of ten alternatives (`#1` through `#10`), including a standalone copy of the chosen design. Gallery instances retain isolated state and do not update the primary app. Use the main routes to review the accepted experience. See [OPPORTUNITY-CONCEPTS.md](OPPORTUNITY-CONCEPTS.md) for matching limits and historical verification scope.

## Data, persistence, and limits

The reference contains **seven opportunities, 22 captured people, ten signals, and three captured document readers**. Only New Ulm has the full inspected battle card. Its fixture contains three named contact relationships while its reported contact count is 22. Other opportunity counts also come from captured source labels, not complete relationship arrays. The Signals footer retains a historical source total of 429 alongside the ten captured entries. Do not treat these displayed source counts as the number of local records or current production totals. Document readers contain captured text, not original PDF layouts. The directory adds **120 fictional accounts** to 3M; they never inherit 3M research or AI context.

| State | Prototype storage | Limit / behavior |
| --- | --- | --- |
| Theme | `salesplay-colour-theme` | Browser-local; synchronizes across tabs |
| Favourite accounts | `salesplay-favourite-accounts` | Browser-local account IDs |
| Recent accounts | `salesplay-recent-accounts` | Up to 30 IDs/timestamps |
| Recent people/opportunities | `salesplay-recent-work-v1` | Up to eight unique visits; Home combines with accounts/chats and shows three |
| Conversations | `salesplay-conversations-v1` | Latest 50, including messages, scope, title, timestamp |
| Imported contacts | `salesplay-imported-contacts-v1` | Browser-local `imported-` IDs; each import allows up to 500 contacts / 2 MB |
| Named opportunity prompts | `salesplay-briefs-3m-v1` | Primary app only; multiple validated prompts survive reload; gallery uses memory; no live monitoring |
| Opportunity records/imports, review decisions, bookmarks | App React state | Shared during same-tab app navigation; reload restores fixtures and three sample bookmarks; independent across tabs |
| Explore history, filters, guided/import steps | Workspace React state | Reset on workspace unmount or reload; no deep links |
| Saved people, drafts | React state | Reset on reload; not shared between tabs |

Storage accesses have fallback handling, but this is not production persistence. Only the theme has an explicit cross-tab synchronization listener. Other stores load into each tab independently; stale tabs can overwrite newer localStorage values, especially conversation/account history. New-tab navigation preserves the original tab in the observed flow, but does not provide cross-tab data consistency. Local chat/upload URLs only work in the browser containing the record. There is no authenticated user/tenant namespace, logout cleanup, backend synchronization, or production data-retention policy. Do not adopt these storage keys as a production persistence design.

The People-directory contact import labels its file limit as 2 MB; the actual threshold is 2 × 1024 × 1024 bytes (2 MiB), with files at that threshold accepted. CSV import requires a full name; supplied email is validated. Missing company defaults to 3M. Duplicate names/emails and non-3M companies are skipped with reasons. This account-specific validation is a **fixture constraint**, not a general production business rule. Uploaded contacts receive no fabricated relationships, external profiles, or enrichment. Opportunity keyword search is client-side text matching. Guided and facet matching use captured fields; persona/trigger rules are illustrative. The Opportunities workspace has a separate CSV/TSV/TXT or paste import flow limited to 1 MB / 500 rows, with row review before contact matching or adding unverified opportunities. It does not use the persisted contact-directory import store.

AI responses are scripted; the timer in `conversations.js` stores the user prompt as the assistant message input, then `AIResponse` selects demonstration content. That is not an LLM response model. Replace the entire simulation boundary with the existing production assistant integration; never persist echoed prompts as real assistant responses.

## Verification and handoff status

The latest source build passed with `npm run build`. Browser checks during development covered:

- Local navigation, unique detail/tab URLs, refresh, and Back/Forward.
- Home search/empty recovery, Accept/Return to review, uploaded people, recent-person persistence, and scoped AI draft.
- Directory filters, pagination, favourites, recent accounts, and sample-account boundaries.
- CSV paste import, mapping, duplicate/invalid/company skips, saved profile reload, and contact opportunity search.
- AI launch/context, draft preservation, saved history/resume, and response links opening a separate tab without losing the original conversation/draft.
- Desktop and 390px mobile layouts; no horizontal overflow in inspected flows.

These are scoped checks, **not a production certification or a committed automated test suite**. Native file-picker automation was blocked by browser-extension permissions; its shared parsing/import path was exercised through paste. Authentication, API failures, authorization, streaming AI, real server pagination, concurrent writes, and multi-tenant behavior remain integration work.

Optional review screenshots are in `.impeccable/review/` and are gitignored. They will not be included by a normal clone. Current useful sets are `home-*`, `battlecard-*`, `ai-history-*`, `ai-new-tab-links.png`, `contact-import-*`, `contact-opportunities-*`, `decisions-*`, `overview-*`, and `signals-*`. Share selected images separately if required; do not ship them as application assets. Earlier `v2-*` and `accounts-home*` captures are historical.

Next: follow [INTEGRATION.md](INTEGRATION.md) to port this experience into the main repo without replacing its production foundations.

### Documentation audit — 4 October 2026

Rechecked README, CLAUDE, and INTEGRATION against the current source. Ad hoc Node assertions passed for fixture counts, every declared top-level route, upload-route precedence, evidence-tab parsing, CSV delimiter handling and the 500-row boundary, malformed conversation storage, and scope-bearing conversation URLs. These assertions were run during the audit; they are not a committed regression suite. Documentation links and whitespace checks also passed. Browser/build results listed above are earlier development evidence, not newly rerun in this documentation audit.

The main SalesPlay repository and its API definitions were not inspected. INTEGRATION.md therefore provides a migration process and verification requirements, not a verified compatibility assessment.

### Opportunity outreach

The detail page now has Overview, Outreach, and Evidence tabs. **Prepare outreach** and each captured person's **Prepare email** action open `/accounts/3m/opportunities/:id/outreach` (optional `?contact=Full%20Name`). The old `/conversation-kit` route opens Outreach for compatibility.

Outreach opens with pre-filled editable Email, Talking points, and Follow-up tabs, plus a full-width **My Templates** tab. There is no Objective dropdown or preferences side rail. Personal templates support a name, material type, subject, reusable content, and optional writing instructions. **Save as template** starts from the current draft; **Use template** previews substitutions before replacing only the active material. Supported placeholders: `{{first_name}}`, `{{contact_name}}`, `{{company}}`, `{{opportunity}}`, `{{products}}`, and `{{signature}}`. Templates are browser-local, not shared with a team.

Delivery remains Copy or Open in email app (`mailto:`); SalesPlay does not send or track email. Existing per-contact drafts are preserved. Default content is deterministic; free-form template instructions are saved as guidance but are not interpreted by AI.

Relevant files: `src/OutreachWorkspace.jsx` (workflow), `src/outreach.js` (template/storage/mailto helpers), `src/outreach.css` (responsive layout), `src/routing.js` and `src/main.jsx` (entry points). Browser keys: `salesplay-outreach-templates-v1`, `salesplay-outreach-drafts-v1`, and the retained `salesplay-outreach-preferences-v1` for legacy signature/tone defaults. Production must use authenticated user-scoped persistence.
