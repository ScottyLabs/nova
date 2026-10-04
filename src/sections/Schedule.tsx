import star from "../assets/cover/footer-star.png";
import type { CSSProperties } from "react";
import { Countdown } from "../components/Countdown";
import { EVENT_DATE } from "./Hero";
import css from "./Schedule.module.css";

interface ITimeSlot {
  start: string;
  end?: string;
  detail: string;
}
const schedule: ITimeSlot[] = [
  { start: "10:00 AM", end: "10:30 AM", detail: "Check-in & team formation" },
  { start: "10:30 AM", end: "11:00 AM", detail: "Opening ceremony" },
  { start: "11:00 AM", detail: "Hacking begins" },
  { start: "12:00 PM", end: "1:00 PM", detail: "Lunch" },
  { start: "5:15 PM", end: "6:15 PM", detail: "Dinner" },
  { start: "6:15 PM", end: "7:45 PM", detail: "Presentations" },
  { start: "7:45 PM", end: "8:30 PM", detail: "People\u2019s choice" },
  { start: "8:30 PM", end: "9:00 PM", detail: "Closing ceremony" },
];

export function Schedule() {
  return (
    <section className={css["schedule"]}>
      {/* the footer's star (footer-star.png), two big clusters behind the rows */}
      <div className={css["stars"]} data-void-hide aria-hidden>
        {["a", "b"].map((k) => (
          <img key={k} className={css["star"]} data-star={k} src={star} alt="" />
        ))}
      </div>
      <div className="clamp-width">
        <div className={css["table"]}>
        <div className={css["head"]} data-reveal>
          <h2 className="section-title" data-reveal="wipe">Schedule</h2>
          <p className={`subhead ${css["date"]}`}>
            _{EVENT_DATE} · <Countdown to={new Date("2026-11-07T10:00:00-05:00")} />
          </p>
        </div>
        <ol className={css["slots"]}>
          {schedule.map(({ start, end, detail }, i) => (
            <li
              key={detail}
              className={css["slot"]}
              data-reveal="row"
              style={{ "--i": i } as CSSProperties}
            >
              <span className={css["time"]}>
                {start}
                {end && ` – ${end}`}
              </span>
              <span className={`body-sc ${css["detail"]}`}>{detail}</span>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
