import { useEffect } from "react";
import { X } from "lucide-react";

/* Plays a YouTube video in a pop-up. Closes with the X, the Esc key or a click outside. */
export default function DemoVideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div className='slw-demo-modal' role='dialog' aria-modal='true' aria-label={video.title} onClick={onClose}>
      <div className='slw-demo-modal__box' onClick={(e) => e.stopPropagation()}>
        <button type='button' className='slw-demo-modal__close' onClick={onClose} aria-label='Close video'>
          <X size={20} />
        </button>
        <div className='slw-demo-modal__player'>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
            allowFullScreen
          />
        </div>
        <div className='slw-demo-modal__info'>
          <b>{video.title}</b>
          {video.description && <p>{video.description}</p>}
        </div>
      </div>
    </div>
  );
}
