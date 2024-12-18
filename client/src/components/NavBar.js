import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./Helper/Context";

function NavBar() {
  const { user, setUser } = useContext(UserContext); // Access user context
  const history = useHistory(); // Get history for navigation

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setUser(null); // Clear user state
          history.push("/login"); // Redirect to login page
        }
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <nav className="bg-orange-500 p-4 border-b border-gray-300">
      <div className="flex space-x-4">
        {!user ? ( // Show "Log In" if no user is logged in
          <Link to="/login" className="text-black hover:text-gray-700">
            Log In
          </Link>
        ) : (
          <>
            {" "}
            {/* Show these links if the user is logged in */}
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
              Book Stores
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
