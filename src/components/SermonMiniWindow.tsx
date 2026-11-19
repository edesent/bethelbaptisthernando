"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <section className="bg-paper-deep py-4 sm:py-5" aria-label="Featured sermon">
      <div className="wrap flex justify-end">
        <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-ink/10 sm:max-w-md">
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
