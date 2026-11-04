// Site Analytics — the site's analytics key (sak_…), for sign-in mode.
// Imported only by server.ts, so it never reaches the browser. It can only
// read this site's visitor counts. Kept in the SITE_ANALYTICS_KEY env var on
// Vercel rather than in the repo.

export const ANALYTICS_KEY = process.env.SITE_ANALYTICS_KEY ?? "";
