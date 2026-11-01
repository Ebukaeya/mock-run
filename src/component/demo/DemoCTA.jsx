import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { contact, links } from "../../site/siteConfig";

/* Closing call to action */
const DemoCTA = () => {
  return (
    <section className='slw-demo-cta'>
      <div className='slw-wrap'>
        <div className='slw-demo-cta__panel'>
          <h2>Ready to get started?</h2>
          <p>Start on the free Starter plan, or let us show you around first.</p>
          <div className='slw-demo-cta__btns'>
            <Link className='slw-btn slw-btn--white' to={links.signUp}>
              Start free <ArrowRight size={17} />
            </Link>
            <a className='slw-btn slw-btn--wa' href={contact.whatsappDemo} target='_blank' rel='noopener noreferrer'>
              <MessageCircle size={17} /> Book a free demo
            </a>
            <a className='slw-btn slw-btn--ghost' href={contact.phoneHref}>
              <Phone size={17} /> {contact.phoneDisplay}
            </a>
          </div>
          <ul>
            <li>
              <Check size={16} strokeWidth={3} /> Free Starter plan
            </li>
            <li>
              <Check size={16} strokeWidth={3} /> Setup &amp; training
            </li>
            <li>
              <Check size={16} strokeWidth={3} /> 24/7 support
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DemoCTA;
