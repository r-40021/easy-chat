import { json } from '@sveltejs/kit';
import { METADATA_API_KEY } from "$env/static/private";

export async function POST({ request, cookies }) {
  const { reply } = await request.json();

  const url = 'http://ap.mextractr.net/ma9/negaposi_analyzer?out=json&apikey=' + encodeURIComponent(METADATA_API_KEY) + '&text=' + encodeURIComponent(reply);
  const response = await fetch(url);
  if (response.ok) {
    const posinega = await response.json();
    console.log(posinega);
    console.log(JSON.stringify(posinega));
    return json({ posinega }, { status: 201 });
  } else {
    return response;
  }

}
