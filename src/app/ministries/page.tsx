import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { photos, type PhotoKey } from "@/lib/photos";
import { church, counseling, counselingPractice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministries",
  description: `What ${church.name} does during the week: outreach at the Inverness Depot, Youth for Truth, the church van, Hope & Healing counseling, and ladies’ and men’s fellowships.`,
};

const big: { id: string; h: string; when: string; p: string; photo: PhotoKey; photo2?: PhotoKey }[] = [
  {
    id: "outreach",
    h: "Outreach at the Depot",
    when: "First and third Saturdays · 9:00 AM – noon · Market at the Depot, 300 N Apopka Ave, Inverness",
    p: "The old train depot in Inverness hosts a market on Saturday mornings. Bethel goes out to meet whoever stops by, sharing the gospel and an invitation to church.",
    photo: "doorToDoor1",
    photo2: "doorToDoor2",
  },
  {
    id: "youth",
    h: "Youth for Truth",
    when: "Wednesdays · 6:30 PM · at the church",
    p: "Pizza, games and a Bible lesson for teenagers, before the adult Bible study at seven. A few times a year the church throws a youth rally with team competition, prizes and preaching, and in July the kids take over the building for Vacation Bible School. We believe our youth are the future, and we must reach them for Christ before the sin of this world gets hold of them.",
    photo: "youthConference",
    photo2: "vbsFlagsWide",
  },
  {
    id: "ride",
    h: "Transportation",
    when: "Sunday mornings · Hernando, Inverness and around",
    p: "The church van picks up anyone who needs a ride. Older members who no longer drive, families with one car, kids whose parents don’t come. Pastor Bankert ran a bus ministry for years before Bethel; this is the same idea with a smaller vehicle. The church is praying for a minivan to add to it.",
    photo: "vanCrew",
  },
  {
    id: "counseling",
    h: counseling.name,
    when: "By appointment with the pastor",
    p: `${counseling.summary} ${counseling.areas.join(", ")}. Call the church or write from the contact page and say you would like to talk; nothing you say leaves the room.`,
    photo: "chalkArtist",
  },
];


const prayerSections = [
  {
    title: "Armstrong Family",
    requests: ["Work"],
  },
  {
    title: "Bankert Family",
    requests: [
      "Pregnancies — Kaylin F, Alizayah M, Tiffany M, Ashley B",
      "Baby Andrew Barnes, Baby Selah Higgins",
      "Crystal Zeiwey (kidney transplant)",
      "Bankert family (health/mom’s eye)",
      "Cifelli family (parents/grandparents/cousin Eva)",
      "Alex Mosh (seizures/brain surgery on 11/23/26)",
      "Yvette O’Donell’s Mom (stage 4)",
      "Pastor (foot pain)",
      "Tim Gabbert (in hospital, fell)",
    ],
  },
  {
    title: "Bus Family",
    requests: ["Layla", "London", "Nahla", "Ah’mari", "Ah’mani", "Anthony", "Maddison"],
  },
  {
    title: "Cook Family",
    requests: [
      "John/Lilia Swanson (bone marrow/stage 3)",
      "Myrtle/Deb (leg pain/pneumonia/back pain)",
    ],
  },
  {
    title: "Extended Church Family",
    requests: ["Mrs. Stine (shoulder recovery)", "George Chiggi (Health)"],
  },
  {
    title: "Glaze Family",
    requests: [
      "Jake Baker/Joe Kelley (addiction/family/jail)",
      "Ryan/Dog Anya/Jean/Melissa (arm/eye/tinnitus/health)",
      "Joe Gonzales’ son (salvation)",
      "Suzanne & Charlie/Flecks (marital)",
      "Melissa (anxiety)",
    ],
  },
  { title: "Jones Family", requests: [] },
  {
    title: "Spell Family",
    requests: ["David (seizures)"],
  },
  {
    title: "Wilson Family",
    requests: [
      "Patty Thompson (heart procedure recovery)",
      "Emmitt/Clark/Shawn/Kevin (unspoken/health/job/dizzy & back)",
    ],
  },
  { title: "Womack Family", requests: [] },
  {
    title: "Special Needs",
    requests: ["American leaders", "Military", "1st responders", "Israel", "Unspokens"],
  },
  {
    title: "Missionaries",
    requests: [
      "Bethesda Children’s Home",
      "Christian Law Association",
      "Hope Children’s Home",
      "Bundles of Hope",
      "Fielder (Worldview Missions)",
      "Hamilton (Moldova)",
      "Holt (Sierra Leone)",
      "Kelly (Deaf communities of America)",
      "Kotvas (Peru)",
      "Lees (Bahamas)",
      "Muscott (Lifeline Baptist Seamen Ministry)",
      "Ottosen (Papua New Guinea)",
      "Parrott (Military Mission)",
      "Rock of Ages (U.S. Prisons)",
      "Rosko (U.S. Military in South Korea)",
      "Wyatt (South Africa)",
    ],
  },
];

const small = [
  ["Sunday School for all ages", "10:00 every Sunday. Adults in the sanctuary, Bible Explorers for ages 4–12, nursery to age three."],
  ["Ladies’ fellowships and Bible studies", "Luncheons with the tables set properly, and studies through the year."],
  ["Men’s fellowships and prayer breakfasts", "Work days, breakfasts, and prayer. The ramp got built this way."],
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
        lede="A family church that keeps a van, a youth night, a counseling ministry and Saturday outreach at the market. Here is all of it."
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
                    <a href={counselingPractice.url} className="btn btn-gold" rel="noopener">
                      Counseling with Pastor Brandon
                    </a>
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
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow text-gold-deep" data-reveal>Prayer together</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl" data-reveal="1">Church prayer list.</h2>
          <p className="mt-4 max-w-3xl text-ink/75" data-reveal="2">
            Please keep these families, individuals, missionaries, and special needs in your prayers.
            We invite our church family to pray faithfully and respectfully for each request.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prayerSections.map((section, index) => (
              <section key={section.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5" data-reveal={String(index)}>
                <h3 className="display-soft text-2xl">{section.title}</h3>
                {section.requests.length > 0 ? (
                  <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-ink/85 marker:font-semibold marker:text-gold-deep">
                    {section.requests.map((request) => (
                      <li key={request} className="pl-1 leading-relaxed">{request}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-5 text-ink/60">No requests listed at this time.</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
