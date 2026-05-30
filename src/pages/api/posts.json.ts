import { getCollection } from 'astro:content';

export async function GET() {
    const posts = (await getCollection('blog', ({ data }) => data.published))
        .sort((first, second) => second.data.date.getTime() - first.data.date.getTime())
        .map((post) => ({
            title: post.data.title,
            slug: post.slug,
            description: post.data.description,
            date: post.data.date.toISOString(),
            categories: post.data.categories,
            published: post.data.published
        }));

    return new Response(JSON.stringify(posts), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}