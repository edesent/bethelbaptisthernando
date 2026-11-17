import { sermonLibraryConfig } from "./config";

export interface SermonItem {
  id: string;
  title: string;
  url: string;
  published: string;
  isoDate: string;
  thumbnail: string;
  description: string;
}

function matchTag(block: string, tag: string) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
  return block.match(regex)?.[1]?.trim() || "";
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value: string) {
  return decodeXml(value).replace(/<[^>]+>/g, "").trim();
}

// Reads the channel's public RSS feed (no API key needed). New uploads and
// finished live streams appear here automatically, so the sermon page keeps
// itself up to date.
export async function getSermons(
  limit = sermonLibraryConfig.limit
): Promise<SermonItem[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${sermonLibraryConfig.youtubeChannelId}`,
      { next: { revalidate: 1800 } }
    );
    if (!response.ok) return [];

    const xml = await response.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

    return entries.slice(0, limit).map((entry) => {
      const id = matchTag(entry, "yt:videoId");
      const title = stripHtml(matchTag(entry, "title"));
      const isoDate = matchTag(entry, "published");
      const url =
        entry.match(/<link[^>]*href="([^"]+)"[^>]*rel="alternate"/)?.[1] ||
        `https://www.youtube.com/watch?v=${id}`;
      const thumbnail =
        entry.match(/<media:thumbnail[^>]*url="([^"]+)"/)?.[1] ||
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      const description = stripHtml(matchTag(entry, "media:description"));

      return {
        id,
        title,
        url,
        isoDate,
        thumbnail,
        description,
        published: new Date(isoDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };
    });
  } catch {
    return [];
  }
}
