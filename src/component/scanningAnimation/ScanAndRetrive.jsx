/* import React, { useState, useEffect } from "react";
import { Smartphone, QrCode, CheckCircle, Receipt, CreditCard, Calendar, Clock, User } from "lucide-react";

// Simple QR Code SVG Component
const QRCodeSVG = ({ value, size = 140 }) => {
  // Generate a simple QR-like pattern for demonstration
  const generateQRPattern = () => {
    const gridSize = 25;
    const pattern = [];

    // Create deterministic pattern based on value
    let seed = 0;
    for (let i = 0; i < value.length; i++) {
      seed += value.charCodeAt(i);
    }

    for (let i = 0; i < gridSize * gridSize; i++) {
      // Use seed to create pseudo-random but consistent pattern
      pattern.push(((seed * (i + 1) * 9301 + 49297) % 233280) / 233280 > 0.5);
    }

    return pattern;
  };

  const pattern = generateQRPattern();
  const gridSize = 25;
  const cellSize = size / gridSize;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns='http://www.w3.org/2000/svg'>
      <rect width={size} height={size} fill='white' />

      <rect x='0' y='0' width={cellSize * 7} height={cellSize * 7} fill='black' />
      <rect x={cellSize} y={cellSize} width={cellSize * 5} height={cellSize * 5} fill='white' />
      <rect x={cellSize * 2} y={cellSize * 2} width={cellSize * 3} height={cellSize * 3} fill='black' />

      <rect x={size - cellSize * 7} y='0' width={cellSize * 7} height={cellSize * 7} fill='black' />
      <rect x={size - cellSize * 6} y={cellSize} width={cellSize * 5} height={cellSize * 5} fill='white' />
      <rect x={size - cellSize * 5} y={cellSize * 2} width={cellSize * 3} height={cellSize * 3} fill='black' />

      <rect x='0' y={size - cellSize * 7} width={cellSize * 7} height={cellSize * 7} fill='black' />
      <rect x={cellSize} y={size - cellSize * 6} width={cellSize * 5} height={cellSize * 5} fill='white' />
      <rect x={cellSize * 2} y={size - cellSize * 5} width={cellSize * 3} height={cellSize * 3} fill='black' />

      {pattern.map((filled, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Skip finder pattern areas
        if ((row < 7 && col < 7) || (row < 7 && col >= gridSize - 7) || (row >= gridSize - 7 && col < 7)) {
          return null;
        }

        if (!filled) return null;

        return <rect key={index} x={col * cellSize} y={row * cellSize} width={cellSize} height={cellSize} fill='black' />;
      })}
    </svg>
  );
};

const QRScanningFeature = () => {
  const [animationStep, setAnimationStep] = useState(0);
  // Step 0: Show receipt only
  // Step 1: Phone appears and moves to QR code
  // Step 2: Scanning in progress
  // Step 3: Show transaction details
  // Step 4: Reset

  useEffect(() => {
    const timings = [2000, 2000, 2500, 3000, 1000]; // Duration for each step

    const timer = setTimeout(() => {
      setAnimationStep((prev) => (prev + 1) % 5);
    }, timings[animationStep]);

    return () => clearTimeout(timer);
  }, [animationStep]);

  const transactionData = {
    id: "TXN-2024-001893",
    items: [
      { name: "Coca Cola 50cl", qty: 2, price: 700, image: "🥤" },
      { name: "Peak Milk 400g", qty: 1, price: 1200, image: "🥛" },
      { name: "Indomie Chicken", qty: 5, price: 750, image: "🍜" },
    ],
  };

  return (
    <div className='slqr-feature-wrapper'>
      <div className='slqr-feature-container'>
        <div className='slqr-header-section'>
          <div className='slqr-badge'>
            <QrCode size={16} />
            <span>Smart Receipt Scanning</span>
          </div>
          <h2 className='slqr-main-title'>Scan & Retrieve Instantly</h2>
          <p className='slqr-subtitle'>
            Use the StoreLense mobile app to scan QR codes on receipts and instantly access complete transaction details, purchase history, and digital copies.
          </p>
        </div>

        <div className='slqr-content-grid'>
          <div className='slqr-demo-section'>
            <div className='slqr-scene-container'>
              <div className='slqr-receipt-paper'>
                <div className='slqr-receipt-header'>
                  <div className='slqr-store-logo'>StoreLense</div>
                  <p className='slqr-receipt-store'>Lekki Store</p>
                  <p className='slqr-receipt-address'>Lagos, Nigeria</p>
                </div>

                <div className='slqr-receipt-divider'></div>

                <div className='slqr-receipt-items'>
                  <div className='slqr-receipt-row'>
                    <span>Coca Cola 50cl x2</span>
                    <span>₦700</span>
                  </div>
                  <div className='slqr-receipt-row'>
                    <span>Peak Milk 400g x1</span>
                    <span>₦1,200</span>
                  </div>
                  <div className='slqr-receipt-row'>
                    <span>Indomie Chicken x5</span>
                    <span>₦750</span>
                  </div>
                </div>

                <div className='slqr-receipt-divider'></div>

                <div className='slqr-receipt-total'>
                  <div className='slqr-receipt-row'>
                    <span>Subtotal:</span>
                    <span>₦2,650</span>
                  </div>
                  <div className='slqr-receipt-row'>
                    <span>Tax:</span>
                    <span>₦265</span>
                  </div>
                  <div className='slqr-receipt-row slqr-total-main'>
                    <span>TOTAL:</span>
                    <span>₦2,915</span>
                  </div>
                </div>

                <div className='slqr-receipt-divider'></div>

                <div className='slqr-qr-container'>
                  <div className={`slqr-qr-code ${animationStep === 2 ? "slqr-scanning-active" : ""}`}>
                    <QRCodeSVG value='1234345432' size={124} />
                    {animationStep === 2 && (
                      <div className='slqr-scan-overlay'>
                        <div className='slqr-scan-line-vertical'></div>
                      </div>
                    )}
                  </div>
                  <p className='slqr-qr-label'>Scan to view transaction</p>
                </div>

                <div className='slqr-receipt-footer'>
                  <p>TXN-2024-001893</p>
                  <p>Thank you for shopping!</p>
                </div>
              </div>

              {animationStep >= 1 && (
                <div className={`slqr-phone-container ${animationStep >= 1 ? "slqr-phone-appear" : ""} ${animationStep >= 2 ? "slqr-phone-scanning" : ""}`}>
                  <div className='slqr-phone'>
                    <div className='slqr-phone-notch'></div>

                    <div className='slqr-phone-screen'>
                      {animationStep < 3 ? (
                        <div className='slqr-camera-view'>
                          <div className='slqr-camera-receipt-preview'>
                            <div className='slqr-receipt-in-camera'>
                              <div className='slqr-camera-receipt-header'>
                                <div className='slqr-camera-store-logo'>StoreLense</div>
                                <p className='slqr-camera-receipt-store'>Lekki Store</p>
                                <p className='slqr-camera-receipt-address'>Lagos, Nigeria</p>
                              </div>

                              <div className='slqr-camera-receipt-divider'></div>

                              <div className='slqr-camera-receipt-items'>
                                <div className='slqr-camera-receipt-row'>
                                  <span>Coca Cola 50cl x2</span>
                                  <span>₦700</span>
                                </div>
                                <div className='slqr-camera-receipt-row'>
                                  <span>Peak Milk 400g x1</span>
                                  <span>₦1,200</span>
                                </div>
                                <div className='slqr-camera-receipt-row'>
                                  <span>Indomie x5</span>
                                  <span>₦750</span>
                                </div>
                              </div>

                              <div className='slqr-camera-receipt-divider'></div>

                              <div className='slqr-camera-receipt-total'>
                                <div className='slqr-camera-receipt-row'>
                                  <span>Subtotal:</span>
                                  <span>₦2,650</span>
                                </div>
                                <div className='slqr-camera-receipt-row'>
                                  <span>Tax:</span>
                                  <span>₦265</span>
                                </div>
                                <div className='slqr-camera-receipt-row slqr-camera-total-main'>
                                  <span>TOTAL:</span>
                                  <span>₦2,915</span>
                                </div>
                              </div>

                              <div className='slqr-camera-receipt-divider'></div>

                              <div className='slqr-camera-qr-display'>
                                <QRCodeSVG value='1234345432' size={90} />
                              </div>

                              <div className='slqr-camera-receipt-footer'>
                                <p>TXN-2024-001893</p>
                                <p>Thank you!</p>
                              </div>
                            </div>
                          </div>

                          <div className='slqr-camera-overlay'>
                            <div className='slqr-scan-frame'>
                              <div className='slqr-corner slqr-top-left'></div>
                              <div className='slqr-corner slqr-top-right'></div>
                              <div className='slqr-corner slqr-bottom-left'></div>
                              <div className='slqr-corner slqr-bottom-right'></div>
                              {animationStep === 2 && <div className='slqr-scanning-line'></div>}
                            </div>
                          </div>

                          <p className='slqr-camera-instruction'>{animationStep === 2 ? "Scanning QR Code..." : "Position QR code in frame"}</p>
                        </div>
                      ) : (
                        <div className='slqr-transaction-details'>
                          <div className='slqr-transaction-header'>
                            <div className='slqr-header-top'>
                              <span className='slqr-transaction-label'>TRANSACTION ID</span>
                              <button className='slqr-close-btn'>×</button>
                            </div>
                            <div className='slqr-transaction-id'>{transactionData.id}</div>
                            <button className='slqr-view-btn'>👁️</button>
                          </div>

                          <div className='slqr-products-section'>
                            <div className='slqr-products-header'>
                              <span>Products ({transactionData.items.length})</span>
                              <button className='slqr-expand-btn'>^</button>
                            </div>

                            <div className='slqr-search-box'>
                              <input type='text' placeholder='Search products...' className='slqr-search-input' />
                              <button className='slqr-search-button'>🔍</button>
                            </div>

                            <div className='slqr-product-list'>
                              {transactionData.items.map((item, index) => (
                                <div key={index} className='slqr-product-card'>
                                  <div className='slqr-product-image'>
                                    <span className='slqr-product-emoji'>{item.image}</span>
                                  </div>
                                  <div className='slqr-product-details'>
                                    <div className='slqr-product-name'>{item.name}</div>
                                    <div className='slqr-product-meta'>Qty: {item.qty}</div>
                                    <div className='slqr-product-price'>₦{item.price.toLocaleString()}</div>
                                  </div>
                                  <button className='slqr-return-btn'>🔄 Return</button>
                                </div>
                              ))}
                            </div>

                            <div className='slqr-action-buttons'>
                              <button className='slqr-return-all-btn'>Return All Item</button>
                              <button className='slqr-supply-all-btn'>Supply All Item</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slqr-feature-wrapper {
          background: linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%);
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }

        .slqr-feature-wrapper::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .slqr-feature-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .slqr-header-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .slqr-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .slqr-main-title {
          font-size: 56px;
          font-weight: 900;
          background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          letter-spacing: -2px;
        }

        .slqr-subtitle {
          font-size: 18px;
          color: #64748b;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .slqr-content-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 0;
        }

        .slqr-demo-section {
          position: relative;
          width: 100%;
          max-width: 900px;
        }

        .slqr-scene-container {
          position: relative;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slqr-receipt-paper {
          background: white;
          width: 340px;
          padding: 32px 28px;
          border-radius: 16px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 1;
        }

        .slqr-receipt-header {
          text-align: center;
          margin-bottom: 16px;
        }

        .slqr-store-logo {
          font-size: 20px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .slqr-receipt-store {
          font-size: 13px;
          color: #475569;
          margin: 4px 0;
        }

        .slqr-receipt-address {
          font-size: 11px;
          color: #94a3b8;
          margin: 0;
        }

        .slqr-receipt-divider {
          height: 1px;
          background: repeating-linear-gradient(90deg, #cbd5e1 0, #cbd5e1 4px, transparent 4px, transparent 8px);
          margin: 16px 0;
        }

        .slqr-receipt-items {
          margin: 16px 0;
        }

        .slqr-receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #334155;
          margin-bottom: 8px;
        }

        .slqr-receipt-total {
          margin-top: 16px;
        }

        .slqr-total-main {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          padding-top: 8px;
          margin-top: 8px;
          border-top: 2px solid #e2e8f0;
        }

        .slqr-qr-container {
          text-align: center;
          margin: 20px 0;
        }

        .slqr-qr-code {
          width: 150px;
          height: 150px;
          background: white;
          border: 4px solid #0f172a;
          border-radius: 8px;
          margin: 0 auto 12px;
          padding: 10px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slqr-qr-code.slqr-scanning-active {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4);
          border-color: #3b82f6;
          animation: slqr-qr-pulse 2s ease-in-out infinite;
        }

        @keyframes slqr-qr-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.6);
          }
        }

        .slqr-qr-code svg {
          display: block;
        }

        .slqr-qr-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .slqr-qr-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          height: 100%;
        }

        .slqr-qr-pixel {
          background: transparent;
          border-radius: 2px;
        }

        .slqr-qr-pixel.slqr-filled {
          background: #0f172a;
        }

        .slqr-scan-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .slqr-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          transition: top 0.1s linear;
        }

        .slqr-qr-label {
          font-size: 10px;
          color: #64748b;
          margin: 0;
        }

        .slqr-receipt-footer {
          text-align: center;
          margin-top: 16px;
          font-size: 10px;
          color: #94a3b8;
        }

        .slqr-receipt-footer p {
          margin: 4px 0;
        }

        .slqr-phone-container {
          position: absolute;
          display: flex;
          justify-content: center;
          left: 50%;
          bottom: -700px;
          transform: translateX(-50%);
          z-index: 10;
          opacity: 0;
          transition: all 1.5s ease-out;
          min-width: 300px;
        }

        .slqr-phone-container.slqr-phone-appear {
          bottom: -50px;
          opacity: 1;
        }

        .slqr-phone-container.slqr-phone-scanning {
          bottom: -50px;
        }

        .slqr-phone {
          width: 300px;
          height: 600px;
          background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 3px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .slqr-phone-notch {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 12px;
          background: #0f172a;
          border-radius: 0 0 10px 10px;
          z-index: 3;
        }

        .slqr-phone-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%);
          border-radius: 32px;
          overflow: hidden;
          position: relative;
        }

        .slqr-camera-view {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #e8f2fb 0%, #d6e9f7 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .slqr-camera-receipt-preview {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
        }

        .slqr-receipt-in-camera {
          background: white;
          padding: 24px 20px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
          max-width: 220px;
          width: 100%;
          transform: scale(0.98);
          transition: transform 0.3s ease;
        }

        .slqr-camera-receipt-header {
          text-align: center;
          margin-bottom: 14px;
        }

        .slqr-camera-store-logo {
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }

        .slqr-camera-receipt-store {
          font-size: 12px;
          color: #475569;
          margin: 3px 0;
          font-weight: 600;
        }

        .slqr-camera-receipt-address {
          font-size: 10px;
          color: #94a3b8;
          margin: 0;
        }

        .slqr-camera-receipt-divider {
          height: 1px;
          background: repeating-linear-gradient(90deg, #cbd5e1 0, #cbd5e1 3px, transparent 3px, transparent 6px);
          margin: 12px 0;
        }

        .slqr-camera-receipt-items {
          margin: 12px 0;
        }

        .slqr-camera-receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #334155;
          margin-bottom: 7px;
          line-height: 1.3;
        }

        .slqr-camera-receipt-row span:first-child {
          flex: 1;
          padding-right: 8px;
        }

        .slqr-camera-receipt-row span:last-child {
          font-weight: 600;
          white-space: nowrap;
        }

        .slqr-camera-receipt-total {
          margin-top: 12px;
        }

        .slqr-camera-total-main {
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
          padding-top: 6px;
          margin-top: 6px;
          border-top: 2px solid #e2e8f0;
        }

        .slqr-camera-qr-display {
          display: flex;
          justify-content: center;
          margin: 14px 0;
        }

        .slqr-camera-qr-display svg {
          border: 3px solid #0f172a;
          border-radius: 8px;
          padding: 5px;
          background: white;
        }

        .slqr-camera-receipt-footer {
          text-align: center;
          margin-top: 12px;
          font-size: 10px;
          color: #64748b;
        }

        .slqr-camera-receipt-footer p {
          margin: 3px 0;
        }

        .slqr-camera-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
          z-index: 10;
          pointer-events: none;
          margin-top: 100px;
        }

        .slqr-scan-frame {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .slqr-scanning-line {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.9);
          animation: slqr-scan-vertical 2s ease-in-out infinite;
        }

        @keyframes slqr-scan-vertical {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }

        .slqr-corner {
          position: absolute;
          width: 35px;
          height: 35px;
          border: 4px solid #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .slqr-top-left {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
          border-radius: 12px 0 0 0;
        }

        .slqr-top-right {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
          border-radius: 0 12px 0 0;
        }

        .slqr-bottom-left {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
          border-radius: 0 0 0 12px;
        }

        .slqr-bottom-right {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
          border-radius: 0 0 12px 0;
        }

        .slqr-progress-bar {
          position: absolute;
          bottom: -30px;
          left: 0;
          right: 0;
          height: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .slqr-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #14b8a6);
          transition: width 0.1s linear;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6);
          animation: slqr-progress-glow 1s ease-in-out infinite;
        }

        @keyframes slqr-progress-glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6);
          }
          50% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 1), 0 0 30px rgba(59, 130, 246, 0.8);
          }
        }

        .slqr-camera-instruction {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          font-weight: 600;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.3px;
          white-space: nowrap;
        }

        .slqr-transaction-details {
          padding: 0;
          background: #f1f5f9;
          height: 100%;
          overflow-y: auto;
          animation: slqr-slide-up 0.4s ease-out;
        }

        @keyframes slqr-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slqr-transaction-header {
          background: white;
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
        }

        .slqr-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .slqr-transaction-label {
          font-size: 8px;
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .slqr-close-btn {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background: #f1f5f9;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .slqr-close-btn:hover {
          background: #e2e8f0;
        }

        .slqr-transaction-id {
          font-size: 10px;
          color: #0f172a;
          font-weight: 700;
          margin-bottom: 6px;
          font-family: "Courier New", monospace;
        }

        .slqr-view-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: #e0f2fe;
          border: none;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .slqr-view-btn:hover {
          background: #bae6fd;
        }

        .slqr-products-section {
          padding: 10px 12px;
        }

        .slqr-products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 11px;
          font-weight: 600;
          color: #0f172a;
        }

        .slqr-expand-btn {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background: transparent;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          font-size: 11px;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .slqr-expand-btn:hover {
          background: #f8fafc;
        }

        .slqr-search-box {
          display: flex;
          gap: 5px;
          margin-bottom: 10px;
        }

        .slqr-search-input {
          flex: 1;
          padding: 7px 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 10px;
          background: white;
          color: #0f172a;
          transition: all 0.2s ease;
        }

        .slqr-search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .slqr-search-input::placeholder {
          color: #94a3b8;
        }

        .slqr-search-button {
          width: 32px;
          height: 32px;
          background: #3b82f6;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .slqr-search-button:hover {
          background: #2563eb;
        }

        .slqr-product-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 10px;
        }

        .slqr-product-card {
          background: white;
          border-radius: 8px;
          padding: 8px;
          display: flex;
          gap: 8px;
          align-items: center;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
        }

        .slqr-scan-line-vertical {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.9);
          animation: slqr-scan-vertical 2s ease-in-out infinite;
        }

        @keyframes slqr-scan-vertical {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }

        .slqr-product-emoji {
          font-size: 24px;
          display: block;
        }

        .slqr-product-image {
          width: 45px;
          height: 45px;
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slqr-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .slqr-product-details {
          flex: 1;
          min-width: 0;
        }

        .slqr-product-name {
          font-size: 10px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .slqr-product-meta {
          font-size: 9px;
          color: #64748b;
          margin-bottom: 3px;
        }

        .slqr-product-price {
          font-size: 11px;
          font-weight: 800;
          color: #0f172a;
        }

        .slqr-return-btn {
          padding: 6px 8px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .slqr-return-btn:hover {
          background: #b91c1c;
        }

        .slqr-action-buttons {
          display: flex;
          gap: 5px;
        }

        .slqr-return-all-btn,
        .slqr-supply-all-btn {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slqr-return-all-btn {
          background: #dc2626;
          color: white;
        }

        .slqr-return-all-btn:hover {
          background: #b91c1c;
        }

        .slqr-supply-all-btn {
          background: white;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .slqr-supply-all-btn:hover {
          background: #f8fafc;
          color: #475569;
        }

        .slqr-success-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e0f2fe;
        }

        .slqr-success-icon {
          color: #10b981;
          margin-bottom: 12px;
          animation: slqr-check-bounce 0.5s ease-out;
        }

        @keyframes slqr-check-bounce {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .slqr-success-header h3 {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .slqr-transaction-card {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #bae6fd;
        }

        .slqr-transaction-info {
          margin-bottom: 20px;
        }

        .slqr-info-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .slqr-info-icon {
          color: #3b82f6;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .slqr-info-label {
          font-size: 11px;
          color: #64748b;
          margin: 0 0 4px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .slqr-info-value {
          font-size: 13px;
          color: #0f172a;
          margin: 0;
          font-weight: 600;
        }

        .slqr-amount-display {
          background: white;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          border: 2px solid #3b82f6;
        }

        .slqr-amount-label {
          font-size: 12px;
          color: #64748b;
          margin: 0 0 8px 0;
          font-weight: 600;
        }

        .slqr-amount-value {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
          letter-spacing: -1px;
        }

        .slqr-scan-beam {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 20%, #3b82f6 50%, rgba(59, 130, 246, 0.2) 80%, transparent 100%);
          transform: translateY(-50%);
          animation: slqr-beam-scan 2s ease-in-out infinite;
          pointer-events: none;
          z-index: 10;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.6);
          filter: blur(1px);
        }

        @keyframes slqr-beam-scan {
          0% {
            opacity: 0;
            transform: translateY(-50%) translateX(-100%);
          }
          5% {
            opacity: 1;
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
          95% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-50%) translateX(100%);
          }
        }

        @media (max-width: 1200px) {
          .slqr-scene-container {
            min-height: 650px;
          }

          .slqr-phone-container.slqr-phone-appear {
            right: 10px;
          }
        }

        @media (max-width: 1024px) {
          .slqr-content-grid {
            padding: 20px;
          }

          .slqr-scene-container {
            min-height: 700px;
          }

          .slqr-phone-container {
            bottom: -700px;
          }

          .slqr-phone-container.slqr-phone-appear {
            bottom: -60px;
            opacity: 1;
          }

          .slqr-phone {
            width: 260px;
            height: 520px;
          }

          .slqr-receipt-paper {
            margin: 0 auto;
            width: 320px;
          }

          .slqr-main-title {
            font-size: 44px;
          }
        }

        @media (max-width: 768px) {
          .slqr-feature-wrapper {
            padding: 60px 16px;
          }

          .slqr-main-title {
            font-size: 36px;
          }

          .slqr-subtitle {
            font-size: 16px;
          }

          .slqr-scene-container {
            min-height: 650px;
          }

          .slqr-receipt-paper {
            width: 300px;
            padding: 28px 24px;
          }

          .slqr-phone {
            width: 240px;
            height: 480px;
          }

          .slqr-phone-container.slqr-phone-appear {
            bottom: -70px;
          }

          .slqr-camera-overlay {
            width: 120px;
            height: 120px;
            margin-top: 85px;
          }

          .slqr-receipt-in-camera {
            max-width: 190px;
            padding: 20px 16px;
          }

          .slqr-camera-store-logo {
            font-size: 16px;
          }

          .slqr-camera-receipt-row {
            font-size: 10px;
          }

          .slqr-camera-qr-display svg {
            width: 75px;
            height: 75px;
          }

          .slqr-corner {
            width: 30px;
            height: 30px;
          }
        }

        @media (max-width: 480px) {
          .slqr-main-title {
            font-size: 28px;
            letter-spacing: -1px;
          }

          .slqr-badge {
            font-size: 12px;
            padding: 6px 16px;
          }

          .slqr-scene-container {
            min-height: 600px;
          }

          .slqr-receipt-paper {
            width: 280px;
            padding: 24px 20px;
          }

          .slqr-phone {
            width: 220px;
            height: 440px;
          }

          .slqr-phone-container.slqr-phone-appear {
            bottom: -80px;
          }

          .slqr-camera-overlay {
            width: 160px;
            height: 160px;
          }

          .slqr-qr-code {
            width: 120px;
            height: 120px;
          }

          .slqr-camera-overlay {
            width: 110px;
            height: 110px;
            margin-top: 75px;
          }

          .slqr-receipt-in-camera {
            max-width: 170px;
            padding: 18px 14px;
          }

          .slqr-camera-store-logo {
            font-size: 15px;
          }

          .slqr-camera-receipt-row {
            font-size: 9px;
          }

          .slqr-camera-receipt-address {
            font-size: 9px;
          }

          .slqr-camera-qr-display svg {
            width: 70px;
            height: 70px;
          }

          .slqr-corner {
            width: 28px;
            height: 28px;
            border-width: 3px;
          }

          .slqr-camera-instruction {
            font-size: 13px;
            bottom: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default QRScanningFeature; */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Smartphone, ShieldCheck } from "lucide-react";
