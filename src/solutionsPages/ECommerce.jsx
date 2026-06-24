/* // ECommerce.jsx — dark theme
// Corrected Shurplug flow: auto-synced → delivery fee+time → Sell Online → Store Profile → Publish Online
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe, Package, Truck, ToggleRight, Store, ShoppingCart, Zap, Share2, CheckCircle, Tag } from "lucide-react";
import WorldGlobe from "./WorldGlobe";
import "./solutions.css";
import "./ECommerce.css";
import Footer from "../component/Footer";

const STEPS = [
  {
    n: "01",
    icon: Package,
    col: "#37B4C5",
    title: "Your catalogue is already synced",
    body: "StoreLense is automatically connected to Shurplug. Your entire product catalogue — names, prices, photos and stock levels — is pre-loaded in Shurplug the moment you sign up. No import. No configuration.",
    badge: "✓ Zero setup required",
    btype: "done",
    tip: "Check your Shurplug dashboard any time to see your products already listed there.",
  },
  {
    n: "02",
    icon: Truck,
    col: "#2563EB",
    title: "Set a delivery fee and delivery time",
    body: "On each product you want to sell online, enter two things: your delivery fee (e.g. ₦500) and your estimated delivery time (e.g. 1–2 days). You can set different fees for heavy or fragile items.",
    badge: null,
    tip: "You can bulk-set delivery details across multiple products at once from the catalogue view.",
  },
  {
    n: "03",
    icon: ToggleRight,
    col: "#16A34A",
    title: "Hit 'Sell Online' on the product",
    body: "Toggle 'Sell Online' on the product card. The product goes live on your Shurplug storefront immediately — customers can see it, add it to their cart and checkout right away.",
    badge: "✓ Goes live instantly",
    btype: "done",
    tip: "You can toggle products on and off any time. Out-of-stock items auto-hide so customers never see what's unavailable.",
  },
  {
    n: "04",
    icon: Store,
    col: "#F5A623",
    title: "Go to your Store Profile",
    body: "Navigate to Store Profile in your StoreLense dashboard. Add your business name, logo, banner and contact info. Your published products are already waiting there.",
    badge: null,
    tip: "A complete store profile with logo and banner converts 3× better than a blank one.",
  },
  {
    n: "05",
    icon: Globe,
    col: "#37B4C5",
    title: "Hit 'Publish Online' — you're live",
    body: "One tap and your Shurplug store goes public. Share your store link on WhatsApp, Instagram and with your regulars. Every order automatically deducts stock exactly like an in-store sale.",
    badge: "✓ You're live",
    btype: "done",
    tip: "Send your link to your top 10 customers first. Real orders in the first hour help Shurplug's algorithm promote your store.",
  },
];
const BENEFITS = [
  { icon: Globe, color: "#37B4C5", bg: "rgba(55,180,197,.18)", title: "Sell 24/7", desc: "Your online store takes orders while you sleep. No cashier needed." },
  {
    icon: Package,
    color: "#16A34A",
    bg: "rgba(22,163,74,.18)",
    title: "Stock always in sync",
    desc: "An online order deducts from the same pool as an in-store sale. Never oversell.",
  },
  {
    icon: Tag,
    color: "#F5A623",
    bg: "rgba(245,166,35,.18)",
    title: "Independent pricing",
    desc: "Online price is separate from your POS price. Cover delivery costs freely.",
  },
  {
    icon: Zap,
    color: "#2563EB",
    bg: "rgba(37,99,235,.18)",
    title: "Instant order alerts",
    desc: "Get a notification the moment an order comes in. Fulfil fast, keep your rating high.",
  },
  {
    icon: Share2,
    color: "#37B4C5",
    bg: "rgba(55,180,197,.18)",
    title: "Shareable store link",
    desc: "One link for WhatsApp, Instagram stories and Google Business.",
  },
  {
    icon: CheckCircle,
    color: "#16A34A",
    bg: "rgba(22,163,74,.18)",
    title: "Already connected",
    desc: "No extra setup from StoreLense to go live. Shurplug sync is built in.",
  },
];
const STORE_PRODS = [
  { name: "Ariel 1kg", price: "₦1,200", bg: "rgba(37,99,235,.2)", c: "#7AA9F2" },
  { name: "Indomie", price: "₦150", bg: "rgba(22,163,74,.2)", c: "#3DDC84" },
  { name: "Peak Milk", price: "₦1,800", bg: "rgba(245,166,35,.2)", c: "#F6B23A" },
];
const cardV = { hidden: { opacity: 0, y: 18 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 } }) };

export default function ECommerce() {
  return (
    <div className='slpsh__page slpec__page'>
      <nav className='slpsh__nav'>
        <div className='slpsh__nav-inner'>
          <Link style={{ color: "white" }} to='/' className='slpsh__nav-back'>
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
        <WorldGlobe />
        <div className='slpsh__wrap slpsh__hero-grid'>
          <motion.div className='slpsh__hero-text' initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className='slpsh__eyebrow'>
              <span className='slpsh__eyebrow-dot' />
              E-Commerce · Powered by Shurplug
            </div>
            <h1 className='slpsh__h1'>
              Your store, <em>live online</em> in minutes
            </h1>
            <p className='slpsh__hero-sub'>
              StoreLense automatically syncs your catalogue with Shurplug. Set a delivery fee, hit Sell Online, then publish your store — no developer, no
              import, no new account.
            </p>
            <div className='slpsh__actions'>
              <Link to='/sign-up' className='slpsh__btn slpsh__btn--primary'>
                <Globe size={16} />
                Go live now
              </Link>
              <Link to='/contact?subject=Shurplug' className='slpsh__btn slpsh__btn--ghost'>
                Talk to us first
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
            
              <div className='slpec__prod-card'>
                <div className='slpec__prod-hdr'>
                  <div>
                    <div className='slpec__prod-name'>Ariel Detergent 1kg</div>
                    <div className='slpec__prod-sku'>SKU: ARD-1KG · 84 in stock</div>
                  </div>
                  <span className='slpec__live-badge'>● LIVE</span>
                </div>
                <div className='slpec__prod-body'>
                  <div className='slpec__dlv-grid'>
                    <div>
                      <div className='slpec__dlv-lbl'>Delivery fee</div>
                      <div className='slpec__dlv-val'>₦500</div>
                    </div>
                    <div>
                      <div className='slpec__dlv-lbl'>Delivery time</div>
                      <div className='slpec__dlv-val'>1–2 days</div>
                    </div>
                  </div>
                  <div className='slpec__sell-btn'>
                    <ToggleRight size={18} color='#fff' />
                    <span>Sell Online</span>
                  </div>
                </div>
              </div>
             
              <div className='slpec__prof-card'>
                <div className='slpec__prof-left'>
                  <div className='slpec__prof-ic'>
                    <Store size={18} color='#2563EB' />
                  </div>
                  <div>
                    <div className='slpec__prof-name'>Store Profile</div>
                    <div className='slpec__prof-url'>My Business · Shurplug</div>
                  </div>
                </div>
               
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    
      <div className='slpec__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head slpsh__section-head--center'>
            <div className='slpsh__section-label'>The full flow</div>
            <h2 className='slpsh__section-title'>
              From your shelf to the internet <em>in 5 steps</em>
            </h2>
            <p className='slpsh__section-sub'>No developer. No Shurplug account creation. Your StoreLense is already connected.</p>
          </div>
          <div className='slpec__overview'>
            {STEPS.map(({ n, icon: Icon, col, title }) => (
              <div key={n} className='slpec__overview-card'>
                <div className='slpec__overview-ic'>
                  <Icon size={22} color={col} strokeWidth={2} />
                </div>
                <div className='slpec__overview-n'>{n}</div>
                <div className='slpec__overview-ttl'>{title.slice(0, 26)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

   
      <section className='slpec__section'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head'>
            <div className='slpsh__section-label'>Step by step</div>
            <h2 className='slpsh__section-title'>
              Exactly what to <em>do and when</em>
            </h2>
          </div>
          <div className='slpsh__split'>
            <div className='slpsh__steps'>
              {STEPS.map(({ n, icon: Icon, col, title, body, badge, btype, tip }) => (
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
                    {tip && (
                      <div className='slpec__tip'>
                        <span className='slpec__tip-lbl'>TIP </span>
                        {tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
           
            <div className='slpec__aside'>
              <div className='slpec__mockup'>
                <div className='slpec__mockup-hdr'>
                  <div className='slpec__mockup-hdr-ic'>
                    <Store size={16} color='#fff' />
                  </div>
                  <div>
                    <div className='slpec__mockup-ttl'>My Store · Shurplug</div>
                    <div className='slpec__mockup-url'>shurplug.com/mystore</div>
                  </div>
                  <span className='slpec__mockup-live'>LIVE</span>
                </div>
                <div className='slpec__mockup-prods'>
                  {STORE_PRODS.map(({ name, price, bg, c }) => (
                    <div key={name} className='slpec__mockup-prod'>
                      <div className='slpec__mockup-prod-img' style={{ background: bg }}>
                        <Package size={16} color={c} />
                      </div>
                      <div className='slpec__mockup-prod-name'>{name}</div>
                      <div className='slpec__mockup-prod-price'>{price}</div>
                    </div>
                  ))}
                </div>
                <div className='slpec__mockup-order'>
                  <div className='slpec__mockup-order-l'>
                    <ShoppingCart size={14} color='#37B4C5' />
                    New order received!
                  </div>
                  <span className='slpec__mockup-order-r'>+₦4,650</span>
                </div>
              </div>
              <div className='slpec__aside-stats'>
                {[
                  ["Products live", "24"],
                  ["Orders today", "8"],
                  ["Revenue online", "₦38,400"],
                  ["Stock syncs", "Auto"],
                ].map(([l, v]) => (
                  <div key={l} className='slpec__aside-stat'>
                    <div className='slpec__aside-stat-lbl'>{l}</div>
                    <div className='slpec__aside-stat-val'>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <div className='slpec__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head slpsh__section-head--center'>
            <div className='slpsh__section-label'>Why sell online</div>
            <h2 className='slpsh__section-title'>
              Sell more without <em>working harder</em>
            </h2>
          </div>
          <div className='slpsh__feat-grid'>
            {BENEFITS.map(({ icon: Icon, color, bg, title, desc }, i) => (
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
      </div>

      <Footer />
    </div>
  );
}
 */

