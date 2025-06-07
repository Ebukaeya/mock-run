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
      title: "Professional Laptop Station",
      price: "$2,499",
      originalPrice: "$2,799",
      badge: "Most Popular",
      description: "Complete laptop-based POS solution with enterprise-grade performance",
      features: ["High-Performance Laptop", "80mm Thermal Printer", "2D Barcode Scanner", "Professional Setup & Training", "1-Year Warranty"],
      icon: Monitor,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=500",
      rating: 4.9,
    },
    {
      id: "android-touch",
      title: "Android Touch Terminal",
      price: "$1,899",
      originalPrice: "$2,199",
      badge: "Best Value",
      description: "Sleek Android terminal with intuitive touch interface",
      features: ["Android POS Terminal", "80mm Receipt Printer", "Omnidirectional Scanner", "Cloud Integration", "6-Month Support"],
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&h=500",
      rating: 4.7,
    },
    {
      id: "windows-powerstation",
      title: "Windows Power Station",
      price: "$2,199",
      originalPrice: "$2,499",
      badge: "Enterprise",
      description: "Robust Windows system for high-volume retail operations",
      features: ["Windows POS Computer", "Advanced Barcode Scanner", "High-Speed Printer", "Analytics Dashboard", "Premium Support"],
      icon: Monitor,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500",
      rating: 4.8,
    },
    {
      id: "tablet-mobility",
      title: "Mobile Tablet Station",
      price: "$1,299",
      originalPrice: "$1,599",
      badge: "Portable",
      description: "Flexible tablet solution with adjustable mounting system",
      features: ["Premium Tablet Device", "Adjustable Stand", "Wireless Connectivity", "Mobile App Integration", "Basic Support"],
      icon: Tablet,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&h=500",
      rating: 4.6,
    },
  ];

  const accessories = [
    {
      name: "80mm Thermal Printer",
      price: "$349",
      description: "High-speed thermal printing with auto-cutter functionality",
      icon: Printer,
      inStock: true,
    },
    {
      name: "2D Barcode Scanner",
      price: "$199",
      description: "Omnidirectional 2D scanner with USB/Bluetooth connectivity",
      icon: Scan,
      inStock: true,
    },
    {
      name: "Heavy-Duty Cash Drawer",
      price: "$159",
      description: "Secure cash management with 5-bill/5-coin compartments",
      icon: ShoppingCart,
      inStock: true,
    },
    {
      name: "Thermal Paper Rolls",
      price: "$89",
      description: "Premium quality paper - 50 rolls per box",
      icon: Printer,
      inStock: false,
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
            <h2 className='sl-section-title'>Complete POS Systems</h2>
            <p className='sl-section-subtitle'>Everything you need to start processing transactions immediately</p>
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

                    <Button className='sl-card-button'>
                      Get Started
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

                      <button className='sl-accessory-button' disabled={!item.inStock}>
                        {item.inStock ? "Add to Cart" : "Notify Me"}
                      </button>
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
