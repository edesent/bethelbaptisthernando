"use client";

import { useForm } from "./useForm";
import Phone from "./Phone";

const field =
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";
const label = "block text-sm font-semibold text-ink/80";

function Status({ status, error, sent }: { status: string; error: string; sent: string }) {
  if (status === "sent") return <p className="mt-4 rounded-xl bg-gold-pale p-3 font-semibold text-gold-deep">{sent}</p>;
  if (status === "error")
    return (
      <p className="mt-4 rounded-xl bg-pew/8 p-3 text-pew">
        {error} <Phone className="font-semibold underline underline-offset-4" />
      </p>
    );
  return null;
}

export function ContactForm() {
  const { submit, status, error } = useForm("contact");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(Object.fromEntries(new FormData(e.currentTarget).entries()));
      }}
      className="space-y-4"
    >
      <div>
        <label className={label} htmlFor="c-name">
          Your name
        </label>
        <input id="c-name" name="name" required className={field} autoComplete="name" placeholder="First and last" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="c-email">
            Email
          </label>
          <input id="c-email" name="email" type="email" className={field} autoComplete="email" />
        </div>
        <div>
          <label className={label} htmlFor="c-phone">
            Phone
          </label>
          <input id="c-phone" name="phone" type="tel" className={field} autoComplete="tel" />
        </div>
      </div>
      <div>
        <label className={label} htmlFor="c-topic">
          About
        </label>
        <select id="c-topic" name="topic" className={field} defaultValue="A visit">
          <option>A visit</option>
          <option>A ride to church</option>
          <option>Hope & Healing counseling</option>
          <option>Youth for Truth</option>
          <option>Giving</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label className={label} htmlFor="c-message">
          Message
        </label>
        <textarea id="c-message" name="message" required rows={5} className={field} />
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      <Status status={status} error={error} sent="Thank you. Pastor Bankert will be in touch." />
    </form>
  );
}

export function PrayerForm() {
  const { submit, status, error } = useForm("prayer");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(Object.fromEntries(new FormData(e.currentTarget).entries()));
      }}
      className="space-y-4"
    >
      <div>
        <label className={label} htmlFor="p-request">
          What can we pray about?
        </label>
        <textarea id="p-request" name="request" required rows={4} className={field} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="p-name">
            Your name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="p-name" name="name" className={field} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="p-contact">
            Phone or email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="p-contact" name="contact" className={field} />
        </div>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="confidential" /> Pastor only, please keep this confidential
      </label>
      <button type="submit" className="btn btn-ink" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send the prayer request"}
      </button>
      <Status status={status} error={error} sent="Thank you. The church will be praying." />
    </form>
  );
}

export function RideForm() {
  const { submit, status, error } = useForm("ride");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(Object.fromEntries(new FormData(e.currentTarget).entries()));
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="r-name">
            Your name
          </label>
          <input id="r-name" name="name" required className={field} autoComplete="name" placeholder="First and last" />
        </div>
        <div>
          <label className={label} htmlFor="r-contact">
            Phone
          </label>
          <input id="r-contact" name="contact" required type="tel" className={field} autoComplete="tel" />
        </div>
      </div>
      <div>
        <label className={label} htmlFor="r-address">
          Where should we pick you up?
        </label>
        <input id="r-address" name="address" required className={field} placeholder="Street address, or a landmark" />
      </div>
      <div>
        <label className={label} htmlFor="r-notes">
          Anything we should know? <span className="font-normal text-muted">(a wheelchair, children, which Sunday)</span>
        </label>
        <textarea id="r-notes" name="notes" rows={3} className={field} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Ask for a ride"}
      </button>
      <Status status={status} error={error} sent="Thank you. Someone will call to confirm the pickup." />
    </form>
  );
}
