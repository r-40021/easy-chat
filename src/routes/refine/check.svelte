<script lang="ts">
  export let reply = "";
  import { suggestions, fixedReply, checkExecuted } from "./stores";
  import { browser } from "$app/environment";
  let checking = false;

  async function check() {
    // 校正実施
    checking = true;
    const data = { reply: reply };
    const response = await fetch("/refine/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert(`エラーが発生しました[${response.status}: ${response.statusText}]`);
      checking = false;
      return;
    }
    const json = await response.json();
    $suggestions = json.checked.result.suggestions;
    $checkExecuted = true;
    checking = false;

    // 訂正後の文を生成
    $fixedReply = reply;
    for (const suggestion of $suggestions) {
      $fixedReply = $fixedReply.replaceAll(
        suggestion.word,
        suggestion.suggestion || suggestion.word,
      );
    }
  }

  function handleClick() {
    reply = $fixedReply;
    browser && sessionStorage.setItem("reply", reply);
  }
</script>

<p>誤った日本語を修正します。</p>
<p class="mt-2">
  目上の人に返信する際に使用すれば、誠実な印象を与えられるかもしれません。
</p>
<button
  type="button"
  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 focus:outline-none"
  on:click={check}
  disabled={checking}
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
    校正中...
  {:else}
    校正開始
  {/if}
</button>
{#if $checkExecuted === true && $suggestions.length === 0}
  <p>訂正箇所はありません。</p>
{:else if $suggestions.length > 0}
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">訂正箇所</th>
          <th scope="col" class="px-6 py-3">理由</th>
        </tr>
      </thead>
      <tbody>
        {#each $suggestions as suggestion}
          <tr class="bg-white border-b">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {suggestion.word}
              {suggestion.suggestion && "→ " + suggestion.suggestion}
            </th>
            <td class="px-6 py-4">{suggestion.rule}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <p class="mt-6 text-xl font-semibold">訂正後の返信文</p>
  <p class="my-2 whitespace-pre-wrap">{$fixedReply}</p>
  <button
    type="button"
    class="px-3 py-2 mb-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    on:click={handleClick}>返信文に適用</button
  >
{/if}

<p class="text-sm text-gray-500 mt-3">
  使用サービス: <a
    href="https://developer.yahoo.co.jp/webapi/jlp/kousei/v2/kousei.html"
    class="font-medium text-blue-600 underline hover:no-underline"
    target="_blank"
    rel="noopener noreferrer">Yahoo! JAPAN Web API - 校正支援 (V2)</a
  >
</p>
