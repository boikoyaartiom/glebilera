import Hero from "./components/Hero";
import Story from "./components/Story";
import Details from "./components/Details";
import Timeline from "./components/Timeline";
import DressCode from "./components/DressCode";
import Wishlist from "./components/Wishlist";
import RSVPForm from "./components/RSVPForm";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans selection:bg-[#8C6D58]/20 selection:text-[#8C6D58]">
      <Hero />
      <Story />
      <Details />
      <Timeline />
      <DressCode />
      <Wishlist />
      <RSVPForm />
      <Footer />
      <MusicPlayer />
    </div>
  );
}
