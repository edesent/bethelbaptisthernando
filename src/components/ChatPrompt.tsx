"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pastor } from "@/lib/site";
import Phone from "./Phone";
import { useForm } from "./useForm";

const topics = ["Planning a visit", "I need a ride", "Prayer request", "A question for the pastor"];

/**
 * The corner prompt. A few seconds after the page loads a small note from
 * the pastor slides up ("Planning a visit? Ask me anything."). Opening it
 * gives a short message box; what people write goes straight to the
 * pastor's phone through /api/form. Dismissing it is remembered for the
 * session so it never nags.
 */
export default function ChatPrompt() {
  const path = usePathname();
  const [nudge, setNudge] = useState(false);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const { submit, status, error, reset } = useForm("chat");
  const box = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("bethel-chat-dismissed") === "1";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setNudge(true), 5500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => box.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const dismiss = () => {
    setNudge(false);
    try {
      sessionStorage.setItem("bethel-chat-dismissed", "1");
    } catch {}
  };

  if (path.startsWith("/contact") && !open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[45] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <div
          role="dialog"
          aria-labelledby="chat-title"
          className="pop-in w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-ink/10"
        >
          <div className="flex items-center gap-3 bg-brown px-4 py-3 text-white">
            <Image src="/photos/pastor-and-wife.jpg" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover object-[35%_20%] ring-2 ring-gold" />
            <div className="min-w-0 flex-1">
              <p id="chat-title" className="font-bold leading-tight">
                {pastor.styled}
              </p>
              <p className="text-xs text-white/70">Bethel Baptist Church · replies by text or call</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 hover:bg-white/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {status === "sent" ? (
            <div className="p-5">
              <p className="display-soft text-2xl">Got it. Thank you.</p>
              <p className="mt-2 text-ink/80">Your message is on its way to the pastor’s phone. He’ll get back to you as soon as he can.</p>
              <button
                type="button"
                className="btn btn-ghost btn-ghost-ink mt-5 text-sm"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form
              className="p-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                await submit({ ...Object.fromEntries(f.entries()), topic });
              }}
            >
              <div className="rounded-xl bg-paper-deep px-3.5 py-3 text-[0.95rem] leading-snug">
                Hi, I’m Pastor Brandon. If you’re thinking about visiting, have a question, or need someone to pray with you, write me
                here. I read every message myself.
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      topic === t ? "border-gold bg-gold text-white" : "border-ink/15 bg-white hover:border-gold"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <label className="sr-only" htmlFor="chat-message">
                Your message
              </label>
              <textarea
                id="chat-message"
                ref={box}
                name="message"
                required
                rows={3}
                placeholder={topic === "I need a ride" ? "Where should the van pick you up?" : "Type your message…"}
                className="mt-3 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <input name="name" placeholder="Your name" autoComplete="name" className="rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold" />
                <input name="contact" required placeholder="Phone or email" className="rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold" />
              </div>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <button type="submit" className="btn btn-gold mt-3 w-full" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send to Pastor Brandon"}
              </button>
              {status === "error" && (
                <p className="mt-3 rounded-xl bg-pew/8 p-3 text-sm text-pew">
                  {error} <Phone className="font-semibold underline underline-offset-4" />
                </p>
              )}
              <p className="mt-3 text-center text-xs text-muted">
                Or <Phone text className="font-semibold underline underline-offset-2" label="text the church" /> ·{" "}
                <Link href="/contact" className="font-semibold underline underline-offset-2">
                  contact page
                </Link>
              </p>
            </form>
          )}
        </div>
      ) : (
        nudge && (
          <div className="pop-in relative mr-1 max-w-[17rem] rounded-2xl rounded-br-sm bg-white p-3.5 pr-9 text-sm text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] ring-1 ring-ink/10">
            <button type="button" onClick={dismiss} aria-label="Dismiss" className="absolute right-2 top-2 rounded-full p-1 text-muted hover:bg-ink/6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <p className="font-bold">Thinking about visiting?</p>
            <p className="mt-0.5 text-ink/80">I’m Pastor Brandon. Ask me anything, I’ll answer myself.</p>
            <button type="button" onClick={() => setOpen(true)} className="mt-2 font-bold text-gold-deep underline underline-offset-4">
              Write to the pastor
            </button>
          </div>
        )
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setNudge(false);
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close the message box" : "Message the pastor"}
        className="flex items-center gap-2.5 rounded-full bg-brown py-2 pl-2 pr-5 text-sm font-bold text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] ring-2 ring-white/70 transition hover:bg-brown-deep"
      >
        <Image src="/photos/pastor-and-wife.jpg" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover object-[35%_20%] ring-2 ring-gold" />
        {open ? "Close" : "Message the pastor"}
      </button>
    </div>
  );
}
