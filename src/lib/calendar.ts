import { events as staticEvents, church, services, TZ } from "./site";

/**
 * Reads the church's public Google Calendar (the one the pastor already
 * keeps) and turns it into dated entries in the church's own time zone.
 * Weekly and monthly repeats are expanded here, so "Prayer Breakfast, third
 * Saturday" shows up on the right day each month. The site re-reads the
 * feed every hour (revalidate in layout.tsx); if the feed is ever
 * unreachable the standing schedule and the events in site.ts still show.
 */

export type CalEntry = {
  date: string; // YYYY-MM-DD, church-local
  time24: string | null; // null = all day
  endTime24?: string | null;
  title: string;
  location: string;
  description: string;
  /** True when the title matches one of the standing services in site.ts. */
  standing: boolean;
  source: "calendar" | "site";
  href?: string;
};

const DAY = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 } as const;
type DayKey = keyof typeof DAY;

/** Titles that are part of the weekly/monthly rhythm, not special events. */
const standingTitles = [
  ...services.map((s) => s.name),
  "Evening Service",
  "Potluck",
  "Prayer Breakfast",
  "Prayer breakfast",
  "Church-wide Outreach",
  "Churchwide Outreach",
  "Outreach at The Depot",
  "Youth Night at Inverness Depot",
  "Youth for Truth",
  "Youth4Truth",
  "Business Meeting",
].map((t) => t.toLowerCase());

export const isStanding = (title: string) => {
  const t = title.trim().toLowerCase();
  return standingTitles.some((s) => t === s || t.startsWith(s));
};

/* ---------- dates (all on plain strings; only "now" reads the clock) ---------- */

const utc = (iso: string) => new Date(`${iso}T12:00:00Z`);
export const addDays = (iso: string, n: number) => {
  const d = utc(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
export const weekday = (iso: string) => utc(iso).getUTCDay();
const nthOfMonth = (iso: string) => Math.ceil(Number(iso.slice(8, 10)) / 7);
const lastOfMonth = (iso: string) => {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0, 12)).getUTCDate();
};

export function nowInChurch() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** A UTC instant → church-local YYYY-MM-DD and HH:MM. */
function localParts(d: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}

/** Parse an iCalendar date-time value into church-local date + time. */
function parseDt(value: string, params: string): { date: string; time: string | null } {
  if (/VALUE=DATE\b/.test(params) || /^\d{8}$/.test(value)) {
    return { date: `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`, time: null };
  }
  const m = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z?)$/);
  if (!m) return { date: value.slice(0, 10), time: null };
  const [, y, mo, d, h, mi, , z] = m;
  if (z === "Z") {
    const p = localParts(new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi)));
    return { date: p.date, time: p.time };
  }
  // A TZID (the church's own zone) or floating time: take it as written.
  return { date: `${y}-${mo}-${d}`, time: `${h}:${mi}` };
}

type RawEvent = {
  start: { date: string; time: string | null };
  end: { date: string; time: string | null } | null;
  summary: string;
  location: string;
  description: string;
  rrule: string;
  exdates: Set<string>;
  recurrenceId: string | null;
  uid: string;
};

function unescapeIcs(s: string) {
  return s.replace(/\\n/g, "\n").replace(/\\,/g, ",").replace(/\;/g, ";").replace(/\\\\/g, "\\").trim();
}

export function parseIcs(text: string): RawEvent[] {
  const unfolded = text.replace(/\r?\n[ \t]/g, "");
  const blocks = unfolded.split("BEGIN:VEVENT").slice(1);
  const out: RawEvent[] = [];
  for (const block of blocks) {
    const body = block.split("END:VEVENT")[0];
    const lines = body.split(/\r?\n/);
    const ev: RawEvent = {
      start: { date: "", time: null },
      end: null,
      summary: "",
      location: "",
      description: "",
      rrule: "",
      exdates: new Set(),
      recurrenceId: null,
      uid: "",
    };
    for (const line of lines) {
      const i = line.indexOf(":");
      if (i < 0) continue;
      const head = line.slice(0, i);
      const value = line.slice(i + 1);
      const [name, ...paramParts] = head.split(";");
      const params = paramParts.join(";");
      switch (name) {
        case "DTSTART":
          ev.start = parseDt(value, params);
          break;
        case "DTEND":
          ev.end = parseDt(value, params);
          break;
        case "SUMMARY":
          ev.summary = unescapeIcs(value);
          break;
        case "LOCATION":
          ev.location = unescapeIcs(value);
          break;
        case "DESCRIPTION":
          ev.description = unescapeIcs(value);
          break;
        case "RRULE":
          ev.rrule = value;
          break;
        case "EXDATE":
          for (const v of value.split(",")) ev.exdates.add(parseDt(v, params).date);
          break;
        case "RECURRENCE-ID":
          ev.recurrenceId = parseDt(value, params).date;
          break;
        case "UID":
          ev.uid = value;
          break;
      }
    }
    if (ev.start.date && ev.summary) out.push(ev);
  }
  return out;
}

