import { useState, useEffect } from "react";
import "./index.css";
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

// Icons as inline SVGs
const PackageIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m7.5 4.27 9 5.15' />
    <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
    <path d='m3.3 7 8.7 5 8.7-5' />
    <path d='M12 22V12' />
  </svg>
);

const XIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
);

const MinusIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M5 12h14' />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M5 12h14' />
    <path d='M12 5v14' />
  </svg>
);

const MessageSquareIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
  </svg>
);

const BuildingIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect width='16' height='20' x='4' y='2' rx='2' ry='2' />
    <path d='M9 22v-4h6v4' />
    <path d='M8 6h.01' />
    <path d='M16 6h.01' />
    <path d='M12 6h.01' />
    <path d='M12 10h.01' />
    <path d='M12 14h.01' />
    <path d='M16 10h.01' />
    <path d='M16 14h.01' />
    <path d='M8 10h.01' />
    <path d='M8 14h.01' />
  </svg>
);

const CopyIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
    <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20 6 9 17l-5-5' />
  </svg>
);

const InfoIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10' />
    <path d='M12 16v-4' />
    <path d='M12 8h.01' />
  </svg>
);

const SendIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m22 2-7 20-4-9-9-4Z' />
    <path d='M22 2 11 13' />
  </svg>
);

const CreditCardIcon = ({ className }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect width='20' height='14' x='2' y='5' rx='2' />
    <line x1='2' x2='22' y1='10' y2='10' />
  </svg>
);

// Mock order data matching the schema
const MOCK_ORDER = {
  bookedOrderID: "BO-2024-001",
  status: "pending", // "completed", "pending", "modified", "rejected"
  currency: "₦",
  customerHasPaid: false,
  paymentDetails: {
    bankName: "First Bank of Nigeria",
    accountNumber: "3042159876",
    accountName: "ABC Ventures Ltd",
  },
  bookedOrderDetails: {
    date: new Date(),
    paymentMode: "bankTransfer",
    modified: false,
    numberOfItems: 3,
    subTotal: 9300,
    totalAmount: 9300,
    discount: 0,
    vat: 0,
    vatPercentage: 0,
  },
  customer: {
    customerID: "CUST-001",
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "+234 801 234 5678",
    address: "123 Main Street, Lagos",
  },
  store: {
    id: "STORE-001",
    name: "ABC Ventures Store",
  },
  products: [
    {
      id: "1",
      name: "Nasco Cornflakes 350g",
      productImage: null,
      category: "Cereals",
      productCostPrice: 2500,
      soldUnitPrice: 3000,
      requestedUnitPrice: 4000,
      quantity: 1.5,
      requestedQuantity: 4.5,
      totalAmount: 4500,
    },
    {
      id: "2",
      name: "Nasco Cornflakes Hanging Half Roll",
      productImage: null,
      category: "Cereals",
      productCostPrice: 600,
      soldUnitPrice: 800,
      requestedUnitPrice: null,
      quantity: 1,
      requestedQuantity: null,
      totalAmount: 800,
    },
    {
      id: "3",
      name: "Golden Morn 450g",
      productImage: null,
      category: "Cereals",
      productCostPrice: 2000,
      soldUnitPrice: 2500,
      requestedUnitPrice: null,
      quantity: 2,
      requestedQuantity: null,
      totalAmount: 5000,
    },
  ],
};

const formatPrice = (price, currency = "₦") => {
  return `${currency}${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
  }).format(price)}`;
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bok-status-completed";
    case "pending":
      return "bok-status-pending";
    case "modified":
      return "bok-status-modified";
    case "rejected":
      return "bok-status-rejected";
    default:
      return "bok-status-pending";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "pending":
      return "Pending";
    case "modified":
      return "Modified";
    case "rejected":
      return "Rejected";
    default:
      return "Pending";
  }
};

