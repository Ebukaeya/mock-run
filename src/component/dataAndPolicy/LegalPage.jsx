import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, Mail, XCircle } from "lucide-react";
import companyLogo from "../../assessStatic/pictures/pragma-solutions-logo.png";
import Navbar from "../Narbar.jsx";
import Footer from "../Footer.jsx";
import "../../home/HomePage.css";
import "./LegalPage.css";

/* The company details shown at the end of the privacy policy and the terms */
export const COMPANY = {
  name: "Pragma Solutions Ltd.",
  rc: "1751090",
  address: "1/2, KM 2 Old Aba Owerri Road, Aba, Abia State",
  email: "admin@pragmasolutions.co",
};

/* Highlights which section is on screen, for the contents list */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-90px 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ---------- Building blocks for the page content ---------- */

export function LegalSection({ id, num, title, children }) {
  return (
    <section id={id} className='slw-legal__sec'>
      <header className='slw-legal__secHead'>
        <span>{num}</span>
        <h2>{title}</h2>
      </header>
      <div className='slw-legal__body'>{children}</div>
    </section>
  );
}

const TONES = {
  info: Info,
  ok: CheckCircle2,
  warn: AlertTriangle,
  stop: XCircle,
};

/* A highlighted note. tone: "info" | "ok" | "warn" | "stop" */
export function Callout({ tone = "info", children }) {
  const Icon = TONES[tone] || Info;
  return (
    <div className={`slw-legal__callout slw-legal__callout--${tone}`}>
      <Icon size={20} />
      <p>{children}</p>
    </div>
  );
}

/* A list shown as chips. tone colours the dot: "info" | "warn" | "stop" */
export function Chips({ items, tone = "info", stacked = false }) {
  return (
    <ul className={`slw-legal__chips ${stacked ? "is-stacked" : ""}`}>
      {items.map((it) => {
        const label = typeof it === "string" ? it : it.text;
        const t = typeof it === "string" ? tone : it.tone || tone;
        return (
          <li key={label}>
            <span className={`slw-legal__dot slw-legal__dot--${t}`} />
            {label}
          </li>
        );
      })}
    </ul>
  );
}

/* A titled box, for sub-sections */
export function SubBox({ title, children }) {
  return (
    <div className='slw-legal__sub'>
      {title && <p className='slw-legal__subTitle'>{title}</p>}
      {children}
    </div>
  );
}

/* Cards with an icon. items: [{ icon, title, text }] */
export function IconCards({ items, tone = "info", cols = 2 }) {
  return (
    <div className={`slw-legal__cards slw-legal__cards--${cols}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className={`slw-legal__card slw-legal__card--${tone}`}>
          <span className='slw-legal__cardIc'>
            <Icon size={20} />
          </span>
          <div>
            <b>{title}</b>
            {text && <small>{text}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Contact box with the email address */
export function EmailBox({ label, note }) {
  return (
    <div className='slw-legal__email'>
      <span className='slw-legal__emailIc'>
        <Mail size={22} />
      </span>
      <div>
        <small>{label}</small>
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        {note && <p>{note}</p>}
      </div>
    </div>
  );
}

/* Company details card */
export function CompanyCard() {
  return (
    <div className='slw-legal__company'>
      <span className='slw-legal__companyLogo'>
        <img src={companyLogo} alt='Pragma Solutions logo' />
      </span>
      <div>
        <b>{COMPANY.name}</b>
        <span>A company incorporated in the Federal Republic of Nigeria</span>
        <span>RC Number: {COMPANY.rc}</span>
        <span>Registered address: {COMPANY.address}</span>
        <span>
          Official email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </span>
      </div>
    </div>
  );
}

/*
 * Page layout for the legal pages: site nav, hero, a contents list that follows
 * you down the page, the sections, then the site footer.
 * sections: [{ id, num, title }] in the order they appear.
 */
export default function LegalPage({ eyebrow, title, accent, intro, meta = [], sections, docTitle, children }) {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  useEffect(() => {
    if (docTitle) document.title = docTitle;
  }, [docTitle]);

  return (
    <div className='slw-page'>
      <Navbar />
      <main>
        <header className='slw-legal__hero'>
          <div className='slw-wrap'>
            <span className='slw-eyebrow'>{eyebrow}</span>
            <h1 className='slw-legal__title'>
              {title} <em>{accent}</em>
            </h1>
            <p className='slw-lead'>{intro}</p>
            {meta.length > 0 && (
              <ul className='slw-legal__meta'>
                {meta.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <div className='slw-wrap slw-legal__layout'>
          <aside className='slw-legal__toc' aria-label='Contents'>
            <p>Contents</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id} className={active === s.id ? "is-on" : ""}>
                  <a href={`#${s.id}`}>
                    <span>{s.num}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <div className='slw-legal__content'>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
