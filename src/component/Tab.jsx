const Tab = ({updatePage}) => {

  const swtichTab = (tab) => {
    let movingTap = document.querySelector(".movingTap");
    let parentNode = document.querySelector(".TabTrain");
    if (tab === "feedBack") {
      movingTap.style.transform = `translateX(196px)`;
      parentNode.children[0].id = "";
      parentNode.children[1].id = "selectTab";
      updatePage("feedBack")
    } else if (tab === "trainingWish") {
      movingTap.style.transform = `translateX(0px)`;
      parentNode.children[0].id = "selectTab";
      parentNode.children[1].id = "";
      updatePage("wishList")
    }
  };
  return (
    <>
      <div className='TabWraper'>
        <div className='TabTrain'>
          <p onClick={() => swtichTab("trainingWish")} className='AllWishes12'>
            Training Wish
          </p>
          <p onClick={() => swtichTab("feedBack")} className='AllWishes12'>
            FeedBack
          </p>
          <div className='movingTap'></div>
        </div>
      </div>
    </>
  );
};

export default Tab;
