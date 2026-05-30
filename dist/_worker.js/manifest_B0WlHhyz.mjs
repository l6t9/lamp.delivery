globalThis.process ??= {}; globalThis.process.env ??= {};
import { a9 as decodeKey } from './chunks/astro/server_CEX0AJg6.mjs';
import './chunks/astro-designed-error-pages_CNPVr-S2.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BQNKz5Q9.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/lampu/lamp.delivery/lamp.delivery/","cacheDir":"file:///home/lampu/lamp.delivery/lamp.delivery/node_modules/.astro/","outDir":"file:///home/lampu/lamp.delivery/lamp.delivery/dist/","srcDir":"file:///home/lampu/lamp.delivery/lamp.delivery/src/","publicDir":"file:///home/lampu/lamp.delivery/lamp.delivery/public/","buildClientDir":"file:///home/lampu/lamp.delivery/lamp.delivery/dist/","buildServerDir":"file:///home/lampu/lamp.delivery/lamp.delivery/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/@astrojs+cloudflare@12.6.13_astro@5.18.2/node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/now-playing.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/now-playing\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"now-playing.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/now-playing.json.ts","pathname":"/api/now-playing.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/posts.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/posts\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"posts.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/posts.json.ts","pathname":"/api/posts.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BmC2Rb7G.css"},{"type":"inline","content":".page[data-astro-cid-5tznm7mj]{display:flex;flex-direction:column;gap:var(--home-gap, 24px)}.intro[data-astro-cid-5tznm7mj]{max-width:56ch}.link-date[data-astro-cid-5tznm7mj]{white-space:nowrap}@media(max-width:720px){.link-date[data-astro-cid-5tznm7mj]{white-space:normal}}\n"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BmC2Rb7G.css"},{"type":"inline","content":".page[data-astro-cid-kqm3pyv3]{display:flex;flex-direction:column;gap:var(--home-gap, 24px)}.intro[data-astro-cid-kqm3pyv3]{max-width:56ch}\n"}],"routeData":{"route":"/other-stuff","isIndex":false,"type":"page","pattern":"^\\/other-stuff\\/?$","segments":[[{"content":"other-stuff","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/other-stuff.astro","pathname":"/other-stuff","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BmC2Rb7G.css"},{"type":"inline","content":".page[data-astro-cid-aid3sr62]{display:flex;flex-direction:column;gap:var(--home-gap, 24px)}.intro[data-astro-cid-aid3sr62]{max-width:56ch}.inner-grid[data-astro-cid-aid3sr62]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.inner-card[data-astro-cid-aid3sr62]{display:flex;flex-direction:column;gap:12px;padding:0;background:var(--md-sys-color-surface-container-low);border-radius:16px;text-decoration:none;overflow:hidden;transition:background .2s ease}.inner-card[data-astro-cid-aid3sr62]:hover{background:var(--md-sys-color-surface-container-high)}.inner-card-img[data-astro-cid-aid3sr62]{width:100%;aspect-ratio:16 / 9;object-fit:cover;display:block}.inner-card-body[data-astro-cid-aid3sr62]{display:flex;flex-direction:column;gap:2px;padding:0 14px 14px}.inner-card-body[data-astro-cid-aid3sr62]>b[data-astro-cid-aid3sr62]{font-family:Google Sans Flex,system-ui,sans-serif;font-weight:500;font-size:.95rem}.inner-card-body[data-astro-cid-aid3sr62]>span[data-astro-cid-aid3sr62]{font-size:.8rem}@media(max-width:720px){.inner-grid[data-astro-cid-aid3sr62]{grid-template-columns:1fr}}\n"}],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BmC2Rb7G.css"},{"type":"external","src":"/_astro/index.BO2NtUhX.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://lamp.delivery","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/lampu/lamp.delivery/lamp.delivery/src/pages/api/posts.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/api/posts.json@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/lampu/lamp.delivery/lamp.delivery/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/lampu/lamp.delivery/lamp.delivery/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/lampu/lamp.delivery/lamp.delivery/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/lampu/lamp.delivery/lamp.delivery/src/pages/other-stuff.astro",{"propagation":"none","containsHead":true}],["/home/lampu/lamp.delivery/lamp.delivery/src/pages/projects.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/.pnpm/@astrojs+cloudflare@12.6.13_astro@5.18.2/node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/now-playing.json@_@ts":"pages/api/now-playing.json.astro.mjs","\u0000@astro-page:src/pages/api/posts.json@_@ts":"pages/api/posts.json.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/other-stuff@_@astro":"pages/other-stuff.astro.mjs","\u0000@astro-page:src/pages/projects@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B0WlHhyz.mjs","/home/lampu/lamp.delivery/lamp.delivery/node_modules/.pnpm/unstorage@1.17.5/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/home/lampu/lamp.delivery/lamp.delivery/node_modules/.pnpm/astro@5.18.2_typescript@5.9.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B_EzDEO3.mjs","/home/lampu/lamp.delivery/lamp.delivery/.astro/content-assets.mjs":"chunks/content-assets_XqCgPAV2.mjs","/home/lampu/lamp.delivery/lamp.delivery/.astro/content-modules.mjs":"chunks/content-modules_Bvq7llv8.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CLFHUDsd.mjs","/home/lampu/lamp.delivery/lamp.delivery/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.B6lxGJm4.js","/home/lampu/lamp.delivery/lamp.delivery/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.BEkNY6lu.js","/home/lampu/lamp.delivery/lamp.delivery/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BX3RtVI4.js","/home/lampu/lamp.delivery/lamp.delivery/src/pages/blog/[slug].astro?astro&type=script&index=0&lang.ts":"_astro/_slug_.astro_astro_type_script_index_0_lang.Dgwc7pnx.js","/home/lampu/lamp.delivery/lamp.delivery/src/pages/other-stuff.astro?astro&type=script&index=0&lang.ts":"_astro/other-stuff.astro_astro_type_script_index_0_lang.Dgwc7pnx.js","/home/lampu/lamp.delivery/lamp.delivery/src/pages/projects.astro?astro&type=script&index=0&lang.ts":"_astro/projects.astro_astro_type_script_index_0_lang.Dgwc7pnx.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/placeholder.Zl1ZCRnR.png","/_astro/favicon.uoSESITw.png","/_astro/bold.CHjR5eoA.woff2","/_astro/regular.C5QbKxa2.woff2","/_astro/italic.DC_9DrNr.woff2","/_astro/bold-italic.Bxtma2Ve.woff2","/_astro/_slug_.BmC2Rb7G.css","/_astro/index.BO2NtUhX.css","/robots.txt","/test.txt","/_astro/BaseLayout.astro_astro_type_script_index_0_lang.BEkNY6lu.js","/_astro/_slug_.astro_astro_type_script_index_0_lang.Dgwc7pnx.js","/_astro/core.VxRkt30n.js","/_astro/index.astro_astro_type_script_index_0_lang.B6lxGJm4.js","/_astro/index.astro_astro_type_script_index_0_lang.BX3RtVI4.js","/_astro/other-stuff.astro_astro_type_script_index_0_lang.Dgwc7pnx.js","/_astro/projects.astro_astro_type_script_index_0_lang.Dgwc7pnx.js","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/images/ado-1.jpg","/images/ado-2.png","/images/ado-3.png","/images/ado.jpg","/images/blood-cultures-1.png","/images/blood-cultures-2.png","/images/blood-cultures.jpg","/images/image.png","/images/lumibot-preview.jpg","/images/metrolist-banner.png","/images/raincord-banner.png","/articleAssets/example/image.webp","/_worker.js/_astro/_slug_.BmC2Rb7G.css","/_worker.js/_astro/bold-italic.Bxtma2Ve.woff2","/_worker.js/_astro/bold.CHjR5eoA.woff2","/_worker.js/_astro/favicon.uoSESITw.png","/_worker.js/_astro/index.BO2NtUhX.css","/_worker.js/_astro/italic.DC_9DrNr.woff2","/_worker.js/_astro/placeholder.Zl1ZCRnR.png","/_worker.js/_astro/regular.C5QbKxa2.woff2","/_worker.js/chunks/BaseLayout_41-K2brm.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_58isFfGV.mjs","/_worker.js/chunks/_astro_assets_BMHlg-Jy.mjs","/_worker.js/chunks/_astro_content_BiOB4FPC.mjs","/_worker.js/chunks/_astro_data-layer-content_CLFHUDsd.mjs","/_worker.js/chunks/astro-designed-error-pages_CNPVr-S2.mjs","/_worker.js/chunks/astro_YrVlvjBQ.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/consts_CBOg0Lc-.mjs","/_worker.js/chunks/content-assets_XqCgPAV2.mjs","/_worker.js/chunks/content-modules_Bvq7llv8.mjs","/_worker.js/chunks/index_BsFUii3l.mjs","/_worker.js/chunks/noop-middleware_BQNKz5Q9.mjs","/_worker.js/chunks/nowPlaying_DRuEMYC_.mjs","/_worker.js/chunks/parse_DSt6RPqT.mjs","/_worker.js/chunks/path_y9gdWwIq.mjs","/_worker.js/chunks/remote_CVXTZJrr.mjs","/_worker.js/chunks/sharp_B_EzDEO3.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/blog.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/other-stuff.astro.mjs","/_worker.js/pages/projects.astro.mjs","/_worker.js/chunks/astro/server_CEX0AJg6.mjs","/_worker.js/pages/api/now-playing.json.astro.mjs","/_worker.js/pages/api/posts.json.astro.mjs","/_worker.js/pages/blog/_slug_.astro.mjs"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"Ap0ttExJgi63lyArxL/euWa6kSAiIySfbS4loMbbKMY=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
