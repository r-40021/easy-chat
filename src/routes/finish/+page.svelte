<script>
  import { browser } from "$app/environment";
  let reply = "";
  if (browser) {
    reply = localStorage.getItem("reply") || "";
  }

  function copy() {
    browser && navigator.clipboard.writeText(reply);
  }

  async function share() {
    try {
      const shareData = {
        text: reply,
      };

      await navigator.share(shareData);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>(3/3) 完成 - チャット返信作成支援ツール</title>
</svelte:head>

<h1 class="text-center font-semibold text-3xl">(3/3) 完成！</h1>

<p class="mt-2 text-center">完成した返信文をチャットで送ってみましょう！</p>

<div
  class="w-full lg:w-9/12 mt-8 bg-white border border-gray-200 rounded-lg shadow"
>
  <img class="rounded-t-lg" src="" alt="" />
  <div class="p-5">
    <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900">
      完成した返信文
    </h5>
    <p
      class="text-2xl font-semibold text-gray-700 text-center whitespace-pre-wrap break-words"
    >
      {reply}
    </p>
    <div class="mt-4 flex justify-center">
      <button
        type="button"
        class="inline-flex items-center mx-2 py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        on:click={copy}
      >
        <svg
          class="w-3.5 h-3.5 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z"
          />
        </svg>コピー</button
      >
      {#if browser && 'share' in navigator}
        <button
          type="button"
          class="inline-flex items-center mx-2 py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          on:click={share}
        >
          <svg
            class="w-3.5 h-3.5 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"
            />
          </svg>共有</button
        >
      {/if}
    </div>
  </div>
</div>

<div class="mt-20 flex">
  <a
    type="button"
    href="/refine"
    class="inline-flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    <svg
      class="w-3.5 h-3.5 me-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 5H1m0 0 4 4M1 5l4-4"
      />
    </svg>戻る</a
  >
  <a
    type="button"
    href="/"
    class="text-white text-base font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
  >
    最初から
  </a>
</div>
