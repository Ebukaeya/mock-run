import { useState, useMemo, useCallback, useEffect } from "react";
import { Phone, MessageCircle, MapPin, Search, ShoppingBag, Star, Plus, ImageOff, Clock, Bike, Users } from "lucide-react";
import ProductDetailOverlay from "./ProductDetailOverlay";
import CartOverlay from "./CartOverlay";
import MediaViewerOverlay from "./MediaViewerOverlay";
import SearchOverlay from "./SearchOverlay";
import "./StoreCatalogue.css";
import Footer from "../component/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { buildQuotationPdf } from "./quotationPdf";

let CURRENCY = "₦";

// Soft per-category tint for the fallback tile shown when a product has no
// photo yet. Falls back to a neutral slate tint for unrecognised categories.
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
 * StoreCatalogue
 *
 * Customer-facing storefront page for a single StoreLense store.
 *
 * Props:
 * - store: {
 *     storeName, storeImage, category, averageRating, numberOfFollowers,
 *     storeAddress, latitude, longitude, deliveryTime, deliveryFee, phoneNumber
 *   }
 * - products: array shaped like the StoreLense productSchema (name, productImage[],
 *     unitPrice, discountPrice, onSales, quantity, unit, hasSubUnits, subUnits[],
 *     productDescription, rating, productCategory, canBeDelivered, deliveryTime)
 * - onSendQuotation: optional (cartItems, message) => void override for the WhatsApp send.
 *     If omitted, opens wa.me with the store's phoneNumber directly.
 */

// ---------- Store ----------
export const store = {
  _id: "665f1a2b3c4d5e6f7a8b9c01",
  storeName: "Fresh Supermarket",
  storeImage: "https://placehold.co/160x160/E3F5EC/158A57?text=F",
  category: "Groceries",
  averageRating: 4.9,
  numberOfFollowers: 20340,
  storeAddress: "12 Aba Road, Aba, Abia State",
  latitude: 5.1167,
  longitude: 7.3667,
  deliveryTime: "10-25 mins",
  deliveryFee: 1000,
  phoneNumber: "2348012345678",
};

