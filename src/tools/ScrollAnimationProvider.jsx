// ScrollAnimationsProvider.jsx
import React, { useRef, useEffect } from "react";

function ScrollAnimationsProvider() {
  const observerRef = useRef(null);

  useEffect(() => {
    // create the observer once on mount
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sl-fade-in");
            // if you only want it once, uncomment next line:
            // observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // watch every element with .sl-animate
    document.querySelectorAll(".sl-animate").forEach((el) => observerRef.current.observe(el));

    return () => {
      // cleanup on unmount
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // this component doesn't render any DOM
  return null;
}

export default ScrollAnimationsProvider;
