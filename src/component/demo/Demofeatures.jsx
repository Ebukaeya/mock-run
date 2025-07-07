import React from "react";

import { Shield, Bolt, Users, Activity, Clock, Globe, Train, Book, GraduationCap } from "lucide-react";

const WhyChooseSection = () => {
  return (
    <section id='why-choose-platform' className='why-choose-section'>
      <div className='why-choose-container'>
        <div className='why-choose-header'>
          <h2 className='why-choose-title'>Why Choose Our Platform?</h2>
          <p className='why-choose-subtitle'>Built for modern businesses that demand reliability, security, and performance</p>
        </div>

        <div className='why-choose-grid'>
          <div className='feature-card' id='enterprise-security-card'>
            <div className='feature-icon-wrapper' id='security-icon-wrapper'>
              <Shield className='feature-icon' id='security-icon' />
            </div>
            <h3 className='feature-title' id='security-title'>
              Inventory Security
            </h3>
            <p className='feature-description' id='security-description'>
              With storelense, each product history is tracked, thus mitigating Sales theft and inventory loss.
            </p>
          </div>

          <div className='feature-card' id='lightning-fast-card'>
            <div className='feature-icon-wrapper' id='lightning-icon-wrapper'>
              <Bolt className='feature-icon' id='lightning-icon' />
            </div>
            <h3 className='feature-title' id='lightning-title'>
              Lightning Fast
            </h3>
            <p className='feature-description' id='lightning-description'>
              Optimized performance with sub-second response times for all operations.
            </p>
          </div>

          <div className='feature-card' id='team-collaboration-card'>
            <div className='feature-icon-wrapper' id='collaboration-icon-wrapper'>
              <GraduationCap className='feature-icon' id='collaboration-icon' />
            </div>
            <h3 className='feature-title' id='collaboration-title'>
              Training
            </h3>
            <p className='feature-description' id='collaboration-description'>
              We provide training for your staff, on how to best use the software .
            </p>
          </div>

          <div className='feature-card' id='advanced-analytics-card'>
            <div className='feature-icon-wrapper' id='analytics-icon-wrapper'>
              <Activity className='feature-icon' id='analytics-icon' />
            </div>
            <h3 className='feature-title' id='analytics-title'>
              Advanced Analytics
            </h3>
            <p className='feature-description' id='analytics-description'>
              Comprehensive reporting and insights to make data-driven decisions.
            </p>
          </div>

          <div className='feature-card' id='support-24-7-card'>
            <div className='feature-icon-wrapper' id='support-icon-wrapper'>
              <Clock className='feature-icon' id='support-icon' />
            </div>
            <h3 className='feature-title' id='support-title'>
              Support
            </h3>
            <p className='feature-description' id='support-description'>
              Round-the-clock customer support with guaranteed response times during working hours.
            </p>
          </div>

          <div className='feature-card' id='global-scale-card'>
            <div className='feature-icon-wrapper' id='global-icon-wrapper'>
              <Globe className='feature-icon' id='global-icon' />
            </div>
            <h3 className='feature-title' id='global-title'>
              Global Scale
            </h3>
            <p className='feature-description' id='global-description'>
              Deployed across multiple regions for optimal performance worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
