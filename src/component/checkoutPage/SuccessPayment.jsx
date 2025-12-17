import { ArrowBigRight } from "lucide-react";
import React, { useState, useEffect } from "react";

export const PaymentSuccessOverlay = ({ isVisible, onClose, transactionDetails }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowContent(true), 100);
      // Trigger confetti after success animation
      setTimeout(() => createConfetti(), 800);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  // Confetti creation function
  const createConfetti = () => {
    const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "storelense-confetti";
        confetti.style.position = "fixed";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "10000";
        confetti.style.borderRadius = "2px";
        confetti.style.animation = `storelense-confetti-fall ${2 + Math.random() * 3}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }, i * 30);
    }
  };

  if (!isVisible) return null;

  return (
    <div className='storelense-payment-success-overlay'>
      <div className='storelense-pso-backdrop' onClick={onClose} />

      <div className={`storelense-pso-content ${showContent ? "storelense-pso-visible" : ""}`}>
        {/* Success Icon with Animation */}
        <div className='storelense-pso-icon-wrapper'>
          <div className='storelense-pso-icon-circle'>
            <svg className='storelense-pso-checkmark' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'>
              <circle className='storelense-pso-circle-outline' cx='26' cy='26' r='25' fill='none' />
              <path className='storelense-pso-check-path' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className='storelense-pso-message'>
          <h2 className='storelense-pso-title'>Payment Successful!</h2>
          <p className='storelense-pso-subtitle'>Your order has been confirmed</p>
        </div>

        {/* Order Details */}
        <div className='storelense-pso-details'>
          <div className='storelense-pso-detail-row'>
            <span className='storelense-pso-detail-label'>Amount Paid</span>
            <span className='storelense-pso-detail-value'> {transactionDetails.amount} </span>
          </div>
          <div className='storelense-pso-detail-row'>
            <span className='storelense-pso-detail-label'>Shipped to:</span>
            <span className='storelense-pso-detail-value'>{transactionDetails.shippingAddress}</span>
          </div>
          <div className='storelense-pso-detail-row'>
            <span className='storelense-pso-detail-label'>Date</span>
            <span className='storelense-pso-detail-value'>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='storelense-pso-actions'>
          <button
            onClick={() => {
              onClose();
              window.location.href = "/pos-setup";
            }}
            className='storelense-pso-btn-primary'
          >
            Continue Shopping
            <ArrowBigRight size={20} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .storelense-payment-success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .storelense-pso-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          animation: storelense-pso-fade-in 0.3s ease-out;
        }

        .storelense-pso-content {
          position: relative;
          background: white;
          border-radius: 24px;
          padding: 48px 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          transform: scale(0.8);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .storelense-pso-content.storelense-pso-visible {
          transform: scale(1);
          opacity: 1;
        }

        .storelense-pso-icon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .storelense-pso-icon-circle {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
          animation: storelense-pso-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards;
        }

        .storelense-pso-checkmark {
          width: 64px;
          height: 64px;
        }

        .storelense-pso-circle-outline {
          stroke: white;
          stroke-width: 3;
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: storelense-pso-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
        }

        .storelense-pso-check-path {
          stroke: white;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: storelense-pso-stroke 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        .storelense-pso-message {
          text-align: center;
          margin-bottom: 32px;
        }

        .storelense-pso-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 8px 0;
          animation: storelense-pso-slide-up 0.5s ease-out 0.3s backwards;
        }

        .storelense-pso-subtitle {
          font-size: 16px;
          color: #64748b;
          margin: 0;
          animation: storelense-pso-slide-up 0.5s ease-out 0.4s backwards;
        }

        .storelense-pso-details {
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          animation: storelense-pso-slide-up 0.5s ease-out 0.5s backwards;
        }

        .storelense-pso-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .storelense-pso-detail-row:not(:last-child) {
          border-bottom: 1px solid #e2e8f0;
        }

        .storelense-pso-detail-label {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        .storelense-pso-detail-value {
          font-size: 15px;
          color: #1e293b;
          font-weight: 600;
        }

        .storelense-pso-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: storelense-pso-slide-up 0.5s ease-out 0.6s backwards;
        }

        .storelense-pso-btn-primary,
        .storelense-pso-btn-secondary {
          width: 100%;
          padding: 16px 24px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .storelense-pso-btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .storelense-pso-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .storelense-pso-btn-primary:active {
          transform: translateY(0);
        }

        .storelense-pso-btn-secondary {
          background: white;
          color: #3b82f6;
          border: 2px solid #e2e8f0;
        }

        .storelense-pso-btn-secondary:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        @keyframes storelense-pso-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes storelense-pso-bounce {
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
        @keyframes storelense-confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes storelense-pso-stroke {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes storelense-pso-slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .storelense-pso-content {
            padding: 32px 24px;
            margin: 20px;
          }

          .storelense-pso-icon-circle {
            width: 100px;
            height: 100px;
          }

          .storelense-pso-checkmark {
            width: 52px;
            height: 52px;
          }

          .storelense-pso-title {
            font-size: 24px;
          }

          .storelense-pso-subtitle {
            font-size: 14px;
          }

          .storelense-pso-details {
            padding: 20px;
          }

          .storelense-pso-btn-primary,
          .storelense-pso-btn-secondary {
            padding: 14px 20px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

// Demo Component
const PaymentSuccess = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <button
        onClick={() => setShowOverlay(true)}
        style={{
          padding: "16px 32px",
          fontSize: "16px",
          fontWeight: "600",
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
        }}
      >
        Trigger Payment Success
      </button>

      <PaymentSuccessOverlay isVisible={showOverlay} onClose={() => setShowOverlay(false)} />
    </div>
  );
};

export default PaymentSuccess;
