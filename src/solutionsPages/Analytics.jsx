// Analytics.jsx — light theme
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, TrendingUp, Clock, Star, DollarSign, Users } from "lucide-react";
import WorldGlobe from "./WorldGlobe";
import "./solutions.css";
import "./Analytics.css";
import Footer from "../component/Footer";

const FEATS = [
  {
    icon: TrendingUp,
    color: "#2563EB",
    bg: "#2563EB18",
    title: "Sales trends",
    desc: "Daily, weekly and monthly revenue charted automatically. Spot your best periods at a glance.",
  },
  {
    icon: DollarSign,
    color: "#16A34A",
    bg: "#16A34A18",
    title: "Profit vs expense",
    desc: "Track your gross margin in real time. See exactly how much you keep after cost of goods.",
  },
  {
    icon: Clock,
    color: "#F5A623",
    bg: "#F5A62318",
    title: "Peak hour analysis",
    desc: "Heatmap of your busiest hours and days. Know exactly when to roster more staff.",
  },
  {
    icon: Star,
    color: "#37B4C5",
    bg: "#37B4C518",
    title: "Top products",
    desc: "Ranked by revenue and units sold. Focus your restock budget on what actually moves.",
  },
  {
    icon: Users,
    color: "#2563EB",
    bg: "#2563EB18",
    title: "Staff performance",
    desc: "Transactions per cashier, average sale value, shift summaries. Reward your best.",
  },
  {
    icon: BarChart3,
    color: "#37B4C5",
    bg: "#37B4C518",
    title: "Custom date ranges",
    desc: "Compare any two periods; last week vs this week, Q1 vs Q2. Full flexibility.",
  },
];
const PRODUCTS = [
  { name: "Indomie Chicken 70g", rev: "₦84,200", units: "1,203", pct: 95 },
  { name: "Ariel Detergent 1kg", rev: "₦61,800", units: "687", pct: 74 },
  { name: "Peak Milk 400g", rev: "₦48,400", units: "302", pct: 58 },
  { name: "Sunlight Soap 200g", rev: "₦34,100", units: "512", pct: 41 },
];
const BARS = [32, 48, 41, 67, 58, 82, 74, 55, 79, 91, 68, 85];
const cardV = { hidden: { opacity: 0, y: 18 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 } }) };

