import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function AboutInfo() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [about, setAbout] = useState("");
  const [fun_fact, setFunFact] = useState("");
  const [employer, setEmployer] = useState("");
  const [occupation, setOccupation] = useState("");


  const handlePopulate = () => {
    setAbout('I have an orange tabby cat at home')
    setFunFact('Ive traveled to almost all 7 continents')
    setEmployer('Self Employed')
    setOccupation('Sofware Developer | UX/UI Designer')
  }

  const submitAbout = (button) => {
    let aboutToAdd = {
      about: about,
      fun_fact: fun_fact,
      employer: employer,
      occupation: occupation
    };

    dispatch({ type: "SUBMIT_ABOUT", payload: aboutToAdd });

      history.push("/user");
   
  };

  return (
    <div className="flex flex-col items-center px-4 py-2 text-sm">
      <div className=" flex flex-col items-center border-1 border-slate-600 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-bold">About Me</h2>
        <form>
          <div className="flex flex-col px-4 py-2">
            <label>About:</label>
            <textarea
              className="border rounded-md shadow-sm"
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Fun Fact:</label>
            <textarea
              className="border rounded-md shadow-sm"
              type="text"
              value={fun_fact}
              onChange={(e) => setFunFact(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Employer:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Occupation:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-row px-4 py-2">
            <button
            type="button"
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => history.push("/user")}
            >
              Cancel
            </button>
            <button
            type="button"
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => submitAbout("backToChecklist")}
            >
              Save and Back To Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AboutInfo;

