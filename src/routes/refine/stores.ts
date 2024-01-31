import { writable } from 'svelte/store';

// posinega
type Scores = {
  sentiment: string;
  score: number;
};
export const posinegaCount = writable(10);
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

// 5W1H
type FwohData = {
  what: string[];
  when: string[];
  who: string[];
  where: string[];
}
export const fwohExecuted = writable(false);
export const fwohCount = writable(3);
export const fwohData = writable<FwohData>({
  what: [],
  when: [],
  who: [],
  where: [],
});

// 類義語
export const synonymCount = writable(7);
export const synonymResponse = writable("");