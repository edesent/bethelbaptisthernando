import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import VideoLightbox from "@/components/VideoLightbox";
import { photos } from "@/lib/photos";
import { church } from "@/lib/site";
import { fmtPublished, fmtStart, liveStatus, recentVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Watch",
  description: `${church.name} streams every service live on YouTube: Sunday School, both Sunday services and Wednesday Bible study.`,
};

export default async function Watch() {
  const [live, videos] = await Promise.all([liveStatus(), recentVideos(7)]);
  const latest = videos[0];
  const featured = live.state === "live" ? live.id : latest.id;
  const rest = videos.filter((v) => v.id !== featured).slice(0, 6);
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
              title={live.state === "live" ? "Bethel Baptist Church, live" : `${latest.title}, ${fmtPublished(latest.published)}`}
              caption={live.state === "live" ? "Streaming now" : `Latest service · ${fmtPublished(latest.published)}`}
              live={live.state === "live"}
            />
            {live.state === "upcoming" && (
              <p className="mt-3 text-sm text-muted">
                Next stream <span className="time font-bold text-ink">{fmtStart(live.startsAt)}</span>.
              </p>
            )}
            {rest.length > 0 && (
              <>
                <p className="eyebrow mt-10 text-gold-deep">Recent services</p>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {rest.map((v) => (
                    <li key={v.id}>
                      <VideoLightbox id={v.id} title={`${v.title}, ${fmtPublished(v.published)}`} caption={fmtPublished(v.published).replace(/^(\w+), /, "$1 · ")} className="shadow-md" />
                    </li>
                  ))}
                </ul>
              </>
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
