import React from 'react';
import { Link } from 'react-router-dom';

const BaseNav = () => (
  <div className="flex flex-row p-4 bg-white text-teal-950 shadow-lg items-center w-full">
    <div className="flex flex-row items-center w-full">
      <img src="/choralsync-logo.png" className="w-8 object-scale-down" />
      <img src="/choralsync-title.png" className="h-8 object-scale-down" />
    </div>
  </div>
);

export default BaseNav;
