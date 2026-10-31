import { useEffect, useState } from "react";
import {
  AtSign,
  Bell,
  Check,
  ChefHat,
  Copy,
  CreditCard,
  Link2,
  MapPin,
  MessageCircle,
  QrCode,
  Truck,
} from "lucide-react";
import { Laptop, Phone } from "../devices/DeviceFrames";
import { images, venueLink } from "../hospitalityConfig";
import useInView from "../useInView";
import "./HospitalityOnline.css";

const CHANNELS = [
  { icon: MessageCircle, label: "WhatsApp status & chats" },
  { icon: AtSign, label: "Instagram bio" },
  { icon: QrCode, label: "QR code on every table" },
  { icon: MapPin, label: "Google Maps listing" },
];

const FLOW = [
  { icon: Link2, title: "Customer opens your link", text: "Your menu, photos, prices and opening hours, live." },
  { icon: CreditCard, title: "Orders and pays", text: "Delivery or pick-up. Card orders arrive already paid." },
  { icon: Bell, title: "Your till rings", text: "The order lands on your screen with a sound." },
  { icon: ChefHat, title: "One tap to the kitchen", text: "Items go to the right station like any other order." },
  { icon: Truck, title: "Tracked to the door", text: "Pending, preparing, on the way, delivered." },
];

/* Online ordering: every venue gets its own live link */
export default function HospitalityOnline() {
  const full = `${venueLink.base}${venueLink.exampleSlug}`;
  const [typed, setTyped] = useState(venueLink.base.length);
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView || typed >= full.length) return undefined;
    const t = setTimeout(() => setTyped((n) => n + 1), 55);
    return () => clearTimeout(t);
  }, [inView, typed, full.length]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${full}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_) {
      /* clipboard refused: the link stays visible to copy by hand */
    }
  };

  return (
    <section className='slh-online' id='slh-online'>
      <div className='slh-wrap'>
        <div className='slh-online__head' ref={ref}>
          <span className='slh-online__live'>
            <i /> Live on every plan
          </span>
          <h2 className='slh-online__title'>
            Every venue gets its own
            <span> online ordering link.</span>
          </h2>
          <p className='slh-online__lead'>
            No app for customers to download and no third-party menu to keep in sync. Share your link anywhere and take
            orders all day, straight into your till and kitchen.
          </p>

          <div className='slh-online__url'>
            <span className='slh-online__lock'>
              <Link2 size={18} />
            </span>
            <span className='slh-online__addr'>
              <span className='slh-online__proto'>https://</span>
              {full.slice(0, venueLink.base.length)}
              <b>{full.slice(venueLink.base.length, typed)}</b>
              <i className='slh-online__caret' />
            </span>
            <button type='button' onClick={copy} className={copied ? "is-done" : ""}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>

          <ul className='slh-online__channels'>
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.label}>
                  <Icon size={16} /> {c.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className='slh-online__stage'>
          <div className='slh-online__phone'>
            <span className='slh-online__tag'>What your customer sees</span>
            <Phone screen='online' />
          </div>

          <ol className='slh-online__flow'>
            {FLOW.map((f, i) => {
              const Icon = f.icon;
              return (
                <li key={f.title} style={{ transitionDelay: `${i * 90}ms` }} className={inView ? "is-in" : ""}>
                  <span className='slh-online__flowIc'>
                    <Icon size={18} />
                  </span>
                  <span>
                    <b>{f.title}</b>
                    <small>{f.text}</small>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className='slh-online__laptop'>
            <span className='slh-online__tag'>What your team sees</span>
            <Laptop screen='onlineOrders' />
          </div>
        </div>

        <div className='slh-online__ads'>
          <div className='slh-online__adsCopy'>
            <h3>Ads made for every venue.</h3>
            <p>
              StoreLense builds ads from your own menu: today's specials, weekend offers and new dishes. Each one has an
              Order online button that brings customers straight to your link.
            </p>
            <p className='slh-online__fee'>
              Customers pay a small service fee on each online order. Your menu prices stay yours.
            </p>
          </div>
          <img
            src={images.venueAds}
            alt="Three venue ads: a restaurant special, a bar's weekend offer and a café's new item, each with an Order online button"
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
}
