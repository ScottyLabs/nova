import type { CSSProperties } from "react";
import bigStar from "../assets/prizes/big-star.webp";
import emblemFirst from "../assets/prizes/emblem-first.svg";
import emblemSecond from "../assets/prizes/emblem-second.svg";
import emblemThird from "../assets/prizes/emblem-third.svg";
import css from "./Prizes.module.css";

interface IGrandPrize {
  place: string;
  amount: string;
  emblem: string;
  /** emblem width and its offset from the text, in Figma px (814:184) */
  width: number;
  offset: number;
}

interface IPrizeTrack {
  name: string;
  detail: string;
}

/* PLACEHOLDER: every value below stands in for the real prize list. Swap the
   strings when tracks are confirmed; the layout needs no other changes. */
const DETAIL = "Track details to be announced.";

const GRAND_PRIZES: IGrandPrize[] = [
  { place: "1st place", amount: "$TBA", emblem: emblemFirst, width: 308, offset: 12.5 },
  { place: "2nd place", amount: "$TBA", emblem: emblemSecond, width: 329, offset: 2.9 },
  { place: "3rd place", amount: "$TBA", emblem: emblemThird, width: 313, offset: 14 },
];

const makeTracks = (label: string, count: number): IPrizeTrack[] =>
  Array.from({ length: count }, (_, i) => ({
    name: `${label} ${String(i + 1).padStart(2, "0")}`,
    detail: DETAIL,
  }));

const GROUPS: { name: string; tracks: IPrizeTrack[] }[] = [
  { name: "Themed prizes", tracks: makeTracks("Themed track", 6) },
  { name: "Sponsor prizes", tracks: makeTracks("Sponsor track", 6) },
];

export function Prizes() {
  return (
    <section className={css["prizes"]}>
      <img className={css["bigStar"]} src={bigStar} alt="" data-void-hide aria-hidden />
      <div className="clamp-width">
        <div className={css["head"]} data-reveal>
          <h2 className="section-title" data-reveal="wipe">Prize tracks</h2>
          <p className={`subhead ${css["note"]}`}>_More to be announced soon</p>
        </div>

        <ol className={css["grand"]}>
          {GRAND_PRIZES.map(({ place, amount, emblem, width, offset }, i) => (
            <li
              key={place}
              className={css["grandItem"]}
              data-reveal="row"
              style={{ "--i": i, "--w": width, "--dy": offset } as CSSProperties}
            >
              <img className={css["emblem"]} src={emblem} alt="" />
              <div className={css["prize"]}>
                <span className={css["place"]}>{place}</span>
                <span className={css["amount"]}>{amount}</span>
              </div>
            </li>
          ))}
        </ol>

        {GROUPS.map((group) => (
          <div key={group.name} className={css["group"]}>
            <h3 className={`label ${css["groupName"]}`} data-reveal>
              {group.name}
            </h3>
            <ul className={css["tracks"]}>
              {group.tracks.map(({ name, detail }, i) => (
                <li
                  key={name}
                  className={css["track"]}
                  data-reveal="row"
                  style={{ "--i": i } as CSSProperties}
                >
                  <details>
                    <summary className={css["summary"]}>
                      <span className={`body-sc ${css["name"]}`}>{name}</span>
                      <span className={css["toggle"]} aria-hidden />
                    </summary>
                    <p className={`body-sc ${css["detail"]}`}>{detail}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