// ECommerce.jsx — dark theme
// Corrected Shurplug flow: auto-synced → delivery fee+time → Sell Online → Store Profile → Publish Online
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Package, Truck, ToggleRight, Store, ShoppingCart, Zap, Share2, CheckCircle, Tag } from "lucide-react";
import WorldGlobe from "./WorldGlobe";
import womanImg from "../assessStatic/pictures/storelense_woman_nobg.png";
import "./solutions.css";
import "./ECommerce.css";
import Footer from "../component/Footer";

const STEPS = [
  {
    n: "01",
    icon: Package,
    col: "#37B4C5",
    title: "Your catalogue is already synced",
    body: "StoreLense is automatically connected to Shurplug. Your entire product catalogue; names, prices, photos and stock levels;  is pre-loaded in Shurplug the moment you sign up. No import. No configuration.",
    badge: "✓ Zero setup required",
    btype: "done",
    tip: "Check your Shurplug dashboard any time to see your products already listed there.",
  },
  {
    n: "02",
    icon: Truck,
    col: "#2563EB",
    title: "Set a delivery fee and delivery time",
    body: "On each product you want to sell online, enter two things: your delivery fee (e.g. ₦500) and your estimated delivery time (e.g. 1–2 days). You can set different fees for heavy or fragile items.",
    badge: null,
    tip: "You can bulk-set delivery details across multiple products at once from the catalogue view.",
  },
  {
    n: "03",
    icon: ToggleRight,
    col: "#16A34A",
    title: "Hit 'Sell Online' on the product",
    body: "Toggle 'Sell Online' on the product card. The product goes live on your Shurplug storefront immediately; customers can see it, add it to their cart and checkout right away.",
    badge: "✓ Goes live instantly",
    btype: "done",
    tip: "You can toggle products on and off any time. Out-of-stock items auto-hide so customers never see what's unavailable.",
  },
  {
    n: "04",
    icon: Store,
    col: "#F5A623",
    title: "Go to your Store Profile",
    body: "Navigate to Store Profile in your StoreLense dashboard. Add your business name, logo, banner and contact info. Your published products are already waiting there.",
    badge: null,
    tip: "A complete store profile with logo and banner converts 3× better than a blank one.",
  },
  {
    n: "05",
    icon: Globe,
    col: "#37B4C5",
    title: "Hit 'Publish Online'; you're live",
    body: "One tap and your Shurplug store goes public. Share your store link on WhatsApp, Instagram and with your regulars. Every order automatically deducts stock exactly like an in-store sale.",
    badge: "✓ You're live",
    btype: "done",
    tip: "Send your link to your top 10 customers first. Real orders in the first hour help Shurplug's algorithm promote your store.",
  },
];

