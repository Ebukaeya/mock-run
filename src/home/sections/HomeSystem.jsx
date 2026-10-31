import { useEffect, useState } from "react";
import {
  BarChart3,
  Building2,
  Check,
  LayoutDashboard,
  ReceiptText,
  ScanLine,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { Browser } from "../HomeDevices";
import { screens } from "../homeConfig";
import "./HomeSystem.css";

const TABS = [
  {
    id: "sell",
    icon: ShoppingCart,
    label: "Sales Point",
    title: "Ring up a sale in seconds.",
    text: "Tap products or search by name, brand or barcode. Change a price, add a serial number, apply a discount and VAT, then check out.",
    points: [
      "Hold a sale and come back to it",
      "Cash, transfer, POS and part payment",
      "Keyboard shortcuts for busy counters",
    ],
    shot: "salesPoint",
    url: "app.storelense.com/sales-point",
  },
  {
    id: "scan",
    icon: ScanLine,
    label: "Scan",
    title: "Scan with the camera or a handheld scanner.",
    text: "Point the phone or POS camera at a barcode, or plug in a scanner. Each scan drops the product straight into the sale.",
    points: ["Camera or handheld scanner", "Scanned items listed as you go", "No extra hardware needed"],
    shot: "scan",
    url: "app.storelense.com/sales-point",
  },
  {
    id: "checkout",
    icon: Wallet,
    label: "Checkout & credit",
    title: "Full payment, part payment or credit.",
    text: "Take cash, transfer or POS, split one bill across methods, or let a regular customer pay part now and the rest by a due date.",
    points: ["Split payment across methods", "Balance and due date on the receipt", "Every debtor in the Sales book"],
    shot: "checkout",
    url: "app.storelense.com/sales-point/checkout",
  },
  {
    id: "stores",
    icon: Building2,
    label: "Stores & warehouses",
    title: "Every shop and store room in one account.",
    text: "Run several stores and warehouses side by side, each with its own stock, staff and sales, and move stock between them.",
    points: ["Stores and warehouses per plan", "Stock moves with full history", "Staff only see their own store"],
    shot: "businesses",
    url: "app.storelense.com/businesses",
  },
  {
    id: "dash",
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Today, at a glance.",
    text: "Sales, profit, stock value, orders and returns across all your stores, with profit against expenses through the day.",
    points: ["Paid vs on-credit split", "In-store and online sales", "Switch store or date in one tap"],
    shot: "dashboard",
    url: "app.storelense.com/dashboard",
  },
  {
    id: "tx",
    icon: ReceiptText,
    label: "Transactions",
    title: "Every sale, who made it and how it was paid.",
    text: "Search by receipt, store or customer. See VAT, payment method, loans and delivery status for every transaction.",
    points: ["Filter by date, store or staff", "Active credits in one list", "Insights for any period"],
    shot: "transactions",
    url: "app.storelense.com/transactions",
  },
  {
    id: "reports",
    icon: BarChart3,
    label: "Reports",
    title: "Know what actually made money.",
    text: "Revenue, gross and net profit, trends and cash-flow channels, then download a report for your accountant.",
    points: [
      "Executive, operational and financial views",
      "Cash, card, transfer and credit split",
      "Download reports as PDF",
    ],
    shot: "analytics",
    url: "app.storelense.com/analytics",
  },
];

const DURATION = 8000;

/* One system explorer: real screenshots of the StoreLense app */
export default function HomeSystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TABS[active];

  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % TABS.length), DURATION);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <section className='slw-sys' id='features'>
      <div className='slw-wrap'>
        <div className='slw-sys__head'>
          <span className='slw-eyebrow'>One system</span>
          <h2 className='slw-h2'>
            Sell, stock and see the numbers. <em>All in one app.</em>
          </h2>
        </div>

        <div className='slw-sys__tabs' role='tablist' onMouseEnter={() => setPaused(true)}>
          {TABS.map((x, i) => {
            const Icon = x.icon;
            return (
              <button
                key={x.id}
                type='button'
                role='tab'
                aria-selected={i === active}
                className={i === active ? "is-on" : ""}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
              >
                <Icon size={17} />
                {x.label}
                {i === active && !paused && <i style={{ animationDuration: `${DURATION}ms` }} key={active} />}
              </button>
            );
          })}
        </div>

        <div className='slw-sys__stage' onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className='slw-sys__window' key={t.id}>
            <Browser src={screens[t.shot]} alt={`StoreLense ${t.label} screen`} url={t.url} />
          </div>
          <div className='slw-sys__card' key={`c-${t.id}`}>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
            <ul>
              {t.points.map((p) => (
                <li key={p}>
                  <Check size={16} strokeWidth={3} /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
