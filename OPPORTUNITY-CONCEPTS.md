# Opportunity discovery — approved experience and exploration archive

**Option 10 is approved and now powers the primary Opportunities experience.** Open `/accounts/3m/opportunities` for Recommended, append `?view=explore` for Explore or `?view=my` for My Opportunities. These appear under Opportunities in the app left navigation. The old list UI is no longer rendered.

`/design-options` remains a separate archive of the ten alternatives. Its standalone Option 10 shares the implementation, but uses isolated gallery state and its own demonstration shell.

The entry point matches `/design-options` exactly; `/design-options/` is not a gallery alias. Append `#1` through `#10` to open a direction directly; `#overview` opens the comparison gallery.

## Design approach

Separate **intent** (Recommended, Explore, My opportunities) from **search dimensions** (contact, persona, product, business unit, signal, trigger). Filters refine results; advanced search combines conditions. These should not all become competing navigation destinations.

Ten interactive options compare distinct workflows within a consistent visual language:

| URL fragment | Direction | Best use | Trade-off |
| --- | --- | --- | --- |
| `#1` | Tabbed workspace | Everyday discovery, search, personal decisions | Complex queries need an extra step |
| `#2` | Filter-first workspace | Frequent dimension filtering | Persistent facets consume reading space |
| `#3` | Guided discovery | Starting from a person or other known context | More steps for experienced users |
| `#4` | Search and inspect | Comparing opportunities with contextual people and evidence | Split layout needs desktop width |
| `#5` | Advanced query builder | Explicit ALL / ANY combinations | More controls and a learning curve |
| `#6` | Signals-led discovery | Starting with a business change and its evidence | Requires reliable signal-to-opportunity relationships |
| `#7` | Combined tabbed workspace | Search, facets, preview, advanced conditions, and imports in one workspace | Scope tabs share space with search controls |
| `#8` | Combined sidebar workspace | The same workflow with Recommended, Search opportunities, and My opportunities in left subnavigation | Persistent navigation uses more width |
| `#9` | Guided opportunity hub | Focused recommendations, guided exploration with session history, and Saved/Uploaded collections | Search and history live in Explore rather than every collection |
| `#10` | Guided discovery workspace | Separate guided and keyword entry paths, faceted results, and previews for recommendations and saved work | Guided exploration adds a context-selection step before results |

The proposed shortlist combines option 1's modes, option 4's optional result preview, and option 5's advanced search. Option 3 can provide an entry flow; option 6 can provide a contextual discovery route. Options 7 and 8 demonstrate that combination with tabbed versus left-side scope navigation. Option 9 tests distinct Recommended, Explore, and My opportunities destinations. Option 10 retains those destinations, combines a simple keyword field with the guided entry choices, and separates tabbed context selection from results. The user selected Option 10 as the final direction; the other options remain historical alternatives.

## Prototype boundaries

- Starts with the same seven captured opportunities from `src/data.js`, within 3M. Options 7–10 can additionally hold user-imported opportunities in memory.
- Contact search only knows the named people in the captured battle card; missing relationships are not proof that no relationship exists.
- Product and business-unit filtering use captured fields. Persona and trigger matching are explicitly illustrative rules, not backend recommendations.
- Two signals use evidence from the captured New Ulm battle card and point to that opportunity. This is not a complete signal graph.
- Recommended uses a disclosed demo ordering: opportunities awaiting review, medium evidence before low evidence. It is not a production recommendation model.
- In the primary app, Option 10 receives records/bookmarks from App. Decisions, saves, and uploaded opportunities survive same-tab app navigation but reset on reload. The first three captured opportunities are seeded as saved demo records. Imported opportunities remain in the workspace preview/Uploaded collection and are excluded from captured detail, Home, global search, and entity-context paths; their AI action uses account scope.
- In the gallery, options 1–6 share in-memory accept/reject/save changes until reload. Options 7–10 each have independent local state that survives internal view changes and resets on leaving that gallery option or reloading. No gallery state changes production or the main prototype's decision store.
- Search finds existing sample opportunities. AI links open the existing Ask SalesPlay route; they do not generate new opportunities in the gallery.
- Options 1–6 have no import flow. Options 7–10 add local file/paste flows described below. No API changes, live AI, durable persistence, server pagination, or production-scale search were added.

