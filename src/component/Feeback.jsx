import { useState } from "react";

const Feedback = () => {
  const [trainingQuality, setTrainingQuality] = useState(0);
  const [trainingUnderstanding, setTrainingUnderstanding] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  return (
    <>
      <div className='wishesWrapper994'>
        <div className='feedBackTitleFlexcon'>
          <div className='title56'>
            <p className='dateLable'> Training title</p>
            <select>
              <option value='' disabled selected hidden>
                Select training you participated in
              </option>
            </select>
          </div>
          <div>
            <p className='dateLable'>Date of training</p>
            <input type='date' className='dateInput' />
          </div>
        </div>
        <div style={{ margin: "10px 0" }} className='feedBackTitleFlexcon'>
          <div className='selectOther73'>
            <select>
              <option value='' disabled selected hidden>
                Trainee
              </option>
              <option>EEY</option>
            </select>
          </div>
          <div className='selectOther73'>
            <select>
              <option value='' disabled selected hidden>
                Trainer
              </option>
            </select>
          </div>
          <div className='selectOther73'>
            <input type={"time"} />
            <p className='trainingTime12'>Total Training time</p>
          </div>
        </div>

        <div className='questionarieTrain66'>
          <h4>Feed Back</h4>
          <div className='eachQuestions23'>
            <p>
              <b>1.</b> Rate the quality of training from 1 - 5{" "}
            </p>
            <div>
              <input value={trainingQuality} onChange={(e) => setTrainingQuality(e.target.value)} min={0} max={5} type={"range"} /> <p>{trainingQuality} </p>
            </div>
          </div>
          <div className='eachQuestions23'>
            <p>
              <b>2.</b> How well did you understand the training 1 - 5{" "}
            </p>
            <div>
              <input value={trainingUnderstanding} onChange={(e) => setTrainingUnderstanding(e.target.value)} min={0} max={5} type={"range"} />{" "}
              <p>{trainingUnderstanding} </p>
            </div>
          </div>
          <div className='eachQuestions23'>
            <p>
              <b>3.</b> Does writing on the dummy MPR help you understand more on how to document this training in production.{" "}
            </p>
            <select>
              <option value='' disabled selected hidden>
                Select
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className='eachQuestions23'>
            <p>
              <b>4.</b> Are you confident to perform same task or you need more training.{" "}
            </p>
            <select>
              <option value='' disabled selected hidden>
                Select
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className='eachQuestions23'>
            <p>Add more words</p>
            <textarea cols={3} className='Textarea12' placeholder='Please describe your overall impression about the training'></textarea>
          </div>
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
      </div>
    </>
  );
};

export default Feedback;
