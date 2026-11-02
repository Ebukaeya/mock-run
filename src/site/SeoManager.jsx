import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://storelense.com";
const DEFAULT_IMAGE = `${SITE}/og-storelense.jpg`;

/* Description and share title for each public page. Page titles stay set by each page. */
const PAGES = {
  "/": {
    title: "StoreLense | POS & Inventory for Shops, Supermarkets, Restaurants and Hotels",
    description:
      "StoreLense is a POS and inventory system for Nigerian businesses: retail stores, supermarkets, warehouses, restaurants, cafés, bars and hotels. Sell faster, track stock in real time and accept payments with Kuda.",
  },
  "/hospitality": {
    title: "StoreLense Hospitality | POS for Restaurants, Cafés, Bars and Hotels",
    description:
      "POS for Nigerian restaurants, cafés, bars and hotels. Take table and room orders, send orders to the kitchen, track food storage and stock, and accept online orders.",
  },
  "/solutions/retail-stores": {
    title: "POS for Retail Stores and Supermarkets | StoreLense",
    description:
      "Sell faster with barcode scanning, receipts and real-time stock on StoreLense POS, made for retail stores, supermarkets and wholesalers in Nigeria.",
  },
  "/solutions/inventory-management": {
    title: "Inventory Management Software | StoreLense",
    description:
      "Track stock across stores and warehouses in real time, get low-stock alerts and move products between locations with StoreLense inventory management.",
  },
  "/solutions/warehouse-integration": {
    title: "Warehouse Integration | StoreLense",
    description: "Connect your warehouses and stores in one system. Move stock between locations and see what you have everywhere with StoreLense.",
  },
  "/solutions/analytics": {
    title: "Sales Reports and Analytics | StoreLense",
    description: "See sales, profit, best-selling products and staff performance with clear StoreLense reports, on your phone or computer.",
  },
  "/solutions/ecommerce": {
    title: "Sell Online with Shurplug | StoreLense",
    description: "Put your StoreLense products online with Shurplug and keep your online and in-store stock in sync.",
  },
  "/pos-setup": {
    title: "POS Hardware: StoreLense POS, Mini and Accessories | StoreLense",
    description:
      "Get a StoreLense POS terminal, StoreLense Mini, receipt printers, barcode scanners and label printers, with free setup for your store or restaurant.",
  },
  "/services": {
    title: "Services: Free Setup, Training and Support | StoreLense",
    description: "Free POS installation and staff training, product listing, customer support and yearly performance reports from StoreLense.",
  },
  "/demo": {
    title: "Demo and Video Tutorials | StoreLense",
    description: "Watch StoreLense demos and step-by-step video tutorials for selling, managing stock and running reports.",
  },
  "/contact": {
    title: "Contact StoreLense | Abakaliki and Aba Offices",
    description: "Talk to StoreLense on WhatsApp or call 0815 927 3522. Visit our offices in Abakaliki, Ebonyi State and Aba, Abia State.",
  },
  "/data-policy": {
    title: "Privacy Policy | StoreLense",
    description: "How StoreLense collects, uses and protects your data, in line with the Nigeria Data Protection Act.",
  },
  "/terms": {
    title: "Terms of Service | StoreLense",
    description: "The terms for using StoreLense POS, inventory and hospitality services.",
  },
};

/* Pages search engines should skip */
const PRIVATE = ["/check-out", "/sign-up", "/verify_email", "/delete-account", "/bookedOrders", "/portals", "/track", "/demo/spashScreen"];

const setMeta = (attr, key, content) => {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setCanonical = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

/* Keeps description, canonical link and share tags right for the page being viewed */
export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
    const venue = /^\/(restaurant|bar|cafe)\//.test(path);
    const storeCatalogue = path.startsWith("/stores/");
    const page =
      PAGES[path] ||
      (venue && { title: document.title, description: "See the menu and order online. Powered by StoreLense Hospitality." }) ||
      (storeCatalogue && { title: document.title, description: "Browse products and prices online. Powered by StoreLense." }) ||
      PAGES["/"];
    const url = `${SITE}${path === "/" ? "/" : path}`;
    /* Private pages, and addresses that aren't a page (404), stay out of search */
    const hidden = PRIVATE.some((p) => path === p || path.startsWith(`${p}/`)) || (!PAGES[path] && !venue && !storeCatalogue);

    setMeta("name", "description", page.description);
    setMeta("name", "robots", hidden ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setCanonical(url);

    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", DEFAULT_IMAGE);
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
  }, [pathname]);

  return null;
}
