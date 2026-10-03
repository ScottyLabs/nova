import css from "./Sponsors.module.css";

const sponsorImages = Object.values(
  import.meta.glob<string>("../assets/sponsors/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

export function Sponsors() {
  return (
    <section className={css["sponsors"]}>
      <div className="clamp-width">
        <div className={css["head"]} data-reveal>
          <h2 className="label">Sponsors</h2>
        </div>
        <ul className={css["grid"]}>
          {sponsorImages.map((src, i) => (
            <li key={src} data-reveal style={{ transitionDelay: `${(i % 6) * 60}ms` }}>
              <img src={src} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
