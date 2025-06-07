import React from "react";

const FloatingStats = ({ isVisible, scrollY }) => {
  return (
    <>
      {/* Uptime Stat */}
      <div
        className={`absolute -top-4 -right-4 bg-gradient-to-r from-[#ffe400] to-[#ffd700] rounded-2xl p-4 shadow-xl transition-all duration-700 ${
          isVisible ? "animate-fade-in delay-1700" : "opacity-0 scale-75"
        }`}
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div className='text-center'>
          <div className='text-2xl font-bold text-[#1c1c1e]'>99.9%</div>
          <div className='text-xs text-[#1c1c1e]/80'>Uptime</div>
        </div>
      </div>

      {/* Support Stat */}
      <div
        className={`absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl transition-all duration-700 ${
          isVisible ? "animate-fade-in delay-1900" : "opacity-0 scale-75"
        }`}
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <div className='text-center'>
          <div className='text-2xl font-bold text-[#37b4c5]'>24/7</div>
          <div className='text-xs text-gray-600'>Support</div>
        </div>
      </div>
    </>
  );
};

export default FloatingStats;
