import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";

/** The photographic band at the top of every inner page. */
export default function PageHead({
  eyebrow,
  title,
  lede,
  photo = "congregation",
  position = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  photo?: PhotoKey;
  position?: string;
}) {
  const p = photos[photo];
  return (
    <section className="relative isolate overflow-hidden bg-brown-deep text-white">
      <Image src={p.src} alt={p.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(29,24,21,0.95)_0%,rgba(29,24,21,0.7)_45%,rgba(29,24,21,0.35)_100%)]" aria-hidden />
      <div className="wrap relative pb-14 pt-16 md:pb-20 md:pt-24">
        <p className="eyebrow text-shadow text-gold-light">{eyebrow}</p>
        <h1 className="display text-shadow mt-3 max-w-4xl text-[2.7rem] sm:text-6xl md:text-7xl">{title}</h1>
        {lede && <p className="text-shadow mt-5 max-w-2xl text-lg text-white/85 sm:text-xl">{lede}</p>}
      </div>
    </section>
  );
}
