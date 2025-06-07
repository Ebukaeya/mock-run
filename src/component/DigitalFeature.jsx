import React from "react";

const DigitalFeature = ({ icon: Icon, title, description, delay, isVisible }) => {
  return (
    <div
      className={`flex items-start space-x-4 group hover:translate-x-2 transition-all duration-500 ${
        isVisible ? `animate-fade-in ${delay}` : "opacity-0 translate-y-5"
      }`}
    >
      <div className='w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ffe400] group-hover:scale-110 transition-all duration-300 border border-white/20'>
        <Icon className='w-7 h-7 text-white group-hover:text-[#1c1c1e]' />
      </div>
      <div>
        <h3 className='text-xl font-semibold mb-2 text-white'>{title}</h3>
        <p className='text-blue-100 leading-relaxed'>{description}</p>
      </div>
    </div>
  );
};

export default DigitalFeature;
