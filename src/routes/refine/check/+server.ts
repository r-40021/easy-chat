import { json } from '@sveltejs/kit';
import { YAHOO_API_KEY } from "$env/static/private";

export async function POST({ request, cookies }) {
  const { reply } = await request.json();

  const url = 'https://jlp.yahooapis.jp/KouseiService/V2/kousei?appid=' + encodeURIComponent(YAHOO_API_KEY);
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "id": "kousei",
      "jsonrpc": "2.0",
      "method": 'jlp.kouseiservice.kousei',
      "params": { "q": reply }
    }),
  });
  if (response.ok) {
    const checked = await response.json();
    return json({ checked }, { status: 201 });
  } else {
    return response;
  }

}
