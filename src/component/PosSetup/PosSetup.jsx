import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Monitor, Smartphone, Tablet, Printer, Scan, ShoppingCart, Star, CheckCircle } from "lucide-react";
import { Button } from "../../component/ui/button";
import { Card, CardContent } from "../ui/card";
import "./PosSetup.css";

const PosSetup = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sl-fade-in");
          }
          {
            /*.description {
            font-size: 1.125rem;
            color: #6b7280;
            line-height: 1.6;
            animation: fadeIn 0.6s ease-out 0.3s both;
        } */
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".sl-animate");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const posSetups = [
    {
      id: "laptop-pro",
      title: "Laptop Combo Station",
      price: "₦550,000",
      originalPrice: "₦605,000",
      badge: "Most Popular",
      description: "Our Performance/User laptop with our POS system for a seamless experience",
      features: ["Any User Laptop", "80mm Thermal Printer", "2D Barcode Scanner", "Professional Setup & Training", "Label Printer", "24/7 Support"],
      icon: Monitor,
      image: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333563/Ihub/LaptopSetup_gvcalp.webp",
      rating: 4.9,
    },
    {
      id: "android-touch",
      title: "Android Touch Terminal",
      price: "₦601,000",
      originalPrice: "₦655,000",
      badge: "Best Value",
      description: "Sleek Android terminal with intuitive touch interface",
      features: ["Android POS Terminal", "80mm Receipt Printer", "Omnidirectional Scanner", "Label Printer", "24/7 Support"],
      icon: Smartphone,
      image: "https://res.cloudinary.com/ebuka1122/image/upload/v1749334767/Ihub/AndriodPOS_mtw05f.webp",
      rating: 4.7,
    },
    {
      id: "windows-powerstation",
      title: "Windows Touch Terminal",
      price: "₦490,000",
      originalPrice: "₦580,000",
      badge: "Enterprise",
      description: "Robust Windows Touch system for high-volume retail operations",
      features: ["Windows POS Computer", "Touch Screen", "Advanced Barcode Scanner", "High-Speed thermal Printer", "Label Printer", "24/7 Support"],
      icon: Monitor,
      image: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333566/Ihub/windowsSetup_ptaxnp.webp",
      rating: 4.8,
    },
    {
      id: "tablet-mobility",
      title: "Mobile Tablet Station",
      price: "₦180,000",
      originalPrice: "#220,000",
      badge: "Portable",
      description: "Our Flexible tablet solution with adjustable mounting system",
      features: ["Premium Tablet Device", "Adjustable Stand", "Software Integration", "24/7 Support"],
      icon: Tablet,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&h=500",
      rating: 4.6,
    },
    {
      id: "tablet-mobility",
      title: "Z 100 Android POS",
      price: "₦440,000",
      originalPrice: "₦550,000",
      badge: "Portable",
      description: "Portable Android POS with integrated payment solutions and sleek design",
      features: ["Android POS Tablet", "SIM card compatibilty", "4G Network", "In-built printer", "Advanced Barcode Scanner", "24/7 Support"],
      icon: Tablet,
      image: "https://res.cloudinary.com/ebuka1122/image/upload/v1749333564/Ihub/Z-100_lteagi.webp",
      rating: 4.6,
    },
  ];

  const accessories = [
    {
      name: "80mm Thermal Printer",
      price: "₦45,000",
      description: "High-speed thermal printing with auto-cutter functionality",
      icon: Printer,
      inStock: true,
    },
    {
      name: "2D Barcode Scanner",
      price: "₦25,000",
      description: "Omnidirectional 2D scanner with USB/Bluetooth connectivity",
      icon: Scan,
      inStock: true,
    },
    {
      name: "Tablet Stand",
      price: "₦15,000",
      description: "Adjustable stand for tablets with secure locking mechanism",
      icon: Tablet,
      inStock: true,
    },
    {
      name: "Thermal Paper Rolls",
      price: "₦10,000 per box",
      description: "Premium quality paper - 50 rolls per box",
      icon: Printer,
      inStock: true,
    },
  ];

  return (
    <div className='sl-pos-setup'>
      {/* Navigation */}
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

      {/* Hero Banner */}
      <section className='sl-hero'>
        <div className='sl-hero-bg'></div>
        <div className='sl-container'>
          <div className='sl-hero-content sl-animate'>
            <div className='sl-hero-badge'>
              <Star className='w-4 h-4' />
              <span>Trusted by 10,000+ businesses</span>
            </div>
            <h1 className='sl-hero-title'>
              Next-Generation
              <span className='sl-highlight'> POS Solutions</span>
            </h1>
            <p className='sl-hero-description'>
              Transform your business with our cutting-edge point-of-sale systems. From compact tablets to powerful workstations, we have the perfect solution
              for every business size.
            </p>
            <div className='sl-hero-stats'>
              <div className='sl-stat'>
                <span className='sl-stat-number'>99.9%</span>
                <span className='sl-stat-label'>Uptime</span>
              </div>
              <div className='sl-stat'>
                <span className='sl-stat-number'>24/7</span>
                <span className='sl-stat-label'>Support</span>
              </div>
              <div className='sl-stat'>
                <span className='sl-stat-number'>30-Day</span>
                <span className='sl-stat-label'>Trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POS Systems Grid */}
      <section className='sl-systems'>
        <div className='sl-container'>
          <div className='sl-section-header sl-animate'>
            <h2 className='sl-section-title'>Available POS Setups</h2>
            <p className='sl-section-subtitle'>Explore our range of point-of-sale systems designed to meet the needs of your retail store.</p>
          </div>

          <div className='sl-systems-grid'>
            {posSetups.map((setup, index) => {
              const IconComponent = setup.icon;
              return (
                <Card key={setup.id} className='sl-system-card sl-animate' style={{ animationDelay: `${index * 0.1}s` }}>
                  {setup.badge && <div className='sl-card-badge'>{setup.badge}</div>}

                  <div className='sl-card-image'>
                    <img src={setup.image} alt={setup.title} />
                    <div className='sl-card-overlay'>
                      <IconComponent className='w-8 h-8' />
                    </div>
                  </div>

                  <CardContent className='sl-card-content'>
                    <div className='sl-card-header'>
                      <div className='sl-card-title-group'>
                        <h3 className='sl-card-title'>{setup.title}</h3>
                        <div className='sl-card-rating'>
                          <Star className='w-4 h-4 sl-star-filled' />
                          <span>{setup.rating}</span>
                        </div>
                      </div>
                      <div className='sl-card-pricing'>
                        <span className='sl-price-current'>{setup.price}</span>
                        <span className='sl-price-original'>{setup.originalPrice}</span>
                      </div>
                    </div>

                    <p className='sl-card-description'>{setup.description}</p>

                    <div className='sl-features-list'>
                      {setup.features.map((feature, idx) => (
                        <div key={idx} className='sl-feature-item'>
                          <CheckCircle className='w-4 h-4 sl-check-icon' />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => {
                        alert(`You selected the ${setup.title} setup!, talk to us`); /* Replace with actual navigation or action */
                        window.location.href = `/contact?subject=${setup.title}`; /* Redirect to contact page or order form */
                      }}
                      className='sl-card-button'
                    >
                      Order Now
                      <ArrowLeft className='w-4 h-4 sl-button-icon' />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className='sl-accessories'>
        <div className='sl-container'>
          <div className='sl-section-header sl-animate'>
            <h2 className='sl-section-title'>Individual Components</h2>
            <p className='sl-section-subtitle'>Expand your setup with premium accessories</p>
          </div>

          <div className='sl-accessories-grid'>
            {accessories.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={item.name} className='sl-accessory-card sl-animate' style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className='sl-accessory-content'>
                    <div className='sl-accessory-header'>
                      <div className='sl-accessory-icon'>
                        <IconComponent className='w-6 h-6' />
                      </div>

                      <div className='sl-accessory-main'>
                        <h3 className='sl-accessory-name'>{item.name}</h3>
                        <p className='sl-accessory-description'>{item.description}</p>
                      </div>
                    </div>

                    <div className='sl-accessory-footer'>
                      <div className='sl-accessory-pricing'>
                        <span className='sl-accessory-price'>{item.price}</span>
                        <div className='sl-accessory-status'>
                          {item.inStock ? <span className='sl-in-stock'>In Stock</span> : <span className='sl-out-stock'>Out of Stock</span>}
                        </div>
                      </div>

                      {/*  <button className='sl-accessory-button' disabled={!item.inStock}>
                        {item.inStock ? "Add to Cart" : "Notify Me"}
                      </button> */}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='sl-cta'>
        <div className='sl-container'>
          <div className='sl-cta-content sl-animate'>
            <h2 className='sl-cta-title'>Ready to Revolutionize Your Business?</h2>
            <p className='sl-cta-description'>
              Join thousands of businesses already using our POS solutions. Get expert consultation and find the perfect system for your needs.
            </p>
            <div className='sl-cta-buttons'>
              <Button className='sl-cta-primary'>Schedule Consultation</Button>
              <Button variant='outline' className='sl-cta-secondary'>
                Download Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PosSetup;
