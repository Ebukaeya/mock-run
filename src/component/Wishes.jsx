import DeliverToggle from "./toggleButton/DeliverToggle";
import EachTainingSelected from "./EachTainingSelected";
import { useState, useEffect, useLayoutEffect } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const mockTrainings = [
  { id: Math.random() * 100, name: "Akta Procexx" },
  { id: Math.random() * 100, name: "Akta Ready" },
  { id: Math.random() * 100, name: "Chromatograpy" },
  { id: Math.random() * 100, name: "Akta Ready Process Training" },
];

const Wishes = () => {
  const [initials, setInitials] = useState("");
  const [isEmployeeFullyTrained, setIsEmployeeFullyTrained] = useState(false);
  const [selectedTrainings, setSelectedTrainings] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    if (selectedTrainings.length > 0 && initials) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [initials, selectedTrainings]);

  const toggleDropDown = () => {
    openDropDown ? setOpenDropDown(false) : setOpenDropDown(true);
  };

  const addSelectedTraining = (training) => {
    let match = selectedTrainings.find((train) => train.id === training.id);
    if (!match && selectedTrainings.length < 2) {
      setSelectedTrainings([...selectedTrainings, training]);
    }
  };

  const removeSelectedTraining = (training) => {
    let filteredTrainings = selectedTrainings.filter((train) => train.id !== training.id);
    setSelectedTrainings(filteredTrainings);
  };

  return (
    <>
      <div className='wishesWrapper994'>
        <select value={initials} onChange={(e) => setInitials(e.target.value)} className='selectInitials'>
          <option value='' disabled selected hidden>
            Select Initials
          </option>
          <option>EEY</option>
        </select>
        <div className='areUfullyTrained'>
          <p className='AreUfullyTText'>Are you fully trained</p>
          <DeliverToggle toggleValue={isEmployeeFullyTrained} updatetoggle={setIsEmployeeFullyTrained} />
        </div>
        <div onClick={() => toggleDropDown()} className='selectTrainingsDropDown'>
          <p>Select two trainings you wish to participate in</p>
          {openDropDown ? (
            <span className='closeDropDownSpan'>
              <IoClose />{" "}
            </span>
          ) : (
            <BsArrowDownShort size={20} />
          )}
          {openDropDown && (
            <div className='dropDownMenu12'>
              {mockTrainings.map((training, i) => (
                <p
                  key={1}
                  onClick={(e) => {
                    addSelectedTraining(training);
                    //e.stopPropagation();
                  }}
                >
                  {" "}
                  {training.name}{" "}
                </p>
              ))}
            </div>
          )}
        </div>
        {selectedTrainings.length > 0 && (
          <div className='selectedTrainingsDIv'>
            {selectedTrainings.map((training, i) => (
              <EachTainingSelected key={i} training={training} deleteTraining={removeSelectedTraining} />
            ))}
          </div>
        )}

        <div className='SubmitSelection123'>
          {isFormValid ? (
            <button>Submit request</button>
          ) : (
            <button style={{ cursor: "not-allowed", backgroundColor: "#6E92A2", opacity: "0.6" }} disabled>
              Submit request
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishes;
