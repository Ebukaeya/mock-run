import React, { useState, useRef, useEffect } from "react";
import "./VerifyPhonenumber.css";

const VerificationCode = ({ phoneNumber, onVerify, onBack, onResend, generatedCode }) => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Countdown timer for resend
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== "") && value) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 5; i++) {
      newCode[i] = pastedData[i];
    }

    setCode(newCode);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextIndex].focus();

    // Auto-submit if all fields are filled
    if (newCode.every((digit) => digit !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleVerify = (verificationCode) => {
    if (verificationCode.length !== 5) {
      setError("Please enter all 5 digits");
      return;
    }

    // Simulate verification
    console.log("Verifying code:", verificationCode);
    if (verificationCode.toString() !== generatedCode.toString()) {
      setError("Invalid verification code. Please try again.");
      return;
    }
    setError("");

    onVerify(verificationCode);
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    setCountdown(30);

    try {
      await onResend();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    handleVerify(verificationCode);
  };

  return (
    <div className='verification-container'>
      <div className='verification-header'>
        <h1 className='verification-title'>Enter verification code</h1>
        <p className='verification-subtitle'>We sent a code to {phoneNumber}</p>
      </div>

      <div className='verification-form'>
        <div className='code-inputs'>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type='text'
              className='code-input'
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              maxLength={1}
              inputMode='numeric'
            />
          ))}
        </div>

        {error && <div className='error-message'>{error}</div>}

        <button className='verify-button' onClick={handleSubmit} disabled={code.some((digit) => digit === "")}>
          Verify
        </button>

        <div className='resend-section'>
          <p className='resend-text'>
            Didn't receive the code?{" "}
            <button className={`resend-button ${countdown > 0 ? "disabled" : ""}`} onClick={handleResend} disabled={countdown > 0 || isResending}>
              {isResending ? "Sending..." : countdown > 0 ? `Resend (${countdown}s)` : "Resend"}
            </button>
          </p>
        </div>

        <button className='back-link' onClick={onBack}>
          ← Back to phone number
        </button>
      </div>
    </div>
  );
};

export default VerificationCode;
