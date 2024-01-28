import { json } from '@sveltejs/kit';
import { METADATA_API_KEY } from "$env/static/private";
import xml2js from "xml2js";

export async function POST({ request, cookies }) {
  const { reply } = await request.json();

  // 返信文がない場合はエラーを返す
  if (!reply || reply.length === 0) {
    return json({ status: 400 });
  }

  const url = 'http://ap.mextractr.net/ma9/mext5w1h?apikey=' + encodeURIComponent(METADATA_API_KEY) + '&text=' + encodeURIComponent(reply);
  const response = await fetch(url);
  if (response.ok) {
    const fwoh = await response.text();
    const rawJson = await xml2js.parseStringPromise(fwoh);
    const parsedJson = JSON.parse(JSON.stringify(rawJson.feed.entry));
    return json({ fwoh: parsedJson[0] }, { status: 200 });
  } else {
    return response;
  }
}