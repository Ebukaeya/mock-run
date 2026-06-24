// RetailStores.jsx — dark theme
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Zap, CreditCard, Printer, Wifi, Users, Shield, CheckCircle } from "lucide-react";
import WorldGlobe from "./WorldGlobe";
import "./solutions.css";
import "./RetailStores.css";
import Footer from "../component/Footer";

const FEATS = [
  {
    icon: Zap,
    color: "#37B4C5",
    bg: "rgba(55,180,197,.18)",
    title: "Instant checkout",
    desc: "Ring up sales in seconds. Product search, quantity, payment, done. No training manual needed.",
  },
  {
    icon: CreditCard,
    color: "#2563EB",
    bg: "rgba(37,99,235,.18)",
    title: "All payment types",
    desc: "Cards, transfers, cash and mobile pay. Every channel supported out of the box.",
  },
  {
    icon: Printer,
    color: "#F5A623",
    bg: "rgba(245,166,35,.18)",
    title: "80mm receipts",
    desc: "Branded receipts print the moment a sale confirms — no app, no QR, no confusion.",
  },
  {
    icon: Wifi,
    color: "#16A34A",
    bg: "rgba(22,163,74,.18)",
    title: "Works offline",
    desc: "Power outage? StoreLense keeps selling and syncs automatically when you're back online.",
  },
  {
    icon: Users,
    color: "#37B4C5",
    bg: "rgba(55,180,197,.18)",
    title: "Multi-staff support",
    desc: "Each cashier has their own PIN. Shift reports show exactly who sold what and when.",
  },
  {
    icon: Shield,
    color: "#2563EB",
    bg: "rgba(37,99,235,.18)",
    title: "Fraud protection",
    desc: "Every action is logged. Override attempts and voids flag instantly to the owner.",
  },
];
const STEPS = [
  {
    n: "01",
    icon: Zap,
    col: "#37B4C5",
    title: "Plug in and power on",
    body: "Arrives pre-configured. Connect to power — ready in 60 seconds.",
    badge: "✓ No IT required",
    btype: "done",
  },
  {
    n: "02",
    icon: ShoppingBag,
    col: "#2563EB",
    title: "Add your products",
    body: "Import from a spreadsheet or add items one by one. Barcode scanning supported.",
    badge: "CSV import available",
  },
  { n: "03", icon: Users, col: "#37B4C5", title: "Assign your staff", body: "Create cashier profiles in seconds. Each gets their own PIN and access level." },
  {
    n: "04",
    icon: CheckCircle,
    col: "#16A34A",
    title: "Start selling",
    body: "Tap a product, choose quantity, accept payment — first sale ready to print.",
    badge: "✓ You're live",
    btype: "done",
  },
];
const BARS = [38, 52, 44, 78, 65, 58, 72, 55, 85, 90, 68, 80];
const cardV = { hidden: { opacity: 0, y: 18 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 } }) };

