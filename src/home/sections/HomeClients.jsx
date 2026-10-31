import { Link } from "react-router-dom";
import { BadgeCheck, Store } from "lucide-react";
import { clients } from "../homeConfig";
import { links } from "../../site/siteConfig";
import "./HomeClients.css";

/* Real stores running StoreLense */
export default function HomeClients() {
  return (
    <section className='slw-clients' id='stores'>
      <div className='slw-wrap'>
        <div className='slw-clients__head'>
          <div>
            <span className='slw-eyebrow'>Live in real stores</span>
            <h2 className='slw-h2'>
              Real owners. Real counters. <em>Real time.</em>
            </h2>
          </div>
          <p className='slw-lead'>
            These are StoreLense terminals running checkout in shops across Nigeria, set up in person by our team.
          </p>
        </div>

        <div className='slw-clients__grid'>
          {clients.map((c, i) =>
            c.src ? (
              <figure key={c.src} className={`slw-clients__tile ${c.wide ? "is-wide" : ""}`}>
                <img src={c.src} alt={`${c.name} using the StoreLense POS`} loading='lazy' />
                <figcaption>
                  <b>
                    <BadgeCheck size={14} /> {c.name}
                  </b>
                  <span>{c.tag}</span>
                </figcaption>
              </figure>
            ) : (
              <div key={`slot-${i}`} className={`slw-clients__slot ${c.wide ? "is-wide" : ""}`} aria-hidden='true'>
                <span>
                  <Store size={22} />
                </span>
                <b>Next on the wall</b>
              </div>
            ),
          )}
          <Link to={links.signUp} className='slw-clients__join'>
            <b>Want your store on this wall?</b>
            <span>Start free, and our team will help you set up.</span>
            <em>Get started &rarr;</em>
          </Link>
        </div>
      </div>
    </section>
  );
}
