import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") || "6BfF_eg9EFU";
  const out: Record<string, unknown> = {};
  const clients = {
    web: { clientName: "WEB", clientVersion: "2.20261026.01.00" },
    android: { clientName: "ANDROID", clientVersion: "19.09.37", androidSdkVersion: 30 },
    ios: { clientName: "IOS", clientVersion: "19.09.3", deviceModel: "iPhone14,3" },
    tv: { clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER", clientVersion: "2.0" },
  };
  for (const [k, client] of Object.entries(clients)) {
    try {
      const r = await fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false", {
        method: "POST",
        headers: { "User-Agent": UA, "Content-Type": "application/json" },
        body: JSON.stringify({ context: { client: { ...client, hl: "en", gl: "US" } }, videoId: id }),
        cache: "no-store",
      });
      const t = await r.text();
      let start: unknown = null;
      try {
        const j = JSON.parse(t);
        start = j?.microformat?.playerMicroformatRenderer?.liveBroadcastDetails?.startTimestamp ?? j?.microformat?.playerMicroformatRenderer?.publishDate ?? j?.playabilityStatus?.status;
      } catch {}
      out[k] = { status: r.status, len: t.length, start, head: t.slice(0, 160) };
    } catch (e) {
      out[k] = { error: String(e) };
    }
  }
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, { headers: { "User-Agent": UA, "Accept-Language": "en-US" }, cache: "no-store" });
    const t = await r.text();
    out.watch = { status: r.status, len: t.length, start: t.match(/"startTimestamp":"([^"]+)"/)?.[1] ?? null, publish: t.match(/"publishDate":"([^"]+)"/)?.[1] ?? null };
  } catch (e) {
    out.watch = { error: String(e) };
  }
  return NextResponse.json(out);
}
