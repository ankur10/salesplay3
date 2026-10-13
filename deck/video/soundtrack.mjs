// The music bed under the narration, generated in code. It plays on the instruments in
// sound.mjs; sound.mjs and score.mjs are carried over unchanged from the GrowthIQ deck.
import {BEAT} from './score.mjs';

export const MUSIC_LEVEL = 1.05, VOICE_LEVEL = 0.72;
export const TEMPO = 112;
const D5 = 74, E5 = 76, Fs5 = 78, A5 = 81;
// A bright, forward-moving bed in D major: I, V, vi, IV, two bars each. Each chord is
// [bass, then the notes the pulse plays].
const D = [38, 62, 66, 69, 74], A = [33, 61, 64, 69, 73], Bm = [35, 62, 66, 71, 74], G = [31, 62, 67, 71, 74];
const PROGRESSION = [D, A, Bm, G];
const PULSE = [0, 2, 1, 3, 2, 1, 3, 2];   // which chord note each eighth of a bar plays

// The bed for any narrated piece, in the film engine's units (beats of 0.6s) so it can be composed.
// The arrangement grows with the story: chords alone at first, the pulse from `pulseFrom`, bass
// and drums from `drumsFrom`, and one held chord from `close` to `end` (all in seconds).
// `motifs` are the moments the three-note motif is left open; it resolves at the close.
// `drive` is the fuller arrangement: a kick on every beat, a backbeat, and the pulse doubled an octave up.
export function bed({end, pulseFrom, drumsFrom, close, motifs = [], thumps = [], tempo = TEMPO, drive = false}) {
  const beats = seconds => seconds / BEAT;
  const list = [{kind: 'room', at: 0, to: beats(end)}];
  const add = (kind, seconds, more = {}) => list.push({kind, at: beats(seconds), ...more});
  const beat = 60 / tempo, bar = beat * 4;
  for (let n = 0; n * bar < close; n++) {
    const from = n * bar, chord = PROGRESSION[Math.floor(n / 2) % PROGRESSION.length], [bass, ...notes] = chord;
    if (n % 2 === 0) list.push({kind: 'pad', at: beats(from), to: beats(Math.min(from + bar * 2, close) - 0.15), notes: notes.slice(0, 3), gain: 0.06, attack: 0.4, release: 0.8, bright: true});
    for (let eighth = 0; eighth < 8; eighth++) {
      const when = from + eighth * beat / 2; if (when >= close) break;
      if (when >= pulseFrom) add('pluck', when, {note: notes[PULSE[eighth]] + (n % 4 === 3 && eighth > 5 ? 12 : 0), gain: eighth % 2 ? 0.05 : 0.075});
      if (when >= drumsFrom) {
        if (eighth === 0 || eighth === 3 || eighth === 6) add('pluck', when, {note: bass + 12, gain: 0.16});
        if (eighth === 0 || eighth === 4) add('kick', when, {gain: 0.2});
        if (eighth % 2) add('hat', when, {gain: 0.028});
        if (eighth === 2 || eighth === 6) add('tick', when, {gain: drive ? 0.13 : 0.05});
        if (drive) {
          if (eighth === 2 || eighth === 6) { add('kick', when, {gain: 0.2}); add('hat', when, {gain: 0.07}); }
          if (eighth % 2 === 0) add('hat', when, {gain: 0.02});
          add('pluck', when + beat / 4, {note: notes[PULSE[(eighth + 3) % 8]] + 12, gain: 0.032});
        }
      }
    }
  }
  thumps.forEach(seconds => add('thump', seconds));
  [...motifs.map(seconds => [seconds, E5]), [close, Fs5]].forEach(([seconds, lastNote]) => [D5, A5, lastNote].forEach((note, i) => add('bell', seconds + i * 0.3, {note, gain: 0.16})));
  list.push({kind: 'pad', at: beats(close), to: beats(end), notes: [50, 57, 66, 69], gain: 0.09, attack: 0.3, release: 3, bright: true});
  add('bell', close, {note: 62, gain: 0.12});
  return list.sort((a, b) => a.at - b.at);
}
