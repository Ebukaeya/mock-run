import React, { useEffect, useState } from "react";
import { X, ArrowLeft, Mail, User, ShoppingCart, ChevronRight, CheckCircle, Star, Package, Truck, CreditCard, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const HardwareCheckoutPage = () => {
  const [checkoutStep, setCheckoutStep] = useState("email"); // email, details, payment
  const [userType, setUserType] = useState(null); // 'account' or 'guest'
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
  });
  const [user, setUser] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null); // starter, basic, super, premium
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const rawDevice = searchParams.get("device") || "storelense-pos";
    const device = JSON.parse(rawDevice);

    if (!device) return <div>Invalid device data in URL</div>;
    setSelectedProduct(device);
  }, [rawDevice]);

  // Sample product data
  /*  const selectedProduct = {
    id: 2,
    name: "Storelense POS",
    price: 340000,
    originalPrice: 450000,
    rating: 4.6,
    description: "Portable Android POS with integrated payment solutions and sleek design",
    features: [
      "Android POS Tablet",
      "SIM card compatibility",
      "4G Network",
      "In-built printer",
      "Advanced Barcode Scanner",
      "Multi-payment support",
      "Customer display",
      "Cloud sync enabled",
    ],
    specifications: {
      Display: '10.1" HD Touchscreen',
      Processor: "Quad-core 2.0GHz",
      RAM: "4GB",
      Storage: "64GB (expandable)",
      Connectivity: "4G, WiFi, Bluetooth",
      Printer: "Thermal 58mm",
      Battery: "5000mAh",
      OS: "Android 11",
    },
    images: [
      { id: 1, type: "front", label: "Front View" },
      { id: 2, type: "side", label: "Side View" },
      { id: 3, type: "back", label: "Back View" },
      { id: 4, type: "display", label: "Display" },
    ],
  }; */

  // Discount structure based on subscription
  const discounts = {
    starter: 5,
    basic: 10,
    super: 15,
    premium: 20,
  };

  const calculatePrice = () => {
    if (userType === "guest" || !userSubscription) {
      return selectedProduct.price;
    }
    const discount = discounts[userSubscription] || 0;
    return selectedProduct.price - (selectedProduct.price * discount) / 100;
  };

  const getDiscountAmount = () => {
    if (userType === "guest" || !userSubscription) return 0;
    const discount = discounts[userSubscription] || 0;
    return (selectedProduct.price * discount) / 100;
  };

  const handleEmailSubmit = async () => {
    console.log("handleEmailSubmit called");
    console.log("Email submitted:", formData.email);

    // Validate email
    if (!formData.email) {
      alert("Please enter an email address");
      return;
    }
    let hasAccount;

    try {
      const endpoint = process.env.REACT_APP_Back_end_api_root + "/user/fetchUser/" + formData.email.toLowerCase();

      let response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 404) {
        alert("No account found with this email. Continue as guest.");
        hasAccount = false;
        throw new Error("No account found");
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      setUser(data);
      console.log("Fetched user data:", data);

      setFormData({
        ...formData,
        fullName: data.fullName || "",
        phone: data.phoneNumber || "",

        country: data.userCountry || "Nigeria",
      });
      hasAccount = true;
      console.log("Account check response data:", data);
    } catch (error) {
      console.log("Error checking account:", error);
      hasAccount = false;
      return;
    }

    // Simulate account check

    if (hasAccount) {
      setUserType("account");
      // Simulate fetching user subscription
      const subscriptions = ["starter", "basic", "super", "premium"];
      const randomSubscription = subscriptions[Math.floor(Math.random() * subscriptions.length)];
      setUserSubscription(randomSubscription);
      console.log("User subscription:", randomSubscription);
    } else {
      setUserType("guest");
      setUserSubscription(null);
      console.log("User is guest");
    }

    console.log("Moving to details step");
    setCheckoutStep("details");
  };

  const handleContinueAsGuest = () => {
    setUserType("guest");
    setUserSubscription(null);
    setCheckoutStep("details");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep("payment");
  };

  const handlePayment = () => {
    // Integrate with payment gateway
    alert("Redirecting to payment gateway...");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your order?")) {
      // Redirect back to store or home page
      window.history.back();
      // Or use: window.location.href = '/store';
    }
  };

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className='slhw-page'>
      {/* Email Overlay */}
      {checkoutStep === "email" && (
        <div className='slhw-email-overlay'>
          <div className='slhw-overlay-backdrop'></div>
          <div className='slhw-email-card'>
            <div className='slhw-icon-badge'>
              <Mail size={32} />
            </div>
            <h2>Start Your Order</h2>
            <p>Enter your email to check for existing account and discounts</p>

            <form className='slhw-email-form'>
              <div className='slhw-form-group'>
                <label>Email Address</label>
                <input type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='you@example.com' required />
              </div>

              <button type='button' className='slhw-btn slhw-btn-primary' onClick={handleEmailSubmit}>
                Check Account
                <ChevronRight size={20} />
              </button>
            </form>

            <div className='slhw-divider'>
              <span>or</span>
            </div>

            <button className='slhw-btn slhw-btn-secondary' onClick={handleContinueAsGuest}>
              <User size={20} />
              Continue as Guest
            </button>

            <div className='slhw-benefits'>
              <div className='slhw-benefit-item'>
                <CheckCircle size={18} />
                <span>Account holders get up to 20% discount</span>
              </div>
              <div className='slhw-benefit-item'>
                <CheckCircle size={18} />
                <span>Free shipping on orders above ₦500,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className='slhw-main'>
        <div className='slhw-container'>
          {/* Checkout Details Step */}
          {checkoutStep === "details" && (
            <div className='slhw-details-section'>
              {/* Account Status Banner */}
              {userType === "account" && (
                <div className='slhw-account-banner'>
                  <CheckCircle size={24} />
                  <div>
                    <strong>Account Verified!</strong>
                    <p>
                      You're getting a {discounts[userSubscription]}% discount with your {userSubscription.charAt(0).toUpperCase() + userSubscription.slice(1)}{" "}
                      plan
                    </p>
                  </div>
                </div>
              )}

              {userType === "guest" && (
                <div className='slhw-guest-banner'>
                  <User size={24} />
                  <div>
                    <strong>Ordering as Guest</strong>
                    <p>Create an account after checkout to enjoy discounts on future orders</p>
                  </div>
                </div>
              )}

              <div className='slhw-checkout-grid'>
                {/* Product Section */}
                <div className='slhw-product-section'>
                  <div className='slhw-section-header'>
                    <h3 className='slhw-section-title'>
                      <Package size={20} />
                      Product Details
                    </h3>
                    <button className='slhw-cancel-btn' onClick={handleCancel}>
                      <X size={18} />
                      <span>Cancel Order</span>
                    </button>
                  </div>

                  {/* Product Images */}
                  <div className='slhw-product-images'>
                    <div className='slhw-main-image'>
                      <img
                        src={selectedProduct.images[selectedImageIndex].src || ""}
                        alt={selectedProduct.images[selectedImageIndex].label}
                        className='slhw-image'
                      />
                      <div className='slhw-image-badge'>{selectedProduct.images[selectedImageIndex].label}</div>
                    </div>
                    <div className='slhw-image-thumbnails'>
                      {selectedProduct.images.map((img, index) => (
                        <div
                          key={img.id}
                          className={`slhw-thumbnail ${selectedImageIndex === index ? "slhw-thumbnail-active" : ""}`}
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <img src={img.src || ""} alt={img.label} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  {selectedProduct && (
                    <div className='slhw-product-info'>
                      <div className='slhw-product-header'>
                        <h2>{selectedProduct.title}</h2>
                        <div className='slhw-rating'>
                          <Star size={16} fill='#fbbf24' color='#fbbf24' />
                          <span>{selectedProduct.rating}</span>
                        </div>
                      </div>
                      <p className='slhw-product-desc'>{selectedProduct.description}</p>

                      {/* Features */}
                      <div className='slhw-features'>
                        <h4>Key Features</h4>
                        <ul>
                          {selectedProduct.features.map((feature, index) => (
                            <li key={index}>
                              <CheckCircle size={16} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Specifications */}
                      <div className='slhw-specifications'>
                        <h4>Technical Specifications</h4>
                        <div className='slhw-specs-grid'>
                          {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                            <div key={key} className='slhw-spec-item'>
                              <span className='slhw-spec-label'>{key}</span>
                              <span className='slhw-spec-value'>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkout Form Section */}
                <div className='slhw-form-section'>
                  <h3 className='slhw-section-title slhw-section-title-single'>
                    <Truck size={20} />
                    Shipping Information
                  </h3>

                  <form onSubmit={handleCheckoutSubmit} className='slhw-checkout-form'>
                    <div className='slhw-form-group'>
                      <label>Full Name *</label>
                      <input type='text' name='fullName' value={formData.fullName} onChange={handleInputChange} placeholder='John Doe' required />
                    </div>

                    <div className='slhw-form-group'>
                      <label>Email Address *</label>
                      <input type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='john@example.com' required />
                    </div>

                    <div className='slhw-form-group'>
                      <label>Phone Number *</label>
                      <input type='tel' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='+234 801 234 5678' required />
                    </div>

                    <div className='slhw-form-group'>
                      <label>Street Address *</label>
                      <input type='text' name='address' value={formData.address} onChange={handleInputChange} placeholder='123 Main Street' required />
                    </div>

                    <div className='slhw-form-row'>
                      <div className='slhw-form-group'>
                        <label>City *</label>
                        <input type='text' name='city' value={formData.city} onChange={handleInputChange} placeholder='Lagos' required />
                      </div>
                      <div className='slhw-form-group'>
                        <label>State *</label>
                        <input type='text' name='state' value={formData.state} onChange={handleInputChange} placeholder='Lagos' required />
                      </div>
                    </div>

                    <div className='slhw-form-row'>
                      <div className='slhw-form-group'>
                        <label>Country *</label>
                        <select name='country' value={formData.country} onChange={handleInputChange} required>
                          <option value='Nigeria'>Nigeria</option>
                          <option value='Ghana'>Ghana</option>
                          <option value='Kenya'>Kenya</option>
                          <option value='South Africa'>South Africa</option>
                        </select>
                      </div>
                      <div className='slhw-form-group'>
                        <label>Postal Code</label>
                        <input type='text' name='postalCode' value={formData.postalCode} onChange={handleInputChange} placeholder='100001' />
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className='slhw-price-summary'>
                      <div className='slhw-price-row'>
                        <span>Subtotal</span>
                        <span>{formatPrice(selectedProduct.price)}</span>
                      </div>
                      {userType === "account" && userSubscription && (
                        <div className='slhw-price-row slhw-discount-row'>
                          <span>Discount ({discounts[userSubscription]}%)</span>
                          <span>-{formatPrice(getDiscountAmount())}</span>
                        </div>
                      )}
                      <div className='slhw-price-row'>
                        <span>Shipping</span>
                        <span className='slhw-free'>Free</span>
                      </div>
                      <div className='slhw-price-row slhw-total-row'>
                        <span>Total</span>
                        <span>{formatPrice(calculatePrice())}</span>
                      </div>
                    </div>

                    <button type='submit' className='slhw-btn slhw-btn-primary slhw-btn-full'>
                      Proceed to Payment
                      <ChevronRight size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {checkoutStep === "payment" && (
            <div className='slhw-payment-section'>
              <div className='slhw-payment-card'>
                <button className='slhw-cancel-btn-payment' onClick={handleCancel}>
                  <X size={18} />
                </button>
                <div className='slhw-icon-badge slhw-icon-success'>
                  <CreditCard size={32} />
                </div>
                <h2>Complete Payment</h2>
                <p>Review your order and proceed to payment</p>

                <div className='slhw-order-summary'>
                  <h3>Order Summary</h3>

                  <div className='slhw-summary-item'>
                    <img src='/api/placeholder/80/80' alt={selectedProduct.name} />
                    <div>
                      <h4>{selectedProduct.name}</h4>
                      <p>Quantity: 1</p>
                    </div>
                    <div className='slhw-item-price'>{formatPrice(calculatePrice())}</div>
                  </div>

                  <div className='slhw-summary-details'>
                    <div className='slhw-detail-row'>
                      <MapPin size={16} />
                      <div>
                        <strong>Shipping to:</strong>
                        <p>
                          {formData.address}, {formData.city}, {formData.state}
                        </p>
                      </div>
                    </div>
                    <div className='slhw-detail-row'>
                      <Phone size={16} />
                      <div>
                        <strong>Contact:</strong>
                        <p>{formData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className='slhw-final-total'>
                    <span>Total Amount</span>
                    <span className='slhw-amount'>{formatPrice(calculatePrice())}</span>
                  </div>

                  <button className='slhw-btn slhw-btn-primary slhw-btn-full' onClick={handlePayment}>
                    <CreditCard size={20} />
                    Pay Now
                  </button>

                  <button className='slhw-btn slhw-btn-secondary slhw-btn-full' onClick={() => setCheckoutStep("details")}>
                    Back to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .slhw-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
        }

        /* Email Overlay */
        .slhw-email-overlay {
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

        .slhw-overlay-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
        }

        .slhw-email-card {
          position: relative;
          max-width: 500px;
          width: 100%;
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          animation: slhw-slide-up 0.3s ease-out;
        }

        @keyframes slhw-slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Main Content */
        .slhw-main {
          padding: 40px 20px;
        }

        .slhw-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .slhw-icon-badge {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .slhw-icon-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
        }

        .slhw-email-card h2,
        .slhw-payment-card h2 {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 12px 0;
        }

        .slhw-email-card > p,
        .slhw-payment-card > p {
          font-size: 16px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        .slhw-email-form {
          margin-bottom: 24px;
        }

        .slhw-form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .slhw-form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .slhw-form-group input,
        .slhw-form-group select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          color: #0f172a;
          transition: all 0.2s ease;
        }

        .slhw-form-group input:focus,
        .slhw-form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .slhw-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .slhw-btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        }

        .slhw-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.5);
        }

        .slhw-btn-secondary {
          background: #f8fafc;
          color: #0f172a;
          border: 2px solid #e2e8f0;
        }

        .slhw-btn-secondary:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .slhw-btn-full {
          width: 100%;
        }

        .slhw-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
          color: #94a3b8;
          font-size: 14px;
        }

        .slhw-divider::before,
        .slhw-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .slhw-benefits {
          margin-top: 32px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          text-align: left;
        }

        .slhw-benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          color: #475569;
          font-size: 14px;
        }

        .slhw-benefit-item:last-child {
          margin-bottom: 0;
        }

        .slhw-benefit-item svg {
          color: #10b981;
          flex-shrink: 0;
        }

        /* Details Section */
        .slhw-details-section {
          animation: slhw-fade-in 0.3s ease-out;
        }

        @keyframes slhw-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .slhw-account-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 2px solid #10b981;
          border-radius: 16px;
          margin-bottom: 32px;
        }

        .slhw-account-banner svg {
          color: #10b981;
          flex-shrink: 0;
        }

        .slhw-account-banner strong {
          display: block;
          color: #065f46;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .slhw-account-banner p {
          color: #047857;
          font-size: 14px;
          margin: 0;
        }

        .slhw-guest-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          margin-bottom: 32px;
        }

        .slhw-guest-banner svg {
          color: #64748b;
          flex-shrink: 0;
        }

        .slhw-guest-banner strong {
          display: block;
          color: #0f172a;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .slhw-guest-banner p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }

        .slhw-checkout-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
        }

        .slhw-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .slhw-section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .slhw-section-title svg {
          color: #3b82f6;
        }

        .slhw-cancel-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #fef2f2;
          border: 2px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slhw-cancel-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .slhw-cancel-btn-payment {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fef2f2;
          border: 2px solid #fecaca;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #dc2626;
        }

        .slhw-cancel-btn-payment:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .slhw-section-title-single {
          margin-bottom: 24px;
        }

        .slhw-product-section,
        .slhw-form-section {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }

        /* Product Images */
        .slhw-product-images {
          margin-bottom: 24px;
        }

        .slhw-main-image {
          position: relative;
          width: 100%;
          height: 400px;
          background: #f8fafc;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .slhw-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .slhw-image-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          color: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        .slhw-image-thumbnails {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .slhw-thumbnail {
          height: 100px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.2s ease;
        }

        .slhw-thumbnail:hover {
          border-color: #cbd5e1;
        }

        .slhw-thumbnail-active {
          border-color: #3b82f6;
        }

        .slhw-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Product Info */
        .slhw-product-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .slhw-product-header h2 {
          font-size: 28px;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
        }

        .slhw-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .slhw-product-desc {
          font-size: 15px;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .slhw-features h4,
        .slhw-specifications h4 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .slhw-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .slhw-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #475569;
        }

        .slhw-features li svg {
          color: #10b981;
          flex-shrink: 0;
        }

        .slhw-specifications {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px solid #e2e8f0;
        }

        .slhw-specs-grid {
          display: grid;
          gap: 12px;
        }

        .slhw-spec-item {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
        }

        .slhw-spec-label {
          font-weight: 600;
          color: #0f172a;
          font-size: 14px;
        }

        .slhw-spec-value {
          color: #64748b;
          font-size: 14px;
        }

        /* Checkout Form */
        .slhw-checkout-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .slhw-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .slhw-price-summary {
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
        }

        .slhw-price-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          font-size: 15px;
          color: #475569;
        }

        .slhw-discount-row {
          color: #10b981;
        }

        .slhw-free {
          color: #10b981;
          font-weight: 700;
        }

        .slhw-total-row {
          border-top: 2px solid #e2e8f0;
          margin-top: 8px;
          padding-top: 16px;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }

        /* Payment Section */
        .slhw-payment-section {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }

        .slhw-payment-card {
          max-width: 600px;
          width: 100%;
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
          text-align: center;
          position: relative;
        }

        .slhw-payment-card h2 {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 12px 0;
        }

        .slhw-payment-card > p {
          font-size: 16px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        .slhw-order-summary {
          text-align: left;
        }

        .slhw-order-summary h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 20px 0;
        }

        .slhw-summary-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .slhw-summary-item img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          object-fit: cover;
        }

        .slhw-summary-item h4 {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .slhw-summary-item p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .slhw-item-price {
          margin-left: auto;
          font-size: 18px;
          font-weight: 900;
          color: #3b82f6;
        }

        .slhw-summary-details {
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .slhw-detail-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .slhw-detail-row:last-child {
          margin-bottom: 0;
        }

        .slhw-detail-row svg {
          color: #3b82f6;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .slhw-detail-row strong {
          display: block;
          color: #0f172a;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .slhw-detail-row p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }

        .slhw-final-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          font-weight: 700;
        }

        .slhw-amount {
          font-size: 32px;
          color: #1e40af;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .slhw-checkout-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .slhw-email-card,
          .slhw-payment-card {
            padding: 32px 24px;
          }

          .slhw-product-section,
          .slhw-form-section {
            padding: 24px;
          }

          .slhw-features ul {
            grid-template-columns: 1fr;
          }

          .slhw-form-row {
            grid-template-columns: 1fr;
          }

          .slhw-image-thumbnails {
            grid-template-columns: repeat(2, 1fr);
          }

          .slhw-main-image {
            height: 300px;
          }

          .slhw-cancel-btn span {
            display: none;
          }

          .slhw-cancel-btn {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default HardwareCheckoutPage;
