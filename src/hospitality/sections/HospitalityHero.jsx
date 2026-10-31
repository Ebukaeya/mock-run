import { useEffect, useState } from "react";
import { ArrowRight, Bell, ChefHat, CloudOff, Download, Globe, Landmark } from "lucide-react";
import { Laptop, Phone, PosTerminal } from "../devices/DeviceFrames";
import { links } from "../hospitalityConfig";
import "./HospitalityHero.css";

const WORDS = ["restaurant", "café", "bar", "hotel"];

/* 1. Hero: split-screen product showcase */
export default function HospitalityHero() {
  const [word, setWord] = useState(0);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPrinting(true), 900);
    const i = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2400);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, []);

  return (
    <section className='slh-hero' id='slh-top'>
      <div className='slh-hero__copy'>
        <div className='slh-hero__copyInner'>
          <span className='slh-hero__tag'>
            <i /> StoreLense Hospitality
          </span>
          <h1 className='slh-hero__title'>
            Your whole
            <span className='slh-hero__word' key={word}>
              {WORDS[word]}
            </span>
            on one system.
          </h1>
          <p className='slh-hero__text'>
            Take orders at the table, at the counter and online through your venue's own ordering link. Send them to the
            kitchen, collect payment and watch the numbers, even when the internet goes off.
          </p>
          <div className='slh-hero__actions'>
            {links.getStarted && (
              <a className='slh-btn slh-btn--white' href={links.getStarted} target='_blank' rel='noopener noreferrer'>
                Get started <ArrowRight size={18} />
              </a>
            )}
            <a className='slh-btn slh-btn--ghost' href='#slh-downloads'>
              <Download size={18} /> Download software
            </a>
          </div>
          <ul className='slh-hero__proof'>
            <li>
              <Globe size={16} /> Online ordering link
            </li>
            <li>
              <CloudOff size={16} /> Works offline
            </li>
            <li>
              <ChefHat size={16} /> Kitchen tickets &amp; display
            </li>
            <li>
              <Landmark size={16} /> Kuda partner
            </li>
          </ul>
        </div>
      </div>

      <div className='slh-hero__stage'>
        <div className='slh-hero__grid' />
        <div className='slh-hero__devices'>
          <div className='slh-hero__laptop'>
            <Laptop screen='dashboard' />
          </div>
          <div className='slh-hero__pos'>
            <PosTerminal screen='salesPoint' printing={printing} />
          </div>
          <div className='slh-hero__phone'>
            <Phone screen='online' />
          </div>
          <div className='slh-hero__toast slh-hero__toast--a'>
            <span className='slh-hero__toastIc'>
              <Bell size={15} />
            </span>
            <span>
              <b>New online order</b>
              <small>ON-0012 · paid by card · to the kitchen</small>
            </span>
          </div>
          <div className='slh-hero__toast slh-hero__toast--b'>
            <span className='slh-hero__toastIc slh-hero__toastIc--green'>{"₦"}</span>
            <span>
              <b>{"₦"}22,575 received</b>
              <small>Kuda POS terminal · Takeaway</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
