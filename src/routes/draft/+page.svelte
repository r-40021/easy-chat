<script>
  let show = false;
  let reply = "";
  function handleClick() {
    show = true;
  }
  function handleChange() {
    localStorage.setItem("reply", reply);
  }

  let person = "";
  let situation = "";
  let checking = false;
  let responseText = "";
  async function handleSubmit() {
    checking = true;
    const data = { person: person, situation: situation };
    responseText = "AI が頑張って考えています…(それなりに時間がかかるので気長に待ってください。)";
    const response = await fetch("/draft/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert(`エラーが発生しました[${response.status}: ${response.statusText}]`);
      checking = false;
      responseText = "";
      return;
    }
    const json = await response.json();
    checking = false;
    responseText = json.text.trim();
  }
</script>

<svelte:head>
  <title>(1/3) とりあえず作成 - チャット返信作成支援ツール</title>
</svelte:head>

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
  AI に助けを求める (最終手段)
</button>

<div
  class:hidden={show === false}
  class="mt-8 w-full lg:w-9/12"
  on:submit|preventDefault={handleSubmit}
>
  <p class="text-2xl font-semibold">AI に助けを求める</p>
  <form class="w-full">
    <div class="w-full">
      <label
        for="person"
        class="block mt-4 mb-2 text-sm font-medium text-gray-900"
        >チャットの相手</label
      >
      <input
        type="text"
        id="person"
        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="友人、先輩など"
        bind:value={person}
        disabled={checking}
        required
      />
    </div>
    <div>
      <label
        for="situation"
        class="block mb-2 text-sm font-medium text-gray-900 mt-6"
        >現在の状況 (直前のメッセージなど)</label
      >
      <textarea
        id="situation"
        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="状況を入力 (直前のメッセージなど)"
        rows="5"
        bind:value={situation}
        disabled={checking}
        required
      ></textarea>
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-6 text-center"
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
  {/if}
      送信</button
    >
  </form>
  <p class="whitespace-pre-wrap break-words my-4">
    {responseText}
  </p>
  <p class="text-sm text-gray-500 mb-8 mt-2">
    使用サービス: <a
      href="https://aws.amazon.com/jp/bedrock/claude/"
      class="font-medium text-blue-600 underline hover:no-underline"
      target="_blank"
      rel="noopener noreferrer">Anthropic Claude 1.3 (Amazon Bedrock 上)</a
    >
  </p>
</div>