import "./ReceiptScanSection.css";

// ─── inline QR SVG (no lib needed) ────────────────────────
const QR_MODULES = [
  [38, 5],
  [46, 5],
  [54, 5],
  [62, 5],
  [38, 13],
  [54, 13],
  [46, 21],
  [62, 13],
  [38, 21],
  [62, 21],
  [5, 38],
  [13, 38],
  [21, 38],
  [38, 38],
  [46, 38],
  [62, 38],
  [70, 38],
  [86, 38],
  [54, 38],
  [78, 38],
  [5, 46],
  [21, 46],
  [46, 46],
  [62, 46],
  [78, 46],
  [86, 46],
  [13, 54],
  [38, 54],
  [54, 54],
  [70, 54],
  [86, 54],
  [5, 62],
  [21, 62],
  [46, 62],
  [62, 62],
  [78, 62],
  [38, 70],
  [54, 70],
  [62, 70],
  [70, 70],
  [86, 70],
  [38, 78],
  [54, 78],
  [78, 78],
  [46, 86],
  [62, 86],
  [70, 86],
  [86, 86],
  [38, 33],
  [54, 33],
  [33, 38],
  [33, 54],
];
const QR_WHITE = [
  [46, 33],
  [62, 33],
  [33, 46],
  [33, 62],
];

