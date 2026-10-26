import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { photos } from "@/lib/photos";
import { church, giving } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description: `Give to ${church.name} online through Tithe.ly, in the offering on Sunday, or by mail. The building fund, the van, and the gospel on McGee Drive.`,
};

export default function Give() {
  return (
    <>
      <PageHead
        eyebrow="Give"
        title={
          <>
            Help keep <span className="script text-gold-light">the doors open.</span>
          </>
        }
        lede="A small church pays its own way. Here is what your giving does, and the three ways to do it."
        photo="tablesSet"
        position="center 55%"
      />
      <section className="bg-paper">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div data-reveal>
            <p className="eyebrow text-gold-deep">Three ways</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <p className="display-soft text-2xl">Online</p>
                <p className="mt-1 text-ink/75">Through Tithe.ly, one time or monthly. Card or bank. A receipt comes by email.</p>
                <a href={giving.url} className="btn btn-gold mt-4" rel="noopener">
                  Give online
                </a>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <p className="display-soft text-2xl">On Sunday</p>
                <p className="mt-1 text-ink/75">The offering is received during the morning service. Cash or check to Bethel Baptist Church.</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <p className="display-soft text-2xl">By mail</p>
                <p className="mt-1 text-ink/75">{giving.mailTo}</p>
              </div>
            </div>
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-gold-deep">Where it goes</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">The building, the van, the gospel.</h2>
            <div className="prose-site mt-6 text-lg text-ink/85">
              <p>
                In 2025 and 2026 the members rebuilt the church with their own hands, and the church is still praying toward{" "}
                {giving.buildingGoal} of repairs on its buildings. The van runs every Sunday on gas and tires. Tracts go out at the Depot
                twice a month. Missionaries get supported from Hernando to the uttermost parts of the earth.
              </p>
              <p>Nobody at Bethel is paid from the offering. It all goes to the work.</p>
            </div>
            <figure className="mt-8 overflow-hidden rounded-2xl shadow-lg">
              <Image src={photos.yardWork.src} alt={photos.yardWork.alt} width={photos.yardWork.w} height={photos.yardWork.h} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover object-[center_30%]" />
            </figure>
            <p className="mt-6 text-muted">
              Questions about giving, or about the building fund?{" "}
              <Link href="/contact" className="font-semibold text-gold-deep underline underline-offset-4">
                Ask the pastor
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
