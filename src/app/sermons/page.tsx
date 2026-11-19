import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { SermonLibrarySection } from "@/tools/sermon-library/sermon-library-section";
import { church } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sermons & Devotionals",
  description: "Short sermon messages and weekly Bible devotionals from Bethel Baptist Church in Hernando, Florida.",
};

const devotionals = [
  {
    title: "A Word for the Week",
    reference: "Psalm 119:105",
    verse: "Thy word is a lamp unto my feet, and a light unto my path.",
    reflection: "God’s Word gives direction for the next step, even when we cannot see the whole road ahead. We do not have to solve every question today. We can trust the Lord enough to obey the light He has already given us.",
    apply: "Read Psalm 119:105–112. Ask the Lord to show you one clear step of obedience, then take it this week.",
    prayer: "Lord, help me follow the light of Thy Word today. Give me wisdom for the next step and a willing heart to obey. Amen.",
  },
];

export default function SermonsPage() {
  return (
    <>
      <PageHead
        eyebrow="Grow in the Word"
        title={<>Sermons &amp; <span className="script text-gold-light">Devotionals.</span></>}
        lede="Take the preaching of God’s Word with you through the week. Watch a message, share a short clip, and spend time in Scripture."
        photo="pastorPreaching"
        position="center 35%"
      />
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow text-gold-deep">Recent messages</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">A message to carry with you.</h2>
            <p className="mt-5 text-lg text-ink/80">
              Recent messages from {church.name}. Open a sermon to watch the full teaching and return here for more.
            </p>
          </div>
          <div className="mt-10" data-reveal="1">
            <SermonLibrarySection />
          </div>
          <article className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8" data-reveal="2">
            <p className="eyebrow text-gold-deep">Featured sermon · November 8, 2026</p>
            <h3 className="display mt-3 text-3xl sm:text-4xl">Confident in Christ</h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              Revisit this message and its Scripture encouragement, key quotes, takeaways, and study resources.
            </p>
            <a
              href="https://pastors.ai/sermon/confident-in-christ/#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-6"
            >
              View sermon and quotes
            </a>
          </article>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/watch" className="btn btn-ghost btn-ghost-ink">Watch the full service archive</Link>
            <a href={church.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe on YouTube</a>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="wrap py-16 md:py-24">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow text-gold-deep">Weekly devotional</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Pause. Read. Pray. Follow.</h2>
            <p className="mt-5 text-lg text-ink/80">
              A Scripture reading and practical encouragement to help you put God’s Word into practice this week.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {devotionals.map((d) => (
              <article key={d.title} className="rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-ink/5 md:p-8" data-reveal>
                <p className="eyebrow text-gold-deep">This week’s devotional</p>
                <h3 className="display mt-3 text-3xl">{d.title}</h3>
                <p className="mt-4 font-bold text-gold-deep">{d.reference}</p>
                <blockquote className="display-soft mt-2 border-l-4 border-gold pl-4 text-2xl italic text-ink">“{d.verse}”</blockquote>
                <p className="mt-5 leading-relaxed text-ink/85">{d.reflection}</p>
                <h4 className="eyebrow mt-6 text-gold-deep">Put it into practice</h4>
                <p className="mt-2 text-ink/85">{d.apply}</p>
                <h4 className="eyebrow mt-6 text-gold-deep">Prayer</h4>
                <p className="mt-2 text-ink/85">{d.prayer}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">New devotionals will be added as each sermon is reviewed and prepared for the week.</p>
        </div>
      </section>
    </>
  );
}