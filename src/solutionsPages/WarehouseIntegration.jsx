// WarehouseIntegration.jsx — light theme
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Warehouse, RefreshCw, MapPin, Package, ArrowRightLeft, Bell, CheckCircle } from "lucide-react";
import WorldGlobe from "./WorldGlobe";
import "./solutions.css";
import "./WarehouseIntegration.css";
import Footer from "../component/Footer";

const FEATS = [
  {
    icon: RefreshCw,
    color: "#2563EB",
    bg: "#2563EB18",
    title: "Real-time sync",
    desc: "Every sale at any till instantly deducts from your warehouse count. No manual updates.",
  },
  {
    icon: ArrowRightLeft,
    color: "#37B4C5",
    bg: "#37B4C518",
    title: "Stock transfers",
    desc: "Move inventory between locations in the app. Track quantity, who moved it and when.",
  },
  { icon: MapPin, color: "#16A34A", bg: "#16A34A18", title: "Multi-location", desc: "Lagos, Abuja, Enugu — manage every branch from one dashboard." },
  { icon: Bell, color: "#F5A623", bg: "#F5A62318", title: "Restock alerts", desc: "Get notified when a warehouse SKU drops below your threshold." },
  { icon: Package, color: "#2563EB", bg: "#2563EB18", title: "Batch tracking", desc: "Receive goods in batches with dates and supplier info." },
  {
    icon: Warehouse,
    color: "#37B4C5",
    bg: "#37B4C518",
    title: "Warehouse dashboard",
    desc: "Dedicated view — inbound, outbound and current on-hand, all in one screen.",
  },
];
const LOCS = [
  { name: "Lagos Hub", type: "Warehouse", qty: 1284, pct: 82, color: "#2563EB", bg: "#EAF1FF" },
  { name: "Abuja Store", type: "Retail branch", qty: 342, pct: 55, color: "#37B4C5", bg: "#EAFBFD" },
  { name: "Enugu Store", type: "Retail branch", qty: 198, pct: 40, color: "#16A34A", bg: "#E7F8EE" },
];
const STEPS = [
  {
    n: "01",
    icon: MapPin,
    col: "#2563EB",
    title: "Create a warehouse location",
    body: "Add your warehouse as a named location in your dashboard.",
    badge: "✓ Done in 30 seconds",
    btype: "done",
  },
  { n: "02", icon: Package, col: "#37B4C5", title: "Link your products", body: "Assign products to each location. Quantities are tracked independently." },
  {
    n: "03",
    icon: RefreshCw,
    col: "#16A34A",
    title: "Receive stock inbound",
    body: "Log deliveries — counts update the moment you confirm receipt.",
    badge: "Auto-calculates totals",
  },
  {
    n: "04",
    icon: ArrowRightLeft,
    col: "#2563EB",
    title: "Transfer between locations",
    body: "Deducts from the source, adds to the destination — automatically.",
  },
  {
    n: "05",
    icon: CheckCircle,
    col: "#37B4C5",
    title: "Everything syncs live",
    body: "Sales at any branch update the warehouse. One source of truth, always.",
    badge: "✓ Live everywhere",
    btype: "done",
  },
];
const cardV = { hidden: { opacity: 0, y: 18 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 } }) };

function LocCard({ name, type, qty, pct, color, bg, small }) {
  return (
    <div className='slpwi__loc-card'>
      <div className='slpwi__loc-hdr'>
        <div className='slpwi__loc-ic' style={{ background: bg }}>
          <MapPin size={small ? 14 : 15} color={color} />
        </div>
        <div>
          <div className='slpwi__loc-name'>{name}</div>
          <div className='slpwi__loc-type'>{type}</div>
        </div>
      </div>
      <div className='slpwi__loc-row'>
        <span>Items on hand</span>
        <b>{qty.toLocaleString()}</b>
      </div>
      <div className='slpwi__loc-bar'>
        <div className='slpwi__loc-fill' style={{ width: `${pct}%`, background: `linear-gradient(90deg,${bg},${color})` }} />
      </div>
      <div className='slpwi__sync'>
        <span className='slpwi__sync-dot' />
        Synced just now
      </div>
    </div>
  );
}

export default function WarehouseIntegration() {
  return (
    <div className='slpsh__page slpwi__page'>
      <nav className='slpsh__nav'>
        <div className='slpsh__nav-inner'>
          <Link to='/' className='slpsh__nav-back'>
            <ArrowLeft size={18} />
            <span>Home</span>
          </Link>
          <img
            src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png'
            alt='StoreLense'
            className='slpsh__nav-logo'
          />
        </div>
      </nav>

      <section className='slpsh__hero'>
        <WorldGlobe light />
        <div className='slpwi__hero-blob' />
        <div className='slpsh__wrap slpsh__hero-grid'>
          <motion.div className='slpsh__hero-text' initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className='slpsh__eyebrow'>
              <span className='slpsh__eyebrow-dot' />
              Warehouse Integration
            </div>
            <h1 style={{ color: "rgb(0,0,0)" }} className='slpsh__h1'>
              One stock pool, <em>every location</em>
            </h1>
            <p
              style={{
                color: "rgb(74, 74, 74)",
              }}
              className='slpsh__hero-sub'
            >
              Connect your warehouse to every store branch. When stock moves — sale, transfer or delivery — every location knows instantly.
            </p>
            <div className='slpsh__actions'>
              <Link to='/sign-up' className='slpsh__btn slpsh__btn--primary'>
                <Warehouse size={16} />
                Set up warehouse
              </Link>
              <Link to='/contact?subject=Warehouse' className='slpsh__btn slpsh__btn--ghost'>
                Ask a question
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='slpsh__hero-visual'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 12 }}>
              {LOCS.map((l) => (
                <LocCard key={l.name} {...l} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className='slpwi__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__stats-grid'>
            {[
              ["∞", "Locations supported"],
              ["<1s", "Sync latency"],
              ["100%", "Audit trail"],
              ["0", "Manual reconciliation"],
            ].map(([v, l]) => (
              <div className='slpsh__stat' key={l}>
                <div className='slpsh__stat-val'>{v}</div>
                <div className='slpsh__stat-label'>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='slpwi__section'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head'>
            <div className='slpsh__section-label'>Capabilities</div>
            <h2 className='slpsh__section-title'>
              Built for businesses that sell <em>across locations</em>
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
      </section>

      <section className='slpwi__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__split slpsh__split--reverse'>
            <div className='slpsh__split-visual'>
              <div className='slpwi__loc-grid'>
                {LOCS.map((l) => (
                  <LocCard key={l.name} {...l} small />
                ))}
              </div>
            </div>
            <div>
              <div className='slpsh__section-head'>
                <div className='slpsh__section-label'>How it works</div>
                <h2 className='slpsh__section-title'>
                  Connect in <em>minutes</em>
                </h2>
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
          </div>
        </div>
        <div
          style={{
            background: "inherit",
          }}
          className='slpsh__cta-band'
        >
          <div className='slpsh__wrap'>
            <h2
              style={{
                color: "rgb(44, 44, 44)",
              }}
            >
              Ready to connect your warehouse?
            </h2>
            <p>Our team walks you through setup on a free onboarding call.</p>
            <div className='slpsh__cta-actions'>
              <Link to='/contact?subject=Warehouse' className='slpsh__btn slpsh__btn--primary'>
                Book a free setup call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
