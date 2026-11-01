// Analytics.jsx — Solutions: Analytics (route: /solutions/analytics)
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CalendarRange, Check, Clock, Download, PlayCircle, Star, TrendingUp, Users, Wallet } from "lucide-react";
import Navbar from "../component/Narbar.jsx";
import Footer from "../component/Footer.jsx";
import { Browser, Phone } from "../home/HomeDevices";
import { screens } from "../home/homeConfig";
import { contact } from "../site/siteConfig";
import "../home/HomePage.css";
import "./Analytics.css";

const FEATS = [
  {
    icon: TrendingUp,
    title: "Sales trends",
    desc: "Daily, weekly and monthly revenue charted automatically. Spot your best periods at a glance.",
  },
  {
    icon: Wallet,
    title: "Profit vs expense",
    desc: "Track your gross margin in real time and see how much you keep after the cost of goods.",
  },
  {
    icon: Clock,
    title: "Peak hours",
    desc: "See your busiest hours and days, so you know when to roster more staff.",
  },
  {
    icon: Star,
    title: "Top products",
    desc: "Ranked by revenue and units sold. Spend your restock budget on what actually moves.",
  },
  {
    icon: Users,
    title: "Staff performance",
    desc: "Transactions per cashier, average sale value and shift summaries. Reward your best.",
  },
  {
    icon: CalendarRange,
    title: "Any date range",
    desc: "Compare any two periods: last week against this week, or one quarter against the next.",
  },
];

/* Example top products, shown as an illustration */
const TOP = [
  { name: "Indomie Chicken 70g", rev: "₦84,200", units: "1,203", pct: 95 },
  { name: "Ariel Detergent 1kg", rev: "₦61,800", units: "687", pct: 74 },
  { name: "Peak Milk 400g", rev: "₦48,400", units: "302", pct: 58 },
  { name: "Sunlight Soap 200g", rev: "₦34,100", units: "512", pct: 41 },
];

export default function Analytics() {
  useEffect(() => {
    document.title = "Analytics – StoreLense";
  }, []);

  return (
    <div className='slw-page'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='slw-ana-hero'>
          <div className='slw-wrap slw-ana-hero__grid'>
            <div>
              <span className='slw-eyebrow'>Analytics</span>
              <h1 className='slw-ana-hero__title'>
                Every number, <em>at a glance.</em>
              </h1>
              <p className='slw-lead'>Sales trends, profit margins, peak hours and top products. Every sale you ring up becomes an insight you can act on.</p>
              <div className='slw-ana-hero__ctas'>
                <Link className='slw-btn slw-btn--blue' to='/sign-up'>
                  <BarChart3 size={17} /> Start free
                </Link>
                <Link className='slw-btn slw-btn--line' to='/demo'>
                  <PlayCircle size={17} /> See a demo
                </Link>
              </div>
            </div>
            <div className='slw-ana-hero__visual'>
              <Browser src={screens.analytics} alt='StoreLense Analytics & Reports screen' url='app.storelense.com/analytics' />
              <div className='slw-ana-hero__phone'>
                <Phone src={screens.mInsights} alt='Sales insights in the StoreLense mobile app' />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section className='slw-ana-split'>
          <div className='slw-wrap slw-ana-split__grid'>
            <div className='slw-ana-split__shot'>
              <Browser src={screens.dashboard} alt='StoreLense dashboard' url='app.storelense.com/dashboard' />
            </div>
            <div>
              <span className='slw-eyebrow'>Dashboard</span>
              <h2 className='slw-h2'>Today, at a glance.</h2>
              <p className='slw-lead'>Sales, profit, stock value, orders and returns across all your stores, with profit against expenses through the day.</p>
              <ul className='slw-ana-list'>
                <li>
                  <Check size={16} strokeWidth={3} /> Paid and on-credit sales, side by side
                </li>
                <li>
                  <Check size={16} strokeWidth={3} /> In-store and online sales together
                </li>
                <li>
                  <Check size={16} strokeWidth={3} /> Switch store or date in one tap
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className='slw-ana-feat'>
          <div className='slw-wrap'>
            <div className='slw-ana-head'>
              <span className='slw-eyebrow'>Reporting tools</span>
              <h2 className='slw-h2'>Built for owners who want real answers.</h2>
            </div>
            <div className='slw-ana-feat__grid'>
              {FEATS.map(({ icon: Icon, title, desc }) => (
                <article key={title} className='slw-ana-feat__card'>
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

        {/* Reports + top products */}
        <section className='slw-ana-split slw-ana-split--alt'>
          <div className='slw-wrap slw-ana-split__grid slw-ana-split__grid--rev'>
            <div>
              <span className='slw-eyebrow'>Reports</span>
              <h2 className='slw-h2'>Know what actually made money.</h2>
              <p className='slw-lead'>Revenue, gross and net profit, trends and how you were paid, then download a report for your accountant.</p>
              <ul className='slw-ana-list'>
                <li>
                  <Check size={16} strokeWidth={3} /> Executive, operational and financial views
                </li>
                <li>
                  <Check size={16} strokeWidth={3} /> Cash, card, transfer and credit split
                </li>
                <li>
                  <Download size={16} strokeWidth={2.6} /> Download reports as PDF
                </li>
              </ul>
            </div>
            <div className='slw-ana-top'>
              <div className='slw-ana-top__head'>
                <b>Top products</b>
                <small>Example · this month</small>
              </div>
              <ol>
                {TOP.map((p, i) => (
                  <li key={p.name}>
                    <span className='slw-ana-top__n'>{i + 1}</span>
                    <span className='slw-ana-top__body'>
                      <b>{p.name}</b>
                      <i>
                        <em style={{ width: `${p.pct}%` }} />
                      </i>
                    </span>
                    <span className='slw-ana-top__val'>
                      <b>{p.rev}</b>
                      <small>{p.units} units</small>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='slw-ana-cta'>
          <div className='slw-wrap'>
            <div className='slw-ana-cta__panel'>
              <div>
                <h2>Your numbers are waiting.</h2>
                <p>Start free and make decisions on numbers, not guesses.</p>
              </div>
              <div className='slw-ana-cta__btns'>
                <Link className='slw-btn slw-btn--white' to='/sign-up'>
                  Start free <ArrowRight size={17} />
                </Link>
                <a className='slw-btn slw-btn--ghost' href={contact.whatsappDemo} target='_blank' rel='noopener noreferrer'>
                  Book a free demo
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
