import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./MediaViewerOverlay.css";

function getMediaType(url = "") {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url) ? "video" : "image";
}

/**
 * MediaViewerOverlay
 *
 * True fullscreen photo/video viewer. Opened when a photo or video in the
 * product detail carousel is tapped. Supports swipe, arrow keys, and arrow
 * buttons to move between media.
 *
 * Props:
 * - media: array of URLs (images and/or videos)
 * - startIndex: number
 * - onClose: () => void
 */
export default function MediaViewerOverlay({ media, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(media.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [media.length, onClose]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) setIndex((i) => Math.min(media.length - 1, i + 1));
      if (delta > 0) setIndex((i) => Math.max(0, i - 1));
    }
    touchStartX.current = null;
  };

  const current = media[index];
  const type = getMediaType(current);

  return createPortal(
    <div className="mvo-overlay" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button className="mvo-close" onClick={onClose} aria-label="Close fullscreen view">
        <X size={22} />
      </button>

      {index > 0 && (
        <button className="mvo-nav mvo-nav--prev" onClick={() => setIndex((i) => i - 1)} aria-label="Previous">
          <ChevronLeft size={26} />
        </button>
      )}
      {index < media.length - 1 && (
        <button className="mvo-nav mvo-nav--next" onClick={() => setIndex((i) => i + 1)} aria-label="Next">
          <ChevronRight size={26} />
        </button>
      )}

      <div className="mvo-stage">
        {type === "video" ? (
          <video src={current} controls autoPlay playsInline />
        ) : (
          <img src={current} alt="" />
        )}
      </div>

      {media.length > 1 && (
        <div className="mvo-counter">
          {index + 1} / {media.length}
        </div>
      )}
    </div>,
    document.body
  );
}
