<<<<<<< HEAD
# LampDelivery Portfolio

## Overview
A personal portfolio website for LampDelivery, a developer who makes web stuff, mostly open source. Built with React frontend and Express backend, featuring a clean purple-themed design with vertex background animations.

## Project Architecture
- **Frontend**: React 19 with Vite, TailwindCSS 4, shadcn/ui components
- **Backend**: Express.js with TypeScript (tsx)
- **Database**: PostgreSQL with Drizzle ORM (using in-memory storage for users)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query

## Directory Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components (shadcn/ui)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and helpers
│   │   └── pages/       # Page components
│   └── public/          # Static assets
├── server/           # Express backend
│   ├── index.ts      # Main server entry
│   ├── routes.ts     # API routes
│   ├── static.ts     # Static file serving (production)
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev middleware
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle schema + Zod validation
└── script/           # Build scripts
    └── build.ts      # Production build script
```

## Development
- **Dev server**: `npm run dev` - Runs Express with Vite middleware on port 5000
- **Database**: `npm run db:push` - Push schema changes to PostgreSQL
- **Build**: `npm run build` - Build for production
- **Start**: `npm run start` - Run production build

## Configuration
- Vite configured with `allowedHosts: true` for Replit proxy compatibility
- Server binds to `0.0.0.0:5000`
- Database URL from `DATABASE_URL` environment variable

## Recent Changes
- 2024-12-18: Initial Replit import setup
  - Created PostgreSQL database
  - Installed missing nanoid dependency
  - Configured workflow for development
  - Set up deployment configuration
=======
# replit.md

## Overview

This is a personal portfolio/blog website built with SvelteKit. The site displays blog posts written in MDsveX (Markdown + Svelte), includes a "now playing" feature that shows currently playing music from Last.fm, and has a projects showcase page. The design uses the Catppuccin color palette with a custom Maple Mono font.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **SvelteKit 2** with **Svelte 5** - Modern full-stack framework with file-based routing
- **TypeScript** - Type safety throughout the codebase
- **MDsveX** - Enables writing blog posts in Markdown with embedded Svelte components

### Routing Structure
- `/` - Homepage that displays blog posts list
- `/blog` - Redirects to homepage (307 redirect)
- `/blog/[slug]` - Individual blog post pages loaded dynamically from `.svx` files
- `/projects` - Projects showcase page
- `/api/posts` - JSON endpoint returning all published posts
- `/api/now-playing` - JSON endpoint for Last.fm "now playing" data

### Content Management
- Blog posts are stored as `.svx` files in `src/posts/`
- Posts are loaded at build/request time using Vite's `import.meta.glob`
- Each post has frontmatter with: title, slug, description, date, categories, published flag
- Only posts with `published: true` are displayed

### Styling Approach
- CSS-in-file with Catppuccin color palette imported via CDN
- Custom Maple Mono font for code blocks (stored in `src/lib/assets/maple-mono/`)
- Shiki syntax highlighter with Catppuccin Mocha theme
- CSS reset for consistent cross-browser styling (`src/lib/css-reset.css`)
- Shared styles in `src/lib/shared.css`

### Build & Deployment
- Uses `@sveltejs/adapter-node` for Node.js server deployment
- Vite handles bundling and development server
- Development server runs on port 5000 with host `0.0.0.0`

### Icon System
- unplugin-icons with Svelte compiler for icon components
- Catppuccin icon set available (`@iconify-json/catppuccin`)

## External Dependencies

### APIs
- **Last.fm API** - Fetches currently playing track information
  - Requires `LASTFM_API_KEY` environment variable
  - Requires `LASTFM_USERNAME` environment variable
  - Implements 20-second caching to reduce API calls
- **iTunes API** - Fallback for album artwork and track metadata
- **Deezer API** - Additional fallback for album artwork and track metadata

### Environment Variables
- `LASTFM_API_KEY` - API key for Last.fm integration
- `LASTFM_USERNAME` - Username for Last.fm profile
- `DATABASE_URL` - Database connection string (available in environment, usage TBD)

### Static Assets
- Article assets stored in `/static/articleAssets/`
- Project images stored in `/static/images/`
- Placeholder cover image for tracks without artwork
>>>>>>> 5d5805f (Create a dedicated page for "my other stuff" and update navigation links)
