import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Prizes } from "./sections/Prizes";
import { Schedule } from "./sections/Schedule";
import { Sponsors } from "./sections/Sponsors";
import { usePointerField } from "./hooks/usePointerField";
import { useReveal } from "./hooks/useReveal";

function App() {
  usePointerField();
  useReveal();
  return (
    <main className="page">
      <Hero />
      <Schedule />
      <Prizes />
      <Sponsors />
      <Footer />
    </main>
  );
}

export default App;
