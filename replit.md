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