// ---------- Products ----------
// Shaped after productSchema.js — trimmed to the fields StoreCatalogue,
// ProductDetailOverlay, CartOverlay, and SearchOverlay actually read.
export const products = [
  {
    _id: "665f1a2b3c4d5e6f7a8b9d01",
    name: "Fresh Bananas monka tublpe (1 Dozen)",
    productImage: [
      "https://placehold.co/600x600/FDF1DC/B9781A?text=Bananas",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://placehold.co/600x600/FDF1DC/B9781A?text=Bananas+2",
    ],
    productCategory: "Fruits",
    brand: "Local Farm",
    productState: "new",
    unit: "Dozen",
    hasSubUnits: false,
    subUnits: [],
    quantity: 40,
    stockLimit: 10,
    costPrice: 9,
    unitPrice: 12,
    onSales: false,
    discountPrice: null,
    rating: 4.9,
    ratingCount: 212,
    canBeDelivered: true,
    deliveryFee: 200,
    deliveryTime: 1,
    productDescription:
      "Sweet, ripe bananas sourced fresh daily from local farms across the South East. Great for smoothies, baking, or a quick snack on the go. Naturally packed with potassium and fibre.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9d02",
    name: "Dawn Bread Regular Pack",
    productImage: ["https://placehold.co/600x600/FBEAE0/B85A2E?text=Bread"],
    productCategory: "Bakery",
    brand: "Dawn",
    productState: "new",
    unit: "Pack",
    hasSubUnits: false,
    subUnits: [],
    quantity: 25,
    stockLimit: 5,
    costPrice: 4,
    unitPrice: 6,
    onSales: false,
    discountPrice: null,
    rating: 4.6,
    ratingCount: 98,
    canBeDelivered: true,
    deliveryFee: 200,
    deliveryTime: 1,
    productDescription: "Soft, fluffy loaf baked fresh every morning at our in-house bakery partner.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9d03",
    name: "Capsicum Green",
    productImage: ["https://placehold.co/600x600/E3F5EC/158A57?text=Capsicum"],
    productCategory: "Vegetables",
    brand: null,
    productState: "new",
    unit: "kg",
    hasSubUnits: false,
    subUnits: [],
    quantity: 15,
    stockLimit: 3,
    costPrice: 5,
    unitPrice: 8,
    onSales: false,
    discountPrice: null,
    rating: 4.4,
    ratingCount: 41,
    canBeDelivered: true,
    deliveryFee: 200,
    deliveryTime: null,
    productDescription: "Crisp green bell peppers, perfect for stir-fries, stews, and salads.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9d04",
    name: "Premium Parboiled Rice",
    productImage: ["https://placehold.co/600x600/F5EEDC/8C6B22?text=Rice", "https://placehold.co/600x600/F5EEDC/8C6B22?text=Rice+Bag"],
    productCategory: "Grains",
    brand: "Mama Gold",
    productState: "new",
    unit: "Bag",
    hasSubUnits: true,
    subUnits: [
      { id: "bag", name: "Bag", conversionFactor: 100, quantityOfSubUnitInStock: 6, sellingPrice: 1080, costPrice: 950 },
      { id: "rubber", name: "Paint Rubber", conversionFactor: 1, quantityOfSubUnitInStock: 120, sellingPrice: 60, costPrice: 48 },
    ],
    quantity: 6,
    stockLimit: 2,
    costPrice: 950,
    unitPrice: 1200,
    onSales: true,
    discountPrice: 1080,
    rating: 4.8,
    ratingCount: 156,
    canBeDelivered: true,
    deliveryFee: 500,
    deliveryTime: 2,
    productDescription: "Long-grain parboiled rice sold by the 50kg bag or by the paint rubber for smaller households. Consistent grain quality, low breakage.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9d05",
    name: "Cooking Oil 5L",
    productImage: ["https://placehold.co/600x600/EDF1F5/4E5D70?text=Oil"],
    productCategory: "Pantry",
    brand: "Kings",
    productState: "new",
    unit: "Keg",
    hasSubUnits: false,
    subUnits: [],
    quantity: 0,
    stockLimit: 5,
    costPrice: 15,
    unitPrice: 18,
    onSales: false,
    discountPrice: null,
    rating: 4.5,
    ratingCount: 63,
    canBeDelivered: false,
    deliveryFee: null,
    deliveryTime: null,
    productDescription: "Pure vegetable cooking oil in a 5 litre keg, ideal for frying and everyday cooking.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9d06",
    name: "Sachet Water Pack (20)",
    productImage: ["https://placehold.co/600x600/E6F1FB/1D6FD8?text=Water"],
    productCategory: "Drinks",
    brand: "AquaPure",
    productState: "new",
    unit: "Pack",
    hasSubUnits: false,
    subUnits: [],
    quantity: 80,
    stockLimit: 10,
    costPrice: 4,
    unitPrice: 5,
    onSales: false,
    discountPrice: null,
    rating: 4.2,
    ratingCount: 34,
    canBeDelivered: true,
    deliveryFee: 200,
    deliveryTime: 1,
    productDescription: "Pack of 20 sachets of clean, NAFDAC-registered drinking water.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9d07",
    name: "Fresh Tomatoes Basket",
    productImage: ["https://placehold.co/600x600/E3F5EC/158A57?text=Tomatoes", "https://www.w3schools.com/html/mov_bbb.mp4"],
    productCategory: "Vegetables",
    brand: null,
    productState: "new",
    unit: "Basket",
    hasSubUnits: false,
    subUnits: [],
    quantity: 10,
    stockLimit: 2,
    costPrice: 16,
    unitPrice: 22,
    onSales: true,
    discountPrice: 19,
    rating: 4.7,
    ratingCount: 89,
    canBeDelivered: true,
    deliveryFee: 300,
    deliveryTime: 1,
    productDescription: "Full basket of ripe, juicy tomatoes, hand-picked for minimal bruising.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9d08",
    name: "Onions 1kg",
    productImage: ["https://placehold.co/600x600/E3F5EC/158A57?text=Onions"],
    productCategory: "Vegetables",
    brand: null,
    productState: "new",
    unit: "kg",
    hasSubUnits: false,
    subUnits: [],
    quantity: 30,
    stockLimit: 5,
    costPrice: 3,
    unitPrice: 4,
    onSales: false,
    discountPrice: null,
    rating: 4.3,
    ratingCount: 27,
    canBeDelivered: true,
    deliveryFee: 200,
    deliveryTime: null,
    productDescription: "Fresh red onions, sold by the kilogram, sourced from Sokoto.",
    storeID: "665f1a2b3c4d5e6f7a8b9c01",
    storeName: "Fresh Supermarket",
    webstoreUserID: "665f1a2b3c4d5e6f7a8b9e01",
  },
];

