import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const styles = `
  :root {
    --sl-bg:#f4f7fb;--sl-white:#ffffff;--sl-border:#dde3ee;--sl-border-soft:#e8edf6;
    --sl-teal:#00b4a6;--sl-teal-dark:#008f84;--sl-teal-dim:rgba(0,180,166,0.10);--sl-teal-border:rgba(0,180,166,0.25);
    --sl-blue:#3b82f6;--sl-blue-light:#60a5fa;--sl-blue-dim:rgba(59,130,246,0.10);
    --sl-h:#0f1f3d;--sl-b:#3d4f6b;--sl-m:#7a8faa;--sl-f:#a8b8cc;
    --sl-green:#10b981;--sl-amber:#f59e0b;--sl-red:#ef4444;
    --sh1:0 1px 3px rgba(15,31,61,0.07);--sh2:0 4px 16px rgba(15,31,61,0.08);--sh3:0 8px 32px rgba(15,31,61,0.10);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{}
  .R{background:var(--sl-bg);color:var(--sl-b);min-height:100vh;overflow-x:hidden;}
  .bdots{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:radial-gradient(circle,rgba(59,130,246,0.07) 1px,transparent 1px);background-size:28px 28px;}
  .bglow{position:fixed;top:-100px;left:50%;transform:translateX(-50%);width:800px;height:360px;background:radial-gradient(ellipse,rgba(0,180,166,0.08) 0%,transparent 70%);pointer-events:none;z-index:0;}

  .nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.93);backdrop-filter:blur(16px);border-bottom:1px solid var(--sl-border);padding:0 40px;height:60px;display:flex;align-items:center;justify-content:space-between;box-shadow:var(--sh1);}
  .nav-logo{display:flex;align-items:center;gap:9px;text-decoration:none;}
  .nav-ring{width:32px;height:32px;border-radius:50%;border:2px solid var(--sl-teal);display:flex;align-items:center;justify-content:center;background:var(--sl-teal-dim);}
  .nav-ring svg{width:14px;height:14px;stroke:var(--sl-teal-dark);fill:none;stroke-width:2.2;}
  .wm{font-size:17px;font-weight:800;color:var(--sl-h);letter-spacing:-0.03em;}
  .wm em{font-style:normal;color:var(--sl-teal-dark);}
  .nav-links{display:flex;gap:26px;list-style:none;}
  .nav-links a{font-size:13px;font-weight:500;color:var(--sl-b);text-decoration:none;transition:color .18s;}
  .nav-links a:hover{color:var(--sl-teal-dark);}
  .cta{padding:8px 22px;background:linear-gradient(135deg,var(--sl-teal),var(--sl-blue));border-radius:22px;font-size:13px;font-weight:600;color:#fff;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,180,166,0.28);transition:box-shadow .2s,transform .2s;}
  .cta:hover{box-shadow:0 6px 18px rgba(0,180,166,0.38);transform:translateY(-1px);}

  .hero{position:relative;z-index:10;padding:64px 40px 52px;border-bottom:1px solid var(--sl-border);background:linear-gradient(180deg,rgba(255,255,255,0.97) 0%,transparent 100%);}
  .badge{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;background:linear-gradient(135deg,var(--sl-teal-dim),var(--sl-blue-dim));border:1px solid var(--sl-teal-border);border-radius:22px;font-size:10px;font-weight:600;color:var(--sl-teal-dark);letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px;}
  .bdot{width:6px;height:6px;background:var(--sl-teal);border-radius:50%;animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
  .htitle{font-size:clamp(34px,5vw,60px);font-weight:900;line-height:1.0;letter-spacing:-.04em;color:var(--sl-h);margin-bottom:18px;}
  .haccent{background:linear-gradient(90deg,var(--sl-teal-dark),var(--sl-blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .hsub{font-size:14px;color:var(--sl-m);line-height:1.75;max-width:520px;margin-bottom:24px;}
  .hmeta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:11px;color:var(--sl-f);}
  .hmi{display:flex;align-items:center;gap:5px;}
  .hball{width:7px;height:7px;border-radius:50%;background:var(--sl-blue);}

  .layout{position:relative;z-index:10;display:grid;grid-template-columns:252px 1fr;min-height:calc(100vh - 180px);}
  .sidebar{position:sticky;top:60px;height:calc(100vh - 60px);overflow-y:auto;border-right:1px solid var(--sl-border);padding:26px 14px;background:var(--sl-white);scrollbar-width:thin;scrollbar-color:var(--sl-border) transparent;}
  .sb-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--sl-f);margin-bottom:12px;padding-left:8px;}
  .nl{list-style:none;display:flex;flex-direction:column;gap:1px;}
  .ni a{display:flex;align-items:center;gap:8px;padding:8px 8px;border-radius:7px;text-decoration:none;font-size:11px;color:var(--sl-m);transition:all .16s;border:1px solid transparent;}
  .ni a:hover{background:var(--sl-bg);color:var(--sl-b);border-color:var(--sl-border-soft);}
  .ni.on a{background:linear-gradient(135deg,var(--sl-teal-dim),var(--sl-blue-dim));color:var(--sl-teal-dark);border-color:var(--sl-teal-border);font-weight:600;}
  .nn{;font-size:9px;color:var(--sl-blue-light);opacity:.65;min-width:16px;}
  .ni.on .nn{color:var(--sl-teal-dark);opacity:1;}

  .content{padding:48px 56px 72px;max-width:820px;}
  .sec{margin-bottom:52px;opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease;}
  .sec.vis{opacity:1;transform:translateY(0);}
  .sh{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--sl-border-soft);}
  .sn{font-family:'DM Mono',monospace;font-size:10px;color:var(--sl-blue-light);opacity:.65;}
  .st{font-size:20px;font-weight:800;color:var(--sl-h);letter-spacing:-.025em;}
  .sb{font-size:14px;line-height:1.8;color:var(--sl-b);}
  .sb p{margin-bottom:12px;}
  .sb p:last-child{margin-bottom:0;}
  .sb strong{color:var(--sl-h);font-weight:700;}

  .card{margin-top:14px;padding:16px 18px;background:var(--sl-bg);border-radius:9px;border:1px solid var(--sl-border);box-shadow:var(--sh1);}
  .ct{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--sl-teal-dark);font-weight:600;margin-bottom:10px;;}

  .chips{display:flex;flex-direction:column;gap:7px;margin-top:10px;}
  .chip{display:flex;align-items:flex-start;gap:9px;padding:9px 13px;background:var(--sl-white);border-radius:7px;font-size:12px;color:var(--sl-b);border:1px solid var(--sl-border);box-shadow:var(--sh1);line-height:1.5;transition:border-color .2s;}
  .chip:hover{border-color:var(--sl-teal-border);}
  .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:4px;}
  .dt{background:linear-gradient(135deg,var(--sl-teal),var(--sl-blue));}
  .dr{background:var(--sl-red);}
  .da{background:var(--sl-amber);}

  .ch2{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px;}

  .co{margin-top:14px;padding:14px 18px;border-radius:9px;position:relative;overflow:hidden;}
  .co::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px 0 0 3px;}
  .co p{font-size:13px;line-height:1.7;margin:0;}
  .co-t{background:linear-gradient(135deg,rgba(0,180,166,.06),rgba(59,130,246,.06));border:1px solid var(--sl-teal-border);}
  .co-t::before{background:linear-gradient(180deg,var(--sl-teal),var(--sl-blue));}
  .co-t p{color:var(--sl-h);}
  .co-a{background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.25);}
  .co-a::before{background:var(--sl-amber);}
  .co-a p{color:#78350f;}
  .co-r{background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.22);}
  .co-r::before{background:var(--sl-red);}
  .co-r p{color:#7f1d1d;}

  .ipg{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:12px;}
  .ipc{padding:16px 12px;background:var(--sl-white);border:1px solid var(--sl-border);border-radius:9px;text-align:center;box-shadow:var(--sh1);transition:border-color .2s,transform .2s;}
  .ipc:hover{border-color:var(--sl-teal-border);transform:translateY(-2px);}
  .ipci{font-size:24px;margin-bottom:7px;}
  .ipcl{font-size:11px;font-weight:600;color:var(--sl-b);}

  .lg{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:12px;}
  .lc{padding:14px;background:var(--sl-white);border:1px solid var(--sl-border);border-radius:9px;box-shadow:var(--sh1);display:flex;gap:11px;align-items:flex-start;transition:border-color .2s,transform .2s;}
  .lc:hover{border-color:rgba(239,68,68,.25);transform:translateY(-1px);}
  .li{width:32px;height:32px;border-radius:7px;background:rgba(239,68,68,.08);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
  .lt{font-size:12px;font-weight:700;color:var(--sl-h);margin-bottom:2px;}
  .ld{font-size:11px;color:var(--sl-m);line-height:1.4;}
  .cap{margin-top:12px;padding:16px 20px;background:linear-gradient(135deg,#fff7ed,#fffbeb);border:1px solid rgba(245,158,11,.28);border-radius:9px;display:flex;align-items:center;gap:14px;box-shadow:var(--sh1);}
  .capi{font-size:26px;flex-shrink:0;}
  .capl{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:var(--sl-amber);font-weight:600;margin-bottom:3px;font-family:'DM Mono',monospace;}
  .capt{font-size:12px;color:#78350f;line-height:1.6;}

  .steps{display:flex;flex-direction:column;margin-top:12px;position:relative;}
  .steps::before{content:'';position:absolute;left:16px;top:22px;bottom:22px;width:1px;background:var(--sl-border);}
  .step{display:flex;align-items:flex-start;gap:12px;padding:10px 0;}
  .scc{width:32px;height:32px;border-radius:50%;border:2px solid var(--sl-border);background:var(--sl-white);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;position:relative;z-index:1;box-shadow:var(--sh1);}
  .scc.ct2{border-color:var(--sl-teal);background:var(--sl-teal-dim);}
  .scc.ca{border-color:var(--sl-amber);background:rgba(245,158,11,.08);}
  .scc.cr{border-color:var(--sl-red);background:rgba(239,68,68,.08);}
  .sttl{font-size:13px;font-weight:700;color:var(--sl-h);margin-bottom:2px;}
  .stdsc{font-size:12px;color:var(--sl-m);line-height:1.5;}

  .gcard{margin-top:14px;padding:22px;background:linear-gradient(135deg,rgba(0,180,166,.05),rgba(59,130,246,.05));border:1px solid var(--sl-teal-border);border-radius:11px;display:flex;gap:18px;align-items:center;box-shadow:var(--sh1);}
  .gflag{font-size:38px;flex-shrink:0;}
  .gl{font-size:9px;text-transform:uppercase;letter-spacing:.14em;color:var(--sl-teal-dark);font-weight:600;font-family:'DM Mono',monospace;margin-bottom:3px;}
  .gtitle{font-size:15px;font-weight:800;color:var(--sl-h);margin-bottom:4px;letter-spacing:-.02em;}
  .gdesc{font-size:12px;color:var(--sl-m);line-height:1.5;}

  .ccard{margin-top:14px;padding:24px;background:var(--sl-white);border:1px solid var(--sl-border);border-radius:11px;display:flex;gap:16px;align-items:flex-start;box-shadow:var(--sh2);}
  .cav{width:46px;height:46px;border-radius:11px;background:linear-gradient(135deg,var(--sl-teal),var(--sl-blue));display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;box-shadow:0 4px 12px rgba(0,180,166,.25);}
  .cname{font-size:16px;font-weight:800;color:var(--sl-h);margin-bottom:7px;letter-spacing:-.02em;}
  .cmeta span{display:block;font-size:12px;color:var(--sl-m);line-height:1.9;}

  .foot{position:relative;z-index:10;border-top:1px solid var(--sl-border);padding:18px 40px;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--sl-m);background:var(--sl-white);}
  .fbadges{display:flex;align-items:center;gap:9px;}
  .fb{display:flex;align-items:center;gap:5px;padding:3px 11px;border:1px solid var(--sl-border);border-radius:18px;font-size:9px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;background:var(--sl-bg);}
  .fd{width:5px;height:5px;border-radius:50%;}
  .fdg{background:var(--sl-green);}
  .fdb{background:var(--sl-blue);}

  @media(max-width:860px){
    .layout{grid-template-columns:1fr;}
    .sidebar{display:none;}
    .content{padding:24px 18px 56px;max-width:100%;}
    .hero{padding:36px 18px 32px;}
    .nav{padding:0 18px;}
    .nav-links{display:none;}
    .lg,.ch2{grid-template-columns:1fr;}
    .ipg{grid-template-columns:1fr 1fr;}
    .foot{flex-direction:column;gap:10px;padding:14px 18px;text-align:center;}
    .ccard,.gcard{flex-direction:column;}
  }
`;

