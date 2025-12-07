import React, { useState, useEffect } from "react";
import { Activity, Users, Eye, Clock, MapPin, Monitor, TrendingUp, Filter, Search } from "lucide-react";

const EmployeeActivitySection = () => {
  const [animateRows, setAnimateRows] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setAnimateRows(true);

    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activityLogs = [
    {
      id: 1,
      user: "John Mike",
      action: "made a sales of amount kr4500",
      type: "SALESMADE",
      timestamp: "Nov 10, 06:23:15 AM",
      location: "Enugu, Enugu",
      device: "Windows",
    },
    {
      id: 2,
      user: "Adebayo Johnson",
      action: "extended loan due date for transaction 28082025",
      type: "SALESUPDATE",
      timestamp: "Nov 10, 06:27:35 AM",
      location: "Lagos, Nigeria",
      device: "Windows",
    },
    {
      id: 3,
      user: "Ifeanyi Okeke",
      action: "cleared a loan transaction 28082025",
      type: "SALESUPDATE",
      timestamp: "Nov 10, 06:27:20 AM",
      location: "Abuja, Nigeria",
      device: "Windows",
    },
    {
      id: 4,
      user: "Kemi Adesina",
      action: "logged in",
      type: "LOGIN",
      timestamp: "Nov 10, 06:17:27 AM",
      location: "lekki, Nigeria",
      device: "Android",
    },
    {
      id: 5,
      user: "Victor Ikpeazu",
      action: "processed return of material quantity 1",
      type: "SALESUPDATE",
      timestamp: "Nov 10, 06:22:37 AM",
      location: "Enugu, Nigeria",
      device: "Windows",
    },
    {
      id: 6,
      user: "Chioma Okafor",
      action: "updated product inventory for SKU-1234",
      type: "PRODUCTUPDATE",
      timestamp: "Nov 10, 05:45:12 AM",
      location: "Enugu, Nigeria",
      device: "iOS",
    },
  ];

  // Show only 3 logs on mobile
  const displayedLogs = isMobile ? activityLogs.slice(0, 3) : activityLogs;

  const getTypeColor = (type) => {
    switch (type) {
      case "SALESMADE":
        return "#a855f7";
      case "SALESUPDATE":
        return "#3b82f6";
      case "LOGIN":
        return "#10b981";
      case "PRODUCTUPDATE":
        return "#f59e0b";
      default:
        return "#64748b";
    }
  };

  return (
    <div className='slemp-wrapper'>
      <div className='slemp-container'>
        {/* Header */}
        <div className='slemp-header'>
          <div className='slemp-header-content'>
            <div className='slemp-badge'>
              <Activity size={18} />
              <span>Employee Monitoring</span>
            </div>
            <h2 className='slemp-title'>Track Every Action in Real-Time</h2>
            <p className='slemp-subtitle'>
              Monitor employee activities across all stores with complete visibility. Track sales, inventory updates, logins, and every business operation with
              detailed audit trails.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className='slemp-content'>
          {/* Stats Cards */}
          <div className='slemp-stats-grid'>
            <div className='slemp-stat-card slemp-stat-purple'>
              <div className='slemp-stat-icon'>
                <Activity size={24} />
              </div>
              <div className='slemp-stat-content'>
                <p className='slemp-stat-label'>Total Activities</p>
                <p className='slemp-stat-value'>1,247</p>
                <p className='slemp-stat-change'>+12% this week</p>
              </div>
            </div>

            <div className='slemp-stat-card slemp-stat-blue'>
              <div className='slemp-stat-icon'>
                <Users size={24} />
              </div>
              <div className='slemp-stat-content'>
                <p className='slemp-stat-label'>Active Employees</p>
                <p className='slemp-stat-value'>24</p>
                <p className='slemp-stat-change'>3 online now</p>
              </div>
            </div>

            <div className='slemp-stat-card slemp-stat-green'>
              <div className='slemp-stat-icon'>
                <TrendingUp size={24} />
              </div>
              <div className='slemp-stat-content'>
                <p className='slemp-stat-label'>Sales Today</p>
                <p className='slemp-stat-value'>₦156K</p>
                <p className='slemp-stat-change'>+8% vs yesterday</p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className='slemp-log-container'>
            <div className='slemp-log-header'>
              <div className='slemp-log-title'>
                <Activity size={20} />
                <span>Activity Log</span>
                <span className='slemp-log-count'>Showing 6 of 1,247 events</span>
              </div>
              <div className='slemp-log-actions'>
                <button className='slemp-filter-btn'>
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                <button className='slemp-filter-btn'>
                  <Search size={16} />
                  <span>Search</span>
                </button>
              </div>
            </div>

            <div className='slemp-log-table'>
              <div className='slemp-table-header'>
                <div className='slemp-th slemp-th-timestamp'>Timestamp</div>
                <div className='slemp-th slemp-th-type'>Type</div>
                <div className='slemp-th slemp-th-description'>Event Description</div>
                <div className='slemp-th slemp-th-location'>Location</div>
                <div className='slemp-th slemp-th-device'>Device</div>
              </div>

              <div className='slemp-table-body'>
                {displayedLogs.map((log, index) => (
                  <div key={log.id} className={`slemp-table-row ${animateRows ? "slemp-row-animate" : ""}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className='slemp-td slemp-td-timestamp'>
                      <Clock size={14} className='slemp-clock-icon' />
                      <div>
                        <p className='slemp-date'>{log.timestamp.split(",")[0]}</p>
                        <p className='slemp-time'>{log.timestamp.split(",")[1]}</p>
                      </div>
                    </div>
                    <div className='slemp-td slemp-td-type'>
                      <span className='slemp-type-badge' style={{ background: getTypeColor(log.type) }}>
                        {log.type}
                      </span>
                    </div>
                    <div className='slemp-td slemp-td-description'>
                      <p className='slemp-user-name'>{log.user}</p>
                      <p className='slemp-action-text'>{log.action}</p>
                    </div>
                    <div className='slemp-td slemp-td-location'>
                      <MapPin size={14} className='slemp-location-icon' />
                      <span>{log.location}</span>
                    </div>
                    <div className='slemp-td slemp-td-device'>
                      <Monitor size={14} className='slemp-device-icon' />
                      <span>{log.device}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className='slemp-features-grid'>
            <div className='slemp-feature-item'>
              <Eye size={24} />
              <h4>Real-time Monitoring</h4>
              <p>Track every action as it happens across all your stores with instant notifications</p>
            </div>
            <div className='slemp-feature-item'>
              <Clock size={24} />
              <h4>Complete History</h4>
              <p>Access full audit trails with detailed timestamps, locations, and device information</p>
            </div>
            <div className='slemp-feature-item'>
              <Filter size={24} />
              <h4>Advanced Filtering</h4>
              <p>Filter by employee, action type, date range, store location, and more</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slemp-wrapper {
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #050505 100%);
          padding: 50px 20px;
          position: relative;
          overflow: hidden;
        }

        .slemp-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        .slemp-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .slemp-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .slemp-header-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .slemp-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        }

        .slemp-title {
          font-size: 56px;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 0%, #64748b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          letter-spacing: -2px;
        }

        .slemp-subtitle {
          font-size: 18px;
          color: #71717a;
          line-height: 1.7;
        }

        .slemp-content {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
        }

        .slemp-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .slemp-stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: all 0.3s ease;
        }

        .slemp-stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .slemp-stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slemp-stat-purple .slemp-stat-icon {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
          box-shadow: 0 8px 24px rgba(168, 85, 247, 0.3);
        }

        .slemp-stat-blue .slemp-stat-icon {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .slemp-stat-green .slemp-stat-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
        }

        .slemp-stat-content {
          flex: 1;
        }

        .slemp-stat-label {
          font-size: 14px;
          color: #71717a;
          margin-bottom: 8px;
        }

        .slemp-stat-value {
          font-size: 32px;
          font-weight: 900;
          color: white;
          margin-bottom: 4px;
          letter-spacing: -1px;
        }

        .slemp-stat-change {
          font-size: 13px;
          color: #10b981;
          font-weight: 600;
        }

        .slemp-log-container {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .slemp-log-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .slemp-log-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 700;
          color: white;
        }

        .slemp-log-count {
          font-size: 13px;
          color: #71717a;
          font-weight: 500;
        }

        .slemp-log-actions {
          display: flex;
          gap: 12px;
        }

        .slemp-filter-btn {
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

        .slemp-filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .slemp-log-table {
          overflow-x: auto;
        }

        .slemp-table-header {
          display: grid;
          grid-template-columns: 180px 140px 1fr 200px 120px;
          gap: 16px;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .slemp-th {
          font-size: 12px;
          font-weight: 700;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .slemp-table-body {
          /* Removed max-height and overflow-y to prevent scrolling */
        }

        .slemp-table-row {
          display: grid;
          grid-template-columns: 180px 140px 1fr 200px 120px;
          gap: 16px;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
          opacity: 0;
        }

        .slemp-row-animate {
          animation: slemp-fade-in 0.5s ease-out forwards;
        }

        @keyframes slemp-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slemp-table-row:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .slemp-td {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #d4d4d8;
        }

        .slemp-td-timestamp {
          flex-direction: column;
          align-items: flex-start;
        }

        .slemp-clock-icon {
          color: #52525b;
        }

        .slemp-date {
          font-size: 13px;
          font-weight: 600;
          color: white;
          margin: 0;
        }

        .slemp-time {
          font-size: 12px;
          color: #52525b;
          margin: 0;
        }

        .slemp-type-badge {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slemp-td-description {
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }

        .slemp-user-name {
          font-size: 14px;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .slemp-action-text {
          font-size: 13px;
          color: #71717a;
          margin: 0;
        }

        .slemp-location-icon,
        .slemp-device-icon {
          color: #52525b;
          flex-shrink: 0;
        }

        .slemp-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .slemp-feature-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .slemp-feature-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
        }

        .slemp-feature-item svg {
          color: #3b82f6;
          margin-bottom: 12px;
        }

        .slemp-feature-item h4 {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px 0;
        }

        .slemp-feature-item p {
          font-size: 14px;
          color: #71717a;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .slemp-title {
            font-size: 44px;
          }

          .slemp-content {
            padding: 30px;
          }

          .slemp-table-header {
            display: none;
          }

          .slemp-table-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 12px 16px;
          }

          .slemp-th,
          .slemp-td {
            padding: 0;
          }

          .slemp-td {
            font-size: 12px;
          }

          .slemp-log-container {
            max-height: 60vh;
            overflow: hidden;
          }

          .slemp-log-table {
            /* No max-height or overflow */
          }

          .slemp-table-body {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .slemp-table-row {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            padding: 10px 14px;
            min-height: auto;
          }

          .slemp-td-timestamp,
          .slemp-td-type,
          .slemp-td-description,
          .slemp-td-location,
          .slemp-td-device {
            padding: 4px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .slemp-td-device {
            border-bottom: none;
          }

          .slemp-date {
            font-size: 11px;
          }

          .slemp-time {
            font-size: 10px;
          }

          .slemp-user-name {
            font-size: 12px;
          }

          .slemp-action-text {
            font-size: 11px;
            line-height: 1.4;
          }

          .slemp-type-badge {
            font-size: 9px;
            padding: 4px 10px;
          }
        }

        @media (max-width: 768px) {
          .slemp-wrapper {
            padding: 60px 16px;
          }

          .slemp-title {
            font-size: 36px;
          }

          .slemp-subtitle {
            font-size: 16px;
          }

          .slemp-content {
            padding: 24px 16px;
          }

          .slemp-log-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .slemp-log-actions {
            width: 100%;
            justify-content: space-between;
          }

          .slemp-table-body {
            gap: 8px;
          }

          .slemp-table-row {
            padding: 8px 12px;
            border-radius: 6px;
          }

          .slemp-td {
            font-size: 11px;
          }

          .slemp-td-timestamp,
          .slemp-td-type,
          .slemp-td-description,
          .slemp-td-location,
          .slemp-td-device {
            padding: 3px 0;
          }

          .slemp-date {
            font-size: 10px;
          }

          .slemp-time {
            font-size: 9px;
          }

          .slemp-user-name {
            font-size: 11px;
          }

          .slemp-action-text {
            font-size: 10px;
            line-height: 1.3;
          }

          .slemp-type-badge {
            font-size: 8px;
            padding: 3px 8px;
          }

          .slemp-clock-icon,
          .slemp-location-icon,
          .slemp-device-icon {
            width: 12px;
            height: 12px;
          }
        }

        @media (max-width: 480px) {
          .slemp-title {
            font-size: 28px;
            letter-spacing: -1px;
          }

          .slemp-stats-grid {
            grid-template-columns: 1fr;
          }

          .slemp-features-grid {
            grid-template-columns: 1fr;
          }

          .slemp-table-body {
            gap: 6px;
          }

          .slemp-table-row {
            padding: 8px 10px;
            gap: 6px;
          }

          .slemp-td-timestamp,
          .slemp-td-type,
          .slemp-td-description,
          .slemp-td-location,
          .slemp-td-device {
            padding: 3px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeActivitySection;
