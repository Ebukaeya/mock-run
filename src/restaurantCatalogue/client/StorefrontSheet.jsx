import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./storefrontSheet.css";

/*
  The panel the item, cart and checkout open in: a centred card on
  laptops, a sheet that slides up from the bottom on phones.
  Escape and the backdrop close it; the page behind doesn't scroll.
*/
export default function StorefrontSheet({ title, subtitle, onClose, children, footer, size = "md", label, bare = false }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className='slhShopSheet' role='presentation' onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div ref={panelRef} className={`slhShopSheet__panel slhShopSheet__panel--${size}`} role='dialog' aria-modal='true' aria-label={label || title} tabIndex={-1}>
        <span className='slhShopSheet__grip' aria-hidden='true' />
        {!bare && (
          <header className='slhShopSheet__head'>
            <div>
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
            <button type='button' className='slhShopSheet__close' onClick={onClose} aria-label='Close'>
              <X size={18} />
            </button>
          </header>
        )}
        {bare && (
          <button type='button' className='slhShopSheet__close slhShopSheet__close--float' onClick={onClose} aria-label='Close'>
            <X size={18} />
          </button>
        )}
        <div className='slhShopSheet__body'>{children}</div>
        {footer && <footer className='slhShopSheet__foot'>{footer}</footer>}
      </div>
    </div>
  );
}
