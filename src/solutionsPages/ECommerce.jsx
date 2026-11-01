// ECommerce.jsx — Solutions: E-commerce with Shurplug (route: /solutions/ecommerce). Dark theme.
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Globe, Lightbulb, MessageCircle, Package, Share2, ShoppingCart, Store, Tag, ToggleRight, Truck, Zap } from "lucide-react";
import Navbar from "../component/Narbar.jsx";
import Footer from "../component/Footer.jsx";
import womanImg from "../assessStatic/pictures/storelense_woman_nobg.png";
import { wa } from "../site/siteConfig";
import "../home/HomePage.css";
import "./ECommerce.css";

const STEPS = [
  {
    icon: Package,
    title: "Your catalogue is already synced",
    body: "StoreLense is connected to Shurplug. Your product catalogue (names, prices, photos and stock levels) is in Shurplug the moment you sign up. No import, no configuration.",
    badge: "Zero setup required",
    tip: "Check your Shurplug dashboard any time to see your products already listed there.",
  },
  {
    icon: Truck,
    title: "Set a delivery fee and time",
    body: "On each product you want to sell online, enter your delivery fee (e.g. ₦500) and your delivery time (e.g. 1–2 days). Heavy or fragile items can have their own fee.",
    tip: "You can set delivery details for several products at once from the catalogue view.",
  },
  {
    icon: ToggleRight,
    title: "Turn on 'Sell Online'",
    body: "Switch on 'Sell Online' on the product card. The product goes live on your Shurplug storefront straight away, ready to add to cart and check out.",
    badge: "Goes live instantly",
    tip: "Turn products on and off any time. Out-of-stock items hide themselves, so customers never see what's unavailable.",
  },
  {
    icon: Store,
    title: "Fill in your Store Profile",
    body: "Open Store Profile in your StoreLense dashboard. Add your business name, logo, banner and contact details. Your published products are already there.",
    tip: "A complete profile with a logo and banner looks more trustworthy to new customers.",
  },
  {
    icon: Globe,
    title: "Hit 'Publish Online': you're live",
    body: "One tap and your Shurplug store is public. Share your link on WhatsApp, Instagram and with your regulars. Every online order deducts stock exactly like an in-store sale.",
    badge: "You're live",
    tip: "Send your link to your top 10 customers first to get your first orders in.",
  },
];

const BENEFITS = [
  { icon: Globe, title: "Sell 24/7", desc: "Your online store takes orders while you sleep. No cashier needed." },
  {
    icon: Package,
    title: "Stock always in sync",
    desc: "An online order deducts from the same stock as an in-store sale. Never oversell.",
  },
  {
    icon: Tag,
    title: "Separate online prices",
    desc: "Your online price is separate from your POS price, so you can cover delivery costs.",
  },
  {
    icon: Zap,
    title: "Instant order alerts",
    desc: "Get a notification the moment an order comes in. Fulfil fast and keep your rating high.",
  },
  {
    icon: Share2,
    title: "Shareable store link",
    desc: "One link for WhatsApp, Instagram stories and Google Business.",
  },
  {
    icon: CheckCircle,
    title: "Already connected",
    desc: "No extra setup to go live. The Shurplug sync is built into StoreLense.",
  },
];

/* Example storefront, shown as an illustration */
const STORE_PRODS = [
  { name: "Ariel 1kg", price: "₦1,200", tone: "blue" },
  { name: "Indomie", price: "₦150", tone: "green" },
  { name: "Peak Milk", price: "₦1,800", tone: "amber" },
];

