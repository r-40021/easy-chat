<script lang="ts">
  import { browser } from "$app/environment";
  import { Tabs, TabItem } from "flowbite-svelte";
  import Posinega from "./posinega.svelte";
  import Synonyms from "./synonyms.svelte";
  import Check from "./check.svelte";

  let reply = "";
  if (browser) {
    reply = localStorage.getItem("reply") || "";
  }

  function handleChange() {
    browser && localStorage.setItem("reply", reply);
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
      <Posinega {reply}/>
    </div>
  </TabItem>
  <TabItem title="類義語検索">
    <Synonyms {reply} />
  </TabItem>
  <TabItem title="文章校正">
    <div class="w-screen lg:w-[75vw]">
      <Check bind:reply/>
    </div>
  </TabItem>
</Tabs>
