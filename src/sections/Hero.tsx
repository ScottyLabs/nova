import { useCallback, useEffect, useState } from "react";
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
  // Intro: hold everything until the art has loaded (or 2.5s pass), then the
  // art settles in together and the type follows, decoding as it appears.
  const [cover, setCover] = useState(false);
  const [star, setStar] = useState(false);
  const [late, setLate] = useState(false);
  const onCover = useCallback(() => setCover(true), []);
  useEffect(() => {
    const id = setTimeout(() => setLate(true), 2500);
    return () => clearTimeout(id);
  }, []);
  const intro = (cover && star) || late;

  return (
    <section className={css["hero"]} data-intro={intro || undefined}>
      <div className={css["art"]}>
      <CoverArt onReady={onCover} />
      {/* cover star "Union (Stroke)" 293:1146, at its render bounds */}
      <img
        className={css["star"]}
        src={heroStar}
        alt=""
        data-void-hide
        onLoad={() => setStar(true)}
      />
      {/* lilac clusters 328:1345 (left edge) and 328:1349 (top right),
          each with Figma's progressive blur, in the node's own frame */}
      <div className={css["pink"]} data-pink="left" data-void-hide aria-hidden>
        <ProgressiveBlur src={pinkLeft} angle={162} from={0} to={75} blur="calc(10 * var(--ua))" />
      </div>
      <div className={css["pink"]} data-pink="right" data-void-hide aria-hidden>
        <ProgressiveBlur src={pinkRight} angle={178} from={50} to={97} blur="calc(25 * var(--ua))" />
      </div>
      </div>
      <p className={`mono-small ${css["presented"]}`}>
        <Scramble text="Presented by Scottylabs" delay={350} play={intro} />
      </p>
      <p className={`mono-small ${css["tagline"]}`}>
        <Scramble text="CMU’s first GenAI playground hackathon" delay={420} play={intro} />
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
        <Scramble text="_Hackathon" delay={700} play={intro} />
      </p>
      <p className={css["sub"]} data-word="the">
        <Scramble text="_The" delay={650} play={intro} />
      </p>
      <p className={css["sub"]} data-word="genai">
        <span>
          <Scramble text="Gen-" delay={680} play={intro} />
        </span>
        <br />
        <Scramble text="AI_" delay={720} play={intro} />
      </p>

      <p className={css["register"]}>
        <Scramble text={`Registration opens ${REGISTRATION_OPENS}`} delay={880} play={intro} />
      </p>
    </section>
  );
}
