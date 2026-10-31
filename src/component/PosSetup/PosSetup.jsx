import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, Check, ChevronDown, GraduationCap, Headphones, MessageCircle, Phone, Truck } from "lucide-react";
import Navbar from "../Narbar.jsx";
import Footer from "../Footer.jsx";
import { hardware } from "../../home/homeConfig";
import { contact, wa } from "../../site/siteConfig";
import PosSetupArt, { LabelPrinter, PaperRolls, ReceiptPrinter, Scanner, TabletStand } from "./PosSetupArt.jsx";
import "../../home/HomePage.css";
import "./PosSetup.css";

/*
 * The setups for sale. The checkout page (/check-out) reads title, price, image,
 * images, features and specifications, so keep those fields when you edit.
 * art: which illustration to show on this page (see PosSetupArt.jsx).
 */
const posSetups = [
  {
    id: "storelense-pos",
    art: "slpos",
    title: "Storelense POS",
    price: "₦390,000",
    originalPrice: "₦450,000",
    badge: "All in one",
    description: "Portable Android POS with a built-in printer and scanner, a SIM slot and 4G.",
    features: ["Android POS Tablet", "SIM card compatibility", "4G Network", "In-built printer", "Advanced Barcode Scanner", "24/7 Support"],
    image: "https://res.cloudinary.com/ebuka1122/image/upload/v1767477218/StorelenseLogos/storelenseImage_l4hyjj.jpg",
    rating: 4.6,
    specifications: {
      Display: '10.1" HD Touchscreen',
      Processor: "Quad-core 2.0GHz",
      RAM: "4GB",
      Storage: "64GB (expandable)",
      Connectivity: "4G, WiFi, Bluetooth",
      Printer: "In-built Thermal 80mm",
      Battery: "5000mAh",
      OS: "Android 12",
      SIM: "Yes",
      Scanner: "In-built 2D Scanner",
    },
    images: [
      {
        id: 1,
        type: "front",
        src: "https://res.cloudinary.com/ebuka1122/image/upload/v1767477218/StorelenseLogos/storelImage2_mrovbg.jpg",
        label: "Front View",
      },
      {
        id: 2,
        type: "side",
        src: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333564/Ihub/Z-100_lteagi.webp",
        label: "Side View",
      },
      {
        id: 3,
        type: "back",
        src: "https://res.cloudinary.com/ebuka1122/image/upload/v1767477218/StorelenseLogos/storelensePos_ccdxb1.jpg",
        label: "Back View",
      },
      {
        id: 4,
        type: "display",
        src: "https://res.cloudinary.com/ebuka1122/image/upload/v1767477218/StorelenseLogos/storelenseImage_l4hyjj.jpg",
        label: "Display",
      },
    ],
  },
  {
    id: "laptop-pro",
    art: "laptop",
    title: "Laptop Combo Station",
    price: "₦750,000",
    originalPrice: "₦805,000",
    badge: "Most popular",
    description: "A performance laptop with the StoreLense POS, printer and scanner, set up and ready to sell.",
    features: ["Any User Laptop", "80mm Thermal Printer", "2D Barcode Scanner", "Professional Setup & Training", "Label Printer", "24/7 Support"],
    image: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333563/Ihub/LaptopSetup_gvcalp.webp",
    rating: 4.9,
    specifications: {
      Display: '10.1" HD Touchscreen',
      Processor: "Quad-core 2.0GHz",
      RAM: "4GB",
      Storage: "64GB (expandable)",
      Connectivity: "Ethernet, WiFi, Bluetooth",
      Printer: "Thermal 80mm external",
      Battery: "5000mAh",
      OS: "windows",
    },
    images: [
      {
        id: 1,
        type: "front",
        src: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333563/Ihub/LaptopSetup_gvcalp.webp",
        label: "Front View",
      },
      { id: 2, type: "side", label: "Side View" },
      { id: 3, type: "back", label: "Back View" },
      { id: 4, type: "display", label: "Display" },
    ],
  },
  {
    id: "android-touch",
    art: "android",
    title: "Android Touch Terminal",
    price: "₦651,000",
    originalPrice: "₦655,000",
    badge: "Best value",
    description: "A sleek Android touch terminal with a receipt printer, scanner and label printer.",
    features: ["Android POS Terminal", "80mm Receipt Printer", "Omnidirectional Scanner", "Label Printer", "24/7 Support"],
    image: "https://res.cloudinary.com/ebuka1122/image/upload/v1749334767/Ihub/AndriodPOS_mtw05f.webp",
    rating: 4.7,
    specifications: {
      Display: '10.1" HD Touchscreen',
      Processor: "Quad-core 2.0GHz",
      RAM: "4GB",
      Storage: "64GB (expandable)",
      Connectivity: "4G, WiFi, Bluetooth",
      Printer: "External Thermal 80mm",
      Battery: "N/A (Plug-in)",
      OS: "Android 12",
    },
    images: [
      {
        id: 1,
        type: "front",
        src: "https://res.cloudinary.com/ebuka1122/image/upload/v1749334767/Ihub/AndriodPOS_mtw05f.webp",
        label: "Front View",
      },
      { id: 2, type: "side", label: "Side View" },
      { id: 3, type: "back", label: "Back View" },
      { id: 4, type: "display", label: "Display" },
    ],
  },
  {
    id: "windows-powerstation",
    art: "windows",
    title: "Windows Touch Terminal",
    price: "₦450,000",
    originalPrice: "₦580,000",
    badge: "Enterprise",
    description: "A robust Windows touch system for high-volume stores.",
    features: ["Windows POS Computer", "Touch Screen", "Advanced Barcode Scanner", "High-Speed thermal Printer", "Label Printer", "24/7 Support"],
    image: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333566/Ihub/windowsSetup_ptaxnp.webp",
    rating: 4.8,
    specifications: {
      Display: '10.1" HD Touchscreen',
      Processor: "Quad-core 2.0GHz",
      RAM: "4GB",
      Storage: "604GB (expandable)",
      Connectivity: "Ethernet, WiFi, Bluetooth",
      Printer: "External Thermal 80mm",
      Battery: "N/A (Plug-in)",
      OS: "Windows",
    },
    images: [
      {
        id: 1,
        type: "front",
        src: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333566/Ihub/windowsSetup_ptaxnp.webp",
        label: "Front View",
      },
      { id: 2, type: "side", label: "Side View" },
      { id: 3, type: "back", label: "Back View" },
      { id: 4, type: "display", label: "Display" },
    ],
  },
  {
    id: "tablet-mobility",
    art: "tablet",
    title: "Mobile Tablet Station",
    price: "₦300,000",
    originalPrice: "₦320,000",
    badge: "Portable",
    description: "A flexible tablet setup on an adjustable stand.",
    features: ["Premium Tablet Device", "Adjustable Stand", "Software Integration", "24/7 Support"],
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&h=500",
    rating: 4.6,
    specifications: {
      Display: '10.1" HD Touchscreen',
      Processor: "Quad-core 2.0GHz",
      RAM: "4GB",
      Storage: "64GB (expandable)",
      Connectivity: "4G, WiFi, Bluetooth",
      Printer: "N/A",
      Battery: "5000mAh",
      OS: "Android 11",
    },
    images: [
      {
        id: 1,
        type: "front",
        src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&h=500",
        label: "Front View",
      },
      { id: 2, type: "side", label: "Side View" },
      { id: 3, type: "back", label: "Back View" },
      { id: 4, type: "display", label: "Display" },
    ],
  },
];

