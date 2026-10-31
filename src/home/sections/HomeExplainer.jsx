import { Check, Clock, Play } from "lucide-react";
import VideoStory from "../../hospitality/VideoStory.jsx";
import { explainer, screens } from "../homeConfig";
import "./HomeExplainer.css";

/* Explainer video. Plays the YouTube link from homeConfig; shows a placeholder until one is set. */
export default function HomeExplainer() {
  const { youtube, poster, title, length, points } = explainer;

  return (
    <section className='slw-explain' id='video'>
      <div className='slw-wrap slw-explain__grid'>
        <div className='slw-explain__player'>
          {youtube ? (
            <VideoStory youtube={youtube} poster={poster} title={title} caption={length} />
          ) : (
            <div className='slw-explain__soon' role='img' aria-label='Explainer video coming soon'>
              <img src={poster || screens.dashboard} alt='' loading='lazy' />
              <span className='slw-explain__shade' />
              <span className='slw-explain__play'>
                <Play size={30} fill='currentColor' />
              </span>
              <span className='slw-explain__badge'>Video coming soon</span>
            </div>
          )}
        </div>

        <div className='slw-explain__text'>
          <span className='slw-eyebrow'>Watch</span>
          <h2 className='slw-h2'>{title}</h2>
          <p className='slw-explain__len'>
            <Clock size={16} /> {length}
          </p>
          <ul>
            {points.map((p) => (
              <li key={p}>
                <span>
                  <Check size={15} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