/** Expand one event's rule into the dates it occurs on inside [from, to]. */
function occurrences(ev: RawEvent, from: string, to: string): string[] {
  if (!ev.rrule) return ev.start.date >= from && ev.start.date <= to ? [ev.start.date] : [];
  const rule = Object.fromEntries(ev.rrule.split(";").map((kv) => kv.split("=") as [string, string]));
  const freq = rule.FREQ;
  const interval = Number(rule.INTERVAL || 1);
  const until = rule.UNTIL ? parseDt(rule.UNTIL, "").date : null;
  const count = rule.COUNT ? Number(rule.COUNT) : null;
  const byday = (rule.BYDAY || "").split(",").filter(Boolean);
  const bysetpos = rule.BYSETPOS ? Number(rule.BYSETPOS) : null;
  const out: string[] = [];
  let produced = 0;
  const push = (d: string) => {
    produced++;
    if (count && produced > count) return false;
    if (until && d > until) return false;
    if (d >= from && d <= to && !ev.exdates.has(d)) out.push(d);
    return true;
  };
  const stopAt = until && until < to ? until : to;

  if (freq === "DAILY") {
    for (let d = ev.start.date; d <= stopAt; d = addDays(d, interval)) if (!push(d)) break;
  } else if (freq === "WEEKLY") {
    const days = byday.length ? byday.map((b) => DAY[b.slice(-2) as DayKey]) : [weekday(ev.start.date)];
    // Walk week by week from the week of DTSTART.
    const startDow = weekday(ev.start.date);
    let weekStart = addDays(ev.start.date, -startDow);
    outer: while (weekStart <= stopAt) {
      for (let i = 0; i < 7; i++) {
        const d = addDays(weekStart, i);
        if (d < ev.start.date) continue;
        if (!days.includes(weekday(d))) continue;
        if (!push(d)) break outer;
      }
      weekStart = addDays(weekStart, 7 * interval);
    }
  } else if (freq === "MONTHLY") {
    let [y, m] = ev.start.date.split("-").map(Number);
    let guard = 0;
    while (guard++ < 240) {
      const ym = `${y}-${String(m).padStart(2, "0")}`;
      const first = `${ym}-01`;
      if (first > stopAt && ym > stopAt.slice(0, 7)) break;
      const last = lastOfMonth(first);
      const candidates: string[] = [];
      if (byday.length) {
        for (let day = 1; day <= last; day++) {
          const d = `${ym}-${String(day).padStart(2, "0")}`;
          for (const b of byday) {
            const ord = Number(b.slice(0, -2) || 0);
            const dow = DAY[b.slice(-2) as DayKey];
            if (weekday(d) !== dow) continue;
            if (ord > 0 && nthOfMonth(d) !== ord) continue;
            if (ord < 0 && Math.ceil((last - day + 1) / 7) !== -ord) continue;
            candidates.push(d);
          }
        }
      } else {
        const day = Number(ev.start.date.slice(8, 10));
        if (day <= last) candidates.push(`${ym}-${String(day).padStart(2, "0")}`);
      }
      const chosen = bysetpos ? [candidates.at(bysetpos > 0 ? bysetpos - 1 : bysetpos)].filter(Boolean) as string[] : candidates;
      let stop = false;
      for (const d of chosen) {
        if (d < ev.start.date) continue;
        if (!push(d)) {
          stop = true;
          break;
        }
      }
      if (stop) break;
      m += interval;
      while (m > 12) {
        m -= 12;
        y++;
      }
    }
  } else if (freq === "YEARLY") {
    for (let yy = Number(ev.start.date.slice(0, 4)); yy <= Number(stopAt.slice(0, 4)); yy += interval) {
      if (!push(`${yy}${ev.start.date.slice(4)}`)) break;
    }
  }
  return out;
}

let cache: { at: number; raws: RawEvent[] } | null = null;

