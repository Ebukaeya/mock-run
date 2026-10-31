import { useEffect, useRef, useState } from "react";
import AppScreen from "../screens/AppScreen";
import { LogoMark } from "../Logo";
import "./DeviceFrames.css";

/*
 * Realistic device frames. Each one shows an app screen by name
 * (see screens/AppScreen.jsx). A real screenshot set in hospitalityConfig
 * replaces the built-in recreation automatically.
 */

/* Scales a fixed-size screen to whatever width the frame has. */
function ScreenFit({ width, height, children }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const update = () => setScale(el.clientWidth / width);
    update();
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div className='slh-dev-fit' ref={boxRef} style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className='slh-dev-fit__inner'
        style={{ width, height, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

export function Laptop({ screen, className = "" }) {
  return (
    <div className={`slh-dev-laptop ${className}`}>
      <div className='slh-dev-laptop__lid'>
        <span className='slh-dev-laptop__cam' />
        <div className='slh-dev-laptop__screen'>
          <ScreenFit width={1280} height={800}>
            <AppScreen name={screen} />
          </ScreenFit>
        </div>
      </div>
      <div className='slh-dev-laptop__base'>
        <span className='slh-dev-laptop__notch' />
      </div>
    </div>
  );
}

export function Tablet({ screen, className = "" }) {
  return (
    <div className={`slh-dev-tablet ${className}`}>
      <span className='slh-dev-tablet__cam' />
      <div className='slh-dev-tablet__screen'>
        <ScreenFit width={1024} height={720}>
          <AppScreen name={screen} />
        </ScreenFit>
      </div>
    </div>
  );
}

export function Phone({ screen, className = "" }) {
  return (
    <div className={`slh-dev-phone ${className}`}>
      <span className='slh-dev-phone__btn slh-dev-phone__btn--a' />
      <span className='slh-dev-phone__btn slh-dev-phone__btn--b' />
      <div className='slh-dev-phone__screen'>
        <span className='slh-dev-phone__island' />
        <ScreenFit width={390} height={844}>
          <AppScreen name={screen} />
        </ScreenFit>
      </div>
    </div>
  );
}

/*
 * StoreLense POS, drawn from the real device: light grey body, a top band with
 * the customer display and card reader on the left and the receipt printer
 * (dark lid, blue front) on the right, and a 10" touchscreen below.
 */
export function PosTerminal({ screen = "salesPoint", printing = false, amount = "22,575", className = "" }) {
  return (
    <div className={`slh-dev-slpos ${printing ? "is-printing" : ""} ${className}`}>
      <div className='slh-dev-slpos__body'>
        <div className='slh-dev-slpos__band'>
          <div className='slh-dev-slpos__cd'>
            <div className='slh-dev-slpos__lcd'>
              <span>TOTAL</span>
              <b>
                {"\u20a6"}
                {amount}
              </b>
            </div>
            <div className='slh-dev-slpos__cdRow'>
              <span className='slh-dev-slpos__nfc' aria-hidden='true'>
                <i />
                <i />
                <i />
              </span>
              <span className='slh-dev-slpos__card' />
            </div>
          </div>
          <div className='slh-dev-slpos__printer'>
            <span className='slh-dev-slpos__hinge' />
            <span className='slh-dev-slpos__lid' />
            <span className='slh-dev-slpos__slot' />
            <span className='slh-dev-slpos__front' />
            <div className='slh-dev-slpos__paper'>
              <AppScreen name='receiptSlip' />
            </div>
          </div>
        </div>
        <div className='slh-dev-slpos__bezel'>
          <div className='slh-dev-slpos__screen'>
            <ScreenFit width={1280} height={800}>
              <AppScreen name={screen} />
            </ScreenFit>
            <span className='slh-dev-slpos__glare' />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * StoreLense Mini, drawn from the real device: slate handheld with the
 * receipt printer head on top (tap-to-pay mark on its face), paper slot, and a
 * touchscreen on the handle.
 */
export function PosMini({ screen = "salesPointPos", printing = false, className = "" }) {
  return (
    <div className={`slh-dev-mini ${printing ? "is-printing" : ""} ${className}`}>
      <div className='slh-dev-mini__head'>
        <span className='slh-dev-mini__nfc' aria-hidden='true'>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className='slh-dev-mini__slotBar'>
        <span className='slh-dev-mini__slot' />
        <div className='slh-dev-mini__paper'>
          <AppScreen name='receiptSlip' />
        </div>
      </div>
      <div className='slh-dev-mini__body'>
        <div className='slh-dev-mini__screen'>
          <ScreenFit width={360} height={600}>
            <AppScreen name={screen} />
          </ScreenFit>
          <span className='slh-dev-mini__glare' />
        </div>
        <div className='slh-dev-mini__chin'>
          <LogoMark className='slh-dev-mini__logo' />
        </div>
      </div>
    </div>
  );
}

/* A desktop browser window, for wide dashboard previews. */
export function BrowserWindow({ screen, url = "storelensehospitality.com", className = "", children }) {
  return (
    <div className={`slh-dev-browser ${className}`}>
      <div className='slh-dev-browser__bar'>
        <span className='slh-dev-browser__dot' />
        <span className='slh-dev-browser__dot' />
        <span className='slh-dev-browser__dot' />
        <span className='slh-dev-browser__url'>{url}</span>
      </div>
      <div className='slh-dev-browser__body'>{children || <AppScreen name={screen} />}</div>
    </div>
  );
}
