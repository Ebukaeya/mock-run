import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SiteLogo from "../site/SiteLogo";
import { contact, links, social, solutions } from "../site/siteConfig";
import "../styles/siteFooter.css";

/* Brand icons (lucide no longer ships brand logos) */
const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
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

/* Site-wide footer */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='slw-foot'>
      <div className='slw-foot__wrap'>
        <div className='slw-foot__top'>
          <div className='slw-foot__brand'>
            <Link to='/' aria-label='StoreLense home'>
              <SiteLogo variant='light' size='lg' />
            </Link>
            <p>POS hardware and retail software in one system: sales, stock, warehouses, staff and online selling, tracked live across your stores.</p>
            <div className='slw-foot__reach'>
              <a href={contact.whatsapp} target='_blank' rel='noopener noreferrer' className='slw-foot__wa'>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={contact.phoneHref} className='slw-foot__call'>
                <Phone size={16} /> {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <nav className='slw-foot__col' aria-label='Solutions'>
            <b>Solutions</b>
            {solutions.map((s) => (
              <Link key={s.key} to={s.path}>
                {s.label}
              </Link>
            ))}
            <Link to={links.hospitality} className='slw-foot__new'>
              Hospitality <i>New</i>
            </Link>
          </nav>

          <nav className='slw-foot__col' aria-label='Product'>
            <b>Product</b>
            <a href='/#features'>Features</a>
            <Link to={links.posSetup}>Hardware &amp; POS setups</Link>
            <a href='/#pricing'>Pricing</a>
            <a href='/#download'>Download the app</a>
            <Link to={links.demo}>Watch the demo</Link>
          </nav>

          <nav className='slw-foot__col' aria-label='Company'>
            <b>Company</b>
            <Link to={links.services}>Services</Link>
            <Link to={links.contact}>Contact</Link>
            <Link to={links.getStarted}>Sign in / Get started</Link>
          </nav>

          <div className='slw-foot__col slw-foot__contact'>
            <b>Contact</b>
            <a href={contact.phoneHref}>
              <Phone size={15} /> {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail size={15} /> {contact.email}
            </a>
            <span>
              <MapPin size={15} /> {contact.address}
            </span>
          </div>
        </div>

        <div className='slw-foot__social'>
          <span className='slw-foot__follow'>Follow us</span>
          {social.map((s) => {
            const inner = (
              <>
                <span className='slw-foot__sIc'>{SOCIAL_ICONS[s.id]}</span>
                <span>
                  <small>{s.label}</small>
                  {s.handle}
                </span>
              </>
            );
            return s.url ? (
              <a key={s.id} href={s.url} target='_blank' rel='noopener noreferrer' className='slw-foot__s'>
                {inner}
              </a>
            ) : (
              <span key={s.id} className='slw-foot__s'>
                {inner}
              </span>
            );
          })}
        </div>

        <div className='slw-foot__bottom'>
          <span>
            &copy; {year} {contact.company}. StoreLense is owned and serviced by {contact.company}.
          </span>
          <div>
            <Link to={links.privacy}>Privacy policy</Link>
            <Link to={links.terms}>Terms of service</Link>
            <Link to={links.deleteAccount}>Delete account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
