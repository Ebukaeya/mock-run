/*
 * StoreLense Hospitality website: everything you will want to change in one place.
 */

/* Real app screenshots and photos (from the proposal, training manual and your uploads) */
import shotSalesPoint from "./assets/screens/sales-point.jpg";
import shotDashboard from "./assets/screens/dashboard.jpg";
import shotAnalytics from "./assets/screens/analytics.jpg";
import shotTables from "./assets/screens/tables.jpg";
import shotOnlineOrders from "./assets/screens/online-orders.jpg";
import shotOnlineOrdersMobile from "./assets/screens/online-orders-mobile.jpg";
import shotKitchen from "./assets/screens/kitchen.jpg";
import shotWarehouse from "./assets/screens/warehouse.jpg";
import shotStaff from "./assets/screens/staff.jpg";
import shotPayment from "./assets/screens/payment.jpg";
import shotCatalogue from "./assets/screens/catalogue.jpg";
import shotVenueAds from "./assets/screens/venue-ads.jpg";
import photoInterior from "./assets/photos/restaurant-interior.jpg";
import photoService from "./assets/photos/restaurant-service.jpg";
import photoAward from "./assets/photos/award.jpg";
import photoBooth from "./assets/photos/team-booth.jpg";
import photoPosHeld from "./assets/photos/storelense-pos-held.jpg";
import photoDevices from "./assets/photos/devices-table.jpg";
import photoField1 from "./assets/photos/field-1.jpg";
import photoField2 from "./assets/photos/field-2.jpg";
import photoField3 from "./assets/photos/field-3.jpg";
import sampleVideo from "./assets/video/storelense-field.mp4";
import trainingManual from "./assets/docs/storelense-hospitality-training-manual.pdf";
import manualCover from "./assets/docs/manual-cover.jpg";
import logo from "./assets/storelense-logo.webp";

export const HOSPITALITY_ROUTE = "/hospitality";
export const LOGO = logo;

/* Phone and WhatsApp (from the proposal and banners) */
const PHONE_DISPLAY = "0815 927 3522";
const PHONE_INTL = "+2348159273522";
const WHATSAPP_NUMBER = "2348159273522";

