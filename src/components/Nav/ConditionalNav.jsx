import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

const ConditionalNav = () => {
  return (
    <div className="flex flex-row p-4 bg-white text-teal-950 shadow-lg items-center w-full">
      <div className="flex flex-row items-center w-full">
        <img src="/choralsync-logo.png" className="w-8 object-scale-down" alt="Logo" />
        <img src="/choralsync-title.png" className="h-8 object-scale-down" alt="Title" />
      </div>
      <div className="flex flex-row justify-end w-full">
        <LogOutButton className="hover:bg-teal-800 hover:text-white ml-4" />
      </div>
    </div>
  );
};

export default ConditionalNav;