export default function ECommerce() {
  useEffect(() => {
    document.title = "Sell online with Shurplug – StoreLense";
  }, []);

  const ask = wa("Hi StoreLense, I'd like to know more about selling online with Shurplug.");

  return (
    <div className='slw-page slw-ec'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='slw-ec-hero'>
          <div className='slw-wrap slw-ec-hero__grid'>
            <div>
              <span className='slw-ec-eyebrow'>E-commerce · Powered by Shurplug</span>
              <h1 className='slw-ec-hero__title'>
                Your store, <em>live online</em> in minutes.
              </h1>
              <p className='slw-ec-lead'>
                StoreLense syncs your catalogue with Shurplug. Set a delivery fee, turn on Sell Online, then publish your store. No developer, no import, no new
                account.
              </p>
              <div className='slw-ec-hero__ctas'>
                <Link className='slw-btn slw-btn--blue' to='/sign-up'>
                  <Globe size={17} /> Go live now
                </Link>
                <a className='slw-btn slw-btn--ghost' href={ask} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Talk to us first
                </a>
              </div>
            </div>
            <div className='slw-ec-hero__visual'>
              <span className='slw-ec-hero__glow' aria-hidden='true' />
              <img src={womanImg} alt='A store owner managing her StoreLense store' />
              <div className='slw-ec-chip slw-ec-chip--sell' aria-hidden='true'>
                <span className='slw-ec-chip__ic slw-ec-chip__ic--green'>
                  <ToggleRight size={15} />
                </span>
                <span>
                  <small>Sell Online</small>
                  <b>Ariel 1kg · Live</b>
                </span>
              </div>
              <div className='slw-ec-chip slw-ec-chip--order' aria-hidden='true'>
                <span className='slw-ec-chip__ic'>
                  <ShoppingCart size={15} />
                </span>
                <span>
                  <small>New order</small>
                  <b>+₦4,650</b>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className='slw-ec-sec slw-ec-sec--alt'>
          <div className='slw-wrap'>
            <div className='slw-ec-head slw-ec-head--center'>
              <span className='slw-ec-eyebrow'>The full flow</span>
              <h2 className='slw-ec-h2'>
                From your shelf to the internet <em>in 5 steps.</em>
              </h2>
              <p className='slw-ec-lead'>No developer, no Shurplug sign-up. Your StoreLense account is already connected.</p>
            </div>
            <ol className='slw-ec-overview'>
              {STEPS.map(({ icon: Icon, title }, i) => (
                <li key={title}>
                  <span className='slw-ec-overview__ic'>
                    <Icon size={22} />
                  </span>
                  <small>0{i + 1}</small>
                  <b>{title}</b>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Step by step + storefront */}
        <section className='slw-ec-sec'>
          <div className='slw-wrap'>
            <div className='slw-ec-head'>
              <span className='slw-ec-eyebrow'>Step by step</span>
              <h2 className='slw-ec-h2'>
                Exactly what to <em>do and when.</em>
              </h2>
            </div>
            <div className='slw-ec-steps-grid'>
              <ol className='slw-ec-steps'>
                {STEPS.map(({ icon: Icon, title, body, badge, tip }) => (
                  <li key={title}>
                    <span className='slw-ec-steps__ic'>
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                      {badge && (
                        <span className='slw-ec-steps__badge'>
                          <CheckCircle size={13} /> {badge}
                        </span>
                      )}
                      {tip && (
                        <p className='slw-ec-steps__tip'>
                          <Lightbulb size={15} />
                          <span>{tip}</span>
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <aside className='slw-ec-aside' aria-label='Example online store'>
                <div className='slw-ec-store'>
                  <div className='slw-ec-store__head'>
                    <span className='slw-ec-store__ic'>
                      <Store size={17} />
                    </span>
                    <span>
                      <b>My Store · Shurplug</b>
                      <small>shurplug.com/mystore</small>
                    </span>
                    <i>Live</i>
                  </div>
                  <div className='slw-ec-store__prods'>
                    {STORE_PRODS.map((p) => (
                      <div key={p.name} className={`slw-ec-store__prod slw-ec-store__prod--${p.tone}`}>
                        <span>
                          <Package size={18} />
                        </span>
                        <b>{p.name}</b>
                        <small>{p.price}</small>
                      </div>
                    ))}
                  </div>
                  <div className='slw-ec-store__order'>
                    <span>
                      <ShoppingCart size={15} /> New order received
                    </span>
                    <b>+₦4,650</b>
                  </div>
                </div>
                <div className='slw-ec-aside__stats'>
                  {[
                    ["Products live", "24"],
                    ["Orders today", "8"],
                    ["Revenue online", "₦38,400"],
                    ["Stock sync", "Auto"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <small>{l}</small>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
                <p className='slw-ec-aside__note'>Example store</p>
              </aside>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className='slw-ec-sec slw-ec-sec--alt'>
          <div className='slw-wrap'>
            <div className='slw-ec-head slw-ec-head--center'>
              <span className='slw-ec-eyebrow'>Why sell online</span>
              <h2 className='slw-ec-h2'>
                Sell more without <em>working harder.</em>
              </h2>
            </div>
            <div className='slw-ec-benefits'>
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
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
        <section className='slw-ec-sec'>
          <div className='slw-wrap'>
            <div className='slw-ec-cta'>
              <div>
                <h2>Ready to sell online?</h2>
                <p>Your catalogue is already on Shurplug. Publish it today.</p>
              </div>
              <div className='slw-ec-cta__btns'>
                <Link className='slw-btn slw-btn--white' to='/sign-up'>
                  Go live now <ArrowRight size={17} />
                </Link>
                <a className='slw-btn slw-btn--wa' href={ask} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Ask on WhatsApp
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
