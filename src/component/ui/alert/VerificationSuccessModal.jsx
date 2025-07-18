import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./VerificationSuccessModal.css";

export function VerificationSuccessModal({ isOpen, onClose }) {
  // Prevent scrolling while modal is open
  useEffect(() => {
    console.log(`Modal is ${isOpen ? "open" : "closed"}`);

    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (isOpen === false) {
    console.log("Modal is not open, returning null");

    return null;
  }
  const onProceed = () => {
    // Redirect to login page or perform any action needed
    window.location.href = "https://www.app.storelense.com/sign-in"; // Adjust the URL as needed
  };

  return ReactDOM.createPortal(
    <div className='vsm-backdrop' onClick={onClose}>
      <div className='vsm-container' onClick={(e) => e.stopPropagation()} role='dialog' aria-modal='true'>
        <h2 className='vsm-title'>✅ Phone Verified!</h2>
        <p className='vsm-message'>
          Your phone verification was successful.
          <br />
          Would you like to proceed to log in to{" "}
          <b style={{ color: "#0E49B5" }}>
            Store <span style={{ color: "#2A9DB1" }}>Lense</span>
          </b>{" "}
          to create your first store?
        </p>
        <div className='vsm-buttons'>
          <button className='vsm-btn vsm-btn-cancel' onClick={onClose}>
            Not yet
          </button>
          <button className='vsm-btn vsm-btn-confirm' onClick={onProceed}>
            Proceed to Login
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
