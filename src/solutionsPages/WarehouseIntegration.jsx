// WarehouseIntegration.jsx — Solutions: Warehouse integration (route: /solutions/warehouse-integration)
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowRightLeft, Bell, CheckCircle, MapPin, MessageCircle, Package, RefreshCw, Warehouse } from "lucide-react";
import Navbar from "../component/Narbar.jsx";
import Footer from "../component/Footer.jsx";
import { Browser } from "../home/HomeDevices";
import { pricing, screens } from "../home/homeConfig";
import { contact, wa } from "../site/siteConfig";
import "../home/HomePage.css";
import "./WarehouseIntegration.css";

const FEATS = [
  {
    icon: RefreshCw,
    title: "Real-time sync",
    desc: "Every sale at any till deducts from the right location's count straight away. No manual updates.",
  },
  {
    icon: ArrowRightLeft,
    title: "Stock transfers",
    desc: "Move stock between locations in the app, with the quantity, who moved it and when.",
  },
  {
    icon: MapPin,
    title: "Multi-location",
    desc: "Lagos, Abuja, Enugu: manage every branch and store room from one dashboard.",
  },
  {
    icon: Bell,
    title: "Restock alerts",
    desc: "Get notified when a product in a warehouse drops below your threshold.",
  },
  {
    icon: Package,
    title: "Batch tracking",
    desc: "Receive goods in batches, with dates and supplier details.",
  },
  {
    icon: Warehouse,
    title: "Warehouse view",
    desc: "Inbound, outbound and what's on hand right now, all on one screen.",
  },
];

/* Example locations, shown as an illustration */
const LOCS = [
  { name: "Lagos Hub", type: "Warehouse", qty: 1284, pct: 82, tone: "blue" },
  { name: "Abuja Store", type: "Retail branch", qty: 342, pct: 55, tone: "teal" },
  { name: "Enugu Store", type: "Retail branch", qty: 198, pct: 40, tone: "green" },
];

const STEPS = [
  { icon: MapPin, title: "Create a warehouse", body: "Add your warehouse as a named location in your dashboard." },
  {
    icon: Package,
    title: "Link your products",
    body: "Assign products to each location. Quantities are tracked separately.",
  },
  { icon: RefreshCw, title: "Receive stock", body: "Log deliveries. Counts update the moment you confirm receipt." },
  {
    icon: ArrowRightLeft,
    title: "Transfer between locations",
    body: "Deducts from the source and adds to the destination.",
  },
  {
    icon: CheckCircle,
    title: "Everything stays in sync",
    body: "Sales at any branch update the warehouse. One source of truth.",
  },
];

function LocCard({ name, type, qty, pct, tone }) {
  return (
    <div className={`slw-wh-loc slw-wh-loc--${tone}`}>
      <div className='slw-wh-loc__head'>
        <span className='slw-wh-loc__ic'>{type === "Warehouse" ? <Warehouse size={17} /> : <MapPin size={17} />}</span>
        <span>
          <b>{name}</b>
          <small>{type}</small>
        </span>
        <span className='slw-wh-loc__sync'>Synced</span>
      </div>
      <div className='slw-wh-loc__row'>
        <span>Items on hand</span>
        <b>{qty.toLocaleString()}</b>
      </div>
      <i className='slw-wh-loc__bar'>
        <em style={{ width: `${pct}%` }} />
      </i>
    </div>
  );
}

