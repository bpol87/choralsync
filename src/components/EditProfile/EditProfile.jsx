import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function EditProfile() {
  const handleDateChange = (timestamp) => {
    const birthdayFormat = new Intl.DateTimeFormat("en-CA").format(timestamp);
    return birthdayFormat;
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
                ></input>
              </div>
              <div className="flex flex-col mx-4 w-20">
                <label>Middle Initial:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="F"
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label>Last Name:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="First Name"
                ></input>
              </div>
            </div>
            <div className="flex flex-row py-2">
              <div className="flex flex-col pr-4">
                <label>Nickname:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="F"
                ></input>
              </div>
              <div className="flex flex-col">
                <label>Pronouns:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="F"
                ></input>
                <div className="flex flex-row pt-1">
                  <input type="checkbox"></input>
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
                  placeholder="F"
                ></input>
              </div>
            </div>
            <div className="flex flex-row py-2 items-start w-full">
              <div className="flex flex-col pr-4">
                <label>Formal Name &#40;for concert programs&#41;:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="F"
                ></input>
              </div>
              <div className="flex flex-col">
                <label>T-shirt:</label>
                <select className="border border-slate-300 rounded-md py-2 pl-4">
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
                    placeholder="F"
                  ></input>{" "}
                  <p>ft.</p>
                  <input
                    type="number"
                    className="border border-slate-300 rounded-md py-2 pl-4 w-12 mx-1"
                    placeholder="F"
                  ></input>{" "}
                  <p>in.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
                <label>Sheet Music Preference:</label>
                <select
                  className="border border-slate-300 rounded-md py-2"
                  placeholder="john_doe.example.com"
                >
                    <option value='printed'>Printed</option>
                    <option value='digital'>Digital</option>
                </select>
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
                ></input>
                <div className="flex flex-row pt-1">
                  <input type="checkbox"></input>
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
                ></input>
                <div className="flex flex-row pt-1">
                  <input type="checkbox"></input>
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
                ></input>
              </div>
              <div className="flex flex-col pb-2">
                <label>Address Line 2:</label>
                <input
                  className="border border-slate-300 rounded-md py-2 pl-4"
                  placeholder="Suite, Unit, Apt, etc."
                ></input>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-full">
                  <label>City:</label>
                  <input
                    className="border border-slate-300 rounded-md py-2 pl-4"
                    placeholder="City"
                  ></input>
                </div>
                <div className="flex flex-col mx-4">
                  <label>State:</label>
                  <select className="border border-slate-300 rounded-md py-2">
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
                  ></input>
                </div>
              </div>
              <div className="flex flex-row pt-1">
                <input type="checkbox"></input>
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
                    placeholder="Full Name"
                  ></input>
                </div>
                <div className="flex flex-col w-40 ml-4">
                  <label>Relation:</label>
                  <select
                    className="border border-slate-300 rounded-md py-2 pl-4"
                    placeholder="Full Name"
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
                  ></input>
              </div>
            </div>
            <div className="flex flex-row p-4 w-full justify-end">
              <button className="mx-2 px-6 py-1 border border-teal-700 text-teal-700 rounded-full">
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
