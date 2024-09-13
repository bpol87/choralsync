import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";

function ProfileInfo() {
  let user = useSelector(store => store.user)
  let userProfile = useSelector((store) => store.userProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setFile] = useState(null);

  // Initialize state with userProfile values
  const [firstName, setFirstName] = useState(userProfile.first_name || "");
  const [middleInitial, setMiddleInitial] = useState(userProfile.middle_initial || "");
  const [hideMiddle, setHideMiddle] = useState(userProfile.hide_middle_initial || false);
  const [lastName, setLastName] = useState(userProfile.last_name || "");
  const [nickname, setNickname] = useState(userProfile.nickname || "");
  const [pronouns, setPronouns] = useState(userProfile.pronouns || "");
  const [hidePronouns, setHidePronouns] = useState(userProfile.hide_pronouns || false);
  const [birthday, setBirthday] = useState(userProfile.birthday || "");
  const [formalName, setFormalName] = useState(userProfile.formal_name || "");
  const [shirtSize, setShirtSize] = useState(userProfile.shirt_size_id || "");
  const [heightFt, setHeightFt] = useState(userProfile.height_ft || "");
  const [heightIn, setHeightIn] = useState(userProfile.height_in || "");
  const [sheetMusic, setSheetMusic] = useState(userProfile.sheet_music || "");
  const [accessibility, setAccessibility] = useState(userProfile.accessibility || "");

const handleProfilePopulate = () => {
  setFirstName('Erick')
  setMiddleInitial('R')
  setHideMiddle(true)
  setLastName('Smith')
  setNickname('')
  setPronouns('He/Him')
  setHidePronouns(false)
  setFormalName('Erick R Smith')
  setShirtSize(6)
  setHeightFt(5)
  setHeightIn(11)
  setSheetMusic('printed')
  setAccessibility('No accomodations needed')
}

const handleProfileReset = () => {
  setFirstName('')
  setMiddleInitial('')
  setHideMiddle(false)
  setLastName('')
  setNickname('')
  setPronouns('')
  setHidePronouns(false)
  setFormalName('')
  setShirtSize('')
  setHeightFt('')
  setHeightIn('')
  setSheetMusic('')
  setAccessibility('')
}

  useEffect(() => {
    dispatch({ type: "FETCH_USER_PROFILE", payload: user.id });
  }, [dispatch]);
  
  const handleDateChange = (timestamp) => {
    const birthdayFormat = new Intl.DateTimeFormat("en-CA").format(timestamp);
    return birthdayFormat;
  };

  const handlePronounChange = (e) => {
    setHidePronouns(e.target.checked);
  };

  const handleMiddleChange = (e) => {
    setHideMiddle(e.target.checked);
  };

  const submitInfo = (button) => {
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
      accessibility: accessibility,
      photo: file,
    };

    dispatch({ type: "SUBMIT_PROFILE", payload: profileToAdd });
    history.push("/user");
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div className="flex flex-col items-center px-4 py-2 text-sm">
      <div className="flex flex-col items-center border-1 border-slate-600 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-bold" onClick={handleProfilePopulate}>Profile Information</h2>
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
              checked={hideMiddle}
              onChange={handleMiddleChange}
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
              required
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
            <input
              className="mr-2"
              type="checkbox"
              checked={hidePronouns}
              onChange={handlePronounChange}
            />
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
            <label>Accessibility Information:</label>
            <textarea
              className="border rounded-md shadow-sm"
              rows="3"
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value)}
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Profile Photo:</label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-4 rounded-md"
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-center">File selected: {file.name}</p>
              ) : (
                <p className="text-center">Drag 'n' drop a file here, or click to select one</p>
              )}
            </div>
          </div>
          <div className="flex flex-row px-4 py-2">
            <button
              type="button"
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() =>
                {handleProfileReset();
                history.push("/user")}}
            >
              Cancel
            </button>
            <button
              type="button"
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => submitInfo("backToChecklist")}
            >
              Save and Back To Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;