// InventoryManagement.jsx — dark theme
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, RefreshCw, AlertTriangle, ScanLine, Tag, Archive } from "lucide-react";
import WorldGlobe from "./WorldGlobe";
import "./solutions.css";
import "./InventoryManagement.css";
import Footer from "../component/Footer";

const FEATS = [
  {
    icon: RefreshCw,
    color: "#37B4C5",
    bg: "rgba(55,180,197,.18)",
    title: "Real-time counts",
    desc: "Every sale deducts inventory the moment the transaction confirms. No overnight batch jobs.",
  },
  {
    icon: AlertTriangle,
    color: "#F5A623",
    bg: "rgba(245,166,35,.18)",
    title: "Low stock alerts",
    desc: "Set minimum thresholds per product. Get notified before you run out, not after.",
  },
  {
    icon: ScanLine,
    color: "#37B4C5",
    bg: "rgba(55,180,197,.18)",
    title: "Barcode scanning",
    desc: "Scan products to add to a sale or look up stock levels. No typing, no mistakes.",
  },
  {
    icon: Tag,
    color: "#16A34A",
    bg: "rgba(22,163,74,.18)",
    title: "Product variants",
    desc: "Sizes, colours, weights — each variant tracked independently with its own stock count.",
  },
  {
    icon: Archive,
    color: "#2563EB",
    bg: "rgba(37,99,235,.18)",
    title: "Batch management",
    desc: "Receive goods in named batches with supplier and date info. Trace any unit to source.",
  },
  {
    icon: Package,
    color: "#37B4C5",
    bg: "rgba(55,180,197,.18)",
    title: "Dead stock visibility",
    desc: "See products that haven't moved in 30, 60 or 90 days. Mark down before they pile up.",
  },
];
const PRODUCTS = [
  { name: "Ariel Detergent 1kg", sku: "ARD-1KG", qty: 84, min: 20, pct: 84, low: false },
  { name: "Indomie Chicken 70g", sku: "IND-CH70", qty: 12, min: 30, pct: 18, low: true },
  { name: "Sunlight Soap 200g", sku: "SNL-200G", qty: 210, min: 50, pct: 95, low: false },
  { name: "Peak Milk 400g", sku: "PKM-400G", qty: 5, min: 20, pct: 8, low: true },
];
const RINGS = [
  { name: "Total SKUs", val: "1,284", pct: 100, color: "#2563EB", track: "rgba(37,99,235,.15)" },
  { name: "In stock", val: "1,198", pct: 93, color: "#16A34A", track: "rgba(22,163,74,.15)" },
  { name: "Low stock", val: "72", pct: 6, color: "#F5A623", track: "rgba(245,166,35,.15)" },
  { name: "Out of stock", val: "14", pct: 1, color: "#EF4444", track: "rgba(239,68,68,.15)" },
];
function RingCard({ name, val, pct, color, track }) {
  const c = 2 * Math.PI * 20,
    off = c - (pct / 100) * c;
  return (
    <div className='slpim__ring-card'>
      <div className='slpim__ring-wrap'>
        <svg width='52' height='52' viewBox='0 0 52 52'>
          <circle cx='26' cy='26' r='20' fill='none' stroke={track} strokeWidth='6' />
          <circle
            cx='26'
            cy='26'
            r='20'
            fill='none'
            stroke={color}
            strokeWidth='6'
            strokeLinecap='round'
            strokeDasharray={c}
            strokeDashoffset={off}
            transform='rotate(-90 26 26)'
          />
        </svg>
        <div className='slpim__ring-pct'>{pct}%</div>
      </div>
      <div>
        <div className='slpim__ring-name'>{name}</div>
        <div className='slpim__ring-count'>{val} items</div>
      </div>
    </div>
  );
}
const cardV = { hidden: { opacity: 0, y: 18 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 } }) };

