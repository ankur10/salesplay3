// The SalesPlay video, beat by beat: what is on screen while each line is spoken.
//   min: seconds the picture needs, whatever the line's length.   clock: the time in the story's morning.
//   screen: an image in ../assets/screens/, with its size in pixels.
//   panels: regions of that image [x, y, width, height] that lift off it, `at` seconds into the beat.
//   overs: further screens that arrive over the first, each in its own `box` on the stage.
//   label: the name of the product screen, shown above it.
//   notes: on a title beat, the figures that arrive under the words, each [figure, what it counts].
// The title beats tell Nancy's story and are invented; no product screen shows those figures.
// Every screen is the live product, captured for Baxter International as seen by a LANXESS seller.
import {lines} from './narration.mjs';

export const QUESTION = 'Find new opportunities in the Pharmaceuticals business unit.';
const TAB = [1596, 1000], PAGE = [1140, 786];   // an opportunity tab captured at two sizes
export const beats = [
  {id: 'open', min: 8, clock: '8:30', kind: 'title', words: 'Nancy has a number to hit.', notes: [['62%', 'of her quota'], ['6 weeks', 'left in the quarter']]},
  {id: 'stuck', min: 9, clock: '8:30', kind: 'title', words: 'Baxter has gone quiet.', notes: [['3', 'emails sent'], ['0', 'replies'], ['9:00', 'pipeline review']]},
  {id: 'queue', min: 9, clock: '8:31', label: 'Recommended opportunities', screen: 'recommended', size: [1596, 1100], panels: [{rect: [32, 179, 500, 66], at: 1.5}, {rect: [32, 269, 609, 582], at: 3.2}, {rect: [666, 268, 912, 796], at: 5.6}]},
  {id: 'why', min: 9, clock: '8:33', label: 'Opportunity · Why call now', screen: 'why', size: TAB, panels: [{rect: [32, 192, 1546, 244], at: 1.6}, {rect: [32, 463, 1546, 390], at: 4}]},
  {id: 'say', min: 9, clock: '8:34', label: 'Opportunity · Say this', screen: 'say', size: TAB, panels: [{rect: [32, 129, 1546, 307], at: 1.5}, {rect: [32, 463, 1546, 348], at: 4.6}]},
  {id: 'hear', min: 6, clock: '8:35', label: 'Opportunity · If you hear this, do this', screen: 'hear', size: TAB, panels: [{rect: [32, 61, 1546, 375], at: 1.4}, {rect: [32, 463, 1546, 460], at: 3.6}]},
  {id: 'people', min: 9, clock: '8:37', label: 'People', screen: 'people', size: TAB, panels: [{rect: [32, 354, 1546, 424], at: 2.2}, {rect: [32, 778, 1546, 199], at: 5}]},
  {id: 'outreach', min: 7.5, clock: '8:39', label: 'Outreach', screen: 'outreach', size: TAB, panels: [{rect: [32, 428, 1459, 185], at: 1.5}, {rect: [32, 613, 1459, 387], at: 3.4}]},
  {id: 'kit', min: 11, clock: '8:42', label: 'Pitch', screen: 'pitch', size: TAB, panels: [{rect: [32, 265, 1546, 305], at: 2.8}, {rect: [32, 587, 1546, 305], at: 4.6}],
    overs: [{screen: 'prompters', size: PAGE, label: 'Prompters', at: 6.6, box: {left: 960, top: 300, width: 860, height: 610}}]},
  {id: 'case', min: 9.5, clock: '8:45', label: 'Business case', screen: 'business', size: PAGE, panels: [{rect: [23, 318, 1104, 166], at: 1.5}, {rect: [23, 499, 1104, 287], at: 3.2}],
    overs: [{screen: 'nextstep', size: PAGE, label: 'Next step', at: 5.4, box: {left: 960, top: 300, width: 860, height: 610}}]},
  {id: 'ask', min: 7, clock: '8:50', kind: 'question', label: 'Ask SalesPlay'},
  {id: 'answer', min: 9, clock: '8:52', label: 'Ask SalesPlay · Answer', screen: 'ask', size: [1267, 1100], panels: [{rect: [690, 90, 547, 62], at: 1.3}, {rect: [40, 144, 564, 62], at: 2.8}, {rect: [47, 647, 1184, 222], at: 5}]},
  {id: 'scale', min: 11.5, clock: '8:56', label: 'Every account', screen: 'allopps', size: PAGE, panels: [{rect: [20, 130, 360, 54], at: 2.6}, {rect: [28, 192, 431, 594], at: 4.4}],
    overs: [{screen: 'agents', size: [1342, 400], label: 'Agent hub · Preview', at: 7.4, box: {left: 700, top: 520, width: 1100, height: 400}}]},
  {id: 'close', min: 9, clock: '9:00', kind: 'close'},
];

// Each beat with its place in time: as long as its line needs, and never less than its picture needs.
export function timeline(voice) {
  let start = 0;
  return beats.map(beat => {
    const line = lines[beat.id], voiceAt = line.at ?? 0.5, spoken = voice[beat.id] ?? 0;
    const duration = Math.round(Math.max(beat.min, voiceAt + spoken + 1) * 10) / 10, placed = {...beat, text: line.text, voiceAt, voice: spoken, start, duration};
    start = Math.round((start + duration) * 10) / 10;
    return placed;
  });
}
export const DEADLINE = 'Pipeline review at 9:00';   // shown under the clock while she works
export const TAIL = 2;   // seconds the last picture holds after the final beat
