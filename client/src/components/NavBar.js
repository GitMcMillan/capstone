import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-orange-500 p-4 border-b border-gray-300">
      <div className="flex space-x-4">
        <Link to="/login" className="text-black hover:text-gray-700">
          LogIn
        </Link>
        <Link to="/" className="text-black hover:text-gray-700">
          Home
        </Link>
        {/* <Link to="/users" className="text-black hover:text-gray-700">
          User Info
        </Link> */}
        <Link to="/books" className="text-black hover:text-gray-700">
          My Shelf
        </Link>
        <Link to="/authors" className="text-black hover:text-gray-700">
          Authors
        </Link>
        <Link to="/bookstores" className="text-black hover:text-gray-700">
          Book Stores
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
