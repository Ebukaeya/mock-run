import { Quote, Star } from "lucide-react";
import { testimonials } from "./demoConfig";

/* What our customers say */
const DemoTestimonials = () => {
  return (
    <section className='slw-demo-say'>
      <div className='slw-wrap'>
        <div className='slw-demo-say__head'>
          <span className='slw-eyebrow'>Customers</span>
          <h2 className='slw-h2'>What store owners say.</h2>
        </div>
        <div className='slw-demo-say__grid'>
          {testimonials.map((t) => (
            <figure key={t.name} className='slw-demo-say__card'>
              <span className='slw-demo-say__q'>
                <Quote size={18} />
              </span>
              <span className='slw-demo-say__stars' aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill='currentColor' />
                ))}
              </span>
              <blockquote>{t.content}</blockquote>
              <figcaption>
                <img src={t.avatar} alt='' loading='lazy' />
                <span>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoTestimonials;
