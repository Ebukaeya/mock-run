/*
 * StoreLense website: shared details used by the nav, footer and home page.
 */
import logoMark from "../assessStatic/pictures/storelenseMark.webp";

export const LOGO_MARK = logoMark;

const WHATSAPP_NUMBER = "2348159273522";
export const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const contact = {
  company: "Pragma Solutions Ltd",
  phoneDisplay: "0815 927 3522",
  phoneHref: "tel:+2348159273522",
  email: "admin@pragmasolutions.co",
  address: `Spera in Deo Park, Block 38, Abakaliki, Ebonyi State.
  => \n 
  No 68 Clifford Road, Aba, Abia State, Nigeria`,
  hours: "Mon – Fri, 9am – 6pm",
  whatsapp: wa("Hi StoreLense, I have a question."),
  whatsappSales: wa("Hi StoreLense, I'd like to talk to sales about StoreLense POS."),
  whatsappDemo: wa("Hi StoreLense, I'd like to book a free demo."),
};

export const links = {
  signUp: "/sign-up",
  getStarted: "/portals",
  demo: "/demo",
  posSetup: "/pos-setup",
  contact: "/contact",
  hospitality: "/hospitality",
  services: "/services",
  privacy: "/data-policy",
  terms: "/terms",
  deleteAccount: "/delete-account",
};

export const solutions = [
  {
    key: "retail",
    label: "Retail stores",
    desc: "POS terminal built for Nigerian retail",
    path: "/solutions/retail-stores",
  },
  {
    key: "inventory",
    label: "Inventory management",
    desc: "Stock counts that update with every sale",
    path: "/solutions/inventory-management",
  },
  {
    key: "warehouse",
    label: "Warehouse integration",
    desc: "Every location on one stock pool",
    path: "/solutions/warehouse-integration",
  },
  { key: "analytics", label: "Analytics", desc: "Sales trends, margins and peak hours", path: "/solutions/analytics" },
  { key: "ecommerce", label: "E-commerce", desc: "Sell online through Shurplug", path: "/solutions/ecommerce" },
];

/* Social handles: StorelensePos */
export const social = [
  { id: "facebook", label: "Facebook", handle: "StorelensePos", url: "https://www.facebook.com/search/top?q=storelense%20pos" },
  { id: "instagram", label: "Instagram", handle: "@storelensepos", url: "https://www.instagram.com/storelensepos" },
  { id: "tiktok", label: "TikTok", handle: "@storelensepos", url: "https://www.tiktok.com/@storelensepos" },
  { id: "x", label: "X", handle: "Pragma Solutions Ltd", url: null }, // add the X profile link
];
