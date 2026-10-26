"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { pb } from "@/lib/pocketbase";
import { matchSpeaker, getSpeakerImageUrl } from "@/lib/matchSpeaker";
import { ActionLink, AccessionLabel } from "@/components/home/primitives";

const { year, month, days } = CONFERENCE.scheduleDates;

const dayLabel = (day) => new Date(year, month, day).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

// Agenda per day. Items without a speaker are breaks and sessions; `kind: "break"` renders them quieter.
const SCHEDULE = [
  {
    day: days[0],
    items: [
      { time: "8:30 – 9:00 AM", title: "Registration", kind: "break" },
      { time: "9:00 – 9:20 AM", title: "Introduction by moderator" },
      { time: "9:20 – 9:25 AM", title: "Book release" },
      { time: "9:25 – 9:35 AM", title: "Welcome speech by the organizing secretary", speakers: [{ name: "Dr. Liane Vina G Ocampo", affiliation: "Cavite State University" }] },
      { time: "9:35 – 9:40 AM", title: "Welcome remarks", speakers: [{ name: "Dr. Rania D. Abduraup", affiliation: "Sulu State College" }] },
      { time: "9:40 – 9:45 AM", title: "Speech by the conference co-chair", speakers: [{ name: "Dr. Sherha Ballaho Baybayan", affiliation: "Sulu State College" }] },
      { time: "9:45 – 9:55 AM", title: "Speech by the conference chair", speakers: [{ name: "Dr. Wilson Cordova, LPT, CRS", affiliation: "De La Salle University" }] },
      { time: "9:55 – 10:00 AM", title: "Closing remarks", speakers: [{ name: "Dr. Frissida Asid-Daud, RN, MAN, PhD", affiliation: "Sulu State University" }] },
      { time: "10:00 – 10:20 AM", title: "Tea break", kind: "break" },
      { time: "10:20 – 10:35 AM", title: "Keynote speech", speakers: [{ name: "Prof. Charisma Samparani Ututalum", affiliation: "Sulu State University" }] },
      { time: "10:35 – 10:50 AM", title: "Keynote speech", speakers: [{ name: "Dr. Waiphot Kulachai", affiliation: "Suan Sunandha Rajabhat University (SSRU)" }] },
      { time: "10:50 – 11:00 AM", title: "Session speech", speakers: [{ name: "Dr. Daisy M. Galgana", affiliation: "Dr. Carlos S. Lanting College" }] },
      { time: "11:00 AM – 1:00 PM", title: "Technical session 1: Sustainability" },
      { time: "1:00 – 2:00 PM", title: "Lunch break", kind: "break" },
      { time: "2:00 – 2:10 PM", title: "Session speech", speakers: [{ name: "Dr. Veronica Sarcino-Almase", affiliation: "Polytechnic University of the Philippines - Ragay Campus" }] },
      { time: "2:00 – 3:30 PM", title: "Technical session 2: Innovation and future technology" },
      { time: "3:30 – 4:00 PM", title: "Tea break", kind: "break" },
      {
        time: "4:00 – 5:00 PM",
        title: "Panel discussion",
        speakers: [
          { name: "Dr. Lance Jay Tristeza Montalban", affiliation: "Iloilo Science and Technology University – Miagao Campus" },
          { name: "Analyn S. Idio-Diola, LPT, MSc, PhD", affiliation: "Pangasinan State University" },
        ],
      },
      { time: "", title: "Valedictory function" },
    ],
  },
  {
    day: days[1],
    items: [
      { time: "8:30 – 9:00 AM", title: "Registration", kind: "break" },
      { time: "9:00 – 9:20 AM", title: "Introduction by moderator" },
      { time: "9:20 – 9:25 AM", title: "Welcome speech by the organizing secretary", speakers: [{ name: "Dr. Rania D. Abduraup", affiliation: "Sulu State University" }] },
      { time: "9:25 – 9:30 AM", title: "Speech by the conference co-chair", speakers: [{ name: "Dr. Sherha Ballaho Baybayan", affiliation: "Sulu State University" }] },
      { time: "9:30 – 9:35 AM", title: "Speech by the conference chair", speakers: [{ name: "Dr. Wilson Cordova, LPT, CRS", affiliation: "De La Salle University" }] },
      { time: "9:35 – 9:50 AM", title: "Keynote speech", speakers: [{ name: "Prof. Marina Falasca", affiliation: "National Technological University" }] },
      { time: "9:50 – 10:05 AM", title: "Keynote speech", speakers: [{ name: "Helen Boholano", affiliation: "Cebu Normal University" }] },
      { time: "10:20 – 10:40 AM", title: "Tea break", kind: "break" },
      { time: "10:40 – 10:55 AM", title: "Keynote speech", speakers: [{ name: "Desiderio R. Apag III", affiliation: "Commission on Higher Education (CHED)" }] },
      { time: "10:55 – 11:10 AM", title: "Keynote speech", speakers: [{ name: "Dr. Julie Ann Acebuque-Salido", affiliation: "Aklan State University Banga" }] },
      { time: "11:10 – 11:20 AM", title: "Session speech", speakers: [{ name: "Malikha Ilupa, RAgr, MSA", affiliation: "Sulu State College" }] },
      { time: "11:20 – 11:30 AM", title: "Session speech", speakers: [{ name: "Florante C. Poso, Jr., MCE, PhD", affiliation: "Polytechnic University of the Philippines" }] },
      { time: "11:30 AM – 12:30 PM", title: "Technical session 1: Sustainability" },
      { time: "12:30 – 1:30 PM", title: "Lunch break", kind: "break" },
      { time: "1:30 – 1:40 PM", title: "Session speech", speakers: [{ name: "Marjohn Villamor Anislag, PhD", affiliation: "Surigao del Norte State University" }] },
      { time: "1:40 – 3:30 PM", title: "Technical session 2: Innovation and future technology" },
      { time: "3:30 – 3:40 PM", title: "Tea break", kind: "break" },
      {
        time: "3:40 – 4:30 PM",
        title: "Panel discussion",
        speakers: [
          { name: "Thelma Domingo Palaoag", affiliation: "University of the Cordilleras" },
          { name: "Ferdinand Bulusan, LPT, PhD, EdD", affiliation: "Isabela State University" },
        ],
      },
      { time: "", title: "Valedictory function" },
    ],
  },
];

