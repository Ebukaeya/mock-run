import React from "react";
import { Star, Quote } from "lucide-react";

const DemoTestimonials = () => {
  const testimonials = [
    {
      name: "Mrs Eucharia",
      role: "Manager Chy CHy Global Co.",
      avatar: "https://res.cloudinary.com/ebuka1122/image/upload/v1752509951/Ihub/6f4bf1a3-6545-44cb-b758-794607088adb_qfeya9.png",
      content: "This platform transformed how we handle our workflows. The demo videos made onboarding incredibly smooth for our entire team.",
      rating: 5,
    },
    {
      name: "Michael",
      role: "Shop Owner, Alaba Int. Mrk",
      avatar: "https://res.cloudinary.com/ebuka1122/image/upload/v1752510159/Ihub/bae19d07-d35c-486b-a42a-666a12de6eab_v17ckw.png",
      content: "The comprehensive video tutorials helped us implement advanced features we never knew existed. ROI was visible within the first month.",
      rating: 5,
    },
    {
      name: "Abiola Adeyemi",
      role: "Sales Manager, Tech Solutions Ltd.",
      avatar: "https://res.cloudinary.com/ebuka1122/image/upload/v1752510400/Ihub/25aab000-43c4-40de-adb3-0903bf813323_gtetee.png",
      content:
        "Outstanding platform with excellent documentation. The demo videos are professionally made and incredibly helpful for training new team members.",
      rating: 5,
    },
  ];

  return (
    <div className='demo-testimonials'>
      <div className='demo-testimonials__container'>
        <div className='demo-testimonials__header'>
          <h2 className='demo-testimonials__title'>What Our Customers Say</h2>
          <p className='demo-testimonials__subtitle'>Join thousands of satisfied customers who have transformed their business with our platform</p>
        </div>

        <div className='demo-testimonials__grid'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='testimonial-card'>
              <div className='testimonial-card__quote-icon'>
                <Quote />
              </div>

              <div className='testimonial-card__rating'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className='testimonial-card__star' />
                ))}
              </div>

              <p className='testimonial-card__content'>{testimonial.content}</p>

              <div className='testimonial-card__author'>
                <img src={testimonial.avatar} alt={testimonial.name} className='testimonial-card__avatar' />
                <div className='testimonial-card__author-info'>
                  <h4 className='testimonial-card__name'>{testimonial.name}</h4>
                  <p className='testimonial-card__role'>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoTestimonials;
