<script lang="ts">
  import favicon from "$lib/assets/favicon.png";
  import "$lib/css-reset.css";
  import "$lib/shared.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>the coolest site</title>
</svelte:head>

{@render children?.()}

<style>
  :root {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: "Maple Mono", monospace;
  }
</style>
