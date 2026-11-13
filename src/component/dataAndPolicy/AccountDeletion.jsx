import { Ban, CreditCard, EyeOff, FileText, LogIn, LogOut, Mail, RefreshCw, Settings, Trash2, Wallet } from "lucide-react";
import LegalPage, { Callout, Chips, EmailBox, IconCards, LegalSection, SubBox } from "./LegalPage.jsx";

const sections = [
  { id: "how", num: "01", title: "How to Delete Your Account" },
  { id: "no-access", num: "02", title: "Can't Sign In?" },
  { id: "right-away", num: "03", title: "What Happens Straight Away" },
  { id: "timeline", num: "04", title: "When Your Data Is Deleted" },
  { id: "deleted", num: "05", title: "What We Delete" },
  { id: "kept", num: "06", title: "What We Keep" },
  { id: "faq", num: "07", title: "Questions" },
  { id: "contact", num: "08", title: "Contact Us" },
];

const s = Object.fromEntries(sections.map((x) => [x.id, x]));

const WHATSAPP = "https://wa.me/2348159273522?text=" + encodeURIComponent("Hello, I need help deleting my StoreLense account.");

/* Account deletion (route: /delete-account) */
export default function AccountDeletion() {
  return (
    <LegalPage
      docTitle='Delete Your Account – StoreLense'
      eyebrow='Account deletion'
      title='Delete your'
      accent='account.'
      intro='How to delete your StoreLense or StoreLense Hospitality account, what happens to your data, and how to change your mind within 30 days.'
      meta={["30 days to restore", "Last updated: Nov 13 2026", "Pragma Solutions Ltd."]}
      sections={sections}
    >
      <LegalSection {...s.how}>
        <p>Only the business owner can delete the account. Staff accounts can't.</p>
        <ol className='slw-legal__steps'>
          <li>
            <span>
              <LogIn size={20} />
            </span>
            <div>
              <b>Sign in</b>
              <small>Open StoreLense or StoreLense Hospitality, on the web or in the app, and sign in as the business owner.</small>
            </div>
          </li>
          <li>
            <span>
              <Settings size={20} />
            </span>
            <div>
              <b>Open Settings → Privacy and data</b>
              <small>In the menu, tap Settings, then Privacy and data.</small>
            </div>
          </li>
          <li className='is-stop'>
            <span>
              <Trash2 size={20} />
            </span>
            <div>
              <b>Tap "Delete my account"</b>
              <small>Enter your password and type DELETE to confirm. You can tell us why you're leaving, but you don't have to.</small>
            </div>
          </li>
          <li>
            <span>
              <Mail size={20} />
            </span>
            <div>
              <b>Check your email</b>
              <small>You're signed out, and we email you the date your account will be permanently deleted.</small>
            </div>
          </li>
        </ol>
      </LegalSection>

      <LegalSection {...s["no-access"]}>
        <p>
          Email us <strong>from the email address on your account</strong>, with your business name. We'll confirm it's you, reply within 2 working days, and
          schedule the deletion. You still have 30 days to change your mind.
        </p>
        <EmailBox label='Send your request to' note='Subject: "Delete my StoreLense account"' />
        <Callout>
          You can also ask on WhatsApp:{" "}
          <a href={WHATSAPP} target='_blank' rel='noreferrer'>
            <strong>+234 815 927 3522</strong>
          </a>
        </Callout>
      </LegalSection>

      <LegalSection {...s["right-away"]}>
        <IconCards
          items={[
            { icon: LogOut, title: "Everyone is signed out", text: "You and your staff are signed out on every device and can't sign in." },
            { icon: CreditCard, title: "Card plan stopped", text: "Your Paystack subscription is stopped, so you won't be charged again." },
            { icon: EyeOff, title: "Hidden from customers", text: "Your stores and venues are hidden and can't take online orders." },
            { icon: Mail, title: "Confirmation email", text: "We email you the date your account will be deleted." },
          ]}
        />
        <Callout tone='warn'>
          <strong>Paying through the App Store?</strong> We can't cancel that for you. On your iPhone or iPad open Settings › your name › Subscriptions ›
          StoreLense and tap Cancel Subscription.
        </Callout>
      </LegalSection>

      <LegalSection {...s.timeline}>
        <ol className='slw-legal__steps'>
          <li>
            <span>
              <Ban size={20} />
            </span>
            <div>
              <b>Day 0 — you ask to delete</b>
              <small>You're signed out, your plan is stopped, and your stores and venues are hidden.</small>
            </div>
          </li>
          <li className='is-warn'>
            <span>
              <RefreshCw size={20} />
            </span>
            <div>
              <b>Days 1–30 — you can still restore</b>
              <small>Sign in and tap "Restore my account" to get everything back, exactly as it was.</small>
            </div>
          </li>
          <li className='is-stop'>
            <span>
              <Trash2 size={20} />
            </span>
            <div>
              <b>After day 30 — permanently deleted</b>
              <small>Your account and data are erased. This can't be undone.</small>
            </div>
          </li>
        </ol>
        <Callout>If a payout is still due to you or an online order is still open, we wait until it's settled before deleting anything.</Callout>
      </LegalSection>

      <LegalSection {...s.deleted}>
        <p>After the 30 days, all of the following is permanently erased:</p>
        <SubBox title='Your account'>
          <Chips tone='ok' items={["Name, email, and phone number", "Password", "Business details and settings", "Sign-in and notification details"]} />
        </SubBox>
        <SubBox title='Stores (StoreLense)'>
          <Chips
            tone='ok'
            items={[
              "Stores and warehouses",
              "Products, stock, and stock history",
              "Sales and transactions",
              "Customers and employee accounts",
              "Dashboards and reports",
            ]}
          />
        </SubBox>
        <SubBox title='Hospitality (StoreLense Hospitality)'>
          <Chips
            tone='ok'
            items={[
              "Restaurants, bars, cafés, and hotels",
              "Kitchens, recipes, and storage",
              "Menus, tables, and ordering links",
              "Orders, online orders, and reviews",
              "Staff accounts and activity",
              "Payout bank details",
            ]}
          />
        </SubBox>
      </LegalSection>

      <LegalSection {...s.kept}>
        <IconCards
          items={[
            {
              icon: Wallet,
              title: "Payouts already paid to you",
              text: "Kept for accounting and tax. Your bank account number and account name are removed.",
            },
            {
              icon: FileText,
              title: "A record of the deletion",
              text: "The date and what was removed, to show we carried out your request. It has no business data.",
            },
          ]}
        />
        <p style={{ marginTop: 16 }}>
          Read more in our <a href='/data-policy'>Data Privacy Policy</a> and <a href='/terms'>Terms of Service</a>.
        </p>
      </LegalSection>

      <LegalSection {...s.faq}>
        <SubBox title='I changed my mind. Can I get my account back?'>
          <p>
            Yes, within 30 days. Sign in and tap "Restore my account". Your stores, venues, products, and sales come back as they were, and your staff can sign
            in again. Your subscription was stopped, so choose a plan again in Settings.
          </p>
        </SubBox>
        <SubBox title='Does deleting cancel my App Store subscription?'>
          <p>No. Cancel it in your iPhone or iPad Settings › your name › Subscriptions › StoreLense. For a refund, use reportaproblem.apple.com.</p>
        </SubBox>
        <SubBox title='I still have a payout coming or open online orders.'>
          <p>We wait until they're settled before deleting anything, so you still receive money you're owed.</p>
        </SubBox>
        <SubBox title='What about my staff?'>
          <p>Staff accounts belong to your business, so they're deleted with it. From the moment you ask, they can't sign in.</p>
        </SubBox>
      </LegalSection>

      <LegalSection {...s.contact}>
        <Callout tone='ok'>
          Questions about your account or your data? Email us or message us on WhatsApp at{" "}
          <a href={WHATSAPP} target='_blank' rel='noreferrer'>
            <strong>+234 815 927 3522</strong>
          </a>
          .
        </Callout>
        <EmailBox label='Email us at' />
      </LegalSection>
    </LegalPage>
  );
}