## Original interaction scope — options 1–6

Text search is case-insensitive substring matching across title, goal, business unit, offerings, and captured relationship names. Ordinary filters select one dimension/value at a time, with an optional evidence filter. The facet layout is also single-select across dimensions; it does not demonstrate simultaneous multi-facet filtering. Guided discovery selects a dimension and value before showing results.

The advanced builder accepts one to six equality conditions. Editing controls changes the draft; **Run search** applies a snapshot using ALL or ANY. These rules operate on the same seven local records. My opportunities exposes Accepted, Saved, and Rejected views, not server-side ownership or assignment.

Opportunity and person detail links open the existing app in a new tab. Ask SalesPlay and account-navigation links leave the gallery in the same tab. Gallery decisions and saves do not transfer into those destinations. Choosing a direction through the gallery controls resets its search/filter view while retaining the shared in-memory decisions and saves for options 1–6.

## Combined interaction scope — options 7 and 8

Both variants provide All opportunities, Recommended, and My opportunities scopes. Option 7 uses tabs; option 8 uses left subnavigation (with a view selector on mobile). Query text and filters remain when changing scopes; personal decision/source filters reset. Only the option itself is addressable through `#7` or `#8`: scopes, import steps, search conditions, and preview selections have no separate URL yet.

Search suggestions expose typed entities that become removable facet chips. Submitted text queries are kept in a three-entry recent-search list in the current option's React state. Multi-select facets match **any value within a dimension, all selected dimensions together**. The advanced builder applies a snapshot of one to six conditions with explicit **ALL / ANY** logic; its result is further narrowed by text, facets, scope, and any contact batch. Persona and trigger matching remains illustrative. Preview and facet panels alternate to preserve result width. On narrow layouts, selecting a result moves focus and scroll to the stacked preview.

The following import flows are also reused by options 9 and 10.

### Contact-list matching

“Find by contact list” accepts pasted CSV/spreadsheet cells or `.csv`, `.tsv`, and `.txt` files. Imports permit up to 500 data rows; uploaded files must be at most 1,000,000 bytes (displayed as 1 MB). That byte cap applies to files, not pasted text. Recognized Name/Contact/Full name and Company/Account headers may be reordered; headerless rows use name, then optional company. A missing company uses the current 3M scope.

This flow matches against only the three named people in the captured opportunity relationships, using names with surrounding whitespace removed and case ignored. It does not search the full captured people directory or add contacts to it. The review table excludes missing names, duplicate names within the batch, other-account rows, and unknown contacts with visible reasons. Only valid matches are selectable; a missing match is not evidence that no opportunity exists.

Confirmed lists match **any selected contact** and show the resulting opportunities either by opportunity or by contact. Other search conditions still narrow these results. This is account-scoped lookup of existing relationships, with no enrichment, relationship creation, or cross-account matching.

### Opportunity imports and personal collection

“Add opportunities” uses the same file/paste limits and a separate review flow, accepting Title/Opportunity/Opportunity title and optional Description/Details headers (or title then description without headers). Missing titles and duplicate titles in the batch or current option are excluded. Selected rows enter My opportunities as **To review**, with **Unverified** evidence and an **Imported** source label. They retain their supplied description and receive no invented products, named relationships, or main-app detail URL.

My opportunities includes locally owned or saved items and exposes decision and source filters, including Imported versus SalesPlay. Accept/reject makes a captured item part of that local personal collection. Imported items can be reviewed and saved; their AI link opens account-level Ask SalesPlay without carrying an invented opportunity ID. Imported records, decisions, saves, recent searches, and query state are isolated per combined option and disappear when leaving it or reloading. These flows do not use the main app's persisted contact-import store.

