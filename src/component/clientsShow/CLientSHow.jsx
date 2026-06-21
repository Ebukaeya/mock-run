import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import "./ClientShowcase.css";

// Drop these 6 files into src/assets/clients/ (filenames match exactly).
// Pre-optimized: resized to 760px wide, JPEG q78, EXIF rotation applied.
import handoff from "../../assessStatic/pictures/clients/client-cjp-watches-handoff.jpg";
import deskWide from "../../assessStatic/pictures/clients/client-cjp-watches-desk-wide.jpg";
import deskClose from "../../assessStatic/pictures/clients/client-cjp-watches-desk-close.jpg";
import team from "../../assessStatic/pictures/clients/client-cjp-watches-team.jpg";
import phoneAccessories from "../../assessStatic/pictures/clients/client-phone-accessories.jpg";
import interiors from "../../assessStatic/pictures/clients/client-interiors-store.jpg";

// TODO: only 6 real client photos were available at build time.
// Add 1-2 more entries here (with the matching image dropped into
// assets/clients/) to round the wall out — the grid below reflows
// automatically for any count, no layout changes needed.
const CLIENTS = [
  { src: handoff, name: "CJP Watches", tag: "Walking through the first sale", featured: true },
  { src: deskWide, name: "CJP Watches", tag: "Front desk, ready for customers" },
  { src: deskClose, name: "CJP Watches", tag: "Confirming payment on the spot" },
  { src: team, name: "CJP Watches", tag: "Terminal handover day" },
  { src: phoneAccessories, name: "Phone Accessories Store", tag: "Setting up at the counter", featured: true },
  { src: interiors, name: "Home Interiors Store", tag: "Running checkout between customers" },
];

const tileVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
  }),
};

export default function ClientShowcase({ onGetStarted }) {
  return (
    <section className='clients'>
      <div className='clients__wrap'>
        <div className='clients__head'>
          <span className='clients__eyebrow'>
            <span className='clients__eyebrow-dot' />
            Live in real stores
          </span>
          <h2 className='clients__title'>
            Real owners. Real counters. <span className='clients__title-accent'>Real time.</span>
          </h2>
          <p className='clients__sub'>These aren't renders — they're StoreLense terminals running checkout right now, in stores across Nigeria.</p>
        </div>

        <div className='clients__grid'>
          {CLIENTS.map((c, i) => (
            <motion.div
              key={c.src}
              className={c.featured ? "clients__tile clients__tile--featured" : "clients__tile"}
              custom={i}
              variants={tileVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
            >
              <img src={c.src} alt={`${c.name} using the StoreLense POS terminal`} loading='lazy' />
              <div className='clients__tile-overlay'>
                <div className='clients__tile-name'>
                  <CheckCircle2 size={12} color='#3DDC84' />
                  {c.name}
                </div>
                <div className='clients__tile-tag'>{c.tag}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='clients__cta'>
          <p>Want your store on this wall?</p>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className='clients__btn' onClick={onGetStarted}>
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  );
}
