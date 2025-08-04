import React, { useState } from "react";
import { Play, Star, Users, Zap, X, Maximize, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const DemoHero = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openVideoModal = () => {
    const video = {
      id: "1",
      title: "Getting Started - Complete Setup Guide",
      description: "Learn how to set up your account and configure your first project in under 5 minutes.",
      youtubeId: "LF2JI-w97YA",
      duration: "4:32",
      category: "getting-started",
      views: "15.2K",
    };
    setSelectedVideo(video);
    setIsFullscreen(false);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  const subject = "I would like a demo";
  const message = "Hi, Please can we arrange a demo for your product.";
  return (
    <>
      <nav className='sl-nav'>
        <div className='sl-nav-container'>
          <Link to='/' className='sl-nav-back'>
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Home</span>
          </Link>
          <img
            src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png'
            alt='StoreLense'
            className='sl-nav-logo'
          />
        </div>
      </nav>
      <div className='demo-hero'>
        <div className='demo-hero__container'>
          <div className='demo-hero__content'>
            <div className='demo-hero__badge'>
              <Star className='demo-hero__badge-icon' />
              <span>Featured Product Demo</span>
            </div>

            <h1 className='demo-hero__title'>
              See How Our Platform
              <span className='demo-hero__title-gradient'> Transforms </span>
              Your Business
            </h1>

            <p className='demo-hero__description'>
              Watch real customers demonstrate how our powerful SaaS solution streamlines operations, boosts productivity, and secures their store. Get inspired
              by their success stories.
            </p>

            <div className='demo-hero__stats'>
              <div className='demo-hero__stat'>
                <Users className='demo-hero__stat-icon' />
                <span className='demo-hero__stat-number'>1,000+</span>
                <span className='demo-hero__stat-label'>Active Users</span>
              </div>
              <div className='demo-hero__stat'>
                <Zap className='demo-hero__stat-icon' />
                <span className='demo-hero__stat-number'>99.9%</span>
                <span className='demo-hero__stat-label'>Uptime</span>
              </div>
            </div>

            <div className='demo-hero__cta'>
              <button
                onClick={() => {
                  window.location.href =
                    "https://storelense.com/contact" + "?subject=" + encodeURIComponent(subject) + "&message=" + encodeURIComponent(message); // Redirect to demo page
                }}
                className='demo-hero__primary-btn'
              >
                <Play className='demo-hero__btn-icon' />
                Contact us for a Demo
              </button>
              <button className='demo-hero__secondary-btn'>Start Free Trial</button>
            </div>
          </div>

          <div onClick={openVideoModal} className='demo-hero__visual'>
            <div className='demo-hero__video-preview'>
              <div
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/ebuka1122/image/upload/v1754337726/static%20images%20storelens/bdd4ae94-94a5-4983-9706-9699ea2c062f.png")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className='demo-hero__video-thumbnail'
              >
                <Play color='red' className='demo-hero__play-icon' />
              </div>
              <div className='demo-hero__video-info'>
                <span className='demo-hero__video-title'>StoreLense:- Your store inventory manager</span>
                <span className='demo-hero__video-duration'>1:41</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedVideo && (
        <div className={`video-modal ${isFullscreen ? "video-modal--fullscreen" : ""}`} onClick={closeVideoModal}>
          <div className='video-modal__content' onClick={(e) => e.stopPropagation()}>
            <div className='video-modal__controls'>
              <button className='video-modal__fullscreen' onClick={toggleFullscreen}>
                <Maximize className='video-modal__icon' />
              </button>
              <button className='video-modal__close' onClick={closeVideoModal}>
                <X className='video-modal__icon' />
              </button>
            </div>
            <div className='video-modal__player'>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                className='video-modal__iframe'
              ></iframe>
            </div>
            {!isFullscreen && (
              <div className='video-modal__info'>
                <h3 className='video-modal__title'>{selectedVideo.title}</h3>
                <p className='video-modal__description'>{selectedVideo.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DemoHero;
