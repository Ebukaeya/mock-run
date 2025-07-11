import "./splash.css";
import { useNavigate } from "react-router-dom";

import { useRef, useState } from "react";

const SplashScreen = ({ onRemount }) => {
  const [key, setKey] = useState(0);
  /* const navigate = useNavigate();
  const videoRef = useRef(null); */

  const scaleLogo = () => {
    const logoElement = document.querySelector(".splash-video");
    console.log(logoElement);

    if (logoElement) {
      logoElement.style.transform = "scale(3)";
      logoElement.style.opacity = "0";
      setTimeout(() => {
        logoElement.style.transform = "scale(1)";
        logoElement.style.opacity = "1";
        setTimeout(() => {
          onRemount(); // Trigger re-render
        }, 2000);
      }, 2000);
      // listen to aniation end event to navigate to the main app
    }
  };

  return (
    <>
      <div className='SplashScreen'>
        <div>
          <video
            autoPlay
            muted
            playsInline
            onEnded={() => {
              // handle transition to main app
              scaleLogo();
            }}
            className='splash-video'
          >
            <source src={require("../../assessStatic/videoAnimations/StoreLenseLogoAnimated.mp4")} type='video/mp4' />
          </video>
        </div>
        <span className='splashText'>
          Powered by Pragma Solutions Ltd <span className='copyright'>&#169; 2025</span>
        </span>
      </div>
    </>
  );
};

const MainSplashScreen = () => {
  const [splashKey, setSplashKey] = useState(0);

  return <SplashScreen key={splashKey} onRemount={() => setSplashKey((k) => k + 1)} />;
};

export default MainSplashScreen;
