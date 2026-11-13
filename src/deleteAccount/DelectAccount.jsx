import "./AccountDeletion.css";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Ban,
  CalendarClock,
  CheckCircle2,
  Clock3,
  CreditCard,
  EyeOff,
  FileText,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  RotateCcw,
  Settings,
  ShieldCheck,
  Smartphone,
  Trash2,
  Wallet,
} from "lucide-react";
import Navbar from "../component/Narbar";
import Footer from "../component/Footer";

/*
|--------------------------------------------------------------------------
| ACCOUNT DELETION — storelense.com/delete-account. Class prefix: sdel__
|--------------------------------------------------------------------------
| Matches how deletion actually works in StoreLense and StoreLense Hospitality:
| request in Settings → 30 days to restore → permanent deletion. Uses the site's
| nav and footer.
*/

const EMAIL = "admin@pragmasolutions.co";
const WHATSAPP = "2348159273522";
const WAIT_DAYS = 30;

const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Delete my StoreLense account")}&body=${encodeURIComponent(
  "Hello,\n\nPlease delete my StoreLense account.\n\nAccount email: \nBusiness name: \n\nThank you.",
)}`;
const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello, I need help deleting my StoreLense account.")}`;

const IN_APP_STEPS = [
  { title: "Sign in", text: "Open StoreLense or StoreLense Hospitality, on the web or in the app, and sign in as the business owner." },
  { title: "Open Settings → Privacy and data", text: "In the menu, tap Settings, then Privacy and data." },
  { title: "Tap “Delete my account”", text: "Enter your password and type DELETE to confirm. You can tell us why you're leaving, but you don't have to." },
  { title: "You're signed out", text: "You'll get an email with the date your account will be permanently deleted." },
];

const RIGHT_AWAY = [
  { icon: LogOut, text: "You are signed out on every device, and your staff can no longer sign in." },
  { icon: CreditCard, text: "A card subscription (Paystack) is stopped, so you won't be charged again." },
  { icon: EyeOff, text: "Your stores and venues are hidden, so customers can't find them or order online." },
  { icon: Mail, text: "We email you a confirmation with your deletion date." },
];

const DELETED = [
  {
    group: "Your account",
    items: ["Name, email, phone number and password", "Profile, business details and settings", "Saved sign-in and notification details"],
  },
  {
    group: "Stores (StoreLense)",
    items: [
      "Stores and warehouses",
      "Products, stock and stock history",
      "Sales records and transactions",
      "Customers and employee accounts",
      "Dashboards and reports",
    ],
  },
  {
    group: "Hospitality (StoreLense Hospitality)",
    items: [
      "Restaurants, bars, cafés and hotels",
      "Kitchens, recipes, storage and ingredients",
      "Menus, tables and online ordering links",
      "Orders, online orders and reviews",
      "Staff accounts and their activity",
      "Payout (bank) details",
    ],
  },
];

const KEPT = [
  {
    icon: Wallet,
    title: "Payouts already paid to you",
    text: "Records of money we have already paid out to you are kept for accounting and tax. Your bank account number and account name are removed from them.",
  },
  {
    icon: FileText,
    title: "A record that the account was deleted",
    text: "The date and what was removed, so we can show that we carried out your request. It does not contain your business data.",
  },
];

const TIMELINE = [
  { icon: Trash2, when: "Day 0", title: "You ask to delete", text: "You're signed out, your plan is stopped and your stores and venues are hidden." },
  {
    icon: RotateCcw,
    when: `Days 1–${WAIT_DAYS}`,
    title: "You can still restore",
    text: "Sign in and tap “Restore my account” to keep everything, exactly as it was.",
  },
  { icon: Ban, when: `After day ${WAIT_DAYS}`, title: "Permanently deleted", text: "Your account and data are erased. This can't be undone." },
];

const FAQ = [
  {
    q: "I changed my mind. Can I get my account back?",
    a: `Yes, within ${WAIT_DAYS} days. Sign in with your email and password, and tap “Restore my account”. Your stores, venues, products and sales come back as they were, and your staff can sign in again. Your subscription was stopped, so choose a plan again in Settings.`,
  },
  {
    q: "I pay through the App Store on my iPhone. Is that stopped too?",
    a: "No. We can't cancel App Store subscriptions for you. On your iPhone or iPad open Settings › your name › Subscriptions › StoreLense and tap Cancel Subscription. For a refund, use reportaproblem.apple.com.",
  },
  {
    q: "I still have a payout coming or open online orders.",
    a: "We wait until they're settled before deleting anything, so you still receive money you're owed. Your account stays scheduled for deletion and is deleted once everything is settled.",
  },
  {
    q: "What about my staff?",
    a: "Staff accounts belong to your business, so they're deleted with it. From the moment you ask, they can't sign in to the staff apps.",
  },
  {
    q: "I can't sign in. How do I ask?",
    a: `Email ${EMAIL} from the email address on the account, with your business name. We'll confirm it's you, reply within 2 working days and schedule the deletion. The same ${WAIT_DAYS}-day restore period applies.`,
  },
];

