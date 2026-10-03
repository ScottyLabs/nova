import accenture from "../assets/sponsors/accenture.svg";
import anduril from "../assets/sponsors/anduril.svg";
import citadel from "../assets/sponsors/citadel.svg";
import deshaw from "../assets/sponsors/deshaw.svg";
import doordash from "../assets/sponsors/doordash.svg";
import hrt from "../assets/sponsors/hrt.svg";
import janestreet from "../assets/sponsors/janestreet.svg";
import jump from "../assets/sponsors/jump.svg";
import mechanize from "../assets/sponsors/mechanize.svg";
import optiver from "../assets/sponsors/optiver.svg";
import perplexity from "../assets/sponsors/perplexity.svg";
import recruit from "../assets/sponsors/recruit.svg";
import runpod from "../assets/sponsors/runpod.svg";
import salesforce from "../assets/sponsors/salesforce.svg";
import visa from "../assets/sponsors/visa.svg";
import css from "./Sponsors.module.css";

interface ISponsor {
  name: string;
  logo: string;
  /** logo is white-on-transparent; darken it instead of greying it */
  light?: boolean;
  /** logo is a mark only; set the name beside it */
  mark?: boolean;
  /** width ÷ height of the (ink-trimmed) logo file */
  aspect: number;
}

// Every logo gets the same visual AREA — a long wordmark is wider but shorter
// than a compact mark — so none reads bigger than another.
const TIERS: { name: string; sponsors: ISponsor[] }[] = [
  {
    name: "Premier",
    sponsors: [
      { name: "Mechanize", logo: mechanize, mark: true, aspect: 3.6 },
      { name: "Salesforce", logo: salesforce, aspect: 1.369 },
      { name: "DoorDash", logo: doordash, aspect: 7.221 },
      { name: "HRT", logo: hrt, aspect: 1.704 },
      { name: "VISA", logo: visa, aspect: 2.843 },
      { name: "Jump Trading", logo: jump, aspect: 1.164 },
    ],
  },
  {
    name: "Partner",
    sponsors: [
      { name: "Perplexity", logo: perplexity, aspect: 3.778 },
      { name: "Recruit Holdings", logo: recruit, aspect: 3.617 },
      { name: "Anduril", logo: anduril, aspect: 4.828 },
      { name: "Runpod", logo: runpod, light: true, aspect: 4.151 },
      { name: "Accenture", logo: accenture, aspect: 3.478 },
      { name: "D. E. Shaw", logo: deshaw, aspect: 4.101 },
      { name: "Citadel", logo: citadel, aspect: 7.034 },
      { name: "Optiver", logo: optiver, aspect: 3.417 },
      { name: "Jane Street", logo: janestreet, aspect: 2.4 },
    ],
  },
];

export function Sponsors() {
  return (
    <section className={css["sponsors"]}>
      <div className="clamp-width">
        <div className={css["head"]} data-reveal>
          <h2 className="label">Sponsors</h2>
        </div>
        {TIERS.map((tier) => (
          <div key={tier.name} className={css["tier"]}>
            <p className={`label ${css["tierName"]}`}>{tier.name}</p>
            <ul className={css["grid"]}>
              {tier.sponsors.map((s, i) => (
                <li key={s.name} data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <span
                    className={css["logo"]}
                    data-light={s.light || undefined}
                    style={{ "--a": Math.sqrt(s.aspect) } as React.CSSProperties}
                  >
                    <img src={s.logo} alt={s.mark ? "" : s.name} />
                    {s.mark && <span className={css["wordmark"]}>{s.name}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
