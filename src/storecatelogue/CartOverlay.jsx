import { createPortal } from "react-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, Send, ImageOff } from "lucide-react";
import "./CartOverlay.css";

let CURRENCY = "₦";

const CATEGORY_THEMES = {
  Fruits: { bg: "#FDF1DC", fg: "#B9781A" },
  Vegetables: { bg: "#E3F5EC", fg: "#158A57" },
  Bakery: { bg: "#FBEAE0", fg: "#B85A2E" },
  Grains: { bg: "#F5EEDC", fg: "#8C6B22" },
  Pantry: { bg: "#EDF1F5", fg: "#4E5D70" },
  Drinks: { bg: "#E6F1FB", fg: "#1D6FD8" },
};
const DEFAULT_THEME = { bg: "#EEF2F6", fg: "#8A97A8" };

function getCategoryTheme(category) {
  return CATEGORY_THEMES[category] || DEFAULT_THEME;
}

function formatPrice(amount) {
  return CURRENCY + Number(amount || 0).toLocaleString("en-NG");
}

/**
 * CartOverlay
 *
 * Slide-up "quotation" sheet, styled like a POS receipt. Lets the customer
 * adjust quantities and send the itemized list to the store's WhatsApp.
 *
 * Props:
 * - items: cart line items from StoreCatalogue (lineId, product, subUnit, qty, unitPrice)
 * - total: number
 * - storeName: string
 * - onClose: () => void
 * - onUpdateQty: (lineId, newQty) => void  (newQty <= 0 removes the line)
 * - onSendQuotation: () => void
 */
export default function CartOverlay({ items, total, storeName, onClose, onUpdateQty, onSendQuotation, currency }) {
  CURRENCY = currency || CURRENCY;

  return createPortal(
    <div className='cto-overlay' onClick={onClose}>
      <div className='cto-sheet' onClick={(e) => e.stopPropagation()}>
        <div className='cto-handle' />
        <div className='cto-header'>
          <h2>Your Quotation</h2>
          <button className='cto-close' onClick={onClose} aria-label='Close cart'>
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className='cto-empty'>
            <ShoppingBag size={32} />
            <p>Your cart is empty</p>
            <span>Add items from {storeName} to request a quotation.</span>
          </div>
        ) : (
          <>
            <div className='cto-list'>
              {items.map((item) => (
                <div className='cto-row' key={item.lineId}>
                  <div className='cto-thumb'>
                    {item.product.productImage?.[0] ? (
                      <img src={item.product.productImage[0]} alt={item.product.name} loading='lazy' />
                    ) : (
                      <div className='cto-thumb-fallback' style={{ background: getCategoryTheme(item.product.productCategory).bg }}>
                        <ImageOff size={16} color={getCategoryTheme(item.product.productCategory).fg} />
                      </div>
                    )}
                  </div>
                  <div className='cto-info'>
                    <div className='cto-name'>
                      {item.product.name}
                      {item.subUnit ? ` · ${item.subUnit.name}` : ""}
                    </div>
                    <div className='cto-unit-price'>{formatPrice(item.unitPrice)} each</div>
                    <div className='cto-stepper'>
                      <button onClick={() => onUpdateQty(item.lineId, item.qty - 1)} aria-label='Decrease quantity'>
                        <Minus size={12} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.lineId, item.qty + 1)} aria-label='Increase quantity'>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className='cto-right'>
                    <div className='cto-line-total'>{formatPrice(item.unitPrice * item.qty)}</div>
                    <button className='cto-remove' onClick={() => onUpdateQty(item.lineId, 0)} aria-label='Remove item'>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='cto-tear' aria-hidden='true' />

            <div className='cto-summary'>
              <div className='cto-summary-row cto-summary-row--total'>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button className='cto-send-btn' onClick={onSendQuotation}>
              <Send size={16} /> Send Quotation to {storeName}
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
