---
name: "SalesPlay"
description: "An editorial account workspace for evidence, relationships, and contextual AI."
colors:
  accent: "#1859b9"
  button-primary: "#145cb4"
  button-hover: "#0b4690"
  navy: "#092b3d"
  teal: "#086c70"
  mint: "#b9f2df"
  ink: "#092332"
  muted: "#536875"
  canvas: "#f5f8f9"
  surface: "#ffffff"
  line: "#d8e2e6"
  tint: "#eaf1fb"
  navigation-active: "#e4eef8"
  navigation-text: "#154e94"
  focus: "#2476cc"
  evidence-medium: "#176351"
  evidence-medium-surface: "#e8f4ed"
  evidence-low: "#7b5915"
  evidence-low-surface: "#fbf2dd"
typography:
  headline:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "clamp(31px, 2.7vw, 42px)"
    fontWeight: 450
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "25px"
    fontWeight: 450
    letterSpacing: "-0.025em"
  opportunity-title:
    fontFamily: "'Source Sans 3', sans-serif"
    fontSize: "17px"
    fontWeight: 620
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Source Sans 3', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "'Source Sans 3', sans-serif"
    fontSize: "13px"
    fontWeight: 600
  table-number:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "12px"
rounded:
  square: "0"
  tag: "2px"
  control: "3px"
  popover: "4px"
  command: "5px"
spacing:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  section: "28px"
  reading: "36px"
components:
  button-primary:
    backgroundColor: "{colors.button-primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    typography: "{typography.control}"
    padding: "9px 13px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    typography: "{typography.control}"
    padding: "9px 13px"
  search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "39px"
    padding: "0 11px"
  navigation-active:
    backgroundColor: "{colors.navigation-active}"
    textColor: "{colors.navigation-text}"
    rounded: "{rounded.control}"
    padding: "10px 11px"
  evidence-medium:
    backgroundColor: "{colors.evidence-medium-surface}"
    textColor: "{colors.evidence-medium}"
    rounded: "{rounded.tag}"
    padding: "5px 6px"
  opportunity-list:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.control}"
  people-desk:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.square}"
    padding: "22px 20px 18px"
  composer:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.command}"
    padding: "14px 16px"
---

# Design System: SalesPlay

## Overview

**Creative North Star: "The editorial account workspace"**

SalesPlay uses an editorial research workspace: a deep navy command bar, white account rail, cool reading surfaces, cobalt actions, and teal relationship cues. Source Serif 4 gives research and page headings a measured reading hierarchy; Source Sans 3 keeps dense controls and named people clear. This replacement direction draws on the giq2 Advisory reference without claiming an exact reproduction.

This records the implemented prototype and its established visual world. The inherited base is layered through src/styles.css, src/premium.css, src/themes.css, src/workspace.css, src/accounts.css, and finally src/refinements.css. Theme roles govern colour; workspace refinements govern shared readability; account styles extend portfolio layout and navigation; the final scoped layer refines opportunity reading and AI history. The frontmatter and original component samples retain the established base tokens; later refinements below describe the active overrides.

**Key Characteristics:**

- Serif reading hierarchy with compact sans-serif controls.
- A global command bar for account search and Ask SalesPlay.
- First-class named contacts beside the opportunity queue.
- Fine rules, precise corners, and mostly flat surfaces.

## Colors

### Primary

Cobalt (`accent`, `button-primary`, `button-hover`) identifies navigation and actions. The action button has its own observed cobalt value; do not collapse it into the accent token. Navy anchors the command bar; teal and mint mark relationship and AI controls.

### Neutral

Ink, muted slate, cool canvas, white surface, and fine blue-gray rules separate text, reading planes, and navigation. Evidence green and amber are semantic pairs, always accompanied by written labels. `focus` is the standard keyboard outline; command-bar focus uses mint against navy.

**The Evidence Label Rule.** Pair evidence color with its written strength; color does not establish product fit or a qualified outcome.

