import { useEffect } from "react";
import "./HospitalityPage.css";
import HospitalityNav from "./sections/HospitalityNav";
import HospitalityHero from "./sections/HospitalityHero";
import HospitalityAbout from "./sections/HospitalityAbout";
import HospitalitySolutions from "./sections/HospitalitySolutions";
import HospitalityOnline from "./sections/HospitalityOnline";
import HospitalityEcosystem from "./sections/HospitalityEcosystem";
import HospitalityFeatures from "./sections/HospitalityFeatures";
import HospitalityHowItWorks from "./sections/HospitalityHowItWorks";
import HospitalityDevices from "./sections/HospitalityDevices";
import HospitalityAnalytics from "./sections/HospitalityAnalytics";
import HospitalityDownloads from "./sections/HospitalityDownloads";
import HospitalityPricing from "./sections/HospitalityPricing";
import HospitalityTeam from "./sections/HospitalityTeam";
import HospitalityTestimonials from "./sections/HospitalityTestimonials";
import HospitalityResources from "./sections/HospitalityResources";
import HospitalityContact from "./sections/HospitalityContact";
import HospitalityFinalCta from "./sections/HospitalityFinalCta";
import HospitalityFooter from "./sections/HospitalityFooter";

/*
 * The full StoreLense Hospitality page (route: /hospitality).
 * It has its own navigation bar (Home, Solutions, Ecosystem), so render it
 * without your site's header. If your site already has a footer, pass showFooter={false}.
 */
export default function HospitalityPage({ showFooter = true }) {
  useEffect(() => {
    document.title = "StoreLense Hospitality – POS for restaurants, cafes, bars and hotels";
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <div className='slh-page'>
      <HospitalityNav />
      <HospitalityHero />
      <HospitalityAbout />
      <HospitalitySolutions />
      <HospitalityOnline />
      <HospitalityEcosystem />
      <HospitalityFeatures />
      <HospitalityHowItWorks />
      <HospitalityDevices />
      <HospitalityAnalytics />
      <HospitalityDownloads />
      <HospitalityPricing />
      <HospitalityTeam />
      <HospitalityTestimonials />
      <HospitalityResources />
      <HospitalityContact />
      <HospitalityFinalCta />
      {showFooter && <HospitalityFooter />}
    </div>
  );
}
