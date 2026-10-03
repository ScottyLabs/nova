import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Live T-minus to the event, in the mono subhead voice. */
export function Countdown({ to }: { to: Date }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, to.getTime() - now);
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  return (
    <span>
      T-{d}D {pad(Math.floor((s % 86400) / 3600))}:{pad(Math.floor((s % 3600) / 60))}:{pad(s % 60)}
    </span>
  );
}
