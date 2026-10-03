import footerStar from "../assets/cover/footer-star.png";
import plain from "../assets/cover/nova-wordmark.svg";
import scottylabs from "../assets/cover/scottylabs.svg";
import { EVENT_DATE } from "./Hero";
import css from "./Footer.module.css";

/** Bottom of the cover (300:144, y ≥ 2900): blue glow, static star, cropped NOVA. */
export function Footer() {
  return (
    <footer className={css["footer"]}>
      <div className={css["glow"]} data-parallax data-void-hide aria-hidden />
      <div className={css["star"]} data-void-hide aria-hidden>
        <img src={footerStar} alt="" />
      </div>
      <p className={`mono-small ${css["tagline"]}`}>CMU&rsquo;s first GenAI playground hackathon</p>
      <div className={css["swoosh"]}>
        <img src={plain} alt="NOVA" />
      </div>
      <p className={css["date"]}>{EVENT_DATE}</p>
      <div className={css["credit"]}>
        <img src={scottylabs} alt="" />
        <p>
          With <span className={css["heart"]}>&lt;3,</span>
          <br />
          Scottylabs
        </p>
      </div>
    </footer>
  );
}
