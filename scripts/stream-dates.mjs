// Refresh src/data/stream-dates.json: the real start time of every stream on the
// channel, from YouTube's player data. Run from a normal computer (YouTube
// refuses this call from Vercel's servers):  node scripts/stream-dates.mjs
// Only ids not already in the file are looked up, so it is quick after the first run.
import fs from "fs";
const CHANNEL_ID = "UCz21DBZMGKLZ80Pq33ElJ2A";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const headers = { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9", Cookie: "CONSENT=YES+1; SOCS=CAI" };
const file = new URL("../src/data/stream-dates.json", import.meta.url);
const known = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};

const html = await (await fetch(`https://www.youtube.com/channel/${CHANNEL_ID}/streams`, { headers })).text();
const key = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)[1];
const ver = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)[1];
const ctx = { context: { client: { clientName: "WEB", clientVersion: ver, hl: "en", gl: "US" } } };
const ids = [];
const collect = (o) => {
  let tok = null;
  const walk = (n) => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (!n || typeof n !== "object") return;
    if (n.lockupViewModel?.contentId) ids.push(n.lockupViewModel.contentId);
    if (n.continuationItemRenderer && !tok) tok = n.continuationItemRenderer.continuationEndpoint?.continuationCommand?.token ?? null;
    Object.values(n).forEach(walk);
  };
  walk(o);
  return tok;
};
let token = collect(JSON.parse(html.match(/var ytInitialData = (\{.*?\});<\/script>/)[1]));
while (token) {
  const r = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${key}&prettyPrint=false`, { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ ...ctx, continuation: token }) });
  token = collect(await r.json());
}
const unique = [...new Set(ids)];
console.log(`${unique.length} streams on the channel, ${unique.filter((id) => !known[id]).length} new`);
for (const id of unique) {
  if (known[id]) continue;
  const r = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${key}&prettyPrint=false`, { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ ...ctx, videoId: id }) });
  const j = await r.json();
  const mf = j.microformat?.playerMicroformatRenderer;
  const live = mf?.liveBroadcastDetails;
  const start = live?.startTimestamp ?? mf?.publishDate ?? null;
  const minutes = live?.startTimestamp && live?.endTimestamp ? Math.round((Date.parse(live.endTimestamp) - Date.parse(live.startTimestamp)) / 60000) : null;
  if (start) known[id] = { start, minutes };
  process.stdout.write(".");
}
const sorted = Object.fromEntries(Object.entries(known).sort((a, b) => (b[1].start > a[1].start ? 1 : -1)));
fs.writeFileSync(file, JSON.stringify(sorted, null, 1) + "\n");
console.log(`\nwrote ${Object.keys(sorted).length} dates`);
