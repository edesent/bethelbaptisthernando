import { TZ } from "./site";

/**
 * The church's YouTube channel: what is live right now, what is scheduled,
 * and the latest streams. Read from the public RSS feed and the channel's
 * /live page, re-checked every few minutes. If YouTube is unreachable the
 * last stream we know of is used, so the section never goes blank.
 */

export const CHANNEL_ID = "UCz21DBZMGKLZ80Pq33ElJ2A";
export const CHANNEL_URL = "https://www.youtube.com/@bethelbaptistchurch-hernan2627";

/** The newest stream at build time, used only if the feed can't be read. */
const FALLBACK: Video = { id: "6BfF_eg9EFU", title: "Sunday at Bethel", published: "2026-10-26T04:37:37+00:00" };

export type Video = { id: string; title: string; published: string };
export type LiveStatus =
  | { state: "live"; id: string }
  | { state: "upcoming"; id: string; startsAt: number }
  | { state: "none" };

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

/** Recent uploads and streams, newest first. */
export async function recentVideos(limit = 6): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
      headers: { "User-Agent": UA },
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const list: Video[] = [];
    for (const e of entries) {
      const id = e.match(/<yt:videoId>([^<]+)/)?.[1];
      const title = e.match(/<title>([^<]*)/)?.[1] ?? "";
      // Keep the full timestamp; the feed is UTC and a Sunday-night service is already "Monday" there.
      const published = e.match(/<published>([^<]+)/)?.[1] ?? "";
      if (id) list.push({ id, title: title.trim() || "Bethel Baptist Church", published });
    }
    return list.length ? list.slice(0, limit) : [FALLBACK];
  } catch {
    return [FALLBACK];
  }
}

/** Is the church live right now, or is a stream scheduled soon? */
export async function liveStatus(): Promise<LiveStatus> {
  try {
    const res = await fetch(`https://www.youtube.com/channel/${CHANNEL_ID}/live`, {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const html = await res.text();
    const id = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([^"&]+)"/)?.[1];
    if (!id) return { state: "none" };
    const isLive = /"isLive":true/.test(html);
    const isUpcoming = /"isUpcoming":true/.test(html);
    const offline = /LIVE_STREAM_OFFLINE/.test(html);
    const starts = Number(html.match(/"scheduledStartTime":"(\d+)"/)?.[1] ?? 0) * 1000;
    if (isLive && !isUpcoming && !offline) return { state: "live", id };
    // A scheduled stream only counts if it is still ahead of us and within the week;
    // channels often leave an old scheduled stream sitting there.
    const now = Date.now();
    if (isUpcoming && starts > now && starts - now < 7 * 24 * 3600 * 1000) return { state: "upcoming", id, startsAt: starts };
    return { state: "none" };
  } catch {
    return { state: "none" };
  }
}

/** The day a video went out, in the church's own time zone. */
export function fmtPublished(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  // A stream YouTube finishes publishing after midnight still belongs to the evening before.
  d.setHours(d.getHours() - 5);
  return d.toLocaleDateString("en-US", { timeZone: TZ, weekday: "long", month: "long", day: "numeric" });
}

export function fmtStart(ms: number) {
  return new Date(ms).toLocaleString("en-US", { timeZone: TZ, weekday: "long", hour: "numeric", minute: "2-digit" });
}