/* Single items. art: the drawing to show (see ACCESSORY_ART below) */
const accessories = [
  {
    name: "80mm Thermal Printer",
    price: "₦75,000",
    description: "High-speed thermal printing with an auto-cutter.",
    art: "printer",
    inStock: true,
  },
  {
    name: "2D Barcode Scanner",
    price: "₦55,000",
    description: "Omnidirectional 2D scanner with USB and Bluetooth.",
    art: "scanner",
    inStock: true,
  },
  {
    name: "Tablet Stand",
    price: "₦35,000",
    description: "Adjustable tablet stand with a secure lock.",
    art: "stand",
    inStock: true,
  },
  {
    name: "Thermal Paper Rolls",
    price: "₦10,000 per box",
    description: "Premium quality paper, 50 rolls per box.",
    art: "paper",
    inStock: true,
  },
];

const ACCESSORY_ART = {
  printer: ReceiptPrinter,
  scanner: Scanner,
  stand: TabletStand,
  paper: PaperRolls,
  label: LabelPrinter,
};

const steps = [
  { icon: BadgeCheck, title: "Pick a setup", text: "Order online, or ask us on WhatsApp which one suits your store." },
  { icon: Truck, title: "We set it up", text: "Our team installs the hardware and the StoreLense app, ready to sell." },
  {
    icon: GraduationCap,
    title: "Your team is trained",
    text: "We walk your staff through their first sales, returns and reports.",
  },
  { icon: Headphones, title: "Support any time", text: "Call or WhatsApp us whenever you need help, 24/7." },
];