## Typography

The three variable font files are served locally from public/fonts with font-display: swap; attribution and OFL text are retained in FONT-LICENSES.txt. Serif headings and document paragraphs establish reading rhythm, sans-serif handles controls and opportunity titles, and JetBrains Mono handles table numbers and small counts. Typography tokens describe recurring desktop roles, not every local override. Body copy uses 15px, queue previews 13px, document paragraphs 17px at 1.75 line height, and detail headings 35px. Mobile page headings use 33px and detail headings 28px. Complete opportunity titles wrap; previews may clamp to two lines. The opportunity reading extension uses a full-width serif title (28–36px desktop, 27px mobile), separate status row, labelled metadata, 17px goal text, and 16px reading copy with generous line height. These are scoped overrides in src/refinements.css, not changes to the base type tokens.

## Layout

The desktop shell has a 72px full-width command bar, 216px account rail, and content capped at 1760px with 26px 34px 42px padding. The opportunity queue pairs a flexible column with a 292px people desk and 28px gap. The people desk becomes 260px below 1350px and 320px from 1700px. Detail and profile views use separate reading and context columns.

At 1050px and below the rail becomes a 235px overlay. At 760px and below, the command bar occupies two rows totaling 112px, main padding is 23px 19px 35px, and content columns stack. A people shortcut appears before the queue; the full people desk follows it. Contact rows reflow into stacked identities and actions. Research tables scroll inside their own enclosure. The AI history panel is visible beside the conversation above 900px. At 900px and below, Recent interactions toggles a full-width history view in place of the conversation; selecting a saved chat returns to its conversation. Selected entity context stays in the composer.

Portfolio Home uses recent-account rows beside favourite shortcuts; the directory uses flat table rows with identity, industry, region, last-opened time, and a star action. At 760px and below Home stacks and directory rows reflow into account blocks; last-opened time is hidden at 1050px and below. The global command field is bounded at 560px on desktop; local search fields stay compact (360px opportunity basis, 440px maximum, 390px directory maximum) and fill the available mobile width.

Opportunity detail has a 1440px maximum width, a flexible reading column beside a 310px people/next-action aside, and a 40px gap. At 1200px and below the aside narrows to 280px; at 760px and below the columns stack and labelled metadata uses two columns. The title and metadata span both reading columns, while the Ask SalesPlay action sits beside URL-backed detail tabs on desktop and above them on mobile. AI uses a 310px history column (280px at 1200px and below), a compact expandable working-context summary, and a contained transcript scroll area that leaves the composer available.

## Elevation & Depth

Reading surfaces rely on fine borders and tonal contrast. Buttons have no shadow; the people desk and composer have faint depth. Search results, filters, and context pickers use stronger foreground shadows. Keep reduced-motion CSS, which disables animation, transitions, and smooth scrolling. Existing control transitions use 150ms; the legacy contact drawer uses a 200ms entrance when invoked.

**The Quiet Surface Rule.** Keep reading surfaces visually flat; stronger elevation identifies temporary foreground controls.

## Shapes

Square research papers and people panels anchor the page. Controls use precise 3px corners, evidence labels 2px, popovers 4px, and command/composer enclosures 5px. Circular initials identify people; do not replace them with invented portraits. Compact spacing serves clear grouping without turning each row into a floating card.

## Components

