"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Banner = { src: string; alt: string; href?: string };

/**
 * The church's own flyers, one at a time, sliding every few seconds. Dots to
 * jump, arrows to step, swipe on a phone, and it pauses while the pointer is
 * over it. Still works with JavaScript off: the first flyer shows.
 */
export default function Banners({ items, interval = 6000 }: { items: Banner[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const n = items.length;

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), interval);
    return () => clearInterval(t);
  }, [paused, n, interval]);

  if (!n) return null;
  const go = (k: number) => setI(((k % n) + n) % n);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-brown-deep shadow-2xl ring-1 ring-ink/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
      aria-roledescription="carousel"
      aria-label="What’s going on at Bethel"
    >
      <div className="relative aspect-[2076/757]">
        {items.map((b, k) => {
          const inner = (
            <Image
              src={b.src}
              alt={b.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              priority={k === 0}
              className="object-cover"
            />
          );
          return (
            <div
              key={b.src}
              className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-hidden={k !== i}
            >
              {b.href ? (
                <a href={b.href} className="block h-full w-full" tabIndex={k === i ? 0 : -1}>
                  {inner}
                </a>
              ) : (
                inner
              )}
            </div>
          );
        })}
      </div>
      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white opacity-0 transition hover:bg-black/70 focus:opacity-100 group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white opacity-0 transition hover:bg-black/70 focus:opacity-100 group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
            {items.map((b, k) => (
              <button
                key={b.src}
                type="button"
                onClick={() => go(k)}
                aria-label={`Slide ${k + 1}: ${b.alt}`}
                aria-current={k === i}
                className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
