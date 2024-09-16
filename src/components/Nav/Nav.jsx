import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const userProfile = useSelector((store) => store.userProfile);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  // Fetch user profile when user.id is available
  useEffect(() => {
    if (user.id) {
      dispatch({ type: "FETCH_USER_PROFILE", payload: user.id });
    }
  }, [user.id, dispatch]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle image rendering
  const handleImage = () => {
    if (userProfile && userProfile.profile_photo_url) {
      return (
        <img
          src={userProfile.profile_photo_url}
          className="h-10 w-10 object-cover rounded-full"
          alt="Profile"
        />
      );
    } else {
      return <UserCircleIcon className="w-10 h-10" />;
    }
  };

  return (
    <div className="flex flex-row p-4 bg-white text-teal-950 shadow-lg items-center w-full">
      <div className="flex flex-row items-center w-full">
        <img src="/choralsync-logo.png" className="w-8 object-scale-down" />
        <img src="/choralsync-title.png" className="h-8 object-scale-down" />
      </div>
      <div className="flex flex-row justify-end w-full">
        {/* Conditional Rendering: Only show these links if user is logged in and profile is complete */}
        {user.id && userProfile && userProfile.isChecklistCompleted !== false ? (
          <>
            <div className="ml-24 flex flex-row items-center">
              <Link className="hover:bg-teal-800 hover:text-white mr-8" to="/user">
                Home
              </Link>
              <Link className="hover:bg-teal-800 hover:text-white mr-8" to="/music-library">
                Music Library
              </Link>
              <Link className="hover:bg-teal-800 hover:text-white mr-8" to="/members">
                Member Directory
              </Link>
              <Link className="hover:bg-teal-800 hover:text-white mr-8" to="/calendar">
                Calendar
              </Link>
              {user.isAdmin && (
                <Link className="hover:bg-teal-800 hover:text-white mr-8" to="/admin">
                  Admin Console
                </Link>
              )}
            </div>

            {/* Dropdown Menu */}
            <div className="flex flex-row items-center relative">
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {handleImage()}
                <ChevronDownIcon className="size-4 ml-2" />
              </div>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 right-20 mt-52"
                >
                  <Link
                    to={`/members/${userProfile.user_id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-800 hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <span className="block px-4 py-2 text-sm text-gray-500 cursor-not-allowed">
                    Files
                  </span>
                  <span className="block px-4 py-2 text-sm text-gray-500 cursor-not-allowed">
                    Seating Chart
                  </span>
                  <span className="block px-4 py-2 text-sm text-gray-500 cursor-not-allowed">
                    Bulletin Board
                  </span>
                  <span className="block px-4 py-2 text-sm text-gray-500 cursor-not-allowed">
                    Payments
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          // No user-specific links when not logged in
          <div className="flex flex-row items-center">
            {/* You can add some public links or content here if needed */}
          </div>
        )}

        {/* Always Render Log Out Button if User is Logged In */}
        {user.id && <LogOutButton className="hover:bg-teal-800 hover:text-white ml-4" />}
      </div>
    </div>
  );
};

export default NavBar;