- **Buttons:** 39px minimum height, compact 13px labels, cobalt primary and bordered white secondary variants; hover darkens primary or tints secondary. Standard keyboard focus is a 2px outline with 3px offset.
- **Search and command bar:** local opportunity search uses a bordered white field. The global navy enclosure switches between Search account and Ask SalesPlay, showing entity results that lead to local URLs.
- **Navigation:** white workspace/account rail, pale blue active row, teal AI destination, and underlined active detail tabs. Portfolio navigation has Home, Recently used, Favourites, and All accounts. Account research starts expanded; its nested Research library starts collapsed. Collapse navigation sits in the rail footer; the breadcrumb row provides the reopen control. Scrollbar chrome is hidden while vertical scrolling remains available when content exceeds the viewport. The measured default desktop rail fits without overflow. Portfolio breadcrumbs read Home > section; account breadcrumbs read All Accounts > 3M Company > section.
- **Evidence chips:** written strength plus three small bars; green and amber are informational, not qualification outcomes.
- **Opportunity reading group:** flat white enclosure with hairline row separators; complete titles, clipped previews, review actions, and contact counts.
- **People desk and directory:** named people, role text, initials, profile navigation, and contextual AI actions. The directory and profiles are full local pages.
- **AI launcher and history:** the top-bar Ask SalesPlay area is a button that opens the dedicated workspace with the current opportunity, person, or document. On the workspace it focuses the composer and preserves the draft. Recent interactions show the first question, original scope, last-updated time, and question count; Today, Yesterday, and Earlier groups follow recency. Search covers questions, message text, and scope. Current history rows use a tinted surface and subtle inset rule. New conversation retains the selected scope; reopening history restores its saved scope. Empty, no-match, missing-chat, and unavailable-storage states are explicit.
- **Composer:** visible account and removable entity context above multiline input. Enter submits and Shift+Enter inserts a line break. Scripted-response disclosure stays visible.
- **Research readers:** white reading paper with serif text, local document index, source context, and AI handoff; financial and competitor data use aligned tabular values.
- **Account directory:** compact search, industry/region filters, name/last-opened sorting, 20/50/100-row pagination, and explicit empty states. Account names link to workspaces; the star is a separately labelled pressed-state button. Captured and sample labels remain visible. Home shows up to five recent and five favourite shortcuts; the first visit offers 3M.

## Do's and Don'ts

### Do:

- Do preserve complete opportunity titles, evidence labels, and source references.
- Do keep search, Ask SalesPlay, and entity context visible in their established locations.
- Do use local font assets, clear focus treatments, and reduced-motion behavior.
- Do disclose captured scope and scripted AI.

### Don't:

- Don't restore the superseded lavender visual direction.
- Don't substitute anonymous metrics for named contacts.
- Don't imply captured records or scripted responses are live integrations.
- Don't apply heavy shadows or large rounding to reading surfaces.

## Colour themes

The top-bar picker provides Precision, Advisory (default), and Mineral, using the named giq2 palettes. `src/themes.css` follows the base visual layer and is the colour authority, overriding the original base palette recorded above. Typography, layout, and content remain shared. Palette roles cover the canvas, navigation, controls, selection, reading surfaces, and AI/people accents. Evidence colours retain their written semantic labels.

| Theme | Canvas | Header | Primary action | Accent |
| --- | --- | --- | --- | --- |
| Precision | #f7f8fa | #122b49 | #204eae | #204eae |
| Advisory | #f7f8f9 | #051c2c | #051c2c | #164caa |
| Mineral | #f5f7f9 | #172b3a | #17212b | #234dc0 |

The native select is keyboard accessible, announces changes, and fits the 320px header. Preferences use `salesplay-colour-theme` in local storage; blocked storage falls back to in-session selection. `public/theme.js` restores a valid saved theme before React mounts and updates the browser theme colour. Invalid saved values fall back to Advisory.

## Readability and simplification refinement

`src/workspace.css` loads after the palette layer and establishes shared type and composition; `src/accounts.css` follows it with portfolio and navigation refinements. Source Sans 3 remains the interface face; Source Serif 4 remains the page/research heading face. Body and summaries use 16px with 1.6–1.65 line height, controls and supporting roles 14px, metadata 13px, item titles 18px, section headings 24px, and page headings 32px (28px on mobile). Reading copy is capped at 72ch. Compact navigation group labels and utility counts are deliberate smaller exceptions.

