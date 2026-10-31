import { useMemo, useState } from "react";
import { Armchair, BarChart3, ChefHat, Globe, LayoutGrid, ShoppingBag, Smartphone, Warehouse } from "lucide-react";
import useInView from "../useInView";
import "./HospitalityEcosystem.css";

const MODULES = [
  {
    id: "pos",
    label: "POS / Sales Point",
    icon: ShoppingBag,
    text: "Takeaway and delivery sales, table bills, split payments and receipts, on Windows, StoreLense POS or any browser.",
  },
  {
    id: "waiter",
    label: "Waiter Ordering",
    icon: Smartphone,
    text: "Waiters take orders at the table on Android phones and send them straight through.",
  },
  {
    id: "menu",
    label: "Menu Management",
    icon: LayoutGrid,
    text: "One menu for every screen: prices, categories, availability and which kitchen prepares each item.",
  },
  {
    id: "tables",
    label: "Table Management",
    icon: Armchair,
    text: "A live floor plan: who is seated, what they ordered, how long they've waited and who asked for the bill.",
  },
  {
    id: "kitchen",
    label: "Kitchen Operations",
    icon: ChefHat,
    text: "Orders arrive on the kitchen display and print as tickets, one per station, with timers for late orders.",
  },
  {
    id: "storage",
    label: "Storage Management",
    icon: Warehouse,
    text: "Menu stock and ingredients across store rooms, moved to venues and kitchens with every move recorded.",
  },
  {
    id: "online",
    label: "Online Orders",
    icon: Globe,
    text: "Every venue gets its own live ordering link. Paid orders arrive with a sound and go to the kitchen in one tap.",
  },
  {
    id: "analytics",
    label: "Business Analytics",
    icon: BarChart3,
    text: "Revenue, cost of sales, profit, expenses and VAT, built from every sale and stock move.",
  },
];

/* Who sends what to whom */
const FLOWS = [
  ["menu", "pos", "Items and prices"],
  ["menu", "waiter", "Items and prices"],
  ["menu", "online", "Online menu"],
  ["menu", "kitchen", "Kitchen routing"],
  ["waiter", "tables", "Orders per table"],
  ["waiter", "kitchen", "Order tickets"],
  ["tables", "pos", "Bills to settle"],
  ["pos", "kitchen", "Takeaway orders"],
  ["online", "kitchen", "Online orders"],
  ["kitchen", "waiter", "Ready to serve"],
  ["kitchen", "storage", "Ingredients used"],
  ["pos", "analytics", "Sales & payments"],
  ["storage", "analytics", "Cost of stock"],
];

const W = 1000;
const H = 640;
const CX = W / 2;
const CY = H / 2;

/* 4. Product ecosystem: interactive connected diagram */
export default function HospitalityEcosystem() {
  const [active, setActive] = useState("kitchen");
  const [ref, inView] = useInView({ threshold: 0.2 });

  const nodes = useMemo(
    () =>
      MODULES.map((m, i) => {
        const a = (-90 + i * 45) * (Math.PI / 180);
        return { ...m, x: CX + Math.cos(a) * 400, y: CY + Math.sin(a) * 250 };
      }),
    [],
  );
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const current = byId[active];
  const sends = FLOWS.filter((f) => f[0] === active);
  const gets = FLOWS.filter((f) => f[1] === active);
  const linked = new Set([active, ...sends.map((f) => f[1]), ...gets.map((f) => f[0])]);

  const curve = (a, b) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const qx = mx + (CX - mx) * 0.45;
    const qy = my + (CY - my) * 0.45;
    return `M${a.x},${a.y} Q${qx},${qy} ${b.x},${b.y}`;
  };

  return (
    <section className='slh-eco' id='slh-ecosystem'>
      <div className='slh-wrap'>
        <div className='slh-eco__head'>
          <span className='slh-eyebrow slh-eco__eyebrow'>Product ecosystem</span>
          <h2 className='slh-h2 slh-eco__title'>Eight modules. One live picture.</h2>
          <p className='slh-lead slh-eco__lead'>
            Tap a module to see what it sends and receives. Everything syncs in real time across every device.
          </p>
        </div>

        <div className='slh-eco__stage'>
          <div className={`slh-eco__map ${inView ? "is-in" : ""}`} ref={ref}>
            <svg className='slh-eco__svg' viewBox={`0 0 ${W} ${H}`} preserveAspectRatio='none' aria-hidden='true'>
              <ellipse cx={CX} cy={CY} rx='400' ry='250' className='slh-eco__orbit' />
              {nodes.map((n) => (
                <line key={`spoke-${n.id}`} x1={CX} y1={CY} x2={n.x} y2={n.y} className='slh-eco__spoke' />
              ))}
              {FLOWS.map(([from, to]) => {
                const on = from === active || to === active;
                return (
                  <path
                    key={`${from}-${to}`}
                    d={curve(byId[from], byId[to])}
                    className={`slh-eco__flow ${on ? "is-on" : ""} ${on && from === active ? "is-out" : ""}`}
                  />
                );
              })}
            </svg>

            {nodes.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  type='button'
                  key={n.id}
                  className={`slh-eco__node ${n.id === active ? "is-active" : ""} ${linked.has(n.id) ? "is-linked" : ""}`}
                  style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
                  onClick={() => setActive(n.id)}
                  onMouseEnter={() => setActive(n.id)}
                  aria-pressed={n.id === active}
                >
                  <span className='slh-eco__ic'>
                    <Icon size={22} />
                  </span>
                  <span className='slh-eco__label'>{n.label}</span>
                </button>
              );
            })}
          </div>

          <div className='slh-eco__hub' key={active}>
            <span className='slh-eco__hubTag'>Shared data · real-time sync</span>
            <b>{current.label}</b>
            <p>{current.text}</p>
            <div className='slh-eco__io'>
              {gets.length > 0 && (
                <div>
                  <small>Receives</small>
                  {gets.map((f) => (
                    <span key={f[0]}>
                      {f[2]} <em>from {byId[f[0]].label.split(" /")[0]}</em>
                    </span>
                  ))}
                </div>
              )}
              {sends.length > 0 && (
                <div>
                  <small>Sends</small>
                  {sends.map((f) => (
                    <span key={f[1]}>
                      {f[2]} <em>to {byId[f[1]].label.split(" /")[0]}</em>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