export default function StoreCatalogue(/* { store, products, onSendQuotation } */) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [mediaViewer, setMediaViewer] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState(CURRENCY);

  const params = useParams();

  const storeID = params.storeID;
  const navigate = useNavigate();

  if (!storeID) {
    alert("Invalid store. Please check the URL and try again.");
    navigate("/");
  }

  useEffect(() => {
    fetchStoreData();

    const handleScroll = () => setIsScrolled(window.scrollY > 6);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchStoreData = async () => {
    try {
      setIsLoading(true);
      const url = process.env.REACT_APP_Back_end_api_root + `/getStoreData/${storeID}`;
      const response = await fetch(url);
      const { store, storecollection } = await response.json();

      const phoneNumber = store.webstoreUser?.phoneNumber || "+2348159273522";

      if (!store.phoneNumber) {
        store.phoneNumber = phoneNumber;
      }

      if (!store) {
        throw new Error("Store not found");
      }

      console.log("Fetched store data:", store, storecollection);

      setStore(store);
      setProducts(storecollection.products || []);
      setCurrency(store.currency || CURRENCY);
      CURRENCY = store.currency || CURRENCY;
    } catch (error) {
      console.error("Failed to fetch store data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSendQuotation = useCallback((cartItems, message) => {}, []);

  const handleSendQuotation = async () => {
    const phone = (store.phoneNumber || "").replace(/[^\d]/g, "");
    const lines = cart.map(
      (item) => `${item.qty}x ${item.product.name}${item.subUnit ? ` (${item.subUnit.name})` : ""} — ${formatPrice(item.unitPrice * item.qty)}`,
    );
    const message = [`Quotation request for ${store.storeName}:`, "", ...lines, "", `Total: ${formatPrice(cartTotal)}`].join("\n");

    console.log(store.currency, "store currency");

    const { blob, filename } = buildQuotationPdf(store, cart, cartTotal);

    /*  if (onSendQuotation) {
    onSendQuotation(cart, message, { blob, filename });
    return;
  } */

    const pdfFile = new File([blob], filename, { type: "application/pdf" });

    /*  if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          files: [pdfFile],
          text: message,
          title: `Quotation - ${store.storeName}`,
        });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    } */

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.productCategory).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [products]);

  const popularProducts = useMemo(() => [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8), [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.productCategory === activeCategory;
      const matchesQuery = !q || p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  const addToCart = useCallback((product, qty, subUnit) => {
    const unitPrice = subUnit ? subUnit.sellingPrice : product.discountPrice || product.unitPrice;
    const lineId = subUnit ? `${product._id}-${subUnit.id}` : String(product._id);
    setCart((prev) => {
      const existing = prev.find((item) => item.lineId === lineId);
      if (existing) {
        return prev.map((item) => (item.lineId === lineId ? { ...item, qty: item.qty + qty } : item));
      }
      return [...prev, { lineId, product, subUnit: subUnit || null, qty, unitPrice }];
    });
  }, []);

  const updateCartQty = useCallback((lineId, qty) => {
    setCart((prev) => (qty <= 0 ? prev.filter((item) => item.lineId !== lineId) : prev.map((item) => (item.lineId === lineId ? { ...item, qty } : item))));
  }, []);

  const handleCall = () => {
    if (store.phoneNumber) window.location.href = `tel:${store.phoneNumber}`;
  };

  const handleMessage = () => {
    const phone = (store.phoneNumber || "").replace(/[^\d]/g, "");
    const text = encodeURIComponent(`Hi ${store.storeName}, I'd like to ask about your products.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleLocation = () => {
    if (store.latitude && store.longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`, "_blank", "noopener,noreferrer");
    } else if (store.storeAddress) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.storeAddress)}`, "_blank", "noopener,noreferrer");
    }
  };

  /* const handleSendQuotation = () => {
    const phone = (store.phoneNumber || "").replace(/[^\d]/g, "");
    const lines = cart.map(
      (item) => `${item.qty}x ${item.product.name}${item.subUnit ? ` (${item.subUnit.name})` : ""} — ${formatPrice(item.unitPrice * item.qty)}`,
    );
    const message = [`Quotation request for ${store.storeName}:`, "", ...lines, "", `Total: ${formatPrice(cartTotal)}`].join("\n");

    if (onSendQuotation) {
      onSendQuotation(cart, message);
    } else {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    }
  }; */

  if (isLoading || !store) {
    return (
      <div className='slc-loading'>
        <p>Loading store data...</p>
      </div>
    );
  }

  return (
    <>
      <header className={`slc-header ${isScrolled ? "slc-header--stuck" : ""}`}>
        <button className='slc-icon-btn slc-icon-btn-cart' onClick={() => setIsCartOpen(true)} aria-label='Open cart'>
          <ShoppingBag size={19} />
          {cartCount > 0 && <span className='slc-cart-badge'>{cartCount}</span>}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className='slc-header-logo'>
            {store.storeImage ? <img src={store.storeImage} alt={store.storeName} loading='lazy' /> : <span>{store.storeName?.[0]}</span>}
          </div>

          <div className='slc-header-info'>
            <div className='slc-header-title-row'>
              <h1>{store.storeName}</h1>
              {store.category && <span className='slc-category-pill'>{store.category}</span>}
            </div>
            <div className='slc-meta-row'>
              {store.deliveryTime && (
                <span>
                  <Clock size={12} className='slc-meta-icon' /> {store.deliveryTime}
                </span>
              )}
              {store.deliveryFee != null && (
                <span>
                  <Bike size={12} className='slc-meta-icon' /> {formatPrice(store.deliveryFee)}
                </span>
              )}
              {store.numberOfFollowers != null && (
                <span>
                  <Users size={12} className='slc-meta-icon' /> {store.numberOfFollowers.toLocaleString()}
                </span>
              )}
              {store.averageRating != null && (
                <span className='slc-rating'>
                  <Star size={12} className='slc-star-icon' /> {store.averageRating}
                </span>
              )}
            </div>
          </div>
        </div>

        <button className='slc-icon-btn' onClick={() => setIsSearchOpen(true)} aria-label='Search for items'>
          <Search size={19} />
        </button>
      </header>
      <div className='slc-page'>
        <div className='slc-actions-row'>
          <button className='slc-action-btn' onClick={handleCall}>
            <Phone size={16} /> Call
          </button>
          <button className='slc-action-btn' onClick={handleMessage}>
            <MessageCircle size={16} /> Message
          </button>
          <button className='slc-action-btn' onClick={handleLocation}>
            <MapPin size={16} /> Location
          </button>
        </div>

        {!query && popularProducts.length > 0 && (
          <section className='slc-section'>
            <div className='slc-section-head'>
              <h2>Popular Items</h2>
            </div>
            <div className='slc-popular-row-wrap'>
              <div className='slc-popular-row'>
                {popularProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    compact
                    onOpen={() => setSelectedProduct(product)}
                    onQuickAdd={() => addToCart(product, 1, product.hasSubUnits ? product.subUnits?.[0] : null)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className='slc-section'>
          <div className='slc-category-row'>
            {categories.map((cat) => (
              <button key={cat} className={`slc-chip ${activeCategory === cat ? "slc-chip--active" : ""}`} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div className='slc-section-head'>
            <h2>{query ? "Search Results" : "All Products"}</h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className='slc-empty'>No products match your search.</div>
          ) : (
            <div className='slc-grid'>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onOpen={() => setSelectedProduct(product)}
                  onQuickAdd={() => addToCart(product, 1, product.hasSubUnits ? product.subUnits?.[0] : null)}
                />
              ))}
            </div>
          )}
        </section>

        {selectedProduct && (
          <ProductDetailOverlay
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(qty, subUnit) => {
              addToCart(selectedProduct, qty, subUnit);
              setSelectedProduct(null);
              setIsCartOpen(true);
            }}
            onOpenMedia={(media, index) => setMediaViewer({ media, index })}
            currency={store.currency || CURRENCY}
          />
        )}

        {isCartOpen && (
          <CartOverlay
            items={cart}
            total={cartTotal}
            storeName={store.storeName}
            onClose={() => setIsCartOpen(false)}
            onUpdateQty={updateCartQty}
            onSendQuotation={handleSendQuotation}
            currency={store.currency || CURRENCY}
          />
        )}

        {isSearchOpen && (
          <SearchOverlay
            products={products}
            query={query}
            onQueryChange={setQuery}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={(product) => {
              setIsSearchOpen(false);
              setSelectedProduct(product);
            }}
            onQuickAdd={(product) => addToCart(product, 1, product.hasSubUnits ? product.subUnits?.[0] : null)}
            currency={store.currency || CURRENCY}
          />
        )}

        {mediaViewer && <MediaViewerOverlay media={mediaViewer.media} startIndex={mediaViewer.index} onClose={() => setMediaViewer(null)} />}
      </div>
      <Footer />
    </>
  );
}

function ProductCard({ product, compact, onOpen, onQuickAdd }) {
  const thumb = product.productImage?.[0];
  const price = product.discountPrice || product.unitPrice;
  const outOfStock = product.quantity != null && product.quantity <= 0;
  const theme = getCategoryTheme(product.productCategory);

  return (
    <div className={`slc-card ${compact ? "slc-card--compact" : ""}`} onClick={onOpen}>
      <div className='slc-card-media'>
        {thumb ? (
          <img src={thumb} alt={product.name} loading='lazy' />
        ) : (
          <div className='slc-card-media-fallback' style={{ background: theme.bg }}>
            <ImageOff size={22} color={theme.fg} />
          </div>
        )}
        {product.onSales && <span className='slc-badge-sale'>Sale</span>}
        {!outOfStock && (
          <button
            className='slc-add-btn'
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd();
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={15} />
          </button>
        )}
        {outOfStock && <div className='slc-card-outofstock'>Out of stock</div>}
      </div>
      <div className='slc-card-price'>{formatPrice(price)}</div>
      <div className='slc-card-name'>{product.name}</div>
    </div>
  );
}
