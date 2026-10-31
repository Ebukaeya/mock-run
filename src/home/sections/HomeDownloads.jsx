import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Download, FileText, Globe } from "lucide-react";
import { PosMini, PosTerminal } from "../HomeDevices";
import { downloads, screens } from "../homeConfig";
import { wa } from "../../site/siteConfig";
import "./HomeDownloads.css";

/* A download link. Until the real link is set, it asks the team for it on WhatsApp. */
function GetLink({ href, ask, className, children, download }) {
  if (href) {
    return (
      <a
        className={className}
        href={href}
        {...(download ? { download } : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      className={className}
      href={wa(`Hi StoreLense, please send me the download link for ${ask}.`)}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  );
}

const PlayIcon = () => (
  <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true'>
    <path fill='#00d7fe' d='M3.6 2.2 13.4 12l-9.8 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1z' />
    <path fill='#ffce00' d='m16.7 8.7-3.3 3.3 3.3 3.3 3.8-2.1c1-.6 1-2 0-2.5z' />
    <path fill='#00f076' d='M3.6 2.2c.3-.2.8-.2 1.2 0l11.9 6.5-3.3 3.3z' />
    <path fill='#f53349' d='m13.4 12 3.3 3.3-11.9 6.5c-.4.2-.9.2-1.2 0z' />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox='0 0 24 24' width='22' height='22' fill='currentColor' aria-hidden='true'>
    <path d='M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.6-4.2zM13.9 5c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1.1 3 1.1.1 2.3-.6 3-1.4z' />
  </svg>
);

/* Downloads: the StoreLense POS app (APK) for our devices; everything else from the app stores */
export default function HomeDownloads() {
  const { pos, mobile, web, guide } = downloads;
  const [open, setOpen] = useState(false);

  return (
    <section className='slw-dl' id='download'>
      <div className='slw-wrap'>
        <div className='slw-dl__head'>
          <span className='slw-eyebrow'>Download</span>
          <h2 className='slw-h2'>Get StoreLense on every device.</h2>
          <p className='slw-lead'>
            One account works everywhere: on our POS devices, your phones and tablets, and any web browser.
          </p>
        </div>

        <div className='slw-dl__grid'>
          {/* StoreLense POS devices: APK */}
          <article className='slw-dl__card slw-dl__card--pos'>
            <div className='slw-dl__devices' aria-hidden='true'>
              <div className='slw-dl__pos'>
                <PosTerminal src={screens.salesPoint} />
              </div>
              <div className='slw-dl__mini'>
                <PosMini src={screens.mSell} />
              </div>
            </div>
            <span className='slw-dl__tag'>For StoreLense POS devices</span>
            <h3>{pos.name}</h3>
            <p>
              Install it on StoreLense POS and StoreLense Mini. Receipts print on the built-in printer and the camera
              scans barcodes and receipt QR codes.
            </p>
            <GetLink
              href={pos.apkUrl}
              ask='the StoreLense POS app (APK)'
              download='StoreLense-POS.apk'
              className='slw-btn slw-btn--white slw-dl__btn'
            >
              <Download size={18} /> Download the POS app (APK)
            </GetLink>
            <span className='slw-dl__meta'>
              Version {pos.version}
              {pos.fileSize ? ` · ${pos.fileSize}` : ""} · Android
            </span>
            <button
              type='button'
              className={`slw-dl__how ${open ? "is-open" : ""}`}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              How to install <ChevronDown size={18} />
            </button>
            <div className={`slw-dl__steps ${open ? "is-open" : ""}`}>
              <ol>
                {pos.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          </article>

          {/* Phones and tablets: app stores */}
          <article className='slw-dl__card slw-dl__card--mobile'>
            <span className='slw-dl__tag slw-dl__tag--dark'>For phones and tablets</span>
            <h3>{mobile.name}</h3>
            <p>Sell, restock, track credit and see the day's numbers from your phone.</p>
            <div className='slw-dl__stores'>
              <GetLink href={mobile.playStoreUrl} ask='the StoreLense app on Google Play' className='slw-dl__store'>
                <PlayIcon />
                <span>
                  <small>Get it on</small>
                  <b>Google Play</b>
                </span>
              </GetLink>
              <GetLink href={mobile.appStoreUrl} ask='the StoreLense app on the App Store' className='slw-dl__store'>
                <AppleIcon />
                <span>
                  <small>Download on the</small>
                  <b>App Store</b>
                </span>
              </GetLink>
            </div>
            <ul className='slw-dl__uses'>
              {mobile.uses.map((u) => (
                <li key={u}>
                  <Check size={16} strokeWidth={3} /> {u}
                </li>
              ))}
            </ul>
          </article>

          {/* Browser */}
          <article className='slw-dl__card slw-dl__card--web'>
            <span className='slw-dl__webIc'>
              <Globe size={26} />
            </span>
            <span className='slw-dl__tag slw-dl__tag--dark'>No install needed</span>
            <h3>{web.name}</h3>
            <p>Use StoreLense on any laptop, desktop or tablet. Open the link and sign in.</p>
            <a className='slw-dl__webLink' href={web.url} target='_blank' rel='noopener noreferrer'>
              {web.label} <ArrowUpRight size={18} />
            </a>
          </article>
        </div>

        {/* Training guide */}
        <a className='slw-dl__guide' href={guide.file} download={guide.fileName}>
          <img src={guide.cover} alt='' loading='lazy' />
          <span className='slw-dl__guideText'>
            <span className='slw-dl__tag slw-dl__tag--dark'>Training guide</span>
            <b>The new Sales Point &amp; Sales Book</b>
            <small>
              How to sell, take payment, handle returns and credit, and keep working when the internet is down. For
              cashiers and store owners.
            </small>
          </span>
          <span className='slw-dl__guideBtn'>
            <FileText size={18} /> Download PDF
            <small>
              {guide.pages} pages · {guide.size}
            </small>
          </span>
        </a>
      </div>
    </section>
  );
}
