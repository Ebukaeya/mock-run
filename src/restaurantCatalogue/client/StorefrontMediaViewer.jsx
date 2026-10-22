import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import "./storefrontMediaViewer.css";

/*
  A dish's photos and videos, full screen.
  media: [{ type: "image" | "video", url }]  · start: which one to open on

  Arrows, swipe (phones), the thumbnails or the keyboard (← → Esc) move
  between them. A video plays with its controls and stops when you move on.
*/
export default function StorefrontMediaViewer({ title, media = [], start = 0, onClose }) {
  const [index, setIndex] = useState(Math.min(Math.max(0, start), Math.max(0, media.length - 1)));
  const touch = useRef(null);
  const stripRef = useRef(null);
  const count = media.length;
  const current = media[index];

  const go = (step) => setIndex((i) => (i + step + count) % count);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /* Captured first and stopped, so Esc closes only the viewer, not the panel under it */
    const onKey = (e) => {
      if (!["Escape", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
      e.stopPropagation();
      if (e.key === "Escape") onClose?.();
      else if (e.key === "ArrowRight" && count > 1) go(1);
      else if (e.key === "ArrowLeft" && count > 1) go(-1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, onClose]);

  /* Keep the chosen thumbnail in view */
  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView?.({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touch.current || count < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose?.(); // swipe down closes
  };

  if (!current) return null;

  return (
    <div className='slhShopView' role='dialog' aria-modal='true' aria-label={`${title}: photos and videos`}>
      <header className='slhShopView__top'>
        <div className='slhShopView__title'>
          <b>{title}</b>
          {count > 1 && (
            <span>
              {index + 1} / {count}
            </span>
          )}
        </div>
        <button type='button' className='slhShopView__btn' onClick={onClose} aria-label='Close'>
          <X size={20} />
        </button>
      </header>

      <div className='slhShopView__stage' onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
        {current.type === "video" ? (
          <video key={current.url} className='slhShopView__media' src={current.url} controls autoPlay playsInline preload='metadata' />
        ) : (
          <img key={current.url} className='slhShopView__media' src={current.url} alt={`${title}, photo ${index + 1}`} draggable='false' />
        )}

        {count > 1 && (
          <>
            <button type='button' className='slhShopView__btn slhShopView__nav slhShopView__nav--prev' onClick={() => go(-1)} aria-label='Previous'>
              <ChevronLeft size={24} />
            </button>
            <button type='button' className='slhShopView__btn slhShopView__nav slhShopView__nav--next' onClick={() => go(1)} aria-label='Next'>
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className='slhShopView__strip' ref={stripRef}>
          {media.map((m, i) => (
            <button
              key={`${m.url}-${i}`}
              type='button'
              className={`slhShopView__thumb${i === index ? " slhShopView__thumb--on" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`${m.type === "video" ? "Video" : "Photo"} ${i + 1}`}
              aria-current={i === index || undefined}
            >
              {m.type === "video" ? (
                <>
                  <video src={`${m.url}#t=0.1`} muted playsInline preload='metadata' />
                  <span className='slhShopView__play'>
                    <Play size={14} fill='currentColor' />
                  </span>
                </>
              ) : (
                <img src={m.url} alt='' loading='lazy' />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