export default function WarehouseIntegration() {
  useEffect(() => {
    document.title = "Warehouse integration – StoreLense";
  }, []);

  // Stores and warehouses on each plan, from the pricing in homeConfig
  const plans = pricing.plans.filter((p) => p.id !== "starter");

  return (
    <div className='slw-page'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='slw-wh-hero'>
          <div className='slw-wrap slw-wh-hero__grid'>
            <div>
              <span className='slw-eyebrow'>Warehouse integration</span>
              <h1 className='slw-wh-hero__title'>
                One stock pool, <em>every location.</em>
              </h1>
              <p className='slw-lead'>
                Connect your warehouse to every store branch. When stock moves, by a sale, a transfer or a delivery, every location knows straight away.
              </p>
              <div className='slw-wh-hero__ctas'>
                <Link className='slw-btn slw-btn--blue' to='/sign-up'>
                  <Warehouse size={17} /> Set up a warehouse
                </Link>
                <a className='slw-btn slw-btn--wa' href={wa("Hi StoreLense, I have a question about warehouses.")} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Ask a question
                </a>
              </div>
            </div>
            <div className='slw-wh-hero__locs' aria-label='Example locations'>
              {LOCS.map((l) => (
                <LocCard key={l.name} {...l} />
              ))}
              <span className='slw-wh-hero__flow' aria-hidden='true'>
                <ArrowRightLeft size={16} /> Transfer: 120 items, Lagos Hub → Abuja Store
              </span>
            </div>
          </div>
        </section>

        {/* The real screen */}
        <section className='slw-wh-split'>
          <div className='slw-wrap slw-wh-split__grid'>
            <div className='slw-wh-split__shot'>
              <Browser src={screens.businesses} alt='Stores and warehouses in StoreLense' url='app.storelense.com/businesses' />
            </div>
            <div>
              <span className='slw-eyebrow'>Stores &amp; warehouses</span>
              <h2 className='slw-h2'>Every shop and store room in one account.</h2>
              <p className='slw-lead'>Run several stores and warehouses side by side, each with its own stock, staff and sales, and move stock between them.</p>
              <ul className='slw-wh-list'>
                <li>
                  <CheckCircle size={17} /> Stock moves with full history
                </li>
                <li>
                  <CheckCircle size={17} /> Staff only see their own store
                </li>
                <li>
                  <CheckCircle size={17} /> Totals across every location
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className='slw-wh-feat'>
          <div className='slw-wrap'>
            <div className='slw-wh-head'>
              <span className='slw-eyebrow'>Capabilities</span>
              <h2 className='slw-h2'>Built for businesses that sell across locations.</h2>
            </div>
            <div className='slw-wh-feat__grid'>
              {FEATS.map(({ icon: Icon, title, desc }) => (
                <article key={title} className='slw-wh-feat__card'>
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

        {/* How it works */}
        <section className='slw-wh-how'>
          <div className='slw-wrap slw-wh-how__grid'>
            <div>
              <span className='slw-eyebrow'>How it works</span>
              <h2 className='slw-h2'>Connected in minutes.</h2>
              <p className='slw-lead'>Our team can set it up with you on a free onboarding call.</p>
              <a
                className='slw-btn slw-btn--wa slw-wh-how__btn'
                href={wa("Hi StoreLense, I'd like to book a free warehouse setup call.")}
                target='_blank'
                rel='noopener noreferrer'
              >
                <MessageCircle size={17} /> Book a free setup call
              </a>
            </div>
            <ol className='slw-wh-steps'>
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <li key={title}>
                  <span className='slw-wh-steps__ic'>
                    <Icon size={19} />
                  </span>
                  <div>
                    <small>Step {i + 1}</small>
                    <b>{title}</b>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Locations per plan */}
        <section className='slw-wh-plans'>
          <div className='slw-wrap'>
            <div className='slw-wh-head'>
              <span className='slw-eyebrow'>Plans</span>
              <h2 className='slw-h2'>Warehouses come with Super User and up.</h2>
            </div>
            <div className='slw-wh-plans__grid'>
              {plans.map((p) => (
                <div key={p.id} className={`slw-wh-plans__card ${p.featured ? "is-featured" : ""}`}>
                  <b>{p.name}</b>
                  <div className='slw-wh-plans__nums'>
                    <span>
                      <strong className={p.limits.stores == null ? "is-custom" : ""}>{p.limits.stores ?? "Custom"}</strong>
                      <small>{p.limits.stores === 1 ? "store" : "stores"}</small>
                    </span>
                    <span>
                      <strong className={p.limits.warehouses == null ? "is-custom" : ""}>{p.limits.warehouses ?? "Custom"}</strong>
                      <small>{p.limits.warehouses === 1 ? "warehouse" : "warehouses"}</small>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link className='slw-wh-plans__all' to='/#pricing'>
              See all plans and prices <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className='slw-wh-cta'>
          <div className='slw-wrap'>
            <div className='slw-wh-cta__panel'>
              <div>
                <h2>Ready to connect your warehouse?</h2>
                <p>Our team walks you through setup on a free onboarding call.</p>
              </div>
              <div className='slw-wh-cta__btns'>
                <Link className='slw-btn slw-btn--white' to='/sign-up'>
                  Start free <ArrowRight size={17} />
                </Link>
                <a className='slw-btn slw-btn--ghost' href={contact.phoneHref}>
                  Call {contact.phoneDisplay}
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
