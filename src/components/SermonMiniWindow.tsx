"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <section className="bg-paper-deep px-4 py-5 md:py-6">
      <div className="wrap">
        <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-ink/10">
          <div className="bg-brown-deep px-4 py-2 text-white">
            <p className="eyebrow text-gold-light">A Word from Bethel</p>
            <h2 className="display mt-0.5 text-xl">Confident in Christ</h2>
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
          <div className="flex items-center justify-between gap-2 px-4 py-2.5">
            <p className="text-xs text-ink/75">A message from God’s Word</p>
            <a
              href="https://pastors.ai/sermon/confident-in-christ/#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gold-deep underline underline-offset-4"
            >
              Sermon highlights
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
