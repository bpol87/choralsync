import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function EmergencyInfo() {
  const user = useSelector((store) => store.user);
  const userProfile = useSelector(store => store.userProfile)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
  dispatch({type: "FETCH_USER_PROFILE", payload: user.id})
}, [])
  
  const [emergency_name, setEmergencyName] = useState(userProfile.emergency_name || '');
  const [emergency_relation, setEmergencyRelation] = useState(userProfile.emergency_relation || "");
  const [emergency_phone, setEmergencyPhone] = useState(userProfile.emergency_phone || "");


const handleEmergencyPopulate = () => {
    setEmergencyName('Jane Smith')
    setEmergencyRelation('Sibling')
    setEmergencyPhone('6125575557')
}

  const submitEmergency = (button) => {
    let contactToAdd = {
      emergency_name: emergency_name,
      emergency_relation: emergency_relation,
      emergency_phone: emergency_phone,
    };

    dispatch({ type: "SUBMIT_EMERGENCY", payload: contactToAdd });

      history.push("/user");
  };

  return (
    <div className="flex flex-col items-center px-4 py-2 text-sm">
      <div className=" flex flex-col items-center border-1 border-slate-600 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-bold" onClick={handleEmergencyPopulate}>Emergency Contact Information</h2>
        <form>
          <div className="flex flex-col px-4 py-2">
            <label>Emergency Contact Name:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={emergency_name}
              onChange={(e) => setEmergencyName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Relation to Member:</label>
            <select
              className="border rounded-md shadow-sm"
              type="text"
              value={emergency_relation}
              onChange={(e) => setEmergencyRelation(e.target.value)}
              required
            >
              <option value={"default"}>Select a Relation:</option>
              <option value={"Mother"}>Mother</option>
              <option value={"Father"}>Father</option>
              <option value={"Sibling"}>Sibling</option>
              <option value={"Friend"}>Friend</option>
              <option value={"Spouse"}>Spouse</option>
              <option value={"Other"}>Other</option>
            </select>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Emergency Contact Phone:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={emergency_phone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-row px-4 py-2">
            <button
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => history.push("/user")}
              type="button"
            >
              Cancel
            </button>
            <button
            type="button"
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => submitEmergency("backToChecklist")}
            >
              Save and Back To Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmergencyInfo;
