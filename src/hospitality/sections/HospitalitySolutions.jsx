import { BedDouble, Check, Coffee, Martini, UtensilsCrossed } from "lucide-react";
import { Laptop, Phone, PosTerminal, Tablet } from "../devices/DeviceFrames";
import { photos } from "../hospitalityConfig";
import useInView from "../useInView";
import "./HospitalitySolutions.css";

const SOLUTIONS = [
  {
    id: "restaurant",
    kicker: "Restaurants",
    icon: UtensilsCrossed,
    title: "Every table, every ticket, in step.",
    text: "See the whole floor at a glance. Waiters order from their phones, the kitchen cooks from its screen, and the bill is ready when the guest asks.",
    features: [
      "Live floor plan with table status and timers",
      "Waiter ordering from Android phones",
      "Kitchen tickets split by station",
      "Split bills across cash, transfer and POS",
    ],
    devices: (
      <div className='slh-sol__devs slh-sol__devs--rest'>
        <div className='slh-sol__d1'>
          <Tablet screen='tables' />
        </div>
        <div className='slh-sol__d2'>
          <Phone screen='waiter' />
        </div>
      </div>
    ),
  },
  {
    id: "cafe",
    kicker: "Cafes",
    icon: Coffee,
    title: "Quick counter sales. Queue gone.",
    text: "Ring up a coffee in two taps on a handheld terminal that prints the receipt itself, and take pick-up orders from your online menu.",
    features: [
      "Fast Sales Point for takeaway and delivery",
      "Receipts print on the StoreLense POS built-in printer",
      "Your own ordering link for pick-up and delivery",
      "Barcode and QR scanning with the camera",
    ],
    devices: (
      <div className='slh-sol__devs slh-sol__devs--cafe'>
        <div className='slh-sol__d1'>
          <PosTerminal screen='salesPoint' printing />
        </div>
        <div className='slh-sol__d2'>
          <Phone screen='online' />
        </div>
      </div>
    ),
  },
  {
    id: "bar",
    kicker: "Bars & lounges",
    icon: Martini,
    title: "Open tabs, closed leaks.",
    text: "Keep rounds on a tab until the guest is ready to pay, and know exactly how many crates left the store room tonight.",
    features: [
      "Open tabs by name, booth or counter",
      "Add rounds from a phone at the table",
      "Stock moves from storage to the bar, recorded",
      "Low-stock alerts before the weekend rush",
    ],
    devices: (
      <div className='slh-sol__devs slh-sol__devs--bar'>
        <div className='slh-sol__d1'>
          <Laptop screen='storage' />
        </div>
        <div className='slh-sol__d2'>
          <Phone screen='barTabs' />
        </div>
      </div>
    ),
  },
  {
    id: "hotel",
    kicker: "Hotels",
    icon: BedDouble,
    title: "Rooms, restaurant and bar on one bill.",
    text: "Charge dinner and drinks to the room, and settle everything at checkout on one folio.",
    badge: "Rooms & folios are rolling out",
    features: [
      "Room board with housekeeping status",
      "Post restaurant and bar charges to a room",
      "One folio per stay, settled at checkout",
      "Separate venues, kitchens and storage per property",
    ],
    devices: (
      <div className='slh-sol__devs slh-sol__devs--hotel'>
        <div className='slh-sol__d1'>
          <Laptop screen='rooms' />
        </div>
        <div className='slh-sol__d2'>
          <Phone screen='online' />
        </div>
      </div>
    ),
  },
];

function Panel({ s, index }) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const Icon = s.icon;
  const photo = photos[s.id];
  return (
    <article
      ref={ref}
      id={`slh-sol-${s.id}`}
      className={`slh-sol__panel slh-sol__panel--${s.id} ${inView ? "is-in" : ""} ${photo ? "has-photo" : ""}`}
      style={{ top: `${72 + index * 14}px` }}
    >
      {photo && <img className='slh-sol__photo' src={photo} alt='' loading='lazy' />}
      <Icon className='slh-sol__art' strokeWidth={0.6} aria-hidden='true' />
      <div className='slh-sol__inner'>
        <div className='slh-sol__copy'>
          <span className='slh-sol__kicker'>
            <Icon size={18} /> {s.kicker}
          </span>
          <h3 className='slh-sol__title'>{s.title}</h3>
          <p className='slh-sol__text'>{s.text}</p>
          <ul className='slh-sol__list'>
            {s.features.map((f) => (
              <li key={f}>
                <Check size={16} strokeWidth={3} /> {f}
              </li>
            ))}
          </ul>
          {s.badge && <span className='slh-sol__badge'>{s.badge}</span>}
        </div>
        {s.devices}
      </div>
    </article>
  );
}

/* 3. Hospitality solutions: large stacked panels, one per business type */
export default function HospitalitySolutions() {
  return (
    <section className='slh-sol' id='slh-solutions'>
      <div className='slh-wrap slh-sol__head'>
        <div>
          <span className='slh-eyebrow'>Solutions</span>
          <h2 className='slh-h2'>Made for the way you serve.</h2>
        </div>
        <nav className='slh-sol__jump' aria-label='Business types'>
          {SOLUTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <a key={s.id} href={`#slh-sol-${s.id}`}>
                <Icon size={18} />
                {s.kicker}
              </a>
            );
          })}
        </nav>
      </div>
      <div className='slh-sol__stack'>
        {SOLUTIONS.map((s, i) => (
          <Panel key={s.id} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}
