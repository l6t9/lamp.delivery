<script lang="ts">
  let { data } = $props();
  import "$lib/article.css";
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
</svelte:head>

<div class="header">
  <h2><a href="/">sunnie</a></h2>
</div>

<article>
  <hgroup>
    <h1>{data.meta.title}</h1>
    <p>Published at {data.meta.date}</p>
  </hgroup>

  <div class="tags">
    {#each data.meta.categories as category}
      <span>#{category}</span>
    {/each}
  </div>

  <div class="separator"></div>

  <div class="prose">
    <data.content />
  </div>
</article>

<style>
  article,
  .header {
    margin: 2rem min(8rem, 10vw);
    padding: 2rem;
    background-color: var(--ctp-mocha-base);
    border-radius: 16px;
    & a {
      color: var(--ctp-mocha-text);
      text-decoration: none;
    }
  }

  .tags {
    margin: 1rem 0;
    & span {
      margin: 0.25rem;
      padding: 0.5rem;
      border-radius: 16px;
      background-color: var(--ctp-mocha-surface0);
    }
  }

  .separator {
    height: 0.25rem;
    margin: 0.5rem 0;
    background-color: var(--ctp-mocha-surface0);
    border-radius: 16px;
  }
</style>
