import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
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
      <Sponsors />
      <Footer />
    </main>
  );
}

export default App;
