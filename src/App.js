import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useLayoutEffect } from "react";
import Webstore from "./component/Webstore.jsx";
import PosSetup from "./component/PosSetup/PosSetup.jsx";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Webstore />} />
        <Route path='/pos-setup' element={<PosSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
