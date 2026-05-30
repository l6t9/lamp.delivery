globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getNowPlaying } from '../../chunks/nowPlaying__pUWJ_fL.mjs';
export { renderers } from '../../renderers.mjs';

async function GET() {
  const track = await getNowPlaying();
  return new Response(JSON.stringify({ track }), {
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
