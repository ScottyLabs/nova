import clsx from "clsx";
import css from "./Schedule.module.css";
import meteorLeft from "../assets/meteor-left.png";
import meteorRight from "../assets/meteor-right.png";
import linesLeft from "../assets/lines-left.png";
import linesRight from "../assets/lines-right.png";
import bigStar from "../assets/big-star.png";
import ellipse from "../assets/ellipse.png";
interface ITimeSlot {
  start: { time: string; suffix: string };
  end?: { time: string; suffix: string };
  detail: string;
  direction: "left" | "right";
}
const schedule: ITimeSlot[] = [
  {
    start: {
      time: "10:30",
      suffix: "AM",
    },
    end: {
      time: "11:00",
      suffix: "AM",
    },
    direction: "right",
    detail: "Opening ceremony",
  },
  {
    start: {
      time: "11:00",
      suffix: "AM",
    },
    end: {
      time: "6:00",
      suffix: "PM",
    },
    direction: "left",
    detail: "Hacking Time",
  },
  {
    start: {
      time: "12:00",
      suffix: "PM",
    },
    end: {
      time: "1:00",
      suffix: "PM",
    },
    direction: "right",
    detail: "Lunch",
  },
  {
    start: {
      time: "6:00",
      suffix: "PM",
    },
    end: {
      time: "7:15",
      suffix: "PM",
    },
    direction: "left",
    detail: "Presentations",
  },
  {
    start: {
      time: "7:15",
      suffix: "PM",
    },
    end: {
      time: "8:00",
      suffix: "PM",
    },
    direction: "right",
    detail: "Dinner",
  },
  {
    start: {
      time: "8:00",
      suffix: "PM",
    },
    direction: "left",
    detail: "Closing & Awards",
  },
];
function TimeSlot({ start, end, detail, direction }: ITimeSlot) {
  return (
    <div
      className={clsx(
        css["timeslot-container"],
        direction === "left"
          ? css["timeslot-container--left"]
          : css["timeslot-container--right"]
      )}
    >
      <div>
        <span className={css["time"]}>{start.time}</span>
        <span className={css["suffix"]}>{start.suffix}</span>
        {end && (
          <>
            <span className={css["time"]}>
              {" - "}
              {end.time}
            </span>
            <span className={css["suffix"]}>{end.suffix}</span>
          </>
        )}
      </div>
      {direction === "left" ? (
        <div className={css["details"]}>
          {detail}
          <img className={css[""]} src={meteorLeft} alt="" />
        </div>
      ) : (
        <div className={css["details"]}>
          <img className={css[""]} src={meteorRight} alt="" />
          {detail}
        </div>
      )}
    </div>
  );
}
export default function Schedule() {
  return (
    <section className={css["schedule-section"]}>
      <div className={css["header"]}>
        <img className={css["header__left"]} src={linesLeft} alt="" />
        <img className={css["header__star"]} src={bigStar} alt="" />
        <img className={css["header__right"]} src={linesRight} alt="" />
      </div>
      <div className="clamp-width">
        <div className={css["timeslots"]}>
          {/* extra wrapper div for nth child css selection */}
          {schedule.map((timeSlot) => (
            <TimeSlot {...timeSlot} key={timeSlot.detail} />
          ))}
          <img className={css["ellipse-1"]} src={ellipse} alt="" />
          <img className={css["ellipse-2"]} src={ellipse} alt="" />
        </div>
      </div>
    </section>
  );
}
