import "../hospitality/devices/DeviceFrames.css";
import "../hospitality/screens/AppScreen.css";
import { LogoMark } from "../hospitality/Logo";
import "./HomeDevices.css";

/*
 * Device frames for the StoreLense website. Same frames as the Hospitality
 * page, but each one shows a screenshot image (src) instead of a recreation.
 */

function Shot({ src, alt = "", position = "top" }) {
  return (
    <img className='slw-shot' src={src} alt={alt} style={{ objectPosition: `center ${position}` }} loading='lazy' />
  );
}

export function Laptop({ src, alt, className = "" }) {
  return (
    <div className={`slh-dev-laptop ${className}`}>
      <div className='slh-dev-laptop__lid'>
        <span className='slh-dev-laptop__cam' />
        <div className='slh-dev-laptop__screen slw-ratio-16-10'>
          <Shot src={src} alt={alt} />
        </div>
      </div>
      <div className='slh-dev-laptop__base'>
        <span className='slh-dev-laptop__notch' />
      </div>
    </div>
  );
}

export function Phone({ src, alt, className = "" }) {
  return (
    <div className={`slh-dev-phone ${className}`}>
      <span className='slh-dev-phone__btn slh-dev-phone__btn--a' />
      <span className='slh-dev-phone__btn slh-dev-phone__btn--b' />
      <div className='slh-dev-phone__screen slw-ratio-phone'>
        <span className='slh-dev-phone__island' />
        <span className='slw-statusbar'>
          <b>9:41</b>
          <i />
        </span>
        <Shot src={src} alt={alt} />
      </div>
    </div>
  );
}

/* A store receipt that slides out of the printers */
function StoreReceipt() {
  return (
    <div className='slh-scr-rc'>
      <b className='slh-scr-rc__name'>KAOSI STORES</b>
      <span>No 19 Chukwu St, Abakaliki</span>
      <span className='slh-scr-rc__rule' />
      <p>
        <span>1 Pillow</span>
        <span>12,000</span>
      </p>
      <p>
        <span>2 Touch brush</span>
        <span>50,000</span>
      </p>
      <p>
        <span>1 Remote black</span>
        <span>2,000</span>
      </p>
      <span className='slh-scr-rc__rule' />
      <p className='slh-scr-rc__tot'>
        <span>TOTAL</span>
        <span>{"₦"}67,840</span>
      </p>
      <span>Paid · Transfer</span>
      <span className='slh-scr-rc__qr' />
      <span>Thank you!</span>
    </div>
  );
}

/* StoreLense POS: grey body, customer display + receipt printer on top, 10" screen */
export function PosTerminal({ src, alt, printing = false, amount = "12,720", className = "" }) {
  return (
    <div className={`slh-dev-slpos ${printing ? "is-printing" : ""} ${className}`}>
      <div className='slh-dev-slpos__body'>
        <div className='slh-dev-slpos__band'>
          <div className='slh-dev-slpos__cd'>
            <div className='slh-dev-slpos__lcd'>
              <span>TOTAL</span>
              <b>
                {"₦"}
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
              <StoreReceipt />
            </div>
          </div>
        </div>
        <div className='slh-dev-slpos__bezel'>
          <div className='slh-dev-slpos__screen slw-ratio-16-10'>
            <Shot src={src} alt={alt} position='top' />
            <span className='slh-dev-slpos__glare' />
          </div>
        </div>
      </div>
    </div>
  );
}

/* StoreLense Mini: handheld with tap-to-pay and printer head */
export function PosMini({ src, alt, printing = false, className = "", children }) {
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
          <StoreReceipt />
        </div>
      </div>
      <div className='slh-dev-mini__body'>
        <div className='slh-dev-mini__screen slw-ratio-mini'>
          {children || <Shot src={src} alt={alt} />}
          <span className='slh-dev-mini__glare' />
        </div>
        <div className='slh-dev-mini__chin'>
          <LogoMark className='slh-dev-mini__logo' />
        </div>
      </div>
    </div>
  );
}

/* A desktop browser window around a screenshot */
export function Browser({ src, alt, url = "app.storelense.com", className = "" }) {
  return (
    <div className={`slh-dev-browser ${className}`}>
      <div className='slh-dev-browser__bar'>
        <span className='slh-dev-browser__dot' />
        <span className='slh-dev-browser__dot' />
        <span className='slh-dev-browser__dot' />
        <span className='slh-dev-browser__url'>{url}</span>
      </div>
      <div className='slh-dev-browser__body'>
        <img className='slw-shot slw-shot--natural' src={src} alt={alt || ""} />
      </div>
    </div>
  );
}
