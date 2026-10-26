import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { photos, type PhotoKey } from "@/lib/photos";
import { church, counseling } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministries",
  description: `What ${church.name} does during the week: outreach at the Inverness Depot, Youth for Truth, the church van, Hope & Healing counseling, prayer breakfast, nursing home visits, ladies’ and men’s fellowships.`,
};

const big: { id: string; h: string; when: string; p: string; photo: PhotoKey; photo2?: PhotoKey }[] = [
  {
    id: "outreach",
    h: "Outreach at the Depot",
    when: "First and third Saturdays · 10:00 AM · 300 N Apopka Ave, Inverness",
    p: "The old train depot in Inverness hosts a market on Saturday mornings. Bethel sets up a table, talks to whoever stops, and goes out into the area with the gospel and an invitation to church. On the third Saturday the morning starts at nine with the prayer breakfast at the church first.",
    photo: "depotTable",
    photo2: "depot",
  },
  {
    id: "youth",
    h: "Youth for Truth",
    when: "Wednesdays · 6:30 PM · at the church",
    p: "Pizza, games and a Bible lesson for teenagers, before the adult Bible study at seven. A few times a year the church throws a youth rally with team competition, prizes and preaching, and in July the kids take over the building for Vacation Bible School. On the third Thursday of the month a group goes to the Inverness Depot to meet the young people who hang out there.",
    photo: "youthRally",
    photo2: "vbsKids",
  },
  {
    id: "ride",
    h: "Transportation",
    when: "Sunday mornings · Hernando, Inverness and around",
    p: "The church van picks up anyone who needs a ride. Older members who no longer drive, families with one car, kids whose parents don’t come. Pastor Bankert ran a bus ministry for years before Bethel; this is the same idea with a smaller vehicle. The church is praying for a minivan to add to it.",
    photo: "van",
  },
  {
    id: "counseling",
    h: counseling.name,
    when: "By appointment with the pastor",
    p: `${counseling.summary} ${counseling.areas.join(", ")}. There is no charge. Call the church or write from the contact page and say you would like to talk; nothing you say leaves the room.`,
    photo: "chalkArtist",
  },
];

const small = [
  ["Sunday School for all ages", "10:00 every Sunday. Adults in the sanctuary, Bible Explorers for ages 4–12, nursery to age three."],
  ["Prayer Breakfast", "Third Saturday at nine. Breakfast, prayer and a devotion as a church family, then outreach at ten."],
  ["Ladies’ fellowships and Bible studies", "Luncheons with the tables set properly, and studies through the year."],
  ["Men’s fellowships and prayer breakfasts", "Work days, breakfasts, and prayer. The ramp got built this way."],
  ["Nursing home ministry", "Services and visits at nursing homes in the area, for people who can’t come to us."],
  ["Soul winning and street ministry", "Door to door and at the Depot, with tracts and an invitation."],
  ["Bible conferences and special meetings", "Guest preachers, the Faith, Fathers & Family conference in January, revival meetings."],
  ["Counseling with the pastor", "Marriage, grief, decisions. Ask."],
];

export default function Ministries() {
  return (
    <>
      <PageHead
        eyebrow="Ministries"
        title={
          <>
            What we do <span className="script text-gold-light">the rest of the week.</span>
          </>
        }
        lede="A family church that keeps a van, a youth night, a counseling ministry and a Saturday table at the market. Here is all of it."
        photo="lawnGames"
        position="center 45%"
      />
      <section className="bg-paper">
        <div className="wrap space-y-20 py-16 md:py-24">
          {big.map((m, i) => (
            <div key={m.id} id={m.id} className={`grid scroll-mt-24 gap-8 md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`} data-reveal>
              <div className="grid gap-3">
                <figure className="overflow-hidden rounded-2xl shadow-xl">
                  <Image src={photos[m.photo].src} alt={photos[m.photo].alt} width={photos[m.photo].w} height={photos[m.photo].h} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                </figure>
                {m.photo2 && (
                  <figure className="overflow-hidden rounded-2xl shadow-lg">
                    <Image src={photos[m.photo2].src} alt={photos[m.photo2].alt} width={photos[m.photo2].w} height={photos[m.photo2].h} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[2/1] w-full object-cover" />
                  </figure>
                )}
              </div>
              <div>
                <p className="eyebrow text-gold-deep">{m.when}</p>
                <h2 className="display mt-3 text-4xl sm:text-5xl">{m.h}</h2>
                <p className="mt-5 text-lg text-ink/85">{m.p}</p>
                {m.id === "ride" && (
                  <Link href="/visit#ride" className="btn btn-gold mt-6">
                    Ask for a ride
                  </Link>
                )}
                {m.id === "counseling" && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link href="/contact" className="btn btn-ink">
                      Ask to talk
                    </Link>
                    <Phone className="font-semibold text-gold-deep underline underline-offset-4" />
                  </div>
                )}
                {m.id === "counseling" && (
                  <p className="mt-6 text-muted">
                    “{counseling.verse.text}” <span className="text-gold-deep">{counseling.verse.ref}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow text-gold-deep" data-reveal>
            And also
          </p>
          <h2 className="display mt-3 text-4xl sm:text-5xl" data-reveal="1">
            The rest of the list.
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2" data-reveal="2">
            {small.map(([h, p]) => (
              <li key={h} className="border-t border-ink/10 pt-4">
                <p className="display-soft text-xl">{h}</p>
                <p className="mt-1 text-ink/75">{p}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl bg-gold-pale p-6 md:flex md:items-center md:justify-between" data-reveal>
            <div>
              <p className="display-soft text-2xl">Pianist needed.</p>
              <p className="mt-1 text-ink/75">If you play and have a heart to serve the Lord with it, the church would love to hear from you.</p>
            </div>
            <Link href="/contact" className="btn btn-ink mt-4 md:mt-0">
              Say hello
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
