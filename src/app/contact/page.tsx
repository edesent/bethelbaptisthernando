import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm, PrayerForm } from "@/components/Forms";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { photos } from "@/lib/photos";
import { church, pastor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Write to ${pastor.styled} at ${church.name}, Hernando, Florida. Ask about a visit, a ride, counseling or a prayer request.`,
};

export default function Contact() {
  return (
    <>
      <PageHead
        eyebrow="Contact"
        title={
          <>
            Write to the pastor. <span className="script text-gold-light">He answers.</span>
          </>
        }
        lede="Questions about a Sunday, a ride, a wedding, a funeral, a hard season. Messages go to Pastor Bankert’s phone and he replies himself."
        photo="pastorWifeSinging"
        position="center 30%"
      />
      <section className="bg-paper">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8" data-reveal>
            <h2 className="display-soft text-2xl">Send a message</h2>
            <p className="mt-1 text-muted">Everything here is read by the pastor only.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div data-reveal="1">
            <figure className="overflow-hidden rounded-2xl shadow-lg">
              <Image src={photos.pastorFamilyCurrent.src} alt={photos.pastorFamilyCurrent.alt} width={photos.pastorFamilyCurrent.w} height={photos.pastorFamilyCurrent.h} sizes="(min-width: 768px) 40vw, 100vw" className="w-full" />
            </figure>
            <p className="eyebrow mt-8 text-gold-deep">Or call</p>
            <p className="mt-2 text-2xl">
              <Phone className="font-bold text-ink underline decoration-gold underline-offset-4" />
            </p>
            <p className="mt-1 text-muted">The church line. Leave a message and someone will call you back.</p>
            <p className="eyebrow mt-8 text-gold-deep">Find us</p>
            <address className="mt-2 not-italic leading-relaxed text-ink/85">
              {church.name}
              <br />
              {church.streetNumber} {church.street}
              <br />
              {church.city}, {church.stateCode} {church.zip}
            </address>
            <p className="eyebrow mt-8 text-gold-deep">Online</p>
            <p className="mt-2 flex flex-wrap gap-4 text-ink/85">
              <a href={church.facebook} rel="noopener" className="font-semibold underline decoration-gold underline-offset-4">
                Facebook
              </a>
              <a href={church.instagram} rel="noopener" className="font-semibold underline decoration-gold underline-offset-4">
                Instagram
              </a>
              <a href={church.youtube} rel="noopener" className="font-semibold underline decoration-gold underline-offset-4">
                YouTube
              </a>
            </p>
          </div>
        </div>
      </section>
      <section id="prayer" className="bg-brown text-white scroll-mt-24">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24">
          <div data-reveal>
            <p className="eyebrow text-gold-light">Prayer</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Let us pray for you.</h2>
            <p className="mt-4 text-white/80">
              A small church prays by name. Tell us what is going on and the church will carry it on Wednesday night, or the pastor alone
              will if you ask.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-ink shadow-xl md:p-8" data-reveal="1">
            <PrayerForm />
          </div>
        </div>
      </section>
    </>
  );
}
