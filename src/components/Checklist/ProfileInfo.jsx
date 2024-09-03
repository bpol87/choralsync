import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ProfileInfo() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [hideMiddle, setHideMiddle] = useState(false);
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [hidePronouns, setHidePronouns] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [formalName, setFormalName] = useState("");
  const [shirtSize, setShirtSize] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [sheetMusic, setSheetMusic] = useState("");
  const [accessibility, setAccessibility] = useState("");

  const handlePronounChange = (e) => {
    setHidePronouns(e.target.checked);
  };
  
  const handleMiddleChange = (e) => {
    setHideMiddle(e.target.checked);
  };

  const submitInfoBTC = (event) => {
    let profileToAdd = {
      first_name: firstName,
      last_name: lastName,
      middle_initial: middleInitial,
      hide_middle_initial: hideMiddle,
      pronouns: pronouns,
      hide_pronouns: hidePronouns,
      nickname: nickname,
      birthday: birthday,
      formal_name: formalName,
      shirt_size_id: shirtSize,
      height_ft: heightFt,
      height_in: heightIn,
      sheet_music: sheetMusic,
      accessibility: accessibility
    };

    dispatch({ type: "SUBMIT_PROFILE", payload: profileToAdd });
    // history.push('/checklist')
  };

  const submitInfoNS = (event) => {
    let profileToAdd = {
      first_name: firstName,
      last_name: lastName,
      middle_initial: middleInitial,
      hide_middle_initial: hideMiddle,
      pronouns: pronouns,
      hide_pronouns: hidePronouns,
      nickname: nickname,
      birthday: birthday,
      formal_name: formalName,
      shirt_size_id: shirtSize,
      height_ft: heightFt,
      height_in: heightIn,
      sheet_music: sheetMusic,
      accessibility: accessibility
    };

    dispatch({ type: "SUBMIT_PROFILE", payload: profileToAdd });
    // history.push('/contact-info')
  };

  return (
    <div className="flex flex-col items-center px-4 py-2 text-sm">
      <div className="w-80 flex flex-col items-center border-1 border-slate-600 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-bold">Profile Information</h2>
        <form>
          <div className="flex flex-col px-4 py-2">
            <label>First Name:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Middle Initial:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={middleInitial}
              onChange={(e) => setMiddleInitial(e.target.value)}
            />
          </div>
          <div className="flex flex-row px-4 place-items-center">
            <input
              className="mr-2"
              type="checkbox"
              onChange={handleMiddleChange}
              required
            />
            <label>Hide middle Initial from Directory?</label>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Last Name:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Nickname:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Pronouns:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
            />
          </div>
          <div className="flex flex-row px-4 place-items-center">
            <input className="mr-2" type="checkbox" onChange={handlePronounChange} />
            <label>Hide pronouns from Directory?</label>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Birthday:</label>
            <input
              className="border rounded-md shadow-sm"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Formal Name (For Concert Programs):</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={formalName}
              onChange={(e) => setFormalName(e.target.value)}
            />
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-6/12 px-4 py-2">
              <label className="flex flex-row items-center">
                T-shirt Size:{" "}
                <InformationCircleIcon className="size-4 text-teal-800 ml-1" />
              </label>
              <select
                className="border rounded-md shadow-sm"
                value={shirtSize}
                onChange={(e) => setShirtSize(e.target.value)}
              >
                <option value={1}>XS</option>
                <option value={2}>S</option>
                <option value={3}>M</option>
                <option value={4}>L</option>
                <option value={5}>XL</option>
                <option value={6}>XXL</option>
                <option value={7}>XXXL</option>
                <option value={8}>XXXXL</option>
              </select>
            </div>
            <div className="w-6/12 px-4 py-2">
              <label> Height:</label>
              <div>
                <input
                  type="number"
                  className="w-10 border rounded-md shadow-sm"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                />
                <label>ft.</label>
                <input
                  type="number"
                  className="w-10 border rounded-md shadow-sm"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                />
                <label>in.</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label className="flex flex-row items-center">
              Sheet Music Preference:
              <InformationCircleIcon className="size-4 text-teal-800 ml-1" />
            </label>
            <select
              className="border rounded-md shadow-sm"
              value={sheetMusic}
              onChange={(e) => setSheetMusic(e.target.value)}
            >
              <option value="printed">printed</option>
              <option value="digital">digital</option>
            </select>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label className="flex flex-row items-center">
              Accessibility Accomodations:
              <InformationCircleIcon className="size-4 text-teal-800 ml-1" />
            </label>
            <textarea
              className="border rounded-md shadow-sm"
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-row px-4 py-2">
            <button
              className="border border-slate-600 rounded-full px-6 m-4"
              onClick={submitInfoBTC}
            >
              Back to Checklist
            </button>
            <button
              className="border border-slate-600 rounded-full px-6 m-4"
              onClick={submitInfoNS}
            >
              Next Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
