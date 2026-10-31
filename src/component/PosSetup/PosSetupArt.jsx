import { Laptop, PosMini, PosTerminal } from "../../home/HomeDevices";
import { screens } from "../../home/homeConfig";
import "./PosSetupArt.css";

/* ---------- Small hardware drawings (SVG) ---------- */

/* 80mm receipt printer, with a receipt coming out */
export function ReceiptPrinter({ className = "" }) {
  return (
    <svg className={`slw-art-svg ${className}`} viewBox='0 0 120 120' aria-hidden='true'>
      <path d='M38 6h44v44H38z' fill='#ffffff' stroke='#d5dde8' strokeWidth='1.5' />
      <path d='M45 15h22M45 22h30M45 29h18M45 36h26' stroke='#b9c6d8' strokeWidth='3' strokeLinecap='round' />
      <rect x='14' y='40' width='92' height='70' rx='14' fill='#24384f' />
      <rect x='14' y='40' width='92' height='22' rx='11' fill='#2f4864' />
      <rect x='30' y='46' width='60' height='5' rx='2.5' fill='#101c2a' />
      <circle cx='92' cy='92' r='5' fill='#3ddc84' />
      <rect x='24' y='88' width='40' height='6' rx='3' fill='#3a5574' />
    </svg>
  );
}

/* Handheld barcode scanner with its red beam */
export function Scanner({ className = "" }) {
  return (
    <svg className={`slw-art-svg ${className}`} viewBox='0 0 120 120' aria-hidden='true'>
      <path d='M4 22 52 30v20L4 58z' fill='#ef4444' opacity='0.18' />
      <path d='M4 40h48' stroke='#ef4444' strokeWidth='2' strokeLinecap='round' />
      <path
        d='M48 24c0-8 6-12 14-12h40c8 0 12 6 12 14v20c0 8-6 14-14 14H82L70 108c-2 6-8 8-14 6l-6-2c-4-2-6-6-5-10l9-42c-4-2-6-6-6-10z'
        fill='#24384f'
      />
      <rect x='52' y='22' width='6' height='26' rx='3' fill='#ef4444' />
      <rect x='72' y='60' width='10' height='18' rx='4' fill='#1d6fd8' />
    </svg>
  );
}

/* Label printer with a barcode label */
export function LabelPrinter({ className = "" }) {
  return (
    <svg className={`slw-art-svg ${className}`} viewBox='0 0 120 120' aria-hidden='true'>
      <rect x='30' y='14' width='60' height='40' rx='4' fill='#ffffff' stroke='#d5dde8' strokeWidth='1.5' />
      <path
        d='M40 22v20M44 22v20M47 22v20M52 22v20M55 22v20M60 22v20M64 22v20M66 22v20M71 22v20M75 22v20M80 22v20'
        stroke='#0f2a47'
        strokeWidth='2'
      />
      <rect x='16' y='48' width='88' height='62' rx='16' fill='#eef2f7' stroke='#d5dde8' strokeWidth='1.5' />
      <rect x='30' y='50' width='60' height='5' rx='2.5' fill='#b9c6d8' />
      <circle cx='86' cy='90' r='6' fill='#1d6fd8' />
    </svg>
  );
}

/* A box of thermal paper rolls */
export function PaperRolls({ className = "" }) {
  return (
    <svg className={`slw-art-svg ${className}`} viewBox='0 0 120 120' aria-hidden='true'>
      {[
        [34, 70],
        [64, 70],
        [94, 70],
        [49, 40],
        [79, 40],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r='15' fill='#ffffff' stroke='#d5dde8' strokeWidth='1.5' />
          <circle cx={x} cy={y} r='5' fill='#b9c6d8' />
        </g>
      ))}
      <rect x='12' y='84' width='96' height='28' rx='6' fill='#1d6fd8' />
      <rect x='12' y='84' width='96' height='8' rx='4' fill='#1a5fc0' />
    </svg>
  );
}

/* Adjustable tablet stand */
export function TabletStand({ className = "" }) {
  return (
    <svg className={`slw-art-svg ${className}`} viewBox='0 0 120 120' aria-hidden='true'>
      <rect x='24' y='10' width='72' height='54' rx='8' fill='#24384f' transform='rotate(-8 60 37)' />
      <rect x='30' y='16' width='60' height='42' rx='4' fill='#eaf2fd' transform='rotate(-8 60 37)' />
      <path d='M60 62v30' stroke='#8a98aa' strokeWidth='8' strokeLinecap='round' />
      <circle cx='60' cy='64' r='7' fill='#5b6b80' />
      <rect x='30' y='92' width='60' height='14' rx='7' fill='#5b6b80' />
    </svg>
  );
}

/* ---------- Device frames that aren't in HomeDevices ---------- */

/* Touch screen terminal on a stand (Android or Windows) */
function TouchTerminal({ src, dark = false }) {
  return (
    <div className={`slw-art-term ${dark ? "is-dark" : ""}`}>
      <div className='slw-art-term__screen'>
        <img src={src} alt='' loading='lazy' />
      </div>
      <span className='slw-art-term__neck' />
      <span className='slw-art-term__base' />
    </div>
  );
}

/* Tablet in an adjustable stand */
function TabletOnStand({ src }) {
  return (
    <div className='slw-art-tab'>
      <div className='slw-art-tab__body'>
        <div className='slw-art-tab__screen'>
          <img src={src} alt='' loading='lazy' />
        </div>
      </div>
      <span className='slw-art-tab__arm' />
      <span className='slw-art-tab__base' />
    </div>
  );
}

/* ---------- Scenes, one per POS setup ---------- */

/*
 * The picture for each setup: the main device showing the StoreLense app, with
 * the printer, scanner and label printer that come in the box.
 * kind: "laptop" | "android" | "windows" | "tablet" | "slpos"
 */
export default function PosSetupArt({ kind }) {
  if (kind === "slpos") {
    return (
      <div className='slw-art slw-art--slpos' aria-hidden='true'>
        <div className='slw-art__slpos'>
          <PosTerminal src={screens.salesPoint} />
        </div>
        <div className='slw-art__mini'>
          <PosMini src={screens.mSell} />
        </div>
      </div>
    );
  }

  if (kind === "tablet") {
    return (
      <div className='slw-art slw-art--tablet' aria-hidden='true'>
        <div className='slw-art__tablet'>
          <TabletOnStand src={screens.salesPoint} />
        </div>
      </div>
    );
  }

  return (
    <div className={`slw-art slw-art--${kind}`} aria-hidden='true'>
      <div className='slw-art__main'>
        {kind === "laptop" ? (
          <Laptop src={screens.salesPoint} />
        ) : (
          <TouchTerminal src={kind === "windows" ? screens.dashboard : screens.salesPoint} dark={kind === "windows"} />
        )}
      </div>
      <ReceiptPrinter className='slw-art__printer' />
      <Scanner className='slw-art__scanner' />
      <LabelPrinter className='slw-art__label' />
    </div>
  );
}
