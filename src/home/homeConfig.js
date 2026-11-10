/*
 * StoreLense website (stores): everything you will want to change in one place.
 * The Hospitality page has its own config in src/hospitality/hospitalityConfig.js.
 */

/* Recent StoreLense app screenshots (currency shown in naira) */
import shotSalesPoint from "./assets/screens/sales-point.jpg";
import shotScan from "./assets/screens/scan-handheld.jpg";
import shotCheckout from "./assets/screens/part-payment.jpg";
import shotSalesBook from "./assets/screens/sales-book.jpg";
import mSell from "./assets/screens/m-sell.jpg";
import shotBusinesses from "./assets/screens/businesses.jpg";
import shotDashboard from "./assets/screens/dashboard.jpg";
import shotTransactions from "./assets/screens/transactions.jpg";
import shotAnalytics from "./assets/screens/analytics.jpg";
import mProducts from "./assets/screens/m-products.jpg";
import mSalesBook from "./assets/screens/m-sales-book.jpg";
import mInsights from "./assets/screens/m-insights.jpg";
import mFindSale from "./assets/screens/m-find-sale.jpg";
import mSalesRecord from "./assets/screens/m-sales-record.jpg";
import salesGuide from "./assets/docs/storelense-sales-point-training-guide.pdf";
import salesGuideCover from "./assets/docs/guide-cover.jpg";

/* Existing site images */
import heroWoman from "../assessStatic/pictures/webstoreIm/storelenseBImage.webp";
import posFront from "../assessStatic/pictures/posImage/frontView.png";
import posSide from "../assessStatic/pictures/posImage/sideView.png";
import posBack from "../assessStatic/pictures/posImage/backView.png";
import clientHandoff from "../assessStatic/pictures/clients/client-cjp-watches-handoff.jpg";
import clientDeskWide from "../assessStatic/pictures/clients/client-cjp-watches-desk-wide.jpg";
import clientDeskClose from "../assessStatic/pictures/clients/client-cjp-watches-desk-close.jpg";
import clientTeam from "../assessStatic/pictures/clients/client-cjp-watches-team.jpg";
import clientPhone from "../assessStatic/pictures/clients/client-phone-accessories.jpg";
import clientInteriors from "../assessStatic/pictures/clients/client-interiors-store.jpg";
import posHeld from "./assets/storelense-pos-held.jpg";
import posAndMini from "./assets/storelense-pos-and-mini.jpg";

export const screens = {
  salesPoint: shotSalesPoint,
  scan: shotScan,
  checkout: shotCheckout,
  salesBook: shotSalesBook,
  mSell,
  businesses: shotBusinesses,
  dashboard: shotDashboard,
  transactions: shotTransactions,
  analytics: shotAnalytics,
  mProducts,
  mSalesBook,
  mInsights,
  mFindSale,
  mSalesRecord,
};

export const images = {
  heroWoman,
  posFront,
  posSide,
  posBack,
};

export const hardware = {
  views: [
    { id: "front", label: "Front", src: posFront },
    { id: "side", label: "Side", src: posSide },
    { id: "back", label: "Back", src: posBack },
  ],
  photoHeld: posHeld,
  photoBoth: posAndMini,
};

export const clients = [
  { src: clientHandoff, name: "CJP Watches", tag: "Walking through the first sale", wide: true },
  { src: clientDeskWide, name: "CJP Watches", tag: "Front desk, ready for customers" },
  { src: clientDeskClose, name: "CJP Watches", tag: "Confirming payment on the spot" },
  { src: clientTeam, name: "CJP Watches", tag: "Terminal handover day" },
  { src: clientPhone, name: "Phone Accessories Store", tag: "Setting up at the counter", wide: true },
  { src: clientInteriors, name: "DMARK Interiors", tag: "Running checkout between customers" },

  /*
   * Space for more owners. Import the photo at the top of this file, then set
   * src, name and tag, e.g.
   *   { src: clientMamaT, name: "Mama T Supermarket", tag: "Busy Saturday checkout" },
   * Add wide: true to make a photo take a large tile.
   * Slots with src: null show as "Next on the wall" tiles; delete them when you
   * no longer want them. You can add as many entries as you like.
   */
  {
    src: "https://res.cloudinary.com/ebuka1122/image/upload/v1793477801/allAssets/marvin_skincare_tmdsbr.jpg",
    name: "Marvin Skincare",
    tag: "Store sticker to view catalogue",
  },
  { src: null, name: "", tag: "" },
];

/*
 * Explainer video (shown under the hero).
 * Paste the YouTube link into `youtube`, e.g.
 *   youtube: "https://www.youtube.com/watch?v=AbCdEfGhIjK"
 * youtu.be/... and youtube.com/shorts/... links work too.
 * Until a link is set, a "coming soon" placeholder shows.
 * poster: optional cover image; when empty, the video's YouTube thumbnail is used.
 */