function QRSvg({ bg = "#FAFAF7", size = 72 }) {
  const fill = "#1A1A1A";
  return (
    <svg viewBox='0 0 100 100' width={size} height={size} style={{ display: "block" }}>
      <rect width='100' height='100' fill={bg} />
      {/* TL */}
      <rect x='5' y='5' width='28' height='28' fill={fill} />
      <rect x='8' y='8' width='22' height='22' fill={bg} />
      <rect x='11' y='11' width='16' height='16' fill={fill} />
      {/* TR */}
      <rect x='67' y='5' width='28' height='28' fill={fill} />
      <rect x='70' y='8' width='22' height='22' fill={bg} />
      <rect x='73' y='11' width='16' height='16' fill={fill} />
      {/* BL */}
      <rect x='5' y='67' width='28' height='28' fill={fill} />
      <rect x='8' y='70' width='22' height='22' fill={bg} />
      <rect x='11' y='73' width='16' height='16' fill={fill} />
      {QR_MODULES.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width='5' height='5' fill={fill} />
      ))}
      {QR_WHITE.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width='5' height='5' fill={bg} />
      ))}
    </svg>
  );
}

// ─── Receipt ───────────────────────────────────────────────
function Receipt({ scanned }) {
  return (
    <div className='rss__receipt-wrap'>
      <motion.div
        className='rss__receipt'
        initial={{ clipPath: "inset(0 0 100% 0)", y: -6 }}
        animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
      >
        <div className='r-logo'>StoreLense</div>
        <div className='r-store'>CJP WATCHES</div>
        <div className='r-addr'>
          Lekki Phase 1, Lagos
          <br />
          +234 801 592 7352
        </div>
        <div className='r-div' />
        <div className='r-row'>
          <span>Receipt</span>
          <span>
            <b>#SL-241128-047</b>
          </span>
        </div>
        <div className='r-row'>
          <span>Date</span>
          <span>
            <b>28 Nov 2024</b>
          </span>
        </div>
        <div className='r-row'>
          <span>Time</span>
          <span>
            <b>14:32 PM</b>
          </span>
        </div>
        <div className='r-row'>
          <span>Cashier</span>
          <span>
            <b>Adaeze O.</b>
          </span>
        </div>
        <div className='r-div' />
        <table className='r-table'>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>AMT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Casio G-Shock</td>
              <td>×1</td>
              <td>₦45,000</td>
            </tr>
            <tr>
              <td>Seiko Presage</td>
              <td>×1</td>
              <td>₦120,000</td>
            </tr>
            <tr>
              <td>Leather Strap</td>
              <td>×2</td>
              <td>₦8,000</td>
            </tr>
          </tbody>
        </table>
        <div className='r-div' />
        <table className='r-totals'>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>₦173,000</td>
            </tr>
            <tr>
              <td>VAT (7.5%)</td>
              <td>₦12,975</td>
            </tr>
            <tr className='r-grand'>
              <td>TOTAL</td>
              <td>₦185,975</td>
            </tr>
          </tbody>
        </table>
        <div className='r-div' />
        <div className='r-paid'>
          Paid <b>Card (Contactless)</b> · Auth <b>7892</b>
        </div>
        <div className='r-div' />
        <div className='r-scan-lbl'>Scan QR to view transaction</div>
        <div className={`r-qr-zone${scanned ? " r-qr-zone--scanned" : ""}`}>
          <QRSvg size={72} />
        </div>
        <div className='r-div' />
        <div className='r-addr' style={{ textAlign: "center" }}>
          Thank you · Powered by StoreLense
        </div>
      </motion.div>
    </div>
  );
}

