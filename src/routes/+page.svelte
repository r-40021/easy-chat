<script>
  import { browser } from "$app/environment";
  // reset
  import {
    posinegaCount,
    scores,
    sentiment,
    posinegaExecuted,
    suggestions,
    checkExecuted,
    fixedReply,
    fwohCount,
    fwohData,
    fwohExecuted,
  } from "./refine/stores";
  $posinegaCount = 10;
  $scores = { sentiment: "", score: 0 };
  $sentiment = "";
  $posinegaExecuted = false;
  $suggestions = [];
  $checkExecuted = false;
  $fixedReply = "";
  $fwohCount = 5;
  $fwohData = {
    what: [],
    when: [],
    who: [],
    where: [],
  };
  $fwohExecuted = false;
  browser && localStorage.removeItem("reply");
</script>

<svelte:head>
  <title>チャット返信作成支援ツール</title>
</svelte:head>

<h1 class="text-center font-semibold text-3xl">
  現在の状況について、以下の項目に当てはまるものはありますか？
</h1>
<p class="mt-2">そもそも、しっかりとした返信が必要かどうかを判定します。</p>
<ul class="max-w-md space-y-1 text-gray-700 text-xl list-inside mt-6">
  <li class="flex items-center">
    <svg
      class="w-3.5 h-3.5 me-2 text-green-500 flex-shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
      />
    </svg>
    相手が乗り気ではなさそう
  </li>
  <li class="flex items-center">
    <svg
      class="w-3.5 h-3.5 me-2 text-green-500 flex-shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
      />
    </svg>
    話が噛み合ってなさそう
  </li>
  <li class="flex items-center">
    <svg
      class="w-3.5 h-3.5 me-2 text-green-500 flex-shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
      />
    </svg>
    相手の返信が極端に短い
  </li>
</ul>
<div class="btns mt-6">
  <a
    type="button"
    href="/end-conversation"
    class="text-white text-base font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
  >
    ある
  </a>
  <a
    type="button"
    href="/draft"
    class="text-gray-900 text-base font-medium bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
  >
    ない
  </a>
</div>
