import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { CHAT } from "@/config/chat";
import { church } from "@/lib/site";
import { block, hasLink, hasTwoNames, hasUnexpectedFields, isCallablePhone, isDuplicate, isEmail, isReachable, line, looksLikeAMessage, looksLikeAName } from "@/lib/spam";

/**
 * One endpoint for every form on the site: ride requests, prayer requests and
 * the contact page. Add a kind by writing another *Message() function below
 * and a branch in POST.
 *
 * Messages go into the church's Slack channel through Website Chat (the same
 * connection as the chat bubble; key in src/config/chat.ts), so they reach the
 * pastor's phone in seconds. Setting FORM_WEBHOOK_URL (a Slack/Teams incoming
 * webhook) overrides that route.
 *
 * Spam defences, in order:
 *  - a signed load-time token (GET) that must be 3 seconds to 6 hours old;
 *    the server measures the time, never the browser;
 *  - two honeypot fields and an allowlist of fields per form;
 *  - a per-IP rate limit and a repeat-message check;
 *  - no links anywhere, including bare domains;
 *  - a name must be two real words, a phone must be a number the church could
 *    dial (unassigned area codes fail), an email must look like one, and a
 *    message must read like words, not a hash.
 * A visible mistake (one-word name, bad phone) gets a visible error. Anything
 * that smells like a bot gets a fake success and is dropped, so the bot never
 * learns what tripped it.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = process.env.FORM_SECRET || process.env.FORM_WEBHOOK_URL || CHAT.apiKey;
const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 1000 * 60 * 60 * 6;

const sign = (ts: string) => createHmac("sha256", SECRET).update(ts).digest("hex");

function tokenOk(token: unknown) {
  if (typeof token !== "string") return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  const age = Date.now() - Number(ts);
  return age >= MIN_FILL_MS && age <= MAX_AGE_MS;
}

export async function GET() {
  const ts = String(Date.now());
  return NextResponse.json({ token: `${ts}.${sign(ts)}` }, { headers: { "Cache-Control": "no-store" } });
}

// Best-effort, per serverless instance.
const hits = new Map<string, number[]>();
function rateLimited(key: string, max = 6) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

const fake = () => NextResponse.json({ ok: true });

type Body = Record<string, unknown>;
type Built = { text: string; subject: string; name: string; contact: string } | { error: string } | { spam: true };

const COMMON = ["kind", "token", "website", "company"];

function rideMessage(b: Body): Built {
  if (hasUnexpectedFields(b, [...COMMON, "name", "contact", "address", "notes"])) return { spam: true };
  const name = line(b.name, 80);
  const contact = line(b.contact, 40);
  const address = line(b.address, 200);
  const notes = block(b.notes, 1000);
  if (!name) return { error: "Please give us your name." };
  if (!looksLikeAName(name)) return { spam: true };
  if (!hasTwoNames(name)) return { error: "Please give your first and last name." };
  if (!contact) return { error: "Leave a phone number so we can confirm the pickup." };
  if (!isCallablePhone(contact)) return { error: "That phone number doesn’t look right. Please check it." };
  if (!address) return { error: "Tell us where to pick you up (a street or a landmark is fine)." };
  if ([name, address, notes].some(hasLink)) return { spam: true };
  if (!looksLikeAMessage(address, 3) || (notes && !looksLikeAMessage(notes))) return { spam: true };
  return {
    subject: "🚐 Someone needs a ride to church",
    name,
    contact,
    text: [`*🚐 Ride request — ${church.short} website*`, `*Name:* ${name}`, `*Phone:* ${contact}`, `*Pick up at:* ${address}`, notes && `*Notes:* ${notes}`]
      .filter(Boolean)
      .join("\n"),
  };
}

function prayerMessage(b: Body): Built {
  if (hasUnexpectedFields(b, [...COMMON, "request", "name", "contact", "confidential"])) return { spam: true };
  const request = block(b.request, 3000);
  const name = line(b.name, 80);
  const contact = line(b.contact, 120);
  const confidential = b.confidential === true || b.confidential === "on";
  if (!request) return { error: "Please tell us what we can pray about." };
  if (!looksLikeAMessage(request, 6)) return { spam: true };
  if ([request, name].some(hasLink)) return { spam: true };
  if (name && !looksLikeAName(name)) return { spam: true };
  if (contact && !isReachable(contact)) return { error: "That phone or email doesn’t look right. Please check it, or leave it blank." };
  return {
    subject: confidential ? "🙏 Prayer request (pastor only)" : "🙏 Prayer request",
    name: name || "Not given",
    contact: contact || "Not given",
    text: [
      `*🙏 Prayer request — ${church.short} website*`,
      confidential && "_Pastor only — please keep confidential_",
      `>${request.replace(/\n/g, "\n>")}`,
      name && `*Name:* ${name}`,
      contact && `*Contact:* ${contact}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

function contactMessage(b: Body): Built {
  if (hasUnexpectedFields(b, [...COMMON, "name", "email", "phone", "topic", "message"])) return { spam: true };
  const name = line(b.name, 80);
  const email = line(b.email, 120);
  const phone = line(b.phone, 40);
  const topic = line(b.topic, 60);
  const message = block(b.message, 4000);
  if (!name) return { error: "Please give your first and last name." };
  if (!looksLikeAName(name)) return { spam: true };
  if (!hasTwoNames(name)) return { error: "Please give your first and last name." };
  if (!message) return { error: "Please write a message." };
  if (!email && !phone) return { error: "Leave an email or phone so we can reply." };
  if (email && !isEmail(email)) return { error: "That email address does not look right." };
  if (phone && !isCallablePhone(phone)) return { error: "That phone number doesn’t look right. Please check it." };
  if ([name, message, topic].some(hasLink)) return { spam: true };
  if (!looksLikeAMessage(message, 6)) return { spam: true };
  return {
    subject: `✉️ ${topic || "New message"} — contact page`,
    name,
    contact: [email, phone].filter(Boolean).join(" · "),
    text: [`*✉️ New message — ${church.short} website*`, `*Name:* ${name}`, email && `*Email:* ${email}`, phone && `*Phone:* ${phone}`, topic && `*About:* ${topic}`]
      .filter(Boolean)
      .concat("", message)
      .join("\n"),
  };
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 12_000) return NextResponse.json({ error: "Too long." }, { status: 413 });

  let body: Body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  if (body.website || body.company) return fake();
  if (!tokenOk(body.token)) return fake();

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${body.kind}:${ip}`)) return fake();
  if (rateLimited(`all:${ip}`, 12)) return fake();

  const built: Built | null =
    body.kind === "ride" ? rideMessage(body) : body.kind === "prayer" ? prayerMessage(body) : body.kind === "contact" ? contactMessage(body) : null;
  if (!built) return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  if ("spam" in built) return fake();
  if ("error" in built) return NextResponse.json({ error: built.error }, { status: 400 });
  if (isDuplicate(built.text)) return fake();

  const webhook = process.env.FORM_WEBHOOK_URL;
  const notConnected = NextResponse.json(
    { error: "Our online messages aren’t connected yet. Please call or text the church — we’d love to hear from you." },
    { status: 503 },
  );
  const failed = NextResponse.json({ error: "We couldn’t send that just now. Please call the church instead." }, { status: 502 });

  try {
    const res = webhook
      ? await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: built.text }) })
      : await fetch(`${CHAT.origin}/api/chat/contact-form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey: CHAT.apiKey, subject: built.subject, name: built.name, contact: built.contact, message: built.text }),
        });
    if (res.status === 503) return notConnected;
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return failed;
  }
  return NextResponse.json({ ok: true });
}
