import Narbar from "./Narbar";
import Tab from "./Tab";
import Wishes from "./Wishes";
import { useState } from "react";
import Feedback from "./Feeback";

const Home = () => {
  const [page, setPage] = useState("feedBack");
  return <>
      <Narbar/>
      <div className="wishesListWrapper">
      <div className="wishListDiv">
        <h3>Mock Run Training</h3>
        <Tab updatePage={setPage}/>
        {page==="wishList"&&<Wishes/>}
        {page==="feedBack"&&<Feedback/>}
      </div>
      </div>
  </>;
};

export default Home;