import React, { useEffect, useRef } from "react";
import "../styles/BusinessShowcase.css";

const BusinessShowcase = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section) observer.observe(section);
    cards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (section) observer.unobserve(section);
      cards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const businessTypes = [
    {
      title: "Online Vendors",
      description: "Online vendors with no physical store, can use our platform to sell their products on our E commerce hub",
      gradient: "blue-purple",
    },
    {
      title: "Small Retail stores",
      description: "Small outlet stores, with single shop. With no or few employees. Start up business into retailing.",
      gradient: "purple-pink",
    },
    {
      title: "Medium business",
      description: "Medium business with one or more outlets and warehouse. Business that has been in operation for a while and has a good customer base.",
      gradient: "orange-red",
    },
    {
      title: "Distributors",
      description: "Large scale distributors with multiple outlets and warehouse in different locations, selling same or different products.",
      gradient: "green-emerald",
    },
  ];

  const icons = {
    store: (
      <svg className='icon' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z' />
      </svg>
    ),
    building: (
      <svg className='icon' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z' />
      </svg>
    ),
    package: (
      <svg className='icon' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M7.5 5.6L10 7L8.6 8.5L6 7L7.5 5.6M12 1L21 5V19L12 23L3 19V5L12 1M5 7.7L12 11.4L19 7.7V6.3L12 10L5 6.3V7.7Z' />
      </svg>
    ),
    users: (
      <svg className='icon' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7H7v-2c0-1.11.89-2 2-2h6c1.11 0 2 .89 2 2v2h-2v7h2v-4h3v4h2v2H2v-2h2z' />
      </svg>
    ),
  };

  return (
    <div className='business-showcase'>
      <div className='background-elements'>
        <div className='bg-element bg-element-1'></div>
        <div className='bg-element bg-element-2'></div>
        <div className='bg-element bg-element-3'></div>
      </div>

      <div className='container'>
        <div ref={sectionRef} className='header-section opacity-0 translate-y-10'>
          <h1 className='main-title'>
            Who can use our <span className='gradient-text'>software</span>
          </h1>
          <p className='subtitle'>
            Our software is designed for small, medium and large businesses. We provide a unique platform that helps business across boards to grow
          </p>
        </div>

        <div className='cards-grid'>
          {businessTypes.map((business, index) => (
            <div
              key={business.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className='card opacity-0 translate-y-10'
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className='card-content'>
                <div className={`icon-container ${business.gradient}`}>
                  {index === 0 && icons.store}
                  {index === 1 && icons.building}
                  {index === 2 && icons.package}
                  {index === 3 && icons.users}
                </div>
                <h3 className='card-title'>{business.title}</h3>
                <p className='card-description'>{business.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='bottom-section'>
          <div
            className='text-content opacity-0 translate-y-10'
            ref={(el) => {
              if (el) cardsRef.current[4] = el;
            }}
          >
            <h2 className='section-title'>
              Publish your products online <span className='gradient-text-green'>automatically</span>
            </h2>
            <p className='section-description'>
              With our platform, you can publish your products online automatically and get access to a wider audience. We will show your products to potential
              customers, and see your sales increase.
            </p>
          </div>

          <div
            className='image-content opacity-0 translate-y-10'
            ref={(el) => {
              if (el) cardsRef.current[5] = el;
            }}
          >
            <div className='image-wrapper'>
              <div className='image-glow'></div>
              <img src={require("../assessStatic/pictures/webstoreIm/publishOnline.png")} alt='Happy business owner' className='showcase-image' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessShowcase;
