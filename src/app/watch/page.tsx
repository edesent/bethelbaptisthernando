import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import VideoLightbox from "@/components/VideoLightbox";
import { photos } from "@/lib/photos";
import { church } from "@/lib/site";
import { allStreams, fmtPublished, fmtStart, fmtStreamDate, liveStatus, recentVideos, streamDetail } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Watch",
  description: `${church.name} streams every service live on YouTube: Sunday School, both Sunday services and Wednesday Bible study.`,
};

const PER_PAGE = 12;

export default async function Watch({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const [live, videos, streams] = await Promise.all([liveStatus(), recentVideos(1), allStreams()]);
  const latest = videos[0];
  const featured = live.state === "live" ? live.id : latest.id;
  const archive = streams.filter((v) => v.id !== featured);
  const pages = Math.max(1, Math.ceil(archive.length / PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(pageParam) || 1));
  const rest = archive.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  // The real day and time each one started, for this page only.
  const details = new Map((await Promise.all([featured, ...rest.map((v) => v.id)].map((id) => streamDetail(id)))).map((d) => [d.id, d]));
  const when = (id: string, fallback: string) => fmtStreamDate(details.get(id)?.startedAt ?? null) || fallback;
  const featuredWhen = when(featured, fmtPublished(latest.published));
  const pageLink = (n: number) => (n === 1 ? "/watch#services" : `/watch?page=${n}#services`);
  return (
    <>
      <PageHead
        eyebrow="Watch"
        title={
          <>
            Every service, <span className="script text-gold-light">live.</span>
          </>
        }
        lede="Sunday School at ten, the morning service at eleven, the afternoon service at one, Bible study Wednesday at seven. All of it goes out on YouTube, and stays there afterward."
        photo="pastorPreaching"
        position="center 35%"
      />
      <section className="bg-paper">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div data-reveal>
            <VideoLightbox
              id={featured}
              title={live.state === "live" ? "Bethel Baptist Church, live" : `${latest.title}, ${featuredWhen}`}
              caption={live.state === "live" ? "Streaming now" : `Latest · ${featuredWhen}`}
              live={live.state === "live"}
            />
            {live.state === "upcoming" && (
              <p className="mt-3 text-sm text-muted">
                Next stream <span className="time font-bold text-ink">{fmtStart(live.startsAt)}</span>.
              </p>
            )}
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-gold-deep">On YouTube</p>
            <h2 className="display mt-3 text-4xl">Bethel Baptist Church, Hernando</h2>
            <p className="mt-4 text-ink/80">
              The channel streams every service, so the newest video is the last one that happened. Subscribe and YouTube will tell you
              when the next one starts.
            </p>
            <a href={church.youtube} className="btn btn-gold mt-6" rel="noopener">
              Open the channel
            </a>
            <div className="mt-10 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
              <p className="eyebrow text-gold-deep">When we go live</p>
              <ul className="mt-3 space-y-2">
                {[
                  ["Sunday", "10:00 AM", "Sunday School"],
                  ["Sunday", "11:00 AM", "Morning Service"],
                  ["Sunday", "1:00 PM", "Afternoon Service"],
                  ["Wednesday", "7:00 PM", "Midweek Bible Study"],
                ].map(([d, t, n]) => (
                  <li key={n} className="flex items-baseline justify-between gap-3">
                    <span>
                      <span className="font-semibold">{n}</span> <span className="text-sm text-muted">{d}</span>
                    </span>
                    <span className="time font-bold">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">Wednesday Bible study is also on Google Meet. Ask the pastor for the link.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="bg-white scroll-mt-20">
        <div className="wrap py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <div>
              <p className="eyebrow text-gold-deep">Past services</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">Every service, kept.</h2>
            </div>
            <p className="text-muted">
              Page <span className="time font-bold text-ink">{page}</span> of <span className="time font-bold text-ink">{pages}</span> ·{" "}
              {archive.length} services
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" data-reveal="1">
            {rest.map((v) => (
              <li key={v.id}>
                <VideoLightbox id={v.id} title={`${v.title} · ${when(v.id, v.when)}`} caption={when(v.id, v.when.replace(/^Streamed /, ""))} className="shadow-md" />
              </li>
            ))}
          </ul>
          {pages > 1 && (
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pages of services">
              {page > 1 && (
                <Link href={pageLink(page - 1)} className="btn btn-ghost btn-ghost-ink px-4 py-2 text-sm">
                  Newer
                </Link>
              )}
              {Array.from({ length: pages }, (_, k) => k + 1)
                .filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 2)
                .reduce<(number | "…")[]>((acc, n) => {
                  const prev = acc[acc.length - 1];
                  if (typeof prev === "number" && n - prev > 1) acc.push("…");
                  acc.push(n);
                  return acc;
                }, [])
                .map((n, k) =>
                  n === "…" ? (
                    <span key={`gap${k}`} className="px-1 text-muted">
                      …
                    </span>
                  ) : (
                    <Link
                      key={n}
                      href={pageLink(n)}
                      aria-current={n === page ? "page" : undefined}
                      className={`time inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-bold ${
                        n === page ? "bg-brown text-white" : "bg-paper-deep text-ink hover:bg-gold-pale"
                      }`}
                    >
                      {n}
                    </Link>
                  ),
                )}
              {page < pages && (
                <Link href={pageLink(page + 1)} className="btn btn-ghost btn-ghost-ink px-4 py-2 text-sm">
                  Older
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
      <section className="bg-brown text-white">
        <div className="wrap grid gap-8 py-16 md:grid-cols-[1fr_1fr] md:items-center md:py-20">
          <figure className="overflow-hidden rounded-2xl shadow-xl" data-reveal>
            <Image src={photos.congregation.src} alt={photos.congregation.alt} width={photos.congregation.w} height={photos.congregation.h} sizes="(min-width: 768px) 50vw, 100vw" className="w-full" />
          </figure>
          <div data-reveal="1">
            <p className="eyebrow text-gold-light">Better in person</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">The stream doesn’t serve lunch.</h2>
            <p className="mt-4 text-white/80">
              Watch a few and you’ll know what to expect. Then come. There is a seat, a handshake and a plate waiting.
            </p>
            <Link href="/visit" className="btn btn-gold mt-6">
              Plan a visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
