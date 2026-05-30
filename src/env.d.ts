/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly LASTFM_API_KEY?: string;
  readonly LASTFM_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}