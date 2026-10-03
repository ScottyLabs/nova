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
  /** optical size nudge, for marks that read small or large at the tier height */
  scale?: number;
}

// Logo size follows the tier: Jane Street and Premier ($10k+) large, Partner ($5k+) smaller.
const TIERS: { name: string; size: "lg" | "md"; sponsors: ISponsor[] }[] = [
  {
    name: "Premier",
    size: "lg",
    sponsors: [
      { name: "Jane Street", logo: janestreet, scale: 1.3 },
      { name: "Mechanize", logo: mechanize, mark: true },
      { name: "Salesforce", logo: salesforce, scale: 1.5 },
      { name: "DoorDash", logo: doordash, scale: 0.75 },
      { name: "HRT", logo: hrt, scale: 1.2 },
      { name: "VISA", logo: visa, scale: 0.85 },
      { name: "Jump Trading", logo: jump, scale: 1.5 },
    ],
  },
  {
    name: "Partner",
    size: "md",
    sponsors: [
      { name: "Perplexity", logo: perplexity, scale: 1.6 },
      { name: "Recruit Holdings", logo: recruit },
      { name: "Anduril", logo: anduril },
      { name: "Runpod", logo: runpod, light: true },
      { name: "Accenture", logo: accenture },
      { name: "D. E. Shaw", logo: deshaw },
      { name: "Citadel", logo: citadel, scale: 0.8 },
      { name: "Optiver", logo: optiver },
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
            <ul className={css["grid"]} data-size={tier.size}>
              {tier.sponsors.map((s, i) => (
                <li key={s.name} data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <span
                    className={css["logo"]}
                    data-light={s.light || undefined}
                    style={{ "--s": s.scale ?? 1 } as React.CSSProperties}
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
