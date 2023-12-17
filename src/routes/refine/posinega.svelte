<script lang="ts">
  import { count, scores, sentiment, posinegaExecuted } from "./stores";
  export let reply = "";
  let checking = false;

  // ネガポジ判定
  async function posinega() {
    if (!reply || reply.length === 0) {
      alert("返信文を1文字以上入力してください。");
      return;
    }
    checking = true;
    const data = { reply: reply };
    const response = await fetch("/refine/posinega", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (!reply || reply.length === 0) {
        alert("返信文を1文字以上入力してください。");
      } else {
        alert(
          `エラーが発生しました[${response.status}: ${response.statusText}]`,
        );
      }
      checking = false;
      return;
    }
    const json = await response.json();
    $sentiment = json.response.Sentiment; // 判定結果
    $scores = json.response.SentimentScore; // 感情ごとのスコア
    $posinegaExecuted = true;
    checking = false;
    $count--;
  }

  // 英語の感情名を日本語にする
  function formatSentiment(sentiment: string): string {
    switch (sentiment.toLowerCase()) {
      case "negative":
        return "ネガティブ";
        break;

      case "neutral":
        return "中立";
        break;

      case "positive":
        return "ポジティブ";
        break;

      case "mixed":
        return "混在";
        break;

      default:
        return "不明な感情";
        break;
    }
  }
</script>

<p>返信文のポジティブ度を分析します。</p>
<p class="mt-2">「この返信が相手を傷つけないか？」の目安になります。</p>
{#if $posinegaExecuted === true}
  <p class="mt-2 mb-4">
    判定結果: <span class="text-3xl font-bold"
      >{formatSentiment($sentiment)}</span
    >
  </p>
  {#each Object.entries($scores) as [eachSentiment, score]}
    <p class="mt-2">
      {formatSentiment(eachSentiment)}度: <span class="font-semibold">{score && typeof score === "number" && Math.round(score * 1000) / 1000}</span>
    </p>
  {/each}
  {#if $sentiment === "NEGATIVE"}
    <p class="mt-8 text-xl font-semibold">ポジティブな返信文にするために</p>
    <ul class="space-y-2 list-inside mt-3 list-disc">
      <li>提案を断る場合は代替案を入れる</li>
      <li>絵文字を効果的に使う</li>
      <li>表現を間接的なものに変える (「類義語検索」を使うと便利です。)</li>
      <li>
        具体的な情報を増やして相手が返信しやすくすると、なおよくなります。
      </li>
      <li>ネガティブな内容の後に「説」を加えるとネガティブ度が下がる説も提唱されています。</li>
    </ul>
    <p class="font-semibold mt-2">
      提案を断る内容の場合は "ポジティブ" の判定を出すのが難しいため、ポジティブ度0.07以上が目安となります。
    </p>
  {/if}
{/if}

<button
  type="button"
  class="text-white bg-{$count <= 0
    ? 'gray-400'
    : 'blue-700'} hover:bg-{$count <= 0
    ? 'gray-400'
    : 'blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-3 focus:outline-none"
  on:click={posinega}
  disabled={checking || $count <= 0}
>
  {#if checking === true}
    <svg
      aria-hidden="true"
      role="status"
      class="inline w-4 h-4 me-3 text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  {/if}
  分析開始</button
>
<span class="text-gray-500">残り{$count}回</span>
<p class="text-sm text-gray-500 mt-3">
  使用サービス: <a
    href="https://aws.amazon.com/jp/comprehend/"
    class="font-medium text-blue-600 underline hover:no-underline"
    target="_blank"
    rel="noopener noreferrer">Amazon Comprehend</a
  >
</p>