## Guided opportunity hub — option 9

`/design-options#9` opens a separate combined variant with three left-navigation destinations and a mobile view selector. It starts in **Recommended**, with a list, an optional preview toggle, and Explore / Upload opportunities actions on the right of the heading. Recommended has no search box or collection subtabs; it uses the same disclosed demo ordering of captured opportunities awaiting review.

**Explore** brings together text search, entity suggestions, guided starting points, multi-select facets, advanced conditions, and contact-list matching. Guided discovery offers Contact, Persona, Product, Business unit, Signal, and Trigger; choosing a value adds a facet using the same matching rules as the combined workspaces. Facets appear beside results by default. Preview and facets alternate, and the preview stacks below results on narrower screens.

Search history holds up to five entries in this option's React state. Submitting search text, selecting an entity/guided starting point, or applying advanced conditions records the current text, facets, and applied advanced conditions. Restoring an entry reapplies that snapshot and clears any contact batch; it does not restore an uploaded contact list. History can be cleared. It is retained across this option's internal destinations, not across reloads or visits to other gallery options.

Changing destinations closes the advanced builder and clears the active text query, facets, applied conditions, and contact batch. This differs from options 7/8, which retain queries across scopes. Saves, imported opportunities, decisions, and search history remain available while navigating within option 9. Only `#9` is addressable: Recommended, Explore, My opportunities, history entries, preview selections, and import steps have no separate URLs.

**My opportunities** has Saved and Uploaded tabs. Saved contains explicitly bookmarked records; accepting or rejecting a record does not bookmark it. Uploaded contains imported records regardless of their review decision. An uploaded record can also be bookmarked and appear in Saved. The Upload opportunities action reuses the file/paste → review → confirm flow above and opens Uploaded after confirmation. Imported records begin as **To review**, with **Unverified** evidence, their supplied descriptions, and no fabricated relationships or main-app detail URLs. Contact-list imports reuse the captured-name matching flow and open their results in Explore.

Option 9 adds no backend calls, production recommendation model, or durable storage. Its imports remain separate from the main app's persisted contact-import store.

## Guided discovery workspace — option 10

`/design-options#10` opens **Recommended**, with its opportunity preview visible by default. Recommended, Explore, and My opportunities remain in the left navigation, replaced by a view selector on mobile. Recommended retains the evidence-first demo ordering and provides Explore and Upload opportunities actions. In Recommended and My opportunities, the preview toggle sits beside the result count rather than in a dedicated toolbar row.

**Explore** starts with a simple keyword field above a left-aligned choice of six starting points: Contact, Persona, Product, Business unit, Signal, and Trigger. Choosing one opens a separate context-selection view with all six dimensions available as tabs. Each dimension has Select from account and Paste a list modes. The account selector searches values (and captured contact roles), renders up to 12 matches initially in a bounded list, and supports Load more. A separate selected area retains choices across searches and allows removal or Clear all. Paste mode reviews exact matches, already-selected entries, duplicates, ambiguous matches, and unmatched entries before adding selected matches; unresolved entries are excluded. Delimiters are newlines, commas, semicolons, or tabs. **Find opportunities** applies any selected value within that dimension. The resulting page is titled **Search** and shows a prominent facet panel with an embedded keyword field, a result list, and an open preview. Facets remain present when inspecting a result. The former top search/toolbar, options block, guided-back link, and explanatory paragraph are absent.

**Keyword search** is submitted directly from the field above the starting choices and opens the existing faceted results view. Entity suggestions remain available on the results screen; the results experience was not redesigned in this refinement. Use Explore in the left navigation (or the mobile View selector) to return to the starting choices and clear the active search.

