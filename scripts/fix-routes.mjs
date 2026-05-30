import fs from 'fs';
import path from 'path';

// For Cloudflare Workers (not Pages), we need to serve all requests through the Worker
const routesPath = path.join(process.cwd(), 'dist', '_routes.json');

const routes = {
  version: 1,
  include: ['/*'],
  exclude: []
};

fs.writeFileSync(routesPath, JSON.stringify(routes, null, 2) + '\n');
console.log('✓ Updated _routes.json for Worker mode (all requests through Worker)');
