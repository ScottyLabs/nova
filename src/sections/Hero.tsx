import novaLogo from "../assets/nova.png";
import headerStar from "../assets/nova-star.png";
import novaStreak from "../assets/nova-streak-long.png";
import css from "./Hero.module.css";
import shortStreak from "../assets/short-streak.png";
export function Hero() {
  return (
    <section className={css["hero-section-bg"]}>
      <div className="clamp-width">
        <div className={css["hero-section"]}>
          <div className={css["header-decoration"]}>
            <img className={css["header__star"]} src={headerStar} alt="" />
            <div className={css["header__streak"]}>
              <img src={novaStreak} alt="" />
              <span>PRESENTED BY SCOTTYLABS</span>
            </div>
          </div>
          <div className={css["hero-container"]}>
            <img className={css["hero__logo"]} src={novaLogo} alt="" />
            <p className={css["hero__date"]}>11.8.2025</p>
            <p className={css["hero__description"]}>
              Nova is a hackathon designed for you to create and innovate in a
              playground of generative technology. With tools like GPT,
              MidJourney, and Eleven Labs, participants can freely experiment
              and bring their ideas to life.
            </p>
            <a href="https://forms.gle/ErgwGjPWs6xtihnr7">
              <button className={css["hero__button"]}>Register</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
