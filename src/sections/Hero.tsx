import { CoverArt } from "../components/CoverArt";
import { StarPattern } from "../components/StarPattern";
import { Scramble } from "../components/Scramble";
import { Wordmark } from "../components/Wordmark";
import css from "./Hero.module.css";

export const EVENT_DATE = "11.7.2026";
export const REGISTRATION_OPENS = "10.4.2026";

export function Hero() {
  return (
    <section className={css["hero"]}>
      <CoverArt />
      {/* centred on NOVA (see --mark-* in Hero.module.css) */}
      <StarPattern
        centerX="50%"
        centerY="calc(var(--mark-y) + var(--mark-h) / 2)"
        width={1700}
        opacity={0.7}
        hoverOpacity={1}
      />
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
