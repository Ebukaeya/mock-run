import { useEffect, useRef } from "react";
import { Crown, Shield, Target, ArrowRight, Star, Settings, GraduationCap, BarChart3, Headphones, Camera, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import "../styles/Service.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Services = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const discountsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("services-animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [heroRef.current, servicesRef.current, discountsRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const services = [
    {
      name: "Free POS Installation & Configuration",
      icon: <Settings className='services-card-icon' />,
      description: "Complete POS system setup and configuration at no cost to get your business running smoothly",
      features: ["Professional installation", "System configuration", "Hardware setup", "Initial testing"],
      iconClass: "blue",
    },
    {
      name: "Free Staff Training",
      icon: <GraduationCap className='services-card-icon' />,
      description: "Comprehensive training for your personnel to effectively use the POS software",
      features: ["Hands-on training sessions", "User manual provided", "Best practices guidance", "Ongoing support"],
      iconClass: "emerald",
    },
    {
      name: "Product Listing Service",
      icon: <Camera className='services-card-icon' />,
      description: "Professional product photography and listing setup in your POS system",
      features: ["Professional product photography", "Detailed product descriptions", "Price configuration", "Inventory setup"],
      iconClass: "slate",
      hasPrice: true,
    },
    {
      name: "Customer Support",
      icon: <Headphones className='services-card-icon' />,
      description: "Dedicated customer service and technical support for all your POS needs",
      features: ["Technical troubleshooting", "Software updates", "User assistance", "Remote support"],
      iconClass: "blue",
    },
    {
      name: "End of Year Performance Analysis",
      icon: <BarChart3 className='services-card-icon' />,
      description: "Comprehensive yearly business performance report and analytics",
      features: ["Sales performance review", "Trend analysis", "Custom reports", "Business insights"],
      iconClass: "emerald",
    },
  ];

  const discountTiers = [
    {
      name: "Basic Package",
      discount: "2%",
      icon: <Shield className='services-discount-icon' />,
      description: "Basic Users get 2% discount for any service selected.",
      iconClass: "blue",
      textColor: "blue",
    },
    {
      name: "Super Package",
      discount: "10%",
      icon: <Target className='services-discount-icon' />,
      description: "Super Users get 10% discount for any service selected.",
      popular: true,
      iconClass: "emerald",
      textColor: "emerald",
    },
    {
      name: "Premium Package",
      discount: "30%",
      icon: <Crown className='services-discount-icon' />,
      description: "Premium Users get 30% discount for any service selected.",
      iconClass: "gradient",
      textColor: "slate",
    },
  ];

  const stats = [
    { number: "100%", label: "Free Setup", icon: <Settings className='services-stat-icon' /> },
    { number: "24/7", label: "Support", icon: <Headphones className='services-stat-icon' /> },
    { number: "Free", label: "Training", icon: <GraduationCap className='services-stat-icon' /> },
    { number: "Annual", label: "Reports", icon: <BarChart3 className='services-stat-icon' /> },
  ];

  const handleViewPricing = () => {
    console.log("Opening price catalog...");
  };

  return (
    <div className='services-container'>
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
      {/* Hero Section */}
      <div ref={heroRef} className='services-hero'>
        <div className='services-hero-bg'>
          <div className='services-hero-bg-element-1'></div>
          <div className='services-hero-bg-element-2'></div>
        </div>

        <div className='services-hero-content'>
          <div className='services-hero-badge'>
            <Star className='services-hero-badge-icon' />
            Professional POS Solutions
          </div>

          <h1 className='services-hero-title'>
            Complete POS
            <span className='services-hero-title-highlight'>Services</span>
          </h1>

          <p className='services-hero-description'>
            From free installation to comprehensive support, we provide everything you need to run your business efficiently with our inventory management
            system.
          </p>

          <div className='services-hero-cta'>
            <button className='services-hero-button'>
              Get Started Today
              <ArrowRight className='services-hero-button-icon' />
            </button>
          </div>

          {/* Stats */}
          <div className='services-stats-grid'>
            {stats.map((stat, index) => (
              <div key={index} className='services-stat-card'>
                <div className='services-stat-icon-wrapper'>{stat.icon}</div>
                <div className='services-stat-number'>{stat.number}</div>
                <div className='services-stat-label'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className='services-section'>
        <div className='services-section-container'>
          <div className='services-section-header'>
            <h2 className='services-section-title'>
              Our Complete
              <span className='services-section-title-highlight'>Service Portfolio</span>
            </h2>
            <p className='services-section-description'>
              Everything you need to get your POS system up and running, plus ongoing support to help your business thrive.
            </p>
          </div>

          <div className='services-grid'>
            {services.map((service, index) => (
              <div key={index} className='services-card'>
                <div className='services-card-header'>
                  <div className={`services-card-icon-wrapper ${service.iconClass}`}>{service.icon}</div>
                  <h3 className='services-card-title'>{service.name}</h3>
                  <p className='services-card-description'>{service.description}</p>
                </div>

                <div className='services-card-content'>
                  <div className='services-card-features'>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className='services-card-feature'>
                        <div className='services-card-feature-dot'></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {service.hasPrice && (
                    <button onClick={handleViewPricing} className='services-card-button'>
                      View Price Catalog
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discount Information Section */}
      <div ref={discountsRef} className='services-discount-section'>
        <div className='services-section-container'>
          <div className='services-section-header'>
            <h2 className='services-section-title'>
              Discount Tiers
              <span className='services-section-title-highlight'>For Users</span>
            </h2>
            <p className='services-section-description'>
              Depending on the user package you have shown, we are happy to offer you discounts on each service that fits your business needs.
            </p>
          </div>

          <div className='services-discount-grid'>
            {discountTiers.map((tier, index) => (
              <div key={index} className={`services-discount-card ${tier.popular ? "popular" : ""}`}>
                {tier.popular && <div className='services-discount-popular-badge'>Most Popular</div>}

                <div className={`services-discount-card-header ${tier.popular ? "has-popular" : ""}`}>
                  <div className={`services-discount-icon-wrapper ${tier.iconClass}`}>{tier.icon}</div>
                  <h3 className='services-discount-title'>{tier.name}</h3>
                  <div className='services-discount-percentage'>
                    <span className={`services-discount-number ${tier.textColor}`}>{tier.discount}</span>
                    <span className='services-discount-label'>discount</span>
                  </div>
                  <p className='services-discount-description'>{tier.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='services-cta-section'>
        <div className='services-cta-bg'>
          <div className='services-cta-bg-element-1'></div>
          <div className='services-cta-bg-element-2'></div>
        </div>

        <div className='services-cta-container'>
          <h2 className='services-cta-title'>Ready to Get Started?</h2>
          <p className='services-cta-description'>
            Contact us today for your free POS installation and setup. Let's get your business running efficiently with our comprehensive solutions.
          </p>
          <button className='services-cta-button'>
            Contact Us Today
            <ArrowRight className='services-cta-button-icon' />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
