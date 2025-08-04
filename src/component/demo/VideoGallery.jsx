import React, { useState } from "react";
import { Play, Clock, Eye, X, Maximize } from "lucide-react";

/* interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  category: string;
  views: string;
  thumbnail?: string;
} */

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const demoVideos = [
    {
      id: "1",
      title: "Getting Started - How to sign up",
      description: "Learn how to set up your account and configure your first project in under 5 minutes.",
      youtubeId: "MkI9ssmnR5g",
      duration: "0:53",
      category: "getting-started",
      views: "15.2K",
    },
    {
      id: "10",
      title: "How to create a store on StoreLense",
      description: "Learn how to create and manage your store effectively using StoreLense's intuitive interface.",
      youtubeId: "XHoRR66OXDI",
      duration: "1:12",
      category: "getting-started",
      views: "15.2K",
    },
    {
      id: "11",
      title: "How to choose a user plan",
      description: "Understand the different user plans available and how to select the best one for your needs.",
      youtubeId: "WzvC2267Fjw",
      duration: "1:12",
      category: "getting-started",
      views: "1.2K",
    },
    {
      id: "2",
      title: "How to sell a product on StoreLense",
      description: "Discover the key features that make StoreLense the best platform for stores POS.",
      youtubeId: "K1tU-8UtPPc",
      duration: "1:23",
      category: "features",
      views: "8.7K",
    },
    {
      id: "3",
      title: "How to register a part payment on StoreLense",
      description: "Learn how to manage part payments and track customer balances effectively.",
      youtubeId: "bwWqxkKHCG0",
      duration: "1:45",
      category: "features",
      views: "12.1K",
    },
    {
      id: "12",
      title: "How to manage your product inventory",
      description: "Learn how to efficiently manage your product inventory and keep track of stock levels.",

      youtubeId: "C-1sbWtm-R4",
      duration: "1:45",
      category: "features",
      views: "14.1K",
    },
    {
      id: "4",
      title: "Navigating StoreLense Admin - A Guide",
      description: "Explore the StoreLense admin dashboard and learn how to navigate its features for efficient store management.",
      youtubeId: "yt8i7O0KmoQ",
      duration: "1:14",
      category: "features",
      views: "6.3K",
    },
    /*  {
      id: "5",
      title: "Mobile App Demo",
      description: "Discover the full power of our mobile application and stay productive on the go.",
      youtubeId: "dQw4w9WgXcQ",
      duration: "3:57",
      category: "mobile",
      views: "9.8K",
    },
    {
      id: "6",
      title: "Customer Success Story",
      description: "Real customer shares how our platform helped them scale their business by 300%.",
      youtubeId: "dQw4w9WgXcQ",
      duration: "7:14",
      category: "success-stories",
      views: "18.5K",
    }, */
  ];

  const categories = [
    { id: "all", label: "All Videos" },
    { id: "getting-started", label: "Getting Started" },
    { id: "features", label: "Features" },
    /* { id: "collaboration", label: "Collaboration" },
    { id: "integration", label: "Integration" },
    { id: "mobile", label: "Mobile" }, */
    { id: "success-stories", label: "Success Stories" },
  ];

  const filteredVideos = selectedCategory === "all" ? demoVideos : demoVideos.filter((video) => video.category === selectedCategory);

  const openVideoModal = (video) => {
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

  return (
    <div className='video-gallery'>
      <div className='video-gallery__container'>
        <div className='video-gallery__header'>
          <h2 className='video-gallery__title'>Product Demo Videos</h2>
          <p className='video-gallery__subtitle'>Explore our comprehensive video library to learn everything about our platform</p>
        </div>

        <div className='video-gallery__filters'>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`video-gallery__filter-btn ${selectedCategory === category.id ? "video-gallery__filter-btn--active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className='video-gallery__grid'>
          {filteredVideos.map((video) => (
            <div key={video.id} className='video-card' onClick={() => openVideoModal(video)}>
              <div className='video-card__thumbnail'>
                <img src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} alt={video.title} className='video-card__image' />
                <div className='video-card__overlay'>
                  <Play className='video-card__play-icon' />
                </div>
                <div className='video-card__duration'>
                  <Clock className='video-card__duration-icon' />
                  {video.duration}
                </div>
              </div>

              <div className='video-card__content'>
                <h3 className='video-card__title'>{video.title}</h3>
                <p className='video-card__description'>{video.description}</p>

                <div className='video-card__meta'>
                  <div className='video-card__views'>
                    <Eye className='video-card__views-icon' />
                    {video.views} views
                  </div>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default VideoGallery;
