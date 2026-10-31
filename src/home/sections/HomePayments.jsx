import { Check, Gauge, Phone, ShieldCheck, Smartphone } from "lucide-react";
import { payments } from "../homeConfig";
import kudaLogo from "../assets/kuda-logo-white.svg";
import { contact, wa } from "../../site/siteConfig";
import "./HomePayments.css";

const ICONS = { fast: Gauge, secure: ShieldCheck, seamless: Smartphone };

/* The "payment successful" screen shown on the Kuda POS */
function PaidScreen({ amount }) {
  return (
    <div className='slw-pay__screen'>
      <span className='slw-pay__check'>
        <Check strokeWidth={3.2} />
      </span>
      <b>Payment successful</b>
      <small>Thank you!</small>
      <strong>
        {"₦"}
        {amount}
      </strong>
      <span className='slw-pay__via'>Received via Kuda</span>
      <span className='slw-pay__ok'>OK</span>
    </div>
  );
}

/* Seamless payments with Kuda Bank */
export default function HomePayments() {
  const { partner, sampleAmount, features, steps } = payments;

  return (
    <section className='slw-pay' id='payments'>
      <div className='slw-wrap'>
        <div className='slw-pay__panel'>
          <img className='slw-pay__bgLogo' src={kudaLogo} alt='' aria-hidden='true' />
          <div className='slw-pay__copy'>
            <span className='slw-pay__partner'>
              StoreLense <i>×</i> <em>{partner}</em>
            </span>
            <h2 className='slw-pay__title'>
              Seamless payments, <span>right where you sell.</span>
            </h2>
            <p className='slw-pay__lead'>
              Collect payments easily, securely and instantly with {partner} on StoreLense. Better together to power
              your business.
            </p>

            <ol className='slw-pay__steps'>
              {steps.map((s, i) => (
                <li key={s}>
                  <span>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>

            <div className='slw-pay__ctas'>
              <a
                className='slw-btn slw-btn--white'
                href={wa(`Hi StoreLense, I'd like to set up ${partner} payments on StoreLense.`)}
                target='_blank'
                rel='noopener noreferrer'
              >
                Set up payments on WhatsApp
              </a>
              <a className='slw-btn slw-btn--ghost' href={contact.phoneHref}>
                <Phone size={17} /> {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className='slw-pay__visual' aria-hidden='true'>
            {/* Kuda POS: white body, purple top with tap-to-pay */}
            <div className='slw-pay__device'>
              <div className='slw-kpos'>
                <div className='slw-kpos__top'>
                  <span className='slw-kpos__brand'>StoreLense</span>
                  <span className='slw-kpos__nfc'>
                    <i />
                    <i />
                    <i />
                  </span>
                  <img className='slw-kpos__logo' src={kudaLogo} alt='' />
                  <span className='slw-kpos__slot' />
                </div>
                <div className='slw-kpos__body'>
                  <div className='slw-kpos__bezel'>
                    <span className='slw-kpos__status'>
                      <i>9:41</i>
                      <i>100%</i>
                    </span>
                    <PaidScreen amount={sampleAmount} />
                  </div>
                  <span className='slw-kpos__side' />
                </div>
              </div>
            </div>
            <div className='slw-pay__toast'>
              <span>
                <Check size={14} strokeWidth={3} />
              </span>
              <p>
                <b>
                  {"₦"}
                  {sampleAmount} received
                </b>
                <small>Kuda · just now</small>
              </p>
            </div>
          </div>
        </div>

        <div className='slw-pay__features'>
          {features.map((f) => {
            const Icon = ICONS[f.id] || Check;
            return (
              <div key={f.id} className='slw-pay__feature'>
                <span>
                  <Icon size={24} />
                </span>
                <b>{f.title}</b>
                <p>{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
