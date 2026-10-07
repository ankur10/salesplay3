# Integrating the redesign into the main SalesPlay repository

## Objective and boundaries

Use this repository as an executable design and interaction reference. Implement that experience in the existing SalesPlay application while preserving its backend API contracts, authentication, authorization, tenant boundaries, business logic, and supported content.

This reference does not contain the main repository, endpoint definitions, or production schemas. The mappings below are integration seams to investigate, not claims that an endpoint exists. Do not invent endpoints or API fields. When the current backend cannot support a requested behavior, document the gap and use an explicitly agreed fallback; never disguise prototype state as saved production data.

Do not replace the production app with this Vite project or overwrite its package manifest, router, CI, deployment configuration, or root Claude instructions.

## Recommended sequence

1. **Inspect both repositories.** Read the target's `CLAUDE.md`/`AGENTS.md`, architecture, existing design system, routes, API clients, auth/permission model, tests, and deployment conventions. Read this README and view the reference at desktop and mobile widths.
2. **Write a mapping before implementation.** For each surface, identify its target route/component, current API/service, relevant permissions, and missing capabilities. Separate supported UI changes from unresolved backend-dependent work. Record the chosen route compatibility strategy.
3. **Establish visual foundations.** Adapt semantic colors, local fonts, type hierarchy, spacing, focus states, and shell to target conventions. Preserve all three themes if in scope. Isolate styles so legacy pages do not regress.
4. **Port one vertical slice.** Start with account → approved Option 10 opportunities → battle card → Ask SalesPlay → new-tab opportunity link. Bind real IDs and data before adding more surfaces. Verify a newly opened tab authenticates and resolves its account/entity independently.
5. **Port people and import.** Integrate directories/profiles and genuine relationships; preserve explicit missing-data states. Connect import only to supported services and approved account-matching/deduplication rules.
6. **Port research, directory, and Home.** Build Home from available production data. Aggregate across authorized accounts only if existing services support it; otherwise show honest selected-account scope. Replace fictional accounts and fixed counts completely.
7. **Connect persistence and AI.** Use existing authenticated services/state for reviews, bookmarks, favourites, recent work, conversations, and uploads. Replace the simulation rather than wrapping it. Add loading, errors, retries, and permission states that real calls require.
8. **Validate and hand off.** Run the target repo's checks, execute the acceptance matrix below, compare desktop/mobile visuals, and document changed files, API mappings, unresolved limitations, and rollout/rollback approach. Use existing feature flags if the target has them; do not invent a deployment system.

## Reference-to-production mapping

| Reference boundary | What production integration must resolve |
| --- | --- |
| `data.js`, `research.json`, `accounts.js` | Existing query clients/selectors; stable IDs; account and seller context; optional fields; server totals/pagination; remove fixtures from production paths |
| `routing.js`, `LocalLink` | Existing router, base path, permissions, deep-link compatibility, query encoding, browser history; parameterize account/seller IDs rather than carrying `/3m` literals |
| `CombinedConcepts` primary mode, `EntitySelector` | Approved Recommended/Explore/My layout; map dimensions to supported fields and stable IDs; remote lookup/pagination where existing APIs support it; review-before-confirm import flows; remove illustrative persona/trigger rules |
| `App.records`, `changeStatus` | Current review mutation/status vocabulary; loading/disabled state; error rollback and cache invalidation; actual supported undo semantics |
| `bookmarks`, `savedContacts`, account preferences | Existing user-specific persistence; permission and failure states; avoid unscoped localStorage |
| `HomeWorkspace` | Real queue and relationship selectors; authorized account scope; actual recency; supported aggregate search/filter/pagination; no manufactured scores or urgency |
| `PeopleWorkspace` | Production contact IDs and opportunity relationships; distinguish verified association from search relevance; tolerate missing role/email/location |
| `ContactImport` / `contactImportData` | Existing upload/import API if any; CSV limits, encoding, mapping, duplicate identity, company resolution, partial successes, row errors, and retention rules |
| `GlobalBar` | Existing search endpoints and query cancellation/debouncing where appropriate; preserve entity context on AI launch; make scope visible |
| `useConversations`, `AIResponse` | Existing assistant transport/message schema, persisted conversation IDs, selected context, sources, streaming/cancellation/errors; remove scripted content and simulated timer |
| `ResponseLink` | Native new-tab destinations or target-router equivalent; safe URL handling; accessible indicator; no same-tab interceptor; direct authenticated loading |
| Research readers | Existing complete content and provenance; do not replace production source readers with incomplete captured text |
| Theme and CSS layers | Target design-system tokens, component styles and font delivery/CSP; avoid importing broad global overrides |

