import { useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { contact, links, pricing, wa } from "../hospitalityConfig";
import "./HospitalityPricing.css";

const money = (v) => `${pricing.currency}${v.toLocaleString("en-NG")}`;

/* 10. Pricing: five plans, monthly or every 6 months; Enterprise via WhatsApp */
export default function HospitalityPricing() {
  const [half, setHalf] = useState(false); // false = monthly, true = every 6 months

  return (
    <section className='slh-price' id='slh-pricing'>
      <div className='slh-wrap'>
        <div className='slh-price__head'>
          <div>
            <span className='slh-eyebrow'>Pricing</span>
            <h2 className='slh-h2'>Start free. Grow when you're ready.</h2>
            <p className='slh-lead'>
              Every plan includes the Sales Point, tables, kitchen display, online ordering link and offline mode.
            </p>
          </div>
          <div className='slh-price__toggle' role='group' aria-label='Billing period'>
            <button type='button' className={!half ? "is-on" : ""} onClick={() => setHalf(false)} aria-pressed={!half}>
              Monthly
            </button>
            <button type='button' className={half ? "is-on" : ""} onClick={() => setHalf(true)} aria-pressed={half}>
              Every 6 months <em>{pricing.sixMonthSaving}</em>
            </button>
          </div>
        </div>

        <div className='slh-price__cards'>
          {pricing.plans.map((p) => {
            const value = half ? p.sixMonths : p.monthly;
            const isFree = value === 0;
            const isSales = value == null;
            return (
              <article
                key={p.id}
                className={`slh-price__card ${p.featured ? "is-featured" : ""} slh-price__card--${p.id}`}
              >
                {p.featured && <span className='slh-price__flag'>Most popular</span>}
                <b className='slh-price__name'>{p.name}</b>
                <span className='slh-price__blurb'>{p.blurb}</span>
                <span className='slh-price__amount'>
                  {isSales ? "Custom" : isFree ? "Free" : money(value)}
                  {!isSales && !isFree && <small>{half ? "every 6 months" : "a month"}</small>}
                  {isFree && <small>forever</small>}
                  {isSales && <small>priced for your venues</small>}
                </span>

                {isSales ? (
                  <a
                    className='slh-price__cta slh-price__cta--wa'
                    href={contact.whatsappSales}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <MessageCircle size={17} /> Talk to sales
                  </a>
                ) : (
                  <a
                    className={`slh-price__cta ${p.featured ? "slh-price__cta--main" : ""}`}
                    href={links.getStarted}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {isFree ? "Start free" : "Choose plan"} <ArrowRight size={16} />
                  </a>
                )}

                <dl className='slh-price__limits'>
                  {pricing.limitRows.map((r) => {
                    const v = p.limits[r.key];
                    const none = v === 0;
                    return (
                      <div key={r.key} className={none ? "is-none" : ""}>
                        <dt>{r.label}</dt>
                        <dd>{v === null ? "Unlimited" : typeof v === "number" ? v.toLocaleString("en-NG") : v}</dd>
                      </div>
                    );
                  })}
                </dl>

                <ul className='slh-price__list'>
                  {p.extras.map((f) => (
                    <li key={f}>
                      <Check size={16} strokeWidth={3} /> {f}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className='slh-price__foot'>
          <p>Prices exclude VAT. StoreLense POS and Mini hardware is sold or leased separately.</p>
          <a href={wa("Hi StoreLense, which plan is right for my venue?")} target='_blank' rel='noopener noreferrer'>
            <MessageCircle size={16} /> Not sure which plan? Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
