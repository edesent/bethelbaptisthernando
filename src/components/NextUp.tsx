import Link from "next/link";
import { fmtTime, nextService, relativeDay } from "@/lib/calendar";
import { services } from "@/lib/site";

/** The next gathering, worked out from the weekly rules in site.ts. */
export default function NextUp({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const next = nextService();
  const soft = dark ? "text-white/70" : "text-muted";
  const sunday = services.filter((s) => s.dow === 0);
  const wednesday = services.filter((s) => s.dow === 3);
  return (
    <div className={dark ? "text-white" : "text-ink"}>
      <p className={`eyebrow ${dark ? "text-gold-light" : "text-gold-deep"}`}>Next at Bethel</p>
      {next && (
        <>
          <p className="display mt-3 text-[2.4rem] sm:text-5xl">{next.service.name}</p>
          <p className="time mt-2 text-xl">
            {relativeDay(next.date)} · <span className="font-bold">{fmtTime(next.service.time24)}</span>
          </p>
          {!compact && <p className={`mt-1 ${soft}`}>{next.service.note}</p>}
        </>
      )}
      {compact ? (
        <div className="mt-4 space-y-2 text-[0.95rem]">
          <p>
            <span className={`eyebrow mr-2 text-[0.62rem] ${dark ? "text-gold-light" : "text-gold-deep"}`}>Sun</span>
            {sunday.map((s, i) => (
              <span key={s.id}>
                {i > 0 && <span className="text-muted"> · </span>}
                <span className="time font-bold">{fmtTime(s.time24).replace(/:00 /, " ")}</span> {s.name.replace("Service", "").replace("together", "").trim()}
              </span>
            ))}
          </p>
          <p>
            <span className={`eyebrow mr-2 text-[0.62rem] ${dark ? "text-gold-light" : "text-gold-deep"}`}>Wed</span>
            {wednesday.map((s, i) => (
              <span key={s.id}>
                {i > 0 && <span className="text-muted"> · </span>}
                <span className="time font-bold">{fmtTime(s.time24).replace(/:00 /, " ")}</span> {s.name.replace("Midweek ", "")}
              </span>
            ))}
          </p>
        </div>
      ) : (
      <div className={`mt-6 grid gap-x-8 gap-y-5 border-t pt-6 sm:grid-cols-2 ${dark ? "border-white/15" : "border-ink/10"}`}>
        <div>
          <p className={`eyebrow text-[0.68rem] ${dark ? "text-gold-light" : "text-gold-deep"}`}>Sundays</p>
          <ul className="mt-2 space-y-1.5">
            {sunday.map((s) => (
              <li key={s.id} className="flex items-baseline justify-between gap-3">
                <span className="font-semibold">{s.name}</span>
                <span className="time font-bold">{fmtTime(s.time24)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={`eyebrow text-[0.68rem] ${dark ? "text-gold-light" : "text-gold-deep"}`}>Wednesdays</p>
          <ul className="mt-2 space-y-1.5">
            {wednesday.map((s) => (
              <li key={s.id} className="flex items-baseline justify-between gap-3">
                <span className="font-semibold">{s.name}</span>
                <span className="time font-bold">{fmtTime(s.time24)}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 text-sm ${soft}`}>No Sunday evening service.</p>
        </div>
      </div>
      )}
      {!compact && (
        <p className={`mt-5 text-sm ${soft}`}>
          Can’t be there? Every service goes out live on{" "}
          <Link href="/watch" className={`font-semibold underline underline-offset-4 ${dark ? "text-gold-light" : "text-gold-deep"}`}>
            YouTube
          </Link>
          .
        </p>
      )}
    </div>
  );
}
