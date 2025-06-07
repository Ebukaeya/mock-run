import React, { useState, useEffect } from "react";
import "../../styles/Navbar.css";

export default function DiscountBanner({ endDate }) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = new Date(endDate) - now;
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const fmt = (n) => n.toString().padStart(2, "0");
    return `${fmt(days)}d ${fmt(hours)}h ${fmt(minutes)}m ${fmt(seconds)}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) return;
    const timerId = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      if (!tl) clearInterval(timerId);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, endDate]);

  return (
    <div className='dc-banner'>
      {timeLeft ? (
        <>
          🎉 <span className='dc-off'>50% OFF</span> ends in
          <span className='dc-countdown'>{timeLeft}</span>
        </>
      ) : (
        "🚨 50% OFF has ended!"
      )}
    </div>
  );
}
