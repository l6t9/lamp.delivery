<script lang="ts">
  import favicon from "$lib/assets/favicon.png";
  import "$lib/css-reset.css";
  import "$lib/shared.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>lamp</title>
  <meta property="og:title" content="hiya, i'm lamp!" />
  <meta property="og:description" content="just making stuff" />
  <meta property="og:type" content="website" />
  <meta name="description" content="just making stuff" />
</svelte:head>

{@render children?.()}

<style>
  :root {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: "Maple Mono", monospace;
  }
</style>
