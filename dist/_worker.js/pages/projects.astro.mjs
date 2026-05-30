globalThis.process ??= {}; globalThis.process.env ??= {};
import { a6 as createComponent, ak as renderComponent, ap as renderScript, at as renderTemplate, ah as maybeRenderHead } from '../chunks/astro/server_P2f8ZPe6.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DYHfp3sM.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "projects | lamp.delivery", "description": "Selected projects from LampDelivery.", "pathname": "/projects", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="home" data-astro-cid-aid3sr62> <section class="content-area" data-astro-cid-aid3sr62> <div class="content-row" data-astro-cid-aid3sr62> <div class="col-left" data-astro-cid-aid3sr62> <div class="card" data-astro-cid-aid3sr62> <span class="card-icon card-icon--alt" data-astro-cid-aid3sr62> ${renderComponent($$result2, "m3e-shape", "m3e-shape", { "name": "8-leaf-clover", "class": "card-shape", "style": "--m3e-shape-container-color:var(--md-sys-color-secondary-container);--m3e-shape-size:40px;display:block", "data-astro-cid-aid3sr62": true })} <span class="card-icon-inner" data-astro-cid-aid3sr62><span class="material-symbols-outlined" data-astro-cid-aid3sr62>package_2</span></span> </span> <h2 class="card-title" data-astro-cid-aid3sr62>projects</h2> <p class="muted intro" data-astro-cid-aid3sr62>a small set of things I've worked on that are worth showing.</p> <div class="inner-grid" data-astro-cid-aid3sr62> <a class="inner-card" href="https://metrolist.cc" target="_blank" rel="noreferrer" data-astro-cid-aid3sr62> <img src="/images/metrolist-banner.png" alt="" class="inner-card-img" data-astro-cid-aid3sr62> <div class="inner-card-body" data-astro-cid-aid3sr62> <b data-astro-cid-aid3sr62>Metrolist</b> <span class="muted-2" data-astro-cid-aid3sr62>YouTube Music client for Android</span> </div> </a> <a class="inner-card" href="https://github.com/Aliucord/LumiBot" target="_blank" rel="noreferrer" data-astro-cid-aid3sr62> <img src="/images/lumibot-preview.jpg" alt="" class="inner-card-img" data-astro-cid-aid3sr62> <div class="inner-card-body" data-astro-cid-aid3sr62> <b data-astro-cid-aid3sr62>LumiBot</b> <span class="muted-2" data-astro-cid-aid3sr62>Utility bot for Aliucord's Discord server</span> </div> </a> </div> <a class="card-footer-link" href="/" data-astro-cid-aid3sr62>back home <span class="material-symbols-outlined" style="font-size:16px" data-astro-cid-aid3sr62>chevron_forward</span></a> </div> <div class="col-right" data-astro-cid-aid3sr62> <!-- right column intentionally left blank for projects page --> </div> </div> </div></section> </main> ` })} ${renderScript($$result, "/home/lampu/lamp.delivery/lamp.delivery/src/pages/projects.astro?astro&type=script&index=0&lang.ts")}  `;
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
