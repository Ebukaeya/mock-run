import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const styles = `


  :root {
    --bg: #f0f4fa;
    --white: #ffffff;
    --border: #e2e8f2;
    --border-soft: #edf1f8;
    --navy: #0c1a36;
    --navy-mid: #1e3a6e;
    --teal: #00b4a6;
    --teal-dark: #008f84;
    --teal-dim: rgba(0,180,166,0.09);
    --teal-border: rgba(0,180,166,0.22);
    --blue: #3b82f6;
    --blue-dim: rgba(59,130,246,0.09);
    --red: #ef4444;
    --red-dim: rgba(239,68,68,0.08);
    --red-border: rgba(239,68,68,0.22);
    --amber: #f59e0b;
    --amber-dim: rgba(245,158,11,0.08);
    --green: #10b981;
    --green-dim: rgba(16,185,129,0.09);
    --text-h: #0c1a36;
    --text-b: #344563;
    --text-m: #6b7fa3;
    --text-f: #9babc5;
    --sh1: 0 1px 4px rgba(12,26,54,0.07);
    --sh2: 0 4px 20px rgba(12,26,54,0.08);
    --sh3: 0 12px 40px rgba(12,26,54,0.10);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .D {
   
    background: var(--bg);
    color: var(--text-b);
    min-height: 100vh;
    position: relative;
  }

  /* BG */
  .D-dots {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px);
    background-size: 30px 30px;
  }
  .D-glow {
    position: fixed; top: -140px; left: 50%; transform: translateX(-50%);
    width: 1000px; height: 500px;
    background: radial-gradient(ellipse, rgba(0,180,166,0.07) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }

  /* NAV */
  .D-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,0.94); backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
    padding: 0 48px; height: 62px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: var(--sh1);
  }
  .D-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .D-logo-ring {
    width: 33px; height: 33px; border-radius: 50%;
    border: 2px solid var(--teal); background: var(--teal-dim);
    display: flex; align-items: center; justify-content: center;
  }
  .D-logo-ring svg { width: 14px; height: 14px; stroke: var(--teal-dark); fill: none; stroke-width: 2.3; }
  .D-wordmark { font-size: 17px; font-weight: 800; color: var(--text-h); letter-spacing: -0.03em; }
  .D-wordmark em { font-style: normal; color: var(--teal-dark); }
  .D-nav-pill {
    padding: 7px 20px;
    background: linear-gradient(135deg, var(--teal), var(--blue));
    border-radius: 22px; font-size: 12px; font-weight: 600; color: #fff;
    border: none; cursor: pointer;
    box-shadow: 0 3px 12px rgba(0,180,166,0.25);
    transition: box-shadow .2s, transform .2s;
  }
  .D-nav-pill:hover { box-shadow: 0 5px 18px rgba(0,180,166,0.35); transform: translateY(-1px); }

  /* PAGE WRAPPER */
  .D-page {
    position: relative; z-index: 10;
    max-width: 760px;
    margin: 0 auto;
    padding: 56px 24px 80px;
  }

  /* TOP LABEL */
  .D-top-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px;
    background: linear-gradient(135deg, var(--red-dim), rgba(245,158,11,0.07));
    border: 1px solid var(--red-border);
    border-radius: 22px;
    font-size: 10px; font-weight: 600; color: var(--red);
    letter-spacing: .09em; text-transform: uppercase;
    margin-bottom: 22px;
  }
  .D-top-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--red);
    animation: Dpulse 2s infinite;
  }
  @keyframes Dpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

  /* HERO BLOCK */
  .D-hero {
    margin-bottom: 40px;
  }
  .D-hero-title {
    font-size: clamp(30px, 5vw, 48px);
    font-weight: 900; line-height: 1.05;
    letter-spacing: -0.04em; color: var(--text-h);
    margin-bottom: 14px;
  }
  .D-hero-title span {
    background: linear-gradient(90deg, var(--red) 0%, var(--amber) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .D-hero-sub {
    font-size: 14px; color: var(--text-m); line-height: 1.75;
    max-width: 540px; margin-bottom: 24px;
  }

  /* INFO STRIP */
  .D-info-strip {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 36px;
  }
  .D-info-card {
    padding: 16px 18px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    box-shadow: var(--sh1);
    display: flex; align-items: center; gap: 12px;
  }
  .D-info-icon {
    width: 36px; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .D-info-icon.teal { background: var(--teal-dim); }
  .D-info-icon.blue { background: var(--blue-dim); }
  .D-info-label { font-size: 10px; text-transform: uppercase; letter-spacing: .1em; color: var(--text-f); font-weight: 600;  margin-bottom: 2px; }
  .D-info-val { font-size: 13px; font-weight: 700; color: var(--text-h); }

  /* DIVIDER */
  .D-divider {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 28px;
  }
  .D-divider-line { flex: 1; height: 1px; background: var(--border); }
  .D-divider-label {
    font-size: 10px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: var(--text-f);
    
    white-space: nowrap;
  }

  /* SECTION BLOCK */
  .D-block {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--sh2);
    margin-bottom: 20px;
    overflow: hidden;
  }

  .D-block-header {
    padding: 20px 24px 18px;
    border-bottom: 1px solid var(--border-soft);
    display: flex; align-items: center; gap: 14px;
  }

  .D-block-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }

  .D-block-icon.teal  { background: var(--teal-dim); }
  .D-block-icon.red   { background: var(--red-dim); }
  .D-block-icon.amber { background: var(--amber-dim); }
  .D-block-icon.green { background: var(--green-dim); }
  .D-block-icon.blue  { background: var(--blue-dim); }

  .D-block-tag {
    font-size: 9px; font-weight: 600; letter-spacing: .14em;
    text-transform: uppercase; font-family: 'DM Mono', monospace;
    margin-bottom: 3px;
  }
  .D-block-tag.teal  { color: var(--teal-dark); }
  .D-block-tag.red   { color: var(--red); }
  .D-block-tag.amber { color: var(--amber); }
  .D-block-tag.green { color: var(--green); }
  .D-block-tag.blue  { color: var(--blue); }

  .D-block-title {
    font-size: 16px; font-weight: 800; color: var(--text-h);
    letter-spacing: -0.02em;
  }

  .D-block-body { padding: 20px 24px; }
  .D-block-body p { font-size: 13px; color: var(--text-b); line-height: 1.75; margin-bottom: 12px; }
  .D-block-body p:last-child { margin-bottom: 0; }
  .D-block-body strong { color: var(--text-h); font-weight: 700; }

  /* OPTION TABS */
  .D-option-tabs {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; border-bottom: 1px solid var(--border-soft);
  }
  .D-option-tab {
    padding: 14px 20px;
    border: none; background: none; cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 600;
    color: var(--text-m);
    border-bottom: 2px solid transparent;
    transition: all .18s;
    display: flex; align-items: center; gap: 8px;
  }
  .D-option-tab.active {
    color: var(--teal-dark);
    border-bottom-color: var(--teal);
    background: var(--teal-dim);
  }
  .D-option-tab:not(.active):hover { background: var(--bg); color: var(--text-b); }
  .D-tab-dot {
    width: 22px; height: 22px; border-radius: 6px;
    background: var(--teal-dim); border: 1px solid var(--teal-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: var(--teal-dark);
    font-family: 'DM Mono', monospace;
  }
  .D-option-tab.active .D-tab-dot { background: var(--teal); color: #fff; border-color: var(--teal); }

  /* STEPS */
  .D-steps { display: flex; flex-direction: column; gap: 0; position: relative; }
  .D-steps::before {
    content: ''; position: absolute;
    left: 19px; top: 28px; bottom: 28px;
    width: 1px; background: var(--border);
  }
  .D-step { display: flex; align-items: flex-start; gap: 14px; padding: 13px 0; }
  .D-step-circle {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), var(--blue));
    color: #fff; font-size: 13px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; position: relative; z-index: 1;
    box-shadow: 0 3px 10px rgba(0,180,166,0.28);
    font-family: 'DM Mono', monospace;
  }
  .D-step-title { font-size: 13px; font-weight: 700; color: var(--text-h); margin-bottom: 3px; }
  .D-step-desc { font-size: 12px; color: var(--text-m); line-height: 1.55; }

  /* EMAIL CTA */
  .D-email-box {
    margin-top: 16px;
    padding: 18px 20px;
    background: linear-gradient(135deg, rgba(0,180,166,0.05), rgba(59,130,246,0.05));
    border: 1px solid var(--teal-border);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    flex-wrap: wrap;
  }
  .D-email-left {}
  .D-email-label { font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--teal-dark); font-weight: 600; font-family: 'DM Mono', monospace; margin-bottom: 4px; }
  .D-email-addr { font-size: 15px; font-weight: 800; color: var(--text-h); letter-spacing: -0.01em; }
  .D-email-note { font-size: 11px; color: var(--text-m); margin-top: 4px; }
  .D-email-btn {
    padding: 9px 20px;
    background: var(--teal-dark); color: #fff;
    border: none; border-radius: 8px;
    font-size: 12px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    transition: background .2s, transform .2s;
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
  }
  .D-email-btn:hover { background: #007a70; transform: translateY(-1px); }

  /* DATA LISTS */
  .D-data-list { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
  .D-data-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    border-radius: 8px; font-size: 13px;
    border: 1px solid;
    transition: transform .18s;
  }
  .D-data-item:hover { transform: translateX(3px); }
  .D-data-item.del {
    background: rgba(16,185,129,0.05);
    border-color: rgba(16,185,129,0.2);
    color: var(--text-b);
  }
  .D-data-item.ret {
    background: rgba(245,158,11,0.05);
    border-color: rgba(245,158,11,0.2);
    color: var(--text-b);
  }
  .D-data-item-icon { font-size: 15px; flex-shrink: 0; }
  .D-data-item-check {
    width: 18px; height: 18px; border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; flex-shrink: 0;
    margin-left: auto;
  }
  .D-data-item.del .D-data-item-check { background: rgba(16,185,129,0.12); color: var(--green); }
  .D-data-item.ret .D-data-item-check { background: rgba(245,158,11,0.12); color: var(--amber); }

  /* TIMELINE */
  .D-timeline {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 12px; margin-top: 4px;
  }
  .D-tl-card {
    padding: 16px 14px; text-align: center;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    position: relative; overflow: hidden;
  }
  .D-tl-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .D-tl-card.c1::before { background: linear-gradient(90deg, var(--teal), var(--blue)); }
  .D-tl-card.c2::before { background: linear-gradient(90deg, var(--blue), var(--amber)); }
  .D-tl-card.c3::before { background: linear-gradient(90deg, var(--amber), var(--green)); }
  .D-tl-num { font-size: 28px; font-weight: 900; color: var(--text-h); letter-spacing: -0.04em; font-family: 'DM Mono', monospace; margin-bottom: 2px; }
  .D-tl-unit { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--text-m); margin-bottom: 6px; }
  .D-tl-desc { font-size: 11px; color: var(--text-m); line-height: 1.4; }

  /* WARNING BANNER */
  .D-warning {
    margin-top: 16px; padding: 14px 18px;
    background: var(--red-dim);
    border: 1px solid var(--red-border);
    border-radius: 9px;
    display: flex; align-items: flex-start; gap: 10px;
  }
  .D-warning-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .D-warning-text { font-size: 12px; color: #7f1d1d; line-height: 1.6; }
  .D-warning-text strong { font-weight: 700; }

  /* CONTACT BLOCK */
  .D-contact {
    margin-top: 20px;
    padding: 28px;
    background: var(--navy);
    border-radius: 14px;
    display: flex; align-items: center; gap: 24px;
    box-shadow: var(--sh3);
    flex-wrap: wrap;
  }
  .D-contact-icon {
    width: 52px; height: 52px; border-radius: 13px;
    background: rgba(0,180,166,0.15);
    border: 1px solid rgba(0,180,166,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
  }
  .D-contact-label { font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--teal); font-weight: 600; font-family: 'DM Mono', monospace; margin-bottom: 5px; }
  .D-contact-email { font-size: 18px; font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 4px; }
  .D-contact-note { font-size: 11px; color: rgba(255,255,255,0.45); line-height: 1.5; }
  .D-contact-cta {
    margin-left: auto;
    padding: 11px 24px;
    background: linear-gradient(135deg, var(--teal), var(--blue));
    border: none; border-radius: 9px;
    font-size: 13px; font-weight: 600; color: #fff; cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,180,166,0.3);
    transition: box-shadow .2s, transform .2s;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
  }
  .D-contact-cta:hover { box-shadow: 0 6px 22px rgba(0,180,166,0.4); transform: translateY(-1px); }

  /* FOOTER */
  .D-footer {
    position: relative; z-index: 10;
    border-top: 1px solid var(--border);
    padding: 18px 48px;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 11px; color: var(--text-m);
    background: var(--white);
  }
  .D-footer-right { display: flex; align-items: center; gap: 8px; }
  .D-footer-badge {
    display: flex; align-items: center; gap: 5px;
    padding: 3px 10px;
    border: 1px solid var(--border); border-radius: 18px;
    font-size: 9px; letter-spacing: .1em; text-transform: uppercase;
    font-weight: 600; background: var(--bg); color: var(--text-m);
  }
  .D-fdot { width: 5px; height: 5px; border-radius: 50%; }
  .D-fdot-r { background: var(--red); }
  .D-fdot-g { background: var(--green); }

  @media(max-width:680px){
    .D-nav { padding: 0 18px; }
    .D-page { padding: 36px 16px 60px; }
    .D-info-strip, .D-timeline { grid-template-columns: 1fr; }
    .D-option-tabs { grid-template-columns: 1fr; }
    .D-contact { flex-direction: column; }
    .D-contact-cta { margin-left: 0; width: 100%; text-align: center; }
    .D-footer { flex-direction: column; gap: 10px; padding: 14px 18px; text-align: center; }
  }
`;

