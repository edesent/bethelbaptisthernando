"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <aside className="fixed right-3 top-[5rem] z-30 w-[min(13rem,calc(100vw-1.5rem))] overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-ink/15 sm:right-5 sm:top-[6rem] sm:w-56">
      <div className="bg-brown-deep px-3 py-1.5 text-white">
        <p className="truncate text-xs font-semibold">A Word from Bethel · Confident in Christ</p>
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
      <a
        href="https://pastors.ai/sermon/confident-in-christ/#quotes"
        target="_blank"
        rel="noopener noreferrer"
        className="block px-3 py-1.5 text-right text-xs font-bold text-gold-deep underline underline-offset-2"
      >
        Sermon highlights
      </a>
    </aside>
  );
}
