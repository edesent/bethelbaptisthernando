"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-40 w-[min(17rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-ink/15">
      <div className="flex items-center justify-between gap-2 bg-brown-deep px-3 py-2 text-white">
        <div className="min-w-0">
          <p className="eyebrow text-[0.58rem] text-gold-light">A Word from Bethel</p>
          <p className="truncate text-sm font-semibold">Confident in Christ</p>
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
    </aside>
  );
}
