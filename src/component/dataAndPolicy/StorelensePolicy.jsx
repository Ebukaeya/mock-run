import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const styles = `
 

  :root {
    --sl-white:        #ffffff;
    --sl-bg:           #f4f7fb;
    --sl-bg-alt:       #edf1f7;
    --sl-card:         #ffffff;
    --sl-card-hover:   #f8fafd;
    --sl-border:       #dde3ee;
    --sl-border-soft:  #e8edf6;
    --sl-teal:         #00b4a6;
    --sl-teal-dark:    #008f84;
    --sl-teal-dim:     rgba(0,180,166,0.10);
    --sl-teal-border:  rgba(0,180,166,0.25);
    --sl-blue:         #3b82f6;
    --sl-blue-light:   #60a5fa;
    --sl-blue-dim:     rgba(59,130,246,0.10);
    --sl-text-heading: #0f1f3d;
    --sl-text-body:    #3d4f6b;
    --sl-text-muted:   #7a8faa;
    --sl-text-faint:   #a8b8cc;
    --sl-green:        #10b981;
    --sl-amber:        #f59e0b;
    --sl-purple:       #8b5cf6;
    --sl-shadow-sm:    0 1px 3px rgba(15,31,61,0.07);
    --sl-shadow-md:    0 4px 16px rgba(15,31,61,0.08);
    --sl-shadow-lg:    0 8px 32px rgba(15,31,61,0.10);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .slp-root {
   
    background-color: var(--sl-bg);
    color: var(--sl-text-body);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* subtle dot pattern */
  .slp-bg-dots {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  /* top glow */
  .slp-bg-glow {
    position: fixed;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(0,180,166,0.10) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ══════════════════════════════ NAV */
  .slp-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--sl-border);
    padding: 0 48px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--sl-shadow-sm);
  }

  .slp-nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .slp-nav-logo-ring {
    width: 34px; height: 34px;
    border-radius: 50%;
    border: 2px solid var(--sl-teal);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--sl-teal-dim);
  }

  .slp-nav-logo-ring svg {
    width: 15px; height: 15px;
    stroke: var(--sl-teal-dark);
    fill: none;
    stroke-width: 2.2;
  }

  .slp-nav-wordmark {
    font-size: 18px;
    font-weight: 800;
    color: var(--sl-text-heading);
    letter-spacing: -0.03em;
  }

  .slp-nav-wordmark em {
    font-style: normal;
    color: var(--sl-teal-dark);
  }

  .slp-nav-links {
    display: flex;
    align-items: center;
    gap: 30px;
    list-style: none;
  }

  .slp-nav-links a {
    font-size: 14px;
    font-weight: 500;
    color: var(--sl-text-body);
    text-decoration: none;
    transition: color 0.18s;
  }

  .slp-nav-links a:hover { color: var(--sl-teal-dark); }

  .slp-nav-cta {
    padding: 9px 24px;
    background: linear-gradient(135deg, var(--sl-teal) 0%, var(--sl-blue) 100%);
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    border: none;
    letter-spacing: 0.01em;
    box-shadow: 0 4px 14px rgba(0,180,166,0.3);
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .slp-nav-cta:hover {
    box-shadow: 0 6px 20px rgba(0,180,166,0.4);
    transform: translateY(-1px);
  }

  /* ══════════════════════════════ HERO */
  .slp-hero {
    position: relative;
    z-index: 10;
    padding: 72px 48px 60px;
    border-bottom: 1px solid var(--sl-border);
    background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, transparent 100%);
  }

  .slp-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: linear-gradient(135deg, var(--sl-teal-dim), var(--sl-blue-dim));
    border: 1px solid var(--sl-teal-border);
    border-radius: 24px;
    font-size: 11px;
    font-weight: 600;
    color: var(--sl-teal-dark);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .slp-hero-badge-dot {
    width: 6px; height: 6px;
    background: var(--sl-teal);
    border-radius: 50%;
    animation: slp-pulse 2s infinite;
  }

  @keyframes slp-pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(0.7); }
  }

  .slp-hero-title {
    font-size: clamp(40px, 5.5vw, 68px);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.045em;
    color: var(--sl-text-heading);
    margin-bottom: 20px;
  }

  .slp-hero-title-accent {
    background: linear-gradient(90deg, var(--sl-teal-dark) 0%, var(--sl-blue) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .slp-hero-sub {
    font-size: 15px;
    color: var(--sl-text-muted);
    line-height: 1.75;
    max-width: 540px;
    margin-bottom: 32px;
  }

  .slp-hero-meta {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--sl-text-faint);
  }

  .slp-hero-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .slp-hero-greenball {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--sl-green);
  }

  /* ══════════════════════════════ LAYOUT */
  .slp-layout {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 264px 1fr;
    min-height: calc(100vh - 200px);
  }

  /* ══════════════════════════════ SIDEBAR */
  .slp-sidebar {
    position: sticky;
    top: 64px;
    height: calc(100vh - 64px);
    overflow-y: auto;
    border-right: 1px solid var(--sl-border);
    padding: 32px 18px;
    background: var(--sl-white);
    scrollbar-width: thin;
    scrollbar-color: var(--sl-border) transparent;
  }

  .slp-sidebar-label {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--sl-text-faint);
    margin-bottom: 14px;
    padding-left: 10px;
  
  }

  .slp-nav-list { list-style: none; display: flex; flex-direction: column; gap: 2px; }

  .slp-nav-item a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 12px;
    color: var(--sl-text-muted);
    transition: all 0.18s ease;
    border: 1px solid transparent;
  }

  .slp-nav-item a:hover {
    background: var(--sl-bg);
    color: var(--sl-text-body);
    border-color: var(--sl-border-soft);
  }

  .slp-nav-item.slp-nav-active a {
    background: linear-gradient(135deg, var(--sl-teal-dim), var(--sl-blue-dim));
    color: var(--sl-teal-dark);
    border-color: var(--sl-teal-border);
    font-weight: 600;
  }

  .slp-nav-num {
   
    font-size: 9px;
    color: var(--sl-blue-light);
    opacity: 0.7;
    min-width: 18px;
  }

  .slp-nav-item.slp-nav-active .slp-nav-num {
    color: var(--sl-teal-dark);
    opacity: 1;
  }

  /* ══════════════════════════════ CONTENT */
  .slp-content { padding: 52px 64px 80px; max-width: 840px; }

  /* ══════════════════════════════ SECTION */
  .slp-section {
    margin-bottom: 60px;
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }

  .slp-section.slp-visible { opacity: 1; transform: translateY(0); }

  .slp-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--sl-border-soft);
  }

  .slp-section-num {
   
    font-size: 11px;
    color: var(--sl-blue-light);
    opacity: 0.7;
  }

  .slp-section-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--sl-text-heading);
    letter-spacing: -0.025em;
  }

  .slp-section-body { font-size: 14px; line-height: 1.8; color: var(--sl-text-body); }
  .slp-section-body p { margin-bottom: 14px; }
  .slp-section-body p:last-child { margin-bottom: 0; }
  .slp-section-body strong { color: var(--sl-text-heading); font-weight: 700; }

  /* ══════════════════════════════ SUBSECTION */
  .slp-sub {
    margin-top: 20px;
    padding: 20px 22px;
    background: var(--sl-bg);
    border-radius: 10px;
    border: 1px solid var(--sl-border);
    box-shadow: var(--sl-shadow-sm);
  }

  .slp-sub-title {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--sl-teal-dark);
    font-weight: 600;
    margin-bottom: 12px;
    font-family: 'DM Mono', monospace;
  }

  .slp-sub p { font-size: 13px; color: var(--sl-text-body); line-height: 1.7; }

  /* ══════════════════════════════ CHIPS */
  .slp-chips {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
    gap: 8px;
    margin-top: 10px;
  }

  .slp-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    background: var(--sl-white);
    border-radius: 7px;
    font-size: 12px;
    color: var(--sl-text-body);
    border: 1px solid var(--sl-border);
    box-shadow: var(--sl-shadow-sm);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .slp-chip:hover {
    border-color: var(--sl-teal-border);
    box-shadow: 0 2px 8px rgba(0,180,166,0.12);
  }

  .slp-chip::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--sl-teal), var(--sl-blue));
    flex-shrink: 0;
  }

  /* ══════════════════════════════ CALLOUT */
  .slp-callout {
    margin-top: 18px;
    padding: 16px 20px;
    background: linear-gradient(135deg, rgba(0,180,166,0.06), rgba(59,130,246,0.06));
    border: 1px solid var(--sl-teal-border);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  .slp-callout::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--sl-teal), var(--sl-blue));
    border-radius: 3px 0 0 3px;
  }

  .slp-callout p { font-size: 13px; color: var(--sl-text-heading); line-height: 1.7; margin: 0; }

  /* ══════════════════════════════ RIGHTS GRID */
  .slp-rights-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 18px;
  }

  .slp-rights-card {
    padding: 18px;
    background: var(--sl-white);
    border: 1px solid var(--sl-border);
    border-radius: 10px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    box-shadow: var(--sl-shadow-sm);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    cursor: default;
  }

  .slp-rights-card:hover {
    border-color: var(--sl-teal-border);
    box-shadow: 0 6px 20px rgba(0,180,166,0.12);
    transform: translateY(-2px);
  }

  .slp-rights-icon-box {
    width: 38px; height: 38px;
    border-radius: 9px;
    background: var(--sl-teal-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
  }

  .slp-rights-card-title { font-size: 13px; font-weight: 700; color: var(--sl-text-heading); margin-bottom: 4px; }
  .slp-rights-card-desc  { font-size: 12px; color: var(--sl-text-muted); line-height: 1.5; }

  /* ══════════════════════════════ LEGAL TAGS */
  .slp-legal-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }

  .slp-legal-tag {
    padding: 6px 16px;
    border-radius: 24px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border: 1px solid;
  }

  .slp-lt-contract { background: #ecfdf5; color: #065f46; border-color: #6ee7b7; }
  .slp-lt-legal    { background: #fffbeb; color: #92400e; border-color: #fcd34d; }
  .slp-lt-interest { background: #f5f3ff; color: #4c1d95; border-color: #c4b5fd; }
  .slp-lt-consent  { background: #f0fdfb; color: var(--sl-teal-dark); border-color: rgba(0,180,166,0.35); }

  /* ══════════════════════════════ SECURITY */
  .slp-security-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    gap: 10px;
    margin-top: 16px;
  }

  .slp-sec-card {
    padding: 18px 14px;
    background: var(--sl-white);
    border: 1px solid var(--sl-border);
    border-radius: 10px;
    text-align: center;
    box-shadow: var(--sl-shadow-sm);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .slp-sec-card:hover {
    border-color: rgba(59,130,246,0.3);
    box-shadow: 0 4px 14px rgba(59,130,246,0.12);
    transform: translateY(-2px);
  }

  .slp-sec-card-icon  { font-size: 24px; margin-bottom: 8px; }
  .slp-sec-card-label { font-size: 11px; font-weight: 600; color: var(--sl-text-body); }

  /* ══════════════════════════════ CONTACT */
  .slp-contact-block {
    margin-top: 20px;
    padding: 28px;
    background: linear-gradient(135deg, #f0fdfb 0%, #eff6ff 100%);
    border: 1px solid var(--sl-teal-border);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--sl-shadow-md);
  }

  .slp-contact-block::after {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,180,166,0.12), transparent 70%);
    pointer-events: none;
  }

  .slp-contact-block-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sl-teal-dark);
    margin-bottom: 10px;
    font-family: 'DM Mono', monospace;
    font-weight: 600;
  }

  .slp-contact-block-email {
    font-size: 20px;
    font-weight: 800;
    color: var(--sl-text-heading);
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  .slp-contact-block-note { font-size: 12px; color: var(--sl-text-muted); line-height: 1.6; }

  /* ══════════════════════════════ COMPANY CARD */
  .slp-company-card {
    margin-top: 20px;
    padding: 28px;
    background: var(--sl-white);
    border: 1px solid var(--sl-border);
    border-radius: 12px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    box-shadow: var(--sl-shadow-md);
  }

  .slp-company-avatar {
    width: 50px; height: 50px;
    border-radius: 12px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;

  }

  .slp-company-name { font-size: 17px; font-weight: 800; color: var(--sl-text-heading); margin-bottom: 8px; letter-spacing: -0.02em; }
  .slp-company-meta span { display: block; font-size: 12px; color: var(--sl-text-muted); line-height: 1.9; }

  /* ══════════════════════════════ FOOTER */
  .slp-footer {
    position: relative;
    z-index: 10;
    border-top: 1px solid var(--sl-border);
    padding: 20px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: var(--sl-text-muted);
    background: var(--sl-white);
    box-shadow: 0 -1px 0 var(--sl-border-soft);
  }

  .slp-footer-badges { display: flex; align-items: center; gap: 10px; }

  .slp-footer-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border: 1px solid var(--sl-border);
    border-radius: 20px;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    background: var(--sl-bg);
  }

  .slp-fbdot { width: 6px; height: 6px; border-radius: 50%; }
  .slp-fbdot-green { background: var(--sl-green); }
  .slp-fbdot-teal  { background: var(--sl-teal); }

  /* ══════════════════════════════ RESPONSIVE */
  @media (max-width: 900px) {
    .slp-layout { grid-template-columns: 1fr; }
    .slp-sidebar { display: none; }
    .slp-content { padding: 32px 24px 60px; max-width: 100%; }
    .slp-hero { padding: 48px 24px 40px; }
    .slp-nav { padding: 0 24px; }
    .slp-nav-links { display: none; }
    .slp-rights-grid { grid-template-columns: 1fr; }
    .slp-footer { flex-direction: column; gap: 12px; padding: 20px 24px; text-align: center; }
    .slp-company-card { flex-direction: column; }
  }
`;

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

