import { useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Search as SearchIcon, Plus, ImageOff } from "lucide-react";
import "./SearchOverlay.css";

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

/**
 * SearchOverlay
 *
 * Full-screen search sheet. The header's search icon opens this instead of
 * showing an inline field, keeping the header compact on small screens.
 *
 * Props:
 * - products: full products array to search across
 * - query, onQueryChange: shared with the main grid's filter so results
 *     stay in sync after this overlay closes
 * - onClose: () => void
 * - onSelectProduct: (product) => void — opens the product detail sheet
 * - onQuickAdd: (product) => void
 */
export default function SearchOverlay({ products, query, onQueryChange, onClose, onSelectProduct, onQuickAdd, currency }) {
  CURRENCY = currency || CURRENCY;
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
  }, [products, query]);

  return createPortal(
    <div className='seo-overlay'>
      <div className='seo-header'>
        <div className='seo-input-wrap'>
          <SearchIcon size={17} className='seo-input-icon' />
          <input type='text' placeholder='Search for items' value={query} onChange={(e) => onQueryChange(e.target.value)} autoFocus />
        </div>
        <button className='seo-close' onClick={onClose} aria-label='Close search'>
          <X size={20} />
        </button>
      </div>

      <div className='seo-body'>
        {!query.trim() ? (
          <div className='seo-empty'>Start typing to search this store's products.</div>
        ) : results.length === 0 ? (
          <div className='seo-empty'>No products match "{query}".</div>
        ) : (
          <div className='seo-list'>
            {results.map((product) => {
              const theme = getCategoryTheme(product.productCategory);
              const thumb = product.productImage?.[0];
              const price = product.discountPrice || product.unitPrice;
              const outOfStock = product.quantity != null && product.quantity <= 0;
              return (
                <div key={product._id} className='seo-row' onClick={() => onSelectProduct(product)}>
                  <div className='seo-thumb'>
                    {thumb ? (
                      <img src={thumb} alt={product.name} loading='lazy' />
                    ) : (
                      <div className='seo-thumb-fallback' style={{ background: theme.bg }}>
                        <ImageOff size={17} color={theme.fg} />
                      </div>
                    )}
                  </div>
                  <div className='seo-info'>
                    <div className='seo-name'>{product.name}</div>
                    <div className='seo-price'>{formatPrice(price)}</div>
                  </div>
                  {!outOfStock ? (
                    <button
                      className='seo-add-btn'
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd(product);
                      }}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus size={15} />
                    </button>
                  ) : (
                    <span className='seo-outofstock'>Out of stock</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
