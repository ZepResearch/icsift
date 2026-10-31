"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CONFERENCE } from "@/constants/conference";
import { pb } from "@/lib/pocketbase";
import { matchSpeaker, getSpeakerImageUrl } from "@/lib/matchSpeaker";
import { ActionPair, CallBand, FactCells, Field, PageHero } from "@/components/signal/page";

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
        <Image
          src={match.imageUrl}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-t-full object-cover object-top grayscale"
        />
      ) : (
        <span
          aria-hidden="true"
          className="sig-display grid h-14 w-14 shrink-0 place-items-center rounded-t-full bg-[var(--forest)] text-[18px] text-[var(--signal)]"
        >
          {initialsOf(speaker.name)}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[16.5px] leading-snug font-semibold">{speaker.name}</span>
        <span className="block text-[15px] leading-snug text-[var(--muted)]">{speaker.affiliation}</span>
        {match?.category ? <span className="block text-[14.5px] text-[var(--muted)]">{match.category}</span> : null}
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
    <div className="bg-[var(--forest)] p-3 text-[var(--signal)]">
      <div className="flex items-center justify-between px-1 py-1">
        <button
          type="button"
          onClick={() => move(-1)}
          className="grid h-10 w-10 place-items-center hover:bg-[var(--signal)] hover:text-[var(--forest)]"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <p className="sig-display text-[22px]" aria-live="polite">
          {title}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          className="grid h-10 w-10 place-items-center hover:bg-[var(--signal)] hover:text-[var(--forest)]"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7" aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day} className="py-1 text-center text-[13px] font-semibold text-[var(--cream)]/70">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <span key={`blank-${index}`} className="aspect-square" />;
          const conference = isConferenceMonth && days.includes(day);
          const selected = conference && day === activeDay;
          const isToday = today && today.y === view.y && today.m === view.m && today.d === day;
          const base = "grid aspect-square place-items-center text-[15px]";
          if (!conference) {
            return (
              <span key={day} className={`${base} ${isToday ? "font-bold text-white underline underline-offset-4" : "text-[var(--cream)]/75"}`}>
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
              className={`${base} sig-display text-[19px] ${
                selected ? "bg-[var(--signal)] text-[var(--forest)]" : "outline-2 -outline-offset-2 outline-[var(--signal)] hover:bg-[var(--signal)] hover:text-[var(--forest)]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="mt-2 px-1 pb-1 text-[14.5px] text-[var(--cream)]/80">
        {isConferenceMonth ? (
          "Outlined dates are conference days. Select one to see its agenda."
        ) : (
          <button type="button" onClick={() => setView({ y: year, m: month })} className="sig-link font-semibold text-[var(--signal)]">
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
    <main className="sig min-h-screen">
      {/* Hero: title and lead left; the day switch as two large panels right (the selected day turns yellow). */}
      <PageHero
        id="schedule-title"
        tag="Schedule"
        title="Two days, hour by hour"
        lead={`The programme for the ${CONFERENCE.shortForm}, ${CONFERENCE.date}, in ${CONFERENCE.venue.location.trim()} and online. Pick a day to see its sessions.`}
        aside={
          <div role="tablist" aria-label="Conference days" className="grid gap-2 sm:grid-cols-2">
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
                  className={`p-6 text-left transition-colors duration-200 ${
                    selected ? "bg-[var(--signal)] text-[var(--forest)]" : "bg-[var(--panel)] hover:bg-[var(--forest-deep)]/60"
                  }`}
                >
                  <span className="sig-display block text-[clamp(3rem,2rem+2.6vw,4.5rem)] leading-none">Day {index + 1}</span>
                  <span className="mt-3 block text-[17px] font-semibold">{dayLabel(entry.day)}</span>
                </button>
              );
            })}
          </div>
        }
      />

      {/* Agenda: the day's timeline left; the calendar, the on-the-day facts and the actions in a sticky rail right. */}
      <Field tone="cream" labelledBy="agenda-title" reveal={false}>
        <div id="day-panel" role="tabpanel" aria-labelledby={`day-tab-${active}`} className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 id="agenda-title" className="sig-h2">
              Day {active + 1}
            </h2>
            <p className="mt-3 text-[18px] font-semibold text-[var(--muted)]">{dayLabel(current.day)}</p>

            <ol className="mt-10 grid gap-2">
              {current.items.map((item, index) => {
                const isBreak = item.kind === "break";
                return (
                  <li
                    key={`${item.time}-${item.title}-${index}`}
                    className={`grid gap-x-6 gap-y-2 p-5 sm:grid-cols-[10rem_1fr] sm:p-6 ${
                      isBreak ? "bg-transparent outline-2 -outline-offset-2 outline-dashed outline-[var(--rule)]" : "bg-[var(--panel)]"
                    }`}
                  >
                    <p className="sig-display text-[19px] leading-tight whitespace-nowrap">{item.time || "Close"}</p>
                    <div>
                      <p className={isBreak ? "text-[17px] text-[var(--muted)]" : "sig-display text-[clamp(1.35rem,1.1rem+0.6vw,1.75rem)] leading-[1.05]"}>
                        {item.title}
                      </p>
                      {/* {item.speakers?.length ? (
                        <ul className="mt-4 grid gap-4 md:grid-cols-2">
                          {item.speakers.map((speaker) => (
                            <Speaker key={speaker.name} speaker={speaker} match={speakerMap.get(speaker.name)} />
                          ))}
                        </ul>
                      ) : null} */}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-40 lg:self-start">
            <MonthCalendar activeDay={current.day} onPick={(day) => setActive(SCHEDULE.findIndex((entry) => entry.day === day))} />
            <FactCells
              columns=""
              size="text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)]"
              facts={[
                ["Where", `${CONFERENCE.venue.name.trim()}, ${CONFERENCE.venue.location.trim()}, and online`],
                ["Registration", "Opens at 8:30 AM on both days"],
                ["Bring", "Your confirmation email and ID"],
              ]}
            />
            <ActionPair tone="cream" primary={["/registration", "Register"]} secondary={["/submission", "Submit a paper"]} />
          </aside>
        </div>
      </Field>

      <CallBand
        title="Two days in the room"
        text={`${CONFERENCE.date}, ${CONFERENCE.venue.name.trim()}, ${CONFERENCE.venue.location.trim()}, and online.`}
        primary={["/registration", "Register"]}
        secondary={["/submission", "Submit a paper"]}
      />
    </main>
  );
}
