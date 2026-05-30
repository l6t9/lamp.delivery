import { getNowPlaying } from '../../lib/nowPlaying';

export async function GET() {
    const track = await getNowPlaying();

    return new Response(JSON.stringify({ track }), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}