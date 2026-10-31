import { useRef, useState } from "react";
import { Play } from "lucide-react";
import "./VideoStory.css";

/* Turns a YouTube link (watch, youtu.be or shorts) into its video id */
function youtubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/*
 * A customer video: shows the poster with a play button, then plays in place.
 * Pass youtube (any YouTube link: watch, youtu.be, shorts or embed) or src (an
 * mp4 file). youtube wins when both are given.
 */
export default function VideoStory({ src, youtube, poster, title, caption, className = "" }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const ytId = youtubeId(youtube);

  if (!src && !ytId) return null;

  // With a YouTube link and no poster, use the video's own thumbnail
  const cover = poster || (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null);

  const play = () => {
    setPlaying(true);
    // the <video> mounts on the next render; start it once it's there
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (v) v.play().catch(() => {});
    });
  };

  return (
    <figure className={`slh-video ${playing ? "is-playing" : ""} ${className}`}>
      <div className='slh-video__frame'>
        {playing && ytId && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
            title={title || "Customer video"}
            allow='autoplay; encrypted-media; picture-in-picture'
            allowFullScreen
          />
        )}
        {playing && !ytId && <video ref={videoRef} src={src} poster={poster} controls playsInline />}

        {!playing && (
          <button
            type='button'
            className='slh-video__poster'
            onClick={play}
            aria-label={`Play video: ${title || "customer story"}`}
          >
            {cover && <img src={cover} alt='' loading='lazy' />}
            <span className='slh-video__shade' />
            <span className='slh-video__play'>
              <Play size={30} fill='currentColor' />
            </span>
            {(title || caption) && (
              <span className='slh-video__text'>
                {title && <b>{title}</b>}
                {caption && <small>{caption}</small>}
              </span>
            )}
          </button>
        )}
      </div>
    </figure>
  );
}
