import { useState } from "react";
import { BookOpen, ChartColumn, Package, QrCode, TrendingUp } from "lucide-react";
import { Phone } from "../HomeDevices";
import { screens } from "../homeConfig";
import "./HomeMobile.css";

const ITEMS = [
  {
    id: "book",
    icon: BookOpen,
    title: "Sales book",
    text: "Today's sales, open credit and who still owes you, with a big Sell items button always in reach.",
    shot: "mSalesBook",
  },
  {
    id: "insights",
    icon: TrendingUp,
    title: "Insights",
    text: "Sales value, money received, credit, estimated profit, VAT and best sellers for any day.",
    shot: "mInsights",
  },
  {
    id: "products",
    icon: Package,
    title: "Products & restock",
    text: "See price, units sold and what's out of stock, then restock in a tap.",
    shot: "mProducts",
  },
  {
    id: "record",
    icon: ChartColumn,
    title: "Sales record",
    text: "Products sold by month, in-store against online, top and low sellers.",
    shot: "mSalesRecord",
  },
];

/* The mobile app: four real phone screens, one in focus at a time */
export default function HomeMobile() {
  const [active, setActive] = useState(0);

  return (
    <section className='slw-mob' id='mobile'>
      <div className='slw-wrap slw-mob__grid'>
        <div className='slw-mob__copy'>
          <span className='slw-eyebrow slw-mob__eyebrow'>Mobile app</span>
          <h2 className='slw-h2 slw-mob__title'>Your whole shop, in your pocket.</h2>
          <p className='slw-lead slw-mob__lead'>
            The same StoreLense on your phone. Sell, track credit and check the day's numbers from anywhere.
          </p>
          <div className='slw-mob__list' role='tablist'>
            {ITEMS.map((it, i) => {
              const Icon = it.icon;
              return (
                <button
                  key={it.id}
                  type='button'
                  role='tab'
                  aria-selected={i === active}
                  className={i === active ? "is-on" : ""}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className='slw-mob__ic'>
                    <Icon size={18} />
                  </span>
                  <span>
                    <b>{it.title}</b>
                    <small>{it.text}</small>
                  </span>
                </button>
              );
            })}
          </div>
          <div className='slw-mob__find'>
            <img src={screens.mFindSale} alt='Find a sale by scanning the QR code on the receipt' loading='lazy' />
            <span>
              <QrCode size={18} />
              <b>Find any sale from its receipt.</b> Scan the QR code, or type the last 6 characters, even offline.
            </span>
          </div>
        </div>

        <div className='slw-mob__stage'>
          {ITEMS.map((it, i) => {
            const pos = (i - active + ITEMS.length) % ITEMS.length;
            return (
              <button
                key={it.id}
                type='button'
                className={`slw-mob__phone slw-mob__phone--p${pos}`}
                onClick={() => setActive(i)}
                aria-label={`Show ${it.title}`}
                tabIndex={pos === 0 ? -1 : 0}
              >
                <Phone src={screens[it.shot]} alt={`StoreLense mobile ${it.title} screen`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
