import { useCallback, useEffect, useState } from "react";
import Navbar from "../Narbar.jsx";
import Footer from "../Footer.jsx";
import DemoHero from "./DemoHero";
import VideoGallery from "./VideoGallery";
import WhyChooseSection from "./Demofeatures";
import DemoTestimonials from "./VideoTestimonies";
import DemoCTA from "./DemoCTA";
import DemoVideoModal from "./DemoVideoModal";
import "../../home/HomePage.css";
import "./demo.css";

/* Demo and video tutorials (route: /demo) */
const Demo = () => {
  const [playing, setPlaying] = useState(null);
  const close = useCallback(() => setPlaying(null), []);

  useEffect(() => {
    document.title = "Demo & video tutorials – StoreLense";
  }, []);

  return (
    <div className='slw-page'>
      <Navbar />
      <main>
        <DemoHero onPlay={setPlaying} />
        <VideoGallery onPlay={setPlaying} />
        <WhyChooseSection />
        <DemoTestimonials />
        <DemoCTA />
      </main>
      <Footer />
      <DemoVideoModal video={playing} onClose={close} />
    </div>
  );
};

export default Demo;
