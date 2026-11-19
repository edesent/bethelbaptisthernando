"use client";

import { usePathname } from "next/navigation";

export default function SermonMiniWindow() {
  const pathname = usePathname();

  if (pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-6" aria-label="Featured sermon">
      <div className="flex flex-col overflow-hidden rounded-xl border border-gold/30 bg-white shadow-sm sm:flex-row">
        <div className="aspect-video w-full shrink-0 bg-brown-deep sm:w-64">
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
        <div className="flex flex-col justify-center p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-deep">Featured sermon</p>
          <h2 className="mt-1 font-display text-xl text-ink">Confident in Christ</h2>
          <p className="mt-1 text-sm text-ink/75">Take a moment for a word of encouragement from God’s Word.</p>
          <a
            href="https://pastors.ai/sermon/confident-in-christ/#quotes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-bold text-gold-deep underline underline-offset-4"
          >
            Watch sermon highlights and quotes
          </a>
        </div>
      </div>
    </section>
  );
}