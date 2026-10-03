import { CoverArt } from "../components/CoverArt";
import { ProgressiveBlur } from "../components/ProgressiveBlur";
import heroStar from "../assets/cover/hero-star.png";
import pinkLeft from "../assets/cover/pink-left.svg";
import pinkRight from "../assets/cover/pink-right.svg";
import { Scramble } from "../components/Scramble";
import { Wordmark } from "../components/Wordmark";
import css from "./Hero.module.css";

export const EVENT_DATE = "11.7.2026";
export const REGISTRATION_OPENS = "10.4.2026";

export function Hero() {
  return (
    <section className={css["hero"]}>
      <CoverArt />
      {/* cover star "Union (Stroke)" 293:1146, at its render bounds */}
      <img className={css["star"]} src={heroStar} alt="" data-void-hide />
      {/* lilac clusters 328:1345 (left edge) and 328:1349 (top right),
          each with Figma's progressive blur, in the node's own frame */}
      <div className={css["pink"]} data-pink="left" data-void-hide aria-hidden>
        <ProgressiveBlur src={pinkLeft} angle={162} from={0} to={75} blur="calc(10 * var(--u))" />
      </div>
      <div className={css["pink"]} data-pink="right" data-void-hide aria-hidden>
        <ProgressiveBlur src={pinkRight} angle={178} from={50} to={97} blur="calc(25 * var(--u))" />
      </div>
      <p className={`mono-small ${css["presented"]}`}>
        <Scramble text="Presented by Scottylabs" delay={200} />
      </p>
      <p className={`mono-small ${css["tagline"]}`}>
        <Scramble text="CMU’s first GenAI playground hackathon" delay={350} />
      </p>
      <p className={`mono-small ${css["about"]}`}>
        Nova is a hackathon designed for you to create and innovate in a
        playground of generative technology. With tools like GPT, MidJourney,
        and Eleven Labs, participants can freely experiment and bring their
        ideas to life.
      </p>

      <h1 className={css["mark"]}>
        <Wordmark />
      </h1>
      <p className={css["sub"]} data-word="hackathon">
        <Scramble text="_Hackathon" delay={900} />
      </p>
      <p className={css["sub"]} data-word="the">
        <Scramble text="_The" delay={700} />
      </p>
      <p className={css["sub"]} data-word="genai">
        <span>
          <Scramble text="Gen-" delay={800} />
        </span>
        <br />
        <Scramble text="AI_" delay={850} />
      </p>

      <p className={css["register"]}>
        <Scramble text={`Registration opens ${REGISTRATION_OPENS}`} delay={1100} />
      </p>
    </section>
  );
}