// ─── Phone: Camera view ────────────────────────────────────
function CameraView({ scanning }) {
  return (
    <div className='rss__cam'>
      <div className='rss__cam-bar'>
        <span className='rss__cam-time'>14:32</span>
        <div className='rss__cam-icons'>
          <svg width='10' height='8' viewBox='0 0 10 8' fill='rgba(255,255,255,.7)'>
            <rect x='0' y='2' width='2' height='6' rx='1' />
            <rect x='3' y='1' width='2' height='7' rx='1' />
            <rect x='6' y='0' width='2' height='8' rx='1' />
          </svg>
          <svg width='10' height='8' viewBox='0 0 10 8' fill='none' stroke='rgba(255,255,255,.7)' strokeWidth='1.2'>
            <rect x='1' y='2' width='7' height='5' rx='1' />
            <path d='M8 4h1.5' />
          </svg>
        </div>
      </div>
      <div className='rss__cam-label'>CAMERA · QR SCAN</div>
      <div className='rss__cam-body'>
        {/* What the camera sees: receipt content */}
        <div className='rss__cam-feed'>
          <div className='rss__cf-lines'>
            <div className='rss__cf-line' style={{ width: "60%", margin: "0 auto" }} />
            <div className='rss__cf-line' style={{ width: "80%", margin: "0 auto" }} />
            <div className='rss__cf-divider' />
            {[
              ["30%", "20%", "22%"],
              ["35%", "8%", "22%"],
              ["30%", "8%", "20%"],
            ].map(([a, b, c], i) => (
              <div key={i} className='rss__cf-row'>
                <span style={{ width: a }} />
                <span style={{ width: b }} />
                <span style={{ width: c }} />
              </div>
            ))}
            <div className='rss__cf-divider' />
            <div className='rss__cf-row'>
              <span style={{ width: "22%" }} />
              <span style={{ width: "25%" }} />
            </div>
            <div className='rss__cf-row' style={{ marginTop: 2 }}>
              <span style={{ width: "14%", background: "rgba(26,26,26,.5)", height: 4 }} />
              <span style={{ width: "28%", background: "rgba(26,26,26,.5)", height: 4 }} />
            </div>
          </div>
          <div className='rss__cf-qr'>
            <div className='rss__cf-qr-lbl'>SCAN QR TO VIEW TRANSACTION</div>
            <QRSvg bg='#E8E5DF' size={36} />
          </div>
        </div>

        {/* Camera overlay: vignette + corners + beam */}
        <div className='rss__cam-overlay'>
          <div className='rss__focus-zone'>
            <span className='rss__fz-s' />
            {scanning && <div className='rss__scan-beam' />}
          </div>
          {!scanning && (
            <div className='rss__scan-ok show'>
              <div className='rss__scan-ok-ring'>
                <svg viewBox='0 0 24 24' width='55%' fill='none' stroke='#fff' strokeWidth='3.5' strokeLinecap='round' strokeLinejoin='round'>
                  <polyline points='20 6 9 17 4 12' />
                </svg>
              </div>
              <div className='rss__scan-ok-lbl'>QR DECODED</div>
            </div>
          )}
        </div>
      </div>
      <div className='rss__cam-foot'>
        <div className='rss__shutter' />
      </div>
    </div>
  );
}

