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
    timeZone: "Etc/GMT+5",
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<div class="container">
  <div class="title">
    <div class="profile-header">
      <div class="avatar-container">
        <img src="https://github.com/LampDelivery.png" alt="LampDelivery" class="avatar" />
      </div>
      <div>
        <h1>heya, i'm lamp!</h1>
        <p class="subtext">any/all // utc-5 (currently {hour} for me) // <a href="/other-stuff" class="link">my other stuff</a></p>
      </div>
    </div>
  </div>
  <div class="pill">
    developer and <i>silly</i> person
    <div class="social-links">
      <a href="https://github.com/LampDelivery" class="social-btn" target="_blank">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
        github: LampDelivery
      </a>
      <a href="https://codeberg.org/LampDelivery" class="social-btn" target="_blank">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
        codeberg: LampDelivery
      </a>
      <a href="https://discord.com/users/406028027768733696" class="social-btn" target="_blank">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.0371A19.7363 19.7363 0 0 0 3.677 4.3698a.0699.0699 0 0 0-.0321.0277C.5334 8.0872-.319 11.737 0 15.3452a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276c-.598.3428-1.2205.6447-1.8733.8923a.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5218 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-8.797-3.5485-10.9484a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1835 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0957 2.1568 2.4189 0 1.3333-.9555 2.419-2.1569 2.419Zm7.9748 0c-1.1836 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0957 2.1568 2.4189 0 1.3333-.946 2.419-2.1568 2.419Z"/></svg>
        discord: @lampdelivery
      </a>
      <a href="https://youtube.com/@LampDelivery" class="social-btn" target="_blank">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.344 0 12 0 12s0 3.656.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.656 24 12 24 12s0-3.656-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        youtube: LampDelivery
      </a>
    </div>
    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .social-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--pill-bg-hover, #28223a);
      color: var(--text-color);
      border: none;
      border-radius: 8px;
      padding: 0.4rem 0.9rem;
      font-size: 1rem;
      font-family: inherit;
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
      cursor: pointer;
    }
    .social-btn:hover {
      background: var(--pill-bg, #3a3350);
      color: var(--primary, #a78bfa);
    }
    .icon {
      width: 1.2em;
      height: 1.2em;
      display: inline-block;
      vertical-align: middle;
    }
  </div>
  <div class="grid">
    <div class="pill">
      <h2>languages</h2>
      <div class="pill">
        <h3>stuff i type</h3>
        <KotlinLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <TSLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <ReactLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
        <PythonLogo style="font-size: 1.5rem; margin-top: 0.5rem" />
      </div>
      <div class="pill">
        <h3>stuff i speak</h3>
        <p>english & french</p>
      </div>
    </div>
    <div class="pill">
      <h2>
        <a
          class="link"
          target="_blank"
          href="https://www.last.fm/user/Lmpamapa"
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
        <a href="https://ushie.dev" target="_blank">
          <img src="https://github.com/Ushie.png" alt="Ushie" />
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    margin: 2rem auto;
    max-width: 2000px;
    width: calc(100% - 4rem);
    padding: 2rem;
    height: auto;
    min-height: calc(100vh - 4rem);
    background-color: var(--container-bg);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
  }
  .header-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }
  .nav-link:hover {
    text-decoration: underline;
  }
  .nav-link.active {
    font-weight: bold;
    text-decoration: underline;
  }
  .subtext {
    font-size: 0.75rem;
    color: var(--subtext-color);
  }
  .profile-header {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .social-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--pill-bg-hover, #28223a);
    color: var(--text-color);
    border: none;
    border-radius: 8px;
    padding: 0.4rem 0.9rem;
    font-size: 1rem;
    font-family: inherit;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
  }
  .social-btn:hover {
    background: var(--pill-bg, #3a3350);
    color: var(--primary, #a78bfa);
  }
  .icon {
    width: 1.2em;
    height: 1.2em;
    display: inline-block;
    vertical-align: middle;
  }
  .avatar-container {
    width: 6rem;
    height: 6rem;
    min-width: 6rem;
    min-height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    background: var(--container-bg, #18141f);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
    border: 2px solid var(--pill-bg-hover, #fff3);
    margin-left: 0;
  }
  .avatar-container .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
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
  }
  .pill .listening img {
    border-radius: 16px;
    height: 6rem;
    aspect-ratio: 1 / 1;
    grid-area: left;
  }
  .pill .listening p {
    margin-top: 0;
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
  .pill .avatars img {
    border-radius: 16px;
    padding: 0.5rem;
    height: 4rem;
    aspect-ratio: 1 / 1;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0 1rem;
    grid-template-areas:
      "one two"
      "one three"
      "four three"
      "five five";
    flex-grow: 1;
    min-height: 0;
  }
  @media (max-width: 800px) {
    .container {
      margin: 1rem auto;
      padding: 1rem;
      height: auto;
      min-height: 100vh;
      max-width: calc(100% - 2rem);
    }
    .grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        "one"
        "three"
        "two"
        "four"
        "five";
    }
    .pill {
      max-height: none;
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
  .pill:nth-child(5) {
    grid-area: five;
  }
  .article,
  .article:visited {
    color: var(--text-color);
    text-decoration: none;
  }
  .previews-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
  @media (max-width: 600px) {
    .previews-container {
      grid-template-columns: 1fr;
    }
  }
  .website-preview {
    display: flex;
    flex-direction: column;
    background-color: var(--pill-bg);
    padding: 1rem;
    border-radius: 16px;
  }
  .preview-box {
    background-color: var(--pill-bg-hover);
    border-radius: 8px;
    aspect-ratio: 16 / 9;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    overflow: hidden;
  }
  .preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .website-preview .link {
    display: flex;
    flex-direction: column;
    text-align: center;
    text-decoration: none;
    color: var(--text-color);
  }
  .website-preview .link:hover span {
    text-decoration: underline;
  }
</style>
