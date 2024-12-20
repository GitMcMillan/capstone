// erase
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./Helper/Context";

function NavBar() {
  const { user, logOutUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    logOutUser()
      .then(() => history.push("/login"))
      .catch((err) => console.error("Logout error:", err));
  };

  return (
    <nav className="bg-orange-500 p-4 border-b border-gray-300">
      <div className="flex space-x-4">
        {!user ? (
          <Link to="/login" className="text-black hover:text-gray-700">
            Log In
          </Link>
        ) : (
          <>
            <Link to="/" className="text-black hover:text-gray-700">
              Home
            </Link>
            <Link to="/books" className="text-black hover:text-gray-700">
              My Shelf
            </Link>
            <Link to="/authors" className="text-black hover:text-gray-700">
              Authors
            </Link>
            <Link to="/bookstores" className="text-black hover:text-gray-700">
              Bookstores
            </Link>
            <button
              onClick={handleLogout}
              className="text-black hover:text-gray-700 focus:outline-none"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
