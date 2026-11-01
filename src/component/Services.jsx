import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Camera, Check, Crown, GraduationCap, Headphones, MessageCircle, Phone, Settings, Shield, Target } from "lucide-react";
import Navbar from "./Narbar.jsx";
import Footer from "./Footer.jsx";
import { contact, wa } from "../site/siteConfig";
import "../home/HomePage.css";
import "../styles/Service.css";

const SERVICES = [
  {
    name: "Free POS installation & setup",
    icon: Settings,
    description: "We install and configure your POS system at no cost, so your business is ready to sell.",
    features: ["Professional installation", "System configuration", "Hardware setup", "First-sale testing"],
  },
  {
    name: "Free staff training",
    icon: GraduationCap,
    description: "Hands-on training for your team on how to get the best out of StoreLense.",
    features: ["Hands-on sessions", "User manual provided", "Best-practice guidance", "Ongoing support"],
  },
  {
    name: "Product listing service",
    icon: Camera,
    description: "We photograph your products and set them up in your POS, ready to sell.",
    features: ["Product photography", "Product descriptions", "Price setup", "Inventory setup"],
    hasPrice: true,
  },
  {
    name: "Customer support",
    icon: Headphones,
    description: "Dedicated customer service and technical support for all your POS needs.",
    features: ["Technical troubleshooting", "Software updates", "User assistance", "Remote support"],
  },
  {
    name: "End-of-year performance analysis",
    icon: BarChart3,
    description: "A yearly report on how your business performed, with clear insights.",
    features: ["Sales performance review", "Trend analysis", "Custom reports", "Business insights"],
  },
];

const DISCOUNTS = [
  { name: "Basic User", discount: "2%", icon: Shield, text: "off any service you choose." },
  { name: "Super User", discount: "10%", icon: Target, text: "off any service you choose.", popular: true },
  { name: "Premium", discount: "30%", icon: Crown, text: "off any service you choose." },
];

const STATS = [
  { number: "Free", label: "Setup", icon: Settings },
  { number: "24/7", label: "Support", icon: Headphones },
  { number: "Free", label: "Training", icon: GraduationCap },
  { number: "Yearly", label: "Reports", icon: BarChart3 },
];

/* Services (route: /services) */
const Services = () => {
  useEffect(() => {
    document.title = "Services – StoreLense";
  }, []);

  return (
    <div className='slw-page'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='slw-svc-hero'>
          <div className='slw-wrap'>
            <div className='slw-svc-hero__inner'>
              <span className='slw-eyebrow'>Services</span>
              <h1 className='slw-svc-hero__title'>
                Everything around your POS, <em>taken care of.</em>
              </h1>
              <p className='slw-lead'>
                From free installation to training and support, we give you everything you need to run your business smoothly with StoreLense.
              </p>
              <div className='slw-svc-hero__ctas'>
                <a className='slw-btn slw-btn--wa' href={contact.whatsappSales} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Talk to us today
                </a>
                <a className='slw-btn slw-btn--line' href={contact.phoneHref}>
                  <Phone size={17} /> {contact.phoneDisplay}
                </a>
              </div>
            </div>
            <div className='slw-svc-stats'>
              {STATS.map(({ number, label, icon: Icon }) => (
                <div key={label}>
                  <span>
                    <Icon size={20} />
                  </span>
                  <b>{number}</b>
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className='slw-svc-list'>
          <div className='slw-wrap'>
            <div className='slw-svc-head'>
              <span className='slw-eyebrow'>What we do</span>
              <h2 className='slw-h2'>Our full service list.</h2>
              <p className='slw-lead'>Everything you need to get your POS up and running, plus ongoing support to help your business grow.</p>
            </div>
            <div className='slw-svc-grid'>
              {SERVICES.map(({ name, icon: Icon, description, features, hasPrice }) => (
                <article key={name} className='slw-svc-card'>
                  <span className='slw-svc-card__ic'>
                    <Icon size={24} />
                  </span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <ul>
                    {features.map((f) => (
                      <li key={f}>
                        <Check size={15} strokeWidth={3} /> {f}
                      </li>
                    ))}
                  </ul>
                  {hasPrice && (
                    <a
                      className='slw-svc-card__price'
                      href={wa(`Hi StoreLense, please send me the price list for the ${name.toLowerCase()}.`)}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Get the price list <ArrowRight size={16} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Discounts */}
        <section className='slw-svc-disc'>
          <div className='slw-wrap'>
            <div className='slw-svc-head slw-svc-head--center'>
              <span className='slw-eyebrow'>Discounts</span>
              <h2 className='slw-h2'>Pay less on a bigger plan.</h2>
              <p className='slw-lead'>Depending on your plan, you get a discount on every service you choose.</p>
            </div>
            <div className='slw-svc-disc__grid'>
              {DISCOUNTS.map(({ name, discount, icon: Icon, text, popular }) => (
                <article key={name} className={`slw-svc-disc__card ${popular ? "is-popular" : ""}`}>
                  {popular && <span className='slw-svc-disc__badge'>Most popular</span>}
                  <span className='slw-svc-disc__ic'>
                    <Icon size={24} />
                  </span>
                  <h3>{name}</h3>
                  <p className='slw-svc-disc__num'>
                    <b>{discount}</b>
                    <span>discount</span>
                  </p>
                  <p className='slw-svc-disc__text'>
                    {name} customers get {discount} {text}
                  </p>
                </article>
              ))}
            </div>
            <Link className='slw-svc-disc__all' to='/#pricing'>
              Compare plans and prices <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className='slw-svc-cta'>
          <div className='slw-wrap'>
            <div className='slw-svc-cta__panel'>
              <div>
                <h2>Ready to get started?</h2>
                <p>Talk to us today about your free POS installation and setup.</p>
              </div>
              <div className='slw-svc-cta__btns'>
                <a className='slw-btn slw-btn--white' href={contact.whatsappSales} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Chat on WhatsApp
                </a>
                <a className='slw-btn slw-btn--ghost' href={contact.phoneHref}>
                  <Phone size={17} /> {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
