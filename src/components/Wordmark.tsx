import plain from "../assets/cover/nova-wordmark.svg";
import css from "./Wordmark.module.css";

/** NOVA wordmark (300:158). The box is the letters; the image's glow overhangs it. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={`${css["wordmark"]} ${className ?? ""}`}>
      <img className={css["logo"]} src={plain} alt="NOVA" />
    </div>
  );
}
