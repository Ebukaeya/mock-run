import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const styles = `


  * { margin: 0; padding: 0; box-sizing: border-box; }

  .slrp-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #eaf6f6 0%, #f0fafa 40%, #e8f4f8 100%);

    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .slrp-root::before {
    content: '';
    position: absolute;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(32,178,170,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .slrp-root::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(32,178,170,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  /* NAV */
  .slrp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(32,178,170,0.1);
  }

  .slrp-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .slrp-nav-logo-circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid #20b2aa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #20b2aa;
    font-weight: 700;
    font-size: 14px;
   
  }

  .slrp-nav-brand-text {
  
    font-size: 22px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .slrp-nav-brand-text span {
    color: #20b2aa;
  }

  .slrp-nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .slrp-nav-links a {
    font-size: 14px;
    color: #4a5568;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .slrp-nav-links a:hover { color: #20b2aa; }

  .slrp-nav-cta {
    background: #20b2aa;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    
    transition: background 0.2s, transform 0.15s;
  }

  .slrp-nav-cta:hover {
    background: #189a93;
    transform: translateY(-1px);
  }

  /* MAIN LAYOUT */
  .slrp-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    position: relative;
    z-index: 1;
  }

  .slrp-card-wrapper {
    width: 100%;
    max-width: 460px;
    animation: slrp-fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes slrp-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .slrp-card {
    background: white;
    border-radius: 24px;
    padding: 44px 20px;
    box-shadow: 0 4px 40px rgba(32,178,170,0.1), 0 1px 8px rgba(0,0,0,0.06);
    border: 1px solid rgba(32,178,170,0.12);
  }

  .slrp-card-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #20b2aa, #17c5bb);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    box-shadow: 0 8px 20px rgba(32,178,170,0.3);
  }

  .slrp-card-icon svg {
    width: 26px;
    height: 26px;
    stroke: white;
    fill: none;
  }

  .slrp-card-title {
    
    font-size: 28px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 6px;
  }

  .slrp-card-subtitle {
    font-size: 14px;
    color: #718096;
    margin-bottom: 32px;
    line-height: 1.6;
  }

  /* FORM */
  .slrp-form-group {
    margin-bottom: 20px;
  }

  .slrp-field-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
    letter-spacing: 0.02em;
  }

  .slrp-field-wrap {
    position: relative;
  }

  .slrp-field-input {
    width: 100%;
    padding: 13px 48px 13px 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 15px;
   
    color: #1a1a2e;
    background: #fafcfc;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }

  .slrp-field-input::placeholder { color: #b0bec5; }

  .slrp-field-input:focus {
    border-color: #20b2aa;
    background: white;
    box-shadow: 0 0 0 4px rgba(32,178,170,0.1);
  }

  .slrp-field-input.slrp-input-error {
    border-color: #fc8181;
    box-shadow: 0 0 0 4px rgba(252,129,129,0.1);
  }

  .slrp-field-input.slrp-input-success {
    border-color: #68d391;
    box-shadow: 0 0 0 4px rgba(104,211,145,0.1);
  }

  .slrp-toggle-eye {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #a0aec0;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .slrp-toggle-eye:hover { color: #20b2aa; }

  .slrp-toggle-eye svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .slrp-error-msg {
    font-size: 12px;
    color: #e53e3e;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    animation: slrp-shake 0.3s ease;
  }

  @keyframes slrp-shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  /* STRENGTH BAR */
  .slrp-strength-wrap {
    margin-top: 10px;
  }

  .slrp-strength-bars {
    display: flex;
    gap: 4px;
    margin-bottom: 5px;
  }

  .slrp-strength-bar {
    flex: 1;
    height: 4px;
    border-radius: 99px;
    background: #e2e8f0;
    transition: background 0.3s;
  }

  .slrp-strength-bar.slrp-bar-weak   { background: #fc8181; }
  .slrp-strength-bar.slrp-bar-fair   { background: #f6ad55; }
  .slrp-strength-bar.slrp-bar-good   { background: #68d391; }
  .slrp-strength-bar.slrp-bar-strong { background: #20b2aa; }

  .slrp-strength-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .slrp-strength-label.slrp-label-weak   { color: #fc8181; }
  .slrp-strength-label.slrp-label-fair   { color: #f6ad55; }
  .slrp-strength-label.slrp-label-good   { color: #68d391; }
  .slrp-strength-label.slrp-label-strong { color: #20b2aa; }

  /* SUBMIT */
  .slrp-submit-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #20b2aa, #17a89f);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    
    cursor: pointer;
    margin-top: 8px;
    transition: transform 0.15s, box-shadow 0.2s, background 0.2s;
    box-shadow: 0 4px 16px rgba(32,178,170,0.35);
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
  }

  .slrp-submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .slrp-submit-btn:hover:not(:disabled)::before { opacity: 1; }

  .slrp-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(32,178,170,0.4);
  }

  .slrp-submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .slrp-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* SUCCESS STATE */
  .slrp-success-card {
    text-align: center;
    padding: 20px 0;
    animation: slrp-fadeUp 0.5s ease both;
  }

  .slrp-success-icon {
    width: 72px;
    height: 72px;
    background: linear-gradient(135deg, #20b2aa, #17c5bb);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 8px 24px rgba(32,178,170,0.3);
    animation: slrp-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
  }

  @keyframes slrp-pop {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .slrp-success-icon svg {
    width: 32px;
    height: 32px;
    stroke: white;
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .slrp-success-title {
   
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 8px;
  }

  .slrp-success-text {
    font-size: 14px;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .slrp-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #20b2aa;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
   
    transition: gap 0.2s;
  }

  .slrp-back-btn:hover { gap: 12px; }

  .slrp-back-btn svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* FOOTER LINK */
  .slrp-card-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
    color: #718096;
  }

  .slrp-card-footer a {
    color: #20b2aa;
    font-weight: 600;
    text-decoration: none;
  }

  .slrp-card-footer a:hover { text-decoration: underline; }

  /* SPINNER */
  .slrp-spinner {
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: slrp-spin 0.7s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
  }

  @keyframes slrp-spin {
    to { transform: rotate(360deg); }
  }
`;

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const strengthMeta = [
  { label: "Weak", cls: "weak" },
  { label: "Fair", cls: "fair" },
  { label: "Good", cls: "good" },
  { label: "Strong", cls: "strong" },
];

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox='0 0 24 24' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  ) : (
    <svg viewBox='0 0 24 24' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94' />
      <path d='M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19' />
      <line x1='1' y1='1' x2='23' y2='23' />
    </svg>
  );
}

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();

  const timestamp = Number(searchParams.get("timestamp"));
  const token = searchParams.get("token");
  const userID = searchParams.get("id");

  console.log(token, timestamp, userID);

  //check if timestamp is within 10 minutes
  const TEN_MINUTES = 10 * 60 * 1000;

  const strength = getStrength(password);
  const meta = strengthMeta[Math.max(0, strength - 1)];

  useEffect(() => {
    if (Date.now() - timestamp > TEN_MINUTES) {
      alert("This password reset link has expired. Please request a new one.");

      window.location.href = "https://www.app.storelense.com/sign-in"; // Adjust the URL as needed
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Must be at least 8 characters";
    if (!confirm) e.confirm = "Please confirm your password";
    else if (confirm !== password) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);

    try {
      const url = process.env.REACT_APP_Back_end_api_root + "/signIn/updateForgottenPassword/";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, userId: userID, newPassword: password }),
      });

      const data = await res.json();

      if (res.status === 400) {
        alert(data.message || "Failed to reset password. Please try again.");
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccess(true);
    } catch (error) {
      console.log("Error resetting password:", error);

      alert("An error occurred while resetting your password. Please try again later.");
    } finally {
      setLoading(false);
    }
    /*  await new Promise((r) => setTimeout(r, 1800)); */
  };

  return (
    <>
      <style>{styles}</style>
      <div className='slrp-root'>
        {/* NAV */}
        {/*  <nav className='slrp-nav'>
          <a className='slrp-nav-brand' href='#'>
            <div className='slrp-nav-logo-circle'>S</div>
            <span className='slrp-nav-brand-text'>
              Store<span>Lense</span>
            </span>
          </a>
          <ul className='slrp-nav-links'>
            {["Home", "Features", "Services", "Pricing", "Contact"].map((l) => (
              <li key={l}>
                <a href='#'>{l}</a>
              </li>
            ))}
          </ul>
          <button className='slrp-nav-cta'>Get Started</button>
        </nav> */}
        {/* Navigation */}
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

        {/* MAIN */}
        <main className='slrp-main'>
          <div className='slrp-card-wrapper'>
            <div className='slrp-card'>
              {success ? (
                <div className='slrp-success-card'>
                  <div className='slrp-success-icon'>
                    <svg viewBox='0 0 24 24'>
                      <polyline points='20 6 9 17 4 12' />
                    </svg>
                  </div>
                  <h2 className='slrp-success-title'>Password Reset!</h2>
                  <p className='slrp-success-text'>
                    Your password has been updated successfully.
                    <br />
                    You can now log in with your new credentials.
                  </p>
                </div>
              ) : (
                <>
                  <div className='slrp-card-icon'>
                    <svg viewBox='0 0 24 24' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                      <path d='M7 11V7a5 5 0 0110 0v4' />
                    </svg>
                  </div>
                  <h1 className='slrp-card-title'>Reset Password</h1>
                  <p className='slrp-card-subtitle'>Choose a strong new password for your StoreLense account.</p>

                  {/* PASSWORD */}
                  <div className='slrp-form-group'>
                    <label className='slrp-field-label'>New Password</label>
                    <div className='slrp-field-wrap'>
                      <input
                        type={showPwd ? "text" : "password"}
                        className={`slrp-field-input${errors.password ? " slrp-input-error" : password && !errors.password ? " slrp-input-success" : ""}`}
                        placeholder='Min. 8 characters'
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrors((v) => ({ ...v, password: "" }));
                        }}
                      />
                      <button className='slrp-toggle-eye' onClick={() => setShowPwd((v) => !v)} type='button' tabIndex={-1}>
                        <EyeIcon open={showPwd} />
                      </button>
                    </div>
                    {errors.password && <div className='slrp-error-msg'>⚠ {errors.password}</div>}
                    {password && (
                      <div className='slrp-strength-wrap'>
                        <div className='slrp-strength-bars'>
                          {[1, 2, 3, 4].map((n) => (
                            <div key={n} className={`slrp-strength-bar${strength >= n ? ` slrp-bar-${meta.cls}` : ""}`} />
                          ))}
                        </div>
                        <span className={`slrp-strength-label slrp-label-${meta.cls}`}>{meta.label}</span>
                      </div>
                    )}
                  </div>

                  {/* CONFIRM */}
                  <div className='slrp-form-group'>
                    <label className='slrp-field-label'>Confirm Password</label>
                    <div className='slrp-field-wrap'>
                      <input
                        type={showCfm ? "text" : "password"}
                        className={`slrp-field-input${errors.confirm ? " slrp-input-error" : confirm && confirm === password ? " slrp-input-success" : ""}`}
                        placeholder='Re-enter your password'
                        value={confirm}
                        onChange={(e) => {
                          setConfirm(e.target.value);
                          setErrors((v) => ({ ...v, confirm: "" }));
                        }}
                      />
                      <button className='slrp-toggle-eye' onClick={() => setShowCfm((v) => !v)} type='button' tabIndex={-1}>
                        <EyeIcon open={showCfm} />
                      </button>
                    </div>
                    {errors.confirm && <div className='slrp-error-msg'>⚠ {errors.confirm}</div>}
                  </div>

                  <button className='slrp-submit-btn' onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <>
                        <span className='slrp-spinner' />
                        Updating...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