function useActiveSection() {
  const [active, setActive] = useState("intro");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ref.current.classList.add("slp-visible");
      },
      { threshold: 0.08 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
}

function Section({ id, num, title, children }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id={id} className='slp-section' ref={ref}>
      <div className='slp-section-header'>
        <span className='slp-section-num'>{num}</span>
        <h2 className='slp-section-title'>{title}</h2>
      </div>
      <div className='slp-section-body'>{children}</div>
    </section>
  );
}

const Chip = ({ label }) => <div className='slp-chip'>{label}</div>;

export default function StorelensePrivacyPolicy() {
  const active = useActiveSection();

  return (
    <>
      <style>{styles}</style>
      <div className='slp-root'>
        <div className='slp-bg-dots' />
        <div className='slp-bg-glow' />

        {/* NAV */}
        {/*   <nav className='slp-nav'>
          <a href='#' className='slp-nav-logo'>
            <div className='slp-nav-logo-ring'>
              <svg viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='5' />
                <path d='M12 2v4M12 18v4M2 12h4M18 12h4' />
              </svg>
            </div>
            <span className='slp-nav-wordmark'>
              Store<em>Lense</em>
            </span>
          </a>
          <ul className='slp-nav-links'>
            {["Home", "Features", "Services", "Pricing", "Contact"].map((l) => (
              <li key={l}>
                <a href='#'>{l}</a>
              </li>
            ))}
          </ul>
          <button className='slp-nav-cta'>Get Started</button>
        </nav> */}
        <nav className='sl-nav'>
          <div className='sl-nav-container'>
            <Link to='/' className='sl-nav-back'>
              <ArrowLeft className='w-5 h-5' />
              <span>Back to Home</span>
            </Link>
            <img
              src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png'
              alt='StoreLense'
              className='sl-nav-logo'
            />
          </div>
        </nav>

        {/* HERO */}
        <header className='slp-hero'>
          <div className='slp-hero-badge'>
            <span className='slp-hero-badge-dot' />
            Data Privacy Policy
          </div>
          <h1 className='slp-hero-title'>
            Your Data,
            <br />
            <span className='slp-hero-title-accent'>Protected.</span>
          </h1>
          <p className='slp-hero-sub'>
            This policy explains how Pragma Solutions Ltd. collects, uses, discloses, and protects your information when you use the Storelense platform and
            related services.
          </p>
          <div className='slp-hero-meta'>
            <div className='slp-hero-meta-item'>
              <span className='slp-hero-greenball' />
              NDPA 2023 Compliant
            </div>
            <span>·</span>
            <div className='slp-hero-meta-item'>Last Updated: Feb 22 2026</div>
            <span>·</span>
            <div className='slp-hero-meta-item'>Pragma Solutions Ltd. — Nigeria</div>
          </div>
        </header>

        <div className='slp-layout'>
          {/* SIDEBAR */}
          <aside className='slp-sidebar'>
            <p className='slp-sidebar-label'>Contents</p>
            <ul className='slp-nav-list'>
              {sections.map((s) => (
                <li key={s.id} className={`slp-nav-item ${active === s.id ? "slp-nav-active" : ""}`}>
                  <a href={`#${s.id}`}>
                    <span className='slp-nav-num'>{s.num}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* MAIN */}
          <main className='slp-content'>
            <Section id='intro' num='01' title='Introduction'>
              <p>
                Welcome to <strong>Storelense</strong>, an inventory management Software-as-a-Service (SaaS) platform fully owned and operated by{" "}
                <strong>Pragma Solutions Ltd.</strong>, a company incorporated and registered in the Federal Republic of Nigeria ("Company", "we", "us", or
                "our").
              </p>
              <p>
                This Data Privacy Policy explains how we collect, use, disclose, and protect your information when you use the Storelense platform, website, and
                related services (collectively, the "Service").
              </p>
              <div className='slp-callout'>
                <p>📋 By using Storelense, you agree to the practices described in this Policy.</p>
              </div>
            </Section>

            <Section id='data-collected' num='02' title='Information We Collect'>
              <p>We collect information necessary to provide and improve our services.</p>
              <div className='slp-sub'>
                <p className='slp-sub-title'>2.1 — Personal Information</p>
                <p style={{ marginBottom: "10px" }}>When you create an account or interact with Storelense, we may collect:</p>
                <div className='slp-chips'>
                  {["Full name", "Email address", "Phone number", "Business / billing address", "Profile or product images"].map((i) => (
                    <Chip key={i} label={i} />
                  ))}
                </div>
              </div>
              <div className='slp-sub'>
                <p className='slp-sub-title'>2.2 — Business and Inventory Data</p>
                <p style={{ marginBottom: "10px" }}>Data you input into the system:</p>
                <div className='slp-chips'>
                  {[
                    "Product names & SKUs",
                    "Product images",
                    "Stock levels",
                    "Transaction history",
                    "Supplier information",
                    "Customer information",
                    "Reports & analytics",
                  ].map((i) => (
                    <Chip key={i} label={i} />
                  ))}
                </div>
                <div className='slp-callout' style={{ marginTop: "14px" }}>
                  <p>
                    ✅ <strong>You retain full ownership of your business data.</strong>
                  </p>
                </div>
              </div>
              <div className='slp-sub'>
                <p className='slp-sub-title'>2.3 — Automatically Collected Information</p>
                <div className='slp-chips'>
                  {["IP address", "Device & browser info", "Log and usage data", "Cookies & similar tech"].map((i) => (
                    <Chip key={i} label={i} />
                  ))}
                </div>
              </div>
            </Section>

            <Section id='data-use' num='03' title='How We Use Your Information'>
              <p>We use collected data to power and continuously improve your experience on the platform:</p>
              <div className='slp-sub'>
                <div className='slp-chips'>
                  {[
                    "Provide & maintain platform",
                    "Manage user accounts",
                    "Process subscriptions",
                    "Enable inventory tracking",
                    "Customer support",
                    "Improve performance",
                    "Ensure security",
                    "Prevent fraud",
                    "Legal compliance",
                  ].map((i) => (
                    <Chip key={i} label={i} />
                  ))}
                </div>
              </div>
              <div className='slp-callout' style={{ marginTop: "20px" }}>
                <p>
                  🔒 <strong>We do not sell your personal data.</strong> Your data is used solely to operate and improve Storelense.
                </p>
              </div>
            </Section>

            <Section id='legal-basis' num='04' title='Legal Basis for Processing'>
              <p>
                Where applicable under the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and other relevant regulations, we process your data based
                on:
              </p>
              <div className='slp-legal-tags'>
                <span className='slp-legal-tag slp-lt-contract'>Performance of a Contract</span>
                <span className='slp-legal-tag slp-lt-legal'>Legal Obligations</span>
                <span className='slp-legal-tag slp-lt-interest'>Legitimate Business Interests</span>
                <span className='slp-legal-tag slp-lt-consent'>User Consent (where required)</span>
              </div>
            </Section>

            <Section id='data-sharing' num='05' title='Data Sharing & Disclosure'>
              <p>We may share information only in the following limited circumstances:</p>
              <div className='slp-sub'>
                <p className='slp-sub-title'>5.1 — Service Providers</p>
                <p>
                  We may engage trusted third-party service providers (e.g., cloud hosting, payment processors, analytics providers) to operate the platform.
                  These providers are contractually obligated to safeguard your data.
                </p>
              </div>
              <div className='slp-sub'>
                <p className='slp-sub-title'>5.2 — Legal Requirements</p>
                <p>We may disclose information if required by law, court order, or regulatory authority in Nigeria or other applicable jurisdictions.</p>
              </div>
            </Section>

            <Section id='security' num='06' title='Data Security'>
              <p>We implement reasonable technical and organizational measures to protect your data:</p>
              <div className='slp-security-grid'>
                {[
                  { icon: "🔐", label: "Encrypted HTTPS" },
                  { icon: "☁️", label: "Secure Cloud Hosting" },
                  { icon: "👥", label: "Role-Based Access" },
                  { icon: "📡", label: "System Monitoring" },
                  { icon: "🔄", label: "Security Updates" },
                ].map((s) => (
                  <div key={s.label} className='slp-sec-card'>
                    <div className='slp-sec-card-icon'>{s.icon}</div>
                    <div className='slp-sec-card-label'>{s.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--sl-text-faint)", fontStyle: "italic" }}>
                Note: No method of electronic storage or transmission is completely secure.
              </p>
            </Section>

            <Section id='retention' num='07' title='Data Retention'>
              <p>We retain your data under the following conditions:</p>
              <div className='slp-sub'>
                <div className='slp-chips'>
                  {["While account is active", "Legal & tax compliance", "To resolve disputes", "To enforce agreements"].map((i) => (
                    <Chip key={i} label={i} />
                  ))}
                </div>
              </div>
              <p style={{ marginTop: "16px" }}>
                Upon account termination, data may be deleted after a reasonable retention period unless otherwise required by law.
              </p>
            </Section>

            <Section id='rights' num='08' title='Your Rights'>
              <p>Subject to applicable law, you have the following rights regarding your personal data:</p>
              <div className='slp-rights-grid'>
                {[
                  { icon: "👁️", label: "Access", desc: "Request access to your personal data we hold" },
                  { icon: "✏️", label: "Correction", desc: "Request correction of inaccurate or incomplete data" },
                  { icon: "🗑️", label: "Deletion", desc: "Request erasure of your personal data" },
                  { icon: "🚫", label: "Objection", desc: "Object to certain processing activities" },
                  { icon: "📦", label: "Portability", desc: "Request a portable copy of your data" },
                ].map((r) => (
                  <div key={r.label} className='slp-rights-card'>
                    <div className='slp-rights-icon-box'>{r.icon}</div>
                    <div>
                      <div className='slp-rights-card-title'>{r.label}</div>
                      <div className='slp-rights-card-desc'>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='slp-contact-block'>
                <p className='slp-contact-block-label'>To exercise your rights, contact us at</p>
                <p className='slp-contact-block-email'>admin@pragmasolutions.co</p>
                <p className='slp-contact-block-note'>
                  We will respond to your request within a reasonable timeframe in accordance with applicable data protection law.
                </p>
              </div>
            </Section>

            <Section id='transfers' num='09' title='International Data Transfers'>
              <p>
                Your data may be processed or stored outside Nigeria where our service providers operate. Where such transfers occur, we take reasonable steps
                to ensure adequate data protection safeguards are in place, consistent with the requirements of the NDPA 2023.
              </p>
            </Section>

            <Section id='children' num='10' title="Children's Privacy">
              <div className='slp-callout'>
                <p>
                  🔞 Storelense is intended for <strong>business use only</strong> and is not directed at individuals under 18. We do not knowingly collect
                  personal data from children.
                </p>
              </div>
            </Section>

            <Section id='changes' num='11' title='Changes to This Policy'>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We encourage you to review this
                Policy periodically.
              </p>
              <p>Continued use of the Service after changes are posted indicates acceptance of the revised Policy.</p>
            </Section>

            <Section id='company' num='12' title='Company Information'>
              <p>Storelense is a product of:</p>
              <div className='slp-company-card'>
                <div className='slp-company-avatar'>
                  <img
                    style={{
                      width: "60px",
                      borderRadius: "40px",
                    }}
                    src={require("../../assessStatic/pictures/webstoreIm/Logo_light.png")}
                  />
                </div>
                <div>
                  <div className='slp-company-name'>Pragma Solutions Ltd.</div>
                  <div className='slp-company-meta'>
                    <span>A company incorporated in the Federal Republic of Nigeria</span>
                    <span>RC Number: 1751090</span>
                    <span>Registered Address: 1/2, KM 2 OLD ABA OWERRI ROAD, ABA, ABIA STATE,</span>
                    <span>Official Email: admin@pragmasolutions.co</span>
                  </div>
                </div>
              </div>
            </Section>
          </main>
        </div>

        <footer className='slp-footer'>
          <span>© {new Date().getFullYear()} Pragma Solutions Ltd. — All rights reserved.</span>
          <div className='slp-footer-badges'>
            <span className='slp-footer-badge'>
              <span className='slp-fbdot slp-fbdot-green' />
              NDPA 2023 Compliant
            </span>
            <span className='slp-footer-badge'>
              <span className='slp-fbdot slp-fbdot-teal' />
              Storelense Privacy
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
