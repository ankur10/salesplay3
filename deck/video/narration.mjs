// The SalesPlay video: one spoken line per beat. Nancy, her quota and her nine o'clock review are
// invented for the story; everything said about the product is what the captured screens show.
// The voice sets the length of each beat.
//   text: the line as spoken.  at: seconds into the beat at which it starts (default 0.5).
// tempo: the model speaks slowly for a piece this tight, so its speech is quickened a little (pitch kept).
export const VOICE = {model: 'gpt-4o-mini-tts', voice: 'ash', tempo: 1.1, instructions: 'A calm, warm, confident narrator telling a short story in a product keynote, with a little dry humour. British English. Brisk, conversational pace with only short pauses between sentences. Clear, natural, understated; no salesman energy.'};
export const lines = {
  open: {text: 'This is Nancy. She sells for LANXESS, and her quarter is not going well.', at: 1},
  stuck: {text: 'Baxter is her biggest account. Three emails, no reply. And at nine, her manager wants to see new pipeline.', at: 0.9},
  queue: {text: 'With thirty minutes left, she opens SalesPlay. It has already read the account. Sixteen opportunities are waiting.', at: 0.8},
  why: {text: 'One stops her. A drug shortage, reported in September, and a material LANXESS makes.', at: 0.8},
  say: {text: 'Her last emails were guesses. This is not. It tells her what the evidence proves, what it does not, and how to open.', at: 0.8},
  hear: {text: 'It even tells her when to walk away.', at: 1.2},
  people: {text: 'And she has been writing to the wrong people. Here are fifteen of the right ones, ranked for this play.', at: 0.8},
  outreach: {text: 'Email number four is already drafted. This time, it has a reason in it.', at: 0.8},
  kit: {text: 'She accepts, and the kit unlocks. A pitch, timed in five-minute parts. Twenty-one questions to ask.', at: 0.9},
  case: {text: 'A business case, honest about what is not yet known. And seven next steps, in order.', at: 0.8},
  ask: {text: 'Ten minutes left. She pushes her luck.', at: 1.2},
  answer: {text: 'Seven steps later: three more opportunities, found from public information.', at: 0.9},
  scale: {text: 'And Baxter is only one account. Across her book, a hundred and ninety opportunities are waiting, with agents set to draft the first pitch each morning.', at: 0.8},
  close: {text: 'Nine o’clock. Nancy walks into her review with a plan, not an excuse. SalesPlay. Know the account. Know your next move.', at: 1.2},
};
