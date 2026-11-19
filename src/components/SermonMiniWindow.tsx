"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SermonMiniWindow() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-40 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-gold/40 bg-white shadow-2xl">
      <div className="flex items-center justify-between gap-3 bg-brown-deep px-4 py-3 text-white">
        <span className="text-sm font-bold">A Word from Bethel</span>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Minimize sermon window" : "Open sermon window"}
          className="rounded px-2 py-1 text-sm text-gold-light hover:bg-white/10"
        >
          {open ? "−" : "+"}
        </button>
      </div>
      {open && (
        <>
          <div className="aspect-video bg-brown-deep">
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
          <div className="p-3">
            <p className="text-sm font-semibold text-ink">Confident in Christ</p>
            <a
              href="https://pastors.ai/sermon/confident-in-christ/#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-bold text-gold-deep underline underline-offset-4"
            >
              Watch sermon highlights and quotes
            </a>
          </div>
        </>
      )}
    </aside>
  );
}
