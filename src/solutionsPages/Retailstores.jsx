// Retailstores.jsx — Solutions: Retail stores (route: /solutions/retail-stores). Dark theme.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, CheckCircle, CreditCard, MessageCircle, Printer, Shield, ShoppingBag, Users, Wifi, Zap } from "lucide-react";
import Navbar from "../component/Narbar.jsx";
import Footer from "../component/Footer.jsx";
import { PosMini, PosTerminal } from "../home/HomeDevices";
import WorldGlobe from "./WorldGlobe";
import { clients, screens } from "../home/homeConfig";
import { contact } from "../site/siteConfig";
import "../home/HomePage.css";
import "./RetailStores.css";

const FEATS = [
  {
    icon: Zap,
    title: "Instant checkout",
    desc: "Ring up sales in seconds: search, quantity, payment, done. No training manual needed.",
  },
  {
    icon: CreditCard,
    title: "All payment types",
    desc: "Cash, card, transfer and part payment. Every channel supported out of the box.",
  },
  {
    icon: Printer,
    title: "80mm receipts",
    desc: "Branded receipts print the moment a sale is confirmed.",
  },
  {
    icon: Wifi,
    title: "Works offline",
    desc: "Internet down? StoreLense keeps selling and syncs by itself when you're back online.",
  },
  {
    icon: Users,
    title: "Multi-staff support",
    desc: "Each cashier has their own login. Shift reports show who sold what, and when.",
  },
  {
    icon: Shield,
    title: "Fraud protection",
    desc: "Every action is logged. Voids and price overrides are flagged to the owner.",
  },
];

const STEPS = [
  {
    icon: Zap,
    title: "Plug in and power on",
    body: "Your terminal arrives set up. Connect it to power and it's ready to go.",
    badge: "No IT required",
  },
  {
    icon: ShoppingBag,
    title: "Add your products",
    body: "Import from a spreadsheet or add items one by one. Barcode scanning supported.",
    badge: "Spreadsheet import",
  },
  {
    icon: Users,
    title: "Add your staff",
    body: "Create cashier profiles in seconds, each with their own login and access level.",
  },
  {
    icon: CheckCircle,
    title: "Start selling",
    body: "Tap a product, choose the quantity, take payment. Your first receipt prints.",
    badge: "You're live",
  },
];

const STATS = [
  ["Free", "Starter plan"],
  ["Offline", "Keeps selling"],
  ["Setup", "& staff training"],
  ["24/7", "Support"],
];

/* Example shift, shown as an illustration */
const SHIFT = [
  ["Transactions", "84"],
  ["Cash collected", "₦182,400"],
  ["Card & transfer", "₦230,400"],
  ["Voids", "2"],
];

