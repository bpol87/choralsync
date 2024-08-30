import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-row p-4 bg-gray-300 text-teal-950 shadow-black shadow-sm">
      <Link to="/home">
        <h2 className="nav-title mr-8">ChoralSync</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="hover:bg-teal-800 hover:text-white" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="hover:bg-teal-800 hover:text-white" to="/user">
              Home
            </Link>

            <Link className="hover:bg-teal-800 hover:text-white" to="/info">
              Info Page
            </Link>

            <LogOutButton className="hover:bg-teal-800 hover:text-white" />
          </>
        )}

        <Link className="hover:bg-teal-800 hover:text-white" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