const DeletedData = [
  { icon: "👤", label: "User account information" },
  { icon: "🪪", label: "Profile details" },
  { icon: "📦", label: "Stored application data" },
  { icon: "📊", label: "Usage data linked to your account" },
];

const RetainedData = [
  { icon: "⚖️", label: "Legal obligations" },
  { icon: "🛡️", label: "Fraud prevention records" },
  { icon: "🏦", label: "Financial or regulatory compliance" },
];

export default function AccountDeletion() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <style>{styles}</style>
      <div className='D'>
        <div className='D-dots' />
        <div className='D-glow' />

        {/* NAV */}
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

        <div className='D-page'>
          {/* HERO */}
          <div className='D-hero'>
            <div className='D-top-badge'>
              <span className='D-top-badge-dot' />
              Account & Data Deletion
            </div>
            <h1 className='D-hero-title'>
              Delete Your Account
              <br />
              <span>& All Your Data</span>
            </h1>
            <p className='D-hero-sub'>
              We respect your right to erasure. This page explains how to permanently delete your Storelense account and what happens to your data when you do.
            </p>
          </div>

          {/* INFO STRIP */}
          <div className='D-info-strip'>
            <div className='D-info-card'>
              <div className='D-info-icon teal'>📱</div>
              <div>
                <div className='D-info-label'>App Name</div>
                <div className='D-info-val'>Storelense</div>
              </div>
            </div>
            <div className='D-info-card'>
              <div className='D-info-icon blue'>🏢</div>
              <div>
                <div className='D-info-label'>Developer</div>
                <div className='D-info-val'>Pragma Solutions Ltd.</div>
              </div>
            </div>
          </div>

          <div className='D-divider'>
            <div className='D-divider-line' />
            <div className='D-divider-label'>How to Request Deletion</div>
            <div className='D-divider-line' />
          </div>

          {/* HOW TO DELETE */}
          <div className='D-block'>
            <div className='D-option-tabs'>
              <button className={`D-option-tab${tab === 0 ? " active" : ""}`} onClick={() => setTab(0)}>
                <div className='D-tab-dot'>1</div>
                Delete from App
              </button>
              <button className={`D-option-tab${tab === 1 ? " active" : ""}`} onClick={() => setTab(1)}>
                <div className='D-tab-dot'>2</div>
                Request by Email
              </button>
            </div>
            <div className='D-block-body'>
              {tab === 0 ? (
                <>
                  <p style={{ marginBottom: 16 }}>The quickest way to delete your account is directly from within the Storelense app:</p>
                  <div className='D-steps'>
                    {[
                      { n: "1", title: "Open the Storelense application", desc: "Launch the app on your device and sign in to your account." },
                      { n: "2", title: "Navigate to Settings", desc: "Tap the menu icon and select Settings from the navigation." },
                      { n: "3", title: 'Select "Delete Account"', desc: "Scroll to the bottom and tap Delete Account, then confirm your choice." },
                    ].map((s) => (
                      <div key={s.n} className='D-step'>
                        <div className='D-step-circle'>{s.n}</div>
                        <div style={{ paddingTop: 5 }}>
                          <div className='D-step-title'>{s.title}</div>
                          <div className='D-step-desc'>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p>If you cannot access the app, you may request account deletion by contacting us directly via email.</p>
                  <div className='D-email-box'>
                    <div className='D-email-left'>
                      <div className='D-email-label'>Send your request to</div>
                      <div className='D-email-addr'>admin@pragmasolutions.co</div>
                      <div className='D-email-note'>Please include the email address associated with your account.</div>
                    </div>
                    <button className='D-email-btn' onClick={() => window.open("mailto:support@yourdomain.com")}>
                      ✉️ Send Email
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className='D-divider' style={{ marginTop: 28 }}>
            <div className='D-divider-line' />
            <div className='D-divider-label'>What Happens to Your Data</div>
            <div className='D-divider-line' />
          </div>

          {/* DELETED DATA */}
          <div className='D-block'>
            <div className='D-block-header'>
              <div className='D-block-icon green'>🗑️</div>
              <div>
                <div className='D-block-tag green'>Permanently Removed</div>
                <div className='D-block-title'>Data That Will Be Deleted</div>
              </div>
            </div>
            <div className='D-block-body'>
              <p>
                When your account is deleted, the following data will be <strong>permanently and irreversibly removed</strong> from our systems:
              </p>
              <div className='D-data-list'>
                {DeletedData.map((d) => (
                  <div key={d.label} className='D-data-item del'>
                    <span className='D-data-item-icon'>{d.icon}</span>
                    {d.label}
                    <span className='D-data-item-check'>✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RETAINED DATA */}
          <div className='D-block'>
            <div className='D-block-header'>
              <div className='D-block-icon amber'>🔒</div>
              <div>
                <div className='D-block-tag amber'>Limited Retention</div>
                <div className='D-block-title'>Data That May Be Retained</div>
              </div>
            </div>
            <div className='D-block-body'>
              <p>
                Certain information may be retained for a <strong>limited period</strong> where required for legal or regulatory reasons:
              </p>
              <div className='D-data-list'>
                {RetainedData.map((d) => (
                  <div key={d.label} className='D-data-item ret'>
                    <span className='D-data-item-icon'>{d.icon}</span>
                    {d.label}
                    <span className='D-data-item-check'>⏳</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 14, fontSize: 12, color: "var(--text-m)" }}>
                Any retained data is securely stored and automatically deleted after the required retention period expires.
              </p>
            </div>
          </div>

          {/* TIMELINE */}
          <div className='D-block'>
            <div className='D-block-header'>
              <div className='D-block-icon blue'>⏱️</div>
              <div>
                <div className='D-block-tag blue'>Processing Timeline</div>
                <div className='D-block-title'>Deletion Processing Time</div>
              </div>
            </div>
            <div className='D-block-body'>
              <div className='D-timeline'>
                <div className='D-tl-card c1'>
                  <div className='D-tl-num'>2 days</div>
                  <div className='D-tl-unit'>Acknowledgement</div>
                  <div className='D-tl-desc'>We confirm receipt of your request</div>
                </div>
                <div className='D-tl-card c2'>
                  <div className='D-tl-num'>14</div>
                  <div className='D-tl-unit'>Days to Process</div>
                  <div className='D-tl-desc'>Full deletion after identity verification</div>
                </div>
                <div className='D-tl-card c3'>
                  <div className='D-tl-num'>0</div>
                  <div className='D-tl-unit'>Recovery Possible</div>
                  <div className='D-tl-desc'>Account cannot be recovered once deleted</div>
                </div>
              </div>
              <div className='D-warning'>
                <div className='D-warning-icon'>⚠️</div>
                <div className='D-warning-text'>
                  <strong>This action is permanent.</strong> Once your account deletion is complete, all associated data is erased and your account cannot be
                  recovered under any circumstances.
                </div>
              </div>
            </div>
          </div>

          <div className='D-divider' style={{ marginTop: 28 }}>
            <div className='D-divider-line' />
            <div className='D-divider-label'>Need Help?</div>
            <div className='D-divider-line' />
          </div>

          {/* CONTACT */}
          <div className='D-contact'>
            <div className='D-contact-icon'>✉️</div>
            <div>
              <div className='D-contact-label'>Contact Support</div>
              <div className='D-contact-email'>admin@pragmasolutions.co</div>
              <div className='D-contact-note'>Questions about account or data deletion? Our team responds within 24 hours.</div>
            </div>
            <button className='D-contact-cta' onClick={() => window.open("mailto:support@yourdomain.com")}>
              Send a Message →
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className='D-footer'>
          <span>© {new Date().getFullYear()} Pragma Solutions Ltd. — Storelense</span>
          <div className='D-footer-right'>
            <span className='D-footer-badge'>
              <span className='D-fdot D-fdot-r' />
              GDPR / NDPA Compliant
            </span>
            <span className='D-footer-badge'>
              <span className='D-fdot D-fdot-g' />
              Secure Deletion
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
