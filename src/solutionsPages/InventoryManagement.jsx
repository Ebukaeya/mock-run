// InventoryManagement.jsx — Solutions: Inventory management (route: /solutions/inventory-management). Dark theme.
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Archive, ArrowRight, Check, MessageCircle, Package, RefreshCw, ScanLine, Tag } from "lucide-react";
import Navbar from "../component/Narbar.jsx";
import Footer from "../component/Footer.jsx";
import WorldGlobe from "./WorldGlobe";
import { Browser, Phone } from "../home/HomeDevices";
import { screens } from "../home/homeConfig";
import { contact } from "../site/siteConfig";
import "../home/HomePage.css";
import "./InventoryManagement.css";

const FEATS = [
  {
    icon: RefreshCw,
    title: "Real-time counts",
    desc: "Every sale deducts stock the moment it's confirmed. No end-of-day counting.",
  },
  {
    icon: AlertTriangle,
    title: "Low stock alerts",
    desc: "Set a minimum for each product and get told before you run out, not after.",
  },
  {
    icon: ScanLine,
    title: "Barcode scanning",
    desc: "Scan products to add them to a sale or check their stock. No typing, no mistakes.",
  },
  {
    icon: Tag,
    title: "Product variants",
    desc: "Sizes, colours and weights, each tracked with its own stock count.",
  },
  {
    icon: Archive,
    title: "Batch management",
    desc: "Receive goods in batches with supplier and date details, and trace any unit to its source.",
  },
  {
    icon: Package,
    title: "Slow stock",
    desc: "See products that haven't moved in 30, 60 or 90 days, and mark them down before they pile up.",
  },
];

/* Example stock, shown as an illustration */
const PRODUCTS = [
  { name: "Ariel Detergent 1kg", sku: "ARD-1KG", qty: 84, min: 20, pct: 84, low: false },
  { name: "Indomie Chicken 70g", sku: "IND-CH70", qty: 12, min: 30, pct: 18, low: true },
  { name: "Sunlight Soap 200g", sku: "SNL-200G", qty: 210, min: 50, pct: 95, low: false },
  { name: "Peak Milk 400g", sku: "PKM-400G", qty: 5, min: 20, pct: 8, low: true },
];

const RINGS = [
  { name: "Total products", val: "1,284", pct: 100, tone: "blue" },
  { name: "In stock", val: "1,198", pct: 93, tone: "green" },
  { name: "Low stock", val: "72", pct: 6, tone: "amber" },
  { name: "Out of stock", val: "14", pct: 1, tone: "red" },
];

function Ring({ name, val, pct, tone }) {
  const c = 2 * Math.PI * 20;
  return (
    <div className={`slw-im-ring slw-im-ring--${tone}`}>
      <span className='slw-im-ring__chart'>
        <svg width='54' height='54' viewBox='0 0 52 52' aria-hidden='true'>
          <circle className='slw-im-ring__track' cx='26' cy='26' r='20' fill='none' strokeWidth='6' />
          <circle
            className='slw-im-ring__fill'
            cx='26'
            cy='26'
            r='20'
            fill='none'
            strokeWidth='6'
            strokeLinecap='round'
            strokeDasharray={c}
            strokeDashoffset={c - (pct / 100) * c}
            transform='rotate(-90 26 26)'
          />
        </svg>
        <i>{pct}%</i>
      </span>
      <span>
        <b>{name}</b>
        <small>{val} items</small>
      </span>
    </div>
  );
}

