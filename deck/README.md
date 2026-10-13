# SalesPlay deck

Seventeen slides and a two-minute film. Everything it needs is in this folder: no network, no build, no install.

## Present from any machine

Copy this folder across (or clone the repository) and open `index.html` in Chrome, Edge or Safari. That is all the slides and the film on slide 8 need.

- Next: right arrow, space or Enter. Back: left arrow.
- `F`: fullscreen. `1`–`9`, Home, End: jump to a slide.
- The address keeps the place: `index.html#7.2` is slide 7, step 2.

The stage is 1920×1080 and scales to fit any window. `out/` (full-quality exports) is not needed to present and can be left behind.

## Host it

The folder is a plain static site. Either:

- deploy the repository as it is: `npm run build` copies the deck to `dist/deck/`, so it is served at `/deck/` beside the prototype; or
- deploy this folder alone as its own Vercel project (root directory `deck`, no framework, no build command).

The screens show real account data and named contacts. Anyone with the link can see them.

## The film's source

`video/` draws the film live at `video/index.html` (press space). That page loads JavaScript modules, so it needs a web server rather than a double-click; the exported `assets/demo.mp4` on slide 8 does not. Regenerating the voice-over or re-exporting is described in the repository's main README.