The queue removes the repeated AI invitation and duplicate view action. Full titles link to the existing detail URLs; evidence, linked people, and Evaluate opportunity form one footer. The assistant action opens with the selected opportunity and a draft validation question. People stay in a quiet side panel with complete names and roles; preparation remains in the full directory and person profile. Account research starts expanded and expands when a research page is opened; its nested Research library starts collapsed. No source records or backend contracts change.

The experimental folded-S logo and its favicon were removed at the user’s request. The header uses the SalesPlay text signature with its trailing dot and links to Home; there is no custom favicon asset in the current implementation.

### Interface terminology

| Previous | Current | Reason |
| --- | --- | --- |
| Contacts | People; People at 3M | Human and direct without assuming a relationship or buying authority. |
| Account activity | Signals | Restores the user-requested short navigation label; the captured feed does not establish purchase intent. |
| Account overview | Company brief | Names the reading task. |
| Documents | Research library | Makes the source collection easier to recognize. |
| Key competitors | Competition | Short navigation label; comparison content is unchanged. |
| Discuss with AI | Evaluate opportunity / Ask about this opportunity | Names the intended task. |
| Prepare with AI | Prepare a conversation | Describes the useful outcome. |

The assistant remains Ask SalesPlay pending a naming decision. Alfred by SalesPlay is a possible personal-assistant direction; a standalone Alfred label would require extra explanation of its role. Existing URLs retain their stable resource names.


## People and research extension
`src/people-research.css` loads last and extends the existing visual system without replacing its base tokens or component samples. Above 760px, collapsed navigation occupies 64px with 44 × 43px destination targets, explicit accessible labels, hover/focus text, and an expand control. Mobile retains overlay navigation. The opportunity detail action row stays below the 72px command bar on desktop/tablet; at 760px and below it returns to normal flow and wraps Accept/Reject with the utility actions. Decisions remain in-memory.

People uses ruled directory rows with All people / Uploaded tabs, a primary Upload contacts action, and unique profiles. The CSV/paste flow separates source selection, column mapping, and review/import. Skipped-row reasons and storage fallback are visible. Profiles separate verified captured relationships from unverified keyword matches across seven captured opportunities. Desktop profile content sits beside a 290px details column, reducing to 260px at 1150px and stacking at 760px. Company brief uses a 280px aside and tighter reading spacing; Signals use consistent flat rows and unambiguous dates such as 23 Sept 2026.

Scoped typography is intentional: 17px directory names; 14px role/location/action text; 12px upload labels and compact field labels; 13px metadata; 15–16px supporting and reading copy; 20px opportunity titles (18px mobile); 26px section headings (24px mobile); and a 28px import heading. Signals use 18px titles, 16px summary text (15px mobile), and 13px dates/metadata. These Source Sans 3 interface roles and inherited Source Serif 4 headings refine density and hierarchy locally. Detector type-step advisories do not justify rewriting the inherited base ramp.

The production build and parser/routing checks passed. Browser paste import verified one accepted and three skipped rows, persistence, and reopening the imported profile. Desktop and 390px mobile review captures are in `.impeccable/review/` for contact import, contact opportunities, decisions, compact overview, and signals/icon navigation. Native file-picker automation is unverified because extension permission blocked the check. These images are browser review evidence, not generated or shipping assets.

Independent finish review inspected all ten extension captures and passed the scoped local preview with no material findings. Browser checks also verified Reject and Return to review.

## Opportunity outreach extension

Outreach uses one full-width editable document with Email, Talking points, Follow-up, and My Templates tabs. Default content is pre-filled; a compact recipient selector and Use template / Save as template actions precede the editor. There is no Objective dropdown or preferences side rail. My Templates opens a full-width library and editor, with explicit placeholder guidance and optional writing instructions. Template selection previews the substituted content before replacing the active draft. The compact opportunity title, decision controls, source disclosure, and local storage disclosures remain. Controls wrap on mobile; the format tabs remain one accessible, horizontally scrollable row. Copy/mailto delivery never implies that SalesPlay sent an email. Free-form instruction interpretation requires a future AI integration.
