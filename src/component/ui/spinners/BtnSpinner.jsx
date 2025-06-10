// Spinner.jsx
import React, { useRef, useEffect } from "react";

/**
 * A lightweight canvas-based spinner.
 *
 * Props:
 *  - size         number   diameter in px (default: 16)
 *  - strokeWidth  number   thickness of the arc (default: 2)
 *  - color        string   CSS color of the arc (default: 'currentColor')
 *  - speed        number   animation speed multiplier (default: 1)
 *  - style        object   additional inline styles
 */
export default function BtnSpinner({ size = 16, strokeWidth = 2, color = "currentColor", speed = 1, style = {} }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let angle = 0;
    const radius = (size - strokeWidth) / 2;

    function draw() {
      ctx.clearRect(0, 0, size, size);
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, radius, angle, angle + 1.5 * Math.PI);
      ctx.stroke();
      angle += 0.1 * speed;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, strokeWidth, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
    />
  );
}
