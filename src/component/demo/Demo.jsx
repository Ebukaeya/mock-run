import DemoCTA from "./DemoCTA";

import DemoHero from "./DemoHero";
import VideoGallery from "./VideoGallery";
import DemoTestimonials from "./VideoTestimonies";
import "./demo.css";
import WhyChooseSection from "./Demofeatures";

const Demo = () => {
  return (
    <div className='demo-page'>
      <DemoHero />
      <VideoGallery />
      <WhyChooseSection />
      <DemoTestimonials />
      <DemoCTA />
    </div>
  );
};

export default Demo;
