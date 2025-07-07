import React from "react";
import { Star, Quote } from "lucide-react";

const DemoTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechFlow Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      content: "This platform transformed how we handle our workflows. The demo videos made onboarding incredibly smooth for our entire team.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager, StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      content: "The comprehensive video tutorials helped us implement advanced features we never knew existed. ROI was visible within the first month.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director, ScaleUp Co.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
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