const BENEFITS = [
  { icon: Globe, color: "#37B4C5", bg: "rgba(55,180,197,.18)", title: "Sell 24/7", desc: "Your online store takes orders while you sleep. No cashier needed." },
  {
    icon: Package,
    color: "#16A34A",
    bg: "rgba(22,163,74,.18)",
    title: "Stock always in sync",
    desc: "An online order deducts from the same pool as an in-store sale. Never oversell.",
  },
  {
    icon: Tag,
    color: "#F5A623",
    bg: "rgba(245,166,35,.18)",
    title: "Independent pricing",
    desc: "Online price is separate from your POS price. Cover delivery costs freely.",
  },
  {
    icon: Zap,
    color: "#2563EB",
    bg: "rgba(37,99,235,.18)",
    title: "Instant order alerts",
    desc: "Get a notification the moment an order comes in. Fulfil fast, keep your rating high.",
  },
  {
    icon: Share2,
    color: "#37B4C5",
    bg: "rgba(55,180,197,.18)",
    title: "Shareable store link",
    desc: "One link for WhatsApp, Instagram stories and Google Business.",
  },
  {
    icon: CheckCircle,
    color: "#16A34A",
    bg: "rgba(22,163,74,.18)",
    title: "Already connected",
    desc: "No extra setup from StoreLense to go live. Shurplug sync is built in.",
  },
];

