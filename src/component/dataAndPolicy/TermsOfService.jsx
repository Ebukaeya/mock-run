import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  Code2,
  DatabaseZap,
  Palette,
  PauseCircle,
  RefreshCw,
  Scale,
  Trash2,
  TrendingDown,
  Wallet,
} from "lucide-react";
import LegalPage, { Callout, Chips, CompanyCard, IconCards, LegalSection, SubBox } from "./LegalPage.jsx";

const sections = [
  { id: "s1", num: "01", title: "Introduction" },
  { id: "s2", num: "02", title: "Eligibility" },
  { id: "s3", num: "03", title: "Accounts & Staff" },
  { id: "s4", num: "04", title: "License to Use" },
  { id: "s5", num: "05", title: "Plans & Payment" },
  { id: "s6", num: "06", title: "Online Orders & Payouts" },
  { id: "s7", num: "07", title: "Your Data" },
  { id: "s8", num: "08", title: "Intellectual Property" },
  { id: "s9", num: "09", title: "Service Availability" },
  { id: "s10", num: "10", title: "Disclaimer of Warranties" },
  { id: "s11", num: "11", title: "Limitation of Liability" },
  { id: "s12", num: "12", title: "Cancellation, Termination & Deletion" },
  { id: "s13", num: "13", title: "Governing Law" },
  { id: "s14", num: "14", title: "Changes to Terms" },
  { id: "s15", num: "15", title: "Company Information" },
];

const s = Object.fromEntries(sections.map((x) => [x.id, x]));

