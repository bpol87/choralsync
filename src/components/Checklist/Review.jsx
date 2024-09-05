import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function ReviewProfile() {
  const history = useHistory();
  const userProfile = useSelector((store) => store.userProfile);
  console.log(userProfile);

  const phoneFormat = (phoneString) => {
    const newPhoneFormat = phoneString.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
    return newPhoneFormat;
  };

  return (
    <div>
      <div className="flex flex-col items-center px-4 py-2 text-sm">
        <div className=" flex flex-col items-center border-1 border-slate-600 rounded-lg shadow-md bg-white p-4">
          <h2 className="text-lg font-bold">Review Profile</h2>
          <div className="flex flex-row">
            <div id="left-side" className="mr-4">
              <div className=" w-96 mb-4 p-4 shadow-md border border-teal-700 rounded-lg">
                <div className="flex flex-row space-x-10">
                  <h3 className="items-start text-xl font-bold">
                    Personal Information:
                  </h3>
                </div>
                <div className="py-2">
                  <p className="font-bold">Name:</p>
                  <p>
                    {userProfile.first_name} {userProfile.middle_initial}.{" "}
                    {userProfile.last_name}
                  </p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Pronouns:</p>
                  {userProfile.hide_pronouns ? (
                    <p className="text-slate-500">(hidden from directory)</p>
                  ) : (
                    ""
                  )}
                  <p>{userProfile.pronouns}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Nickname:</p>
                  <p>{userProfile.nickname}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">
                    Formal Name (for concert programs):
                  </p>
                  <p>{userProfile.formal_name}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">T-shirt Size:</p>
                  <p className="text-slate-500">(hidden from directory)</p>
                  <p>{userProfile.size}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Height:</p>
                  <p>
                    {userProfile.height_ft} ft. {userProfile.height_in} in.
                  </p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Sheet Music Preference:</p>
                  <p className="text-slate-500">(hidden from directory)</p>
                  <p>{userProfile.sheet_music}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Accessibility Accomodations:</p>
                  <p className="text-slate-500">(hidden from directory)</p>
                  <p>{userProfile.accessibility}</p>
                </div>
                <div className="py-2 flex flex-col">
                  <p className="font-bold">Profile Photo:</p>
                  <UserCircleIcon className="bg-teal-500 rounded-3xl my-2 size-64 self-center" />
                </div>
              </div>
              <div className=" w-96 p-4 shadow-md border border-teal-700 rounded-lg">
                <div className="flex flex-row space-x-10">
                  <h3 className="items-start text-xl font-bold">
                    Emergency Contact:
                  </h3>
                  <button className="text-right">Edit Section</button>
                </div>
                <div className="py-2">
                  <p>Emergency Contact Info:</p>
                  <p>
                    {userProfile.emergency_name} (
                    {userProfile.emergency_relation})
                  </p>
                  <p>{phoneFormat(userProfile.emergency_phone)}</p>
                </div>
              </div>
            </div>
            <div id="right-side">
              <div className=" w-96 mb-4 p-4 shadow-md border border-teal-700 rounded-lg">
                <div className="flex flex-row space-x-10">
                  <h3 className="items-start text-xl font-bold">
                    Contact Information:
                  </h3>
                  <button className="text-right">Edit Section</button>
                </div>
                <div className="py-2">
                  <p className="font-bold">Email:</p>
                  <p>
                    {userProfile.hide_email ? (
                      <p className="text-slate-500">(hidden from directory)</p>
                    ) : (
                      ""
                    )}
                  </p>
                  <p>{userProfile.email}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Phone:</p>
                  {userProfile.hide_phone ? (
                    <p className="text-slate-500">(hidden from directory)</p>
                  ) : (
                    ""
                  )}
                  <p>{phoneFormat(userProfile.phone)}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Address:</p>
                  <p>{userProfile.street_address_1}</p>
                  {userProfile.street_address_2 ? (
                    <p>{userProfile.street_address_2}</p>
                  ) : (
                    ""
                  )}
                  <p>
                    {userProfile.city}, {userProfile.state} {userProfile.zip}
                  </p>
                </div>
              </div>
              <div className=" w-96 mb-4 p-4 shadow-md border border-teal-700 rounded-lg">
                <div className="flex flex-row space-x-10">
                  <h3 className="items-start text-xl font-bold">About Me:</h3>
                  <button className="text-right">Edit Section</button>
                </div>
                <div className="py-2">
                  <p className="font-bold">About:</p>
                  <p>{userProfile.about}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Fun Fact:</p>
                  <p>{userProfile.fun_fact}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Employer:</p>
                  <p>{userProfile.employer}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Occupation:</p>
                  <p>{userProfile.occupation}</p>
                </div>
              </div>
              <div className=" w-96 mb-4 p-4 shadow-md border border-teal-700 rounded-lg">
                <div className="flex flex-row space-x-10">
                  <h3 className="items-start text-xl font-bold">
                    Social Media:
                  </h3>
                  <button className="text-right">Edit Section</button>
                </div>
                <div className="py-2">
                  <p className="font-bold">Personal Website:</p>
                  <p>
                    {userProfile.website_url ? userProfile.website_url : ""}
                  </p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Facebook:</p>
                  <p>
                    {userProfile.facebook_url ? userProfile.facebook_url : ""}
                  </p>
                </div>
                <div className="py-2">
                  <p className="font-bold">Instagram:</p>
                  <p>
                    {userProfile.instagram_url ? userProfile.instagram_url : ""}
                  </p>
                </div>
                <div className="py-2">
                  <p className="font-bold">LinkedIn:</p>
                  <p>
                    {userProfile.linkedin_url ? userProfile.linkedin_url : ""}
                  </p>
                </div>
                <div className="py-2">
                  <p className="font-bold">TikTok:</p>
                  <p>{userProfile.tiktok_url ? userProfile.tiktok_url : ""}</p>
                </div>
                <div className="py-2">
                  <p className="font-bold">X:</p>
                  <p>{userProfile.x_url ? userProfile.x_url : ""}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <button
              className="border border-teal-700 rounded-full px-8 py-1 m-4 text-sm shadow-md shadow-slate-600 active:shadow-none active:translate-x-px active:translate-y-px"
              onClick={() => history.push("/user")}
            >
              Back to Checklist
            </button>
            <button className="border border-teal-700 text-white bg-teal-700 shadow-md shadow-slate-600 active:shadow-none active:translate-x-px active:translate-y-px rounded-full px-8 py-1 m-4 text-sm">
              Submit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewProfile;
