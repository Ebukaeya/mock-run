import { MessageCircle, Phone } from "lucide-react";
import Logo from "../Logo";
import { contact, links, social } from "../hospitalityConfig";
import "./HospitalityFooter.css";

/* Brand icons (lucide no longer ships brand logos) */
const SOCIAL_ICONS = {
  instagram: (
    <svg
      viewBox='0 0 24 24'
      width='18'
      height='18'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      aria-hidden='true'
    >
      <rect x='3' y='3' width='18' height='18' rx='5' />
      <circle cx='12' cy='12' r='4' />
      <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
    </svg>
  ),
  facebook: (
    <svg viewBox='0 0 24 24' width='18' height='18' fill='currentColor' aria-hidden='true'>
      <path d='M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V8.8c0-.5.3-.8.5-.8z' />
    </svg>
  ),
  tiktok: (
    <svg viewBox='0 0 24 24' width='18' height='18' fill='currentColor' aria-hidden='true'>
      <path d='M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.4 6.4 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.7 1.5V6.7a4.7 4.7 0 0 1-4.7-4.7z' />
    </svg>
  ),
  x: (
    <svg viewBox='0 0 24 24' width='17' height='17' fill='currentColor' aria-hidden='true'>
      <path d='M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z' />
    </svg>
  ),
};

const COLUMNS = [
  {
    title: "Product",
    links: [
      ["Online ordering", "#slh-online"],
      ["Ecosystem", "#slh-ecosystem"],
      ["Features", "#slh-features"],
      ["Pricing", "#slh-pricing"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Restaurants", "#slh-sol-restaurant"],
      ["Cafés", "#slh-sol-cafe"],
      ["Bars & lounges", "#slh-sol-bar"],
      ["Hotels", "#slh-sol-hotel"],
    ],
  },
  {
    title: "Downloads",
    links: [
      ["Windows app", "#slh-downloads"],
      ["StoreLense POS app", "#slh-downloads"],
      ["Mobile app", "#slh-downloads"],
      ["Devices & hardware", "#slh-devices"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Our team", "#slh-team"],
      ["Customer stories", "#slh-stories"],
      ["Help & guides", "#slh-resources"],
      ["Contact", "#slh-contact"],
    ],
  },
];

/* 15. Footer */
export default function HospitalityFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className='slh-foot'>
      <div className='slh-wrap'>
        <div className='slh-foot__top'>
          <div className='slh-foot__brand'>
            <a href='#slh-top' className='slh-foot__logo' aria-label='StoreLense Hospitality'>
              <Logo variant='light' size='lg' />
            </a>
            <p>
              Point of sale, kitchen, storage, online ordering and analytics for restaurants, cafés, bars and hotels.
              Owned and serviced by {contact.company}.
            </p>
            <div className='slh-foot__reach'>
              <a href={contact.whatsapp} target='_blank' rel='noopener noreferrer' className='slh-foot__wa'>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={contact.phoneHref} className='slh-foot__call'>
                <Phone size={16} /> {contact.phoneDisplay}
              </a>
            </div>
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.title} className='slh-foot__col' aria-label={c.title}>
              <b>{c.title}</b>
              {c.links.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className='slh-foot__social'>
          <span className='slh-foot__follow'>Follow us</span>
          {social.map((s) => {
            const inner = (
              <>
                <span className='slh-foot__sIc'>{SOCIAL_ICONS[s.id]}</span>
                <span>
                  <small>{s.label}</small>
                  {s.handle}
                </span>
              </>
            );
            return s.url ? (
              <a key={s.id} href={s.url} target='_blank' rel='noopener noreferrer' className='slh-foot__s'>
                {inner}
              </a>
            ) : (
              <span key={s.id} className='slh-foot__s'>
                {inner}
              </span>
            );
          })}
        </div>

        <div className='slh-foot__bottom'>
          <span>
            &copy; {year} {contact.company}. StoreLense is owned and serviced by {contact.company}.
          </span>
          <div>
            {links.privacy && <a href={links.privacy}>Privacy policy</a>}
            {links.terms && <a href={links.terms}>Terms and conditions</a>}
          </div>
        </div>
      </div>
    </footer>
  );
}
