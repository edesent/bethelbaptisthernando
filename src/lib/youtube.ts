import { TZ } from "./site";
import streamDates from "@/data/stream-dates.json";

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

/* ---------- the whole stream archive, for the Watch page ---------- */

export type Stream = { id: string; title: string; when: string; views: string };

/**
 * Every stream on the channel's Streams tab, newest first, by reading the
 * page the way a browser does and following its "load more" links. Capped
 * at `maxPages` loads (about 30 streams each) so one request never fans out
 * too far; re-read hourly. Falls back to the RSS feed if YouTube says no.
 */
export async function allStreams(maxPages = 8): Promise<Stream[]> {
  const headers = { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9", Cookie: "CONSENT=YES+1; SOCS=CAI" };
  try {
    const res = await fetch(`https://www.youtube.com/channel/${CHANNEL_ID}/streams`, { headers, next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(String(res.status));
    const html = await res.text();
    const key = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
    const ver = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1];
    const initial = html.match(/var ytInitialData = (\{.*?\});<\/script>/)?.[1];
    if (!initial) throw new Error("no data");
    const out: Stream[] = [];
    let token = collect(JSON.parse(initial), out);
    let pages = 1;
    while (token && key && ver && pages < maxPages) {
      const r = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${key}&prettyPrint=false`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ context: { client: { clientName: "WEB", clientVersion: ver, hl: "en", gl: "US" } }, continuation: token }),
        next: { revalidate: 3600 },
      });
      if (!r.ok) break;
      token = collect(await r.json(), out);
      pages++;
    }
    if (!out.length) throw new Error("empty");
    const seen = new Set<string>();
    return out.filter((v) => (seen.has(v.id) ? false : (seen.add(v.id), true)));
  } catch {
    const recent = await recentVideos(15);
    return recent.map((v) => ({ id: v.id, title: v.title, when: fmtPublished(v.published), views: "" }));
  }
}

/** Walk a YouTube response for stream tiles; return the next "load more" token if there is one. */
function collect(node: unknown, out: Stream[]): string | null {
  let token: string | null = null;
  const walk = (o: unknown) => {
    if (Array.isArray(o)) {
      o.forEach(walk);
      return;
    }
    if (!o || typeof o !== "object") return;
    const rec = o as Record<string, unknown>;
    if (rec.lockupViewModel) {
      const lv = rec.lockupViewModel as Record<string, unknown>;
      const md = ((lv.metadata as Record<string, unknown>)?.lockupMetadataViewModel ?? {}) as Record<string, unknown>;
      const title = ((md.title as Record<string, unknown>)?.content as string) ?? "Bethel Baptist Church";
      const parts: string[] = [];
      const rows = (((md.metadata as Record<string, unknown>)?.contentMetadataViewModel as Record<string, unknown>)?.metadataRows ?? []) as Record<string, unknown>[];
      for (const row of rows) for (const p of (row.metadataParts ?? []) as Record<string, unknown>[]) parts.push(((p.text as Record<string, unknown>)?.content as string) ?? "");
      const id = lv.contentId as string;
      if (id) out.push({ id, title, when: parts.find((p) => /^(Streamed|Scheduled|Started)/.test(p)) ?? parts[1] ?? "", views: parts.find((p) => /view/.test(p)) ?? "" });
    }
    if (rec.continuationItemRenderer && !token) {
      const t = (((rec.continuationItemRenderer as Record<string, unknown>).continuationEndpoint as Record<string, unknown>)?.continuationCommand as Record<string, unknown>)?.token;
      if (typeof t === "string") token = t;
    }
    Object.values(rec).forEach(walk);
  };
  walk(node);
  return token;
}

/* ---------- the real date and time of one stream ---------- */

export type StreamDetail = { id: string; startedAt: string | null; minutes: number | null; hasTime: boolean };

const KNOWN = streamDates as Record<string, { start: string; minutes: number | null }>;
const MONTHS: Record<string, string> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

/**
 * When a stream started and how long it ran. `src/data/stream-dates.json`
 * holds the exact start of every stream on the channel (refresh it with
 * `node scripts/stream-dates.mjs`; YouTube refuses that call from Vercel's
 * servers). A stream not in the file yet is asked about through YouTube's
 * "next" data, which Vercel can reach and which gives the day but not the
 * time; that answer is cached for a month.
 */
export async function streamDetail(id: string): Promise<StreamDetail> {
  const k = KNOWN[id];
  if (k) return { id, startedAt: k.start, minutes: k.minutes, hasTime: true };
  try {
    const r = await fetch("https://www.youtube.com/youtubei/v1/next?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false", {
      method: "POST",
      headers: { "User-Agent": UA, "Content-Type": "application/json" },
      body: JSON.stringify({ context: { client: { clientName: "WEB", clientVersion: "2.20261026.01.00", hl: "en", gl: "US" } }, videoId: id }),
      next: { revalidate: 60 * 60 * 24 * 30 },
    });
    if (!r.ok) throw new Error(String(r.status));
    const t = await r.text();
    const m = t.match(/"dateText":\{"simpleText":"(?:Streamed live on |Premiered |Started streaming on )?([A-Z][a-z]{2}) (\d{1,2}), (\d{4})"/);
    if (!m) return { id, startedAt: null, minutes: null, hasTime: false };
    // Noon in the church's zone, so the weekday comes out right.
    return { id, startedAt: `${m[3]}-${MONTHS[m[1]]}-${m[2].padStart(2, "0")}T12:00:00-05:00`, minutes: null, hasTime: false };
  } catch {
    return { id, startedAt: null, minutes: null, hasTime: false };
  }
}

const ordinal = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th")}`;

/** "Sunday · Aug 24th · 11:00 AM" (or without the time when only the day is known), in the church's time zone. */
export function fmtStreamDate(d: StreamDetail | null, sep = " · ") {
  if (!d?.startedAt) return "";
  const dt = new Date(d.startedAt);
  if (Number.isNaN(dt.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).formatToParts(dt);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = `${get("weekday")}${sep}${get("month")} ${ordinal(Number(get("day")))}`;
  return d.hasTime ? `${day}${sep}${get("hour")}:${get("minute")} ${get("dayPeriod")}` : day;
}