export default function Analytics() {
  return (
    <div className='slpsh__page slpan__page'>
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
        <div className='slpan__hero-blob' />
        <div className='slpsh__wrap slpsh__hero-grid'>
          <motion.div className='slpsh__hero-text' initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className='slpsh__eyebrow'>
              <span className='slpsh__eyebrow-dot' />
              Analytics
            </div>
            <h1 style={{ color: "rgb(41, 39, 39)" }} className='slpsh__h1'>
              Every number, <em>at a glance</em>
            </h1>
            <p
              style={{
                color: "rgb(74, 73, 73)",
              }}
              className='slpsh__hero-sub'
            >
              Sales trends, profit margins, peak hours, top products — every transaction becomes a dashboard insight you can act on.
            </p>
            <div className='slpsh__actions'>
              <Link to='/sign-up/' className='slpsh__btn slpsh__btn--primary'>
                <BarChart3 size={16} />
                Unlock your data
              </Link>
              <Link to='/demo' className='slpsh__btn slpsh__btn--ghost'>
                See a demo
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='slpsh__hero-visual'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div style={{ width: "100%", maxWidth: 400 }}>
              <div className='slpan__chart-card'>
                <div className='slpan__chart-hdr'>
                  <div>
                    <div className='slpan__chart-ttl'>Revenue — This Month</div>
                    <div className='slpan__chart-val'>₦2,840,500</div>
                  </div>
                  <span className='slpan__chart-delta'>↑ 23%</span>
                </div>
                <div className='slpan__area'>
                  <svg viewBox='0 0 300 90' preserveAspectRatio='none'>
                    <defs>
                      <linearGradient id='slpanGrad' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='#2563EB' stopOpacity='0.18' />
                        <stop offset='100%' stopColor='#2563EB' stopOpacity='0' />
                      </linearGradient>
                    </defs>
                    <path
                      d='M0,72 C20,60 30,40 50,42 C70,44 80,20 100,18 C120,16 130,35 150,28 C170,21 180,8 200,10 C220,12 230,25 250,18 C270,11 280,5 300,2 L300,90 L0,90 Z'
                      fill='url(#slpanGrad)'
                    />
                    <path
                      d='M0,72 C20,60 30,40 50,42 C70,44 80,20 100,18 C120,16 130,35 150,28 C170,21 180,8 200,10 C220,12 230,25 250,18 C270,11 280,5 300,2'
                      fill='none'
                      stroke='#2563EB'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
                <div className='slpan__legend'>
                  <span className='slpan__legend-item'>
                    <span className='slpan__legend-dot' style={{ background: "#2563EB" }} />
                    Revenue
                  </span>
                  <span className='slpan__legend-item'>
                    <span className='slpan__legend-dot' style={{ background: "#37B4C5" }} />
                    Profit
                  </span>
                </div>
              </div>
              <div className='slpan__insights'>
                {[
                  ["Peak hour", "2 PM–4 PM"],
                  ["Best day", "Saturday"],
                  ["Avg basket", "₦2,840"],
                  ["Return rate", "3.2%"],
                ].map(([l, v]) => (
                  <div key={l} className='slpan__insight-card'>
                    <div className='slpan__insight-lbl'>{l}</div>
                    <div className='slpan__insight-val'>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='slpan__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__stats-grid'>
            {[
              ["Real-time", "Dashboard refresh"],
              ["30+", "Report types"],
              ["90 days", "Historical data"],
              ["1-tap", "Export to CSV"],
            ].map(([v, l]) => (
              <div className='slpsh__stat' key={l}>
                <div className='slpsh__stat-val' style={{ fontSize: "clamp(17px,2.8vw,28px)" }}>
                  {v}
                </div>
                <div className='slpsh__stat-label'>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='slpan__section'>
        <div className='slpsh__wrap'>
          <div className='slpsh__split'>
            <div>
              <div className='slpsh__section-head'>
                <div className='slpsh__section-label'>Top products</div>
                <h2 className='slpsh__section-title'>
                  Know your <em>best sellers</em>
                </h2>
                <p className='slpsh__section-sub'>Ranked by revenue. Filter by day, week or month.</p>
              </div>
              <div className='slpan__rank-list'>
                {PRODUCTS.map(({ name, rev, units, pct }, i) => (
                  <div key={name} className='slpan__rank-item'>
                    <div className='slpan__rank-n'>#{i + 1}</div>
                    <div className='slpan__rank-body'>
                      <div className='slpan__rank-name'>{name}</div>
                      <div className='slpan__rank-bar'>
                        <div className='slpan__rank-fill' style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className='slpan__rank-right'>
                      <div className='slpan__rank-rev'>{rev}</div>
                      <div className='slpan__rank-units'>{units} units</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className='slpsh__section-head'>
                <div className='slpsh__section-label'>Monthly trend</div>
                <h2 className='slpsh__section-title'>
                  See your <em>revenue rhythm</em>
                </h2>
              </div>
              <div className='slpan__chart-card'>
                <div className='slpan__chart-hdr'>
                  <div>
                    <div className='slpan__chart-ttl'>Monthly revenue (₦M)</div>
                  </div>
                  <span className='slpan__chart-delta'>↑ 31% YoY</span>
                </div>
                <div className='slpan__month-bars'>
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      className='slpan__month-bar'
                      style={{ height: `${h}%`, background: i === 11 ? "linear-gradient(180deg,#37B4C5,#2D94A1)" : "linear-gradient(180deg,#7AA9F2,#2563EB)" }}
                    />
                  ))}
                </div>
                <div className='slpan__month-lbls'>
                  {"JFMAMJJASOND".split("").map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='slpan__section-alt'>
        <div className='slpsh__wrap'>
          <div className='slpsh__section-head slpsh__section-head--center'>
            <div className='slpsh__section-label'>All reporting tools</div>
            <h2 className='slpsh__section-title'>
              Built for owners who want <em>real answers</em>
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

      {/*  <div className='slpsh__cta-band'>
        <div className='slpsh__wrap'>
          <h2>Your data is waiting.</h2>
          <p>Start making decisions based on numbers, not guesses.</p>
          <div className='slpsh__cta-actions'>
            <Link to='/contact?subject=Analytics' className='slpsh__btn slpsh__btn--primary'>
              Get access to analytics
            </Link>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
