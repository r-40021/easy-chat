<script lang="ts">
  let reply = "";
  
  function handleChange() {
    sessionStorage.setItem("reply", reply);
  }

  function beforeRefine(e:Event) {
    if (!reply) {
      e.preventDefault();
      alert("返信文を入力してください");
    }
  }
</script>

<svelte:head>
  <title>(1/2) とりあえず作成 - チャット返信作成支援ツール</title>
</svelte:head>

<h1 class="text-center font-semibold text-3xl">
  (1/2) とりあえず返信文を作ってみてください
</h1>
<p class="mt-2 text-center">
  ここで入力した返信文をこの後の画面で推敲していきます。現段階では言いたいことが伝われば
  OK です。
</p>

<form class="w-full lg:w-9/12">
  <div class="w-full mb-4 mt-8 border border-gray-200 rounded-lg bg-gray-50">
    <div class="px-4 py-2 bg-white rounded-t-lg">
      <label for="reply" class="sr-only">返信文</label>
      <textarea
        id="reply"
        rows="8"
        class="w-full px-0 text-sm rounded-lg text-gray-900 bg-white border-1"
        placeholder="クリックして入力"
        on:change={handleChange}
        bind:value={reply}
        required
      ></textarea>
    </div>
    <div class="flex items-center justify-end px-3 py-2 border-t">
      <a
        href="/refine"
        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        on:click={beforeRefine}
      >
        次へ
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
</form>
