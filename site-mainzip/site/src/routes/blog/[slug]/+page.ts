import type { Post } from '$lib'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    try {
        const post = await import(`../../../posts/${params.slug}.svx`)

        return {
            content: post.default,
            meta: post.metadata as Omit<Post, "slug">
        }
    } catch {
        error(404, `Could not find article ${params.slug}`)
    }
}
