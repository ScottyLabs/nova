import type { CSSProperties } from "react";
import bigStar from "../assets/prizes/big-star.webp";
import emblemFirst from "../assets/prizes/emblem-first.svg";
import css from "./Prizes.module.css";

interface IGrandPrize {
  place: string;
  amount: string;
  emblem: string;
}

interface IPrizeTrack {
  name: string;
  /** a track can have sub-tracks (title + paragraphs) or just paragraphs */
  details: { title?: string; paragraphs: string[] }[];
}

/* Copy from the NOVA Hacker Guide 2026. */
const GRAND_PRIZES: IGrandPrize[] = [
  { place: "Grand prize", amount: "$2000", emblem: emblemFirst },
];

const GROUPS: { name: string; tracks: IPrizeTrack[] }[] = [
  {
    name: "Sponsor tracks",
    tracks: [
      {
        name: "DoorDash",
        details: [
          {
            title: "Front House \u2014 Customer-Facing",
            paragraphs: [
              "During peak periods, restaurant staff juggle orders from multiple sources while packing food, checking items and coordinating pickups. These tasks require significant labour and constant communication, increasing the risk of missing items, mixed-up orders and incorrect handoffs.",
              "How might AI help make this process smoother, easier and less prone to errors for staff and customers?",
            ],
          },
          {
            title: "Back House \u2014 Behind The Scenes",
            paragraphs: [
              "Restaurant owners must manage inventory, staffing and finances while keeping daily operations running. Business records are often scattered across sales reports, supplier invoices, receipts and payouts. Bringing this information together requires significant manual work, making it difficult to track performance, spot issues and plan ahead.",
              "How might AI simplify these tasks and help owners make more informed decisions?",
            ],
          },
        ],
      },
      {
        name: "Sandia National Laboratories",
        details: [{ paragraphs: ["More information at the Sandia tech talk on Friday"] }],
      },
    ],
  },
  {
    name: "Prize tracks",
    tracks: [
      {
        name: "Most InNOVAtive",
        details: [{ paragraphs: ["The team who presents the most innovative ideas"] }],
      },
      {
        name: "Beyond Limits",
        details: [{ paragraphs: ["The team who approaches their ideas with the most unique methods"] }],
      },
      {
        name: "Looks Good, Works Good",
        details: [{ paragraphs: ["The team who designed their product with the best user design"] }],
      },
      {
        name: "Community Favorite",
        details: [{ paragraphs: ["The winner of the People\u2019s Choice vote"] }],
      },
    ],
  },
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
          {GRAND_PRIZES.map(({ place, amount, emblem }, i) => (
            <li
              key={place}
              className={css["grandItem"]}
              data-reveal="row"
              style={{ "--i": i } as CSSProperties}
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
              {group.tracks.map(({ name, details }, i) => (
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
                    <div className={css["details"]}>
                      {details.map(({ title, paragraphs }) => (
                        <div key={title ?? paragraphs[0]} className={css["detail"]}>
                          {title && <h4 className={`label ${css["detailTitle"]}`}>{title}</h4>}
                          {paragraphs.map((text) => (
                            <p key={text} className="body-sc">{text}</p>
                          ))}
                        </div>
                      ))}
                    </div>
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
