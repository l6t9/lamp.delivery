globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineMiddleware, s as sequence } from './chunks/index_5vPfGvLs.mjs';
import './chunks/astro-designed-error-pages_Daakuui7.mjs';
import './chunks/astro/server_P2f8ZPe6.mjs';

const onRequest$2 = defineMiddleware((context, next) => {
  const host = context.request.headers.get("host") || context.url.hostname;
  if (host.startsWith("cord.")) {
    const url = new URL(context.request.url);
    if (url.pathname === "/") {
      return context.rewrite("/cord");
    }
    if (!url.pathname.startsWith("/cord") && !url.pathname.startsWith("/api") && !url.pathname.startsWith("/_")) {
      return context.rewrite(`/cord${url.pathname}`);
    }
  }
  return next();
});

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	onRequest$2
	
);

export { onRequest };
