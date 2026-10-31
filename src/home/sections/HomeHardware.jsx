import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, CreditCard, Printer, ScanLine, Wifi } from "lucide-react";
import { hardware } from "../homeConfig";
import { contact, links } from "../../site/siteConfig";
import "./HomeHardware.css";

const SPECS = [
  { icon: Printer, title: "Built-in receipt printer", text: "Prints receipts the moment a sale is paid." },
  { icon: CreditCard, title: "Card and tap-to-pay", text: "Take card payments on the same device." },
  { icon: ScanLine, title: "Barcode and QR scanning", text: "Scan products and receipts to find them fast." },
  { icon: Wifi, title: "Keeps selling offline", text: "Sales sync when the connection returns." },
];

/* Hardware: the real StoreLense POS (front, side, back) and StoreLense Mini */
export default function HomeHardware() {
  const [view, setView] = useState(hardware.views[0].id);
  const current = hardware.views.find((v) => v.id === view);

  return (
    <section className='slw-hw' id='hardware'>
      <div className='slw-wrap'>
        <div className='slw-hw__grid'>
          <div className='slw-hw__viewer'>
            <div className='slw-hw__glow' aria-hidden='true' />
            <img
              key={current.id}
              className='slw-hw__img'
              src={current.src}
              alt={`StoreLense POS, ${current.label} view`}
            />
            <div className='slw-hw__views' role='tablist' aria-label='Device view'>
              {hardware.views.map((v) => (
                <button
                  key={v.id}
                  type='button'
                  role='tab'
                  aria-selected={view === v.id}
                  className={view === v.id ? "is-on" : ""}
                  onClick={() => setView(v.id)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className='slw-hw__copy'>
            <span className='slw-eyebrow'>Hardware</span>
            <h2 className='slw-h2'>Our own POS. Delivered ready to sell.</h2>
            <p className='slw-lead'>
              StoreLense POS arrives set up with your store, products and staff. Our team installs it and trains your
              cashiers. The software also runs on your own laptop, tablet or phone.
            </p>
            <ul className='slw-hw__specs'>
              {SPECS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.title}>
                    <span>
                      <Icon size={18} />
                    </span>
                    <div>
                      <b>{s.title}</b>
                      <small>{s.text}</small>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className='slw-hw__actions'>
              <Link to={links.posSetup} className='slw-btn slw-btn--blue'>
                See POS setups <ArrowRight size={18} />
              </Link>
              <a
                className='slw-btn slw-btn--line'
                href={contact.whatsappSales}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ask about leasing
              </a>
            </div>
          </div>
        </div>

        <div className='slw-hw__photos'>
          <figure>
            <img src={hardware.photoHeld} alt='A StoreLense team member holding a StoreLense POS' loading='lazy' />
            <figcaption>StoreLense POS</figcaption>
          </figure>
          <figure>
            <img
              src={hardware.photoBoth}
              alt='StoreLense POS devices and a StoreLense Mini handheld on a table'
              loading='lazy'
            />
            <figcaption>StoreLense POS and the handheld StoreLense Mini</figcaption>
          </figure>
          <div className='slw-hw__note'>
            <Check size={18} strokeWidth={3} />
            <span>Free installation and staff training on Super User and Premium plans.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
