import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { photos, type PhotoKey } from "@/lib/photos";
import { church, giving } from "@/lib/site";

export const metadata: Metadata = {
  title: "The rebuild",
  description: `In 2025 and 2026 the members of ${church.name} rebuilt their church with their own hands: floors, ramp, roof, sanctuary, restrooms, sign. Before and after, in their own photos.`,
};

const pairs: { h: string; p: string; before: PhotoKey; after: PhotoKey }[] = [
  { h: "The ramp", p: "The old decking had rotted through. It came out down to the posts on a Saturday and went back as new pressure-treated lumber with a rail.", before: "rampBefore", after: "rampAfter" },
  { h: "The sanctuary", p: "Chairs to one side, ladders up, every wall painted. Then a member climbed up and painted the mural behind the pulpit: the cross on a hill under a sunrise.", before: "sanctuaryBefore", after: "sanctuaryMural" },
  { h: "The floors", p: "The platform came up to the subfloor and went back down in wood. The hallways got the same.", before: "floorBefore", after: "floorAfter" },
  { h: "The sign", p: "The rusted post at the road came down. A new sign went up with the church’s name and an arrow, so you can find us.", before: "signBefore", after: "signAfter" },
];

const more: PhotoKey[] = ["roof", "stepsAfter", "bathroomReno", "muralPainting", "yardWork", "kidsBuckets", "sanctuary", "churchFront"];

export default function Rebuild() {
  return (
    <>
      <PageHead
        eyebrow="2025 – 2026"
        title={
          <>
            Rebuilt <span className="script text-gold-light">by hand.</span>
          </>
        }
        lede="No contractor. A family church, on Saturdays and weeknights, for about a year. Grand reopening March 1, 2026, with lunch."
        photo="yardWork"
        position="center 42%"
      />
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <p className="text-lg text-ink/85 sm:text-xl">
              When Pastor Bankert came in 2025 the building was tired. The church did not hire it out. Members tore out, hauled, painted,
              coated the roof in the Florida sun and laid floor on their knees. The photos are the pastor’s, taken on the days it happened.
            </p>
          </div>
          <div className="mt-14 space-y-16">
            {pairs.map((pair, i) => {
              const b = photos[pair.before];
              const a = photos[pair.after];
              return (
                <div key={pair.h} className="grid gap-6 md:grid-cols-[0.7fr_1fr_1fr] md:items-center" data-reveal>
                  <div>
                    <p className="eyebrow text-gold-deep">0{i + 1}</p>
                    <h2 className="display mt-2 text-4xl">{pair.h}</h2>
                    <p className="mt-3 text-ink/80">{pair.p}</p>
                  </div>
                  <figure className="relative overflow-hidden rounded-2xl shadow-lg">
                    <Image src={b.src} alt={b.alt} width={b.w} height={b.h} sizes="(min-width: 768px) 35vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="tag absolute left-3 top-3 bg-white/90 text-brown">Before</figcaption>
                  </figure>
                  <figure className="relative overflow-hidden rounded-2xl shadow-lg">
                    <Image src={a.src} alt={a.alt} width={a.w} height={a.h} sizes="(min-width: 768px) 35vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="tag absolute left-3 top-3 bg-gold text-white">After</figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow text-gold-deep" data-reveal>
            And the rest
          </p>
          <h2 className="display mt-3 text-4xl sm:text-5xl" data-reveal="1">
            Roof, steps, restrooms, yard.
          </h2>
          <div className="mt-10 columns-2 gap-3 md:columns-4 [&>figure]:mb-3 [&>figure]:break-inside-avoid" data-reveal="2">
            {more.map((k) => {
              const p = photos[k];
              return (
                <figure key={k} className="overflow-hidden rounded-2xl shadow-md">
                  <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 25vw, 50vw" className="w-full" />
                </figure>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-brown text-white">
        <div className="wrap grid gap-8 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div data-reveal>
            <p className="eyebrow text-gold-light">Still to do</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">The building fund.</h2>
            <p className="mt-4 text-white/80">
              The church is still praying toward {giving.buildingGoal} of repairs on its buildings, and is looking for a minivan for the
              transportation ministry. Every dollar goes to the building or the gospel; nobody at Bethel draws a salary from it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end" data-reveal="1">
            <Link href="/give" className="btn btn-gold">
              Give to the building fund
            </Link>
            <Link href="/give#ways" className="btn btn-ghost">
              Other ways
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