/* Terms of service (route: /terms) */
export default function TermsOfService() {
  return (
    <LegalPage
      docTitle='Terms of Service – StoreLense'
      eyebrow='Terms of service'
      title='Clear terms,'
      accent='fair rules.'
      intro='These Terms govern your use of StoreLense and StoreLense Hospitality. Please read them carefully before creating an account or using the Service.'
      meta={["Governed by Nigerian law", "Last updated: Nov 13 2026", "Pragma Solutions Ltd."]}
      sections={sections}
    >
      <LegalSection {...s.s1}>
        <p>
          These Terms of Service ("Terms") govern your access to and use of <strong>StoreLense</strong> (inventory and point of sale for stores) and{" "}
          <strong>StoreLense Hospitality</strong> (for restaurants, bars, cafés, and hotels), including their websites, web apps, mobile and desktop apps, and
          POS devices (together, the "Service"). The Service is owned and operated by <strong>Pragma Solutions Ltd.</strong>, a company incorporated in the
          Federal Republic of Nigeria ("Company", "we", "us", or "our").
        </p>
        <Callout>By creating an account or using the Service, you agree to be bound by these Terms.</Callout>
      </LegalSection>

      <LegalSection {...s.s2}>
        <p>To use the Service, you must:</p>
        <Chips
          stacked
          items={[
            "Be at least 18 years old",
            "Have the authority to bind your business to this agreement",
            "Use the Service for lawful business purposes only",
          ]}
        />
      </LegalSection>

      <LegalSection {...s.s3}>
        <p>You must give accurate and complete account information:</p>
        <Chips items={["Full name", "Email address", "Phone number", "Business name and address"]} />
        <p style={{ marginTop: 16 }}>
          You can add staff accounts for your business. You decide what each person can see and do, and you are responsible for what they do in the Service.
        </p>
        <Callout tone='warn'>You are responsible for keeping your sign-in details safe and for all activity under your account.</Callout>
      </LegalSection>

      <LegalSection {...s.s4}>
        <p>
          We grant you a <strong>limited, non-exclusive, non-transferable, revocable license</strong> to use the Service for your own business operations.
        </p>
        <SubBox title='You agree not to'>
          <Chips
            stacked
            tone='stop'
            items={[
              "Reverse engineer or copy the platform",
              "Resell or sublicense the Service to third parties",
              "Upload malicious software or harmful code",
              "Interfere with or disrupt system security",
              "Use the Service for any unlawful purpose",
            ]}
          />
        </SubBox>
      </LegalSection>

      <LegalSection {...s.s5}>
        <SubBox title='5.1 — Plans'>
          <p>
            We offer a free Starter plan and paid plans (Basic User, Super User, and Premium), billed monthly or every 6 months. Each plan has limits, such as
            the number of stores, venues, staff, or products. Enterprise plans are agreed with our sales team. Current prices are shown in the app and on our
            website.
          </p>
        </SubBox>
        <SubBox title='5.2 — Paying by card (Paystack)'>
          <Chips
            stacked
            items={[
              { text: "Fees are billed in advance and renew automatically at the end of each period" },
              { text: "You can cancel any time in Settings; your plan stays active until the end of the period you paid for" },
              { text: "Payments are non-refundable, except where the law requires a refund", tone: "warn" },
            ]}
          />
        </SubBox>
        <SubBox title='5.3 — Paying through the App Store (iPhone and iPad)'>
          <Chips
            stacked
            items={[
              { text: "Payment is charged to your Apple ID when you confirm the purchase" },
              {
                text: "Your subscription renews automatically unless you turn it off at least 24 hours before the end of the current period. Renewal is charged within the 24 hours before the period ends",
              },
              { text: "Manage or cancel in your iPhone or iPad Settings › your name › Subscriptions. Deleting the app does not cancel it" },
              { text: "Billing and refunds are handled by Apple under Apple's terms, not by us", tone: "warn" },
              { text: "Apple's standard licence agreement (EULA) also applies to App Store purchases" },
            ]}
          />
        </SubBox>
        <SubBox title='5.4 — Price changes and unpaid fees'>
          <Chips
            stacked
            items={[
              { text: "We will give you reasonable notice before changing prices" },
              { text: "If a payment fails or a plan ends, your account moves to the limits of the free plan or is suspended", tone: "stop" },
            ]}
          />
        </SubBox>
      </LegalSection>

      <LegalSection {...s.s6}>
        <p>Venues on StoreLense Hospitality can take orders online through their own ordering link.</p>
        <Chips
          stacked
          items={[
            { text: "Customers pay a small StoreLense service fee on each online order. It is shown before they pay" },
            {
              text: "Card payments for online orders are collected by StoreLense through Paystack. We keep the service fee and pay the rest to the venue, less Paystack's processing fee",
            },
            { text: "For online orders paid another way, the venue owes the service fees and is billed weekly", tone: "warn" },
            { text: "You must give correct payout bank details. We are not responsible for payments sent to details you entered wrongly", tone: "warn" },
            {
              text: "The venue is responsible for its menu, prices, taxes, the food and drinks it serves, and its orders and refunds to customers",
              tone: "warn",
            },
          ]}
        />
      </LegalSection>

      <LegalSection {...s.s7}>
        <Callout tone='ok'>
          <strong>You keep full ownership</strong> of all business data you add to the Service.
        </Callout>
        <Chips
          stacked
          items={[
            { text: "You give Pragma Solutions Ltd. a limited license to host, process, and store your data only to provide the Service" },
            {
              text: "You are responsible for having the right to use the data you add, including your customers' details, and for making sure it doesn't break any law",
              tone: "warn",
            },
          ]}
        />
        <p style={{ marginTop: 16 }}>
          How we handle data is explained in our <a href='/data-policy'>Data Privacy Policy</a>.
        </p>
      </LegalSection>

      <LegalSection {...s.s8}>
        <p>
          All intellectual property rights in the Service remain the exclusive property of <strong>Pragma Solutions Ltd.</strong>
        </p>
        <IconCards
          cols={3}
          items={[
            { icon: Code2, title: "Software & Code" },
            { icon: BadgeCheck, title: "Branding & Trademarks" },
            { icon: Palette, title: "Design & UI" },
          ]}
        />
        <Callout tone='warn'>No rights are transferred to you except as expressly stated in these Terms.</Callout>
      </LegalSection>

      <LegalSection {...s.s9}>
        <p>We work for high availability but do not guarantee uninterrupted or error-free operation of the Service.</p>
        <Chips
          stacked
          items={[
            { text: "We target high uptime and work to minimize downtime" },
            { text: "We may modify, suspend, or discontinue features at our discretion", tone: "warn" },
            { text: "Scheduled maintenance may temporarily affect availability", tone: "warn" },
          ]}
        />
      </LegalSection>

      <LegalSection {...s.s10}>
        <Callout tone='stop'>
          The Service is provided <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> without warranties of any kind, to the fullest extent permitted
          by Nigerian law. We make no guarantees regarding accuracy, completeness, or fitness for a particular purpose.
        </Callout>
      </LegalSection>

      <LegalSection {...s.s11}>
        <p>To the maximum extent permitted under Nigerian law, Pragma Solutions Ltd. shall not be liable for:</p>
        <IconCards
          tone='stop'
          items={[
            { icon: TrendingDown, title: "Indirect Damages", text: "Consequential or incidental loss" },
            { icon: Wallet, title: "Loss of Profits", text: "Lost revenue or business opportunity" },
            { icon: DatabaseZap, title: "Data Loss", text: "Loss or corruption of your data" },
            { icon: PauseCircle, title: "Business Interruption", text: "Downtime or operational disruption" },
          ]}
        />
        <Callout tone='warn'>
          <strong>Liability cap:</strong> total liability shall not exceed the total subscription fees paid by you in the{" "}
          <strong>12 months preceding the claim</strong>.
        </Callout>
      </LegalSection>

      <LegalSection {...s.s12}>
        <ol className='slw-legal__steps'>
          <li>
            <span>
              <CheckCircle2 size={20} />
            </span>
            <div>
              <b>Cancel any time</b>
              <small>
                Card subscriptions: cancel in Settings. App Store subscriptions: cancel in your iPhone or iPad Settings › your name › Subscriptions.
              </small>
            </div>
          </li>
          <li className='is-warn'>
            <span>
              <AlertTriangle size={20} />
            </span>
            <div>
              <b>Suspension</b>
              <small>We may suspend or end your access if you break these Terms or don't pay fees you owe.</small>
            </div>
          </li>
          <li className='is-warn'>
            <span>
              <RefreshCw size={20} />
            </span>
            <div>
              <b>Deleting your account</b>
              <small>
                The business owner can delete the account in Settings → Privacy and data. You have 30 days to restore it by signing in. Deleting does not cancel
                an App Store subscription.
              </small>
            </div>
          </li>
          <li className='is-stop'>
            <span>
              <Trash2 size={20} />
            </span>
            <div>
              <b>Permanent deletion</b>
              <small>
                After 30 days your account and data are permanently deleted, once any payouts due and open orders are settled. See our{" "}
                <a href='/delete-account'>account deletion page</a>.
              </small>
            </div>
          </li>
        </ol>
      </LegalSection>

      <LegalSection {...s.s13}>
        <p>These Terms shall be governed by and construed in accordance with the laws of Nigeria.</p>
        <div className='slw-legal__flag'>
          <i aria-hidden='true' />
          <div>
            <small>
              <Scale size={13} /> Governing jurisdiction
            </small>
            <b>Federal Republic of Nigeria</b>
            <span>Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.</span>
          </div>
        </div>
      </LegalSection>

      <LegalSection {...s.s14}>
        <p>
          We may update these Terms to reflect changes in the Service, the law, or our pricing. If a change is significant, we will tell you by email or in the
          app.
        </p>
        <Callout>Continued use of the Service after updated Terms are posted means you accept the changes.</Callout>
      </LegalSection>

      <LegalSection {...s.s15}>
        <p>StoreLense and StoreLense Hospitality are owned and operated by:</p>
        <CompanyCard />
      </LegalSection>
    </LegalPage>
  );
}
