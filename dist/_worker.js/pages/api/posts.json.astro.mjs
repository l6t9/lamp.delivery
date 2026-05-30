globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getCollection } from '../../chunks/_astro_content_OBpA8-3a.mjs';
export { renderers } from '../../renderers.mjs';

async function GET() {
  const posts = (await getCollection("blog", ({ data }) => data.published)).sort((first, second) => second.data.date.getTime() - first.data.date.getTime()).map((post) => ({
    title: post.data.title,
    slug: post.slug,
    description: post.data.description,
    date: post.data.date.toISOString(),
    categories: post.data.categories,
    published: post.data.published
  }));
  return new Response(JSON.stringify(posts), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
