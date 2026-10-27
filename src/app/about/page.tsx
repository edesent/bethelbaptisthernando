import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { photos } from "@/lib/photos";
import { church, pastor } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${church.name} began as Inverness Baptist Church on October 21, 1984, and has worshiped on McGee Drive in Hernando since 1994. Our pastor, our story, and what we believe.`,
};

const timeline = [
  { y: "1984", t: "First service, October 21", p: "Inverness Baptist Church meets for the first time on Highway 41 under Pastor Nile Stine. He and his wife Sharon hold Wednesday night services in their home." },
  { y: "1990", t: "The land on McGee Drive", p: "The church buys 2289 N. McGee Drive in Hernando, where it still stands, though it cannot build yet." },
  { y: "1993", t: "A new name", p: "The church becomes Bethel Baptist Church. Bethel means “house of God.”" },
  { y: "1994", t: "Home, July 16", p: "After six months in the Inverness Women’s Club, the first service in the new building on McGee Drive." },
  { y: "2019", t: "Thirty-five years", p: "Pastor Stine retires in March after nearly thirty-five years. In November the church calls Matthew Sandiford, who serves until July 2024." },
  { y: "2025", t: "The Bankerts", p: "Brandon Bankert and his family come to fill the pulpit and sing. On March 2 he is voted pastor, unanimously. He is ordained in December." },
  { y: "2026", t: "Grand reopening, March 1", p: "After a year of work by the members’ own hands, the rebuilt church reopens its doors with lunch for everyone." },
];

export default function About() {
  return (
    <>
      <PageHead
        eyebrow="About Bethel"
        title={
          <>
            Forty-two years. <span className="script text-gold-light">Still going.</span>
          </>
        }
        lede="A church planted in Inverness in 1984, at home in Hernando since 1994, and in the middle of what its pastor calls the Re-Growth."
        photo="ordination"
        position="center 38%"
      />

      {/* PASTOR */}
      <section id="pastor" className="bg-paper scroll-mt-24">
        <div className="wrap grid items-start gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div className="grid gap-3" data-reveal>
            <figure className="overflow-hidden rounded-2xl shadow-xl">
              <Image src={photos.pastorFamilyCurrent.src} alt={photos.pastorFamilyCurrent.alt} width={photos.pastorFamilyCurrent.w} height={photos.pastorFamilyCurrent.h} sizes="(min-width: 768px) 40vw, 100vw" className="w-full" />
            </figure>
            <div className="grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.ordination.src} alt={photos.ordination.alt} width={photos.ordination.w} height={photos.ordination.h} sizes="20vw" className="aspect-square w-full object-cover" />
              </figure>
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.pastorPulpitChild.src} alt={photos.pastorPulpitChild.alt} width={photos.pastorPulpitChild.w} height={photos.pastorPulpitChild.h} sizes="20vw" className="aspect-square w-full object-cover" />
              </figure>
            </div>
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-gold-deep">Our pastor</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl">{pastor.styled}</h2>
            <p className="mt-2 text-lg text-muted">Pastor since {pastor.since} · ordained at Bethel, December 5, 2025</p>
            <div className="rule-gold mt-5" />
            <div className="prose-site mt-6 text-lg text-ink/85">
              {pastor.bio.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">In his own words, from the church’s pastor page.</p>
            <Link href="/contact" className="btn btn-ink mt-8">
              Write to Pastor Bankert
            </Link>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className="bg-white scroll-mt-24">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
            <div data-reveal>
              <p className="eyebrow text-gold-deep">Our story</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">From Highway 41 to McGee Drive.</h2>
            </div>
            <p className="text-lg text-ink/80" data-reveal="1">
              Pastor Nile Stine planted this church in Inverness in 1984 and pastored it for almost thirty-five years. Two pastors later it
              is the same church, in the same building, with new floors and the same Bible.
            </p>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <ol className="relative border-l-2 border-gold/50 pl-6" data-reveal>
              {timeline.map((e, i) => (
                <li key={e.y} className="relative pb-8 last:pb-0" data-reveal={i}>
                  <span className="absolute -left-[2.05rem] top-1.5 h-4 w-4 rounded-full bg-gold ring-4 ring-white" aria-hidden />
                  <p className="time text-sm font-extrabold tracking-widest text-gold-deep">{e.y}</p>
                  <p className="display-soft mt-0.5 text-2xl">{e.t}</p>
                  <p className="mt-1 text-ink/80">{e.p}</p>
                </li>
              ))}
            </ol>
            <div className="grid gap-3 self-start" data-reveal="1">
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.buildingOld.src} alt={photos.buildingOld.alt} width={photos.buildingOld.w} height={photos.buildingOld.h} sizes="(min-width: 1024px) 35vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="bg-paper-deep px-4 py-2 text-sm text-muted">The building before the rebuild: pale blue, red letters.</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.churchFront.src} alt={photos.churchFront.alt} width={photos.churchFront.w} height={photos.churchFront.h} sizes="(min-width: 1024px) 35vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="bg-paper-deep px-4 py-2 text-sm text-muted">The same building in 2026.</figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/about/rebuild" className="btn btn-gold">
              The rebuild, in photos
            </Link>
            <Link href="/about/beliefs" className="btn btn-ghost btn-ghost-ink">
              What we believe
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-brown text-white">
        <div className="wrap grid gap-10 py-16 md:grid-cols-3 md:py-24">
          {[
            ["Independent Baptist", "Self-governing, answerable to no hierarchy, run by its own members under the New Testament pattern."],
            ["King James Bible", "The Authorized 1611 Bible, inspired and preserved, the final authority for faith and practice."],
            ["Old-fashioned", "Hymns, not a worship band. Preaching, not a talk. Lunch, not a coffee bar. A family, not a crowd."],
          ].map(([h, p], i) => (
            <div key={h} data-reveal={i}>
              <p className="display-soft text-3xl text-gold-light">{h}</p>
              <p className="mt-3 text-white/80">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
