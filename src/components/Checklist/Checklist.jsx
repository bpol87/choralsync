import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Checklist() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);

  console.log(user);

  const handleClick = (section) => {
    dispatch({ type: "FETCH_USER_PROFILE", payload: user.id });
    history.push(`/${section}`);
  };

  const editButton = (userList, section) => {
    if (!userList) {
      return (
        <button
          className="border border-slate-600 rounded-full px-6"
          onClick={() => {
            handleClick(section);
          }}
        >
          {" "}
          Start{" "}
        </button>
      );
    } else {
      return (
        <button
          className="border border-slate-600 rounded-full px-6"
          onClick={() => {
            handleClick(section);
          }}
        >
          Edit
        </button>
      );
    }
  };

  const iconDisplay = (section) => {
    if (!section) {
      return <ExclamationCircleIcon className="size-6 text-yellow-600" />;
    } else {
      return <CheckCircleIcon className="size-6 text-green-600" />;
    }
  };

  const statusMessage = (section) => {
    if (!section) {
      return <p></p>;
    } else {
      return <p className="text-green-600">Completed</p>;
    }
  };

  const reviewButton = (user) => {
    if (
      user.isProfileComplete &&
      user.isContactComplete &&
      user.isEmergencyComplete
    ) {
      return (
        <button
          className="border border-slate-600 rounded-full px-6"
          onClick={() => history.push("/review-info")}
        >
          Review Profile
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center m-4 bg-white p-4">
        <h2 className="text-3xl font-bold">Create Profile</h2>
        <table>
          <thead>
            <tr>
              <th className="pr-2"></th>
              <th className="min-w-72 text-left">Section</th>
              <th className="min-w-24"></th>
              <th className="w-40 text-right">Start Section</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-slate-700">
              <td className="pr-2 py-2">
                {iconDisplay(user.isProfileComplete)}
              </td>
              <td className="py-2">Personal Information <span className="text-red-600 text-xl">*</span></td>
              <td className="py-2">{statusMessage(user.isProfileComplete)}</td>
              <td className="flex justify-end m-2 py-2">
                {editButton(user.isProfileComplete, "profile-info")}
              </td>
            </tr>
            <tr className="border-b-2 border-slate-700">
              <td className="pr-2 py-2">
                {iconDisplay(user.isContactComplete)}
              </td>
              <td className="py-2">Contact Information <span className="text-red-600 text-xl">*</span></td>
              <td className="py-2">{statusMessage(user.isContactComplete)}</td>
              <td className="flex justify-end m-2 py-2">
                {editButton(user.isContactComplete, "contact-info")}
              </td>
            </tr>
            <tr className="border-b-2 border-slate-700">
              <td className="pr-2 py-2">
                {iconDisplay(user.isEmergencyComplete)}
              </td>
              <td className="py-2">Emergency Contact <span className="text-red-600 text-xl">*</span></td>
              <td className="py-2">
                {statusMessage(user.isEmergencyComplete)}
              </td>
              <td className="flex justify-end m-2 py-2">
                {editButton(user.isEmergencyComplete, "emergency-info")}
              </td>
            </tr>
            <tr className="border-b-2 border-slate-700">
              <td className="pr-2 py-2">{iconDisplay(user.isAboutComplete)}</td>
              <td className="py-2">About</td>
              <td className="py-2">{statusMessage(user.isAboutComplete)}</td>
              <td className="flex justify-end m-2 py-2">
                {editButton(user.isAboutComplete, "about-info")}
              </td>
            </tr>
            <tr className="pt-2">
              <td className="pr-2 pt-2">
                {iconDisplay(user.isSocialComplete)}
              </td>
              <td className="pt-2">Social Media</td>
              <td className="pt-2">{statusMessage(user.isSocialComplete)}</td>
              <td className="flex justify-end m-2 pt-2">
                {editButton(user.isSocialComplete, "social-info")}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs self-start">* Required Fields</p>
        <div>{reviewButton(user)}</div>
      </div>
    </div>
  );
}

export default Checklist;
