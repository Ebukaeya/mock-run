import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { contact, links } from "../hospitalityConfig";
import useInView from "../useInView";
import "./HospitalityFinalCta.css";

const TICKER = [
  "Online · Mama Tobi's Kitchen",
  "Takeaway · Suya Platter",
  "Booth 2 · round of Chapman",
  "Room 105 · dinner",
  "Online · 3 Shawarma",
  "Table 9 · Grilled Croaker",
  "Counter · 2 Cappuccino",
  "Patio 5 · Pepper Soup",
];

/* 14. Final call to action */
export default function HospitalityFinalCta() {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <section className='slh-cta' id='slh-start'>
      <div className='slh-cta__ticker' aria-hidden='true'>
        <div className='slh-cta__track'>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className={`slh-wrap slh-cta__inner slh-reveal ${inView ? "is-in" : ""}`} ref={ref}>
        <h2 className='slh-cta__title'>
          Open tonight
          <span>with StoreLense.</span>
        </h2>
        <p className='slh-cta__text'>
          Create your account, load your menu and take your first order today. Our team can come to your venue to set it
          all up.
        </p>
        <div className='slh-cta__actions'>
          {links.getStarted && (
            <a className='slh-btn slh-btn--white' href={links.getStarted} target='_blank' rel='noopener noreferrer'>
              Create your account <ArrowRight size={18} />
            </a>
          )}
          <a className='slh-btn slh-cta__wa' href={contact.whatsappDemo} target='_blank' rel='noopener noreferrer'>
            <MessageCircle size={18} /> Book a free demo
          </a>
          <a className='slh-btn slh-btn--ghost' href='#slh-downloads'>
            <Download size={18} /> Download
          </a>
        </div>
      </div>
    </section>
  );
}