export const explainer = {
  youtube: "https://www.youtube.com/watch?v=LF2JI-w97YA",
  poster: "https://res.cloudinary.com/ebuka1122/image/upload/v1793477353/allAssets/Sk%C3%A6rmbillede_2026-10-31_210736_h5cbhl.png",
  title: "See StoreLense in action",
  length: "About 2 minutes",
  points: ["Sell from the Sales Point and print a receipt", "Track stock across stores and warehouses", "Check the day's sales from your phone"],
};

/* Payments with Kuda Bank */
export const payments = {
  partner: "Kuda Bank",
  sampleAmount: "25,000.00",
  features: [
    { id: "fast", title: "Fast", text: "Receive payments in real time." },
    { id: "secure", title: "Secure", text: "Bank-grade security you can trust." },
    { id: "seamless", title: "Seamless", text: "Smooth transactions for you and your customers." },
  ],
  steps: [
    "Make the sale on StoreLense",
    "Choose Kuda terminal to process payment",
    "Storelense send the request to your Kuda terminal",
    "Customer pays the amount on the Kuda terminal",
    "Money lands in your Kuda account",
    "StoreLense confirms the payment and prints a receipt",
  ],
};

/* Contact details, links and social handles are shared: see src/site/siteConfig.js */

/*
 * Downloads.
 * StoreLense POS devices install the app from the APK below.
 * Phones and tablets install from Google Play and the App Store.
 * Until a link is set, its button asks the team on WhatsApp.
 */
export const downloads = {
  pos: {
    name: "StoreLense POS app",
    version: "1.0.3",
    apkUrl: "https://github.com/Ebukaeya/storelense-POS-z100/releases/download/v1.03/StorlensePOS_z100.apk", // paste the StoreLense POS APK link (package com.storelense.storelensepos)

    fileSize: "107 MB",
    devices: ["StoreLense POS (built-in receipt printer)", "StoreLense Mini (handheld, tap-to-pay)"],
    steps: [
      "Open this page on the POS device and tap Download APK.",
      "Allow “Install unknown apps” for your browser when asked.",
      "Open StoreLense POS, sign in and print a test receipt.",
    ],
  },
  web: {
    name: "StoreLense in your browser",
    url: "https://www.app.storelense.com",
    label: "app.storelense.com",
  },
  mobile: {
    name: "StoreLense mobile app",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ebukaeya.webstoreWV", // Google Play listing
    appStoreUrl: null, // Apple App Store listing
    uses: ["Sell from your phone", "Restock and check stock", "Track credit and part payments", "See sales and profit"],
  },
  guide: {
    file: salesGuide,
    cover: salesGuideCover,
    fileName: "StoreLense-Sales-Point-Training-Guide.pdf",
    pages: 13,
    size: "1.7 MB",
  },
};

/*
 * Plans. Limits match the server (maxStore, maxWarehouse, maxProducts,
 * freeAdvertHours). Prices in naira; sixMonths is billed every 6 months.
 * wasMonthly is the old price shown struck through. planCode is the Paystack plan.
 */
export const pricing = {
  currency: "₦",
  sixMonthSaving: "Save 10%",
  limitRows: [
    { key: "stores", label: "Stores" },
    { key: "warehouses", label: "Warehouses" },
    { key: "products", label: "Products" },
    { key: "adHours", label: "Free ad hours a month" },
  ],
  plans: [
    {
      id: "starter",
      name: "Starter",
      monthly: 0,
      sixMonths: 0,
      blurb: "Try StoreLense with no card.",
      limits: { stores: 1, warehouses: 0, products: 50, adHours: 24 },
      extras: ["Sales Point and receipts", "Works offline"],
    },
    {
      id: "basic",
      name: "Basic User",
      monthly: 3500,
      wasMonthly: 7000,
      sixMonths: 19000,
      blurb: "The essentials for one store.",
      limits: { stores: 1, warehouses: 0, products: 250, adHours: 24 },
      extras: ["Business KPI tracking", "E-commerce hub", "Free staff training"],
      planCode: "PLN_lbro2p90abucr1i",
    },
    {
      id: "super",
      name: "Super User",
      monthly: 9500,
      wasMonthly: 17000,
      sixMonths: 55000,
      blurb: "For growing businesses.",
      featured: true,
      limits: { stores: 2, warehouses: 1, products: 1500, adHours: 60 },
      extras: ["Free hardware installation", "Hardware leasing options", "10% off extra services"],
      planCode: "PLN_gz3p2q94b9r0apg",
    },
    {
      id: "premium",
      name: "Premium",
      monthly: 22500,
      wasMonthly: 35500,
      sixMonths: 125000,
      blurb: "For groups with many locations.",
      limits: { stores: 5, warehouses: 3, products: 11200, adHours: 150 },
      extras: ["Free hardware installation", "30% off extra services"],
      planCode: "PLN_o0yjesxw73ffcvr",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthly: null,
      sixMonths: null,
      blurb: "Chains, distributors and custom setups.",
      limits: { stores: null, warehouses: null, products: null, adHours: "Custom" },
      extras: ["On-site setup for every store", "A dedicated account manager"],
    },
  ],
};
