
import Icons from 'unplugin-icons/vite';


/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
        extensions: ['.svx'],
        highlight: {
                highlighter: async (code, lang = 'text') => {
                        const highlighter = await createHighlighter({
                                themes: ['catppuccin-mocha'],
                                langs: ['javascript', 'typescript']
                        })
                        await highlighter.loadLanguage('javascript', 'typescript')
                        const html = escapeSvelte(highlighter.codeToHtml(code, {
                                lang,
                                theme: 'catppuccin-mocha',
                                colorReplacements: {
                                        "#1e1e2e": "#313244"
                                },
                        }))
                        return `{@html \`${html}\` }`
                }
        },
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
        // Consult https://svelte.dev/docs/kit/integrations
        // for more information about preprocessors
        preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
        kit: {
                adapter: adapter(),
                vite: {
                        plugins: [
                                Icons({ compiler: 'svelte' })
                        ]
                }
        },
        extensions: ['.svelte', '.svx'],
};

export default config;
