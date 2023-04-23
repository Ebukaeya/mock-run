import "./togglebutton.css";
import { useState, useEffect, useLayoutEffect } from "react";

const DeliverToggle = ({ toggleValue, updatetoggle }) => {
  const [toggle, setToggle] = useState(null);
  let backGroundColor = toggle ? "#54E346" : "rgb(199, 205, 216)";

  useLayoutEffect(() => {
    setToggle(toggleValue);
    //handleToggle()
    toggleValue
      ? (document.querySelector(".tbuttonD").style.transform = "translateX(30px)")
      : (document.querySelector(".tbuttonD").style.transform = "translateX(0px)");
  }, []);

  useEffect(() => {
    updatetoggle(toggle);
  }, [toggle]);

  const handleToggle = () => {
    console.log("i was clicked");
    let switchNode = document.querySelector(".tbuttonD");
    if (toggle) {
      switchNode.style.transform = "translateX(0px)";
      setToggle(false);
    } else {
      switchNode.style.transform = "translateX(30px)";
      setToggle(true);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: backGroundColor }} className='toggleButtonD'>
        <div onClick={handleToggle} className='tbuttonD'></div>
      </div>
    </>
  );
};

export default DeliverToggle;
