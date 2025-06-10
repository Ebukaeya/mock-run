import "../styles/webstore.css";
/* import Comments from "./Comments.jsx"; */
/* import productDetails from "../assessStatic/pictures/product_details.png"; */
/* import testImg from "../assessStatic/pictures/testingG.png";
import bigDisplay from "../assessStatic/pictures/webstoreIm/image_2120_1984.png"; */
import midDisplay from "../assessStatic/pictures/webstoreIm/storelenseBImage.webp";
import frontView from "../assessStatic/pictures/posImage/frontView.png";
import sideView from "../assessStatic/pictures/posImage/sideView.png";
import backView from "../assessStatic/pictures/posImage/backView.png";
import creatProduct from "../assessStatic/pictures/webstoreIm/CreateProduct.png";
import productDetails from "../assessStatic/pictures/webstoreIm/productDetails.png";
import dashboardAn from "../assessStatic/pictures/webstoreIm/dashboardAn.png";
import salesBreakDown from "../assessStatic/pictures/webstoreIm/salesBreakDown.png";
import stockCheck from "../assessStatic/pictures/webstoreIm/stockCheck.png";
import conversationRate from "../assessStatic/pictures/webstoreIm/conversationRate.png";
import publishOnline from "../assessStatic/pictures/webstoreIm/publishOnline.png";
import trackLoan from "../assessStatic/pictures/webstoreIm/trackLoan.png";
import hardwareT from "../assessStatic/pictures/webstoreIm/hardwareT.png";
import trackP from "../assessStatic/pictures/webstoreIm/trackP.png";
import admonkey from "../assessStatic/pictures/webstoreIm/admonkey.png";
import cryptoP from "../assessStatic/pictures/webstoreIm/cryptoP.png";
import broadcastToC from "../assessStatic/pictures/webstoreIm/broadcastToC.png";
import expenses from "../assessStatic/pictures/webstoreIm/expenses.png";
import realTChat from "../assessStatic/pictures/webstoreIm/realTChat.png";
import onlineVendor from "../assessStatic/pictures/webstoreIm/onlineVendor.png";
import smallRetail from "../assessStatic/pictures/webstoreIm/smallRetailS.png";
import meduimSc from "../assessStatic/pictures/webstoreIm/meduimSc.png";
import largeSc from "../assessStatic/pictures/webstoreIm/largeSc.png";
import { FaLongArrowAltRight } from "react-icons/fa";
/* import Faq from "./Faq"; */
/* import OurPackages from "./Ourpackages"; */
import { useState, useEffect, useLayoutEffect } from "react";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosCloudUpload } from "react-icons/io";
import { RiComputerFill } from "react-icons/ri";
import Subscription from "./subscription/Subscription.jsx";
import Narbar from "./Narbar.jsx";
import HeroSection from "./HeroSection.jsx";
import ProductHistorySection from "./HistorySect.jsx";
import Footer from "./Footer.jsx";
import BusinessShowcase from "./BusinessShowcase.jsx";
import ScrollAnimationsProvider from "../tools/ScrollAnimationProvider.jsx";
/* import OnlineStoreSection from "./OnlineStoreSection.jsx"; */

/* 

  useEffect(() => {
    let ImgaeSlider = document.querySelector(".prodImagDivFlex");
    console.log(product.productImage.length, ImageCount);
    let count = 0;
    const interval = setInterval(() => {
      if (count < ImageCount) {
        ImgaeSlider.style.transform = `translateX(${-100 * count}%)`;
        count++;
      } else {
        ImgaeSlider.style.transform = `translateX(0%)`;
        count = 1;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [ImageCount]);*/

