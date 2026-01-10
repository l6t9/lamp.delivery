<script lang="ts">
  import { onMount } from "svelte";
  import type { TrackInfo } from "$lib";

  const hour = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Etc/GMT+5",
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<div class="container">
  <div class="title">
    <div class="profile-header">
      <img src="https://github.com/LampDelivery.png" alt="LampDelivery" class="avatar" />
      <div>
        <h1>my other stuff</h1>
        <p class="subtext">things i've worked on // {hour} for me // <a href="/" class="link">home</a></p>
      </div>
    </div>
  </div>

  <div class="pill">
    <div class="previews-container">
      <div class="website-preview">
        <a href="https://raincord.dev" class="link" target="_blank">
          <div class="preview-box raincord">
            <img src="/images/raincord-banner.png" alt="raincord.dev" class="preview-img" />
          </div>
          <span>raincord.dev</span>
        </a>
      </div>
      <div class="website-preview">
        <a href="https://github.com/Aliucord/LumiBot" class="link" target="_blank">
          <div class="preview-box lumibot">
            <img src="/images/lumibot-preview.jpg" alt="lumibot" class="preview-img" />
          </div>
          <span>lumibot</span>
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
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .profile-header .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .pill {
    margin: 0.5rem;
    padding: 1rem;
    background-color: var(--pill-bg);
    border-radius: 16px;
  }
  .link,
  .link:visited {
    color: var(--text-color);
    text-decoration: none;
  }
  .previews-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 0.5rem;
  }
  @media (max-width: 800px) {
    .container {
      margin: 1rem auto;
      padding: 1rem;
      max-width: calc(100% - 2rem);
    }
    .previews-container {
      grid-template-columns: 1fr;
    }
  }
  .website-preview {
    display: flex;
    flex-direction: column;
    background-color: var(--pill-bg-hover);
    padding: 1.5rem;
    border-radius: 16px;
  }
  .preview-box {
    background-color: var(--pill-bg);
    border-radius: 8px;
    aspect-ratio: 16 / 9;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
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
    font-size: 1.1rem;
    font-weight: 500;
  }
  .website-preview .link:hover span {
    text-decoration: underline;
  }
</style>