export default function InventoryManagement() {
  useEffect(() => {
    document.title = "Inventory management – StoreLense";
  }, []);

  return (
    <div className='slw-page slw-im'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='slw-im-hero'>
          <WorldGlobe />
          <div className='slw-wrap slw-im-hero__grid'>
            <div>
              <span className='slw-im-eyebrow'>Inventory management</span>
              <h1 className='slw-im-hero__title'>
                Never sell what <em>you don't have.</em>
              </h1>
              <p className='slw-im-lead'>
                Stock counts that update with every sale, transfer and delivery. Know exactly what's on your shelf, before your customer asks.
              </p>
              <div className='slw-im-hero__ctas'>
                <Link className='slw-btn slw-btn--blue' to='/sign-up'>
                  <Package size={17} /> Get started
                </Link>
                <Link className='slw-btn slw-btn--ghost' to='/demo'>
                  See a demo
                </Link>
              </div>
            </div>
            <div className='slw-im-hero__visual' aria-label='Example stock overview'>
              <div className='slw-im-alert' aria-hidden='true'>
                <span>
                  <AlertTriangle size={15} />
                </span>
                <p>
                  <small>Low stock</small>
                  <b>Peak Milk 400g · 5 left</b>
                </p>
              </div>
              <div className='slw-im-rings'>
                {RINGS.map((r) => (
                  <Ring key={r.name} {...r} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live stock table */}
        <section className='slw-im-sec slw-im-sec--alt'>
          <div className='slw-wrap'>
            <div className='slw-im-head slw-im-head--center'>
              <span className='slw-im-eyebrow'>Live stock view</span>
              <h2 className='slw-im-h2'>
                Your shelf, <em>in real time.</em>
              </h2>
              <p className='slw-im-lead'>Every row updates the moment a sale is made. Colours flag what needs attention.</p>
            </div>
            <div className='slw-im-table'>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>On hand</th>
                    <th>Min.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map(({ name, sku, qty, min, pct, low }) => (
                    <tr key={sku}>
                      <td className='slw-im-table__name'>{name}</td>
                      <td className='slw-im-table__sku'>{sku}</td>
                      <td>
                        <span className={`slw-im-table__qty ${low ? "is-low" : pct > 70 ? "is-ok" : "is-mid"}`}>
                          <b>{qty}</b>
                          <i>
                            <em style={{ width: `${pct}%` }} />
                          </i>
                        </span>
                      </td>
                      <td className='slw-im-table__sku'>{min}</td>
                      <td>
                        {low ? (
                          <span className='slw-im-status slw-im-status--low'>
                            <AlertTriangle size={13} /> Low
                          </span>
                        ) : (
                          <span className='slw-im-status slw-im-status--ok'>
                            <Check size={13} strokeWidth={3} /> In stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className='slw-im-note'>Example stock</p>
          </div>
        </section>

        {/* Real screens */}
        <section className='slw-im-sec'>
          <div className='slw-wrap slw-im-split'>
            <div className='slw-im-split__shots'>
              <Browser src={screens.scan} alt='Scanning a barcode into a sale in StoreLense' url='app.storelense.com/sales-point' />
              <div className='slw-im-split__phone'>
                <Phone src={screens.mProducts} alt='Products and stock levels in the StoreLense mobile app' />
              </div>
            </div>
            <div>
              <span className='slw-im-eyebrow'>Scan &amp; count</span>
              <h2 className='slw-im-h2'>
                Scan it in, <em>see it everywhere.</em>
              </h2>
              <p className='slw-im-lead'>Use the camera or a handheld scanner at the counter, then check stock from your phone wherever you are.</p>
              <ul className='slw-im-list'>
                <li>
                  <Check size={16} strokeWidth={3} /> Camera or handheld scanner
                </li>
                <li>
                  <Check size={16} strokeWidth={3} /> Stock levels on every product
                </li>
                <li>
                  <Check size={16} strokeWidth={3} /> The same numbers on the POS, web and phone
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className='slw-im-sec slw-im-sec--alt'>
          <div className='slw-wrap'>
            <div className='slw-im-head'>
              <span className='slw-im-eyebrow'>Features</span>
              <h2 className='slw-im-h2'>
                Everything that keeps your <em>stock honest.</em>
              </h2>
            </div>
            <div className='slw-im-feat'>
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

        {/* CTA */}
        <section className='slw-im-sec'>
          <div className='slw-wrap'>
            <div className='slw-im-cta'>
              <div>
                <h2>Stop counting stock by hand.</h2>
                <p>Let StoreLense do it for you, with every sale.</p>
              </div>
              <div className='slw-im-cta__btns'>
                <Link className='slw-btn slw-btn--white' to='/sign-up'>
                  Start free <ArrowRight size={17} />
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
