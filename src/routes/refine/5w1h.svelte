<script lang="ts">
  import { fwohExecuted, fwohCount, fwohData } from "./stores";

  type WordProperty = {
    $: {
      valueString: string;
      startTime?: string;
      endTime?: string;
    };
    "mxtr:postal_address"?: object[];
  };

  type ExtendedProperty = {
    $: {
      name: string;
      value: string;
    };
  };

  export let reply = "";
  let checking = false;

  async function fwoh() {
    if (!reply || reply.length === 0) {
      alert("返信文を1文字以上入力してください。");
      return;
    }
    checking = true;
    const data = { reply: reply };
    const response = await fetch("/refine/5w1h", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (!reply || reply.length === 0) {
        alert("返信文を1文字以上入力してください。");
      } else {
        alert(
          `エラーが発生しました[${response.status}: ${response.statusText}]`,
        );
      }
      checking = false;
      return;
    }
    const json = await response.json();
    $fwohData = {
      when: convertToArray(json.fwoh["gd:when"]),
      where: convertToArray(json.fwoh["gd:where"]),
      who: convertToArray(json.fwoh["gd:who"]),
      what: convertExtendedPropertyToArray(json.fwoh["gd:extendedProperty"]),
    };

    $fwohExecuted = true;
    checking = false;
    $fwohCount--;
  }

  function convertToArray(data: WordProperty[]): string[] {
    if (!data || data.length === 0) {
      return [];
    } else {
      return data.map((word) => word.$.valueString.trim());
    }
  }

  function convertExtendedPropertyToArray(data: ExtendedProperty[]): string[] {
    if (!data || data.filter((word) => word.$.name === "what").length === 0) {
      return [];
    } else {
      return data
        .filter((word) => word.$.name === "what")
        .map((word) => word.$.value.trim());
    }
  }
</script>

<p>返信文から 誰・何・いつ・どこ を抽出します。</p>
<p class="mt-2">文章が誤解なく伝わるかの目安になります。</p>
<p class="mt-2">※5W1H が揃っていなくても、文意が十分伝われば OK です。</p>
{#if $fwohExecuted === true}
  <p class="mt-4">
    誰：
    {#if $fwohData.who.length > 0}
      <span class="font-semibold">{$fwohData.who.join("、")}</span>
    {:else}
      (不検出)
    {/if}
  </p>
  <p class="mt-2">
    何：
    {#if $fwohData.what.length > 0}
      <span class="font-semibold">{$fwohData.what.join("、")}</span>
    {:else}
      (不検出)
    {/if}
  </p>
  <p class="mt-2">
    いつ：
    {#if $fwohData.when.length > 0}
      <span class="font-semibold">{$fwohData.when.join("、")}</span>
    {:else}
      (不検出)
    {/if}
  </p>
  <p class="mt-2">
    どこ：
    {#if $fwohData.where.length > 0}
      <span class="font-semibold">{$fwohData.where.join("、")}</span>
    {:else}
      (不検出)
    {/if}
  </p>
{/if}

<button
  type="button"
  class="text-white bg-{$fwohCount <= 0
    ? 'gray-400'
    : 'blue-700'} hover:bg-{$fwohCount <= 0
    ? 'gray-400'
    : 'blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-4 focus:outline-none"
  on:click={fwoh}
  disabled={checking || $fwohCount <= 0}
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
    抽出中...
  {:else}
    抽出開始
  {/if}
</button>
<span class="text-gray-500">残り{$fwohCount}回</span>
<p class="text-sm text-gray-500 mt-3">
  提供: <a
    href="https://metadata.co.jp/apis/5w1h.html"
    class="font-medium text-blue-600 underline hover:no-underline"
    target="_blank"
    rel="noopener noreferrer">5W1H抽出API (メタデータ株式会社)</a
  >
</p>

<p class="text-sm text-gray-500 mt-2">
  ※API
  の仕様上、入力された返信文は暗号化されずに送信されるため、返信文に機密情報は含めないようにしてください。
</p>