Recent searches appear on the Explore starting page once a search has been recorded. Up to five text/facet/applied-condition snapshots are held in memory, using the shared history logic; selecting one opens the results view. Contact batches are not part of these snapshots. Changing destinations clears the active query, facets, applied conditions, and contact batch while retaining history, decisions, saves, and imports within this option.

**My opportunities** opens with a preview visible and Saved/Uploaded tabs. Saved starts with three existing captured opportunities bookmarked for testing; the explanatory test-view sentence was removed from the UI at the user’s request. These are not new opportunity records or real user saves. Uploaded starts empty. Saving, accepting, and rejecting use the same local behaviors as option 9; accepting or rejecting does not itself add a bookmark.

Upload opportunities reuses the file/paste → review → confirm flow and opens Uploaded after confirmation, with preview enabled. The contact-selection step also offers the existing contact-list import flow. Imported records remain unverified and receive no fabricated relationships or main-app detail URL.

In the primary app, Recommended, Explore, and My Opportunities use the three URLs listed above. Guided steps, search conditions, Saved/Uploaded tabs, preview selections, and import steps remain component state without separate URLs. Recent searches survive destination changes while this workspace stays mounted; leaving Opportunities clears them. App-owned records, imports, decisions, and saves survive that same-tab navigation and reset on reload. The gallery copy still only addresses `#10` and resets all state on leaving that option or reloading. Neither mode adds backend integration or durable opportunity storage.

## Visual scope and existing drift

The exploration retains the incumbent Source Serif 4 headings, Source Sans 3 interface text, navy header, ruled results, and written evidence labels. It adds a comparison gallery and ten alternative compositions through `.cx-*` and combined-workspace `.hy-*` classes. The archive retains its local `--cx-*` palette and literal colors. In primary mode, `primary-opportunities.css` maps the workspace palette to the main app’s semantic theme tokens and embeds it within the existing shell, without the duplicate gallery header/sidebar/breadcrumbs.

The gallery header is 70px high, its expanded account rail is 196px, and its controls generally use 4px corners. These are local exploration choices rather than updates to the main shell's 72px header, 216px rail, or documented base control tokens. At 1100px the gallery rail compacts; at 760px it hides and facets, split preview, and signals columns stack. The advanced results table retains internal horizontal scrolling on narrow screens. Comparison cards use three, two, then one column, with the last change at 480px.

The base combined layouts stack the preview below results at 1100px and facets at 760px; options 8–10 keep their scope rails until the mobile breakpoint. Option 9 stacks guided discovery and history at 1100px and hides its destination rail in favor of the mobile selector at 760px. Option 10 keeps discovery left-aligned, uses two columns for its six starting choices and one column at 760px, and stacks preview below results at 1100px. Its destination rail also yields to the mobile selector at 760px. Import review tables scroll horizontally as needed. These are prototype layout choices, not newly approved design-system tokens.

`DESIGN.md` and `.impeccable/design.json` remain the incumbent references and are not revised by this exploration. `DESIGN.md` already records historical base tokens alongside later theme and typography overrides; that existing documentation drift is not repaired here. The approved Option 10 integration uses the active app theme cascade; this does not rewrite the existing normative design-token documentation.

## Relevant files

- `src/OpportunityConcepts.jsx`: gallery, option layouts, illustrative filtering and local interaction state.
- `src/opportunity-concepts.css`: scoped `.cx-*` styles and responsive layouts.
- `src/CombinedConcepts.jsx`: options 7–10, guided discovery and session history, multi-facet and advanced matching, preview, local import/review flows; isolated gallery state or App-owned primary records/bookmarks.
- `src/combined-concepts.css`: scoped `.hy-*` styles, option-10 `.tn-*` discovery styles, and combined-workspace responsive refinements.
- `src/primary-opportunities.css`: primary-shell layout and semantic-theme mapping.
- `src/EntitySelector.jsx`, `src/entity-selector.css`: bounded search/selection and reviewed paste matching.
- `src/main.jsx`: primary Option 10 mount, left-nav/query destinations, shared records/bookmarks; separate `/design-options` archive mount.
- `src/data.js`: existing captured content, unchanged.

