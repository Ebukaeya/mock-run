import { Award, GraduationCap, Handshake, MapPin, MessageCircle, Store } from "lucide-react";
import { contact, team } from "../hospitalityConfig";
import useInView from "../useInView";
import "./HospitalityTeam.css";

const PROMISES = [
  { icon: Store, label: "Free demo at your venue" },
  { icon: GraduationCap, label: "On-site setup and staff training" },
  { icon: MapPin, label: "Local support that knows your business" },
  { icon: Handshake, label: "Here as you open new venues" },
];

/* Our team on the ground, and our award */
export default function HospitalityTeam() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [p1, p2, p3, p4, p5] = team.photos;

  return (
    <section className='slh-team' id='slh-team'>
      <div className='slh-wrap'>
        <div className='slh-team__grid'>
          <div className='slh-team__copy'>
            <span className='slh-eyebrow'>Our team</span>
            <h2 className='slh-h2'>People on the ground, not just software.</h2>
            <p className='slh-lead'>
              Our team meets business owners where they work: in markets, shops and venues across Nigeria. We set you up
              in person, train your staff and stay close by when you need us.
            </p>
            <ul className='slh-team__promises'>
              {PROMISES.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.label}>
                    <span>
                      <Icon size={18} />
                    </span>
                    {p.label}
                  </li>
                );
              })}
            </ul>
            <a
              className='slh-btn slh-btn--blue slh-team__cta'
              href={contact.whatsappDemo}
              target='_blank'
              rel='noopener noreferrer'
            >
              <MessageCircle size={18} /> Book a free demo
            </a>
          </div>

          <div className={`slh-team__mosaic ${inView ? "is-in" : ""}`} ref={ref}>
            <img
              className='slh-team__ph slh-team__ph--a'
              src={p1}
              alt='StoreLense team at a market stand with StoreLense POS devices'
              loading='lazy'
            />
            <img
              className='slh-team__ph slh-team__ph--b'
              src={p5}
              alt='A StoreLense team member holding a StoreLense POS'
              loading='lazy'
            />
            <img
              className='slh-team__ph slh-team__ph--c'
              src={p2}
              alt='Setting up a business owner in her shop'
              loading='lazy'
            />
            <img
              className='slh-team__ph slh-team__ph--d'
              src={p3}
              alt='StoreLense team at an outdoor market event'
              loading='lazy'
            />
            <img
              className='slh-team__ph slh-team__ph--e'
              src={p4}
              alt='StoreLense team speaking with traders'
              loading='lazy'
            />
          </div>
        </div>

        <figure className='slh-team__award'>
          <div className='slh-team__awardPhoto'>
            <img
              src={team.award.photo}
              alt='StoreLense receiving recognition at the Skill-Lift business programme'
              loading='lazy'
            />
          </div>
          <figcaption>
            <span className='slh-team__ribbon'>
              <Award size={18} /> Recognition
            </span>
            <h3>{team.award.title}</h3>
            <p>{team.award.text}</p>
            <blockquote>
              <b>Our promise</b>
              Simple tools, honest numbers and a team that shows up, so you can focus on your guests.
            </blockquote>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
