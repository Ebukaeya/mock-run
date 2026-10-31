import { AlertTriangle, CheckCircle2, Code2, DatabaseZap, Palette, PauseCircle, Scale, Trash2, TrendingDown, Wallet, BadgeCheck } from "lucide-react";
import LegalPage, { Callout, Chips, CompanyCard, IconCards, LegalSection, SubBox } from "./LegalPage.jsx";

const sections = [
  { id: "s1", num: "01", title: "Introduction" },
  { id: "s2", num: "02", title: "Eligibility" },
  { id: "s3", num: "03", title: "Account Registration" },
  { id: "s4", num: "04", title: "License to Use" },
  { id: "s5", num: "05", title: "Subscription & Payment" },
  { id: "s6", num: "06", title: "User Data" },
  { id: "s7", num: "07", title: "Intellectual Property" },
  { id: "s8", num: "08", title: "Service Availability" },
  { id: "s9", num: "09", title: "Disclaimer of Warranties" },
  { id: "s10", num: "10", title: "Limitation of Liability" },
  { id: "s11", num: "11", title: "Termination" },
  { id: "s12", num: "12", title: "Governing Law" },
  { id: "s13", num: "13", title: "Changes to Terms" },
  { id: "s14", num: "14", title: "Company Information" },
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
      intro='These Terms govern your access to and use of the Storelense platform. Please read them carefully before creating an account or using the Service.'
      meta={["Governed by Nigerian law", "Last updated: Feb 22 2026", "Pragma Solutions Ltd."]}
      sections={sections}
    >
      <LegalSection {...s.s1}>
        <p>
          These Terms of Service ("Terms") govern your access to and use of <strong>Storelense</strong>, an inventory management SaaS platform owned and
          operated by <strong>Pragma Solutions Ltd.</strong>, a company incorporated in the Federal Republic of Nigeria ("Company", "we", "us", or "our").
        </p>
        <Callout>By creating an account or using the Service, you agree to be bound by these Terms.</Callout>
      </LegalSection>

      <LegalSection {...s.s2}>
        <p>To use Storelense, you must meet all of the following requirements:</p>
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
        <p>To use Storelense, you must provide accurate and complete account information:</p>
        <Chips items={["Full name", "Email address", "Phone number", "Business address"]} />
        <Callout tone='warn'>You are responsible for safeguarding your login credentials and for all activities that occur under your account.</Callout>
      </LegalSection>

      <LegalSection {...s.s4}>
        <p>
          We grant you a <strong>limited, non-exclusive, non-transferable, revocable license</strong> to access and use Storelense solely for your internal
          business operations.
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
        <Chips
          stacked
          items={[
            { text: "Subscription fees are billed in advance on a recurring basis" },
            { text: "Payments are non-refundable except as required by applicable law", tone: "warn" },
            { text: "Failure to pay may result in suspension or termination of your account", tone: "stop" },
            { text: "We may update pricing with reasonable prior notice to users" },
          ]}
        />
      </LegalSection>

      <LegalSection {...s.s6}>
        <Callout tone='ok'>
          <strong>You retain full ownership</strong> of all business and inventory data you upload to Storelense.
        </Callout>
        <Chips
          stacked
          items={[
            {
              text: "You grant Pragma Solutions Ltd. a limited license to host, process, and store your data solely to provide the Service",
            },
            {
              text: "You are responsible for ensuring your uploaded content does not violate any laws or third-party rights",
              tone: "warn",
            },
          ]}
        />
      </LegalSection>

      <LegalSection {...s.s7}>
        <p>
          All intellectual property rights in the Storelense platform remain the exclusive property of <strong>Pragma Solutions Ltd.</strong>
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

      <LegalSection {...s.s8}>
        <p>We strive for high availability but do not guarantee uninterrupted or error-free operation of the Service.</p>
        <Chips
          stacked
          items={[
            { text: "We target high uptime and work to minimize downtime" },
            { text: "We may modify, suspend, or discontinue features at our discretion", tone: "warn" },
            { text: "Scheduled maintenance may temporarily affect availability", tone: "warn" },
          ]}
        />
      </LegalSection>

      <LegalSection {...s.s9}>
        <Callout tone='stop'>
          The Service is provided <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> without warranties of any kind, to the fullest extent permitted
          by Nigerian law. We make no guarantees regarding accuracy, completeness, or fitness for a particular purpose.
        </Callout>
      </LegalSection>

      <LegalSection {...s.s10}>
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

      <LegalSection {...s.s11}>
        <ol className='slw-legal__steps'>
          <li>
            <span>
              <CheckCircle2 size={20} />
            </span>
            <div>
              <b>Cancel anytime</b>
              <small>You may cancel your subscription at any time through your account settings.</small>
            </div>
          </li>
          <li className='is-warn'>
            <span>
              <AlertTriangle size={20} />
            </span>
            <div>
              <b>Grounds for suspension</b>
              <small>We may suspend or terminate your access if you violate these Terms or fail to pay applicable fees.</small>
            </div>
          </li>
          <li className='is-stop'>
            <span>
              <Trash2 size={20} />
            </span>
            <div>
              <b>Data after termination</b>
              <small>Upon termination, access will be revoked and data may be deleted after a reasonable retention period.</small>
            </div>
          </li>
        </ol>
      </LegalSection>

      <LegalSection {...s.s12}>
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

      <LegalSection {...s.s13}>
        <p>We may update these Terms from time to time to reflect changes in our practices, legal requirements, or platform features.</p>
        <Callout>Continued use of the Service after updated Terms are posted constitutes your acceptance of the changes.</Callout>
      </LegalSection>

      <LegalSection {...s.s14}>
        <p>Storelense is owned and operated by:</p>
        <CompanyCard />
      </LegalSection>
    </LegalPage>
  );
}