const STORE_PRODS = [
  { name: "Ariel 1kg", price: "₦1,200", bg: "rgba(37,99,235,.2)", c: "#7AA9F2" },
  { name: "Indomie", price: "₦150", bg: "rgba(22,163,74,.2)", c: "#3DDC84" },
  { name: "Peak Milk", price: "₦1,800", bg: "rgba(245,166,35,.2)", c: "#F6B23A" },
];

const cardV = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 } }),
};

export default function ECommerce() {
  const navigate = useNavigate();
  return (
    <div className='slpsh__page slpec__page'>
      {/* ── Nav ──────────────────────────────────────────── */}
      <nav style={{ background: "rgba(26, 31, 46, 0.8)" }} className='slpsh__nav'>
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

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className='slpsh__hero'>
        <WorldGlobe />
        <div className='slpsh__wrap slpsh__hero-grid psnalSl74'>
          {/* Text */}
          <motion.div
            className='slpsh__hero-text '
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className='slpsh__eyebrow'>
              <span className='slpsh__eyebrow-dot' />
              E-Commerce · Powered by Shurplug
            </div>
            <h1 className='slpsh__h1'>
              Your store, <em>live online</em> in minutes
            </h1>
            <p className='slpsh__hero-sub'>
              StoreLense automatically syncs your catalogue with Shurplug. Set a delivery fee, hit Sell Online, then publish your store; no developer, no
              import, no new account.
            </p>
            <div className='slpsh__actions'>
              <Link to='/sign-up' className='slpsh__btn slpsh__btn--primary'>
                <Globe size={16} />
                Go live now
              </Link>
              <Link to='/contact?subject=Shurplug%20E-Commerce' className='slpsh__btn slpsh__btn--ghost'>
                Talk to us first
              </Link>
            </div>
          </motion.div>

          {/* Hero visual — woman illustration + floating chips */}
          <motion.div
            className='slpsh__hero-visual slpec__hero-visual'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
          >
            {/* Woman illustration — background already removed */}
            <img src={womanImg} alt='StoreLense — manage your store inventory in real time' className='slpec__hero-img' />

            {/* Sell Online chip — top left */}
            {/*  <motion.div
              className='slpec__chip slpec__chip--sell'
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <span className='slpec__chip-ic slpec__chip-ic--green'>
                <ToggleRight size={14} color='#16A34A' />
              </span>
              <div>
                <div className='slpec__chip-t1'>Sell Online toggled</div>
                <div className='slpec__chip-t2'>Ariel 1kg · Live ✓</div>
              </div>
            </motion.div> */}

            {/* New order chip — bottom right */}
            {/*  <motion.div
              className='slpec__chip slpec__chip--order'
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <span className='slpec__chip-ic slpec__chip-ic--teal'>
                <ShoppingCart size={14} color='#37B4C5' />
              </span>
              <div>
                <div className='slpec__chip-t1'>New order received</div>
                <div className='slpec__chip-t2'>+₦4,650</div>
              </div>
            </motion.div> */}

            {/* Product card mini — bottom left */}
            {/*   <motion.div className='slpec__mini-card' animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}>
              <div className='slpec__mini-hdr'>
                <div>
                  <div className='slpec__mini-name'>Ariel Detergent 1kg</div>
                  <div className='slpec__mini-sku'>SKU: ARD-1KG · 84 in stock</div>
                </div>
                <span className='slpec__mini-live'>● LIVE</span>
              </div>
              <div className='slpec__mini-fields'>
                <div>
                  <div className='slpec__mini-lbl'>Delivery fee</div>
                  <div className='slpec__mini-val'>₦500</div>
                </div>
                <div>
                  <div className='slpec__mini-lbl'>Delivery time</div>
                  <div className='slpec__mini-val'>1–2 days</div>
                </div>
              </div>
              <div className='slpec__mini-sell-btn'>
                <ToggleRight size={14} color='#fff' />
                <span>Sell Online</span>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* ── Step overview ─────────────────────────────────── */}
      <div className='slpec__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head slpsh__section-head--center'>
            <div className='slpsh__section-label'>The full flow</div>
            <h2 className='slpsh__section-title'>
              From your shelf to the internet <em>in 5 steps</em>
            </h2>
            <p className='slpsh__section-sub'>No developer. No Shurplug account creation. Your StoreLense is already connected.</p>
          </div>
          <div className='slpec__overview'>
            {STEPS.map(({ n, icon: Icon, col, title }) => (
              <div key={n} className='slpec__overview-card'>
                <div className='slpec__overview-ic'>
                  <Icon size={22} color={col} strokeWidth={2} />
                </div>
                <div className='slpec__overview-n'>{n}</div>
                <div className='slpec__overview-ttl'>{title.slice(0, 26)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Detailed steps + sticky mockup ───────────────── */}
      <section className='slpec__section'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head'>
            <div className='slpsh__section-label'>Step by step</div>
            <h2 className='slpsh__section-title'>
              Exactly what to <em>do and when</em>
            </h2>
          </div>
          <div className='slpsh__split'>
            <div className='slpsh__steps'>
              {STEPS.map(({ n, icon: Icon, col, title, body, badge, btype, tip }) => (
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
                    {tip && (
                      <div className='slpec__tip'>
                        <span className='slpec__tip-lbl'>TIP </span>
                        {tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky live store mockup */}
            <div className='slpec__aside'>
              <div className='slpec__mockup'>
                <div className='slpec__mockup-hdr'>
                  <div className='slpec__mockup-hdr-ic'>
                    <Store size={16} color='#fff' />
                  </div>
                  <div>
                    <div className='slpec__mockup-ttl'>My Store · Shurplug</div>
                    <div className='slpec__mockup-url'>shurplug.com/mystore</div>
                  </div>
                  <span className='slpec__mockup-live'>LIVE</span>
                </div>
                <div className='slpec__mockup-prods'>
                  {STORE_PRODS.map(({ name, price, bg, c }) => (
                    <div key={name} className='slpec__mockup-prod'>
                      <div className='slpec__mockup-prod-img' style={{ background: bg }}>
                        <Package size={16} color={c} />
                      </div>
                      <div className='slpec__mockup-prod-name'>{name}</div>
                      <div className='slpec__mockup-prod-price'>{price}</div>
                    </div>
                  ))}
                </div>
                <div className='slpec__mockup-order'>
                  <div className='slpec__mockup-order-l'>
                    <ShoppingCart size={14} color='#37B4C5' />
                    New order received!
                  </div>
                  <span className='slpec__mockup-order-r'>+₦4,650</span>
                </div>
              </div>
              <div className='slpec__aside-stats'>
                {[
                  ["Products live", "24"],
                  ["Orders today", "8"],
                  ["Revenue online", "₦38,400"],
                  ["Stock syncs", "Auto"],
                ].map(([l, v]) => (
                  <div key={l} className='slpec__aside-stat'>
                    <div className='slpec__aside-stat-lbl'>{l}</div>
                    <div className='slpec__aside-stat-val'>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────── */}
      <div className='slpec__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head slpsh__section-head--center'>
            <div className='slpsh__section-label'>Why sell online</div>
            <h2 className='slpsh__section-title'>
              Sell more without <em>working harder</em>
            </h2>
          </div>
          <div className='slpsh__feat-grid'>
            {BENEFITS.map(({ icon: Icon, color, bg, title, desc }, i) => (
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
      </div>
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
