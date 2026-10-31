import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  BedDouble,
  ChevronDown,
  Coffee,
  Download,
  Globe,
  LayoutGrid,
  LifeBuoy,
  Martini,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Star,
  Tag,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Logo from "../Logo";
import { contact, links } from "../hospitalityConfig";
import "./HospitalityNav.css";

const GROUPS = [
  {
    title: "Business types",
    items: [
      { href: "#slh-sol-restaurant", icon: UtensilsCrossed, label: "Restaurants", text: "Tables, waiters and kitchen" },
      { href: "#slh-sol-cafe", icon: Coffee, label: "Cafés", text: "Fast counter sales" },
      { href: "#slh-sol-bar", icon: Martini, label: "Bars & lounges", text: "Tabs and stock control" },
      { href: "#slh-sol-hotel", icon: BedDouble, label: "Hotels", text: "Rooms, restaurant and bar" },
    ],
  },
  {
    title: "Product",
    items: [
      { href: "#slh-online", icon: Globe, label: "Online ordering", text: "A live link for every venue" },
      { href: "#slh-features", icon: LayoutGrid, label: "Features", text: "Look around the app" },
      { href: "#slh-devices", icon: MonitorSmartphone, label: "Devices & hardware", text: "StoreLense POS and Mini" },
      { href: "#slh-analytics", icon: BarChart3, label: "Analytics", text: "Profit, VAT and trends" },
    ],
  },
  {
    title: "Get started",
    items: [
      { href: "#slh-downloads", icon: Download, label: "Download apps", text: "Windows, Android, iOS" },
      { href: "#slh-pricing", icon: Tag, label: "Pricing", text: "Start free" },
      { href: "#slh-team", icon: Users, label: "Our team", text: "And our award" },
      { href: "#slh-stories", icon: Star, label: "Customer stories", text: "Venues on StoreLense" },
      { href: "#slh-resources", icon: LifeBuoy, label: "Help & guides", text: "Manual, videos, FAQs" },
    ],
  },
];

/* The hospitality page's only navigation bar: Home, Solutions (menu), Ecosystem. */
export default function HospitalityNav() {
  const [open, setOpen] = useState(false); // Solutions menu (desktop)
  const [mobile, setMobile] = useState(false); // whole menu (phones)
  const [stuck, setStuck] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
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

  const close = () => {
    setOpen(false);
    setMobile(false);
  };

  return (
    <header className={`slh-nav ${stuck ? "is-stuck" : ""} ${mobile ? "is-mobile-open" : ""}`} ref={wrapRef}>
      <div className='slh-nav__bar'>
        <a href='#slh-top' className='slh-nav__brand' aria-label='StoreLense Hospitality' onClick={close}>
          <Logo />
        </a>

        <nav className='slh-nav__links' aria-label='Main'>
          <Link to={links.home} className='slh-nav__link'>
            Home
          </Link>
          <button
            type='button'
            className={`slh-nav__link slh-nav__trigger ${open ? "is-open" : ""}`}
            aria-expanded={open}
            aria-controls='slh-nav-menu'
            onClick={() => setOpen(!open)}
          >
            Solutions <ChevronDown size={16} />
          </button>
          <a href='#slh-ecosystem' className='slh-nav__link' onClick={close}>
            Ecosystem
          </a>
        </nav>

        <div className='slh-nav__actions'>
          <a className='slh-nav__wa' href={contact.whatsappSales} target='_blank' rel='noopener noreferrer'>
            <MessageCircle size={17} /> Talk to sales
          </a>
          <a className='slh-nav__cta' href={links.getStarted} target='_blank' rel='noopener noreferrer'>
            Get started
          </a>
          <button
            type='button'
            className='slh-nav__burger'
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Solutions menu: everything else on the page lives here */}
      <div id='slh-nav-menu' className={`slh-nav__menu ${open || mobile ? "is-open" : ""}`}>
        <div className='slh-nav__menuInner'>
          <div className='slh-nav__mobileLinks'>
            <Link to={links.home} onClick={close}>
              Home
            </Link>
            <a href='#slh-ecosystem' onClick={close}>
              Ecosystem
            </a>
          </div>
          {GROUPS.map((g) => (
            <div key={g.title} className='slh-nav__group'>
              <span className='slh-nav__groupTitle'>{g.title}</span>
              {g.items.map((it) => {
                const Icon = it.icon;
                return (
                  <a key={it.label} href={it.href} className='slh-nav__item' onClick={close}>
                    <span className='slh-nav__itemIc'>
                      <Icon size={18} />
                    </span>
                    <span>
                      <b>{it.label}</b>
                      <small>{it.text}</small>
                    </span>
                  </a>
                );
              })}
            </div>
          ))}
          <div className='slh-nav__promo'>
            <span className='slh-nav__promoTag'>Live ordering link</span>
            <b>Every venue gets its own online ordering page.</b>
            <a href='#slh-online' onClick={close}>
              See how it works &rarr;
            </a>
            <a className='slh-nav__promoWa' href={contact.whatsappDemo} target='_blank' rel='noopener noreferrer'>
              <MessageCircle size={16} /> Book a free demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
