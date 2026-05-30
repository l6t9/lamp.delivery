globalThis.process ??= {}; globalThis.process.env ??= {};
import { a4 as createAstro, a5 as createComponent, a0 as addAttribute, al as renderHead, aj as renderComponent, ao as renderScript, as as renderTemplate, aq as renderSlot } from './astro/server_CEX0AJg6.mjs';
/* empty css                          */

const favicon = new Proxy({"src":"/_astro/favicon.uoSESITw.png","width":128,"height":128,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/lampu/lamp.delivery/lamp.delivery/src/lib/assets/favicon.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro("https://lamp.delivery");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "lamp",
    description = "just making stuff",
    type = "website",
    pathname = "/"
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon"${addAttribute(favicon.src, "href")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type"${addAttribute(type, "content")}><meta name="theme-color" content="#1c1b1f"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght,wdth@8..144,100..1000,25..151&display=swap" rel="stylesheet">${renderHead()}</head> <body> ${renderComponent($$result, "m3e-theme", "m3e-theme", { "color": "#d0bcff", "scheme": "dark" }, { "default": () => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })} ${renderScript($$result, "/home/lampu/lamp.delivery/lamp.delivery/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/lampu/lamp.delivery/lamp.delivery/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
