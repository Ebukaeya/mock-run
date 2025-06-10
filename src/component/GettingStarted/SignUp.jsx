import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerificationCode from "./verification/VerifyPhoneNumber";
import "./signUp.css";
import countries from "./Countries";
import BtnSpinner from "../ui/spinners/BtnSpinner";
import { VerificationSuccessModal } from "../ui/alert/VerificationSuccessModal";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("signup"); // 'signup', 'phone', or 'verification'
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({
    code: "US",
    dialCode: "+1",
    flag: "🇺🇸",
    name: "United States",
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log("Modal open state changed:", modalOpen);
  }, [modalOpen]);

  // Handle ResizeObserver error
  useEffect(() => {
    const handleError = (e) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications." || e.message === "ResizeObserver loop limit exceeded") {
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  // Get user's location and set default country
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const userCountry = countries.find((country) => country.code === data.country_code);
        if (userCountry) {
          setSelectedCountry(userCountry);
        }
      } catch (error) {
        console.log("Could not detect location, using default US");
      }
    };

    getUserLocation();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".country-selector")) {
        setShowCountryDropdown(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSignupSubmit = async () => {
    console.log("Submitting signup form with data:", formData);

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // create user here
      let data = {
        fullName: formData.fullName
          .split(" ")
          .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
          .join(" "),
        email: formData.email.toLocaleLowerCase(),
        password: formData.password,
      };
      const signUpUrl = `${process.env.REACT_APP_Back_end_api_root}/signUp`;
      console.log("Signing up with data:", data, signUpUrl);

      try {
        setLoading(true);
        let response = await fetch(signUpUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.status === 400) {
          setErrors({ general: "Email already exists. Please try another email." });
          alert("Email already exists. Please try another email.");
          return;
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data_ = await response.json();
        localStorage.setItem("refreshToken", data_.refreshToken);
        localStorage.setItem("accessToken", data_.accessToken);
        setStep("phone");
      } catch (error) {
        console.error("Error during signup:", error);
        setErrors({ general: "An error occurred during signup. Please try again." });
        return;
      } finally {
        setLoading(false);
      }
    }
  };
  function removeLeadingZero(raw) {
    // Remove exactly one leading '0' (use /^0+/ to remove all leading zeros)
    return raw.startsWith("0") ? raw.slice(1) : raw;
  }

  const handlePhoneSubmit = async () => {
    if (!formData.phone.trim()) {
      setErrors({ phone: "Phone number is required" });
      return;
    }
    // Send verification code and move to verification step
    console.log("Sending verification code to:", selectedCountry.dialCode + formData.phone);
    // seend verification code to numer
    try {
      setLoading(true);
      const cleanedPhone = removeLeadingZero(formData.phone.trim());
      const phoneNumber = selectedCountry.dialCode + cleanedPhone;
      const sendCodeUrl = `${process.env.REACT_APP_Back_end_api_root}/smsVerification/sendCode`;

      let response = await fetch(sendCodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ phoneNumber }),
      });
      if (!response.ok) {
        throw new Error("Failed to send verification code");
      }

      const { generatedCode } = await response.json();
      setGeneratedCode(generatedCode);
      setStep("verification");
    } catch (error) {
      console.error("Error sending verification code:", error);
      setErrors({ phone: "Failed to send verification code. Please try again." });
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSuccess = async (code) => {
    // Toggle modal open state
    // Here you would typically verify the code with your backend
    // For demo, just navigate to home
    // Update back end
    let data = { isPhoneNumberVerified: "yes", verifiedPhoneNo: selectedCountry.dialCode + removeLeadingZero(formData.phone.trim()) };
    const verifyUserUrl = `${process.env.REACT_APP_Back_end_api_root}/smsVerification/verifyUser`;
    try {
      setLoading(true);
      let response = await fetch(verifyUserUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to verify user");
      }

      const result = await response.json();
      console.log(modalOpen);

      setModalOpen(true); // Toggle modal open state

      // navigate("/");
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Failed to verify phone number. Please try again.");
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    console.log("Resending verification code to:", selectedCountry.dialCode + formData.phone);
    // Here you would resend the verification code
    /*  return Promise.resolve(); */
    handlePhoneSubmit();
  };

  const handleSocialSignup = (provider) => {
    // Simulate successful verification for demo purposes
    // This function would handle social signup logic
    //setModalOpen(true);
    console.log(`Signing up with ${provider}`);
    // Here you would implement social authentication
    // For demo, go to phone verification
    // setStep("phone");
    alert(`Social signup with ${provider} is not implemented yet.`);
  };

  const handleBack = () => {
    if (step === "verification") {
      setStep("phone");
    } else if (step === "phone") {
      setStep("signup");
    } else {
      navigate("/");
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchQuery("");
  };

  const toggleCountryDropdown = () => {
    setShowCountryDropdown(!showCountryDropdown);
    if (!showCountryDropdown) {
      setSearchQuery("");
    }
  };

  const filteredCountries = countries.filter(
    (country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()) || country.dialCode.includes(searchQuery)
  );

  // If we're on the verification step, render the VerificationCode component

  if (step === "verification") {
    return (
      <>
        <VerificationCode
          phoneNumber={selectedCountry.dialCode + removeLeadingZero(formData.phone.trim())}
          onVerify={handleVerificationSuccess}
          onBack={handleBack}
          onResend={handleResendCode}
          generatedCode={generatedCode}
        />
        <VerificationSuccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className='get-started-container'>
        <button className='back-button' onClick={handleBack}>
          ←
        </button>

        <div className='get-started-header'>
          <h1 className='get-started-title'>{step === "signup" ? "Get Started" : "Enter phone number"}</h1>
          <p className='get-started-subtitle'>{step === "signup" ? "Create your account to continue" : "We will send you a confirmation code"}</p>
        </div>

        <div className='get-started-form'>
          {step === "signup" ? (
            <>
              <div>
                <input
                  type='text'
                  className='form-input'
                  placeholder='Full Name'
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
                {errors.fullName && <div className='error-message'>{errors.fullName}</div>}
              </div>

              <div>
                <input
                  type='email'
                  className='form-input'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && <div className='error-message'>{errors.email}</div>}
              </div>

              <div>
                <input
                  type='password'
                  className='form-input'
                  placeholder='Password (min 6 characters)'
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                {errors.password && <div className='error-message'>{errors.password}</div>}
              </div>

              <button className='continue-button' onClick={handleSignupSubmit}>
                {loading ? <BtnSpinner size={20} strokeWidth={3} color='#fff' /> : "Continue"}
              </button>

              <div className='divider'>or</div>

              <button className='social-button' onClick={() => handleSocialSignup("Google")}>
                <span>🔴</span>
                Sign up with Google
              </button>

              <button className='social-button' onClick={() => handleSocialSignup("Facebook")}>
                <span>🔵</span>
                Sign up with Facebook
              </button>
            </>
          ) : (
            <>
              <div className='phone-input-container'>
                <div className='country-selector'>
                  <div className='country-code' onClick={toggleCountryDropdown}>
                    <span className='country-flag'>{selectedCountry.flag}</span>
                    <span>{selectedCountry.dialCode}</span>
                    <span className={`dropdown-arrow ${showCountryDropdown ? "rotate" : ""}`}>▼</span>
                  </div>
                  {showCountryDropdown && (
                    <div className='country-dropdown'>
                      <div className='search-container'>
                        <input type='text' className='search-input' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <span className='search-icon'>🔍</span>
                      </div>
                      {filteredCountries.map((country) => (
                        <div key={country.code} className='country-option' onClick={() => handleCountrySelect(country)}>
                          <span className='country-flag'>{country.flag}</span>
                          <span className='country-name'>{country.name}</span>
                          <span className='dial-code'>{country.dialCode}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type='tel'
                  className='phone-input'
                  placeholder='Phone number'
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              {errors.phone && <div className='error-message'>{errors.phone}</div>}

              <button className='continue-button' onClick={handlePhoneSubmit} disabled={!formData.phone.trim()}>
                {loading ? <BtnSpinner size={20} strokeWidth={3} color='#fff' /> : "Continue"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
