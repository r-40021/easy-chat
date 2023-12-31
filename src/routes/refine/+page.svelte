<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { Tabs, TabItem } from "flowbite-svelte";
  import Posinega from "./posinega.svelte";
  import Fwoh from "./5w1h.svelte";
  import Synonyms from "./synonyms.svelte";
  import Check from "./check.svelte";

  let reply = "";
  if (browser) {
    reply = sessionStorage.getItem("reply") || "";
    if (!reply) {
      goto('/');
    }
  }

  function handleChange() {
    browser && sessionStorage.setItem("reply", reply);
  }
</script>

<svelte:head>
  <title>(2/3) ブラッシュアップ - チャット返信作成支援ツール</title>
</svelte:head>

<h1 class="text-center font-semibold text-3xl">
  (2/3) 返信文のブラッシュアップ
</h1>
<p class="mt-2 text-center">
  画面下のツールを使用して、前の画面で作成した返信文をブラッシュアップします。
</p>

<div
  class="w-full lg:w-9/12 mt-8 mb-4 mt-8 border border-gray-200 rounded-lg bg-gray-50"
>
  <div class="px-4 py-2 bg-white rounded-t-lg">
    <label for="reply" class="sr-only">返信文</label>
    <textarea
      id="reply"
      rows="8"
      class="w-full px-0 text-sm rounded-lg text-gray-900 bg-white border-1"
      placeholder="返信文を入力"
      on:change={handleChange}
      bind:value={reply}
      required
    ></textarea>
  </div>
  <div class="flex items-center justify-end px-3 py-2 border-t">
    <a
      href="/finish"
      class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
    >
      完了
      <svg
        class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>
</div>

<p class="mt-12 mb-6">
  ツールによる出力結果を元に、上の返信文を修正してください。
</p>
<Tabs style="pill">
  <TabItem open title="ネガポジ分析">
    <div class="w-[85vw] lg:w-[75vw]">
      <Posinega {reply} />
    </div>
  </TabItem>
  <TabItem title="5W1H">
    <div class="w-[85vw] lg:w-[75vw]">
      <Fwoh {reply}/>
    </div>
  </TabItem>
  <TabItem title="類義語検索">
    <Synonyms />
  </TabItem>
  <TabItem title="文章校正">
    <div class="w-[85vw] lg:w-[75vw]">
      <Check bind:reply />
    </div>
  </TabItem>
</Tabs>
