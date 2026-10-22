/* Small helpers shared by the online order page and the tracking page. */

export const moneyIn =
  (currency = "₦") =>
  (n) => {
    const v = Math.round(Number(n || 0) * 100) / 100;
    const cents = v % 1 !== 0;
    return `${currency}${v.toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 })}`;
  };

export const DAYS = [
  { id: "mon", label: "Monday" },
  { id: "tue", label: "Tuesday" },
  { id: "wed", label: "Wednesday" },
  { id: "thu", label: "Thursday" },
  { id: "fri", label: "Friday" },
  { id: "sat", label: "Saturday" },
  { id: "sun", label: "Sunday" },
];

export const todayId = (d = new Date()) => ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][d.getDay()];

/* "08:00" → "8:00 am" */
export function niceTime(hhmm) {
  const [h, m] = String(hhmm || "")
    .split(":")
    .map(Number);
  if (!Number.isFinite(h)) return hhmm || "";
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m || 0).padStart(2, "0")} ${suffix}`;
}

export const clockOf = (date) =>
  new Date(date).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", " ").toLowerCase();

export const range = ({ min, max } = {}) => (min && max && max !== min ? `${min}–${max} min` : `${min || max || 30} min`);

export const mapsLink = (venue) =>
  venue?.location
    ? `https://www.google.com/maps/search/?api=1&query=${venue.location.lat},${venue.location.lng}`
    : venue?.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`
      : null;

export const telLink = (phone) => (phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : null);

/* WhatsApp needs 234…, not 0… */
export const whatsappLink = (phone) => {
  if (!phone) return null;
  let d = String(phone).replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) d = `234${d.slice(1)}`;
  return `https://wa.me/${d}`;
};

/* A dish's photos and videos: [{ type: "image" | "video", url }].
   Items from before media existed have just `image`. */
export const mediaOf = (item) => (item?.media?.length ? item.media : item?.image ? [{ type: "image", url: item.image }] : []);

/* ─── Cart lines ─── */

/* The same item with the same choices and note is one line */
export const lineKey = (itemId, variant, modifiers, note) => [itemId, variant || "", [...modifiers].sort().join("+"), (note || "").trim()].join("|");

export const unitPriceOf = (item, variantName, modifierNames) => {
  const variant = (item.variants || []).find((v) => v.name === variantName);
  const base = variant ? variant.price : item.price;
  const extras = (item.modifiers || []).filter((m) => modifierNames.includes(m.name)).reduce((s, m) => s + m.price, 0);
  return base + extras;
};

/* What the page shows before the server works out the real total */
export function previewTotals(lines, menuById, { vatRate = 0, deliveryFee = 0, serviceFee = 0 }) {
  let subtotal = 0;
  let taxable = 0;
  for (const l of lines) {
    const item = menuById.get(String(l.itemId));
    if (!item) continue;
    const total = unitPriceOf(item, l.variant, l.modifiers) * l.qty;
    subtotal += total;
    if (item.isTaxable !== false) taxable += total;
  }
  const vat = Math.round(((taxable * vatRate) / 100) * 100) / 100;
  return { subtotal, vat, deliveryFee, serviceFee, total: subtotal + vat + deliveryFee + serviceFee };
}

/* ─── Saved on this device (all optional: private windows may block it) ─── */

export const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked: the page still works */
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

export const cartKey = (venueId) => `slhShopCart:${venueId}`;
export const CUSTOMER_KEY = "slhShopCustomer";
export const ORDERS_KEY = "slhShopOrders";

/* The last few orders placed on this device, for "Track your order" */
export function rememberOrder(entry) {
  const list = store.get(ORDERS_KEY, []).filter((o) => o.trackingCode !== entry.trackingCode);
  store.set(ORDERS_KEY, [{ ...entry, at: Date.now() }, ...list].slice(0, 6));
}

export const newOrderId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `o-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const t = document.createElement("textarea");
    t.value = text;
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand("copy");
    t.remove();
    return ok;
  }
}

/* Share sheet on phones, copy elsewhere → "shared" | "copied" | null */
export async function shareLink({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (e) {
      if (e?.name === "AbortError") return null;
    }
  }
  return (await copyText(url)) ? "copied" : null;
}

export const PAYMENT_LABELS = {
  card: { title: "Pay with card", sub: "Debit or credit card, paid securely with Paystack" },
  transfer: { title: "Bank transfer", sub: "Transfer to the venue's account after you order" },
  cashOnDelivery: {
    title: "Cash on delivery",
    sub: "Pay the rider when your order arrives",
    pickup: { title: "Pay cash at pickup", sub: "Pay at the counter when you collect" },
  },
  posOnDelivery: {
    title: "Card on delivery (POS)",
    sub: "The rider brings a POS terminal",
    pickup: { title: "Card at pickup (POS)", sub: "Pay by card at the counter" },
  },
};

export const paymentLabel = (id, fulfilment) => {
  const l = PAYMENT_LABELS[id] || { title: id, sub: "" };
  return fulfilment === "pickup" && l.pickup ? l.pickup : l;
};
