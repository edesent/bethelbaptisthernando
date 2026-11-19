"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <section className="bg-paper-deep px-4 py-8 md:py-10">
      <div className="wrap">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-ink/10">
          <div className="bg-brown-deep px-5 py-3 text-white sm:px-7">
            <p className="eyebrow text-gold-light">A Word from Bethel</p>
            <h2 className="display mt-1 text-2xl sm:text-3xl">Confident in Christ</h2>
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
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7">
            <p className="text-sm text-ink/75">Take a moment to hear a message from God’s Word.</p>
            <a
              href="https://pastors.ai/sermon/confident-in-christ/#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gold-deep underline underline-offset-4"
            >
              Sermon highlights and quotes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
