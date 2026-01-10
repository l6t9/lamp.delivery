# replit.md

## Overview

This is a personal portfolio/blog website built with SvelteKit. The site displays blog posts written in MDsveX (Markdown + Svelte), includes a "now playing" feature that shows currently playing music via Last.fm integration, and uses the Catppuccin Mocha color scheme throughout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **SvelteKit 2** with **Svelte 5** - Modern full-stack framework with file-based routing
- **TypeScript** - Type safety throughout the codebase
- **MDsveX** - Enables writing blog posts in Markdown with Svelte components embedded

### Routing Structure
- `/` - Homepage that displays blog posts list
- `/blog` - Redirects to homepage (307 redirect)
- `/blog/[slug]` - Individual blog post pages loaded dynamically from `.svx` files
- `/api/posts` - JSON endpoint returning all published posts
- `/api/now-playing` - JSON endpoint for Last.fm "now playing" data

### Content Management
- Blog posts are stored as `.svx` files in `src/posts/`
- Posts are loaded at build/request time using Vite's `import.meta.glob`
- Each post has frontmatter with: title, slug, description, date, categories, published flag

### Styling Approach
- CSS-in-file with Catppuccin color palette imported via CDN
- Custom Maple Mono font for code blocks
- Shiki syntax highlighter with Catppuccin Mocha theme
- CSS reset for consistent cross-browser styling

### Build & Deployment
- Uses `@sveltejs/adapter-node` for Node.js server deployment
- Vite handles bundling and development server
- Development server runs on port 5000

### Icon System
- unplugin-icons with Svelte compiler for icon components
- Catppuccin icon set available (`@iconify-json/catppuccin`)

## External Dependencies

### APIs
- **Last.fm API** - Fetches currently playing track information (requires `LASTFM_API_KEY` environment variable)
- **iTunes/Deezer APIs** - Used as fallbacks for album artwork and track metadata

### Environment Variables
- `LASTFM_API_KEY` - Required for now-playing functionality
- `DATABASE_URL` - Present in environment (PostgreSQL connection, may be used for future features)

### Third-Party Services
- Catppuccin CSS palette via jsDelivr CDN
- Font files served locally from `$lib/assets/maple-mono/`