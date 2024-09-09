import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function EditProfile() {
  const navigate = useNavigate();
  const memberToEdit = useSelector((store) => store.members.memberProfile);
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(memberToEdit.first_name);
  const [middleInitial, setMiddleInitial] = useState(
    memberToEdit.middle_initial
  );
  const [hideMiddle, setHideMiddle] = useState(
    memberToEdit.hide_middle_initial || false
  );
  const [lastName, setLastName] = useState(memberToEdit.last_name || "");
  const [nickname, setNickname] = useState(memberToEdit.nickname || "");
  const [pronouns, setPronouns] = useState(memberToEdit.pronouns || "");
  const [hidePronouns, setHidePronouns] = useState(
    memberToEdit.hide_pronouns || false
  );
  const [birthday, setBirthday] = useState("");
  const [formalName, setFormalName] = useState(memberToEdit.formal_name || "");
  const [shirtSize, setShirtSize] = useState(memberToEdit.shirt_size_id || "");
  const [heightFt, setHeightFt] = useState(memberToEdit.height_ft || "");
  const [heightIn, setHeightIn] = useState(memberToEdit.height_in || "");
  const [sheetMusic, setSheetMusic] = useState(memberToEdit.sheet_music || "");
  const [accessibility, setAccessibility] = useState(
    memberToEdit.accessibility || ""
  );
  const [email, setEmail] = useState(memberToEdit.email || user.username);
  const [hideEmail, setHideEmail] = useState(false);
  const [phone, setPhone] = useState(memberToEdit.phone || "");
  const [hidePhone, setHidePhone] = useState(false);
  const [address_1, setAddress_1] = useState(
    memberToEdit.street_address_1 || ""
  );
  const [address_2, setAddress_2] = useState(
    memberToEdit.street_address_2 || ""
  );
  const [city, setCity] = useState(memberToEdit.city || "");
  const [state, setState] = useState(memberToEdit.state || "MN");
  const [zipCode, setZipCode] = useState(memberToEdit.zip || "");
  const [hideAddress, setHideAddress] = useState(
    memberToEdit.hide_address || false
  );
  const [emergency_name, setEmergencyName] = useState(
    memberToEdit.emergency_name || ""
  );
  const [emergency_relation, setEmergencyRelation] = useState(
    memberToEdit.emergency_relation || ""
  );
  const [emergency_phone, setEmergencyPhone] = useState(
    memberToEdit.emergency_phone || ""
  );
  const [about, setAbout] = useState(memberToEdit.about || "");
  const [fun_fact, setFunFact] = useState(memberToEdit.fun_fact || "");
  const [employer, setEmployer] = useState(memberToEdit.employer || "");
  const [occupation, setOccupation] = useState(memberToEdit.occupation || "");
  const [website_url, setWebsiteUrl] = useState(memberToEdit.website_url || "");
  const [x_url, setXUrl] = useState(memberToEdit.x_url || "");
  const [facebook_url, setFacebookUrl] = useState(
    memberToEdit.facebook_url || ""
  );
  const [linkedin_url, setLinkedinUrl] = useState(
    memberToEdit.linkedin_url || ""
  );
  const [tiktok_url, setTiktokUrl] = useState(memberToEdit.tiktok_url || "");
  const [instagram_url, setInstagramUrl] = useState(
    memberToEdit.instagram_url || ""
  );

  const handlePronounChange = (e) => {
    setHidePronouns(!hidePronouns);
  };

  const handleMiddleChange = (e) => {
    setHideMiddle(!hideMiddle);
  };

  const handleEmailChange = (e) => {
    setHideEmail(!hideEmail);
  };

  const handlePhoneChange = (e) => {
    setHidePhone(!hidePhone);
  };
  const handleAddressChange = (e) => {
    setHideAddress(!hideAddress);
  };

  const handleDateChange = (timestamp) => {
    const birthdayFormat = new Intl.DateTimeFormat("en-CA").format(timestamp);
    return birthdayFormat;
  };

  const phoneFormat = (phoneString) => {
    if (phoneString) {
      const newPhoneFormat = phoneString.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "($1)-$2-$3"
      );
      return newPhoneFormat;
    } else {
      return "";
    }
  };

