import { writable } from 'svelte/store';

// posinega
type Scores = {
  sentiment: string,
  score: number
};
export const count = writable(10);
export const scores = writable<Scores>({sentiment: "", score: 0});
export const sentiment = writable("");
export const posinegaExecuted = writable(false);

// check
type Suggestion = {
  length: string;
  note: string;
  offset: string;
  rule: string;
  suggestion: string;
  word: string;
};
export const suggestions = writable<Suggestion[]>([]);
export const checkExecuted = writable(false);
export const fixedReply = writable("")
