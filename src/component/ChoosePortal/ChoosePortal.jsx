import React from "react";
import { useNavigate } from "react-router-dom";

const PortalSelection = () => {
  const handlePortalClick = (portalType) => {
    if (portalType === "admin") {
      window.location.href = "https://www.app.storelense.com";
    } else if (portalType === "staff") {
      window.location.href = "https://www.staff.storelense.com";
    }
  };
  const navigate = useNavigate();

  return (
    <div style={styles.portalSelectionContainer}>
      {/* Header */}
      <header style={styles.portalHeader}>
        <div style={styles.portalLogoSection}>
          {/*  <div style={styles.portalLogoCircle}>
            <div style={styles.portalLogoInner}></div>
          </div> */}
          <img style={styles.portalLogoCircle} src='https://res.cloudinary.com/ebuka1122/image/upload/v1752244790/StorelenseLogos/StorelenseLogo_tqya01.webp' />
          <span onClick={() => navigate("/")} style={styles.portalLogoText}>
            Store<span style={styles.portalLogoAccent}>Lense</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.portalMainContent}>
        <div style={styles.portalContentWrapper}>
          <div style={styles.portalTitleSection}>
            <h1 style={styles.portalMainTitle}>Choose Your Portal</h1>
            <p style={styles.portalSubtitle}>Select the portal you want to access</p>
          </div>

          <div style={styles.portalCardsContainer}>
            {/* Admin Portal Card */}
            <div
              style={{ ...styles.portalCard, ...styles.portalCardAdmin }}
              onClick={() => handlePortalClick("admin")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(66, 116, 241, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div style={{ ...styles.portalCardIconWrapper, backgroundColor: "rgba(66, 116, 241, 0.15)" }}>
                <svg style={styles.portalCardIcon} viewBox='0 0 24 24' fill='none' stroke='#4274f1'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <h2 style={styles.portalCardTitle}>Admin Portal</h2>
              <p style={styles.portalCardDescription}>Full system access with advanced management capabilities</p>
              <div style={{ ...styles.portalCardButton, background: "#4274f1" }}>
                <span>Access Portal</span>
                <svg style={styles.portalCardArrow} viewBox='0 0 24 24' fill='none' stroke='white'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                </svg>
              </div>
            </div>

            {/* Staff Portal Card */}
            <div
              style={{ ...styles.portalCard, ...styles.portalCardStaff }}
              onClick={() => handlePortalClick("staff")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(90, 185, 180, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div style={{ ...styles.portalCardIconWrapper, backgroundColor: "rgba(90, 185, 180, 0.15)" }}>
                <svg style={styles.portalCardIcon} viewBox='0 0 24 24' fill='none' stroke='#5ab9b4'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h2 style={styles.portalCardTitle}>Staff Portal</h2>
              <p style={styles.portalCardDescription}>Essential tools for daily store operations and management</p>
              <div style={{ ...styles.portalCardButton, background: "#5ab9b4" }}>
                <span>Access Portal</span>
                <svg style={styles.portalCardArrow} viewBox='0 0 24 24' fill='none' stroke='white'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                </svg>
              </div>
            </div>
          </div>

          <div style={styles.portalBackLink}>
            <button
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(90, 137, 185, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => navigate("/")}
              style={styles.portalBackButton}
            >
              <svg style={styles.portalBackArrow} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 17l-5-5m0 0l5-5m-5 5h12' />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  portalSelectionContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)",
  },
  portalHeader: {
    padding: "1.5rem 2rem",
    background: "rgba(26, 31, 46, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  portalLogoSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    maxWidth: "1400px",
    margin: "0 auto",
    cursor: "pointer",
  },
  portalLogoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    /* background: "linear-gradient(135deg,rgba(59, 155, 174, 0.14) 0%,rgba(45, 123, 140, 0.12) 100%)", */
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(59, 155, 174, 0.01)",
  },
  portalLogoInner: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2.5px solid white",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: "rotate(-45deg)",
  },
  portalLogoText: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#e8eef5",
  },
  portalLogoAccent: {
    color: "#3b9aae",
  },
  portalMainContent: {
    padding: "3rem 2rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  portalContentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
  },
  portalTitleSection: {
    textAlign: "center",
  },
  portalMainTitle: {
    fontSize: "clamp(1.9rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#e8eef5",
    marginBottom: "1rem",
    letterSpacing: "-0.5px",
  },
  portalSubtitle: {
    fontSize: "1.1rem",
    color: "#9ca3af",
    fontWeight: "400",
  },
  portalCardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    maxWidth: "700px",
    margin: "0 auto",
    width: "100%",
  },
  portalCard: {
    background: "rgba(30, 35, 48, 0.8)",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  portalCardAdmin: {},
  portalCardStaff: {},
  portalCardIconWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.25rem",
    transition: "all 0.4s ease",
  },
  portalCardIcon: {
    width: "32px",
    height: "32px",
  },
  portalCardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#e8eef5",
    marginBottom: "0.75rem",
  },
  portalCardDescription: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  portalCardButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.875rem 1.25rem",
    color: "white",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
  },
  portalCardArrow: {
    width: "18px",
    height: "18px",
    transition: "transform 0.3s ease",
  },
  portalBackLink: {
    textAlign: "center",
  },
  portalBackButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    padding: "0.75rem 1.5rem",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    background: "rgba(30, 35, 48, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  /* portalBackButton: {
    transform: "translateY(-2px)",
    background: "rgba(30, 35, 48, 0.8)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
  }, */
  portalBackArrow: {
    width: "18px",
    height: "18px",
  },
};

export default PortalSelection;
