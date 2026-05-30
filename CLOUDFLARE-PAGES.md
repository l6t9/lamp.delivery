Cloudflare Pages — Deployment Guide

This document covers connecting this repo to Cloudflare Pages and the DNS choices for Porkbun.

Build settings
- Framework: None (Static site)
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: `dist`
- Node version: use the default Pages runtime (LTS). If you need a specific Node version, add an `engines.node` field to `package.json` or a `.node-version` file.

Environment variables (important)
- Add `LASTFM_API_KEY` and `LASTFM_USERNAME` in Pages > Project Settings > Environment Variables (both Production and Preview if desired). These are used at build time by `getNowPlaying()`.

Cloudflare Pages setup steps
1. In the Cloudflare dashboard, go to Pages and "Create a project".
2. Connect your GitHub repo `l6t9/lamp.delivery` and select the `main` branch.
3. Set the Build settings as listed above and save.
4. Deploy. After the first deploy you'll get a `https://<project>.pages.dev` URL.

GitHub Actions (optional, automated deploy)
- I added a GitHub Actions workflow `.github/workflows/deploy-cloudflare-pages.yml` that builds and deploys on push to `main` using `cloudflare/pages-action`.
- Before the Action will deploy, add these repository Secrets (Repository Settings → Secrets → Actions):
  - `CF_API_TOKEN` — Cloudflare API token with Pages:Edit permission and Account:Read
  - `CF_ACCOUNT_ID` — your Cloudflare account ID
  - `CF_PROJECT_NAME` — the Pages project name (the slug/name you chose in the Pages dashboard)

This workflow will run `pnpm install` and `pnpm build`, then upload `./dist` to Cloudflare Pages.

Custom domain / Porkbun notes
Option A — Keep DNS at Porkbun (recommended if you don't want to change nameservers)
- For a subdomain (e.g. `www.example.com`): in Pages -> Custom Domains -> add `www.example.com`. Pages will show a validation target like `<project>.pages.dev` or a TXT/CNAME to add. In Porkbun create a CNAME:
  - Host: `www`
  - Type: `CNAME`
  - Value: the target Cloudflare Pages hostname (e.g. `<project>.pages.dev`)
  - TTL: default
- For the apex domain (`example.com`) many registrars don't allow CNAME on the apex. Cloudflare Pages supports ANAME/ALIAS or you can keep DNS at Porkbun and use an "ALIAS" record if Porkbun supports it. If Porkbun does not support ALIAS/ANAME, you'll need to move nameservers to Cloudflare (Option B) or create A records Cloudflare recommends (they may change), so moving nameservers is the easiest for apex.

Option B — Move nameservers to Cloudflare (recommended for full integration and easiest SSL)
- In Cloudflare dashboard add your domain and follow prompts to change nameservers at Porkbun to the ones Cloudflare gives.
- After nameserver change, add the domain to Pages and Cloudflare will handle routing and SSL automatically.

Notes about `nowPlaying`
- `getNowPlaying()` runs at build-time (top-level `await` in `src/pages/index.astro`). That means the "what I'm listening to" section is populated during builds. If you want it to update in near-real-time, I can update the site to fetch at runtime via Pages Functions or client-side JS + an API.

Troubleshooting
- If the build fails on Cloudflare with install errors, ensure the project uses `pnpm` and set the Install command to `pnpm install` (and `pnpm` is available in Pages builder). If not, change to `npm ci` and adjust lockfile accordingly.
- If you see missing builder errors (like with Vercel), those are Vercel-specific — Cloudflare will not try to install `@astrojs/vercel`.

Want me to:
- Create this file (done).
- Prepare a PR that removes `@astrojs/vercel` from `devDependencies` (optional) to avoid confusion.
- Update the site so `nowPlaying` is fetched at runtime instead of build-time.

If you pick a domain and whether you want to keep DNS at Porkbun or switch to Cloudflare nameservers, I can provide the exact DNS records and step-by-step UI clicks for Porkbun.

Avoiding Cloudflare's repo build (submodule failures)

- If your Pages project is connected to the GitHub repo, Pages will try to clone and build the repo itself. If that clone attempts to update submodules that are private or unavailable, Pages' build can fail with "error occurred while updating repository submodules".
- Two ways to avoid this:
  1. Use the GitHub Actions workflow added to this repo (recommended):
    - Disconnect the repository from the Pages project (Pages → Settings → Disconnect repository) so Cloudflare won't attempt to clone and build the repo.
    - The GitHub Actions workflow will build and deploy the `dist` output directly to Pages via the Pages API, avoiding Cloudflare's clone step entirely.
  2. Allow Pages to fetch submodules:
    - Make sure any submodules are public or accessible to Cloudflare (or provide credentials).
    - In Pages settings, disable submodule recursion if possible, or provide the required credentials for private submodules.

If you'd like, I can disconnect the Pages repo for you (I'll guide you through the UI clicks), or walk through the Cloudflare UI steps for your domain.

GitHub Pages (alternative)

- I added a `deploy-github-pages.yml` workflow to build and deploy the `dist` output to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
- To use GitHub Pages with the custom domain `lamp.delivery` on Cloudflare, follow these steps:
  1. In the GitHub repo, go to Settings → Pages and set the source to the `gh-pages` branch (root). GitHub will serve the site from `https://<owner>.github.io/<repo>/` or your custom domain.
  2. Add the custom domain in Pages settings: enter `lamp.delivery` as the custom domain. Alternatively set it via the repo secret `CUSTOM_DOMAIN` (see below) and the workflow will create `dist/CNAME` during deploy.
  3. DNS on Cloudflare (set records to DNS-only / grey cloud during verification):
     - For the apex `lamp.delivery` add these A records (all DNS-only):
       - `A` host: `@` value: `185.199.108.153`
       - `A` host: `@` value: `185.199.109.153`
       - `A` host: `@` value: `185.199.110.153`
       - `A` host: `@` value: `185.199.111.153`
     - For `www.lamp.delivery` add a `CNAME` record (DNS-only):
       - `CNAME` host: `www` value: `<your-github-username>.github.io`
     - Keep these records DNS-only (grey cloud) until GitHub Pages finishes provisioning the certificate for `lamp.delivery`.
  4. After Pages issues the TLS certificate, verify the site at `https://lamp.delivery`.

Notes and convenience commands
- Add repository secret `CUSTOM_DOMAIN` (value `lamp.delivery`) in GitHub to let the workflow automatically create `dist/CNAME` during deploy. You can add it via the web UI or the `gh` CLI:

```bash
gh secret set CUSTOM_DOMAIN --body "lamp.delivery"
gh secret set LASTFM_API_KEY --body "<your-lastfm-api-key>"
gh secret set LASTFM_USERNAME --body "<your-lastfm-username>"
gh secret set CF_API_TOKEN --body "<your-cloudflare-api-token>"
gh secret set CF_ACCOUNT_ID --body "<your-cloudflare-account-id>"
gh secret set CF_PROJECT_NAME --body "<your-pages-project-name>"
```

- The GitHub Actions deployment uses `GITHUB_TOKEN` to push to `gh-pages` automatically.