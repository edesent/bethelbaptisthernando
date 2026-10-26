/**
 * Everything a pastor or volunteer is likely to change lives in this file:
 * service times, special events, giving, address and links.
 *
 * Sources: the church's own website (bethelbaptisthernando.org — welcome,
 * pastor, history, beliefs, what to expect, ministries), the flyers and photos
 * in its media library, its public Google Calendar, its YouTube channel and
 * Pastor Bankert's texts with Pastor Eli (October 2026). Anything from one
 * source only is listed under "Confirm with the church" in README.md.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bethelhernando.elijahdesent.com";

/**
 * Preview hosts stay out of search. Once NEXT_PUBLIC_SITE_URL is set to the
 * church's real domain this turns off by itself.
 */
export const isDemo = /(\.dfd\.llc|\.vercel\.app|\.elijahdesent\.com)$/.test(new URL(siteUrl).hostname);

/** The church's own time zone. Every "today" and "next service" is worked out here. */
export const TZ = "America/New_York";

export const church = {
  name: "Bethel Baptist Church",
  short: "Bethel",
  street: "N McGee Drive",
  streetNumber: "2289",
  city: "Hernando",
  stateCode: "FL",
  state: "Florida",
  zip: "34442",
  county: "Citrus County",
  /** First service, as Inverness Baptist Church, October 21, 1984. */
  founded: 1984,
  /** First service in the building on McGee Drive. */
  inBuildingSince: 1994,
  /**
   * The church phone, base64'd so it never sits in the HTML for scrapers:
   * `printf 3528600804 | base64`. Rendered by components/Phone.tsx.
   * Never type the digits into a page.
   */
  phoneB64: "MzUyODYwMDgwNA==",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bethel+Baptist+Church+2289+N+McGee+Dr+Hernando+FL+34442",
  mapsEmbed: "https://www.google.com/maps?q=2289+N+McGee+Dr,+Hernando,+FL+34442&output=embed",
  facebook: "https://www.facebook.com/people/Bethel-Baptist-Church/100064539198964/",
  instagram: "https://www.instagram.com/bethelbaptisthernando/",
  youtube: "https://www.youtube.com/@bethelbaptistchurch-hernan2627",
  /** They stream every service on YouTube (seven streams on Sunday, October 25, 2026 alone). */
  streams: true,
  /** The public Google Calendar the church already keeps. The site reads it every hour. */
  calendarIcs: "https://calendar.google.com/calendar/ical/bethelbaptist2289%40gmail.com/public/basic.ics",
  calendarEmbed:
    "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&src=YmV0aGVsYmFwdGlzdDIyODlAZ21haWwuY29t&color=%23039be5",
  /** Google Business Profile rating, October 2026. */
  rating: "5.0",
};

export const pastor = {
  name: "Brandon Bankert",
  styled: "Pastor Brandon Bankert",
  short: "Pastor B.",
  /** Unanimously voted pastor March 2, 2025; ordained December 5, 2025. */
  since: "March 2025",
  /** In his own words, from the church's pastor page. */
  bio: [
    "Pastor Bankert graduated from International Bible College in Stonybrook, NY in 2003.",
    "My wife and I were married in 2011 and we are blessed with our two wonderful children. I was an assistant pastor and Christian school teacher for ten years and have served in various church ministries. I have also served in the bus ministry where we have reached many children for the cause of Christ. God has given me a heart for the lost and a love for God’s people.",
    "We have a great commission to go into all the world and preach the gospel to every creature from the city of Hernando to the uttermost parts of the earth through missions. We invite you to be a part of the Re-Growth of Bethel Baptist Church. God bless you.",
  ],
};

export type Service = {
  id: string;
  name: string;
  /** 0 = Sunday … 6 = Saturday */
  dow: number;
  time24: string;
  /** Human rule, shown beside the time. */
  rule: string;
  note: string;
  /** Only on these weeks of the month (1–5). Omit for every week. */
  nth?: number[];
};

/** The standing weekly schedule, from the church's site and flyers. */
export const services: Service[] = [
  { id: "ss", name: "Sunday School", dow: 0, time24: "10:00", rule: "Sundays", note: "A class for every age, including Bible Explorers for children 4–12." },
  { id: "am", name: "Morning Service", dow: 0, time24: "11:00", rule: "Sundays", note: "Old-fashioned hymns and preaching from the King James Bible." },
  { id: "lunch", name: "Lunch together", dow: 0, time24: "12:00", rule: "Sundays", note: "Every Sunday the church eats together in the fellowship hall. Guests eat free." },
  { id: "pm", name: "Afternoon Service", dow: 0, time24: "13:00", rule: "Sundays", note: "A second, shorter service after lunch." },
  { id: "y4t", name: "Youth for Truth", dow: 3, time24: "18:30", rule: "Wednesdays", note: "Pizza, games and a Bible lesson for teens." },
  { id: "bs", name: "Midweek Bible Study", dow: 3, time24: "19:00", rule: "Wednesdays", note: "Verse by verse. Also on Google Meet for anyone who can’t get out." },
];

