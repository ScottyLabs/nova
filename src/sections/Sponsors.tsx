import css from "./Sponsors.module.css";
export default function Sponsors() {
  const sponsorImages = Object.values(
    import.meta.glob("../assets/sponsors/*", {
      eager: true,
      query: "url",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as Record<string, any>
  ).map((data) => data.default as string);
  return (
    <section className={css["sponsors-section"]}>
      <div className="clamp-width">
        <h2 className={css["sponsor-title"]}>Our Sponsors</h2>
        <div className={css["sponsor-container"]}>
          {sponsorImages.map((imgUrl) => (
            <img
              className={css["sponsor-image"]}
              src={imgUrl}
              alt=""
              key={imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
