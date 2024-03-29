import { Buffer } from "buffer";

import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "$env/static/private";
import { json } from '@sveltejs/kit';
import { BedrockRuntime, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
const client = new BedrockRuntime({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

export async function POST({ request, cookies }) {
  const { word } = await request.json();

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-instant-v1",
    body: JSON.stringify({
      prompt: `\n\nHuman:「${word}」の類義表現を箇条書きで出力して\n\nAssistant:`,
      max_tokens_to_sample: 500,
      temperature: 0.7,
      top_p: 1
    }),
    accept: "application/json",
    contentType: "application/json",
  })

  const res = await client.send(command);

  return json({ text: JSON.parse(Buffer.from(res.body).toString("utf-8")).completion }, { status: 200 });
}
