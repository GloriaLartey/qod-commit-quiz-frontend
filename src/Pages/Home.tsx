import Header from "../Components/Header/header";
import { BackgroundProgrammingIcons } from "../Components/programmingIcons";
import Hero from "../Components/hero/hero";

export default function Home() {
  return (
    <div className="home-bg overflow-hidden from-black from-60% to-blue-500 h-svh">
      <Header />
      <BackgroundProgrammingIcons />
      <Hero />
    </div>
  );
}
