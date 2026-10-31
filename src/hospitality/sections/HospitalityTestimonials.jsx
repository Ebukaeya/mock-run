import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import VideoStory from "../VideoStory";
import { featuredVideo, testimonials } from "../hospitalityConfig";
import "./HospitalityTestimonials.css";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Stars({ n = 5 }) {
  return (
    <span className='slh-testi__stars' aria-label={`Rated ${n} out of 5`}>
      {"★".repeat(n)}
      <i>{"★".repeat(5 - n)}</i>
    </span>
  );
}

/*
 * Customer stories: a featured video and a quote slider.
 * Quotes with sample: true show an "Example" label until you replace them.
 */
export default function HospitalityTestimonials() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false); // stop rotating once someone interacts (e.g. plays a video)
  const count = testimonials.length;

  useEffect(() => {
    if (count < 2 || hold) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % count), 9000);
    return () => clearInterval(t);
  }, [count, hold]);

  const t = testimonials[i];
  const go = (d) => setI((x) => (x + d + count) % count);

  // A story with its own YouTube video plays that; otherwise the featured video
  const ownVideo = t && t.youtube;
  const video = ownVideo
    ? { youtube: t.youtube, poster: t.poster || null, title: `${t.name}, ${t.venue}`, caption: t.type }
    : featuredVideo;

  return (
    <section className='slh-testi' id='slh-stories'>
      <div className='slh-wrap'>
        <div className='slh-testi__top'>
          <div>
            <span className='slh-eyebrow slh-testi__eyebrow'>Customer stories</span>
            <h2 className='slh-testi__title'>Venues run better on StoreLense.</h2>
          </div>
          {count > 1 && (
            <div className='slh-testi__nav'>
              <span>
                {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type='button'
                onClick={() => {
                  setHold(true);
                  go(-1);
                }}
                aria-label='Previous story'
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type='button'
                onClick={() => {
                  setHold(true);
                  go(1);
                }}
                aria-label='Next story'
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div className='slh-testi__grid' onClickCapture={() => setHold(true)}>
          <VideoStory
            key={video.youtube || "featured"}
            className='slh-testi__video'
            src={video.src}
            youtube={video.youtube}
            poster={video.poster}
            title={video.title}
            caption={video.caption}
          />

          {t && (
            <figure className='slh-testi__card' key={i}>
              <div className='slh-testi__meta'>
                <Stars n={t.rating || 5} />
                {t.sample && <span className='slh-testi__sample'>Example</span>}
              </div>
              <blockquote className='slh-testi__quote'>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className='slh-testi__who'>
                {t.photo ? <img src={t.photo} alt='' /> : <span className='slh-testi__avatar'>{initials(t.name)}</span>}
                <span>
                  <b>{t.name}</b>
                  {t.role}, {t.venue}
                </span>
                {t.logo && <img className='slh-testi__logo' src={t.logo} alt='' />}
              </figcaption>
              {count > 1 && (
                <div className='slh-testi__dots'>
                  {testimonials.map((x, n) => (
                    <button
                      key={n}
                      type='button'
                      className={n === i ? "is-on" : ""}
                      onClick={() => setI(n)}
                      aria-label={`Story ${n + 1}`}
                    />
                  ))}
                </div>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
