# Bethel Baptist Church, Hernando, Florida

Website concept for Bethel Baptist Church, 2289 N McGee Drive, Hernando, FL 34442. Pastor Brandon Bankert.
Built October 2026 after Pastor Bankert entered the Small Church Grant and, by text, said the church "is only 20 people, and it’s not inviting to guests… we need to get better."

Preview: https://bethelhernando.elijahdesent.com (hidden from search engines; see "Going live").

## Read this before editing (for people and AI assistants)

- **Next.js 16.2 (App Router) + React 19 + Tailwind CSS v4.** This is NOT Next 13/14:
  - Page `params` and `searchParams` are **Promises**. Write `({ params }: { params: Promise<{ slug: string }> })` and `await` it.
  - Never name a component prop `ref`; it is reserved in React 19.
  - Tailwind v4 has no `tailwind.config.js`. Colours and fonts live in `src/app/globals.css` under `:root` and `@theme inline`. Custom classes go inside `@layer components`.
- **Type curly quotes and apostrophes as the characters themselves (’ “ ”), not as `&rsquo;` / `&ldquo;`.**
- **Deploys:** every push to `main` auto-deploys on Vercel. Run `npm run build` first. If the type-check fails, the live site does not update.
- **Commit email** must be `Elimark1611@gmail.com`, or Vercel blocks the deploy.
- **Fonts are self-hosted** in `src/fonts/` (DM Serif Display for headings, Allura for the one script word, Figtree for text; `bash scripts/get-font.sh "<Family>" <weight>`). Don’t switch to `next/font/google`.
- **Times are set in the sans** (`.time` class), never in the display serif.

## Where things live

| To change… | Edit |
| --- | --- |
| Service times (Sunday and Wednesday) | `services` in `src/lib/site.ts` |
| The monthly rhythm (potluck, outreach, prayer breakfast, youth night) | `monthly` in `src/lib/site.ts` |
| The Sunday lunch rotation | `lunchRotation` in `src/lib/site.ts` |
| A special event with a fuller description (drops off after `endsOn`) | `events` in `src/lib/site.ts` |
| Online giving link, building-fund goal | `giving` in `src/lib/site.ts` |
| Address, phone, Facebook, Instagram, YouTube, calendar | `church` in `src/lib/site.ts` |
| Pastor's bio (his own words) | `pastor` in `src/lib/site.ts` |
| Hope & Healing counseling | `counseling` in `src/lib/site.ts` |
| Navigation | `nav` in `src/lib/site.ts` |
| Photos and their captions | `public/photos/` and `src/lib/photos.ts` |
| The logo | `src/components/Logo.tsx` (their house-and-cross mark, redrawn as SVG) |
| The corner chat prompt | `src/components/ChatPrompt.tsx` |
| The statement of faith | `src/app/about/beliefs/page.tsx` (their exact words) |

## How it works

