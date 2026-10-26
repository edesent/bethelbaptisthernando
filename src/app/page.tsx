import Image from "next/image";
import Link from "next/link";
import Banners from "@/components/Banners";
import OpenChat from "@/components/OpenChat";
import VideoLightbox from "@/components/VideoLightbox";
import Phone from "@/components/Phone";
import { comingUp, fmtDay, fmtTime, relativeDay, thisWeek } from "@/lib/calendar";
import streamDates from "@/data/stream-dates.json";
import { fmtPublished, fmtStart, fmtStreamDate, liveStatus, recentVideos, streamDetail } from "@/lib/youtube";
import { photos } from "@/lib/photos";
import { banners, church, counseling, giving, lunchRotation, pastor } from "@/lib/site";
import { nowInChurch } from "@/lib/calendar";

export default async function Home() {
  const [week, specials, live, videos] = await Promise.all([thisWeek(7), comingUp(120, 3), liveStatus(), recentVideos(10)]);
  const latest = videos.find((v) => ((streamDates as Record<string, { minutes: number | null }>)[v.id]?.minutes ?? 99) >= 3) ?? videos[0];
  const featured = live.state === "live" ? live.id : latest.id;
  const latestWhen = fmtStreamDate(await streamDetail(latest.id)) || fmtPublished(latest.published);
  const today = nowInChurch().date;
  const liveBanners = banners.filter((b) => !b.endsOn || b.endsOn >= today);

  return (
    <>
      {/* HERO — the church at sunset, with the three things a visitor needs in five seconds */}
      <section className="relative isolate overflow-hidden bg-brown-deep text-white">
        <div className="relative min-h-[100svh]">
          <Image
            src={photos.churchSunset.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden
          />
          <div className="hero-video-wash absolute inset-0" aria-hidden />
          <div className="wrap relative flex min-h-[100svh] flex-col items-center justify-end pb-11 pt-32 text-center md:pb-14">
            <p className="script text-shadow hidden text-[2rem] text-gold-light sm:block sm:text-[2.6rem]" data-reveal>
              Welcome home
            </p>
            <h1 className="display text-shadow mt-0.5 max-w-[56rem] text-[2.6rem] leading-[0.94] sm:text-6xl md:text-[4.4rem]" data-reveal="1">
              A family church in Hernando with a seat saved for you.
            </h1>
            <p className="text-shadow mt-4 hidden max-w-xl text-base text-white/90 sm:block sm:text-lg" data-reveal="2">
              Old-fashioned hymns, the King James Bible, and lunch together every Sunday.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3" data-reveal="3">
              <Link href="/visit" className="btn btn-gold text-base">
                Plan your Sunday
              </Link>
              <Link href="/watch" className="btn btn-ghost text-base">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.35)]" aria-hidden />
                Watch a service
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* THE PASTOR — his face and his welcome, first thing after the hero */}
      <section id="pastor" className="bg-paper">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-14 md:py-24">
          <div className="relative mx-auto w-full max-w-sm" data-reveal>
            <figure className="overflow-hidden rounded-2xl shadow-2xl">
              <Image src={photos.pastorFamilyGazebo.src} alt={photos.pastorFamilyGazebo.alt} width={photos.pastorFamilyGazebo.w} height={photos.pastorFamilyGazebo.h} sizes="(min-width: 768px) 32vw, 90vw" priority className="h-auto w-full" />
            </figure>
            <figure className="absolute -bottom-6 -right-4 w-32 overflow-hidden rounded-xl border-4 border-paper shadow-xl sm:w-40 md:-right-8">
              <Image src={photos.ordination.src} alt={photos.ordination.alt} width={photos.ordination.w} height={photos.ordination.h} sizes="160px" className="h-auto w-full" />
            </figure>
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-gold-deep">A note from the pastor</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl">
              Hi, I’m <span className="script text-gold">Pastor Brandon.</span>
            </h2>
            <blockquote className="mt-6 text-xl leading-relaxed text-ink/85 sm:text-2xl">
              “If you walk through our door Sunday, I will meet you there, and you’ll leave knowing a few names. We’re a church family, we
              sing the old hymns, we preach the King James Bible, and we eat lunch together every week. Write me anytime. I read every
              message myself.”
            </blockquote>
            <p className="mt-4 text-muted">
              {pastor.styled} · pastor since {pastor.since} · husband and dad of two
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OpenChat className="btn btn-gold">Write to Pastor Brandon</OpenChat>
              <Link href="/about#pastor" className="btn btn-ghost btn-ghost-ink">
                Meet the Bankerts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT A SUNDAY IS LIKE — the walk-through */}
      <section className="bg-paper">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div data-reveal>
              <p className="eyebrow text-gold-deep">What happens when you walk in</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl">
                Sunday, <span className="script text-gold">start to finish.</span>
              </h2>
              <p className="mt-6 text-lg text-ink/85">
                Park anywhere. The front doors are under the steeple. Someone will shake your hand before you find a seat, and nobody will
                ask you to stand up or say anything. Then it goes like this.
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  ["10:00", "Sunday School", "A class for grown-ups, and Bible Explorers for ages 4–12: songs, games and a lesson. Nursery for newborns to three, with ladies who will treat your little one like their own."],
                  ["11:00", "Morning Service", "Hymns you can sing from the book, a few announcements, and Pastor Bankert preaching from the King James Bible. About an hour."],
                  ["12:00", "Lunch together", "Every Sunday the whole church eats in the fellowship hall. Guests eat free, and you won’t sit alone."],
                  ["1:00", "Afternoon Service", "A second, shorter service after lunch. Stay if you can; nobody minds if you slip out."],
                ].map(([t, h, p], i) => (
                  <li key={h} className="flex gap-4" data-reveal={i}>
                    <span className="time w-16 shrink-0 pt-1 text-right text-lg font-extrabold text-gold-deep">{t}</span>
                    <span>
                      <span className="display-soft block text-2xl">{h}</span>
                      <span className="mt-1 block text-ink/80">{p}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-muted">
                Most folks wear their Sunday best. Plenty don’t. Come as you are, and if you need a ride,{" "}
                <Link href="/visit#ride" className="font-semibold text-gold-deep underline underline-offset-4">
                  the church van will come get you
                </Link>
                .
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 self-center" data-reveal="1">
              <figure className="col-span-2 overflow-hidden rounded-2xl shadow-xl">
                <Image src={photos.congregation.src} alt={photos.congregation.alt} width={photos.congregation.w} height={photos.congregation.h} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
              </figure>
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.lunchHall.src} alt={photos.lunchHall.alt} width={photos.lunchHall.w} height={photos.lunchHall.h} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] h-full w-full object-cover" />
              </figure>
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.churchFamily.src} alt={photos.churchFamily.alt} width={photos.churchFamily.w} height={photos.churchFamily.h} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] h-full w-full object-cover" />
              </figure>
              <figure className="col-span-2 overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.familyAtBethel.src} alt={photos.familyAtBethel.alt} width={photos.familyAtBethel.w} height={photos.familyAtBethel.h} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] h-full w-full object-cover" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* LUNCH — the thing no other church around does every week */}
      <section className="relative isolate overflow-hidden bg-brown-deep text-white">
        <Image src={photos.lunchLadies.src} alt="" fill sizes="100vw" className="object-cover object-center opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,24,21,0.95),rgba(29,24,21,0.75)_55%,rgba(29,24,21,0.4))]" aria-hidden />
        <div className="wrap relative grid gap-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
          <div data-reveal>
            <p className="eyebrow text-gold-light">Every Sunday at noon</p>
            <h2 className="display text-shadow mt-3 text-4xl sm:text-5xl md:text-6xl">
              Stay for lunch. <span className="script text-gold-light">Every week.</span>
            </h2>
            <p className="text-shadow mt-6 max-w-xl text-lg text-white/90">
              A family church eating together after church, every Sunday of the year, is how you find out it really is one. There is
              a different table each week of the month. Bring a dish if you like. Bring nothing and you will still go home full.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2" data-reveal="1">
            {lunchRotation.map((r) => (
              <li key={r.nth} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                <span className="time block text-xs font-extrabold tracking-widest text-gold-light">{r.nth.toUpperCase()} SUNDAY</span>
                <span className="display-soft mt-1 block text-2xl">{r.meal}</span>
              </li>
            ))}
            <li className="flex items-center rounded-2xl bg-gold p-4 text-brown-deep">
              <span className="font-bold leading-snug">Guests always eat free.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* WHAT'S GOING ON — their flyers slide, the calendar beside them */}
      <section id="events" className="bg-paper-deep scroll-mt-24">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div data-reveal>
              <p className="eyebrow text-gold-deep">What’s going on</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl">
                At Bethel <span className="script text-gold">this season.</span>
              </h2>
            </div>
            <p className="text-lg text-ink/80" data-reveal="1">
              Harvest Fest, Sunday suppers, youth night, the van, the table at the Depot. The flyers are the church’s own, and the lists below come straight from the church’s calendar.
            </p>
          </div>
          <div className="mt-10" data-reveal>
            <Banners items={liveBanners} />
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2" data-reveal="1">
            <div className="contents">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                <p className="eyebrow text-gold-deep">This week</p>
                <ul className="mt-3 divide-y divide-ink/10">
                  {week.slice(0, 6).map((e) => (
                    <li key={`${e.date}${e.time24}${e.title}`} className="flex items-baseline justify-between gap-3 py-1.5">
                      <span className="min-w-0 truncate font-semibold">{e.title}</span>
                      <span className="time shrink-0 text-sm text-muted">
                        {relativeDay(e.date).replace(/,.*$/, "")}
                        {e.time24 && <> · {fmtTime(e.time24)}</>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                <p className="eyebrow text-gold-deep">Coming up</p>
                <ul className="mt-3 space-y-3">
                  {specials.length ? (
                    specials.map((e) => (
                      <li key={`${e.date}${e.title}`}>
                        <p className="time text-xs font-extrabold uppercase tracking-widest text-gold-deep">
                          {fmtDay(e.date, { weekday: "short", month: "short", day: "numeric" })}
                          {e.time24 && <> · {fmtTime(e.time24)}</>}
                        </p>
                        <p className="display-soft text-xl">{e.title}</p>
                        {e.description && <p className="text-sm text-ink/70">{e.description}</p>}
                      </li>
                    ))
                  ) : (
                    <li className="text-ink/70">Nothing special on the calendar just now. The regular services are on.</li>
                  )}
                </ul>
                <Link href="/events" className="mt-4 inline-block text-sm font-bold text-gold-deep underline underline-offset-4">
                  The whole calendar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINISTRIES — three photos, three things they actually do */}
      <section className="bg-paper">
        <div className="wrap py-20 md:py-28">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow text-gold-deep">Out the doors</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">A church this size, this busy.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { p: photos.depotTable, h: "Saturdays at the Depot", t: "First and third Saturdays at ten, a table at the Inverness market, meeting the town and handing out the gospel.", href: "/ministries#outreach" },
              { p: photos.youthRally, h: "Youth for Truth", t: "Wednesdays at 6:30: pizza, games and a Bible lesson. Youth rallies with preaching, prizes and team competition a few times a year.", href: "/ministries#youth" },
              { p: photos.van, h: "Need a ride?", t: "The church van runs on Sunday mornings. Tell us where you are and it will be in your driveway.", href: "/visit#ride" },
            ].map((m, i) => (
              <Link key={m.h} href={m.href} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/5 transition hover:shadow-xl" data-reveal={i}>
                <div className="overflow-hidden">
                  <Image src={m.p.src} alt={m.p.alt} width={m.p.w} height={m.p.h} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="display-soft text-2xl">{m.h}</h3>
                  <p className="mt-2 text-ink/75">{m.t}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-gold-pale p-6 md:flex md:items-center md:justify-between md:gap-8" data-reveal>
            <div>
              <p className="eyebrow text-gold-deep">{counseling.name}</p>
              <p className="display-soft mt-1 text-2xl">{counseling.line}</p>
              <p className="mt-1 text-ink/75">
                {counseling.summary} {counseling.areas.join(" · ")}.
              </p>
            </div>
            <Link href="/ministries#counseling" className="btn btn-ink mt-4 shrink-0 md:mt-0">
              Talk to someone
            </Link>
          </div>
        </div>
      </section>

      {/* WATCH + GIVE */}
      <section className="bg-brown-deep text-white">
        <div className="wrap grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <div data-reveal>
            <p className="eyebrow text-gold-light">{live.state === "live" ? "Live right now" : "Every service, live"}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{live.state === "live" ? "We’re on. Come on in." : "Watch from home."}</h2>
            <p className="mt-5 text-white/80">
              {live.state === "live"
                ? "The service is streaming this minute. Tap the picture and you’re in the room."
                : live.state === "upcoming"
                  ? `Next stream ${fmtStart(live.startsAt)}. Until then, here is the latest one.`
                  : "Sunday School, both Sunday services and Wednesday night all stream on YouTube. This is the latest one; tap it to watch right here."}
            </p>
            <div className="mt-6">
              <VideoLightbox
                id={featured}
                title={live.state === "live" ? "Bethel Baptist Church, live" : `${latest.title}, ${latestWhen}`}
                caption={live.state === "live" ? "Streaming now from the sanctuary" : `Latest · ${latestWhen}`}
                live={live.state === "live"}
              />
            </div>
            <Link href="/watch" className="mt-4 inline-block text-sm font-bold text-gold-light underline underline-offset-4">
              More services and the full channel
            </Link>
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-gold-light">Giving</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Help keep the doors open.</h2>
            <blockquote className="mt-5 border-l-4 border-gold pl-5">
              <p className="display-soft text-xl italic text-white/90 sm:text-2xl">
                “Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a
                cheerful giver.”
              </p>
              <footer className="mt-2 text-gold-light">2 Corinthians 9:7</footer>
            </blockquote>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/give" className="btn btn-gold">
                {giving.label}
              </Link>
              <Link href="/give#ways" className="btn btn-ghost">
                Other ways to give
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE — this Sunday, with the map, fading into the footer */}
      <section className="relative isolate overflow-hidden bg-brown-deep text-white">
        <Image src={photos.steepleSunset.src} alt={photos.steepleSunset.alt} fill sizes="100vw" className="object-cover object-[center_30%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#1d1815_0%,rgba(29,24,21,0.92)_28%,rgba(29,24,21,0.6)_60%,rgba(29,24,21,0.3)_100%)]" aria-hidden />
        <div className="wrap relative grid gap-10 pb-24 pt-20 md:grid-cols-[1fr_1fr] md:items-center md:pb-32 md:pt-28">
          <div data-reveal>
            <p className="script text-shadow text-4xl text-gold-light sm:text-5xl">This Sunday</p>
            <h2 className="display text-shadow mt-2 text-4xl sm:text-5xl md:text-6xl">
              {church.streetNumber} {church.street}, {church.city}. Sunday School at ten, service at eleven.
            </h2>
            <p className="text-shadow mt-5 max-w-xl text-lg text-white/85">
              Just off Highway 41, north of Inverness. Look for the white steeple. Questions? <Phone className="font-semibold underline underline-offset-4" fallback="Call the church" />.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/visit" className="btn btn-gold">
                Plan a visit
              </Link>
              <a href={church.mapsUrl} className="btn btn-ghost" rel="noopener">
                Directions
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20" data-reveal="1">
            <iframe
              title="Map to Bethel Baptist Church"
              src={church.mapsEmbed}
              className="h-[20rem] w-full sm:h-[24rem] md:h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
