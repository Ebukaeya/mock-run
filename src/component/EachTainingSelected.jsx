import { IoClose } from "react-icons/io5";

const EachTainingSelected = ({ training, deleteTraining }) => {
  return (
    <>
      <div className='eachTraininSelecte5342Comp'>
        <p>{training.name}</p>
        <p>
          <IoClose onClick={()=>deleteTraining(training)} size={20} />
        </p>
      </div>
    </>
  );
};

export default EachTainingSelected;