async function loadFeed(): Promise<RawEvent[]> {
  if (cache && Date.now() - cache.at < 15 * 60 * 1000) return cache.raws;
  try {
    const res = await fetch(church.calendarIcs, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(String(res.status));
    const raws = parseIcs(await res.text());
    cache = { at: Date.now(), raws };
    return raws;
  } catch {
    return cache?.raws ?? [];
  }
}

/** Everything on the church calendar between two dates, church-local, sorted. */
export async function calendarBetween(from: string, to: string): Promise<CalEntry[]> {
  const raws = await loadFeed();
  // Edited single occurrences override the generated one for that day.
  const overrides = new Map<string, RawEvent>();
  for (const r of raws) if (r.recurrenceId) overrides.set(`${r.uid}|${r.recurrenceId}`, r);
  const out: CalEntry[] = [];
  const seen = new Set<string>();
  const add = (e: CalEntry) => {
    const k = `${e.date}|${e.time24}|${e.title.toLowerCase()}`;
    if (seen.has(k)) return;
    seen.add(k);
    out.push(e);
  };
  for (const r of raws) {
    if (r.recurrenceId) continue;
    for (const d of occurrences(r, from, to)) {
      const o = overrides.get(`${r.uid}|${d}`);
      const src = o ?? r;
      const date = o ? o.start.date : d;
      if (date < from || date > to) continue;
      add({
        date,
        time24: src.start.time,
        endTime24: src.end?.time ?? null,
        title: src.summary,
        location: src.location,
        description: src.description.replace(/Join with Google Meet:[\s\S]*$/i, "").trim(),
        standing: isStanding(src.summary),
        source: "calendar",
      });
    }
  }
  // Events written in site.ts (with their fuller descriptions) join the list.
  for (const e of staticEvents) {
    if (e.endsOn < from || e.start > to) continue;
    add({
      date: e.start,
      time24: e.time24 ?? null,
      title: e.title,
      location: "",
      description: e.summary,
      standing: false,
      source: "site",
      href: e.href,
    });
  }
  // A standing service listed twice on one day (an old monthly rule and a newer weekly one) shows once, at the earlier time.
  const sorted = out.sort((a, b) => `${a.date}${a.time24 ?? "00:00"}`.localeCompare(`${b.date}${b.time24 ?? "00:00"}`));
  const seenStanding = new Set<string>();
  const deduped = sorted.filter((e) => {
    if (!e.standing) return true;
    const k = `${e.date}|${e.title.toLowerCase().replace(/\s+/g, " ")}`;
    if (seenStanding.has(k)) return false;
    seenStanding.add(k);
    return true;
  });
  return ensureServices(deduped, from, to);
}

/** The next `days` days, from this moment on, including the standing services. */
export async function thisWeek(days = 7): Promise<CalEntry[]> {
  const now = nowInChurch();
  const list = await calendarBetween(now.date, addDays(now.date, days));
  return list.filter((e) => {
    if (e.date !== now.date) return true;
    if (!e.time24) return true;
    const [h, m] = e.time24.split(":").map(Number);
    return h * 60 + m >= now.minutes - 90;
  });
}

/** Special events (not the weekly rhythm) in the next `days` days. */
export async function comingUp(days = 120, limit = 6): Promise<CalEntry[]> {
  const now = nowInChurch();
  const list = await calendarBetween(now.date, addDays(now.date, days));
  return list.filter((e) => !e.standing).slice(0, limit);
}

/**
 * If the feed is down (or the pastor's recurring Sunday events lapse), the
 * standing services from site.ts still appear on their days.
 */
function ensureServices(list: CalEntry[], from: string, to: string): CalEntry[] {
  const out = [...list];
  const has = (date: string, name: string) => out.some((e) => e.date === date && e.title.toLowerCase().startsWith(name.toLowerCase()));
  for (let d = from; d <= to; d = addDays(d, 1)) {
    for (const s of services) {
      if (s.dow !== weekday(d)) continue;
      if (s.nth && !s.nth.includes(nthOfMonth(d))) continue;
      if (has(d, s.name)) continue;
      // The first-Sunday "Potluck" on their calendar is the lunch.
      if (s.id === "lunch" && has(d, "Potluck")) continue;
      out.push({ date: d, time24: s.time24, title: s.name, location: "", description: s.note, standing: true, source: "site" });
    }
  }
  return out.sort((a, b) => `${a.date}${a.time24 ?? "00:00"}`.localeCompare(`${b.date}${b.time24 ?? "00:00"}`));
}

export function fmtTime(time24: string) {
  const [h, m] = time24.split(":").map(Number);
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

export function fmtDay(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }) {
  return utc(iso).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
}

export function relativeDay(iso: string) {
  const today = nowInChurch().date;
  if (iso === today) return "Today";
  if (iso === addDays(today, 1)) return "Tomorrow";
  return fmtDay(iso, { weekday: "long", month: "short", day: "numeric" });
}

/** The next standing service from the weekly rules alone (no network). */
export function nextService() {
  const now = nowInChurch();
  for (let i = 0; i < 8; i++) {
    const d = addDays(now.date, i);
    const todays = services
      .filter((s) => s.dow === weekday(d) && (!s.nth || s.nth.includes(nthOfMonth(d))))
      .filter((s) => {
        if (i > 0) return true;
        const [h, m] = s.time24.split(":").map(Number);
        return h * 60 + m >= now.minutes - 60;
      })
      .sort((a, b) => a.time24.localeCompare(b.time24));
    if (todays.length) return { date: d, service: todays[0] };
  }
  return null;
}
