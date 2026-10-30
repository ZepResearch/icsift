"use client";

import { useEffect, useState } from "react";
import { CONFERENCE } from "@/constants/conference";

const { year, month, days } = CONFERENCE.scheduleDates;
// Registration desk opens at 8:00 on the first day, Bangkok time (UTC+7).
const OPENS = Date.UTC(year, month, days[0], 8 - 7);
const DAY = 86400000;

const timeFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" });
const dayFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Bangkok", weekday: "long" });

function reading(now) {
  const left = Math.ceil((OPENS - now) / DAY);
  if (left > 1) return [String(left), "days until the desk opens"];
  if (left === 1) return ["1", "day until the desk opens"];
  if (now < OPENS + days.length * DAY) return ["Now", "the conference is on"];
  return ["Over", `the ${CONFERENCE.shortForm} has closed`];
}

// The current time in Bangkok and the days left until registration opens. Renders the static
// fallback on the server and in the first client paint, then ticks once a minute.
export default function BangkokClock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const [count, countLabel] = now ? reading(now) : ["—", "days until the desk opens"];

  return (
    <dl className="grid grid-cols-2 gap-2">
      <div className="flex flex-col-reverse justify-end bg-[var(--green)] px-5 py-5 text-white">
        <dt className="herb-italic mt-1 text-[15px] text-white/80">
          {now ? `${dayFormat.format(now)} in Bangkok` : "Time in Bangkok"}
        </dt>
        <dd className="herb-display text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] tabular-nums" suppressHydrationWarning>
          {now ? timeFormat.format(now) : "--:--"}
        </dd>
      </div>
      <div className="flex flex-col-reverse justify-end bg-[var(--mount)] px-5 py-5">
        <dt className="herb-italic mt-1 text-[15px] text-[var(--ink-2)]">{countLabel}</dt>
        <dd className="herb-display text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] tabular-nums">{count}</dd>
      </div>
    </dl>
  );
}
