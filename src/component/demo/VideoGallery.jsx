import { useState } from "react";
import { Clock, Play } from "lucide-react";
import { categories, videos } from "./demoConfig";

/* Video library with category filters */
const VideoGallery = ({ onPlay }) => {
  const [cat, setCat] = useState("all");

  // Only show categories that have videos
  const shownCats = categories.filter((c) => c.id === "all" || videos.some((v) => v.category === c.id));
  const list = cat === "all" ? videos : videos.filter((v) => v.category === cat);

  return (
    <section className='slw-demo-lib' id='videos'>
      <div className='slw-wrap'>
        <div className='slw-demo-lib__head'>
          <div>
            <span className='slw-eyebrow'>Video library</span>
            <h2 className='slw-h2'>Learn StoreLense in minutes.</h2>
            <p className='slw-lead'>Short videos on every part of the app, from signing up to your first sale.</p>
          </div>
          <div className='slw-demo-lib__filters' role='tablist'>
            {shownCats.map((c) => (
              <button key={c.id} type='button' role='tab' aria-selected={cat === c.id} className={cat === c.id ? "is-on" : ""} onClick={() => setCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className='slw-demo-lib__grid' key={cat}>
          {list.map((v, i) => (
            <button key={v.id} type='button' className='slw-demo-card' onClick={() => onPlay(v)} style={{ animationDelay: `${i * 50}ms` }}>
              <span className='slw-demo-card__thumb'>
                <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt='' loading='lazy' />
                <span className='slw-demo-card__play'>
                  <Play size={20} fill='currentColor' />
                </span>
                <span className='slw-demo-card__dur'>
                  <Clock size={12} /> {v.duration}
                </span>
              </span>
              <span className='slw-demo-card__body'>
                <small>{categories.find((c) => c.id === v.category)?.label}</small>
                <b>{v.title}</b>
                <span>{v.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
