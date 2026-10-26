import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") || "6BfF_eg9EFU";
  const out: Record<string, unknown> = {};
  try {
    const r = await fetch(`https://www.youtube.com/youtubei/v1/next?key=${KEY}&prettyPrint=false`, {
      method: "POST",
      headers: { "User-Agent": UA, "Content-Type": "application/json" },
      body: JSON.stringify({ context: { client: { clientName: "WEB", clientVersion: "2.20261026.01.00", hl: "en", gl: "US" } }, videoId: id }),
      cache: "no-store",
    });
    const t = await r.text();
    out.next = { status: r.status, len: t.length, date: t.match(/"dateText":\{"simpleText":"([^"]+)"/)?.[1] ?? null, head: t.slice(0, 120) };
  } catch (e) {
    out.next = { error: String(e) };
  }
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en&bpctr=9999999999&has_verified=1`, {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9", Cookie: "CONSENT=YES+1; SOCS=CAI; PREF=hl=en" },
      cache: "no-store",
    });
    const t = await r.text();
    out.watchCookie = { status: r.status, len: t.length, start: t.match(/"startTimestamp":"([^"]+)"/)?.[1] ?? null, publish: t.match(/"publishDate":"([^"]+)"/)?.[1] ?? null, date: t.match(/"dateText":\{"simpleText":"([^"]+)"/)?.[1] ?? null, title: t.match(/<title>([^<]*)/)?.[1] };
  } catch (e) {
    out.watchCookie = { error: String(e) };
  }
  try {
    const r = await fetch(`https://www.youtube.com/embed/${id}?hl=en`, { headers: { "User-Agent": UA }, cache: "no-store" });
    const t = await r.text();
    out.embed = { status: r.status, len: t.length, start: t.match(/"startTimestamp":"([^"]+)"/)?.[1] ?? null, publish: t.match(/"publishDate":"([^"]+)"/)?.[1] ?? null, upload: t.match(/"uploadDate":"([^"]+)"/)?.[1] ?? null };
  } catch (e) {
    out.embed = { error: String(e) };
  }
  return NextResponse.json(out);
}