export default function RetailStores() {
  useEffect(() => {
    document.title = "POS for retail stores – StoreLense";
  }, []);

  // Up to three real store photos, one per store
  // The StoreLense Mini prints a receipt, pauses, then prints again
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    let t;
    const cycle = (on) => {
      setPrinting(on);
      t = setTimeout(() => cycle(!on), on ? 4500 : 1800);
    };
    t = setTimeout(() => cycle(true), 800);
    return () => clearTimeout(t);
  }, []);

  const photos = clients.filter((c, i, all) => c.src && all.findIndex((x) => x.name === c.name) === i).slice(0, 3);

  return (
    <div className='slw-page slw-rs'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='slw-rs-hero'>
          <WorldGlobe />
          <div className='slw-wrap slw-rs-hero__grid'>
            <div>
              <span className='slw-rs-eyebrow'>Retail stores</span>
              <h1 className='slw-rs-hero__title'>
                The POS your shop has been <em>waiting for.</em>
              </h1>
              <p className='slw-rs-lead'>
                From a boutique in Lekki to a supermarket in Enugu, StoreLense runs your checkout, tracks your stock and protects your cash, all from one
                terminal.
              </p>
              <div className='slw-rs-hero__ctas'>
                <Link className='slw-btn slw-btn--blue' to='/pos-setup'>
                  <ShoppingBag size={17} /> Get your terminal
                </Link>
                <a className='slw-btn slw-btn--ghost' href={contact.whatsappSales} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Talk to us
                </a>
              </div>
            </div>
            <div className='slw-rs-hero__visual'>
              <span className='slw-rs-hero__glow' aria-hidden='true' />
              <div className='slw-rs-hero__pos'>
                <PosTerminal src={screens.salesPoint} alt='The StoreLense Sales Point on a StoreLense POS' />
              </div>
              <div className='slw-rs-hero__mini'>
                <PosMini src={screens.mSell} printing={printing} alt='The StoreLense Mini printing a receipt' />
              </div>
              <div className='slw-rs-hero__card' aria-hidden='true'>
                <small>Today's revenue</small>
                <b>₦284,500</b>
                <span>
                  <i /> Shift open · 47 sales
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className='slw-rs-stats'>
          <div className='slw-wrap'>
            <div className='slw-rs-stats__grid'>
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <b>{v}</b>
                  <small>{l}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <section className='slw-rs-sec'>
          <div className='slw-wrap'>
            <div className='slw-rs-head'>
              <span className='slw-rs-eyebrow'>What's included</span>
              <h2 className='slw-rs-h2'>
                Everything a retail store <em>actually needs.</em>
              </h2>
              <p className='slw-rs-lead'>No bloat. The essentials for selling at the counter, from day one.</p>
            </div>
            <div className='slw-rs-feat'>
              {FEATS.map(({ icon: Icon, title, desc }) => (
                <article key={title}>
                  <span>
                    <Icon size={22} />
                  </span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Setup */}
        <section className='slw-rs-sec slw-rs-sec--alt'>
          <div className='slw-wrap slw-rs-setup'>
            <div>
              <div className='slw-rs-head'>
                <span className='slw-rs-eyebrow'>Setup</span>
                <h2 className='slw-rs-h2'>
                  Up and running in <em>minutes.</em>
                </h2>
                <p className='slw-rs-lead'>Our team sets everything up before your terminal reaches you.</p>
              </div>
              <ol className='slw-rs-steps'>
                {STEPS.map(({ icon: Icon, title, body, badge }) => (
                  <li key={title}>
                    <span className='slw-rs-steps__ic'>
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                      {badge && (
                        <span className='slw-rs-steps__badge'>
                          <CheckCircle size={13} /> {badge}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className='slw-rs-shift' aria-label='Example shift summary'>
              <div className='slw-rs-shift__head'>
                <small>Shift summary</small>
                <i>Closed</i>
              </div>
              <b className='slw-rs-shift__total'>₦412,800</b>
              <dl>
                {SHIFT.map(([l, v]) => (
                  <div key={l}>
                    <dt>{l}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className='slw-rs-shift__note'>Example shift</p>
            </div>
          </div>
        </section>

        {/* Real stores */}
        {photos.length > 0 && (
          <section className='slw-rs-sec'>
            <div className='slw-wrap'>
              <div className='slw-rs-head'>
                <span className='slw-rs-eyebrow'>Live in real stores</span>
                <h2 className='slw-rs-h2'>
                  Real shops, <em>real counters.</em>
                </h2>
              </div>
              <div className='slw-rs-photos'>
                {photos.map((c) => (
                  <figure key={c.src}>
                    <img src={c.src} alt={`${c.name} using the StoreLense POS`} loading='lazy' />
                    <figcaption>
                      <b>
                        <BadgeCheck size={14} /> {c.name}
                      </b>
                      <span>{c.tag}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className='slw-rs-sec slw-rs-sec--alt'>
          <div className='slw-wrap'>
            <div className='slw-rs-cta'>
              <div>
                <h2>Ready to upgrade your checkout?</h2>
                <p>Pick a setup, and our team will set it up and get you selling.</p>
              </div>
              <div className='slw-rs-cta__btns'>
                <Link className='slw-btn slw-btn--white' to='/pos-setup'>
                  See POS setups <ArrowRight size={17} />
                </Link>
                <a className='slw-btn slw-btn--wa' href={contact.whatsappSales} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
