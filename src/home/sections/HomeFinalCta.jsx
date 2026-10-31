import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, PlayCircle } from "lucide-react";
import { contact, links } from "../../site/siteConfig";
import "./HomeFinalCta.css";

/* Closing call to action */
export default function HomeFinalCta() {
  return (
    <section className='slw-cta'>
      <div className='slw-wrap slw-cta__inner'>
        <h2 className='slw-cta__title'>
          Count every sale
          <span>from tomorrow morning.</span>
        </h2>
        <p className='slw-cta__text'>
          Create your account and start selling today, or let our team come to your store, set everything up and train
          your staff.
        </p>
        <div className='slw-cta__actions'>
          <Link className='slw-btn slw-btn--white' to={links.signUp}>
            Start free <ArrowRight size={18} />
          </Link>
          <a className='slw-btn slw-btn--wa' href={contact.whatsappDemo} target='_blank' rel='noopener noreferrer'>
            <MessageCircle size={18} /> Book a free demo
          </a>
          <Link className='slw-btn slw-btn--ghost' to={links.demo}>
            <PlayCircle size={18} /> Watch the demo
          </Link>
        </div>
      </div>
    </section>
  );
}
