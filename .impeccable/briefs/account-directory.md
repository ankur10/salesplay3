# Account directory and navigation
Mode: Operate. Extension of the existing account directory, in the established SalesPlay world. User specifies Home, Recently Used, Favourite, All Accounts and scale in the hundreds. Existing source scope remains 3M only; generated demonstration accounts are labelled and do not inherit 3M research.

## Direction contract
THESIS: Find an account quickly or resume work; a searchable directory and remembered account shortcuts instead of hundreds of large tiles.
OWN-WORLD: Existing Source fonts, selected Precision/Advisory/Mineral palette, navy header, flat white rows, readable 16px text. Remove the experimental logo; retain text SalesPlay.
STORY: Login lands on Home; recent and favourite accounts lead directly to work. All accounts supports searching, filtering, sorting, and pagination. Opening 3M leads to opportunities. Sample accounts open an honest preview explaining unavailable research.
FIRST VIEWPORT: Existing header with bounded search, a small workspace rail, Home heading, recent account rows and favourite shortcuts. Directory uses a compact toolbar over a tabular list with company identity, industry, region, and favourite action. Count and pagination scope the visible results.
FORM: User-pinned directory extension; no new identity or open concept choice. Code-led extension of existing routes/components. Signature interaction: favouriting from any list updates the personal shortcuts and persists locally.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Implemented and reviewed
The ordinary extension retains the established fonts and theme tokens. `/` resolves to `/home`; `/accounts`, `/accounts/recent`, `/accounts/favourites`, and `/accounts/sample-<group>-<sector>` provide portfolio navigation. The directory contains 121 unique accounts (captured 3M plus 120 fictional examples explicitly approved by the user). Account favourites and up to 30 recent account visits persist locally; there is no backend integration.

The text SalesPlay signature replaces the removed experimental logo/favicon. Signals replaces Account activity. Account research starts expanded, Research library collapsed; collapse is in the footer and reopening is in the breadcrumb row. Breadcrumbs use Home > section for portfolio views and All Accounts > 3M Company > section for account views. The default desktop rail measured no overflow; its scrollbar chrome is hidden without disabling overflow scrolling.

Finish review: SHIP, no material findings across desktop/mobile Home, directory, and account navigation. Source assertions covered 121 unique IDs and seven route cases. Browser verification covered pagination, filters, empty states, favourites after reload, recents, navigation, and mobile. Detector output contained 15 advisories for intentional choices or pre-existing metadata. The final extension production build passed (Vite, 1,635 modules), as did source assertions and git diff whitespace checks.

Raster provenance: all six `.impeccable/review/accounts-{home,directory,navigation}{,-mobile}.jpg` files are browser captures of the implemented local prototype. These are review evidence, not shipping UI assets or generated imagery.
