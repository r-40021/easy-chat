import sqlite3 from "sqlite3";

import { json } from '@sveltejs/kit';
const db = new sqlite3.Database("wnjpn.db");

type Sense = {
  synset: string,
  wordid: string,
  lang: string,
  rank: string,
  lexid: string,
  freq: string,
  src: string
}

type Word = {
  wordid: string,
  lang: string,
  lemma: string,
  pron: string | null,
  pos: string
}

export function POST({ request, cookies }) {
  const wordsql = `SELECT sense.synset AS synset FROM word JOIN sense ON sense.wordid=word.wordid WHERE lemma = '${'悲しい'}'`;

  db.all((wordsql), (worderr, wordrows: Sense[]) => {
    // 単語が登録されていない場合があるので分岐。
    if (wordrows && wordrows.length > 0) {
      // 見つかった単語のsenseを条件にしてデータを検索します。
      const wordrow = wordrows[0];
      const sql = `SELECT word.lemma AS lemma FROM sense JOIN word ON word.wordid = sense.wordid WHERE sense.synset = '${wordrow.synset}'`;
      db.all(sql, (synoerr, synorows:Word[]) => {
        // 見つかった類義語を出力します。
        for (let synorow of synorows) {
          console.log(synorow.lemma);
        }
      });
      return new Response(JSON.stringify(json({a:1}, {status:201})))
    } else {
      console.warn("no word");
      return new Response(JSON.stringify(json({a:1}, {status:201})))
    }
  });

  return json({request}, {status: 201});
}