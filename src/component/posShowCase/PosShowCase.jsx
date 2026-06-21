import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Printer, CreditCard, Smartphone, BarChart3 } from "lucide-react";
import "./posShowCase.css";
import frontView from "../../assessStatic/pictures/posImage/frontView.png";
import sideView from "../../assessStatic/pictures/posImage/sideView.png";
import backView from "../../assessStatic/pictures/posImage/backView.png";

// TODO: swap slides[1] and slides[2].src for real product screenshots
// (inventory dashboard, receipt printing). Slide 1 is the real hero asset.
const HERO_IMAGE = "https://res.cloudinary.com/ebuka1122/image/upload/v1780825761/allAssets/storelenseBImage_hsnowp.png";

const SLIDES = [
  { src: frontView, eyebrow: "Hardware", caption: "One terminal, in-built card reader and printer" },
  { src: sideView, eyebrow: "Inventory", caption: "Stock levels update the instant a sale is made" },
  { src: backView, eyebrow: "Receipts", caption: "Every sale prints a clean 80mm thermal receipt" },
];

const AUTO_PLAY_MS = 4000;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Carousel({ slides = SLIDES }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef(null);
  const touchStartX = useRef(0);

  const goTo = useCallback((i) => setActive((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    timerRef.current = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [next, paused, reducedMotion]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    setPaused(false);
  };

  const slide = slides[active];

  return (
    <div className='posshow__carousel-wrap'>
      <div className='posshow__carousel-stage'>
        <div className='posshow__glow' aria-hidden='true' />

        <button className='posshow__nav posshow__nav--prev' onClick={prev} aria-label='Previous slide'>
          <ChevronLeft size={16} color='#0F2A47' />
        </button>

        <div
          className='posshow__carousel'
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={active}
              className='posshow__slide'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <img src={slide.src} alt={slide.caption} />
              <div className='posshow__caption'>
                <div className='posshow__caption-eyebrow'>{slide.eyebrow}</div>
                <div className='posshow__caption-text'>{slide.caption}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className='posshow__nav posshow__nav--next' onClick={next} aria-label='Next slide'>
          <ChevronRight size={16} color='#0F2A47' />
        </button>
      </div>

      <div className='posshow__dots'>
        {slides.map((_, i) => (
          <button key={i} className={i === active ? "is-active" : ""} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Printer, title: "Print receipts", desc: "Built-in 80mm thermal printer for every transaction." },
  { icon: CreditCard, title: "Accept payment", desc: "In-built terminal handles cards, transfers and cash." },
  { icon: Smartphone, title: "Portable", desc: "Light enough to carry from till to warehouse floor." },
  { icon: BarChart3, title: "Inventory sync", desc: "Stock levels update in real time after every sale." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.09 },
  }),
};

export default function POSShowcase() {
  return (
    <section className='posshow'>
      <div className='posshow__wrap'>
        <div className='posshow__head'>
          <span className='posshow__eyebrow'>
            <span className='posshow__eyebrow-dot' />
            Hardware + software, one box
          </span>
          <h2 className='posshow__title'>
            All-in-one POS terminal and <span className='posshow__title-accent'>inventory manager</span>
          </h2>
          <p className='posshow__sub'>
            With our POS terminal, every transaction syncs straight to your store's inventory — no second device, no manual reconciliation.
          </p>
        </div>

        <Carousel slides={SLIDES} />

        <div className='posshow__grid'>
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className='posshow__card'
              custom={i}
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <span className='posshow__card-ic'>
                <Icon size={20} color='#2563EB' strokeWidth={2} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 32,
        }}
        className=' sl-animate '
      >
        <button
          onClick={() => {
            window.location.href = "/pos-setup";
          }}
          className='clients__btn'
        >
          View All Setup
        </button>
      </motion.div>
    </section>
  );
}