For production integration, use the approved Option 10 workflow, reuse the target app’s components and theme tokens, and map filters to verified existing API fields. Do not copy illustrative persona/trigger rules into production matching logic. Backend capabilities must be checked before promising combined search across unloaded or paginated data.

## Documentation evidence

The 7 October 2026 documentation check compared the six branches, matching and state logic in `src/OpportunityConcepts.jsx`, local tokens and breakpoints in `src/opportunity-concepts.css`, and the exact conditional mount in `src/main.jsx` against `PRODUCT.md` and `DESIGN.md`. This is a source inspection, not a new browser, accessibility, production-compatibility, or visual-regression certification.


The options 7/8 extension was source-checked against `src/CombinedConcepts.jsx` and `src/combined-concepts.css`. Development browser checks covered the contact sample (two valid, one unknown, one foreign-account, and one duplicate row producing one opportunity for two selected people), a reordered-header CSV upload (two valid and one foreign-account row), two opportunity imports, and combined facet/advanced filtering returning two results. The final extension build passed, with Vite’s advisory warning that the combined JavaScript chunk exceeds 500 kB. A targeted review scored both final fixes resolved: narrow-screen result selection focuses and reveals the preview, and import review uses a compact selection column. These are scoped development observations, not production certification or an automated regression suite.

The option 9 extension was source-checked against `src/OpportunityConcepts.jsx`, `src/CombinedConcepts.jsx`, and `src/combined-concepts.css`. Reported development browser checks covered guided selection of Ian Nicacio returning one opportunity, bookmarking it and seeing Saved (1), importing two opportunities and seeing Uploaded (2), restoring history to the one-result search, and mobile destination navigation with no horizontal overflow in the inspected flow. These checks cover the local prototype only; they do not establish production compatibility or comprehensive accessibility coverage.

The option 10 extension was source-checked against `src/OpportunityConcepts.jsx`, `src/CombinedConcepts.jsx`, and `src/combined-concepts.css`. Reported development browser checks covered guided selection of Ian Nicacio returning one opportunity, the separate keyword path with “electrical” returning four opportunities, My opportunities showing three saved sample records with one preview visible, and mobile navigation without horizontal overflow in the inspected flow. These are scoped prototype observations, not production compatibility or comprehensive accessibility certification.

The latest option-10 Search refinement uses three desktop columns for facets, results, and preview. At 1200px the preview moves below results while facets retain their column; at 760px all three stack. Checks covered mixed checkbox/pasted contacts, duplicate product values, the embedded keyword filter, unmatched persona values, and 390px overflow. This remains sample-only matching; pasted text is not interpreted by AI.

## Searchable value selectors

`src/EntitySelector.jsx` and `src/entity-selector.css` implement the shared selector for option 10. Search-page facet groups start collapsed with selected counts. Each expanded group has its own value lookup, a selected area, and a bounded list with eight initial matches and Load more; the panel-level opportunity search remains separate. More than eight selected values exposes a lookup within selections. The prototype searches the complete locally loaded value arrays, not a backend index. Production integration must map remote lookup/pagination to existing APIs and retain selections by stable IDs. Hundreds-record behavior is represented structurally; the live gallery still contains only captured values and does not claim a production-scale validation.

Verification covered successive contact searches retaining selections, pasted matched/already-selected/duplicate/unmatched entries, adding reviewed matches, independent facet lookup, and mobile overflow.

The primary promotion was source-checked against `main.jsx`, `CombinedConcepts.jsx`, and `primary-opportunities.css`: shared app shell, three query-addressed destinations, App-owned records/bookmarks, and isolated gallery state. This documentation update does not itself certify browser behavior or production integration.
