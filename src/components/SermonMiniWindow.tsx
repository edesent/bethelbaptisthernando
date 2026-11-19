"use client";

import { usePathname } from "next/navigation";

const clip1 = {
  title: "Sermon Clip 1",
  src: "https://o3hectmev11nr3rl.public.blob.vercel-storage.com/church-uploads/xgIeiY1N_9oRg8OlNI9dX61JrdBlyCMK/sp_caption_477785_LXHRVHl39Q0_3974_2%202-lyJ6RvMUD1ZqejkL8EE9ZGch7DuPCi.mp4",
};
const clip2 = {
  title: "Sermon Clip 2",
  src: "https://o3hectmev11nr3rl.public.blob.vercel-storage.com/church-uploads/9InS1cLK5eY5U6TFV41OmyheGkYRvB8P/sp_caption_477785_LXHRVHl39Q0_2437_1-cactJLmlisIwGcnnvMTE0khm8sdOLG.mp4",
};
const clip3 = {
  title: "Sermon Clip 3",
  src: "https://o3hectmev11nr3rl.public.blob.vercel-storage.com/church-uploads/dpFvMwdC8WiGMMPjCh7KRYfLrMe0LHlK/sp_caption_477785_LXHRVHl39Q0_3480_3%202-ckUWz31FMHIhMJpvhS8dh3G0Gfdi1m.mp4",
};

const clips: Record<string, typeof clip1> = {
  // Main navigation order: Home, Visit, About, Ministries, Events, Give, Contact.
  // Rotate 1 → 2 → 3 so neighboring pages never repeat a clip.
  "/": clip1,
  "/visit": clip2,
  "/about": clip3,
  "/ministries": clip1,
  "/events": clip2,
  "/give": clip3,
  "/contact": clip1,
  "/watch": clip1,
  // Related pages use a different clip from their parent page.
  "/about/beliefs": clip1,
  "/about/rebuild": clip2,
  "/counseling": clip3,
};

const encouragementByPage: Record<string, { heading: string; verse: string; reference: string }> = {
  "/": {
    heading: "A promise for every day",
    verse: "The LORD is my shepherd; I shall not want.",
    reference: "Psalm 23:1 · KJV",
  },
  "/ministries": {
    heading: "Serve one another",
    verse: "As every man hath received the gift, even so minister the same one to another.",
    reference: "1 Peter 4:10 · KJV",
  },
  "/events": {
    heading: "Gather together in faith",
    verse: "And let us consider one another to provoke unto love and to good works: Not forsaking the assembling of ourselves together.",
    reference: "Hebrews 10:24–25 · KJV",
  },
};

const defaultEncouragement = {
  heading: "A word of encouragement",
  verse: "Thy word is a lamp unto my feet, and a light unto my path.",
  reference: "Psalm 119:105 · KJV",
};

export default function SermonMiniWindow() {
  const pathname = usePathname();
  const clip = clips[pathname];

  if (!clip || pathname === "/sermons" || pathname.startsWith("/sermons/")) return null;

  const encouragement = encouragementByPage[pathname] ?? defaultEncouragement;

  return (
    <section className="bg-paper-deep py-5 sm:py-7" aria-label="Featured sermon clip and Bible encouragement">
      <div className="wrap grid items-center gap-5 md:grid-cols-[1fr_1.1fr] md:gap-8">
        <div className="px-2 py-3 text-center md:px-5 md:text-left">
          <p className="eyebrow text-gold-deep">{encouragement.heading}</p>
          <blockquote className="display mt-3 text-2xl leading-snug text-brown-deep sm:text-3xl">
            “{encouragement.verse}”
          </blockquote>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-gold-deep">{encouragement.reference}</p>
        </div>
        <div className="w-full overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-ink/10">
          <div className="flex items-center justify-between gap-3 bg-brown-deep px-4 py-2 text-white">
            <div className="min-w-0">
              <p className="eyebrow text-[0.6rem] text-gold-light">A Word from Bethel</p>
              <h2 className="truncate text-base font-semibold">{clip.title}</h2>
            </div>
            <a
              href="https://pastors.ai/sermon/confident-in-christ/#quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-bold text-gold-light underline underline-offset-2"
            >
              Highlights
            </a>
          </div>
          <div className="aspect-video w-full bg-brown-deep">
            <video
              title={clip.title}
              src={clip.src}
              className="h-full w-full"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}