import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BarChart3, ChevronDown, Globe, Menu, MessageCircle, Package, ShoppingBag, UtensilsCrossed, Warehouse, X } from "lucide-react";
import SiteLogo from "../site/SiteLogo";
import { contact, links, solutions } from "../site/siteConfig";
import "../styles/siteNav.css";

const ICONS = {
  retail: ShoppingBag,
  inventory: Package,
  warehouse: Warehouse,
  analytics: BarChart3,
  ecommerce: Globe,
};

/* Site-wide navigation (used by the home, solutions, services and POS setup pages) */
const Navbar = () => {
  const [solOpen, setSolOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [stuck, setStuck] = useState(false);
  const ref = useRef(null);
  const timer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setSolOpen(false);
    setMobile(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setSolOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSolOpen(false);
        setMobile(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const enter = () => {
    clearTimeout(timer.current);
    setSolOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setSolOpen(false), 140);
  };
  const close = () => {
    setSolOpen(false);
    setMobile(false);
  };

  return (
    <header className={`slw-nav ${stuck ? "is-stuck" : ""} ${mobile ? "is-open" : ""}`} ref={ref}>
      <div className='slw-nav__bar'>
        <Link to='/' className='slw-nav__brand' aria-label='StoreLense home' onClick={close}>
          <SiteLogo />
        </Link>

        <nav className='slw-nav__links' aria-label='Main'>
          <div className='slw-nav__sol' onMouseEnter={enter} onMouseLeave={leave}>
            <button
              type='button'
              className={`slw-nav__link ${solOpen ? "is-on" : ""}`}
              aria-expanded={solOpen}
              aria-controls='slw-nav-sol'
              onClick={() => setSolOpen(!solOpen)}
            >
              Solutions <ChevronDown size={16} />
            </button>
          </div>
          <Link to={links.posSetup} className='slw-nav__link'>
            Hardware
          </Link>
          <a href='/#payments' className='slw-nav__link'>
            Payments
          </a>
          <a href='/#pricing' className='slw-nav__link'>
            Pricing
          </a>
          <Link to={links.hospitality} className='slw-nav__link slw-nav__link--hosp'>
            Hospitality <i>New</i>
          </Link>
          <Link to={links.contact} className='slw-nav__link'>
            Contact
          </Link>
        </nav>

        <div className='slw-nav__actions'>
          <a className='slw-nav__wa' href={contact.whatsappSales} target='_blank' rel='noopener noreferrer'>
            <MessageCircle size={17} /> Talk to sales
          </a>
          <Link className='slw-nav__cta' to={links.getStarted}>
            Get started
          </Link>
          <button
            type='button'
            className='slw-nav__burger'
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Solutions menu (desktop dropdown, and the whole menu on phones) */}
      <div id='slw-nav-sol' className={`slw-nav__menu ${solOpen || mobile ? "is-open" : ""}`} onMouseEnter={enter} onMouseLeave={leave}>
        <div className='slw-nav__menuInner'>
          <div className='slw-nav__mobileLinks'>
            <Link to={links.posSetup} onClick={close}>
              Hardware
            </Link>
            <a href='/#payments' onClick={close}>
              Payments
            </a>
            <a href='/#pricing' onClick={close}>
              Pricing
            </a>
            <Link to={links.contact} onClick={close}>
              Contact
            </Link>
          </div>

          <div className='slw-nav__group'>
            <span className='slw-nav__groupTitle'>For stores</span>
            <div className='slw-nav__items'>
              {solutions.map((s) => {
                const Icon = ICONS[s.key];
                return (
                  <Link key={s.key} to={s.path} className='slw-nav__item' onClick={close}>
                    <span className='slw-nav__itemIc'>
                      <Icon size={18} />
                    </span>
                    <span>
                      <b>{s.label}</b>
                      <small>{s.desc}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link to={links.hospitality} className='slw-nav__hosp' onClick={close}>
            <span className='slw-nav__hospTag'>New</span>
            <span className='slw-nav__hospIc'>
              <UtensilsCrossed size={22} />
            </span>
            <b>StoreLense Hospitality</b>
            <small>For restaurants, cafés, bars and hotels: tables, kitchen display and online ordering.</small>
            <span className='slw-nav__hospGo'>
              Explore <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
