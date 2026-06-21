import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bitcoin } from "lucide-react";
import "./MoreFeatures.css";

const FEATURES = [
  {
    id: "loan",
    title: "Track your loan",
    desc: "Keep track of your credits and goods on loan.",
    snippet: "James A. · ₦18,000 owed",
    visual: "ring",
  },
  {
    id: "broadcast",
    title: "Broadcast to customers",
    desc: "Send a marketing campaign to your whole list.",
    snippet: "Sent to 1,204 customers",
    visual: "avatars",
  },
  {
    id: "expenses",
    title: "Expenses overview",
    desc: "Keep record of your business expenses and monitor growth.",
    snippet: "This month · ₦284,500 tracked",
    visual: "bars",
    featured: true,
  },
  {
    id: "chat",
    title: "Chat in real-time",
    desc: "Chat with your customers as they shop.",
    snippet: "Customer is typing…",
    visual: "chat",
  },
  {
    id: "crypto",
    title: "Payout in crypto",
    desc: "Choose to get paid out in crypto (coming soon).",
    snippet: "0.0021 BTC · pending",
    visual: "crypto",
  },
];

function RingVisual() {
  return (
    <div className='mf__ring-wrap'>
      <svg width='74' height='74' viewBox='0 0 74 74'>
        <circle cx='37' cy='37' r='30' stroke='rgba(255,255,255,.12)' strokeWidth='6' fill='none' />
        <circle
          cx='37'
          cy='37'
          r='30'
          stroke='#2563EB'
          strokeWidth='6'
          fill='none'
          strokeLinecap='round'
          strokeDasharray='188.4'
          strokeDashoffset='68'
          transform='rotate(-90 37 37)'
        />
      </svg>
      <div className='mf__ring-val'>64%</div>
    </div>
  );
}

function AvatarsVisual() {
  return (
    <div style={{ width: "100%" }}>
      <div className='mf__avatars'>
        <span className='mf__avatar' style={{ background: "#37B4C5" }}>
          A
        </span>
        <span className='mf__avatar' style={{ background: "#2563EB" }}>
          J
        </span>
        <span className='mf__avatar' style={{ background: "#F5A623" }}>
          M
        </span>
        <span className='mf__avatar-more'>+43</span>
      </div>
      <div className='mf__skeleton'>
        <i style={{ width: "100%" }} />
        <i style={{ width: "85%" }} />
        <i style={{ width: "60%" }} />
      </div>
    </div>
  );
}

function BarsVisual() {
  return (
    <div className='mf__bars'>
      {[38, 70, 55, 95].map((h, i) => (
        <i key={i} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function ChatVisual() {
  return (
    <div className='mf__bubbles'>
      <div className='mf__bubble mf__bubble--in'>Is the blue one in stock?</div>
      <div className='mf__bubble mf__bubble--out'>Yes! 6 left</div>
      <div className='mf__typing'>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function CryptoVisual() {
  return (
    <div className='mf__coin'>
      <Bitcoin size={32} color='#3A2406' strokeWidth={2.2} />
      <span className='mf__soon'>SOON</span>
    </div>
  );
}

const VISUALS = {
  ring: RingVisual,
  avatars: AvatarsVisual,
  bars: BarsVisual,
  chat: ChatVisual,
  crypto: CryptoVisual,
};

function FeatureCard({ feature, cardRef }) {
  const Visual = VISUALS[feature.visual];
  return (
    <div ref={cardRef} className={feature.featured ? "mf__card mf__card--featured" : "mf__card"}>
      <div className='mf__visual'>
        <Visual />
        <div className='mf__snippet'>{feature.snippet}</div>
      </div>
      <div className='mf__card-title'>{feature.title}</div>
      <div className='mf__card-desc'>{feature.desc}</div>
    </div>
  );
}

export default function MoreFeatures({ onGetStarted, onTalkToSales }) {
  const rowRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!row || !cards.length || !("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(cards.indexOf(entry.target));
          }
        });
      },
      { root: row, threshold: 0.6 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const goTo = (i) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section className='mf'>
      <div className='mf__blob' aria-hidden='true' />
      <div className='mf__wrap'>
        <div className='mf__head'>
          <span className='mf__eyebrow'>
            <span className='mf__eyebrow-dot' />
            More features
          </span>
          <h2 className='mf__title'>
            Run the whole shop from <span className='mf__title-accent'>one dashboard.</span>
          </h2>
          <p className='mf__sub'>Past the till: track credit, talk to customers, watch your margins — all from the same place you ring up a sale.</p>
          <div className='mf__cta'>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className='mf__btn mf__btn--primary' onClick={onGetStarted}>
              Get Started
            </motion.button>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className='mf__btn mf__btn--ghost' onClick={onTalkToSales}>
              Talk to sales
            </motion.button>
          </div>
        </div>

        <div className='mf__row' ref={rowRef}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} cardRef={(el) => (cardRefs.current[i] = el)} />
          ))}
        </div>

        <div className='mf__dots'>
          {FEATURES.map((_, i) => (
            <button key={i} className={i === active ? "is-active" : ""} onClick={() => goTo(i)} aria-label={`Go to feature ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
