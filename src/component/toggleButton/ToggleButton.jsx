import "./togglebutton.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStorePublicityUrl } from "../../api/endpoints";
import { setStore } from "../../slice/storeSlice";
import { useParams } from "react-router-dom";

const ToggleButton = ({ updatetoggle }) => {
  const [toggle, setToggle] = useState(false);
  let backGroundColor = toggle ? "#54E346" : "rgb(199, 205, 216)";

  const { store } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const { storeID } = useParams();

  useEffect(() => {
    let switchNode = document.querySelector(".tbutton");
    if (store.isStoreHidden) {
      setToggle(true);
      switchNode.style.transform = "translateX(35px)";
    } else {
      setToggle(false);
    }
  }, [store]);

  useEffect(() => {
    updatetoggle(toggle);
    console.log(toggle);
    /* update store publicity */
   
  }, [toggle]);

  const handleToggle = () => {
    let switchNode = document.querySelector(".tbutton");
    if (toggle) {
      switchNode.style.transform = "translateX(0px)";
      setToggle(false);
      updateStorePublicity(false);
    } else {
      switchNode.style.transform = "translateX(35px)";
      setToggle(true);
      updateStorePublicity(true);
    }
  };

  const updateStorePublicity = async (payload) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      let response = await fetch(updateStorePublicityUrl+storeID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ isStoreHidden: payload }),
      });
      if (response.ok) {
        console.log("updated");
        const store = await response.json();
        dispatch(setStore(store));
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: backGroundColor }} className='toggleButtonC'>
        <div onClick={handleToggle} className='tbutton'></div>
      </div>
    </>
  );
};

export default ToggleButton;
