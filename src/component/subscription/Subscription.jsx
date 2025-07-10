import "./subStyles.css";
import { BsCheck } from "react-icons/bs";
import { Check, Star, Zap, Crown, Shield, Rocket } from "lucide-react";
const SubCard = ({ name, price, includes, popular }) => {
  return (
    <div>
      <div className='subscriptionCard'>
        <p>Saver</p>
        <div> {name}</div>
        <div>
          <p>{price}</p>
          <span className='currencySubCard'>₦</span>
        </div>
        <p>per month</p>
        <p>For {name?.toLowerCase()} users and it includes:</p>
        <div className='packageIncludes'>
          {includes?.map((item, index) => (
            <div key={index}>
              <BsCheck color='green' />
              <p>{item}</p>
            </div>
          ))}
        </div>
        <button className='chooseplanButton'>Choose plan</button>
        {popular && <p className='recommenedPack'>popular</p>}
      </div>
    </div>
  );
};

const Subscription = () => {
  /*  return (
    <>
      <div className='subPlanWrapper'>
        <SubCard
          name={"basic"}
          price={1000}
          includes={["One month free", "Create one store", "list only 10 products", "24/7 support", "Access to Ihub platform"]}
        />
        <SubCard
          name={"super"}
          price={15000}
          includes={["Basic user Ad ons", "Create two stores", "Create one warehouse", "24 hours free Ad", "List upto 100 products"]}
          popular={true}
        />
        <SubCard
          name={"premium"}
          price={51000}
          includes={["Super user Ad ons", "Create upto ten stores", "Create five warehouses", "50 free Ad", "unlimited product listing"]}
        />
        <p style={{ textAlign: "center" }}>
          Not sure what to choose? you can start a <span style={{ color: "#b6a843", cursor: "pointer", fontWeight: "bold" }}>free 2 days Trial </span> or{" "}
          <span style={{ color: "rgb(9, 76, 126)", cursor: "pointer", fontWeight: "bold" }}>contact support</span>
        </p>
      </div>
    </>
  ); */
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "8000",
      discountPrice: "4000",
      period: "per month",
      description: "For basic users and it includes:",
      popular: false,
      badge: "Saver",
      icon: Shield,
      features: [
        "Create one store",
        "Business KPI tracking",
        "List only 60 products",
        "Free support",
        "Access our E-Commerce Hub",
        "Free hardware installation",
        "2% discount on extra services",
      ],
      plan: "Basic",
      planCode: "PLN_lbro2p90abucr1i",
    },
    {
      id: "super",
      name: "Super",
      price: "17000",
      discountPrice: "8500",
      period: "per month",
      description: "For super users and it includes:",
      popular: true,
      badge: "Saver",
      icon: Crown,
      features: [
        "Basic user Ad ons",
        "Create two stores",
        "Create one warehouse",
        "24 hours free Ad monthly",
        "List upto 200 products",
        "Free hardware installation",
        "10% discount on extra services",
        "Free personel training",
      ],
      plan: "Super",
      planCode: "PLN_gz3p2q94b9r0apg",
    },
    {
      id: "premium",
      name: "Premium",
      price: "42500",
      discountPrice: "21250",
      period: "per month",
      description: "For premium users and it includes:",
      popular: false,
      badge: "Saver",
      icon: Rocket,
      features: [
        "Super user Ad ons",
        "Create upto 5 stores",
        "Create 3 warehouses",
        "50 hours free Ad monthly",
        "List up 700 products",
        "Free hardware installation",
        "30% discount on extra services",
        "Free personel training",
      ],
      plan: "Premium",
      planCode: "PLN_o0yjesxw73ffcvr",
    },
  ];

  return (
    <div className='futuristic-pricing-wrapper'>
      <div className='futuristic-pricing-container'>
        <div className='futuristic-pricing-header'>
          {/*  <h1 className='futuristic-main-title'>Choose Your Plan</h1> */}
          <p className='futuristic-subtitle'>Unlock the power of digital commerce with our cutting-edge platform</p>
        </div>

        <div className='futuristic-plans-grid'>
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.id} className={`futuristic-plan-card ${plan.popular ? "futuristic-plan-popular" : ""}`} style={{ "--card-index": index }}>
                {plan.popular && (
                  <div className='futuristic-popular-ribbon'>
                    <Star className='futuristic-star-icon' />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className='futuristic-card-header'>
                  <div className='futuristic-plan-icon'>
                    <IconComponent size={32} />
                  </div>
                  <div className='futuristic-plan-info'>
                    <div className='futuristic-badge'>{plan.badge}</div>
                    <h3 className='futuristic-plan-title'>{plan.name}</h3>
                  </div>
                </div>

                <div className='futuristic-pricing-display'>
                  <div className='futuristic-price-container'>
                    <span className='futuristic-currency'>₦</span>
                    <span className='futuristic-price'>{plan.discountPrice}</span>
                  </div>
                  <div className='futuristic-period'>{plan.period}</div>
                  <span className='real-price-Ta'>₦{plan.price}</span>
                </div>

                <div className='futuristic-description'>{plan.description}</div>

                <div className='futuristic-features-list'>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='futuristic-feature-item' style={{ "--feature-index": featureIndex }}>
                      <div className='futuristic-check-container'>
                        <Check size={14} />
                      </div>
                      <span className='futuristic-feature-text'>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    window.location.href = `/sign-up`;
                  }}
                  className='futuristic-select-button'
                >
                  <div className='futuristic-button-content'>
                    <Zap size={18} />
                    <span>Select Plan</span>
                  </div>
                  <div className='futuristic-button-glow'></div>
                </button>
              </div>
            );
          })}
        </div>

        <div className='futuristic-bottom-section'>
          <div className='futuristic-trial-info'>
            <p>
              Not sure which plan fits? Start with a <span className='futuristic-highlight'>7 days free trial</span> or{" "}
              <span
                onClick={() => {
                  window.location.href =
                    "/contact?subject=Subscription &message=I would like to know more about your subscription plans and how they can benefit my business.";
                }}
                className='futuristic-link'
              >
                contact our support team
              </span>
            </p>
          </div>

          <div className='futuristic-testimonial-section'>
            <div className='futuristic-testimonial-content'>
              <h2 className='futuristic-testimonial-title'>Join thousands of businesses already transforming their commerce with our platform</h2>
              <div className='futuristic-stats'>
                <div className='futuristic-stat'>
                  <div className='futuristic-stat-number'>10K+</div>
                  <div className='futuristic-stat-label'>Active Users</div>
                </div>
                <div className='futuristic-stat'>
                  <div className='futuristic-stat-number'>99.9%</div>
                  <div className='futuristic-stat-label'>Uptime</div>
                </div>
                <div className='futuristic-stat'>
                  <div className='futuristic-stat-number'>24/7</div>
                  <div className='futuristic-stat-label'>Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
