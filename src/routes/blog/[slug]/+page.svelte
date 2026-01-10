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
  <h2><a href="/">lamp</a></h2>
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
    margin: 2rem auto;
    max-width: 800px;
    width: calc(100% - 4rem);
    padding: 2rem;
    background-color: var(--container-bg);
    border-radius: 16px;
    & a {
      color: var(--text-color);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .tags {
    margin: 1rem 0;
    & span {
      margin: 0.25rem;
      padding: 0.5rem;
      border-radius: 16px;
      background-color: var(--pill-bg);
      font-size: 0.8rem;
    }
  }

  .separator {
    height: 1px;
    margin: 1.5rem 0;
    background-color: var(--container-border);
  }

  .prose {
    line-height: 1.6;
    color: var(--text-color);
  }

  hgroup h1 {
    margin-bottom: 0.5rem;
  }

  hgroup p {
    color: var(--subtext-color);
    font-size: 0.9rem;
  }
</style>
