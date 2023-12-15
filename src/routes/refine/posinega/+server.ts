import { json } from '@sveltejs/kit';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from "$env/static/private";
import AWS from "aws-sdk";

const client = new AWS.Comprehend({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

export async function POST({ request, cookies }) {
  const { reply } = await request.json();

  if (!reply || reply.length === 0) {
    return json({ status: 400 });
  }

  const params = {
    LanguageCode: "ja",
    Text: reply
  }

  const response = await client.detectSentiment(params).promise().catch(err => {
    console.error(err);
    return json({ err }, { status: 500 });
  });

  return json({ response }, { status: 201 })
}
