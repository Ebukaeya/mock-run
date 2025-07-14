import React from "react";
import { ArrowRight, Play, Star } from "lucide-react";

const DemoCTA = () => {
  return (
    <div className='demo-cta'>
      <div className='demo-cta__container'>
        <div className='demo-cta__content'>
          <div className='demo-cta__badge'>
            <Star className='demo-cta__badge-icon' />
            <span>Ready to Get Started?</span>
          </div>

          <h2 className='demo-cta__title'>Start Your Free Trial Today</h2>

          <p className='demo-cta__description'>
            Join over 10,000 companies already using our platform to streamline their operations and boost productivity. No credit card required.
          </p>

          <div className='demo-cta__buttons'>
            <button
              onClick={() => {
                window.location.href = "https://storelense.com/sign-up/"; // Redirect to sign-up page
              }}
              className='demo-cta__primary-btn'
            >
              Start Free Trial
              <ArrowRight className='demo-cta__btn-icon' />
            </button>
            <button className='demo-cta__secondary-btn'>
              <Play className='demo-cta__btn-icon' />
              Watch More Demos
            </button>
          </div>

          <div className='demo-cta__features'>
            <div className='demo-cta__feature'>✓ 7-day free trial</div>
            <div className='demo-cta__feature'>✓ No credit card required</div>
            <div className='demo-cta__feature'>✓ Full feature access</div>
            <div className='demo-cta__feature'>✓ 24/7 customer support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCTA;
