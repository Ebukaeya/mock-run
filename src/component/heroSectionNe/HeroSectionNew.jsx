import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import "./HeroSection.css";
const HERO_IMAGE = "https://res.cloudinary.com/ebuka1122/image/upload/v1780825761/allAssets/storelenseBImage_hsnowp.png";

const FEED = [
  { id: 1, time: "now", tag: "SALE", text: "Rice 50kg", amt: "−2 units · Lagos" },
  { id: 2, time: "2s", tag: "PAID", text: "₦12,400", amt: "Ikeja Mall" },
  { id: 3, time: "9s", tag: "LOW", text: "Sugar 1kg", amt: "restock soon" },
  { id: 4, time: "14s", tag: "SALE", text: "Cooking oil 5L", amt: "−1 unit · Apapa" },
  { id: 5, time: "21s", tag: "PAID", text: "₦4,500", amt: "Surulere" },
  { id: 6, time: "30s", tag: "SALE", text: "Detergent 1kg", amt: "−4 units · Yaba" },
];

// Live activity ticker — the signature motif. Rotates the feed array
// every few seconds to simulate a real-time stream without a backend.
function LiveTicker() {
  const [rows, setRows] = useState(FEED);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className='hero__ticker'>
      <div className='hero__ticker-head'>
        <span>Live activity</span>
        <span className='hero__ticker-live'>
          <i /> streaming
        </span>
      </div>
      <div className='hero__ticker-viewport'>
        <motion.div className='hero__ticker-list' animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
          {rows.map((row, idx) => (
            <div className='hero__ticker-row' key={`${row.time}-${idx}`}>
              <span className='hero__ticker-time'>{row.time}</span>
              <span className={row.tag === "LOW" ? "hero__ticker-tag hero__ticker-tag--low" : "hero__ticker-tag hero__ticker-tag--pos"}>{row.tag}</span>
              <b>{row.text}</b>
              <span>{row.amt}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* function LiveTicker() {
  const rowHeight = 44; // adjust to your row height
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % FEED.length);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  return (
    <div className='hero__ticker'>
      <div className='hero__ticker-head'>
        <span>Live activity</span>
        <span className='hero__ticker-live'>
          <i /> streaming
        </span>
      </div>

      <div
        className='hero__ticker-viewport'
        style={{ overflow: "hidden", height: `${rowHeight * 4}px` }} // show 4 rows
      >
        <motion.div className='hero__ticker-list' animate={{ y: -(index * rowHeight) }} transition={{ duration: 0.45, ease: "easeInOut" }}>
          {[...FEED, ...FEED].map((row, idx) => (
            <div className='hero__ticker-row' key={`${row.id}-${idx}`}>
              <span className='hero__ticker-time'>{row.time}</span>
              <span className={row.tag === "LOW" ? "hero__ticker-tag hero__ticker-tag--low" : "hero__ticker-tag hero__ticker-tag--pos"}>{row.tag}</span>
              <b>{row.text}</b>
              <span>{row.amt}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} */

function HeroPhoto() {
  return (
    <div className='hero__visual'>
      <motion.div
        className='hero__photo-frame'
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img src={HERO_IMAGE} alt='StoreLense POS terminal' />
      </motion.div>

      <motion.div className='hero__float-card hero__float-card--sale'>
        {/*    animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} */}
        <span className='hero__ic hero__ic--green'>
          <CheckCircle2 size={16} color='#16A34A' />
        </span>
        <span>
          <span className='hero__fc-t1'>Sale completed</span>
          <span className='hero__fc-t2'>+₦4,500</span>
        </span>
      </motion.div>

      <motion.div className='hero__float-card hero__float-card--stock'>
        {/*   animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }} */}
        <span className='hero__ic hero__ic--amber'>
          <AlertTriangle size={16} color='#F5A623' />
        </span>
        <span>
          <span className='hero__fc-t1'>Low stock</span>
          <span className='hero__fc-t2'>Sugar 1kg</span>
        </span>
      </motion.div>
    </div>
  );
}

export default function HeroSectionNew({ onGetStarted, onDemo }) {
  return (
    <section className='hero'>
      <div className='hero__blob' aria-hidden='true' />
      <div className='hero__wrap hero__grid'>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <span className='hero__eyebrow'>
            <span className='hero__eyebrow-dot' />
            Built for Nigerian retail · POS + Inventory in one terminal
          </span>

          <h1 className='hero__title'>
            Every Sale, Counted
            <br />
            the Moment it <span className='hero__title-accent'>Happens.</span>
          </h1>

          <p className='hero__lead'>
            StoreLense brings together POS hardware and retail management software in one seamless system, so every sale, stock update, payout, and inventory
            movement is tracked live across your stores and warehouses.
          </p>

          <div className='hero__cta-row'>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className='hero__btn hero__btn--primary' onClick={onGetStarted}>
              Get Started
            </motion.button>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className='hero__btn hero__btn--ghost' onClick={onDemo}>
              Watch demo
            </motion.button>
          </div>

          <LiveTicker />
        </motion.div>

        <HeroPhoto />
      </div>
    </section>
  );
}
