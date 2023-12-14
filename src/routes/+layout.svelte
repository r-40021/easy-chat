<script>
  import "../app.css";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<nav class="border-solid border-gray-200 border-b mb-6">
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-2xl whitespace-nowrap"
        >チャット返信作成支援ツール</span
      >
    </a>
  </div>
</nav>

<div class="container mx-auto">
  <div class="flex flex-col justify-center items-center mt-10 px-2">
    <slot />
  </div>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
