"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <section className="bg-paper-deep py-5 sm:py-7" aria-label="Featured sermon and Bible encouragement">
      <div className="wrap grid items-center gap-5 md:grid-cols-[1fr_1.1fr] md:gap-8">
        <div className="px-2 py-3 text-center md:px-5 md:text-left">
          <p className="eyebrow text-gold-deep">A promise to hold on to</p>
          <blockquote className="display mt-3 text-2xl leading-snug text-brown-deep sm:text-3xl">
            “I am the way, the truth, and the life: no man cometh unto the Father, but by me.”
          </blockquote>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-gold-deep">John 14:6 · KJV</p>
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
