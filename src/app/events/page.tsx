import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import { addDays, calendarBetween, fmtDay, fmtTime, nowInChurch, relativeDay } from "@/lib/calendar";
import { photos } from "@/lib/photos";
import { church, monthly, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: `What is coming up at ${church.name}: services, the Sunday lunch rotation, outreach Saturdays, youth nights, Harvest Fest and more, straight from the church calendar.`,
};

export default async function Events() {
  const now = nowInChurch();
  const list = await calendarBetween(now.date, addDays(now.date, 120));
  const upcoming = list.filter((e) => {
    if (e.date !== now.date || !e.time24) return true;
    const [h, m] = e.time24.split(":").map(Number);
    return h * 60 + m >= now.minutes - 90;
  });
  const specials = upcoming.filter((e) => !e.standing);
  // Group the next 14 days by day for the agenda.
  const agendaEnd = addDays(now.date, 14);
  const agenda = new Map<string, typeof upcoming>();
  for (const e of upcoming) {
    if (e.date > agendaEnd) break;
    if (!agenda.has(e.date)) agenda.set(e.date, []);
    agenda.get(e.date)!.push(e);
  }

  return (
    <>
      <PageHead
        eyebrow="Events"
        title={
          <>
            What’s going on <span className="script text-gold-light">at Bethel.</span>
          </>
        }
        lede="This page reads the church’s own calendar, so what you see here is what is actually happening."
        photo="lunchHall"
        position="center 40%"
      />

      {/* SPECIALS */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow text-gold-deep" data-reveal>
            Coming up
          </p>
          <h2 className="display mt-3 text-4xl sm:text-5xl" data-reveal="1">
            Mark the calendar.
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal="2">
            {specials.length ? (
              specials.map((e) => (
                <li key={`${e.date}${e.title}`} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                  <p className="time text-sm font-extrabold uppercase tracking-widest text-gold-deep">
                    {fmtDay(e.date, { weekday: "short", month: "short", day: "numeric" })}
                    {e.time24 && (
                      <>
                        {" "}
                        · {fmtTime(e.time24)}
                        {e.endTime24 && <>–{fmtTime(e.endTime24)}</>}
                      </>
                    )}
                  </p>
                  <p className="display-soft mt-1.5 text-2xl">{e.title}</p>
                  {e.description && <p className="mt-2 whitespace-pre-line text-ink/75">{e.description}</p>}
                  {e.location && <p className="mt-2 text-sm text-muted">{e.location.replace(/, USA$/, "")}</p>}
                </li>
              ))
            ) : (
              <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5 md:col-span-2 lg:col-span-3">
                <p className="display-soft text-2xl">Nothing special on the calendar just now.</p>
                <p className="mt-2 text-ink/75">The regular services are on every Sunday and Wednesday. Check back, or follow the church on Facebook.</p>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* AGENDA — next two weeks */}
      <section className="bg-white">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div data-reveal>
            <p className="eyebrow text-gold-deep">The next two weeks</p>
            <h2 className="display mt-3 text-4xl">Day by day.</h2>
            <div className="mt-8 space-y-6">
              {[...agenda.entries()].map(([date, items]) => (
                <div key={date} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-ink/10 pt-4">
                  <p className="time pt-0.5 text-sm font-extrabold uppercase tracking-wider text-gold-deep">{relativeDay(date)}</p>
                  <ul className="space-y-1.5">
                    {items.map((e) => (
                      <li key={`${e.time24}${e.title}`} className="flex items-baseline gap-3">
                        <span className="time w-20 shrink-0 text-sm text-muted">{e.time24 ? fmtTime(e.time24) : "All day"}</span>
                        <span className={e.standing ? "" : "font-bold"}>{e.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-gold-deep">Every week</p>
            <ul className="mt-4 divide-y divide-ink/10 rounded-2xl bg-paper-deep px-5">
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-4 py-3">
                  <span>
                    <span className="font-semibold">{s.name}</span>
                    <span className="ml-2 text-sm text-muted">{s.rule}</span>
                  </span>
                  <span className="time font-bold">{fmtTime(s.time24)}</span>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10 text-gold-deep">Every month</p>
            <ul className="mt-4 space-y-4">
              {monthly.map((m) => (
                <li key={m.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
                  <p className="display-soft text-xl">{m.title}</p>
                  <p className="time text-sm font-bold text-gold-deep">{m.when}</p>
                  <p className="mt-1 text-sm text-ink/75">
                    {m.where}. {m.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* THE CALENDAR ITSELF */}
      <section className="bg-paper-deep">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div data-reveal>
              <p className="eyebrow text-gold-deep">The whole calendar</p>
              <h2 className="display mt-3 text-4xl">Month by month.</h2>
            </div>
            <p className="text-ink/75" data-reveal="1">
              The same calendar the church keeps. Add it to your own phone with the plus sign in the corner and you will never miss a
              potluck.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-ink/10" data-reveal="2">
            <iframe title="Bethel Baptist Church calendar" src={church.calendarEmbed} className="h-[34rem] w-full" loading="lazy" />
          </div>
          <figure className="mt-10 overflow-hidden rounded-2xl shadow-lg" data-reveal>
            <Image src={photos.campfire.src} alt={photos.campfire.alt} width={photos.campfire.w} height={photos.campfire.h} sizes="100vw" className="aspect-[21/9] w-full object-cover" />
            <figcaption className="bg-white px-4 py-2 text-sm text-muted">Campfire services, every Wednesday in March. Hot dogs, s’mores, singing by the fire and a Bible study.</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
