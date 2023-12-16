import { BingChat } from 'bing-chat-rnz';
import { BING_COOKIE } from "$env/static/private";
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
  const { person, situation } = await request.json();

  const api = new BingChat({
    cookie: BING_COOKIE
  })

  console.log('creating...');
  const res = await api.sendMessage(`${person}とチャットをしています。\n現在以下のような状況です。適切なチャットの返信を考えてください。\n\n${situation}`, {
    variant: 'Creative'
  });
  console.log('response', res.text);

  return json({ res }, { status: 200 });
}