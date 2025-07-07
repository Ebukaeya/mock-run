import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useLayoutEffect } from "react";
import Webstore from "./component/Webstore.jsx";
import PosSetup from "./component/PosSetup/PosSetup.jsx";
import Services from "./component/Services.jsx";
import Contact from "./component/Contact.jsx";
import SignUp from "./component/GettingStarted/SignUp.jsx";
import Demo from "./component/demo/Demo.jsx";

function App() {
  useLayoutEffect(() => {
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  const updateViewportHeight = () => {
    let vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  /* 
<div className='get-started-header'>
          {step === "signup" ? (
            <h1 className='get-started-title'>
              Get Started with{" "}
              <b style={{ color: "#rgb(17 114 255)" }}>
                {" "}
                Store<span style={{ color: "#2B9FB3" }}>Lense</span>
              </b>
            </h1>
          ) : (
            <h1 className='get-started-title'>Verify Your Phone Number</h1>
          )}
          <p className='get-started-subtitle'>{step === "signup" ? "Create your account to continue" : "We will send you a confirmation code"}</p>
        </div> */
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Webstore />} />
        <Route path='/pos-setup' element={<PosSetup />} />
        <Route path='/services' element={<Services />} />
        {/* Add more routes as needed */}
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign-up/' element={<SignUp />} />
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