export default function AccountDeletion() {
  const [tab, setTab] = useState("app");
  const [open, setOpen] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Delete your account · StoreLense";
  }, []);

  return (
    <div className='sdel'>
      <Navbar />

      {/* ─── Hero ─── */}
      <header className='sdel__hero'>
        <div className='sdel__wrap'>
          <span className='sdel__eyebrow'>
            <ShieldCheck size={15} /> Your data, your choice
          </span>
          <h1 className='sdel__title'>Delete your StoreLense account</h1>
          <p className='sdel__lead'>
            How to delete your account in StoreLense or StoreLense Hospitality, what happens to your data, and how to change your mind within {WAIT_DAYS} days.
          </p>
          <div className='sdel__facts'>
            <div className='sdel__fact'>
              <Smartphone size={18} />
              <div>
                <span>Apps</span>
                <b>StoreLense · StoreLense Hospitality</b>
              </div>
            </div>
            <div className='sdel__fact'>
              <CalendarClock size={18} />
              <div>
                <span>Time to change your mind</span>
                <b>{WAIT_DAYS} days</b>
              </div>
            </div>
            <div className='sdel__fact'>
              <ShieldCheck size={18} />
              <div>
                <span>Developer</span>
                <b>Pragma Solutions Ltd</b>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className='sdel__wrap sdel__main'>
        {/* ─── How to delete ─── */}
        <section className='sdel__card'>
          <h2 className='sdel__h2'>How to delete your account</h2>
          <div className='sdel__tabs' role='tablist'>
            <button
              type='button'
              role='tab'
              aria-selected={tab === "app"}
              className={`sdel__tab${tab === "app" ? " sdel__tab--on" : ""}`}
              onClick={() => setTab("app")}
            >
              <Settings size={16} /> In the app or on the web
            </button>
            <button
              type='button'
              role='tab'
              aria-selected={tab === "email"}
              className={`sdel__tab${tab === "email" ? " sdel__tab--on" : ""}`}
              onClick={() => setTab("email")}
            >
              <Mail size={16} /> Can't sign in? Ask us
            </button>
          </div>

          {tab === "app" ? (
            <ol className='sdel__steps'>
              {IN_APP_STEPS.map((s, i) => (
                <li key={s.title} className='sdel__step'>
                  <span className='sdel__stepNum'>{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className='sdel__ask'>
              <p>
                Send us an email <strong>from the email address on your account</strong>, with your business name. We'll confirm it's you, reply within 2
                working days and schedule the deletion. You still have {WAIT_DAYS} days to change your mind.
              </p>
              <div className='sdel__askBtns'>
                <a className='sdel__btn sdel__btn--blue' href={mailto}>
                  <Mail size={17} /> Email {EMAIL}
                </a>
                <a className='sdel__btn sdel__btn--ghost' href={whatsapp} target='_blank' rel='noreferrer'>
                  <MessageCircle size={17} /> Ask on WhatsApp
                </a>
              </div>
            </div>
          )}
          <p className='sdel__note'>
            <Lock size={14} /> Only the business owner can delete the account. Staff accounts can't.
          </p>
        </section>

        {/* ─── Right away ─── */}
        <section className='sdel__card'>
          <h2 className='sdel__h2'>What happens straight away</h2>
          <ul className='sdel__now'>
            {RIGHT_AWAY.map((r) => (
              <li key={r.text}>
                <span className='sdel__nowIcon'>
                  <r.icon size={18} />
                </span>
                {r.text}
              </li>
            ))}
          </ul>
          <div className='sdel__alert'>
            <AlertTriangle size={18} />
            <p>
              <strong>Paying through the App Store?</strong> We can't cancel that for you. On your iPhone or iPad open Settings › your name › Subscriptions ›
              StoreLense and tap Cancel Subscription.
            </p>
          </div>
        </section>

        {/* ─── Timeline ─── */}
        <section className='sdel__card'>
          <h2 className='sdel__h2'>When your data is deleted</h2>
          <div className='sdel__timeline'>
            {TIMELINE.map((t, i) => (
              <div key={t.when} className={`sdel__tl sdel__tl--${i + 1}`}>
                <span className='sdel__tlIcon'>
                  <t.icon size={20} />
                </span>
                <span className='sdel__tlWhen'>{t.when}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
          <p className='sdel__note'>
            <Clock3 size={14} /> If a payout is still due to you or an online order is still open, we wait until it's settled before deleting anything.
          </p>
        </section>

        {/* ─── Deleted / kept ─── */}
        <section className='sdel__card'>
          <h2 className='sdel__h2'>What we delete</h2>
          <p className='sdel__p'>After the {WAIT_DAYS} days, everything below is permanently erased from our systems.</p>
          <div className='sdel__groups'>
            {DELETED.map((g) => (
              <div key={g.group} className='sdel__group'>
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className='sdel__h2 sdel__h2--gap'>What we keep, and why</h2>
          <div className='sdel__kept'>
            {KEPT.map((k) => (
              <div key={k.title} className='sdel__keptItem'>
                <span className='sdel__keptIcon'>
                  <k.icon size={18} />
                </span>
                <div>
                  <h3>{k.title}</h3>
                  <p>{k.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className='sdel__note'>
            <ShieldCheck size={14} /> Read more in our{" "}
            <a href='/data-policy' className='sdel__link'>
              privacy policy
            </a>{" "}
            and{" "}
            <a href='/terms' className='sdel__link'>
              terms of service
            </a>
            .
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className='sdel__card'>
          <h2 className='sdel__h2'>Questions</h2>
          <div className='sdel__faq'>
            {FAQ.map((f, i) => (
              <div key={f.q} className={`sdel__q${open === i ? " sdel__q--open" : ""}`}>
                <button type='button' onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}
                  <span className='sdel__qSign'>{open === i ? "−" : "+"}</span>
                </button>
                {open === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section className='sdel__contact'>
          <div>
            <h2>Need help?</h2>
            <p>Questions about your account or your data? We usually reply within one working day.</p>
          </div>
          <div className='sdel__contactBtns'>
            <a className='sdel__btn sdel__btn--teal' href={`mailto:${EMAIL}`}>
              <Mail size={17} /> {EMAIL}
            </a>
            <a className='sdel__btn sdel__btn--light' href={whatsapp} target='_blank' rel='noreferrer'>
              <MessageCircle size={17} /> WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