const posImages = [frontView, sideView, backView];
const Webstore = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    let ImgaeSlider = document.querySelector(".PosImage343");
    let count = 0;
    const interval = setInterval(() => {
      if (count < posImages.length) {
        ImgaeSlider.style.transform = `translateX(${-100 * count}%)`;
        count++;
      } else {
        ImgaeSlider.style.transform = `translateX(0%)`;
        count = 1;
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const delayFunc = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, ms);
    });
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Narbar />
      <ScrollAnimationsProvider />
      <section className='Intro'>
        <div className='BIntroWrap'>
          <div className='intro3862'>
            <div className='logoIntrodi'>
              {logo}
              <p className='parIntro3874'>Store lense app</p>
            </div>
            <h1 className='h1Intronr'>
              Manage your store inventory in <br /> <p className='h1Intro3874'> Real Time</p>{" "}
            </h1>
            <div className='intBtnD223'>
              <button
                onClick={() => {
                  window.location.href = "https://www.app.storelense.com/sign-up";
                }}
                className='intBtn3874'
              >
                Get Started
              </button>
              <button className='intBtn3874'>Demo</button>
            </div>
          </div>
          <div className='intImag38'>
            {/*  srcSet={` https://dam-bs.azureedge.net/v-638437518409577577/c6/bc/3df3-47ef-4e07-951f-36ffa2015d04/Original%20JPG-100167008-fox5-gra-black-midnight-black-combi-1.jpg 800w, ${testImg} 1200w`}
                sizes=' (max-width: 800px) 800px, 1200px'
                src={testImg} */}
            <img
              src={midDisplay}
              srcset={`  ${midDisplay} 3840w,
    
    ${midDisplay} 1920w,
 
    ${midDisplay} 1080w,
    ${midDisplay} 828w,
    ${midDisplay} 750w,
    ${midDisplay} 640w`}
              sizes='(max-width: 480px) 100vw, 
         (max-width: 1024px) 100vw, 
         33vw'
            />
          </div>
        </div>
        {/*  </div> */}
      </section>
      <section id='devIntro22229'>
        <div className='mycontainer'>
          <div className='PMW3oe8 sl-animate'>
            {/* <h1 style={{ color: "black", fontFamily: "Nunito" }} className='Ctit3y73'>
              All in one POS terminal and inventory manager
            </h1>
            <p className='lefya6e'>With our POS terminal, you can manage your store inventory in real time, track sales and set up your store</p> */}
            <div className='headline'>
              <h1 style={{ textAlign: "center" }}>
                <span className='text-dark'>All in one POS terminal and</span>
                <br />
                <span style={{ textAlign: "center" }} className='text-gradient'>
                  Inventory manager
                </span>
              </h1>
              <div className='underline'></div>
            </div>

            {/* Subtitle */}
            <p className='subtitle'>With our POS terminal, you can manage your store inventory in real time</p>
          </div>
          <div className='PTermPr33 sl-animate'>
            <div className='PosImage343'>
              {posImages.map((img, index) => (
                <img src={img} key={index} />
              ))}
            </div>
          </div>
          <div className='smallCa3 adjustmi sl-animate'>
            <div>
              <h3>Print receipt</h3>
              <p>80mm thermal printer</p>
            </div>
            <div>
              <h3>Accept payment</h3>
              <p>In-Built POS Terminal</p>
            </div>
            <div>
              <h3>Portable</h3>
              <p>Easy to carry around</p>
            </div>
            <div>
              <h3>Inventory manager</h3>
              <p>Sofware for IM</p>
            </div>
          </div>
          <div className='viewAllDevicesDiv sl-animate'>
            <button
              onClick={() => {
                window.location.href = "/pos-setup";
              }}
            >
              View All Setup
            </button>
          </div>
        </div>
      </section>

      <section id='heroSections'>
        <HeroSection />
      </section>

      <section>
        <ProductHistorySection />
      </section>
      <div style={{ height: "60px", backgroundColor: "#F0F7FF" }}></div>

      <section style={{ paddingTop: "5rem" }} id='features'>
        <h1 style={{ fontFamily: "Nunito, sans-serif" }} className='tit3urnfb sl-animate'>
          Compliment your physical Store with an Online Shop
        </h1>
        <div className='displayMockupTabletwrapper'>
          <div>
            <img src={creatProduct} className='webstoreMockupfull sl-animate' />
          </div>
          <div>
            <div className='sl-animate'>
              <div>
                <HiMiniBuildingStorefront size={22} />
              </div>
              <div>
                {" "}
                <p className='complitmetStoteP'>Create upto 10 virtual Stores and 5 warehouse</p>
                <p>
                  Create your store and warehouse in a digital space, and get access to a state of the art tools to manage your store and warehouse in real
                  time.
                </p>
              </div>
            </div>
            <div className='sl-animate'>
              <div>
                <FaMoneyBillTransfer size={22} />
              </div>
              <div>
                {" "}
                <p className='complitmetStoteP'>In store point of sale</p>
                <p>Get access to our POS terminal, where you perform all your sales, print receipt and keep track of your customers.</p>
              </div>
            </div>
            <div className='sl-animate'>
              <div>
                <IoIosCloudUpload size={22} />
              </div>
              <div>
                {" "}
                <p className='complitmetStoteP'>Publish your product on our E commerce hub</p>
                <p>Publish your products on our E commerce hub and get access to a wider audience and increase revenue.</p>
              </div>
            </div>
            <div className='sl-animate'>
              <div>
                <RiComputerFill size={22} />
              </div>
              <div>
                {" "}
                <p className='complitmetStoteP'>Real-time inventory manager and sales report</p>
                <p>
                  Get access to a real-time inventory manager and sales report, so you can keep track of your products and sales and make informed decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className=''>
        <div className='InventoryManagerWrapper'>
          <div>
            <h1 className='sl-animate'>Automated Inventory Manager</h1>
            <p className='description sl-animate'>
              With an advanced inventory manager, you will never loose track of your products. All products are accounted for, so product theft is highly
              mitigated
            </p>
            <div className='sl-animate'>
              <div className='useableTag'>
                <span></span>
                <p>Return</p>
              </div>
              <div className='useableTag'>
                <span></span>
                <p>Sales</p>
              </div>
              <div className='useableTag'>
                <span></span>
                <p>Damages</p>
              </div>
            </div>
          </div>
          <div className='sl-animate'>
            <img src={productDetails} />
          </div>
        </div>
      </div>

      <div className='mycontainer'>
        {/*  <div className="WebStoreTiltle">
            <h1>Rent a Web Shop, publish your products and Increase Revenue</h1>
          </div> */}

        <section id='InventoryManager'>
          <h4 style={{ color: "black", margin: "20px 0", fontSize: "1.8rem", textAlign: "center", fontWeight: "800" }} className=' text-gradient sl-animate'>
            More features
          </h4>

          <div className='fBC874 sl-animate'>
            <div className='sl-animate'>
              <img className='busImag3he' src={trackLoan} alt='restaurant' />
              <div className='ubhfys7e4'>
                <h3>Track your loan</h3>
                <p>Keep track of your credits and goods on loan</p>
              </div>
            </div>
            <div className='sl-animate'>
              <img className='busImag3he' src={broadcastToC} alt='restaurant' />
              <div className='ubhfys7e4'>
                <h3>Broadcast to customer</h3>
                <p>Send marketing campaign to all your customers</p>
              </div>
            </div>
            <div className='sl-animate'>
              <img className='busImag3he' src={expenses} alt='restaurant' />
              <div className='ubhfys7e4'>
                <h3>Expenses overview</h3>
                <p>Keep record of your business expenses and monitor growth</p>
              </div>
            </div>
            <div className='sl-animate'>
              <img className='busImag3he' src={realTChat} alt='restaurant' />
              <div className='ubhfys7e4'>
                <h3>Chat in real-time</h3>
                <p>Chat with your customers in real time</p>
              </div>
            </div>
            <div className='sl-animate'>
              <img className='busImag3he' src={cryptoP} alt='restaurant' />
              <div className='ubhfys7e4'>
                <h3>Payout in Crypto</h3>
                <p>You can choose to get paid out in crypto (Coming soon)</p>
              </div>
            </div>
          </div>

          <div className='RealTimeAnaWrapper'>
            <div className='sl-animate'>
              <div className='headline'>
                <h1 style={{ textAlign: "center" }}>
                  <span className='text-dark'>Real-Time Business </span>
                  <br />
                  <span style={{ textAlign: "center" }} className='text-gradient'>
                    Analytics
                  </span>
                </h1>
                <div className='underline'></div>
              </div>
              <p className='subtitle'>Valuable insights into your business growth</p>
            </div>
            <div className='RealTimeAnalytics'>
              <img className='sl-animate' src={dashboardAn} />
            </div>
          </div>
        </section>

        <section id='earnWhileShop'>
          <div className='earnWhileShioConnet sl-animate'>
            <div>
              <div className='innerCCon33'></div>
            </div>
            <div>
              <div className='innerCCon33'></div>
            </div>
            <div>
              <div className='innerCCon33'></div>
            </div>
          </div>
          <div className='EarnwhileYouSHopMainWrapper'>
            <div>
              <div className='earnwhleshoppingtext sl-animate'>
                <div>
                  <h1 id='kpi64tg'>Have overview of your business KPI and track progress</h1>
                  <p className='description'>
                    Your business KPI is important to track, with our platform, you can track your KPI and make informed decision. You can track your sales,
                    expenses, profit and loss and more.
                  </p>
                </div>

                <button
                  onClick={() => {
                    window.location.href = "/sign-up";
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
            <div>
              <div className='ImageDivPhoneMockupEarn impo84y sl-animate'>
                <img src={conversationRate} />
              </div>
            </div>
          </div>
          {/*  </div> */}
        </section>
      </div>

      {/*  <section id='whoCanUse22'>
        <div className='mycontainer'>
          <div className='PMW3oe8'>
            <h1 style={{ color: "black" }} className='Ctit3y73'>
              Who can use our software
            </h1>
            <p className='lefya6e'>
              Our software is designed for small, medium and large businesses. We provide a unique platform that helps business across boards to grow
            </p>
          </div>
          <div className='nidWrap3ee'>
            <div className='gwrap44'>
              <div>
                <img className='imag7645gs' src={onlineVendor} />
                <div>
                  <h4>Online Vendors </h4>
                  <p> Online vendors with no physical store, can use our platform to sell their products on our E commerce hub</p>
                </div>
              </div>
              <div>
                <img className='imag7645gs' src={smallRetail} />
                <div>
                  <h4>Small Retail stores</h4>
                  <p>Small outlet stores, with single shop. With no or few employes. Start up business into retailing.</p>
                </div>
              </div>
            </div>
            <div className='gwrap44'>
              <div>
                <img className='imag7645gs' src={meduimSc} />
                <div>
                  <h4>Medium business </h4>
                  <p>Medium business with one or more outlets and warehouse. Business that has been in operation for a while and has a good customer base.</p>
                </div>
              </div>
              <div>
                <img className='imag7645gs' src={largeSc} />
                <div>
                  <h4>Distributors </h4>
                  <p>Large scale distributors with multiple outlets and warehouse in different locations, selling same or different products.</p>
                </div>
              </div>
            </div>
          </div>
          <div className='EarnwhileYouSHopMainWrapper hAdjuf7364'>
            <div>
              <div className='earnwhleshoppingtext'>
                <div>
                  <h1 id='kpi64tg'>Publish your products online automatically</h1>
                  <p>
                    With our platform, you can publish your products online automatically and get access to a wider audience. We will show your products to
                    potential customers, and see your sales increase.
                  </p>
                </div>

                <button>Sign up for free</button>
              </div>
            </div>
            <div>
              <div className='ImageDivPhoneMockupEarn'>
                <img src={publishOnline} />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <BusinessShowcase />
      </section>

      <div className='mani563d'>
        <div className='InventoryManagerWrapper keepRow374'>
          <div>
            <h1 className='sl-animate'>Daily Sales break down</h1>
            <p className='sl-animate description'>
              Get a daily sales break down. Have overview of your daily sales, profit, loss, goods on loan, expense and revenue distributions. Your sales for
              the day is balanced automaticallyfor you
            </p>

            {/*  <p>All products are accounted for, so product theft is highly mitigated</p> */}
            <div className='sl-animate'>
              <div className='useableTag'>
                <span style={{ backgroundColor: "#809e52 " }}></span>
                <p>Sales</p>
              </div>
              <div className='useableTag'>
                <span style={{ backgroundColor: "#9e7a52" }}></span>
                <p>Credits</p>
              </div>
              <div className='useableTag'>
                <span style={{ backgroundColor: "#9736b6 " }}></span>
                <p>Expenses</p>
              </div>
            </div>
          </div>
          <div>
            {/*  <img src='https://res.cloudinary.com/ebuka1122/image/upload/v1653514421/samples/Ihub_public/Group_2559_l40acs.png' /> */}
            <img className='sl-animate' src={salesBreakDown} />
          </div>
        </div>
        <div className='InventoryManagerWrapper'>
          <div>
            <h1 className='sl-animate'>Advanced Stock Checking</h1>
            <p className='description sl-animate'>
              With our advanced stock checking, you can keep track of your products in real time. You can check the availability of your products, and know when
              to restock.
            </p>

            <div className='sl-animate'>
              <div className='useableTag'>
                <span style={{ backgroundColor: "#343434" }}></span>
                <p>Restock</p>
              </div>
              <div className='useableTag'>
                <span style={{ backgroundColor: "#b7b738" }}></span>
                <p>Edit</p>
              </div>
              <div className='useableTag'>
                <span style={{ backgroundColor: "#8b208b" }}></span>
                <p>Compensate</p>
              </div>
            </div>
          </div>
          <div>
            {/*  <img src='https://res.cloudinary.com/ebuka1122/image/upload/v1653514421/samples/Ihub_public/Group_2559_l40acs.png' /> */}
            <img className='sl-animate' src={stockCheck} />
          </div>
        </div>
      </div>

      <section id='everydayNeeds98'>
        <div className='mycontainer'>
          <div className='digitalHubTextTitle sl-animate'>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "white" }} className=''>
              Everything you need to run your business
            </h2>
            <div className='flecCenterDi'>
              <p style={{ fontSize: "1.12", lineHeight: "1.6", animation: "fadeIn 0.6s ease-out 0.3s both" }}>
                With our robust experience in business inteligence and extensive datasets, you will be one step ahead.
              </p>
            </div>
            {/*  <p>
              We provide a a unique platform where you can shop safely and earn
              while you shop
            </p> */}
          </div>

          <div style={{ margin: "60px 0 20px 0" }} className='paySet25342 retyh664 sl-animate'>
            <div>
              <div>
                <h3 className='inBoxTiitle'>We provide both hardware and software for your business</h3>
                <p className=''>
                  Our software is designed to work with our hardware. We provide both hardware and software for your business. Our hardware includes POS
                  terminal, thermal printer, barcode scanner and more. Software can also be used independently. .
                </p>
              </div>
              <span
                onClick={() => {
                  window.location.href = "/pos-setup";
                }}
                id='tikdu8'
                className='inboxBtn'
              >
                Check POS Setups <FaLongArrowAltRight />
              </span>
            </div>
            <div>
              <img className='glode23 glocodsk' src={hardwareT} />
            </div>
          </div>

          {/*    <div className='BuyandBook reb94745'>
            <div>
              <div>
                <h1 className='inLineTitle mate845' style={{ width: "100%" }}>
                  We provide both hardware and software for your business
                </h1>
                <p>Buy from your favourite stores and restaurants, jefj jsad jw rj rj jr jr jwr fbwr wrjf iwr jwq wejr ewrjbrrrgrejfue</p>
              </div>
              <span id='tikdu8' className=' goShopping '>
                Find out more
              </span>
            </div>
          </div> */}
          <div className='BuyandBook2 fle73hgr '>
            <div className='sl-animate'>
              <h1 className='inLineTitle765'>We keep track of each product performance</h1>
              {/* <p className='inLinetitlePara'>Choose from a variety of vehicles that suits you</p> */}
              <div>
                <img className='serviceImage' src={trackP} />
                {/* <div></div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div> */}
              </div>
              <span
                onClick={() => {
                  window.location.href = "/sign-up";
                }}
                style={{ color: "white" }}
                className='whitBtn364'
              >
                Sign up now
              </span>
            </div>
            <div className='sl-animate'>
              <h1 style={{ color: "black" }} className='inLineTitle765'>
                Use AI to create advert for your products
              </h1>
              {/*  <p className='inLinetitlePara'>Choose from a pool of available services</p> */}
              <div>
                <img src={admonkey} />
              </div>
              <span className='whitBtn364 moditjguef'>Find out more</span>
            </div>
          </div>

          {/* subscription section */}

          <h2 className='topPara7 ret573 sl-animate'> The wait is Over</h2>
          <h2 className='Ctit3y73 sl-animate'>Set up and access your store in real time</h2>

          <div className='regBtnDIv sl-animate'>
            <button
              onClick={() => {
                window.location.href = "https://www.app.storelense.com/sign-up";
              }}
              className='RegBtn'
            >
              Set up store now
            </button>
            <button
              onClick={() => {
                window.location.href = "/contact";
              }}
              className='COntSbtn'
            >
              Contact sales
            </button>
          </div>
        </div>
      </section>

      {/*  <OurPackages /> */}
      {/* subscription */}
      <section id='pricing' className='subModi4745'>
        <div className=' '>
          <div className='planUdvg sl-animate'>
            <h2 style={{ color: "black" }} className='main-title'>
              Our <span className='gradient-text'>Packages</span>
            </h2>
            {/* <p className='subtitle'>Choose a plan that suits your business</p> */}
          </div>

          <Subscription />
        </div>
      </section>

      {/*  <Comments />
      <Faq /> */}
      <section id='ContactSales'>
        <div className='mycontainer'>
          <div className='ContactSalesT sl-animate'>
            {/* <h1>Join many business who already use our platform and tools to improve their business and increase revenue !! </h1> */}
            <div className='btnDib45 sl-animate'>
              <button
                onClick={() => {
                  window.location.href = "https://www.app.storelense.com/sign-up";
                }}
              >
                Start free trial
              </button>
              <button
                onClick={() => {
                  window.location.href = "/contact";
                }}
              >
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Webstore;