const initialsOf = (name) =>
  name
    .replace(/^(dr|prof|mr|mrs|ms)\.?\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function Speaker({ speaker, match }) {
  return (
    <li className="flex items-center gap-4">
      {match?.imageUrl ? (
        <Image src={match.imageUrl} alt="" width={52} height={52} className="h-[52px] w-[52px] shrink-0 object-cover object-top" />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-[52px] w-[52px] shrink-0 place-items-center border border-[var(--rule)] text-[15px] text-[var(--ink-2)]"
        >
          {initialsOf(speaker.name)}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[16px] leading-snug">{speaker.name}</span>
        <span className="herb-muted block text-[14.5px] leading-snug">{speaker.affiliation}</span>
        {match?.category ? <span className="herb-italic block text-[14px] text-[var(--ink-2)]">{match.category}</span> : null}
      </span>
    </li>
  );
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Month grid with the conference days marked; selecting one switches the agenda to that day.
function MonthCalendar({ activeDay, onPick }) {
  const [view, setView] = useState({ y: year, m: month });
  const [today, setToday] = useState(null);

  // Read the date on the client only, so the prerendered page and the browser agree.
  useEffect(() => {
    const now = new Date();
    setToday({ y: now.getFullYear(), m: now.getMonth(), d: now.getDate() });
  }, []);

  const offset = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const length = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  const isConferenceMonth = view.y === year && view.m === month;
  const move = (delta) => setView(({ y, m }) => ({ y: new Date(y, m + delta).getFullYear(), m: new Date(y, m + delta).getMonth() }));
  const title = new Date(view.y, view.m).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="herb-label">
      <div className="flex items-center justify-between border-b border-[var(--ink)] px-2 py-1.5">
        <button
          type="button"
          onClick={() => move(-1)}
          className="grid h-9 w-9 place-items-center hover:bg-[var(--ink)] hover:text-white"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
        </button>
        <p className="text-[13px] font-semibold tracking-[0.08em] uppercase" aria-live="polite">
          {title}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          className="grid h-9 w-9 place-items-center hover:bg-[var(--ink)] hover:text-white"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
        </button>
      </div>

      <div className="grid grid-cols-7 px-2 pt-2" aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day} className="herb-italic py-1 text-center text-[13px] text-[var(--ink-2)]">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 px-2 pb-2">
        {cells.map((day, index) => {
          if (!day) return <span key={`blank-${index}`} className="aspect-square" />;
          const conference = isConferenceMonth && days.includes(day);
          const selected = conference && day === activeDay;
          const isToday = today && today.y === view.y && today.m === view.m && today.d === day;
          const base = "grid aspect-square place-items-center text-[15px]";
          if (!conference) {
            return (
              <span key={day} className={`${base} ${isToday ? "font-semibold underline underline-offset-4" : "text-[var(--ink-2)]"}`}>
                {day}
                {isToday ? <span className="sr-only"> (today)</span> : null}
              </span>
            );
          }
          return (
            <button
              key={day}
              type="button"
              onClick={() => onPick(day)}
              aria-pressed={selected}
              aria-label={`${dayLabel(day)}, day ${days.indexOf(day) + 1} of the conference`}
              className={`${base} font-medium ${
                selected ? "bg-[var(--green)] text-white" : "border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="herb-italic border-t border-[var(--rule)] px-4 py-2.5 text-[14px] text-[var(--ink-2)]">
        {isConferenceMonth ? "Framed dates are conference days. Select one to see its agenda." : (
          <button type="button" onClick={() => setView({ y: year, m: month })} className="herb-link">
            Back to the conference month
          </button>
        )}
      </p>
    </div>
  );
}

export default function ConferenceSchedule() {
  const [active, setActive] = useState(0);
  const [speakerMap, setSpeakerMap] = useState(() => new Map());

  // Match agenda speakers to PocketBase records for photos and roles. The agenda itself never waits on this.
  useEffect(() => {
    let alive = true;
    pb.collection("ICSIFT_speakers")
      .getFullList({ sort: "order", requestKey: null })
      .then((records) => {
        const map = new Map();
        SCHEDULE.forEach(({ items }) =>
          items.forEach((item) =>
            item.speakers?.forEach(({ name }) => {
              const match = matchSpeaker(name, records);
              if (match) map.set(name, { imageUrl: getSpeakerImageUrl(match), category: match.category });
            }),
          ),
        );
        if (alive) setSpeakerMap(map);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const onTabKey = (event, index) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + SCHEDULE.length) % SCHEDULE.length;
    setActive(next);
    document.getElementById(`day-tab-${next}`)?.focus();
  };

  const current = SCHEDULE[active];

  return (
    <main className="herb min-h-screen">
      {/* Title sheet: title and intro, with the day switch built into the sheet's foot. */}
      <section aria-labelledby="schedule-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
        <div className="herb-sheet herb-settle mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 id="schedule-title" className="herb-display text-[clamp(2.75rem,1.4rem+3.6vw,5rem)]">
              Two days, hour by hour.
            </h1>
            <p className="herb-muted max-w-[34rem] text-[17.5px] leading-relaxed">
              The programme for the {CONFERENCE.shortForm}, {CONFERENCE.date}, in {CONFERENCE.venue.location.trim()} and online.
              Pick a day to see its sessions.
            </p>
          </div>

          <div role="tablist" aria-label="Conference days" className="mt-12 grid border-y border-[var(--ink)] sm:grid-cols-2">
            {SCHEDULE.map((entry, index) => {
              const selected = active === index;
              return (
                <button
                  key={entry.day}
                  id={`day-tab-${index}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="day-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onTabKey(event, index)}
                  className={`relative py-6 text-left sm:px-6 sm:first:pl-0 ${index ? "border-t border-[var(--rule)] sm:border-t-0 sm:border-l" : ""} ${
                    selected ? "" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="herb-italic block text-[14.5px] text-[var(--ink-2)]">Day {index + 1}</span>
                  <span className="mt-1 block text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-tight tracking-[-0.02em]">
                    {dayLabel(entry.day)}
                  </span>
                  {selected ? <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] bg-[var(--green)]" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section aria-labelledby="agenda-title" className="px-3 pt-16 pb-16 sm:px-6 lg:px-10 lg:pt-20 lg:pb-24">
        <div className="herb-sheet mx-auto max-w-[1400px] p-5 sm:p-8 lg:p-12">
          <div
            id="day-panel"
            role="tabpanel"
            aria-labelledby={`day-tab-${active}`}
            className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16"
          >
            <div>
              <h2 id="agenda-title" className="herb-h2">
                Day {active + 1}.
              </h2>
              <p className="herb-italic mt-2 text-[16px] text-[var(--ink-2)]">{dayLabel(current.day)}</p>

              <ol className="mt-8 border-t border-[var(--ink)]">
                {current.items.map((item, index) => (
                  <li
                    key={`${item.time}-${item.title}-${index}`}
                    className={`grid gap-x-6 gap-y-2 border-b border-[var(--rule)] py-5 sm:grid-cols-[10.5rem_1fr] ${
                      item.kind === "break" ? "text-[var(--ink-2)]" : ""
                    }`}
                  >
                    <p className="text-[15.5px] font-medium whitespace-nowrap">{item.time || "Close"}</p>
                    <div>
                      <p className={item.kind === "break" ? "herb-italic text-[16px]" : "text-[18px] leading-snug"}>{item.title}</p>
                      {item.speakers?.length ? (
                        <ul className="mt-4 grid gap-4 md:grid-cols-2">
                          {item.speakers.map((speaker) => (
                            <Speaker key={speaker.name} speaker={speaker} match={speakerMap.get(speaker.name)} />
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
              <MonthCalendar activeDay={current.day} onPick={(day) => setActive(SCHEDULE.findIndex((entry) => entry.day === day))} />
              <AccessionLabel
                title="On the day"
                rows={[
                  ["Locality", `${CONFERENCE.venue.location.trim()} · and online`],
                  ["Address", CONFERENCE.venue.address],
                  ["Registration", "Opens at 8:30 AM on both days"],
                  ["Bring", "Your confirmation email and ID"],
                ]}
              />
              <div className="grid gap-3">
                <ActionLink href="/registration" primary>
                  Register to attend
                </ActionLink>
                <ActionLink href="/submission">Submit a paper</ActionLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </main>
  );
}
