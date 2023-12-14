<svelte:head>
  <title>(1/3) とりあえず作成 - チャット返信作成支援ツール</title>
</svelte:head>

<script>
  let show = false;
  let reply = '';
  function handleClick() {
    show = true;
  }
  function handleChange() {
    localStorage.setItem('reply', reply);
  }
</script>

<h1 class="text-center font-semibold text-3xl">
  (1/3) まずは、とりあえず返信文を作ってみてください
</h1>
<p class="mt-2 text-center">
  ここで入力した返信文をこの後の画面でブラッシュアップしていきます。現段階では言いたいことが伝われば
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

<button
  type="submit"
  on:click={handleClick}
  class:hidden={show === true}
  class="inline-flex items-center py-2.5 px-4 mt-8 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
>
  どうしても思い浮かばない場合
</button>

<div class:hidden={show === false} class="mt-8">
  <p>
    どうしても返信文が思い浮かばない場合は、<a
      href="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx"
      class="font-medium text-blue-600 underline hover:no-underline"
      target="_blank"
      rel="noopener noreferrer">奥の手</a
    >を使う方法もあります。
  </p>
  <p class="mt-3">プロンプトの例:</p>
  <p class="mb-3 p-3 border-gray-400 border-solid border">
    (相手との関係 (友人、家族など))
    とチャットを行っており、以下のようなメッセージが送られてきました。この後に続く適切な返答を考えてください。
    <br /><br />
    (相手から送られてきたメッセージ)
  </p>
  <p>※「創造的」モードを選ぶと良い返答が得られます。</p>
</div>
