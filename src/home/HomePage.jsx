import { useEffect } from "react";
import "./HomePage.css"; // first, so section styles can override the shared helpers
import Navbar from "../component/Narbar.jsx";
import Footer from "../component/Footer.jsx";
import HospitalityTeaser from "../hospitality/HospitalityTeaser.jsx";
import HomeHero from "./sections/HomeHero.jsx";
import HomeClients from "./sections/HomeClients.jsx";
import HomeSystem from "./sections/HomeSystem.jsx";
import HomeScan from "./sections/HomeScan.jsx";
import HomeMobile from "./sections/HomeMobile.jsx";
import HomeTeam from "./sections/HomeTeam.jsx";
import HomeWhoFor from "./sections/HomeWhoFor.jsx";
import HomeHardware from "./sections/HomeHardware.jsx";
import HomePricing from "./sections/HomePricing.jsx";
import HomeDownloads from "./sections/HomeDownloads.jsx";
import HomeFinalCta from "./sections/HomeFinalCta.jsx";
import HomeExplainer from "./sections/HomeExplainer.jsx";
import HomePayments from "./sections/HomePayments.jsx";

/* The StoreLense home page (route: /) */
export default function HomePage() {
  useEffect(() => {
    document.title = "StoreLense – POS and inventory for Nigerian businesses";
  }, []);

  return (
    <div className='slw-page'>
      <Navbar />
      <main>
        <HomeHero />
        <HomeExplainer />
        <HomeClients />
        <HomeSystem />
        <HomeScan />
        <HomeMobile />
        <HomeTeam />
        <HospitalityTeaser />
        <HomeWhoFor />
        <HomeHardware />
        <HomePayments />
        <HomePricing />
        <HomeDownloads />
        <HomeFinalCta />
      </main>
      <Footer />
    </div>
  );
}
