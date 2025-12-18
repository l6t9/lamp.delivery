# LampDelivery Portfolio

## Overview
A personal portfolio website for LampDelivery, built with React + Express full-stack architecture using Vite for development and bundling.

## Project Architecture

### Frontend
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Build Tool**: Vite

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (optional - uses in-memory storage by default)
- **Runtime**: tsx for development, esbuild for production bundling

### Project Structure
```
client/           - React frontend
  src/
    components/   - UI components (Radix-based)
    pages/        - Page components
    hooks/        - Custom React hooks
    lib/          - Utilities
  public/         - Static assets
server/           - Express backend
  index.ts        - Server entry point
  routes.ts       - API routes
  storage.ts      - Data storage interface
shared/           - Shared code between client/server
  schema.ts       - Database schema (Drizzle)
script/           - Build scripts
attached_assets/  - Asset files
```

## Development
- Run `npm run dev` to start the development server
- Server runs on port 5000 with Vite middleware for HMR

## Production

### Replit Deployment
- Run `npm run build` to build both client and server
- Run `npm run start` to start the production server

### Vercel Deployment
- Project is configured for Vercel deployment
- `vercel.json` - Configuration for Vercel
- `api/index.ts` - Serverless function for API routes
- Run `npm run build:vercel` to build for Vercel (or let Vercel handle it)
- Connect the repo to Vercel and it will auto-deploy

## Recent Changes
- December 18, 2025: Added Vercel deployment configuration
- December 18, 2025: Initial Replit environment setup