const secs = [
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

function useActive() {
  const [a, setA] = useState("s1");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setA(e.target.id);
        }),
      { threshold: 0.2 }
    );
    secs.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return a;
}

function Sec({ id, num, title, children }) {
  const r = useRef(null);
  useEffect(() => {
    if (!r.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) r.current.classList.add("vis");
      },
      { threshold: 0.05 }
    );
    obs.observe(r.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} className='sec' ref={r}>
      <div className='sh'>
        <span className='sn'>{num}</span>
        <h2 className='st'>{title}</h2>
      </div>
      <div className='sb'>{children}</div>
    </section>
  );
}

const Chip = ({ d = "dt", text }) => (
  <div className='chip'>
    <span className={`dot ${d}`} />
    {text}
  </div>
);

export default function TermsOfService() {
  const active = useActive();
  return (
    <>
      <style>{styles}</style>
      <div className='R'>
        <div className='bdots' />
        <div className='bglow' />

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

        <header className='hero'>
          <div className='badge'>
            <span className='bdot' />
            Terms of Service
          </div>
          <h1 className='htitle'>
            Clear Terms,
            <br />
            <span className='haccent'>Fair Rules.</span>
          </h1>
          <p className='hsub'>
            These Terms govern your access to and use of the Storelense platform. Please read them carefully before creating an account or using the Service.
          </p>
          <div className='hmeta'>
            <div className='hmi'>
              <span className='hball' />
              Nigerian Law Governed
            </div>
            <span>·</span>
            <div className='hmi'>Last Updated: Feb 22 2026</div>
            <span>·</span>
            <div className='hmi'>Pragma Solutions Ltd.</div>
          </div>
        </header>

        <div className='layout'>
          <aside className='sidebar'>
            <p className='sb-label'>Contents</p>
            <ul className='nl'>
              {secs.map((s) => (
                <li key={s.id} className={`ni${active === s.id ? " on" : ""}`}>
                  <a href={`#${s.id}`}>
                    <span className='nn'>{s.num}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className='content'>
            <Sec id='s1' num='01' title='Introduction'>
              <p>
                These Terms of Service ("Terms") govern your access to and use of <strong>Storelense</strong>, an inventory management SaaS platform owned and
                operated by <strong>Pragma Solutions Ltd.</strong>, a company incorporated in the Federal Republic of Nigeria ("Company", "we", "us", or "our").
              </p>
              <div className='co co-t'>
                <p>📄 By creating an account or using the Service, you agree to be bound by these Terms.</p>
              </div>
            </Sec>

            <Sec id='s2' num='02' title='Eligibility'>
              <p>To use Storelense, you must meet all of the following requirements:</p>
              <div className='chips'>
                <Chip d='dt' text='Be at least 18 years old' />
                <Chip d='dt' text='Have the authority to bind your business to this agreement' />
                <Chip d='dt' text='Use the Service for lawful business purposes only' />
              </div>
            </Sec>

            <Sec id='s3' num='03' title='Account Registration'>
              <p>To use Storelense, you must provide accurate and complete account information:</p>
              <div className='ch2'>
                {["Full name", "Email address", "Phone number", "Business address"].map((i) => (
                  <Chip key={i} d='dt' text={i} />
                ))}
              </div>
              <div className='co co-a' style={{ marginTop: 14 }}>
                <p>⚠️ You are responsible for safeguarding your login credentials and for all activities that occur under your account.</p>
              </div>
            </Sec>

            <Sec id='s4' num='04' title='License to Use the Service'>
              <p>
                We grant you a <strong>limited, non-exclusive, non-transferable, revocable license</strong> to access and use Storelense solely for your
                internal business operations.
              </p>
              <div className='card'>
                <p className='ct'>You agree NOT to:</p>
                <div className='chips' style={{ marginTop: 0 }}>
                  <Chip d='dr' text='Reverse engineer or copy the platform' />
                  <Chip d='dr' text='Resell or sublicense the Service to third parties' />
                  <Chip d='dr' text='Upload malicious software or harmful code' />
                  <Chip d='dr' text='Interfere with or disrupt system security' />
                  <Chip d='dr' text='Use the Service for any unlawful purpose' />
                </div>
              </div>
            </Sec>

            <Sec id='s5' num='05' title='Subscription and Payment'>
              <div className='chips'>
                <Chip d='dt' text='Subscription fees are billed in advance on a recurring basis' />
                <Chip d='da' text='Payments are non-refundable except as required by applicable law' />
                <Chip d='dr' text='Failure to pay may result in suspension or termination of your account' />
                <Chip d='dt' text='We may update pricing with reasonable prior notice to users' />
              </div>
            </Sec>

            <Sec id='s6' num='06' title='User Data'>
              <div className='co co-t'>
                <p>
                  ✅ <strong>You retain full ownership</strong> of all business and inventory data you upload to Storelense.
                </p>
              </div>
              <div className='chips' style={{ marginTop: 14 }}>
                <Chip d='dt' text='You grant Pragma Solutions Ltd. a limited license to host, process, and store your data solely to provide the Service' />
                <Chip d='da' text='You are responsible for ensuring your uploaded content does not violate any laws or third-party rights' />
              </div>
            </Sec>

            <Sec id='s7' num='07' title='Intellectual Property'>
              <p>
                All intellectual property rights in the Storelense platform remain the exclusive property of <strong>Pragma Solutions Ltd.</strong>
              </p>
              <div className='ipg'>
                {[
                  { i: "💻", l: "Software & Code" },
                  { i: "™️", l: "Branding & Trademarks" },
                  { i: "🎨", l: "Design & UI" },
                ].map((s) => (
                  <div key={s.l} className='ipc'>
                    <div className='ipci'>{s.i}</div>
                    <div className='ipcl'>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className='co co-a' style={{ marginTop: 14 }}>
                <p>⚠️ No rights are transferred to you except as expressly stated in these Terms.</p>
              </div>
            </Sec>

            <Sec id='s8' num='08' title='Service Availability'>
              <p>We strive for high availability but do not guarantee uninterrupted or error-free operation of the Service.</p>
              <div className='chips' style={{ marginTop: 14 }}>
                <Chip d='dt' text='We target high uptime and work to minimize downtime' />
                <Chip d='da' text='We may modify, suspend, or discontinue features at our discretion' />
                <Chip d='da' text='Scheduled maintenance may temporarily affect availability' />
              </div>
            </Sec>

            <Sec id='s9' num='09' title='Disclaimer of Warranties'>
              <div className='co co-r'>
                <p>
                  🚫 The Service is provided <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> without warranties of any kind, to the fullest extent
                  permitted by Nigerian law. We make no guarantees regarding accuracy, completeness, or fitness for a particular purpose.
                </p>
              </div>
            </Sec>

            <Sec id='s10' num='10' title='Limitation of Liability'>
              <p>To the maximum extent permitted under Nigerian law, Pragma Solutions Ltd. shall not be liable for:</p>
              <div className='lg'>
                {[
                  { i: "📉", t: "Indirect Damages", d: "Consequential or incidental loss" },
                  { i: "💸", t: "Loss of Profits", d: "Lost revenue or business opportunity" },
                  { i: "💾", t: "Data Loss", d: "Loss or corruption of your data" },
                  { i: "⛔", t: "Business Interruption", d: "Downtime or operational disruption" },
                ].map((r) => (
                  <div key={r.t} className='lc'>
                    <div className='li'>{r.i}</div>
                    <div>
                      <div className='lt'>{r.t}</div>
                      <div className='ld'>{r.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='cap'>
                <div className='capi'>⚖️</div>
                <div>
                  <div className='capl'>Liability Cap</div>
                  <div className='capt'>
                    Total liability shall not exceed the total subscription fees paid by you in the <strong>12 months preceding the claim</strong>.
                  </div>
                </div>
              </div>
            </Sec>

            <Sec id='s11' num='11' title='Termination'>
              <div className='steps'>
                {[
                  { e: "✅", c: "ct2", t: "Cancel Anytime", d: "You may cancel your subscription at any time through your account settings." },
                  {
                    e: "⚠️",
                    c: "ca",
                    t: "Grounds for Suspension",
                    d: "We may suspend or terminate your access if you violate these Terms or fail to pay applicable fees.",
                  },
                  {
                    e: "🗑️",
                    c: "cr",
                    t: "Data After Termination",
                    d: "Upon termination, access will be revoked and data may be deleted after a reasonable retention period.",
                  },
                ].map((s) => (
                  <div key={s.t} className='step'>
                    <div className={`scc ${s.c}`}>{s.e}</div>
                    <div style={{ paddingTop: 3 }}>
                      <div className='sttl'>{s.t}</div>
                      <div className='stdsc'>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Sec>

            <Sec id='s12' num='12' title='Governing Law and Jurisdiction'>
              <p>These Terms shall be governed by and construed in accordance with the laws of Nigeria.</p>
              <div className='gcard'>
                <div className='gflag'>🇳🇬</div>
                <div>
                  <div className='gl'>Governing Jurisdiction</div>
                  <div className='gtitle'>Federal Republic of Nigeria</div>
                  <div className='gdesc'>Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.</div>
                </div>
              </div>
            </Sec>

            <Sec id='s13' num='13' title='Changes to These Terms'>
              <p>We may update these Terms from time to time to reflect changes in our practices, legal requirements, or platform features.</p>
              <div className='co co-t'>
                <p>📢 Continued use of the Service after updated Terms are posted constitutes your acceptance of the changes.</p>
              </div>
            </Sec>

            <Sec id='s14' num='14' title='Company Information'>
              <p>Storelense is owned and operated by:</p>
              <div className='ccard'>
                <div className='cav'>
                  <div className='slp-company-avatar'>
                    <img
                      style={{
                        width: "60px",
                        borderRadius: "40px",
                      }}
                      src={require("../../assessStatic/pictures/webstoreIm/Logo_light.png")}
                    />
                  </div>
                </div>
                <div>
                  <div className='cname'>Pragma Solutions Ltd.</div>
                  <div className='cmeta'>
                    <span>A company incorporated in the Federal Republic of Nigeria</span>
                    <span>RC Number: 1751090</span>
                    <span>Registered Address: 1/2, KM 2 OLD ABA OWERRI ROAD, ABA, ABIA STATE,</span>
                    <span>Official Email: admin@pragmasolutions.co</span>
                  </div>
                </div>
              </div>
            </Sec>
          </main>
        </div>

        <footer className='foot'>
          <span>© {new Date().getFullYear()} Pragma Solutions Ltd. — All rights reserved.</span>
          <div className='fbadges'>
            <span className='fb'>
              <span className='fd fdg' />
              Nigerian Law
            </span>
            <span className='fb'>
              <span className='fd fdb' />
              Storelense ToS
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