// OrderItem Component
function OrderItem({ product, currency, onQuantityChange, onRequestedPriceChange, disabled }) {
  const [showNegotiate, setShowNegotiate] = useState(false);
  const currentPrice = product.requestedUnitPrice ?? product.soldUnitPrice;
  const currentQty = product.requestedQuantity ?? product.quantity;
  const total = currentPrice * currentQty;

  return (
    <div className={`bok-item-card ${disabled ? "bok-item-disabled" : ""}`}>
      <div className='bok-item-header'>
        <div className='bok-item-info'>
          <h3 className='bok-item-name'>{product.name}</h3>
          <p className='bok-item-category'>{product.category}</p>
          <p className='bok-item-price-info'>
            {formatPrice(product.soldUnitPrice, currency)} / unit
            {product.requestedUnitPrice && product.requestedUnitPrice !== product.soldUnitPrice && (
              <span className='bok-item-negotiated'>→ {formatPrice(product.requestedUnitPrice, currency)}</span>
            )}
          </p>
        </div>
        <p className='bok-item-total'>{formatPrice(total, currency)}</p>
      </div>

      <div className='bok-item-controls'>
        <div className='bok-quantity-controls'>
          <button className='bok-qty-btn' onClick={() => onQuantityChange(product.id, Math.max(0.5, currentQty - 0.5))} disabled={disabled}>
            <MinusIcon className='bok-qty-btn-icon' />
          </button>
          <input
            type='number'
            inputMode='decimal'
            value={currentQty}
            onChange={(e) => onQuantityChange(product.id, Math.max(0.5, parseFloat(e.target.value) || 0.5))}
            className='bok-qty-input'
            step={0.5}
            min={0.5}
            disabled={disabled}
          />
          <button className='bok-qty-btn' onClick={() => onQuantityChange(product.id, currentQty + 0.5)} disabled={disabled}>
            <PlusIcon className='bok-qty-btn-icon' />
          </button>
        </div>

        <button className='bok-negotiate-btn' onClick={() => setShowNegotiate(!showNegotiate)} disabled={disabled}>
          <MessageSquareIcon className='bok-negotiate-icon' />
          Negotiate
        </button>
      </div>

      {showNegotiate && !disabled && (
        <div className='bok-negotiate-panel'>
          <span className='bok-negotiate-label'>Your offer:</span>
          <input
            type='number'
            inputMode='decimal'
            placeholder={formatPrice(product.soldUnitPrice, currency)}
            value={product.requestedUnitPrice ?? ""}
            onChange={(e) => onRequestedPriceChange(product.id, e.target.value ? parseFloat(e.target.value) : null)}
            className='bok-negotiate-input'
            disabled={disabled}
          />
          <span className='bok-negotiate-label'>/ unit</span>
        </div>
      )}
    </div>
  );
}

// PriceSummary Component
function PriceSummary({ subtotal, discount, vatPercent, currency, onDiscountChange, onVatChange, disabled }) {
  const discountAmount = discount;
  const afterDiscount = subtotal - discountAmount;
  const vatAmount = afterDiscount * (vatPercent / 100);
  const total = afterDiscount + vatAmount;

  return (
    <div className='bok-summary-card'>
      <div className='bok-summary-rows'>
        <div className='bok-summary-row'>
          <p className='bok-summary-label'>Subtotal</p>
          <p className='bok-summary-value'>{formatPrice(subtotal, currency)}</p>
        </div>

        <div className='bok-summary-row'>
          <p className='bok-summary-label'>Discount</p>
          <div className='bok-summary-input-row'>
            <span className='bok-summary-label'>{currency}</span>
            <input type='number' value={discount || ""} className='bok-summary-input' placeholder='0' disabled={true} />
          </div>
        </div>

        <div className='bok-summary-row'>
          <p className='bok-summary-label'>VAT</p>
          <div className='bok-summary-input-row'>
            <input
              type='number'
              value={vatPercent || ""}
              onChange={(e) => onVatChange(parseFloat(e.target.value) || 0)}
              className='bok-summary-input'
              placeholder='0'
              disabled={true}
            />
            <span className='bok-summary-label'>%</span>
          </div>
        </div>

        {vatPercent > 0 && (
          <div className='bok-summary-row'>
            <p className='bok-summary-label'>VAT Amount</p>
            <p className='bok-summary-value'>{formatPrice(vatAmount, currency)}</p>
          </div>
        )}

        <div className='bok-summary-divider' />

        <div className='bok-summary-row'>
          <p className='bok-summary-total-label'>Total</p>
          <p className='bok-summary-total-value'>{formatPrice(total, currency)}</p>
        </div>
      </div>
    </div>
  );
}

