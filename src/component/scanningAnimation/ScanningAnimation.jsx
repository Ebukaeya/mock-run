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
        {/* Section Header */}
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

        {/* Main Content */}
        <div className='slpos-content-grid'>
          {/* Left Side - POS Device Visual */}
          <div className='slpos-device-section'>
            <div className='slpos-device-frame'>
              {/* POS Machine */}
              <div className='slpos-machine'>
                <div className='slpos-screen'>
                  <div className='slpos-screen-header'>
                    <div className='slpos-logo-badge'>StoreLense POS</div>
                    <div className='slpos-time'>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                  </div>

                  {/* Cart Items Display */}
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

                  {/* Total Display */}
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

                  {/* Completion State */}
                  {scanStep === 5 && (
                    <div className='slpos-complete-state'>
                      <CheckCircle size={64} className='slpos-success-icon' />
                      <p className='slpos-success-text'>Payment Complete!</p>
                      <p className='slpos-success-sub'>Printing receipt...</p>
                    </div>
                  )}
                </div>

                {/* Scanner Area with Animation */}
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

                {/* Receipt Printer */}
                <div className='slpos-printer-slot'>
                  {scanStep === 5 && (
                    <div className='slpos-receipt-printing'>
                      <Receipt size={16} />
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className='slpos-glow-effect'></div>
            </div>
          </div>

          {/* Right Side - Feature Highlights */}
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
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
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

        /* Responsive Design */
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
