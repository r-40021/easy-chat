import { writable } from 'svelte/store';

// posinega
export const count = writable(5);
export const score = writable("");
export const analyzedText = writable("");
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
