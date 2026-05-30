globalThis.process ??= {}; globalThis.process.env ??= {};
import { a6 as createComponent, ak as renderComponent, ap as renderScript, at as renderTemplate, ah as maybeRenderHead, a1 as addAttribute } from '../chunks/astro/server_P2f8ZPe6.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DYHfp3sM.mjs';
import { g as getCollection } from '../chunks/_astro_content_OBpA8-3a.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog", ({ data }) => data.published)).sort(
    (first, second) => second.data.date.getTime() - first.data.date.getTime()
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "blog | lamp.delivery", "description": "Posts and notes from LampDelivery.", "pathname": "/blog", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="home" data-astro-cid-5tznm7mj> <section class="content-area" data-astro-cid-5tznm7mj> <div class="content-row" data-astro-cid-5tznm7mj> <div class="col-left" data-astro-cid-5tznm7mj> <div class="card" data-astro-cid-5tznm7mj> <span class="card-icon card-icon--alt" data-astro-cid-5tznm7mj> ${renderComponent($$result2, "m3e-shape", "m3e-shape", { "name": "6-sided-cookie", "class": "card-shape", "style": "--m3e-shape-container-color:var(--md-sys-color-secondary-container);--m3e-shape-size:40px;display:block", "data-astro-cid-5tznm7mj": true })} <span class="card-icon-inner" data-astro-cid-5tznm7mj><span class="material-symbols-outlined" data-astro-cid-5tznm7mj>article</span></span> </span> <h2 class="card-title" data-astro-cid-5tznm7mj>blog</h2> <p class="muted intro" data-astro-cid-5tznm7mj>short posts, notes, and anything else that feels worth keeping around.</p> <div class="link-list" data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<a class="link-row"${addAttribute(`/blog/${post.slug}`, "href")} data-astro-cid-5tznm7mj> <div data-astro-cid-5tznm7mj> <b data-astro-cid-5tznm7mj>${post.data.title}</b> <span class="muted-2" data-astro-cid-5tznm7mj>${post.data.description}</span> </div> <span class="muted-2 link-date" data-astro-cid-5tznm7mj>${post.data.date.toLocaleDateString("en-GB")}</span> </a>`)} ${posts.length === 0 ? renderTemplate`<p class="muted-2" style="padding:8px 12px" data-astro-cid-5tznm7mj>nothing published yet.</p>` : null} </div> <a class="card-footer-link" href="/" data-astro-cid-5tznm7mj>back home <span class="material-symbols-outlined" style="font-size:16px" data-astro-cid-5tznm7mj>chevron_forward</span></a> </div> <div class="col-right" data-astro-cid-5tznm7mj> <!-- right column intentionally left blank for blog index --> </div> </div> </div></section> </main> ` })} ${renderScript($$result, "/home/lampu/lamp.delivery/lamp.delivery/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts")}  `;
}, "/home/lampu/lamp.delivery/lamp.delivery/src/pages/blog/index.astro", void 0);

const $$file = "/home/lampu/lamp.delivery/lamp.delivery/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
