import { useState } from "react";
import { Check, ChevronDown, Download, Monitor, Smartphone } from "lucide-react";
import { PosMini, PosTerminal } from "../devices/DeviceFrames";
import { downloads, wa } from "../hospitalityConfig";
import "./HospitalityDownloads.css";

/* A download link; until the real link is set it asks the team for it on WhatsApp */
function GetLink({ href, ask, className, children }) {
  const url = href || wa(`Hi StoreLense, please send me the download link for ${ask}.`);
  return (
    <a className={className} href={url} target='_blank' rel='noopener noreferrer'>
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

function Steps({ steps }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`slh-dl__steps ${open ? "is-open" : ""}`}>
      <button type='button' onClick={() => setOpen(!open)} aria-expanded={open}>
        How to install <ChevronDown size={18} />
      </button>
      <div className='slh-dl__stepsBody'>
        <ol>
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* 9. Download centre: Windows, StoreLense POS devices, and the mobile app */
export default function HospitalityDownloads() {
  const { windows: win, pos, mobile } = downloads;

  return (
    <section className='slh-dl' id='slh-downloads'>
      <div className='slh-wrap'>
        <div className='slh-dl__head'>
          <span className='slh-eyebrow'>Download centre</span>
          <h2 className='slh-h2'>All apps are live. Pick your device.</h2>
          <p className='slh-lead'>One account works on every app, and in any web browser too.</p>
        </div>

        <div className='slh-dl__grid'>
          {/* Windows */}
          <article className='slh-dl__panel slh-dl__panel--win'>
            <div className='slh-dl__top'>
              <span className='slh-dl__logo'>
                <Monitor size={28} />
              </span>
              <span className='slh-dl__ready'>
                <Check size={14} strokeWidth={3} /> Ready
              </span>
            </div>
            <h3>{win.name}</h3>
            <p className='slh-dl__desc'>
              For counter tills and offices: silent receipt printing, cash drawer and full-screen till mode.
            </p>
            <dl className='slh-dl__meta'>
              <div>
                <dt>Version</dt>
                <dd>{win.version}</dd>
              </div>
              <div>
                <dt>File</dt>
                <dd>{win.fileType}</dd>
              </div>
              {win.fileSize && (
                <div>
                  <dt>Size</dt>
                  <dd>{win.fileSize}</dd>
                </div>
              )}
            </dl>
            <GetLink
              href={win.url}
              ask='StoreLense Hospitality for Windows'
              className='slh-btn slh-btn--white slh-dl__btn'
            >
              <Download size={18} /> Download for Windows
            </GetLink>
            {win.url32 && (
              <a className='slh-dl__alt' href={win.url32}>
                32-bit version for older POS PCs
              </a>
            )}
            <ul className='slh-dl__req'>
              {win.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Steps steps={win.steps} />
          </article>

          {/* StoreLense POS devices */}
          <article className='slh-dl__panel slh-dl__panel--pos'>
            <div className='slh-dl__top'>
              <div className='slh-dl__devs' aria-hidden='true'>
                <div className='slh-dl__devPos'>
                  <PosTerminal screen='salesPoint' />
                </div>
                <div className='slh-dl__devMini'>
                  <PosMini />
                </div>
              </div>
              <span className='slh-dl__ready'>
                <Check size={14} strokeWidth={3} /> Ready
              </span>
            </div>
            <h3>{pos.name}</h3>
            <p className='slh-dl__desc'>
              Comes installed on StoreLense hardware, set up with your venue, menu and staff.
            </p>
            <dl className='slh-dl__meta'>
              <div>
                <dt>Version</dt>
                <dd>{pos.version}</dd>
              </div>
              <div>
                <dt>Runs on</dt>
                <dd>StoreLense POS &amp; Mini</dd>
              </div>
            </dl>
            <GetLink
              href={pos.apkUrl}
              ask='the StoreLense POS app (APK)'
              className='slh-btn slh-btn--white slh-dl__btn'
            >
              <Download size={18} /> Download APK
            </GetLink>
            <ul className='slh-dl__req'>
              {pos.devices.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <Steps steps={pos.steps} />
          </article>

          {/* Mobile */}
          <article className='slh-dl__panel slh-dl__panel--mobile'>
            <div className='slh-dl__top'>
              <span className='slh-dl__logo'>
                <Smartphone size={28} />
              </span>
              <span className='slh-dl__ready'>
                <Check size={14} strokeWidth={3} /> Ready
              </span>
            </div>
            <h3>{mobile.name}</h3>
            <p className='slh-dl__desc'>For Android and iPhone: waiters, managers and owners on the go.</p>
            <div className='slh-dl__stores'>
              <GetLink href={mobile.playStoreUrl} ask='the StoreLense app on Google Play' className='slh-dl__store'>
                <PlayIcon />
                <span>
                  <small>Get it on</small>
                  <b>Google Play</b>
                </span>
              </GetLink>
              <GetLink href={mobile.appStoreUrl} ask='the StoreLense app on the App Store' className='slh-dl__store'>
                <AppleIcon />
                <span>
                  <small>Download on the</small>
                  <b>App Store</b>
                </span>
              </GetLink>
            </div>
            <ul className='slh-dl__req'>
              {mobile.uses.map((r) => (
                <li key={r}>{r}</li>
              ))}
              <li>
                {mobile.minAndroid} · {mobile.minIos}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
