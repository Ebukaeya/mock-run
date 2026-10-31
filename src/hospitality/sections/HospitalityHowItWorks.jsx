import { useEffect, useRef, useState } from "react";
import { BarChart3, Building2, ChefHat, ClipboardList, CreditCard, LayoutGrid, Users } from "lucide-react";
import useInView from "../useInView";
import "./HospitalityHowItWorks.css";

const STEPS = [
  {
    icon: Building2,
    title: "Set up your business",
    text: "Pick restaurant, cafe, bar or hotel, then add your venues, kitchens and store rooms.",
    tags: ["Venues", "Kitchens", "Storage"],
  },
  {
    icon: LayoutGrid,
    title: "Configure the menu",
    text: "Add categories, items and prices, and choose which kitchen prepares each item.",
    tags: ["Categories", "Prices", "Routing"],
  },
  {
    icon: Users,
    title: "Add your staff",
    text: "Cashiers, waiters, kitchen staff and managers each get their own sign-in and permissions.",
    tags: ["Roles", "Permissions"],
  },
  {
    icon: ClipboardList,
    title: "Take orders",
    text: "At the table on a waiter's phone, at the counter on the till, or online from your ordering page.",
    tags: ["Waiter app", "Sales Point", "Online"],
  },
  {
    icon: ChefHat,
    title: "Cook and serve",
    text: "The kitchen display and ticket printer receive each order. Waiters are told when it's ready.",
    tags: ["Display", "Tickets", "Ready alerts"],
  },
  {
    icon: CreditCard,
    title: "Collect payment",
    text: "Cash, transfer, POS terminal or card, split across methods if the table wants. Receipt printed or sent.",
    tags: ["Split bills", "Receipts"],
  },
  {
    icon: BarChart3,
    title: "Read the numbers",
    text: "Sales, cost of goods, profit, expenses and VAT, for today, this week or any date range.",
    tags: ["Profit", "VAT", "Trends"],
  },
];

function Step({ step, index }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const Icon = step.icon;
  return (
    <li ref={ref} className={`slh-how__step ${index % 2 ? "slh-how__step--r" : ""} ${inView ? "is-in" : ""}`}>
      <span className='slh-how__dot'>
        <Icon size={20} />
      </span>
      <div className='slh-how__card'>
        <span className='slh-how__n'>Step {index + 1}</span>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <div className='slh-how__tags'>
          {step.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </li>
  );
}

/* 6. How it works: visual timeline that fills as you scroll */
export default function HospitalityHowItWorks() {
  const listRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const p = (mid - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className='slh-how' id='slh-how'>
      <div className='slh-wrap'>
        <div className='slh-how__head'>
          <span className='slh-eyebrow'>How it works</span>
          <h2 className='slh-h2'>From first setup to the end-of-day report.</h2>
        </div>
        <ol className='slh-how__list' ref={listRef}>
          <span className='slh-how__line' aria-hidden='true'>
            <i style={{ transform: `scaleY(${progress})` }} />
          </span>
          {STEPS.map((s, i) => (
            <Step key={s.title} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
