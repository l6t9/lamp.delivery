<script lang="ts">
  import { onMount } from "svelte";
  import notplaying from "$lib/assets/notplaying.png";
  import placeholder from "$lib/assets/placeholder.png";
  import type { TrackInfo } from "$lib";

  import HTMLLogo from "virtual:icons/catppuccin/html";
  import CSSLogo from "virtual:icons/catppuccin/css3";
  import TSLogo from "virtual:icons/catppuccin/typescript";
  import ReactLogo from "virtual:icons/catppuccin/typescript-react";
  import SvelteLogo from "virtual:icons/catppuccin/svelte";
  import CPPLogo from "virtual:icons/catppuccin/cpp";
  import PythonLogo from "virtual:icons/catppuccin/python";
  import KotlinLogo from "virtual:icons/catppuccin/kotlin";

  let { data } = $props();

  let isLoading = $state(true);
  let nowPlaying: TrackInfo = $state(null);

  onMount(async () => {
    try {
      const data = await fetch("/api/now-playing").then((r) => r.json());
      nowPlaying = data.track;
    } catch (e) {
      console.error(e);
      nowPlaying = null;
    } finally {
      isLoading = false;
    }
  });

  const hour = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Etc/GMT-2",
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<div class="container">
  <div class="title">
    <h1>hiya, i'm lamp!</h1>
    <p class="subtext">they/them // utc+2 (currently {hour} for me)</p>
  </div>
  <div class="pill">
    developer, eager learner and silly cat, specifically in that order
    <p class="subtext">
      <a href="https://github.com/sunnniee/" class="link" target="_blank"
        >github: sunnniee</a
      >
      {" "}|{" "}
      <a href="https://codeberg.org/sunnie" class="link" target="_blank"
        >codeberg: sunnie</a
      >
      {" "}|{" "}
      <a
        href="https://discord.com/users/406028027768733696"
        class="link"
        target="_blank">discord: @s.unnie</a
      >
      {" "}|{" "}
      <a href="https://vozer.cafe/@sunnie" class="link" target="_blank"
        >mastodon: @sunnie@vozer.cafe</a
      >
    </p>
  </div>
  <div class="grid">
    <div class="pill">
      <h2>technologies</h2>
      <div class="pill">
        <h3>good knowledge</h3>
        <HTMLLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <CSSLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <TSLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <ReactLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
      </div>
      <div class="pill">
        <h3>still learning</h3>
        <SvelteLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <CPPLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
      </div>
      <div class="pill">
        <h3>interested in</h3>
        <PythonLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <KotlinLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
      </div>
    </div>
    <div class="pill">
      <h2>
        <a
          class="link"
          target="_blank"
          href="https://www.last.fm/user/{data.username || 'lamp'}"
          >i'm currently listening to</a
        >
      </h2>
      <div class="pill listening">
        {#if isLoading}
          <img src={placeholder} alt="it's empty here" />
          <h3>loading</h3>
          <p class="subtext">there's gotta be cool stuff here</p>
        {:else if nowPlaying}
          <img src={nowPlaying.cover} alt="album cover" />
          <h3>
            {#if nowPlaying.link}
              <a
                class="link"
                target="_blank"
                href="https://song.link/{nowPlaying.link}"
                >{nowPlaying.songName}</a
              >
            {:else}
              {nowPlaying.songName}
            {/if}
          </h3>
          <p class="subtext">
            by {nowPlaying.artistName}{#if nowPlaying.albumName}
              {" "}- from {nowPlaying.albumName}{/if}
          </p>
        {:else}
          <img src={notplaying} alt="peace and quiet" />
          <h3>nothing</h3>
          <p class="subtext">rare case of touching grass?</p>
        {/if}
      </div>
    </div>
    <div class="pill">
      <h2>blog posts</h2>
      {#each data.posts as post}
        <a class="article" href="/blog/{post.slug}">
          <div class="pill">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p class="subtext">{post.date}</p>
          </div>
        </a>
      {/each}
    </div>
    <div class="pill">
      <h2>people i know</h2>
      <div class="avatars">
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    margin: 2rem min(8rem, 10vw);
    padding: 2rem;
    height: calc(100vh - 4rem);
    background-color: var(--container-bg);
    border: 1px solid var(--container-border);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
  }
  .subtext {
    font-size: 0.75rem;
    color: var(--subtext-color);
  }
  .pill {
    margin: 0.5rem;
    padding: 1rem;
    background-color: var(--pill-bg);
    border-radius: 16px;
    scrollbar-color: var(--container-border) var(--pill-bg);
  }
  .grid .pill {
    min-height: 0;
    overflow: auto;
  }
  .pill .pill {
    background-color: var(--pill-bg-hover);
  }
  .pill .listening {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0.5rem;
    grid-template-areas:
      "left top"
      "left bottom";
    img {
      border-radius: 16px;
      height: 6rem;
      aspect-ratio: 1 / 1;
      grid-area: left;
    }
    p {
      margin-top: 0;
    }
  }
  .subtext .link,
  .subtext .link:visited {
    color: var(--subtext-color);
  }
  .link,
  .link:visited {
    color: var(--text-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .pill .avatars {
    display: flex;
    flex-direction: row;
    img {
      border-radius: 16px;
      padding: 0.5rem;
      height: 4rem;
      aspect-ratio: 1 / 1;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0 1rem;
    grid-template-areas:
      "one two"
      "one three"
      "four three";
    flex-grow: 1;
    min-height: 0;
  }
  @media (max-width: 800px) {
    .container {
      height: unset;
    }
    .grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        "one"
        "three"
        "two"
        "four";
    }
    .pill {
      max-height: 65vh;
    }
  }
  .pill:nth-child(1) {
    grid-area: one;
  }
  .pill:nth-child(2) {
    grid-area: two;
  }
  .pill:nth-child(3) {
    grid-area: three;
  }
  .pill:nth-child(4) {
    grid-area: four;
  }
  .article,
  .article:visited {
    color: var(--text-color);
    text-decoration: none;
  }
</style>
