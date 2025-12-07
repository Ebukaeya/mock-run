import React, { useState } from "react";
import { Users, Mail, MessageSquare, Send, TrendingUp, Search, CheckCircle2, Target } from "lucide-react";

const CustomerEngagementSection = () => {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+234 801 234 5678", lastPurchase: "2 days ago", totalSpent: "₦45,000", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+234 802 345 6789", lastPurchase: "5 days ago", totalSpent: "₦78,500", status: "active" },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+234 803 456 7890",
      lastPurchase: "1 week ago",
      totalSpent: "₦32,000",
      status: "inactive",
    },
  ];

  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const toggleCustomerSelection = (customerId) => {
    setSelectedCustomers((prev) => (prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId]));
  };

  const selectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map((c) => c.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "vip":
        return "#a855f7";
      case "active":
        return "#10b981";
      case "inactive":
        return "#64748b";
      default:
        return "#64748b";
    }
  };

  return (
    <div className='slcust-wrapper'>
      <div className='slcust-container'>
        {/* Header */}
        <div className='slcust-header'>
          <div className='slcust-header-content'>
            <div className='slcust-badge'>
              <Users size={18} />
              <span>Customer Engagement</span>
            </div>
            <h2 className='slcust-title'>Engage Customers at Scale</h2>
            <p className='slcust-subtitle'>
              Build lasting relationships with your customers through powerful SMS and email campaigns. Send personalized messages to thousands with just one
              click and track every interaction.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className='slcust-content'>
          {/* Customer Stats */}
          <div className='slcust-stats-grid'>
            <div className='slcust-stat-card slcust-stat-teal'>
              <div className='slcust-stat-icon'>
                <Users size={24} />
              </div>
              <div className='slcust-stat-content'>
                <p className='slcust-stat-label'>Total Customers</p>
                <p className='slcust-stat-value'>3,842</p>
                <p className='slcust-stat-change'>+156 this month</p>
              </div>
            </div>

            <div className='slcust-stat-card slcust-stat-orange'>
              <div className='slcust-stat-icon'>
                <Mail size={24} />
              </div>
              <div className='slcust-stat-content'>
                <p className='slcust-stat-label'>Campaigns Sent</p>
                <p className='slcust-stat-value'>48</p>
                <p className='slcust-stat-change'>92% open rate</p>
              </div>
            </div>

            <div className='slcust-stat-card slcust-stat-pink'>
              <div className='slcust-stat-icon'>
                <MessageSquare size={24} />
              </div>
              <div className='slcust-stat-content'>
                <p className='slcust-stat-label'>SMS Delivered</p>
                <p className='slcust-stat-value'>12.4K</p>
                <p className='slcust-stat-change'>98% delivery rate</p>
              </div>
            </div>
          </div>

          {/* Customer List */}
          <div className='slcust-customer-container'>
            <div className='slcust-customer-header'>
              <div className='slcust-customer-title'>
                <Users size={20} />
                <span>Customer Database</span>
                {selectedCustomers.length > 0 && <span className='slcust-selected-count'>{selectedCustomers.length} selected</span>}
              </div>
              <div className='slcust-header-actions'>
                <button className='slcust-select-all-btn' onClick={selectAll}>
                  <CheckCircle2 size={16} />
                  <span>{selectedCustomers.length === customers.length ? "Deselect All" : "Select All"}</span>
                </button>
                <button className='slcust-search-btn'>
                  <Search size={16} />
                  <input type='text' placeholder='Search customers...' />
                </button>
              </div>
            </div>

            <div className='slcust-customer-list'>
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className={`slcust-customer-card ${selectedCustomers.includes(customer.id) ? "slcust-customer-selected" : ""}`}
                  onClick={() => toggleCustomerSelection(customer.id)}
                >
                  <div className='slcust-customer-checkbox'>
                    <input type='checkbox' checked={selectedCustomers.includes(customer.id)} onChange={() => {}} />
                  </div>
                  <div className='slcust-customer-avatar'>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className='slcust-customer-info'>
                    <div className='slcust-name-status'>
                      <h4>{customer.name}</h4>
                      <span className='slcust-status-badge' style={{ background: getStatusColor(customer.status) }}>
                        {customer.status}
                      </span>
                    </div>
                    <p className='slcust-customer-email'>{customer.email}</p>
                    <p className='slcust-customer-phone'>{customer.phone}</p>
                  </div>
                  <div className='slcust-customer-stats'>
                    <div className='slcust-customer-stat'>
                      <span className='slcust-stat-label-small'>Last Purchase</span>
                      <span className='slcust-stat-value-small'>{customer.lastPurchase}</span>
                    </div>
                    <div className='slcust-customer-stat'>
                      <span className='slcust-stat-label-small'>Total Spent</span>
                      <span className='slcust-stat-value-small'>{customer.totalSpent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Actions */}
          {/* {selectedCustomers.length > 0 && (
            <div className='slcust-campaign-actions'>
              <div className='slcust-campaign-info'>
                <Target size={24} />
                <div>
                  <p className='slcust-campaign-title'>Ready to Send Campaign</p>
                  <p className='slcust-campaign-text'>
                    Reach <strong>{selectedCustomers.length}</strong> selected customer{selectedCustomers.length > 1 ? "s" : ""} instantly
                  </p>
                </div>
              </div>
              <div className='slcust-campaign-buttons'>
                <button className='slcust-campaign-btn slcust-btn-email'>
                  <Mail size={18} />
                  <span>Send Email</span>
                </button>
                <button className='slcust-campaign-btn slcust-btn-sms'>
                  <MessageSquare size={18} />
                  <span>Send SMS</span>
                </button>
                <button className='slcust-campaign-btn slcust-btn-both'>
                  <Send size={18} />
                  <span>Send Both</span>
                </button>
              </div>
            </div>
          )} */}

          {/* Feature Highlights */}
          <div className='slcust-features-grid'>
            <div className='slcust-feature-item'>
              <div className='slcust-feature-icon slcust-icon-blue'>
                <Mail size={24} />
              </div>
              <div className='slcust-feature-content'>
                <h4>Email Campaigns</h4>
                <p>Beautiful, responsive email templates with real-time delivery tracking and engagement analytics</p>
              </div>
            </div>
            <div className='slcust-feature-item'>
              <div className='slcust-feature-icon slcust-icon-purple'>
                <MessageSquare size={24} />
              </div>
              <div className='slcust-feature-content'>
                <h4>SMS Marketing</h4>
                <p>Instant delivery to thousands with one click. Perfect for time-sensitive promotions and alerts</p>
              </div>
            </div>
            <div className='slcust-feature-item'>
              <div className='slcust-feature-icon slcust-icon-green'>
                <TrendingUp size={24} />
              </div>
              <div className='slcust-feature-content'>
                <h4>Analytics Dashboard</h4>
                <p>Track opens, clicks, and conversions, with comprehensive campaign performance metrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slcust-wrapper {
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #050505 100%);
          padding: 30px 20px;
          position: relative;
          overflow: hidden;
        }

        .slcust-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 30%, rgba(20, 184, 166, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        .slcust-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .slcust-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .slcust-header-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .slcust-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(20, 184, 166, 0.4);
        }

        .slcust-title {
          font-size: 56px;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 0%, #64748b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          letter-spacing: -2px;
        }

        .slcust-subtitle {
          font-size: 18px;
          color: #71717a;
          line-height: 1.7;
        }

        .slcust-content {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
        }

        .slcust-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .slcust-stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: all 0.3s ease;
        }

        .slcust-stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .slcust-stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slcust-stat-teal .slcust-stat-icon {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          box-shadow: 0 8px 24px rgba(20, 184, 166, 0.3);
        }

        .slcust-stat-orange .slcust-stat-icon {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
        }

        .slcust-stat-pink .slcust-stat-icon {
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          box-shadow: 0 8px 24px rgba(236, 72, 153, 0.3);
        }

        .slcust-stat-content {
          flex: 1;
        }

        .slcust-stat-label {
          font-size: 14px;
          color: #71717a;
          margin-bottom: 8px;
        }

        .slcust-stat-value {
          font-size: 32px;
          font-weight: 900;
          color: white;
          margin-bottom: 4px;
          letter-spacing: -1px;
        }

        .slcust-stat-change {
          font-size: 13px;
          color: #10b981;
          font-weight: 600;
        }

        .slcust-customer-container {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .slcust-customer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 16px;
        }

        .slcust-customer-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 700;
          color: white;
        }

        .slcust-selected-count {
          font-size: 14px;
          color: #14b8a6;
          font-weight: 600;
          background: rgba(20, 184, 166, 0.1);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .slcust-header-actions {
          display: flex;
          gap: 12px;
        }

        .slcust-select-all-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: #71717a;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slcust-select-all-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .slcust-search-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
        }

        .slcust-search-btn input {
          background: transparent;
          border: none;
          color: white;
          font-size: 14px;
          outline: none;
          width: 200px;
        }

        .slcust-search-btn input::placeholder {
          color: #52525b;
        }

        .slcust-search-btn svg {
          color: #52525b;
        }

        .slcust-customer-list {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .slcust-customer-card {
          background: rgba(255, 255, 255, 0.02);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slcust-customer-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(20, 184, 166, 0.3);
        }

        .slcust-customer-selected {
          background: rgba(20, 184, 166, 0.08);
          border-color: #14b8a6;
        }

        .slcust-customer-checkbox input {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .slcust-customer-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .slcust-customer-info {
          flex: 1;
        }

        .slcust-name-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .slcust-customer-info h4 {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .slcust-status-badge {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .slcust-customer-email {
          font-size: 13px;
          color: #71717a;
          margin: 0 0 4px 0;
        }

        .slcust-customer-phone {
          font-size: 13px;
          color: #52525b;
          margin: 0;
        }

        .slcust-customer-stats {
          display: flex;
          gap: 24px;
        }

        .slcust-customer-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slcust-stat-label-small {
          font-size: 11px;
          color: #52525b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .slcust-stat-value-small {
          font-size: 14px;
          font-weight: 700;
          color: white;
        }

        .slcust-campaign-actions {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 40px;
          animation: slcust-slide-up 0.4s ease-out;
          box-shadow: 0 20px 40px rgba(20, 184, 166, 0.3);
        }

        @keyframes slcust-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slcust-campaign-info {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .slcust-campaign-info svg {
          flex-shrink: 0;
        }

        .slcust-campaign-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin: 0 0 4px 0;
        }

        .slcust-campaign-text {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .slcust-campaign-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .slcust-campaign-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border: 2px solid white;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          min-width: 180px;
          justify-content: center;
        }

        .slcust-btn-email {
          background: white;
          color: #14b8a6;
        }

        .slcust-btn-email:hover {
          background: #f8fafc;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
        }

        .slcust-btn-sms {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .slcust-btn-sms:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .slcust-btn-both {
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          color: white;
          border-color: #ec4899;
        }

        .slcust-btn-both:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(236, 72, 153, 0.4);
        }

        .slcust-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .slcust-feature-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .slcust-feature-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
        }

        .slcust-feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slcust-icon-blue {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .slcust-icon-purple {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
          box-shadow: 0 8px 24px rgba(168, 85, 247, 0.3);
        }

        .slcust-icon-green {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
        }

        .slcust-feature-content {
          flex: 1;
        }

        .slcust-feature-item h4 {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px 0;
        }

        .slcust-feature-item p {
          font-size: 14px;
          color: #71717a;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .slcust-title {
            font-size: 44px;
          }

          .slcust-content {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .slcust-wrapper {
            padding: 60px 16px;
          }

          .slcust-title {
            font-size: 36px;
          }

          .slcust-subtitle {
            font-size: 16px;
          }

          .slcust-content {
            padding: 24px 16px;
          }

          .slcust-customer-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .slcust-header-actions {
            width: 100%;
            flex-direction: column;
          }

          .slcust-search-btn input {
            width: 100%;
          }

          .slcust-campaign-buttons {
            flex-direction: column;
          }

          .slcust-campaign-btn {
            min-width: 100%;
          }

          .slcust-customer-card {
            flex-wrap: wrap;
          }

          .slcust-customer-stats {
            width: 100%;
            margin-top: 12px;
          }
        }

        @media (max-width: 480px) {
          .slcust-title {
            font-size: 28px;
            letter-spacing: -1px;
          }

          .slcust-stats-grid {
            grid-template-columns: 1fr;
          }

          .slcust-features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerEngagementSection;
