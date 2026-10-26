import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RideForm } from "@/components/Forms";
import NextUp from "@/components/NextUp";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { photos } from "@/lib/photos";
import { church } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan a visit",
  description: `What a Sunday at ${church.name} is like: Sunday School 10:00, Morning Service 11:00, lunch at noon, Afternoon Service at 1:00. Where to park, what to wear, what there is for children, and how to get a ride on the church van.`,
};

const faq = [
  {
    q: "What is the music like?",
    a: "Hymns from the hymnbook, with a piano. The church sings the old songs and sings them out. Nothing you have to know ahead of time.",
  },
  {
    q: "What Bible do you use?",
    a: "The King James. Bring yours if you have one; there are Bibles in the chairs if you don’t. Pastor Bankert preaches through books of the Bible and tells you where he is.",
  },
  {
    q: "What should I wear?",
    a: "Many members dress up on Sunday. It isn’t required, and nobody will look twice. Come in what you have.",
  },
  {
    q: "What about my kids?",
    a: "A nursery for newborns to age three, staffed by ladies of the church, so you can sit through the service worry-free. Bible Explorers, for ages 4–12, meets during the Sunday morning service with songs, games and a lesson. Teens are welcome in the service and at Youth for Truth on Wednesdays.",
  },
  {
    q: "Will I be singled out?",
    a: "No. You will be greeted at the door, and the pastor will likely come find you to say hello. You won’t be asked to stand, speak or fill anything out.",
  },
  {
    q: "Is there really lunch every Sunday?",
    a: "Yes. The whole church eats together at noon in the fellowship hall, every week. Guests don’t bring anything.",
  },
  {
    q: "Is the building accessible?",
    a: "Yes. A new ramp was built in 2026, there is handicapped parking at the door, and the restrooms were rebuilt the same year.",
  },
];

export default function Visit() {
  return (
    <>
      <PageHead
        eyebrow="Plan a visit"
        title={
          <>
            Sunday at ten. <span className="script text-gold-light">You’re expected.</span>
          </>
        }
        lede="2289 N McGee Drive, just off Highway 41 north of Inverness. A white building with a tall steeple. Here is everything you might wonder about before you come."
        photo="congregation"
        position="center 40%"
      />

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div data-reveal>
            <NextUp />
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-gold-deep">How a Sunday goes</p>
            <ol className="mt-4 space-y-4">
              {[
                ["10:00", "Sunday School", "Grown-ups in the sanctuary, Bible Explorers for the kids, nursery for the littlest."],
                ["11:00", "Morning Service", "Hymns, prayer, and the preaching. About an hour."],
                ["12:00", "Lunch", "Everyone, in the fellowship hall. Potluck the first Sunday, soup and salad the second, breakfast the third, sandwiches the fourth."],
                ["1:00", "Afternoon Service", "Shorter. Then home by two."],
              ].map(([t, h, p]) => (
                <li key={h} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
                  <span className="time w-14 shrink-0 text-right text-lg font-extrabold text-gold-deep">{t}</span>
                  <span>
                    <span className="display-soft block text-xl">{h}</span>
                    <span className="block text-ink/75">{p}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div data-reveal>
            <p className="eyebrow text-gold-deep">Questions people ask</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Before you come.</h2>
            <dl className="mt-8 divide-y divide-ink/10">
              {faq.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="display-soft text-xl">{f.q}</dt>
                  <dd className="mt-1.5 text-ink/80">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-3 self-start" data-reveal="1">
            <figure className="overflow-hidden rounded-2xl shadow-lg">
              <Image src={photos.sanctuary.src} alt={photos.sanctuary.alt} width={photos.sanctuary.w} height={photos.sanctuary.h} sizes="(min-width: 768px) 40vw, 100vw" className="w-full" />
              <figcaption className="bg-paper-deep px-4 py-2 text-sm text-muted">The sanctuary. Sit anywhere.</figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.vbsKids.src} alt={photos.vbsKids.alt} width={photos.vbsKids.w} height={photos.vbsKids.h} sizes="20vw" className="aspect-square w-full object-cover" />
              </figure>
              <figure className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={photos.piano.src} alt={photos.piano.alt} width={photos.piano.w} height={photos.piano.h} sizes="20vw" className="aspect-square w-full object-cover" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* RIDE */}
      <section id="ride" className="bg-paper-deep scroll-mt-24">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24">
          <div data-reveal>
            <figure className="overflow-hidden rounded-2xl shadow-xl">
              <Image src={photos.van.src} alt={photos.van.alt} width={photos.van.w} height={photos.van.h} sizes="(min-width: 768px) 40vw, 100vw" className="w-full" />
            </figure>
            <p className="eyebrow mt-8 text-gold-deep">Need a ride to church?</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">The van will come get you.</h2>
            <p className="mt-4 text-lg text-ink/80">
              If you don’t drive, can’t drive anymore, or the car won’t start, say so. The church van runs Sunday mornings in Hernando,
              Inverness and the area around them. Ask here, or call <Phone className="font-semibold text-gold-deep underline underline-offset-4" />.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8" data-reveal="1">
            <RideForm />
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section className="bg-white">
        <div className="wrap grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div data-reveal>
            <p className="eyebrow text-gold-deep">Find us</p>
            <h2 className="display mt-3 text-4xl">McGee Drive</h2>
            <address className="mt-5 text-lg not-italic leading-relaxed">
              {church.name}
              <br />
              {church.streetNumber} {church.street}
              <br />
              {church.city}, {church.stateCode} {church.zip}
            </address>
            <p className="mt-3 text-lg">
              <Phone className="font-semibold text-gold-deep underline underline-offset-4" />
            </p>
            <p className="mt-4 text-ink/75">
              From Inverness, take US-41 north about five miles. Turn right on N McGee Drive. The church is on the left, with the steeple
              and the new sign at the road.
            </p>
            <a href={church.mapsUrl} className="btn btn-gold mt-6" rel="noopener">
              Open in Google Maps
            </a>
            <p className="mt-8 text-sm text-muted">
              Watching first? Every service streams on{" "}
              <Link href="/watch" className="font-semibold text-gold-deep underline underline-offset-4">
                YouTube
              </Link>
              .
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-ink/10" data-reveal="1">
            <iframe
              title="Map to Bethel Baptist Church"
              src={church.mapsEmbed}
              className="h-[22rem] w-full md:h-full md:min-h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
