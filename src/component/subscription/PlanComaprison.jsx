import React, { useState } from "react";
import { Check, X, Crown, Shield, Rocket } from "lucide-react";

const PlanComparison = () => {
  const [selectedPlan, setSelectedPlan] = useState("super");

  const comparisonData = [
    {
      category: "Store Management",
      features: [
        {
          name: "Maximum Stores",
          starter: "1 Store",
          basic: "1 Store",
          super: "2 Stores",
          premium: "5 Stores",
        },
        {
          name: "Maximum Warehouses",
          starter: "Not Available",
          basic: "Not Available",
          super: "1 Warehouse",
          premium: "3 Warehouses",
        },
        {
          name: "Maximum Employees",
          starter: "0",
          basic: "0",
          super: "2 Employees",
          premium: "Unlimited",
        },
      ],
    },
    {
      category: "Inventory & Products",
      features: [
        {
          name: "Maximum Products",
          starter: "50 Products",
          basic: "250 Products",
          super: "1,500 Products",
          premium: "11,200 Products",
        },
        {
          name: "Product Categories",
          starter: "Unlimited",
          basic: "Unlimited",
          super: "Unlimited",
          premium: "Unlimited",
        },
      ],
    },
    {
      category: "Advertising & Support",
      features: [
        {
          name: "Free Ad Hours Monthly",
          starter: "Basic user ads",
          basic: "24 Hours",
          super: "60 Hours",
          premium: "150 Hours",
        },
        {
          name: "Customer Support",
          starter: "Basic Support",
          basic: "Free Support",
          super: "Free Support",
          premium: "Priority Support",
        },
      ],
    },
    {
      category: "Hardware & Services",
      features: [
        {
          name: "Hardware Installation",
          starter: false,
          basic: false,
          super: true,
          premium: true,
        },
        {
          name: "Device Leasing",
          starter: false,
          basic: false,
          super: true,
          premium: true,
        },
        {
          name: "Discount on Extra Services",
          starter: "Not Available",
          basic: "2%",
          super: "10%",
          premium: "30%",
        },
      ],
    },
    {
      category: "Training & Integration",
      features: [
        {
          name: "Personnel Training",
          starter: false,
          basic: true,
          super: true,
          premium: true,
        },
        {
          name: "E-commerce Integration",
          starter: true,
          basic: true,
          super: true,
          premium: true,
        },
        {
          name: "Business KPI Tracking",
          starter: false,
          basic: true,
          super: true,
          premium: true,
        },
      ],
    },
  ];

  const plans = [
    { id: "starter", name: "Starter", icon: Shield, color: "teal", badge: "FREE FOREVER" },
    { id: "basic", name: "Basic", icon: Shield, color: "amber", badge: "SAVER" },
    { id: "super", name: "Super", icon: Crown, color: "blue", badge: "MOST POPULAR" },
    { id: "premium", name: "Premium", icon: Rocket, color: "amber", badge: "SAVER" },
  ];

  const renderCell = (value) => {
    if (typeof value === "boolean") {
      return value ? <Check className='slc-comparison-check-icon' size={20} /> : <X className='slc-comparison-x-icon' size={20} />;
    }
    return <span className='slc-comparison-value-text'>{value}</span>;
  };

  return (
    <div className='slc-comparison-wrapper'>
      <div className='slc-comparison-container'>
        {/* Header Section */}
        <div className='slc-comparison-header'>
          <h2 className='slc-comparison-title'>Compare Plans</h2>
          <p className='slc-comparison-subtitle'>Choose the perfect plan for your business needs</p>
        </div>

        {/* Mobile Plan Selector */}
        <div className='slc-mobile-plan-selector'>
          <label className='slc-mobile-selector-label'>Select Plan to View:</label>
          <select className='slc-mobile-selector-dropdown' value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Table View */}
        <div className='slc-comparison-desktop-table'>
          <table className='slc-comparison-table'>
            <thead>
              <tr>
                <th className='slc-table-header-feature'>Features</th>
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <th key={plan.id} className='slc-table-header-plan'>
                      <div className='slc-plan-header-content'>
                        {plan.badge && <span className={`slc-plan-badge slc-badge-${plan.color}`}>{plan.badge}</span>}
                        <div className='slc-plan-icon-wrapper'>
                          <Icon size={24} />
                        </div>
                        <span className='slc-plan-name'>{plan.name}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr className='slc-category-row'>
                    <td colSpan={5} className='slc-category-cell'>
                      {category.category}
                    </td>
                  </tr>
                  {category.features.map((feature, featureIndex) => (
                    <tr key={featureIndex} className='slc-feature-row'>
                      <td className='slc-feature-name'>{feature.name}</td>
                      <td className='slc-feature-value'>{renderCell(feature.starter)}</td>
                      <td className='slc-feature-value'>{renderCell(feature.basic)}</td>
                      <td className='slc-feature-value slc-super-column'>{renderCell(feature.super)}</td>
                      <td className='slc-feature-value'>{renderCell(feature.premium)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className='slc-comparison-mobile-cards'>
          {comparisonData.map((category, categoryIndex) => (
            <div key={categoryIndex} className='slc-mobile-category-card'>
              <h3 className='slc-mobile-category-title'>{category.category}</h3>
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className='slc-mobile-feature-item'>
                  <div className='slc-mobile-feature-name'>{feature.name}</div>
                  <div className='slc-mobile-feature-value'>{renderCell(feature[selectedPlan])}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        {/*   <div className='slc-comparison-footer'>
          <p className='slc-footer-text'>
            Not sure which plan is right for you?{" "}
            <a href='#' className='slc-footer-link'>
              Contact our sales team
            </a>
          </p>
        </div> */}
      </div>

      <style jsx>{`
        .slc-comparison-wrapper {
         100%);
          padding: 60px 20px;
          margin-top: 40px;
        }

        .slc-comparison-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .slc-comparison-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .slc-comparison-title {
          font-size: 36px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .slc-comparison-subtitle {
          font-size: 16px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .slc-mobile-plan-selector {
          display: none;
          margin-bottom: 30px;
        }

        .slc-mobile-selector-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .slc-mobile-selector-dropdown {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          color: #1e293b;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slc-mobile-selector-dropdown:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .slc-comparison-desktop-table {
          display: block;
          overflow-x: auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .slc-comparison-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        .slc-table-header-feature {
          text-align: left;
          padding: 24px;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
          width: 30%;
        }

        .slc-table-header-plan {
          text-align: center;
          padding: 32px 16px;
          background: white;
          border-bottom: 2px solid #e2e8f0;
          width: 17.5%;
          position: relative;
        }

        .slc-plan-header-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .slc-plan-badge {
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .slc-badge-teal {
          background: #14b8a6;
          color: white;
        }

        .slc-badge-amber {
          background: #f59e0b;
          color: white;
        }

        .slc-badge-blue {
          background: #3b82f6;
          color: white;
        }

        .slc-plan-icon-wrapper {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 14px;
          color: white;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .slc-plan-icon-wrapper:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
        }

        .slc-plan-name {
          font-size: 22px;
          font-weight: 800;
          color: #1e293b;
          letter-spacing: -0.5px;
        }

        .slc-category-row {
          background: #f1f5f9;
        }

        .slc-category-cell {
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 700;
          color: #334155;
          border-top: 2px solid #e2e8f0;
        }

        .slc-feature-row {
          transition: background 0.2s ease;
        }

        .slc-feature-row:hover {
          background: #f8fafc;
        }

        .slc-feature-name {
          padding: 20px 24px;
          font-size: 15px;
          color: #475569;
          border-bottom: 1px solid #f1f5f9;
        }

        .slc-feature-value {
          padding: 20px 16px;
          text-align: center;
          border-bottom: 1px solid #f1f5f9;
        }

        .slc-super-column {
          background: rgba(59, 130, 246, 0.03);
        }

        .slc-comparison-check-icon {
          color: #10b981;
          margin: 0 auto;
          display: block;
        }

        .slc-comparison-x-icon {
          color: #ef4444;
          margin: 0 auto;
          display: block;
        }

        .slc-comparison-value-text {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .slc-comparison-mobile-cards {
          display: none;
        }

        .slc-comparison-footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid #e2e8f0;
        }

        .slc-footer-text {
          font-size: 15px;
          color: #64748b;
        }

        .slc-footer-link {
          color: #3b82f6;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .slc-footer-link:hover {
          color: #2563eb;
          text-decoration: underline;
        }

        /* Tablet Responsiveness */
        @media (max-width: 1024px) {
          .slc-comparison-title {
            font-size: 32px;
          }

          .slc-comparison-table {
            min-width: 800px;
          }

          .slc-table-header-feature {
            width: 35%;
          }

          .slc-table-header-plan {
            width: 16.25%;
          }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .slc-comparison-wrapper {
            padding: 40px 16px;
          }

          .slc-comparison-title {
            font-size: 28px;
          }

          .slc-comparison-subtitle {
            font-size: 14px;
          }

          .slc-mobile-plan-selector {
            display: block;
          }

          .slc-comparison-desktop-table {
            display: none;
          }

          .slc-comparison-mobile-cards {
            display: block;
          }

          .slc-mobile-category-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          }

          .slc-mobile-category-title {
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 2px solid #e2e8f0;
          }

          .slc-mobile-feature-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
            border-bottom: 1px solid #f1f5f9;
          }

          .slc-mobile-feature-item:last-child {
            border-bottom: none;
          }

          .slc-mobile-feature-name {
            font-size: 14px;
            color: #475569;
            font-weight: 500;
            flex: 1;
          }

          .slc-mobile-feature-value {
            font-size: 14px;
            font-weight: 600;
            color: #1e293b;
            text-align: right;
            margin-left: 16px;
          }

          .slc-comparison-footer {
            margin-top: 30px;
            padding-top: 20px;
          }

          .slc-footer-text {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .slc-comparison-title {
            font-size: 24px;
          }

          .slc-mobile-category-card {
            padding: 16px;
          }

          .slc-mobile-category-title {
            font-size: 16px;
          }

          .slc-mobile-feature-item {
            padding: 12px 0;
          }

          .slc-mobile-feature-name,
          .slc-mobile-feature-value {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default PlanComparison;
