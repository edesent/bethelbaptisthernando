import Link from "next/link";
import { church, nav, pastor, services } from "@/lib/site";
import { fmtTime } from "@/lib/calendar";
import Logo from "./Logo";
import Phone from "./Phone";

export default function Footer() {
  const sunday = services.filter((s) => s.dow === 0);
  const wednesday = services.filter((s) => s.dow === 3);
  return (
    <footer className="bg-brown-deep text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-4">
            <Logo tone="gold" className="h-16 w-auto" />
            <div>
              <p className="display-soft text-3xl">Bethel Baptist Church</p>
              <p className="eyebrow mt-1 text-[0.62rem] text-gold-light">An independent Baptist church · Hernando, Florida</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-white/80">
            “I was glad when they said unto me, Let us go into the house of the Lord.” <span className="text-gold-light">Psalm 122:1</span>
          </p>
          <p className="mt-3 max-w-md text-white/70">
            {pastor.styled}, pastor since {pastor.since}.
          </p>
        </div>
        <div>
          <p className="eyebrow text-gold-light">Find us</p>
          <address className="mt-3 not-italic leading-relaxed text-white/85">
            {church.streetNumber} {church.street}
            <br />
            {church.city}, {church.stateCode} {church.zip}
            <br />
            <Phone className="underline decoration-gold/60 underline-offset-4" />
          </address>
          <p className="eyebrow mt-6 text-gold-light">Sundays</p>
          <ul className="mt-2 space-y-0.5 text-white/85">
            {sunday.map((s) => (
              <li key={s.id}>
                <span className="time font-bold">{fmtTime(s.time24)}</span> {s.name}
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-4 text-gold-light">Wednesdays</p>
          <ul className="mt-2 space-y-0.5 text-white/85">
            {wednesday.map((s) => (
              <li key={s.id}>
                <span className="time font-bold">{fmtTime(s.time24)}</span> {s.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold-light">Pages</p>
          <ul className="mt-3 grid grid-cols-2 gap-y-2 text-white/85">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold-light">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about/beliefs" className="hover:text-gold-light">
                What we believe
              </Link>
            </li>
            <li>
              <Link href="/about/rebuild" className="hover:text-gold-light">
                The rebuild
              </Link>
            </li>
          </ul>
          <p className="mt-6 flex flex-wrap gap-4 text-white/85">
            <a href={church.facebook} className="hover:text-gold-light" rel="noopener">
              Facebook
            </a>
            <a href={church.instagram} className="hover:text-gold-light" rel="noopener">
              Instagram
            </a>
            <a href={church.youtube} className="hover:text-gold-light" rel="noopener">
              YouTube
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-sm text-white/55">
          <span>
            © {new Date().getFullYear()} {church.name} · Since {church.founded}
          </span>
          <span>Hernando, {church.county}, Florida</span>
        </div>
      </div>
    </footer>
  );
}
