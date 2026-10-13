// Copies the deck into the built site, so the deployment serves it at /deck/.
// Left out: exports in out/ and the film's tests.
import fs from 'node:fs';
const from = new URL('./', import.meta.url), to = new URL('../dist/deck/', import.meta.url);
fs.rmSync(to, {recursive: true, force: true});
for (const name of ['index.html', 'deck.css', 'deck.js', 'assets', 'video'])
  fs.cpSync(new URL(name, from), new URL(name, to), {recursive: true, filter: source => !/\/test(\/|$)|\.DS_Store$/.test(source)});
console.log('copied deck to dist/deck');
