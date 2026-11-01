import { useState } from "react";
import { Check, CreditCard, Monitor, Printer, Smartphone } from "lucide-react";
import { Laptop, Phone, PosMini, PosTerminal } from "../devices/DeviceFrames";
import { images } from "../hospitalityConfig";
import "./HospitalityDevices.css";

const DEVICES = [
  {
    id: "pos",
    icon: Printer,
    name: "StoreLense POS",
    sub: "Touchscreen till with a built-in receipt printer",
    points: [
      "Arrives set up with your venue, menu and staff",
      "Prints receipts and kitchen tickets on its own printer",
      "Barcode and QR scanning with the camera",
      "Keeps selling when the internet drops",
    ],
  },
  {
    id: "mini",
    icon: CreditCard,
    name: "StoreLense Mini",
    sub: "Handheld terminal with tap-to-pay",
    points: [
      "Take card payments at the table with tap-to-pay",
      "Print the receipt on the spot",
      "Small enough to carry around the floor",
      "Every payment matched to its sale",
    ],
  },
  {
    id: "windows",
    icon: Monitor,
    name: "Windows app",
    sub: "For counter tills and the back office",
    points: [
      "Receipts and kitchen tickets print instantly",
      "Opens the cash drawer for cash sales",
      "Full-screen till mode, starts with Windows",
      "Updates itself in the background",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "Mobile app",
    sub: "Android and iPhone",
    points: ["Waiters take orders at the table", "Owners check sales from anywhere", "Online orders arrive with a sound", "Works through short network drops"],
  },
];

/* 7. Devices: floating mockups of every device, plus our own hardware */
export default function HospitalityDevices() {
  const [active, setActive] = useState("pos");

  return (
    <section className='slh-devs' id='slh-devices'>
      <div className='slh-wrap'>
        <div className='slh-devs__head'>
          <span className='slh-eyebrow'>Devices & hardware</span>
          <h2 className='slh-h2'>Runs on our hardware, and yours.</h2>
          <p className='slh-lead'>One account on every device. A sale rung up on a StoreLense POS shows on the owner's phone a second later.</p>
        </div>

        <div className={`slh-devs__stage is-${active}`}>
          <span className='slh-devs__floor' aria-hidden='true' />
          <button type='button' className='slh-devs__dev slh-devs__dev--windows' onClick={() => setActive("windows")} aria-label='Windows app'>
            <Laptop screen='dashboard' />
          </button>
          <button type='button' className='slh-devs__dev slh-devs__dev--pos' onClick={() => setActive("pos")} aria-label='StoreLense POS'>
            <PosTerminal screen='salesPoint' printing={active === "pos"} />
          </button>
          <button type='button' className='slh-devs__dev slh-devs__dev--mini' onClick={() => setActive("mini")} aria-label='StoreLense Mini'>
            <PosMini printing={active === "mini"} />
          </button>
          <button type='button' className='slh-devs__dev slh-devs__dev--mobile' onClick={() => setActive("mobile")} aria-label='Mobile app'>
            <Phone screen='onlineOrdersMobile' />
          </button>
        </div>

        <div className='slh-devs__panel'>
          <div className='slh-devs__tabs' role='tablist'>
            {DEVICES.map((x) => {
              const Icon = x.icon;
              return (
                <button
                  type='button'
                  role='tab'
                  key={x.id}
                  aria-selected={x.id === active}
                  className={x.id === active ? "is-on" : ""}
                  onClick={() => setActive(x.id)}
                >
                  <Icon size={18} />
                  {x.name}
                </button>
              );
            })}
          </div>
          {/* Every detail is rendered in the same spot, so the panel is always as tall as the longest one */}
          <div className='slh-devs__details'>
            {DEVICES.map((x) => (
              <div key={x.id} className={`slh-devs__detail ${x.id === active ? "is-on" : ""}`} aria-hidden={x.id !== active}>
                <div>
                  <b>{x.name}</b>
                  <span>{x.sub}</span>
                </div>
                <ul>
                  {x.points.map((p) => (
                    <li key={p}>
                      <Check size={16} strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='slh-devs__photos'>
          <figure>
            <img src={images.posHeld} alt='A StoreLense team member holding a StoreLense POS' loading='lazy' />
            <figcaption>StoreLense POS, delivered ready to sell</figcaption>
          </figure>
          <figure>
            <img src={images.devices} alt='Three StoreLense POS devices and a StoreLense Mini on a table' loading='lazy' />
            <figcaption>StoreLense POS and StoreLense Mini</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
