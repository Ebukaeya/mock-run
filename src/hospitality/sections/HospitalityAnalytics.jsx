import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { BrowserWindow } from "../devices/DeviceFrames";
import useInView from "../useInView";
import "./HospitalityAnalytics.css";

/* Sample figures for the dashboard preview */
const PERIODS = {
  today: {
    label: "Today",
    revenue: 1385000,
    cogs: 532000,
    expenses: 268000,
    vat: 103875,
    change: [8.2, 3.1, 10.4, -2.0, 14.6, 8.2],
    trend: [20, 15, 42, 96, 128, 84, 52, 61, 118, 172, 206, 160],
    labels: ["10a", "", "12p", "", "2p", "", "4p", "", "6p", "", "8p", ""],
    pay: [44, 32, 19, 5],
  },
  week: {
    label: "7 days",
    revenue: 8420000,
    cogs: 3280000,
    expenses: 1960000,
    vat: 631500,
    change: [12.4, 6.9, 15.8, 3.4, 22.1, 12.4],
    trend: [880, 940, 910, 1080, 1420, 1790, 1400],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    pay: [46, 31, 17, 6],
  },
  month: {
    label: "30 days",
    revenue: 36240000,
    cogs: 14130000,
    expenses: 8410000,
    vat: 2718000,
    change: [9.7, 5.2, 12.6, 4.1, 18.3, 9.7],
    trend: [
      900, 1020, 980, 1150, 1380, 1520, 1240, 960, 1010, 1060, 1210, 1460, 1680, 1300, 990, 1050, 1120, 1260, 1540,
      1720, 1410, 1000, 1070, 1180, 1290, 1610, 1830, 1460, 1130, 1210,
    ],
    labels: [
      "1",
      "",
      "",
      "",
      "",
      "",
      "7",
      "",
      "",
      "",
      "",
      "",
      "",
      "14",
      "",
      "",
      "",
      "",
      "",
      "",
      "21",
      "",
      "",
      "",
      "",
      "",
      "",
      "28",
      "",
      "",
    ],
    pay: [47, 29, 16, 8],
  },
};

const PAY = [
  ["Bank transfer", "#1d6fd8"],
  ["POS card", "#003366"],
  ["Cash", "#8FB0FF"],
  ["Online (card)", "#C9D7F5"],
];

const TOP = [
  ["Jollof Rice & Chicken", 0.18],
  ["Suya Platter", 0.13],
  ["Star Lager", 0.11],
  ["Grilled Croaker Fish", 0.09],
  ["Chapman", 0.07],
];

const fmt = (v) => {
  if (v >= 1000000) return `₦${(v / 1000000).toFixed(2)}m`;
  if (v >= 1000) return `₦${Math.round(v / 1000).toLocaleString()}k`;
  return `₦${v}`;
};