const logo = (
  <svg xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink' width='46' height='46' viewBox='0 0 46 46'>
    <defs>
      <filter id='Ellipse_272'>
        <feOffset dx='-1' dy='1' input='SourceAlpha' />
        <feGaussianBlur stdDeviation='5' result='blur' />
        <feFlood flood-color='#0f0f0f' flood-opacity='0.161' result='color' />
        <feComposite operator='out' in='SourceGraphic' in2='blur' />
        <feComposite operator='in' in='color' />
        <feComposite operator='in' in2='SourceGraphic' />
      </filter>
      <radialGradient
        id='radial-gradient'
        cx='0.862'
        cy='0.237'
        r='1.394'
        gradientTransform='translate(-0.13 0.179) rotate(-17.999)'
        gradientUnits='objectBoundingBox'
      >
        <stop offset='0' stop-color='#5070a1' />
        <stop offset='1' stop-color='#0e49b5' />
      </radialGradient>
      <filter id='Subtraction_13' x='0.877' y='3.011' width='28.944' height='28.862' filterUnits='userSpaceOnUse'>
        <feOffset dx='-3' input='SourceAlpha' />
        <feGaussianBlur stdDeviation='3' result='blur-2' />
        <feFlood flood-color='#434343' flood-opacity='0.161' />
        <feComposite operator='in' in2='blur-2' />
        <feComposite in='SourceGraphic' />
      </filter>
      <filter id='Subtraction_23' x='15.434' y='17.402' width='28.862' height='28.413' filterUnits='userSpaceOnUse'>
        <feOffset dy='3' input='SourceAlpha' />
        <feGaussianBlur stdDeviation='3' result='blur-3' />
        <feFlood flood-color='#464646' flood-opacity='0.161' />
        <feComposite operator='in' in2='blur-3' />
        <feComposite in='SourceGraphic' />
      </filter>
    </defs>
    <g id='Group_2614' data-name='Group 2614' transform='translate(-0.037 -0.1)'>
      <g data-type='innerShadowGroup'>
        <circle id='Ellipse_272-2' data-name='Ellipse 272' cx='23' cy='23' r='23' transform='translate(0.037 0.099)' fill='#fff' />
        <g transform='matrix(1, 0, 0, 1, 0.04, 0.1)' filter='url(#Ellipse_272)'>
          <circle id='Ellipse_272-3' data-name='Ellipse 272' cx='23' cy='23' r='23' transform='translate(0 0)' fill='#fff' />
        </g>
        <g id='Ellipse_272-4' data-name='Ellipse 272' transform='translate(0.037 0.099)' fill='none' stroke='#0e49b5' stroke-width='2'>
          <circle cx='23' cy='23' r='23' stroke='none' />
          <circle cx='23' cy='23' r='22' fill='none' />
        </g>
      </g>
      <circle id='Ellipse_273' data-name='Ellipse 273' cx='18' cy='18' r='18' transform='translate(5.037 5.099)' fill='#c8a027' />
      <circle id='Ellipse_274' data-name='Ellipse 274' cx='17.5' cy='17.5' r='17.5' transform='translate(6.037 5.099)' fill='#fff' />
      <g id='Group_2610' data-name='Group 2610' transform='translate(12.416 12.111)'>
        <g transform='matrix(1, 0, 0, 1, -12.38, -12.01)' filter='url(#Subtraction_13)'>
          <path
            id='Subtraction_13-2'
            data-name='Subtraction 13'
            d='M10.943,10.862H0A10.554,10.554,0,0,1,3.19,3.326,11.63,11.63,0,0,1,10.944,0V10.861h0Z'
            transform='translate(12.88 12.01)'
            fill='url(#radial-gradient)'
          />
        </g>
        <path
          id='Subtraction_25'
          data-name='Subtraction 25'
          d='M10.8,0H0A10.623,10.623,0,0,0,3.148,7.536,11.406,11.406,0,0,0,10.8,10.862V0h0Z'
          transform='translate(22.854 10.862) rotate(180)'
          fill='#37b4c5'
        />
        <path
          id='Subtraction_17'
          data-name='Subtraction 17'
          d='M10.412,10.862H0A10.87,10.87,0,0,1,10.413,0V10.861h0Z'
          transform='translate(0.58 21.805) rotate(-90)'
          fill='#37b4c5'
        />
        <g transform='matrix(1, 0, 0, 1, -12.38, -12.01)' filter='url(#Subtraction_23)'>
          <path
            id='Subtraction_23-2'
            data-name='Subtraction 23'
            d='M10.412,0H0A10.825,10.825,0,0,0,3.035,7.536a10.813,10.813,0,0,0,7.378,3.325V0h0Z'
            transform='translate(24.43 33.82) rotate(-90)'
            fill='#0e49b5'
          />
        </g>
        <path
          id='Subtraction_12'
          data-name='Subtraction 12'
          d='M22.232,0H0A10.218,10.218,0,0,0,3.405,7.138a11.416,11.416,0,0,0,7.711,2.936,11.416,11.416,0,0,0,7.711-2.936A10.217,10.217,0,0,0,22.232,0Z'
          transform='translate(23.528 10.636) rotate(180)'
          fill='#fff'
        />
        <path
          id='Subtraction_26'
          data-name='Subtraction 26'
          d='M22.232,10.075H0A10.218,10.218,0,0,1,3.4,2.936,11.416,11.416,0,0,1,11.116,0a11.415,11.415,0,0,1,7.711,2.936,10.218,10.218,0,0,1,3.4,7.138Z'
          transform='translate(22.232 21.268) rotate(180)'
          fill='#fff'
        />
        <path id='Path_3551' data-name='Path 3551' d='M0,0H22.416' transform='translate(0.499 11.014)' fill='none' stroke='#0e49b5' stroke-width='1' />
      </g>
    </g>
  </svg>
);
