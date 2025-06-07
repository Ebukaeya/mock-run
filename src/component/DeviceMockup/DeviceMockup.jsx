import React from "react";
import "./DeviceMockup.css";

const DeviceMockup = ({ isVisible, scrollY }) => {
  return (
    <div className={`device-mockup-container ${isVisible ? "visible" : "hidden"}`} style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
      {/* Responsive Image Placeholder - 1000x818px */}
      <div className='device-mockup-wrapper'>
        {/* Placeholder with responsive sizing */}
        <div className='device-mockup-placeholder'>
          {/* Placeholder Content */}
          <div className='device-mockup-content'>
            <div className='device-mockup-text'>
              <div className='device-mockup-icon'>
                <svg className='device-mockup-svg' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <div className='device-mockup-labels'>
                <p className='device-mockup-title'>Mockup Placeholder</p>
                <p className='device-mockup-dimensions'>1000 x 818 pixels</p>
                <p className='device-mockup-instruction'>Insert your mock image here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Glow Effect */}
        <div className='device-mockup-glow'></div>

        {/* Additional Ambient Light */}
        <div className='device-mockup-ambient'></div>
      </div>
    </div>
  );
};

export default DeviceMockup;