An adapter/view-model layer is a useful way to preserve UI composition without changing endpoint contracts. Use the target repository’s existing pattern and types; the reference does not require a specific adapter library or state manager.

## Non-negotiable interaction rules

- Use approved Option 10 for Opportunities; the former list is superseded. Recommended, Explore, and My Opportunities belong in the app left nav. Keep Recommended/My previews open by default, guided and keyword entry in Explore, and facets beside Search results. Saved/Uploaded are My Opportunities tabs.
- Home leads with opportunities and supports people, recent work, signals, and accounts. People must remain easy to find, not buried in a generic activity widget.
- Keep Ask SalesPlay prominent in the command bar and as a dedicated workspace. Show account plus selected opportunity/contact/document context. Do not silently expand scope to other accounts.
- Response links to opportunities, people, documents, conversation kits, or external sources open in a new tab. Show the icon plus accessible disclosure. Normal navigation and recent AI conversations stay in the same tab.
- New-tab navigation leaves the original conversation, composer draft, selected context, and scroll untouched. It does not require a return-to-conversation link.
- Preserve unique detail and section URLs, deep-link refresh, browser Back/Forward, and normal modified-click behavior.
- Keep Accept/Reject prominent on detail pages and available in the Home queue. Use production business rules and honest persistence feedback.
- Desktop collapse leaves a usable icon rail with labels/tooltips; mobile uses the existing overlay approach. Account Research starts expanded, Research Library collapsed.
- Breadcrumbs in account pages follow All Accounts → Account name → Section. Keep the display label **Signals**.
- Retain complete content, evidence, sources, and readable long titles. Do not use captured missing-data notices when real content is available; do not erase missing-data handling when it is not.
- Dates must be unambiguous across locales; the reference uses a written month. Parse real API timestamps using the target’s date/time-zone rules. The prototype formatter covers Signals pages and Home; global-search signal metadata still uses raw captured dates. Do not assume date formatting is already centralized.

## Prototype hazards to remove deliberately

1. **Hardcoded account/seller assumptions.** `/accounts/3m`, `3M Company`, LANXESS labels, fixed signal slices, and import company validation are demonstration choices. Derive context from authenticated production data.
2. **Fixture relationships.** The prototype joins some contacts by name. Production must use stable IDs and actual relationship records. Matching a name or keyword is not ownership evidence.
3. **Fixture-only AI.** `conversations.js` echoes prompts into a timed assistant entry; `AIResponse` branches on keywords. Neither belongs in the live AI path. Production messages need actual content, role, context, citations, and server identifiers from the existing service.
4. **Temporary opportunity state.** Primary records/imports, decisions, and bookmarks share App memory during same-tab navigation. Reload restores fixtures and three seeded bookmarks; tabs are independent. Inner Explore/search/import state and history reset on workspace unmount. Imported opportunities only have a local preview/account-level AI link; they are excluded from captured detail/global-search/Home paths. Production decisions should use existing server state, not a React-only success toast.
5. **Unscoped local storage.** Contacts and conversations are stored under browser-wide keys. Only theme state has an explicit cross-tab listener; other tabs can hold stale snapshots and overwrite newer local records. This matters now that AI response links open new tabs. Use the existing authorized persistence model; do not carry contact/message storage into production without account/user scoping, retention, and logout behavior.
6. **Incomplete source data and mixed counts.** Seven opportunities and one full battle card are not account totals. New Ulm has three named fixture relationships but reports 22 contacts; other opportunity counts and the Signals footer retain historical source totals. Bind real totals and relationships independently. Do not hardcode these counts or hide real sections to match a fixture.
7. **Global CSS layering.** Multiple late overrides and broad selectors reflect iteration. Consolidate into the target’s components/tokens incrementally while preserving computed appearance. Test unaffected screens.
8. **Dense monolithic JSX.** `main.jsx` owns many concerns; shared exports in `WorkspacePages.jsx` create circular module relationships with people pages. Extract shell, presentation, and shared primitives according to the target architecture rather than copying the monolith or introducing those cycles there.
9. **Client-only routing/runtime.** `window`, `location`, `document`, and localStorage assumptions are appropriate to this Vite prototype. Adapt them for SSR or other target rendering/lifecycle constraints if applicable.
10. **Import policy.** The People-directory flow allows 500 rows / 2 MB and demonstrates name/email deduplication. The Opportunities flow separately allows 500 rows / 1 MB: contact lists match existing captured relationships without directory creation; opportunity uploads add unverified records after review. Confirm actual backend limits and identity policy; never silently drop legitimate same-name contacts in production.

## Acceptance matrix

Use the target’s normal test tools. Add focused tests for real behavior and integration risk, not snapshots of implementation details.

