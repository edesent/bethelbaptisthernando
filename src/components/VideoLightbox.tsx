"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * A video poster that opens the YouTube player in a lightbox instead of
 * sending people off to YouTube. Esc or a click on the dark backdrop closes it.
 */
export default function VideoLightbox({
  id,
  title,
  caption,
  live = false,
  className = "",
}: {
  id: string;
  title: string;
  caption?: string;
  live?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [poster, setPoster] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block w-full overflow-hidden rounded-2xl bg-black text-left shadow-2xl ${className}`}
        aria-label={`Play: ${title}`}
      >
        <Image
          src={poster}
          alt=""
          width={1280}
          height={720}
          unoptimized
          onError={() => setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.05)_55%)]" aria-hidden />
        {live && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden /> Live now
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-brown shadow-xl transition group-hover:scale-105">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        {caption && <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white/90 sm:text-base">{caption}</span>}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 p-3 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-2 text-sm font-bold text-white hover:bg-white/15"
            >
              Close
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/20">
              <iframe
                title={title}
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
