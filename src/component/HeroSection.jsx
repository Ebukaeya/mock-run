import React from "react";
import { Shield, Eye, Lock } from "lucide-react";
import "../styles/heroSection.css";

const HeroSection = () => {
  return (
    <section className='hero-section'>
      {/* Background Pattern */}
      <div className='background-pattern'>
        <div className='bg-circle bg-circle-1'></div>
        <div className='bg-circle bg-circle-2'></div>
        <div className='bg-circle bg-circle-3'></div>
      </div>

      <div className='container'>
        <div className='content'>
          {/* Main Headline */}
          <div className='headline sl-animate'>
            <h1>
              <span className='text-dark'>The Game is Over for</span>
              <br />
              <span className='text-gradient'>Sales Theft</span>
            </h1>
            <div className='underline'></div>
          </div>

          {/* Subtitle */}
          <p style={{ marginBottom: "40px" }} className='subtitle sl-animate'>
            When sales personnel steal products without the owner knowing
          </p>

          {/* Feature Cards */}
          <div className='feature-cards sl-animate'>
            <div className='feature-card'>
              <div className='icon-container1'>
                <Eye size={32} color='white' />
              </div>
              <h3>Real-Time Monitoring</h3>
              <p>Track every transaction and inventory movement in real-time</p>
            </div>

            <div className='feature-card'>
              <div className='icon-container1'>
                <Shield size={32} color='white' />
              </div>
              <h3>Theft Prevention</h3>
              <p>Advanced security features to prevent unauthorized sales</p>
            </div>

            <div className='feature-card'>
              <div className='icon-container1'>
                <Lock size={32} color='white' />
              </div>
              <h3>Secure Access</h3>
              <p>Role-based permissions and audit trails for complete control</p>
            </div>
          </div>

          {/* CTA Button */}
          {/* <div className='cta-container'>
            <button className='cta-button'>Secure Your Business Now</button>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='scroll-indicator'>
        <div className='scroll-mouse'>
          <div className='scroll-dot'></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
