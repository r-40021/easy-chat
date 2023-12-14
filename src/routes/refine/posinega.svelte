<script>
  export let reply = "";
  let count = 4;
  async function posinega() {
    count--;
  }
</script>

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
  class="text-white bg-{count <= 0 ? 'gray-400' : 'blue-700'} hover:bg-{count <=
  0
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
