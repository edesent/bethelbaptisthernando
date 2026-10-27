"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { church, nav } from "@/lib/site";
import Brand from "./Brand";

/**
 * The header is a sibling of the phone menu on purpose: a backdrop-blur
 * header traps a position:fixed child, which makes the menu invisible and
 * untappable on phones.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-brown text-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="wrap flex h-[4.75rem] items-center justify-between gap-4 md:h-[5.5rem]">
          <Link href="/" className="flex items-center" aria-label={`${church.name} home`}>
            <Brand />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition ${
                  path === n.href || (n.href !== "/" && path.startsWith(n.href)) ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/visit" className="btn btn-gold ml-3 px-5 py-2.5 text-sm">
              Sunday <span className="time">10:00 AM</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-2 text-sm font-bold lg:hidden"
            aria-expanded={open}
            aria-controls="phone-menu"
          >
            Menu
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Phone menu: a sibling of the header, never inside it. */}
      <div
        id="phone-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-brown-deep text-white transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="wrap flex h-[4.75rem] items-center justify-between">
          <span className="flex items-center">
            <Brand />
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-2 text-sm font-bold"
          >
            Close
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="wrap flex flex-1 flex-col justify-center gap-0.5 pb-12" aria-label="Main">
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} className="display flex items-baseline justify-between border-b border-white/15 py-3.5 text-[2.1rem]">
              {n.label}
              <span className="time text-sm text-gold-light">0{i + 1}</span>
            </Link>
          ))}
          <p className="mt-8 text-gold-light">
            Sundays <span className="time font-bold text-white">10:00 AM</span> · {church.streetNumber} {church.street}, {church.city}
          </p>
        </nav>
      </div>
    </>
  );
}
