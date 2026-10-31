import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { pricing } from "../homeConfig";
import { contact, links, wa } from "../../site/siteConfig";
import "./HomePricing.css";

const money = (v) => `${pricing.currency}${v.toLocaleString("en-NG")}`;
const show = (v) => (v === null ? "Unlimited" : typeof v === "number" ? v.toLocaleString("en-NG") : v);

/* Pricing for StoreLense stores. Plans are chosen and paid during sign-up. */
export default function HomePricing() {
  const [half, setHalf] = useState(false); // false = monthly, true = every 6 months
  return (
    <section className='slw-price' id='pricing'>
      <div className='slw-wrap'>
        <div className='slw-price__head'>
          <span className='slw-eyebrow'>Pricing</span>
          <h2 className='slw-h2'>Start free. Upgrade as you open more stores.</h2>
          <p className='slw-lead'>Every plan includes the sales point, receipts, stock tracking and the mobile app.</p>
          <div className='slw-price__toggle' role='group' aria-label='Billing period'>
            <button type='button' className={!half ? "is-on" : ""} aria-pressed={!half} onClick={() => setHalf(false)}>
              Monthly
            </button>
            <button type='button' className={half ? "is-on" : ""} aria-pressed={half} onClick={() => setHalf(true)}>
              Every 6 months <em>{pricing.sixMonthSaving}</em>
            </button>
          </div>
        </div>

        <div className='slw-price__cards'>
          {pricing.plans.map((p) => {
            const value = half ? p.sixMonths : p.monthly;
            const isFree = value === 0;
            const isSales = value === null;
            return (
              <article
                key={p.id}
                className={`slw-price__card ${p.featured ? "is-featured" : ""} slw-price__card--${p.id}`}
              >
                {p.featured && <span className='slw-price__flag'>Most popular</span>}
                <b className='slw-price__name'>{p.name}</b>
                <span className='slw-price__blurb'>{p.blurb}</span>
                <span className='slw-price__amount'>
                  {isSales ? "Custom" : isFree ? "Free" : money(value)}
                  {!half && p.wasMonthly && <s>{money(p.wasMonthly)}</s>}
                </span>
                <small className='slw-price__per'>
                  {isSales ? "priced for your business" : isFree ? "forever" : half ? "every 6 months" : "a month"}
                </small>

                {isSales ? (
                  <a
                    className='slw-price__cta slw-price__cta--wa'
                    href={contact.whatsappSales}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <MessageCircle size={17} /> Talk to sales
                  </a>
                ) : (
                  <Link className={`slw-price__cta ${p.featured ? "slw-price__cta--main" : ""}`} to={links.signUp}>
                    {isFree ? "Start free" : "Choose plan"} <ArrowRight size={16} />
                  </Link>
                )}

                <dl className='slw-price__limits'>
                  {pricing.limitRows.map((r) => {
                    const v = p.limits[r.key];
                    return (
                      <div key={r.key} className={v === 0 ? "is-none" : ""}>
                        <dt>{r.label}</dt>
                        <dd>{show(v)}</dd>
                      </div>
                    );
                  })}
                </dl>

                <ul className='slw-price__list'>
                  {p.extras.map((x) => (
                    <li key={x}>
                      <Check size={16} strokeWidth={3} /> {x}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className='slw-price__foot'>
          <p>Prices exclude VAT. StoreLense POS hardware is sold or leased separately.</p>
          <a href={wa("Hi StoreLense, which plan is right for my store?")} target='_blank' rel='noopener noreferrer'>
            <MessageCircle size={16} /> Not sure which plan? Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
