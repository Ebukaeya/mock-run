import { Link } from "react-router-dom";
import { ArrowUpRight, Pill, ShoppingBasket, Store, Truck, UtensilsCrossed } from "lucide-react";
import "./HomeWhoFor.css";

const TYPES = [
  {
    icon: Pill,
    title: "Pharmacies & health stores",
    text: "Track batches and expiry dates, keep prescription stock accurate and limit who can change prices.",
    to: "/solutions/inventory-management",
  },
  {
    icon: Store,
    title: "Retail shops",
    text: "Electronics, fashion, cosmetics and phone shops: serial numbers, credit sales and quick receipts.",
    to: "/solutions/retail-stores",
  },
  {
    icon: ShoppingBasket,
    title: "Supermarkets & groceries",
    text: "Fast barcode checkout for busy counters, with stock synced across every till.",
    to: "/solutions/retail-stores",
  },
  {
    icon: Truck,
    title: "Importers & distributors",
    text: "Bulk stock in warehouses, moves to outlets and full history of who moved what.",
    to: "/solutions/warehouse-integration",
  },
];

/* Who StoreLense is for */
export default function HomeWhoFor() {
  return (
    <section className='slw-who' id='who'>
      <div className='slw-wrap'>
        <div className='slw-who__head'>
          <span className='slw-eyebrow'>Who it's for</span>
          <h2 className='slw-h2'>Made for the way Nigerian businesses sell.</h2>
        </div>
        <div className='slw-who__grid'>
          {TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <Link key={t.title} to={t.to} className='slw-who__card'>
                <span className='slw-who__ic'>
                  <Icon size={24} />
                </span>
                <b>{t.title}</b>
                <span>{t.text}</span>
                <ArrowUpRight className='slw-who__go' size={20} />
              </Link>
            );
          })}
          <Link to='/hospitality' className='slw-who__card slw-who__card--hosp'>
            <span className='slw-who__ic'>
              <UtensilsCrossed size={24} />
            </span>
            <b>Restaurants, cafés, bars & hotels</b>
            <span>Tables, kitchen display, online ordering link and recipes, on StoreLense Hospitality.</span>
            <ArrowUpRight className='slw-who__go' size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