export default function RetailStores() {
  const navigate = useNavigate();
  return (
    <div className='slpsh__page slprs__page'>
      <nav className='slpsh__nav'>
        <div className='slpsh__nav-inner'>
          <Link style={{ color: "white" }} to='/' className='slpsh__nav-back'>
            <ArrowLeft size={18} />
            <span>Home</span>
          </Link>
          {/*    <img
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
          <motion.div
            className='slpsh__hero-text'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className='slpsh__eyebrow'>
              <span className='slpsh__eyebrow-dot' />
              Retail Stores
            </div>
            <h1 className='slpsh__h1'>
              The POS your shop has been <em>waiting for</em>
            </h1>
            <p className='slpsh__hero-sub'>
              From a boutique in Lekki to a supermarket in Enugu — StoreLense runs your checkout, tracks your stock and protects your cash, all from one
              terminal.
            </p>
            <div className='slpsh__actions'>
              <Link to='/contact?subject=Retail%20Store%20Setup' className='slpsh__btn slpsh__btn--primary'>
                <ShoppingBag size={16} />
                Get your terminal
              </Link>
              <Link to='/contact' className='slpsh__btn slpsh__btn--ghost'>
                Talk to us
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='slpsh__hero-visual'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div style={{ width: "100%", maxWidth: 400 }}>
              <div className='slpsh__vis-card'>
                <div className='slpsh__vis-row'>
                  <span className='slpsh__vis-label'>TODAY'S REVENUE</span>
                  <span className='slpsh__vis-badge slpsh__vis-badge--up'>↑ 18%</span>
                </div>
                <div className='slpsh__vis-val'>₦284,500</div>
                <div className='slpsh__bars'>
                  {BARS.map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%`, background: i === 9 ? "linear-gradient(180deg,#37B4C5,#2D94A1)" : "linear-gradient(180deg,#7AA9F2,#2563EB)" }}
                    />
                  ))}
                </div>
                <div className='slpsh__pills'>
                  <span className='slpsh__pill slpsh__pill--blue'>47 transactions</span>
                  <span className='slpsh__pill slpsh__pill--green'>● Shift open</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className='slprs__stats-band'>
        <div className='slpsh__wrap'>
          <div className='slprs__stats'>
            {[
              ["3.2s", "Avg checkout time"],
              ["99.9%", "Uptime guarantee"],
              ["₦0", "Setup fee"],
              ["24/7", "Technical support"],
            ].map(([v, l]) => (
              <div className='slprs__stat' key={l}>
                <div className='slprs__stat-val'>{v}</div>
                <div className='slprs__stat-label'>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className='slprs__section'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head'>
            <div className='slpsh__section-label'>What's included</div>
            <h2 className='slpsh__section-title'>
              Everything a retail store <em>actually needs</em>
            </h2>
            <p className='slpsh__section-sub'>No bloat, no enterprise tiers. Every feature included from day one.</p>
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
      </section>

      <div className='slprs__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__split'>
            <div>
              <div className='slpsh__section-head'>
                <div className='slpsh__section-label'>Setup</div>
                <h2 className='slpsh__section-title'>
                  Up and running in <em>under 10 minutes</em>
                </h2>
                <p className='slpsh__section-sub'>Our team configures everything before it ships.</p>
              </div>
              <div className='slpsh__steps'>
                {STEPS.map(({ n, icon: Icon, col, title, body, badge, btype }) => (
                  <div className='slpsh__step' key={n}>
                    <div className='slpsh__step-left'>
                      <div className='slpsh__step-num' style={{ background: col }}>
                        <Icon size={16} color='#fff' />
                      </div>
                      <div className='slpsh__step-line' />
                    </div>
                    <div className='slpsh__step-content'>
                      <h3>{title}</h3>
                      <p>{body}</p>
                      {badge && <span className={`slpsh__step-badge slpsh__step-badge--${btype || "tip"}`}>{badge}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='slpsh__split-visual'>
              <div className='slpsh__vis-card'>
                <div className='slpsh__vis-row'>
                  <span className='slpsh__vis-label'>SHIFT SUMMARY</span>
                  <span className='slpsh__vis-badge slpsh__vis-badge--up'>Closed</span>
                </div>
                <div className='slpsh__vis-val'>₦412,800</div>
                <div className='slprs__shift-rows'>
                  {[
                    ["Transactions", "84"],
                    ["Cash collected", "₦182,400"],
                    ["Card payments", "₦230,400"],
                    ["Voids", "2"],
                  ].map(([l, v]) => (
                    <div className='slprs__shift-row' key={l}>
                      <span>{l}</span>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   <div className='slpsh__cta-band'>
        <div className='slpsh__wrap'>
          <h2>Ready to upgrade your checkout?</h2>
          <p>Join hundreds of Nigerian retailers already using StoreLense.</p>
          <div className='slpsh__cta-actions'>
            <Link to='/contact?subject=Retail%20Store%20Setup' className='slpsh__btn slpsh__btn--primary'>
              Get your terminal today
            </Link>
          </div>
        </div>
      </div> */}
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
