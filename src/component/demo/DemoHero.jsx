import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, MessageCircle, Play } from "lucide-react";
import { contact, links } from "../../site/siteConfig";
import { featuredVideo } from "./demoConfig";

/* Top of the demo page: book a demo, or watch the tour */
const DemoHero = ({ onPlay }) => {
  return (
    <section className='slw-demo-hero'>
      <div className='slw-wrap slw-demo-hero__grid'>
        <div>
          <span className='slw-eyebrow'>Demo &amp; tutorials</span>
          <h1 className='slw-demo-hero__title'>
            See StoreLense <em>in action.</em>
          </h1>
          <p className='slw-lead'>
            Watch how stores use StoreLense to sell, track stock and secure their business. Or book a free demo and we'll show you around, at your store or on a
            call.
          </p>
          <div className='slw-demo-hero__ctas'>
            <a className='slw-btn slw-btn--wa' href={contact.whatsappDemo} target='_blank' rel='noopener noreferrer'>
              <MessageCircle size={17} /> Book a free demo
            </a>
            <Link className='slw-btn slw-btn--line' to={links.signUp}>
              Start free <ArrowRight size={17} />
            </Link>
          </div>
          <ul className='slw-demo-hero__points'>
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

        <button type='button' className='slw-demo-hero__video' onClick={() => onPlay(featuredVideo)} aria-label={`Play video: ${featuredVideo.title}`}>
          <span className='slw-demo-hero__thumb'>
            <img src={featuredVideo.poster} alt='' />
            <span className='slw-demo-hero__shade' />
            <span className='slw-demo-hero__play'>
              <Play size={30} fill='currentColor' />
            </span>
          </span>
          <span className='slw-demo-hero__caption'>
            <b>{featuredVideo.title}</b>
            <small>
              <Clock size={14} /> {featuredVideo.duration}
            </small>
          </span>
        </button>
      </div>
    </section>
  );
};

export default DemoHero;
