
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/now-playing" | "/api/posts" | "/blog" | "/blog/[slug]" | "/other-stuff" | "/projects";
		RouteParams(): {
			"/blog/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/api": Record<string, never>;
			"/api/now-playing": Record<string, never>;
			"/api/posts": Record<string, never>;
			"/blog": { slug?: string };
			"/blog/[slug]": { slug: string };
			"/other-stuff": Record<string, never>;
			"/projects": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/now-playing" | "/api/now-playing/" | "/api/posts" | "/api/posts/" | "/blog" | "/blog/" | `/blog/${string}` & {} | `/blog/${string}/` & {} | "/other-stuff" | "/other-stuff/" | "/projects" | "/projects/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/articleAssets/example/image.webp" | "/images/ado-1.jpg" | "/images/ado-2.png" | "/images/ado-3.png" | "/images/ado.jpg" | "/images/blood-cultures-1.png" | "/images/blood-cultures-2.png" | "/images/blood-cultures.jpg" | "/images/lumibot-preview.jpg" | "/images/raincord-banner.png" | "/rain.js" | "/robots.txt" | "/test.txt" | string & {};
	}
}