import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const host = context.request.headers.get('host') || context.url.hostname;

  if (host.startsWith('cord.')) {
    const url = new URL(context.request.url);
    if (url.pathname === '/') {
      return context.rewrite('/cord');
    }
    if (
      !url.pathname.startsWith('/cord') &&
      !url.pathname.startsWith('/api') &&
      !url.pathname.startsWith('/_')
    ) {
      return context.rewrite(`/cord${url.pathname}`);
    }
  }

  return next();
});
