import { isValidPhoneNumber } from "libphonenumber-js";

/**
 * Checks shared by every form. Church forms draw link-drop spam and bots that
 * fill boxes with a random word and ten random digits; each check below
 * targets one of those. Anything that fails a *silent* check gets a fake
 * success from the route, so the bot never learns what tripped it.
 */

// Control characters have no place in a message and are how injection gets smuggled in.
const CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

export const line = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(CONTROL, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";

export const block = (v: unknown, max: number) =>
  typeof v === "string"
    ? v.replace(CONTROL, " ").replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max)
    : "";

/** Links of any kind, including bare domains ("cheap-meds.ru"). A visitor never needs to send one. */
export function hasLink(v: string) {
  const s = v.toLowerCase();
  if (/(https?:\/\/|www\.|ftp:)/.test(s)) return true;
  if (/\[url[=\]]|\[link[=\]]|<a\s|href=/.test(s)) return true;
  return /\b[a-z0-9-]+\.(com|net|org|ru|cn|xyz|top|info|biz|io|shop|club|online|site|co|us|me|tv|ly)\b/.test(s);
}

/** An email address, with a real-looking domain. */
export const isEmail = (v: string) => /^[^\s@<>,;:"']+@[^\s@<>,;:"']+\.[a-z]{2,}$/i.test(v);

/** A number the church could actually call back: unassigned area codes and random digits fail. */
export function isCallablePhone(v: string) {
  try {
    return isValidPhoneNumber(v, "US");
  } catch {
    return false;
  }
}

/** A "phone or email" box: must be one or the other, for real. */
export const isReachable = (v: string) => (v.includes("@") ? isEmail(v) : isCallablePhone(v));

/** At least two letters, and mostly letters. */
export function looksLikeAName(v: string) {
  const letters = v.replace(/[^\p{L}]/gu, "").length;
  if (letters < 2 || letters < v.length / 2 || /\d{3,}/.test(v)) return false;
  // Every word longer than two letters needs a vowel ("Czpti" has none; "Ng" is allowed).
  return v
    .split(/\s+/)
    .filter((w) => w.replace(/[^\p{L}]/gu, "").length > 2)
    .every((w) => /[aeiouyàáâäãåèéêëìíîïòóôöõùúûüāēīōū]/i.test(w));
}

/** First and last. Bots send one random word ("Xhevgr"); a person just adds their last name. */
export const hasTwoNames = (v: string) => v.split(" ").filter((p) => /\p{L}/u.test(p)).length >= 2;

/**
 * Real sentences are mostly letters and spaces. Keyboard mash, hashes and
 * symbol walls are not. Short messages are allowed ("Can I get a ride Sunday?").
 */
export function looksLikeAMessage(v: string, min = 4) {
  if (v.length < min) return false;
  const letters = v.replace(/[^\p{L}\s]/gu, "").length;
  if (letters < v.length * 0.6) return false;
  // Six or more consonants in a row is not a word in any language the church speaks.
  if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(v)) return false;
  return true;
}

/** Only the fields a form really sends. A bot posting its own JSON usually adds extras. */
export function hasUnexpectedFields(body: Record<string, unknown>, allowed: readonly string[]) {
  const ok = new Set(allowed);
  return Object.keys(body).some((k) => !ok.has(k));
}

// Best-effort, per serverless instance: the same message twice in ten minutes is a bot retrying.
const recent = new Map<string, number>();
export function isDuplicate(text: string) {
  const key = text.toLowerCase().replace(/\s+/g, " ").trim();
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > 10 * 60 * 1000) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}