/** What happens on the same day every month, from their flyers and calendar. */
export const monthly = [
  { title: "Potluck Sunday", when: "First Sunday after the morning service", where: "Fellowship hall", note: "Bring a dish if you can. If you can’t, come anyway." },
  { title: "Outreach at the Depot", when: "First and third Saturdays, 9:00 AM – noon", where: "Market at the Depot, 300 N Apopka Ave, Inverness", note: "A table at the market. Come anytime between nine and noon." },
  { title: "Prayer Breakfast", when: "Third Saturday, 9:00 AM", where: "Fellowship hall", note: "Breakfast and prayer as a church family, then outreach." },
  { title: "Youth Night at the Inverness Depot", when: "Third Thursday, 5:30 PM", where: "300 N Apopka Ave, Inverness", note: "Meeting the young people of Inverness and giving them the gospel." },
];

/** The Sunday lunch rotation from the church's own "Sunday Supper Schedule" flyer. */
export const lunchRotation = [
  { nth: "1st", meal: "Potluck" },
  { nth: "2nd", meal: "Soup & Salad" },
  { nth: "3rd", meal: "Breakfast" },
  { nth: "4th", meal: "Sandwich Sunday" },
  { nth: "5th", meal: "Southern Sunday" },
];

export type SpecialEvent = {
  title: string;
  /** YYYY-MM-DD in the church's time zone. */
  start: string;
  /** The last day it should still show. After this it drops off by itself. */
  endsOn: string;
  time24?: string;
  when: string;
  summary: string;
  href?: string;
};

/**
 * Special events the calendar feed does not carry, or that deserve a fuller
 * description than a calendar line. Each one disappears after `endsOn`.
 * The church's Google Calendar is read as well (see lib/calendar.ts), so most
 * events need nothing added here.
 */
export const events: SpecialEvent[] = [
  {
    title: "Harvest Fest",
    start: "2026-11-01",
    endsOn: "2026-11-01",
    time24: "10:30",
    when: "Sunday, November 1 · 10:30 AM",
    summary: "Corn hole, axe throwing, a chili cook-off, hayrides, tic-tac-toe and snow cones. Bring your favorite side.",
  },
];

/**
 * The church's own flyers, for the slider on the home page. Newest first.
 * One with `endsOn` drops off after that date. Add a flyer by dropping a
 * JPEG in public/banners/ and listing it here.
 */
export const banners: { src: string; alt: string; href?: string; endsOn?: string }[] = [
  { src: "/banners/harvest-fest.jpg", alt: "Harvest Fest, Sunday November 1 at 10:30 AM: corn hole, axe throwing, chili cook-off, hayrides, tic-tac-toe, snow cones. Bring your favorite side.", href: "/events", endsOn: "2026-11-01" },
  { src: "/banners/sunday-supper.jpg", alt: "Sunday Supper Schedule: first Sunday potluck, second soup and salad, third breakfast, fourth sandwich Sunday, fifth southern Sunday", href: "/visit" },
  { src: "/banners/youth-for-truth.jpg", alt: "Youth for Truth, Wednesdays at 6:30 PM: pizza, games and a Bible lesson. Bring a friend and earn a prize.", href: "/ministries#youth" },
  { src: "/banners/need-a-ride.jpg", alt: "Need a ride to church? The Bethel Baptist Church van, with the church phone number", href: "/visit#ride" },
  { src: "/banners/outreach-depot.jpg", alt: "Outreach Ministry, every first and third Saturday, 9 AM to 12 PM at the Market at the Depot, 300 N Apopka Ave, Inverness", href: "/ministries#outreach" },
  { src: "/banners/hope-and-healing.jpg", alt: "Hope and Healing: compassionate, Christ-centered counseling for individuals, couples and families. Marriage counseling, addictions recovery, depression and anxiety support.", href: "/ministries#counseling" },
  { src: "/banners/potluck-sunday.jpg", alt: "Potluck Sunday, every first Sunday, followed by the afternoon service", href: "/visit" },
  { src: "/banners/minivan.jpg", alt: "Bethel Baptist Church is in need of a minivan. Please help if you are able.", href: "/give" },
];

export const giving = {
  /** Tithe.ly, from the church's site. */
  url: "https://give.tithe.ly/?formId=000e4c6d-0076-49c6-be0e-56648495d720",
  label: "Give online",
  /** From their "Thanks for your tithes and offerings" flyer. */
  buildingGoal: "$20,000",
  mailTo: "Bethel Baptist Church, 2289 N McGee Dr, Hernando, FL 34442",
};

/** Hope & Healing, from the church's flyer. */
export const counseling = {
  name: "Hope & Healing",
  line: "You don’t have to walk alone.",
  summary: "Compassionate, Christ-centered counseling for individuals, couples and families.",
  areas: ["Marriage counseling", "Addictions recovery", "Depression & anxiety support"],
  verse: { text: "He healeth the broken in heart, and bindeth up their wounds.", ref: "Psalm 147:3" },
};

export const nav = [
  { href: "/visit", label: "Visit" },
  { href: "/about", label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/watch", label: "Watch" },
  { href: "/give", label: "Give" },
  { href: "/contact", label: "Contact" },
];