export const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const contact = {
  company: "Pragma Solutions Ltd",
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_INTL}`,
  whatsapp: wa("Hi StoreLense, I'd like to know more about StoreLense Hospitality."),
  whatsappSales: wa("Hi StoreLense, I'd like to talk to sales about StoreLense Hospitality."),
  whatsappDemo: wa("Hi StoreLense, I'd like to book a free demo of StoreLense Hospitality."),
  website: "www.storelense.com",
  hours: "Mon – Sat, 8am – 8pm (WAT)",
};

export const links = {
  home: "/",
  getStarted: "https://storelensehospitality.com", // sign-up page of the Hospitality web app
  openWebApp: "https://storelensehospitality.com",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
};

/* Social handles: StorelensePos */
export const social = [
  { id: "facebook", label: "Facebook", handle: "StorelensePos", url: "https://www.facebook.com/search/top?q=storelense%20pos" },
  { id: "instagram", label: "Instagram", handle: "@storelensepos", url: "https://www.instagram.com/storelensepos" },
  { id: "tiktok", label: "TikTok", handle: "@storelensepos", url: "https://www.tiktok.com/@storelensepos" },
  { id: "x", label: "X", handle: "Pragma Solutions Ltd", url: null }, // add the X profile link
];

/*
 * Downloads. All apps are live. Paste each download link; until a link is set,
 * its button opens WhatsApp asking the team for that link.
 */
export const downloads = {
  windows: {
    name: "StoreLense Hospitality for Windows",
    version: "1.0.0",
    fileType: ".exe installer, 64-bit",
    fileSize: null, // e.g. "92 MB"
    url: "https://github.com/Ebukaeya/storelense-hospitality-windows/releases/download/v1.0.0/StoreLense-Hospitality-Setup-1.0.0-x64.exe", // StoreLense-Hospitality-Setup-x.y.z-x64.exe on your download server
    url32: null,
    requirements: ["Windows 10 or 11", "4 GB RAM, 300 MB free space", "Internet for the first sign-in", "Optional: 80 mm receipt printer and cash drawer"],
    steps: [
      "Download the installer and open it.",
      "Sign in with your StoreLense Hospitality account.",
      "Press Ctrl + , to pick the receipt printer and print a test receipt.",
    ],
  },
  pos: {
    name: "StoreLense POS app",
    version: "1.0.0",
    fileSize: "85 MB",
    apkUrl: "/downloads/storelense_Hospitality_z100.apk", // the APK for StoreLense POS devices
    devices: ["StoreLense POS (built-in receipt printer)", "StoreLense Mini (handheld, tap-to-pay)"],
    steps: [
      "New devices arrive with the app installed and your venue set up.",
      "To reinstall, open the APK link on the device and allow the install.",
      "Sign in, then open Printer settings and print a test slip.",
    ],
  },
  mobile: {
    name: "StoreLense mobile app",
    playStoreUrl: null, // Google Play listing
    appStoreUrl: null, // Apple App Store listing
    minAndroid: "Android 7.0 or newer",
    minIos: "iOS 15 or newer",
    uses: ["Waiters take orders at the table", "Owners check sales from anywhere", "Online orders arrive with a sound"],
  },
};

/* Real screenshots used inside the device frames. null = built-in recreation (with the StoreLense logo). */
export const screenshots = {
  salesPoint: shotSalesPoint,
  dashboard: shotDashboard,
  analytics: shotAnalytics,
  tables: shotTables,
  onlineOrders: shotOnlineOrders,
  onlineOrdersMobile: shotOnlineOrdersMobile,
  kitchen: shotKitchen,
  storage: shotWarehouse,
  staff: shotStaff,
  payment: shotPayment,
  menu: shotCatalogue,
  // recreations (no screenshot in the documents yet)
  salesPointPos: null,
  waiter: null,
  online: null,
  rooms: null,
  barTabs: null,
};

export const images = {
  venueAds: shotVenueAds,
  interior: photoInterior,
  service: photoService,
  award: photoAward,
  booth: photoBooth,
  posHeld: photoPosHeld,
  devices: photoDevices,
  field1: photoField1,
  field2: photoField2,
  field3: photoField3,
};

/* Photos for the large solution panels. null = brand artwork. */
export const photos = {
  restaurant: photoService,
  cafe: null,
  bar: null,
  hotel: null,
};

/* Each venue's live ordering link. Change the example to match your real URL pattern. */
export const venueLink = {
  base: "storelense.com/restaurant/", // matches the site's /restaurant/:venueId route (also /bar and /cafe)
  exampleSlug: "RST-000R1",
  exampleVenue: "Mama Tobi's Kitchen",
};

/*
 * Plans. Limits match the server's plan limits (maxVenue, maxKitchen,
 * maxWarehouse, maxProducts, freeAdvertHours). Prices in naira; sixMonths is
 * the price billed every 6 months.
 * A limit of null shows "Unlimited"; a string is shown as written.
 */
export const pricing = {
  currency: "\u20a6",
  sixMonthSaving: "Save 10%",
  limitRows: [
    { key: "venues", label: "Venues" },
    { key: "kitchens", label: "Kitchens" },
    { key: "storages", label: "Storage locations" },
    { key: "menuItems", label: "Menu items" },
    { key: "adHours", label: "Free ad hours a month" },
  ],
  plans: [
    {
      id: "starter",
      name: "Starter",
      monthly: 0,
      sixMonths: 0,
      blurb: "Try StoreLense with no card.",
      limits: { venues: 1, kitchens: 1, storages: 0, menuItems: 50, adHours: 24 },
      extras: ["Online ordering link", "Works offline"],
    },
    {
      id: "basic",
      name: "Basic User",
      monthly: 3500,
      sixMonths: 19000,
      blurb: "The essentials for one venue.",
      limits: { venues: 1, kitchens: 1, storages: 0, menuItems: 250, adHours: 24 },
      extras: ["Business KPI tracking", "Free staff training"],
    },
    {
      id: "super",
      name: "Super User",
      monthly: 9500,
      sixMonths: 55000,
      blurb: "For growing venues.",
      featured: true,
      limits: { venues: 2, kitchens: 4, storages: 3, menuItems: 1500, adHours: 60 },
      extras: ["Free hardware installation", "10% off extra services"],
    },
    {
      id: "premium",
      name: "Premium",
      monthly: 22500,
      sixMonths: 125000,
      blurb: "For groups with many venues.",
      limits: { venues: 4, kitchens: 10, storages: 6, menuItems: 11200, adHours: 150 },
      extras: ["Hardware leasing options", "30% off extra services"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthly: null,
      sixMonths: null,
      blurb: "Hotels, chains and custom setups.",
      limits: { venues: null, kitchens: null, storages: null, menuItems: null, adHours: "Custom" },
      extras: ["Hotel rooms and folios", "A dedicated account manager"],
    },
  ],
};

/*
 * Customer stories. Replace these with real, approved quotes and set sample: false.
 * While sample is true, the card shows an "Example" label so it is never mistaken for a real review.
 *
 * YouTube: paste the video link into `youtube` on a story, e.g.
 *   youtube: "https://www.youtube.com/watch?v=AbCdEfGhIjK"
 * Short links (youtu.be/...) and Shorts (youtube.com/shorts/...) work too.
 * When that story is showing, the player plays its video; stories without a
 * video show the featured video below.
 */
export const testimonials = [
  {
    sample: true,
    quote: "Orders used to get lost between the floor and the kitchen. Now every ticket shows up on the screen the moment the waiter sends it.",
    name: "Chinnels Alpha Services",
    role: "Owner",
    venue: "Restaurant, Lekki",
    type: "Restaurant",
    rating: 5,
    youtube: null,
  },
  {
    sample: true,
    quote: "Our online link brings in orders every evening, and they go straight to the kitchen already paid.",
    name: "Alex Obinna",
    role: "Manager",
    venue: "Caf\u00e9, Ikeja",
    type: "Caf\u00e9",
    rating: 5,
    youtube: null,
  },
  {
    sample: true,
    quote: "I can see what every bar sold tonight from my phone, and the stock count finally matches.",
    name: "Magnus Kingsley",
    role: "Owner",
    venue: "Lounge, Abuja",
    type: "Bar",
    rating: 5,
    youtube: null,
  },
];

/*
 * Featured video, shown beside the customer stories.
 * To use YouTube: paste the link into `youtube` (it takes priority over src).
 * The thumbnail comes from YouTube automatically unless you set a poster.
 */
export const featuredVideo = {
  youtube: "https://www.youtube.com/watch?v=01WcmfBKahY", // e.g. "https://www.youtube.com/watch?v=AbCdEfGhIjK"
  src: sampleVideo, // used only when youtube is empty
  poster: photoField1, // set to null to use the YouTube thumbnail
  title: "On the ground with StoreLense",
  caption: "Our team setting up businesses across Nigeria.",
};

/* Team and recognition */
export const team = {
  photos: [photoBooth, photoField1, photoField2, photoField3, photoPosHeld],
  award: {
    photo: photoAward,
    title: "Honoured at the Skill-Lift business programme",
    text: "StoreLense was recognised at the Skill-Lift business programme for helping Nigerian businesses run smarter and grow.",
  },
};

/* The training manual (PDF), downloadable from the page */
export const manual = {
  file: trainingManual,
  fileName: "StoreLense-Hospitality-Training-Manual.pdf",
  pages: 63,
  size: "6.9 MB",
};

/*
 * Resources.
 *   file  - a document to download (opens at `page` when given)
 *   video - a YouTube link; the card opens it
 *   href  - any other link
 * With none of these, the card asks the team on WhatsApp.
 */
export const resources = [
  {
    type: "Docs",
    title: "StoreLense Hospitality training manual",
    text: "Every screen, step by step, for owners, cashiers, waiters and kitchen staff.",
    file: trainingManual,
    fileName: manual.fileName,
    meta: `PDF \u00b7 ${manual.pages} pages \u00b7 ${manual.size}`,
    cover: manualCover,
    featured: true,
  },
  {
    type: "Guide",
    title: "Getting started",
    text: "Open your account, choose a plan and sign in.",
    file: trainingManual,
    page: 5,
    meta: "Manual, chapter 2",
  },
  {
    type: "Guide",
    title: "Set up your business",
    text: "Venues, kitchens, storage, receipt details and tables.",
    file: trainingManual,
    page: 13,
    meta: "Manual, chapter 4",
  },
  {
    type: "Guide",
    title: "Menu and catalogue",
    text: "Categories, variants, modifiers and kitchen routing.",
    file: trainingManual,
    page: 17,
    meta: "Manual, chapter 5",
  },
  {
    type: "Docs",
    title: "Staff and access",
    text: "Roles, privileges and staff sign-in.",
    file: trainingManual,
    page: 20,
    meta: "Manual, chapter 6",
  },
  {
    type: "Docs",
    title: "Online orders",
    text: "Accept, cook, send out and mark delivered.",
    file: trainingManual,
    page: 45,
    meta: "Manual, chapter 13",
  },
  {
    type: "Video",
    title: "Take your first order",
    text: "From the table to the kitchen screen.",
    video: null, // paste a YouTube link here
    meta: "4 min watch",
  },
  {
    type: "Install",
    title: "Install on Windows",
    text: "Printer, cash drawer and till mode.",
    video: null, // paste a YouTube link here
    meta: "5 min watch",
  },
];

export const faqs = [
  {
    q: "Does it work when the internet goes off?",
    a: "Yes. The till keeps selling and saves every sale on the device. Everything is sent in order when the connection comes back, and nothing is sent twice.",
  },
  {
    q: "How do customers order online?",
    a: "Every venue gets its own live link. Share it on WhatsApp, Instagram or a QR code on the table. Customers order and pay, and the order arrives on your screen with a sound.",
  },
  {
    q: "Which devices can I use?",
    a: "Windows laptops and PCs, StoreLense POS and StoreLense Mini, Android and iOS phones and tablets, and any web browser.",
  },
  {
    q: "How do customers pay?",
    a: "Cash, bank transfer, Kuda, OPay and Moniepoint POS terminals, and card for online orders. You can split a bill across methods.",
  },
  {
    q: "Do you help us set up?",
    a: "Yes. We give a free demo at your venue, set up your venues, menu and tables with you, train your staff and stay close through the first week.",
  },
  {
    q: "Is our data safe?",
    a: "We comply with Nigerian data protection regulations, including the Nigeria Data Protection Act 2023. Your business and customer data stay private and are never sold.",
  },
];
