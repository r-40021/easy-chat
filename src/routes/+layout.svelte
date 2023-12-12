<script>
  import "../app.css";
</script>

<nav class="border-solid border-gray-200 border-b mb-6">
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-2xl whitespace-nowrap"
        >チャット返信文作成支援ツール</span
      >
    </a>
  </div>
</nav>

<div class="container mx-auto">
  <div class="flex flex-col justify-center items-center mt-10">
    <slot />
  </div>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
