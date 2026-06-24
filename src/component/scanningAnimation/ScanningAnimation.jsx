import React, { useState, useEffect } from "react";
import { ShoppingCart, Zap, CheckCircle, Scan, CreditCard, Receipt } from "lucide-react";

const POSScanningFeature = () => {
  const [scanStep, setScanStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Products being scanned
  const products = [
    { id: 1, name: "Coca Cola 50cl", price: 350, barcode: "5449000054227" },
    { id: 2, name: "Peak Milk 400g", price: 1200, barcode: "8901138510916" },
    { id: 3, name: "Indomie Chicken", price: 150, barcode: "8993123001102" },
  ];

  const [scannedItems, setScannedItems] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (scanStep < 6) {
        setScanStep((prev) => prev + 1);
        setIsAnimating(true);

        // Animation steps
        if (scanStep === 1) {
          setCurrentProduct(products[0]);
        } else if (scanStep === 2) {
          setScannedItems([products[0]]);
          setCurrentProduct(products[1]);
        } else if (scanStep === 3) {
          setScannedItems([products[0], products[1]]);
          setCurrentProduct(products[2]);
        } else if (scanStep === 4) {
          setScannedItems([products[0], products[1], products[2]]);
          setCurrentProduct(null);
        }

        setTimeout(() => setIsAnimating(false), 500);
      } else {
        setScanStep(0);
        setScannedItems([]);
        setCurrentProduct(null);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [scanStep]);

  const total = scannedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='slpos-feature-wrapper'>
      <div className='slpos-feature-container'>
        <div className='slpos-header-section'>
          <div className='slpos-badge'>
            <Zap size={16} />
            <span>Lightning Fast Checkout</span>
          </div>
          <h2 className='slpos-main-title'>Scan, Process, Done!</h2>
          <p className='slpos-subtitle'>
            Experience the speed of our advanced point-of-sale system. Scan products, process payments, and print receipts in seconds.
          </p>
        </div>

        <div className='slpos-content-grid'>
          <div className='slpos-device-section'>
            <div className='slpos-device-frame'>
              <div className='slpos-machine'>
                <div className='slpos-screen'>
                  <div className='slpos-screen-header'>
                    <div className='slpos-logo-badge'>StoreLense POS</div>
                    <div className='slpos-time'>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                  </div>

                  <div className='slpos-cart-display'>
                    {scannedItems.length === 0 ? (
                      <div className='slpos-empty-cart'>
                        <Scan size={48} className='slpos-scan-icon' />
                        <p>Ready to scan items</p>
                      </div>
                    ) : (
                      <div className='slpos-items-list'>
                        {scannedItems.map((item, index) => (
                          <div key={item.id} className='slpos-item-row' style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className='slpos-item-info'>
                              <span className='slpos-item-name'>{item.name}</span>
                              <span className='slpos-item-code'>{item.barcode}</span>
                            </div>
                            <span className='slpos-item-price'>₦{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {scannedItems.length > 0 && (
                    <div className='slpos-total-section'>
                      <div className='slpos-total-row'>
                        <span>Subtotal</span>
                        <span>₦{total.toLocaleString()}</span>
                      </div>
                      <div className='slpos-total-row slpos-total-main'>
                        <span>TOTAL</span>
                        <span>₦{total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {scanStep === 5 && (
                    <div className='slpos-complete-state'>
                      <CheckCircle size={64} className='slpos-success-icon' />
                      <p className='slpos-success-text'>Payment Complete!</p>
                      <p className='slpos-success-sub'>Printing receipt...</p>
                    </div>
                  )}
                </div>

                <div className='slpos-scanner-area'>
                  <div className={`slpos-scan-line ${isAnimating ? "slpos-scanning" : ""}`}></div>
                  {currentProduct && (
                    <div className='slpos-product-scanning'>
                      <div className='slpos-barcode-visual'>
                        <div className='slpos-barcode-lines'>
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className='slpos-barcode-line' style={{ width: `${Math.random() * 3 + 1}px` }}></div>
                          ))}
                        </div>
                        <span className='slpos-barcode-number'>{currentProduct.barcode}</span>
                      </div>
                    </div>
                  )}
                  <div className='slpos-scanner-icon'>
                    <Scan size={20} />
                  </div>
                </div>

                <div className='slpos-printer-slot'>
                  {scanStep === 5 && (
                    <div className='slpos-receipt-printing'>
                      <Receipt size={16} />
                    </div>
                  )}
                </div>
              </div>

              <div className='slpos-glow-effect'></div>
            </div>
          </div>

          <div className='slpos-features-section'>
            <div className='slpos-feature-card'>
              <div className='slpos-feature-icon slpos-icon-blue'>
                <Scan size={24} />
              </div>
              <h3 className='slpos-feature-title'>Fast Barcode Scanning</h3>
              <p className='slpos-feature-text'>
                Instant product recognition with support for all major barcode formats. Scan multiple items in rapid succession without delays.
              </p>
            </div>

            <div className='slpos-feature-card'>
              <div className='slpos-feature-icon slpos-icon-green'>
                <CreditCard size={24} />
              </div>
              <h3 className='slpos-feature-title'>Multiple Payment Options</h3>
              <p className='slpos-feature-text'>
                Accept cash, cards, mobile money, and digital wallets. Seamless integration with all major payment processors.
              </p>
            </div>

            <div className='slpos-feature-card'>
              <div className='slpos-feature-icon slpos-icon-purple'>
                <Receipt size={24} />
              </div>
              <h3 className='slpos-feature-title'>Instant Receipt Printing</h3>
              <p className='slpos-feature-text'>
                Generate professional receipts instantly with your store branding. Digital receipts available via SMS or email.
              </p>
            </div>

            <div className='slpos-feature-card'>
              <div className='slpos-feature-icon slpos-icon-orange'>
                <ShoppingCart size={24} />
              </div>
              <h3 className='slpos-feature-title'>Real-time Inventory Sync</h3>
              <p className='slpos-feature-text'>Stock levels update automatically with every sale. Get low-stock alerts and never run out of popular items.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slpos-feature-wrapper {
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }

        .slpos-feature-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .slpos-feature-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .slpos-header-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .slpos-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .slpos-main-title {
          font-size: 56px;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          letter-spacing: -2px;
        }

        .slpos-subtitle {
          font-size: 18px;
          color: #94a3b8;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .slpos-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .slpos-device-section {
          position: relative;
        }

        .slpos-device-frame {
          position: relative;
          perspective: 1000px;
        }

        .slpos-machine {
          background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;

          transition: transform 0.3s ease;
          transform: rotateY(0deg) rotateX(0deg);
        }

        .slpos-machine:hover {
          transform: rotateY(-5deg) rotateX(2deg);
        }

        .slpos-screen {
          background: linear-gradient(180deg, #0c1220 0%, #1a1f35 100%);
          border-radius: 16px;
          padding: 20px;
          height: 440px;
          border: 2px solid rgba(59, 130, 246, 0.2);
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .slpos-screen-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .slpos-logo-badge {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .slpos-time {
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
        }

        .slpos-cart-display {
          min-height: 200px;
          margin-bottom: 20px;
        }

        .slpos-empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: #475569;
        }

        .slpos-scan-icon {
          color: #3b82f6;
          margin-bottom: 12px;
          animation: slpos-pulse 2s ease-in-out infinite;
        }

        @keyframes slpos-pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .slpos-empty-cart p {
          font-size: 14px;
        }

        .slpos-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .slpos-item-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: rgba(59, 130, 246, 0.05);
          padding: 12px 16px;
          border-radius: 10px;
          border-left: 3px solid #3b82f6;
          animation: slpos-slide-in 0.4s ease-out;
        }

        @keyframes slpos-slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slpos-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slpos-item-name {
          color: #e2e8f0;
          font-size: 14px;
          font-weight: 600;
        }

        .slpos-item-code {
          color: #64748b;
          font-size: 11px;
          font-family: "Courier New", monospace;
        }

        .slpos-item-price {
          color: #10b981;
          font-size: 16px;
          font-weight: 700;
        }

        .slpos-total-section {
          background: rgba(255, 255, 255, 0.03);
          padding: 16px;
          border-radius: 12px;
          margin-top: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .slpos-total-row {
          display: flex;
          justify-content: space-between;
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .slpos-total-main {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          padding-top: 12px;
          margin-top: 8px;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 0;
        }

        .slpos-complete-state {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          animation: slpos-fade-in 0.5s ease-out;
        }

        @keyframes slpos-fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .slpos-success-icon {
          color: #10b981;
          margin-bottom: 16px;
          animation: slpos-scale-bounce 0.6s ease-out;
        }

        @keyframes slpos-scale-bounce {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .slpos-success-text {
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .slpos-success-sub {
          color: #64748b;
          font-size: 14px;
        }

        .slpos-scanner-area {
          margin-top: 20px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          padding: 24px;
          position: relative;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .slpos-scan-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #ef4444 50%, transparent 100%);
          opacity: 0;
          transform: translateY(-50%);
        }

        .slpos-scan-line.slpos-scanning {
          animation: slpos-scan 0.5s ease-in-out;
        }

        @keyframes slpos-scan {
          0% {
            opacity: 0;
            transform: translateY(-50%) scaleX(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) scaleX(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50%) scaleX(1);
          }
        }

        .slpos-product-scanning {
          position: absolute;
          animation: slpos-product-scan 0.5s ease-out;
        }

        @keyframes slpos-product-scan {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slpos-barcode-visual {
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .slpos-barcode-lines {
          display: flex;
          gap: 2px;
          align-items: flex-end;
          height: 60px;
          margin-bottom: 8px;
        }

        .slpos-barcode-line {
          background: #000;
          height: 100%;
          animation: slpos-barcode-pulse 0.8s ease-in-out infinite;
        }

        @keyframes slpos-barcode-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        .slpos-barcode-number {
          display: block;
          text-align: center;
          font-size: 11px;
          color: #000;
          font-family: "Courier New", monospace;
          font-weight: 700;
        }

        .slpos-scanner-icon {
          color: #64748b;
        }

        .slpos-printer-slot {
          margin-top: 16px;
          height: 40px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .slpos-receipt-printing {
          animation: slpos-print 1s ease-out;
          color: #94a3b8;
        }

        @keyframes slpos-print {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .slpos-glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: slpos-glow 3s ease-in-out infinite;
        }

        @keyframes slpos-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .slpos-features-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .slpos-feature-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s ease;
        }

        .slpos-feature-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(8px);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .slpos-feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .slpos-icon-blue {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }

        .slpos-icon-green {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .slpos-icon-purple {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
          color: white;
        }

        .slpos-icon-orange {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }

        .slpos-feature-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .slpos-feature-text {
          font-size: 15px;
          color: #94a3b8;
          line-height: 1.7;
        }

        @media (max-width: 1024px) {
          .slpos-content-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .slpos-machine {
            transform: none;
          }

          .slpos-main-title {
            font-size: 44px;
          }
        }

        @media (max-width: 768px) {
          .slpos-feature-wrapper {
            padding: 60px 16px;
          }

          .slpos-main-title {
            font-size: 36px;
          }

          .slpos-subtitle {
            font-size: 16px;
          }

          .slpos-content-grid {
            gap: 40px;
          }

          .slpos-machine {
            padding: 16px;
          }

          .slpos-screen {
            padding: 16px;
            height: 430px;
          }

          .slpos-feature-card {
            padding: 20px;
          }

          .slpos-feature-icon {
            width: 48px;
            height: 48px;
          }

          .slpos-feature-title {
            font-size: 18px;
          }

          .slpos-feature-text {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .slpos-main-title {
            font-size: 28px;
            letter-spacing: -1px;
          }

          .slpos-badge {
            font-size: 12px;
            padding: 6px 16px;
          }

          .slpos-screen {
            min-height: 300px;
          }

          .slpos-item-name {
            font-size: 13px;
          }

          .slpos-item-price {
            font-size: 14px;
          }

          .slpos-total-main {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default POSScanningFeature;
/* 
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
      
      <rect x='5' y='5' width='28' height='28' fill={fill} />
      <rect x='8' y='8' width='22' height='22' fill={bg} />
      <rect x='11' y='11' width='16' height='16' fill={fill} />
    
      <rect x='67' y='5' width='28' height='28' fill={fill} />
      <rect x='70' y='8' width='22' height='22' fill={bg} />
      <rect x='73' y='11' width='16' height='16' fill={fill} />
     
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
/* function Receipt({ scanned }) {
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
} */

// ─── Phone: Camera view ────────────────────────────────────
/* function CameraView({ scanning }) {
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
  { Icon: Smartphone, h: "No app required", d: "Scan with the default camera on any iOS or Android phone." },
  { Icon: ShieldCheck, h: "Dispute-proof records", d: "Transaction detail is cloud-locked — immutable and timestamped." },
];  */

/* export default function POSScanningFeature() {
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
          <p className='rss__sub'>Every 80mm receipt prints a QR code. Scan it with any phone camera to pull up the full transaction — no app, no login.</p>
        </div>

        <div className='rss__scene'>
          
          <div className='rss__rcol'>
            <div className='rss__printer'>
              <span className='rss__printer-name'>STORELENSE</span>
              <span className='rss__printer-led' />
              <div className='rss__printer-slot' />
            </div>
            <div className='rss__feed' />
            <Receipt scanned={isScanned} />
          </div>

          
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
} */