- **The church's Google Calendar drives the site.** `src/lib/calendar.ts` reads the public iCal feed of `bethelbaptist2289@gmail.com` (the calendar already embedded on the old site), expands weekly and monthly repeats, and feeds "This week at Bethel" on the home page and everything on `/events`. The pastor keeps editing the calendar he already keeps; the site follows within an hour. If the feed is unreachable the standing services and the `events` list in `site.ts` still show. Special events are anything whose title isn't in the standing list at the top of `calendar.ts`.
- **The three things on the home page in the first five seconds** (per Pastor Eli's advice to Pastor Bankert): the pastor's photo and a personal welcome, a chat prompt that invites the visitor to write, and current events. All three are in the strip under the hero.
- **The chat bubble** is Website Chat (`ChatPrompt.tsx` loads the widget; key and wording in `src/config/chat.ts`). It shows the pastor's greeting a few seconds after the page loads; a visitor who writes gets a reply from the pastor's Slack. `OpenChat.tsx` makes any link open it (falls back to `/contact`). If the widget script fails to load, a plain "Message the pastor" button appears instead.
- **Forms** (ride request, prayer, contact) post to `/api/form`, which delivers into the same Slack channel through Website Chat. Until Slack is connected on the chat side the backend answers 503 and the form honestly tells people to call the church. Setting `FORM_WEBHOOK_URL` (a Slack/Teams incoming webhook) overrides that route. Spam defences (`src/lib/spam.ts`): a server-signed load-time token that must be 3 seconds old, two honeypots, an allowlist of fields per form, a per-IP rate limit, a repeat-message check, no links anywhere (bare domains included), two-word names, phone numbers checked with libphonenumber-js (random digits and unassigned area codes fail), and messages that must read like words. Bots get a fake success, so they never learn what tripped them. The chat bubble itself is the Website Chat widget and carries that product's own protections.
- **Next service** is worked out from `services` in the church's time zone. **Events expire by themselves**; pages re-render hourly (`revalidate = 3600` in `layout.tsx`). Keep that line.
- **The rebuild** (`/about/rebuild`) is before/after pairs from the pastor's own photos of the 2025–26 work.
- **Watch** (`src/lib/youtube.ts`) reads the channel RSS feed (every 10 minutes) for the latest stream and the channel's /live page (every 5 minutes) for a stream in progress. The home page and /watch show whichever applies, playing in a lightbox (`VideoLightbox.tsx`) rather than sending people to YouTube. A scheduled stream only shows if it is within the week; the channel has an old scheduled one sitting there. If YouTube can't be read, the last known video id in `youtube.ts` is used.
- **Old-site paths redirect** (`next.config.ts`): /welcome, /what-to-expect, /pastor, /history, /beliefs, /gallery, /give-online.

## Confirm with the church

- **Afternoon Service at 1:00 PM** is from their site, the sign in the fellowship hall and the October 3, 2026 Facebook post ("Beginning this Sunday… Afternoon Service 1:00 PM"). Their calendar also has it at 1:00 weekly from October 11. An older flyer said 1:30 after potluck.
- **Lunch every Sunday** is on their site ("Lunch – 12:00pm") and the fellowship-hall sign; the rotation (potluck, soup & salad, breakfast, sandwich, southern) is their "Sunday Supper Schedule" flyer. "Guests eat free" is an assumption any church would make true; confirm.
- **Youth for Truth 6:30 Wednesdays** from their site and flyers. One Facebook post said 7:00 together with Bible study.
- **Outreach at the Depot, first and third Saturdays at 10** from their flyer and calendar. The December 2025 post moved the prayer breakfast to the third Saturday at 9, followed by outreach.
- **Youth Night at the Inverness Depot, third Thursday 5:30** is a recurring calendar entry; confirm it is still running.
- **Bible Explorers (4–12) and nursery (newborn–3)** from their What to Expect page.
- **Pastor Bankert: voted March 2, 2025, ordained December 5, 2025** from their history page and calendar. The "ten years as assistant pastor and Christian school teacher" and "bus ministry" are his own words.
- **Founded October 21, 1984 as Inverness Baptist Church; building since July 16, 1994; renamed 1993** from their history page.
- **Building fund goal $20,000** from their "Thanks for your tithes and offerings" flyer (2026). **Minivan needed** from an October 2026 flyer. **Pianist needed** from a September 2026 post.
- **Hope & Healing** (marriage, addictions recovery, depression & anxiety) from their flyer. "No charge" is an assumption.
- **Harvest Fest, Sunday November 1, 2026, 10:30 AM** from their October 2026 flyer (corn hole, axe throwing, chili cook-off, hayrides, tic-tac-toe, snow cones). It is in `events` in `site.ts`, not on their Google Calendar.
- **Google rating 5.0** as of October 2026; not shown on the site.
- **Photos** are all the church's own: the pastor's uploads to the old site's media library (the rebuild, the sanctuary, the van, the family), the church Facebook page (lunches, youth rally, VBS, the Depot, the old blue building) and one still from the Sunday livestream. People other than the Bankerts are not named.
- The email address on their old site is deliberately not on this one; the forms and phone are instead.
- Who painted the mural is not known; the site says "a member."

## Rules that keep the site honest

- Real church photos only. No stock photos and no AI images.
- "Watch" exists because they really stream every service.
- The phone number is stored base64 (`phoneB64`) and assembled in the browser by `src/components/Phone.tsx`. Never type the digits into a page.
- No raw email addresses on the site. Link to `/contact`.

## Going live

Set `NEXT_PUBLIC_SITE_URL` to the real domain in Vercel. That turns off the noindex robots rule and fixes canonicals and JSON-LD in one move. **Delete the two demo-tracking lines in `src/app/layout.tsx`** (the comment and the `demo.js` script) when the church pays or goes live.
