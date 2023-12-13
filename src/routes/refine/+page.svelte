<script>
  import { browser } from "$app/environment";
  import { Tabs, TabItem } from "flowbite-svelte";

  let reply = "";
  if (browser) {
    reply = localStorage.getItem("reply") || "";
  }

  function handleChange() {
    localStorage.setItem("reply", reply);
  }

  let count = 4;
  async function posinega() {
    count--;
  }

  let suggestions = [];
  async function check() {
    const data = { reply: reply };
    const response = await fetch("/refine/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    suggestions = json.checked.result.suggestions;

    console.log(json);
  }
</script>

<svelte:head>
  <title>ブラッシュアップ - チャット返信作成支援ツール</title>
</svelte:head>

<h1 class="text-center font-semibold text-3xl">返信文のブラッシュアップ</h1>
<p class="mt-2">
  画面下のツールを使用して、前の画面で作成した返信文をブラッシュアップします。
</p>

<div class="w-full lg:w-9/12 mt-8">
  <label for="reply" class="block mb-2 text-sm font-medium text-gray-900"
    >返信文:</label
  >
  <textarea
    id="reply"
    rows="4"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    placeholder="返信文を入力"
    bind:value={reply}
    on:change={handleChange}
  ></textarea>
</div>

<p class="mt-12 mb-6">
  ツールによる出力結果を元に、上の返信文を修正してください。
</p>
<Tabs style="pill">
  <TabItem open title="ネガポジ分析">
    <div class="w-screen lg:w-[75vw]">
      <p>返信文のポジティブ度を分析します。</p>
      <p class="mt-2">
        ネガポジ度: <span class="text-2xl font-semibold">とても良い</span>
      </p>
      <p class="mt-2">
        iPhone4sは画質は【【いい】2.00】けど、形が【【可愛く】-1.50】ない！
        iphone3Gsは丸い形が【【素敵でしょ】3.00】。
        あ～あ、あとは電波が改善されたらいいのになぁ
      </p>

      <button
        type="button"
        class="text-white bg-{count <= 0
          ? 'gray-400'
          : 'blue-700'} hover:bg-{count <= 0
          ? 'gray-400'
          : 'blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-3 focus:outline-none"
        disabled={count <= 0}
        on:click={posinega}>再分析</button
      >
      <span class="text-gray-500">残り{count}回</span>
      <p class="text-sm text-gray-500 mt-3">
        提供: <a
          href="https://metadata.co.jp/apis/negaposi-analyzer/detail.html"
          class="font-medium text-blue-600 underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer">メタデータ株式会社</a
        >
      </p>
    </div>
  </TabItem>
  <TabItem title="類義語検索">
    <form class="w-screen lg:w-[75vw]">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >類義語を検索</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-full"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="類義語を検索..."
          required
          autocomplete="off"
        />
        <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          ><svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">検索</span></button
        >
      </div>
    </form>
  </TabItem>
  <TabItem title="文章校正">
    <div class="w-screen lg:w-[75vw]">
      <p>誤った日本語を修正します。</p>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 focus:outline-none"
        on:click={check}>校正開始</button
      >
      {#if suggestions.length === 0}
        <p>訂正箇所がありません。</p>
      {:else}
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">訂正箇所</th>
              <th scope="col" class="px-6 py-3">理由</th>
            </tr>
          </thead>
          <tbody>
            {#each suggestions as suggestion}
            <tr class="bg-white border-b">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {suggestion.word} → {suggestion.suggestion}
              </th>
              <td class="px-6 py-4">{suggestion.rule}</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {/if}

      <p class="text-sm text-gray-500 mt-3">
        提供: <a
          href="https://developer.yahoo.co.jp/webapi/jlp/kousei/v2/kousei.html"
          class="font-medium text-blue-600 underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer">Yahoo! Japan</a
        >
      </p>
    </div>
  </TabItem>
</Tabs>