function Kpi({ label, value, change, hint, strong }) {
  const up = change >= 0;
  return (
    <div className={`slh-ana__kpi ${strong ? "slh-ana__kpi--strong" : ""}`}>
      <small>{label}</small>
      <b>{fmt(value)}</b>
      <span className={up ? "is-up" : "is-down"}>
        {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        {Math.abs(change)}%{hint ? ` · ${hint}` : ""}
      </span>
    </div>
  );
}

function TrendChart({ data, labels }) {
  const w = 640;
  const h = 220;
  const max = Math.max(...data) * 1.15;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - (v / max) * h]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const last = pts[pts.length - 1];
  return (
    <div className='slh-ana__trend'>
      <div className='slh-ana__plot'>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio='none' aria-hidden='true'>
          <defs>
            <linearGradient id='slhAnaFill' x1='0' x2='0' y1='0' y2='1'>
              <stop offset='0%' stopColor='#1d6fd8' stopOpacity='0.28' />
              <stop offset='100%' stopColor='#1d6fd8' stopOpacity='0' />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1='0' x2={w} y1={h * g} y2={h * g} className='slh-ana__grid' />
          ))}
          <path d={area} fill='url(#slhAnaFill)' className='slh-ana__area' />
          <path d={line} className='slh-ana__line' />
        </svg>
        <span className='slh-ana__dot' style={{ left: `${(last[0] / w) * 100}%`, top: `${(last[1] / h) * 100}%` }} />
      </div>
      <div className='slh-ana__xl'>
        {labels.map((l, i) =>
          l ? (
            <span key={i} style={{ left: `${(i / (labels.length - 1)) * 100}%` }}>
              {l}
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
}

function Donut({ values }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox='0 0 140 140' className='slh-ana__donut' aria-hidden='true'>
      {values.map((v, i) => {
        const len = (v / 100) * c;
        const el = (
          <circle
            key={i}
            cx='70'
            cy='70'
            r={r}
            fill='none'
            stroke={PAY[i][1]}
            strokeWidth='18'
            strokeDasharray={`${len - 2} ${c - len + 2}`}
            strokeDashoffset={-offset}
            transform='rotate(-90 70 70)'
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

/* 8. Business analytics: executive dashboard showcase */
export default function HospitalityAnalytics() {
  const [period, setPeriod] = useState("week");
  const [ref, inView] = useInView({ threshold: 0.15 });
  const p = PERIODS[period];

  const calc = useMemo(() => {
    const gross = p.revenue - p.cogs;
    const net = gross - p.expenses;
    return {
      gross,
      net,
      margin: Math.round((gross / p.revenue) * 100),
      netMargin: Math.round((net / p.revenue) * 100),
    };
  }, [p]);

  const flow = [
    ["Revenue", p.revenue, "rev"],
    ["Cost of goods", -p.cogs, "neg"],
    ["Expenses", -p.expenses, "neg"],
    ["Net profit", calc.net, "net"],
  ];

  return (
    <section className='slh-ana' id='slh-analytics'>
      <div className='slh-wrap'>
        <div className='slh-ana__head'>
          <div>
            <span className='slh-eyebrow slh-ana__eyebrow'>Business analytics</span>
            <h2 className='slh-h2 slh-ana__title'>Know if tonight made money, tonight.</h2>
          </div>
          <div className='slh-ana__periods' role='tablist' aria-label='Period'>
            {Object.entries(PERIODS).map(([id, v]) => (
              <button
                key={id}
                type='button'
                role='tab'
                aria-selected={period === id}
                className={period === id ? "is-on" : ""}
                onClick={() => setPeriod(id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`slh-ana__window slh-reveal ${inView ? "is-in" : ""}`} ref={ref}>
          <BrowserWindow url='storelensehospitality.com/analytics'>
            <div className='slh-ana__dash' key={period}>
              <div className='slh-ana__bar'>
                <b>Executive overview</b>
                <span className='slh-ana__venue'>
                  All venues <ChevronDown size={14} />
                </span>
              </div>

              <div className='slh-ana__kpis'>
                <Kpi label='Revenue' value={p.revenue} change={p.change[0]} strong />
                <Kpi label='Cost of goods sold' value={p.cogs} change={p.change[1]} />
                <Kpi label='Gross profit' value={calc.gross} change={p.change[2]} hint={`${calc.margin}% margin`} />
                <Kpi label='Expenses' value={p.expenses} change={p.change[3]} />
                <Kpi label='Net profit' value={calc.net} change={p.change[4]} hint={`${calc.netMargin}%`} />
                <Kpi label='VAT collected (7.5%)' value={p.vat} change={p.change[5]} />
              </div>

              <div className='slh-ana__row'>
                <div className='slh-ana__card slh-ana__card--wide'>
                  <div className='slh-ana__cardHead'>
                    <b>Sales trend</b>
                    <span>{p.label}</span>
                  </div>
                  <TrendChart data={p.trend} labels={p.labels} />
                </div>
                <div className='slh-ana__card'>
                  <div className='slh-ana__cardHead'>
                    <b>Payment breakdown</b>
                  </div>
                  <div className='slh-ana__pay'>
                    <div className='slh-ana__donutWrap'>
                      <Donut values={p.pay} />
                      <span>
                        <b>{fmt(p.revenue)}</b>
                        <small>collected</small>
                      </span>
                    </div>
                    <ul>
                      {PAY.map(([l, c], i) => (
                        <li key={l}>
                          <i style={{ background: c }} />
                          <span>{l}</span>
                          <b>{p.pay[i]}%</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className='slh-ana__row slh-ana__row--3'>
                <div className='slh-ana__card'>
                  <div className='slh-ana__cardHead'>
                    <b>Profit analysis</b>
                  </div>
                  <div className='slh-ana__flow'>
                    {flow.map(([l, v, kind]) => (
                      <div key={l} className={`slh-ana__flowRow slh-ana__flowRow--${kind}`}>
                        <span>{l}</span>
                        <i>
                          <em style={{ width: `${(Math.abs(v) / p.revenue) * 100}%` }} />
                        </i>
                        <b>
                          {v < 0 ? "−" : ""}
                          {fmt(Math.abs(v))}
                        </b>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='slh-ana__card'>
                  <div className='slh-ana__cardHead'>
                    <b>Best sellers</b>
                    <span>by revenue</span>
                  </div>
                  <ol className='slh-ana__top'>
                    {TOP.map(([n, share]) => (
                      <li key={n}>
                        <span>{n}</span>
                        <b>{fmt(p.revenue * share)}</b>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className='slh-ana__card slh-ana__card--vat'>
                  <div className='slh-ana__cardHead'>
                    <b>VAT summary</b>
                  </div>
                  <p>
                    <span>Taxable sales</span>
                    <b>{fmt(p.revenue - p.vat)}</b>
                  </p>
                  <p>
                    <span>Output VAT 7.5%</span>
                    <b>{fmt(p.vat)}</b>
                  </p>
                  <p>
                    <span>Orders</span>
                    <b>{Math.round(p.revenue / 6558).toLocaleString()}</b>
                  </p>
                  <span className='slh-ana__export'>Export for your accountant</span>
                </div>
              </div>
            </div>
          </BrowserWindow>
        </div>

        <ul className='slh-ana__notes'>
          <li>
            <b>Cost of goods</b> comes from recipes and stock moves, not guesswork.
          </li>
          <li>
            <b>Every venue</b> on its own or all together.
          </li>
          <li>
            <b>Any date range</b>, compared with the one before.
          </li>
        </ul>
      </div>
    </section>
  );
}
