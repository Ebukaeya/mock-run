import { Link } from "react-router-dom";
import { ArrowRight, BedDouble, Coffee, Martini, UtensilsCrossed } from "lucide-react";
import { Phone, PosTerminal, Tablet } from "./devices/DeviceFrames";
import { HOSPITALITY_ROUTE } from "./hospitalityConfig";
import useInView from "./useInView";
import "./HospitalityTeaser.css";

/*
 * Home-page section for StoreLense Hospitality.
 * Drop it into the storelense.com home page; it links to the full page.
 */
export default function HospitalityTeaser() {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <section className='slh-teaser' id='hospitality'>
      <div className={`slh-teaser__card ${inView ? "is-in" : ""}`} ref={ref}>
        <div className='slh-teaser__copy'>
          <span className='slh-teaser__new'>
            <i>New</i> StoreLense Hospitality
          </span>
          <h2 className='slh-teaser__title'>
            Now for restaurants,
            <span> cafés, bars and hotels.</span>
          </h2>
          <p className='slh-teaser__text'>
            Tables, kitchen display, storage, analytics and a live online ordering link for every venue. On Windows,
            StoreLense POS and your phones.
          </p>
          <div className='slh-teaser__types'>
            <span>
              <UtensilsCrossed size={16} /> Restaurants
            </span>
            <span>
              <Coffee size={16} /> Cafés
            </span>
            <span>
              <Martini size={16} /> Bars
            </span>
            <span>
              <BedDouble size={16} /> Hotels
            </span>
          </div>
          <Link to={HOSPITALITY_ROUTE} className='slh-teaser__cta'>
            Explore Hospitality <ArrowRight size={18} />
          </Link>
        </div>

        <Link to={HOSPITALITY_ROUTE} className='slh-teaser__stage' aria-label='Explore StoreLense Hospitality'>
          <div className='slh-teaser__tablet'>
            <Tablet screen='tables' />
          </div>
          <div className='slh-teaser__pos'>
            <PosTerminal screen='salesPoint' printing={inView} />
          </div>
          <div className='slh-teaser__phone'>
            <Phone screen='online' />
          </div>
        </Link>
      </div>
    </section>
  );
}
