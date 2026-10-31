import { Cloud, Download, Eye, Lock, PencilLine, RefreshCw, Radar, Trash2, Ban, Users } from "lucide-react";
import LegalPage, { Callout, Chips, CompanyCard, EmailBox, IconCards, LegalSection, SubBox } from "./LegalPage.jsx";

const sections = [
  { id: "intro", num: "01", title: "Introduction" },
  { id: "data-collected", num: "02", title: "Information We Collect" },
  { id: "data-use", num: "03", title: "How We Use Your Information" },
  { id: "legal-basis", num: "04", title: "Legal Basis for Processing" },
  { id: "data-sharing", num: "05", title: "Data Sharing & Disclosure" },
  { id: "security", num: "06", title: "Data Security" },
  { id: "retention", num: "07", title: "Data Retention" },
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
      intro='This policy explains how Pragma Solutions Ltd. collects, uses, discloses, and protects your information when you use the Storelense platform and related services.'
      meta={["NDPA 2023 compliant", "Last updated: Feb 22 2026", "Pragma Solutions Ltd. — Nigeria"]}
      sections={sections}
    >
      <LegalSection {...s.intro}>
        <p>
          Welcome to <strong>Storelense</strong>, an inventory management Software-as-a-Service (SaaS) platform fully owned and operated by{" "}
          <strong>Pragma Solutions Ltd.</strong>, a company incorporated and registered in the Federal Republic of Nigeria ("Company", "we", "us", or "our").
        </p>
        <p>
          This Data Privacy Policy explains how we collect, use, disclose, and protect your information when you use the Storelense platform, website, and
          related services (collectively, the "Service").
        </p>
        <Callout>By using Storelense, you agree to the practices described in this Policy.</Callout>
      </LegalSection>

      <LegalSection {...s["data-collected"]}>
        <p>We collect information necessary to provide and improve our services.</p>
        <SubBox title='2.1 — Personal information'>
          <p>When you create an account or interact with Storelense, we may collect:</p>
          <Chips items={["Full name", "Email address", "Phone number", "Business / billing address", "Profile or product images"]} />
        </SubBox>
        <SubBox title='2.2 — Business and inventory data'>
          <p>Data you input into the system:</p>
          <Chips
            items={[
              "Product names & SKUs",
              "Product images",
              "Stock levels",
              "Transaction history",
              "Supplier information",
              "Customer information",
              "Reports & analytics",
            ]}
          />
          <Callout tone='ok'>
            <strong>You retain full ownership of your business data.</strong>
          </Callout>
        </SubBox>
        <SubBox title='2.3 — Automatically collected information'>
          <Chips items={["IP address", "Device & browser info", "Log and usage data", "Cookies & similar tech"]} />
        </SubBox>
      </LegalSection>

      <LegalSection {...s["data-use"]}>
        <p>We use collected data to power and continuously improve your experience on the platform:</p>
        <Chips
          items={[
            "Provide & maintain platform",
            "Manage user accounts",
            "Process subscriptions",
            "Enable inventory tracking",
            "Customer support",
            "Improve performance",
            "Ensure security",
            "Prevent fraud",
            "Legal compliance",
          ]}
        />
        <Callout tone='ok'>
          <strong>We do not sell your personal data.</strong> Your data is used solely to operate and improve Storelense.
        </Callout>
      </LegalSection>

      <LegalSection {...s["legal-basis"]}>
        <p>
          Where applicable under the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and other relevant regulations, we process your data based on:
        </p>
        <Chips items={["Performance of a Contract", "Legal Obligations", "Legitimate Business Interests", "User Consent (where required)"]} />
      </LegalSection>

      <LegalSection {...s["data-sharing"]}>
        <p>We may share information only in the following limited circumstances:</p>
        <SubBox title='5.1 — Service providers'>
          <p>
            We may engage trusted third-party service providers (e.g., cloud hosting, payment processors, analytics providers) to operate the platform. These
            providers are contractually obligated to safeguard your data.
          </p>
        </SubBox>
        <SubBox title='5.2 — Legal requirements'>
          <p>We may disclose information if required by law, court order, or regulatory authority in Nigeria or other applicable jurisdictions.</p>
        </SubBox>
      </LegalSection>

      <LegalSection {...s.security}>
        <p>We implement reasonable technical and organizational measures to protect your data:</p>
        <IconCards
          cols={3}
          items={[
            { icon: Lock, title: "Encrypted HTTPS" },
            { icon: Cloud, title: "Secure Cloud Hosting" },
            { icon: Users, title: "Role-Based Access" },
            { icon: Radar, title: "System Monitoring" },
            { icon: RefreshCw, title: "Security Updates" },
          ]}
        />
        <p className='slw-legal__note'>Note: No method of electronic storage or transmission is completely secure.</p>
      </LegalSection>

      <LegalSection {...s.retention}>
        <p>We retain your data under the following conditions:</p>
        <Chips items={["While account is active", "Legal & tax compliance", "To resolve disputes", "To enforce agreements"]} />
        <p style={{ marginTop: 16 }}>Upon account termination, data may be deleted after a reasonable retention period unless otherwise required by law.</p>
      </LegalSection>

      <LegalSection {...s.rights}>
        <p>Subject to applicable law, you have the following rights regarding your personal data:</p>
        <IconCards
          items={[
            { icon: Eye, title: "Access", text: "Request access to your personal data we hold" },
            { icon: PencilLine, title: "Correction", text: "Request correction of inaccurate or incomplete data" },
            { icon: Trash2, title: "Deletion", text: "Request erasure of your personal data" },
            { icon: Ban, title: "Objection", text: "Object to certain processing activities" },
            { icon: Download, title: "Portability", text: "Request a portable copy of your data" },
          ]}
        />
        <EmailBox
          label='To exercise your rights, contact us at'
          note='We will respond to your request within a reasonable timeframe in accordance with applicable data protection law.'
        />
      </LegalSection>

      <LegalSection {...s.transfers}>
        <p>
          Your data may be processed or stored outside Nigeria where our service providers operate. Where such transfers occur, we take reasonable steps to
          ensure adequate data protection safeguards are in place, consistent with the requirements of the NDPA 2023.
        </p>
      </LegalSection>

      <LegalSection {...s.children}>
        <Callout tone='warn'>
          Storelense is intended for <strong>business use only</strong> and is not directed at individuals under 18. We do not knowingly collect personal data
          from children.
        </Callout>
      </LegalSection>

      <LegalSection {...s.changes}>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We encourage you to review this Policy
          periodically.
        </p>
        <p>Continued use of the Service after changes are posted indicates acceptance of the revised Policy.</p>
      </LegalSection>

      <LegalSection {...s.company}>
        <p>Storelense is a product of:</p>
        <CompanyCard />
      </LegalSection>
    </LegalPage>
  );
}