// ─── Phone: Detail view ────────────────────────────────────
function DetailView() {
  return (
    <div className='rss__detail'>
      <div className='rss__dh'>
        <div className='rss__dh-row'>
          <div className='rss__dh-ic rss__dh-back'>
            <svg width='8' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,.5)' strokeWidth='2.5' strokeLinecap='round'>
              <polyline points='15 18 9 12 15 6' />
            </svg>
          </div>
          <div className='rss__dh-t'>Transaction</div>
          <div className='rss__dh-ic rss__dh-share'>
            <svg width='8' viewBox='0 0 24 24' fill='none' stroke='#37B4C5' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
              <polyline points='16 6 12 2 8 6' />
              <line x1='12' y1='2' x2='12' y2='15' />
            </svg>
          </div>
        </div>
        <div className='rss__damt'>
          <div className='rss__damt-n'>₦185,975</div>
          <div className='rss__damt-l'>TOTAL PAID</div>
          <span className='rss__damt-badge'>Completed</span>
        </div>
      </div>
      <div className='rss__dbody'>
        <div className='rss__dcard'>
          <div className='rss__dcard-lbl'>Transaction Info</div>
          {[
            ["Receipt", "#SL-241128-047"],
            ["Date", "28 Nov · 14:32"],
            ["Store", "CJP Watches"],
            ["Cashier", "Adaeze O."],
            ["Payment", "Card · 7892", "ok"],
          ].map(([k, v, cls]) => (
            <div className='rss__dr' key={k}>
              <span className='rss__drk'>{k}</span>
              <span className={`rss__drv${cls ? ` ${cls}` : ""}`}>{v}</span>
            </div>
          ))}
        </div>
        <div className='rss__dcard'>
          <div className='rss__dcard-lbl'>Items</div>
          {[
            ["Casio G-Shock", "×1", "₦45,000"],
            ["Seiko Presage", "×1", "₦120,000"],
            ["Leather Strap", "×2", "₦8,000"],
          ].map(([n, q, p]) => (
            <div className='rss__ditem' key={n}>
              <div>
                <div className='rss__din'>{n}</div>
                <div className='rss__dim'>{q}</div>
              </div>
              <div className='rss__dip'>{p}</div>
            </div>
          ))}
        </div>
        <div className='rss__dcard'>
          <div className='rss__dcard-lbl'>Summary</div>
          <div className='rss__dr'>
            <span className='rss__drk'>Subtotal</span>
            <span className='rss__drv'>₦173,000</span>
          </div>
          <div className='rss__dr'>
            <span className='rss__drk'>VAT 7.5%</span>
            <span className='rss__drv'>₦12,975</span>
          </div>
          <div className='rss__dr'>
            <span className='rss__drk' style={{ color: "#C9D6E4", fontWeight: 700 }}>
              Total
            </span>
            <span className='rss__drv' style={{ color: "#fff", fontWeight: 700 }}>
              ₦185,975
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Phase machine ─────────────────────────────────────────
const PHASES = [
  { id: "scanning", dur: 3400 },
  { id: "scanned", dur: 900 },
  { id: "detail", dur: 4400 },
  { id: "reset", dur: 400 },
];

const FEATURES = [
  { Icon: QrCode, h: "QR on every receipt", d: "Auto-embedded on every 80mm print — zero extra setup." },
  { Icon: Smartphone, h: "With Storelense app", d: "On the transaction page, click of Qrcode Icon and scan immediately" },
  { Icon: ShieldCheck, h: "Dispute-proof records", d: "Transaction detail is cloud-locked, immutable and timestamped." },
];

export default function QRScanningFeature() {
  const [phase, setPhase] = useState("scanning");
  const timer = useRef(null);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      const p = PHASES[i % PHASES.length];
      setPhase(p.id);
      i++;
      timer.current = setTimeout(tick, p.dur);
    };
    timer.current = setTimeout(tick, 1800);
    return () => clearTimeout(timer.current);
  }, []);

  const showCam = phase === "scanning" || phase === "scanned";
  const isScanning = phase === "scanning";
  const isScanned = phase === "scanned" || phase === "detail";
  const showDetail = phase === "detail";

  return (
    <section className='rss'>
      <div className='rss__wrap'>
        <div className='rss__head'>
          <span className='rss__ey'>
            <span className='rss__ey-dot' />
            Receipt intelligence
          </span>
          <h2 className='rss__title'>
            Printed receipt.
            <br />
            <em>Digital record. Instantly.</em>
          </h2>
          <p className='rss__sub'>Every 80mm receipt prints a QR code. Scan it with your Storelense mobile app, or hand held scanners.</p>
        </div>

        <div className='rss__scene'>
          {/* Receipt */}
          <div className='rss__rcol'>
            <div className='rss__printer'>
              <span className='rss__printer-name'>STORELENSE</span>
              <span className='rss__printer-led' />
              <div className='rss__printer-slot' />
            </div>
            <div className='rss__feed' />
            <Receipt scanned={isScanned} />
          </div>

          {/* Phone overlapping receipt */}
          <motion.div
            className='rss__pcol'
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1], delay: 1.6 }}
          >
            {" "}
            <div className='rss__phone'>
              <div className='rss__notch' />
              <div className='rss__screen'>
                <AnimatePresence mode='wait'>
                  {showCam ? (
                    <motion.div
                      key='cam'
                      style={{ position: "absolute", inset: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CameraView scanning={isScanning} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='detail'
                      style={{ position: "absolute", inset: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                    >
                      <DetailView />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className='rss__phone-bar' />
            </div>
          </motion.div>
        </div>

        {/* Feature pills */}
        <div className='rss__feats'>
          {FEATURES.map(({ Icon, h, d }, i) => (
            <motion.div
              key={h}
              className='rss__feat'
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div className='rss__feat-ic'>
                <Icon size={18} color='#2563EB' strokeWidth={2} />
              </div>
              <div>
                <div className='rss__feat-h'>{h}</div>
                <div className='rss__feat-d'>{d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
