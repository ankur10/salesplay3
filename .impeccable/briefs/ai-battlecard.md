# AI history and opportunity reading
Mode: Operate / Read within the existing SalesPlay visual system.

User request: Clicking the top-bar Ask SalesPlay field should open its page; add recent interactions; significantly improve opportunity detail spacing, especially the header, using the actual SalesPlay battle card as a reference. Preserve captured content and backend APIs.

The original New Ulm battle card was inspected in Chrome on 2026-10-04. It contains business-unit/region context, goal, evidence, product fit, people, conversation guidance, qualification, and next action. Existing prototype contains that captured content.

## Direction contract
THESIS: Move directly from an opportunity to focused conversation, and resume past research without losing its context.
OWN-WORLD: Existing three palette choices, Source Serif headings, Source Sans body, navy command bar and flat bordered reading surfaces.
FIRST VIEWPORT: Full-width readable opportunity title with separate status row; labelled business-unit, region and offering metadata; detail tabs and prominent Ask SalesPlay action. Main goal and first evidence beside named people. AI workspace uses a conversation column plus recent interactions, with compact expandable working context.
FORM: Code-led refinement and extension. Desktop recent interactions are visible; narrower screens expose them via a header toggle that replaces the conversation area while browsing history. Question, original scope, time and question count identify each conversation.
STATES: Automatic history save, reload/resume, continuing a conversation, context changes, searching history, empty and missing saved chat, storage failure; mobile history and composer. Latest 50 chats persist only in the same browser. Responses remain scripted.
FINISH: Desktop/mobile browser checks, one detector run, production build, fresh finish review and scoped documentation.


## Implemented extension
The Ask SalesPlay command area now opens the workspace directly, carrying the current opportunity, person, or document; invoking it from the workspace focuses the existing composer without clearing its draft. New conversation keeps the selected scope. Recent interactions automatically retain the latest 50 conversations under `salesplay-conversations-v1`, with the first question, original scope, last-updated time, question count, text search, and Today/Yesterday/Earlier groups. Saved links include `chat=:uuid` and the scope query. Invalid local data is ignored; missing saved chats and unavailable storage are disclosed. Unsaved drafts remain session state. AI responses are still scripted and no backend contracts changed.

The battle-card header spans the reading layout, separates title from status, and labels business units, country/region, and mapped offerings. URL-backed Overview, Evidence, and Conversation kit tabs sit beside the assistant action. Goal/evidence use a clear reading hierarchy with named people, next move, and qualification beside them. The established local fonts, three themes, and base tokens remain intact. At 760px and below the detail columns stack; at 900px and below the AI history toggle replaces the conversation area. Transcript scrolling is contained so the composer remains available.

## Verification and provenance
Browser checks passed for launcher navigation, preserved workspace draft, opportunity/contact/document scope, automatic save, reload, history search, resume/continue, and detail-tab URLs. Pure checks passed malformed/denied storage, newest-first ordering, retention of 50, and scope URL generation. At 390 × 844 the composer bottom was 778px; the checked mobile view had no horizontal overflow. Browser console errors were empty. The detector returned 38 advisory findings concerning inherited type-ramp metadata versus existing refinements. Final finish review returned **SHIP** after the launcher-hover token and conversation-kit navigation fixes were verified. A browser check confirmed the assistant’s kit action opens `/conversation-kit` with the expected conversation guidance and qualification content. The final production build passed (Vite, 1,638 modules, exit 0); git diff whitespace checks passed.

Review captures are `.impeccable/review/battlecard-desktop.png`, `battlecard-mobile.png`, `ai-history-desktop.png`, `ai-history-mobile.png`, and `ai-conversation-mobile.png`. They are browser evidence of the implemented prototype, not generated or shipping assets.
