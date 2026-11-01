import { Activity, Clock, Globe, GraduationCap, Shield, Zap } from "lucide-react";

const REASONS = [
  {
    icon: Shield,
    title: "Inventory security",
    text: "Every product's history is tracked, which cuts sales theft and inventory loss.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    text: "Optimised for quick responses, so the counter never waits.",
  },
  {
    icon: GraduationCap,
    title: "Training",
    text: "We train your staff on how to get the best out of the software.",
  },
  {
    icon: Activity,
    title: "Advanced analytics",
    text: "Clear reports and insights to make data-driven decisions.",
  },
  {
    icon: Clock,
    title: "Support",
    text: "Round-the-clock support, with guaranteed response times during working hours.",
  },
  {
    icon: Globe,
    title: "Global scale",
    text: "Deployed across multiple regions for good performance wherever you are.",
  },
];

/* Why StoreLense */
const WhyChooseSection = () => {
  return (
    <section className='slw-demo-why' id='why-storelense'>
      <div className='slw-wrap'>
        <div className='slw-demo-why__head'>
          <span className='slw-eyebrow'>Why StoreLense</span>
          <h2 className='slw-h2'>Built for stores that can't afford to stop.</h2>
          <p className='slw-lead'>Reliable, secure and fast, with people on hand to help.</p>
        </div>
        <div className='slw-demo-why__grid'>
          {REASONS.map(({ icon: Icon, title, text }) => (
            <article key={title} className='slw-demo-why__card'>
              <span>
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
