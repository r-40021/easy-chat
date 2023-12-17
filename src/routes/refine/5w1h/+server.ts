import { json } from '@sveltejs/kit';
import { METADATA_API_KEY } from "$env/static/private";
import xml2js from "xml2js";

export async function POST({ request, cookies }) {
  const { reply } = await request.json();

  const url = 'http://ap.mextractr.net/ma9/mext5w1h?apikey=' + encodeURIComponent(METADATA_API_KEY) + '&text=' + encodeURIComponent(reply);
  const response = await fetch(url);
  if (response.ok) {
    const fwoh = await response.text();
    const rawJson = await xml2js.parseStringPromise(fwoh);
    console.dir(rawJson.feed.entry);
    const parsedJson = JSON.parse(JSON.stringify(rawJson.feed.entry));
    console.log(rawJson);
    return json({ fwoh: parsedJson[0] }, { status: 200 });
  } else {
    return response;
  }
}