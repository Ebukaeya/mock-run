import React from "react";
import { TrendingUp, Clock, FileText } from "lucide-react";
import "../styles/ProductHistorySection.css";

const ProductHistorySection = () => {
  return (
    <section className='product-history-section'>
      {/* Background Pattern */}
      <div className='background-pattern'>
        <div className='bg-circle bg-circle-1'></div>
        <div className='bg-circle bg-circle-2'></div>
      </div>

      <div className='container'>
        <div className='content-grid'>
          {/* Content Side */}
          <div className='content-side'>
            <div className='header headline sl-animate'>
              {/* <h2>
                Complete Product
                <span className='text-gradient'>History Tracking</span>
              </h2> */}
              <h1 style={{ textAlign: "center", lineHeight: "1.3" }}>
                <span style={{ marginBottom: "10px" }} className='text-dark'>
                  Advanced Product
                </span>
                <br />
                <span className='text-gradient'>History Tracking</span>
              </h1>
              <div className='underline'></div>
            </div>

            <p className='description sl-animate'>
              Monitor every product movement, sale, and transaction with our comprehensive tracking system. Get detailed insights into your inventory flow and
              identify any irregularities instantly.
            </p>

            {/* Feature Points */}
            <div className='features sl-animate'>
              <div className='feature-item'>
                <div style={{ margin: "0" }} className='icon-container1'>
                  <TrendingUp size={24} color='white' />
                </div>
                <div className='feature-content'>
                  <h3>Real-Time Analytics</h3>
                  <p>Track sales patterns and inventory movements as they happen</p>
                </div>
              </div>

              <div className='feature-item'>
                <div style={{ margin: "0" }} className='icon-container1'>
                  <Clock size={24} color='white' />
                </div>
                <div className='feature-content'>
                  <h3>Timeline History</h3>
                  <p>Complete chronological record of all product activities</p>
                </div>
              </div>

              <div className='feature-item'>
                <div style={{ margin: "0" }} className='icon-container1'>
                  <FileText size={24} color='white' />
                </div>
                <div className='feature-content'>
                  <h3>Detailed Reports</h3>
                  <p>Generate comprehensive reports for audit and compliance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className='image-side sl-animate'>
            <div className='dashboard-container'>
              <div className='dashboard-content'>
                <div className='dashboard-header'>
                  <h4>Product History Dashboard</h4>
                </div>

                <div className='chart-bars'>
                  <div className='chart-bar bar-1'></div>
                  <div className='chart-bar bar-2'></div>
                  <div className='chart-bar bar-3'></div>
                  <div className='chart-bar bar-4'></div>
                  <div className='chart-bar bar-5'></div>
                </div>

                <p className='chart-label'>Live Product Movement Analytics</p>
              </div>

              {/* Floating Stats Cards */}
              <div className='stat-card stat-card-1'>
                <div className='stat-value'>99.9%</div>
                <div className='stat-label'>Accuracy</div>
              </div>

              <div className='stat-card stat-card-2'>
                <div className='stat-value'>24/7</div>
                <div className='stat-label'>Monitoring</div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className='background-decoration'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHistorySection;
