export function GET() {
    const hasImportMeta = Boolean(import.meta.env.LASTFM_API_KEY);
    const hasProcessEnv = false;

    return new Response(
        JSON.stringify({ hasImportMeta, hasProcessEnv }),
        { headers: { 'content-type': 'application/json' } }
    );
}
