import { Ban, Cloud, Download, Eye, Fingerprint, Lock, PencilLine, Radar, RefreshCw, Trash2, Users } from "lucide-react";
import LegalPage, { Callout, Chips, CompanyCard, EmailBox, IconCards, LegalSection, SubBox } from "./LegalPage.jsx";

const sections = [
  { id: "intro", num: "01", title: "Introduction" },
  { id: "data-collected", num: "02", title: "Information We Collect" },
  { id: "data-use", num: "03", title: "How We Use Your Information" },
  { id: "legal-basis", num: "04", title: "Legal Basis for Processing" },
  { id: "data-sharing", num: "05", title: "Data Sharing & Disclosure" },
  { id: "security", num: "06", title: "Data Security" },
  { id: "retention", num: "07", title: "Data Retention & Deletion" },
  { id: "rights", num: "08", title: "Your Rights" },
  { id: "transfers", num: "09", title: "International Transfers" },
  { id: "children", num: "10", title: "Children's Privacy" },
  { id: "changes", num: "11", title: "Changes to This Policy" },
  { id: "company", num: "12", title: "Company Information" },
];

const s = Object.fromEntries(sections.map((x) => [x.id, x]));

/* Data privacy policy (route: /data-policy) */
export default function StorelensePrivacyPolicy() {
  return (
    <LegalPage
      docTitle='Data Privacy Policy – StoreLense'
      eyebrow='Data privacy policy'
      title='Your data,'
      accent='protected.'
      intro='This policy explains how Pragma Solutions Ltd. collects, uses, shares, and protects information when you use StoreLense, StoreLense Hospitality, and related services.'
      meta={["NDPA 2023 compliant", "Last updated: Nov 13 2026", "Pragma Solutions Ltd. — Nigeria"]}
      sections={sections}
    >
      <LegalSection {...s.intro}>
        <p>
          <strong>StoreLense</strong> (inventory and point of sale for stores) and <strong>StoreLense Hospitality</strong> (for restaurants, bars, cafés, and
          hotels) are owned and operated by <strong>Pragma Solutions Ltd.</strong>, a company incorporated and registered in the Federal Republic of Nigeria
          ("Company", "we", "us", or "our").
        </p>
        <p>
          This Policy covers our websites, web apps, mobile and desktop apps, POS devices, and online ordering pages (together, the "Service"). It applies to
          business owners and their staff who use the Service, and to customers who order from a business through it.
        </p>
        <Callout>
          For your account, we decide how your data is used. For the business data you enter, such as your customers, sales, and orders, we act on your behalf
          and only use it to run the Service for you.
        </Callout>
      </LegalSection>

      <LegalSection {...s["data-collected"]}>
        <p>We collect only what we need to run and improve the Service.</p>
        <SubBox title='2.1 — Account information'>
          <p>When you create an account or add staff:</p>
          <Chips
            items={[
              "Full name",
              "Email address",
              "Phone number",
              "Password (stored encrypted)",
              "Business name, type, and address",
              "Logo and profile images",
              "Staff names, roles, and sign-in details",
            ]}
          />
        </SubBox>
        <SubBox title='2.2 — Store data (StoreLense)'>
          <Chips
            items={[
              "Stores and warehouses",
              "Products, SKUs, and images",
              "Stock levels and movements",
              "Sales and transactions",
              "Loans and expenses",
              "Customer and supplier records",
              "Employee accounts",
              "Reports and dashboards",
            ]}
          />
        </SubBox>
        <SubBox title='2.3 — Hospitality data (StoreLense Hospitality)'>
          <Chips
            items={[
              "Venues: restaurants, bars, cafés, hotels",
              "Kitchens and storage",
              "Recipes and ingredients",
              "Menus and tables",
              "Orders and online orders",
              "Staff activity",
              "Customer reviews",
            ]}
          />
          <Callout tone='ok'>
            <strong>You keep full ownership of your business data.</strong>
          </Callout>
        </SubBox>
        <SubBox title='2.4 — Customers who order online'>
          <p>
            When someone orders from a venue's online ordering page, we collect what is needed to complete the order: their name, phone number, delivery address
            (for deliveries), the order itself, and any review they leave. The venue receives these details to prepare and deliver the order.
          </p>
        </SubBox>
        <SubBox title='2.5 — Payments and payouts'>
          <Chips
            stacked
            items={[
              "Card payments are handled by Paystack. We never see or store full card numbers.",
              "App Store subscriptions are handled by Apple. We receive the plan, the transaction ID, and whether it renews — never your card details.",
              "To pay venues for online orders, we store the payout bank, account number, and account name.",
            ]}
          />
        </SubBox>
        <SubBox title='2.6 — Device and usage information'>
          <Chips
            items={["IP address", "Device and browser type", "App version", "Logs and usage data", "Cookies and similar tech", "Push notification token"]}
          />
          <p style={{ marginTop: 14 }}>
            The app may ask to use your camera (to scan barcodes) and notifications. If you turn on Face ID or fingerprint lock, it is checked by your phone
            only — we never receive your fingerprint or face data.
          </p>
        </SubBox>
      </LegalSection>

      <LegalSection {...s["data-use"]}>
        <p>We use this information to:</p>
        <Chips
          items={[
            "Provide and maintain the Service",
            "Manage accounts and staff access",
            "Process subscriptions",
            "Take online orders and pay venues",
            "Track stock and sales",
            "Send receipts, alerts, and service emails",
            "Customer support",
            "Improve performance",
            "Keep the Service secure",
            "Prevent fraud",
            "Meet legal obligations",
          ]}
        />
        <Callout tone='ok'>
          <strong>We do not sell your personal data</strong>, and we do not use your business data for advertising.
        </Callout>
      </LegalSection>

      <LegalSection {...s["legal-basis"]}>
        <p>
          Under the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and other applicable laws, we process data based on:
        </p>
        <Chips items={["Performance of a contract", "Legal obligations", "Legitimate business interests", "Your consent (where required)"]} />
      </LegalSection>

      <LegalSection {...s["data-sharing"]}>
        <p>We share information only in these limited cases:</p>
        <SubBox title='5.1 — Service providers'>
          <p>We use trusted providers to run the Service. They may only use your data to provide their service to us:</p>
          <Chips
            stacked
            items={[
              "Paystack — card payments and subscriptions",
              "Apple — App Store subscriptions on iPhone and iPad",
              "Cloud hosting and database providers — to run and store the Service",
              "Email and SMS providers — to send codes, receipts, and notices",
              "Expo — to deliver push notifications to the mobile apps",
              "AI image provider — only if you choose to generate a logo",
            ]}
          />
        </SubBox>
        <SubBox title='5.2 — The business you order from'>
          <p>If you order online, the venue receives your order and contact details so it can prepare and deliver it.</p>
        </SubBox>
        <SubBox title='5.3 — Legal requirements'>
          <p>We may disclose information if required by law, court order, or a regulator in Nigeria or another applicable jurisdiction.</p>
        </SubBox>
      </LegalSection>

      <LegalSection {...s.security}>
        <p>We use reasonable technical and organizational measures to protect your data:</p>
        <IconCards
          cols={3}
          items={[
            { icon: Lock, title: "Encrypted HTTPS" },
            { icon: Cloud, title: "Secure Cloud Hosting" },
            { icon: Users, title: "Role-Based Access" },
            { icon: Radar, title: "System Monitoring" },
            { icon: RefreshCw, title: "Security Updates" },
            { icon: Fingerprint, title: "Optional App Lock" },
          ]}
        />
        <p className='slw-legal__note'>Note: No method of electronic storage or transmission is completely secure.</p>
      </LegalSection>

      <LegalSection {...s.retention}>
        <p>We keep your data while your account is active. When you delete your account:</p>
        <ol className='slw-legal__steps'>
          <li>
            <span>
              <Ban size={20} />
            </span>
            <div>
              <b>Straight away</b>
              <small>
                You and your staff are signed out, card subscriptions stop, and your stores and venues are hidden from customers. We email you a confirmation.
              </small>
            </div>
          </li>
          <li className='is-warn'>
            <span>
              <RefreshCw size={20} />
            </span>
            <div>
              <b>30 days to change your mind</b>
              <small>Sign in and choose "Restore my account" to get everything back as it was.</small>
            </div>
          </li>
          <li className='is-stop'>
            <span>
              <Trash2 size={20} />
            </span>
            <div>
              <b>After 30 days</b>
              <small>
                Your account and business data, including your customers' order details, are permanently deleted. If a payout is still due or an online order is
                still open, we wait until it is settled.
              </small>
            </div>
          </li>
        </ol>
        <SubBox title='What we keep'>
          <Chips
            stacked
            items={[
              "Records of payouts already made, for accounting and tax — with the bank account number and name removed",
              "A short record that the account was deleted and when, to show we carried out the request",
            ]}
          />
        </SubBox>
        <Callout>
          Full details are on our{" "}
          <a href='/delete-account'>
            <strong>account deletion page</strong>
          </a>
          .
        </Callout>
      </LegalSection>

      <LegalSection {...s.rights}>
        <p>Subject to applicable law, you have these rights over your personal data:</p>
        <IconCards
          items={[
            { icon: Eye, title: "Access", text: "Ask what personal data we hold about you" },
            { icon: PencilLine, title: "Correction", text: "Fix wrong or incomplete details, in Settings or by asking us" },
            { icon: Trash2, title: "Deletion", text: "Delete your account in Settings → Privacy and data" },
            { icon: Ban, title: "Objection", text: "Object to certain processing" },
            { icon: Download, title: "Portability", text: "Ask for a copy of your data" },
          ]}
        />
        <p style={{ marginTop: 16 }}>
          If you ordered from a venue and want your details removed, contact the venue or us. Staff should contact the business owner they work for.
        </p>
        <EmailBox
          label='To use your rights, contact us at'
          note='Email us from the address on your account so we can confirm it is you. We respond within the time set by applicable data protection law.'
        />
      </LegalSection>

      <LegalSection {...s.transfers}>
        <p>
          Your data may be processed or stored outside Nigeria where our service providers operate. When this happens, we take reasonable steps to make sure it
          stays protected, as required by the NDPA 2023.
        </p>
      </LegalSection>

      <LegalSection {...s.children}>
        <Callout tone='warn'>
          StoreLense is intended for <strong>business use only</strong> and is not directed at anyone under 18. We do not knowingly collect personal data from
          children.
        </Callout>
      </LegalSection>

      <LegalSection {...s.changes}>
        <p>We may update this Policy to reflect changes in the Service or the law. If a change is significant, we will let you know by email or in the app.</p>
        <p>Continued use of the Service after changes are posted means you accept the updated Policy.</p>
      </LegalSection>

      <LegalSection {...s.company}>
        <p>StoreLense and StoreLense Hospitality are products of:</p>
        <CompanyCard />
      </LegalSection>
    </LegalPage>
  );
}
