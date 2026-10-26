import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { CHAT } from "@/config/chat";
import { church } from "@/lib/site";

/**
 * One endpoint for every form on the site: the chat prompt, prayer requests,
 * ride requests and the contact page. Add a kind by writing another
 * *Message() function below and a branch in POST.
 *
 * Messages go into the church's Slack channel through Website Chat (the same
 * connection as the chat bubble; key in src/config/chat.ts), so they reach the
 * pastor's phone in seconds. Until Slack is connected on that side the backend
 * answers 503 and the form honestly tells people to call the church. Setting
 * FORM_WEBHOOK_URL (a Slack/Teams incoming webhook) overrides that route.
 *
 * Spam defences: a signed load-time token (GET) that must be at least 3
 * seconds old, a honeypot field, a per-IP rate limit, an allowlist of fields,
 * and a rule that free-text answers may not contain links. Anything that
 * trips a defence gets a fake success and is dropped.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = process.env.FORM_SECRET || process.env.FORM_WEBHOOK_URL || CHAT.apiKey;
const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 1000 * 60 * 60 * 6;

function sign(ts: string) {
  return createHmac("sha256", SECRET).update(ts).digest("hex");
}

function tokenOk(token: unknown) {
  if (typeof token !== "string") return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  const age = Date.now() - Number(ts);
  return age >= MIN_FILL_MS && age <= MAX_AGE_MS;
}

export async function GET() {
  const ts = String(Date.now());
  return NextResponse.json(
    { token: SECRET ? `${ts}.${sign(ts)}` : `${ts}.${randomBytes(8).toString("hex")}` },
    { headers: { "Cache-Control": "no-store" } },
  );
}

// Best-effort, per serverless instance.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max) : "";

const hasLink = (s: string) => /(https?:\/\/|www\.|\.(com|net|ru|xyz|top)\b)/i.test(s);
// A "phone or email" answer: an email address is fine, a URL is not.
const badContact = (s: string) => /(https?:\/\/|www\.)/i.test(s) || (/\.(com|net|ru|xyz|top)\b/i.test(s) && !s.includes("@"));
const okEmail = (s: string) => !s || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);
const fake = () => NextResponse.json({ ok: true });

type Body = Record<string, unknown>;
type Built = { text: string; subject: string; name: string; contact: string } | { error: string } | { spam: true };

function chatMessage(b: Body): Built {
  const message = clean(b.message, 3000);
  const name = clean(b.name, 80);
  const contact = clean(b.contact, 120);
  const topic = clean(b.topic, 60);
  if (!message) return { error: "Please type a message first." };
  if (!contact) return { error: "Leave a phone number or email so the pastor can answer you." };
  if ([message, name, topic].some(hasLink) || badContact(contact)) return { spam: true };
  return {
    subject: `💬 ${topic || "Message"} — from the website`,
    name,
    contact,
    text: [
      `*💬 Message from the website — ${church.short}*`,
      topic && `*About:* ${topic}`,
      `>${message.replace(/\n/g, "\n>")}`,
      name && `*Name:* ${name}`,
      `*Reply to:* ${contact}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

function rideMessage(b: Body): Built {
  const name = clean(b.name, 80);
  const contact = clean(b.contact, 120);
  const address = clean(b.address, 200);
  const notes = clean(b.notes, 1000);
  if (!name) return { error: "Please give us your name." };
  if (!contact) return { error: "Leave a phone number so we can confirm the pickup." };
  if (!address) return { error: "Tell us where to pick you up (a street or a landmark is fine)." };
  if ([name, address, notes].some(hasLink) || badContact(contact)) return { spam: true };
  return {
    subject: "🚐 Someone needs a ride to church",
    name,
    contact,
    text: [
      `*🚐 Ride request — ${church.short} website*`,
      `*Name:* ${name}`,
      `*Phone:* ${contact}`,
      `*Pick up at:* ${address}`,
      notes && `*Notes:* ${notes}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

function prayerMessage(b: Body): Built {
  const request = clean(b.request, 3000);
  const name = clean(b.name, 80);
  const contact = clean(b.contact, 120);
  const confidential = b.confidential === true || b.confidential === "on";
  if (!request) return { error: "Please tell us what we can pray about." };
  if ([request, name].some(hasLink) || badContact(contact)) return { spam: true };
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
  const name = clean(b.name, 80);
  const email = clean(b.email, 120);
  const phone = clean(b.phone, 40);
  const topic = clean(b.topic, 60);
  const message = clean(b.message, 4000);
  if (name.split(/\s+/).filter(Boolean).length < 2) return { error: "Please give your first and last name." };
  if (!message) return { error: "Please write a message." };
  if (!email && !phone) return { error: "Leave an email or phone so we can reply." };
  if (!okEmail(email)) return { error: "That email address does not look right." };
  if ([name, message, topic].some(hasLink)) return { spam: true };
  return {
    subject: `✉️ ${topic || "New message"} — contact page`,
    name,
    contact: [email, phone].filter(Boolean).join(" · "),
    text: [
      `*✉️ New message — ${church.short} website*`,
      `*Name:* ${name}`,
      email && `*Email:* ${email}`,
      phone && `*Phone:* ${phone}`,
      topic && `*About:* ${topic}`,
    ]
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

  if (body.website || body.company) return fake();
  if (!tokenOk(body.token)) return fake();

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${body.kind}:${ip}`)) return fake();

  const built: Built | null =
    body.kind === "chat"
      ? chatMessage(body)
      : body.kind === "ride"
        ? rideMessage(body)
        : body.kind === "prayer"
          ? prayerMessage(body)
          : body.kind === "contact"
            ? contactMessage(body)
            : null;
  if (!built) return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  if ("spam" in built) return fake();
  if ("error" in built) return NextResponse.json({ error: built.error }, { status: 400 });

  const webhook = process.env.FORM_WEBHOOK_URL;
  const notConnected = NextResponse.json(
    { error: "Our online messages aren’t connected yet. Please call or text the church — we’d love to hear from you." },
    { status: 503 },
  );
  const failed = NextResponse.json({ error: "We couldn’t send that just now. Please call the church instead." }, { status: 502 });

  try {
    const res = webhook
      ? await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: built.text }),
        })
      : await fetch(`${CHAT.origin}/api/chat/contact-form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: CHAT.apiKey,
            subject: built.subject,
            name: built.name,
            contact: built.contact,
            message: built.text,
          }),
        });
    if (res.status === 503) return notConnected;
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return failed;
  }
  return NextResponse.json({ ok: true });
}
