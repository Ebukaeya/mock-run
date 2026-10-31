import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle2, CloudOff, Play, Printer, ScanLine } from "lucide-react";
import { images } from "../homeConfig";
import { links } from "../../site/siteConfig";
import "./HomeHero.css";

const FEED = [
  { tag: "SALE", text: "Rice 50kg", meta: "−2 units · Abakaliki" },
  { tag: "PAID", text: "₦12,400", meta: "Transfer · Ikeja" },
  { tag: "LOW", text: "Sugar 1kg", meta: "4 left · restock soon" },
  { tag: "SALE", text: "Cooking oil 5L", meta: "−1 unit · Apapa" },
  { tag: "CREDIT", text: "₦9,540", meta: "Ego Awusa · due Friday" },
  { tag: "PAID", text: "₦4,500", meta: "POS · Surulere" },
];

/* Live activity ticker: the feed rotates every few seconds */
function Ticker() {
  const [rows, setRows] = useState(FEED);
  useEffect(() => {
    const id = setInterval(() => setRows((r) => [...r.slice(1), r[0]]), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className='slw-hero__ticker' aria-label='Example live activity'>
      <div className='slw-hero__tickHead'>
        <span>Live activity</span>
        <span className='slw-hero__live'>
          <i /> syncing
        </span>
      </div>
      <ul>
        {rows.slice(0, 4).map((r, i) => (
          <li key={`${r.text}-${r.tag}`} style={{ opacity: 1 - i * 0.18 }}>
            <span className={`slw-hero__tag slw-hero__tag--${r.tag.toLowerCase()}`}>{r.tag}</span>
            <b>{r.text}</b>
            <span>{r.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Home hero: headline, the woman with the StoreLense device, live activity */
export default function HomeHero() {
  return (
    <section className='slw-hero' id='top'>
      <div className='slw-wrap slw-hero__grid'>
        <div className='slw-hero__copy'>
          <span className='slw-hero__eyebrow'>
            <i /> Built for Nigerian retail · POS + inventory in one
          </span>
          <h1 className='slw-hero__title'>
            Every sale, counted
            <span> the moment it happens.</span>
          </h1>
          <p className='slw-hero__lead'>
            StoreLense brings POS hardware and store software together, so every sale, stock change, credit and payout
            is tracked live across your stores and warehouses.
          </p>
          <div className='slw-hero__actions'>
            <Link className='slw-btn slw-btn--blue' to={links.signUp}>
              Get started free <ArrowRight size={18} />
            </Link>
            <Link className='slw-btn slw-btn--line' to={links.demo}>
              <Play size={16} /> Watch demo
            </Link>
          </div>
          <ul className='slw-hero__proof'>
            <li>
              <ScanLine size={16} /> Barcode &amp; QR scanning
            </li>
            <li>
              <Printer size={16} /> Receipts on the spot
            </li>
            <li>
              <CloudOff size={16} /> Keeps selling offline
            </li>
          </ul>
        </div>

        <div className='slw-hero__visual'>
          <div className='slw-hero__disc' aria-hidden='true' />
          <img
            className='slw-hero__img'
            src={images.heroWoman}
            alt='A shop owner sitting with her StoreLense POS device, surrounded by her stock'
          />
          <div className='slw-hero__card slw-hero__card--sale'>
            <span className='slw-hero__ic slw-hero__ic--green'>
              <CheckCircle2 size={16} />
            </span>
            <span>
              <b>Sale completed</b>
              <small>+{"₦"}12,720 · Kaosi Stores</small>
            </span>
          </div>
          <div className='slw-hero__card slw-hero__card--stock'>
            <span className='slw-hero__ic slw-hero__ic--amber'>
              <AlertTriangle size={16} />
            </span>
            <span>
              <b>Low stock</b>
              <small>Sugar 1kg · 4 left</small>
            </span>
          </div>
          <Ticker />
        </div>
      </div>
    </section>
  );
}
