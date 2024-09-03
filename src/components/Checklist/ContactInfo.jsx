import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ContactInfo() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState(user.username);
  const [hideEmail, setHideEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [hidePhone, setHidePhone] = useState(false);
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("MN");
  const [zipCode, setZipCode] = useState("");
  const [hideAddress, setHideAddress] = useState(false);

  const handleEmailChange = (e) => {
    setHideEmail(e.target.checked);
  };

  const handlePhoneChange = (e) => {
    setHidePhone(e.target.checked);
  };

  const handleAddressChange = (e) => {
    setHideAddress(e.target.checked);
  };

  const submitContact = (button) => {
    let contactToAdd = {
      email: email,
      hide_email: hideEmail,
      phone: phone,
      hide_phone: hidePhone,
      street_address_1: address_1,
      street_address_2: address_2,
      city: city,
      state: state,
      zip: zipCode,
      hide_address: hideAddress,
    };

    dispatch({ type: "SUBMIT_CONTACT", payload: contactToAdd });

    if (button === "backToChecklist") {
      history.push('/checklist')
    } else if (button === "nextSection") {
      history.push('/emergency-info')
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-2 text-sm">
      <div className=" flex flex-col items-center border-1 border-slate-600 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-bold">Contact Information</h2>
        <form>
          <div className="flex flex-col px-4 py-2">
            <label>Email Address:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-row px-4 place-items-center">
            <input
              className="mr-2"
              type="checkbox"
              onChange={handleEmailChange}
            />
            <label>Hide Email from Directory?</label>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Primary Phone:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-row px-4 place-items-center">
            <input
              className="mr-2"
              type="checkbox"
              onChange={handlePhoneChange}
            />
            <label>Hide Phone from Directory?</label>
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Address Line 1:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={address_1}
              onChange={(e) => setAddress_1(e.target.value)}
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>Address Line 2:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={address_2}
              onChange={(e) => setAddress_2(e.target.value)}
            />
          </div>
          <div className="flex flex-row">
          <div className="flex flex-col px-4 py-2 grow">
            <label>City:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex flex-col px-4 py-2">
            <label>State:</label>
            <select
            className="border rounded-md shadow-sm"
              name="states"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="MN" selected>
                MN
              </option>
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
          <div className="flex flex-col px-4 py-2">
            <label>Zip Code:</label>
            <input
              className="border rounded-md shadow-sm"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          </div>
          <div className="flex flex-row px-4 items-center text-xs">
            <input
              className="mr-2"
              type="checkbox"
              onChange={handleAddressChange}
            />
            <label>Hide Address from Directory?</label>
          </div>
          <div className="flex flex-row px-4 py-2">
            <button
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => history.push("/checklist")}
            >
              Cancel
            </button>
            <button
              className="border border-slate-600 rounded-full px-6 m-4 text-xs"
              onClick={() => submitContact("backToChecklist")}
            >
              Save and Back To Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactInfo;
