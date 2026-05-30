globalThis.process ??= {}; globalThis.process.env ??= {};
import { a5 as createComponent, aj as renderComponent, ao as renderScript, as as renderTemplate, ag as maybeRenderHead } from '../chunks/astro/server_CEX0AJg6.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_41-K2brm.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "projects | lamp.delivery", "description": "Selected projects from LampDelivery.", "pathname": "/projects", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="page" data-astro-cid-aid3sr62> <div class="card" data-astro-cid-aid3sr62> <span class="card-icon card-icon--alt" data-astro-cid-aid3sr62> <span class="material-symbols-outlined" data-astro-cid-aid3sr62>package_2</span> </span> <h2 class="card-title" data-astro-cid-aid3sr62>projects</h2> <p class="muted intro" data-astro-cid-aid3sr62>a small set of things I've worked on that are worth showing.</p> <div class="inner-grid" data-astro-cid-aid3sr62> <a class="inner-card" href="https://metrolist.cc" target="_blank" rel="noreferrer" data-astro-cid-aid3sr62> <img src="/images/metrolist-banner.png" alt="" class="inner-card-img" data-astro-cid-aid3sr62> <div class="inner-card-body" data-astro-cid-aid3sr62> <b data-astro-cid-aid3sr62>Metrolist</b> <span class="muted-2" data-astro-cid-aid3sr62>YouTube Music client for Android</span> </div> </a> <a class="inner-card" href="https://github.com/Aliucord/LumiBot" target="_blank" rel="noreferrer" data-astro-cid-aid3sr62> <img src="/images/lumibot-preview.jpg" alt="" class="inner-card-img" data-astro-cid-aid3sr62> <div class="inner-card-body" data-astro-cid-aid3sr62> <b data-astro-cid-aid3sr62>LumiBot</b> <span class="muted-2" data-astro-cid-aid3sr62>Utility bot for Aliucord's Discord server</span> </div> </a> </div> <a class="card-footer-link" href="/" data-astro-cid-aid3sr62>back home <span class="material-symbols-outlined" style="font-size:16px" data-astro-cid-aid3sr62>chevron_forward</span></a> </div> </main> ` })} ${renderScript($$result, "/home/lampu/lamp.delivery/lamp.delivery/src/pages/projects.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/lampu/lamp.delivery/lamp.delivery/src/pages/projects.astro", void 0);

const $$file = "/home/lampu/lamp.delivery/lamp.delivery/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
