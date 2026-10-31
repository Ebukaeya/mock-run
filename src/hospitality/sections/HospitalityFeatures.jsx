import { useEffect, useRef, useState } from "react";
import { Armchair, ChefHat, Globe, LayoutGrid, ShoppingBag, Warehouse } from "lucide-react";
import { Laptop, Phone, Tablet } from "../devices/DeviceFrames";
import "./HospitalityFeatures.css";

const FEATURES = [
  {
    id: "sales",
    icon: ShoppingBag,
    title: "Sales Point",
    text: "Takeaway and delivery in a few taps. Hold a sale, split the payment, leave part on credit and print or WhatsApp the receipt.",
    points: ["Barcode and QR scanning", "Cash, transfer, POS, split", "Held sales and reprints"],
    device: "laptop",
    screen: "salesPoint",
  },
  {
    id: "tables",
    icon: Armchair,
    title: "Table service",
    text: "A floor plan that updates itself. Seat guests, follow each table's order and print the bill when they ask.",
    points: ["Zones: hall, terrace, VIP", "Wait timers per table", "Running bill per table"],
    device: "tablet",
    screen: "tables",
  },
  {
    id: "kitchen",
    icon: ChefHat,
    title: "Kitchen display",
    text: "Tickets land on the screen as soon as they're ordered, sorted by age, with late orders in red.",
    points: ["One ticket per station", "Notes and modifiers highlighted", "Ready alerts to waiters"],
    device: "laptop",
    screen: "kitchen",
  },
  {
    id: "menu",
    icon: LayoutGrid,
    title: "Menu management",
    text: "Change a price once and it changes on every till, phone and online menu. Switch an item off when it sells out.",
    points: ["Categories and prices", "Kitchen routing per item", "Available / sold out"],
    device: "laptop",
    screen: "menu",
  },
  {
    id: "storage",
    icon: Warehouse,
    title: "Storage & stock",
    text: "Store rooms for drinks and ingredients. Move stock to a venue or kitchen and see the value of what you hold.",
    points: ["Menu stock and ingredients", "Moves with full history", "Low-stock warnings"],
    device: "laptop",
    screen: "storage",
  },
  {
    id: "online",
    icon: Globe,
    title: "Online orders",
    text: "Orders from your venue's link arrive with a sound, go to the kitchen in one tap and are tracked until delivered.",
    points: ["A live link per venue", "Paid before it reaches you", "Pending to delivered"],
    device: "phone",
    screen: "onlineOrdersMobile",
  },
];

const DURATION = 7000;

function Device({ f }) {
  if (f.device === "phone") return <Phone screen={f.screen} />;
  if (f.device === "tablet") return <Tablet screen={f.screen} />;
  return <Laptop screen={f.screen} />;
}

/* 5. Features showcase: interactive screenshot explorer */
export default function HospitalityFeatures() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    timer.current = setTimeout(() => setActive((a) => (a + 1) % FEATURES.length), DURATION);
    return () => clearTimeout(timer.current);
  }, [active, paused]);

  const f = FEATURES[active];

  return (
    <section className='slh-feat' id='slh-features'>
      <div className='slh-wrap'>
        <div className='slh-feat__head'>
          <span className='slh-eyebrow'>Features</span>
          <h2 className='slh-h2'>Look around the app.</h2>
        </div>

        <div className='slh-feat__body' onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className='slh-feat__tabs' role='tablist'>
            {FEATURES.map((item, i) => {
              const Icon = item.icon;
              const on = i === active;
              return (
                <button
                  type='button'
                  role='tab'
                  aria-selected={on}
                  key={item.id}
                  className={`slh-feat__tab ${on ? "is-on" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className='slh-feat__tabTop'>
                    <span className='slh-feat__tabIc'>
                      <Icon size={18} />
                    </span>
                    <b>{item.title}</b>
                    <span className='slh-feat__num'>0{i + 1}</span>
                  </span>
                  <span className='slh-feat__tabBody'>
                    <span>{item.text}</span>
                  </span>
                  <span className='slh-feat__progress'>
                    <i
                      key={`${active}-${paused}`}
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className='slh-feat__stage'>
            <div className={`slh-feat__device slh-feat__device--${f.device}`} key={f.id}>
              <Device f={f} />
            </div>
            <ul className='slh-feat__points' key={`p-${f.id}`}>
              {f.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
