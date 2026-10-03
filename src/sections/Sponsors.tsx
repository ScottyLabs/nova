import css from "./Sponsors.module.css";

// 26–27 sponsors. Set as type for now; swap a name for a logo once the
// files are in.
const SPONSORS = [
  "Salesforce",
  "Perplexity",
  "Recruit Holdings",
  "Anduril",
  "Runpod",
  "DoorDash",
  "GM",
  "Mechanize",
  "Accenture",
  "D. E. Shaw",
  "Citadel",
  "Optiver",
  "HRT",
  "Jane Street",
  "VISA",
  "Jump Trading",
];

export function Sponsors() {
  return (
    <section className={css["sponsors"]}>
      <div className="clamp-width">
        <div className={css["head"]} data-reveal>
          <h2 className="label">Sponsors</h2>
        </div>
        <ul className={css["grid"]}>
          {SPONSORS.map((name, i) => (
            <li key={name} data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <span className="subhead">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
