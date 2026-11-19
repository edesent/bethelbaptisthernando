"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();
  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <section className="bg-paper" aria-label="Featured sermon">
      <div className="wrap grid items-center gap-6 py-8 md:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] md:gap-8 md:py-10">
        <div className="w-full overflow-hidden rounded-xl bg-brown-deep shadow-lg">
          <div className="aspect-video">
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
        <div className="max-w-xl">
          <p className="eyebrow text-gold-deep">A message from Bethel</p>
          <h2 className="display-soft mt-2 text-3xl text-ink sm:text-4xl">Confident in Christ</h2>
          <a
            href="https://pastors.ai/sermon/confident-in-christ/#quotes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-semibold text-gold-deep underline underline-offset-4"
          >
            Sermon highlights and quotes
          </a>
        </div>
      </div>
    </section>
  );
}
