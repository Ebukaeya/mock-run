import { ArrowUpRight, Clock, Globe, Headphones, MessageCircle, Phone, TrendingUp } from "lucide-react";
import { contact, wa } from "../hospitalityConfig";
import "./HospitalityContact.css";

/* 13. Contact & support: WhatsApp and phone only */
export default function HospitalityContact() {
  return (
    <section className='slh-contact' id='slh-contact'>
      <div className='slh-wrap'>
        <div className='slh-contact__head'>
          <span className='slh-eyebrow'>Contact & support</span>
          <h2 className='slh-h2'>Talk to a real person, today.</h2>
          <p className='slh-lead'>
            Message us on WhatsApp or call. Sales, demos and support all go to the same friendly team.
          </p>
        </div>

        <div className='slh-contact__grid'>
          <a
            className='slh-contact__card slh-contact__card--wa'
            href={contact.whatsapp}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='slh-contact__ic'>
              <MessageCircle size={28} />
            </span>
            <span className='slh-contact__kicker'>WhatsApp</span>
            <b>Chat with us</b>
            <span className='slh-contact__num'>{contact.phoneDisplay}</span>
            <span className='slh-contact__go'>
              Open WhatsApp <ArrowUpRight size={18} />
            </span>
          </a>

          <a className='slh-contact__card slh-contact__card--call' href={contact.phoneHref}>
            <span className='slh-contact__ic'>
              <Phone size={26} />
            </span>
            <span className='slh-contact__kicker'>Phone</span>
            <b>Call us</b>
            <span className='slh-contact__num'>{contact.phoneDisplay}</span>
            <span className='slh-contact__go'>
              Call now <ArrowUpRight size={18} />
            </span>
          </a>

          <div className='slh-contact__side'>
            <a className='slh-contact__quick' href={contact.whatsappSales} target='_blank' rel='noopener noreferrer'>
              <TrendingUp size={18} />
              <span>
                <b>Sales &amp; pricing</b>
                <small>Plans, hardware and setup</small>
              </span>
            </a>
            <a
              className='slh-contact__quick'
              href={wa("Hi StoreLense, I need help with StoreLense Hospitality.")}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Headphones size={18} />
              <span>
                <b>Technical support</b>
                <small>Printers, devices, sign-in</small>
              </span>
            </a>
            <div className='slh-contact__info'>
              <span>
                <Clock size={15} /> {contact.hours}
              </span>
              <span>
                <Globe size={15} /> {contact.website}
              </span>
              <b>{contact.company}</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
