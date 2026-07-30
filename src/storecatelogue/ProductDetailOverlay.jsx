import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Play, Truck, Tag, ImageOff } from "lucide-react";
import "./ProductDetailOverlay.css";

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
  if (amount === null || amount === undefined) return "";
  return CURRENCY + Number(amount).toLocaleString("en-NG");
}

function getMediaType(url = "") {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url) ? "video" : "image";
}

/**
 * ProductDetailOverlay
 *
 * Full-screen product detail sheet. Tapping any photo/video in the carousel
 * opens MediaViewerOverlay in true fullscreen (via onOpenMedia).
 *
 * Props:
 * - product: single item from the products array passed to StoreCatalogue
 * - onClose: () => void
 * - onAddToCart: (qty, subUnit | null) => void
 * - onOpenMedia: (mediaArray, startIndex) => void
 */
export default function ProductDetailOverlay({ product, onClose, onAddToCart, onOpenMedia, currency }) {
  CURRENCY = currency || CURRENCY;
  const media = product.productImage?.length ? product.productImage : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [subUnit, setSubUnit] = useState(product.hasSubUnits ? product.subUnits?.[0] : null);
  const [expanded, setExpanded] = useState(false);
  const touchStartX = useRef(null);

  const price = subUnit ? subUnit.sellingPrice : product.discountPrice || product.unitPrice;
  const stock = subUnit ? subUnit.quantityOfSubUnitInStock : product.quantity;
  const inStock = stock == null || stock > 0;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0 && activeIndex < media.length - 1) setActiveIndex((i) => i + 1);
      if (delta > 0 && activeIndex > 0) setActiveIndex((i) => i - 1);
    }
    touchStartX.current = null;
  };

  const description = product.productDescription || "";
  const isLong = description.length > 160;
  const shownDescription = expanded || !isLong ? description : description.slice(0, 160) + "…";

  return createPortal(
    <div className='pdo-overlay'>
      <div className='pdo-sheet'>
        <button className='pdo-close' onClick={onClose} aria-label='Close'>
          <X size={20} />
        </button>

        <div className='pdo-media' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {media.length > 0 ? (
            <div className='pdo-media-track' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {media.map((url, i) => {
                const type = getMediaType(url);
                return (
                  <button key={i} className='pdo-media-item' onClick={() => onOpenMedia(media, i)} aria-label='View fullscreen'>
                    {type === "video" ? (
                      <>
                        <video src={url} muted playsInline preload='metadata' />
                        <span className='pdo-play-badge'>
                          <Play size={20} fill='#FFFFFF' />
                        </span>
                      </>
                    ) : (
                      <img src={url} alt={product.name} loading='lazy' />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className='pdo-media-fallback' style={{ background: getCategoryTheme(product.productCategory).bg }}>
              <ImageOff size={32} color={getCategoryTheme(product.productCategory).fg} />
            </div>
          )}

          {media.length > 1 && (
            <div className='pdo-dots'>
              {media.map((_, i) => (
                <span key={i} className={`pdo-dot ${i === activeIndex ? "pdo-dot--active" : ""}`} />
              ))}
            </div>
          )}
        </div>

        <div className='pdo-body'>
          <div className='pdo-title-row'>
            <h2>
              {product.name}
              {subUnit || product.unit ? ` (${subUnit ? subUnit.name : product.unit})` : ""}
            </h2>
            <span className={`pdo-stock ${inStock ? "pdo-stock--in" : "pdo-stock--out"}`}>{inStock ? "In Stock" : "Out of Stock"}</span>
          </div>

          <div className='pdo-price-row'>
            <div>
              <div className='pdo-price-label'>Price</div>
              <div className='pdo-price'>
                {formatPrice(price)}
                {product.onSales && product.discountPrice && <span className='pdo-price-strike'>{formatPrice(product.unitPrice)}</span>}
              </div>
            </div>
            <div className='pdo-stepper'>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label='Decrease quantity'>
                <Minus size={15} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => (stock ? Math.min(stock, q + 1) : q + 1))} aria-label='Increase quantity'>
                <Plus size={15} />
              </button>
            </div>
          </div>

          {product.hasSubUnits && product.subUnits?.length > 0 && (
            <div className='pdo-subunits'>
              {product.subUnits.map((su) => (
                <button
                  key={su.id}
                  className={`pdo-subunit-chip ${subUnit?.id === su.id ? "pdo-subunit-chip--active" : ""}`}
                  onClick={() => {
                    setSubUnit(su);
                    setQty(1);
                  }}
                >
                  {su.name}
                </button>
              ))}
            </div>
          )}

          {(product.onSales || product.canBeDelivered) && (
            <div className='pdo-badges'>
              {product.onSales && (
                <div className='pdo-badge'>
                  <Tag size={14} /> Discount applied
                </div>
              )}
              {product.canBeDelivered && (
                <div className='pdo-badge'>
                  <Truck size={14} /> Delivery {product.deliveryTime ? `in ${product.deliveryTime}d` : "available"}
                </div>
              )}
            </div>
          )}

          {description && (
            <div className='pdo-description'>
              <h3>Product Detail</h3>
              <p>
                {shownDescription}{" "}
                {isLong && (
                  <button className='pdo-readmore' onClick={() => setExpanded((v) => !v)}>
                    {expanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </p>
            </div>
          )}
        </div>

        <div className='pdo-footer'>
          <button className='pdo-add-btn' disabled={!inStock} onClick={() => onAddToCart(qty, subUnit)}>
            {inStock ? `Add ${qty} to Cart · ${formatPrice(price * qty)}` : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