export default function InventoryManagement() {
  const navigate = useNavigate();
  return (
    <div className='slpsh__page slpim__page'>
      <nav className='slpsh__nav'>
        <div className='slpsh__nav-inner'>
          <Link style={{ color: "white" }} to='/' className='slpsh__nav-back'>
            <ArrowLeft size={18} />
            <span>Home</span>
          </Link>
          {/*  <img
            src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png'
            alt='StoreLense'
            className='slpsh__nav-logo'
          /> */}
          <header>
            <div style={styles.portalLogoSection}>
              {/*  <div style={styles.portalLogoCircle}>
            <div style={styles.portalLogoInner}></div>
          </div> */}
              <img
                style={styles.portalLogoCircle}
                src='https://res.cloudinary.com/ebuka1122/image/upload/v1752244790/StorelenseLogos/StorelenseLogo_tqya01.webp'
              />
              <span onClick={() => navigate("/")} style={styles.portalLogoText}>
                Store<span style={styles.portalLogoAccent}>Lense</span>
              </span>
            </div>
          </header>
        </div>
      </nav>

      <section className='slpsh__hero'>
        <WorldGlobe />
        <div className='slpsh__wrap slpsh__hero-grid'>
          <motion.div className='slpsh__hero-text' initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className='slpsh__eyebrow'>
              <span className='slpsh__eyebrow-dot' />
              Inventory Management
            </div>
            <h1 className='slpsh__h1'>
              Never sell what <em>you don't have</em>
            </h1>
            <p className='slpsh__hero-sub'>
              Real-time stock counts that update with every sale, transfer and delivery. Know exactly what's on your shelf — before your customer asks.
            </p>
            <div className='slpsh__actions'>
              <Link to='/sign-up' className='slpsh__btn slpsh__btn--primary'>
                <Package size={16} />
                Get started
              </Link>
              <Link to='/contact' className='slpsh__btn slpsh__btn--ghost'>
                Learn more
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='slpsh__hero-visual'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
              <div className='slpim__ring-grid'>
                {RINGS.map((r) => (
                  <RingCard key={r.name} {...r} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className='slpim__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head slpsh__section-head--center'>
            <div className='slpsh__section-label'>Live stock view</div>
            <h2 className='slpsh__section-title'>
              Your shelf, <em>in real time</em>
            </h2>
            <p className='slpsh__section-sub'>Every row updates the moment a sale is made. Colour indicators flag what needs attention.</p>
          </div>
          <div className='slpim__table-wrap'>
            <table className='slpim__table'>
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
                    <td className='slpim__td-name'>{name}</td>
                    <td>
                      <span className='slpim__sku'>{sku}</span>
                    </td>
                    <td>
                      <div className='slpim__qty-cell'>
                        <span style={{ fontFamily: "DM Mono,monospace", fontWeight: 500, color: low ? "#EF4444" : "#F0F4FF" }}>{qty}</span>
                        <div className='slpim__qty-bar'>
                          <div className='slpim__qty-fill' style={{ width: `${pct}%`, background: low ? "#EF4444" : pct > 70 ? "#16A34A" : "#F5A623" }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='slpim__sku'>{min}</span>
                    </td>
                    <td>
                      {low ? (
                        <span className='slpim__status slpim__status--low'>⚠ Low</span>
                      ) : (
                        <span className='slpim__status slpim__status--ok'>✓ In stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className='slpim__section'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head'>
            <div className='slpsh__section-label'>Features</div>
            <h2 className='slpsh__section-title'>
              Everything that keeps your <em>stock honest</em>
            </h2>
          </div>
          <div className='slpsh__feat-grid'>
            {FEATS.map(({ icon: Icon, color, bg, title, desc }, i) => (
              <motion.div
                key={title}
                className='slpsh__feat-card'
                custom={i}
                variants={cardV}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
              >
                <div className='slpsh__feat-ic' style={{ background: bg }}>
                  <Icon size={20} color={color} strokeWidth={2} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ background: "transparent" }} className='slpsh__cta-band'>
          <div className='slpsh__wrap'>
            <h2>Stop counting stock by hand.</h2>
            <p>Let StoreLense do it automatically, with every sale.</p>
            <div className='slpsh__cta-actions'>
              <Link to='/sign-up' className='slpsh__btn slpsh__btn--primary'>
                Start managing smarter
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const styles = {
  portalHeader: {
    padding: "1.5rem 2rem",
    background: "rgba(26, 31, 46, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  portalLogoSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    maxWidth: "1400px",
    margin: "0 auto",
    cursor: "pointer",
  },
  portalLogoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    /* background: "linear-gradient(135deg,rgba(59, 155, 174, 0.14) 0%,rgba(45, 123, 140, 0.12) 100%)", */
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(59, 155, 174, 0.01)",
  },
  portalLogoInner: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2.5px solid white",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: "rotate(-45deg)",
  },
  portalLogoText: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#e8eef5",
  },
  portalLogoAccent: {
    color: "#3b9aae",
  },
};
