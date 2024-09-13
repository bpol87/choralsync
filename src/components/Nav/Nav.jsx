import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const userProfile = useSelector((store) => store.userProfile);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  useEffect(() => {
    dispatch({ type: "FETCH_USER_PROFILE", payload: user.id });
  }, [dispatch]);
  // Close dropdown if clicked outside
  useEffect(() => {
    dispatch({type: 'FETCH_USER_PROFILE', payload: user.id})
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImage = () => {
    if (userProfile.profile_photo_url) {
      return (
        <img
          src={userProfile.profile_photo_url}
          className="h-10 w-10 object-cover rounded-full"
          alt="Profile"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      );
    } else {
      return (
        <UserCircleIcon className="w-10 h-10"/>
      )
    }
  };

  return (
    <div className="flex flex-row p-4 bg-white text-teal-950 shadow-lg items-center w-full">
      <div className="flex flex-row items-center w-full">
        <img src="/choralsync-logo.png" className="w-8 object-scale-down" />
        <img src="/choralsync-title.png" className="h-8 object-scale-down" />
      </div>
      <div className="flex flex-row justify-end w-full">
        {/* If a user is logged in and checklist is complete, show these links */}
        {user.id === true && userProfile.isChecklistComplete === true ? (
          <div className="ml-24 flex flex-row items-center">
            <Link
              className="hover:bg-teal-800 hover:text-white mr-8"
              to="/user"
            >
              Home
            </Link>
            <Link
              className="hover:bg-teal-800 hover:text-white mr-8"
              to="/music-library"
            >
              Music Library
            </Link>
            <Link
              className="hover:bg-teal-800 hover:text-white mr-8"
              to="/members"
            >
              Member Directory
            </Link>
            <Link
              className="hover:bg-teal-800 hover:text-white mr-8"
              to="/calendar"
            >
              Calendar
            </Link>
            {user?.isAdmin && (
              <Link
                className="hover:bg-teal-800 hover:text-white mr-8"
                to="/admin"
              >
                Admin Console
              </Link>
            )}
          </div>
        ) : ('')}
        {user.id && userProfile.isChecklistComplete && (
          <div className="flex flex-row items-center relative">
            {user && (
              <>
                <div
                  className="flex flex-row items-center cursor-pointer"
                  onClick={toggleDropdown}
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
              </>
            )}
            
          </div>
        )}
        <LogOutButton className="hover:bg-teal-800 hover:text-white ml-4" />
      </div>
    </div>
  );
};

export default NavBar;
