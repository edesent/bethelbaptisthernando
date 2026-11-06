import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { church, counseling, counselingPractice, pastor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Counseling",
  description: `Christian counseling with ${pastor.styled} — marriage, premarital, addiction recovery and depression support — through Citrus Marriage Counseling, a ministry of ${church.name}.`,
};

export default function Counseling() {
  return (
    <>
      <PageHead
        eyebrow="Counseling"
        title={
          <>
            {counseling.name}. <span className="script text-gold-light">You don’t have to walk alone.</span>
          </>
        }
        lede="Pastor Bankert counsels individuals, couples and families from Scripture, whether or not you attend Bethel."
        photo="chalkArtist"
      />
      <section className="bg-paper">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div data-reveal>
            <p className="text-lg text-ink/85">
              {counseling.summary} {counseling.areas.join(", ")}. Nothing you say leaves the room.
            </p>
            <p className="mt-5 text-ink/80">
              Counseling at Bethel is now also offered through <strong>{counselingPractice.name}</strong>, Pastor Bankert’s counseling
              practice and a ministry of the church. The first conversation is always free, and sessions can be booked directly online.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={counselingPractice.consultUrl} className="btn btn-gold" rel="noopener">
                Book a free consultation
              </a>
              <a href={counselingPractice.url} className="btn btn-ink" rel="noopener">
                Visit {counselingPractice.name}
              </a>
            </div>
            <p className="mt-6 text-ink/75">
              Prefer to just call or talk to the pastor directly? Reach the church at{" "}
              <Phone className="font-semibold text-gold-deep underline underline-offset-4" />, or{" "}
              <Link href="/contact" className="font-semibold text-gold-deep underline underline-offset-4">
                write from the contact page
              </Link>
              .
            </p>
          </div>
          <div className="self-start rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8" data-reveal="1">
            <p className="eyebrow text-gold-deep">Areas</p>
            <ul className="mt-3 space-y-2 text-ink/85">
              {counseling.areas.map((a) => (
                <li key={a} className="border-t border-ink/10 pt-2 first:border-0 first:pt-0">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">
              “{counseling.verse.text}” <span className="text-gold-deep">{counseling.verse.ref}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