const handleGoBack = () => {
  navigate(-1);
}

  const submitEditsToMember = (event) => {
    event.preventDefault();

    let memberToUpdate = {
      email: email,
      hide_email: hideEmail,
      first_name: firstName,
      last_name: lastName,
      middle_initial: middleInitial,
      hide_middle_initial: hideMiddle,
      pronouns: pronouns,
      hide_pronouns: hidePronouns,
      nickname: nickname,
      formal_name: formalName,
      street_address_1: address_1,
      street_address_2: address_2,
      city: city,
      state: state,
      zip: zipCode,
      hide_address: hideAddress,
      emergency_name: emergency_name,
      emergency_relation: emergency_relation,
      emergency_phone: emergency_phone,
      height_ft: heightFt,
      height_in: heightIn,
      birthday: birthday,
      phone: phone,
      hide_phone: hidePhone,
      about: about,
      fun_fact: fun_fact,
      employer: employer,
      occupation: occupation,
      website_url: website_url,
      x_url: x_url,
      instagram_url: instagram_url,
      facebook_url: facebook_url,
      linkedin_url: linkedin_url,
      tiktok_url: tiktok_url,
      sheet_music: sheetMusic,
      accessibility: accessibility,
    };

    dispatchEvent({type: 'SUBMIT_EDITS_TO_MEMBER', payload: memberToUpdate})
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="bg-white flex flex-col w-fit p-6 rounded-lg">
        <h2 className="text-3xl font-bold">Edit Profile</h2>
        <form className="text-xs">
          <p className="font-bold text-lg pt-2">Personal Information:</p>
          <div className="flex flex-col items-center">
            <div className="flex flex-row w-full py-2">
              <div className=" flex flex-col w-full">
                <label>First Name:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4 w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col mx-4 w-20">
                <label>Middle Initial:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="X"
                  value={middleInitial}
                  onChange={(e) => setMiddleInitial(e.target.value)}
                ></input>
                <div className="flex flex-row pt-1">
                  <input
                    type="checkbox"
                    checked={hideMiddle}
                    onChange={handleMiddleChange}
                  ></input>
                  <label className="pl-1 text-teal-700 text-nowrap">
                    Hide Middle Initial from directory?
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label>Last Name:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-row py-2">
              <div className="flex flex-col pr-4">
                <label>Nickname:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="Nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col">
                <label>Pronouns:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="He/Him, They/Them, She/Her, etc."
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                ></input>
                <div className="flex flex-row pt-1">
                  <input
                    type="checkbox"
                    checked={hidePronouns}
                    onChange={handlePronounChange}
                  ></input>
                  <label className="pl-1 text-teal-700">
                    Hide Pronouns from directory?
                  </label>
                </div>
              </div>
              <div className="flex flex-col pl-4">
                <label>Birthday:</label>
                <input
                  type="date"
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  value={birthday}
                  onChange={(e) => {
                    setBirthday(e.target.value);
                    console.log(birthday);
                  }}
                ></input>
              </div>
            </div>
            <div className="flex flex-row py-2 items-start w-full">
              <div className="flex flex-col pr-4">
                <label>Formal Name &#40;for concert programs&#41;:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="John M. Doe"
                  value={formalName}
                  onChange={(e) => setFormalName(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col">
                <label>T-shirt:</label>
                <select
                  className="border border-slate-300 rounded-md py-2 pl-4"
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
              <div className="flex flex-col pl-4">
                <label>Height:</label>
                <div className="flex flex-row items-baseline">
                  <input
                    type="number"
                    className="border border-slate-300 rounded-md py-2 pl-4 w-12 mr-1"
                    placeholder="0"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                  ></input>{" "}
                  <p>ft.</p>
                  <input
                    type="number"
                    className="border border-slate-300 rounded-md py-2 pl-4 w-12 mx-1"
                    placeholder="0"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                  ></input>{" "}
                  <p>in.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label>Sheet Music Preference:</label>
              <select
                className="border border-slate-300 rounded-md py-2"
                placeholder="john_doe.example.com"
                value={sheetMusic}
                onChange={(e) => setSheetMusic(e.target.value)}
              >
                <option value="printed">Printed</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            <div className="flex flex-col w-full py-2">
              <label>Accessibility:</label>
              <textarea
                className="border border-slate-300 rounded-md py-2"
                placeholder="john_doe.example.com"
                value={accessibility}
                onChange={(e) => setAccessibility(e.target.value)}
              ></textarea>
            </div>
            <p className="font-bold text-lg pt-2 self-start">
              Contact Information:
            </p>
            <div className="flex flex-row w-full py-2">
              <div className="flex flex-col w-full mr-2">
                <label>Email Address:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="john_doe.example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <div className="flex flex-row pt-1">
                  <input
                    type="checkbox"
                    checked={hideEmail}
                    onChange={handleEmailChange}
                  ></input>
                  <label className="pl-1 text-teal-700">
                    Hide Email from directory?
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full ml-2">
                <label>Primary Phone:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="xxx-xxx-xxxx"
                  value={phoneFormat(phone)}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
                <div className="flex flex-row pt-1">
                  <input
                    type="checkbox"
                    checked={hidePhone}
                    onChange={handlePhoneChange}
                  ></input>
                  <label className="pl-1 text-teal-700">
                    Hide Phone from directory?
                  </label>
                </div>
                <div></div>
              </div>
            </div>
            <div className="flex flex-col w-full py-4">
              <div className="flex flex-col pb-2">
                <label>Address Line 1:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="Street Address"
                  value={address_1}
                  onChange={(e) => setAddress_1(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col pb-2">
                <label>Address Line 2:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="Suite, Unit, Apt, etc."
                  value={address_2}
                  onChange={(e) => setAddress_2(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-full">
                  <label>City:</label>
                  <input
                    className="border border-slate-300 rounded-md py-2 pl-4"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col mx-4">
                  <label>State:</label>
                  <select
                    className="border border-slate-300 rounded-md py-2"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="MN">MN</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label>Zip:</label>
                  <input
                    className="border border-slate-300 rounded-md py-2 pl-4"
                    placeholder="5-digits"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row pt-1">
                <input
                  type="checkbox"
                  checked={hideAddress}
                  onChange={handleAddressChange}
                ></input>
                <label className="pl-1 text-teal-700">
                  Hide Address from directory?
                </label>
              </div>
            </div>
            <p className="font-bold text-lg pt-2 self-start">
              Emergency Contact Information:
            </p>
            <div className="flex flex-col w-full">
              <div className="flex flex-row py-2">
                <div className="flex flex-col w-full">
                  <label>Emergency Contact Name:</label>
                  <input
                    className="border border-slate-300 rounded-md py-2 pl-4"
                    placeholder="Emergency Contact Name"
                    value={emergency_name}
                    onChange={(e) => setEmergencyName(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col w-40 ml-4">
                  <label>Relation:</label>
                  <select
                    className="border border-slate-300 rounded-md py-2 pl-4"
                    value={emergency_relation}
                    onChange={(e) => setEmergencyRelation(e.target.value)}
                  >
                    <option value="mother">Mother</option>
                    <option value="father">Father</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="spouse">Spouse</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col py-2">
                <label>Emergency Contact Phone:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="Full Name"
                  value={phoneFormat(emergency_phone)}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                ></input>
              </div>
            </div>
            <p className="font-bold text-lg pt-2 self-start">About Me:</p>
            <div className="flex flex-col py-2 w-full">
              <label>About:</label>
              <textarea
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="About Me..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>Fun Fact:</label>
              <textarea
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="Fun fact about me..."
                value={fun_fact}
                onChange={(e) => setFunFact(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>Employer:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="Employer"
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>Occupation:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="Full Name"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              ></input>
            </div>
            <p className="font-bold text-lg pt-2 self-start">
              Social Media Links:
            </p>
            <div className="flex flex-col py-2 w-full">
              <label>Personal Website URL:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="personal website URL"
                value={website_url}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>Facebook URL:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="https://www.facebook.com/xxxxx"
                value={facebook_url}
                onChange={(e) => setFacebookUrl(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>Instagram URL:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="@xxxxx"
                value={instagram_url}
                onChange={(e) => setInstagramUrl(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>LinkedIn URL:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="https://www.linkedin.com/xxxxxxx"
                value={linkedin_url}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>TikTok URL:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="https://tiktok.com/xxxxxx"
                value={tiktok_url}
                onChange={(e) => setTiktokUrl(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col py-2 w-full">
              <label>X URL:</label>
              <input
                className="border border-slate-300 rounded-md py-2 pl-4"
                placeholder="http://www.x.com/xxxxxx"
                value={x_url}
                onChange={(e) => setXUrl(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-row p-4 w-full justify-end">
              <button className="mx-2 px-6 py-1 border border-teal-700 text-teal-700 rounded-full"
              onClick={handleGoBack}>
                Cancel
              </button>
              <button className="mx-2 px-6 py-1 bg-teal-700 rounded-full text-white">
                Submit Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
