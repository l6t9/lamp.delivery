export function GET() {
  const hasImportMeta = Boolean(import.meta.env.LASTFM_API_KEY);
  const hasProcessEnv = Boolean(process.env.LASTFM_API_KEY);

  return new Response(
    JSON.stringify({ hasImportMeta, hasProcessEnv }),
    { headers: { 'content-type': 'application/json' } }
  );
}
