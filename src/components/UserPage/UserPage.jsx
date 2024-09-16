import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const handleAdmin = () => {
    if (user.isAdmin) {
      return (
        <button
          className="shadow-lg rounded-full w-52 py-2 px-6 m-2   text-white bg-teal-600 disabled:bg-slate-400 disabled:text-slate-600"
          disabled
          onClick={() => history.push("/admin")}
        >
          Admin Console
        </button>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <button
        className="shadow-lg rounded-full w-52 py-2 px-6 m-2   text-white bg-teal-600"
        onClick={() => history.push("/music-library")}
      >
        Music Library
      </button>
      
      <button
        className="shadow-lg rounded-full w-52 py-2 px-6 m-2   text-white bg-teal-600"
        onClick={() => history.push("/members")}
      >
        Member Directory
      </button>
      <button
        className="shadow-lg rounded-full w-52 py-2 px-6 m-2   text-white bg-teal-600 disabled:bg-slate-400 disabled:text-slate-600"
        disabled
        onClick={() => history.push("/calendar")}
      >
        Calendar
      </button>
      {handleAdmin()}
      <button
        className="shadow-lg rounded-full w-52 py-2 m-2   disabled:bg-slate-400 disabled:text-slate-600"
        disabled
      >
        Files
      </button>
      <button
        className="shadow-lg rounded-full w-52 py-2 px-6 m-2   disabled:bg-slate-400 disabled:text-slate-600"
        disabled
      >
        Seating Chart
      </button>
      <button
        className="shadow-lg rounded-full w-52 py-2 px-6 m-2   disabled:bg-slate-400 disabled:text-slate-600"
        disabled
      >
        Bulletin Board
      </button>
      <button
        className="shadow-lg rounded-full w-52 py-2 px-6 m-2   disabled:bg-slate-400 disabled:text-slate-600"
        disabled
      >
        Payments
      </button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
