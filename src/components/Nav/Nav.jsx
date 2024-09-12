import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-row p-4 bg-gray-300 text-teal-950 shadow-black shadow-sm items-center">
      <div className="flex flex-row items-center">
        <img src="/choralsync-logo.png" className="w-8 object-scale-down" />
        <img src="/choralsync-title.png" className="h-8 object-scale-down" />
      </div>
      <div>
        {/* If a user is logged in and checklist is complete, show these links */}
        {/* {user.id && user.isChecklistComplete && ( */}
          {<div>
            <Link className="hover:bg-teal-800 hover:text-white" to="/user">
              Home
            </Link>

            <Link className="hover:bg-teal-800 hover:text-white" to="/info">
              Info Page
            </Link>

            <LogOutButton className="hover:bg-teal-800 hover:text-white" />
          </div>
        }
      </div>
    </div>
  );
}


export default Nav;
