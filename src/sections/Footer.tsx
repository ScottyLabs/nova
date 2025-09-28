import css from "./Footer.module.css";
import novaLogo from "../assets/nova--transparent.png";
import footerLines from "../assets/footer-lines.png";
import footerLinesSmall from "../assets/footer-lines--small.png";
export default function Footer() {
  return (
    <footer className={css["footer-container"]}>
      <div className="clamp-width">
        <div className={css["left-section"]}>
          <img className={css[""]} src={novaLogo} alt="" />
          <span className={css[""]}>Presented by ScottyLabs &lt;3</span>
        </div>
        <img className={css["lines--large"]} src={footerLines} alt="" />
        <img className={css["lines--small"]} src={footerLinesSmall} alt="" />
      </div>
    </footer>
  );
}