| Area | Required checks |
| --- | --- |
| Routes/context | Existing production links still work or redirect deliberately; direct refresh; Back/Forward; account/seller context survives; invalid/unauthorized entity has a useful state |
| New-tab AI links | Response detail/source links create a new tab; original transcript, draft, scope and scroll remain; destination resolves independently; history/app links remain same-tab; keyboard/modified clicks work |
| Reviews | Accept/Reject use existing API; pending state prevents duplicate mutation; errors do not appear successful; reload/second tab reflect server state; undo only when supported |
| Opportunities | Recommended/Explore/My destination URLs and history; preview defaults; keyword/guided flow; facet lookup and retained multi-selection; Saved/Uploaded distinction; import validation; honest empty/error states; no seeded production saves |
| People | Upload origin visible; genuine relationships distinct from results; full profile and opportunity detail work; missing fields and duplicate names handled |
| Import | Real file picker and paste; quoted/multiline CSV; BOM; headers/mapping; limits; duplicate and company resolution; partial failures; retry; persistence; no unintended server transmission before the intended step |
| AI/history | Existing live assistant and stored messages; correct account/entity scope; source links; new/resumed conversations; loading/stream/error/cancel behavior supported by target service; no simulated replies |
| Home/directory | Correct authorized totals; empty, partial, and error states; favourites/recent ordering; search/filter/pagination across large datasets; no sample data leaks |
| Research | Complete available sources/financials/competitors; readable long text; correct date parsing/time zones; accessible external sources |
| Visual/accessibility | All themes; desktop, narrow tablet, 390px mobile; long titles and names; keyboard focus/order; labels; contrast; zoom; no horizontal page overflow; usable collapsed rail and mobile overlay |
| Regression/security | Existing auth/session/tenant checks preserved; safe URL schemes and rendered AI content; target tests/lint/typecheck/build pass; unaffected routes verified |

The prototype's browser checks are evidence of design intent only. Production API integration and this matrix still require verification. File-picker automation in the reference was blocked by extension permissions; it must be tested during integration.

## Claude Code handoff prompt

Replace the two paths, then paste this into Claude Code **with the main SalesPlay repository as the working directory**. Keep its current instructions; do not overwrite its root `CLAUDE.md` with this reference file.

```text
Integrate the approved SalesPlay frontend redesign into this main repository.

Main repository: <absolute path to main SalesPlay repo>
Design reference: <absolute path to this salesplay3 repo>

First read this repo's CLAUDE.md/AGENTS.md and inspect its architecture,
router, design system, API clients, auth/permissions, AI integration, tests,
and deployment conventions. Then read the reference README.md,
INTEGRATION.md, CLAUDE.md, DESIGN.md and relevant source files. Run the
reference locally if needed to inspect its current UI and interactions.

Treat the reference as design and interaction intent, not a replacement
application. Preserve existing backend API contracts, authentication,
authorization, tenant/seller context, business rules and production data.
Do not copy fixture accounts, captured research, scripted AI, unscoped
localStorage persistence, or the reference package/router configuration
into production paths.

Create a concise route/component/service mapping and identify genuine
backend capability gaps. Implement the supported UI using this repo's
patterns, starting with account → approved Option 10 opportunities → battle card → AI.
Then add people/import, research, directory, and opportunity-led Home.
Use the approved Option 10 workspace, not the old opportunity list or other
gallery alternatives. Recommended, Explore, and My Opportunities are left-nav
destinations. Reference URLs are /accounts/3m/opportunities, ?view=explore,
and ?view=my; adapt them to this repo’s router. Do not port the three seeded
bookmarks or illustrative persona/trigger matching as real user data or logic.
Keep people first-class and Ask SalesPlay prominent. Response detail/source
links open new tabs with accessible indicators; app/history navigation
stays in the same tab. Preserve all real content and unique deep links.

No new backend endpoints or contract changes are authorized. If a feature
cannot be implemented with current APIs, explain the specific gap and
propose an honest UI fallback while completing independent supported work.
Do not represent temporary local state as server-saved data.

Adapt the reference's computed visual design into existing tokens and
components; do not blanket-import its global CSS. Refactor only as needed
for integration. Follow the acceptance matrix in INTEGRATION.md and the
main repo's required tests. Finish with changed files, API mappings,
validation results, unresolved gaps, and rollout considerations. Do not
merge, deploy, or publish unless separately requested.
```

## What to transfer

Provide this source repo including README, INTEGRATION, CLAUDE, PRODUCT, DESIGN, DIRECTION, `src/`, `public/` (font licenses included), and the lockfile. Do not send `node_modules/` or `dist/`; rebuild locally. Optional screenshot evidence is gitignored and must be shared separately. No dependency on the original local giq2 folder or an Impeccable installation is required to run or port the app.
