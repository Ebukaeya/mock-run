import React, { useState, useEffect } from "react";
import { Smartphone, Download, Share, Home, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import QRCode from "react-qr-code";

const MobileAppDownload = () => {
  const [deviceType, setDeviceType] = useState("unknown");
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    detectDevice();
  }, []);

  const detectDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      setDeviceType("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setDeviceType("ios");
    } else {
      setDeviceType("desktop");
    }
  };

  const handleAndroidDownload = () => {
    setDownloadStarted(true);
    // Replace with your actual APK download URL
    const apkUrl = "/downloads/storelense.apk";
    window.location.href = apkUrl;

    setTimeout(() => {
      setDownloadStarted(false);
    }, 3000);
  };

  const iosInstallSteps = [
    {
      icon: <Smartphone size={24} />,
      title: "Open Safari Browser",
      description: "Visit www.app.storelense.com in Safari browser (this feature only works in Safari)",
    },
    {
      icon: <Share size={24} />,
      title: "Tap the Share button",
      description: "At the bottom of Safari, tap the share icon (square with arrow pointing up)",
    },
    {
      icon: <Home size={24} />,
      title: 'Select "Add to Home Screen"',
      description: 'Scroll down and tap "Add to Home Screen" from the menu',
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Confirm and Add",
      description: 'Tap "Add" in the top right corner. The StoreLense app icon will appear on your home screen',
    },
  ];

  return (
    <div className='slapp-wrapper'>
      <div className='slapp-container'>
        {/* Header */}
        <div className='slapp-header'>
          <div className='slapp-phone-mockup'>
            <div className='slapp-phone-device'>
              <div className='slapp-phone-notch'></div>
              <div className='slapp-phone-screen'>
                <div className='slapp-app-preview'>
                  <div className='slapp-app-icon'>
                    <Smartphone size={32} />
                  </div>
                  <div className='slapp-app-name'>StoreLense</div>
                  <div className='slapp-app-tagline'>Business on the Go</div>
                </div>
              </div>
            </div>
          </div>

          <div className='slapp-header-content'>
            <div className='slapp-badge'>
              <Smartphone size={16} />
              <span>Mobile App</span>
            </div>
            <h2 className='slapp-title'>Take Your Business Anywhere</h2>
            <p className='slapp-subtitle'>
              Manage your store, track sales, and engage customers from your mobile device. Full POS functionality in the palm of your hand.
            </p>
          </div>
        </div>

        {/* Download Section */}
        <div className='slapp-download-section'>
          {deviceType === "android" && (
            <div className='slapp-download-card slapp-android-card'>
              <div className='slapp-card-header'>
                <div className='slapp-platform-icon slapp-android-icon'>
                  <svg viewBox='0 0 24 24' width='32' height='32' fill='currentColor'>
                    <path d='M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z' />
                  </svg>
                </div>
                <div>
                  <h3 className='slapp-platform-title'>Android Device Detected</h3>
                  <p className='slapp-platform-subtitle'>Download the APK directly</p>
                </div>
              </div>

              <div className='slapp-card-content'>
                <div className='slapp-info-box slapp-info-warning'>
                  <AlertCircle size={20} />
                  <div>
                    <strong>Enable Unknown Sources</strong>
                    <p>Go to Settings → Security → Enable "Install from Unknown Sources" to install the APK</p>
                  </div>
                </div>

                <button className='slapp-download-btn slapp-btn-android' onClick={handleAndroidDownload} disabled={downloadStarted}>
                  <Download size={20} />
                  <span>{downloadStarted ? "Downloading..." : "Download APK"}</span>
                </button>

                <div className='slapp-download-info'>
                  <div className='slapp-info-item'>
                    <span className='slapp-info-label'>Version:</span>
                    <span className='slapp-info-value'>2.1.5</span>
                  </div>
                  <div className='slapp-info-item'>
                    <span className='slapp-info-label'>Size:</span>
                    <span className='slapp-info-value'>45 MB</span>
                  </div>
                  <div className='slapp-info-item'>
                    <span className='slapp-info-label'>Updated:</span>
                    <span className='slapp-info-value'>Dec 9, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {deviceType === "ios" && (
            <div className='slapp-download-card slapp-ios-card'>
              <div className='slapp-card-header'>
                <div className='slapp-platform-icon slapp-ios-icon'>
                  <svg viewBox='0 0 24 24' width='32' height='32' fill='currentColor'>
                    <path d='M17.05,20.28c-0.98,0.95-2.05,0.8-3.08,0.35c-1.09-0.46-2.09-0.48-3.24,0c-1.44,0.62-2.2,0.44-3.06-0.35 C2.79,15.25,3.51,7.59,9.05,7.31c1.35,0.07,2.29,0.74,3.08,0.8c1.18-0.24,2.31-0.93,3.57-0.84c1.51,0.12,2.65,0.72,3.4,1.8 c-3.12,1.87-2.38,5.98,0.48,7.13c-0.57,1.5-1.31,2.99-2.54,4.09L17.05,20.28z M12.03,7.25c-0.15-2.23,1.66-4.07,3.74-4.25 c0.29,2.58-2.34,4.5-3.74,4.25z' />
                  </svg>
                </div>
                <div>
                  <h3 className='slapp-platform-title'>iOS Device Detected</h3>
                  <p className='slapp-platform-subtitle'>Add to your home screen</p>
                </div>
              </div>

              <div className='slapp-card-content'>
                <div className='slapp-info-box slapp-info-primary'>
                  <AlertCircle size={20} />
                  <div>
                    <strong>Visit in Safari Browser</strong>
                    <p>
                      Open <strong>www.app.storelense.com</strong> in Safari to install the app on your home screen. This feature only works in Safari browser.
                    </p>
                  </div>
                </div>

                <div className='slapp-url-box'>
                  <div className='slapp-url-label'>Website URL:</div>
                  <div className='slapp-url-value'>www.app.storelense.com</div>
                </div>

                <button className='slapp-guide-btn' onClick={() => setShowIOSGuide(!showIOSGuide)}>
                  <span>Installation Guide</span>
                  <ChevronRight size={20} className={`slapp-chevron ${showIOSGuide ? "slapp-chevron-open" : ""}`} />
                </button>

                {showIOSGuide && (
                  <div className='slapp-ios-guide'>
                    {iosInstallSteps.map((step, index) => (
                      <div key={index} className='slapp-guide-step'>
                        <div className='slapp-step-number'>{index + 1}</div>
                        <div className='slapp-step-icon'>{step.icon}</div>
                        <div className='slapp-step-content'>
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {deviceType === "desktop" && (
            <div className='slapp-download-card slapp-desktop-card'>
              <div className='slapp-card-header'>
                <div className='slapp-platform-icon slapp-desktop-icon'>
                  <Smartphone size={32} />
                </div>
                <div>
                  <h3 className='slapp-platform-title'>Desktop Detected</h3>
                  <p className='slapp-platform-subtitle'>Scan QR code with your mobile device</p>
                </div>
              </div>

              <div className='slapp-card-content'>
                <div className='slapp-qr-container'>
                  <div className='slapp-qr-code'>
                    <div className='slapp-qr-pattern'>
                      {/* Placeholder QR code pattern */}
                      <div className='slapp-qr-grid'>
                        <QRCode value={"https://expo.dev/artifacts/eas/bnutrDS5sy2Y34XNcbekhP.apk"} size={200} level='M' bgColor='#FFFFFF' fgColor='#000000' />
                      </div>
                    </div>
                  </div>
                  <p className='slapp-qr-instruction'>Scan this QR code with your phone's camera to download the app</p>
                </div>

                <div className='slapp-platform-options'>
                  <div className='slapp-platform-option'>
                    <div className='slapp-option-icon slapp-android-icon'>
                      <svg viewBox='0 0 24 24' width='24' height='24' fill='currentColor'>
                        <path d='M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z' />
                      </svg>
                    </div>
                    <div>
                      <strong>Android</strong>
                      <p>Download APK</p>
                    </div>
                  </div>
                  <div className='slapp-platform-option'>
                    <div className='slapp-option-icon slapp-ios-icon'>
                      <svg viewBox='0 0 24 24' width='24' height='24' fill='currentColor'>
                        <path d='M17.05,20.28c-0.98,0.95-2.05,0.8-3.08,0.35c-1.09-0.46-2.09-0.48-3.24,0c-1.44,0.62-2.2,0.44-3.06-0.35 C2.79,15.25,3.51,7.59,9.05,7.31c1.35,0.07,2.29,0.74,3.08,0.8c1.18-0.24,2.31-0.93,3.57-0.84c1.51,0.12,2.65,0.72,3.4,1.8 c-3.12,1.87-2.38,5.98,0.48,7.13c-0.57,1.5-1.31,2.99-2.54,4.09L17.05,20.28z M12.03,7.25c-0.15-2.23,1.66-4.07,3.74-4.25 c0.29,2.58-2.34,4.5-3.74,4.25z' />
                      </svg>
                    </div>
                    <div>
                      <strong>iOS</strong>
                      <p>Add to Home Screen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className='slapp-features-section'>
          <h3 className='slapp-features-title'>Everything You Need, Everywhere You Go</h3>
          <div className='slapp-features-grid'>
            <div className='slapp-feature-card'>
              <div className='slapp-feature-icon'>📊</div>
              <h4>Real-time Dashboard</h4>
              <p>Monitor sales, inventory, and performance metrics on the go</p>
            </div>
            <div className='slapp-feature-card'>
              <div className='slapp-feature-icon'>🛒</div>
              <h4>Mobile POS</h4>
              <p>Process transactions anywhere with built-in payment support</p>
            </div>
            <div className='slapp-feature-card'>
              <div className='slapp-feature-icon'>📦</div>
              <h4>Inventory Management</h4>
              <p>Track stock levels and receive low inventory alerts</p>
            </div>
            <div className='slapp-feature-card'>
              <div className='slapp-feature-icon'>👥</div>
              <h4>Customer Engagement</h4>
              <p>Send SMS and email campaigns directly from your phone</p>
            </div>
            <div className='slapp-feature-card'>
              <div className='slapp-feature-icon'>📈</div>
              <h4>Sales Reports</h4>
              <p>Generate and share reports with your team instantly</p>
            </div>
            <div className='slapp-feature-card'>
              <div className='slapp-feature-icon'>🔔</div>
              <h4>Push Notifications</h4>
              <p>Stay updated with real-time alerts and reminders</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slapp-wrapper {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }

        .slapp-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .slapp-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .slapp-header {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 60px;
        }

        .slapp-phone-mockup {
          display: flex;
          justify-content: center;
        }

        .slapp-phone-device {
          width: 280px;
          height: 560px;
          background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          border: 3px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .slapp-phone-notch {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 28px;
          background: #0f172a;
          border-radius: 0 0 20px 20px;
          z-index: 3;
        }

        .slapp-phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .slapp-app-preview {
          text-align: center;
          z-index: 1;
        }

        .slapp-app-icon {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #1e40af;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .slapp-app-name {
          font-size: 24px;
          font-weight: 900;
          color: white;
          margin-bottom: 8px;
        }

        .slapp-app-tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .slapp-header-content {
          text-align: left;
        }

        .slapp-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        }

        .slapp-title {
          font-size: 56px;
          font-weight: 900;
          background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          letter-spacing: -2px;
        }

        .slapp-subtitle {
          font-size: 18px;
          color: #64748b;
          line-height: 1.7;
        }

        .slapp-download-section {
          margin-bottom: 80px;
        }

        .slapp-download-card {
          background: white;
          backdrop-filter: blur(10px);
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .slapp-card-header {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
          align-items: center;
        }

        .slapp-platform-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slapp-android-icon {
          background: linear-gradient(135deg, #3ddc84 0%, #2bb672 100%);
          color: white;
        }

        .slapp-ios-icon {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          color: white;
        }

        .slapp-desktop-icon {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }

        .slapp-platform-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .slapp-platform-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .slapp-card-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .slapp-info-box {
          display: flex;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          align-items: flex-start;
        }

        .slapp-info-warning {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #d97706;
        }

        .slapp-info-primary {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #2563eb;
        }

        .slapp-info-box svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .slapp-info-box strong {
          display: block;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .slapp-info-box p {
          font-size: 13px;
          color: #475569;
          margin: 0;
          line-height: 1.5;
        }

        .slapp-url-box {
          padding: 20px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 2px solid #3b82f6;
          border-radius: 12px;
          text-align: center;
        }

        .slapp-url-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .slapp-url-value {
          font-size: 20px;
          font-weight: 900;
          color: #1e40af;
          font-family: monospace;
          letter-spacing: 0.5px;
        }

        .slapp-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 32px;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .slapp-btn-android {
          background: linear-gradient(135deg, #3ddc84 0%, #2bb672 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(61, 220, 132, 0.4);
        }

        .slapp-btn-android:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(61, 220, 132, 0.5);
        }

        .slapp-btn-android:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .slapp-download-info {
          display: flex;
          justify-content: space-around;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .slapp-info-item {
          text-align: center;
        }

        .slapp-info-label {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .slapp-info-value {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .slapp-guide-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          color: #0f172a;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .slapp-guide-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .slapp-chevron {
          transition: transform 0.3s ease;
        }

        .slapp-chevron-open {
          transform: rotate(90deg);
        }

        .slapp-ios-guide {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: slapp-slide-down 0.3s ease-out;
        }

        @keyframes slapp-slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slapp-guide-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .slapp-step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .slapp-step-icon {
          color: #3b82f6;
          flex-shrink: 0;
        }

        .slapp-step-content h4 {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .slapp-step-content p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        .slapp-qr-container {
          text-align: center;
        }

        .slapp-qr-code {
          width: 200px;
          height: 200px;
          background: white;
          border-radius: 16px;
          padding: 16px;
          margin: 0 auto 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .slapp-qr-pattern {
          width: 100%;
          height: 100%;
        }

        .slapp-qr-grid {
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          grid-template-rows: repeat(16, 1fr);
          gap: 1px;
          width: 100%;
          height: 100%;
        }

        .slapp-qr-pixel {
          background: white;
        }

        .slapp-qr-filled {
          background: black;
        }

        .slapp-qr-instruction {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .slapp-platform-options {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .slapp-platform-option {
          flex: 1;
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .slapp-option-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slapp-platform-option strong {
          display: block;
          color: #0f172a;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .slapp-platform-option p {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .slapp-features-section {
          text-align: center;
        }

        .slapp-features-title {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 40px;
        }

        .slapp-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .slapp-feature-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .slapp-feature-card:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .slapp-feature-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .slapp-feature-card h4 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 12px 0;
        }

        .slapp-feature-card p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .slapp-header {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .slapp-header-content {
            text-align: center;
          }

          .slapp-title {
            font-size: 44px;
          }
        }

        @media (max-width: 768px) {
          .slapp-wrapper {
            padding: 60px 16px;
          }

          .slapp-title {
            font-size: 36px;
          }

          .slapp-subtitle {
            font-size: 16px;
          }

          .slapp-download-card {
            padding: 24px;
          }

          .slapp-phone-device {
            width: 240px;
            height: 480px;
          }

          .slapp-platform-options {
            flex-direction: column;
          }

          .slapp-features-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .slapp-title {
            font-size: 28px;
            letter-spacing: -1px;
          }

          .slapp-card-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileAppDownload;