// PaymentDetails Component
function PaymentDetails({ bankName, accountNumber, accountName }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='bok-payment-card'>
      <div className='bok-payment-header'>
        <BuildingIcon className='bok-payment-icon' />
        <h3 className='bok-payment-title'>Payment Details</h3>
      </div>

      <div className='bok-payment-rows'>
        <div className='bok-payment-row'>
          <p className='bok-payment-label'>Bank Name</p>
          <p className='bok-payment-value'>{bankName}</p>
        </div>

        <div className='bok-payment-row'>
          <p className='bok-payment-label'>Account Number</p>
          <div className='bok-copy-row'>
            <p className='bok-payment-value'>{accountNumber}</p>
            <button className='bok-copy-btn' onClick={handleCopy}>
              {copied ? <CheckIcon className='bok-copy-icon' /> : <CopyIcon className='bok-copy-icon' />}
            </button>
          </div>
        </div>

        <div className='bok-payment-row'>
          <p className='bok-payment-label'>Account Name</p>
          <p className='bok-payment-value'>{accountName}</p>
        </div>
      </div>
    </div>
  );
}

// NegotiationBanner Component
function NegotiationBanner({ disabled }) {
  if (disabled) {
    return (
      <div className='bok-banner bok-banner-completed'>
        <CheckIcon className='bok-banner-icon' />
        <p className='bok-banner-text'>This order has been completed. No further modifications are allowed.</p>
      </div>
    );
  }

  return (
    <div className='bok-banner'>
      <InfoIcon className='bok-banner-icon' />
      <p className='bok-banner-text'>Click "Negotiate" on any item to propose a different price. The business owner will review your offer.</p>
    </div>
  );
}