function SetupCard({ setup, onOrder }) {
  const [specs, setSpecs] = useState(false);

  return (
    <article className='slw-setup__card'>
      <div className='slw-setup__art'>
        {setup.badge && <span className='slw-setup__badge'>{setup.badge}</span>}
        <PosSetupArt kind={setup.art} />
      </div>

      <div className='slw-setup__body'>
        <h3>{setup.title}</h3>
        <p className='slw-setup__price'>
          <b>{setup.price}</b>
          {setup.originalPrice && <s>{setup.originalPrice}</s>}
        </p>
        <p className='slw-setup__desc'>{setup.description}</p>

        <ul className='slw-setup__features'>
          {setup.features.map((f) => (
            <li key={f}>
              <Check size={15} strokeWidth={3} /> {f}
            </li>
          ))}
        </ul>

        <button type='button' className={`slw-setup__specsBtn ${specs ? "is-open" : ""}`} onClick={() => setSpecs(!specs)} aria-expanded={specs}>
          Specifications <ChevronDown size={17} />
        </button>
        <div className={`slw-setup__specs ${specs ? "is-open" : ""}`}>
          <dl>
            {Object.entries(setup.specifications).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='slw-setup__actions'>
          <button type='button' className='slw-btn slw-btn--blue' onClick={() => onOrder(setup)}>
            Order now <ArrowRight size={17} />
          </button>
          <a
            className='slw-setup__ask'
            href={wa(`Hi StoreLense, I'd like to ask about the ${setup.title} (${setup.price}).`)}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Ask about the ${setup.title} on WhatsApp`}
          >
            <MessageCircle size={19} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* POS hardware: the setups and single items for sale (route: /pos-setup) */
const PosSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "POS hardware – StoreLense";
  }, []);

  const order = (setup) => {
    const { art, ...device } = setup;
    navigate(`/check-out?device=${encodeURIComponent(JSON.stringify(device))}`);
  };

  return (
    <div className='slw-page'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='slw-hw-hero'>
          <div className='slw-wrap slw-hw-hero__grid'>
            <div>
              <span className='slw-eyebrow'>POS hardware</span>
              <h1 className='slw-hw-hero__title'>
                POS setups, delivered <em>ready to sell.</em>
              </h1>
              <p className='slw-lead'>
                From the all-in-one StoreLense POS to a full laptop station. Every setup comes with the StoreLense app installed, and our team sets it up and
                trains your staff.
              </p>
              <div className='slw-hw-hero__ctas'>
                <a className='slw-btn slw-btn--blue' href='#setups'>
                  See the setups <ArrowRight size={17} />
                </a>
                <a className='slw-btn slw-btn--wa' href={wa("Hi StoreLense, which POS setup is right for my store?")} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle size={17} /> Which one fits me?
                </a>
              </div>
              <ul className='slw-hw-hero__points'>
                <li>
                  <Check size={16} strokeWidth={3} /> Setup &amp; training
                </li>
                <li>
                  <Check size={16} strokeWidth={3} /> 24/7 support
                </li>
                <li>
                  <Check size={16} strokeWidth={3} /> StoreLense app installed
                </li>
              </ul>
            </div>
            <figure className='slw-hw-hero__photo'>
              <img src={hardware.photoHeld} alt='The StoreLense POS' />
              <figcaption>
                <b>StoreLense POS</b>
                <span>Printer and scanner built in</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Setups */}
        <section className='slw-setup' id='setups'>
          <div className='slw-wrap'>
            <div className='slw-hw-head'>
              <span className='slw-eyebrow'>Complete setups</span>
              <h2 className='slw-h2'>Everything you need at the counter.</h2>
              <p className='slw-lead'>Each setup includes the hardware shown, installed and connected to your StoreLense account.</p>
            </div>
            <div className='slw-setup__grid'>
              {posSetups.map((s) => (
                <SetupCard key={s.id} setup={s} onOrder={order} />
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className='slw-hw-steps'>
          <div className='slw-wrap'>
            <div className='slw-hw-head'>
              <span className='slw-eyebrow'>How it works</span>
              <h2 className='slw-h2'>From order to first sale.</h2>
            </div>
            <ol className='slw-hw-steps__list'>
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title}>
                    <span className='slw-hw-steps__ic'>
                      <Icon size={22} />
                    </span>
                    <small>Step {i + 1}</small>
                    <b>{s.title}</b>
                    <p>{s.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Single items */}
        <section className='slw-acc' id='accessories'>
          <div className='slw-wrap'>
            <div className='slw-hw-head'>
              <span className='slw-eyebrow'>Single items</span>
              <h2 className='slw-h2'>Add to your setup.</h2>
              <p className='slw-lead'>Replace or add a printer, scanner, stand or paper. Ask us on WhatsApp to order.</p>
            </div>
            <div className='slw-acc__grid'>
              {accessories.map((item) => {
                const Art = ACCESSORY_ART[item.art] || ReceiptPrinter;
                return (
                  <article key={item.name} className='slw-acc__card'>
                    <div className='slw-acc__art'>
                      <Art className='slw-acc__svg' />
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className='slw-acc__foot'>
                      <b>{item.price}</b>
                      <span className={item.inStock ? "is-in" : "is-out"}>{item.inStock ? "In stock" : "Out of stock"}</span>
                    </div>
                    <a
                      className='slw-acc__order'
                      href={wa(`Hi StoreLense, I'd like to order the ${item.name} (${item.price}).`)}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Order on WhatsApp <ArrowRight size={16} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Talk to us */}
        <section className='slw-hw-cta'>
          <div className='slw-wrap'>
            <div className='slw-hw-cta__panel'>
              <div>
                <h2>Not sure which setup to get?</h2>
                <p>Tell us about your store and we'll recommend the right hardware.</p>
              </div>
              <div className='slw-hw-cta__btns'>
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

export default PosSetup;
