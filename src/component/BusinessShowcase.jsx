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

  /*  const businessTypes = [
    {
      title: "Pharmacys and health stores",
      description: "Online vendors with no physical store, can use our platform to sell their products on our E commerce hub",
      gradient: "blue-purple",
    },
    {
      title: "Retail stores",
      description: "From Electronic .",
      gradient: "purple-pink",
    },
    {
      title: "Supermarkets and grocery stores",
      description: "Medium business with one or more outlets and warehouse. Business that has been in operation for a while and has a good customer base.",
      gradient: "orange-red",
    },
    {
      title: "Importers and distributors",
      description: "Large scale distributors with multiple outlets and warehouse in different locations, selling same or different products.",
      gradient: "green-emerald",
    },
  ]; */

  const businessTypes = [
    {
      title: "Pharmacies & Health Stores",
      description:
        "Manage prescription and over-the-counter sales, track fast-moving and expiry-sensitive stock, monitor staff sales, and keep inventory accurate across your pharmacy or health store.",
      gradient: "blue-purple",
      icon: "pharmacy",
    },
    {
      title: "Retail Stores",
      description:
        "Perfect for electronics, fashion, cosmetics, phone accessories, and other retail businesses that need fast checkout, stock tracking, sales reporting, and staff accountability in one system.",
      gradient: "purple-pink",
      icon: "retail",
    },
    {
      title: "Supermarkets & Grocery Stores",
      description:
        "Handle high-volume daily sales, manage stock across shelves and storerooms, track low-stock items, and keep every checkout and inventory movement synced in real time.",
      gradient: "orange-red",
      icon: "supermarket",
    },
    {
      title: "Importers & Distributors",
      description:
        "Built for businesses managing bulk inventory, multiple outlets, warehouses, and large product movement—giving you full visibility into stock, transfers, sales, and performance across locations.",
      gradient: "green-emerald",
      icon: "distributor",
    },
  ];

  const PharmacyIcon = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <rect x='4' y='5' width='16' height='14' rx='3' stroke='currentColor' strokeWidth='1.8' />
      <path d='M12 8v8M8 12h8' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
    </svg>
  );
  const RetailIcon = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path d='M4 9.5L5.5 5h13L20 9.5' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' />
      <path d='M5 9.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.5' stroke='currentColor' strokeWidth='1.8' />
      <path d='M9 20v-5h6v5' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' />
    </svg>
  );

  const SupermarketIcon = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path
        d='M4 6h2l1.2 7.2A2 2 0 0 0 9.2 15H17a2 2 0 0 0 2-1.6L20 8H7'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='10' cy='19' r='1.5' fill='currentColor' />
      <circle cx='17' cy='19' r='1.5' fill='currentColor' />
    </svg>
  );
  const DistributorIcon = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path d='M12 3l7 4v10l-7 4-7-4V7l7-4Z' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' />
      <path d='M12 3v18M5 7l7 4 7-4' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' />
    </svg>
  );

  const iconMap = {
    pharmacy: PharmacyIcon,
    retail: RetailIcon,
    supermarket: SupermarketIcon,
    distributor: DistributorIcon,
  };
  /*  const icons = {
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
  }; */

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
          {businessTypes.map((business, index) => {
            const Icon = iconMap[business.icon];
            return (
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
                    {/*  {index === 0 && icons.pharmacy}
                    {index === 1 && icons.retail}
                    {index === 2 && icons.supermarket}
                    {index === 3 && icons.distributor} */}
                    <Icon size={62} />
                  </div>
                  <h3 className='card-title'>{business.title}</h3>
                  <p className='card-description'>{business.description}</p>
                </div>
              </div>
            );
          })}
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
