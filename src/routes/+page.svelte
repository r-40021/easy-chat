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
  browser && sessionStorage.removeItem("reply");
</script>

<svelte:head>
  <title>チャット返信作成支援ツール</title>
</svelte:head>

<h1 class="text-center font-semibold text-3xl">相手は乗り気ですか？</h1>
<p class="mt-2">そもそも、しっかりとした返信が必要かどうかを判定します。</p>
<p>
  以下の項目を1つでも満たす場合、相手は会話を終わらせたがっているかも知れません。
</p>
<ul class="max-w-md space-y-1 text-gray-700 text-xl list-inside mt-6">
  <li class="flex items-center">
    <svg 
      class="w-3.5 h-3.5 me-2 text-red-500 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
      fill="currentColor"
      >
      <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
      />
    </svg>
    話が噛み合ってなさそう
  </li>
  <li class="flex items-center">
    <svg 
      class="w-3.5 h-3.5 me-2 text-red-500 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
      fill="currentColor"
      >
      <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
      />
    </svg>
    相手の返信が極端に短い
  </li>
</ul>
<div class="btns mt-6">
  <a
    type="button"
    href="/draft"
    class="text-white text-base font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
  >
    はい
  </a>
  <a
    type="button"
    href="/end-conversation"
    class="text-gray-900 text-base font-medium bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
  >
    いいえ
  </a>
</div>
