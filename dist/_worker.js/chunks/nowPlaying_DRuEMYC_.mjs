globalThis.process ??= {}; globalThis.process.env ??= {};
new Proxy({"src":"/_astro/placeholder.Zl1ZCRnR.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/lampu/lamp.delivery/lamp.delivery/src/lib/assets/placeholder.png";
							}
							
							return target[name];
						}
					});

async function getNowPlaying() {
  {
    return null;
  }
}

export { getNowPlaying as g };
