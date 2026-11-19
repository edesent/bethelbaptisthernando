"use client";

import { usePathname } from "next/navigation";

const encouragementByPage: Record<string, { heading: string; verse: string; reference: string }> = {
  "/": {
    heading: "A promise for every day",
    verse: "The LORD is my shepherd; I shall not want.",
    reference: "Psalm 23:1 · KJV",
  },
  "/about": {
    heading: "Built on the truth",
    verse: "For other foundation can no man lay than that is laid, which is Jesus Christ.",
    reference: "1 Corinthians 3:11 · KJV",
  },
  "/about/beliefs": {
    heading: "Standing on God's Word",
    verse: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.",
    reference: "2 Timothy 3:16 · KJV",
  },
  "/about/rebuild": {
    heading: "God makes all things new",
    verse: "Behold, I will do a new thing; now it shall spring forth; shall ye not know it?",
    reference: "Isaiah 43:19 · KJV",
  },
  "/contact": {
    heading: "You are always welcome",
    verse: "Let brotherly love continue.",
    reference: "Hebrews 13:1 · KJV",
  },
  "/counseling": {
    heading: "There is hope in the Lord",
    verse: "Cast thy burden upon the LORD, and he shall sustain thee.",
    reference: "Psalm 55:22 · KJV",
  },
  "/events": {
    heading: "Gather together in faith",
    verse: "And let us consider one another to provoke unto love and to good works: Not forsaking the assembling of ourselves together.",
    reference: "Hebrews 10:24–25 · KJV",
  },
  "/give": {
    heading: "Give with a willing heart",
    verse: "God loveth a cheerful giver.",
    reference: "2 Corinthians 9:7 · KJV",
  },
  "/ministries": {
    heading: "Serve one another",
    verse: "As every man hath received the gift, even so minister the same one to another.",
    reference: "1 Peter 4:10 · KJV",
  },
  "/stats": {
    heading: "Faithful in every season",
    verse: "Moreover it is required in stewards, that a man be found faithful.",
    reference: "1 Corinthians 4:2 · KJV",
  },
  "/visit": {
    heading: "Come and see",
    verse: "O come, let us worship and bow down: let us kneel before the LORD our maker.",
    reference: "Psalm 95:6 · KJV",
  },
  "/watch": {
    heading: "Keep your eyes on Christ",
    verse: "Looking unto Jesus the author and finisher of our faith.",
    reference: "Hebrews 12:2 · KJV",
  },
};

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  const encouragement = encouragementByPage[pathname] ?? {
    heading: "A word of encouragement",
    verse: "The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.",
    reference: "Nahum 1:7 · KJV",
  };

  return (
    <section className="bg-paper-deep py-5 sm:py-7" aria-label="Featured sermon and Bible encouragement">
      <div className="wrap grid items-center gap-5 md:grid-cols-[1fr_1.1fr] md:gap-8">
        <div className="px-2 py-3 text-center md:px-5 md:text-left">
          <p className="eyebrow text-gold-deep">{encouragement.heading}</p>
          <blockquote className="display mt-3 text-2xl leading-snug text-brown-deep sm:text-3xl">
            “{encouragement.verse}”
          </blockquote>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-gold-deep">{encouragement.reference}</p>
        </div>
        <div className="w-full overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-ink/10">
          <div className="flex items-center justify-between gap-3 bg-brown-deep px-4 py-2 text-white">
            <div className="min-w-0">
              <p className="eyebrow text-[0.6rem] text-gold-light">A Word from Bethel</p>
              <h2 className="truncate text-base font-semibold">Confident in Christ</h2>
            </div>
            <a
              href="https://pastors.ai/sermon/confident-in-christ/#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-bold text-gold-light underline underline-offset-2"
            >
              Highlights
            </a>
          </div>
          <div className="aspect-video w-full bg-brown-deep">
            <iframe
              title="Confident in Christ sermon"
              src="https://www.youtube-nocookie.com/embed?listType=user_uploads&list=BethelBaptistChurch-Hernan2627"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
