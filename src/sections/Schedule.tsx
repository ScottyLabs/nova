import { Countdown } from "../components/Countdown";
import { EVENT_DATE } from "./Hero";
import css from "./Schedule.module.css";

interface ITimeSlot {
  start: string;
  end?: string;
  detail: string;
}
const schedule: ITimeSlot[] = [
  { start: "10:00 AM", end: "9:00 PM", detail: "Schedule will be announced soon" },
];

export function Schedule() {
  return (
    <section className={css["schedule"]}>
      <div className="clamp-width">
        <div className={css["head"]} data-reveal>
          <h2 className="label">Schedule</h2>
          <p className="subhead">
            _{EVENT_DATE} · <Countdown to={new Date("2026-11-07T10:00:00-05:00")} />
          </p>
        </div>
        <ol className={css["slots"]}>
          {schedule.map(({ start, end, detail }) => (
            <li key={detail} className={css["slot"]} data-reveal>
              <span className={css["time"]}>
                {start}
                {end && ` – ${end}`}
              </span>
              <span className={`body-sc ${css["detail"]}`}>{detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