// OrderStatus Component
function OrderStatus({ status, orderId, date }) {
  const truncateOrderId = (id) => {
    if (id.length <= 10) return id;
    return id.slice(0, 6) + "..." + id.slice(-4);
  };
  return (
    <div className='bok-order-status-card'>
      <div className='bok-order-status-header'>
        <div className='bok-order-id'>
          <span className='bok-order-id-label'>Order ID:</span>
          <span className='bok-order-id-value'>{truncateOrderId(orderId)}</span>
        </div>
        <div className={`bok-status-badge ${getStatusColor(status)}`}>{getStatusLabel(status)}</div>
      </div>
      <div className='bok-order-date'>
        <span className='bok-order-date-label'>Date:</span>
        <span className='bok-order-date-value'>
          {new Date(date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

// Main BookOrder Component
export default function BookOrder() {
  const [order, setOrder] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [vatPercent, setVatPercent] = useState(0);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let bookedQuotationID = useSearchParams()[0].get("orderID");
  let storeID = useSearchParams()[0].get("storeID");

  useEffect(() => {
    //check if bookedQuotationID and storeID are present
    if (!bookedQuotationID || !storeID) {
      alert("Invalid quotation link. Missing parameters.");
      return window.location.replace("/");
    }
    fetchBookedQuotationData(bookedQuotationID, storeID);
  }, []);
  const isCompleted = order?.status === "completed";

  const fetchBookedQuotationData = async (bookedQuotationID, storeID) => {
    try {
      const url = process.env.REACT_APP_Back_end_api_root + `/viewBookedOrder/${storeID}/${bookedQuotationID}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { bookerQuotation } = await response.json();

      setOrder(bookerQuotation);
      setDiscount(bookerQuotation.bookedOrderDetails.discount || 0);
      setVatPercent(bookerQuotation.bookedOrderDetails.vatPercentage || 0);
    } catch (error) {
      alert("Failed to fetch quotation data. Please try again later.");
      // return window.location.replace("/");
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleQuantityChange = (id, quantity) => {
    if (isCompleted) return;
    setOrder((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, requestedQuantity: quantity } : p)),
    }));
  };

  const handleRequestedPriceChange = (id, price) => {
    if (isCompleted) return;
    setOrder((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, requestedUnitPrice: price } : p)),
    }));
  };

  const subtotal = order?.products.reduce((sum, p) => {
    const price = p.requestedUnitPrice ?? p.soldUnitPrice;
    const qty = p.requestedQuantity ?? p.quantity;
    return sum + price * qty;
  }, 0);

  const hasNegotiations = order?.products.some(
    (p) => (p.requestedUnitPrice !== null && p.requestedUnitPrice !== p.soldUnitPrice) || (p.requestedQuantity !== null && p.requestedQuantity !== p.quantity)
  );

  const handleSendNegotiation = async () => {
    if (isCompleted) return;
    if (!hasNegotiations) {
      showToast("No price negotiations to send. Click 'Negotiate' on items to propose new prices.");
      return;
    }

    try {
      setIsLoading(true);
      const url = process.env.REACT_APP_Back_end_api_root + `/sendNegotiatedOrder/${order.store.id}/${order.bookedOrderID}`;
      const payload = {
        products: order.products,
        bookedOrderDetails: { ...order.bookedOrderDetails, modified: true },
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { updatedQuotation } = await response.json();
      setOrder(updatedQuotation);

      showToast(`Negotiation sent successfully! to ${updatedQuotation.store.name}. The business owner will review your offer.`);
    } catch (error) {
      showToast("Failed to send negotiation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakePayment = () => {
    if (isCompleted) return;
    showToast("Payment initiated! Please complete the bank transfer.");
  };

  return (
    <>
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
      {order && (
        <div className='bok-page'>
          <div className='bok-container'>
            {/* Header */}
            <div className='bok-header'>
              <div className='bok-header-left'>
                <div className='bok-header-icon-wrapper'>
                  <PackageIcon className='bok-header-icon' />
                </div>
                <div>
                  <h1 className='bok-header-title'>Book Order</h1>
                  <p className='bok-header-subtitle'>Review and complete your order details</p>
                </div>
              </div>
              <button className='bok-close-btn'>
                <XIcon className='bok-header-icon' />
              </button>
            </div>

            {/* Order Status */}
            <OrderStatus status={order.status} orderId={order.bookedOrderID} date={order.bookedOrderDetails.date} />

            <div className='bok-grid'>
              {/* Left Column - Order Items */}
              <div className='bok-column'>
                <div className='bok-section-header'>
                  <PackageIcon className='bok-section-icon' />
                  <h2 className='bok-section-title'>Order Items ({order.products.length})</h2>
                </div>

                <div className='bok-item-list'>
                  {order &&
                    order.products.map((product) => (
                      <OrderItem
                        key={product.id}
                        product={product}
                        currency={order.currency}
                        onQuantityChange={handleQuantityChange}
                        onRequestedPriceChange={handleRequestedPriceChange}
                        disabled={isCompleted}
                      />
                    ))}
                </div>

                <PriceSummary
                  subtotal={subtotal}
                  discount={discount}
                  vatPercent={vatPercent.$numberDecimal}
                  currency={order.currency}
                  onDiscountChange={setDiscount}
                  onVatChange={setVatPercent}
                  disabled={isCompleted}
                />
              </div>

              {/* Right Column - Payment & Actions */}
              <div className='bok-column'>
                <PaymentDetails {...order.paymentDetails} />

                <NegotiationBanner disabled={isCompleted} />

                {/* Desktop CTAs */}
                <div className='bok-desktop-ctas'>
                  <button
                    onClick={handleSendNegotiation}
                    className={`bok-cta-btn bok-cta-outline ${isCompleted ? "bok-cta-disabled" : ""}`}
                    disabled={isCompleted}
                  >
                    <SendIcon className='bok-cta-icon' />
                    Send Negotiated Order
                  </button>

                  <button onClick={handleMakePayment} className={`bok-cta-btn bok-cta-primary ${isCompleted ? "bok-cta-disabled" : ""}`} disabled={isCompleted}>
                    <CreditCardIcon className='bok-cta-icon' />
                    Make Payment
                  </button>
                </div>

                {hasNegotiations && !isCompleted && (
                  <p className='bok-negotiation-note'>
                    You have {order.products.filter((p) => p.requestedUnitPrice !== null || p.requestedQuantity !== null).length} item(s) with proposed changes
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fixed Bottom CTAs for Mobile/Tablet */}
          <div className={`bok-fixed-ctas ${isCompleted ? "bok-fixed-ctas-disabled" : ""}`}>
            <div className='bok-fixed-ctas-inner'>
              <button
                onClick={handleSendNegotiation}
                className={`bok-mobile-cta bok-cta-outline ${isCompleted ? "bok-cta-disabled" : ""}`}
                disabled={isCompleted || isLoading}
              >
                <SendIcon className='bok-mobile-cta-icon' />
                <span>Negotiate</span>
              </button>

              <button
                onClick={handleMakePayment}
                className={`bok-mobile-cta bok-cta-primary ${isCompleted ? "bok-cta-disabled" : ""}`}
                disabled={isCompleted || isLoading}
              >
                <CreditCardIcon className='bok-mobile-cta-icon' />
                <span>Pay Now</span>
              </button>
            </div>
          </div>

          {/* Toast */}
          {toast && <div className='bok-toast'>{toast}</div>}
        </div>
      )}
    </>
  );
}
